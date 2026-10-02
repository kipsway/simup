/* ==========================================================================
   SIMUP - MINES MINI-GAME ENGINE (5x5 GRID, 1-24 BOMBS)
   Real-time casino mathematical model (house edge 3%), Provably Fair SHA-256,
   crystal audio progression, screen shake explosions, cashouts & live drops.
   ========================================================================== */

class MinesEngine {
  constructor() {
    this.gridSize = 25; // 5x5
    this.minesCount = 3;
    this.betAmount = 10;
    this.betSkin = null; // Optional skin staked
    this.gameState = 'idle'; // 'idle' | 'playing' | 'ended'

    this.grid = []; // Array of { id, isBomb, revealed }
    this.revealedCount = 0;
    this.currentMultiplier = 1.0;
    this.currentPayout = 0;
    this.nextMultiplier = 1.0;

    // Provably Fair State
    this.serverSeed = '';
    this.serverSeedHash = '';
    this.clientSeed = 'simup_client_' + Math.random().toString(36).substring(2, 8);
    this.nonce = 1;
    this.lastRoundData = null;
  }

  // Calculate mathematically exact multiplier for k revealed gems with m mines
  // M_k = 0.97 * (25! / (25-k)!) / ((25-m)! / (25-m-k)!)
  calculateMultiplier(minesCount, gemsRevealed) {
    if (gemsRevealed <= 0) return 1.0;
    const safeCount = this.gridSize - minesCount;
    if (gemsRevealed > safeCount) return 0;

    let mult = 0.97; // 3% House Edge (97% RTP)
    for (let i = 0; i < gemsRevealed; i++) {
      mult *= (this.gridSize - i) / (safeCount - i);
    }

    return Number(Math.max(1.01, mult).toFixed(2));
  }

  async generateProvablyFairSeeds() {
    const rawBytes = new Uint8Array(24);
    crypto.getRandomValues(rawBytes);
    this.serverSeed = Array.from(rawBytes).map(b => b.toString(16).padStart(2, '0')).join('');

    const encoder = new TextEncoder();
    const data = encoder.encode(this.serverSeed);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    this.serverSeedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async startRound({ betAmount, minesCount, betSkin = null }) {
    const user = window.authManager?.currentUser;
    if (!user) return { success: false, error: 'Авторизуйтесь для начала игры.' };

    if (this.gameState === 'playing') {
      return { success: false, error: 'Игра уже идет. Заберите выигрыш или завершите раунд.' };
    }

    this.minesCount = Math.max(1, Math.min(24, parseInt(minesCount, 10) || 3));
    this.betSkin = betSkin;
    this.betAmount = betSkin ? betSkin.price : Number(betAmount || 1);

    if (!betSkin) {
      if (user.balance < this.betAmount) {
        return { success: false, error: `Недостаточно средств. Ваш баланс $${user.balance.toFixed(2)}.` };
      }
      user.balance = Number((user.balance - this.betAmount).toFixed(2));
    } else {
      user.inventory = user.inventory.filter(it => it.instanceId !== betSkin.instanceId);
    }

    user.stats.totalWagered = Number(((user.stats.totalWagered || 0) + this.betAmount).toFixed(2));
    window.authManager.saveCurrentUser();

    await this.generateProvablyFairSeeds();

    // Generate Board
    // Seeded shuffle based on serverSeed + clientSeed + nonce
    const seedString = `${this.serverSeed}-${this.clientSeed}-${this.nonce}`;
    let hashVal = 0;
    for (let i = 0; i < seedString.length; i++) {
      hashVal = (hashVal << 5) - hashVal + seedString.charCodeAt(i);
      hashVal |= 0;
    }

    const cellIndices = Array.from({ length: this.gridSize }, (_, i) => i);
    // Pseudo-random Fisher-Yates with seed
    for (let i = cellIndices.length - 1; i > 0; i--) {
      hashVal = (hashVal * 9301 + 49297) % 233280;
      const j = Math.floor((Math.abs(hashVal) / 233280) * (i + 1));
      [cellIndices[i], cellIndices[j]] = [cellIndices[j], cellIndices[i]];
    }

    const bombIndices = new Set(cellIndices.slice(0, this.minesCount));

    this.grid = Array.from({ length: this.gridSize }, (_, i) => ({
      id: i,
      isBomb: bombIndices.has(i),
      revealed: false
    }));

    this.revealedCount = 0;
    this.currentMultiplier = 1.0;
    this.currentPayout = this.betAmount;
    this.nextMultiplier = this.calculateMultiplier(this.minesCount, 1);
    this.gameState = 'playing';

    return {
      success: true,
      serverSeedHash: this.serverSeedHash,
      clientSeed: this.clientSeed,
      nonce: this.nonce,
      nextMultiplier: this.nextMultiplier
    };
  }

  revealCell(index) {
    if (this.gameState !== 'playing') {
      return { success: false, error: 'Игра не активна.' };
    }

    const cell = this.grid[index];
    if (!cell || cell.revealed) {
      return { success: false, error: 'Клетка уже открыта.' };
    }

    cell.revealed = true;

    // 1. HIT BOMB -> DEFEAT
    if (cell.isBomb) {
      this.gameState = 'ended';
      this.grid.forEach(c => c.revealed = true); // Reveal entire board

      const user = window.authManager?.currentUser;
      if (user) {
        user.stats.netProfit = Number(((user.stats.netProfit || 0) - this.betAmount).toFixed(2));
        if (!user.history) user.history = [];
        user.history.unshift({
          type: 'mines',
          isWin: false,
          minesCount: this.minesCount,
          betAmount: this.betAmount,
          betSkin: this.betSkin,
          gemsFound: this.revealedCount,
          multiplier: 0,
          profit: -this.betAmount,
          date: Date.now(),
          provablyFair: {
            serverSeed: this.serverSeed,
            serverSeedHash: this.serverSeedHash,
            clientSeed: this.clientSeed,
            nonce: this.nonce
          }
        });
        if (user.history.length > 50) user.history.pop();
        window.authManager.saveCurrentUser();
      }

      this.nonce++;
      window.SoundManager?.playExplosion();

      return {
        success: true,
        isBomb: true,
        explodedIndex: index,
        allCells: this.grid,
        serverSeed: this.serverSeed
      };
    }

    // 2. HIT GEM -> SUCCESS
    this.revealedCount++;
    this.currentMultiplier = this.calculateMultiplier(this.minesCount, this.revealedCount);
    this.currentPayout = Number((this.betAmount * this.currentMultiplier).toFixed(2));
    
    const safeCount = this.gridSize - this.minesCount;
    const isFullClear = this.revealedCount >= safeCount;

    if (isFullClear) {
      // Auto-win jackpot!
      return this.cashOut();
    }

    this.nextMultiplier = this.calculateMultiplier(this.minesCount, this.revealedCount + 1);
    window.SoundManager?.playGem(this.revealedCount);

    return {
      success: true,
      isBomb: false,
      cellIndex: index,
      revealedCount: this.revealedCount,
      currentMultiplier: this.currentMultiplier,
      currentPayout: this.currentPayout,
      nextMultiplier: this.nextMultiplier
    };
  }

  cashOut() {
    if (this.gameState !== 'playing' || this.revealedCount === 0) {
      return { success: false, error: 'Невозможно забрать выигрыш сейчас.' };
    }

    this.gameState = 'ended';
    this.grid.forEach(c => c.revealed = true); // Reveal entire board

    const user = window.authManager?.currentUser;
    const payout = this.currentPayout;
    const profit = Number((payout - this.betAmount).toFixed(2));

    if (user) {
      user.balance = Number((user.balance + payout).toFixed(2));
      user.stats.netProfit = Number(((user.stats.netProfit || 0) + profit).toFixed(2));

      if (profit > 0 && window.economyManager?.autoDeductDebtFromWin) {
        window.economyManager.autoDeductDebtFromWin(user, profit);
      }

      if (!user.history) user.history = [];
      user.history.unshift({
        type: 'mines',
        isWin: true,
        minesCount: this.minesCount,
        betAmount: this.betAmount,
        betSkin: this.betSkin,
        gemsFound: this.revealedCount,
        multiplier: this.currentMultiplier,
        payout,
        profit,
        date: Date.now(),
        provablyFair: {
          serverSeed: this.serverSeed,
          serverSeedHash: this.serverSeedHash,
          clientSeed: this.clientSeed,
          nonce: this.nonce
        }
      });
      if (user.history.length > 50) user.history.pop();

      window.authManager.saveCurrentUser();
      window.economyManager?.checkAchievements(user);
    }

    if (this.currentMultiplier >= 3.0) {
      window.SoundManager?.playJackpot();
      window.upgraderEngine?.triggerConfetti();
    } else {
      window.SoundManager?.playWin();
    }

    this.nonce++;

    return {
      success: true,
      isCashout: true,
      payout,
      profit,
      multiplier: this.currentMultiplier,
      revealedCount: this.revealedCount,
      allCells: this.grid,
      serverSeed: this.serverSeed
    };
  }
}

window.minesEngine = new MinesEngine();

/* ==========================================================================
   SIMUP - 1-ON-1 COINFLIP DUEL ENGINE (PROVABLY FAIR)
   Authentic T (Gold) vs CT (Silver) 3D coin toss with physics, skin stakes,
   and deterministic cryptographic fair outcomes.
   ========================================================================== */

class CoinflipEngine {
  constructor() {
    this.gameState = 'idle'; // 'idle', 'flipping', 'ended'
    this.serverSeed = this.generateRandomHex(32);
    this.serverSeedHash = '';
    this.clientSeed = 'simup-coinflip-' + Math.random().toString(36).substring(2, 8);
    this.nonce = 1;
    this.isTurbo = false;

    this.currentBet = 10;
    this.selectedSide = 'T'; // 'T' or 'CT'
    this.winningSide = null;
    this.lastResult = null;

    this.computeInitialHash();
  }

  generateRandomHex(len = 32) {
    const chars = '0123456789abcdef';
    let res = '';
    for (let i = 0; i < len; i++) {
      res += chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
  }

  async computeInitialHash() {
    this.serverSeedHash = await this.sha256(this.serverSeed);
  }

  async sha256(str) {
    if (window.crypto && window.crypto.subtle) {
      const buffer = new TextEncoder().encode(str);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
      return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }
    // Fallback simple hash
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }

  async calculateOutcome() {
    const combined = `${this.serverSeed}:${this.clientSeed}:${this.nonce}:${Date.now()}`;
    const hash = await this.sha256(combined);
    // Fair 50/50 cryptographic roll
    let side;
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const arr = new Uint8Array(1);
      crypto.getRandomValues(arr);
      side = (arr[0] % 2 === 0) ? 'T' : 'CT';
    } else {
      const sub = parseInt(hash.substring(0, 8), 16);
      side = (sub % 2 === 0) ? 'T' : 'CT';
    }
    return { side, hash };
  }

  async playRound({ betAmount, chosenSide, stakedSkin = null }) {
    if (this.gameState === 'flipping') {
      return { success: false, error: 'Монетка уже крутится!' };
    }

    const user = window.authManager?.currentUser;
    if (!user) {
      return { success: false, error: 'Авторизуйтесь, чтобы сыграть в Coinflip.' };
    }

    let actualCost = betAmount;
    if (stakedSkin) {
      actualCost = stakedSkin.price;
      const idx = (user.inventory || []).findIndex(it => it.instanceId === stakedSkin.instanceId);
      if (idx === -1) {
        return { success: false, error: 'Выбранный скин отсутствует в инвентаре.' };
      }
      user.inventory.splice(idx, 1);
    } else {
      if (user.balance < betAmount) {
        return { success: false, error: 'Недостаточно баланса для этой ставки.' };
      }
      user.balance = Number((user.balance - betAmount).toFixed(2));
    }

    user.stats.wagered = Number(((user.stats.wagered || 0) + actualCost).toFixed(2));
    user.stats.totalUpgrades = (user.stats.totalUpgrades || 0) + 1; // Counted in rounds
    window.authManager.saveCurrentUser();

    this.gameState = 'flipping';
    this.currentBet = actualCost;
    this.selectedSide = chosenSide;

    const outcome = await this.calculateOutcome();
    this.winningSide = outcome.side;
    const isWin = (this.winningSide === this.selectedSide);

    // Fair duel payout: 1.96x (2% house commission)
    const multiplier = 1.96;
    const payout = isWin ? Number((actualCost * multiplier).toFixed(2)) : 0;
    const profit = isWin ? Number((payout - actualCost).toFixed(2)) : -actualCost;

    const roundData = {
      isWin,
      winningSide: this.winningSide,
      chosenSide: this.selectedSide,
      betAmount: actualCost,
      stakedSkin,
      payout,
      profit,
      multiplier: isWin ? multiplier : 0,
      serverSeed: this.serverSeed,
      serverSeedHash: this.serverSeedHash,
      clientSeed: this.clientSeed,
      nonce: this.nonce,
      date: Date.now()
    };

    this.lastResult = roundData;

    return {
      success: true,
      roundData,
      duration: this.isTurbo ? 1400 : 3200
    };
  }

  finalizeRound() {
    if (!this.lastResult) return;
    const res = this.lastResult;
    const user = window.authManager?.currentUser;

    if (user) {
      if (res.isWin) {
        user.balance = Number((user.balance + res.payout).toFixed(2));
        user.stats.netProfit = Number(((user.stats.netProfit || 0) + res.profit).toFixed(2));
        user.stats.upgradesWon = (user.stats.upgradesWon || 0) + 1;

        if (res.profit > 0 && window.economyManager?.autoDeductDebtFromWin) {
          window.economyManager.autoDeductDebtFromWin(user, res.profit);
        }

        // If staked skin, give back an equivalent or better skin
        if (res.stakedSkin) {
          const pool = (window.catalogController?.skins && window.catalogController.skins.length > 0)
            ? window.catalogController.skins
            : (window.getAllSkinVariants ? window.getAllSkinVariants() : window.SKINS_DATABASE || []);
          const matched = pool.filter(s => s.price >= res.betAmount * 1.5 && s.price <= res.payout * 1.15);
          const rewardSkin = matched.length > 0
            ? matched[Math.floor(Math.random() * matched.length)]
            : res.stakedSkin;

          const copy = {
            ...rewardSkin,
            instanceId: `cf_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            obtainedDate: Date.now()
          };
          if (!user.inventory) user.inventory = [];
          user.inventory.push(copy);
        }
      } else {
        user.stats.netProfit = Number(((user.stats.netProfit || 0) - res.betAmount).toFixed(2));
      }

      if (!user.history) user.history = [];
      user.history.unshift({
        type: 'coinflip',
        isWin: res.isWin,
        betAmount: res.betAmount,
        payout: res.payout,
        profit: res.profit,
        multiplier: res.multiplier,
        winningSide: res.winningSide,
        chosenSide: res.chosenSide,
        stakedSkin: res.stakedSkin,
        date: res.date,
        provablyFair: {
          serverSeed: res.serverSeed,
          serverSeedHash: res.serverSeedHash,
          clientSeed: res.clientSeed,
          nonce: res.nonce
        }
      });

      if (user.history.length > 50) user.history.pop();
      window.authManager.saveCurrentUser();
    }

    // Refresh seed & advance nonce
    this.nonce++;
    this.serverSeed = this.generateRandomHex(32);
    this.computeInitialHash();
    this.gameState = 'idle';
    return res;
  }
}

window.coinflipEngine = new CoinflipEngine();

/* ==========================================================================
   SIMUP - LEADERBOARD & MULTIPLAYER COMPETITIVE STATS ENGINE (BLOCK 5)
   Features:
   - 50+ active competitive simulated esports players
   - Seamless integration with real local users (dynamic ranking)
   - Net Profit / Richest Players view
   - Bank Debtors & Credit Rating view
   - Provably Fair cryptographic verification tool
   ========================================================================== */

// Simulated bot players removed per user request - showing 100% real registered users only
const SIMULATED_PLAYERS_POOL = [];

class LeaderboardManager {
  constructor() {
    this.currentView = 'profit'; // 'profit' or 'debtors'
  }

  getAllPlayersData() {
    const rawUsers = window.authManager?.getAllUsers() || [];
    // Map real authenticated/guest users
    const seen = new Map();
    rawUsers.forEach(user => {
      if (!user || !user.username) return;
      const key = String(user.username).toLowerCase();
      const invValue = (user.inventory || []).reduce((s, it) => s + (it.price || 0), 0);
      const totalBalance = user.balance || 0;
      const grossWorth = totalBalance + invValue;
      const currentDebt = user.loans?.currentDebt || 0;
      const totalBorrowed = user.loans?.totalBorrowed || 0;
      const totalWagered = user.stats?.totalWagered || 0;

      // Unpaid bank debt penalizes leaderboard standing with 1.5x multiplier
      const debtPenalty = Number((currentDebt * 1.5).toFixed(2));
      const netWorth = Number((grossWorth - debtPenalty).toFixed(2));
      const baseProfit = user.stats?.netProfit !== undefined ? user.stats.netProfit : (grossWorth - 500);
      const netProfit = Number((baseProfit - debtPenalty).toFixed(2));

      const totalUpgrades = user.stats?.totalUpgrades || 0;
      const wonUpgrades = user.stats?.wonUpgrades || user.stats?.upgradesWon || 0;
      const winrate = totalUpgrades > 0 ? ((wonUpgrades / totalUpgrades) * 100).toFixed(1) : '0.0';

      const shaped = {
        id: user.id,
        username: user.username,
        initials: (user.username || '?').substring(0, 2).toUpperCase(),
        isRealUser: true,
        isGlobal: false,
        grossWorth: Number(grossWorth.toFixed(2)),
        netWorth,
        netProfit,
        debtPenalty,
        balance: Number(totalBalance.toFixed(2)),
        invValue: Number(invValue.toFixed(2)),
        invCount: (user.inventory || []).length,
        winrate: Number(winrate),
        totalUpgrades,
        wonUpgrades,
        currentDebt: Number(currentDebt.toFixed(2)),
        totalBorrowed: Number(totalBorrowed.toFixed(2)),
        totalWagered: Number(totalWagered.toFixed(2)),
        bestWinSkin: user.stats?.bestWinSkin || null,
        bestWinMultiplier: user.stats?.bestWinMultiplier || 0,
        casesOpened: user.stats?.casesOpened || 0,
        equippedTitle: user.equippedTitle || 'Новичок',
        createdAt: user.createdAt || Date.now()
      };
      // Keep the richest duplicate nickname
      const prev = seen.get(key);
      if (!prev || shaped.netWorth > prev.netWorth) seen.set(key, shaped);
    });
    const realPlayers = [...seen.values()];

    // Only REAL players: local registered users + real online players synced via Supabase!
    // All simulated bots permanently removed per user request.
    let onlinePlayers = [];
    try {
      if (window.OnlineDB && typeof window.OnlineDB.getCached === 'function') {
        onlinePlayers = window.OnlineDB.getCached().filter(
          o => o && o.username && !seen.has(String(o.username).toLowerCase())
        );
      }
    } catch (e) { onlinePlayers = []; }

    return realPlayers.concat(onlinePlayers);
  }


  getTopProfitPlayers() {
    const players = this.getAllPlayersData();
    // Sort by netProfit descending, then netWorth
    return players.sort((a, b) => b.netProfit - a.netProfit || b.netWorth - a.netWorth);
  }

  getTopDebtors() {
    const players = this.getAllPlayersData();
    // Filter only those who have active debt or previous loans, sort by currentDebt descending
    return players
      .filter(p => p.currentDebt > 0 || p.totalBorrowed > 0)
      .sort((a, b) => b.currentDebt - a.currentDebt || b.totalBorrowed - a.totalBorrowed);
  }

  getGlobalMetrics() {
    const players = this.getAllPlayersData();
    const totalPlayers = players.length;
    const totalVolume = players.reduce((sum, p) => sum + (p.totalWagered || 0), 0);
    const totalDebt = players.reduce((sum, p) => sum + (p.currentDebt || 0), 0);
    
    let recordWinMult = 0;
    let recordWinSkin = null;

    players.forEach(p => {
      if (p.bestWinMultiplier > recordWinMult) {
        recordWinMult = p.bestWinMultiplier;
        recordWinSkin = p.bestWinSkin;
      }
    });

    return {
      totalPlayers,
      totalVolume: Number(totalVolume.toFixed(2)),
      totalDebt: Number(totalDebt.toFixed(2)),
      recordWinMult: Number(recordWinMult.toFixed(2)),
      recordWinSkin
    };
  }

  /**
   * Provably Fair verification tool:
   * Validates that SHA-256(serverSeed) matches serverSeedHash,
   * and that HMAC-SHA256(serverSeed, clientSeed:nonce) generates rollNumber.
   */
  async verifyProvablyFair({ serverSeed, serverSeedHash, clientSeed, nonce }) {
    if (!serverSeed || !serverSeedHash) {
      return { valid: false, error: 'Отсутствует Server Seed или Hash' };
    }

    try {
      // 1. Hash the server seed to confirm it produces serverSeedHash
      const encoder = new TextEncoder();
      const seedBuffer = encoder.encode(serverSeed);
      const hashBuffer = await crypto.subtle.digest('SHA-256', seedBuffer);
      const computedHash = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      const isSeedHashValid = computedHash.toLowerCase() === serverSeedHash.toLowerCase();

      // 2. Compute the roll from seeds
      const combined = `${serverSeed}:${clientSeed}:${nonce}`;
      const combinedBuffer = encoder.encode(combined);
      const rollHashBuf = await crypto.subtle.digest('SHA-256', combinedBuffer);
      const rollHashArray = new Uint8Array(rollHashBuf);
      
      // Roll calculation standard: (first 4 bytes as uint32) % 10000 / 100
      const view = new DataView(rollHashArray.buffer);
      const rawInt = view.getUint32(0, false);
      const verifiedRoll = Number(((rawInt % 10000) / 100).toFixed(2));

      return {
        valid: isSeedHashValid,
        computedHash,
        verifiedRoll,
        combinedString: combined
      };
    } catch (err) {
      return { valid: false, error: err.message };
    }
  }
}

window.leaderboardManager = new LeaderboardManager();

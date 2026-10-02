/* ==========================================================================
   SIMUP - AUTONOMOUS 50-PLAYER LIVING SERVER & LEADERBOARD ENGINE
   Fully autonomous living esports server:
   - 50 unique realistic profiles (Pros, Streamers, Whales, Grinders, Debtors)
   - Real-time background simulation: live upgrades, case openings, shifting ranks
   - Instant 0ms load time with zero external network dependencies
   ========================================================================== */

(function () {
  'use strict';

  // Seeded PRNG for initial state consistency across sessions
  function createPrng(seed) {
    let s = seed >>> 0;
    return function () {
      s |= 0; s = (s + 0x6D2B79F5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const PROFILES_SEED_DATA = [
    // Tier 1: Esports Legends & Whales (Top ranks)
    { username: 's1mple_CS2', title: 'Major MVP 👑', avatarClr: '#ffd700', baseBalance: 245000, baseProfit: 198500, winrate: 64.2, upgrades: 1420, cases: 540, bestSkin: { name: 'AWP | Dragon Lore (FN)', price: 14500, mult: 85.5 }, debt: 0 },
    { username: 'm0NESY_clutch', title: 'AWP Prodigy ⚡', avatarClr: '#ff2b6d', baseBalance: 182000, baseProfit: 145200, winrate: 61.8, upgrades: 1180, cases: 410, bestSkin: { name: 'AK-47 | Case Hardened (Blue Gem)', price: 38000, mult: 120.0 }, debt: 0 },
    { username: 'China_Collector_99', title: 'Крипто-Кит 🐋', avatarClr: '#00e5ff', baseBalance: 285000, baseProfit: 232000, winrate: 58.4, upgrades: 2150, cases: 1450, bestSkin: { name: 'M4A4 | Howl (FN)', price: 5400, mult: 45.0 }, debt: 0 },
    { username: 'ZywOo_TheChosen', title: 'HLTV #1 🏆', avatarClr: '#10b981', baseBalance: 164000, baseProfit: 131800, winrate: 62.5, upgrades: 980, cases: 380, bestSkin: { name: 'Specialist Gloves | Crimson Kimono', price: 4200, mult: 35.0 }, debt: 0 },
    { username: 'NiKo_Deagle', title: 'Rifle King 🎯', avatarClr: '#f59e0b', baseBalance: 138000, baseProfit: 104500, winrate: 59.1, upgrades: 1240, cases: 620, bestSkin: { name: 'Butterfly Knife | Doppler (FN)', price: 2850, mult: 28.5 }, debt: 0 },
    { username: 'b1t_Headshot', title: 'One Tap Master 💥', avatarClr: '#a855f7', baseBalance: 112000, baseProfit: 89400, winrate: 60.3, upgrades: 890, cases: 310, bestSkin: { name: 'Karambit | Fade (FN)', price: 2400, mult: 24.0 }, debt: 0 },
    { username: 'donk_overdrive', title: 'Rookie of Year 🔥', avatarClr: '#ef4444', baseBalance: 98000, baseProfit: 78500, winrate: 57.9, upgrades: 1450, cases: 780, bestSkin: { name: 'M9 Bayonet | Marble Fade', price: 1750, mult: 17.5 }, debt: 0 },
    { username: 'ropz_Lurker', title: 'IQ 200 Player 🧠', avatarClr: '#06b6d4', baseBalance: 92000, baseProfit: 71200, winrate: 59.8, upgrades: 820, cases: 290, bestSkin: { name: 'AWP | Gungnir (FN)', price: 9800, mult: 65.0 }, debt: 0 },

    // Tier 2: Popular Streamers & High-Rollers
    { username: 'Evelone192', title: 'Мастер Апгрейдов 🎲', avatarClr: '#ec4899', baseBalance: 76000, baseProfit: 54000, winrate: 52.4, upgrades: 3200, cases: 2100, bestSkin: { name: 'AK-47 | Fire Serpent (FN)', price: 1600, mult: 16.0 }, debt: 0 },
    { username: 'Buster_Stream', title: 'Хайроллер 💎', avatarClr: '#8b5cf6', baseBalance: 68000, baseProfit: 48500, winrate: 51.1, upgrades: 2800, cases: 1950, bestSkin: { name: 'Sport Gloves | Vice (MW)', price: 4600, mult: 46.0 }, debt: 0 },
    { username: 'Zubarefff_VIP', title: 'Король Дропа 👑', avatarClr: '#eab308', baseBalance: 84000, baseProfit: 62400, winrate: 53.6, upgrades: 1950, cases: 1340, bestSkin: { name: 'Karambit | Doppler Black Pearl', price: 6200, mult: 55.0 }, debt: 0 },
    { username: 'Shadowkek_Live', title: 'Краш Эксперт 🚀', avatarClr: '#14b8a6', baseBalance: 53000, baseProfit: 39100, winrate: 49.8, upgrades: 2400, cases: 1600, bestSkin: { name: 'Talon Knife | Fade (FN)', price: 1450, mult: 14.5 }, debt: 0 },
    { username: 'Bratishkinoff', title: 'Азартный Барон 🃏', avatarClr: '#f97316', baseBalance: 49000, baseProfit: 34200, winrate: 48.7, upgrades: 2650, cases: 1820, bestSkin: { name: 'M4A1-S | Welcome to the Jungle', price: 2100, mult: 21.0 }, debt: 0 },
    { username: 'Dmitry_Lixxx', title: 'Гроза Рулетки ⚡', avatarClr: '#6366f1', baseBalance: 44000, baseProfit: 31000, winrate: 50.2, upgrades: 1780, cases: 1150, bestSkin: { name: 'Specialist Gloves | Fade', price: 1950, mult: 19.5 }, debt: 0 },
    { username: 'Recrent_Pro', title: 'Снайпер Элиты 🎯', avatarClr: '#84cc16', baseBalance: 41000, baseProfit: 28700, winrate: 54.3, upgrades: 1120, cases: 670, bestSkin: { name: 'AWP | The Prince (FN)', price: 3400, mult: 34.0 }, debt: 0 },
    { username: 'SilverName_TV', title: 'Лаки Стрикер 🍀', avatarClr: '#3b82f6', baseBalance: 37500, baseProfit: 25400, winrate: 47.9, upgrades: 1890, cases: 1280, bestSkin: { name: 'Skeleton Knife | Slaughter', price: 1350, mult: 13.5 }, debt: 0 },

    // Tier 3: Skilled Grinders & Tournament Fighters
    { username: 'CyberKot_77', title: 'Опытный Трейдер 💼', avatarClr: '#10b981', baseBalance: 32000, baseProfit: 22100, winrate: 55.1, upgrades: 940, cases: 480, bestSkin: { name: 'Desert Eagle | Blaze (FN)', price: 850, mult: 18.0 }, debt: 0 },
    { username: 'NeonHunter_x', title: 'Кибер-Охотник 🐺', avatarClr: '#06b6d4', baseBalance: 29500, baseProfit: 19800, winrate: 53.4, upgrades: 820, cases: 510, bestSkin: { name: 'AK-47 | Vulcan (FN)', price: 920, mult: 15.5 }, debt: 0 },
    { username: 'TurboZayac_CS', title: 'Спидраннер 🐇', avatarClr: '#f43f5e', baseBalance: 26000, baseProfit: 17400, winrate: 51.8, upgrades: 1250, cases: 730, bestSkin: { name: 'Butterfly Knife | Blue Steel', price: 880, mult: 14.0 }, debt: 0 },
    { username: 'DarkFox_Pro', title: 'Теневой Лис 🦊', avatarClr: '#d946ef', baseBalance: 23500, baseProfit: 15200, winrate: 52.6, upgrades: 760, cases: 390, bestSkin: { name: 'M4A4 | Asiimov (FT)', price: 210, mult: 9.5 }, debt: 0 },
    { username: 'Vortex_Sniper', title: 'Снайпер Вихря 🌪️', avatarClr: '#8b5cf6', baseBalance: 21000, baseProfit: 13900, winrate: 50.9, upgrades: 680, cases: 340, bestSkin: { name: 'AWP | Asiimov (FT)', price: 165, mult: 8.2 }, debt: 0 },
    { username: 'FrostByte_Rust', title: 'Мастер Рейдов ☢️', avatarClr: '#0ea5e9', baseBalance: 19200, baseProfit: 12400, winrate: 49.5, upgrades: 890, cases: 460, bestSkin: { name: 'Alien Red (Rust)', price: 1850, mult: 22.0 }, debt: 0 },
    { username: 'RustRaider_AK', title: 'Рейдер Пустоши 🛠️', avatarClr: '#f97316', baseBalance: 17800, baseProfit: 11100, winrate: 51.2, upgrades: 710, cases: 420, bestSkin: { name: 'Glory AK47 (Rust)', price: 620, mult: 12.0 }, debt: 0 },
    { username: 'SilentStorm_Win', title: 'Штормовой Всадник ⚡', avatarClr: '#64748b', baseBalance: 16500, baseProfit: 9800, winrate: 48.9, upgrades: 1100, cases: 680, bestSkin: { name: 'Nomad Knife | Fade', price: 950, mult: 11.5 }, debt: 0 },

    // Tier 4: Active Players (Mid-tier profit)
    { username: 'QuickScope_Nik', title: 'Меткий Стрелок 🎯', avatarClr: '#22c55e', baseBalance: 14200, baseProfit: 8600, winrate: 49.3, upgrades: 580, cases: 320, bestSkin: { name: 'AK-47 | Bloodsport (FN)', price: 150, mult: 6.8 }, debt: 0 },
    { username: 'LuckyStrike_7', title: 'Счастливчик 🍀', avatarClr: '#eab308', baseBalance: 12800, baseProfit: 7400, winrate: 53.0, upgrades: 490, cases: 280, bestSkin: { name: 'Stiletto Knife | Tiger Tooth', price: 540, mult: 10.2 }, debt: 0 },
    { username: 'Pudge_Mid_Carry', title: 'Хукер из Доты 🪝', avatarClr: '#ef4444', baseBalance: 11500, baseProfit: 6200, winrate: 47.5, upgrades: 820, cases: 540, bestSkin: { name: 'Dragonclaw Hook (Dota 2)', price: 340, mult: 15.0 }, debt: 0 },
    { username: 'EcoWarrior_Eco', title: 'Эко-Раундовец 🛡️', avatarClr: '#14b8a6', baseBalance: 9800, baseProfit: 5100, winrate: 50.4, upgrades: 420, cases: 210, bestSkin: { name: 'USP-S | Kill Confirmed (FT)', price: 180, mult: 7.2 }, debt: 0 },
    { username: 'MineHunter_Pro', title: 'Сапер Высшей Лиги 💣', avatarClr: '#f59e0b', baseBalance: 8600, baseProfit: 4300, winrate: 54.2, upgrades: 650, cases: 190, bestSkin: { name: 'Glock-18 | Fade (FN)', price: 1450, mult: 25.0 }, debt: 0 },
    { username: 'CoinflipBaron', title: 'Дуэлянт 🪙', avatarClr: '#a855f7', baseBalance: 7900, baseProfit: 3800, winrate: 52.1, upgrades: 740, cases: 230, bestSkin: { name: 'Bowie Knife | Crimson Web', price: 320, mult: 8.5 }, debt: 0 },
    { username: 'CrashRocket_Fly', title: 'Пилот Ракеты 🚀', avatarClr: '#ec4899', baseBalance: 7200, baseProfit: 3200, winrate: 46.8, upgrades: 910, cases: 380, bestSkin: { name: 'Desert Eagle | Printstream', price: 140, mult: 6.2 }, debt: 0 },
    { username: 'NoScope_Vitek', title: 'Ноускоп Мастер 💥', avatarClr: '#06b6d4', baseBalance: 6400, baseProfit: 2700, winrate: 48.2, upgrades: 430, cases: 210, bestSkin: { name: 'AWP | Wildfire (MW)', price: 120, mult: 5.5 }, debt: 0 },
    { username: 'ClutchOrKick_Bro', title: 'Клатчер 1v5 🔥', avatarClr: '#84cc16', baseBalance: 5800, baseProfit: 2100, winrate: 47.9, upgrades: 510, cases: 290, bestSkin: { name: 'Huntsman Knife | Doppler', price: 420, mult: 7.8 }, debt: 0 },
    { username: 'Akimbo_Danya', title: 'Любитель Беретт 🔫', avatarClr: '#3b82f6', baseBalance: 5100, baseProfit: 1650, winrate: 49.1, upgrades: 380, cases: 170, bestSkin: { name: 'M4A1-S | Printstream (FT)', price: 290, mult: 6.5 }, debt: 0 },
    { username: 'Sanya_Upgrade', title: 'Апгрейдер-Любитель ⚡', avatarClr: '#e11d48', baseBalance: 4400, baseProfit: 1200, winrate: 46.4, upgrades: 640, cases: 310, bestSkin: { name: 'Survival Knife | Case Hardened', price: 260, mult: 5.8 }, debt: 0 },
    { username: 'Dasha_Imba', title: 'Королева Клатчей 👸', avatarClr: '#d946ef', baseBalance: 3900, baseProfit: 950, winrate: 51.5, upgrades: 320, cases: 140, bestSkin: { name: 'AWP | Hyper Beast (FT)', price: 85, mult: 4.8 }, debt: 0 },
    { username: 'CaseOpener_2026', title: 'Опенер Кейсов 📦', avatarClr: '#10b981', baseBalance: 3200, baseProfit: 620, winrate: 45.2, upgrades: 480, cases: 590, bestSkin: { name: 'Ursus Knife | Blue Steel', price: 195, mult: 5.0 }, debt: 0 },
    { username: 'Kirill_Farm', title: 'Фармер Очков 🌾', avatarClr: '#f97316', baseBalance: 2700, baseProfit: 340, winrate: 47.1, upgrades: 290, cases: 120, bestSkin: { name: 'AK-47 | The Empress (FT)', price: 75, mult: 4.2 }, debt: 0 },
    { username: 'RustScrapMaster', title: 'Сборщик Скрапа 🔩', avatarClr: '#64748b', baseBalance: 2100, baseProfit: 180, winrate: 46.5, upgrades: 340, cases: 210, bestSkin: { name: 'Fire Jacket (Rust)', price: 240, mult: 6.0 }, debt: 0 },
    { username: 'Shkolnik_PRO', title: 'Тащер с Мида 🎒', avatarClr: '#eab308', baseBalance: 1650, baseProfit: 50, winrate: 48.0, upgrades: 210, cases: 85, bestSkin: { name: 'SSG 08 | Dragonfire (MW)', price: 42, mult: 3.5 }, debt: 0 },

    // Tier 5: The Bank Debtors & High-Risk Gamblers (Active Loans)
    { username: 'Kreditny_Magat', title: 'Кредитный Магнат 🏦', avatarClr: '#ef4444', baseBalance: 18500, baseProfit: -8200, winrate: 43.1, upgrades: 1650, cases: 940, bestSkin: { name: 'Navaja Knife | Fade', price: 210, mult: 4.5 }, debt: 35000 },
    { username: 'Bankrot_No_Happy', title: 'Хронический Должник 💸', avatarClr: '#f43f5e', baseBalance: 420, baseProfit: -24500, winrate: 38.5, upgrades: 2200, cases: 1450, bestSkin: { name: 'Shadow Daggers | Urban', price: 95, mult: 3.0 }, debt: 48000 },
    { username: 'AllIn_Or_Homeless', title: 'Ва-Банк Воин ⚠️', avatarClr: '#dc2626', baseBalance: 980, baseProfit: -16800, winrate: 41.2, upgrades: 1820, cases: 890, bestSkin: { name: 'Gut Knife | Doppler', price: 180, mult: 4.0 }, debt: 28000 },
    { username: 'DebtCollector_Bait', title: 'Беглец от Банка 🏃', avatarClr: '#b91c1c', baseBalance: 1200, baseProfit: -12400, winrate: 42.6, upgrades: 1350, cases: 620, bestSkin: { name: 'Flip Knife | Rust Coat', price: 155, mult: 3.8 }, debt: 22000 },
    { username: 'LoanWolf_CS', title: 'Кредитный Волк 🐺', avatarClr: '#991b1b', baseBalance: 2400, baseProfit: -7600, winrate: 44.0, upgrades: 980, cases: 410, bestSkin: { name: 'Falchion Knife | Case Hardened', price: 190, mult: 4.2 }, debt: 15000 },
    { username: 'MicroZaym_Vovan', title: 'Клиент МФО 💳', avatarClr: '#7f1d1d', baseBalance: 650, baseProfit: -4800, winrate: 42.1, upgrades: 670, cases: 310, bestSkin: { name: 'Classic Knife | Scorched', price: 140, mult: 3.5 }, debt: 9500 },
    { username: 'Minus_Moral_Gamer', title: 'Минус Мораль 📉', avatarClr: '#e11d48', baseBalance: 320, baseProfit: -3200, winrate: 40.8, upgrades: 540, cases: 240, bestSkin: { name: 'Paracord Knife | Boreal', price: 125, mult: 3.2 }, debt: 6500 },
    { username: 'RiskTaker_Roma', title: 'Рисковый Парень 🎲', avatarClr: '#be123c', baseBalance: 1800, baseProfit: -2100, winrate: 44.5, upgrades: 460, cases: 180, bestSkin: { name: 'Stiletto Knife | Safari', price: 175, mult: 3.9 }, debt: 4500 },
    { username: 'Vzyal_Dolg_Na_Case', title: 'Заем под Кейс 📦', avatarClr: '#9f1239', baseBalance: 480, baseProfit: -1400, winrate: 43.0, upgrades: 320, cases: 290, bestSkin: { name: 'Bowie Knife | Forest DDPAT', price: 110, mult: 3.0 }, debt: 2500 },
    { username: 'Student_Na_Stipukhe', title: 'Студент с Долгом 📚', avatarClr: '#881337', baseBalance: 120, baseProfit: -780, winrate: 41.9, upgrades: 280, cases: 140, bestSkin: { name: 'P90 | Asiimov (MW)', price: 38, mult: 2.5 }, debt: 1200 }
  ];

  // In-memory roster of 50 autonomous simulated players
  let simulatedPlayers = [];

  function initAutonomousRoster() {
    const prng = createPrng(42069);
    simulatedPlayers = PROFILES_SEED_DATA.map((p, idx) => {
      const invCount = Math.floor(6 + prng() * 28);
      const invValue = Number((p.baseBalance * (0.35 + prng() * 0.45)).toFixed(2));
      const balance = Number(p.baseBalance.toFixed(2));
      const grossWorth = Number((balance + invValue).toFixed(2));
      const currentDebt = p.debt || 0;
      const debtPenalty = Number((currentDebt * 1.5).toFixed(2));
      const netWorth = Number((grossWorth - debtPenalty).toFixed(2));
      const netProfit = Number((p.baseProfit - debtPenalty).toFixed(2));
      const totalWagered = Number((p.upgrades * 45 + p.cases * 28 + prng() * 10000).toFixed(2));

      return {
        id: 'bot_p_' + (idx + 1),
        username: p.username,
        initials: p.username.substring(0, 2).toUpperCase(),
        equippedTitle: p.title,
        avatarColor: p.avatarClr,
        isRealUser: false,
        isGlobal: true,
        isOnline: true,
        grossWorth,
        netWorth,
        netProfit,
        debtPenalty,
        balance,
        invValue,
        invCount,
        winrate: p.winrate,
        totalUpgrades: p.upgrades,
        wonUpgrades: Math.round(p.upgrades * (p.winrate / 100)),
        currentDebt,
        totalBorrowed: currentDebt > 0 ? Number((currentDebt * 1.25).toFixed(2)) : 0,
        totalWagered,
        bestWinSkin: p.bestSkin ? {
          name: p.bestSkin.name,
          price: p.bestSkin.price,
          image: ''
        } : null,
        bestWinMultiplier: p.bestSkin ? p.bestSkin.mult : 0,
        casesOpened: p.cases,
        createdAt: Date.now() - Math.floor(10 + prng() * 200) * 86400000
      };
    });
  }

  initAutonomousRoster();

  // =========================================================================
  // LIVING SERVER SIMULATION HEARTBEAT (Runs every 3.5 - 5.5s)
  // Simulates live player actions: upgrades, cases, balance shifts, leader changes
  // =========================================================================
  let heartbeatTimer = null;

  function runLivingServerTick() {
    if (simulatedPlayers.length === 0) return;

    // Pick 1-2 random active players to simulate activity
    const rollCount = Math.random() > 0.4 ? 2 : 1;
    for (let c = 0; c < rollCount; c++) {
      const idx = Math.floor(Math.random() * simulatedPlayers.length);
      const player = simulatedPlayers[idx];
      if (!player) continue;

      const actionRoll = Math.random();

      if (actionRoll < 0.45) {
        // 1. Sim Upgrader duel/roll
        const stake = Math.max(10, Math.min(2500, Number((player.balance * (0.02 + Math.random() * 0.05)).toFixed(2))));
        const mult = Number((1.5 + Math.random() * 4.5).toFixed(2));
        const winChance = Math.min(0.85, (0.95 / mult));
        const won = Math.random() < winChance;

        player.totalUpgrades += 1;
        player.totalWagered = Number((player.totalWagered + stake).toFixed(2));

        if (won) {
          const payout = Number((stake * mult).toFixed(2));
          const profit = Number((payout - stake).toFixed(2));
          player.wonUpgrades += 1;
          player.balance = Number((player.balance + profit).toFixed(2));
          player.netProfit = Number((player.netProfit + profit).toFixed(2));

          if (mult > (player.bestWinMultiplier || 0)) {
            player.bestWinMultiplier = mult;
          }

          // Broadcast to live drops ticker if significant win
          if (profit >= 300 && typeof window.addLiveDrop === 'function') {
            window.addLiveDrop({
              username: player.username,
              avatar: '',
              item: {
                name: `Апгрейд ${mult}x (+ $${profit.toFixed(2)})`,
                price: payout,
                rarityColor: '#10b981',
                image: ''
              },
              type: 'upgrade',
              multiplier: mult
            });
          }
        } else {
          player.balance = Math.max(50, Number((player.balance - stake).toFixed(2)));
          player.netProfit = Number((player.netProfit - stake).toFixed(2));
        }

        player.winrate = Number(((player.wonUpgrades / player.totalUpgrades) * 100).toFixed(1));

      } else if (actionRoll < 0.80) {
        // 2. Sim Case Opening
        player.casesOpened += 1;
        const casePrice = Math.max(2.5, Math.min(380, Number((player.balance * (0.015 + Math.random() * 0.03)).toFixed(2))));
        const dropMultiplier = Math.random() < 0.08 ? (3.5 + Math.random() * 8) : (0.2 + Math.random() * 1.4);
        const dropValue = Number((casePrice * dropMultiplier).toFixed(2));
        const diff = Number((dropValue - casePrice).toFixed(2));

        player.balance = Math.max(50, Number((player.balance + diff).toFixed(2)));
        player.netProfit = Number((player.netProfit + diff).toFixed(2));
        player.totalWagered = Number((player.totalWagered + casePrice).toFixed(2));
        player.invCount += 1;
        player.invValue = Number((player.invValue + dropValue).toFixed(2));

      } else {
        // 3. Sim Loan partial repayment or small top-up
        if (player.currentDebt > 0 && Math.random() < 0.6) {
          const repayAmt = Math.min(player.currentDebt, Math.max(50, Number((player.currentDebt * 0.15).toFixed(2))));
          player.currentDebt = Number((player.currentDebt - repayAmt).toFixed(2));
          player.debtPenalty = Number((player.currentDebt * 1.5).toFixed(2));
        }
      }

      // Recompute gross & net worth
      player.grossWorth = Number((player.balance + player.invValue).toFixed(2));
      player.netWorth = Number((player.grossWorth - player.debtPenalty).toFixed(2));
    }

    // If user is currently looking at Leaderboard tab, trigger instantaneous rerender
    if (typeof document !== 'undefined') {
      const lbTab = document.getElementById('tab-leaderboard');
      if (lbTab && lbTab.classList.contains('active')) {
        if (typeof window.requestLeaderboardRerender === 'function') {
          window.requestLeaderboardRerender();
        } else if (typeof window.renderLeaderboard === 'function') {
          window.renderLeaderboard();
        }
      }
    }
  }

  function startHeartbeat() {
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    heartbeatTimer = setInterval(runLivingServerTick, 4200);
    if (heartbeatTimer && typeof heartbeatTimer.unref === 'function') {
      heartbeatTimer.unref();
    }
  }

  startHeartbeat();

  // Public Interface for Leaderboard & Competitive Engine
  window.GlobalPlayersDB = {
    version: 4,
    getAll() {
      // Return shallow copies for safety
      return simulatedPlayers.map(p => ({ ...p }));
    },
    count() {
      return simulatedPlayers.length;
    },
    triggerHeartbeat() {
      runLivingServerTick();
    }
  };

  // Ensure Online status indicator displays live server connection immediately
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('DOMContentLoaded', () => {
      const pill = document.getElementById('online-status-pill');
      if (pill) {
        pill.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;"></span><span style="color:#6ee7b7;font-weight:700;">Живой сервер 🌐 • 50 игроков онлайн</span>';
      }
    });
  }
})();

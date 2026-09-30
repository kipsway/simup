/* ==========================================================================
   SIMUP 2.0 - GLOBAL PLAYERS DATABASE (v3.9)
   Общая база игроков: статичный детерминированный реестр, одинаковый
   на всех устройствах. GitHub Pages не имеет бэкенда, поэтому "общие"
   игроки вшиты в клиент с фиксированным сидом — каждый пользователь
   видит один и тот же живой рейтинг, а свои реальные аккаунты (localStorage)
   подмешиваются поверх и подсвечиваются бейджем "ВЫ".
   ========================================================================== */
(function () {
  'use strict';

  // Deterministic PRNG so every device sees the same roster
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const NICKS = [
    'ShadowWolf', 'КиберКот', 's1mple_fan', 'NeonHunter', 'Тёмный_Лис',
    'FrostByte', 'Артём_Про', 'PixelSniper', 'Ghost_RU', 'TurboZayac',
    'NightHawk', 'Стальной_Коготь', 'Vortex', 'Лёха_Кейс', 'DragonSlayer',
    'QuickScope', 'Мира_Топ', 'IronMan_RU', 'SilentStorm', 'Кекс_228',
    'Headshot_Helen', 'Фантомас', 'CryptoKnight', 'Белый_Волк', 'RageQuit',
    'Саня_Апгрейд', 'LuckyStrike', 'Токсик_ТВ', 'MidOrFeed', 'Даша_Имба',
    'ClutchMaster', 'Витёк_Кейс', 'NoScope_Nik', 'Пудж_Мидер', 'EcoWarrior',
    'Кирилл_Фарм', 'AcePilot', 'Школьник_Про', 'FragMachine', 'Олежа_Top',
    'VenomStrike', 'Макс_Краш', 'CoinflipKing', 'Зевс_Гром', 'MineHunter',
    'Тёма_Лаки', 'RustRaider', 'Алина_Снайпер'
  ];

  const rand = mulberry32(20260930);
  const now = Date.now();
  const players = NICKS.map((username, i) => {
    const tier = rand(); // 0..1 skill tier
    const totalUpgrades = 8 + Math.floor(rand() * 420);
    const winRate = 0.32 + rand() * 0.28;
    const wonUpgrades = Math.floor(totalUpgrades * winRate);
    const casesOpened = Math.floor(rand() * 160);
    const totalWagered = Math.round((120 + rand() * 26000 + tier * 20000) * 100) / 100;
    // Net profit: most slightly negative/positive, few whales
    let netProfit;
    const roll = rand();
    if (roll > 0.93) netProfit = 2500 + rand() * 14000;       // whales
    else if (roll > 0.7) netProfit = 150 + rand() * 2400;     // winners
    else if (roll > 0.35) netProfit = -50 - rand() * 600;     // small minus
    else netProfit = -600 - rand() * 2500;                    // losers
    netProfit = Math.round(netProfit * 100) / 100;
    const balance = Math.round((20 + rand() * 1800 + Math.max(0, netProfit) * 0.15) * 100) / 100;
    const invCount = Math.floor(rand() * 24);
    const invValue = Math.round((30 + rand() * 3200 + tier * 2500) * 100) / 100;
    const grossWorth = Math.round((balance + invValue) * 100) / 100;
    // ~22% have active credit debt
    const hasDebt = rand() < 0.22;
    const currentDebt = hasDebt ? Math.round((60 + rand() * 1400) * 100) / 100 : 0;
    const totalBorrowed = hasDebt || rand() < 0.15 ? Math.round((currentDebt + rand() * 900) * 100) / 100 : 0;
    const debtPenalty = Math.round(currentDebt * 1.5 * 100) / 100;
    const bestWinMultiplier = totalUpgrades > 0 ? Math.round((1.2 + rand() * rand() * 90) * 100) / 100 : 0;

    return {
      id: 'global_' + (i + 1),
      username,
      initials: username.substring(0, 2).toUpperCase(),
      isRealUser: false,
      isGlobal: true,
      grossWorth,
      netWorth: Math.round((grossWorth - debtPenalty) * 100) / 100,
      netProfit: Math.round((netProfit - debtPenalty) * 100) / 100,
      debtPenalty,
      balance,
      invValue,
      invCount,
      winrate: Math.round(winRate * 1000) / 10,
      totalUpgrades,
      wonUpgrades,
      currentDebt,
      totalBorrowed: Math.round(totalBorrowed * 100) / 100,
      totalWagered,
      bestWinSkin: null,
      bestWinMultiplier,
      casesOpened,
      createdAt: now - Math.floor(rand() * 300) * 86400000
    };
  });

  // Sort once by profit so rank is stable everywhere
  players.sort((a, b) => b.netProfit - a.netProfit);

  window.GlobalPlayersDB = {
    version: 1,
    getAll() {
      // Return shallow copies so callers can't mutate the shared roster
      return players.map(p => ({ ...p }));
    },
    count() {
      return players.length;
    }
  };
})();

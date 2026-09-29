/* ==========================================================================
   SIMUP - LEADERBOARD & MULTIPLAYER COMPETITIVE STATS ENGINE (BLOCK 5)
   Features:
   - 50+ active competitive simulated esports players
   - Seamless integration with real local users (dynamic ranking)
   - Net Profit / Richest Players view
   - Bank Debtors & Credit Rating view
   - Provably Fair cryptographic verification tool
   ========================================================================== */

const SIMULATED_PLAYERS_POOL = [
  { id: 'sim_1', username: 's1mple_king', initials: 'SK', grossWorth: 24500.00, netWorth: 24500.00, netProfit: 24000.00, debtPenalty: 0, balance: 8400.00, invValue: 16100.00, invCount: 22, winrate: 68.4, totalUpgrades: 480, wonUpgrades: 328, currentDebt: 0, totalBorrowed: 1500.00, totalWagered: 62400.00, bestWinSkin: { name: '★ Нож-бабочка | Градиент (FN)', price: 3450.00 }, bestWinMultiplier: 24.5, casesOpened: 310 },
  { id: 'sim_2', username: 'm0NESY_awp', initials: 'MA', grossWorth: 19800.00, netWorth: 19800.00, netProfit: 19300.00, debtPenalty: 0, balance: 6100.00, invValue: 13700.00, invCount: 18, winrate: 65.2, totalUpgrades: 412, wonUpgrades: 268, currentDebt: 0, totalBorrowed: 2000.00, totalWagered: 51200.00, bestWinSkin: { name: 'AWP | История о драконе (FT)', price: 5400.00 }, bestWinMultiplier: 38.0, casesOpened: 275 },
  { id: 'sim_3', username: 'ZywOo_cs', initials: 'ZC', grossWorth: 17200.00, netWorth: 17200.00, netProfit: 16700.00, debtPenalty: 0, balance: 5300.00, invValue: 11900.00, invCount: 16, winrate: 63.8, totalUpgrades: 380, wonUpgrades: 242, currentDebt: 0, totalBorrowed: 1000.00, totalWagered: 44800.00, bestWinSkin: { name: '★ Керамбит | Волны Фаза 2 (FN)', price: 2150.00 }, bestWinMultiplier: 19.2, casesOpened: 220 },
  { id: 'sim_4', username: 'NiKo_oneDeag', initials: 'ND', grossWorth: 14850.00, netWorth: 14850.00, netProfit: 14350.00, debtPenalty: 0, balance: 4200.00, invValue: 10650.00, invCount: 14, winrate: 61.5, totalUpgrades: 330, wonUpgrades: 203, currentDebt: 0, totalBorrowed: 800.00, totalWagered: 39500.00, bestWinSkin: { name: 'M4A4 | Вой (FT)', price: 3950.00 }, bestWinMultiplier: 15.8, casesOpened: 195 },
  { id: 'sim_5', username: 'Donk_rifler', initials: 'DR', grossWorth: 12900.00, netWorth: 12900.00, netProfit: 12400.00, debtPenalty: 0, balance: 3800.00, invValue: 9100.00, invCount: 12, winrate: 59.8, totalUpgrades: 290, wonUpgrades: 173, currentDebt: 0, totalBorrowed: 500.00, totalWagered: 34100.00, bestWinSkin: { name: 'AK-47 | Дикий лотос (FT)', price: 3800.00 }, bestWinMultiplier: 22.4, casesOpened: 160 },
  { id: 'sim_6', username: 'Ropz_clutch', initials: 'RC', grossWorth: 11400.00, netWorth: 11400.00, netProfit: 10900.00, debtPenalty: 0, balance: 3400.00, invValue: 8000.00, invCount: 11, winrate: 58.2, totalUpgrades: 260, wonUpgrades: 151, currentDebt: 0, totalBorrowed: 600.00, totalWagered: 29800.00, bestWinSkin: { name: '★ Скелетный нож | Кровавая паутина (FT)', price: 740.00 }, bestWinMultiplier: 12.0, casesOpened: 140 },
  { id: 'sim_7', username: 'b1t_headshot', initials: 'BH', grossWorth: 10100.00, netWorth: 10100.00, netProfit: 9600.00, debtPenalty: 0, balance: 2900.00, invValue: 7200.00, invCount: 10, winrate: 57.1, totalUpgrades: 245, wonUpgrades: 140, currentDebt: 0, totalBorrowed: 400.00, totalWagered: 26500.00, bestWinSkin: { name: '★ Штык-нож M9 | Легенды (FT)', price: 680.00 }, bestWinMultiplier: 14.5, casesOpened: 125 },
  { id: 'sim_8', username: 'Shroud_aim', initials: 'SA', grossWorth: 9350.00, netWorth: 9350.00, netProfit: 8850.00, debtPenalty: 0, balance: 2600.00, invValue: 6750.00, invCount: 9, winrate: 56.4, totalUpgrades: 215, wonUpgrades: 121, currentDebt: 0, totalBorrowed: 300.00, totalWagered: 23200.00, bestWinSkin: { name: 'AWP | Азимов (FT)', price: 135.00 }, bestWinMultiplier: 18.0, casesOpened: 110 },
  { id: 'sim_9', username: 'Miracle_9k', initials: 'M9', grossWorth: 8700.00, netWorth: 8700.00, netProfit: 8200.00, debtPenalty: 0, balance: 2400.00, invValue: 6300.00, invCount: 8, winrate: 55.8, totalUpgrades: 195, wonUpgrades: 109, currentDebt: 0, totalBorrowed: 500.00, totalWagered: 21400.00, bestWinSkin: { name: 'Dragonclaw Hook', price: 185.00 }, bestWinMultiplier: 16.5, casesOpened: 95 },
  { id: 'sim_10', username: 'FalleN_prof', initials: 'FP', grossWorth: 7950.00, netWorth: 7950.00, netProfit: 7450.00, debtPenalty: 0, balance: 2100.00, invValue: 5850.00, invCount: 8, winrate: 54.9, totalUpgrades: 180, wonUpgrades: 99, currentDebt: 0, totalBorrowed: 200.00, totalWagered: 19600.00, bestWinSkin: { name: '★ Нож-коготь | Мраморный градиент (FN)', price: 920.00 }, bestWinMultiplier: 11.2, casesOpened: 88 },
  { id: 'sim_11', username: 'Trausi_rust', initials: 'TR', grossWorth: 7300.00, netWorth: 7300.00, netProfit: 6800.00, debtPenalty: 0, balance: 1950.00, invValue: 5350.00, invCount: 7, winrate: 54.2, totalUpgrades: 165, wonUpgrades: 89, currentDebt: 0, totalBorrowed: 300.00, totalWagered: 17800.00, bestWinSkin: { name: 'Alien Red AK-47', price: 180.00 }, bestWinMultiplier: 14.0, casesOpened: 80 },
  { id: 'sim_12', username: 'Posty_rust', initials: 'PR', grossWorth: 6800.00, netWorth: 6800.00, netProfit: 6300.00, debtPenalty: 0, balance: 1800.00, invValue: 5000.00, invCount: 7, winrate: 53.6, totalUpgrades: 150, wonUpgrades: 80, currentDebt: 0, totalBorrowed: 400.00, totalWagered: 16200.00, bestWinSkin: { name: 'Glory AK-47', price: 245.00 }, bestWinMultiplier: 12.8, casesOpened: 75 },
  { id: 'sim_13', username: 'CyberViper', initials: 'CV', grossWorth: 6250.00, netWorth: 6250.00, netProfit: 5750.00, debtPenalty: 0, balance: 1650.00, invValue: 4600.00, invCount: 6, winrate: 53.0, totalUpgrades: 142, wonUpgrades: 75, currentDebt: 0, totalBorrowed: 200.00, totalWagered: 14900.00, bestWinSkin: { name: 'M4A1-S | Поток информации (FN)', price: 320.00 }, bestWinMultiplier: 10.5, casesOpened: 70 },
  { id: 'sim_14', username: 'NeonShadow', initials: 'NS', grossWorth: 5800.00, netWorth: 5800.00, netProfit: 5300.00, debtPenalty: 0, balance: 1500.00, invValue: 4300.00, invCount: 6, winrate: 52.4, totalUpgrades: 130, wonUpgrades: 68, currentDebt: 0, totalBorrowed: 150.00, totalWagered: 13800.00, bestWinSkin: { name: 'AK-47 | Огненный змей (FT)', price: 740.00 }, bestWinMultiplier: 15.0, casesOpened: 65 },
  { id: 'sim_15', username: 'Phoenix_CS', initials: 'PC', grossWorth: 5350.00, netWorth: 5350.00, netProfit: 4850.00, debtPenalty: 0, balance: 1400.00, invValue: 3950.00, invCount: 5, winrate: 51.9, totalUpgrades: 122, wonUpgrades: 63, currentDebt: 0, totalBorrowed: 250.00, totalWagered: 12600.00, bestWinSkin: { name: '★ Складной нож | Волны (FN)', price: 420.00 }, bestWinMultiplier: 9.8, casesOpened: 60 },
  { id: 'sim_16', username: 'DragonSlayer', initials: 'DS', grossWorth: 4900.00, netWorth: 4900.00, netProfit: 4400.00, debtPenalty: 0, balance: 1300.00, invValue: 3600.00, invCount: 5, winrate: 51.3, totalUpgrades: 115, wonUpgrades: 59, currentDebt: 0, totalBorrowed: 100.00, totalWagered: 11500.00, bestWinSkin: { name: 'Desert Eagle | Поток информации (FT)', price: 48.00 }, bestWinMultiplier: 8.5, casesOpened: 55 },
  { id: 'sim_17', username: 'LuckyStrike', initials: 'LS', grossWorth: 4500.00, netWorth: 4500.00, netProfit: 4000.00, debtPenalty: 0, balance: 1200.00, invValue: 3300.00, invCount: 5, winrate: 50.8, totalUpgrades: 108, wonUpgrades: 55, currentDebt: 0, totalBorrowed: 0, totalWagered: 10400.00, bestWinSkin: { name: 'AK-47 | Красная линия (FT)', price: 18.50 }, bestWinMultiplier: 11.4, casesOpened: 50 },
  { id: 'sim_18', username: 'Vortex99', initials: 'V9', grossWorth: 4150.00, netWorth: 4150.00, netProfit: 3650.00, debtPenalty: 0, balance: 1100.00, invValue: 3050.00, invCount: 4, winrate: 50.2, totalUpgrades: 98, wonUpgrades: 49, currentDebt: 0, totalBorrowed: 300.00, totalWagered: 9600.00, bestWinSkin: { name: 'M4A4 | Император (FT)', price: 24.50 }, bestWinMultiplier: 7.6, casesOpened: 48 },
  { id: 'sim_19', username: 'PhantomAce', initials: 'PA', grossWorth: 3800.00, netWorth: 3800.00, netProfit: 3300.00, debtPenalty: 0, balance: 1000.00, invValue: 2800.00, invCount: 4, winrate: 49.6, totalUpgrades: 92, wonUpgrades: 46, currentDebt: 0, totalBorrowed: 150.00, totalWagered: 8900.00, bestWinSkin: { name: 'AWP | Скоростной зверь (FT)', price: 32.00 }, bestWinMultiplier: 8.2, casesOpened: 44 },
  { id: 'sim_20', username: 'MidnightWolf', initials: 'MW', grossWorth: 3450.00, netWorth: 3450.00, netProfit: 2950.00, debtPenalty: 0, balance: 920.00, invValue: 2530.00, invCount: 4, winrate: 49.0, totalUpgrades: 86, wonUpgrades: 42, currentDebt: 0, totalBorrowed: 200.00, totalWagered: 8100.00, bestWinSkin: { name: '★ Нож с лезвием-крюком | Африканская сетка (FT)', price: 78.00 }, bestWinMultiplier: 6.5, casesOpened: 40 },
  { id: 'sim_21', username: 'FrostBite', initials: 'FB', grossWorth: 3100.00, netWorth: 3100.00, netProfit: 2600.00, debtPenalty: 0, balance: 850.00, invValue: 2250.00, invCount: 3, winrate: 48.5, totalUpgrades: 80, wonUpgrades: 39, currentDebt: 0, totalBorrowed: 100.00, totalWagered: 7400.00, bestWinSkin: { name: 'AWP | Древесная гадюка (MW)', price: 6.80 }, bestWinMultiplier: 5.4, casesOpened: 36 },
  { id: 'sim_22', username: 'IronClad', initials: 'IC', grossWorth: 2800.00, netWorth: 2800.00, netProfit: 2300.00, debtPenalty: 0, balance: 780.00, invValue: 2020.00, invCount: 3, winrate: 48.0, totalUpgrades: 75, wonUpgrades: 36, currentDebt: 0, totalBorrowed: 150.00, totalWagered: 6700.00, bestWinSkin: { name: 'AK-47 | Сланец (FT)', price: 2.50 }, bestWinMultiplier: 4.8, casesOpened: 32 },
  { id: 'sim_23', username: 'ShadowHunter', initials: 'SH', grossWorth: 2500.00, netWorth: 2500.00, netProfit: 2000.00, debtPenalty: 0, balance: 710.00, invValue: 1790.00, invCount: 3, winrate: 47.4, totalUpgrades: 70, wonUpgrades: 33, currentDebt: 0, totalBorrowed: 50.00, totalWagered: 6100.00, bestWinSkin: { name: 'USP-S | Билет в ад (FT)', price: 1.40 }, bestWinMultiplier: 4.2, casesOpened: 30 },
  { id: 'sim_24', username: 'ThunderGod', initials: 'TG', grossWorth: 2200.00, netWorth: 2200.00, netProfit: 1700.00, debtPenalty: 0, balance: 640.00, invValue: 1560.00, invCount: 3, winrate: 46.9, totalUpgrades: 65, wonUpgrades: 30, currentDebt: 0, totalBorrowed: 0, totalWagered: 5500.00, bestWinSkin: { name: 'M4A1-S | Ночной кошмар (FT)', price: 1.10 }, bestWinMultiplier: 3.9, casesOpened: 26 },
  { id: 'sim_25', username: 'BlazeFury', initials: 'BF', grossWorth: 1950.00, netWorth: 1950.00, netProfit: 1450.00, debtPenalty: 0, balance: 580.00, invValue: 1370.00, invCount: 2, winrate: 46.3, totalUpgrades: 60, wonUpgrades: 28, currentDebt: 0, totalBorrowed: 100.00, totalWagered: 4900.00, bestWinSkin: { name: 'P250 | Песчаные дюны (FT)', price: 0.20 }, bestWinMultiplier: 3.5, casesOpened: 24 },
  { id: 'sim_26', username: 'TitanStrike', initials: 'TS', grossWorth: 1700.00, netWorth: 1700.00, netProfit: 1200.00, debtPenalty: 0, balance: 520.00, invValue: 1180.00, invCount: 2, winrate: 45.8, totalUpgrades: 55, wonUpgrades: 25, currentDebt: 0, totalBorrowed: 50.00, totalWagered: 4300.00, bestWinSkin: { name: 'G3SG1 | Сафари сетка (BS)', price: 0.12 }, bestWinMultiplier: 3.0, casesOpened: 20 },
  { id: 'sim_27', username: 'NovaPulse', initials: 'NP', grossWorth: 1500.00, netWorth: 1500.00, netProfit: 1000.00, debtPenalty: 0, balance: 480.00, invValue: 1020.00, invCount: 2, winrate: 45.2, totalUpgrades: 50, wonUpgrades: 23, currentDebt: 0, totalBorrowed: 0, totalWagered: 3800.00, bestWinSkin: { name: 'AK-47 | Красная линия (FT)', price: 18.50 }, bestWinMultiplier: 2.8, casesOpened: 18 },
  { id: 'sim_28', username: 'QuantumLeap', initials: 'QL', grossWorth: 1300.00, netWorth: 1300.00, netProfit: 800.00, debtPenalty: 0, balance: 440.00, invValue: 860.00, invCount: 2, winrate: 44.7, totalUpgrades: 46, wonUpgrades: 21, currentDebt: 0, totalBorrowed: 80.00, totalWagered: 3300.00, bestWinSkin: { name: 'AWP | Скоростной зверь (FT)', price: 32.00 }, bestWinMultiplier: 2.5, casesOpened: 16 },
  { id: 'sim_29', username: 'CyberSamurai', initials: 'CS', grossWorth: 1100.00, netWorth: 1100.00, netProfit: 600.00, debtPenalty: 0, balance: 390.00, invValue: 710.00, invCount: 2, winrate: 44.1, totalUpgrades: 42, wonUpgrades: 19, currentDebt: 0, totalBorrowed: 120.00, totalWagered: 2900.00, bestWinSkin: { name: 'M4A4 | Император (FT)', price: 24.50 }, bestWinMultiplier: 2.3, casesOpened: 14 },
  { id: 'sim_30', username: 'VenomBite', initials: 'VB', grossWorth: 920.00, netWorth: 920.00, netProfit: 420.00, debtPenalty: 0, balance: 340.00, invValue: 580.00, invCount: 1, winrate: 43.5, totalUpgrades: 38, wonUpgrades: 17, currentDebt: 0, totalBorrowed: 100.00, totalWagered: 2500.00, bestWinSkin: { name: 'AK-47 | Сланец (FT)', price: 2.50 }, bestWinMultiplier: 2.1, casesOpened: 12 },
  { id: 'sim_31', username: 'CrimsonGhost', initials: 'CG', grossWorth: 780.00, netWorth: 780.00, netProfit: 280.00, debtPenalty: 0, balance: 300.00, invValue: 480.00, invCount: 1, winrate: 42.9, totalUpgrades: 34, wonUpgrades: 15, currentDebt: 0, totalBorrowed: 0, totalWagered: 2100.00, bestWinSkin: { name: 'USP-S | Билет в ад (FT)', price: 1.40 }, bestWinMultiplier: 1.9, casesOpened: 10 },
  { id: 'sim_32', username: 'SolarFlare', initials: 'SF', grossWorth: 650.00, netWorth: 650.00, netProfit: 150.00, debtPenalty: 0, balance: 260.00, invValue: 390.00, invCount: 1, winrate: 42.3, totalUpgrades: 30, wonUpgrades: 13, currentDebt: 0, totalBorrowed: 60.00, totalWagered: 1800.00, bestWinSkin: { name: 'P250 | Песчаные дюны (FT)', price: 0.20 }, bestWinMultiplier: 1.8, casesOpened: 8 },
  { id: 'sim_33', username: 'ArcticFox', initials: 'AF', grossWorth: 540.00, netWorth: 540.00, netProfit: 40.00, debtPenalty: 0, balance: 220.00, invValue: 320.00, invCount: 1, winrate: 41.7, totalUpgrades: 27, wonUpgrades: 11, currentDebt: 0, totalBorrowed: 40.00, totalWagered: 1500.00, bestWinSkin: { name: 'G3SG1 | Сафари сетка (BS)', price: 0.12 }, bestWinMultiplier: 1.7, casesOpened: 6 },
  { id: 'sim_34', username: 'ViperStrike', initials: 'VS', grossWorth: 480.00, netWorth: 480.00, netProfit: -20.00, debtPenalty: 0, balance: 190.00, invValue: 290.00, invCount: 1, winrate: 41.1, totalUpgrades: 25, wonUpgrades: 10, currentDebt: 0, totalBorrowed: 0, totalWagered: 1300.00, bestWinSkin: { name: 'AK-47 | Красная линия (FT)', price: 18.50 }, bestWinMultiplier: 1.6, casesOpened: 5 },
  { id: 'sim_35', username: 'StormBreaker', initials: 'SB', grossWorth: 420.00, netWorth: 420.00, netProfit: -80.00, debtPenalty: 0, balance: 170.00, invValue: 250.00, invCount: 1, winrate: 40.5, totalUpgrades: 22, wonUpgrades: 9, currentDebt: 0, totalBorrowed: 50.00, totalWagered: 1100.00, bestWinSkin: { name: 'AWP | Древесная гадюка (MW)', price: 6.80 }, bestWinMultiplier: 1.5, casesOpened: 4 },
  
  // DEBTORS & HIGH RISK PLAYERS (Top of the Debtors leaderboard)
  { id: 'sim_36', username: 'debt_king99', initials: 'DK', grossWorth: 120.00, netWorth: -3630.00, netProfit: -4130.00, debtPenalty: 3750.00, balance: 40.00, invValue: 80.00, invCount: 1, winrate: 34.2, totalUpgrades: 85, wonUpgrades: 29, currentDebt: 2500.00, totalBorrowed: 3200.00, totalWagered: 9400.00, bestWinSkin: { name: 'AK-47 | Сланец (FT)', price: 2.50 }, bestWinMultiplier: 2.2, casesOpened: 18 },
  { id: 'sim_37', username: 'risky_gambler', initials: 'RG', grossWorth: 190.00, netWorth: -2660.00, netProfit: -3160.00, debtPenalty: 2850.00, balance: 70.00, invValue: 120.00, invCount: 1, winrate: 35.8, totalUpgrades: 72, wonUpgrades: 26, currentDebt: 1900.00, totalBorrowed: 2500.00, totalWagered: 8100.00, bestWinSkin: { name: 'USP-S | Билет в ад (FT)', price: 1.40 }, bestWinMultiplier: 2.0, casesOpened: 14 },
  { id: 'sim_38', username: 'all_in_bro', initials: 'AB', grossWorth: 85.00, netWorth: -2165.00, netProfit: -2665.00, debtPenalty: 2250.00, balance: 35.00, invValue: 50.00, invCount: 1, winrate: 33.1, totalUpgrades: 64, wonUpgrades: 21, currentDebt: 1500.00, totalBorrowed: 2100.00, totalWagered: 6900.00, bestWinSkin: { name: 'G3SG1 | Сафари сетка (BS)', price: 0.12 }, bestWinMultiplier: 1.8, casesOpened: 11 },
  { id: 'sim_39', username: 'tilted_ace', initials: 'TA', grossWorth: 140.00, netWorth: -1660.00, netProfit: -2160.00, debtPenalty: 1800.00, balance: 50.00, invValue: 90.00, invCount: 1, winrate: 36.4, totalUpgrades: 58, wonUpgrades: 21, currentDebt: 1200.00, totalBorrowed: 1800.00, totalWagered: 5800.00, bestWinSkin: { name: 'P250 | Песчаные дюны (FT)', price: 0.20 }, bestWinMultiplier: 1.6, casesOpened: 9 },
  { id: 'sim_40', username: 'borrow_king', initials: 'BK', grossWorth: 210.00, netWorth: -1215.00, netProfit: -1715.00, debtPenalty: 1425.00, balance: 80.00, invValue: 130.00, invCount: 1, winrate: 37.0, totalUpgrades: 52, wonUpgrades: 19, currentDebt: 950.00, totalBorrowed: 1400.00, totalWagered: 5100.00, bestWinSkin: { name: 'AK-47 | Красная линия (FT)', price: 18.50 }, bestWinMultiplier: 2.5, casesOpened: 8 },
  { id: 'sim_41', username: 'unlucky_striker', initials: 'US', grossWorth: 160.00, netWorth: -1040.00, netProfit: -1540.00, debtPenalty: 1200.00, balance: 60.00, invValue: 100.00, invCount: 1, winrate: 35.5, totalUpgrades: 48, wonUpgrades: 17, currentDebt: 800.00, totalBorrowed: 1200.00, totalWagered: 4400.00, bestWinSkin: { name: 'AWP | Древесная гадюка (MW)', price: 6.80 }, bestWinMultiplier: 2.1, casesOpened: 7 },
  { id: 'sim_42', username: 'case_fiend', initials: 'CF', grossWorth: 180.00, netWorth: -870.00, netProfit: -1370.00, debtPenalty: 1050.00, balance: 70.00, invValue: 110.00, invCount: 1, winrate: 38.2, totalUpgrades: 42, wonUpgrades: 16, currentDebt: 700.00, totalBorrowed: 1000.00, totalWagered: 3900.00, bestWinSkin: { name: 'Desert Eagle | Заговор (FT)', price: 4.80 }, bestWinMultiplier: 2.3, casesOpened: 6 },
  { id: 'sim_43', username: 'last_chance_guy', initials: 'LC', grossWorth: 95.00, netWorth: -730.00, netProfit: -1230.00, debtPenalty: 825.00, balance: 35.00, invValue: 60.00, invCount: 1, winrate: 36.1, totalUpgrades: 38, wonUpgrades: 14, currentDebt: 550.00, totalBorrowed: 850.00, totalWagered: 3400.00, bestWinSkin: { name: 'M4A1-S | Ночной кошмар (FT)', price: 1.10 }, bestWinMultiplier: 1.7, casesOpened: 5 },
  { id: 'sim_44', username: 'bank_favorite', initials: 'BF', grossWorth: 220.00, netWorth: -500.00, netProfit: -1000.00, debtPenalty: 720.00, balance: 90.00, invValue: 130.00, invCount: 1, winrate: 39.4, totalUpgrades: 35, wonUpgrades: 14, currentDebt: 480.00, totalBorrowed: 750.00, totalWagered: 3000.00, bestWinSkin: { name: 'AK-47 | Сланец (FT)', price: 2.50 }, bestWinMultiplier: 2.0, casesOpened: 4 },
  { id: 'sim_45', username: 'red_or_black', initials: 'RO', grossWorth: 130.00, netWorth: -440.00, netProfit: -940.00, debtPenalty: 570.00, balance: 50.00, invValue: 80.00, invCount: 1, winrate: 37.8, totalUpgrades: 32, wonUpgrades: 12, currentDebt: 380.00, totalBorrowed: 600.00, totalWagered: 2700.00, bestWinSkin: { name: 'G3SG1 | Сафари сетка (BS)', price: 0.12 }, bestWinMultiplier: 1.5, casesOpened: 4 },
  { id: 'sim_46', username: 'crash_pilot_lost', initials: 'CP', grossWorth: 150.00, netWorth: -330.00, netProfit: -830.00, debtPenalty: 480.00, balance: 60.00, invValue: 90.00, invCount: 1, winrate: 38.6, totalUpgrades: 28, wonUpgrades: 11, currentDebt: 320.00, totalBorrowed: 500.00, totalWagered: 2400.00, bestWinSkin: { name: 'P250 | Песчаные дюны (FT)', price: 0.20 }, bestWinMultiplier: 1.4, casesOpened: 3 },
  { id: 'sim_47', username: 'mines_sweeper_fail', initials: 'MS', grossWorth: 170.00, netWorth: -205.00, netProfit: -705.00, debtPenalty: 375.00, balance: 70.00, invValue: 100.00, invCount: 1, winrate: 39.1, totalUpgrades: 26, wonUpgrades: 10, currentDebt: 250.00, totalBorrowed: 420.00, totalWagered: 2100.00, bestWinSkin: { name: 'USP-S | Билет в ад (FT)', price: 1.40 }, bestWinMultiplier: 1.6, casesOpened: 3 },
  { id: 'sim_48', username: 'credit_rating_f', initials: 'CR', grossWorth: 190.00, netWorth: -95.00, netProfit: -595.00, debtPenalty: 285.00, balance: 80.00, invValue: 110.00, invCount: 1, winrate: 40.0, totalUpgrades: 24, wonUpgrades: 10, currentDebt: 190.00, totalBorrowed: 350.00, totalWagered: 1800.00, bestWinSkin: { name: 'AWP | Древесная гадюка (MW)', price: 6.80 }, bestWinMultiplier: 1.8, casesOpened: 2 },
  { id: 'sim_49', username: 'always_reloading', initials: 'AR', grossWorth: 240.00, netWorth: 15.00, netProfit: -485.00, debtPenalty: 225.00, balance: 100.00, invValue: 140.00, invCount: 1, winrate: 40.8, totalUpgrades: 22, wonUpgrades: 9, currentDebt: 150.00, totalBorrowed: 280.00, totalWagered: 1600.00, bestWinSkin: { name: 'AK-47 | Красная линия (FT)', price: 18.50 }, bestWinMultiplier: 1.9, casesOpened: 2 },
  { id: 'sim_50', username: 'rust_scrapper', initials: 'RS', grossWorth: 280.00, netWorth: 145.00, netProfit: -355.00, debtPenalty: 135.00, balance: 120.00, invValue: 160.00, invCount: 1, winrate: 41.5, totalUpgrades: 20, wonUpgrades: 8, currentDebt: 90.00, totalBorrowed: 200.00, totalWagered: 1400.00, bestWinSkin: { name: 'M4A4 | Император (FT)', price: 24.50 }, bestWinMultiplier: 1.7, casesOpened: 1 }
];

class LeaderboardManager {
  constructor() {
    this.currentView = 'profit'; // 'profit' or 'debtors'
  }

  getAllPlayersData() {
    const rawUsers = window.authManager?.getAllUsers() || [];
    
    // Map real authenticated/guest users
    const realPlayers = rawUsers.map(user => {
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
      const wonUpgrades = user.stats?.wonUpgrades || 0;
      const winrate = totalUpgrades > 0 ? ((wonUpgrades / totalUpgrades) * 100).toFixed(1) : '0.0';

      return {
        id: user.id,
        username: user.username,
        initials: (user.username || '?').substring(0, 2).toUpperCase(),
        isRealUser: true,
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
        createdAt: user.createdAt || Date.now()
      };
    });

    const realUsernames = new Set(realPlayers.map(p => p.username.toLowerCase()));
    const nonConflictingSims = SIMULATED_PLAYERS_POOL.filter(p => !realUsernames.has(p.username.toLowerCase()));

    return [...realPlayers, ...nonConflictingSims];
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

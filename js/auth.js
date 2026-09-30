/* ==========================================================================
   SIMUP - SECURE AUTHENTICATION & USER PROFILE SYSTEM (BLOCK 1)
   Features:
   - Universal dual-mode SHA-256 (Web Crypto with Pure JS fallback)
   - Guaranteed offline & file:// compatibility (zero crash on mobile/HTTP)
   - Unique username enforcement with case-insensitive check
   - Individual salt per account for password protection
   - No user avatars (clean nickname & rank badge)
   - Starter gift: $500.00 balance + AK-47 Redline (FT) skin
   - Complete state persistence & reactive listener notification
   ========================================================================== */

// --- Embedded pure JavaScript SHA-256 engine for 100% universal compatibility ---
function sha256Pure(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = 'length';
  let i, j;
  let result = '';

  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;

  const hash = sha256Pure.h = sha256Pure.h || [];
  const k = sha256Pure.k = sha256Pure.k || [];
  let primeCounter = k[lengthProperty];

  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += '\x80';
  while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiBitLength | 0);

  let currentHash = hash.slice(0);

  for (j = 0; j < words[lengthProperty];) {
    const w = words.slice(j, j += 16);
    const oldHash = currentHash.slice(0);

    for (i = 0; i < 64; i++) {
      const i2 = i + j;
      const w15 = w[i - 15], w2 = w[i - 2];
      const a = currentHash[0], e = currentHash[4];
      const temp1 = currentHash[7]
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
        + ((e & currentHash[5]) ^ ((~e) & currentHash[6]))
        + k[i]
        + (w[i] = (i < 16) ? w[i] : (
          w[i - 16]
          + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
          + w[i - 7]
          + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
        ) | 0);
      const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
        + ((a & currentHash[1]) ^ (a & currentHash[2]) ^ (currentHash[1] & currentHash[2]));

      currentHash = [(temp1 + temp2) | 0].concat(currentHash);
      currentHash[4] = (currentHash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      currentHash[i] = (currentHash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j >= 0; j--) {
      const b = (currentHash[i] >> (8 * j)) & 255;
      result += ((b < 16) ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

function utf8ToBytesString(str) {
  return unescape(encodeURIComponent(str));
}

window.TITLES_LIST = [
  { id: 'novice', name: 'Новичок', desc: 'Стартовый титул для каждого бойца', icon: '🌱' },
  { id: 'upgrade_master', name: 'Мастер Апгрейдов', desc: 'Выиграть 5 апгрейдов на арене', icon: '⚡' },
  { id: 'lucky', name: 'Ловец Удачи', desc: 'Выиграть апгрейд с шансом 25% или ниже', icon: '🍀' },
  { id: 'case_opener', name: 'Кейсер', desc: 'Открыть 5 кейсов в симуляторе', icon: '📦' },
  { id: 'collector', name: 'Коллекционер', desc: 'Собрать от 5 скинов в инвентаре', icon: '🎒' },
  { id: 'highroller', name: 'Хайроллер', desc: 'Сделать одиночную ставку от $100', icon: '💎' },
  { id: 'sniper', name: 'Снайпер', desc: 'Попробовать апгрейд с шансом 90%', icon: '🎯' },
  { id: 'battle_king', name: 'Гладиатор', desc: 'Сыграть в Кейс Баттл 1 на 1', icon: '⚔️' },
  { id: 'tycoon', name: 'Олигарх', desc: 'Накопить на балансе $1,000.00', icon: '💰' },
  { id: 'legend', name: 'Легенда SIMUP', desc: 'Выполнить 8 любых достижений', icon: '👑' }
];

window.ACHIEVEMENTS_LIST = [
  { id: 'ach_first_upgrade', title: 'Первый шаг', desc: 'Сделайте ваш первый апгрейд', icon: '⚡', reward: 15.00, xp: 50, target: 1, type: 'upgrades', titleUnlock: null },
  { id: 'ach_win_5', title: 'Первые победы', desc: 'Выиграйте 5 апгрейдов', icon: '🏆', reward: 25.00, xp: 100, target: 5, type: 'won_upgrades', titleUnlock: 'Мастер Апгрейдов' },
  { id: 'ach_lucky', title: 'Превзойти шансы', desc: 'Выиграйте с шансом 25% или ниже', icon: '🍀', reward: 35.00, xp: 120, target: 1, type: 'lucky_win', titleUnlock: 'Ловец Удачи' },
  { id: 'ach_cases_5', title: 'Открыватель ящиков', desc: 'Откройте 5 кейсов', icon: '📦', reward: 20.00, xp: 80, target: 5, type: 'cases', titleUnlock: 'Кейсер' },
  { id: 'ach_collector', title: 'Арсенал', desc: 'Соберите 5 скинов в инвентаре', icon: '🎒', reward: 30.00, xp: 100, target: 5, type: 'inventory', titleUnlock: 'Коллекционер' },
  { id: 'ach_high_bet', title: 'Большие ставки', desc: 'Сделайте ставку от $100', icon: '💎', reward: 50.00, xp: 150, target: 1, type: 'high_bet', titleUnlock: 'Хайроллер' },
  { id: 'ach_max_chance', title: 'Железный расчет', desc: 'Попробуйте апгрейд с шансом 90%', icon: '🎯', reward: 20.00, xp: 75, target: 1, type: 'chance_90', titleUnlock: 'Снайпер' },
  { id: 'ach_battle', title: 'Боевое крещение', desc: 'Сыграйте в Кейс Баттл 1 на 1', icon: '⚔️', reward: 25.00, xp: 90, target: 1, type: 'battle', titleUnlock: 'Гладиатор' },
  { id: 'ach_bank_loan', title: 'Кредитная линия', desc: 'Возьмите заём в Банке для старта', icon: '🏦', reward: 15.00, xp: 50, target: 1, type: 'loan', titleUnlock: null },
  { id: 'ach_balance_1k', title: 'Капиталист', desc: 'Достигните баланса в $1,000.00', icon: '💰', reward: 100.00, xp: 300, target: 1, type: 'balance', titleUnlock: 'Олигарх' }
];

class AuthManager {
  constructor() {
    this.STORAGE_KEY_USERS = 'simup_accounts_v1';
    this.STORAGE_KEY_SESSION = 'simup_session_v1';
    this.RESET_MIGRATION_KEY = 'simup_clean_reset_v5_0';
    this.currentUser = null;
    this.onUserChangeCallbacks = [];

    this.init();
  }

  init() {
    try {
      // Clean slate reset for all accounts (level 0, empty inventory, $0 balance)
      if (!localStorage.getItem(this.RESET_MIGRATION_KEY)) {
        localStorage.removeItem(this.STORAGE_KEY_USERS);
        localStorage.removeItem(this.STORAGE_KEY_SESSION);
        localStorage.setItem(this.RESET_MIGRATION_KEY, 'true');
        this.currentUser = null;
      }

      const session = localStorage.getItem(this.STORAGE_KEY_SESSION);
      if (session) {
        const users = this.getAllUsers();
        const found = users.find(u => u.username && u.username.toLowerCase() === session.toLowerCase());
        if (found && found.passwordHash && found.passwordHash !== 'guest_hash') {
          this.currentUser = found;
          this.ensureUserIntegrity(this.currentUser);
        }
      }
      if (!this.currentUser) {
        this.currentUser = null;
      }
    } catch (e) {
      console.error('SIMUP Auth: Error initializing session', e);
      this.currentUser = null;
    }
  }

  isAuthenticated() {
    return Boolean(
      this.currentUser &&
      this.currentUser.username &&
      this.currentUser.salt &&
      this.currentUser.salt !== 'guest_salt' &&
      this.currentUser.passwordHash &&
      this.currentUser.passwordHash !== 'guest_hash'
    );
  }

  ensureUserIntegrity(u) {
    if (!u) return;
    let changed = false;
    if (u.level === undefined) { u.level = 0; changed = true; }
    if (u.xp === undefined) { u.xp = 0; changed = true; }
    if (!u.equippedTitle) { u.equippedTitle = 'Новичок'; changed = true; }
    if (!Array.isArray(u.unlockedTitles) || u.unlockedTitles.length === 0) { u.unlockedTitles = ['Новичок']; changed = true; }
    if (!u.achievements || typeof u.achievements !== 'object') { u.achievements = {}; changed = true; }
    if (!u.stats) { u.stats = {}; changed = true; }
    if (!u.loans) { u.loans = { currentDebt: 0, totalBorrowed: 0, totalRepaid: 0, autoRepay: true }; changed = true; }
    if (!u.inventory) { u.inventory = []; changed = true; }
    if (changed) this.saveCurrentUser();
  }

  ensureGuestUser() {
    return null;
  }

  getAllUsers() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_USERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('SIMUP Auth: Error reading users from storage:', e);
      return [];
    }
  }

  saveUsers(users) {
    try {
      localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.error('SIMUP Auth: Error saving users to storage:', e);
    }
  }

  generateSalt() {
    try {
      if (typeof window !== 'undefined' && window.crypto && typeof window.crypto.getRandomValues === 'function') {
        const array = new Uint8Array(16);
        window.crypto.getRandomValues(array);
        return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {
      // Fallback below
    }
    let salt = '';
    const chars = 'abcdef0123456789';
    for (let i = 0; i < 32; i++) {
      salt += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return salt;
  }

  async hashPassword(password, salt) {
    const raw = password + ':' + salt + ':simup_vault_2026';
    // 1. Try native Web Crypto API
    try {
      if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === 'function') {
        const enc = new TextEncoder();
        const data = enc.encode(raw);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {
      console.warn('SIMUP Auth: crypto.subtle unavailable, switching to pure JS SHA-256');
    }
    // 2. Guaranteed zero-fail fallback
    return sha256Pure(utf8ToBytesString(raw));
  }

  async register(username, password, refCode = '') {
    const cleanNick = (username || '').trim();
    if (!cleanNick) {
      return { success: false, error: 'Введите никнейм игрока.' };
    }
    if (cleanNick.length < 3 || cleanNick.length > 18) {
      return { success: false, error: 'Никнейм должен быть от 3 до 18 символов.' };
    }
    if (!/^[a-zA-Zа-яА-Я0-9_\-\s]+$/i.test(cleanNick)) {
      return { success: false, error: 'Никнейм содержит недопустимые спецсимволы. Разрешены буквы, цифры, пробел, дефис и подчеркивание.' };
    }
    if (!password || password.length < 4) {
      return { success: false, error: 'Пароль должен быть не короче 4 символов.' };
    }

    const users = this.getAllUsers();
    const exists = users.find(u => u.username && u.username.trim().toLowerCase() === cleanNick.toLowerCase());
    if (exists) {
      return { success: false, error: `Игрок с никнеймом "${cleanNick}" уже существует! Нажмите «Вход» или выберите другой ник.` };
    }

    const salt = this.generateSalt();
    const passwordHash = await this.hashPassword(password, salt);

    // Referral code logic (from argument, or from localStorage)
    let effectiveRef = (refCode || '').trim();
    try {
      if (!effectiveRef && typeof localStorage !== 'undefined') {
        effectiveRef = (localStorage.getItem('simup_ref_code') || '').trim();
      }
    } catch(e) {}

    let initialBalance = 0.00;
    let referredBy = null;

    if (effectiveRef) {
      const referrer = users.find(u => u.username && (u.username.toLowerCase() === effectiveRef.toLowerCase() || (u.referralCode && u.referralCode.toLowerCase() === effectiveRef.toLowerCase())));
      if (referrer && referrer.username.toLowerCase() !== cleanNick.toLowerCase()) {
        initialBalance = 5000.00; // Starter friend gift ($5,000)
        referredBy = referrer.username;
        // Credit inviter +$2,500.00 bonus
        referrer.balance = Number(((referrer.balance || 0) + 2500.00).toFixed(2));
        if (!referrer.referrals) referrer.referrals = { count: 0, totalBonus: 0, referredUsers: [] };
        referrer.referrals.count = (referrer.referrals.count || 0) + 1;
        referrer.referrals.totalBonus = Number(((referrer.referrals.totalBonus || 0) + 2500.00).toFixed(2));
        if (!referrer.referrals.referredUsers) referrer.referrals.referredUsers = [];
        referrer.referrals.referredUsers.push({ username: cleanNick, date: Date.now(), bonus: 2500.00 });
      }
    }

    const newUser = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      username: cleanNick,
      referralCode: cleanNick.toUpperCase(),
      referredBy: referredBy,
      referrals: { count: 0, totalBonus: 0, referredUsers: [] },
      passwordHash: passwordHash,
      salt: salt,
      balance: initialBalance,
      inventory: [],
      level: 0,
      xp: 0,
      equippedTitle: 'Новичок',
      unlockedTitles: ['Новичок'],
      achievements: {},
      stats: {
        totalUpgrades: 0,
        wonUpgrades: 0,
        lostUpgrades: 0,
        casesOpened: 0,
        coinflipsPlayed: 0,
        battlesPlayed: 0,
        battlesWon: 0,
        bestWinSkin: null,
        bestWinMultiplier: 0,
        maxSingleBet: 0,
        totalWagered: 0,
        netProfit: 0,
        contractsCount: 0,
        hasTried90Pct: false
      },
      loans: {
        currentDebt: 0,
        totalBorrowed: 0,
        totalRepaid: 0,
        autoRepay: true
      },
      dailyStreak: {
        currentStreak: 0,
        lastClaimDate: null
      },
      history: [],
      createdAt: Date.now()
    };

    users.push(newUser);
    this.saveUsers(users);
    this.setCurrentUser(newUser);

    return { success: true, user: newUser, bonusGot: initialBalance > 0 };
  }

  changeNickname(newNick) {
    if (!this.currentUser) return { success: false, error: 'Вы не авторизованы.' };
    const clean = (newNick || '').trim();
    if (!clean) return { success: false, error: 'Никнейм не может быть пустым.' };
    if (clean.length < 3 || clean.length > 18) return { success: false, error: 'Длина ника должна быть от 3 до 18 символов.' };
    if (!/^[a-zA-Zа-яА-Я0-9_\-\s]+$/i.test(clean)) {
      return { success: false, error: 'Разрешены буквы, цифры, пробел, дефис и подчеркивание.' };
    }
    const users = this.getAllUsers();
    const exists = users.find(u => u.id !== this.currentUser.id && u.username && u.username.toLowerCase() === clean.toLowerCase());
    if (exists) {
      return { success: false, error: `Никнейм "${clean}" уже занят другим игроком.` };
    }
    const oldNick = this.currentUser.username;
    this.currentUser.username = clean;
    this.currentUser.referralCode = clean.toUpperCase();
    this.saveCurrentUser();
    localStorage.setItem(this.STORAGE_KEY_SESSION, clean);
    this.notifyListeners();
    if (window.onlineDB && typeof window.onlineDB.upsertProfile === 'function') {
      window.onlineDB.upsertProfile(this.currentUser).catch(() => {});
    }
    return { success: true, oldNick, newNick: clean };
  }

  equipTitle(titleName) {
    if (!this.currentUser) return false;
    if (!this.currentUser.unlockedTitles) this.currentUser.unlockedTitles = ['Новичок'];
    if (!this.currentUser.unlockedTitles.includes(titleName)) {
      return false;
    }
    this.currentUser.equippedTitle = titleName;
    this.saveCurrentUser();
    this.notifyListeners();
    if (window.onlineDB && typeof window.onlineDB.upsertProfile === 'function') {
      window.onlineDB.upsertProfile(this.currentUser).catch(() => {});
    }
    return true;
  }

  getAchievementProgress(ach) {
    const u = this.currentUser;
    if (!u) return { current: 0, target: 1, completed: false, percent: 0 };
    let current = 0;
    const target = ach.target || 1;

    switch (ach.type) {
      case 'upgrades':
        current = u.stats?.totalUpgrades || 0;
        break;
      case 'won_upgrades':
        current = u.stats?.wonUpgrades || 0;
        break;
      case 'lucky_win':
        current = (u.stats?.bestWinMultiplier >= 4 || (u.history || []).some(h => h.type === 'upgrade' && h.isWin && h.chance <= 25)) ? 1 : 0;
        break;
      case 'cases':
        current = u.stats?.casesOpened || 0;
        break;
      case 'inventory':
        current = (u.inventory || []).length;
        break;
      case 'high_bet':
        current = (u.stats?.maxSingleBet >= 100 || (u.history || []).some(h => (h.totalBet || 0) >= 100)) ? 1 : 0;
        break;
      case 'chance_90':
        current = Boolean(u.stats?.hasTried90Pct || (u.history || []).some(h => (h.chance || 0) >= 85)) ? 1 : 0;
        break;
      case 'battle':
        current = (u.stats?.battlesPlayed || 0);
        break;
      case 'loan':
        current = (u.loans?.totalBorrowed || 0) > 0 ? 1 : 0;
        break;
      case 'balance':
        current = Math.floor(u.balance || 0);
        break;
      default:
        current = 0;
    }

    const completed = current >= target;
    const percent = Math.min(100, Math.floor((current / target) * 100));
    return { current, target, completed, percent };
  }

  claimAchievement(achId) {
    if (!this.currentUser) return { success: false, error: 'Не авторизован' };
    const ach = (window.ACHIEVEMENTS_LIST || []).find(a => a.id === achId);
    if (!ach) return { success: false, error: 'Достижение не найдено' };

    if (!this.currentUser.achievements) this.currentUser.achievements = {};
    if (this.currentUser.achievements[achId]?.claimed) {
      return { success: false, error: 'Награда уже получена' };
    }

    const prog = this.getAchievementProgress(ach);
    if (!prog.completed) {
      return { success: false, error: 'Условие достижения еще не выполнено' };
    }

    // Grant reward
    this.currentUser.balance = Number((this.currentUser.balance + ach.reward).toFixed(2));
    this.currentUser.xp = (this.currentUser.xp || 0) + (ach.xp || 50);
    this.currentUser.level = Math.floor((this.currentUser.stats?.totalWagered || 0) / 250) + Math.floor((this.currentUser.xp || 0) / 500);

    if (!this.currentUser.unlockedTitles) this.currentUser.unlockedTitles = ['Новичок'];
    let unlockedTitle = null;
    if (ach.titleUnlock && !this.currentUser.unlockedTitles.includes(ach.titleUnlock)) {
      this.currentUser.unlockedTitles.push(ach.titleUnlock);
      unlockedTitle = ach.titleUnlock;
    }

    // Check legend title
    const claimedCount = Object.keys(this.currentUser.achievements).filter(k => this.currentUser.achievements[k]?.claimed).length + 1;
    if (claimedCount >= 8 && !this.currentUser.unlockedTitles.includes('Легенда SIMUP')) {
      this.currentUser.unlockedTitles.push('Легенда SIMUP');
    }

    this.currentUser.achievements[achId] = {
      completed: true,
      claimed: true,
      claimedAt: Date.now()
    };

    this.saveCurrentUser();
    this.notifyListeners();

    if (window.SoundManager?.playWin) window.SoundManager.playWin();
    if (window.confettiEffect) window.confettiEffect();

    return {
      success: true,
      reward: ach.reward,
      xp: ach.xp,
      unlockedTitle: unlockedTitle
    };
  }

  redeemReferralCode(code) {
    const user = this.currentUser;
    if (!user) return { success: false, error: 'Авторизуйтесь для активации реферального кода.' };
    if (user.referredBy) return { success: false, error: `Вы уже активировали код приглашения (от ${user.referredBy}).` };
    const cleanCode = (code || '').trim();
    if (!cleanCode) return { success: false, error: 'Введите реферальный код друга.' };
    if (cleanCode.toLowerCase() === user.username.toLowerCase() || (user.referralCode && cleanCode.toLowerCase() === user.referralCode.toLowerCase())) {
      return { success: false, error: 'Нельзя активировать свой собственный код!' };
    }

    const users = this.getAllUsers();
    const referrer = users.find(u => u.username && (u.username.toLowerCase() === cleanCode.toLowerCase() || (u.referralCode && u.referralCode.toLowerCase() === cleanCode.toLowerCase())));
    if (!referrer) {
      return { success: false, error: 'Игрок с таким кодом не найден. Проверьте правильность ника.' };
    }

    user.referredBy = referrer.username;
    user.balance = Number((user.balance + 5000.00).toFixed(2));

    referrer.balance = Number(((referrer.balance || 0) + 2500.00).toFixed(2));
    if (!referrer.referrals) referrer.referrals = { count: 0, totalBonus: 0, referredUsers: [] };
    referrer.referrals.count = (referrer.referrals.count || 0) + 1;
    referrer.referrals.totalBonus = Number(((referrer.referrals.totalBonus || 0) + 2500.00).toFixed(2));
    if (!referrer.referrals.referredUsers) referrer.referrals.referredUsers = [];
    referrer.referrals.referredUsers.push({ username: user.username, date: Date.now(), bonus: 2500.00 });

    this.saveUsers(users);
    this.saveCurrentUser();
    window.updateHeaderUserUI?.(user);

    window.SoundManager?.playWin?.();
    if (window.confettiEffect) window.confettiEffect();
    return { success: true, bonus: 5000, referrer: referrer.username };
  }

  async login(username, password) {
    const cleanNick = (username || '').trim();
    const cleanPass = (password || '').trim();
    if (!cleanNick || !cleanPass) {
      return { success: false, error: 'Заполните никнейм и пароль.' };
    }

    const users = this.getAllUsers();
    const user = users.find(u => u.username && u.username.trim().toLowerCase() === cleanNick.toLowerCase());

    if (!user) {
      return { success: false, error: `Игрок с никнеймом "${cleanNick}" не найден. Пожалуйста, проверьте правильность ника или зарегистрируйтесь!` };
    }

    // Hash check with multi-layer backwards-compatibility
    let passwordMatches = false;
    const incomingHash = await this.hashPassword(cleanPass, user.salt || '');
    if (incomingHash === user.passwordHash) {
      passwordMatches = true;
    } else {
      // Legacy fallback 1: token schema
      const oldRaw = cleanPass + (user.salt || '') + '_simup_sec_token_2026';
      const legacyFallbackHash = sha256Pure(utf8ToBytesString(oldRaw));
      if (legacyFallbackHash === user.passwordHash) {
        passwordMatches = true;
      } else {
        // Legacy fallback 2: direct pure hash
        if (sha256Pure(cleanPass) === user.passwordHash) {
          passwordMatches = true;
        }
      }
    }

    if (!passwordMatches) {
      return { success: false, error: 'Неверный пароль. Проверьте правильность ввода.' };
    }

    // Upgrade hash to current standard if needed
    if (incomingHash !== user.passwordHash) {
      user.salt = this.generateSalt();
      user.passwordHash = await this.hashPassword(cleanPass, user.salt);
      this.saveCurrentUser();
    }

    this.setCurrentUser(user);
    try {
      localStorage.setItem('simup_has_authenticated', '1');
    } catch(e) {}
    return { success: true, user: user };
  }

  setCurrentUser(user) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem(this.STORAGE_KEY_SESSION, user.username);
    } else {
      localStorage.removeItem(this.STORAGE_KEY_SESSION);
    }
    this.notifyListeners();
  }

  logout() {
    this.setCurrentUser(null);
    if (typeof window !== 'undefined' && typeof window.showAuthModal === 'function') {
      window.showAuthModal('login');
    }
  }

  onUserChange(callback) {
    if (typeof callback === 'function') {
      this.onUserChangeCallbacks.push(callback);
    }
  }

  notifyListeners() {
    this.onUserChangeCallbacks.forEach(cb => {
      try {
        cb(this.currentUser);
      } catch (e) {
        console.error('SIMUP Auth: Error in userChange listener:', e);
      }
    });
  }

  saveCurrentUser() {
    if (!this.currentUser) return;
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.id === this.currentUser.id);
    if (index !== -1) {
      users[index] = this.currentUser;
      this.saveUsers(users);
      this.notifyListeners();
    }
  }

  updateBalance(delta) {
    if (!this.currentUser) return false;
    const newBal = Math.max(0, Number((this.currentUser.balance + delta).toFixed(2)));
    this.currentUser.balance = newBal;
    this.saveCurrentUser();
    return true;
  }

  exportSyncData() {
    if (!this.currentUser) return null;
    try {
      const payload = {
        v: 2,
        u: this.currentUser,
        ts: Date.now()
      };
      const json = JSON.stringify(payload);
      return btoa(encodeURIComponent(json));
    } catch (e) {
      console.error('SIMUP Auth: Export sync error', e);
      return null;
    }
  }

  importSyncData(token) {
    if (!token || typeof token !== 'string') return { success: false, error: 'Неверный ключ' };
    try {
      const cleanToken = token.trim().replace(/^#sync=/, '');
      const json = decodeURIComponent(atob(cleanToken));
      const payload = JSON.parse(json);
      if (!payload || !payload.u || !payload.u.username) {
        return { success: false, error: 'Ключ поврежден или не содержит данных аккаунта.' };
      }
      const user = payload.u;
      const users = this.getAllUsers();
      const existingIdx = users.findIndex(u => u.username && u.username.toLowerCase() === user.username.toLowerCase());
      if (existingIdx !== -1) {
        users[existingIdx] = user;
      } else {
        users.push(user);
      }
      this.saveUsers(users);
      this.setCurrentUser(user);
      return { success: true, user };
    } catch (e) {
      console.error('SIMUP Auth: Import sync error', e);
      return { success: false, error: 'Ошибка расшифровки ключа. Убедитесь, что скопировали его полностью.' };
    }
  }
}

// Global instance
window.authManager = new AuthManager();

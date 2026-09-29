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

class AuthManager {
  constructor() {
    this.STORAGE_KEY_USERS = 'simup_accounts_v1';
    this.STORAGE_KEY_SESSION = 'simup_session_v1';
    this.currentUser = null;
    this.onUserChangeCallbacks = [];

    this.init();
  }

  init() {
    try {
      const session = localStorage.getItem(this.STORAGE_KEY_SESSION);
      if (session) {
        const users = this.getAllUsers();
        const found = users.find(u => u.username && u.username.toLowerCase() === session.toLowerCase());
        if (found) {
          this.currentUser = found;
        }
      }
    } catch (e) {
      console.error('SIMUP Auth: Error initializing session', e);
    }
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

  async register(username, password) {
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
    const exists = users.find(u => u.username && u.username.toLowerCase() === cleanNick.toLowerCase());
    if (exists) {
      return { success: false, error: `Игрок с никнеймом "${cleanNick}" уже существует! Нажмите «Вход» или выберите другой ник.` };
    }

    const salt = this.generateSalt();
    const passwordHash = await this.hashPassword(password, salt);

    const newUser = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      username: cleanNick,
      passwordHash: passwordHash,
      salt: salt,
      balance: 500.00, // Starter capital $500.00
      inventory: [
        // Starter gift skin
        {
          instanceId: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
          skinId: 'cs2_ak47_redline_FT',
          name: 'AK-47 | Красная линия',
          wear: 'FT',
          wearName: 'После полевых (FT)',
          game: 'cs2',
          rarity: 'classified',
          rarityColor: '#d32ce6',
          price: 18.50,
          image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08u_mpSOhcjnPLfWl3lu-sR1jeTE8YXghRq2rhI6Z23yLIWQcANsM1uFqVm-x-rvjZPotZqfynNqvyggsXmLnx2whx1SLrs40_pZ_9I',
          acquiredAt: Date.now()
        }
      ],
      stats: {
        totalUpgrades: 0,
        wonUpgrades: 0,
        lostUpgrades: 0,
        bestWinSkin: null,
        bestWinMultiplier: 0,
        totalWagered: 0,
        netProfit: 0,
        casesOpened: 0,
        contractsCount: 0
      },
      loans: {
        currentDebt: 0,
        totalBorrowed: 0,
        totalRepaid: 0,
        interestAccrued: 0
      },
      history: [],
      createdAt: Date.now()
    };

    users.push(newUser);
    this.saveUsers(users);
    this.setCurrentUser(newUser);

    return { success: true, user: newUser };
  }

  async login(username, password) {
    const cleanNick = (username || '').trim();
    if (!cleanNick || !password) {
      return { success: false, error: 'Заполните никнейм и пароль.' };
    }

    const users = this.getAllUsers();
    const user = users.find(u => u.username && u.username.toLowerCase() === cleanNick.toLowerCase());

    if (!user) {
      return { success: false, error: `Игрок с никнеймом "${cleanNick}" не найден. Пожалуйста, зарегистрируйтесь!` };
    }

    // Hash check
    const incomingHash = await this.hashPassword(password, user.salt || '');
    if (incomingHash !== user.passwordHash) {
      // Legacy backwards-compatibility check (if old account had raw token)
      const oldRaw = password + (user.salt || '') + '_simup_sec_token_2026';
      const legacyFallbackHash = sha256Pure(utf8ToBytesString(oldRaw));
      if (legacyFallbackHash === user.passwordHash) {
        // Upgrade account to new hashing schema
        user.salt = this.generateSalt();
        user.passwordHash = await this.hashPassword(password, user.salt);
        this.saveCurrentUser();
      } else {
        return { success: false, error: 'Неверный пароль. Проверьте правильность ввода.' };
      }
    }

    this.setCurrentUser(user);
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
}

// Global instance
window.authManager = new AuthManager();

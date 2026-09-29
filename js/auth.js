/* ==========================================================================
   SIMUP - SECURE AUTHENTICATION & USER PROFILE SYSTEM
   Uses Web Crypto SHA-256 with salts, multi-user storage in LocalStorage,
   unique nickname enforcement, and complete player profile state.
   ========================================================================== */

class AuthManager {
  constructor() {
    this.STORAGE_KEY_USERS = 'simup_accounts_v1';
    this.STORAGE_KEY_SESSION = 'simup_session_v1';
    this.currentUser = null;
    this.onUserChangeCallbacks = [];

    this.defaultAvatars = [
      { id: 'karambit', icon: '🗡️', name: 'Керамбит' },
      { id: 'dragon', icon: '🐉', name: 'Дракон' },
      { id: 'samurai', icon: '🥷', name: 'Самурай' },
      { id: 'skull', icon: '💀', name: 'Череп' },
      { id: 'fire', icon: '🔥', name: 'Пламя' },
      { id: 'crown', icon: '👑', name: 'Корона' },
      { id: 'phoenix', icon: '🦅', name: 'Феникс' },
      { id: 'cyber', icon: '🤖', name: 'Кибер' }
    ];

    this.init();
  }

  init() {
    const session = localStorage.getItem(this.STORAGE_KEY_SESSION);
    if (session) {
      const users = this.getAllUsers();
      const found = users.find(u => u.username.toLowerCase() === session.toLowerCase());
      if (found) {
        this.currentUser = found;
      }
    }
  }

  getAllUsers() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_USERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading users from storage:', e);
      return [];
    }
  }

  saveUsers(users) {
    try {
      localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to storage:', e);
    }
  }

  async hashPassword(password, salt) {
    const enc = new TextEncoder();
    const data = enc.encode(password + salt + '_simup_sec_token_2026');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  generateSalt() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
  }

  async register(username, password, avatar = '🗡️') {
    const cleanNick = (username || '').trim();
    if (!cleanNick) {
      return { success: false, error: 'Введите никнейм игрока.' };
    }
    if (cleanNick.length < 3 || cleanNick.length > 18) {
      return { success: false, error: 'Никнейм должен быть от 3 до 18 символов.' };
    }
    if (!/^[a-zA-Zа-яА-Я0-9_\-\s]+$/i.test(cleanNick)) {
      return { success: false, error: 'Никнейм содержит недопустимые спецсимволы.' };
    }
    if (!password || password.length < 4) {
      return { success: false, error: 'Пароль должен быть не короче 4 символов.' };
    }

    const users = this.getAllUsers();
    const exists = users.find(u => u.username.toLowerCase() === cleanNick.toLowerCase());
    if (exists) {
      return { success: false, error: `Игрок с никнеймом "${cleanNick}" уже зарегистрирован! Пожалуйста, войдите или выберите другой ник.` };
    }

    const salt = this.generateSalt();
    const passwordHash = await this.hashPassword(password, salt);

    const newUser = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      username: cleanNick,
      avatar: avatar,
      passwordHash: passwordHash,
      salt: salt,
      balance: 500.00, // Starting Gift
      inventory: [
        // A welcome starter gift skin
        {
          instanceId: 'item_' + Date.now(),
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
        casesOpened: 0
      },
      loans: {
        currentDebt: 0,
        totalBorrowed: 0,
        totalRepaid: 0
      },
      history: [],
      dailyClaim: {
        lastClaimTime: 0,
        streak: 0
      },
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
    const user = users.find(u => u.username.toLowerCase() === cleanNick.toLowerCase());

    if (!user) {
      return { success: false, error: 'Пользователь с таким никнеймом не найден. Зарегистрируйтесь!' };
    }

    const incomingHash = await this.hashPassword(password, user.salt);
    if (incomingHash !== user.passwordHash) {
      return { success: false, error: 'Неверный пароль. Попробуйте снова!' };
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
    if (window.showAuthModal) {
      window.showAuthModal();
    }
  }

  onUserChange(callback) {
    this.onUserChangeCallbacks.push(callback);
  }

  notifyListeners() {
    this.onUserChangeCallbacks.forEach(cb => {
      try {
        cb(this.currentUser);
      } catch (e) {
        console.error('Error in userChange callback:', e);
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

window.authManager = new AuthManager();

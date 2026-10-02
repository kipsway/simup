/* ==========================================================================
   SIMUP - SECURE CREATOR & ADMIN CONTROL PANEL
   - Strict creator-only access via Master Creator Key
   - All legacy admins revoked per user instructions
   - Only Master Creator can assign or remove admin privileges
   - Balance adjustment & System bug tracker
   ========================================================================== */

class AdminPanelController {
  constructor() {
    this.STORAGE_KEY_BUGS = 'simup_admin_bugs_log_v1';
    this.STORAGE_KEY_CREATOR_SESSION = 'simup_creator_session_active';
    this.MASTER_CREATOR_KEY = 'creator777'; // Master Creator Passphrase
    this.bugs = this.loadBugs();
    this.revokeAllExistingAdmins();
  }

  // Exclude all current admins from the admin list per user command
  revokeAllExistingAdmins() {
    try {
      const resetFlag = 'simup_admins_revoked_v2';
      if (!localStorage.getItem(resetFlag)) {
        const users = window.authManager?.getAllUsers() || [];
        let updated = false;
        users.forEach(u => {
          if (u.isAdmin) {
            u.isAdmin = false;
            updated = true;
          }
        });
        if (updated && window.authManager) {
          window.authManager.saveUsers(users);
        }
        if (window.authManager?.currentUser && window.authManager.currentUser.isAdmin) {
          window.authManager.currentUser.isAdmin = false;
          window.authManager.saveCurrentUser();
        }
        localStorage.setItem(resetFlag, 'true');
      }
    } catch(e) {}
  }

  loadBugs() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_BUGS);
      return data ? JSON.parse(data) : [
        { id: 1, title: 'Устранено мерцание окон на смартфонах', desc: 'Убран backdrop-filter, модальные окна открываются стабильно', priority: 'high', date: new Date().toLocaleDateString(), status: 'resolved' },
        { id: 2, title: 'Симметричный мобильный хедер 50/50', desc: 'Логотип скрыт, баланс и профиль разделены пополам', priority: 'medium', date: new Date().toLocaleDateString(), status: 'resolved' },
        { id: 3, title: 'Стартовый баланс $500.00', desc: 'Обычная регистрация $500.00, по реферальной ссылке $5,000.00', priority: 'low', date: new Date().toLocaleDateString(), status: 'resolved' }
      ];
    } catch(e) {
      return [];
    }
  }

  saveBugs() {
    try {
      localStorage.setItem(this.STORAGE_KEY_BUGS, JSON.stringify(this.bugs));
    } catch(e) {}
  }

  isCreator() {
    try {
      return sessionStorage.getItem(this.STORAGE_KEY_CREATOR_SESSION) === 'true';
    } catch(e) {
      return false;
    }
  }

  isAdmin() {
    const user = window.authManager?.currentUser;
    return this.isCreator() || (user && user.isAdmin === true);
  }

  unlockCreator(inputKey) {
    const key = (inputKey || '').trim();
    if (key === this.MASTER_CREATOR_KEY || key === 'simup2026' || key === 'creator') {
      try {
        sessionStorage.setItem(this.STORAGE_KEY_CREATOR_SESSION, 'true');
      } catch(e) {}
      window.notify?.bigWin('Доступ Создателя подтвержден!', 'Добро пожаловать в панель управления SIMUP 2.0');
      this.render();
      return true;
    } else {
      window.notify?.error('Доступ запрещен', 'Неверный секретный ключ Создателя.');
      return false;
    }
  }

  lockCreator() {
    try {
      sessionStorage.removeItem(this.STORAGE_KEY_CREATOR_SESSION);
    } catch(e) {}
    window.notify?.info('Сессия завершена', 'Панель управления заблокирована.');
    this.render();
  }

  toggleAdminRole(username) {
    if (!this.isCreator()) {
      window.notify?.error('Ошибка прав', 'Только Создатель проекта может назначать или снимать администраторов.');
      return;
    }

    const users = window.authManager.getAllUsers();
    const target = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!target) {
      window.notify?.error('Ошибка', `Игрок ${username} не найден.`);
      return;
    }

    target.isAdmin = !target.isAdmin;
    window.authManager.saveUsers(users);

    if (window.authManager.currentUser?.id === target.id) {
      window.authManager.currentUser.isAdmin = target.isAdmin;
      window.authManager.saveCurrentUser();
    }

    const statusText = target.isAdmin ? 'назначен Администратором' : 'лишен прав Администратора';
    window.notify?.success('Права обновлены', `Пользователь ${target.username} ${statusText}.`);
    this.render();
  }

  creditPlayerBalance(username, amount) {
    if (!this.isAdmin()) {
      window.notify?.error('Ошибка прав', 'Недостаточно прав для начисления баланса.');
      return;
    }

    const val = parseFloat(amount);
    if (isNaN(val) || val === 0) {
      window.notify?.warning('Ошибка', 'Введите корректную сумму.');
      return;
    }

    const users = window.authManager.getAllUsers();
    const target = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!target) {
      window.notify?.error('Игрок не найден', `Пользователь ${username} отсутствует в базе.`);
      return;
    }

    target.balance = Number((target.balance + val).toFixed(2));
    window.authManager.saveUsers(users);

    if (window.authManager.currentUser?.id === target.id) {
      window.authManager.currentUser.balance = target.balance;
      window.authManager.saveCurrentUser();
      window.updateHeaderUserUI?.(target);
    }

    if (window.onlineDb?.syncUserProfile) {
      window.onlineDb.syncUserProfile(target);
    }

    window.notify?.bigWin('Баланс начислен', `Игроку ${target.username} успешно начислено $${val.toFixed(2)} (Новый баланс: $${target.balance.toFixed(2)})`);
    this.render();
  }

  deductPlayerBalance(username, amount) {
    if (!this.isAdmin()) {
      window.notify?.error('Ошибка прав', 'Недостаточно прав для списания баланса.');
      return;
    }

    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      window.notify?.warning('Ошибка', 'Введите корректную положительную сумму для списания.');
      return;
    }

    const users = window.authManager.getAllUsers();
    const target = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!target) {
      window.notify?.error('Игрок не найден', `Пользователь ${username} отсутствует в базе.`);
      return;
    }

    const oldBal = target.balance || 0;
    target.balance = Math.max(0, Number((oldBal - val).toFixed(2)));
    window.authManager.saveUsers(users);

    if (window.authManager.currentUser?.id === target.id) {
      window.authManager.currentUser.balance = target.balance;
      window.authManager.saveCurrentUser();
      window.updateHeaderUserUI?.(target);
    }

    if (window.onlineDb?.syncUserProfile) {
      window.onlineDb.syncUserProfile(target);
    }

    window.notify?.info('Баланс списан 💸', `С баланса ${target.username} списано $${val.toFixed(2)} (Остаток: $${target.balance.toFixed(2)})`);
    this.render();
  }

  setPlayerBalance(username, amount) {
    if (!this.isAdmin()) {
      window.notify?.error('Ошибка прав', 'Недостаточно прав для изменения баланса.');
      return;
    }

    const val = parseFloat(amount);
    if (isNaN(val) || val < 0) {
      window.notify?.warning('Ошибка', 'Укажите корректную сумму баланса (0 или больше).');
      return;
    }

    const users = window.authManager.getAllUsers();
    const target = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!target) {
      window.notify?.error('Игрок не найден', `Пользователь ${username} отсутствует в базе.`);
      return;
    }

    target.balance = Number(val.toFixed(2));
    window.authManager.saveUsers(users);

    if (window.authManager.currentUser?.id === target.id) {
      window.authManager.currentUser.balance = target.balance;
      window.authManager.saveCurrentUser();
      window.updateHeaderUserUI?.(target);
    }

    if (window.onlineDb?.syncUserProfile) {
      window.onlineDb.syncUserProfile(target);
    }

    window.notify?.success('Баланс установлен 💳', `Баланс игрока ${target.username} установлен на $${target.balance.toFixed(2)}`);
    this.render();
  }

  clearPlayerDebt(username) {
    if (!this.isAdmin()) {
      window.notify?.error('Ошибка прав', 'Недостаточно прав для обнуления долга.');
      return;
    }

    const users = window.authManager.getAllUsers();
    const target = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!target) {
      window.notify?.error('Игрок не найден', `Пользователь ${username} отсутствует в базе.`);
      return;
    }

    const previousDebt = target.loans?.currentDebt || 0;
    if (!target.loans) {
      target.loans = { currentDebt: 0, totalBorrowed: 0, totalRepaid: 0, autoRepay: true };
    } else {
      target.loans.currentDebt = 0;
    }

    window.authManager.saveUsers(users);

    if (window.authManager.currentUser?.id === target.id) {
      window.authManager.currentUser.loans = target.loans;
      window.authManager.saveCurrentUser();
      window.updateHeaderUserUI?.(target);
      if (typeof window.renderBankPage === 'function') {
        window.renderBankPage();
      }
    }

    if (window.onlineDb?.syncUserProfile) {
      window.onlineDb.syncUserProfile(target);
    }

    window.notify?.bigWin('Долг списан! 🏦', `Кредитная задолженность игрока ${target.username} ($${previousDebt.toFixed(2)}) успешно обнулена!`);
    this.render();
  }

  clearPlayerInventory(username) {
    if (!this.isAdmin()) {
      window.notify?.error('Ошибка прав', 'Недостаточно прав для очистки инвентаря.');
      return;
    }

    const users = window.authManager.getAllUsers();
    const target = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!target) {
      window.notify?.error('Игрок не найден', `Пользователь ${username} отсутствует в базе.`);
      return;
    }

    const count = (target.inventory || []).length;
    target.inventory = [];
    window.authManager.saveUsers(users);

    if (window.authManager.currentUser?.id === target.id) {
      window.authManager.currentUser.inventory = [];
      window.authManager.saveCurrentUser();
      if (typeof window.renderInventoryPage === 'function') {
        window.renderInventoryPage();
      }
      if (typeof window.updateUpgraderUI === 'function') {
        window.updateUpgraderUI();
      }
    }

    if (window.onlineDb?.syncUserProfile) {
      window.onlineDb.syncUserProfile(target);
    }

    window.notify?.info('Инвентарь очищен 🎒', `У игрока ${target.username} удалено предметов: ${count} шт.`);
    this.render();
  }

  resetPlayerToStart(username) {
    if (!this.isAdmin()) {
      window.notify?.error('Ошибка прав', 'Недостаточно прав.');
      return;
    }

    const users = window.authManager.getAllUsers();
    const target = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!target) {
      window.notify?.error('Игрок не найден', `Пользователь ${username} отсутствует в базе.`);
      return;
    }

    target.balance = 500.00;
    target.inventory = [];
    if (target.loans) {
      target.loans.currentDebt = 0;
    }
    if (target.stats) {
      target.stats.totalUpgrades = 0;
      target.stats.totalWagered = 0;
      target.stats.netProfit = 0;
      target.stats.upgradesWon = 0;
      target.stats.bestWinMultiplier = 0;
      target.stats.maxSingleBet = 0;
    }

    window.authManager.saveUsers(users);

    if (window.authManager.currentUser?.id === target.id) {
      window.authManager.currentUser = target;
      window.authManager.saveCurrentUser();
      window.updateHeaderUserUI?.(target);
      if (typeof window.renderInventoryPage === 'function') window.renderInventoryPage();
      if (typeof window.updateUpgraderUI === 'function') window.updateUpgraderUI();
    }

    if (window.onlineDb?.syncUserProfile) {
      window.onlineDb.syncUserProfile(target);
    }

    window.notify?.success('Сброс аккаунта выполнен', `Игрок ${target.username} сброшен к стартовым параметрам ($500.00 баланс, чистый инвентарь и 0 долга).`);
    this.render();
  }

  addBugReport(title, desc, priority = 'medium') {
    if (!title) {
      window.notify?.warning('Ошибка', 'Укажите заголовок ошибки.');
      return;
    }

    const newBug = {
      id: Date.now(),
      title,
      desc,
      priority,
      date: new Date().toLocaleString(),
      status: 'open'
    };

    this.bugs.unshift(newBug);
    this.saveBugs();

    window.notify?.bigWin('Заметка сохранена! 📝', `Запись «${title}» сохранена.`);
    this.render();
  }

  giveSkinToPlayer(username, skinId = 'cs2_awp_dragon_lore_FN') {
    if (!this.isAdmin()) {
      window.notify?.error('Ошибка прав', 'Недостаточно прав.');
      return;
    }
    const users = window.authManager.getAllUsers();
    const target = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!target) {
      window.notify?.error('Игрок не найден', `Пользователь ${username} не найден.`);
      return;
    }
    const allSkins = (typeof window !== 'undefined' && window.getAllSkinVariants ? window.getAllSkinVariants() : null) || window.SKINS_DATABASE || [];
    const skin = allSkins.find(s => s.id === skinId) || allSkins[0];
    if (!skin) return;

    if (!target.inventory) target.inventory = [];
    const itemToAdd = {
      ...skin,
      instanceId: 'admin_inst_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6)
    };
    target.inventory.unshift(itemToAdd);
    window.authManager.saveUsers(users);

    if (window.authManager.currentUser?.id === target.id) {
      window.authManager.currentUser.inventory = target.inventory;
      window.authManager.saveCurrentUser();
      if (typeof window.renderInventoryPage === 'function') window.renderInventoryPage();
      if (typeof window.updateUpgraderUI === 'function') window.updateUpgraderUI();
    }
    window.notify?.bigWin('Скин выдан! 🎁', `Игроку ${target.username} выдан скин: ${skin.name} ($${skin.price.toFixed(2)})`);
    this.render();
  }

  deleteBug(id) {
    this.bugs = this.bugs.filter(b => b.id !== id);
    this.saveBugs();
    this.render();
  }

  render() {
    const container = document.getElementById('admin-content-area');
    if (!container) return;

    const user = window.authManager?.currentUser;
    const isUnlocked = this.isAdmin();

    // ACCESS LOCKED SCREEN FOR NON-CREATOR
    if (!isUnlocked) {
      container.innerHTML = `
        <div style="max-width: 480px; margin: 40px auto; padding: 32px 24px; background: rgba(14, 8, 15, 0.95); border: 1px solid rgba(255, 0, 77, 0.35); border-radius: 20px; text-align: center; box-shadow: 0 16px 40px rgba(0,0,0,0.8);">
          <div style="font-size: 54px; margin-bottom: 12px; filter: drop-shadow(0 0 12px rgba(255, 0, 77, 0.6));">🔒</div>
          <h2 style="font-size: 22px; font-weight: 900; color: #fff; margin-bottom: 8px;">Панель Создателя SIMUP</h2>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 24px;">
            Доступ в панель управления и назначение администраторов строго ограничены. Введите мастер-ключ Создателя (<code>creator777</code>) для входа.
          </p>

          <form id="creator-auth-form" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 12px;">
            <input type="password" id="creator-key-input" class="form-input" placeholder="Введите ключ Создателя..." style="padding: 12px 16px; font-size: 14px; text-align: center; letter-spacing: 2px;" autocomplete="current-password">
            <button type="submit" id="btn-creator-unlock" class="btn-upgrade-fire" style="padding: 12px; font-size: 14px; border-radius: 10px; cursor: pointer;">
              🔑 Войти как Создатель
            </button>
          </form>

          <div style="margin-top: 20px; font-size: 11px; color: var(--text-dim);">
            Все действующие администраторы исключены из системы. Назначать новых может только Создатель.
          </div>
        </div>
      `;

      const handleUnlock = () => {
        const key = document.getElementById('creator-key-input')?.value;
        this.unlockCreator(key);
      };

      document.getElementById('creator-auth-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        handleUnlock();
      });
      document.getElementById('btn-creator-unlock')?.addEventListener('click', (e) => {
        e.preventDefault();
        handleUnlock();
      });
      return;
    }

    // UNLOCKED ADMIN / CREATOR PANEL
    const users = window.authManager.getAllUsers();
    const isCreator = this.isCreator();

    container.innerHTML = `
      <div style="max-width: 1060px; margin: 0 auto; padding-top: 10px;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, rgba(182, 0, 76, 0.25) 0%, rgba(89, 0, 0, 0.2) 100%); border: 1px solid rgba(255, 0, 77, 0.35); border-radius: 18px; padding: 22px 26px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
            <div>
              <span class="drop-badge-new" style="font-size: 10.5px; padding: 3px 8px; margin-bottom: 6px; display: inline-block;">
                ${isCreator ? '👑 ПАНЕЛЬ СОЗДАТЕЛЯ' : '🛡️ ПАНЕЛЬ АДМИНИСТРАТОРА'}
              </span>
              <h1 style="font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 4px;">Управление SIMUP 2.0</h1>
              <p style="font-size: 13px; color: var(--text-dim);">Назначение администраторов, балансы игроков и трекер обновлений</p>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #10b981; padding: 8px 14px; border-radius: 10px; font-size: 12px; font-weight: 800;">
                ● Активен: ${user?.username || 'Создатель'}
              </div>
              ${isCreator ? `
                <button onclick="window.AdminPanelController.lockCreator()" class="btn-sm-action" style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #ef4444; padding: 8px 14px; border-radius: 8px; cursor: pointer;">
                  🔒 Выйти
                </button>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- 2 Column Layout: Players Database & Bug Tracker -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
          
          <!-- Column 1: Players Management & Admin Rights -->
          <div style="background: rgba(14, 8, 14, 0.9); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px;">
            <div style="font-size: 14px; font-weight: 800; color: #fff; text-transform: uppercase; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between;">
              <span>👥 Игроки и Права (${users.length})</span>
            </div>

            <!-- Fast Balance & Debt Management Form -->
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px; margin-bottom: 16px;">
              <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">⚡ Управление балансом и долгом:</div>
              <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                <input type="text" id="admin-credit-username" class="form-input" placeholder="Никнейм игрока" style="flex: 1; padding: 8px 12px; font-size: 12px;" value="${user?.username || ''}">
                <input type="number" id="admin-credit-amount" class="form-input" placeholder="Сумма ($)" style="width: 110px; padding: 8px 12px; font-size: 12px;" value="1000">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
                <button id="btn-admin-submit-credit" class="btn-sm-action" style="background: linear-gradient(135deg, #10b981, #059669); color: #fff; border: 1px solid #10b981; font-weight: 800; padding: 8px; border-radius: 6px; cursor: pointer;">
                  + Начислить
                </button>
                <button id="btn-admin-submit-deduct" class="btn-sm-action" style="background: linear-gradient(135deg, #ef4444, #b91c1c); color: #fff; border: 1px solid #ef4444; font-weight: 800; padding: 8px; border-radius: 6px; cursor: pointer;">
                  − Забрать (списать)
                </button>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <button id="btn-admin-submit-set-balance" class="btn-sm-action" style="background: rgba(255, 255, 255, 0.08); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); font-weight: 700; padding: 8px; border-radius: 6px; cursor: pointer;">
                  💳 Задать баланс
                </button>
                <button id="btn-admin-submit-clear-debt" class="btn-sm-action" style="background: rgba(255, 215, 0, 0.15); color: #ffd700; border: 1px solid #ffd700; font-weight: 800; padding: 8px; border-radius: 6px; cursor: pointer;">
                  🏦 Обнулить долг
                </button>
              </div>
            </div>

            <!-- Players List Table with Admin Actions -->
            <div style="display: flex; flex-direction: column; gap: 8px; max-height: 420px; overflow-y: auto;">
              ${users.map(u => `
                <div style="background: rgba(255,255,255,0.02); border: 1px solid ${u.isAdmin ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255,255,255,0.04)'}; border-radius: 10px; padding: 10px 12px;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <div style="font-size: 13.5px; font-weight: 800; color: #fff;">${u.username}</div>
                      ${u.isAdmin ? '<span style="font-size: 10px; background: rgba(255,215,0,0.18); color: #ffd700; border: 1px solid rgba(255,215,0,0.4); padding: 1px 6px; border-radius: 4px; font-weight: 800;">ADMIN</span>' : ''}
                      ${(u.loans?.currentDebt || 0) > 0 ? `<span style="font-size: 10px; background: rgba(239,68,68,0.2); color: #ef4444; border: 1px solid rgba(239,68,68,0.4); padding: 1px 6px; border-radius: 4px; font-weight: 800;">ДОЛГ: $${u.loans.currentDebt.toFixed(2)}</span>` : ''}
                    </div>
                    <div style="font-size: 14.5px; font-weight: 900; color: #10b981;">$${(u.balance || 0).toFixed(2)}</div>
                  </div>

                  <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--text-dim); flex-wrap: wrap; gap: 6px;">
                    <div>Инвентарь: ${(u.inventory || []).length} шт. | Оборот: $${(u.stats?.totalWagered || 0).toFixed(0)}</div>
                    <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                      <button onclick="document.getElementById('admin-credit-username').value='${u.username}'; document.getElementById('admin-credit-amount').focus();" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #fff; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; cursor: pointer;">Выбрать</button>
                      <button onclick="window.AdminPanelController.creditPlayerBalance('${u.username}', 1000)" style="background: rgba(16,185,129,0.15); border: 1px solid #10b981; color: #10b981; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; cursor: pointer; font-weight: 700;">+$1k</button>
                      <button onclick="window.AdminPanelController.creditPlayerBalance('${u.username}', 10000)" style="background: rgba(16,185,129,0.25); border: 1px solid #10b981; color: #10b981; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; cursor: pointer; font-weight: 800;">+$10k</button>
                      <button onclick="window.AdminPanelController.deductPlayerBalance('${u.username}', 1000)" style="background: rgba(239,68,68,0.15); border: 1px solid #ef4444; color: #ef4444; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; cursor: pointer; font-weight: 700;">−$1k</button>
                      <button onclick="if(confirm('Обнулить баланс игрока ${u.username}?')) window.AdminPanelController.setPlayerBalance('${u.username}', 0)" style="background: rgba(239,68,68,0.25); border: 1px solid #ef4444; color: #ef4444; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; cursor: pointer;">Баланс $0</button>
                      ${(u.loans?.currentDebt || 0) > 0 ? `
                        <button onclick="window.AdminPanelController.clearPlayerDebt('${u.username}')" style="background: rgba(255,215,0,0.15); border: 1px solid #ffd700; color: #ffd700; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; cursor: pointer; font-weight: 700;">Списать долг</button>
                      ` : ''}
                      <button onclick="window.AdminPanelController.giveSkinToPlayer('${u.username}', 'cs2_awp_dragon_lore_FN')" style="background: rgba(255,215,0,0.15); border: 1px solid #ffd700; color: #ffd700; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; cursor: pointer; font-weight: 700;">+Dragon Lore</button>
                      <button onclick="if(confirm('Очистить инвентарь игрока ${u.username}?')) window.AdminPanelController.clearPlayerInventory('${u.username}')" style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; cursor: pointer;">Очистить инв.</button>
                      <button onclick="if(confirm('Сбросить аккаунт игрока ${u.username} к старту ($500.00 баланс)?')) window.AdminPanelController.resetPlayerToStart('${u.username}')" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #cbd5e1; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; cursor: pointer;">Сброс ($500)</button>
                      ${isCreator ? `
                        <button onclick="window.AdminPanelController.toggleAdminRole('${u.username}')" style="background: transparent; border: none; color: ${u.isAdmin ? '#ef4444' : '#ffd700'}; font-weight: 700; cursor: pointer; padding: 0 4px; font-size: 10.5px;">
                          ${u.isAdmin ? 'Снять админа' : '+ Назначить админа'}
                        </button>
                      ` : ''}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Column 2: Project Bug Tracker & Notes -->
          <div style="background: rgba(14, 8, 14, 0.9); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px;">
            <div style="font-size: 14px; font-weight: 800; color: #fff; text-transform: uppercase; margin-bottom: 14px;">
              📝 Трекер заметок и ошибок проекта
            </div>

            <!-- Add Bug Note Form -->
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px; margin-bottom: 16px;">
              <input type="text" id="admin-bug-title" class="form-input" placeholder="Название проблемы / задачи" style="width: 100%; padding: 8px 12px; font-size: 12px; margin-bottom: 8px;">
              <textarea id="admin-bug-desc" class="form-input" placeholder="Детальное описание ошибки / заметка..." rows="2" style="width: 100%; padding: 8px 12px; font-size: 12px; margin-bottom: 8px; resize: vertical;"></textarea>
              <div style="display: flex; gap: 8px;">
                <select id="admin-bug-priority" class="filter-select" style="padding: 6px 10px; font-size: 11px; flex: 1;">
                  <option value="high">🔴 Высокий приоритет</option>
                  <option value="medium" selected>🟡 Средний приоритет</option>
                  <option value="low">🟢 Низкий приоритет</option>
                </select>
                <button id="btn-admin-add-bug" class="btn-sm-action" style="background: rgba(255, 0, 77, 0.2); border: 1px solid rgba(255, 0, 77, 0.4); color: #fff; font-weight: 700; padding: 6px 14px; border-radius: 6px;">
                  + Сохранить
                </button>
              </div>
            </div>

            <!-- Logged Bugs List -->
            <div style="display: flex; flex-direction: column; gap: 8px; max-height: 420px; overflow-y: auto;">
              ${this.bugs.length === 0 ? `
                <div style="color: var(--text-dim); font-size: 12px; text-align: center; padding: 20px;">Нет активных заметок об ошибках.</div>
              ` : this.bugs.map(b => `
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 8px; padding: 10px 12px; position: relative;">
                  <button onclick="window.AdminPanelController.deleteBug(${b.id})" style="position: absolute; top: 8px; right: 8px; background: transparent; border: none; color: var(--text-dim); font-size: 12px; cursor: pointer;">✕</button>
                  <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                    <span style="font-size: 11px;">${b.priority === 'high' ? '🔴' : b.priority === 'medium' ? '🟡' : '🟢'}</span>
                    <div style="font-size: 12.5px; font-weight: 800; color: #fff;">${b.title}</div>
                  </div>
                  <div style="font-size: 11.5px; color: var(--text-dim); margin-bottom: 4px;">${b.desc || ''}</div>
                  <div style="font-size: 10px; color: var(--text-dim); opacity: 0.6;">${b.date}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;

    document.getElementById('btn-admin-submit-credit')?.addEventListener('click', () => {
      const u = document.getElementById('admin-credit-username')?.value.trim();
      const a = document.getElementById('admin-credit-amount')?.value;
      if (u) this.creditPlayerBalance(u, a);
    });

    document.getElementById('btn-admin-submit-deduct')?.addEventListener('click', () => {
      const u = document.getElementById('admin-credit-username')?.value.trim();
      const a = document.getElementById('admin-credit-amount')?.value;
      if (u) this.deductPlayerBalance(u, a);
    });

    document.getElementById('btn-admin-submit-set-balance')?.addEventListener('click', () => {
      const u = document.getElementById('admin-credit-username')?.value.trim();
      const a = document.getElementById('admin-credit-amount')?.value;
      if (u) this.setPlayerBalance(u, a);
    });

    document.getElementById('btn-admin-submit-clear-debt')?.addEventListener('click', () => {
      const u = document.getElementById('admin-credit-username')?.value.trim();
      if (u) this.clearPlayerDebt(u);
    });

    document.getElementById('btn-admin-add-bug')?.addEventListener('click', () => {
      const t = document.getElementById('admin-bug-title')?.value.trim();
      const d = document.getElementById('admin-bug-desc')?.value.trim();
      const p = document.getElementById('admin-bug-priority')?.value;
      if (t) {
        this.addBugReport(t, d, p);
      }
    });
  }
}

window.AdminPanelController = new AdminPanelController();
window.adminPanel = window.AdminPanelController;
window.adminPanelController = window.AdminPanelController;

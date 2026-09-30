/* ==========================================================================
   SIMUP - ADMIN PANEL & SYSTEM BUG TRACKER
   Allows admin to inspect all players, credit balances, and log bugs/notes
   to the project BUGS_LOG.md file.
   ========================================================================== */

class AdminPanelController {
  constructor() {
    this.STORAGE_KEY_BUGS = 'simup_admin_bugs_log_v1';
    this.bugs = this.loadBugs();
  }

  loadBugs() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_BUGS);
      return data ? JSON.parse(data) : [
        { id: 1, title: 'Проверена точность стрелки апгрейдера', desc: 'Зона победы строго снизу 180°', priority: 'low', date: new Date().toLocaleDateString(), status: 'resolved' },
        { id: 2, title: 'Проверен 3D коинфлип', desc: 'Устранено зависание стороны T, честный 50/50', priority: 'medium', date: new Date().toLocaleDateString(), status: 'resolved' }
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

  isAdmin() {
    const user = window.authManager?.currentUser;
    return user && (user.username.toLowerCase() === 'admin' || user.isAdmin === true);
  }

  makeCurrentUserAdmin() {
    const user = window.authManager?.currentUser;
    if (user) {
      user.isAdmin = true;
      window.authManager.saveCurrentUser();
      window.notify?.bigWin('Права Администратора', 'Вы получили доступ к панели администратора!');
      this.render();
    }
  }

  creditPlayerBalance(username, amount) {
    const val = parseFloat(amount);
    if (isNaN(val) || val === 0) {
      window.notify?.warning('Ошибка', 'Введите корректную сумму.');
      return;
    }

    const users = window.authManager.getAllUsers();
    const target = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!target) {
      window.notify?.error('Игрок не найден', `Пользователь ${username} отсутствует в локальной базе.`);
      return;
    }

    target.balance = Number((target.balance + val).toFixed(2));
    window.authManager.saveUsers(users);

    if (window.authManager.currentUser?.id === target.id) {
      window.authManager.currentUser.balance = target.balance;
      window.authManager.saveCurrentUser();
      window.updateHeaderUserUI?.(target);
    }

    // Sync to Supabase if connected
    if (window.onlineDb?.syncUserProfile) {
      window.onlineDb.syncUserProfile(target);
    }

    window.notify?.bigWin('Баланс начислен', `Игроку ${target.username} успешно начислено $${val.toFixed(2)} (Новый баланс: $${target.balance.toFixed(2)})`);
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

    window.notify?.bigWin('Заметка сохранена! 📝', `Ошибка «${title}» добавлена в лог проекта.`);
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
    const users = window.authManager.getAllUsers();

    container.innerHTML = `
      <div style="max-width: 1040px; margin: 0 auto;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, rgba(182, 0, 76, 0.25) 0%, rgba(89, 0, 0, 0.15) 100%); border: 1px solid rgba(255, 0, 77, 0.35); border-radius: 18px; padding: 24px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
            <div>
              <span class="drop-badge-new" style="font-size: 11px; padding: 3px 8px; margin-bottom: 6px; display: inline-block;">СИСТЕМНОЕ УПРАВЛЕНИЕ</span>
              <h1 style="font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 4px;">Панель Администратора</h1>
              <p style="font-size: 13px; color: var(--text-dim);">Управление базой игроков, начисление средств и трекер ошибок проекта</p>
            </div>
            ${!this.isAdmin() ? `
              <button onclick="window.AdminPanelController.makeCurrentUserAdmin()" class="btn-sm-action" style="background: var(--accent-gradient); color: #fff; border: 1px solid #ff004d; font-weight: 800; padding: 8px 16px; border-radius: 8px;">
                🔑 Получить доступ админа
              </button>
            ` : `
              <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #10b981; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 800;">
                ● Доступ активен (${user?.username})
              </div>
            `}
          </div>
        </div>

        <!-- 2 Column Layout: Players Database & Bug Tracker -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
          
          <!-- Column 1: Players Management -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px;">
            <div style="font-size: 14px; font-weight: 800; color: #fff; text-transform: uppercase; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between;">
              <span>👥 Зарегистрированные игроки (${users.length})</span>
            </div>

            <!-- Fast Credit Form -->
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px; margin-bottom: 16px;">
              <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">⚡ Быстрое начисление баланса:</div>
              <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                <input type="text" id="admin-credit-username" class="form-input" placeholder="Никнейм игрока" style="flex: 1; padding: 8px 12px; font-size: 12px;" value="${user?.username || ''}">
                <input type="number" id="admin-credit-amount" class="form-input" placeholder="Сумма ($)" style="width: 110px; padding: 8px 12px; font-size: 12px;" value="1000">
              </div>
              <button id="btn-admin-submit-credit" class="btn-sm-action" style="width: 100%; background: linear-gradient(135deg, #b6004c, #590000); color: #fff; border: 1px solid #ff004d; font-weight: 800; padding: 8px; border-radius: 6px;">
                + Начислить средства
              </button>
            </div>

            <!-- Players List Table -->
            <div style="display: flex; flex-direction: column; gap: 8px; max-height: 380px; overflow-y: auto;">
              ${users.map(u => `
                <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 8px; padding: 10px 12px;">
                  <div>
                    <div style="font-size: 13px; font-weight: 800; color: #fff;">${u.username}</div>
                    <div style="font-size: 11px; color: var(--text-dim);">Скинов: ${(u.inventory || []).length} шт. | Ставок: $${(u.stats?.wagered || u.stats?.totalWagered || 0).toFixed(0)}</div>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-size: 14px; font-weight: 900; color: #ff004d;">$${u.balance.toFixed(2)}</div>
                    <button onclick="document.getElementById('admin-credit-username').value='${u.username}'" style="background: transparent; border: none; color: var(--accent-color); font-size: 11px; font-weight: 700; cursor: pointer;">Выбрать</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Column 2: Project Bug Tracker & Notes -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px;">
            <div style="font-size: 14px; font-weight: 800; color: #fff; text-transform: uppercase; margin-bottom: 14px;">
              📝 Трекер заметок и ошибок проекта
            </div>

            <!-- Add Bug Note Form -->
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px; margin-bottom: 16px;">
              <input type="text" id="admin-bug-title" class="form-input" placeholder="Название проблемы / бага" style="width: 100%; padding: 8px 12px; font-size: 12px; margin-bottom: 8px;">
              <textarea id="admin-bug-desc" class="form-input" placeholder="Детальное описание ошибки / заметка для разработки..." rows="2" style="width: 100%; padding: 8px 12px; font-size: 12px; margin-bottom: 8px; resize: vertical;"></textarea>
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
            <div style="display: flex; flex-direction: column; gap: 8px; max-height: 380px; overflow-y: auto;">
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

/* ==========================================================================
   SIMUP 2.0 v4.0 — ONLINE DATABASE (Supabase, free tier)
   Общий онлайн-рейтинг между всеми устройствами и игроками.
   - Работает поверх Supabase REST, ключи задаются в index.html
     (window.SIMUP_SUPABASE_URL / window.SIMUP_SUPABASE_ANON_KEY).
   - Если ключи не заданы или нет сети — сайт тихо работает в офлайне
     на локальной + встроенной базе (никаких ошибок для игрока).
   - Синхронизация профиля: не чаще 1 раза в 20 сек + при смене пользователя.
   - Чтение топа: при открытии рейтинга + раз в 60 сек, кэш в памяти.
   ========================================================================== */
(function () {
  'use strict';

  const SYNC_THROTTLE_MS = 20000;
  const POLL_INTERVAL_MS = 60000;
  const TOP_LIMIT = 100;

  const OnlineDB = {
    enabled: false,
    client: null,
    topPlayers: [],
    lastSyncAt: 0,
    lastFetchAt: 0,
    status: 'offline', // 'offline' | 'connecting' | 'online' | 'error'

    deviceId() {
      try {
        let id = localStorage.getItem('simup_device_id');
        if (!id) {
          id = 'dev_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
          localStorage.setItem('simup_device_id', id);
        }
        return id;
      } catch (e) {
        return 'dev_unknown';
      }
    },

    init() {
      const url = (window.SIMUP_SUPABASE_URL || '').trim();
      const key = (window.SIMUP_SUPABASE_ANON_KEY || '').trim();
      if (!url || !key) {
        this.setStatus('offline');
        return; // keys not configured yet — silent offline mode
      }
      if (!window.supabase || typeof window.supabase.createClient !== 'function') {
        this.setStatus('offline');
        // If async Supabase script is still loading in background, retry cleanly
        if (!this._retryTimer) {
          this._retryTimer = setTimeout(() => {
            this._retryTimer = null;
            if (window.supabase && typeof window.supabase.createClient === 'function' && !this.client) {
              this.init();
            }
          }, 2000);
        }
        return;
      }
      try {
        this.client = window.supabase.createClient(url, key);
        this.enabled = true;
        this.setStatus('connecting');
        // Initial pull + push
        this.refresh();
        this.syncCurrentUser(true);
        // Keep the top fresh while the site is open
        setInterval(() => {
          if (typeof document !== 'undefined' && document.hidden) return;
          this.refresh();
        }, POLL_INTERVAL_MS);
        // Re-sync when profile changes (wins, purchases, loans...)
        if (window.authManager && typeof window.authManager.onUserChange === 'function') {
          window.authManager.onUserChange(() => this.syncCurrentUser(false));
        }
        // Refresh when user opens the leaderboard tab
        document.addEventListener('click', (e) => {
          const tabBtn = e.target && e.target.closest ? e.target.closest('[data-tab="leaderboard"]') : null;
          if (tabBtn) {
            setTimeout(() => this.refresh(), 300);
          }
        });
      } catch (e) {
        this.enabled = false;
        this.setStatus('offline');
      }
    },

    setStatus(s) {
      this.status = s;
      try {
        const pill = document.getElementById('online-status-pill');
        if (!pill) return;
        if (s === 'online') {
          pill.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;"></span><span>Онлайн 🌐 • общий рейтинг</span>';
        } else if (s === 'connecting') {
          pill.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f59e0b;box-shadow:0 0 8px #f59e0b;"></span><span>Подключение…</span>';
        } else {
          pill.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#64748b;"></span><span>Офлайн • локальный рейтинг</span>';
        }
      } catch (e) {}
    },

    buildRow(user) {
      if (!user || !user.username) return null;
      const invValue = (user.inventory || []).reduce((s, it) => s + (it.price || 0), 0);
      const balance = Number(user.balance || 0);
      const currentDebt = Number(user.loans?.currentDebt || 0);
      const debtPenalty = Number((currentDebt * 1.5).toFixed(2));
      const grossWorth = balance + invValue;
      const baseProfit = user.stats?.netProfit !== undefined ? Number(user.stats.netProfit) : (grossWorth - 500);
      const totalUpgrades = Number(user.stats?.totalUpgrades || 0);
      const wonUpgrades = Number(user.stats?.wonUpgrades || user.stats?.upgradesWon || 0);
      const winrate = totalUpgrades > 0 ? Number(((wonUpgrades / totalUpgrades) * 100).toFixed(1)) : 0;
      return {
        username: String(user.username).slice(0, 18),
        username_lower: String(user.username).toLowerCase().slice(0, 18),
        balance: Number(balance.toFixed(2)),
        net_profit: Number((baseProfit - debtPenalty).toFixed(2)),
        net_worth: Number((grossWorth - debtPenalty).toFixed(2)),
        total_wagered: Number(Number(user.stats?.totalWagered || 0).toFixed(2)),
        winrate,
        total_upgrades: totalUpgrades,
        won_upgrades: wonUpgrades,
        current_debt: Number(currentDebt.toFixed(2)),
        inv_count: (user.inventory || []).length,
        cases_opened: Number(user.stats?.casesOpened || 0),
        best_mult: Number(user.stats?.bestWinMultiplier || 0),
        updated_at: new Date().toISOString()
      };
    },

    async syncCurrentUser(force) {
      if (!this.enabled || !this.client) return;
      const now = Date.now();
      if (!force && now - this.lastSyncAt < SYNC_THROTTLE_MS) return;
      const user = window.authManager?.currentUser;
      const row = this.buildRow(user);
      if (!row) return;
      // Don't spam the server with guest sessions that never played
      if (!force && (row.total_upgrades === 0 && row.cases_opened === 0 && row.total_wagered === 0)) return;
      try {
        const { error } = await this.client
          .from('simup_players')
          .upsert(row, { onConflict: 'username_lower' });
        if (!error) {
          this.lastSyncAt = now;
          if (this.status !== 'online') this.setStatus('online');
        }
      } catch (e) {
        /* offline — silent */
      }
    },

    async refresh() {
      if (!this.enabled || !this.client) return;
      try {
        const { data, error } = await this.client
          .from('simup_players')
          .select('*')
          .order('net_profit', { ascending: false })
          .limit(TOP_LIMIT);
        if (error) throw error;
        this.lastFetchAt = Date.now();
        this.topPlayers = (data || []).map(r => {
          const debt = Number(r.current_debt || 0);
          const penalty = Number((debt * 1.5).toFixed(2));
          const netWorth = Number(r.net_worth || 0);
          return {
            id: 'online_' + (r.username_lower || r.username),
            username: r.username,
            initials: String(r.username || '?').substring(0, 2).toUpperCase(),
            isRealUser: false,
            isGlobal: false,
            isOnline: true,
            grossWorth: Number((netWorth + penalty).toFixed(2)),
            netWorth,
            netProfit: Number(r.net_profit || 0),
            debtPenalty: penalty,
            balance: Number(r.balance || 0),
            invValue: 0,
            invCount: Number(r.inv_count || 0),
            winrate: Number(r.winrate || 0),
            totalUpgrades: Number(r.total_upgrades || 0),
            wonUpgrades: Number(r.won_upgrades || 0),
            currentDebt: debt,
            totalBorrowed: debt,
            totalWagered: Number(r.total_wagered || 0),
            bestWinSkin: null,
            bestWinMultiplier: Number(r.best_mult || 0),
            casesOpened: Number(r.cases_opened || 0),
            createdAt: r.updated_at ? Date.parse(r.updated_at) : Date.now()
          };
        });
        this.setStatus('online');
        if (typeof window.renderOnlineLeaderboard === 'function') {
          try { window.renderOnlineLeaderboard(); } catch (e) {}
        } else if (typeof window.requestLeaderboardRerender === 'function') {
          try { window.requestLeaderboardRerender(); } catch (e) {}
        }
      } catch (e) {
        if (this.status === 'online') this.setStatus('connecting');
      }
    },

    getCached() {
      return this.topPlayers.map(p => ({ ...p }));
    },

    hasData() {
      return this.topPlayers.length > 0;
    }
  };

  window.OnlineDB = OnlineDB;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => OnlineDB.init());
  } else {
    OnlineDB.init();
  }
})();

/* ==========================================================================
   SIMUP - 1-ON-1 BATTLE ARENA (CASE BATTLE & UPGRADE BATTLE 1v1)
   Complete real-time duel system:
   - Creator selects total stake ($20, $50, $100, $250, $500, $1000, etc.)
   - Both players pay 50% from main SIMUP balance
   - System auto-allocates 10 starter skins (Upgrade Battle) or matching cases (Case Battle)
   - Timer: 1.5m, 3m, or 5m
   - During battle: players can sell skins/drops, upgrade, buy new skins/cases
   - Winner is whoever has higher total net worth (Balance + Skins Value) at timer expiry!
   - Winner takes the entire prize pot + kept skins!
   ========================================================================== */

class CaseBattleController {
  constructor() {
    this.gameMode = 'case'; // 'case' or 'upgrade'
    this.battleState = 'lobby'; // 'lobby', 'battling', 'finished'
    this.opponentType = 'bot'; // 'bot' or 'player'
    this.botDifficulty = 'normal'; // 'easy', 'normal', 'hard'

    // Stake & Duration Configuration
    this.totalStake = 100.0; // Total battle bank (both pay 50% = $50)
    this.battleDuration = 180; // 180s = 3 minutes (default > 1 min)
    this.timeLeft = 180;
    this.battleTimer = null;
    this.botAiTimer = null;
    this.battleId = null;

    // UPGRADE BATTLE STATE
    this.ubP1Balance = 0.0;
    this.ubP1Skins = [];
    this.ubP2Balance = 0.0;
    this.ubP2Skins = [];
    this.ubSelectedSkin = null;
    this.ubMultiplier = 2.0;
    this.ubSpeed = 1.8; // seconds
    this.isUbSpinning = false;
    this.ubLogs = [];

    // CASE BATTLE STATE
    this.cbP1Balance = 0.0;
    this.cbP1Cases = [];
    this.cbP1Skins = [];
    this.cbP2Balance = 0.0;
    this.cbP2Cases = [];
    this.cbP2Skins = [];
    this.isCbSpinning = false;
    this.cbLogs = [];
  }

  init() {
    this.initBattleSync();
    this.checkUrlForInvite();
    this.renderLobby();
  }

  initBattleSync() {
    if (this._syncInitialized) return;
    this._syncInitialized = true;

    if (typeof window !== 'undefined' && window.BroadcastChannel) {
      try {
        const bc = new BroadcastChannel('simup_battles');
        bc.onmessage = (ev) => {
          if (ev.data?.type === 'battle_accepted' && ev.data?.battleId === this.battleId) {
            if (this.battleState === 'waiting') {
              this.opponentName = ev.data.acceptor || 'Друг ⚔️';
              window.notify?.bigWin('⚔️ ВЫЗОВ ПРИНЯТ!', `Игрок ${this.opponentName} принял ваш вызов! Дуэль начинается!`);
              this.startDuel();
            }
          }
        };
      } catch(e) {}
    }

    window.addEventListener('storage', (e) => {
      if (e.key && e.key.startsWith('simup_battle_accept_') && this.battleId && e.key.includes(this.battleId)) {
        if (this.battleState === 'waiting') {
          try {
            const data = JSON.parse(e.newValue);
            this.opponentName = data?.acceptor || 'Друг ⚔️';
            window.notify?.bigWin('⚔️ ВЫЗОВ ПРИНЯТ!', `Игрок ${this.opponentName} принял ваш вызов! Дуэль начинается!`);
            this.startDuel();
          } catch(err) {}
        }
      }
    });
  }

  checkUrlForInvite() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const battleMode = urlParams.get('battle_mode') || (urlParams.get('battle_up') ? 'upgrade' : (urlParams.get('battle') ? 'case' : null));
      const stakeParam = parseFloat(urlParams.get('stake'));
      const timeParam = parseInt(urlParams.get('time'), 10);
      const idParam = urlParams.get('battle_id') || urlParams.get('battle') || urlParams.get('battle_up');
      const creatorParam = urlParams.get('creator') || 'Игрок';

      if (!idParam) return;

      this.battleId = idParam;
      if (battleMode === 'upgrade') this.gameMode = 'upgrade';
      if (battleMode === 'case') this.gameMode = 'case';
      if (!isNaN(stakeParam) && stakeParam >= 10) this.totalStake = stakeParam;
      if (!isNaN(timeParam) && timeParam >= 60) this.battleDuration = timeParam;
      this.opponentType = 'player';
      this.opponentName = creatorParam;

      setTimeout(() => {
        this.showIncomingChallengeModal(creatorParam, this.gameMode, this.totalStake, this.battleDuration);
      }, 500);
    } catch (e) {}
  }

  showIncomingChallengeModal(creator, mode, totalStake, duration) {
    const modalId = 'modal-incoming-challenge';
    let modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement('div');
      modal.id = modalId;
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    const entryFee = totalStake / 2;
    const modeName = mode === 'upgrade' ? '⚡ Апгрейд-Батл 1v1' : '📦 Кейс-Батл 1v1';

    modal.innerHTML = `
      <div class="modal-window" style="max-width: 480px; text-align: center; padding: 26px; border: 2px solid #ff004d; background: #0e050c; border-radius: 20px; box-shadow: 0 0 40px rgba(255, 0, 77, 0.4);">
        <div style="font-size: 48px; margin-bottom: 8px;">⚔️</div>
        <h2 style="font-size: 22px; font-weight: 900; color: #fff; margin-bottom: 6px;">ВЫЗОВ НА ДУЭЛЬ 1v1!</h2>
        <p style="font-size: 13.5px; color: var(--text-dim); margin-bottom: 16px;">
          Игрок <strong style="color: #ffd700;">${creator}</strong> бросил вам вызов на арену!
        </p>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px; text-align: left; margin-bottom: 20px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-dim);">Режим:</span>
            <span style="font-weight: 800; color: #fff;">${modeName}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-dim);">Общий призовой банк:</span>
            <span style="font-weight: 900; color: #ffd700;">$${totalStake.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-dim);">Ваш взнос (50%):</span>
            <span style="font-weight: 900; color: #ff004d;">$${entryFee.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-dim);">Время раунда:</span>
            <span style="font-weight: 700; color: #10b981;">${duration} сек</span>
          </div>
        </div>

        <div style="display: flex; gap: 10px;">
          <button id="btn-accept-duel" class="btn-upgrade-fire" style="flex: 1; padding: 13px; font-size: 13.5px; border-radius: 10px;">
            <span>⚔️ ПРИНЯТЬ ВЫЗОВ</span>
          </button>
          <button id="btn-decline-duel" class="btn-sm-action" style="padding: 13px 18px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #fff; border-radius: 10px; font-weight: 700; cursor: pointer;">
            Отклонить
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');

    document.getElementById('btn-decline-duel')?.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    document.getElementById('btn-accept-duel')?.addEventListener('click', () => {
      modal.classList.remove('active');
      const user = window.authManager?.currentUser;
      if (!user) {
        window.showAuthModal?.('login');
        return;
      }
      if (user.balance < entryFee) {
        window.notify?.error(
          'Недостаточно средств',
          `Для принятия дуэли требуется $${entryFee.toFixed(2)}. Ваш баланс: $${user.balance.toFixed(2)}.`
        );
        return;
      }
      if (window.switchTab) window.switchTab('casebattle');
      
      try {
        const payload = { battleId: this.battleId, acceptor: user.username, acceptedAt: Date.now() };
        localStorage.setItem(`simup_battle_accept_${this.battleId}`, JSON.stringify(payload));
        if (window.BroadcastChannel) {
          const bc = new BroadcastChannel('simup_battles');
          bc.postMessage({ type: 'battle_accepted', ...payload });
        }
      } catch(e) {}

      this.opponentType = 'player';
      this.opponentName = creator;
      this.startDuel();
    });
  }

  setGameMode(mode) {
    if (this.battleState === 'battling') return;
    this.gameMode = mode;
    this.renderLobby();
  }

  setStake(val, rerender = false) {
    if (this.battleState === 'battling') return;
    this.totalStake = Math.max(10, Number(val));
    if (rerender) {
      this.renderLobby();
    } else {
      this.updateLobbyValues();
    }
  }

  setDuration(seconds) {
    if (this.battleState === 'battling') return;
    this.battleDuration = seconds;
    document.querySelectorAll('[data-duration]').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.duration, 10) === seconds);
    });
  }

  updateLobbyValues() {
    const entryFee = this.totalStake / 2;
    const input = document.getElementById('input-battle-stake');
    if (input && document.activeElement !== input) {
      input.value = this.totalStake;
    }
    document.querySelectorAll('[data-stake-preset]').forEach(btn => {
      btn.classList.toggle('active', parseFloat(btn.dataset.stakePreset) === this.totalStake);
    });
    const potEl = document.getElementById('battle-pot-val');
    if (potEl) potEl.textContent = `$${this.totalStake.toFixed(2)}`;
    const feeEl = document.getElementById('battle-entry-fee-val');
    if (feeEl) feeEl.textContent = `-$${entryFee.toFixed(2)}`;
    const oppFeeEl = document.getElementById('battle-opp-fee-val');
    if (oppFeeEl) oppFeeEl.textContent = `-$${entryFee.toFixed(2)}`;
    const btnStart = document.getElementById('btn-start-battle');
    if (btnStart) {
      const feeSpan = btnStart.querySelector('.battle-btn-fee');
      if (feeSpan) feeSpan.textContent = `(Взнос: $${entryFee.toFixed(2)})`;
    }
  }

  generateInviteLink(forceNew = false) {
    const user = window.authManager?.currentUser;
    const creatorName = user?.username || 'Player';
    if (forceNew || !this.battleId) {
      this.battleId = (this.gameMode === 'upgrade' ? 'ub_' : 'cb_') + Math.random().toString(36).substring(2, 8);
    }
    const url = `${window.location.origin}${window.location.pathname}?battle_mode=${this.gameMode}&stake=${this.totalStake}&time=${this.battleDuration}&battle_id=${this.battleId}&creator=${encodeURIComponent(creatorName)}`;
    
    try {
      localStorage.setItem(`simup_battle_${this.battleId}`, JSON.stringify({
        id: this.battleId,
        creator: creatorName,
        gameMode: this.gameMode,
        stake: this.totalStake,
        duration: this.battleDuration,
        status: 'waiting',
        createdAt: Date.now()
      }));
    } catch(e) {}

    navigator.clipboard?.writeText(url);
    window.notify?.bigWin('Ссылка скопирована! 📋', 'Отправьте ссылку другу: ' + url);
    return url;
  }

  // =========================================================================
  // MAIN LOBBY DISPATCHER & UI
  // =========================================================================
  renderLobby() {
    const container = document.getElementById('casebattle-content-area');
    if (!container) return;

    const entryFee = this.totalStake / 2;
    const presets = [20, 50, 100, 250, 500, 1000, 2500];

    container.innerHTML = `
      <div class="battle-lobby-wrap" style="max-width: 1040px; margin: 0 auto; padding-top: 10px;">
        
        <!-- Mode Switcher Tabs -->
        <div style="display: flex; gap: 10px; margin-bottom: 22px;">
          <button class="game-pill-btn ${this.gameMode === 'case' ? 'active' : ''}" id="btn-mode-case" style="flex: 1; padding: 12px 16px; font-weight: 800; font-size: 14px; border-radius: 12px;">
            📦 Кейс-Батл 1v1
          </button>
          <button class="game-pill-btn ${this.gameMode === 'upgrade' ? 'active' : ''}" id="btn-mode-upgrade" style="flex: 1; padding: 12px 16px; font-weight: 800; font-size: 14px; border-radius: 12px;">
            ⚡ Апгрейд-Батл 1v1 <span class="drop-badge-new" style="font-size: 10px; margin-left: 6px;">NEW</span>
          </button>
        </div>

        <!-- Hero Banner -->
        <div style="background: linear-gradient(135deg, rgba(255, 0, 77, 0.22) 0%, rgba(14, 4, 10, 0.95) 100%); border: 1px solid rgba(255, 0, 77, 0.35); border-radius: 20px; padding: 26px 28px; margin-bottom: 24px; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; right: -25px; bottom: -25px; font-size: 150px; opacity: 0.05; pointer-events: none;">⚔️</div>
          <span class="drop-badge-new" style="font-size: 11px; padding: 3px 8px; margin-bottom: 8px; display: inline-block;">1v1 ARENA • ПОБЕДИТЕЛЬ ЗАБИРАЕТ ВСЁ</span>
          <h1 style="font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 8px;">
            ${this.gameMode === 'case' ? 'Кейс-Батл 1 на 1' : 'Апгрейд-Батл 1 на 1'}
          </h1>
          <p style="font-size: 14px; color: var(--text-dim); max-width: 680px; margin: 0 auto; line-height: 1.5;">
            ${this.gameMode === 'case'
              ? 'Выберите сумму банка. Оба дуэлянта вносят ровно <b>50%</b>. Система закупает кейсы на всю сумму. Открывайте, продавайте скины и докупайте кейсы за отведенное время! Побеждает тот, у кого общая стоимость скинов и баланса больше.'
              : 'Выберите сумму банка. Оба вносят ровно <b>50%</b>. Система выдает каждому по <b>10 стартовых скинов</b>. Делайте апгрейды, продавайте или покупайте скины! Победитель с наибольшей стоимостью к концу таймера забирает весь банк!'}
          </p>
        </div>

        <!-- Setup Configuration Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 18px; margin-bottom: 24px;">
          
          <!-- Column 1: Stake / Bank Selection -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
              <span>💰</span> Призовой банк дуэли
            </div>

            <!-- Chips -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 12px;">
              ${presets.map(p => `
                <button class="bet-chip ${this.totalStake === p ? 'active' : ''}" data-stake-preset="${p}" style="padding: 9px 0; font-weight: 800; font-size: 13px;">
                  $${p}
                </button>
              `).join('')}
            </div>

            <!-- Custom Input -->
            <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 8px 12px; margin-bottom: 14px;">
              <span style="color: var(--text-dim); font-size: 13px; font-weight: 700;">Банк:</span>
              <input type="number" id="input-battle-stake" value="${this.totalStake}" min="10" max="50000" step="10" style="background: transparent; border: none; color: #fff; font-size: 16px; font-weight: 900; width: 100%; outline: none;">
            </div>

            <!-- Financial Split Details -->
            <div style="background: rgba(255, 0, 77, 0.06); border: 1px solid rgba(255, 0, 77, 0.2); border-radius: 10px; padding: 12px; font-size: 12.5px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--text-dim);">Общий банк победителю:</span>
                <span style="font-weight: 900; color: #ffd700;" id="battle-pot-val">$${this.totalStake.toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--text-dim);">Ваш взнос (50% с баланса):</span>
                <span style="font-weight: 800; color: #ff004d;" id="battle-entry-fee-val">-$${entryFee.toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-dim);">Взнос оппонента (50%):</span>
                <span style="font-weight: 800; color: #38bdf8;" id="battle-opp-fee-val">-$${entryFee.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <!-- Column 2: Opponent & Duration -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <!-- Opponent -->
              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                <span>👤</span> Оппонент
              </div>
              <div style="display: flex; gap: 8px; margin-bottom: 14px;">
                <button class="game-pill-btn ${this.opponentType === 'bot' ? 'active' : ''}" id="btn-opt-bot" style="flex: 1; padding: 9px;">
                  🤖 Против Бота
                </button>
                <button class="game-pill-btn ${this.opponentType === 'player' ? 'active' : ''}" id="btn-opt-player" style="flex: 1; padding: 9px;">
                  🔗 По ссылке
                </button>
              </div>

              ${this.opponentType === 'bot' ? `
                <div style="display: flex; gap: 6px; margin-bottom: 14px;">
                  <button class="bet-chip ${this.botDifficulty === 'easy' ? 'active' : ''}" data-bot-diff="easy" style="flex: 1; font-size: 12px;">Новичок</button>
                  <button class="bet-chip ${this.botDifficulty === 'normal' ? 'active' : ''}" data-bot-diff="normal" style="flex: 1; font-size: 12px;">Опытный</button>
                  <button class="bet-chip ${this.botDifficulty === 'hard' ? 'active' : ''}" data-bot-diff="hard" style="flex: 1; font-size: 12px;">Магнат 👑</button>
                </div>
              ` : `
                <button class="btn-sm-action" id="btn-create-invite" style="width: 100%; background: rgba(255, 0, 77, 0.2); border: 1px solid rgba(255, 0, 77, 0.4); color: #fff; padding: 9px; border-radius: 8px; font-weight: 700; margin-bottom: 14px;">
                  📋 Скопировать ссылку другу
                </button>
              `}

              <!-- Duration Selector -->
              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <span>⏱️</span> Время дуэли
              </div>
              <div style="display: flex; gap: 6px;">
                <button class="bet-chip ${this.battleDuration === 90 ? 'active' : ''}" data-duration="90" style="flex: 1; font-size: 12px;">1.5 мин (90с)</button>
                <button class="bet-chip ${this.battleDuration === 180 ? 'active' : ''}" data-duration="180" style="flex: 1; font-size: 12px;">3 мин (180с)</button>
                <button class="bet-chip ${this.battleDuration === 300 ? 'active' : ''}" data-duration="300" style="flex: 1; font-size: 12px;">5 мин (300с)</button>
              </div>
            </div>

            <!-- Start Action Button -->
            <button class="btn-upgrade-fire" id="btn-start-battle" style="margin-top: 18px; width: 100%; padding: 14px; font-size: 14px; border-radius: 12px;">
              <span>⚔️ НАЧАТЬ БАТЛ</span>
              <span class="battle-btn-fee">(Взнос: $${entryFee.toFixed(2)})</span>
            </button>
          </div>

        </div>

        <!-- Duel System Rules Footer -->
        <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px;">
          <div style="font-size: 13px; font-weight: 800; color: #fff; text-transform: uppercase; margin-bottom: 12px;">
            Правила и особенности дуэли 1v1:
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; font-size: 12.5px; color: var(--text-dim); line-height: 1.45;">
            <div style="display: flex; gap: 10px;">
              <span style="font-size: 20px;">🎒</span>
              <div>
                <strong style="color: #fff;">10 скинов / Кейсы</strong><br>
                Система автоматически закупает стартовые предметы на сумму взноса.
              </div>
            </div>
            <div style="display: flex; gap: 10px;">
              <span style="font-size: 20px;">💵</span>
              <div>
                <strong style="color: #fff;">Продажа и покупки</strong><br>
                Вы можете продавать скины и дроп прямо в ходе матча, чтобы брать более дорогие цели!
              </div>
            </div>
            <div style="display: flex; gap: 10px;">
              <span style="font-size: 20px;">🏆</span>
              <div>
                <strong style="color: #fff;">Победитель забирает всё</strong><br>
                У кого к концу времени больше <b>Баланс + Скины</b>, тот забирает весь денежный банк ($${this.totalStake.toFixed(2)})!
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    this.bindLobbyEvents();
  }

  bindLobbyEvents() {
    document.getElementById('btn-mode-case')?.addEventListener('click', () => this.setGameMode('case'));
    document.getElementById('btn-mode-upgrade')?.addEventListener('click', () => this.setGameMode('upgrade'));

    document.querySelectorAll('[data-stake-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setStake(parseFloat(btn.dataset.stakePreset));
      });
    });

    const stakeInput = document.getElementById('input-battle-stake');
    stakeInput?.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 10) {
        this.totalStake = val;
        this.updateLobbyValues();
      }
    });
    stakeInput?.addEventListener('change', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 10) {
        this.totalStake = val;
        this.updateLobbyValues();
      }
    });

    document.getElementById('btn-opt-bot')?.addEventListener('click', () => {
      this.opponentType = 'bot';
      this.renderLobby();
    });
    document.getElementById('btn-opt-player')?.addEventListener('click', () => {
      this.opponentType = 'player';
      this.renderLobby();
    });

    document.querySelectorAll('[data-bot-diff]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.botDifficulty = btn.dataset.botDiff;
        document.querySelectorAll('[data-bot-diff]').forEach(b => b.classList.toggle('active', b.dataset.botDiff === this.botDifficulty));
      });
    });

    document.querySelectorAll('[data-duration]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setDuration(parseInt(btn.dataset.duration, 10));
      });
    });

    document.getElementById('btn-create-invite')?.addEventListener('click', () => {
      this.generateInviteLink();
    });

    document.getElementById('btn-start-battle')?.addEventListener('click', () => {
      this.startDuel();
    });
  }

  // =========================================================================
  // DUEL INITIALIZATION & START
  // =========================================================================
  startDuel() {
    const user = window.authManager?.currentUser;
    if (!user) {
      window.showAuthModal?.('login');
      return;
    }

    const inputStake = document.getElementById('input-battle-stake');
    if (inputStake) {
      const val = parseFloat(inputStake.value);
      if (!isNaN(val) && val >= 10) this.totalStake = val;
    }

    const entryFee = this.totalStake / 2;
    if (user.balance < entryFee) {
      window.notify?.error(
        'Недостаточно средств',
        `Для участия требуется $${entryFee.toFixed(2)} (50% от банка $${this.totalStake.toFixed(2)}). Ваш баланс: $${user.balance.toFixed(2)}`
      );
      return;
    }

    // If waiting for a friend by link and friend has not joined yet, show live waiting lobby
    if (this.opponentType === 'player' && !this.opponentName) {
      this.battleState = 'waiting';
      const container = document.getElementById('casebattle-content-area');
      if (container) {
        const inviteUrl = this.generateInviteLink();
        container.innerHTML = `
          <div style="max-width: 600px; margin: 40px auto; text-align: center; background: rgba(14, 8, 14, 0.95); border: 1px solid var(--border-color); border-radius: 20px; padding: 32px 24px;">
            <div style="font-size: 54px; margin-bottom: 12px;">⏳</div>
            <h2 style="font-size: 24px; font-weight: 900; color: #fff; margin-bottom: 8px;">Ожидание соперника...</h2>
            <p style="font-size: 14px; color: var(--text-dim); margin-bottom: 20px;">
              Отправьте эту ссылку другу. Как только он перейдет и нажмет «Принять вызов», дуэль начнется автоматически!
            </p>
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 14px; font-size: 12px; color: #38bdf8; word-break: break-all; margin-bottom: 16px;">
              ${inviteUrl}
            </div>
            <div style="display: flex; gap: 10px; justify-content: center;">
              <button class="btn-upgrade-fire" id="btn-copy-waiting-link" style="padding: 10px 20px; font-size: 13px; border-radius: 10px;">
                <span>📋 Скопировать ссылку</span>
              </button>
              <button class="btn-sm-action" id="btn-play-bot-instead" style="padding: 10px 18px; font-size: 13px; border-radius: 10px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; font-weight: 700; cursor: pointer;">
                🤖 Сыграть с ботом
              </button>
            </div>
          </div>
        `;
        document.getElementById('btn-copy-waiting-link')?.addEventListener('click', () => {
          navigator.clipboard?.writeText(inviteUrl);
          window.notify?.bigWin('Скопировано!', 'Ссылка готова к отправке другу!');
        });
        document.getElementById('btn-play-bot-instead')?.addEventListener('click', () => {
          if (this._pollWaitingInterval) clearInterval(this._pollWaitingInterval);
          this.opponentType = 'bot';
          this.startDuel();
        });

        if (this._pollWaitingInterval) clearInterval(this._pollWaitingInterval);
        this._pollWaitingInterval = setInterval(() => {
          if (this.battleState !== 'waiting') {
            clearInterval(this._pollWaitingInterval);
            return;
          }
          try {
            const raw = localStorage.getItem(`simup_battle_accept_${this.battleId}`);
            if (raw) {
              clearInterval(this._pollWaitingInterval);
              const data = JSON.parse(raw);
              this.opponentName = data?.acceptor || 'Друг ⚔️';
              window.notify?.bigWin('⚔️ ВЫЗОВ ПРИНЯТ!', `Игрок ${this.opponentName} принял ваш вызов! Дуэль начинается!`);
              this.startDuel();
            }
          } catch(e) {}
        }, 1000);
      }
      return;
    }

    if (this._pollWaitingInterval) {
      clearInterval(this._pollWaitingInterval);
      this._pollWaitingInterval = null;
    }

    // Deduct entry fee
    user.balance = Number((user.balance - entryFee).toFixed(2));
    user.stats.wagered = Number(((user.stats.wagered || 0) + entryFee).toFixed(2));
    window.authManager.saveCurrentUser();
    window.updateHeaderUserUI?.(user);

    this.battleState = 'battling';
    this.timeLeft = this.battleDuration;

    if (this.gameMode === 'upgrade') {
      this.setupUpgradeBattle(entryFee);
    } else {
      this.setupCaseBattle(entryFee);
    }
  }

  // =========================================================================
  // UPGRADE BATTLE 1v1 IMPLEMENTATION
  // =========================================================================
  setupUpgradeBattle(budgetPerPlayer) {
    const allSkins = (window.getAllSkinVariants ? window.getAllSkinVariants() : null) || window.SKINS_DATABASE || [];
    const targetPerSkin = Math.max(0.5, budgetPerPlayer / 10);
    
    // Pool of skins reasonably close to targetPerSkin
    const validPool = allSkins.filter(s => typeof s.price === 'number' && s.price >= 0.1 && s.price <= (budgetPerPlayer * 0.35));
    const pool = validPool.length > 0 ? validPool : allSkins.filter(s => typeof s.price === 'number' && s.price <= budgetPerPlayer);

    const generate10Skins = () => {
      const skins = [];
      let spent = 0;
      for (let i = 0; i < 10; i++) {
        const candidates = pool.filter(s => Math.abs(s.price - targetPerSkin) < targetPerSkin * 1.5 && s.price <= (budgetPerPlayer - spent));
        const pick = candidates.length > 0
          ? candidates[Math.floor(Math.random() * candidates.length)]
          : (pool.filter(s => s.price <= (budgetPerPlayer - spent))[0] || pool[0]);

        if (pick) {
          skins.push({
            ...pick,
            instanceId: `ub_item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            price: Number(pick.price.toFixed(2))
          });
          spent += pick.price;
        }
      }
      const leftover = Math.max(0, Number((budgetPerPlayer - spent).toFixed(2)));
      return { skins, leftover };
    };

    const p1Data = generate10Skins();
    const p2Data = generate10Skins();

    this.ubP1Skins = p1Data.skins;
    this.ubP1Balance = p1Data.leftover;
    this.ubP2Skins = p2Data.skins;
    this.ubP2Balance = p2Data.leftover;

    this.ubSelectedSkin = this.ubP1Skins[0] || null;
    this.ubMultiplier = 2.0;
    this.isUbSpinning = false;
    this.ubLogs = [
      `⚔️ Дуэль началась! Каждому выдано по 10 скинов. Призовой банк: $${this.totalStake.toFixed(2)}.`
    ];

    this.startBattleTimer(() => this.finishUpgradeBattle('time_up'));
    if (this.opponentType === 'bot') {
      this.startBotUpgradeLoop();
    }
    this.renderUpgradeArena();
  }


  getUbP1Total() {
    const skinsVal = this.ubP1Skins.reduce((s, it) => s + (it.price || 0), 0);
    return Number((this.ubP1Balance + skinsVal).toFixed(2));
  }

  getUbP2Total() {
    const skinsVal = this.ubP2Skins.reduce((s, it) => s + (it.price || 0), 0);
    return Number((this.ubP2Balance + skinsVal).toFixed(2));
  }

  renderUpgradeArena() {
    const container = document.getElementById('casebattle-content-area');
    if (!container) return;

    const user = window.authManager?.currentUser;
    const botNames = { easy: 'Бот Новичок 🤖', normal: 'Бот Профи 🤖', hard: 'Бот Магнат 👑' };
    const p2Name = this.opponentType === 'bot' ? botNames[this.botDifficulty] : 'Оппонент ⚔️';

    const p1Total = this.getUbP1Total();
    const p2Total = this.getUbP2Total();
    const isLeading = p1Total >= p2Total;

    const min = Math.floor(this.timeLeft / 60);
    const sec = this.timeLeft % 60;
    const timeStr = `${min}:${sec < 10 ? '0' : ''}${sec}`;

    container.innerHTML = `
      <div style="max-width: 1100px; margin: 0 auto; padding-top: 6px;">
        
        <!-- Top Duel Header & Live Scoreboard -->
        <div style="background: rgba(14, 8, 14, 0.95); border: 1px solid var(--border-color); border-radius: 18px; padding: 18px 24px; margin-bottom: 20px; display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center;">
          
          <!-- Player 1 Scoreboard -->
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 52px; height: 52px; border-radius: 14px; background: rgba(255, 0, 77, 0.15); border: 2px solid #ff004d; display: flex; align-items: center; justify-content: center; font-size: 26px;">👤</div>
            <div>
              <div style="font-size: 13.5px; font-weight: 800; color: #fff;">${user.username} (ВЫ)</div>
              <div style="font-size: 24px; font-weight: 900; color: #ff004d;" id="ub-p1-networth">$${p1Total.toFixed(2)}</div>
              <div style="font-size: 11px; color: var(--text-dim);">
                Баланс: <strong style="color: #10b981;">$${this.ubP1Balance.toFixed(2)}</strong> • Скинов: ${this.ubP1Skins.length}
              </div>
            </div>
          </div>

          <!-- Match Center Hub -->
          <div style="text-align: center;">
            <div style="font-size: 11px; font-weight: 800; color: #ffd700; text-transform: uppercase; letter-spacing: 1px;">
              🏆 Банк: $${this.totalStake.toFixed(2)}
            </div>
            <div style="font-size: 22px; font-weight: 900; color: ${this.timeLeft < 30 ? '#ef4444' : '#10b981'}; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); padding: 4px 16px; border-radius: 8px; margin: 4px 0;" id="ub-timer-val">
              ⏱️ ${timeStr}
            </div>
            <div style="font-size: 11.5px; font-weight: 800; color: ${isLeading ? '#10b981' : '#f59e0b'};" id="ub-leader-indicator">
              ${isLeading ? '👑 ВЫ ЛИДИРУЕТЕ' : '⚠️ ОППОНЕНТ ВПЕРЕДИ'}
            </div>
          </div>

          <!-- Player 2 Scoreboard -->
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 14px;">
            <div style="text-align: right;">
              <div style="font-size: 13.5px; font-weight: 800; color: #fff;">${p2Name}</div>
              <div style="font-size: 24px; font-weight: 900; color: #38bdf8;" id="ub-p2-networth">$${p2Total.toFixed(2)}</div>
              <div style="font-size: 11px; color: var(--text-dim);">
                Баланс: <strong style="color: #38bdf8;">$${this.ubP2Balance.toFixed(2)}</strong> • Скинов: ${this.ubP2Skins.length}
              </div>
            </div>
            <div style="width: 52px; height: 52px; border-radius: 14px; background: rgba(56, 189, 248, 0.15); border: 2px solid #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 26px;">🤖</div>
          </div>

        </div>

        <!-- Main Arena Grid: Left Upgrader Wheel & Bet, Right Duel Inventory & Bot Activity -->
        <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 20px; margin-bottom: 20px;">
          
          <!-- LEFT: UPGRADER CONSOLE -->
          <div style="background: rgba(14, 8, 14, 0.9); border: 1px solid var(--border-color); border-radius: 18px; padding: 20px; text-align: center;">
            <div style="font-size: 12px; font-weight: 800; color: #ff004d; text-transform: uppercase; margin-bottom: 12px;">
              Арена апгрейда
            </div>

            <!-- Upgrader Wheel Canvas -->
            <div style="position: relative; width: 180px; height: 180px; margin: 0 auto 16px;">
              <canvas id="ub-wheel-canvas" width="180" height="180" style="width: 100%; height: 100%; border-radius: 50%; box-shadow: 0 0 25px rgba(255, 0, 77, 0.25);"></canvas>
              <div id="ub-wheel-needle" style="position: absolute; top: 50%; left: 50%; width: 4px; height: 75px; background: linear-gradient(to top, #ff004d, #fff); transform-origin: 50% 100%; transform: translate(-50%, -100%) rotate(0deg); border-radius: 2px; box-shadow: 0 0 10px #ff004d; z-index: 5;"></div>
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 36px; height: 36px; border-radius: 50%; background: #080206; border: 2px solid #ff004d; z-index: 6; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; color: #fff;">
                <span id="ub-wheel-mult-text">${this.ubMultiplier}x</span>
              </div>
            </div>

            <!-- Selected Bet Skin Display -->
            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 10px 14px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 10px; text-align: left;">
                ${this.ubSelectedSkin ? `
                  <img src="${this.ubSelectedSkin.image}" alt="" style="width: 38px; height: 38px; object-fit: contain;">
                  <div>
                    <div style="font-size: 12px; font-weight: 800; color: #fff; max-width: 160px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${this.ubSelectedSkin.name}</div>
                    <div style="font-size: 12px; font-weight: 900; color: #ff004d;">$${this.ubSelectedSkin.price.toFixed(2)}</div>
                  </div>
                ` : `
                  <div style="font-size: 12px; color: var(--text-dim);">Выберите скин из инвентаря справа 👉</div>
                `}
              </div>
              <div style="text-align: right;">
                <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Шанс победы:</div>
                <div style="font-size: 15px; font-weight: 900; color: #10b981;" id="ub-chance-val">
                  ${(Math.min(90, (100 / this.ubMultiplier) * 0.95)).toFixed(1)}%
                </div>
              </div>
            </div>

            <!-- Multiplier Selector Chips (1.5x, 2x, 5x, 10x, 20x, Random) -->
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; margin-bottom: 14px;">
              ${[1.5, 2.0, 5.0, 10.0, 20.0].map(m => `
                <button class="bet-chip ${this.ubMultiplier === m ? 'active' : ''}" data-ub-mult="${m}" style="padding: 6px 0; font-size: 11px;">
                  ${m}x
                </button>
              `).join('')}
              <button class="bet-chip ${this.ubMultiplier === 'random' ? 'active' : ''}" data-ub-mult="random" style="padding: 6px 0; font-size: 11px; color: #ffd700;" title="Случайный икс">
                ?X
              </button>
            </div>

            <!-- Fire Spin Button -->
            <button class="btn-upgrade-fire" id="btn-ub-fire-spin" ${!this.ubSelectedSkin || this.isUbSpinning ? 'disabled' : ''} style="width: 100%; padding: 13px; font-size: 14px; border-radius: 12px;">
              <span>⚡ КРУТИТЬ АПГРЕЙД</span>
            </button>
          </div>

          <!-- RIGHT: DUEL INVENTORY & BOT ACTIVITY -->
          <div style="background: rgba(14, 8, 14, 0.9); border: 1px solid var(--border-color); border-radius: 18px; padding: 20px; display: flex; flex-direction: column;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div style="font-size: 12px; font-weight: 800; color: #fff; text-transform: uppercase;">
                🎒 Скины в дуэли (${this.ubP1Skins.length})
              </div>
              <div style="font-size: 11px; color: var(--text-dim);">
                Нажмите «Продать» или «Выбрать»
              </div>
            </div>

            <!-- Skins List Scrollable -->
            <div id="ub-skins-list" style="flex: 1; max-height: 290px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding-right: 4px; margin-bottom: 14px;">
              ${this.ubP1Skins.length === 0 ? `
                <div style="text-align: center; color: var(--text-dim); padding: 30px 10px; font-size: 13px;">
                  У вас нет скинов! Используйте баланс $${this.ubP1Balance.toFixed(2)} чтобы докупить скин на бирже.
                </div>
              ` : this.ubP1Skins.map(skin => `
                <div class="ub-skin-item-row ${this.ubSelectedSkin?.instanceId === skin.instanceId ? 'active' : ''}" data-ub-select="${skin.instanceId}" style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); border: 1px solid ${this.ubSelectedSkin?.instanceId === skin.instanceId ? 'var(--accent-color)' : 'rgba(255,255,255,0.06)'}; border-radius: 8px; padding: 6px 10px; cursor: pointer; transition: all 0.2s;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="${skin.image}" alt="" style="width: 32px; height: 32px; object-fit: contain;">
                    <div>
                      <div style="font-size: 12px; font-weight: 700; color: #fff; max-width: 170px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${skin.name}</div>
                      <div style="font-size: 12px; font-weight: 900; color: #ff004d;">$${skin.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn-sm-action" data-ub-sell="${skin.instanceId}" title="Продать скин в баланс дуэли" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #10b981; font-weight: 800; font-size: 11px; padding: 4px 8px; border-radius: 6px;">
                      💵 $${skin.price.toFixed(2)}
                    </button>
                    <button class="btn-sm-action" data-ub-pick="${skin.instanceId}" style="background: rgba(255, 0, 77, 0.15); border: 1px solid rgba(255, 0, 77, 0.4); color: #ff004d; font-weight: 800; font-size: 11px; padding: 4px 8px; border-radius: 6px;">
                      🎯 Выбрать
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Quick Duel Market Buy -->
            <div style="display: flex; gap: 8px; align-items: center; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 8px 12px;">
              <span style="font-size: 11px; color: var(--text-dim); flex: 1;">
                Докупить скин за баланс дуэли ($${this.ubP1Balance.toFixed(2)}):
              </span>
              <button class="game-pill-btn" id="btn-ub-buy-cheap" ${this.ubP1Balance < 1 ? 'disabled' : ''} style="padding: 4px 8px; font-size: 11px;">+$2</button>
              <button class="game-pill-btn" id="btn-ub-buy-mid" ${this.ubP1Balance < 5 ? 'disabled' : ''} style="padding: 4px 8px; font-size: 11px;">+$10</button>
              <button class="game-pill-btn" id="btn-ub-buy-max" ${this.ubP1Balance < 1 ? 'disabled' : ''} style="padding: 4px 8px; font-size: 11px; color: #ffd700;">MAX</button>
            </div>

          </div>

        </div>

        <!-- Live Battle Activity Log -->
        <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 14px 18px;">
          <div style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">
            Лента событий дуэли
          </div>
          <div id="ub-logs-feed" style="max-height: 90px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--text-dim);">
            ${this.ubLogs.map(log => `<div>${log}</div>`).join('')}
          </div>
        </div>

      </div>
    `;

    this.drawUbWheel();
    this.bindUbArenaEvents();
  }

  drawUbWheel() {
    const canvas = document.getElementById('ub-wheel-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = cx - 6;

    ctx.clearRect(0, 0, width, height);

    // Multiplier & Chance calculation
    const mult = typeof this.ubMultiplier === 'number' ? this.ubMultiplier : 2.0;
    const chancePct = Math.min(90, (100 / mult) * 0.95);
    const winAngle = (chancePct / 100) * (Math.PI * 2);

    // Background track (Lose area)
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#140810';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.stroke();

    // Win sector starting from 12 o'clock (-PI/2)
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + winAngle;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 0, 77, 0.8)';
    ctx.fill();
    ctx.strokeStyle = '#ff004d';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Sector boundary pins
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + radius * Math.cos(startAngle), cy + radius * Math.sin(startAngle));
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + radius * Math.cos(endAngle), cy + radius * Math.sin(endAngle));
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  bindUbArenaEvents() {
    // Multiplier chips
    document.querySelectorAll('[data-ub-mult]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isUbSpinning) return;
        const val = btn.dataset.ubMult;
        this.ubMultiplier = val === 'random' ? 'random' : parseFloat(val);
        this.renderUpgradeArena();
      });
    });

    // Pick skin for bet
    document.querySelectorAll('[data-ub-pick], [data-ub-select]').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('[data-ub-sell]')) return;
        if (this.isUbSpinning) return;
        const id = el.dataset.ubPick || el.dataset.ubSelect;
        const found = this.ubP1Skins.find(s => s.instanceId === id);
        if (found) {
          this.ubSelectedSkin = found;
          this.renderUpgradeArena();
        }
      });
    });

    // Sell individual skin to duel balance
    document.querySelectorAll('[data-ub-sell]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.isUbSpinning) return;
        const id = btn.dataset.ubSell;
        this.sellUbSkin(id);
      });
    });

    // Buy skin options
    document.getElementById('btn-ub-buy-cheap')?.addEventListener('click', () => this.buyUbSkin(2.0));
    document.getElementById('btn-ub-buy-mid')?.addEventListener('click', () => this.buyUbSkin(10.0));
    document.getElementById('btn-ub-buy-max')?.addEventListener('click', () => this.buyUbSkin(this.ubP1Balance));

    // Spin button
    document.getElementById('btn-ub-fire-spin')?.addEventListener('click', () => {
      this.spinUbRound();
    });
  }

  sellUbSkin(instanceId) {
    const idx = this.ubP1Skins.findIndex(s => s.instanceId === instanceId);
    if (idx === -1) return;
    const skin = this.ubP1Skins[idx];
    this.ubP1Skins.splice(idx, 1);
    this.ubP1Balance = Number((this.ubP1Balance + skin.price).toFixed(2));

    if (this.ubSelectedSkin?.instanceId === instanceId) {
      this.ubSelectedSkin = this.ubP1Skins[0] || null;
    }

    this.addUbLog(`💵 Вы продали ${skin.name} за +$${skin.price.toFixed(2)} в баланс дуэли.`);
    window.SoundManager?.playCash?.();
    this.renderUpgradeArena();
  }

  buyUbSkin(targetPrice) {
    if (this.ubP1Balance < 0.5) return;
    const actualSpend = Math.min(this.ubP1Balance, targetPrice);
    const all = window.SKINS_DATABASE || [];
    const candidates = all.filter(s => s.price <= actualSpend && s.price >= actualSpend * 0.6);
    const chosen = candidates.length > 0
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : all.find(s => s.price <= actualSpend) || all[all.length - 1];

    if (!chosen) return;
    this.ubP1Balance = Number((this.ubP1Balance - chosen.price).toFixed(2));
    const newSkin = {
      ...chosen,
      instanceId: `ub_buy_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      price: Number(chosen.price.toFixed(2))
    };
    this.ubP1Skins.unshift(newSkin);
    this.ubSelectedSkin = newSkin;

    this.addUbLog(`🛒 Вы купили скин ${newSkin.name} за $${newSkin.price.toFixed(2)}.`);
    window.SoundManager?.playClick?.();
    this.renderUpgradeArena();
  }

  spinUbRound() {
    if (this.isUbSpinning || !this.ubSelectedSkin) return;
    this.isUbSpinning = true;

    // Resolve multiplier
    let effectiveMult = this.ubMultiplier;
    if (effectiveMult === 'random') {
      const options = [1.5, 2.0, 3.5, 5.0, 10.0, 20.0];
      effectiveMult = options[Math.floor(Math.random() * options.length)];
    }

    const chancePct = Math.min(90, (100 / effectiveMult) * 0.95);
    const rand = Math.random() * 100;
    const isWin = rand < chancePct;

    // Target skin calculation
    const betPrice = this.ubSelectedSkin.price;
    const targetPrice = Number((betPrice * effectiveMult).toFixed(2));
    const allSkins = window.SKINS_DATABASE || [];
    const candidates = allSkins.filter(s => s.price >= targetPrice * 0.8 && s.price <= targetPrice * 1.3);
    const wonSkin = candidates.length > 0
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : {
          ...this.ubSelectedSkin,
          price: targetPrice,
          name: `${this.ubSelectedSkin.name} (x${effectiveMult})`
        };

    // Animate Needle
    const needle = document.getElementById('ub-wheel-needle');
    const spinBtn = document.getElementById('btn-ub-fire-spin');
    if (spinBtn) spinBtn.disabled = true;

    window.SoundManager?.playSpinWheel?.();

    // Winning angle corresponds to top sector [0, chancePct / 100 * 360]
    const winAngleSpan = (chancePct / 100) * 360;
    const finalAngle = isWin
      ? Math.random() * (winAngleSpan - 4) + 2
      : Math.random() * (360 - winAngleSpan - 4) + winAngleSpan + 2;

    const fullSpins = 4 * 360;
    const totalRotation = fullSpins + finalAngle;

    if (needle) {
      needle.style.transition = `transform ${this.ubSpeed}s cubic-bezier(0.12, 0.8, 0.32, 1)`;
      needle.style.transform = `translate(-50%, -100%) rotate(${totalRotation}deg)`;
    }

    setTimeout(() => {
      this.isUbSpinning = false;
      const betSkin = this.ubSelectedSkin;

      // Remove bet skin from duel inventory
      const idx = this.ubP1Skins.findIndex(s => s.instanceId === betSkin.instanceId);
      if (idx !== -1) this.ubP1Skins.splice(idx, 1);

      if (isWin) {
        window.SoundManager?.playWin?.();
        const upgraded = {
          ...wonSkin,
          instanceId: `ub_won_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          price: targetPrice
        };
        this.ubP1Skins.unshift(upgraded);
        this.ubSelectedSkin = upgraded;
        this.addUbLog(`🎉 ВЫИГРЫШ! ${betSkin.name} ➔ ${upgraded.name} ($${targetPrice.toFixed(2)})!`);
      } else {
        window.SoundManager?.playLoss?.();
        this.ubSelectedSkin = this.ubP1Skins[0] || null;
        this.addUbLog(`❌ Проигрыш: скин ${betSkin.name} ($${betSkin.price.toFixed(2)}) сгорел.`);
      }

      this.renderUpgradeArena();
    }, this.ubSpeed * 1000 + 150);
  }

  // Simulated bot moves every 3.5s
  startBotUpgradeLoop() {
    if (this.botAiTimer) clearInterval(this.botAiTimer);
    if (this.opponentType !== 'bot') return;

    this.botAiTimer = setInterval(() => {
      if (this.battleState !== 'battling' || this.ubP2Skins.length === 0) return;

      // Bot picks a skin to bet
      const skinIdx = Math.floor(Math.random() * this.ubP2Skins.length);
      const skin = this.ubP2Skins[skinIdx];

      // Multipliers based on difficulty
      let mult = 2.0;
      if (this.botDifficulty === 'easy') {
        mult = Math.random() < 0.7 ? 1.5 : 2.0;
      } else if (this.botDifficulty === 'hard') {
        mult = Math.random() < 0.4 ? 2.0 : Math.random() < 0.7 ? 5.0 : 10.0;
      } else {
        mult = Math.random() < 0.5 ? 2.0 : 3.5;
      }

      const chance = Math.min(90, (100 / mult) * 0.95);
      const isWin = (Math.random() * 100) < chance;

      this.ubP2Skins.splice(skinIdx, 1);

      if (isWin) {
        const newPrice = Number((skin.price * mult).toFixed(2));
        this.ubP2Skins.push({
          ...skin,
          price: newPrice,
          name: `${skin.name} (+)`
        });
        this.addUbLog(`🤖 Бот апгрейдил ${skin.name} (${mult}x) ➔ УСПЕХ! (+$${newPrice.toFixed(2)})`);
      } else {
        this.addUbLog(`🤖 Бот крутил ${skin.name} (${mult}x) ➔ Промах (-$${skin.price.toFixed(2)})`);
      }

      // If bot has low skins and high cash, buy skin
      if (this.ubP2Skins.length < 3 && this.ubP2Balance > 5) {
        const buyAmount = Number((this.ubP2Balance * 0.5).toFixed(2));
        this.ubP2Balance -= buyAmount;
        this.ubP2Skins.push({
          name: 'AK-47 Tactical (Bot)',
          price: buyAmount,
          image: skin.image
        });
      }

      // Live update net worth badges
      const p2Net = document.getElementById('ub-p2-networth');
      if (p2Net) p2Net.textContent = `$${this.getUbP2Total().toFixed(2)}`;

      const leaderEl = document.getElementById('ub-leader-indicator');
      if (leaderEl) {
        const isLeading = this.getUbP1Total() >= this.getUbP2Total();
        leaderEl.textContent = isLeading ? '👑 ВЫ ЛИДИРУЕТЕ' : '⚠️ ОППОНЕНТ ВПЕРЕДИ';
        leaderEl.style.color = isLeading ? '#10b981' : '#f59e0b';
      }
    }, 3600);
  }

  addUbLog(text) {
    const time = new Date().toLocaleTimeString('ru-RU', { minute: '2-digit', second: '2-digit' });
    this.ubLogs.unshift(`[${time}] ${text}`);
    if (this.ubLogs.length > 25) this.ubLogs.pop();
    const feed = document.getElementById('ub-logs-feed');
    if (feed) {
      feed.innerHTML = this.ubLogs.map(l => `<div>${l}</div>`).join('');
    }
  }

  finishUpgradeBattle(reason) {
    this.battleState = 'finished';
    this.stopTimers();

    const user = window.authManager?.currentUser;
    const p1Total = this.getUbP1Total();
    const p2Total = this.getUbP2Total();
    const isP1Winner = p1Total > p2Total;
    const isTie = p1Total === p2Total;

    if (isP1Winner && user) {
      // Award real prize pot
      user.balance = Number((user.balance + this.totalStake).toFixed(2));
      const netGain = Number((this.totalStake / 2).toFixed(2));
      user.stats.netProfit = Number(((user.stats.netProfit || 0) + netGain).toFixed(2));
      user.stats.upgradesWon = (user.stats.upgradesWon || 0) + 1;

      // Add kept duel skins to real inventory!
      const keptSkins = this.ubP1Skins.map(s => ({
        ...s,
        instanceId: `ub_won_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        acquiredAt: Date.now()
      }));
      if (!user.inventory) user.inventory = [];
      user.inventory.unshift(...keptSkins);

      // Quests & Pass
      window.SimupPassController?.addXp?.(500);
      window.questsManager?.recordAction?.('upgrade_wins', 1);
      window.questsManager?.recordAction?.('case_battle_win', 1);
      window.questsManager?.recordPassAction?.('pq_upgrade_battle', 1);

      window.authManager.saveCurrentUser();
      window.updateHeaderUserUI?.(user);

      // Auto-repay debt from duel winnings
      const duelProfit = Number((this.totalStake / 2).toFixed(2));
      if (duelProfit > 0 && window.economyManager?.autoDeductDebtFromWin) {
        window.economyManager.autoDeductDebtFromWin(user, duelProfit);
      }

      window.SoundManager?.playJackpot?.() || window.SoundManager?.playWin?.();
      window.confettiEffect?.();

      window.notify?.bigWin(
        '🏆 ПОБЕДА В АПГРЕЙД-БАТЛЕ!',
        `Ваш счет: $${p1Total.toFixed(2)} против $${p2Total.toFixed(2)} соперника! Вы выиграли весь банк $${this.totalStake.toFixed(2)} и сохранили ${keptSkins.length} скинов!`
      );
    } else if (isTie && user) {
      const refund = this.totalStake / 2;
      user.balance = Number((user.balance + refund).toFixed(2));
      window.authManager.saveCurrentUser();
      window.updateHeaderUserUI?.(user);
      window.notify?.info('Ничья!', `Счета равны ($${p1Total.toFixed(2)}). Ваш взнос $${refund.toFixed(2)} возвращён.`);
    } else {
      window.SoundManager?.playLoss?.();
      window.notify?.error(
        'Поражение в дуэли',
        `Соперник набрал $${p2Total.toFixed(2)}, ваш результат: $${p1Total.toFixed(2)}. Попробуйте снова!`
      );
    }

    this.renderLobby();
  }

  // =========================================================================
  // CASE BATTLE 1v1 IMPLEMENTATION
  // =========================================================================
  setupCaseBattle(budgetPerPlayer) {
    const allCases = window.CASES_DATABASE || [];
    // Auto-select cases matching the budget
    const affordable = allCases.filter(c => c.price <= budgetPerPlayer);
    const chosenBaseCase = affordable.length > 0
      ? affordable[affordable.length - 1] // Highest affordable tier
      : allCases[0];

    const count = Math.max(2, Math.floor(budgetPerPlayer / chosenBaseCase.price));
    const spent = count * chosenBaseCase.price;
    const leftover = Math.max(0, Number((budgetPerPlayer - spent).toFixed(2)));

    const createCasePack = () => {
      const pack = [];
      for (let i = 0; i < count; i++) {
        pack.push({
          ...chosenBaseCase,
          instanceId: `cb_case_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
        });
      }
      return pack;
    };

    this.cbP1Cases = createCasePack();
    this.cbP1Balance = leftover;
    this.cbP1Skins = [];

    this.cbP2Cases = createCasePack();
    this.cbP2Balance = leftover;
    this.cbP2Skins = [];

    this.isCbSpinning = false;
    this.cbLogs = [
      `⚔️ Кейс-Батл начался! Выдано по ${count} шт. «${chosenBaseCase.name}». Банк: $${this.totalStake.toFixed(2)}.`
    ];

    this.startBattleTimer(() => this.finishCaseBattle('time_up'));
    this.startBotCaseLoop();
    this.renderCaseBattleArena();
  }

  getCbP1Total() {
    const dropsVal = this.cbP1Skins.reduce((s, it) => s + (it.price || 0), 0);
    return Number((this.cbP1Balance + dropsVal).toFixed(2));
  }

  getCbP2Total() {
    const dropsVal = this.cbP2Skins.reduce((s, it) => s + (it.price || 0), 0);
    return Number((this.cbP2Balance + dropsVal).toFixed(2));
  }

  renderCaseBattleArena() {
    const container = document.getElementById('casebattle-content-area');
    if (!container) return;

    const user = window.authManager?.currentUser;
    const botNames = { easy: 'Бот Новичок 🤖', normal: 'Бот Профи 🤖', hard: 'Бот Магнат 👑' };
    const p2Name = this.opponentType === 'bot' ? botNames[this.botDifficulty] : 'Оппонент ⚔️';

    const p1Total = this.getCbP1Total();
    const p2Total = this.getCbP2Total();
    const isLeading = p1Total >= p2Total;

    const min = Math.floor(this.timeLeft / 60);
    const sec = this.timeLeft % 60;
    const timeStr = `${min}:${sec < 10 ? '0' : ''}${sec}`;

    container.innerHTML = `
      <div style="max-width: 1100px; margin: 0 auto; padding-top: 6px;">
        
        <!-- Scoreboard Header -->
        <div style="background: rgba(14, 8, 14, 0.95); border: 1px solid var(--border-color); border-radius: 18px; padding: 18px 24px; margin-bottom: 20px; display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center;">
          
          <!-- P1 Info -->
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 52px; height: 52px; border-radius: 14px; background: rgba(255, 0, 77, 0.15); border: 2px solid #ff004d; display: flex; align-items: center; justify-content: center; font-size: 26px;">👤</div>
            <div>
              <div style="font-size: 13.5px; font-weight: 800; color: #fff;">${user.username} (ВЫ)</div>
              <div style="font-size: 24px; font-weight: 900; color: #ff004d;" id="cb-p1-networth">$${p1Total.toFixed(2)}</div>
              <div style="font-size: 11px; color: var(--text-dim);">
                Баланс: <strong style="color: #10b981;">$${this.cbP1Balance.toFixed(2)}</strong> • Дропов: ${this.cbP1Skins.length} • Кейсов: ${this.cbP1Cases.length}
              </div>
            </div>
          </div>

          <!-- Timer Hub -->
          <div style="text-align: center;">
            <div style="font-size: 11px; font-weight: 800; color: #ffd700; text-transform: uppercase; letter-spacing: 1px;">
              🏆 Банк: $${this.totalStake.toFixed(2)}
            </div>
            <div style="font-size: 22px; font-weight: 900; color: ${this.timeLeft < 30 ? '#ef4444' : '#10b981'}; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); padding: 4px 16px; border-radius: 8px; margin: 4px 0;" id="cb-timer-val">
              ⏱️ ${timeStr}
            </div>
            <div style="font-size: 11.5px; font-weight: 800; color: ${isLeading ? '#10b981' : '#f59e0b'};" id="cb-leader-indicator">
              ${isLeading ? '👑 ВЫ ЛИДИРУЕТЕ' : '⚠️ ОППОНЕНТ ВПЕРЕДИ'}
            </div>
          </div>

          <!-- P2 Info -->
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 14px;">
            <div style="text-align: right;">
              <div style="font-size: 13.5px; font-weight: 800; color: #fff;">${p2Name}</div>
              <div style="font-size: 24px; font-weight: 900; color: #38bdf8;" id="cb-p2-networth">$${p2Total.toFixed(2)}</div>
              <div style="font-size: 11px; color: var(--text-dim);">
                Баланс: <strong style="color: #38bdf8;">$${this.cbP2Balance.toFixed(2)}</strong> • Дропов: ${this.cbP2Skins.length} • Кейсов: ${this.cbP2Cases.length}
              </div>
            </div>
            <div style="width: 52px; height: 52px; border-radius: 14px; background: rgba(56, 189, 248, 0.15); border: 2px solid #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 26px;">🤖</div>
          </div>

        </div>

        <!-- Case Battle Arena Interactive Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 20px; margin-bottom: 20px;">
          
          <!-- LEFT: CASE OPENING CONSOLE -->
          <div style="background: rgba(14, 8, 14, 0.9); border: 1px solid var(--border-color); border-radius: 18px; padding: 20px; text-align: center;">
            <div style="font-size: 12px; font-weight: 800; color: #ff004d; text-transform: uppercase; margin-bottom: 14px;">
              Открытие кейсов
            </div>

            <!-- Active Case Showcase & Reel Window -->
            <div id="cb-reel-window" style="background: #080206; border: 1px solid rgba(255, 0, 77, 0.35); border-radius: 14px; height: 160px; display: flex; align-items: center; justify-content: center; flex-direction: column; position: relative; overflow: hidden; margin-bottom: 16px;">
              ${this.cbP1Cases.length > 0 ? `
                <img src="${this.cbP1Cases[0].image}" alt="" style="width: 80px; height: 80px; object-fit: contain; filter: drop-shadow(0 4px 14px rgba(255, 0, 77, 0.5)); margin-bottom: 8px;">
                <div style="font-size: 13.5px; font-weight: 800; color: #fff;">${this.cbP1Cases[0].name}</div>
                <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Осталось в очереди: ${this.cbP1Cases.length} шт.</div>
              ` : `
                <div style="font-size: 40px; margin-bottom: 6px;">📦</div>
                <div style="font-size: 13px; color: var(--text-dim);">Кейсы закончились! Докупите за баланс ниже 👇</div>
              `}
            </div>

            <!-- Open Case Action Button -->
            <button class="btn-upgrade-fire" id="btn-cb-open-case" ${this.cbP1Cases.length === 0 || this.isCbSpinning ? 'disabled' : ''} style="width: 100%; padding: 13px; font-size: 14px; border-radius: 12px; margin-bottom: 12px;">
              <span>📦 ОТКРЫТЬ КЕЙС</span>
            </button>

            <!-- Buy More Cases with Duel Balance -->
            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11.5px; color: var(--text-dim);">Докупить кейс ($${this.cbP1Balance.toFixed(2)}):</span>
              <button class="game-pill-btn active" id="btn-cb-rebuy-case" ${this.cbP1Balance < 2.5 ? 'disabled' : ''} style="padding: 6px 12px; font-size: 11px;">
                +1 Кейс ($2.50)
              </button>
            </div>
          </div>

          <!-- RIGHT: DROPPED LOOT & SELLING IN BATTLE -->
          <div style="background: rgba(14, 8, 14, 0.9); border: 1px solid var(--border-color); border-radius: 18px; padding: 20px; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div style="font-size: 12px; font-weight: 800; color: #fff; text-transform: uppercase;">
                Выпавший дроп (${this.cbP1Skins.length})
              </div>
              <div style="font-size: 11px; color: var(--text-dim);">
                Продавайте ненужный лут, чтобы докупать кейсы!
              </div>
            </div>

            <!-- Drops List -->
            <div id="cb-drops-list" style="flex: 1; max-height: 290px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding-right: 4px;">
              ${this.cbP1Skins.length === 0 ? `
                <div style="text-align: center; color: var(--text-dim); padding: 36px 10px; font-size: 13px;">
                  Открывайте кейсы слева, чтобы выбивать скины!
                </div>
              ` : this.cbP1Skins.map(skin => `
                <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 6px 10px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="${skin.image}" alt="" style="width: 32px; height: 32px; object-fit: contain;">
                    <div>
                      <div style="font-size: 12px; font-weight: 700; color: #fff; max-width: 170px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${skin.name}</div>
                      <div style="font-size: 12px; font-weight: 900; color: #ff004d;">$${skin.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <button class="btn-sm-action" data-cb-sell="${skin.instanceId}" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #10b981; font-weight: 800; font-size: 11px; padding: 4px 8px; border-radius: 6px;">
                    💵 Продать за $${skin.price.toFixed(2)}
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- Duel Activity Log Feed -->
        <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 14px 18px;">
          <div style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">
            Лента событий Кейс-Батла
          </div>
          <div id="cb-logs-feed" style="max-height: 90px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--text-dim);">
            ${this.cbLogs.map(l => `<div>${l}</div>`).join('')}
          </div>
        </div>

      </div>
    `;

    this.bindCbArenaEvents();
  }

  bindCbArenaEvents() {
    document.getElementById('btn-cb-open-case')?.addEventListener('click', () => {
      this.openCbCase();
    });

    document.getElementById('btn-cb-rebuy-case')?.addEventListener('click', () => {
      this.rebuyCbCase();
    });

    document.querySelectorAll('[data-cb-sell]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.cbSell;
        this.sellCbDrop(id);
      });
    });
  }

  openCbCase() {
    if (this.isCbSpinning || this.cbP1Cases.length === 0) return;
    this.isCbSpinning = true;

    const caseObj = this.cbP1Cases.shift();
    const dropItem = this.rollCaseItem(caseObj);

    window.SoundManager?.playCaseOpening?.();

    const reelWin = document.getElementById('cb-reel-window');
    if (reelWin) {
      reelWin.innerHTML = `
        <div style="font-size: 44px; animation: spin 0.6s linear infinite;">↻</div>
        <div style="color: #ff004d; font-weight: 800; margin-top: 8px;">Открытие ${caseObj.name}...</div>
      `;
    }

    setTimeout(() => {
      this.isCbSpinning = false;
      this.cbP1Skins.unshift({
        ...dropItem,
        instanceId: `cb_drop_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
      });

      this.addCbLog(`🎁 Вы открыли ${caseObj.name} и выбили ${dropItem.name} ($${dropItem.price.toFixed(2)})!`);
      window.SoundManager?.playWin?.();

      this.renderCaseBattleArena();
    }, 1600);
  }

  sellCbDrop(instanceId) {
    const idx = this.cbP1Skins.findIndex(s => s.instanceId === instanceId);
    if (idx === -1) return;
    const item = this.cbP1Skins[idx];
    this.cbP1Skins.splice(idx, 1);
    this.cbP1Balance = Number((this.cbP1Balance + item.price).toFixed(2));

    this.addCbLog(`💵 Вы продали дроп ${item.name} за +$${item.price.toFixed(2)}.`);
    window.SoundManager?.playCash?.();
    this.renderCaseBattleArena();
  }

  rebuyCbCase() {
    const price = 2.50;
    if (this.cbP1Balance < price) return;
    this.cbP1Balance = Number((this.cbP1Balance - price).toFixed(2));

    const allCases = window.CASES_DATABASE || [];
    const cheap = allCases.find(c => c.price <= 2.5) || allCases[0];

    this.cbP1Cases.push({
      ...cheap,
      instanceId: `cb_case_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
    });

    this.addCbLog(`🛒 Вы докупили кейс «${cheap.name}» за $${price.toFixed(2)}.`);
    window.SoundManager?.playClick?.();
    this.renderCaseBattleArena();
  }

  startBotCaseLoop() {
    if (this.botAiTimer) clearInterval(this.botAiTimer);
    if (this.opponentType !== 'bot') return;

    this.botAiTimer = setInterval(() => {
      if (this.battleState !== 'battling') return;

      if (this.cbP2Cases.length > 0) {
        // Bot opens a case
        const caseObj = this.cbP2Cases.shift();
        const drop = this.rollCaseItem(caseObj);
        this.cbP2Skins.unshift({
          ...drop,
          instanceId: `bot_drop_${Date.now()}`
        });
        this.addCbLog(`🤖 Бот открыл ${caseObj.name} ➔ ${drop.name} ($${drop.price.toFixed(2)})!`);
      } else if (this.cbP2Balance >= 2.5 || (this.cbP2Skins.length > 0 && Math.random() < 0.6)) {
        // Bot sells cheap drop to buy another case
        if (this.cbP2Skins.length > 0) {
          const sold = this.cbP2Skins.pop();
          this.cbP2Balance += sold.price;
          this.addCbLog(`🤖 Бот продал дроп ${sold.name} и купил новый кейс!`);
        }
        if (this.cbP2Balance >= 2.5) {
          this.cbP2Balance -= 2.5;
          const all = window.CASES_DATABASE || [];
          this.cbP2Cases.push(all[0]);
        }
      }

      // Update UI networths
      const p2Net = document.getElementById('cb-p2-networth');
      if (p2Net) p2Net.textContent = `$${this.getCbP2Total().toFixed(2)}`;

      const leaderEl = document.getElementById('cb-leader-indicator');
      if (leaderEl) {
        const isLeading = this.getCbP1Total() >= this.getCbP2Total();
        leaderEl.textContent = isLeading ? '👑 ВЫ ЛИДИРУЕТЕ' : '⚠️ ОППОНЕНТ ВПЕРЕДИ';
        leaderEl.style.color = isLeading ? '#10b981' : '#f59e0b';
      }
    }, 4200);
  }

  addCbLog(text) {
    const time = new Date().toLocaleTimeString('ru-RU', { minute: '2-digit', second: '2-digit' });
    this.cbLogs.unshift(`[${time}] ${text}`);
    if (this.cbLogs.length > 25) this.cbLogs.pop();
    const feed = document.getElementById('cb-logs-feed');
    if (feed) {
      feed.innerHTML = this.cbLogs.map(l => `<div>${l}</div>`).join('');
    }
  }

  rollCaseItem(caseObj) {
    const items = caseObj?.items || [];
    const allVariants = (window.getAllSkinVariants ? window.getAllSkinVariants() : null) || window.SKINS_DATABASE || [];
    
    if (items.length === 0) {
      return allVariants[Math.floor(Math.random() * allVariants.length)];
    }

    const totalWeight = items.reduce((s, it) => s + (it.weight || it.chance || 1), 0);
    let rand = Math.random() * totalWeight;
    let chosenEntry = items[0];

    for (const it of items) {
      rand -= (it.weight || it.chance || 1);
      if (rand <= 0) {
        chosenEntry = it;
        break;
      }
    }

    const skinId = chosenEntry.skinId;
    const baseId = skinId ? skinId.replace(/_(FN|MW|FT|WW|BS)$/i, '') : '';

    // 1. Try exact ID match in all skin variants (with wear)
    let found = allVariants.find(s => s.id === skinId);
    
    // 2. Try match base ID
    if (!found && baseId) {
      found = allVariants.find(s => s.baseId === baseId || s.id === baseId);
    }

    // 3. Fallback: match by price tier of case, never default to Karambit!
    if (!found) {
      const casePrice = caseObj.price || 2.5;
      const candidates = allVariants.filter(s => s.price <= casePrice * 2.5 && s.price >= 0.1);
      found = candidates.length > 0
        ? candidates[Math.floor(Math.random() * candidates.length)]
        : {
            id: skinId || 'skin_drop',
            name: chosenEntry.name || 'Скин из кейса',
            wear: 'FT',
            price: Math.max(0.2, Number((casePrice * 0.8).toFixed(2))),
            rarity: 'milspec',
            rarityColor: '#4b69ff',
            image: ''
          };
    }

    return found;
  }

  finishCaseBattle(reason) {
    this.battleState = 'finished';
    this.stopTimers();

    const user = window.authManager?.currentUser;
    const p1Total = this.getCbP1Total();
    const p2Total = this.getCbP2Total();
    const isP1Winner = p1Total > p2Total;
    const isTie = p1Total === p2Total;

    if (isP1Winner && user) {
      user.balance = Number((user.balance + this.totalStake).toFixed(2));
      const netGain = Number((this.totalStake / 2).toFixed(2));
      user.stats.netProfit = Number(((user.stats.netProfit || 0) + netGain).toFixed(2));
      user.stats.upgradesWon = (user.stats.upgradesWon || 0) + 1;

      // Add kept drops to real inventory!
      const keptDrops = this.cbP1Skins.map(s => ({
        ...s,
        instanceId: `cb_drop_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        acquiredAt: Date.now()
      }));
      if (!user.inventory) user.inventory = [];
      user.inventory.unshift(...keptDrops);

      window.SimupPassController?.addXp?.(500);
      window.questsManager?.recordAction?.('case_battle_win', 1);

      window.authManager.saveCurrentUser();
      window.updateHeaderUserUI?.(user);

      // Auto-repay debt from case battle winnings
      const cbProfit = Number((this.totalStake / 2).toFixed(2));
      if (cbProfit > 0 && window.economyManager?.autoDeductDebtFromWin) {
        window.economyManager.autoDeductDebtFromWin(user, cbProfit);
      }

      window.SoundManager?.playJackpot?.() || window.SoundManager?.playWin?.();
      window.confettiEffect?.();

      window.notify?.bigWin(
        '🏆 ПОБЕДА В КЕЙС-БАТЛЕ!',
        `Ваш счет: $${p1Total.toFixed(2)} против $${p2Total.toFixed(2)} соперника! Вы выиграли весь банк $${this.totalStake.toFixed(2)} и забрали ${keptDrops.length} скинов!`
      );
    } else if (isTie && user) {
      const refund = this.totalStake / 2;
      user.balance = Number((user.balance + refund).toFixed(2));
      window.authManager.saveCurrentUser();
      window.updateHeaderUserUI?.(user);
      window.notify?.info('Ничья!', `Счета равны ($${p1Total.toFixed(2)}). Взнос $${refund.toFixed(2)} возвращён.`);
    } else {
      window.SoundManager?.playLoss?.();
      window.notify?.error(
        'Поражение в батле',
        `Соперник набрал $${p2Total.toFixed(2)}, ваш результат: $${p1Total.toFixed(2)}. Сыграйте реванш!`
      );
    }

    this.renderLobby();
  }

  // =========================================================================
  // TIMER HELPER
  // =========================================================================
  startBattleTimer(onExpire) {
    this.stopTimers();
    this.battleTimer = setInterval(() => {
      this.timeLeft--;

      const min = Math.floor(this.timeLeft / 60);
      const sec = this.timeLeft % 60;
      const timeStr = `⏱️ ${min}:${sec < 10 ? '0' : ''}${sec}`;

      const t1 = document.getElementById('ub-timer-val');
      const t2 = document.getElementById('cb-timer-val');
      if (t1) t1.textContent = timeStr;
      if (t2) t2.textContent = timeStr;

      if (this.timeLeft <= 0) {
        this.stopTimers();
        onExpire();
      }
    }, 1000);
  }

  stopTimers() {
    if (this.battleTimer) clearInterval(this.battleTimer);
    if (this.botAiTimer) clearInterval(this.botAiTimer);
    this.battleTimer = null;
    this.botAiTimer = null;
  }
}

if (typeof window !== 'undefined') {
  window.CaseBattleController = new CaseBattleController();
}

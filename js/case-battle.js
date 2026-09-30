/* ==========================================================================
   SIMUP - 1-ON-1 BATTLE ARENA (CASE BATTLE & UPGRADE BATTLE 1v1)
   Play Case Battle or Upgrade Battle against Bot or real player via invite link.
   Simultaneous spins, real-time value tracking, 50/50 split pot, winner takes all!
   ========================================================================== */

class CaseBattleController {
  constructor() {
    this.gameMode = 'case'; // 'case' or 'upgrade'
    this.battleState = 'lobby'; // 'lobby', 'battling', 'finished'
    this.opponentType = 'bot'; // 'bot' or 'player'
    this.botDifficulty = 'normal'; // 'easy', 'normal', 'hard'

    // Case Battle state
    this.selectedCases = [];
    this.currentRoundIdx = 0;
    this.player1Total = 0;
    this.player2Total = 0;
    this.player1Drops = [];
    this.player2Drops = [];

    // Upgrade Battle state
    this.upgradePot = 50.0; // Total battle bank (e.g. $50, $100, $250)
    this.upgradeP1Chips = 50.0;
    this.upgradeP2Chips = 50.0;
    this.upgradeRound = 1;
    this.upgradeMaxRounds = 10;
    this.upgradeTimeLeft = 60;
    this.upgradeTimer = null;
    this.upgradeP1Bet = 10.0;
    this.upgradeP1Mult = 2.0;
    this.upgradeP2Bet = 10.0;
    this.upgradeP2Mult = 2.0;
    this.isUpgradeSpinning = false;
    this.upgradeHistory = [];

    this.battleId = null;
  }

  init() {
    this.checkUrlForInvite();
    this.renderLobby();
  }

  checkUrlForInvite() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const battleParam = urlParams.get('battle');
      const battleUpParam = urlParams.get('battle_up');
      if (battleUpParam) {
        this.gameMode = 'upgrade';
        this.opponentType = 'player';
        window.notify?.info('⚔️ Апгрейд-Батл 1v1', `Приглашение в дуэль #${battleUpParam}. Готовьтесь к битве!`);
      } else if (battleParam) {
        this.gameMode = 'case';
        this.opponentType = 'player';
        window.notify?.info('⚔️ Кейс-Батл 1v1', `Приглашение в батл #${battleParam}. Настройте кейсы и начните бой!`);
      }
    } catch(e) {}
  }

  setGameMode(mode) {
    if (this.battleState === 'battling') return;
    this.gameMode = mode;
    this.renderLobby();
  }

  // ==========================================
  // CASE BATTLE HELPERS
  // ==========================================
  addCaseToBattle(caseObj) {
    if (this.selectedCases.length >= 10) {
      window.notify?.warning('Лимит кейсов', 'Максимум 10 кейсов в одном батле!');
      return;
    }
    this.selectedCases.push(caseObj);
    this.renderLobby();
  }

  removeCaseFromBattle(idx) {
    this.selectedCases.splice(idx, 1);
    this.renderLobby();
  }

  clearCases() {
    this.selectedCases = [];
    this.renderLobby();
  }

  getTotalCost() {
    return this.selectedCases.reduce((sum, c) => sum + (c.price || 0), 0);
  }

  generateInviteLink() {
    this.battleId = (this.gameMode === 'upgrade' ? 'ub_' : 'cb_') + Math.random().toString(36).substring(2, 9);
    const param = this.gameMode === 'upgrade' ? 'battle_up' : 'battle';
    const url = `${window.location.origin}${window.location.pathname}?${param}=${this.battleId}`;
    navigator.clipboard?.writeText(url);
    window.notify?.bigWin('Ссылка скопирована! 📋', 'Отправьте ссылку другу: ' + url);
    return url;
  }

  // ==========================================
  // MAIN LOBBY DISPATCHER
  // ==========================================
  renderLobby() {
    const container = document.getElementById('casebattle-content-area');
    if (!container) return;

    if (this.gameMode === 'upgrade') {
      this.renderUpgradeLobby(container);
    } else {
      this.renderCaseLobby(container);
    }
  }

  // Mode switcher markup for top of lobby
  getModeHeaderHtml() {
    return `
      <!-- Mode Switcher -->
      <div style="display: flex; gap: 10px; margin-bottom: 22px;">
        <button class="game-pill-btn ${this.gameMode === 'case' ? 'active' : ''}" id="btn-mode-case" style="flex: 1; padding: 12px 16px; font-weight: 800; font-size: 14px;">
          📦 Кейс-Батл 1v1
        </button>
        <button class="game-pill-btn ${this.gameMode === 'upgrade' ? 'active' : ''}" id="btn-mode-upgrade" style="flex: 1; padding: 12px 16px; font-weight: 800; font-size: 14px;">
          ⚡ Апгрейд-Батл 1v1 <span class="drop-badge-new" style="font-size: 10px; margin-left: 6px;">NEW</span>
        </button>
      </div>
    `;
  }

  bindModeHeaderEvents() {
    document.getElementById('btn-mode-case')?.addEventListener('click', () => this.setGameMode('case'));
    document.getElementById('btn-mode-upgrade')?.addEventListener('click', () => this.setGameMode('upgrade'));
  }

  // ==========================================
  // 1. CASE BATTLE LOBBY
  // ==========================================
  renderCaseLobby(container) {
    const allCases = window.CASES_DATABASE || [];
    const totalCost = this.getTotalCost();

    container.innerHTML = `
      <div class="battle-lobby-wrap" style="max-width: 1040px; margin: 0 auto;">
        
        ${this.getModeHeaderHtml()}

        <!-- Header banner -->
        <div style="background: linear-gradient(135deg, rgba(182, 0, 76, 0.22) 0%, rgba(89, 0, 0, 0.12) 100%); border: 1px solid rgba(255, 0, 77, 0.3); border-radius: 18px; padding: 24px; margin-bottom: 24px; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; right: -30px; bottom: -30px; font-size: 140px; opacity: 0.05; pointer-events: none;">⚔️</div>
          <span class="drop-badge-new" style="font-size: 11px; padding: 3px 8px; margin-bottom: 8px; display: inline-block;">PVP DUEL ARENA</span>
          <h1 style="font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 6px;">Кейс-Батл 1 на 1</h1>
          <p style="font-size: 13.5px; color: var(--text-dim); max-width: 580px; margin: 0 auto;">
            Выберите кейсы для битвы, выберите оппонента (бот или друг по ссылке) и крутите одновременно! Победитель с наибольшей стоимостью лута забирает весь дроп.
          </p>
        </div>

        <!-- Battle Config Bar -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 20px;">
          
          <!-- Opponent Selector -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 14px; padding: 18px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
              <span>👤</span> Выбор соперника
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="game-pill-btn ${this.opponentType === 'bot' ? 'active' : ''}" id="btn-cb-opt-bot" style="flex: 1; padding: 10px;">
                🤖 Против Бота
              </button>
              <button class="game-pill-btn ${this.opponentType === 'player' ? 'active' : ''}" id="btn-cb-opt-player" style="flex: 1; padding: 10px;">
                🔗 По ссылке
              </button>
            </div>

            <div id="cb-opponent-detail" style="margin-top: 14px;">
              ${this.opponentType === 'bot' ? `
                <div style="display: flex; gap: 6px;">
                  <button class="bet-chip ${this.botDifficulty === 'easy' ? 'active' : ''}" data-bot-diff="easy" style="flex: 1;">Новичок</button>
                  <button class="bet-chip ${this.botDifficulty === 'normal' ? 'active' : ''}" data-bot-diff="normal" style="flex: 1;">Опытный</button>
                  <button class="bet-chip ${this.botDifficulty === 'hard' ? 'active' : ''}" data-bot-diff="hard" style="flex: 1;">Магнат 👑</button>
                </div>
              ` : `
                <button class="btn-sm-action" id="btn-cb-create-link" style="width: 100%; background: rgba(255, 0, 77, 0.2); border: 1px solid rgba(255, 0, 77, 0.4); color: #fff; padding: 8px; border-radius: 8px; font-weight: 700;">
                  📋 Скопировать ссылку-приглашение
                </button>
              `}
            </div>
          </div>

          <!-- Battle Summary & Fire -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 14px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">
                Стоимость участия:
              </div>
              <div style="font-size: 26px; font-weight: 900; color: #ff004d;">
                $${totalCost.toFixed(2)}
                <span style="font-size: 13px; color: var(--text-dim); font-weight: 600;">(Раундов: ${this.selectedCases.length})</span>
              </div>
            </div>

            <button class="btn-upgrade-fire" id="btn-cb-start-battle" ${this.selectedCases.length === 0 ? 'disabled' : ''} style="margin-top: 12px; width: 100%;">
              <span>⚔️ НАЧАТЬ КЕЙС-БАТЛ</span>
              <span>($${totalCost.toFixed(2)})</span>
            </button>
          </div>
        </div>

        <!-- Selected Cases Queue -->
        <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 14px; padding: 18px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div style="font-size: 13px; font-weight: 800; color: #fff; text-transform: uppercase;">
              Очередь раундов (${this.selectedCases.length}/10)
            </div>
            ${this.selectedCases.length > 0 ? `
              <button id="btn-cb-clear-cases" style="background: transparent; border: none; color: #ef4444; font-size: 12px; font-weight: 700; cursor: pointer;">
                Очистить всё ✕
              </button>
            ` : ''}
          </div>

          <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 8px; min-height: 90px; align-items: center;">
            ${this.selectedCases.length === 0 ? `
              <div style="color: var(--text-dim); font-size: 13px; padding: 20px; text-align: center; width: 100%;">
                Кейсы ещё не выбраны. Нажмите на кейсы ниже, чтобы добавить их в батл!
              </div>
            ` : this.selectedCases.map((c, i) => `
              <div style="flex: 0 0 110px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255, 0, 77, 0.3); border-radius: 10px; padding: 8px; text-align: center; position: relative;">
                <button onclick="window.CaseBattleController.removeCaseFromBattle(${i})" style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.6); color: #fff; border: none; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; cursor: pointer;">✕</button>
                <div style="font-size: 10px; color: var(--text-dim); font-weight: 800;">Р-${i+1}</div>
                <img src="${c.image}" alt="${c.name}" style="width: 50px; height: 50px; object-fit: contain; margin: 4px auto;">
                <div style="font-size: 11px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.name}</div>
                <div style="font-size: 11px; font-weight: 800; color: #ff004d;">$${c.price.toFixed(2)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Available Cases Catalog -->
        <div>
          <div style="font-size: 14px; font-weight: 800; color: #fff; text-transform: uppercase; margin-bottom: 12px;">
            Добавить кейсы в батл:
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px;">
            ${allCases.map(c => `
              <div class="case-card" style="padding: 12px; text-align: center; cursor: pointer; transition: all 0.2s;" onclick="window.CaseBattleController.addCaseToBattle(window.CASES_DATABASE.find(x => x.id === '${c.id}'))">
                <img src="${c.image}" alt="${c.name}" style="width: 70px; height: 70px; object-fit: contain; margin: 0 auto 8px;">
                <div style="font-size: 12px; font-weight: 800; color: #fff; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.name}</div>
                <div style="font-size: 13px; font-weight: 900; color: #ff004d; margin-bottom: 8px;">$${c.price.toFixed(2)}</div>
                <button class="btn-sm-action" style="width: 100%; font-size: 11px; padding: 4px 8px; background: rgba(255, 0, 77, 0.15); border: 1px solid rgba(255, 0, 77, 0.3); color: #ff3366; font-weight: 700; border-radius: 6px;">+ Добавить</button>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;

    this.bindModeHeaderEvents();
    document.getElementById('btn-cb-opt-bot')?.addEventListener('click', () => {
      this.opponentType = 'bot';
      this.renderLobby();
    });
    document.getElementById('btn-cb-opt-player')?.addEventListener('click', () => {
      this.opponentType = 'player';
      this.renderLobby();
    });
    document.querySelectorAll('[data-bot-diff]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.botDifficulty = btn.dataset.botDiff;
        this.renderLobby();
      });
    });
    document.getElementById('btn-cb-create-link')?.addEventListener('click', () => {
      this.generateInviteLink();
    });
    document.getElementById('btn-cb-clear-cases')?.addEventListener('click', () => {
      this.clearCases();
    });
    document.getElementById('btn-cb-start-battle')?.addEventListener('click', () => {
      this.startCaseBattle();
    });
  }

  // ==========================================
  // 2. UPGRADE BATTLE LOBBY (1v1 DUEL)
  // ==========================================
  renderUpgradeLobby(container) {
    const entryFee = this.upgradePot / 2;
    const presets = [20, 50, 100, 250, 500, 1000];

    container.innerHTML = `
      <div class="battle-lobby-wrap" style="max-width: 1040px; margin: 0 auto;">
        
        ${this.getModeHeaderHtml()}

        <!-- Header banner -->
        <div style="background: linear-gradient(135deg, rgba(182, 0, 76, 0.28) 0%, rgba(89, 0, 0, 0.15) 100%); border: 1px solid rgba(255, 0, 77, 0.35); border-radius: 18px; padding: 26px; margin-bottom: 24px; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; right: -20px; bottom: -20px; font-size: 150px; opacity: 0.05; pointer-events: none;">⚡</div>
          <span class="drop-badge-new" style="font-size: 11px; padding: 3px 8px; margin-bottom: 8px; display: inline-block;">1v1 UPGRADE DUEL</span>
          <h1 style="font-size: 30px; font-weight: 900; color: #fff; margin-bottom: 6px;">Апгрейд-Батл 1 на 1</h1>
          <p style="font-size: 13.5px; color: var(--text-dim); max-width: 620px; margin: 0 auto; line-height: 1.5;">
            Выбирайте призовой банк битвы! Каждый игрок оплачивает ровно <b>50%</b> от суммы банка. Оба получают стартовые фишки дуэли. Игра длится 60 секунд (10 раундов) или до <b>полного нокаута ($0)</b>. Победитель забирает весь реальный банк!
          </p>
        </div>

        <!-- Pot & Opponent Selector -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px; margin-bottom: 24px;">
          
          <!-- Pot Selector Card -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
              <span>💰</span> Выберите призовой банк дуэли
            </div>

            <!-- Preset chips -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px;">
              ${presets.map(p => `
                <button class="bet-chip ${this.upgradePot === p ? 'active' : ''}" onclick="window.CaseBattleController.setUpgradePot(${p})" style="padding: 10px; font-weight: 800; font-size: 13.5px;">
                  $${p}
                </button>
              `).join('')}
            </div>

            <!-- Custom pot input -->
            <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 6px 12px;">
              <span style="color: var(--text-dim); font-size: 13px; font-weight: 700;">Банк ($):</span>
              <input type="number" id="input-custom-pot" value="${this.upgradePot}" min="10" max="10000" step="5" style="background: transparent; border: none; color: #fff; font-size: 16px; font-weight: 900; width: 100%; outline: none;">
            </div>

            <!-- Economics Split Breakdown -->
            <div style="margin-top: 16px; background: rgba(255, 0, 77, 0.06); border: 1px solid rgba(255, 0, 77, 0.2); border-radius: 10px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 6px;">
                <span style="color: var(--text-dim);">Общий призовой банк:</span>
                <span style="font-weight: 900; color: #ffd700;">$${this.upgradePot.toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 6px;">
                <span style="color: var(--text-dim);">Ваш взнос (50% с баланса):</span>
                <span style="font-weight: 800; color: #ff004d;">-$${entryFee.toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12.5px;">
                <span style="color: var(--text-dim);">Взнос оппонента (50%):</span>
                <span style="font-weight: 800; color: #38bdf8;">-$${entryFee.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <!-- Opponent Selector & Launch Card -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                <span>👤</span> Выбор соперника для дуэли
              </div>

              <div style="display: flex; gap: 8px; margin-bottom: 14px;">
                <button class="game-pill-btn ${this.opponentType === 'bot' ? 'active' : ''}" id="btn-ub-opt-bot" style="flex: 1; padding: 10px;">
                  🤖 Бот-дуэлянт
                </button>
                <button class="game-pill-btn ${this.opponentType === 'player' ? 'active' : ''}" id="btn-ub-opt-player" style="flex: 1; padding: 10px;">
                  🔗 Друг по ссылке
                </button>
              </div>

              ${this.opponentType === 'bot' ? `
                <div style="display: flex; gap: 6px;">
                  <button class="bet-chip ${this.botDifficulty === 'easy' ? 'active' : ''}" data-ub-bot="easy" style="flex: 1;">Новичок</button>
                  <button class="bet-chip ${this.botDifficulty === 'normal' ? 'active' : ''}" data-ub-bot="normal" style="flex: 1;">Опытный</button>
                  <button class="bet-chip ${this.botDifficulty === 'hard' ? 'active' : ''}" data-ub-bot="hard" style="flex: 1;">Магнат 👑</button>
                </div>
                <div style="font-size: 11.5px; color: var(--text-dim); margin-top: 8px;">
                  ${this.botDifficulty === 'easy' ? 'Осторожный бот: ставит аккуратно на множители 1.5x - 2.0x.' : this.botDifficulty === 'normal' ? 'Сбалансированный бот: варьирует ставки на 2.0x - 3.0x.' : 'Агрессивный бот: рискует крупными ставками на 3.0x - 5.0x!'}
                </div>
              ` : `
                <button class="btn-sm-action" id="btn-ub-create-link" style="width: 100%; background: rgba(255, 0, 77, 0.2); border: 1px solid rgba(255, 0, 77, 0.4); color: #fff; padding: 10px; border-radius: 8px; font-weight: 700;">
                  📋 Скопировать ссылку на Апгрейд-Батл
                </button>
              `}
            </div>

            <!-- Start Battle Button -->
            <button class="btn-upgrade-fire" id="btn-ub-start-battle" style="margin-top: 18px; width: 100%;">
              <span>⚡ НАЧАТЬ АПГРЕЙД-БАТЛ</span>
              <span>($${entryFee.toFixed(2)})</span>
            </button>
          </div>

        </div>

        <!-- Rules Information -->
        <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px;">
          <div style="font-size: 13px; font-weight: 800; color: #fff; text-transform: uppercase; margin-bottom: 12px;">
            Правила Апгрейд-Батла:
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; font-size: 12.5px; color: var(--text-dim);">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <span style="font-size: 20px;">⏱️</span>
              <div>
                <strong style="color: #fff;">Лимит времени</strong><br>
                На матч отводится 60 секунд (до 10 раундов круток).
              </div>
            </div>
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <span style="font-size: 20px;">💥</span>
              <div>
                <strong style="color: #fff;">Правило Нокаута ($0)</strong><br>
                Если фишки одного из дуэлянтов опускаются до $0, он сразу выбывает!
              </div>
            </div>
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <span style="font-size: 20px;">🏆</span>
              <div>
                <strong style="color: #fff;">Главный приз</strong><br>
                Победитель забирает весь реальный банк ($${this.upgradePot.toFixed(2)}) на свой баланс!
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    this.bindModeHeaderEvents();
    document.getElementById('btn-ub-opt-bot')?.addEventListener('click', () => {
      this.opponentType = 'bot';
      this.renderLobby();
    });
    document.getElementById('btn-ub-opt-player')?.addEventListener('click', () => {
      this.opponentType = 'player';
      this.renderLobby();
    });
    document.querySelectorAll('[data-ub-bot]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.botDifficulty = btn.dataset.ubBot;
        this.renderLobby();
      });
    });
    document.getElementById('input-custom-pot')?.addEventListener('change', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 10) {
        this.setUpgradePot(val);
      }
    });
    document.getElementById('btn-ub-create-link')?.addEventListener('click', () => {
      this.generateInviteLink();
    });
    document.getElementById('btn-ub-start-battle')?.addEventListener('click', () => {
      this.startUpgradeBattle();
    });
  }

  setUpgradePot(val) {
    this.upgradePot = Number(val);
    this.renderLobby();
  }

  // ==========================================
  // START & PLAY UPGRADE BATTLE
  // ==========================================
  startUpgradeBattle() {
    const user = window.authManager?.currentUser;
    if (!user) {
      window.showAuthModal?.('login');
      return;
    }

    const entryFee = this.upgradePot / 2;
    if (user.balance < entryFee) {
      window.notify?.error('Недостаточно средств', `Для входа требуется $${entryFee.toFixed(2)} (50% от банка $${this.upgradePot.toFixed(2)}). Ваш баланс: $${user.balance.toFixed(2)}`);
      return;
    }

    // Deduct entry fee (50%)
    user.balance = Number((user.balance - entryFee).toFixed(2));
    user.stats.wagered = Number(((user.stats.wagered || 0) + entryFee).toFixed(2));
    window.authManager.saveCurrentUser();
    window.updateHeaderUserUI?.(user);

    // Initial duel state
    this.battleState = 'battling';
    this.upgradeP1Chips = this.upgradePot;
    this.upgradeP2Chips = this.upgradePot;
    this.upgradeRound = 1;
    this.upgradeMaxRounds = 10;
    this.upgradeTimeLeft = 60;
    this.upgradeHistory = [];
    this.upgradeP1Bet = Math.min(10, Math.floor(this.upgradeP1Chips * 0.2));
    this.upgradeP1Mult = 2.0;

    // Start timer interval
    if (this.upgradeTimer) clearInterval(this.upgradeTimer);
    this.upgradeTimer = setInterval(() => {
      this.upgradeTimeLeft--;
      const timerEl = document.getElementById('ub-match-timer');
      if (timerEl) {
        timerEl.textContent = `${this.upgradeTimeLeft}s`;
        if (this.upgradeTimeLeft <= 10) {
          timerEl.style.color = '#ef4444';
          timerEl.style.animation = 'pulse 0.8s infinite';
        }
      }
      if (this.upgradeTimeLeft <= 0) {
        clearInterval(this.upgradeTimer);
        this.finishUpgradeBattle('time_up');
      }
    }, 1000);

    this.renderUpgradeArena();
  }

  renderUpgradeArena() {
    const container = document.getElementById('casebattle-content-area');
    if (!container) return;

    const user = window.authManager?.currentUser;
    const botNames = { easy: 'Бот Новичок 🤖', normal: 'Бот Профи 🤖', hard: 'Бот Магнат 👑' };
    const p2Name = this.opponentType === 'bot' ? botNames[this.botDifficulty] : 'Игрок 2';

    container.innerHTML = `
      <div style="max-width: 1040px; margin: 0 auto;">
        
        <!-- Live Header Info -->
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; margin-bottom: 22px; background: rgba(14, 8, 14, 0.9); border: 1px solid var(--border-color); border-radius: 18px; padding: 18px 24px;">
          
          <!-- P1 Overview -->
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 50px; height: 50px; border-radius: 14px; background: rgba(255, 0, 77, 0.15); border: 2px solid #ff004d; display: flex; align-items: center; justify-content: center; font-size: 24px;">👤</div>
            <div>
              <div style="font-size: 13.5px; font-weight: 800; color: #fff;">${user.username} (ВЫ)</div>
              <div style="font-size: 24px; font-weight: 900; color: #ff004d;" id="ub-p1-chips">$${this.upgradeP1Chips.toFixed(2)}</div>
            </div>
          </div>

          <!-- Match Center Hub -->
          <div style="text-align: center;">
            <div style="font-size: 11px; font-weight: 800; color: #ffd700; text-transform: uppercase; letter-spacing: 1px;">
              🏆 Призовой Банк: $${this.upgradePot.toFixed(2)}
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 4px;">
              <span id="ub-round-indicator" style="font-size: 13px; font-weight: 800; color: #fff; background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 6px;">Раунд ${this.upgradeRound}/${this.upgradeMaxRounds}</span>
              <span id="ub-match-timer" style="font-size: 14px; font-weight: 900; color: #10b981; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 4px 12px; border-radius: 6px;">${this.upgradeTimeLeft}s</span>
            </div>
          </div>

          <!-- P2 Overview -->
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 14px;">
            <div style="text-align: right;">
              <div style="font-size: 13.5px; font-weight: 800; color: #fff;">${p2Name}</div>
              <div style="font-size: 24px; font-weight: 900; color: #38bdf8;" id="ub-p2-chips">$${this.upgradeP2Chips.toFixed(2)}</div>
            </div>
            <div style="width: 50px; height: 50px; border-radius: 14px; background: rgba(56, 189, 248, 0.15); border: 2px solid #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 24px;">🤖</div>
          </div>

        </div>

        <!-- Duel Stations (Left P1, Right P2) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 22px;">
          
          <!-- Station P1 -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid rgba(255, 0, 77, 0.35); border-radius: 18px; padding: 20px; text-align: center; position: relative;">
            <div style="font-size: 12px; font-weight: 800; color: #ff004d; text-transform: uppercase; margin-bottom: 12px;">Ваша станция апгрейда</div>

            <!-- SVG Wheel Station P1 -->
            <div style="position: relative; width: 170px; height: 170px; margin: 0 auto 16px;">
              <svg id="ub-svg-p1" viewBox="0 0 100 100" style="width: 100%; height: 100%; transform: rotate(0deg); transition: transform 1.8s cubic-bezier(0.12, 0.8, 0.32, 1);">
                <circle cx="50" cy="50" r="45" fill="#140a12" stroke="rgba(255,255,255,0.08)" stroke-width="4"/>
                <path id="ub-p1-slice" d="" fill="rgba(255, 0, 77, 0.65)" stroke="#ff004d" stroke-width="1.5"/>
                <circle cx="50" cy="50" r="16" fill="#060307" stroke="#ff004d" stroke-width="2"/>
              </svg>
              <!-- Bottom Center Pointer Indicator -->
              <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 14px solid #ff004d; filter: drop-shadow(0 0 8px #ff004d); z-index: 10;"></div>
              <div id="ub-p1-center-text" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 11px; font-weight: 900; color: #fff; pointer-events: none;">
                ${this.upgradeP1Mult}x
              </div>
            </div>

            <!-- Bet Controls for P1 -->
            <div style="background: rgba(0,0,0,0.4); border-radius: 12px; padding: 12px; margin-bottom: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 11.5px;">
                <span style="color: var(--text-dim);">Ставка фишек:</span>
                <span style="font-weight: 800; color: #fff;" id="ub-p1-bet-val">$${this.upgradeP1Bet.toFixed(2)}</span>
              </div>

              <!-- Quick chips percentages -->
              <div style="display: flex; gap: 4px; margin-bottom: 8px;">
                <button class="bet-chip" onclick="window.CaseBattleController.setUpgradeBetPct(0.1)" style="flex: 1; padding: 4px 0; font-size: 11px;">10%</button>
                <button class="bet-chip" onclick="window.CaseBattleController.setUpgradeBetPct(0.25)" style="flex: 1; padding: 4px 0; font-size: 11px;">25%</button>
                <button class="bet-chip" onclick="window.CaseBattleController.setUpgradeBetPct(0.5)" style="flex: 1; padding: 4px 0; font-size: 11px;">50%</button>
                <button class="bet-chip" onclick="window.CaseBattleController.setUpgradeBetPct(1.0)" style="flex: 1; padding: 4px 0; font-size: 11px; color: #ff004d;">ALL-IN</button>
              </div>

              <!-- Multipliers -->
              <div style="display: flex; gap: 4px;">
                <button class="bet-chip ${this.upgradeP1Mult === 1.5 ? 'active' : ''}" onclick="window.CaseBattleController.setUpgradeMult(1.5)" style="flex: 1; font-size: 11px; padding: 6px 0;">1.5x</button>
                <button class="bet-chip ${this.upgradeP1Mult === 2.0 ? 'active' : ''}" onclick="window.CaseBattleController.setUpgradeMult(2.0)" style="flex: 1; font-size: 11px; padding: 6px 0;">2.0x</button>
                <button class="bet-chip ${this.upgradeP1Mult === 3.0 ? 'active' : ''}" onclick="window.CaseBattleController.setUpgradeMult(3.0)" style="flex: 1; font-size: 11px; padding: 6px 0;">3.0x</button>
                <button class="bet-chip ${this.upgradeP1Mult === 5.0 ? 'active' : ''}" onclick="window.CaseBattleController.setUpgradeMult(5.0)" style="flex: 1; font-size: 11px; padding: 6px 0;">5.0x</button>
              </div>
            </div>

            <!-- Spin Fire Action Button -->
            <button class="btn-upgrade-fire" id="btn-ub-spin-round" onclick="window.CaseBattleController.spinUpgradeRound()" style="width: 100%; padding: 12px;">
              <span>⚡ КРУТИТЬ РАУНД</span>
            </button>
          </div>

          <!-- Station P2 (Opponent) -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 18px; padding: 20px; text-align: center; position: relative;">
            <div style="font-size: 12px; font-weight: 800; color: #38bdf8; text-transform: uppercase; margin-bottom: 12px;">Станция соперника</div>

            <!-- SVG Wheel Station P2 -->
            <div style="position: relative; width: 170px; height: 170px; margin: 0 auto 16px;">
              <svg id="ub-svg-p2" viewBox="0 0 100 100" style="width: 100%; height: 100%; transform: rotate(0deg); transition: transform 1.8s cubic-bezier(0.12, 0.8, 0.32, 1);">
                <circle cx="50" cy="50" r="45" fill="#08131d" stroke="rgba(255,255,255,0.08)" stroke-width="4"/>
                <path id="ub-p2-slice" d="" fill="rgba(56, 189, 248, 0.65)" stroke="#38bdf8" stroke-width="1.5"/>
                <circle cx="50" cy="50" r="16" fill="#060307" stroke="#38bdf8" stroke-width="2"/>
              </svg>
              <!-- Bottom Center Pointer Indicator -->
              <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 14px solid #38bdf8; filter: drop-shadow(0 0 8px #38bdf8); z-index: 10;"></div>
              <div id="ub-p2-center-text" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 11px; font-weight: 900; color: #fff; pointer-events: none;">
                ${this.upgradeP2Mult}x
              </div>
            </div>

            <!-- Opponent Status Readout -->
            <div style="background: rgba(0,0,0,0.4); border-radius: 12px; padding: 16px; margin-bottom: 14px; min-height: 98px; display: flex; flex-direction: column; justify-content: center;">
              <div style="font-size: 12px; color: var(--text-dim); margin-bottom: 4px;">Выбор соперника:</div>
              <div style="font-size: 15px; font-weight: 900; color: #38bdf8;" id="ub-p2-choice-text">
                Ставка: $${this.upgradeP2Bet.toFixed(2)} на ${this.upgradeP2Mult}x
              </div>
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;" id="ub-p2-status-hint">Ожидает вашего хода...</div>
            </div>

            <!-- Locked bot status pill -->
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 12px; border-radius: 8px; font-size: 12px; font-weight: 800; color: var(--text-dim);">
              🤖 Автоматический спин соперника
            </div>
          </div>

        </div>

        <!-- Round History -->
        <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 16px;">
          <div style="font-size: 12px; font-weight: 800; color: var(--text-dim); text-transform: uppercase; margin-bottom: 10px;">
            История раундов дуэли
          </div>
          <div id="ub-history-list" style="display: flex; flex-direction: column; gap: 8px;">
            <div style="text-align: center; color: var(--text-dim); font-size: 12px; padding: 10px;">Раунды появятся здесь после спина...</div>
          </div>
        </div>

      </div>
    `;

    this.updateWheelSlices();
  }

  setUpgradeBetPct(pct) {
    if (this.isUpgradeSpinning) return;
    this.upgradeP1Bet = Math.max(1, Number((this.upgradeP1Chips * pct).toFixed(2)));
    const el = document.getElementById('ub-p1-bet-val');
    if (el) el.textContent = `$${this.upgradeP1Bet.toFixed(2)}`;
  }

  setUpgradeMult(mult) {
    if (this.isUpgradeSpinning) return;
    this.upgradeP1Mult = mult;
    this.renderUpgradeArena();
  }

  updateWheelSlices() {
    // Sector path drawing: bottom-centered win zone
    const p1Chance = Math.min(95, (100 / this.upgradeP1Mult) * 0.95);
    const p2Chance = Math.min(95, (100 / this.upgradeP2Mult) * 0.95);

    this.drawWheelSlice('ub-p1-slice', p1Chance);
    this.drawWheelSlice('ub-p2-slice', p2Chance);
  }

  drawWheelSlice(elementId, chancePct) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const angleDeg = (chancePct / 100) * 360;
    // Bottom-center win zone: centered at 90 deg (bottom)
    const startAngle = 90 - (angleDeg / 2);
    const endAngle = 90 + (angleDeg / 2);

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 50 + 45 * Math.cos(startRad);
    const y1 = 50 + 45 * Math.sin(startRad);
    const x2 = 50 + 45 * Math.cos(endRad);
    const y2 = 50 + 45 * Math.sin(endRad);

    const largeArc = angleDeg > 180 ? 1 : 0;
    const d = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`;
    el.setAttribute('d', d);
  }

  async spinUpgradeRound() {
    if (this.isUpgradeSpinning || this.battleState !== 'battling') return;
    this.isUpgradeSpinning = true;

    const spinBtn = document.getElementById('btn-ub-spin-round');
    if (spinBtn) spinBtn.disabled = true;

    // AI chooses Opponent Bet & Multiplier
    if (this.opponentType === 'bot') {
      const p2Frac = this.botDifficulty === 'easy' ? 0.15 : this.botDifficulty === 'normal' ? 0.25 : 0.35;
      this.upgradeP2Bet = Math.max(1, Math.min(this.upgradeP2Chips, Number((this.upgradeP2Chips * p2Frac).toFixed(2))));
      const multPool = this.botDifficulty === 'easy' ? [1.5, 2.0] : this.botDifficulty === 'normal' ? [2.0, 3.0] : [2.0, 3.0, 5.0];
      this.upgradeP2Mult = multPool[Math.floor(Math.random() * multPool.length)];
    }

    const p2Text = document.getElementById('ub-p2-choice-text');
    if (p2Text) p2Text.textContent = `Ставка: $${this.upgradeP2Bet.toFixed(2)} на ${this.upgradeP2Mult}x`;

    this.updateWheelSlices();

    window.SoundManager?.playCaseOpening?.();

    // Determine outcomes mathematically
    const p1Chance = Math.min(95, (100 / this.upgradeP1Mult) * 0.95);
    const p2Chance = Math.min(95, (100 / this.upgradeP2Mult) * 0.95);

    const p1Roll = Math.random() * 100;
    const p2Roll = Math.random() * 100;

    const p1Won = p1Roll <= p1Chance;
    const p2Won = p2Roll <= p2Chance;

    // Animate wheels rotation
    const baseRot = 1440; // 4 full revolutions
    const p1Rot = baseRot + (p1Won ? (90 - (p1Chance / 2) + Math.random() * p1Chance) : (270 + Math.random() * 60));
    const p2Rot = baseRot + (p2Won ? (90 - (p2Chance / 2) + Math.random() * p2Chance) : (270 + Math.random() * 60));

    const svgP1 = document.getElementById('ub-svg-p1');
    const svgP2 = document.getElementById('ub-svg-p2');
    if (svgP1) svgP1.style.transform = `rotate(${p1Rot}deg)`;
    if (svgP2) svgP2.style.transform = `rotate(${p2Rot}deg)`;

    // Wait 1.8s for spin animation
    await new Promise(r => setTimeout(r, 1850));

    // Update chips balances
    if (p1Won) {
      const profit = Number((this.upgradeP1Bet * this.upgradeP1Mult - this.upgradeP1Bet).toFixed(2));
      this.upgradeP1Chips = Number((this.upgradeP1Chips + profit).toFixed(2));
    } else {
      this.upgradeP1Chips = Math.max(0, Number((this.upgradeP1Chips - this.upgradeP1Bet).toFixed(2)));
    }

    if (p2Won) {
      const profit = Number((this.upgradeP2Bet * this.upgradeP2Mult - this.upgradeP2Bet).toFixed(2));
      this.upgradeP2Chips = Number((this.upgradeP2Chips + profit).toFixed(2));
    } else {
      this.upgradeP2Chips = Math.max(0, Number((this.upgradeP2Chips - this.upgradeP2Bet).toFixed(2)));
    }

    // Play sounds
    if (p1Won) window.SoundManager?.playWin?.();
    else window.SoundManager?.playLoss?.();

    // Update chips display
    const p1ChipsEl = document.getElementById('ub-p1-chips');
    const p2ChipsEl = document.getElementById('ub-p2-chips');
    if (p1ChipsEl) p1ChipsEl.textContent = `$${this.upgradeP1Chips.toFixed(2)}`;
    if (p2ChipsEl) p2ChipsEl.textContent = `$${this.upgradeP2Chips.toFixed(2)}`;

    // Append to history
    const histEl = document.getElementById('ub-history-list');
    if (histEl) {
      if (this.upgradeRound === 1) histEl.innerHTML = '';
      const row = document.createElement('div');
      row.style.cssText = 'display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; align-items: center; background: rgba(255,255,255,0.02); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.04);';
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: ${p1Won ? '#10b981' : '#ef4444'}; font-weight: 800;">${p1Won ? '+' : '-'}$${p1Won ? (this.upgradeP1Bet * this.upgradeP1Mult - this.upgradeP1Bet).toFixed(2) : this.upgradeP1Bet.toFixed(2)}</span>
          <span style="font-size: 11px; color: var(--text-dim);">(${this.upgradeP1Mult}x)</span>
        </div>
        <div style="font-size: 11px; font-weight: 800; color: var(--text-dim);">Раунд ${this.upgradeRound}</div>
        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
          <span style="font-size: 11px; color: var(--text-dim);">(${this.upgradeP2Mult}x)</span>
          <span style="color: ${p2Won ? '#10b981' : '#ef4444'}; font-weight: 800;">${p2Won ? '+' : '-'}$${p2Won ? (this.upgradeP2Bet * this.upgradeP2Mult - this.upgradeP2Bet).toFixed(2) : this.upgradeP2Bet.toFixed(2)}</span>
        </div>
      `;
      histEl.prepend(row);
    }

    // Check Knockout condition ($0)
    if (this.upgradeP1Chips <= 0) {
      if (this.upgradeTimer) clearInterval(this.upgradeTimer);
      this.finishUpgradeBattle('knockout_p1');
      return;
    }
    if (this.upgradeP2Chips <= 0) {
      if (this.upgradeTimer) clearInterval(this.upgradeTimer);
      this.finishUpgradeBattle('knockout_p2');
      return;
    }

    this.upgradeRound++;
    if (this.upgradeRound > this.upgradeMaxRounds) {
      if (this.upgradeTimer) clearInterval(this.upgradeTimer);
      this.finishUpgradeBattle('rounds_done');
      return;
    }

    const roundEl = document.getElementById('ub-round-indicator');
    if (roundEl) roundEl.textContent = `Раунд ${this.upgradeRound}/${this.upgradeMaxRounds}`;

    this.isUpgradeSpinning = false;
    if (spinBtn) spinBtn.disabled = false;
  }

  finishUpgradeBattle(reason) {
    this.battleState = 'finished';
    if (this.upgradeTimer) clearInterval(this.upgradeTimer);

    const user = window.authManager?.currentUser;
    const isP1Winner = this.upgradeP1Chips > this.upgradeP2Chips || reason === 'knockout_p2';
    const isTie = this.upgradeP1Chips === this.upgradeP2Chips && reason !== 'knockout_p2' && reason !== 'knockout_p1';

    if (isP1Winner && user) {
      // Award the entire real prize pot
      user.balance = Number((user.balance + this.upgradePot).toFixed(2));
      const netGain = Number((this.upgradePot / 2).toFixed(2));
      user.stats.netProfit = Number(((user.stats.netProfit || 0) + netGain).toFixed(2));
      user.stats.upgradesWon = (user.stats.upgradesWon || 0) + 1;

      // Pass XP reward
      if (window.SimupPassController?.addXp) {
        window.SimupPassController.addXp(500);
      }

      // Quests triggers
      window.questsManager?.recordAction('upgrade_wins', 1);
      window.questsManager?.recordAction('case_battle_win', 1);
      window.questsManager?.recordPassAction('pq_upgrade_battle', 1);
      window.questsManager?.recordPassAction('pq_total_wager_2k', this.upgradePot / 2);

      window.authManager.saveCurrentUser();
      window.updateHeaderUserUI?.(user);

      window.SoundManager?.playJackpot?.() || window.SoundManager?.playWin?.();
      window.confettiEffect?.();

      const reasonMsg = reason === 'knockout_p2' ? '💥 НОКАУТ СОПЕРНИКА ($0)!' : '🏆 ПОБЕДА ПО БАЛАНСУ ФИШЕК!';
      window.notify?.bigWin(
        reasonMsg,
        `Вы выиграли Апгрейд-Батл и забрали весь банк $${this.upgradePot.toFixed(2)} (Чистая прибыль: +$${netGain.toFixed(2)})!`
      );
    } else if (isTie && user) {
      // Return 50% stake to user
      const refund = this.upgradePot / 2;
      user.balance = Number((user.balance + refund).toFixed(2));
      window.authManager.saveCurrentUser();
      window.updateHeaderUserUI?.(user);
      window.notify?.info('Ничья!', `Балансы фишек равны. Ваш взнос $${refund.toFixed(2)} возвращён.`);
    } else {
      window.SoundManager?.playLoss?.();
      const reasonMsg = reason === 'knockout_p1' ? '💥 НОКАУТ! У вас закончились фишки ($0).' : 'Поражение по балансу фишек.';
      window.notify?.error(reasonMsg, `Соперник набрал $${this.upgradeP2Chips.toFixed(2)}, ваш баланс: $${this.upgradeP1Chips.toFixed(2)}.`);
    }

    const spinBtn = document.getElementById('btn-ub-spin-round');
    if (spinBtn) {
      spinBtn.outerHTML = `
        <div style="background: ${isP1Winner ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; border: 1px solid ${isP1Winner ? '#10b981' : '#ef4444'}; border-radius: 10px; padding: 12px; text-align: center; margin-top: 10px;">
          <div style="font-size: 16px; font-weight: 900; color: ${isP1Winner ? '#10b981' : '#ef4444'}; margin-bottom: 8px;">
            ${isP1Winner ? '🎉 ВЫ ПОБЕДИЛИ!' : isTie ? '⚖️ НИЧЬЯ' : '✕ ПОРАЖЕНИЕ'}
          </div>
          <button class="btn-sm-action" onclick="window.CaseBattleController.renderLobby()" style="background: var(--accent-color); color: #000; font-weight: 800; border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer;">
            Сыграть новый батл
          </button>
        </div>
      `;
    }
  }

  // ==========================================
  // CASE BATTLE EXECUTION
  // ==========================================
  async startCaseBattle() {
    const user = window.authManager?.currentUser;
    if (!user) {
      window.showAuthModal?.('login');
      return;
    }

    const totalCost = this.getTotalCost();
    if (user.balance < totalCost) {
      window.notify?.error('Недостаточно средств', `Для участия в батле требуется $${totalCost.toFixed(2)}, ваш баланс: $${user.balance.toFixed(2)}`);
      return;
    }

    // Deduct entry fee
    user.balance = Number((user.balance - totalCost).toFixed(2));
    user.stats.wagered = Number(((user.stats.wagered || 0) + totalCost).toFixed(2));
    window.authManager.saveCurrentUser();
    window.updateHeaderUserUI?.(user);

    this.battleState = 'battling';
    this.currentRoundIdx = 0;
    this.player1Total = 0;
    this.player2Total = 0;
    this.player1Drops = [];
    this.player2Drops = [];

    this.renderCaseBattleArena();
    this.playNextCaseRound();
  }

  renderCaseBattleArena() {
    const container = document.getElementById('casebattle-content-area');
    if (!container) return;

    const user = window.authManager?.currentUser;
    const botNames = { easy: 'Бот Вася', normal: 'Бот Профи', hard: 'Бот Магнат 👑' };
    const p2Name = this.opponentType === 'bot' ? botNames[this.botDifficulty] : 'Игрок 2';

    container.innerHTML = `
      <div style="max-width: 980px; margin: 0 auto;">
        
        <!-- Live Battle Scoreboard -->
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; margin-bottom: 24px; background: rgba(14, 8, 14, 0.9); border: 1px solid var(--border-color); border-radius: 18px; padding: 20px;">
          
          <!-- Player 1 Score -->
          <div style="text-align: left; display: flex; align-items: center; gap: 14px;">
            <div style="width: 52px; height: 52px; border-radius: 14px; background: rgba(255, 0, 77, 0.15); border: 2px solid #ff004d; display: flex; align-items: center; justify-content: center; font-size: 24px;">👤</div>
            <div>
              <div style="font-size: 14px; font-weight: 800; color: #fff;">${user.username} (ВЫ)</div>
              <div style="font-size: 24px; font-weight: 900; color: #ff004d;" id="cb-p1-score">$0.00</div>
            </div>
          </div>

          <!-- VS Emblem & Round Indicator -->
          <div style="text-align: center;">
            <div style="font-size: 26px; font-weight: 900; color: #ffd700; text-shadow: 0 0 16px rgba(255,215,0,0.5);">VS</div>
            <div style="font-size: 12px; font-weight: 800; color: var(--text-dim); margin-top: 4px;" id="cb-round-status">
              Раунд 1 из ${this.selectedCases.length}
            </div>
          </div>

          <!-- Player 2 Score -->
          <div style="text-align: right; display: flex; align-items: center; justify-content: flex-end; gap: 14px;">
            <div>
              <div style="font-size: 14px; font-weight: 800; color: #fff;">${p2Name}</div>
              <div style="font-size: 24px; font-weight: 900; color: #38bdf8;" id="cb-p2-score">$0.00</div>
            </div>
            <div style="width: 52px; height: 52px; border-radius: 14px; background: rgba(56, 189, 248, 0.15); border: 2px solid #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 24px;">🤖</div>
          </div>

        </div>

        <!-- Duel Spin Rails -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 24px;">
          
          <!-- Rail P1 -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 18px; text-align: center;">
            <div style="font-size: 12px; font-weight: 800; color: var(--text-dim); text-transform: uppercase; margin-bottom: 12px;">Ваш дроп</div>
            <div id="cb-rail-p1" style="height: 160px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
              <div style="font-size: 40px; animation: pulse 1.2s infinite;">📦</div>
              <div style="font-size: 13px; color: var(--text-dim); margin-top: 8px;">Приготовьтесь...</div>
            </div>
          </div>

          <!-- Rail P2 -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 18px; text-align: center;">
            <div style="font-size: 12px; font-weight: 800; color: var(--text-dim); text-transform: uppercase; margin-bottom: 12px;">Дроп соперника</div>
            <div id="cb-rail-p2" style="height: 160px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
              <div style="font-size: 40px; animation: pulse 1.2s infinite;">📦</div>
              <div style="font-size: 13px; color: var(--text-dim); margin-top: 8px;">Приготовьтесь...</div>
            </div>
          </div>

        </div>

        <!-- History of drops list -->
        <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 16px;">
          <div style="font-size: 12px; font-weight: 800; color: var(--text-dim); text-transform: uppercase; margin-bottom: 10px;">
            История выпавшего оружия
          </div>
          <div id="cb-history-list" style="display: flex; flex-direction: column; gap: 8px;">
          </div>
        </div>

      </div>
    `;
  }

  async playNextCaseRound() {
    if (this.currentRoundIdx >= this.selectedCases.length) {
      this.finishCaseBattle();
      return;
    }

    const currentCase = this.selectedCases[this.currentRoundIdx];
    const roundNumber = this.currentRoundIdx + 1;

    const roundStatusEl = document.getElementById('cb-round-status');
    if (roundStatusEl) {
      roundStatusEl.textContent = `Раунд ${roundNumber} из ${this.selectedCases.length} (${currentCase.name})`;
    }

    window.SoundManager?.playCaseOpening?.();

    const drop1 = this.rollCaseItem(currentCase);
    const drop2 = this.rollCaseItem(currentCase);

    const rail1 = document.getElementById('cb-rail-p1');
    const rail2 = document.getElementById('cb-rail-p2');

    if (rail1) {
      rail1.innerHTML = `<div style="font-size: 46px; animation: spin 0.6s linear infinite;">↻</div><div style="color: #ff004d; font-weight: 800; margin-top: 8px;">Крутится...</div>`;
    }
    if (rail2) {
      rail2.innerHTML = `<div style="font-size: 46px; animation: spin 0.6s linear infinite;">↻</div><div style="color: #38bdf8; font-weight: 800; margin-top: 8px;">Крутится...</div>`;
    }

    await new Promise(r => setTimeout(r, 2200));

    window.SoundManager?.playWin?.();

    this.player1Total = Number((this.player1Total + drop1.price).toFixed(2));
    this.player2Total = Number((this.player2Total + drop2.price).toFixed(2));
    this.player1Drops.push(drop1);
    this.player2Drops.push(drop2);

    const p1ScoreEl = document.getElementById('cb-p1-score');
    const p2ScoreEl = document.getElementById('cb-p2-score');
    if (p1ScoreEl) p1ScoreEl.textContent = `$${this.player1Total.toFixed(2)}`;
    if (p2ScoreEl) p2ScoreEl.textContent = `$${this.player2Total.toFixed(2)}`;

    if (rail1) {
      rail1.innerHTML = `
        <img src="${drop1.image || drop1.fallbackSvg}" alt="${drop1.name}" style="width: 80px; height: 80px; object-fit: contain; filter: drop-shadow(0 0 14px ${drop1.rarityColor || '#ff004d'});" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${drop1.id || ''}', '${drop1.name?.replace(/['\"\\]/g, '') || ''}', '${drop1.rarity || 'milspec'}', '${drop1.category || 'weapon'}', '${drop1.game || 'cs2'}');">
        <div style="font-size: 13px; font-weight: 800; color: #fff; margin-top: 6px;">${drop1.name}</div>
        <div style="font-size: 16px; font-weight: 900; color: #ff004d;">$${drop1.price.toFixed(2)}</div>
      `;
    }

    if (rail2) {
      rail2.innerHTML = `
        <img src="${drop2.image || drop2.fallbackSvg}" alt="${drop2.name}" style="width: 80px; height: 80px; object-fit: contain; filter: drop-shadow(0 0 14px ${drop2.rarityColor || '#38bdf8'});" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${drop2.id || ''}', '${drop2.name?.replace(/['\"\\]/g, '') || ''}', '${drop2.rarity || 'milspec'}', '${drop2.category || 'weapon'}', '${drop2.game || 'cs2'}');">
        <div style="font-size: 13px; font-weight: 800; color: #fff; margin-top: 6px;">${drop2.name}</div>
        <div style="font-size: 16px; font-weight: 900; color: #38bdf8;">$${drop2.price.toFixed(2)}</div>
      `;
    }

    const historyList = document.getElementById('cb-history-list');
    if (historyList) {
      const row = document.createElement('div');
      row.style.cssText = 'display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; align-items: center; background: rgba(255,255,255,0.02); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.04);';
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #ff004d; font-weight: 800;">$${drop1.price.toFixed(2)}</span>
          <span style="font-size: 12px; color: #fff;">${drop1.name}</span>
        </div>
        <div style="font-size: 11px; font-weight: 800; color: var(--text-dim);">Раунд ${roundNumber}</div>
        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
          <span style="font-size: 12px; color: #fff;">${drop2.name}</span>
          <span style="color: #38bdf8; font-weight: 800;">$${drop2.price.toFixed(2)}</span>
        </div>
      `;
      historyList.prepend(row);
    }

    this.currentRoundIdx++;
    setTimeout(() => {
      this.playNextCaseRound();
    }, 1600);
  }

  rollCaseItem(caseObj) {
    const items = caseObj.items || [];
    if (items.length === 0) {
      const all = window.catalogController?.skins || window.SKINS_DATABASE || [];
      return all[Math.floor(Math.random() * all.length)];
    }
    const totalWeight = items.reduce((s, it) => s + (it.chance || 1), 0);
    let rand = Math.random() * totalWeight;
    for (const it of items) {
      rand -= (it.chance || 1);
      if (rand <= 0) return it;
    }
    return items[0];
  }

  finishCaseBattle() {
    this.battleState = 'finished';
    const isP1Winner = this.player1Total >= this.player2Total;
    const user = window.authManager?.currentUser;

    if (isP1Winner && user) {
      const wonItems = [...this.player1Drops, ...this.player2Drops].map(it => ({
        ...it,
        instanceId: `cb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        obtainedDate: Date.now()
      }));

      if (!user.inventory) user.inventory = [];
      user.inventory.push(...wonItems);

      const netProfit = Number(((this.player1Total + this.player2Total) - this.getTotalCost()).toFixed(2));
      user.stats.netProfit = Number(((user.stats.netProfit || 0) + netProfit).toFixed(2));
      user.stats.upgradesWon = (user.stats.upgradesWon || 0) + 1;

      // Pass XP reward
      if (window.SimupPassController?.addXp) {
        window.SimupPassController.addXp(400);
      }

      // Quests triggers
      window.questsManager?.recordAction('case_battle_win', 1);
      window.questsManager?.recordPassAction('pq_upgrade_battle', 1);

      window.authManager.saveCurrentUser();

      window.SoundManager?.playWin?.();
      window.confettiEffect?.();
      window.notify?.bigWin('🏆 ПОБЕДА В КЕЙС-БАТЛЕ!', `Вы набрали $${this.player1Total.toFixed(2)} против $${this.player2Total.toFixed(2)} соперника! Все ${wonItems.length} скинов зачислены в ваш инвентарь!`);
    } else {
      window.SoundManager?.playLoss?.();
      window.notify?.error('Поражение в батле', `Соперник набрал $${this.player2Total.toFixed(2)}, ваш счёт: $${this.player1Total.toFixed(2)}. Попробуйте ещё раз!`);
    }

    const roundStatusEl = document.getElementById('cb-round-status');
    if (roundStatusEl) {
      roundStatusEl.innerHTML = `
        <div style="font-size: 16px; font-weight: 900; color: ${isP1Winner ? '#10b981' : '#ef4444'}; margin-bottom: 8px;">
          ${isP1Winner ? '🎉 ВЫ ПОБЕДИЛИ!' : '✕ ПОРАЖЕНИЕ'}
        </div>
        <button class="btn-sm-action" onclick="window.CaseBattleController.renderLobby()" style="background: var(--accent-color); color: #000; font-weight: 800; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer;">
          Сыграть новый батл
        </button>
      `;
    }
  }
}

window.CaseBattleController = new CaseBattleController();

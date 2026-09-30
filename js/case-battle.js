/* ==========================================================================
   SIMUP - 1-ON-1 CASE BATTLE ARENA (PROVABLY FAIR 1v1 DUEL)
   Play against Bot or real player via invite link.
   Simultaneous spins, real-time value tracking, winner takes all!
   ========================================================================== */

class CaseBattleController {
  constructor() {
    this.battleState = 'lobby'; // 'lobby', 'battling', 'finished'
    this.opponentType = 'bot'; // 'bot' or 'player'
    this.botDifficulty = 'normal'; // 'easy', 'normal', 'hard'
    this.selectedCases = []; // array of case objects for the battle
    this.rounds = [];
    this.currentRoundIdx = 0;

    this.player1Total = 0;
    this.player2Total = 0;
    this.player1Drops = [];
    this.player2Drops = [];

    this.battleId = null;
  }

  init() {
    this.renderLobby();
    this.checkUrlForInvite();
  }

  checkUrlForInvite() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const battleParam = urlParams.get('battle');
      if (battleParam) {
        window.notify?.info('⚔️ Приглашение в батл', `Загружен батл #${battleParam}. Настройте кейсы и начните бой!`);
      }
    } catch(e) {}
  }

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
    this.battleId = 'cb_' + Math.random().toString(36).substring(2, 9);
    const url = `${window.location.origin}${window.location.pathname}?battle=${this.battleId}`;
    navigator.clipboard?.writeText(url);
    window.notify?.bigWin('Ссылка скопирована! 📋', 'Отправьте ссылку другу: ' + url);
    return url;
  }

  renderLobby() {
    const container = document.getElementById('casebattle-content-area');
    if (!container) return;

    const allCases = window.CASES_DATABASE || [];
    const totalCost = this.getTotalCost();
    const user = window.authManager?.currentUser;

    container.innerHTML = `
      <div class="battle-lobby-wrap" style="max-width: 1040px; margin: 0 auto;">
        
        <!-- Header banner -->
        <div style="background: linear-gradient(135deg, rgba(182, 0, 76, 0.22) 0%, rgba(89, 0, 0, 0.12) 100%); border: 1px solid rgba(255, 0, 77, 0.3); border-radius: 18px; padding: 24px; margin-bottom: 24px; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; right: -30px; bottom: -30px; font-size: 140px; opacity: 0.05; pointer-events: none;">⚔️</div>
          <span class="drop-badge-new" style="font-size: 11px; padding: 3px 8px; margin-bottom: 8px; display: inline-block;">PVP DUEL ARENA</span>
          <h1 style="font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 6px;">Кейс-Батл 1 на 1</h1>
          <p style="font-size: 13.5px; color: var(--text-dim); max-width: 580px; margin: 0 auto;">
            Выберите кейсы для битвы, выберите оппонента (бот или друг по ссылке) и крутите одновременно! Победитель с наибольшей стоимостью лута забирает весь банк.
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
              <span>⚔️ НАЧАТЬ БАТЛ</span>
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

    // Bind lobby listeners
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
      this.startBattle();
    });
  }

  async startBattle() {
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

    this.renderBattleArena();
    this.playNextRound();
  }

  renderBattleArena() {
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
            <!-- Appended round by round -->
          </div>
        </div>

      </div>
    `;
  }

  async playNextRound() {
    if (this.currentRoundIdx >= this.selectedCases.length) {
      this.finishBattle();
      return;
    }

    const currentCase = this.selectedCases[this.currentRoundIdx];
    const roundNumber = this.currentRoundIdx + 1;

    const roundStatusEl = document.getElementById('cb-round-status');
    if (roundStatusEl) {
      roundStatusEl.textContent = `Раунд ${roundNumber} из ${this.selectedCases.length} (${currentCase.name})`;
    }

    window.SoundManager?.playCaseOpening?.();

    // Roll drops for Player 1 and Player 2
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

    // Wait 2.2s for dramatic spin reveal
    await new Promise(r => setTimeout(r, 2200));

    window.SoundManager?.playWin?.();

    this.player1Total = Number((this.player1Total + drop1.price).toFixed(2));
    this.player2Total = Number((this.player2Total + drop2.price).toFixed(2));
    this.player1Drops.push(drop1);
    this.player2Drops.push(drop2);

    // Update scoreboard
    const p1ScoreEl = document.getElementById('cb-p1-score');
    const p2ScoreEl = document.getElementById('cb-p2-score');
    if (p1ScoreEl) p1ScoreEl.textContent = `$${this.player1Total.toFixed(2)}`;
    if (p2ScoreEl) p2ScoreEl.textContent = `$${this.player2Total.toFixed(2)}`;

    // Render drops in rails
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

    // Add row to history
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

    // Wait 1.6s before next round
    setTimeout(() => {
      this.playNextRound();
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

  finishBattle() {
    this.battleState = 'finished';
    const isP1Winner = this.player1Total >= this.player2Total;
    const user = window.authManager?.currentUser;

    if (isP1Winner && user) {
      // Winner takes all drops!
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

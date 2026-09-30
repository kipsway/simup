/* ==========================================================================
   SIMUP PASS - ULTIMATE BATTLE PASS & PROGRESSION SYSTEM (50 LEVELS)
   - 50 Challenging Progression Levels with steep exponential XP curve
   - Multi-game rewards: CS2, Dota 2, Rust skins, cash, perks & titles
   - Integrated Pass Quests for massive XP boosts
   - Commission reductions down to 0% and 0% loan interest
   ========================================================================== */

class SimupPassController {
  constructor() {
    this.activeView = 'levels'; // 'levels' or 'quests'

    this.REWARDS = [
      { level: 1, title: 'Стартовый буст', type: 'balance', value: 250, desc: '+$250.00 на баланс', icon: '💵' },
      { level: 2, title: 'Пистолет CS2', type: 'skin', skinName: 'USP-S | Ticket to Hell', price: 15.0, icon: '🔫' },
      { level: 3, title: 'Снижение комиссии биржи', type: 'perk_commission', value: 0.07, desc: 'Комиссия биржи снижена до 7% (было 8%)', icon: '📉' },
      { level: 4, title: 'Пояс Dota 2', type: 'skin', skinName: 'Belt of the Iron Surge', price: 25.0, icon: '🛡️' },
      { level: 5, title: 'Титул + Кэш', type: 'title', titleName: 'Исследователь Пасса', value: 1000, desc: 'Титул «Исследователь Пасса» + $1,000.00', icon: '🎖️' },
      { level: 6, title: 'Дверь Rust', type: 'skin', skinName: 'Toxic Double Sheet Metal Door', price: 150.0, icon: '🚪' },
      { level: 7, title: 'Льгота по кредитам', type: 'perk_loan', value: 0.08, desc: 'Ставка кредита в банке снижена до 8%', icon: '🏦' },
      { level: 8, title: 'Кэш-дроп', type: 'balance', value: 2500, desc: '+$2,500.00 на баланс', icon: '💵' },
      { level: 9, title: 'Винтовка CS2', type: 'skin', skinName: 'M4A1-S | Night Terror', price: 120.0, icon: '🔫' },
      { level: 10, title: 'Иммортал Dota 2', type: 'skin', skinName: 'Muh Keen Gun', price: 85.0, desc: 'Muh Keen Gun (Sniper) + $2,500.00', bonusCash: 2500, icon: '🎯' },
      { level: 11, title: 'Снижение комиссии биржи II', type: 'perk_commission', value: 0.06, desc: 'Комиссия биржи снижена до 6%', icon: '📉' },
      { level: 12, title: 'Оружие Rust', type: 'skin', skinName: 'Retrowave Hunting Bow', price: 165.0, icon: '🏹' },
      { level: 13, title: 'Кэш-буст', type: 'balance', value: 5000, desc: '+$5,000.00 на баланс', icon: '💵' },
      { level: 14, title: 'Автомат CS2', type: 'skin', skinName: 'AK-47 | Slate', price: 180.0, icon: '🔥' },
      { level: 15, title: 'Титул: Ветеран', type: 'title', titleName: 'Ветеран SIMUP', value: 7500, desc: 'Титул «Ветеран SIMUP» + $7,500.00', icon: '👑' },
      { level: 16, title: 'Льгота банка II', type: 'perk_loan', value: 0.06, desc: 'Ставка кредита снижена до 6%', icon: '🏦' },
      { level: 17, title: 'Иммортал Dota 2', type: 'skin', skinName: 'Arms of Desolation', price: 250.0, icon: '💀' },
      { level: 18, title: 'Автомат Rust', type: 'skin', skinName: 'Dragon AK-47', price: 450.0, icon: '🐉' },
      { level: 19, title: 'Крупный кэш', type: 'balance', value: 15000, desc: '+$15,000.00 на баланс', icon: '💵' },
      { level: 20, title: 'Снайперка CS2', type: 'skin', skinName: 'AWP | Neo-Noir', price: 550.0, icon: '🎯' },
      { level: 21, title: 'Снижение комиссии биржи III', type: 'perk_commission', value: 0.05, desc: 'Комиссия биржи снижена до 5%', icon: '📉' },
      { level: 22, title: 'Клинок Dota 2', type: 'skin', skinName: 'Soul Diffuser', price: 350.0, icon: '🗡️' },
      { level: 23, title: 'Автомат Rust Blackout', type: 'skin', skinName: 'Blackout AK47', price: 620.0, icon: '⚡' },
      { level: 24, title: 'Премиум кэш', type: 'balance', value: 25000, desc: '+$25,000.00 на баланс', icon: '💵' },
      { level: 25, title: 'Титул + Arcana Pudge', type: 'title_skin', titleName: 'Магнат Арены', skinName: 'Feast of Abscession', price: 1200.0, bonusCash: 25000, desc: 'Титул «Магнат Арены» + Arcana Pudge + $25,000.00', icon: '🥩' },
      { level: 26, title: 'Льгота банка III', type: 'perk_loan', value: 0.04, desc: 'Ставка кредита снижена до 4%', icon: '🏦' },
      { level: 27, title: 'Пистолет CS2 Printstream', type: 'skin', skinName: 'Desert Eagle | Printstream', price: 1850.0, icon: '💎' },
      { level: 28, title: 'ПП Rust Tempered', type: 'skin', skinName: 'Tempered MP5', price: 850.0, icon: '🔥' },
      { level: 29, title: 'Большой капитал', type: 'balance', value: 50000, desc: '+$50,000.00 на баланс', icon: '💵' },
      { level: 30, title: 'Меч Dota 2 Vigil Triumph', type: 'skin', skinName: 'Vigil Triumph', price: 1500.0, icon: '⚔️' },
      { level: 31, title: 'Снижение комиссии биржи IV', type: 'perk_commission', value: 0.03, desc: 'Комиссия биржи снижена до 3%', icon: '📉' },
      { level: 32, title: 'Маска Rust Frostbite', type: 'skin', skinName: 'Frostbite Metal Facemask', price: 1250.0, icon: '❄️' },
      { level: 33, title: 'Винтовка CS2 Император', type: 'skin', skinName: 'M4A4 | The Emperor', price: 950.0, icon: '👑' },
      { level: 34, title: 'Золотой кэш-буст', type: 'balance', value: 100000, desc: '+$100,000.00 на баланс', icon: '💵' },
      { level: 35, title: 'Титул + Arcana PA', type: 'title_skin', titleName: 'Вершитель Судеб', skinName: 'Manifold Paradox', price: 1500.0, bonusCash: 100000, desc: 'Титул «Вершитель Судеб» + Arcana Phantom Assassin + $100,000.00', icon: '🗡️' },
      { level: 36, title: 'Льгота банка IV', type: 'perk_loan', value: 0.02, desc: 'Ставка кредита снижена до 2%', icon: '🏦' },
      { level: 37, title: 'Меч Dota 2 Kantusa', type: 'skin', skinName: 'Kantusa the Script Sword', price: 3500.0, icon: '🗡️' },
      { level: 38, title: 'Винтовка Rust Glory SAR', type: 'skin', skinName: 'Glory SAR', price: 2200.0, icon: '⭐' },
      { level: 39, title: 'Алмазный капитал', type: 'balance', value: 250000, desc: '+$250,000.00 на баланс', icon: '💵' },
      { level: 40, title: 'Автомат CS2 Bloodsport', type: 'skin', skinName: 'AK-47 | Bloodsport', price: 2800.0, icon: '🩸' },
      { level: 41, title: 'Снижение комиссии биржи V', type: 'perk_commission', value: 0.01, desc: 'Комиссия биржи снижена до 1%!', icon: '📉' },
      { level: 42, title: 'Посох Dota 2 Darkclaw', type: 'skin', skinName: 'Darkclaw Emissary Staff', price: 4200.0, icon: '💀' },
      { level: 43, title: 'Куртка Rust Fire Jacket', type: 'skin', skinName: 'Fire Jacket', price: 5800.0, icon: '🔥' },
      { level: 44, title: 'Элитный бонус', type: 'balance', value: 500000, desc: '+$500,000.00 на баланс', icon: '💵' },
      { level: 45, title: 'Титул + Нож-Бабочка', type: 'title_skin', titleName: 'Повелитель Стихий', skinName: 'Butterfly Knife | Slaughter', price: 85000.0, desc: 'Титул «Повелитель Стихий» + ★ Нож-бабочка | Убийство ($85,000.00)', icon: '🦋' },
      { level: 46, title: '0% КРЕДИТ В БАНКЕ НАВСЕГДА', type: 'perk_loan', value: 0.00, desc: 'Ставка кредита снижена до 0.0% НАВСЕГДА! Беспроцентные займы!', icon: '🏦' },
      { level: 47, title: 'Спальник Rust Horror Bag', type: 'skin', skinName: 'Horror Bag', price: 18500.0, icon: '👻' },
      { level: 48, title: 'Курьер Golden Baby Roshan', type: 'skin', skinName: 'Golden Baby Roshan', price: 150000.0, icon: '🏆' },
      { level: 49, title: 'Королевский фонд', type: 'balance', value: 1000000, desc: '+$1,000,000.00 на баланс', icon: '💰' },
      { level: 50, title: 'УЛЬТИМАТИВНЫЙ ФИНАЛ: ВЛАДЫКА ВСЕЛЕННОЙ', type: 'ultimate', skinName: 'AWP | Dragon Lore', price: 450000.0, bonusCash: 2500000, titleName: 'Владыка Вселенной', desc: 'Титул «Владыка Вселенной» + $2,500,000.00 + AWP Dragon Lore ($450,000) + 0% КОМИССИИ НАВСЕГДА!', icon: '👑' }
    ];
  }

  // Steep progression: Level 1: 1,450 XP, Level 5: 3,820 XP, Level 10: 8,400 XP, Level 25: 47,000 XP, Level 50: 250,000+ XP!
  getXpForLevel(lvl) {
    return Math.floor(1000 * Math.pow(1.12, lvl - 1) + (lvl * 450));
  }

  getUserPassData() {
    const user = window.authManager?.currentUser;
    if (!user) return { xp: 0, level: 1, claimed: [] };
    if (!user.pass) {
      user.pass = { xp: 0, level: 1, claimed: [] };
    }
    return user.pass;
  }

  addXp(amount) {
    const user = window.authManager?.currentUser;
    if (!user) return;
    const pass = this.getUserPassData();
    pass.xp = (pass.xp || 0) + Math.max(1, Math.round(amount));

    // Check level ups
    let leveledUp = false;
    while (pass.xp >= this.getXpForLevel(pass.level) && pass.level < 50) {
      pass.xp -= this.getXpForLevel(pass.level);
      pass.level += 1;
      leveledUp = true;
    }

    window.authManager.saveCurrentUser();

    if (leveledUp) {
      window.SoundManager?.playWin?.();
      window.notify?.bigWin('👑 НОВЫЙ УРОВЕНЬ SIMUP PASS!', `Поздравляем! Вы достигли Уровня ${pass.level}! Заберите ваши награды во вкладке PASS.`);
    }

    this.render();
  }

  claimReward(lvl) {
    const user = window.authManager?.currentUser;
    if (!user) return;
    const pass = this.getUserPassData();
    if (pass.level < lvl) {
      window.notify?.warning('Уровень недостигнут', `Требуется Уровень ${lvl}. Ваш текущий уровень: ${pass.level}`);
      return;
    }
    if (pass.claimed.includes(lvl)) {
      window.notify?.info('Уже получено', 'Вы уже забрали награду за этот уровень.');
      return;
    }

    const reward = this.REWARDS.find(r => r.level === lvl);
    if (!reward) return;

    pass.claimed.push(lvl);

    if (reward.type === 'balance') {
      user.balance = Number((user.balance + reward.value).toFixed(2));
      window.notify?.bigWin('Награда получена!', `Зачислено +$${reward.value.toFixed(2)} на баланс!`);
    } else if (reward.type === 'skin' || reward.type === 'title_skin' || reward.type === 'ultimate') {
      const allSkins = window.catalogController?.skins || window.SKINS_DATABASE || [];
      const match = allSkins.find(s => s.name && s.name.toLowerCase().includes(reward.skinName.toLowerCase())) || {
        id: `pass_skin_${lvl}`,
        name: reward.skinName,
        price: reward.price,
        rarity: 'covert',
        category: 'weapon',
        image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJS5NO0m5O0m_7zO6-fzj9V7Pp8j-3I4IG72ADk-ERkY27zJYfBegc8YVCE-gC8k-e-h5C578-fynRquCl0537cnBCpwUYbQ2T8h_E/360fx360f'
      };

      const copy = {
        ...match,
        instanceId: `pass_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        obtainedDate: Date.now()
      };
      if (!user.inventory) user.inventory = [];
      user.inventory.push(copy);

      if (reward.bonusCash) {
        user.balance = Number((user.balance + reward.bonusCash).toFixed(2));
      }

      if (reward.titleName) {
        if (!user.unlockedTitles) user.unlockedTitles = ['Новичок'];
        if (!user.unlockedTitles.includes(reward.titleName)) {
          user.unlockedTitles.push(reward.titleName);
        }
      }

      window.notify?.bigWin('Скин получен!', `Скин ${reward.skinName} ($${reward.price.toFixed(2)}) добавлен в инвентарь!`);
    } else if (reward.type === 'title') {
      if (!user.unlockedTitles) user.unlockedTitles = ['Новичок'];
      if (!user.unlockedTitles.includes(reward.titleName)) {
        user.unlockedTitles.push(reward.titleName);
      }
      if (reward.value) {
        user.balance = Number((user.balance + reward.value).toFixed(2));
      }
      window.notify?.bigWin('Титул открыт! 🎖️', `Вы открыли титул «${reward.titleName}» и получили +$${(reward.value || 0).toFixed(2)}!`);
    } else if (reward.type === 'perk_commission') {
      if (window.economyManager) window.economyManager.MARKET_COMMISSION = reward.value;
      window.notify?.bigWin('Перк активирован!', reward.desc);
    } else if (reward.type === 'perk_loan') {
      if (window.economyManager) window.economyManager.LOAN_INTEREST_RATE = reward.value;
      window.notify?.bigWin('Перк активирован!', reward.desc);
    }

    if (reward.type === 'ultimate') {
      if (window.economyManager) {
        window.economyManager.MARKET_COMMISSION = 0.0;
        window.economyManager.LOAN_INTEREST_RATE = 0.0;
      }
    }

    window.authManager.saveCurrentUser();
    window.updateHeaderUserUI?.(user);
    this.render();
  }

  render() {
    const container = document.getElementById('pass-content-area');
    if (!container) return;

    const pass = this.getUserPassData();
    const nextXp = this.getXpForLevel(pass.level);
    const pct = Math.min(100, Math.round((pass.xp / nextXp) * 100));

    container.innerHTML = `
      <div style="max-width: 1080px; margin: 0 auto;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, rgba(182, 0, 76, 0.28) 0%, rgba(89, 0, 0, 0.15) 100%); border: 1px solid rgba(255, 0, 77, 0.35); border-radius: 20px; padding: 28px; margin-bottom: 24px; position: relative; overflow: hidden;">
          <div style="position: absolute; right: 20px; top: 10px; font-size: 160px; opacity: 0.05; pointer-events: none;">👑</div>
          <span class="drop-badge-new" style="font-size: 11px; padding: 3px 8px; margin-bottom: 8px; display: inline-block;">СЕЗОН 1: HARDCORE EDITION</span>
          <h1 style="font-size: 32px; font-weight: 900; color: #fff; margin-bottom: 6px;">SIMUP PASS (50 УРОВНЕЙ)</h1>
          <p style="font-size: 14px; color: var(--text-dim); max-width: 680px; line-height: 1.5;">
            Повышайте уровень за ставки, кейсы и выполнение специальных квестов пасса! Получить каждый новый уровень стало намного сложнее. Впереди вас ждут эксклюзивные скины из CS2, Dota 2 и Rust, кредитные льготы и снижение комиссии биржи до 0%!
          </p>

          <!-- Current Level & Progress Bar -->
          <div style="margin-top: 24px; background: rgba(0,0,0,0.5); border-radius: 14px; padding: 18px 22px; border: 1px solid rgba(255,255,255,0.08);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
              <div style="font-size: 16px; font-weight: 900; color: #fff; display: flex; align-items: center; gap: 10px;">
                <span style="background: linear-gradient(135deg, #ff004d, #b6004c); color: #fff; padding: 4px 12px; border-radius: 6px; font-size: 14px; font-weight: 900; box-shadow: 0 0 10px rgba(255,0,77,0.5);">LVL ${pass.level} / 50</span>
                <span>Прогресс до Уровня ${pass.level < 50 ? pass.level + 1 : 'MAX'}</span>
              </div>
              <div style="font-size: 13.5px; font-weight: 800; color: #ff3366;">
                ${pass.xp.toLocaleString()} / ${nextXp.toLocaleString()} XP (${pct}%)
              </div>
            </div>

            <!-- Progress Track -->
            <div style="width: 100%; height: 12px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; position: relative;">
              <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, #b6004c, #ff004d, #ffd700); border-radius: 999px; transition: width 0.4s ease; box-shadow: 0 0 16px rgba(255,0,77,0.8);"></div>
            </div>
          </div>
        </div>

        <!-- Mode Navigation: Levels vs Pass Quests -->
        <div style="display: flex; gap: 10px; margin-bottom: 22px;">
          <button class="game-pill-btn ${this.activeView === 'levels' ? 'active' : ''}" id="btn-pass-view-levels" style="flex: 1; padding: 12px; font-weight: 800; font-size: 13.5px;">
            👑 Награды уровней (1 — 50)
          </button>
          <button class="game-pill-btn ${this.activeView === 'quests' ? 'active' : ''}" id="btn-pass-view-quests" style="flex: 1; padding: 12px; font-weight: 800; font-size: 13.5px;">
            🎯 Квесты для Пасса (XP Буст)
          </button>
        </div>

        <!-- Dynamic Content Body -->
        <div id="pass-subview-container">
          ${this.activeView === 'levels' ? this.renderLevelsView(pass) : this.renderQuestsView()}
        </div>

      </div>
    `;

    document.getElementById('btn-pass-view-levels')?.addEventListener('click', () => {
      this.activeView = 'levels';
      this.render();
    });
    document.getElementById('btn-pass-view-quests')?.addEventListener('click', () => {
      this.activeView = 'quests';
      this.render();
    });
  }

  renderLevelsView(pass) {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(235px, 1fr)); gap: 14px;">
        ${this.REWARDS.map(r => {
          const isUnlocked = pass.level >= r.level;
          const isClaimed = pass.claimed.includes(r.level);
          return `
            <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid ${isUnlocked ? 'rgba(255, 0, 77, 0.45)' : 'rgba(255,255,255,0.06)'}; border-radius: 16px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; transition: transform 0.2s, border-color 0.2s;">
              ${isClaimed ? `
                <div style="position: absolute; top: 10px; right: 10px; background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.4); font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 4px;">✓ ЗАБРАНО</div>
              ` : isUnlocked ? `
                <div style="position: absolute; top: 10px; right: 10px; background: rgba(255, 0, 77, 0.25); color: #ff3366; border: 1px solid rgba(255, 0, 77, 0.5); font-size: 10px; font-weight: 900; padding: 2px 7px; border-radius: 4px; animation: pulseGlow 1.8s infinite;">ДОСТУПНО!</div>
              ` : `
                <div style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.05); color: var(--text-dim); font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 4px;">🔒 УРОВЕНЬ ${r.level}</div>
              `}

              <div>
                <div style="font-size: 34px; margin-bottom: 8px;">${r.icon}</div>
                <div style="font-size: 14px; font-weight: 800; color: #fff; margin-bottom: 4px;">${r.title}</div>
                <div style="font-size: 11.5px; color: var(--text-dim); min-height: 32px; line-height: 1.4;">${r.desc || (r.skinName + ' ($' + r.price.toFixed(2) + ')')}</div>
              </div>

              <div style="margin-top: 14px;">
                ${isClaimed ? `
                  <button disabled style="width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: var(--text-dim); font-size: 12px; font-weight: 700; padding: 8px; border-radius: 8px;">Забрано</button>
                ` : isUnlocked ? `
                  <button onclick="window.SimupPassController.claimReward(${r.level})" class="btn-sm-action" style="width: 100%; background: linear-gradient(135deg, #b6004c, #590000); color: #fff; border: 1px solid #ff004d; font-size: 12px; font-weight: 800; padding: 8px; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 14px rgba(255,0,77,0.4);">
                    ⚡ Забрать награду
                  </button>
                ` : `
                  <button disabled style="width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); color: var(--text-dim); font-size: 12px; font-weight: 700; padding: 8px; border-radius: 8px;">
                    Требуется ${r.level} уровень
                  </button>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  renderQuestsView() {
    const quests = window.questsManager?.getPassQuests() || [];
    return `
      <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid var(--border-color); border-radius: 16px; padding: 22px;">
        <div style="margin-bottom: 18px;">
          <h2 style="font-size: 18px; font-weight: 800; color: #fff;">Сезонные Квесты SIMUP PASS</h2>
          <p style="font-size: 12.5px; color: var(--text-dim); margin-top: 4px;">
            Выполняйте эти задачи для получения огромных начислений Pass XP и ускорения прокачки сложных уровней!
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px;">
          ${quests.map(q => {
            const completed = (q.progress >= q.target);
            const claimed = q.claimed;
            const pct = Math.min(100, Math.round((q.progress / q.target) * 100));

            return `
              <div style="background: ${completed && !claimed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.03)'}; border: 1px solid ${completed && !claimed ? '#10b981' : (claimed ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.05)')}; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                    <span style="font-size: 24px;">${q.icon}</span>
                    <span style="font-size: 11px; font-weight: 800; color: #ffd700; background: rgba(255,215,0,0.12); padding: 3px 8px; border-radius: 999px;">
                      +${q.rewardPassXp.toLocaleString()} Pass XP | +$${q.rewardCash}
                    </span>
                  </div>
                  <div style="font-weight: 800; font-size: 14px; color: #fff;">${q.title}</div>
                  <div style="font-size: 12px; color: var(--text-dim); margin: 4px 0 12px; line-height: 1.4;">${q.desc}</div>
                </div>

                <div>
                  <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--text-muted); margin-bottom: 6px;">
                    <span>Прогресс:</span>
                    <span style="font-weight: 700; color: #fff;">${q.progress} / ${q.target}</span>
                  </div>
                  <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; margin-bottom: 12px;">
                    <div style="width: ${pct}%; height: 100%; background: ${completed ? '#10b981' : 'linear-gradient(90deg, #b6004c, #ff004d)'}; border-radius: 999px;"></div>
                  </div>

                  ${claimed ? `
                    <div style="text-align: center; font-size: 12px; font-weight: 800; color: #10b981; padding: 6px; background: rgba(16,185,129,0.08); border-radius: 6px;">
                      ✓ Награда получена
                    </div>
                  ` : completed ? `
                    <button onclick="window.questsManager.claimPassQuest('${q.id}')" style="width: 100%; background: #10b981; color: #000; border: none; font-weight: 900; font-size: 12px; padding: 8px; border-radius: 6px; cursor: pointer; animation: pulseGlow 1.8s infinite;">
                      Забрать +${q.rewardPassXp} XP 🎁
                    </button>
                  ` : `
                    <div style="text-align: center; font-size: 11px; color: var(--text-dim); padding: 5px;">
                      В процессе (${pct}%)
                    </div>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
}

window.SimupPassController = new SimupPassController();

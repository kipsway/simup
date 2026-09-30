/* ==========================================================================
   SIMUP PASS - ULTIMATE BATTLE PASS & PROGRESSION SYSTEM
   30 Levels with exclusive skins, reduced market commission (down to 0%),
   reduced bank loan interest, XP from bets and quests!
   ========================================================================== */

class SimupPassController {
  constructor() {
    this.REWARDS = [
      { level: 1, title: 'Стартовый набор', type: 'balance', value: 50, desc: '+$50.00 на баланс', icon: '💵' },
      { level: 2, title: 'Армейский скин', type: 'skin', skinName: 'Glock-18 | High Beam', price: 4.5, icon: '🔫' },
      { level: 3, title: 'Снижение комиссии', type: 'perk_commission', value: 0.06, desc: 'Комиссия биржи снижена до 6% (было 8%)', icon: '📉' },
      { level: 4, title: 'Денежный бонус', type: 'balance', value: 100, desc: '+$100.00 на баланс', icon: '💵' },
      { level: 5, title: 'Кредитная льгота', type: 'perk_loan', value: 0.07, desc: 'Ставка кредита снижена до 7% (было 10%)', icon: '🏦' },
      { level: 6, title: 'Запрещённый скин', type: 'skin', skinName: 'AK-47 | Slate', price: 18.0, icon: '🔥' },
      { level: 7, title: 'Кеш-буст', type: 'balance', value: 200, desc: '+$200.00 на баланс', icon: '💵' },
      { level: 8, title: 'Снижение комиссии', type: 'perk_commission', value: 0.04, desc: 'Комиссия биржи снижена до 4%', icon: '📉' },
      { level: 9, title: 'Снайперский дроп', type: 'skin', skinName: 'AWP | Mortis', price: 28.5, icon: '🎯' },
      { level: 10, title: 'Кредитная льгота II', type: 'perk_loan', value: 0.05, desc: 'Ставка кредита снижена до 5%', icon: '🏦' },
      { level: 11, title: 'Крупный бонус', type: 'balance', value: 350, desc: '+$350.00 на баланс', icon: '💵' },
      { level: 12, title: 'Засекреченный скин', type: 'skin', skinName: 'USP-S | Cortex', price: 38.0, icon: '💀' },
      { level: 13, title: 'Премиум буст', type: 'balance', value: 500, desc: '+$500.00 на баланс', icon: '💵' },
      { level: 14, title: 'Снижение комиссии III', type: 'perk_commission', value: 0.02, desc: 'Комиссия биржи снижена до 2%', icon: '📉' },
      { level: 15, title: 'Тайный скин Covert', type: 'skin', skinName: 'M4A4 | Neo-Noir', price: 95.0, icon: '👑' },
      { level: 16, title: 'Банковский бонус', type: 'balance', value: 750, desc: '+$750.00 на баланс', icon: '💵' },
      { level: 17, title: 'Супер-заём', type: 'perk_loan', value: 0.03, desc: 'Ставка кредита снижена до 3%', icon: '🏦' },
      { level: 18, title: 'Тайный скин Covert', type: 'skin', skinName: 'AK-47 | Bloodsport', price: 165.0, icon: '🩸' },
      { level: 19, title: 'Золотой капитал', type: 'balance', value: 1200, desc: '+$1,200.00 на баланс', icon: '💵' },
      { level: 20, title: 'Легендарный скин', type: 'skin', skinName: 'AWP | Asiimov', price: 240.0, icon: '⭐' },
      { level: 22, title: 'Снижение комиссии IV', type: 'perk_commission', value: 0.01, desc: 'Комиссия биржи снижена до 1%!', icon: '📉' },
      { level: 25, title: 'Штык-нож M9 Bayonet', type: 'skin', skinName: 'M9 Bayonet | Lore', price: 890.0, icon: '🗡️' },
      { level: 28, title: 'Алмазный капитал', type: 'balance', value: 3000, desc: '+$3,000.00 на баланс', icon: '💎' },
      { level: 30, title: '0% КОМИССИИ НАВСЕГДА + DRAGON LORE', type: 'ultimate', skinName: 'AWP | Dragon Lore', price: 3450.0, desc: '0% комиссия биржи НАВСЕГДА + 0% долга банка + Драгон Лор!', icon: '🏆' }
    ];
  }

  getXpForLevel(lvl) {
    return lvl * 350;
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
    while (pass.xp >= this.getXpForLevel(pass.level) && pass.level < 30) {
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
    } else if (reward.type === 'skin' || reward.type === 'ultimate') {
      const allSkins = window.catalogController?.skins || window.SKINS_DATABASE || [];
      const match = allSkins.find(s => s.name.toLowerCase().includes(reward.skinName.toLowerCase())) || {
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

      window.notify?.bigWin('Скин получен!', `Скин ${reward.skinName} ($${reward.price.toFixed(2)}) добавлен в инвентарь!`);
    } else if (reward.type === 'perk_commission') {
      window.economyManager.MARKET_COMMISSION = reward.value;
      window.notify?.bigWin('Перк активирован!', reward.desc);
    } else if (reward.type === 'perk_loan') {
      window.economyManager.LOAN_INTEREST_RATE = reward.value;
      window.notify?.bigWin('Перк активирован!', reward.desc);
    }

    if (reward.type === 'ultimate') {
      window.economyManager.MARKET_COMMISSION = 0.0;
      window.economyManager.LOAN_INTEREST_RATE = 0.0;
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
      <div style="max-width: 1040px; margin: 0 auto;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, rgba(182, 0, 76, 0.25) 0%, rgba(89, 0, 0, 0.15) 100%); border: 1px solid rgba(255, 0, 77, 0.35); border-radius: 20px; padding: 28px; margin-bottom: 24px; position: relative; overflow: hidden;">
          <div style="position: absolute; right: 20px; top: 10px; font-size: 160px; opacity: 0.05; pointer-events: none;">👑</div>
          <span class="drop-badge-new" style="font-size: 11px; padding: 3px 8px; margin-bottom: 8px; display: inline-block;">СЕЗОН 1</span>
          <h1 style="font-size: 32px; font-weight: 900; color: #fff; margin-bottom: 6px;">SIMUP PASS</h1>
          <p style="font-size: 14px; color: var(--text-dim); max-width: 620px; line-height: 1.5;">
            Получайте опыт (XP) за каждую ставку в играх, открытие кейсов и выполнение квестов. Открывайте 30 уровней с ценными скинами, денежными бонусами и снижением комиссии биржи до 0%!
          </p>

          <!-- Current Level & Progress Bar -->
          <div style="margin-top: 24px; background: rgba(0,0,0,0.45); border-radius: 14px; padding: 16px 20px; border: 1px solid rgba(255,255,255,0.06);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <div style="font-size: 16px; font-weight: 900; color: #fff; display: flex; align-items: center; gap: 8px;">
                <span style="background: var(--accent-color); color: #000; padding: 2px 8px; border-radius: 6px; font-size: 13px;">LVL ${pass.level}</span>
                <span>Текущий прогресс</span>
              </div>
              <div style="font-size: 13px; font-weight: 800; color: #ff3366;">
                ${pass.xp} / ${nextXp} XP (${pct}%)
              </div>
            </div>

            <!-- Progress Track -->
            <div style="width: 100%; height: 10px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; position: relative;">
              <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, #b6004c, #ff004d); border-radius: 999px; transition: width 0.4s ease; box-shadow: 0 0 14px rgba(255,0,77,0.8);"></div>
            </div>
          </div>
        </div>

        <!-- Rewards Tier Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px;">
          ${this.REWARDS.map(r => {
            const isUnlocked = pass.level >= r.level;
            const isClaimed = pass.claimed.includes(r.level);
            return `
              <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid ${isUnlocked ? 'rgba(255, 0, 77, 0.4)' : 'rgba(255,255,255,0.06)'}; border-radius: 16px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
                ${isClaimed ? `
                  <div style="position: absolute; top: 10px; right: 10px; background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.4); font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">✓ ПОЛУЧЕНО</div>
                ` : isUnlocked ? `
                  <div style="position: absolute; top: 10px; right: 10px; background: rgba(255, 0, 77, 0.2); color: #ff3366; border: 1px solid rgba(255, 0, 77, 0.4); font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">ДОСТУПНО!</div>
                ` : `
                  <div style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.05); color: var(--text-dim); font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">🔒 УРОВЕНЬ ${r.level}</div>
                `}

                <div>
                  <div style="font-size: 36px; margin-bottom: 8px;">${r.icon}</div>
                  <div style="font-size: 14px; font-weight: 800; color: #fff; margin-bottom: 4px;">${r.title}</div>
                  <div style="font-size: 12px; color: var(--text-dim); min-height: 32px;">${r.desc || (r.skinName + ' ($' + r.price.toFixed(2) + ')')}</div>
                </div>

                <div style="margin-top: 14px;">
                  ${isClaimed ? `
                    <button disabled style="width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: var(--text-dim); font-size: 12px; font-weight: 700; padding: 8px; border-radius: 8px;">Получено</button>
                  ` : isUnlocked ? `
                    <button onclick="window.SimupPassController.claimReward(${r.level})" class="btn-sm-action" style="width: 100%; background: linear-gradient(135deg, #b6004c, #590000); color: #fff; border: 1px solid #ff004d; font-size: 12px; font-weight: 800; padding: 8px; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 14px rgba(255,0,77,0.3);">
                      ⚡ Забрать награду
                    </button>
                  ` : `
                    <button disabled style="width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); color: var(--text-dim); font-size: 12px; font-weight: 700; padding: 8px; border-radius: 8px;">
                      Нужен ${r.level} уровень
                    </button>
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

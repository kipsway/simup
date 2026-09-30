/* ==========================================================================
   SIMUP PASS - ULTIMATE BATTLE PASS & PROGRESSION SYSTEM (1000+ LEVELS)
   - 1,000 Levels with slow, balanced & deliberate economy progression
   - 12 Distinct Reward Categories:
     1. balance: Чистый кэш на баланс
     2. skin_cs2: Оружие CS2
     3. skin_knife: ★ Ножи и перчатки CS2
     4. skin_dota2: Immortal и Arcana Dota 2
     5. skin_rust: Тактические скины Rust
     6. title: Престижные титулы профиля
     7. perk_commission: Перманентное снижение биржевой комиссии
     8. perk_loan: Льготная процентная ставка в банке
     9. xp_booster: Пожизненный множитель Pass XP
     10. case_voucher: Бесплатные ваучеры на открытие кейсов
     11. insurance_upgrade: Страховка апгрейда (возврат 50% ставки)
     12. mystery_box: Секретные боксы с редчайшим лутом
   - Tier/Chapter Pagination (50 levels per tier) for 60fps smooth UI
   ========================================================================== */

class SimupPassController {
  constructor() {
    this.MAX_LEVEL = 1000;
    this.TIER_SIZE = 50;
    this.currentTier = 1; // Tier 1 = 1..50, Tier 2 = 51..100, etc.
    this.activeView = 'levels'; // 'levels' or 'quests'
    this.rewardsCache = null;

    this.TITLES_POOL = [
      'Новичок Пасса', 'Искатель Приключений', 'Охотник за Лутом', 'Ветеран SIMUP',
      'Стальной Гладиатор', 'Магнат Арены', 'Мастер Риска', 'Повелитель Колеса',
      'Коллекционер Редкостей', 'Неуязвимый', 'Кибернетический Барон', 'Снайпер Судьбы',
      'Гроссмейстер Апгрейда', 'Абсолютный Чемпион', 'Хранитель Олимпа', 'Бессмертный Титан',
      'Верховный Владыка', 'Творец Вселенной', 'Легенда Тысячелетия', 'Владыка Вечности'
    ];
  }

  // Slower, balanced exponential XP curve
  getXpForLevel(lvl) {
    const safeLvl = Math.max(1, Math.min(this.MAX_LEVEL, lvl));
    return Math.floor(1200 + (safeLvl * 250) + (Math.pow(safeLvl, 1.42) * 18));
  }

  // Generate 1,000 curated and balanced rewards
  getRewards() {
    if (this.rewardsCache) return this.rewardsCache;

    const list = [];
    for (let lvl = 1; lvl <= this.MAX_LEVEL; lvl++) {
      let r = null;

      if (lvl === 1000) {
        r = {
          level: 1000,
          type: 'skin_knife',
          title: 'ВЛАДЫКА ВЕЧНОСТИ (УРОВЕНЬ 1000)',
          skinName: '★ Нож-бабочка | Гамма-волны Изумруд',
          price: 28000.0,
          bonusCash: 50000.0,
          titleName: 'Владыка Вечности',
          desc: 'Титул «Владыка Вечности» + ★ Нож-бабочка Гамма Изумруд ($28,000) + $50,000 кэша + 0% комиссии навсегда!',
          icon: '👑'
        };
      } else if (lvl % 100 === 0) {
        // Every 100 levels: Legendary Knife / Gloves
        const tierIdx = lvl / 100;
        const knifeNames = [
          '★ Керамбит | Волны Рубин',
          '★ Штык-нож M9 | Кровавая паутина',
          '★ Скелетный нож | Градиент',
          '★ Нож-бабочка | Градиент',
          '★ Спортивные перчатки | Порок',
          '★ Водительские перчатки | Снежный барс',
          '★ Керамбит | Градиент',
          '★ Спортивные перчатки | Ящик Пандоры',
          '★ Штык-нож M9 | Волны Сапфир'
        ];
        const sName = knifeNames[(tierIdx - 1) % knifeNames.length];
        const val = 4500 + (lvl * 15);
        r = {
          level: lvl,
          type: 'skin_knife',
          title: `★ Легендарный Нож (LVL ${lvl})`,
          skinName: sName,
          price: val,
          desc: `${sName} ($${val.toLocaleString()})`,
          icon: '🗡️'
        };
      } else if (lvl % 50 === 0) {
        // Every 50 levels: Prestige Title + Big Cash Drop
        const tIdx = Math.floor(lvl / 50) - 1;
        const titleName = this.TITLES_POOL[tIdx % this.TITLES_POOL.length];
        const cash = 2500 + (lvl * 15);
        r = {
          level: lvl,
          type: 'title',
          title: `Титул: «${titleName}»`,
          titleName,
          value: cash,
          desc: `Титул «${titleName}» + $${cash.toLocaleString()} на баланс`,
          icon: '🎖️'
        };
      } else if (lvl % 25 === 0) {
        // Every 25 levels: Mystery Box
        r = {
          level: lvl,
          type: 'mystery_box',
          title: '🎁 Секретный бокс Пасса',
          desc: 'Случайный ценный дроп: редкий скин или крупная денежная выплата',
          icon: '🎁'
        };
      } else if (lvl % 20 === 0) {
        // Every 20 levels: Market fee reduction
        const commPct = Math.max(0.5, +(8.0 - (lvl * 0.0075)).toFixed(1));
        r = {
          level: lvl,
          type: 'perk_commission',
          title: '📉 Снижение комиссии биржи',
          value: commPct / 100,
          desc: `Комиссия на бирже навсегда снижена до ${commPct}%`,
          icon: '📉'
        };
      } else if (lvl % 16 === 0) {
        // Every 16 levels: Bank Loan interest reduction
        const ratePct = Math.max(0.0, +(10.0 - (lvl * 0.01)).toFixed(1));
        r = {
          level: lvl,
          type: 'perk_loan',
          title: '🏦 Льготная ставка кредита',
          value: ratePct / 100,
          desc: `Ставка кредита в банке снижена до ${ratePct}%`,
          icon: '🏦'
        };
      } else if (lvl % 12 === 0) {
        // Case Voucher
        r = {
          level: lvl,
          type: 'case_voucher',
          title: '📦 Ваучер Бесплатного Кейса',
          desc: '1 бесплатное открытие любого стандартного кейса на сайте',
          icon: '📦'
        };
      } else if (lvl % 10 === 0) {
        // Upgrade Insurance
        r = {
          level: lvl,
          type: 'insurance_upgrade',
          title: '🛡️ Страховка Апгрейда',
          desc: 'Возврат 50% стоимости предметов при неудачной попытке апгрейда',
          icon: '🛡️'
        };
      } else if (lvl % 8 === 0) {
        // XP Booster
        r = {
          level: lvl,
          type: 'xp_booster',
          title: '⚡ Pass XP Бустер',
          value: 0.05,
          desc: '+5% к получаемому Pass XP от всех игровых действий навсегда',
          icon: '⚡'
        };
      } else if (lvl % 6 === 0) {
        // Rust skin
        const rustItems = [
          { name: 'Toxic Double Sheet Metal Door', basePrice: 150 },
          { name: 'Retrowave Hunting Bow', basePrice: 165 },
          { name: 'Dragon AK-47', basePrice: 450 },
          { name: 'Blackout AK47', basePrice: 620 },
          { name: 'Tempered MP5', basePrice: 850 },
          { name: 'Frostbite Metal Facemask', basePrice: 1250 },
          { name: 'Glory SAR', basePrice: 2200 }
        ];
        const it = rustItems[lvl % rustItems.length];
        const price = Math.round(it.basePrice + (lvl * 3.5));
        r = {
          level: lvl,
          type: 'skin_rust',
          title: '☢️ Предмет Rust',
          skinName: it.name,
          price,
          desc: `${it.name} ($${price.toLocaleString()})`,
          icon: '🚪'
        };
      } else if (lvl % 4 === 0) {
        // Dota 2 skin
        const dotaItems = [
          { name: 'Belt of the Iron Surge', basePrice: 35 },
          { name: 'Muh Keen Gun', basePrice: 85 },
          { name: 'Arms of Desolation', basePrice: 250 },
          { name: 'Soul Diffuser', basePrice: 350 },
          { name: 'Vigil Triumph', basePrice: 1500 },
          { name: 'Kantusa the Script Sword', basePrice: 3500 },
          { name: 'Feast of Abscession', basePrice: 1200 }
        ];
        const it = dotaItems[lvl % dotaItems.length];
        const price = Math.round(it.basePrice + (lvl * 3));
        r = {
          level: lvl,
          type: 'skin_dota2',
          title: '🛡️ Immortal / Arcana Dota 2',
          skinName: it.name,
          price,
          desc: `${it.name} ($${price.toLocaleString()})`,
          icon: '⚔️'
        };
      } else if (lvl % 2 === 0) {
        // CS2 Weapon
        const csItems = [
          { name: 'USP-S | Ticket to Hell', basePrice: 20 },
          { name: 'M4A1-S | Night Terror', basePrice: 120 },
          { name: 'AK-47 | Slate', basePrice: 180 },
          { name: 'AWP | Neo-Noir', basePrice: 550 },
          { name: 'Desert Eagle | Printstream', basePrice: 1850 },
          { name: 'M4A4 | The Emperor', basePrice: 950 },
          { name: 'AK-47 | Bloodsport', basePrice: 2800 }
        ];
        const it = csItems[lvl % csItems.length];
        const price = Math.round(it.basePrice + (lvl * 2.5));
        r = {
          level: lvl,
          type: 'skin_cs2',
          title: '🔫 Оружие CS2',
          skinName: it.name,
          price,
          desc: `${it.name} ($${price.toLocaleString()})`,
          icon: '🔫'
        };
      } else {
        // Cash Reward (balanced slow progression)
        const cashVal = Math.round(80 + (lvl * 12) + (Math.pow(lvl, 1.15) * 2));
        r = {
          level: lvl,
          type: 'balance',
          title: '💵 Денежный бонус',
          value: cashVal,
          desc: `+$${cashVal.toLocaleString()} на баланс`,
          icon: '💵'
        };
      }

      list.push(r);
    }

    this.rewardsCache = list;
    return list;
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

    // Apply XP booster if unlocked
    const boosterMultiplier = 1.0 + (user.passXpBooster || 0);
    const finalXp = Math.max(1, Math.round(amount * boosterMultiplier));
    pass.xp = (pass.xp || 0) + finalXp;

    let leveledUp = false;
    while (pass.xp >= this.getXpForLevel(pass.level) && pass.level < this.MAX_LEVEL) {
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
    if (!user) {
      window.notify?.warning('Авторизация', 'Войдите в аккаунт, чтобы забирать награды.');
      return;
    }
    const pass = this.getUserPassData();
    if (pass.level < lvl) {
      window.notify?.warning('Уровень недостигнут', `Требуется Уровень ${lvl}. Ваш текущий уровень: ${pass.level}`);
      return;
    }
    if (pass.claimed.includes(lvl)) {
      window.notify?.info('Уже получено', 'Вы уже забрали награду за этот уровень.');
      return;
    }

    const allRewards = this.getRewards();
    const reward = allRewards.find(r => r.level === lvl);
    if (!reward) return;

    pass.claimed.push(lvl);

    if (reward.type === 'balance') {
      user.balance = Number((user.balance + reward.value).toFixed(2));
      window.notify?.bigWin('Награда получена!', `Зачислено +$${reward.value.toLocaleString()} на баланс!`);
    } else if (reward.type === 'skin_cs2' || reward.type === 'skin_knife' || reward.type === 'skin_dota2' || reward.type === 'skin_rust') {
      const allSkins = window.catalogController?.skins || window.SKINS_DATABASE || [];
      const match = allSkins.find(s => s.name && s.name.toLowerCase().includes(reward.skinName.toLowerCase())) || {
        id: `pass_skin_${lvl}`,
        name: reward.skinName,
        price: reward.price,
        rarity: reward.type === 'skin_knife' ? 'contraband' : 'covert',
        category: reward.type === 'skin_knife' ? 'knife' : 'weapon',
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

      window.notify?.bigWin('Скин получен!', `Скин «${reward.skinName}» ($${reward.price.toLocaleString()}) добавлен в ваш инвентарь!`);
    } else if (reward.type === 'title') {
      if (!user.unlockedTitles) user.unlockedTitles = ['Новичок'];
      if (!user.unlockedTitles.includes(reward.titleName)) {
        user.unlockedTitles.push(reward.titleName);
      }
      if (reward.value) {
        user.balance = Number((user.balance + reward.value).toFixed(2));
      }
      window.notify?.bigWin('Титул открыт! 🎖️', `Вы открыли титул «${reward.titleName}» и получили +$${reward.value.toLocaleString()}!`);
    } else if (reward.type === 'perk_commission') {
      if (window.economyManager) window.economyManager.MARKET_COMMISSION = reward.value;
      window.notify?.bigWin('Перк активирован!', reward.desc);
    } else if (reward.type === 'perk_loan') {
      if (window.economyManager) window.economyManager.LOAN_INTEREST_RATE = reward.value;
      window.notify?.bigWin('Перк активирован!', reward.desc);
    } else if (reward.type === 'xp_booster') {
      user.passXpBooster = +( (user.passXpBooster || 0) + (reward.value || 0.05) ).toFixed(2);
      const totalBonus = Math.round(user.passXpBooster * 100);
      window.notify?.bigWin('Бустер опыта активирован!', `Бонус к начислению Pass XP теперь составляет +${totalBonus}%!`);
    } else if (reward.type === 'case_voucher') {
      user.caseVouchers = (user.caseVouchers || 0) + 1;
      window.notify?.bigWin('Ваучер на кейс! 📦', `Получен бесплатный ваучер на открытие кейса! Всего ваучеров: ${user.caseVouchers}`);
    } else if (reward.type === 'insurance_upgrade') {
      user.upgradeInsurance = (user.upgradeInsurance || 0) + 1;
      window.notify?.bigWin('Страховка получена! 🛡️', `Получена 50% страховка апгрейда! Всего страховок: ${user.upgradeInsurance}`);
    } else if (reward.type === 'mystery_box') {
      // 50% chance cash, 50% chance high tier item
      const isCash = Math.random() < 0.5;
      if (isCash) {
        const bonus = Math.round(500 + (lvl * 18));
        user.balance = Number((user.balance + bonus).toFixed(2));
        window.notify?.bigWin('Секретный бокс открыт! 🎁', `Вам выпал крупный денежный куш: +$${bonus.toLocaleString()}!`);
      } else {
        const allSkins = window.catalogController?.skins || window.SKINS_DATABASE || [];
        const highTier = allSkins.filter(s => s.price >= 300 && s.price <= 3500);
        const skin = highTier[Math.floor(Math.random() * highTier.length)] || allSkins[0];
        const copy = {
          ...skin,
          instanceId: `pass_mystery_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          obtainedDate: Date.now()
        };
        if (!user.inventory) user.inventory = [];
        user.inventory.push(copy);
        window.notify?.bigWin('Секретный бокс открыт! 🎁', `Вам выпал редкий скин: «${skin.name}» ($${skin.price.toLocaleString()})!`);
      }
    }

    if (lvl === 1000 && window.economyManager) {
      window.economyManager.MARKET_COMMISSION = 0.0;
      window.economyManager.LOAN_INTEREST_RATE = 0.0;
    }

    window.authManager.saveCurrentUser();
    window.updateHeaderUserUI?.(user);
    this.render();
  }

  jumpToMyLevel() {
    const pass = this.getUserPassData();
    const myTier = Math.min(20, Math.max(1, Math.ceil(pass.level / this.TIER_SIZE)));
    this.currentTier = myTier;
    this.render();
  }

  setTier(tierNum) {
    const maxTiers = Math.ceil(this.MAX_LEVEL / this.TIER_SIZE);
    this.currentTier = Math.min(maxTiers, Math.max(1, tierNum));
    this.render();
  }

  render() {
    const container = document.getElementById('pass-content-area');
    if (!container) return;

    const pass = this.getUserPassData();
    const nextXp = this.getXpForLevel(pass.level);
    const pct = Math.min(100, Math.round((pass.xp / nextXp) * 100));
    const maxTiers = Math.ceil(this.MAX_LEVEL / this.TIER_SIZE);

    container.innerHTML = `
      <div style="max-width: 1080px; margin: 0 auto;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, rgba(182, 0, 76, 0.28) 0%, rgba(89, 0, 0, 0.15) 100%); border: 1px solid rgba(255, 0, 77, 0.35); border-radius: 20px; padding: 28px; margin-bottom: 24px; position: relative; overflow: hidden;">
          <div style="position: absolute; right: 20px; top: 10px; font-size: 160px; opacity: 0.05; pointer-events: none;">👑</div>
          <span class="drop-badge-new" style="font-size: 11px; padding: 3px 8px; margin-bottom: 8px; display: inline-block;">СЕЗОН 1: 1000 УРОВНЕЙ ПРЕСТИЖА</span>
          <h1 style="font-size: 32px; font-weight: 900; color: #fff; margin-bottom: 6px;">SIMUP PASS (1000 УРОВНЕЙ)</h1>
          <p style="font-size: 14px; color: var(--text-dim); max-width: 720px; line-height: 1.5;">
            Грандиозная система прогрессии из 1,000 уровней с 12 разновидностями наград: кэш, ножи и оружие CS2, арканы Dota 2, раритеты Rust, снижения биржевой комиссии до 0%, пожизненные XP бустеры, ваучеры на кейсы и страховки апгрейдов!
          </p>

          <!-- Current Level & Progress Bar -->
          <div style="margin-top: 24px; background: rgba(0,0,0,0.5); border-radius: 14px; padding: 18px 22px; border: 1px solid rgba(255,255,255,0.08);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
              <div style="font-size: 16px; font-weight: 900; color: #fff; display: flex; align-items: center; gap: 10px;">
                <span style="background: linear-gradient(135deg, #ff004d, #b6004c); color: #fff; padding: 4px 12px; border-radius: 6px; font-size: 14px; font-weight: 900; box-shadow: 0 0 10px rgba(255,0,77,0.5);">LVL ${pass.level} / ${this.MAX_LEVEL}</span>
                <span>Прогресс до Уровня ${pass.level < this.MAX_LEVEL ? pass.level + 1 : 'MAX'}</span>
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
            👑 Награды Пасса (1 — 1000)
          </button>
          <button class="game-pill-btn ${this.activeView === 'quests' ? 'active' : ''}" id="btn-pass-view-quests" style="flex: 1; padding: 12px; font-weight: 800; font-size: 13.5px;">
            🎯 Квесты для Пасса (XP Буст)
          </button>
        </div>

        ${this.activeView === 'levels' ? `
          <!-- Tier Pagination Controls -->
          <div style="background: rgba(14, 8, 14, 0.85); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 14px 18px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <button id="btn-pass-prev-tier" class="btn-sm-action" style="padding: 7px 14px; font-size: 12px; font-weight: 800; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #fff; border-radius: 8px; cursor: pointer;" ${this.currentTier <= 1 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}>
                ← Пред. глава
              </button>
              <button id="btn-pass-next-tier" class="btn-sm-action" style="padding: 7px 14px; font-size: 12px; font-weight: 800; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #fff; border-radius: 8px; cursor: pointer;" ${this.currentTier >= maxTiers ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}>
                След. глава →
              </button>
              <button id="btn-pass-my-tier" class="btn-sm-action" style="padding: 7px 14px; font-size: 12px; font-weight: 800; background: linear-gradient(135deg, #b6004c, #ff004d); border: 1px solid #ff004d; color: #fff; border-radius: 8px; cursor: pointer;">
                🎯 К моему уровню (LVL ${pass.level})
              </button>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 13px; color: var(--text-dim); font-weight: 700;">Глава ${this.currentTier} из ${maxTiers}:</span>
              <select id="select-pass-tier" style="background: #140d18; border: 1px solid rgba(255,0,77,0.4); color: #fff; padding: 6px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer;">
                ${Array.from({ length: maxTiers }, (_, i) => {
                  const t = i + 1;
                  const startLvl = (t - 1) * this.TIER_SIZE + 1;
                  const endLvl = Math.min(this.MAX_LEVEL, t * this.TIER_SIZE);
                  return `<option value="${t}" ${t === this.currentTier ? 'selected' : ''}>Глава ${t} (Уровни ${startLvl} — ${endLvl})</option>`;
                }).join('')}
              </select>
            </div>
          </div>
        ` : ''}

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

    document.getElementById('btn-pass-prev-tier')?.addEventListener('click', () => {
      if (this.currentTier > 1) {
        this.currentTier -= 1;
        this.render();
      }
    });
    document.getElementById('btn-pass-next-tier')?.addEventListener('click', () => {
      if (this.currentTier < maxTiers) {
        this.currentTier += 1;
        this.render();
      }
    });
    document.getElementById('btn-pass-my-tier')?.addEventListener('click', () => {
      this.jumpToMyLevel();
    });
    document.getElementById('select-pass-tier')?.addEventListener('change', (e) => {
      this.setTier(parseInt(e.target.value, 10));
    });
  }

  renderLevelsView(pass) {
    const allRewards = this.getRewards();
    const startIdx = (this.currentTier - 1) * this.TIER_SIZE;
    const endIdx = Math.min(this.MAX_LEVEL, this.currentTier * this.TIER_SIZE);
    const tierRewards = allRewards.slice(startIdx, endIdx);

    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(235px, 1fr)); gap: 14px;">
        ${tierRewards.map(r => {
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
                <div style="font-size: 11.5px; color: var(--text-dim); min-height: 32px; line-height: 1.4;">${r.desc}</div>
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

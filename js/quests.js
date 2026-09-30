/* ==========================================================================
   SIMUP - DAILY QUESTS & BATTLE PASS MANAGER
   Handles 24h rolling challenges, XP milestones, reward claiming and bonus chests.
   ========================================================================== */

class QuestsManager {
  constructor() {
    this.storageKeyPrefix = 'simup_quests_';
    this.listeners = [];
  }

  getTodayDateString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  getCurrentUserQuests() {
    const user = window.authManager?.currentUser;
    if (!user) return null;

    const todayStr = this.getTodayDateString();
    const stored = localStorage.getItem(`${this.storageKeyPrefix}${user.id}`);
    let data = null;

    if (stored) {
      try {
        data = JSON.parse(stored);
      } catch (e) {
        data = null;
      }
    }

    // Check if new day or no data
    let passQuests = data?.passQuests;
    if (!passQuests) {
      passQuests = [
        {
          id: 'pq_upgrades_50',
          title: 'Марафонец Апгрейда',
          desc: 'Выиграйте 50 раундов в Апгрейдере скинов',
          icon: '🏆',
          target: 50,
          progress: 0,
          rewardCash: 350,
          rewardPassXp: 3000,
          claimed: false
        },
        {
          id: 'pq_win_high_mult',
          title: 'Экстремальный куш',
          desc: 'Выиграйте 3 апгрейда с множителем от 5.00x',
          icon: '⚡',
          target: 3,
          progress: 0,
          rewardCash: 400,
          rewardPassXp: 3500,
          claimed: false
        },
        {
          id: 'pq_upgrade_battle',
          title: 'Гладиатор Арены 1v1',
          desc: 'Сыграйте 5 дуэлей в Апгрейд-Батле или Кейс-Батле',
          icon: '⚔️',
          target: 5,
          progress: 0,
          rewardCash: 450,
          rewardPassXp: 3500,
          claimed: false
        },
        {
          id: 'pq_open_cases_20',
          title: 'Кейс-магнат',
          desc: 'Откройте 20 кейсов любого типа',
          icon: '📦',
          target: 20,
          progress: 0,
          rewardCash: 300,
          rewardPassXp: 2500,
          claimed: false
        },
        {
          id: 'pq_multigame_skins',
          title: 'Вселенные Dota 2 & Rust',
          desc: 'Совершите 5 апгрейдов со скинами Dota 2 или Rust',
          icon: '🎮',
          target: 5,
          progress: 0,
          rewardCash: 300,
          rewardPassXp: 2800,
          claimed: false
        },
        {
          id: 'pq_total_wager_2k',
          title: 'Оборот Хайроллера',
          desc: 'Сделайте суммарный оборот ставок на $2,000',
          icon: '💎',
          target: 2000,
          progress: 0,
          rewardCash: 600,
          rewardPassXp: 4500,
          claimed: false
        },
        {
          id: 'pq_win_90_pct',
          title: 'Тактический расчёт',
          desc: 'Одержите 10 побед с безопасным шансом 80-90%',
          icon: '🎯',
          target: 10,
          progress: 0,
          rewardCash: 250,
          rewardPassXp: 2200,
          claimed: false
        },
        {
          id: 'pq_contracts',
          title: 'Оружейный Алхимик',
          desc: 'Подпишите 3 Trade-Up Контракта обмена',
          icon: '📜',
          target: 3,
          progress: 0,
          rewardCash: 350,
          rewardPassXp: 3000,
          claimed: false
        }
      ];
    }

    if (!data || data.date !== todayStr) {
      data = {
        date: todayStr,
        claimedBonus: false,
        passQuests: passQuests,
        quests: [
          {
            id: 'upgrade_wins',
            title: 'Апгрейд-мастер',
            desc: 'Выиграйте 3 раунда в Апгрейдере',
            icon: '🎯',
            target: 3,
            progress: 0,
            rewardCash: 100,
            rewardXp: 200,
            claimed: false
          },
          {
            id: 'open_cases',
            title: 'Король кейсов',
            desc: 'Откройте 3 любых кейса',
            icon: '📦',
            target: 3,
            progress: 0,
            rewardCash: 120,
            rewardXp: 250,
            claimed: false
          },
          {
            id: 'multi_upgrade',
            title: 'Мульти-апгрейд',
            desc: 'Сделайте апгрейд, пожертвовав 2 или более скинов за раз',
            icon: '⚡',
            target: 1,
            progress: 0,
            rewardCash: 150,
            rewardXp: 300,
            claimed: false
          },
          {
            id: 'case_battle_win',
            title: 'Дуэлянт 1v1',
            desc: 'Одержите победу в Кейс-батле или Апгрейд-батле',
            icon: '⚔️',
            target: 1,
            progress: 0,
            rewardCash: 200,
            rewardXp: 350,
            claimed: false
          },
          {
            id: 'coinflip_wins',
            title: 'Повелитель монеты',
            desc: 'Выиграйте 2 дуэли в Коинфлипе',
            icon: '🪙',
            target: 2,
            progress: 0,
            rewardCash: 130,
            rewardXp: 250,
            claimed: false
          },
          {
            id: 'mines_clear',
            title: 'Опытный сапёр',
            desc: 'Заберите выигрыш в Минах с множителем от 2.00x',
            icon: '💣',
            target: 1,
            progress: 0,
            rewardCash: 125,
            rewardXp: 250,
            claimed: false
          },
          {
            id: 'crash_cashout',
            title: 'Космический пилот',
            desc: 'Заберите выигрыш в Краше с множителем от 3.00x',
            icon: '🚀',
            target: 1,
            progress: 0,
            rewardCash: 140,
            rewardXp: 280,
            claimed: false
          },
          {
            id: 'random_upgrade_spin',
            title: 'Азартный рандом',
            desc: 'Сыграйте апгрейд через кнопку «🎲 Рандом x»',
            icon: '🎲',
            target: 1,
            progress: 0,
            rewardCash: 90,
            rewardXp: 180,
            claimed: false
          },
          {
            id: 'sign_contract',
            title: 'Магистр крафта',
            desc: 'Подпишите 1 Трейд-ап контракт обмена 10 скинов',
            icon: '📜',
            target: 1,
            progress: 0,
            rewardCash: 160,
            rewardXp: 320,
            claimed: false
          },
          {
            id: 'bank_action',
            title: 'Финансист',
            desc: 'Воспользуйтесь услугами Банка SIMUP (заём или погашение)',
            icon: '🏦',
            target: 1,
            progress: 0,
            rewardCash: 100,
            rewardXp: 200,
            claimed: false
          }
        ]
      };
      this.saveUserQuests(user.id, data);
    } else if (!data.passQuests) {
      data.passQuests = passQuests;
      this.saveUserQuests(user.id, data);
    }

    return data;
  }

  saveUserQuests(userId, data) {
    if (!userId || !data) return;
    localStorage.setItem(`${this.storageKeyPrefix}${userId}`, JSON.stringify(data));
    this.notifyListeners();
  }

  subscribe(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  }

  notifyListeners() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (e) { console.error(e); }
    });
  }

  // Get seasonal Pass Quests
  getPassQuests() {
    const data = this.getCurrentUserQuests();
    return data?.passQuests || [];
  }

  // Claim Seasonal Pass Quest
  claimPassQuest(questId) {
    const user = window.authManager?.currentUser;
    if (!user) return { success: false, error: 'Авторизуйтесь для получения наград.' };

    const data = this.getCurrentUserQuests();
    if (!data || !data.passQuests) return { success: false, error: 'Данные недоступны.' };

    const quest = data.passQuests.find(q => q.id === questId);
    if (!quest) return { success: false, error: 'Задание не найдено.' };
    if (quest.progress < quest.target) return { success: false, error: 'Задание еще не завершено!' };
    if (quest.claimed) return { success: false, error: 'Награда уже получена.' };

    quest.claimed = true;
    user.balance = Number((user.balance + quest.rewardCash).toFixed(2));

    if (window.SimupPassController?.addXp) {
      window.SimupPassController.addXp(quest.rewardPassXp);
    }

    this.saveUserQuests(user.id, data);
    window.authManager.saveCurrentUser();
    window.updateHeaderUserUI?.(user);

    window.SoundManager?.playJackpot?.() || window.SoundManager?.playWin?.();
    if (window.confettiEffect) {
      window.confettiEffect();
    }

    window.notify?.bigWin('Квест Пасса выполнен! 🎁', `+${quest.rewardPassXp.toLocaleString()} Pass XP и +$${quest.rewardCash} зачислено на баланс!`);
    window.SimupPassController?.render?.();

    return {
      success: true,
      rewardCash: quest.rewardCash,
      rewardPassXp: quest.rewardPassXp
    };
  }

  // Record action for pass quest specifically
  recordPassAction(questId, amount = 1) {
    const user = window.authManager?.currentUser;
    if (!user) return;

    const data = this.getCurrentUserQuests();
    if (!data || !data.passQuests) return;

    const pq = data.passQuests.find(q => q.id === questId);
    if (!pq || pq.claimed) return;

    const prev = pq.progress;
    pq.progress = Math.min(pq.target, pq.progress + amount);

    if (pq.progress >= pq.target && prev < pq.target) {
      window.notify?.bigWin(
        `Квест Пасса завершён! 🎯 ${pq.icon}`,
        `"${pq.title}" выполнен! Заберите награду в SIMUP PASS (+${pq.rewardPassXp.toLocaleString()} Pass XP)!`
      );
    }

    this.saveUserQuests(user.id, data);
  }

  // Event Triggers
  recordAction(questId, amount = 1) {
    const user = window.authManager?.currentUser;
    if (!user) return;

    const data = this.getCurrentUserQuests();
    if (!data) return;

    let changed = false;

    const quest = data.quests.find(q => q.id === questId);
    if (quest && !quest.claimed) {
      const prevProgress = quest.progress;
      quest.progress = Math.min(quest.target, quest.progress + amount);

      if (quest.progress >= quest.target && prevProgress < quest.target) {
        window.notify?.info(
          `Задание выполнено! ${quest.icon}`,
          `"${quest.title}" готово! Заберите награду: +$${quest.rewardCash} и +${quest.rewardXp} XP`
        );
      }
      changed = true;
    }

    // Auto-update matching Pass Quests
    if (data.passQuests) {
      if (questId === 'upgrade_wins') {
        const u50 = data.passQuests.find(q => q.id === 'pq_upgrades_50');
        if (u50 && !u50.claimed) {
          u50.progress = Math.min(u50.target, u50.progress + amount);
          changed = true;
        }
      } else if (questId === 'open_cases') {
        const c20 = data.passQuests.find(q => q.id === 'pq_open_cases_20');
        if (c20 && !c20.claimed) {
          c20.progress = Math.min(c20.target, c20.progress + amount);
          changed = true;
        }
      } else if (questId === 'sign_contract') {
        const pqc = data.passQuests.find(q => q.id === 'pq_contracts');
        if (pqc && !pqc.claimed) {
          pqc.progress = Math.min(pqc.target, pqc.progress + amount);
          changed = true;
        }
      } else if (questId === 'case_battle_win' || questId === 'upgrade_battle_complete') {
        const pqb = data.passQuests.find(q => q.id === 'pq_upgrade_battle');
        if (pqb && !pqb.claimed) {
          pqb.progress = Math.min(pqb.target, pqb.progress + amount);
          changed = true;
        }
      }
    }

    if (changed) {
      this.saveUserQuests(user.id, data);
    }
  }

  claimQuest(questId) {
    const user = window.authManager?.currentUser;
    if (!user) return { success: false, error: 'Авторизуйтесь для получения наград.' };

    const data = this.getCurrentUserQuests();
    if (!data) return { success: false, error: 'Данные недоступны.' };

    const quest = data.quests.find(q => q.id === questId);
    if (!quest) return { success: false, error: 'Задание не найдено.' };
    if (quest.progress < quest.target) return { success: false, error: 'Задание еще не завершено!' };
    if (quest.claimed) return { success: false, error: 'Награда уже получена.' };

    quest.claimed = true;
    user.balance = Number((user.balance + quest.rewardCash).toFixed(2));
    user.stats.wagered = Number(((user.stats.wagered || 0) + quest.rewardXp).toFixed(2));

    if (window.SimupPassController?.addXp) {
      window.SimupPassController.addXp(quest.rewardXp);
    }

    this.saveUserQuests(user.id, data);
    window.authManager.saveCurrentUser();
    window.updateHeaderUserUI?.(user);

    window.SoundManager?.playWin();
    if (window.confettiEffect) {
      window.confettiEffect();
    }

    return {
      success: true,
      rewardCash: quest.rewardCash,
      rewardXp: quest.rewardXp
    };
  }

  claimBonusChest() {
    const user = window.authManager?.currentUser;
    if (!user) return { success: false, error: 'Авторизуйтесь для получения бонуса.' };

    const data = this.getCurrentUserQuests();
    if (!data) return { success: false, error: 'Данные недоступны.' };

    const allCompleted = data.quests.every(q => q.claimed || q.progress >= q.target);
    if (!allCompleted) {
      return { success: false, error: 'Сначала выполните все ежедневные задания!' };
    }
    if (data.claimedBonus) {
      return { success: false, error: 'Сундук Чемпиона за сегодня уже забран!' };
    }

    data.claimedBonus = true;
    const bonusCash = 500;
    const bonusXp = 500;
    user.balance = Number((user.balance + bonusCash).toFixed(2));
    user.stats.wagered = Number(((user.stats.wagered || 0) + bonusXp).toFixed(2));

    if (window.SimupPassController?.addXp) {
      window.SimupPassController.addXp(bonusXp);
    }

    // Grant bonus covert skin
    const allSkins = window.catalogController?.skins || [];
    const pool = allSkins.filter(s => s.rarity === 'covert' || s.price >= 80);
    const bonusSkin = pool.length > 0
      ? pool[Math.floor(Math.random() * pool.length)]
      : allSkins[0];

    if (bonusSkin) {
      const cloned = {
        ...bonusSkin,
        instanceId: `quest_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        obtainedDate: Date.now()
      };
      if (!user.inventory) user.inventory = [];
      user.inventory.push(cloned);
    }

    this.saveUserQuests(user.id, data);
    window.authManager.saveCurrentUser();

    window.SoundManager?.playJackpot();
    if (window.confettiEffect) {
      window.confettiEffect();
    }

    return {
      success: true,
      bonusCash,
      bonusXp,
      bonusSkin
    };
  }

  getUnclaimedCount() {
    const data = this.getCurrentUserQuests();
    if (!data) return 0;
    let count = 0;
    data.quests.forEach(q => {
      if (q.progress >= q.target && !q.claimed) count++;
    });
    if (!data.claimedBonus && data.quests.every(q => q.progress >= q.target)) {
      count++;
    }
    return count;
  }
}

window.questsManager = new QuestsManager();

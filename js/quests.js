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
    if (!data || data.date !== todayStr) {
      data = {
        date: todayStr,
        claimedBonus: false,
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
            desc: 'Одержите победу в Кейс-батле против бота или друга',
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

  // Event Triggers
  recordAction(questId, amount = 1) {
    const user = window.authManager?.currentUser;
    if (!user) return;

    const data = this.getCurrentUserQuests();
    if (!data) return;

    const quest = data.quests.find(q => q.id === questId);
    if (!quest || quest.claimed) return;

    const prevProgress = quest.progress;
    quest.progress = Math.min(quest.target, quest.progress + amount);

    if (quest.progress >= quest.target && prevProgress < quest.target) {
      window.notify?.info(
        `Задание выполнено! ${quest.icon}`,
        `"${quest.title}" готово! Заберите награду: +$${quest.rewardCash} и +${quest.rewardXp} XP`
      );
    }

    this.saveUserQuests(user.id, data);
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

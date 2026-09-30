/* ==========================================================================
   SIMUP - ECONOMY, BANK & INVENTORY CONTROLLER (BLOCK 2)
   Manages free faucet deposits ($10 - $100k), credit loans, daily streaks,
   achievements with cash rewards, and item sales.
   ========================================================================== */

class EconomyManager {
  constructor() {
    this.LOAN_INTEREST_RATE = 0.10; // 10% loan commission fee

    this.DAILY_STREAK_REWARDS = [
      { day: 1, reward: 25.00, title: 'День 1' },
      { day: 2, reward: 50.00, title: 'День 2' },
      { day: 3, reward: 85.00, title: 'День 3' },
      { day: 4, reward: 130.00, title: 'День 4' },
      { day: 5, reward: 200.00, title: 'День 5' },
      { day: 6, reward: 320.00, title: 'День 6' },
      { day: 7, reward: 500.00, title: 'День 7 (ДЖЕКПОТ!)', specialGift: true }
    ];

    this.ACHIEVEMENTS_CONFIG = [
      {
        id: 'first_upgrade',
        title: 'Первые шаги',
        desc: 'Совершите свой первый апгрейд в симуляторе',
        icon: '🎯',
        reward: 50.00,
        check: (user) => (user.stats?.totalUpgrades || 0) >= 1,
        progress: (user) => Math.min(1, (user.stats?.totalUpgrades || 0) / 1)
      },
      {
        id: 'sniper_win',
        title: 'Снайпер фортуны',
        desc: 'Выиграйте апгрейд с шансом победы менее 5%',
        icon: '🎲',
        reward: 250.00,
        check: (user) => (user.stats?.bestWinMultiplier || 0) >= 20,
        progress: (user) => Math.min(1, (user.stats?.bestWinMultiplier || 0) / 20)
      },
      {
        id: 'high_roller',
        title: 'Хайроллер',
        desc: 'Сделайте ставку на сумму от $1,000.00',
        icon: '💎',
        reward: 500.00,
        check: (user) => (user.stats?.maxSingleBet || 0) >= 1000,
        progress: (user) => Math.min(1, (user.stats?.maxSingleBet || 0) / 1000)
      },
      {
        id: 'collector',
        title: 'Коллекционер скинов',
        desc: 'Соберите 10 или более предметов в своем инвентаре',
        icon: '🎒',
        reward: 300.00,
        check: (user) => (user.inventory?.length || 0) >= 10,
        progress: (user) => Math.min(1, (user.inventory?.length || 0) / 10)
      },
      {
        id: 'take_loan',
        title: 'Кредитный заёмщик',
        desc: 'Возьмите виртуальный кредит в Банке SIMUP',
        icon: '🏦',
        reward: 100.00,
        check: (user) => (user.loans?.totalBorrowed || 0) > 0,
        progress: (user) => (user.loans?.totalBorrowed || 0) > 0 ? 1 : 0
      },
      {
        id: 'credit_baron',
        title: 'Кредитный барон',
        desc: 'Полностью погасите свой кредит в Банке SIMUP',
        icon: '🤝',
        reward: 150.00,
        check: (user) => (user.loans?.totalRepaid || 0) > 0 && (user.loans?.currentDebt || 0) === 0,
        progress: (user) => ((user.loans?.totalRepaid || 0) > 0 && (user.loans?.currentDebt || 0) === 0) ? 1 : 0
      },
      {
        id: 'crash_astronaut',
        title: 'Покоритель космоса',
        desc: 'Заберите выигрыш в Краше с множителем от 3.00x',
        icon: '🚀',
        reward: 200.00,
        check: (user) => (user.history || []).some(h => h.type === 'crash' && h.isWin && (h.multiplier || 0) >= 3.0),
        progress: (user) => (user.history || []).some(h => h.type === 'crash' && h.isWin && (h.multiplier || 0) >= 3.0) ? 1 : 0
      },
      {
        id: 'coinflip_duel',
        title: 'Король дуэлей',
        desc: 'Выиграйте дуэль 1-на-1 в Coinflip',
        icon: '🪙',
        reward: 150.00,
        check: (user) => (user.history || []).some(h => h.type === 'coinflip' && h.isWin),
        progress: (user) => (user.history || []).some(h => h.type === 'coinflip' && h.isWin) ? 1 : 0
      }
    ];
  }

  // =========================================================================
  // 1. BANK LOAN SYSTEM (FAUCETS REMOVED)
  // =========================================================================
  getMaxLoanLimit(user) {
    return Infinity; // Unlimited loans as requested
  }

  takeLoan(amount) {
    const user = window.authManager.currentUser;
    if (!user) return { success: false, error: 'Авторизуйтесь в системе.' };

    const val = parseFloat(amount);
    if (isNaN(val) || val < 10) {
      return { success: false, error: 'Минимальная сумма кредита — $10.00.' };
    }
    if (val > 100000) {
      return { success: false, error: 'Максимальная сумма кредита за один раз — $100,000.00.' };
    }

    const totalToRepay = Number((val * (1 + this.LOAN_INTEREST_RATE)).toFixed(2));

    // Update user state
    user.balance = Number((user.balance + val).toFixed(2));
    if (!user.loans) {
      user.loans = { currentDebt: 0, totalBorrowed: 0, totalRepaid: 0, autoRepay: true };
    }

    user.loans.currentDebt = Number((user.loans.currentDebt + totalToRepay).toFixed(2));
    user.loans.totalBorrowed = Number((user.loans.totalBorrowed + val).toFixed(2));
    if (user.loans.autoRepay === undefined) user.loans.autoRepay = true;

    // Check achievement
    this.checkAchievements(user);

    window.authManager.saveCurrentUser();
    window.SoundManager?.playCash();

    window.notify.warning(
      'Кредит получен! 🏦',
      `Вам начислено +$${val.toFixed(2)}. К возврату с комиссией 10%: $${totalToRepay.toFixed(2)}. Задолженность отображается в лидерборде.`
    );

    return { success: true, amount: val, totalToRepay };
  }

  // Automatic deduction of debt from game winnings (20% of net profit)
  autoDeductDebtFromWin(user, profitAmount) {
    if (!user || !user.loans || user.loans.currentDebt <= 0) return 0;
    if (user.loans.autoRepay === false) return 0;
    if (!profitAmount || profitAmount <= 0) return 0;

    const candidate = Number((profitAmount * 0.20).toFixed(2));
    const toDeduct = Math.min(candidate, user.loans.currentDebt, user.balance);

    if (toDeduct >= 0.01) {
      user.balance = Number((user.balance - toDeduct).toFixed(2));
      user.loans.currentDebt = Number((user.loans.currentDebt - toDeduct).toFixed(2));
      user.loans.totalRepaid = Number(((user.loans.totalRepaid || 0) + toDeduct).toFixed(2));

      window.authManager.saveCurrentUser();

      if (typeof window.updateHeaderUserUI === 'function') {
        window.updateHeaderUserUI(user);
      }
      if (typeof window.renderBankPage === 'function') {
        window.renderBankPage();
      }

      window.notify.info(
        'Автопогашение кредита 🏦',
        `С чистого выигрыша списано $${toDeduct.toFixed(2)} на погашение долга. Оставшийся долг: $${user.loans.currentDebt.toFixed(2)}`
      );
      return toDeduct;
    }
    return 0;
  }

  toggleAutoRepay(enabled) {
    const user = window.authManager.currentUser;
    if (!user) return;
    if (!user.loans) user.loans = { currentDebt: 0, totalBorrowed: 0, totalRepaid: 0, autoRepay: true };
    user.loans.autoRepay = Boolean(enabled);
    window.authManager.saveCurrentUser();
  }

  repayLoan(amount) {
    const user = window.authManager.currentUser;
    if (!user) return { success: false, error: 'Авторизуйтесь в системе.' };

    const currentDebt = user.loans?.currentDebt || 0;
    if (currentDebt <= 0) {
      return { success: false, error: 'У вас нет активной задолженности по кредиту.' };
    }

    let val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      return { success: false, error: 'Введите корректную сумму для погашения.' };
    }

    // Repay maximum up to debt
    val = Math.min(val, currentDebt);

    if (user.balance < val) {
      return {
        success: false,
        error: `Недостаточно средств на балансе! Ваш баланс: $${user.balance.toFixed(2)}, требуется: $${val.toFixed(2)}`
      };
    }

    user.balance = Number((user.balance - val).toFixed(2));
    user.loans.currentDebt = Number((user.loans.currentDebt - val).toFixed(2));
    user.loans.totalRepaid = Number(((user.loans.totalRepaid || 0) + val).toFixed(2));

    // Check achievement
    this.checkAchievements(user);

    window.authManager.saveCurrentUser();
    window.SoundManager?.playCash();

    if (user.loans.currentDebt <= 0) {
      window.notify.success('Кредит полностью закрыт! 🎉', `Вы погасили долг $${val.toFixed(2)}. Ваша кредитная история идеальна!`);
    } else {
      window.notify.success('Платеж внесен 🤝', `Списано $${val.toFixed(2)}. Оставшийся долг: $${user.loans.currentDebt.toFixed(2)}`);
    }

    return { success: true, repaid: val, remainingDebt: user.loans.currentDebt };
  }

  // =========================================================================
  // 3. DAILY REWARDS STREAK
  // =========================================================================
  getDailyStatus(user) {
    if (!user) return { canClaim: false, currentDay: 1, timeLeftMs: 0 };

    if (!user.dailyClaim) {
      user.dailyClaim = { lastClaimTime: 0, streak: 0 };
    }

    const now = Date.now();
    const lastClaim = user.dailyClaim.lastClaimTime || 0;
    const streak = user.dailyClaim.streak || 0;

    const ONE_DAY_MS = 24 * 60 * 60 * 1000;
    const TWO_DAYS_MS = 48 * 60 * 60 * 1000;

    const timeSinceLast = now - lastClaim;

    let canClaim = false;
    let nextStreak = streak;
    let timeLeftMs = 0;

    if (lastClaim === 0) {
      // Never claimed before
      canClaim = true;
      nextStreak = 1;
    } else if (timeSinceLast >= ONE_DAY_MS) {
      canClaim = true;
      if (timeSinceLast > TWO_DAYS_MS) {
        // Streak lost
        nextStreak = 1;
      } else {
        nextStreak = (streak % 7) + 1;
      }
    } else {
      canClaim = false;
      timeLeftMs = ONE_DAY_MS - timeSinceLast;
      nextStreak = streak === 0 ? 1 : streak;
    }

    return {
      canClaim,
      currentDay: nextStreak,
      streak: streak,
      timeLeftMs
    };
  }

  claimDailyReward() {
    const user = window.authManager.currentUser;
    if (!user) return { success: false, error: 'Авторизуйтесь в системе.' };

    const status = this.getDailyStatus(user);
    if (!status.canClaim) {
      const hours = Math.ceil(status.timeLeftMs / (1000 * 60 * 60));
      return { success: false, error: `Следующая награда будет доступна через ${hours} ч.` };
    }

    const dayReward = this.DAILY_STREAK_REWARDS[status.currentDay - 1];
    const rewardAmount = dayReward.reward;

    user.balance = Number((user.balance + rewardAmount).toFixed(2));
    user.dailyClaim = {
      lastClaimTime: Date.now(),
      streak: status.currentDay
    };

    // Special Gift on Day 7: Extra Covert Skin
    let bonusItem = null;
    if (dayReward.specialGift) {
      bonusItem = {
        instanceId: 'gift_' + Date.now(),
        skinId: 'cs2_awp_asiimov_FT',
        name: 'AWP | Азимов (Джекпот 7-го дня)',
        wear: 'FT',
        wearName: 'После полевых (FT)',
        game: 'cs2',
        rarity: 'covert',
        rarityColor: '#eb4b4b',
        price: 145.00,
        image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJG6d2inL-GkvP9JrafwDMHscYh2LuQ9N-h0Fbs-kY5am2mLYfAcQ83Y13Z-1S6yeztgpK46MzJ1zI97Zf4mS0u',
        acquiredAt: Date.now()
      };
      user.inventory.push(bonusItem);
    }

    window.authManager.saveCurrentUser();

    const giftText = bonusItem ? ` + ПОДАРОК: AWP | Азимов ($145.00)!` : '';
    window.notify.bigWin(
      `Ежедневная награда: День ${status.currentDay}! 🎁`,
      `Получено +$${rewardAmount.toFixed(2)}${giftText}`
    );

    return { success: true, reward: rewardAmount, day: status.currentDay, bonusItem };
  }

  // =========================================================================
  // 4. ACHIEVEMENTS CONTROLLER
  // =========================================================================
  checkAchievements(user) {
    if (!user) return;
    if (!user.claimedAchievements) user.claimedAchievements = [];

    this.ACHIEVEMENTS_CONFIG.forEach(ach => {
      if (!user.claimedAchievements.includes(ach.id) && ach.check(user)) {
        // Unlocked!
        // We notify user that they can claim their reward
      }
    });
  }

  claimAchievement(achId) {
    const user = window.authManager.currentUser;
    if (!user) return { success: false, error: 'Авторизуйтесь.' };

    const ach = this.ACHIEVEMENTS_CONFIG.find(a => a.id === achId);
    if (!ach) return { success: false, error: 'Достижение не найдено.' };

    if (!user.claimedAchievements) user.claimedAchievements = [];
    if (user.claimedAchievements.includes(achId)) {
      return { success: false, error: 'Награда за это достижение уже получена.' };
    }

    if (!ach.check(user)) {
      return { success: false, error: 'Условия достижения еще не выполнены.' };
    }

    user.claimedAchievements.push(achId);
    user.balance = Number((user.balance + ach.reward).toFixed(2));

    window.authManager.saveCurrentUser();

    window.notify.bigWin(
      `Достижение выполнено: ${ach.title}! 🏆`,
      `Награда +$${ach.reward.toFixed(2)} зачислена на ваш баланс!`
    );

    return { success: true, reward: ach.reward };
  }

  // =========================================================================
  // 5. INVENTORY SELL ENGINE (1-Click & Sell All)
  // =========================================================================
  sellItem(instanceId) {
    const user = window.authManager.currentUser;
    if (!user) return { success: false, error: 'Авторизуйтесь.' };

    const idx = user.inventory.findIndex(item => item.instanceId === instanceId);
    if (idx === -1) {
      return { success: false, error: 'Предмет не найден в вашем инвентаре.' };
    }

    const item = user.inventory[idx];
    const sellPrice = Number(item.price.toFixed(2));

    user.inventory.splice(idx, 1);
    user.balance = Number((user.balance + sellPrice).toFixed(2));

    window.authManager.saveCurrentUser();
    window.SoundManager?.playCash();

    window.notify.success(
      'Предмет продан! 💵',
      `${item.name} продан за +$${sellPrice.toFixed(2)}`
    );

    return { success: true, price: sellPrice, item };
  }

  sellAllItems() {
    const user = window.authManager.currentUser;
    if (!user) return { success: false, error: 'Авторизуйтесь.' };

    if (!user.inventory || user.inventory.length === 0) {
      return { success: false, error: 'Ваш инвентарь пуст.' };
    }

    const totalValue = user.inventory.reduce((sum, it) => sum + (it.price || 0), 0);
    const count = user.inventory.length;

    user.inventory = [];
    user.balance = Number((user.balance + totalValue).toFixed(2));

    window.authManager.saveCurrentUser();
    window.SoundManager?.playCash();

    window.notify.bigWin(
      'Инвентарь очищен! 💰',
      `Успешно продано ${count} скинов на общую сумму +$${totalValue.toFixed(2)}`
    );

    return { success: true, count, totalValue };
  }
}

window.economyManager = new EconomyManager();

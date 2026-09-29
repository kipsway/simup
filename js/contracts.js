/* ==========================================================================
   SIMUP - TRADE-UP CONTRACTS ENGINE
   Allows players to recycle 3 to 10 skins from their inventory into a higher
   rarity or higher-tier skin with up to 300% outcome value potential!
   ========================================================================== */

class TradeUpContractsManager {
  constructor() {
    this.selectedItems = []; // Array of items from user inventory
  }

  addSkin(item) {
    if (!item) return { success: false, error: 'Скин не найден' };
    if (this.selectedItems.length >= 10) {
      return { success: false, error: 'Контракт заполнен (максимум 10 предметов).' };
    }
    if (this.selectedItems.some(it => it.instanceId === item.instanceId)) {
      return { success: false, error: 'Этот предмет уже вложен в контракт.' };
    }

    this.selectedItems.push(item);
    return { success: true };
  }

  removeSkin(instanceId) {
    this.selectedItems = this.selectedItems.filter(it => it.instanceId !== instanceId);
  }

  clear() {
    this.selectedItems = [];
  }

  fillCheapest(inventory) {
    if (!inventory || inventory.length === 0) return 0;
    
    // Available items not yet selected
    const available = inventory
      .filter(it => !this.selectedItems.some(s => s.instanceId === it.instanceId))
      .sort((a, b) => a.price - b.price);

    let added = 0;
    for (const it of available) {
      if (this.selectedItems.length >= 10) break;
      this.selectedItems.push(it);
      added++;
    }
    return added;
  }

  getMetrics() {
    const count = this.selectedItems.length;
    const totalValue = this.selectedItems.reduce((s, it) => s + (it.price || 0), 0);
    const minOutcome = Number((totalValue * 0.85).toFixed(2));
    const maxOutcome = Number((totalValue * 2.85).toFixed(2));

    return {
      count,
      canSign: count >= 3 && count <= 10,
      totalValue: Number(totalValue.toFixed(2)),
      minOutcome,
      maxOutcome
    };
  }

  executeContract() {
    const user = window.authManager?.currentUser;
    if (!user) return { success: false, error: 'Необходимо войти в аккаунт' };

    const metrics = this.getMetrics();
    if (!metrics.canSign) {
      return { success: false, error: 'Для контракта требуется от 3 до 10 предметов.' };
    }

    const allSkins = window.catalogController?.skins || [];
    if (allSkins.length === 0) {
      return { success: false, error: 'База скинов недоступна.' };
    }

    // Determine primary game of contract
    const gameCounts = {};
    this.selectedItems.forEach(it => {
      const g = it.game || 'cs2';
      gameCounts[g] = (gameCounts[g] || 0) + 1;
    });
    let primaryGame = 'cs2';
    let maxG = 0;
    for (const [g, count] of Object.entries(gameCounts)) {
      if (count > maxG) {
        maxG = count;
        primaryGame = g;
      }
    }

    // Roll contract multiplier: 0.85x to 2.85x with weighted luck
    const luckRoll = Math.random();
    let mult = 1.0;
    if (luckRoll < 0.40) {
      // 40% chance: modest outcome (0.85x - 1.15x)
      mult = 0.85 + Math.random() * 0.30;
    } else if (luckRoll < 0.80) {
      // 40% chance: solid profit (1.15x - 1.85x)
      mult = 1.15 + Math.random() * 0.70;
    } else {
      // 20% jackpot chance: big profit (1.85x - 2.85x)
      mult = 1.85 + Math.random() * 1.00;
    }

    const targetPrice = metrics.totalValue * mult;

    // Filter candidate skins from same game (or all games if needed)
    let candidates = allSkins.filter(s => s.game === primaryGame);
    if (candidates.length === 0) candidates = allSkins;

    // Find skin closest to targetPrice
    let closestSkin = candidates[0];
    let minDiff = Infinity;
    candidates.forEach(skin => {
      const diff = Math.abs(skin.price - targetPrice);
      if (diff < minDiff) {
        minDiff = diff;
        closestSkin = skin;
      }
    });

    // Remove sacrificed items from user inventory
    const sacrificedIds = new Set(this.selectedItems.map(it => it.instanceId));
    user.inventory = user.inventory.filter(it => !sacrificedIds.has(it.instanceId));

    // Create winner instance
    const wonItem = {
      instanceId: 'contract_forged_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      skinId: closestSkin.id,
      name: closestSkin.name,
      nameEn: closestSkin.nameEn,
      wear: closestSkin.wear,
      wearName: closestSkin.wearName,
      game: closestSkin.game,
      rarity: closestSkin.rarity,
      rarityColor: closestSkin.rarityColor,
      price: closestSkin.price,
      image: closestSkin.image,
      category: closestSkin.category,
      acquiredAt: Date.now()
    };

    user.inventory.unshift(wonItem);

    const profit = Number((wonItem.price - metrics.totalValue).toFixed(2));
    user.stats.netProfit = Number(((user.stats.netProfit || 0) + profit).toFixed(2));
    user.stats.totalWagered = Number(((user.stats.totalWagered || 0) + metrics.totalValue).toFixed(2));

    if (!user.stats.bestWinSkin || wonItem.price > (user.stats.bestWinSkin.price || 0)) {
      user.stats.bestWinSkin = wonItem;
    }

    if (!user.history) user.history = [];
    user.history.unshift({
      type: 'contract',
      contractItemsCount: metrics.count,
      totalCost: metrics.totalValue,
      winner: wonItem,
      profit,
      date: Date.now()
    });
    if (user.history.length > 50) user.history.pop();

    window.authManager.saveCurrentUser();
    window.economyManager?.checkAchievements(user);

    // Audio & VFX
    if (wonItem.price > metrics.totalValue * 1.5) {
      window.SoundManager?.playJackpot();
      window.upgraderEngine?.triggerConfetti();
    } else {
      window.SoundManager?.playWin();
    }

    this.clear();

    return {
      success: true,
      winner: wonItem,
      profit,
      totalCost: metrics.totalValue
    };
  }
}

window.contractsManager = new TradeUpContractsManager();

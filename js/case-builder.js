/* ==========================================================================
   SIMUP - CUSTOM CASE BUILDER ENGINE
   Allows players to construct their own cases with 3-10 skins, computes
   fair mathematical drop odds, house edge EV price, and registers custom
   cases into the 60fps roulette runner!
   ========================================================================== */

class CustomCaseBuilderManager {
  constructor() {
    this.selectedSkins = [];
    this.caseName = 'Мой Кастомный Кейс';
    this.caseIcon = '⭐';
    this.caseGame = 'cs2';
    this.customCases = this.loadCustomCases();
  }

  loadCustomCases() {
    try {
      const data = localStorage.getItem('simup_custom_cases_v1');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCustomCases() {
    try {
      localStorage.setItem('simup_custom_cases_v1', JSON.stringify(this.customCases));
    } catch (e) {
      console.error(e);
    }
  }

  addSkin(skin) {
    if (!skin) return { success: false, error: 'Скин не найден' };
    if (this.selectedSkins.length >= 10) {
      return { success: false, error: 'В кейс можно добавить максимум 10 предметов.' };
    }
    if (this.selectedSkins.some(s => s.id === skin.id)) {
      return { success: false, error: 'Этот предмет уже добавлен в кейс.' };
    }

    this.selectedSkins.push(skin);
    return { success: true };
  }

  removeSkin(skinId) {
    this.selectedSkins = this.selectedSkins.filter(s => s.id !== skinId);
  }

  clear() {
    this.selectedSkins = [];
  }

  calculateMetrics() {
    const count = this.selectedSkins.length;
    if (count === 0) {
      return {
        itemsWithOdds: [],
        casePrice: 0,
        minPrice: 0,
        maxPrice: 0,
        canSave: false
      };
    }

    // Mathematical odds calculation based on inverse price:
    // weight_i = 1 / (price_i ^ 0.82)
    const weights = this.selectedSkins.map(skin => {
      const p = Math.max(0.5, skin.price);
      return Math.pow(1 / p, 0.82);
    });

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    const itemsWithOdds = this.selectedSkins.map((skin, idx) => {
      const rawChance = (weights[idx] / totalWeight) * 100;
      const chance = Number(Math.max(0.05, rawChance).toFixed(2));
      return {
        skin,
        chance
      };
    });

    // Normalize chances to exact 100%
    const currentSum = itemsWithOdds.reduce((s, it) => s + it.chance, 0);
    if (currentSum > 0 && Math.abs(currentSum - 100) > 0.1) {
      const ratio = 100 / currentSum;
      itemsWithOdds.forEach(it => {
        it.chance = Number((it.chance * ratio).toFixed(2));
      });
    }

    // Compute fair EV price with 5% house edge
    const expectedValue = itemsWithOdds.reduce((sum, it) => {
      return sum + (it.chance / 100) * it.skin.price;
    }, 0);

    const casePrice = Number(Math.max(0.99, (expectedValue * 1.05)).toFixed(2));
    const prices = this.selectedSkins.map(s => s.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
      itemsWithOdds,
      casePrice,
      minPrice,
      maxPrice,
      canSave: count >= 3 && count <= 10
    };
  }

  createCase(name, icon, game) {
    const user = window.authManager?.currentUser;
    if (!user) return { success: false, error: 'Авторизуйтесь для создания кейса.' };

    const metrics = this.calculateMetrics();
    if (!metrics.canSave) {
      return { success: false, error: 'В кейсе должно быть от 3 до 10 предметов.' };
    }

    const trimmedName = (name || this.caseName || 'Пользовательский кейс').trim();
    const finalIcon = icon || this.caseIcon || '⭐';
    const finalGame = game || this.caseGame || 'cs2';

    const newCase = {
      id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: trimmedName,
      game: finalGame,
      price: metrics.casePrice,
      icon: finalIcon,
      isCustom: true,
      author: user.username,
      createdAt: Date.now(),
      items: metrics.itemsWithOdds.map(it => ({
        skinId: it.skin.id,
        name: it.skin.name,
        nameEn: it.skin.nameEn || it.skin.name,
        wear: it.skin.wear || 'FN',
        wearName: it.skin.wearName || 'Прямо с завода',
        game: it.skin.game || finalGame,
        rarity: it.skin.rarity || 'covert',
        rarityColor: it.skin.rarityColor || '#eb4b4b',
        price: it.skin.price,
        image: it.skin.image,
        chance: it.chance
      }))
    };

    this.customCases.unshift(newCase);
    this.saveCustomCases();
    this.clear();

    return {
      success: true,
      case: newCase
    };
  }

  deleteCase(caseId) {
    this.customCases = this.customCases.filter(c => c.id !== caseId);
    this.saveCustomCases();
  }
}

window.caseBuilderManager = new CustomCaseBuilderManager();

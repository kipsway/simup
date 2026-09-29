/* ==========================================================================
   SIMUP - CASES CONTROLLER & 60FPS HORIZONTAL ROULETTE (BLOCK 4)
   Handles 15 unique cases, horizontal reel spinning, sound ticks, and drops.
   ========================================================================== */

class CasesManager {
  constructor() {
    this.cases = window.CASES_DATABASE || [];
    this.activeCase = null;
    this.isSpinning = false;
    this.selectedGameFilter = 'all';
    this.cardWidth = 140; // width of card in roulette + gap
  }

  getFilteredCases() {
    const custom = window.caseBuilderManager?.customCases || [];
    if (this.selectedGameFilter === 'custom') return custom;
    if (this.selectedGameFilter === 'all') return [...this.cases, ...custom];
    return [...this.cases, ...custom].filter(c => c.game === this.selectedGameFilter);
  }

  setGameFilter(game) {
    this.selectedGameFilter = game;
  }

  getCaseById(id) {
    const custom = window.caseBuilderManager?.customCases || [];
    return this.cases.find(c => c.id === id) || custom.find(c => c.id === id);
  }

  getResolvedCaseItems(caseData) {
    if (caseData.isCustom) {
      return caseData.items.map(entry => ({
        ...entry,
        id: entry.skinId,
        weight: Math.round((entry.chance || 1) * 100),
        percent: Number((entry.chance || 0).toFixed(2))
      }));
    }
    const allSkins = window.getAllSkinVariants ? window.getAllSkinVariants() : [];
    const totalWeight = caseData.items.reduce((s, it) => s + it.weight, 0);

    return caseData.items.map(entry => {
      const skin = allSkins.find(s => s.id === entry.skinId) || {
        id: entry.skinId,
        name: 'Неизвестный скин',
        wear: 'FT',
        price: 10.00,
        rarity: 'milspec',
        rarityColor: '#4b69ff',
        image: ''
      };

      const percent = ((entry.weight / totalWeight) * 100).toFixed(2);
      return {
        ...skin,
        weight: entry.weight,
        percent: Number(percent)
      };
    });
  }

  // Pick winning skin via weighted random
  rollWinner(caseData) {
    const items = this.getResolvedCaseItems(caseData);
    const totalWeight = items.reduce((s, it) => s + it.weight, 0);

    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    let rand = array[0] % totalWeight;

    for (const item of items) {
      if (rand < item.weight) {
        return item;
      }
      rand -= item.weight;
    }
    return items[0];
  }

  // Generate roulette track containing ~55 items with winner at index 48
  generateReelTrack(caseData, winningItem) {
    const items = this.getResolvedCaseItems(caseData);
    const totalCards = 55;
    const winnerIndex = 48;
    const track = [];

    for (let i = 0; i < totalCards; i++) {
      if (i === winnerIndex) {
        track.push(winningItem);
      } else {
        // Random item based on case pool
        const randIdx = Math.floor(Math.random() * items.length);
        track.push(items[randIdx]);
      }
    }

    return { track, winnerIndex };
  }

  // Open case & trigger reel animation
  openCase({ caseData, reelTrackElement, onTick, onComplete }) {
    if (this.isSpinning) return;
    const user = window.authManager.currentUser;
    if (!user) {
      window.notify.error('Ошибка', 'Сначала авторизуйтесь в профиле.');
      return;
    }

    if (user.balance < caseData.price) {
      window.notify.error(
        'Недостаточно средств',
        `Стоимость кейса $${caseData.price.toFixed(2)}, ваш баланс $${user.balance.toFixed(2)}.`
      );
      return;
    }

    this.isSpinning = true;

    // Deduct case price
    user.balance = Number((user.balance - caseData.price).toFixed(2));
    user.stats.casesOpened = (user.stats.casesOpened || 0) + 1;
    user.stats.totalWagered = Number(((user.stats.totalWagered || 0) + caseData.price).toFixed(2));

    window.authManager.saveCurrentUser();

    // Roll winning item
    const winner = this.rollWinner(caseData);
    const { track, winnerIndex } = this.generateReelTrack(caseData, winner);

    // Render cards into reel
    reelTrackElement.innerHTML = track.map((item, idx) => `
      <div class="reel-item-card skin-rarity-${item.rarity}" style="--rarity-clr: ${item.rarityColor};" data-idx="${idx}">
        <span class="reel-item-wear">${item.wear && item.wear !== 'STANDARD' ? item.wear : ''}</span>
        <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="reel-item-img" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${item.id || ''}', '${item.name?.replace(/['\"\\]/g, '') || ''}', '${item.rarity || 'milspec'}', '${item.category || 'weapon'}', '${item.game || 'cs2'}');">
        <div class="reel-item-name">${item.name}</div>
        <div class="reel-item-price">$${item.price.toFixed(2)}</div>
      </div>
    `).join('');

    // Physical spin calculation:
    // Distance to winning card center
    const cardFullWidth = 138; // 130px card + 8px gap
    const containerWidth = reelTrackElement.parentElement.offsetWidth;
    const centerOffset = containerWidth / 2 - cardFullWidth / 2;

    // Slight random offset inside the winning card [-40px, +40px]
    const subRandom = (Math.random() - 0.5) * 60;
    const targetDistance = (winnerIndex * cardFullWidth) - centerOffset + subRandom;

    const durationMs = 5200;
    const startTime = performance.now();
    let lastTickCard = -1;

    const animFrame = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Custom smooth deceleration
      const eased = this.easeOutCubic(progress);
      const currentX = -(eased * targetDistance);

      reelTrackElement.style.transform = `translateX(${currentX}px)`;

      // Calculate which card is currently passing center
      const currentCardIdx = Math.floor((Math.abs(currentX) + containerWidth / 2) / cardFullWidth);
      if (currentCardIdx !== lastTickCard && currentCardIdx >= 0) {
        lastTickCard = currentCardIdx;
        const tickFreq = 650 + (1 - progress) * 200;
        window.SoundManager?.playTick(tickFreq, 0.05);
        if (onTick) onTick(currentCardIdx);
      }

      if (progress < 1) {
        requestAnimationFrame(animFrame);
      } else {
        // Complete spin
        this.isSpinning = false;

        // Add item to user inventory
        const wonItem = {
          instanceId: 'case_drop_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
          skinId: winner.id,
          name: winner.name,
          nameEn: winner.nameEn,
          wear: winner.wear,
          wearName: winner.wearName,
          game: winner.game,
          rarity: winner.rarity,
          rarityColor: winner.rarityColor,
          price: winner.price,
          image: winner.image,
          category: winner.category,
          acquiredAt: Date.now()
        };

        const profit = Number((winner.price - caseData.price).toFixed(2));
        user.inventory.unshift(wonItem);
        user.stats.netProfit = Number(((user.stats.netProfit || 0) + profit).toFixed(2));
        
        // Auto-repay bank debt from profitable drop
        if (profit > 0 && window.economyManager?.autoDeductDebtFromWin) {
          window.economyManager.autoDeductDebtFromWin(user, profit);
        }
        
        if (!user.stats.bestWinSkin || winner.price > (user.stats.bestWinSkin.price || 0)) {
          user.stats.bestWinSkin = wonItem;
        }

        if (!user.history) user.history = [];
        user.history.unshift({
          type: 'case',
          caseId: caseData.id,
          caseName: caseData.name,
          cost: caseData.price,
          winner: wonItem,
          profit: Number((winner.price - caseData.price).toFixed(2)),
          date: Date.now()
        });
        if (user.history.length > 50) user.history.pop();

        window.authManager.saveCurrentUser();
        window.economyManager?.checkAchievements(user);

        // Sound
        if (winner.price >= caseData.price * 3 || winner.rarity === 'extraordinary') {
          window.SoundManager?.playJackpot();
        } else {
          window.SoundManager?.playWin();
        }

        if (onComplete) {
          onComplete({ winner: wonItem, caseData });
        }
      }
    };

    requestAnimationFrame(animFrame);
  }

  easeOutCubic(t) {
    return (--t) * t * t + 1;
  }
}

window.casesManager = new CasesManager();

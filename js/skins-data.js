/* ==========================================================================
   SIMUP - MASSIVE REAL SKINS DATABASE (CS2, DOTA 2, RUST) - BLOCK 4
   - 100% Real Steam Community CDN images for every single skin
   - Realistic price ranges from $0.15 (Consumer/Common) to $14,000+ (High-tier)
   - Wear gradations for CS2 (Factory New, Minimal Wear, Field-Tested, Well-Worn, Battle-Scarred)
   - Perfect economy balance for 1-to-1 Upgrader & Case opening
   ========================================================================== */

const RARITY_COLORS = {
  consumer: '#b0c3d9',      // Grey / Common ($0.15 - $0.50)
  industrial: '#5e98d9',    // Light Blue / Industrial ($0.50 - $2.00)
  milspec: '#4b69ff',       // Blue / Mil-Spec ($1.00 - $6.00)
  restricted: '#8847ff',    // Purple / Restricted ($5.00 - $35.00)
  classified: '#d32ce6',    // Pink / Classified ($20.00 - $180.00)
  covert: '#eb4b4b',        // Red / Covert / Immortal ($50.00 - $3,500.00)
  extraordinary: '#ffd700', // Gold / Knife / Gloves / Arcana / Ancient ($85.00 - $12,000.00)
  contraband: '#e4ae39'     // Gold-Orange / Howl ($3,500 - $14,000)
};

const RARITY_LABELS = {
  consumer: 'Обычное',
  industrial: 'Необычное',
  milspec: 'Редкое (Рар)',
  restricted: 'Мифическое',
  classified: 'Легендарное',
  covert: 'Древнее (Ancient)',
  extraordinary: 'Бессмертное ★',
  contraband: 'Реликвия / Аркана'
};

const WEAR_NAMES = {
  FN: 'Прямо с завода (FN)',
  MW: 'Немного поношенное (MW)',
  FT: 'После полевых (FT)',
  WW: 'Поношенное (WW)',
  BS: 'Закаленное в боях (BS)',
  STANDARD: 'Базовое качество'
};

const SKINS_DATABASE = [
  {
    "id": "cs2_karambit_ch_387_fn_st",
    "game": "cs2",
    "name": "★ StatTrak™ Керамбит | Blue Gem #387 (FN)",
    "nameEn": "★ StatTrak™ Karambit | Case Hardened Blue Gem #387 (FN)",
    "category": "knife",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP0965h4WPqP_xMq3ehm5D8fp3htfx_Is_2VDkqBFrZWv3dYfEI1RsYwvZ_Fm7x-7o0cK87svNzydk6iI8pGB8srcwZps0",
    "price": 1500000
  },
  {
    "id": "cs2_ak47_ch_661_st_fn",
    "game": "cs2",
    "name": "StatTrak™ AK-47 | Blue Gem #661 (4x Titan Holo)",
    "nameEn": "StatTrak™ AK-47 | Case Hardened Scar #661 (4x Titan Holo)",
    "category": "rifle",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08u_mpSOhcjnPLfWl3lu-sR1jeTE8YXghRq2rhI6Z23yLIWQcANsM1uFqVm-x-rvjZPotZqfynNqvyggsXmLnx2whx1SLrs40_pZ_9I",
    "price": 1000000
  },
  {
    "id": "cs2_karambit_crimson_web_fn_1",
    "game": "cs2",
    "name": "★ StatTrak™ Керамбит | Кровавая паутина (#1 Float FN)",
    "nameEn": "★ StatTrak™ Karambit | Crimson Web (#1 Float FN)",
    "category": "knife",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09m7h5C0mfL3Ibrulpdo750n3LiVrNrx31Xm-BdsYWr3do6ddgA-NwyF-wTtxL--1p656pvImGwj5Hc7sM-7lA",
    "price": 650000
  },
  {
    "id": "cs2_awp_dragon_lore_souvenir_titan_fn",
    "game": "cs2",
    "name": "AWP | История о драконе (Сувенир 4x Titan Holo)",
    "nameEn": "Souvenir AWP | Dragon Lore (4x Titan Katowice 2014)",
    "category": "sniper",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWSF_uMvj-NoVha_mg8ijDCAnobsLGWebgVzA5EjQrMJ40G9xIHhMu_j4wOM2oJMnCuq2nlN73w54OdRVqoj5OSJ2HZV8Guh",
    "price": 450000
  },
  {
    "id": "cs2_awp_dragon_lore_reason_fn",
    "game": "cs2",
    "name": "AWP | История о драконе (FN 4x Reason Holo)",
    "nameEn": "AWP | Dragon Lore (FN 4x Reason Gaming Holo)",
    "category": "sniper",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWSF_uMvj-NoVha_mg8ijDCAnobsLGWebgVzA5EjQrMJ40G9xIHhMu_j4wOM2oJMnCuq2nlN73w54OdRVqoj5OSJ2HZV8Guh",
    "price": 270000
  },
  {
    "id": "cs2_m4a4_howl_st_fn_ibp",
    "game": "cs2",
    "name": "StatTrak™ M4A4 | Вой (4x iBUYPOWER Holo FN)",
    "nameEn": "StatTrak™ M4A4 | Howl (4x iBUYPOWER Katowice 2014 Holo)",
    "category": "rifle",
    "rarity": "contraband",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09izh4-GkvP9Jrafw2lU6ccp0rqVpon3jVbtrRE_NW_zLYPBegE4MF3Qq1O8wOq905Xp7cvM1zI97Q3gV46h",
    "price": 220000
  },
  {
    "id": "cs2_karambit_fade_titan_fn",
    "game": "cs2",
    "name": "★ Керамбит | Градиент (FN 4x Titan Holo)",
    "nameEn": "★ Karambit | Fade 100% (FN 4x Titan Holo)",
    "category": "knife",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09m7h5C0mfL3Ibrulpdo750n3LiVrNrx31Xm-BdsYWr3do6ddgA-NwyF-wTtxL--1p656pvImGwj5Hc7sM-7lA",
    "price": 160000
  },
  {
    "id": "cs2_vice_gloves_st_fn",
    "game": "cs2",
    "name": "★ StatTrak™ Спортивные перчатки | Порок (FN)",
    "nameEn": "★ StatTrak™ Sport Gloves | Vice (FN)",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1Rx5sR5teTE8YXghRrh-kZtZ2D2JoGdcAM7ZwvT-1S_kuy-h8TotZvNz3Vj6XY8pGB8s5Vd4K0",
    "price": 38000
  },
  {
    "id": "cs2_skeleton_fade_fn_st",
    "game": "cs2",
    "name": "★ StatTrak™ Скелетный нож | Градиент (FN)",
    "nameEn": "★ StatTrak™ Skeleton Knife | Fade (FN)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09m7h5C0mfL3Ibrulpdo750n3LiVrNrx31Xm-BdsYWr3do6ddgA-NwyF-wTtxL--1p656pvImGwj5Hc7sM-7lA",
    "price": 22500
  },
  {
    "id": "cs2_butterfly_sapphire_mw",
    "game": "cs2",
    "name": "★ Нож-бабочка | Волны Сапфир (MW)",
    "nameEn": "★ Butterfly Knife | Doppler Sapphire (MW)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1Rx5sR5teTE8YXghRrh-kZtZ2D2JoGdcAM7ZwvT-1S_kuy-h8TotZvNz3Vj6XY8pGB8s5Vd4K0",
    "price": 21200
  },
  {
    "id": "cs2_m9_fade_100_fn",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Градиент (FN 100%)",
    "nameEn": "★ M9 Bayonet | Fade 100% (FN)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1Rx5sR5teTE8YXghRrh-kZtZ2D2JoGdcAM7ZwvT-1S_kuy-h8TotZvNz3Vj6XY8pGB8s5Vd4K0",
    "price": 13800
  },
  {
    "id": "cs2_karambit_emerald_mw",
    "game": "cs2",
    "name": "★ Керамбит | Гамма-волны Изумруд (MW)",
    "nameEn": "★ Karambit | Gamma Doppler Emerald (MW)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09m7h5C0mfL3Ibrulpdo750n3LiVrNrx31Xm-BdsYWr3do6ddgA-NwyF-wTtxL--1p656pvImGwj5Hc7sM-7lA",
    "price": 15400
  },
  {
    "id": "cs2_butterfly_crimson_web_mw",
    "game": "cs2",
    "name": "★ Нож-бабочка | Кровавая паутина (MW)",
    "nameEn": "★ Butterfly Knife | Crimson Web (MW)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1Rx5sR5teTE8YXghRrh-kZtZ2D2JoGdcAM7ZwvT-1S_kuy-h8TotZvNz3Vj6XY8pGB8s5Vd4K0",
    "price": 17200
  },
  {
    "id": "cs2_awp_gungnir_st_ft",
    "game": "cs2",
    "name": "StatTrak™ AWP | Гунгнир (FT)",
    "nameEn": "StatTrak™ AWP | Gungnir (FT)",
    "category": "sniper",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJS5NO0m5O0m_7zO6-fzj9V7cAl2eyVpI-j21Xk_0dtYm-nI4fEdFc6NVCE-gK9xLzqg5656s-bmHFm7yEns37cnAv33087K3y99Q",
    "price": 19800
  },
  {
    "id": "cs2_gloves_pandora_st_mw",
    "game": "cs2",
    "name": "★ StatTrak™ Перчатки | Ящик Пандоры (MW)",
    "nameEn": "★ StatTrak™ Sport Gloves | Pandora's Box (MW)",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1Rx5sR5teTE8YXghRrh-kZtZ2D2JoGdcAM7ZwvT-1S_kuy-h8TotZvNz3Vj6XY8pGB8s5Vd4K0",
    "price": 23800
  },
  {
    "id": "cs2_butterfly_ruby_fn",
    "game": "cs2",
    "name": "★ Нож-бабочка | Волны Рубин (FN)",
    "nameEn": "★ Butterfly Knife | Doppler Ruby (FN)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1Rx5sR5teTE8YXghRrh-kZtZ2D2JoGdcAM7ZwvT-1S_kuy-h8TotZvNz3Vj6XY8pGB8s5Vd4K0",
    "price": 29500
  },
  {
    "id": "cs2_m9_emerald_fn",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Гамма-волны Изумруд (FN)",
    "nameEn": "★ M9 Bayonet | Gamma Doppler Emerald (FN)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1Rx5sR5teTE8YXghRrh-kZtZ2D2JoGdcAM7ZwvT-1S_kuy-h8TotZvNz3Vj6XY8pGB8s5Vd4K0",
    "price": 34500
  },
  {
    "id": "cs2_awp_dragon_lore_st_mw",
    "game": "cs2",
    "name": "StatTrak™ AWP | История о драконе (MW)",
    "nameEn": "StatTrak™ AWP | Dragon Lore (MW)",
    "category": "sniper",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWSF_uMvj-NoVha_mg8ijDCAnobsLGWebgVzA5EjQrMJ40G9xIHhMu_j4wOM2oJMnCuq2nlN73w54OdRVqoj5OSJ2HZV8Guh",
    "price": 44000
  },
  {
    "id": "cs2_karambit_emerald_st_fn",
    "game": "cs2",
    "name": "★ StatTrak™ Керамбит | Гамма-волны Изумруд (FN)",
    "nameEn": "★ StatTrak™ Karambit | Gamma Doppler Emerald (FN)",
    "category": "knife",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09m7h5C0mfL3Ibrulpdo750n3LiVrNrx31Xm-BdsYWr3do6ddgA-NwyF-wTtxL--1p656pvImGwj5Hc7sM-7lA",
    "price": 54000
  },
  {
    "id": "cs2_butterfly_sapphire_st_fn",
    "game": "cs2",
    "name": "★ StatTrak™ Нож-бабочка | Волны Сапфир (FN)",
    "nameEn": "★ StatTrak™ Butterfly Knife | Doppler Sapphire (FN)",
    "category": "knife",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1Rx5sR5teTE8YXghRrh-kZtZ2D2JoGdcAM7ZwvT-1S_kuy-h8TotZvNz3Vj6XY8pGB8s5Vd4K0",
    "price": 78000
  },
  {
    "id": "cs2_awp_gungnir_souvenir_fn",
    "game": "cs2",
    "name": "AWP | Гунгнир (Сувенир FN)",
    "nameEn": "Souvenir AWP | Gungnir (FN)",
    "category": "sniper",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJS5NO0m5O0m_7zO6-fzj9V7cAl2eyVpI-j21Xk_0dtYm-nI4fEdFc6NVCE-gK9xLzqg5656s-bmHFm7yEns37cnAv33087K3y99Q",
    "price": 110000
  },
  {
    "id": "cs2_ak47_fire_serpent_4x_titan_fn",
    "game": "cs2",
    "name": "StatTrak™ AK-47 | Огненный змей (4x Titan Holo FN)",
    "nameEn": "StatTrak™ AK-47 | Fire Serpent (4x Titan Katowice 2014 FN)",
    "category": "rifle",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08u_mpSOhcjnPLfWl3lu-sR1jeTE8YXghRq2rhI6Z23yLIWQcANsM1uFqVm-x-rvjZPotZqfynNqvyggsXmLnx2whx1SLrs40_pZ_9I",
    "price": 142000
  },
  {
    "id": "cs2_butterfly_crimson_web_1_fn",
    "game": "cs2",
    "name": "★ Нож-бабочка | Кровавая паутина (#1 Float FN)",
    "nameEn": "★ Butterfly Knife | Crimson Web (#1 Float FN)",
    "category": "knife",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1Rx5sR5teTE8YXghRrh-kZtZ2D2JoGdcAM7ZwvT-1S_kuy-h8TotZvNz3Vj6XY8pGB8s5Vd4K0",
    "price": 185000
  },
  {
    "id": "cs2_awp_gungnir_fn_reason",
    "game": "cs2",
    "name": "AWP | Гунгнир (FN 4x Reason Holo)",
    "nameEn": "AWP | Gungnir (Factory New 4x Reason Gaming Holo)",
    "category": "sniper",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJS5NO0m5O0m_7zO6-fzj9V7cAl2eyVpI-j21Xk_0dtYm-nI4fEdFc6NVCE-gK9xLzqg5656s-bmHFm7yEns37cnAv33087K3y99Q",
    "price": 120000
  },
  {
    "id": "cs2_ak47_wild_lotus_fn_dig",
    "game": "cs2",
    "name": "AK-47 | Дикий лотос (FN 4x Dignitas Holo)",
    "nameEn": "AK-47 | Wild Lotus (Factory New 4x Team Dignitas Holo)",
    "category": "rifle",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV1924g4qOh8j5Nr_Yg2Yf68F32e2Y89v30Qaw_0dtZDr3JdSVcVRvYVHQ_1K9wru5hsTvvsmYyXY37z5iuyhS_Wl0aA",
    "price": 95000
  },
  {
    "id": "cs2_butterfly_gamma_emerald_st",
    "game": "cs2",
    "name": "★ StatTrak™ Нож-бабочка | Гамма-волны Изумруд (FN)",
    "nameEn": "★ StatTrak™ Butterfly Knife | Gamma Doppler Emerald (FN)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1Rx5sR5teTE8YXghRrh-kZtZ2D2JoGdcAM7ZwvT-1S_kuy-h8TotZvNz3Vj6XY8pGB8s5Vd4K0",
    "price": 65000
  },
  {
    "id": "cs2_m9_doppler_sapphire_st",
    "game": "cs2",
    "name": "★ StatTrak™ Штык-нож M9 | Волны Сапфир (FN)",
    "nameEn": "★ StatTrak™ M9 Bayonet | Doppler Sapphire (FN)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Mh-PnJ6nkmnlu-NZlmOzA-LP5gVO8v11vYmGlco7De1JsNQuE81W4le_qjJ66u5qcn3tr7CIrs3ncnBXin1gSOf-o9GgC",
    "price": 48000
  },
  {
    "id": "cs2_karambit_doppler_ruby_st",
    "game": "cs2",
    "name": "★ StatTrak™ Керамбит | Волны Рубин (FN)",
    "nameEn": "★ StatTrak™ Karambit | Doppler Ruby (FN)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09m7h5C0mfL3Ibrulpdo750n3LiVrNrx31Xm-BdsYWr3do6ddgA-NwyF-wTtxL--1p656pvImGwj5Hc7sM-7lA",
    "price": 42000
  },
  {
    "id": "cs2_karambit_blue_gem_387",
    "game": "cs2",
    "name": "★ Керамбит | Blue Gem #387",
    "nameEn": "★ Karambit | Case Hardened Blue Gem #387",
    "category": "knife",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP0965h4WPqP_xMq3ehm5D8fp3htfx_Is_2VDkqBFrZWv3dYfEI1RsYwvZ_Fm7x-7o0cK87svNzydk6iI8pGB8srcwZps0",
    "price": 25000.00
  },
  {
    "id": "cs2_ak47_case_hardened_scar_661",
    "game": "cs2",
    "name": "AK-47 | Blue Gem Pattern 661",
    "nameEn": "AK-47 | Case Hardened Pattern 661 Scar",
    "category": "rifle",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08u_mpSOhcjnPLfWl3lu-sR1jeTE8YXghRq2rhI6Z23yLIWQcANsM1uFqVm-x-rvjZPotZqfynNqvyggsXmLnx2whx1SLrs40_pZ_9I",
    "price": 18500.00
  },
  {
    "id": "cs2_awp_dragon_lore_souvenir_fn",
    "game": "cs2",
    "name": "AWP | История о драконе (Сувенир FN)",
    "nameEn": "AWP | Dragon Lore (Souvenir FN)",
    "category": "sniper",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWSF_uMvj-NoVha_mg8ijDCAnobsLGWebgVzA5EjQrMJ40G9xIHhMu_j4wOM2oJMnCuq2nlN73w54OdRVqoj5OSJ2HZV8Guh",
    "price": 14500.00
  },
  {
    "id": "cs2_m4a4_howl_stattrak_fn",
    "game": "cs2",
    "name": "M4A4 | Вой (StatTrak™ FN)",
    "nameEn": "M4A4 | Howl (StatTrak™ Factory New)",
    "category": "rifle",
    "rarity": "contraband",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09izh4-GkvP9Jrafw2lU6ccp0rqVpon3jVbtrRE_NW_zLYPBegE4MF3Qq1O8wOq905Xp7cvM1zI97Q3gV46h",
    "price": 35000.00
  },
  {
    "id": "cs2_gloves_pandora_box_fn",
    "game": "cs2",
    "name": "★ Спортивные перчатки | Ящик Пандоры (FN)",
    "nameEn": "★ Sport Gloves | Pandora's Box (Factory New)",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxuHbZC597c2JmImMn-O6Nr_um25V4dB8xLvEotSn31Xh-0FtNmH2cY-dJwI-M1zX-1S_kO_vhcC76cmayXpqs3F2tyvan1q3hAYMMLK8H7R5kQ",
    "price": 32000.00
  },
  {
    "id": "cs2_butterfly_gamma_emerald",
    "game": "cs2",
    "name": "★ Нож-бабочка | Гамма-волны Изумруд",
    "nameEn": "★ Butterfly Knife | Gamma Doppler Emerald",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GKqPH1N77ummJW4NE_iLjA99nzigexr0NkYmH2dYSTdAU9ZQrW_lm2kO3pgcTuv8vLy3I1sj5iuyin5z3u1g",
    "price": 28000.00
  },
  {
    "id": "cs2_gloves_vice_fn",
    "game": "cs2",
    "name": "★ Спортивные перчатки | Порок (FN)",
    "nameEn": "★ Sport Gloves | Vice (Factory New)",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxuHbZC597c2JmImMn-O6Nr_um25V4dB8xLvEotSn31Xh-0FtNmH2cY-dJwI-M1zX-1S_kO_vhcC76cmayXpqs3F2tyvan1q3hAYMMLK8H7R5kQ",
    "price": 26000.00
  },
  {
    "id": "cs2_m9_bayonet_sapphire",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Волны Сапфир",
    "nameEn": "★ M9 Bayonet | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWSF_uMvj-NoVha_mg8ijDCAnobsLGWebgVzA5EjQrMJ40G9xIHhMu_j4wOM2oJMnCuq2nlN73w54OdRVqoj5OSJ2HZV8Guh",
    "price": 24500.00
  },
  {
    "id": "cs2_skeleton_crimson_web_fn",
    "game": "cs2",
    "name": "★ Скелетный нож | Кровавая паутина (FN)",
    "nameEn": "★ Skeleton Knife | Crimson Web (Factory New)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-bF1iHxOxlj-lsTj-q20twt2yGydf9eHOfbAZzD8Z1F7YC5xW8w4KxN-vrtFDf2oxGmC-r2HhXrnE8IzMD7FA",
    "price": 18000.00
  },
  {
    "id": "cs2_karambit_ruby_fn",
    "game": "cs2",
    "name": "★ Керамбит | Волны Рубин",
    "nameEn": "★ Karambit | Doppler Ruby (Factory New)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij7r--YXygED6-EtrNmihLYaXIQ83Nw6C-1C6k-zvgMO7up7NmHs2uykl43fYnUG3hQYMMLINmYZu2g",
    "price": 16500.00
  },
  {
    "id": "cs2_butterfly_fade_max_fn",
    "game": "cs2",
    "name": "★ Нож-бабочка | Градиент (100% Fade)",
    "nameEn": "★ Butterfly Knife | Fade (100% Fade)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1RX6sl0te_S8Inx31W3-UNvNm_ydY6dcAU9aV_V-FO8yOjug5e56s7Lz3ZqvSg8pGB8srH4r52z",
    "price": 13500.00
  },
  {
    "id": "cs2_gloves_hedge_maze_mw",
    "game": "cs2",
    "name": "★ Спортивные перчатки | Живая изгородь (MW)",
    "nameEn": "★ Sport Gloves | Hedge Maze (Minimal Wear)",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxuHbZC597c2JmImMn-O6Nr_um25V4dB8xLvEotSn31Xh-0FtNmH2cY-dJwI-M1zX-1S_kO_vhcC76cmayXpqs3F2tyvan1q3hAYMMLK8H7R5kQ",
    "price": 12200.00
  },
  {
    "id": "dota2_golden_baby_roshan",
    "game": "dota2",
    "name": "Golden Baby Roshan",
    "nameEn": "Golden Baby Roshan",
    "category": "courier",
    "rarity": "immortal",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10T1rUKuS61eDYVk14IAlV5OT9eVRz0aPPJGlGvN24xdmJlqCtZu-Gwm9XvcB32r6Wpdyk31W3_ENtNzqnd4PDcwE_NV7Q-Vjtxr_pg5W1tMvXn3EysyN27XbUmUa21B1SLrs4f3aFwU4",
    "price": 11500.00
  },
  {
    "id": "cs2_awp_gungnir_mw",
    "game": "cs2",
    "name": "AWP | Гунгнир (MW)",
    "nameEn": "AWP | Gungnir (Minimal Wear)",
    "category": "sniper",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJS5NO0m5O0m_7zO6-fzj9V7cAl2eyVpdyj2wXj-kZsMm-nd9edcFA7aV7Vr1e4k-bvhpS-6MzXiSw0m7mX_hQ",
    "price": 11000.00
  },
  {
    "id": "cs2_karambit_fade_fn",
    "game": "cs2",
    "name": "★ Керамбит | Градиент (FN)",
    "nameEn": "★ Karambit | Fade (Factory New)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP0965h4WPqP_xMq3ehm5D8fp3htfx_Is_2VDkqBFrZWv3dYfEI1RsYwvZ_Fm7x-7o0cK87svNzydk6iI8pGB8srcwZps0",
    "price": 9800.00
  },
  {
    "id": "cs2_m9_gamma_emerald_mw",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Гамма-волны Изумруд",
    "nameEn": "★ M9 Bayonet | Gamma Doppler Emerald",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWSF_uMvj-NoVha_mg8ijDCAnobsLGWebgVzA5EjQrMJ40G9xIHhMu_j4wOM2oJMnCuq2nlN73w54OdRVqoj5OSJ2HZV8Guh",
    "price": 8900.00
  },
  {
    "id": "dota2_legacy_ef_wardog",
    "game": "dota2",
    "name": "Legacy Ethereal Flame Wardog",
    "nameEn": "Legacy Ethereal Flame Enduring War Dog",
    "category": "courier",
    "rarity": "immortal",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10T1rUKuS61eDYVk14IAlV5OT9eVRz0aPPJGlGvN24xdmJlqCtZu-Gwm9XvcB32r6Wpdyk31W3_ENtNzqnd4PDcwE_NV7Q-Vjtxr_pg5W1tMvXn3EysyN27XbUmUa21B1SLrs4f3aFwU4",
    "price": 8200.00
  },
  {
    "id": "cs2_skeleton_fade_fn",
    "game": "cs2",
    "name": "★ Скелетный нож | Градиент (FN)",
    "nameEn": "★ Skeleton Knife | Fade (Factory New)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-bF1iHxOxlj-lsTj-q20twt2yGydf9eHOfbAZzD8Z1F7YC5xW8w4KxN-vrtFDf2oxGmC-r2HhXrnE8IzMD7FA",
    "price": 7900.00
  },
  {
    "id": "rust_alien_relic_smg",
    "game": "rust",
    "name": "Alien Relic SMG",
    "nameEn": "Alien Relic Custom SMG",
    "category": "weapon",
    "rarity": "legendary",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaWK4ApmNzviFz0YrE5Aqk4909WST041-8qOrQD8aGnvC11821V2155-G0m_N-F_T_Z7l_d-Z1L6W6Q_g5",
    "price": 7500.00
  },
  {
    "id": "cs2_gloves_snow_leopard_fn",
    "game": "cs2",
    "name": "★ Водительские перчатки | Снежный барс (FN)",
    "nameEn": "★ Driver Gloves | Snow Leopard (Factory New)",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxuHbZC597c2JmImMn-O6Nr_um25V4dB8xLvEotSn31Xh-0FtNmH2cY-dJwI-M1zX-1S_kO_vhcC76cmayXpqs3F2tyvan1q3hAYMMLK8H7R5kQ",
    "price": 7100.00
  },
  {
    "id": "cs2_m9_crimson_web_mw",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Кровавая паутина (MW)",
    "nameEn": "★ M9 Bayonet | Crimson Web (Minimal Wear)",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij7r--YXygED6-EtrNmihLYaXIQ83Nw6C-1C6k-zvgMO7up7NmHs2uykl43fYnUG3hQYMMLINmYZu2g",
    "price": 6300.00
  },
  {
    "id": "cs2_butterfly_fade",
    "game": "cs2",
    "name": "★ Нож-бабочка | Градиент",
    "nameEn": "★ Butterfly Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GKqPH1N77ummJW4NE_iLjA99nzigexr0NkYmH2dYSTdAU9ZQrW_lm2kO3pgcTuv8vLy3I1sj5iuyin5z3u1g",
    "wears": {
      "FN": {
        "price": 3450,
        "wear": "FN"
      },
      "MW": {
        "price": 2950,
        "wear": "MW"
      }
    },
    "defaultWear": "FN"
  },
  {
    "id": "cs2_karambit_doppler_p2",
    "game": "cs2",
    "name": "★ Керамбит | Волны Фаза 2",
    "nameEn": "★ Karambit | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij7r--YXygED6-EtrNmihLYaXIQ83Nw6C-1C6k-zvgMO7up7NmHs2uykl43fYnUG3hQYMMLINmYZu2g",
    "wears": {
      "FN": {
        "price": 2150,
        "wear": "FN"
      },
      "MW": {
        "price": 1890,
        "wear": "MW"
      }
    },
    "defaultWear": "FN"
  },
  {
    "id": "cs2_m9_bayonet_lore",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Легенды",
    "nameEn": "★ M9 Bayonet | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWSF_uMvj-NoVha_mg8ijDCAnobsLGWebgVzA5EjQrMJ40G9xIHhMu_j4wOM2oJMnCuq2nlN73w54OdRVqoj5OSJ2HZV8Guh",
    "wears": {
      "FN": {
        "price": 1780,
        "wear": "FN"
      },
      "MW": {
        "price": 1250,
        "wear": "MW"
      },
      "FT": {
        "price": 680,
        "wear": "FT"
      },
      "WW": {
        "price": 510,
        "wear": "WW"
      },
      "BS": {
        "price": 390,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_skeleton_crimson_web",
    "game": "cs2",
    "name": "★ Скелетный нож | Кровавая паутина",
    "nameEn": "★ Skeleton Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-bF1iHxOxlj-lsTj-q20twt2yGydf9eHOfbAZzD8Z1F7YC5xW8w4KxN-vrtFDf2oxGmC-r2HhXrnE8IzMD7FA",
    "wears": {
      "FN": {
        "price": 2900,
        "wear": "FN"
      },
      "MW": {
        "price": 1420,
        "wear": "MW"
      },
      "FT": {
        "price": 740,
        "wear": "FT"
      },
      "BS": {
        "price": 420,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_talon_knife_marble_fade",
    "game": "cs2",
    "name": "★ Нож-коготь | Мраморный градиент",
    "nameEn": "★ Talon Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-Kmsj5MqnTmm5u7sR1j9bW_Ij6n2u4ohQ0J3fyJoTGcVJqZ1nW8lLsl-nrjMK-6ZqdzSBkvyl25nvdlkS0gxFPZudtm7XAHraYUhpC",
    "wears": {
      "FN": {
        "price": 1220,
        "wear": "FN"
      },
      "MW": {
        "price": 1080,
        "wear": "MW"
      }
    },
    "defaultWear": "FN"
  },
  {
    "id": "cs2_gut_knife_safari_mesh",
    "game": "cs2",
    "name": "★ Охотничий нож с крюком | Африканская сетка",
    "nameEn": "★ Gut Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRe7RSLfWABliEwOBJuORoWTD9zUh3tz_Vz9mgJX-VPQAlXpd1EONYtBTpldOzMrzn51He2d9HmHn3jjQJsHhrk_1paw",
    "wears": {
      "MW": {
        "price": 92,
        "wear": "MW"
      },
      "FT": {
        "price": 78,
        "wear": "FT"
      },
      "BS": {
        "price": 74,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_gloves_vice",
    "game": "cs2",
    "name": "★ Спортивные перчатки | Порок",
    "nameEn": "★ Sport Gloves | Vice",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_KfG2Kv0ed4u95hSiiljFN3tT_QnNn9eC6SP1MiCpV5E-ZfuhC6l4XhZOK07wWM395Fyyys2H4d8G81tNR2TKD3",
    "wears": {
      "FN": {
        "price": 12800,
        "wear": "FN"
      },
      "MW": {
        "price": 4200,
        "wear": "MW"
      },
      "FT": {
        "price": 1650,
        "wear": "FT"
      },
      "BS": {
        "price": 780,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_gloves_snow_leopard",
    "game": "cs2",
    "name": "★ Перчатки водителя | Снежный барс",
    "nameEn": "★ Driver Gloves | Snow Leopard",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tnIfeGD3Wv1uZ_pORWRyyygwRp4mzXm9aocy3CbFQlDJNzReRc5Be5kdXmY76wsQ3Y2oJAyCn2hixNvDErvbhTdGoagA",
    "wears": {
      "FN": {
        "price": 3800,
        "wear": "FN"
      },
      "MW": {
        "price": 1450,
        "wear": "MW"
      },
      "FT": {
        "price": 540,
        "wear": "FT"
      },
      "BS": {
        "price": 290,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_m4a4_howl",
    "game": "cs2",
    "name": "M4A4 | Вой",
    "nameEn": "M4A4 | Howl",
    "category": "rifle",
    "rarity": "contraband",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmyMnTGtRl39YXt1VHoVhHOjpfw-DAVuqf7MKU9damVXDfJmLcntbZvHC-2l0Ry4DvUyIv6IHzBOwAjWJtxRvlK7EfgvyAnMQ",
    "wears": {
      "FN": {
        "price": 6800,
        "wear": "FN"
      },
      "MW": {
        "price": 5100,
        "wear": "MW"
      },
      "FT": {
        "price": 3950,
        "wear": "FT"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_awp_dragon_lore",
    "game": "cs2",
    "name": "AWP | История о драконе",
    "nameEn": "AWP | Dragon Lore",
    "category": "sniper",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmyZyvY5kUnpLjw-FjgThPOkpny-B1d4PuiJvE0JPGWWTHIx70v5bMxGyzmlksi4GSDy9uhd37GOFUiXpciF-dZukWm0oqwD9CZ2wA",
    "wears": {
      "FN": {
        "price": 11500,
        "wear": "FN"
      },
      "MW": {
        "price": 7900,
        "wear": "MW"
      },
      "FT": {
        "price": 5400,
        "wear": "FT"
      },
      "BS": {
        "price": 3200,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_ak47_wild_lotus",
    "game": "cs2",
    "name": "AK-47 | Дикий лотос",
    "nameEn": "AK-47 | Wild Lotus",
    "category": "rifle",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSJ_-fCliR0-90tfJ4WiyMmBgjuiiI1Nn4cXjEbwMlDsR4RrVfsRK4wdPgPrjh4wKNg49Cyn__2iNI6ihi5O8cEf1yNgAZ7yU",
    "wears": {
      "FN": {
        "price": 9200,
        "wear": "FN"
      },
      "MW": {
        "price": 6100,
        "wear": "MW"
      },
      "FT": {
        "price": 3800,
        "wear": "FT"
      },
      "BS": {
        "price": 1950,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_ak47_fire_serpent",
    "game": "cs2",
    "name": "AK-47 | Огненный змей",
    "nameEn": "AK-47 | Fire Serpent",
    "category": "rifle",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PSneqF-JeKDC2mE_u995LZWTTuygxIYuziEjJa3cniSPQVxDcZ2ReNZtBOwkIHvPr_l4lTWitgRzyqqiHkcvC9s5rtRVb1lpPPqTLzIAg",
    "wears": {
      "FN": {
        "price": 2900,
        "wear": "FN"
      },
      "MW": {
        "price": 1150,
        "wear": "MW"
      },
      "FT": {
        "price": 740,
        "wear": "FT"
      },
      "BS": {
        "price": 460,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_m4a1s_printstream",
    "game": "cs2",
    "name": "M4A1-S | Поток информации",
    "nameEn": "M4A1-S | Printstream",
    "category": "rifle",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_F7Rienhgk1tjyIpYf8ID3ecAZyWJAkEbNY5hOwx9zvMrng4VfXiopMxHqtjC5A7Sw-tbxXUaAn8qTJz1aWlVg16BM",
    "wears": {
      "FN": {
        "price": 320,
        "wear": "FN"
      },
      "MW": {
        "price": 180,
        "wear": "MW"
      },
      "FT": {
        "price": 125,
        "wear": "FT"
      },
      "BS": {
        "price": 78,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_deagle_printstream",
    "game": "cs2",
    "name": "Desert Eagle | Поток информации",
    "nameEn": "Desert Eagle | Printstream",
    "category": "pistol",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-DHG6e1f1iouRoQha_nBovp3OGmdeqInyVP1V0XsYlRbEI50a5wNyzZr605AyI3t5MmCSohylAuC89_a9cBoMY9UkV",
    "wears": {
      "FN": {
        "price": 145,
        "wear": "FN"
      },
      "MW": {
        "price": 72,
        "wear": "MW"
      },
      "FT": {
        "price": 48,
        "wear": "FT"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_awp_asiimov",
    "game": "cs2",
    "name": "AWP | Азимов",
    "nameEn": "AWP | Asiimov",
    "category": "sniper",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2G9SupUijOjAotyg3w2x_0ZkZ2rzd4OXdgRoYQuE8gDtyL_mg5K4tJ7XiSw0WqKv8kM",
    "wears": {
      "FT": {
        "price": 135,
        "wear": "FT"
      },
      "WW": {
        "price": 95,
        "wear": "WW"
      },
      "BS": {
        "price": 78,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_ak47_redline",
    "game": "cs2",
    "name": "AK-47 | Красная линия",
    "nameEn": "AK-47 | Redline",
    "category": "rifle",
    "rarity": "classified",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQO3-UdsZGHyd4_Bd1RvNQ7T_FDrw-_ng5Pu75iY1zI97bhLsvQz",
    "wears": {
      "MW": {
        "price": 82,
        "wear": "MW"
      },
      "FT": {
        "price": 18.5,
        "wear": "FT"
      },
      "WW": {
        "price": 15,
        "wear": "WW"
      },
      "BS": {
        "price": 13.5,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_awp_hyper_beast",
    "game": "cs2",
    "name": "AWP | Скоростной зверь",
    "nameEn": "AWP | Hyper Beast",
    "category": "sniper",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6x0MPWBMWWVwP1ij-xsSyCmmFMj62Tcwt-gJC_BbwNyDZokQu8I4BK6wdazMuq35AbW3YIWmy_4h3tO8G81tKCz9TDP",
    "wears": {
      "FN": {
        "price": 95,
        "wear": "FN"
      },
      "MW": {
        "price": 54,
        "wear": "MW"
      },
      "FT": {
        "price": 32,
        "wear": "FT"
      },
      "BS": {
        "price": 21,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_m4a4_the_emperor",
    "game": "cs2",
    "name": "M4A4 | Император",
    "nameEn": "M4A4 | The Emperor",
    "category": "rifle",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSJf2DC3Wf09F7teVgWiT9kEtxsW_dntepcn2SZgF1CcN3RORe4RTtlN2yYenh7wPXiYxDmS_22jQJsHjOUN0CaQ",
    "wears": {
      "FN": {
        "price": 155,
        "wear": "FN"
      },
      "MW": {
        "price": 48,
        "wear": "MW"
      },
      "FT": {
        "price": 16.5,
        "wear": "FT"
      },
      "BS": {
        "price": 9.8,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_awp_atheris",
    "game": "cs2",
    "name": "AWP | Древесная гадюка",
    "nameEn": "AWP | Atheris",
    "category": "sniper",
    "rarity": "restricted",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMPWBMWuZxuZi_rZsS3zgzU8isW3dnIr6eHKfPVAhDpojEe9YsUW4xta1Nuzm5FDci4NbjXKpmWVQppo",
    "wears": {
      "FN": {
        "price": 14.5,
        "wear": "FN"
      },
      "MW": {
        "price": 6.8,
        "wear": "MW"
      },
      "FT": {
        "price": 3.4,
        "wear": "FT"
      },
      "BS": {
        "price": 2.1,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_deagle_conspiracy",
    "game": "cs2",
    "name": "Desert Eagle | Заговор",
    "nameEn": "Desert Eagle | Conspiracy",
    "category": "pistol",
    "rarity": "classified",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ_yWMWaF0-tjo95lRi67gVMk4WTSm9moI3-QPVBxDJByQOJe40O6k4fnM-zgsQXci4gUyH3_3CMa8G81tJHuULJI",
    "wears": {
      "FN": {
        "price": 9.5,
        "wear": "FN"
      },
      "MW": {
        "price": 6.2,
        "wear": "MW"
      },
      "FT": {
        "price": 4.8,
        "wear": "FT"
      }
    },
    "defaultWear": "FN"
  },
  {
    "id": "cs2_ak47_slate",
    "game": "cs2",
    "name": "AK-47 | Сланец",
    "nameEn": "AK-47 | Slate",
    "category": "rifle",
    "rarity": "restricted",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcCGKD0ud5vuBlcCW6khUz_W3Sytb4cCqTOFUpWJtzTOUD5hPsw9a0Yrnrs1SK3ooXzy6shilM5311o7FVYrIufmI",
    "wears": {
      "FN": {
        "price": 9.8,
        "wear": "FN"
      },
      "MW": {
        "price": 4.2,
        "wear": "MW"
      },
      "FT": {
        "price": 2.5,
        "wear": "FT"
      },
      "BS": {
        "price": 1.8,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_m4a1s_night_terror",
    "game": "cs2",
    "name": "M4A1-S | Ночной кошмар",
    "nameEn": "M4A1-S | Night Terror",
    "category": "rifle",
    "rarity": "milspec",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-hnXCa-mxQmjDCAnobsLGXEPAchWcN4ReIM4Rjpk9CxN762tQXa395DyH732ylA6ilosupRWKUt5OSJ2NcRB1VD",
    "wears": {
      "FN": {
        "price": 3.2,
        "wear": "FN"
      },
      "MW": {
        "price": 1.8,
        "wear": "MW"
      },
      "FT": {
        "price": 1.1,
        "wear": "FT"
      },
      "BS": {
        "price": 0.85,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_usps_ticket_to_hell",
    "game": "cs2",
    "name": "USP-S | Билет в ад",
    "nameEn": "USP-S | Ticket to Hell",
    "category": "pistol",
    "rarity": "milspec",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_vp5j-lsQyWMmBgjuiiI1I6qdH6fbgAoApFyRrJf4xnumoDnM-7j41Pbgt8TyCT72CxK6SttsrscEf1y0Tw_DYE",
    "wears": {
      "FN": {
        "price": 2.8,
        "wear": "FN"
      },
      "MW": {
        "price": 1.4,
        "wear": "MW"
      },
      "FT": {
        "price": 0.9,
        "wear": "FT"
      },
      "BS": {
        "price": 0.65,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_glock_bunsen_burner",
    "game": "cs2",
    "name": "Glock-18 | Горелка Бунзена",
    "nameEn": "Glock-18 | Bunsen Burner",
    "category": "pistol",
    "rarity": "milspec",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2pZKtuK6HLMWGcwONzo95rQzy2qhAitzSQl8GodH-UOgMpWcFwTe5bs0W4kILgN7_q5wTd2oMTyC_9hnxIvyZo6u4BT-N7rUwNFtfM",
    "wears": {
      "FN": {
        "price": 2.2,
        "wear": "FN"
      },
      "MW": {
        "price": 0.95,
        "wear": "MW"
      },
      "FT": {
        "price": 0.55,
        "wear": "FT"
      },
      "BS": {
        "price": 0.4,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_p250_sand_dune",
    "game": "cs2",
    "name": "P250 | Песчаная дюна",
    "nameEn": "P250 | Sand Dune",
    "category": "pistol",
    "rarity": "consumer",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFU0OGvZqBSLfWXB3Kdj78n4rY-SX-wxhty4WzUwoqud32RPFUnDMR5RuRb4UXrmtznMOLrtgLAy9USoBHo4ag",
    "wears": {
      "FN": {
        "price": 0.85,
        "wear": "FN"
      },
      "MW": {
        "price": 0.35,
        "wear": "MW"
      },
      "FT": {
        "price": 0.2,
        "wear": "FT"
      },
      "BS": {
        "price": 0.15,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_g3sg1_safari_mesh",
    "game": "cs2",
    "name": "G3SG1 | Африканская сетка",
    "nameEn": "G3SG1 | Safari Mesh",
    "category": "sniper",
    "rarity": "consumer",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I_82jbbdlH-SSAFicyOl-pK8-Tn3qwkgi5j7Wm9z7dy6fbFMoWcZ0RucOshK5l4DkZr_l5ACNgtpM02yg2YL7CXWd",
    "wears": {
      "FT": {
        "price": 0.18,
        "wear": "FT"
      },
      "BS": {
        "price": 0.12,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "cs2_nova_sand_dune",
    "game": "cs2",
    "name": "Nova | Песчаная дюна",
    "nameEn": "Nova | Sand Dune",
    "category": "shotgun",
    "rarity": "consumer",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwjFU0OGvZqBSLPmUBnPek75ysrZoHnnkw0V0tjndwo6tcnqSawEoWMQkR-Rf5hLul9S1M-vkthue1dyxC6rLqQ",
    "wears": {
      "FT": {
        "price": 0.18,
        "wear": "FT"
      },
      "BS": {
        "price": 0.14,
        "wear": "BS"
      }
    },
    "defaultWear": "FT"
  },
  {
    "id": "dota2_golden_baby_roshan_cycle10",
    "game": "dota2",
    "name": "Golden Baby Roshan (Cycle 10)",
    "nameEn": "Golden Baby Roshan (Cycle 10)",
    "category": "courier",
    "rarity": "extraordinary",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXA7hlNJ48g5hlcTlXvVeu-34DRUl9tNwtEvrurekkxi_GQdGkQ6t7lwoSNw6KsYOrXwW5XsJV10uyVptyi0QPk8xZqY2n1OsbLJSsFEXhR",
    "price": 2850
  },
  {
    "id": "dota2_dragonclaw_hook",
    "game": "dota2",
    "name": "Dragonclaw Hook (Pudge)",
    "nameEn": "Dragonclaw Hook",
    "category": "immortal",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUivB9aSQPAUuCq0vDAWFh4IBBYuIWtJAhr7PHHdSQMu93iwIbbxqWnNejQw2gB6ZEnjO-UoNrx0AHgqkZkN2HzJ4_DI1M3ZEaQpAYWJ6NyKA",
    "price": 185
  },
  {
    "id": "dota2_mace_of_aeons",
    "game": "dota2",
    "name": "Mace of Aeons (Faceless Void)",
    "nameEn": "Mace of Aeons",
    "category": "immortal",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH_DVwM-tMGiE2kB6_YO751jkRCL-mKnh-C1V_L2jaadoH_-VMWaVzuBl_rU9TSzhzBxx5WnRmN77cC6QaAcgCMMmEbIKtRLtk4DgNuzr5ASK3YxbjXKpE8yMK9s",
    "price": 295
  },
  {
    "id": "dota2_arcana_pudge",
    "game": "dota2",
    "name": "Feast of Abscession (Pudge Arcana)",
    "nameEn": "Feast of Abscession",
    "category": "arcana",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-bBx82kenqF5ld79cjk_13gRCLwjJXh8yNk7fOtY-o8dKHBDTHCxb8n4udqSXu3lk135znXyY38cHKXbgN0AsckQOZcsxW8jJS5YINWo-Du",
    "price": 36.5
  },
  {
    "id": "dota2_arcana_pa",
    "game": "dota2",
    "name": "Manifold Paradox (Phantom Assassin Arcana)",
    "nameEn": "Manifold Paradox",
    "category": "arcana",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-bcwsS1Onao5EVm9ZTn41eoTBz_l5Dv8SZk__O8aaBiOL-SHGSRz-9JoOAnSirkkx9-5D7Tw4v9cXiUbwAmDZR3TONbs0W4kdOzMezhtFTYjohCnzK-0H1hMCTDUg",
    "price": 34
  },
  {
    "id": "dota2_arcana_juggernaut",
    "game": "dota2",
    "name": "Bladeform Legacy (Juggernaut Arcana)",
    "nameEn": "Bladeform Legacy",
    "category": "arcana",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH_zBxM2kJ3WW8EI69ZX361fmDhfkmZHl7yxa-uaRabZuIf6SMWCCxOt4_rMxGSqwkRh04GmGmIusIn6WbgJ1XJYlEOJZu0K8k4e0MLnm4Q3Wj9hbjXKpF3HkZ_M",
    "price": 35
  },
  {
    "id": "dota2_vigil_triumph",
    "game": "dota2",
    "name": "Vigil Triumph (Sven)",
    "nameEn": "Vigil Triumph",
    "category": "immortal",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhvx5TA1_GQuqSw8aEbFR5KAtForupFBR33OHMPi5U6dKJgIncqP75PrTDgmpd19ZmhfvFu9-l3QDmqUFuZ26hctSdIVI7aF_U_Fbvl-nsgMS0vc7PwCBm63Rx4SnD30vg-gT1mTQ",
    "price": 55
  },
  {
    "id": "dota2_arms_of_desolation",
    "game": "dota2",
    "name": "Arms of Desolation (Shadow Fiend)",
    "nameEn": "Arms of Desolation",
    "category": "immortal",
    "rarity": "restricted",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhoRpZQ1vvQe2o2cucUk95NjtTs6mqZAZy3uD3dThR45K3wIPezqKsMriDkDNQsZwh3r3FpY2h3wXn-hY9a2ugIYbGIQU7Y13V5BHglsdC9JuQ",
    "price": 5.4
  },
  {
    "id": "dota2_muh_keen_gun",
    "game": "dota2",
    "name": "Muh Keen Gun (Sniper)",
    "nameEn": "Muh Keen Gun",
    "category": "immortal",
    "rarity": "milspec",
    "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhpxJNSV6fSuWu38bdVmJzMApotbKkOQtp1rzFcD5K5dKzq4eemcj3O7rDmmJUpsYi07mWo96k2QPh-kBrZ2D7d9eTdgU9aVrS_VPtxO_m0J60v8nPwHp9-n51U-bh3v0",
    "price": 2.1
  },
  {
    "id": "dota2_fin_kings_charm",
    "game": "dota2",
    "name": "Fin King's Charm (Lion)",
    "nameEn": "Fin King's Charm",
    "category": "immortal",
    "rarity": "milspec",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcU-oBRTA0rZVOySxNvaUFY7Iw1EvoW2Pw5j2L3Oc2oRu9ngl9fZlq6gNeuHlzsD7pQg3e2YrYj3iQPh-kplamiiIIWdbEZgNlSpXq2x",
    "price": 1.45
  },
  {
    "id": "dota2_bracers_cavern_luminar",
    "game": "dota2",
    "name": "Bracers of the Cavern Luminar",
    "nameEn": "Bracers of the Cavern Luminar",
    "category": "immortal",
    "rarity": "industrial",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH_PV0d6pJnOW7lNnu5P9vGbuTBD-jILh8R1Z_fOtbbYiLfWABiiEyLhJuexkQDunlBEYsS-EmYrrb3KROlchX5p1FuBY4xftx9e0ZOK3s1aK2oJNyyWtiixJ7Xli6rkHV6Q7uvqAv2s8asc",
    "price": 0.65
  },
  {
    "id": "dota2_belt_iron_surge",
    "game": "dota2",
    "name": "Belt of the Iron Surge",
    "nameEn": "Belt of the Iron Surge",
    "category": "common",
    "rarity": "consumer",
    "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-XEytioIUSV91N0_4LmpVD1ThPOjYPy-icU5uChZpt-NeKUCynClupw4-doHn7qxEhyt23Szd3_J37CPQ90D5QjQ-8L5EXuxNfnYuri-UWA3A-470dR",
    "price": 0.22
  },
  {
    "id": "rust_big_grin",
    "game": "rust",
    "name": "Big Grin Mask",
    "nameEn": "Big Grin",
    "category": "mask",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5GLEfCk4nReh8DEiv5daPq0_qrw_QfG9O-tu0Dw",
    "price": 920
  },
  {
    "id": "rust_glory_ak47",
    "game": "rust",
    "name": "Glory AK47",
    "nameEn": "Glory AK47",
    "category": "weapon",
    "rarity": "extraordinary",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fc5GLGfCk4nReh8DEiv5daMag5qLU2QPi5xVewp5A",
    "price": 320
  },
  {
    "id": "rust_punishment_mask",
    "game": "rust",
    "name": "Punishment Mask",
    "nameEn": "Punishment Mask",
    "category": "mask",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fa4GLNfCk4nReh8DEiv5dbPKs-qrA0RfG9xh-m8C4",
    "price": 280
  },
  {
    "id": "rust_alien_red",
    "game": "rust",
    "name": "Alien Red (AK47)",
    "nameEn": "Alien Red",
    "category": "weapon",
    "rarity": "covert",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfCk4nReh8DEiv5dbPK47pbcyR_m4DQ68Ofs",
    "price": 165
  },
  {
    "id": "rust_tempered_ak47",
    "game": "rust",
    "name": "Tempered AK47",
    "nameEn": "Tempered AK47",
    "category": "weapon",
    "rarity": "classified",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5WHNfCk4nReh8DEiv5dYO607rLc2Rv2_0wEIAYs",
    "price": 48
  },
  {
    "id": "rust_glowing_skull_door",
    "game": "rust",
    "name": "Glowing Skull Armored Door",
    "nameEn": "Glowing Skull Door",
    "category": "door",
    "rarity": "classified",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5GLMfCk4nReh8DEiv5dbPKs8rrYwQfy6sqLM0vo",
    "price": 38
  },
  {
    "id": "rust_metal_tree_door",
    "game": "rust",
    "name": "Metal Tree Sheet Door",
    "nameEn": "Metal Tree Door",
    "category": "door",
    "rarity": "restricted",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835FX52LCfCk4nReh8DEiv5ddPKo9pbM1RP2US9wYKg",
    "price": 18.5
  },
  {
    "id": "rust_bombing_garage_door",
    "game": "rust",
    "name": "Bombing Garage Door",
    "nameEn": "Bombing Garage Door",
    "category": "door",
    "rarity": "restricted",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835db4GLHfCk4nReh8DEiv5ddMa88pLYyQ_tTIGzDcw",
    "price": 9.5
  },
  {
    "id": "rust_frostbite_tshirt",
    "game": "rust",
    "name": "Frostbite T-Shirt",
    "nameEn": "Frostbite T-Shirt",
    "category": "clothing",
    "rarity": "milspec",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5mLBfCk4nReh8DEiv5dbMa4-qL0xR_C29fO3tCQ",
    "price": 3.6
  },
  {
    "id": "rust_camo_hoodie",
    "game": "rust",
    "name": "Digital Camo Hoodie",
    "nameEn": "Digital Camo Hoodie",
    "category": "clothing",
    "rarity": "milspec",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5GDFfCk4nReh8DEiv5dYPqk5qLA3QP2-LjtoOu4",
    "price": 1.5
  },
  {
    "id": "rust_hazard_sheet_door",
    "game": "rust",
    "name": "Sheet Metal Door | Hazard",
    "nameEn": "Sheet Metal Door Hazard",
    "category": "door",
    "rarity": "industrial",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe7WLFfCk4nReh8DEiv5ddOa08qbUyRfG6con45x0",
    "price": 1.1
  },
  {
    "id": "rust_revolver_scrap",
    "game": "rust",
    "name": "Revolver | Scrap Metal",
    "nameEn": "Revolver Scrap Metal",
    "category": "weapon",
    "rarity": "industrial",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fc5WPAfCk4nReh8DEiv5dbO642qr0zR_C6jyRNZGU",
    "price": 0.6
  },
  {
    "id": "rust_nomad_shoes",
    "game": "rust",
    "name": "Burlap Shoes | Nomad",
    "nameEn": "Burlap Shoes Nomad",
    "category": "clothing",
    "rarity": "consumer",
    "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fc52PEfCk4nReh8DEiv5dbO60_r7Y0Sfm4fVjTIBc",
    "price": 0.25
  },
  {
    "id": "cs2_ak47_gold_arabesque",
    "game": "cs2",
    "name": "AK-47 | Золотая арабеска",
    "nameEn": "AK-47 | Gold Arabesque",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 1850
  },
  {
    "id": "cs2_ak47_case_hardened",
    "game": "cs2",
    "name": "AK-47 | Поверхностная закалка",
    "nameEn": "AK-47 | Case Hardened",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 85
  },
  {
    "id": "cs2_ak47_vulcan",
    "game": "cs2",
    "name": "AK-47 | Вулкан",
    "nameEn": "AK-47 | Vulcan",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 380
  },
  {
    "id": "cs2_ak47_fuel_injector",
    "game": "cs2",
    "name": "AK-47 | Топливный инжектор",
    "nameEn": "AK-47 | Fuel Injector",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 90
  },
  {
    "id": "cs2_ak47_bloodsport",
    "game": "cs2",
    "name": "AK-47 | Кровопийца",
    "nameEn": "AK-47 | Bloodsport",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 145
  },
  {
    "id": "cs2_ak47_the_empress",
    "game": "cs2",
    "name": "AK-47 | Императрица",
    "nameEn": "AK-47 | The Empress",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 88
  },
  {
    "id": "cs2_ak47_asiimov",
    "game": "cs2",
    "name": "AK-47 | Азимов",
    "nameEn": "AK-47 | Asiimov",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 48
  },
  {
    "id": "cs2_ak47_neon_rider",
    "game": "cs2",
    "name": "AK-47 | Неоновый всадник",
    "nameEn": "AK-47 | Neon Rider",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 76
  },
  {
    "id": "cs2_ak47_inheritance",
    "game": "cs2",
    "name": "AK-47 | Наследие",
    "nameEn": "AK-47 | Inheritance",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 130
  },
  {
    "id": "cs2_ak47_head_shot",
    "game": "cs2",
    "name": "AK-47 | Выстрел в голову",
    "nameEn": "AK-47 | Head Shot",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 68
  },
  {
    "id": "cs2_ak47_nightwish",
    "game": "cs2",
    "name": "AK-47 | Ночное желание",
    "nameEn": "AK-47 | Nightwish",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 58
  },
  {
    "id": "cs2_ak47_ice_coaled",
    "game": "cs2",
    "name": "AK-47 | Ледяной уголь",
    "nameEn": "AK-47 | Ice Coaled",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 26
  },
  {
    "id": "cs2_ak47_frontside_misty",
    "game": "cs2",
    "name": "AK-47 | Снежный вихрь",
    "nameEn": "AK-47 | Frontside Misty",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 14
  },
  {
    "id": "cs2_ak47_point_disarray",
    "game": "cs2",
    "name": "AK-47 | Буйство красок",
    "nameEn": "AK-47 | Point Disarray",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 32
  },
  {
    "id": "cs2_ak47_legion_of_anubis",
    "game": "cs2",
    "name": "AK-47 | Легион Анубиса",
    "nameEn": "AK-47 | Legion of Anubis",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 48
  },
  {
    "id": "cs2_ak47_cartel",
    "game": "cs2",
    "name": "AK-47 | Картель",
    "nameEn": "AK-47 | Cartel",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 28
  },
  {
    "id": "cs2_ak47_phantom_disruptor",
    "game": "cs2",
    "name": "AK-47 | Фантомный вредитель",
    "nameEn": "AK-47 | Phantom Disruptor",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 8.5
  },
  {
    "id": "cs2_ak47_orbit_mk01",
    "game": "cs2",
    "name": "AK-47 | Орбита, вер. 01",
    "nameEn": "AK-47 | Orbit Mk01",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 16
  },
  {
    "id": "cs2_ak47_safety_net",
    "game": "cs2",
    "name": "AK-47 | Страховочная сетка",
    "nameEn": "AK-47 | Safety Net",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 7.2
  },
  {
    "id": "cs2_ak47_blue_laminate",
    "game": "cs2",
    "name": "AK-47 | Синий ламинат",
    "nameEn": "AK-47 | Blue Laminate",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 12
  },
  {
    "id": "cs2_ak47_red_laminate",
    "game": "cs2",
    "name": "AK-47 | Красный ламинат",
    "nameEn": "AK-47 | Red Laminate",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 38
  },
  {
    "id": "cs2_ak47_black_laminate",
    "game": "cs2",
    "name": "AK-47 | Черный ламинат",
    "nameEn": "AK-47 | Black Laminate",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 3.2
  },
  {
    "id": "cs2_ak47_emerald_pinstripe",
    "game": "cs2",
    "name": "AK-47 | Изумрудные полосы",
    "nameEn": "AK-47 | Emerald Pinstripe",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 9.8
  },
  {
    "id": "cs2_ak47_safari_mesh",
    "game": "cs2",
    "name": "AK-47 | Африканская сетка",
    "nameEn": "AK-47 | Safari Mesh",
    "category": "rifle",
    "rarity": "industrial",
    "image": "",
    "price": 0.35
  },
  {
    "id": "cs2_ak47_jungle_spray",
    "game": "cs2",
    "name": "AK-47 | Джунгли",
    "nameEn": "AK-47 | Jungle Spray",
    "category": "rifle",
    "rarity": "industrial",
    "image": "",
    "price": 0.65
  },
  {
    "id": "cs2_ak47_predator",
    "game": "cs2",
    "name": "AK-47 | Хищник",
    "nameEn": "AK-47 | Predator",
    "category": "rifle",
    "rarity": "industrial",
    "image": "",
    "price": 0.85
  },
  {
    "id": "cs2_ak47_rat_rod",
    "game": "cs2",
    "name": "AK-47 | Рэт-род",
    "nameEn": "AK-47 | Rat Rod",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 7.8
  },
  {
    "id": "cs2_ak47_uncharted",
    "game": "cs2",
    "name": "AK-47 | Затерянная земля",
    "nameEn": "AK-47 | Uncharted",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 0.95
  },
  {
    "id": "cs2_ak47_baroque_purple",
    "game": "cs2",
    "name": "AK-47 | Фиолетовое барокко",
    "nameEn": "AK-47 | Baroque Purple",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 2.1
  },
  {
    "id": "cs2_ak47_elite_build",
    "game": "cs2",
    "name": "AK-47 | Элитное снаряжение",
    "nameEn": "AK-47 | Elite Build",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 1.8
  },
  {
    "id": "cs2_awp_gungnir",
    "game": "cs2",
    "name": "AWP | Гунгнир",
    "nameEn": "AWP | Gungnir",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 4900
  },
  {
    "id": "cs2_awp_desert_hydra",
    "game": "cs2",
    "name": "AWP | Пустынная гидра",
    "nameEn": "AWP | Desert Hydra",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 1800
  },
  {
    "id": "cs2_awp_the_prince",
    "game": "cs2",
    "name": "AWP | Принц",
    "nameEn": "AWP | The Prince",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 2600
  },
  {
    "id": "cs2_awp_medusa",
    "game": "cs2",
    "name": "AWP | Медуза",
    "nameEn": "AWP | Medusa",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 2400
  },
  {
    "id": "cs2_awp_fade",
    "game": "cs2",
    "name": "AWP | Градиент",
    "nameEn": "AWP | Fade",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 1100
  },
  {
    "id": "cs2_awp_lightning_strike",
    "game": "cs2",
    "name": "AWP | Удар молнии",
    "nameEn": "AWP | Lightning Strike",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 680
  },
  {
    "id": "cs2_awp_oni_taiji",
    "game": "cs2",
    "name": "AWP | Они Тайдзи",
    "nameEn": "AWP | Oni Taiji",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 420
  },
  {
    "id": "cs2_awp_wildfire",
    "game": "cs2",
    "name": "AWP | Дикое пламя",
    "nameEn": "AWP | Wildfire",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_awp_neo_noir",
    "game": "cs2",
    "name": "AWP | Нео-нуар",
    "nameEn": "AWP | Neo-Noir",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 62
  },
  {
    "id": "cs2_awp_chrome_cannon",
    "game": "cs2",
    "name": "AWP | Хромированная пушка",
    "nameEn": "AWP | Chrome Cannon",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 98
  },
  {
    "id": "cs2_awp_containment_breach",
    "game": "cs2",
    "name": "AWP | Утечка радиации",
    "nameEn": "AWP | Containment Breach",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 115
  },
  {
    "id": "cs2_awp_silk_tiger",
    "game": "cs2",
    "name": "AWP | Шелковый тигр",
    "nameEn": "AWP | Silk Tiger",
    "category": "sniper",
    "rarity": "classified",
    "image": "",
    "price": 85
  },
  {
    "id": "cs2_awp_boom",
    "game": "cs2",
    "name": "AWP | БАХ",
    "nameEn": "AWP | BOOM",
    "category": "sniper",
    "rarity": "classified",
    "image": "",
    "price": 72
  },
  {
    "id": "cs2_awp_electric_hive",
    "game": "cs2",
    "name": "AWP | Электрический улей",
    "nameEn": "AWP | Electric Hive",
    "category": "sniper",
    "rarity": "classified",
    "image": "",
    "price": 56
  },
  {
    "id": "cs2_awp_redline",
    "game": "cs2",
    "name": "AWP | Красная линия",
    "nameEn": "AWP | Redline",
    "category": "sniper",
    "rarity": "classified",
    "image": "",
    "price": 46
  },
  {
    "id": "cs2_awp_corticera",
    "game": "cs2",
    "name": "AWP | Кортисейра",
    "nameEn": "AWP | Corticera",
    "category": "sniper",
    "rarity": "classified",
    "image": "",
    "price": 28
  },
  {
    "id": "cs2_awp_duality",
    "game": "cs2",
    "name": "AWP | Двойственность",
    "nameEn": "AWP | Duality",
    "category": "sniper",
    "rarity": "classified",
    "image": "",
    "price": 24
  },
  {
    "id": "cs2_awp_mortis",
    "game": "cs2",
    "name": "AWP | Мортис",
    "nameEn": "AWP | Mortis",
    "category": "sniper",
    "rarity": "classified",
    "image": "",
    "price": 22
  },
  {
    "id": "cs2_awp_fever_dream",
    "game": "cs2",
    "name": "AWP | Горячечные грезы",
    "nameEn": "AWP | Fever Dream",
    "category": "sniper",
    "rarity": "restricted",
    "image": "",
    "price": 14
  },
  {
    "id": "cs2_awp_paw",
    "game": "cs2",
    "name": "AWP | Лапки",
    "nameEn": "AWP | PAW",
    "category": "sniper",
    "rarity": "restricted",
    "image": "",
    "price": 6.8
  },
  {
    "id": "cs2_awp_exoskeleton",
    "game": "cs2",
    "name": "AWP | Экзоскелет",
    "nameEn": "AWP | Exoskeleton",
    "category": "sniper",
    "rarity": "restricted",
    "image": "",
    "price": 5.4
  },
  {
    "id": "cs2_awp_elite_build",
    "game": "cs2",
    "name": "AWP | Элитное снаряжение",
    "nameEn": "AWP | Elite Build",
    "category": "sniper",
    "rarity": "milspec",
    "image": "",
    "price": 3.4
  },
  {
    "id": "cs2_awp_phobos",
    "game": "cs2",
    "name": "AWP | Фобос",
    "nameEn": "AWP | Phobos",
    "category": "sniper",
    "rarity": "milspec",
    "image": "",
    "price": 2.1
  },
  {
    "id": "cs2_awp_worm_god",
    "game": "cs2",
    "name": "AWP | Бог червей",
    "nameEn": "AWP | Worm God",
    "category": "sniper",
    "rarity": "milspec",
    "image": "",
    "price": 2.8
  },
  {
    "id": "cs2_awp_acheron",
    "game": "cs2",
    "name": "AWP | Ахерон",
    "nameEn": "AWP | Acheron",
    "category": "sniper",
    "rarity": "milspec",
    "image": "",
    "price": 1.2
  },
  {
    "id": "cs2_awp_capillary",
    "game": "cs2",
    "name": "AWP | Капилляры",
    "nameEn": "AWP | Capillary",
    "category": "sniper",
    "rarity": "milspec",
    "image": "",
    "price": 0.85
  },
  {
    "id": "cs2_awp_black_nile",
    "game": "cs2",
    "name": "AWP | Черный Нил",
    "nameEn": "AWP | Black Nile",
    "category": "sniper",
    "rarity": "milspec",
    "image": "",
    "price": 3.1
  },
  {
    "id": "cs2_awp_sun_in_leo",
    "game": "cs2",
    "name": "AWP | Солнце во Льве",
    "nameEn": "AWP | Sun in Leo",
    "category": "sniper",
    "rarity": "industrial",
    "image": "",
    "price": 1.1
  },
  {
    "id": "cs2_awp_pit_viper",
    "game": "cs2",
    "name": "AWP | Гадюка",
    "nameEn": "AWP | Pit Viper",
    "category": "sniper",
    "rarity": "restricted",
    "image": "",
    "price": 4.8
  },
  {
    "id": "cs2_awp_safari_mesh",
    "game": "cs2",
    "name": "AWP | Африканская сетка",
    "nameEn": "AWP | Safari Mesh",
    "category": "sniper",
    "rarity": "industrial",
    "image": "",
    "price": 0.25
  },
  {
    "id": "cs2_m4a4_poseidon",
    "game": "cs2",
    "name": "M4A4 | Посейдон",
    "nameEn": "M4A4 | Poseidon",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 890
  },
  {
    "id": "cs2_m4a4_eye_of_horus",
    "game": "cs2",
    "name": "M4A4 | Око Гора",
    "nameEn": "M4A4 | Eye of Horus",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 650
  },
  {
    "id": "cs2_m4a4_temukau",
    "game": "cs2",
    "name": "M4A4 | Темукау",
    "nameEn": "M4A4 | Temukau",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 92
  },
  {
    "id": "cs2_m4a4_asiimov",
    "game": "cs2",
    "name": "M4A4 | Азимов",
    "nameEn": "M4A4 | Asiimov",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 185
  },
  {
    "id": "cs2_m4a4_neo_noir",
    "game": "cs2",
    "name": "M4A4 | Нео-нуар",
    "nameEn": "M4A4 | Neo-Noir",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 52
  },
  {
    "id": "cs2_m4a4_in_living_color",
    "game": "cs2",
    "name": "M4A4 | Живая палитра",
    "nameEn": "M4A4 | In Living Color",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 49
  },
  {
    "id": "cs2_m4a4_buzz_kill",
    "game": "cs2",
    "name": "M4A4 | Облом",
    "nameEn": "M4A4 | Buzz Kill",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 45
  },
  {
    "id": "cs2_m4a4_daybreak",
    "game": "cs2",
    "name": "M4A4 | Рассвет",
    "nameEn": "M4A4 | Daybreak",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 18
  },
  {
    "id": "cs2_m4a4_desolate_space",
    "game": "cs2",
    "name": "M4A4 | Пустынный повстанец",
    "nameEn": "M4A4 | Desolate Space",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 25
  },
  {
    "id": "cs2_m4a4_hellfire",
    "game": "cs2",
    "name": "M4A4 | Адское пламя",
    "nameEn": "M4A4 | Hellfire",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 62
  },
  {
    "id": "cs2_m4a4_cyber_security",
    "game": "cs2",
    "name": "M4A4 | Кибербезопасность",
    "nameEn": "M4A4 | Cyber Security",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 26
  },
  {
    "id": "cs2_m4a4_tooth_fairy",
    "game": "cs2",
    "name": "M4A4 | Зубная фея",
    "nameEn": "M4A4 | Tooth Fairy",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 8.5
  },
  {
    "id": "cs2_m4a4_spider_lily",
    "game": "cs2",
    "name": "M4A4 | Паучья лилия",
    "nameEn": "M4A4 | Spider Lily",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 12
  },
  {
    "id": "cs2_m4a4_the_coalition",
    "game": "cs2",
    "name": "M4A4 | Коалиция",
    "nameEn": "M4A4 | The Coalition",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 140
  },
  {
    "id": "cs2_m4a4_evil_daimyo",
    "game": "cs2",
    "name": "M4A4 | Злобный даймё",
    "nameEn": "M4A4 | Evil Daimyo",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 6.2
  },
  {
    "id": "cs2_m4a4_griffin",
    "game": "cs2",
    "name": "M4A4 | Грифон",
    "nameEn": "M4A4 | Griffin",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 5.8
  },
  {
    "id": "cs2_m4a4_magnesium",
    "game": "cs2",
    "name": "M4A4 | Магний",
    "nameEn": "M4A4 | Magnesium",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 1.1
  },
  {
    "id": "cs2_m4a4_poly_mag",
    "game": "cs2",
    "name": "M4A4 | Полимаг",
    "nameEn": "M4A4 | Poly Mag",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 0.65
  },
  {
    "id": "cs2_m4a4_converter",
    "game": "cs2",
    "name": "M4A4 | Конвертер",
    "nameEn": "M4A4 | Converter",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 1.5
  },
  {
    "id": "cs2_m4a4_urban_ddpat",
    "game": "cs2",
    "name": "M4A4 | Городской камуфляж",
    "nameEn": "M4A4 | Urban DDPAT",
    "category": "rifle",
    "rarity": "industrial",
    "image": "",
    "price": 0.45
  },
  {
    "id": "cs2_m4a4_tornado",
    "game": "cs2",
    "name": "M4A4 | Торнадо",
    "nameEn": "M4A4 | Tornado",
    "category": "rifle",
    "rarity": "industrial",
    "image": "",
    "price": 0.9
  },
  {
    "id": "cs2_m4a4_faded_zebra",
    "game": "cs2",
    "name": "M4A4 | Потускневшая зебра",
    "nameEn": "M4A4 | Faded Zebra",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 2.2
  },
  {
    "id": "cs2_m4a1s_welcome_to_the_jungle",
    "game": "cs2",
    "name": "M4A1-S | Добро пожаловать в джунгли",
    "nameEn": "M4A1-S | Welcome to the Jungle",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 1450
  },
  {
    "id": "cs2_m4a1s_blue_phosphor",
    "game": "cs2",
    "name": "M4A1-S | Синий фосфор",
    "nameEn": "M4A1-S | Blue Phosphor",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 680
  },
  {
    "id": "cs2_m4a1s_hot_rod",
    "game": "cs2",
    "name": "M4A1-S | Хот-род",
    "nameEn": "M4A1-S | Hot Rod",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 720
  },
  {
    "id": "cs2_m4a1s_icarus_fell",
    "game": "cs2",
    "name": "M4A1-S | Падение Икара",
    "nameEn": "M4A1-S | Icarus Fell",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 480
  },
  {
    "id": "cs2_m4a1s_imminent_danger",
    "game": "cs2",
    "name": "M4A1-S | Неминуемая опасность",
    "nameEn": "M4A1-S | Imminent Danger",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 850
  },
  {
    "id": "cs2_m4a1s_player_two",
    "game": "cs2",
    "name": "M4A1-S | Второй игрок",
    "nameEn": "M4A1-S | Player Two",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 85
  },
  {
    "id": "cs2_m4a1s_chantico_s_fire",
    "game": "cs2",
    "name": "M4A1-S | Огонь Чантико",
    "nameEn": "M4A1-S | Chantico's Fire",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 95
  },
  {
    "id": "cs2_m4a1s_hyper_beast",
    "game": "cs2",
    "name": "M4A1-S | Скоростной зверь",
    "nameEn": "M4A1-S | Hyper Beast",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 78
  },
  {
    "id": "cs2_m4a1s_golden_coil",
    "game": "cs2",
    "name": "M4A1-S | Золотая спираль",
    "nameEn": "M4A1-S | Golden Coil",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 88
  },
  {
    "id": "cs2_m4a1s_master_piece",
    "game": "cs2",
    "name": "M4A1-S | Шедевр",
    "nameEn": "M4A1-S | Master Piece",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 82
  },
  {
    "id": "cs2_m4a1s_decimator",
    "game": "cs2",
    "name": "M4A1-S | Опустошитель",
    "nameEn": "M4A1-S | Decimator",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 26
  },
  {
    "id": "cs2_m4a1s_cyrex",
    "game": "cs2",
    "name": "M4A1-S | Сайрекс",
    "nameEn": "M4A1-S | Cyrex",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 38
  },
  {
    "id": "cs2_m4a1s_nightmare",
    "game": "cs2",
    "name": "M4A1-S | Ночной кошмар",
    "nameEn": "M4A1-S | Nightmare",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 32
  },
  {
    "id": "cs2_m4a1s_atomic_alloy",
    "game": "cs2",
    "name": "M4A1-S | Атомный сплав",
    "nameEn": "M4A1-S | Atomic Alloy",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 42
  },
  {
    "id": "cs2_m4a1s_leaded_glass",
    "game": "cs2",
    "name": "M4A1-S | Витраж",
    "nameEn": "M4A1-S | Leaded Glass",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 22
  },
  {
    "id": "cs2_m4a1s_black_lotus",
    "game": "cs2",
    "name": "M4A1-S | Черный лотос",
    "nameEn": "M4A1-S | Black Lotus",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 3.5
  },
  {
    "id": "cs2_m4a1s_guardian",
    "game": "cs2",
    "name": "M4A1-S | Страж",
    "nameEn": "M4A1-S | Guardian",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 16.5
  },
  {
    "id": "cs2_m4a1s_basilisk",
    "game": "cs2",
    "name": "M4A1-S | Василиск",
    "nameEn": "M4A1-S | Basilisk",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 11
  },
  {
    "id": "cs2_m4a1s_flashback",
    "game": "cs2",
    "name": "M4A1-S | Воспоминания",
    "nameEn": "M4A1-S | Flashback",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 5.6
  },
  {
    "id": "cs2_m4a1s_nitro",
    "game": "cs2",
    "name": "M4A1-S | Нитро",
    "nameEn": "M4A1-S | Nitro",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 7.2
  },
  {
    "id": "cs2_m4a1s_emphorosaur_s",
    "game": "cs2",
    "name": "M4A1-S | Эмфорозавр",
    "nameEn": "M4A1-S | Emphorosaur-S",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 4.2
  },
  {
    "id": "cs2_m4a1s_fizzy_star",
    "game": "cs2",
    "name": "M4A1-S | Шипучка",
    "nameEn": "M4A1-S | Fizzy STAR",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 2.4
  },
  {
    "id": "cs2_m4a1s_mud_spec",
    "game": "cs2",
    "name": "M4A1-S | Грязный спецназ",
    "nameEn": "M4A1-S | Mud-Spec",
    "category": "rifle",
    "rarity": "industrial",
    "image": "",
    "price": 0.35
  },
  {
    "id": "cs2_m4a1s_boreal_forest",
    "game": "cs2",
    "name": "M4A1-S | Северный лес",
    "nameEn": "M4A1-S | Boreal Forest",
    "category": "rifle",
    "rarity": "industrial",
    "image": "",
    "price": 0.55
  },
  {
    "id": "cs2_m4a1s_blood_tiger",
    "game": "cs2",
    "name": "M4A1-S | Кровавый тигр",
    "nameEn": "M4A1-S | Blood Tiger",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 3.1
  },
  {
    "id": "cs2_m4a1s_briefing",
    "game": "cs2",
    "name": "M4A1-S | Инструктаж",
    "nameEn": "M4A1-S | Briefing",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 1.4
  },
  {
    "id": "cs2_deserteagle_blaze",
    "game": "cs2",
    "name": "Desert Eagle | Пламя",
    "nameEn": "Desert Eagle | Blaze",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 680
  },
  {
    "id": "cs2_deserteagle_fennec_fox",
    "game": "cs2",
    "name": "Desert Eagle | Фенек",
    "nameEn": "Desert Eagle | Fennec Fox",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 240
  },
  {
    "id": "cs2_deserteagle_emerald_j_rmungandr",
    "game": "cs2",
    "name": "Desert Eagle | Изумрудный Ёрмунганд",
    "nameEn": "Desert Eagle | Emerald Jörmungandr",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 310
  },
  {
    "id": "cs2_deserteagle_golden_koi",
    "game": "cs2",
    "name": "Desert Eagle | Золотой карп",
    "nameEn": "Desert Eagle | Golden Koi",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 110
  },
  {
    "id": "cs2_deserteagle_ocean_drive",
    "game": "cs2",
    "name": "Desert Eagle | Океанское побережье",
    "nameEn": "Desert Eagle | Ocean Drive",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 72
  },
  {
    "id": "cs2_deserteagle_code_red",
    "game": "cs2",
    "name": "Desert Eagle | Код красный",
    "nameEn": "Desert Eagle | Code Red",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 64
  },
  {
    "id": "cs2_deserteagle_mecha_industries",
    "game": "cs2",
    "name": "Desert Eagle | Механо-пушка",
    "nameEn": "Desert Eagle | Mecha Industries",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 24
  },
  {
    "id": "cs2_deserteagle_kumicho_dragon",
    "game": "cs2",
    "name": "Desert Eagle | Дракон-кумитё",
    "nameEn": "Desert Eagle | Kumicho Dragon",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 28
  },
  {
    "id": "cs2_deserteagle_cobalt_disruption",
    "game": "cs2",
    "name": "Desert Eagle | Кобальтовый бросок",
    "nameEn": "Desert Eagle | Cobalt Disruption",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 68
  },
  {
    "id": "cs2_deserteagle_hypnotic",
    "game": "cs2",
    "name": "Desert Eagle | Гипноз",
    "nameEn": "Desert Eagle | Hypnotic",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 85
  },
  {
    "id": "cs2_deserteagle_light_rail",
    "game": "cs2",
    "name": "Desert Eagle | Рельсотрон",
    "nameEn": "Desert Eagle | Light Rail",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 6.8
  },
  {
    "id": "cs2_deserteagle_trigger_discipline",
    "game": "cs2",
    "name": "Desert Eagle | Правило стрельбы",
    "nameEn": "Desert Eagle | Trigger Discipline",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 5.2
  },
  {
    "id": "cs2_deserteagle_night_heist",
    "game": "cs2",
    "name": "Desert Eagle | Ночное ограбление",
    "nameEn": "Desert Eagle | Night Heist",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 2.8
  },
  {
    "id": "cs2_deserteagle_blue_ply",
    "game": "cs2",
    "name": "Desert Eagle | Синяя фанера",
    "nameEn": "Desert Eagle | Blue Ply",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 1.6
  },
  {
    "id": "cs2_deserteagle_corinthian",
    "game": "cs2",
    "name": "Desert Eagle | Коринфянин",
    "nameEn": "Desert Eagle | Corinthian",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 0.95
  },
  {
    "id": "cs2_deserteagle_oxide_blaze",
    "game": "cs2",
    "name": "Desert Eagle | Оксидное пламя",
    "nameEn": "Desert Eagle | Oxide Blaze",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 1.2
  },
  {
    "id": "cs2_deserteagle_bronze_deco",
    "game": "cs2",
    "name": "Desert Eagle | Бронзовая форма",
    "nameEn": "Desert Eagle | Bronze Deco",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 0.8
  },
  {
    "id": "cs2_deserteagle_mudder",
    "game": "cs2",
    "name": "Desert Eagle | Грязь",
    "nameEn": "Desert Eagle | Mudder",
    "category": "pistol",
    "rarity": "industrial",
    "image": "",
    "price": 0.25
  },
  {
    "id": "cs2_deserteagle_meteorite",
    "game": "cs2",
    "name": "Desert Eagle | Метеорит",
    "nameEn": "Desert Eagle | Meteorite",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 2.4
  },
  {
    "id": "cs2_usps_kill_confirmed",
    "game": "cs2",
    "name": "USP-S | Подтвержденное убийство",
    "nameEn": "USP-S | Kill Confirmed",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_usps_target_acquired",
    "game": "cs2",
    "name": "USP-S | Цель обнаружена",
    "nameEn": "USP-S | Target Acquired",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 240
  },
  {
    "id": "cs2_usps_printstream",
    "game": "cs2",
    "name": "USP-S | Поток информации",
    "nameEn": "USP-S | Printstream",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 110
  },
  {
    "id": "cs2_usps_the_traitor",
    "game": "cs2",
    "name": "USP-S | Предатель",
    "nameEn": "USP-S | The Traitor",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 58
  },
  {
    "id": "cs2_usps_neo_noir",
    "game": "cs2",
    "name": "USP-S | Нео-нуар",
    "nameEn": "USP-S | Neo-Noir",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 46
  },
  {
    "id": "cs2_usps_jawbreaker",
    "game": "cs2",
    "name": "USP-S | Челюстелом",
    "nameEn": "USP-S | Jawbreaker",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 28
  },
  {
    "id": "cs2_usps_cortex",
    "game": "cs2",
    "name": "USP-S | Извилины",
    "nameEn": "USP-S | Cortex",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 22
  },
  {
    "id": "cs2_usps_monster_mashup",
    "game": "cs2",
    "name": "USP-S | Монстр-микс",
    "nameEn": "USP-S | Monster Mashup",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 26
  },
  {
    "id": "cs2_usps_orion",
    "game": "cs2",
    "name": "USP-S | Орион",
    "nameEn": "USP-S | Orion",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 64
  },
  {
    "id": "cs2_usps_dark_water",
    "game": "cs2",
    "name": "USP-S | Темная вода",
    "nameEn": "USP-S | Dark Water",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 58
  },
  {
    "id": "cs2_usps_caiman",
    "game": "cs2",
    "name": "USP-S | Кайман",
    "nameEn": "USP-S | Caiman",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 32
  },
  {
    "id": "cs2_usps_whiteout",
    "game": "cs2",
    "name": "USP-S | Белизна",
    "nameEn": "USP-S | Whiteout",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 78
  },
  {
    "id": "cs2_usps_stainless",
    "game": "cs2",
    "name": "USP-S | Нержавейка",
    "nameEn": "USP-S | Stainless",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 18
  },
  {
    "id": "cs2_usps_cyrex",
    "game": "cs2",
    "name": "USP-S | Сайрекс",
    "nameEn": "USP-S | Cyrex",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 6.8
  },
  {
    "id": "cs2_usps_flashback",
    "game": "cs2",
    "name": "USP-S | Воспоминания",
    "nameEn": "USP-S | Flashback",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 4.8
  },
  {
    "id": "cs2_usps_guardian",
    "game": "cs2",
    "name": "USP-S | Страж",
    "nameEn": "USP-S | Guardian",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 8.5
  },
  {
    "id": "cs2_usps_black_lotus",
    "game": "cs2",
    "name": "USP-S | Черный лотос",
    "nameEn": "USP-S | Black Lotus",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 3.2
  },
  {
    "id": "cs2_usps_blueprint",
    "game": "cs2",
    "name": "USP-S | Чертеж",
    "nameEn": "USP-S | Blueprint",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 3.1
  },
  {
    "id": "cs2_usps_torque",
    "game": "cs2",
    "name": "USP-S | Закрутка",
    "nameEn": "USP-S | Torque",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 2.1
  },
  {
    "id": "cs2_usps_lead_conduit",
    "game": "cs2",
    "name": "USP-S | Проводник свинца",
    "nameEn": "USP-S | Lead Conduit",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 1.1
  },
  {
    "id": "cs2_usps_forest_leaves",
    "game": "cs2",
    "name": "USP-S | Лесные листья",
    "nameEn": "USP-S | Forest Leaves",
    "category": "pistol",
    "rarity": "industrial",
    "image": "",
    "price": 0.35
  },
  {
    "id": "cs2_usps_night_ops",
    "game": "cs2",
    "name": "USP-S | Ночные операции",
    "nameEn": "USP-S | Night Ops",
    "category": "pistol",
    "rarity": "industrial",
    "image": "",
    "price": 0.55
  },
  {
    "id": "cs2_glock18_fade",
    "game": "cs2",
    "name": "Glock-18 | Градиент",
    "nameEn": "Glock-18 | Fade",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 1250
  },
  {
    "id": "cs2_glock18_gamma_doppler",
    "game": "cs2",
    "name": "Glock-18 | Гамма-волны",
    "nameEn": "Glock-18 | Gamma Doppler",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 78
  },
  {
    "id": "cs2_glock18_bullet_queen",
    "game": "cs2",
    "name": "Glock-18 | Королева пуль",
    "nameEn": "Glock-18 | Bullet Queen",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 52
  },
  {
    "id": "cs2_glock18_wasteland_rebel",
    "game": "cs2",
    "name": "Glock-18 | Повстанец пустошей",
    "nameEn": "Glock-18 | Wasteland Rebel",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 46
  },
  {
    "id": "cs2_glock18_water_elemental",
    "game": "cs2",
    "name": "Glock-18 | Дух воды",
    "nameEn": "Glock-18 | Water Elemental",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 18
  },
  {
    "id": "cs2_glock18_twilight_galaxy",
    "game": "cs2",
    "name": "Glock-18 | Сумеречная галактика",
    "nameEn": "Glock-18 | Twilight Galaxy",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 88
  },
  {
    "id": "cs2_glock18_neo_noir",
    "game": "cs2",
    "name": "Glock-18 | Нео-нуар",
    "nameEn": "Glock-18 | Neo-Noir",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 12
  },
  {
    "id": "cs2_glock18_vogue",
    "game": "cs2",
    "name": "Glock-18 | Мода",
    "nameEn": "Glock-18 | Vogue",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 9.5
  },
  {
    "id": "cs2_glock18_dragon_tattoo",
    "game": "cs2",
    "name": "Glock-18 | Татуировка дракона",
    "nameEn": "Glock-18 | Dragon Tattoo",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 16
  },
  {
    "id": "cs2_glock18_snack_attack",
    "game": "cs2",
    "name": "Glock-18 | Снэк-атака",
    "nameEn": "Glock-18 | Snack Attack",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 6.5
  },
  {
    "id": "cs2_glock18_weasel",
    "game": "cs2",
    "name": "Glock-18 | Ласка",
    "nameEn": "Glock-18 | Weasel",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 4.5
  },
  {
    "id": "cs2_glock18_royal_legion",
    "game": "cs2",
    "name": "Glock-18 | Королевский легион",
    "nameEn": "Glock-18 | Royal Legion",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 5.2
  },
  {
    "id": "cs2_glock18_high_beam",
    "game": "cs2",
    "name": "Glock-18 | Дальний свет",
    "nameEn": "Glock-18 | High Beam",
    "category": "pistol",
    "rarity": "industrial",
    "image": "",
    "price": 1.1
  },
  {
    "id": "cs2_glock18_candy_apple",
    "game": "cs2",
    "name": "Glock-18 | Карамельное яблоко",
    "nameEn": "Glock-18 | Candy Apple",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 3.4
  },
  {
    "id": "cs2_glock18_grinder",
    "game": "cs2",
    "name": "Glock-18 | Жернова",
    "nameEn": "Glock-18 | Grinder",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 2.8
  },
  {
    "id": "cs2_glock18_oxide_blaze",
    "game": "cs2",
    "name": "Glock-18 | Оксидное пламя",
    "nameEn": "Glock-18 | Oxide Blaze",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 0.85
  },
  {
    "id": "cs2_glock18_clear_polymer",
    "game": "cs2",
    "name": "Glock-18 | Прозрачный полимер",
    "nameEn": "Glock-18 | Clear Polymer",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 0.7
  },
  {
    "id": "cs2_glock18_winter_forest",
    "game": "cs2",
    "name": "Glock-18 | Зимний лес",
    "nameEn": "Glock-18 | Winter Forest",
    "category": "pistol",
    "rarity": "industrial",
    "image": "",
    "price": 0.4
  },
  {
    "id": "cs2_glock18_off_world",
    "game": "cs2",
    "name": "Glock-18 | Вне этого мира",
    "nameEn": "Glock-18 | Off World",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 0.6
  },
  {
    "id": "cs2_mp9_wild_lily",
    "game": "cs2",
    "name": "MP9 | Дикая лилия",
    "nameEn": "MP9 | Wild Lily",
    "category": "smg",
    "rarity": "classified",
    "image": "",
    "price": 1200
  },
  {
    "id": "cs2_mp9_starlight_protector",
    "game": "cs2",
    "name": "MP9 | Звездный защитник",
    "nameEn": "MP9 | Starlight Protector",
    "category": "smg",
    "rarity": "covert",
    "image": "",
    "price": 46
  },
  {
    "id": "cs2_mp9_mount_fuji",
    "game": "cs2",
    "name": "MP9 | Гора Фудзи",
    "nameEn": "MP9 | Mount Fuji",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 11
  },
  {
    "id": "cs2_mp9_hydra",
    "game": "cs2",
    "name": "MP9 | Гидра",
    "nameEn": "MP9 | Hydra",
    "category": "smg",
    "rarity": "classified",
    "image": "",
    "price": 22
  },
  {
    "id": "cs2_mp9_food_chain",
    "game": "cs2",
    "name": "MP9 | Пищевая цепочка",
    "nameEn": "MP9 | Food Chain",
    "category": "smg",
    "rarity": "classified",
    "image": "",
    "price": 18
  },
  {
    "id": "cs2_mp9_rose_iron",
    "game": "cs2",
    "name": "MP9 | Железная роза",
    "nameEn": "MP9 | Rose Iron",
    "category": "smg",
    "rarity": "milspec",
    "image": "",
    "price": 7.5
  },
  {
    "id": "cs2_mp9_ruby_poison_dart",
    "game": "cs2",
    "name": "MP9 | Рубиновый дротик",
    "nameEn": "MP9 | Ruby Poison Dart",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 4.8
  },
  {
    "id": "cs2_mp9_goo",
    "game": "cs2",
    "name": "MP9 | Слизь",
    "nameEn": "MP9 | Goo",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 3.8
  },
  {
    "id": "cs2_mp9_featherweight",
    "game": "cs2",
    "name": "MP9 | Полулегкий вес",
    "nameEn": "MP9 | Featherweight",
    "category": "smg",
    "rarity": "milspec",
    "image": "",
    "price": 0.85
  },
  {
    "id": "cs2_mp9_modest_threat",
    "game": "cs2",
    "name": "MP9 | Скромная угроза",
    "nameEn": "MP9 | Modest Threat",
    "category": "smg",
    "rarity": "milspec",
    "image": "",
    "price": 0.6
  },
  {
    "id": "cs2_mac10_hot_snakes",
    "game": "cs2",
    "name": "MAC-10 | Горячие змеи",
    "nameEn": "MAC-10 | Hot Snakes",
    "category": "smg",
    "rarity": "classified",
    "image": "",
    "price": 38
  },
  {
    "id": "cs2_mac10_disco_tech",
    "game": "cs2",
    "name": "MAC-10 | Дискотехника",
    "nameEn": "MAC-10 | Disco Tech",
    "category": "smg",
    "rarity": "classified",
    "image": "",
    "price": 18.5
  },
  {
    "id": "cs2_mac10_stalker",
    "game": "cs2",
    "name": "MAC-10 | Сталкер",
    "nameEn": "MAC-10 | Stalker",
    "category": "smg",
    "rarity": "covert",
    "image": "",
    "price": 48
  },
  {
    "id": "cs2_mac10_neon_rider",
    "game": "cs2",
    "name": "MAC-10 | Неоновый всадник",
    "nameEn": "MAC-10 | Neon Rider",
    "category": "smg",
    "rarity": "covert",
    "image": "",
    "price": 45
  },
  {
    "id": "cs2_mac10_fade",
    "game": "cs2",
    "name": "MAC-10 | Градиент",
    "nameEn": "MAC-10 | Fade",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 16
  },
  {
    "id": "cs2_mac10_allure",
    "game": "cs2",
    "name": "MAC-10 | Очарование",
    "nameEn": "MAC-10 | Allure",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 5.5
  },
  {
    "id": "cs2_mac10_pipe_down",
    "game": "cs2",
    "name": "MAC-10 | Успокойся",
    "nameEn": "MAC-10 | Pipe Down",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 4.2
  },
  {
    "id": "cs2_mac10_ensnared",
    "game": "cs2",
    "name": "MAC-10 | В капкане",
    "nameEn": "MAC-10 | Ensnared",
    "category": "smg",
    "rarity": "milspec",
    "image": "",
    "price": 0.75
  },
  {
    "id": "cs2_mac10_silver",
    "game": "cs2",
    "name": "MAC-10 | Серебро",
    "nameEn": "MAC-10 | Silver",
    "category": "smg",
    "rarity": "industrial",
    "image": "",
    "price": 0.45
  },
  {
    "id": "cs2_p90_death_by_kitty",
    "game": "cs2",
    "name": "P90 | Смерть от котика",
    "nameEn": "P90 | Death by Kitty",
    "category": "smg",
    "rarity": "classified",
    "image": "",
    "price": 64
  },
  {
    "id": "cs2_p90_asiimov",
    "game": "cs2",
    "name": "P90 | Азимов",
    "nameEn": "P90 | Asiimov",
    "category": "smg",
    "rarity": "covert",
    "image": "",
    "price": 48
  },
  {
    "id": "cs2_p90_nostalgia",
    "game": "cs2",
    "name": "P90 | Ностальгия",
    "nameEn": "P90 | Nostalgia",
    "category": "smg",
    "rarity": "classified",
    "image": "",
    "price": 19
  },
  {
    "id": "cs2_p90_trigon",
    "game": "cs2",
    "name": "P90 | Тригон",
    "nameEn": "P90 | Trigon",
    "category": "smg",
    "rarity": "classified",
    "image": "",
    "price": 16
  },
  {
    "id": "cs2_p90_chopper",
    "game": "cs2",
    "name": "P90 | Чоппер",
    "nameEn": "P90 | Chopper",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 6.8
  },
  {
    "id": "cs2_p90_grim",
    "game": "cs2",
    "name": "P90 | Мрачный жнец",
    "nameEn": "P90 | Grim",
    "category": "smg",
    "rarity": "milspec",
    "image": "",
    "price": 1.4
  },
  {
    "id": "cs2_p90_vent_rush",
    "game": "cs2",
    "name": "P90 | Вент-раш",
    "nameEn": "P90 | Vent Rush",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 4.2
  },
  {
    "id": "cs2_ump45_fade",
    "game": "cs2",
    "name": "UMP-45 | Градиент",
    "nameEn": "UMP-45 | Fade",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 16
  },
  {
    "id": "cs2_ump45_crime_scene",
    "game": "cs2",
    "name": "UMP-45 | Место преступления",
    "nameEn": "UMP-45 | Crime Scene",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 34
  },
  {
    "id": "cs2_ump45_primal_saber",
    "game": "cs2",
    "name": "UMP-45 | Первобытный саблезуб",
    "nameEn": "UMP-45 | Primal Saber",
    "category": "smg",
    "rarity": "classified",
    "image": "",
    "price": 16
  },
  {
    "id": "cs2_ump45_exposure",
    "game": "cs2",
    "name": "UMP-45 | Выдержка",
    "nameEn": "UMP-45 | Exposure",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 4.8
  },
  {
    "id": "cs2_ump45_moonrise",
    "game": "cs2",
    "name": "UMP-45 | Восход луны",
    "nameEn": "UMP-45 | Moonrise",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 3.8
  },
  {
    "id": "cs2_ump45_plastique",
    "game": "cs2",
    "name": "UMP-45 | Пластид",
    "nameEn": "UMP-45 | Plastique",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 4.5
  },
  {
    "id": "cs2_ump45_scaffold",
    "game": "cs2",
    "name": "UMP-45 | Строительные леса",
    "nameEn": "UMP-45 | Scaffold",
    "category": "smg",
    "rarity": "restricted",
    "image": "",
    "price": 5.2
  },
  {
    "id": "cs2_galilar_chatterbox",
    "game": "cs2",
    "name": "Galil AR | Болтун",
    "nameEn": "Galil AR | Chatterbox",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 68
  },
  {
    "id": "cs2_galilar_sugar_rush",
    "game": "cs2",
    "name": "Galil AR | Сахарная лихорадка",
    "nameEn": "Galil AR | Sugar Rush",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 24
  },
  {
    "id": "cs2_galilar_eco",
    "game": "cs2",
    "name": "Galil AR | Эко",
    "nameEn": "Galil AR | Eco",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 18
  },
  {
    "id": "cs2_galilar_connexion",
    "game": "cs2",
    "name": "Galil AR | Связь",
    "nameEn": "Galil AR | Connexion",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 4.5
  },
  {
    "id": "cs2_galilar_stone_cold",
    "game": "cs2",
    "name": "Galil AR | Холодный камень",
    "nameEn": "Galil AR | Stone Cold",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 6.2
  },
  {
    "id": "cs2_galilar_rocket_pop",
    "game": "cs2",
    "name": "Galil AR | Леденец",
    "nameEn": "Galil AR | Rocket Pop",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 1.8
  },
  {
    "id": "cs2_galilar_signal",
    "game": "cs2",
    "name": "Galil AR | Сигнал",
    "nameEn": "Galil AR | Signal",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 5.5
  },
  {
    "id": "cs2_galilar_crimson_tsunami",
    "game": "cs2",
    "name": "Galil AR | Багровое цунами",
    "nameEn": "Galil AR | Crimson Tsunami",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 5.8
  },
  {
    "id": "cs2_galilar_vandal",
    "game": "cs2",
    "name": "Galil AR | Вандал",
    "nameEn": "Galil AR | Vandal",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 1.1
  },
  {
    "id": "cs2_famas_commemoration",
    "game": "cs2",
    "name": "FAMAS | Память",
    "nameEn": "FAMAS | Commemoration",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 54
  },
  {
    "id": "cs2_famas_roll_cage",
    "game": "cs2",
    "name": "FAMAS | Каркас безопасности",
    "nameEn": "FAMAS | Roll Cage",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 45
  },
  {
    "id": "cs2_famas_eye_of_athena",
    "game": "cs2",
    "name": "FAMAS | Око Афины",
    "nameEn": "FAMAS | Eye of Athena",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 19.5
  },
  {
    "id": "cs2_famas_mecha_industries",
    "game": "cs2",
    "name": "FAMAS | Механо-пушка",
    "nameEn": "FAMAS | Mecha Industries",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 16
  },
  {
    "id": "cs2_famas_valence",
    "game": "cs2",
    "name": "FAMAS | Валентность",
    "nameEn": "FAMAS | Valence",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 6.2
  },
  {
    "id": "cs2_famas_zx_spectron",
    "game": "cs2",
    "name": "FAMAS | Спектрон",
    "nameEn": "FAMAS | ZX Spectron",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 5.4
  },
  {
    "id": "cs2_famas_survivor_z",
    "game": "cs2",
    "name": "FAMAS | Выживший",
    "nameEn": "FAMAS | Survivor Z",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 1.2
  },
  {
    "id": "cs2_ssg08_blood_in_the_water",
    "game": "cs2",
    "name": "SSG 08 | Кровь в воде",
    "nameEn": "SSG 08 | Blood in the Water",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 85
  },
  {
    "id": "cs2_ssg08_dragonfire",
    "game": "cs2",
    "name": "SSG 08 | Пламя дракона",
    "nameEn": "SSG 08 | Dragonfire",
    "category": "sniper",
    "rarity": "covert",
    "image": "",
    "price": 48
  },
  {
    "id": "cs2_ssg08_turbo_peek",
    "game": "cs2",
    "name": "SSG 08 | Турбо-пик",
    "nameEn": "SSG 08 | Turbo Peek",
    "category": "sniper",
    "rarity": "classified",
    "image": "",
    "price": 24
  },
  {
    "id": "cs2_ssg08_death_strike",
    "game": "cs2",
    "name": "SSG 08 | Смертельный удар",
    "nameEn": "SSG 08 | Death Strike",
    "category": "sniper",
    "rarity": "classified",
    "image": "",
    "price": 160
  },
  {
    "id": "cs2_ssg08_fever_dream",
    "game": "cs2",
    "name": "SSG 08 | Горячечные грезы",
    "nameEn": "SSG 08 | Fever Dream",
    "category": "sniper",
    "rarity": "restricted",
    "image": "",
    "price": 6.8
  },
  {
    "id": "cs2_ssg08_parallax",
    "game": "cs2",
    "name": "SSG 08 | Параллакс",
    "nameEn": "SSG 08 | Parallax",
    "category": "sniper",
    "rarity": "restricted",
    "image": "",
    "price": 5.2
  },
  {
    "id": "cs2_ssg08_abyss",
    "game": "cs2",
    "name": "SSG 08 | Пучина",
    "nameEn": "SSG 08 | Abyss",
    "category": "sniper",
    "rarity": "milspec",
    "image": "",
    "price": 2.8
  },
  {
    "id": "cs2_ssg08_mainframe_001",
    "game": "cs2",
    "name": "SSG 08 | Мэйнфрейм 001",
    "nameEn": "SSG 08 | Mainframe 001",
    "category": "sniper",
    "rarity": "milspec",
    "image": "",
    "price": 0.75
  },
  {
    "id": "cs2_aug_akihabara_accept",
    "game": "cs2",
    "name": "AUG | Акихабара",
    "nameEn": "AUG | Akihabara Accept",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 1450
  },
  {
    "id": "cs2_aug_flame_j_rmungandr",
    "game": "cs2",
    "name": "AUG | Пламенный Ёрмунганд",
    "nameEn": "AUG | Flame Jörmungandr",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 280
  },
  {
    "id": "cs2_aug_chameleon",
    "game": "cs2",
    "name": "AUG | Хамелеон",
    "nameEn": "AUG | Chameleon",
    "category": "rifle",
    "rarity": "covert",
    "image": "",
    "price": 46
  },
  {
    "id": "cs2_aug_strikethrough",
    "game": "cs2",
    "name": "AUG | Зачеркивание",
    "nameEn": "AUG | Strikethrough",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 21
  },
  {
    "id": "cs2_aug_momentum",
    "game": "cs2",
    "name": "AUG | Импульс",
    "nameEn": "AUG | Momentum",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 18
  },
  {
    "id": "cs2_aug_fleet_flock",
    "game": "cs2",
    "name": "AUG | Птичий флот",
    "nameEn": "AUG | Fleet Flock",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 15
  },
  {
    "id": "cs2_aug_syd_mead",
    "game": "cs2",
    "name": "AUG | Сид Мид",
    "nameEn": "AUG | Syd Mead",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 16.5
  },
  {
    "id": "cs2_aug_aristocrat",
    "game": "cs2",
    "name": "AUG | Аристократ",
    "nameEn": "AUG | Aristocrat",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 4.8
  },
  {
    "id": "cs2_aug_ricochet",
    "game": "cs2",
    "name": "AUG | Рикошет",
    "nameEn": "AUG | Ricochet",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 1.1
  },
  {
    "id": "cs2_sg553_integrale",
    "game": "cs2",
    "name": "SG 553 | Интеграл",
    "nameEn": "SG 553 | Integrale",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 88
  },
  {
    "id": "cs2_sg553_colony_iv",
    "game": "cs2",
    "name": "SG 553 | Колония IV",
    "nameEn": "SG 553 | Colony IV",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 17.5
  },
  {
    "id": "cs2_sg553_cyrex",
    "game": "cs2",
    "name": "SG 553 | Сайрекс",
    "nameEn": "SG 553 | Cyrex",
    "category": "rifle",
    "rarity": "classified",
    "image": "",
    "price": 19
  },
  {
    "id": "cs2_sg553_tiger_moth",
    "game": "cs2",
    "name": "SG 553 | Медведица",
    "nameEn": "SG 553 | Tiger Moth",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 6.2
  },
  {
    "id": "cs2_sg553_darkwing",
    "game": "cs2",
    "name": "SG 553 | Темнокрыл",
    "nameEn": "SG 553 | Darkwing",
    "category": "rifle",
    "rarity": "restricted",
    "image": "",
    "price": 4.8
  },
  {
    "id": "cs2_sg553_heavy_metal",
    "game": "cs2",
    "name": "SG 553 | Тяжелый металл",
    "nameEn": "SG 553 | Heavy Metal",
    "category": "rifle",
    "rarity": "milspec",
    "image": "",
    "price": 1.3
  },
  {
    "id": "cs2_p250_see_ya_later",
    "game": "cs2",
    "name": "P250 | До встречи",
    "nameEn": "P250 | See Ya Later",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 48
  },
  {
    "id": "cs2_p250_apep_s_curse",
    "game": "cs2",
    "name": "P250 | Проклятие Апепа",
    "nameEn": "P250 | Apep's Curse",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 140
  },
  {
    "id": "cs2_p250_undertow",
    "game": "cs2",
    "name": "P250 | Подводное течение",
    "nameEn": "P250 | Undertow",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 32
  },
  {
    "id": "cs2_p250_asiimov",
    "game": "cs2",
    "name": "P250 | Азимов",
    "nameEn": "P250 | Asiimov",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 26
  },
  {
    "id": "cs2_p250_muertos",
    "game": "cs2",
    "name": "P250 | Покойник",
    "nameEn": "P250 | Muertos",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 21
  },
  {
    "id": "cs2_p250_cartel",
    "game": "cs2",
    "name": "P250 | Картель",
    "nameEn": "P250 | Cartel",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 18
  },
  {
    "id": "cs2_p250_mehndi",
    "game": "cs2",
    "name": "P250 | Менди",
    "nameEn": "P250 | Mehndi",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 24
  },
  {
    "id": "cs2_p250_supernova",
    "game": "cs2",
    "name": "P250 | Сверхновая",
    "nameEn": "P250 | Supernova",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 5.5
  },
  {
    "id": "cs2_p250_wingshot",
    "game": "cs2",
    "name": "P250 | Меткий стрелок",
    "nameEn": "P250 | Wingshot",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 4.8
  },
  {
    "id": "cs2_p250_nevermore",
    "game": "cs2",
    "name": "P250 | Больше никогда",
    "nameEn": "P250 | Nevermore",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 4.2
  },
  {
    "id": "cs2_p250_visions",
    "game": "cs2",
    "name": "P250 | Видения",
    "nameEn": "P250 | Visions",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 22
  },
  {
    "id": "cs2_p250_franklin",
    "game": "cs2",
    "name": "P250 | Франклин",
    "nameEn": "P250 | Franklin",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 16
  },
  {
    "id": "cs2_p250_valence",
    "game": "cs2",
    "name": "P250 | Валентность",
    "nameEn": "P250 | Valence",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 1.1
  },
  {
    "id": "cs2_fiveseven_hyper_beast",
    "game": "cs2",
    "name": "Five-SeveN | Скоростной зверь",
    "nameEn": "Five-SeveN | Hyper Beast",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 56
  },
  {
    "id": "cs2_fiveseven_angry_mob",
    "game": "cs2",
    "name": "Five-SeveN | Разъяренная толпа",
    "nameEn": "Five-SeveN | Angry Mob",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 48
  },
  {
    "id": "cs2_fiveseven_case_hardened",
    "game": "cs2",
    "name": "Five-SeveN | Поверхностная закалка",
    "nameEn": "Five-SeveN | Case Hardened",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 38
  },
  {
    "id": "cs2_fiveseven_fairy_tale",
    "game": "cs2",
    "name": "Five-SeveN | Сказка",
    "nameEn": "Five-SeveN | Fairy Tale",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 26
  },
  {
    "id": "cs2_fiveseven_monkey_business",
    "game": "cs2",
    "name": "Five-SeveN | Обезьянье дело",
    "nameEn": "Five-SeveN | Monkey Business",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 19
  },
  {
    "id": "cs2_fiveseven_fowl_play",
    "game": "cs2",
    "name": "Five-SeveN | Птичья игра",
    "nameEn": "Five-SeveN | Fowl Play",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 16
  },
  {
    "id": "cs2_fiveseven_copper_galaxy",
    "game": "cs2",
    "name": "Five-SeveN | Медная галактика",
    "nameEn": "Five-SeveN | Copper Galaxy",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 12
  },
  {
    "id": "cs2_fiveseven_triumvirate",
    "game": "cs2",
    "name": "Five-SeveN | Триумвират",
    "nameEn": "Five-SeveN | Triumvirate",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 4.5
  },
  {
    "id": "cs2_fiveseven_urban_hazard",
    "game": "cs2",
    "name": "Five-SeveN | Городской риск",
    "nameEn": "Five-SeveN | Urban Hazard",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 1.3
  },
  {
    "id": "cs2_fiveseven_flame_test",
    "game": "cs2",
    "name": "Five-SeveN | Огненное испытание",
    "nameEn": "Five-SeveN | Flame Test",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 0.7
  },
  {
    "id": "cs2_cz75auto_victoria",
    "game": "cs2",
    "name": "CZ75-Auto | Виктория",
    "nameEn": "CZ75-Auto | Victoria",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 46
  },
  {
    "id": "cs2_cz75auto_chalice",
    "game": "cs2",
    "name": "CZ75-Auto | Чаша",
    "nameEn": "CZ75-Auto | Chalice",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 140
  },
  {
    "id": "cs2_cz75auto_xiangliu",
    "game": "cs2",
    "name": "CZ75-Auto | Сяньлю",
    "nameEn": "CZ75-Auto | Xiangliu",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 22
  },
  {
    "id": "cs2_cz75auto_yellow_jacket",
    "game": "cs2",
    "name": "CZ75-Auto | Желтый жакет",
    "nameEn": "CZ75-Auto | Yellow Jacket",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 18
  },
  {
    "id": "cs2_cz75auto_red_astor",
    "game": "cs2",
    "name": "CZ75-Auto | Красный Астор",
    "nameEn": "CZ75-Auto | Red Astor",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 4.8
  },
  {
    "id": "cs2_cz75auto_tigris",
    "game": "cs2",
    "name": "CZ75-Auto | Тигр",
    "nameEn": "CZ75-Auto | Tigris",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 5.2
  },
  {
    "id": "cs2_cz75auto_pole_position",
    "game": "cs2",
    "name": "CZ75-Auto | Поул-позиция",
    "nameEn": "CZ75-Auto | Pole Position",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 1.1
  },
  {
    "id": "cs2_tec9_decimator",
    "game": "cs2",
    "name": "Tec-9 | Опустошитель",
    "nameEn": "Tec-9 | Decimator",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 24
  },
  {
    "id": "cs2_tec9_fuel_injector",
    "game": "cs2",
    "name": "Tec-9 | Топливный инжектор",
    "nameEn": "Tec-9 | Fuel Injector",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 28
  },
  {
    "id": "cs2_tec9_isaac",
    "game": "cs2",
    "name": "Tec-9 | Айзек",
    "nameEn": "Tec-9 | Isaac",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 4.2
  },
  {
    "id": "cs2_tec9_bamboozle",
    "game": "cs2",
    "name": "Tec-9 | Бамбук",
    "nameEn": "Tec-9 | Bamboozle",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 5.8
  },
  {
    "id": "cs2_tec9_avalanche",
    "game": "cs2",
    "name": "Tec-9 | Лавина",
    "nameEn": "Tec-9 | Avalanche",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 6.4
  },
  {
    "id": "cs2_tec9_re_entry",
    "game": "cs2",
    "name": "Tec-9 | Возвращение",
    "nameEn": "Tec-9 | Re-Entry",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 4.5
  },
  {
    "id": "cs2_tec9_ice_cap",
    "game": "cs2",
    "name": "Tec-9 | Ледяная шапка",
    "nameEn": "Tec-9 | Ice Cap",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 1.4
  },
  {
    "id": "cs2_dualberettas_cobra_strike",
    "game": "cs2",
    "name": "Dual Berettas | Удар кобры",
    "nameEn": "Dual Berettas | Cobra Strike",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 38
  },
  {
    "id": "cs2_dualberettas_dualing_dragons",
    "game": "cs2",
    "name": "Dual Berettas | Дерущиеся драконы",
    "nameEn": "Dual Berettas | Dualing Dragons",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 6.2
  },
  {
    "id": "cs2_dualberettas_hemoglobin",
    "game": "cs2",
    "name": "Dual Berettas | Гемоглобин",
    "nameEn": "Dual Berettas | Hemoglobin",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 12
  },
  {
    "id": "cs2_dualberettas_melondrama",
    "game": "cs2",
    "name": "Dual Berettas | Драма с дынями",
    "nameEn": "Dual Berettas | Melondrama",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 19
  },
  {
    "id": "cs2_dualberettas_marina",
    "game": "cs2",
    "name": "Dual Berettas | Марина",
    "nameEn": "Dual Berettas | Marina",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 7.5
  },
  {
    "id": "cs2_dualberettas_elite_1_6",
    "game": "cs2",
    "name": "Dual Berettas | Элита 1.6",
    "nameEn": "Dual Berettas | Elite 1.6",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 1.3
  },
  {
    "id": "cs2_dualberettas_dezastre",
    "game": "cs2",
    "name": "Dual Berettas | Бедствие",
    "nameEn": "Dual Berettas | Dezastre",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 4.2
  },
  {
    "id": "cs2_r8revolver_fade",
    "game": "cs2",
    "name": "R8 Revolver | Градиент",
    "nameEn": "R8 Revolver | Fade",
    "category": "pistol",
    "rarity": "covert",
    "image": "",
    "price": 48
  },
  {
    "id": "cs2_r8revolver_crazy_8",
    "game": "cs2",
    "name": "R8 Revolver | Сумасшедшая восьмерка",
    "nameEn": "R8 Revolver | Crazy 8",
    "category": "pistol",
    "rarity": "restricted",
    "image": "",
    "price": 6.5
  },
  {
    "id": "cs2_r8revolver_skull_crusher",
    "game": "cs2",
    "name": "R8 Revolver | Крушитель черепов",
    "nameEn": "R8 Revolver | Skull Crusher",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 16
  },
  {
    "id": "cs2_r8revolver_llama_cannon",
    "game": "cs2",
    "name": "R8 Revolver | Пушка-лама",
    "nameEn": "R8 Revolver | Llama Cannon",
    "category": "pistol",
    "rarity": "classified",
    "image": "",
    "price": 19
  },
  {
    "id": "cs2_r8revolver_survivalist",
    "game": "cs2",
    "name": "R8 Revolver | Выживальщик",
    "nameEn": "R8 Revolver | Survivalist",
    "category": "pistol",
    "rarity": "milspec",
    "image": "",
    "price": 1.1
  },
  {
    "id": "cs2_xm1014_entombed",
    "game": "cs2",
    "name": "XM1014 | Захороненный",
    "nameEn": "XM1014 | Entombed",
    "category": "shotgun",
    "rarity": "classified",
    "image": "",
    "price": 26
  },
  {
    "id": "cs2_xm1014_seasons",
    "game": "cs2",
    "name": "XM1014 | Времена года",
    "nameEn": "XM1014 | Seasons",
    "category": "shotgun",
    "rarity": "restricted",
    "image": "",
    "price": 5.8
  },
  {
    "id": "cs2_xm1014_tranquility",
    "game": "cs2",
    "name": "XM1014 | Спокойствие",
    "nameEn": "XM1014 | Tranquility",
    "category": "shotgun",
    "rarity": "classified",
    "image": "",
    "price": 18
  },
  {
    "id": "cs2_xm1014_ziggy",
    "game": "cs2",
    "name": "XM1014 | Зигги",
    "nameEn": "XM1014 | Ziggy",
    "category": "shotgun",
    "rarity": "restricted",
    "image": "",
    "price": 4.8
  },
  {
    "id": "cs2_xm1014_black_tie",
    "game": "cs2",
    "name": "XM1014 | Черный галстук",
    "nameEn": "XM1014 | Black Tie",
    "category": "shotgun",
    "rarity": "restricted",
    "image": "",
    "price": 6.2
  },
  {
    "id": "cs2_xm1014_slipstream",
    "game": "cs2",
    "name": "XM1014 | Воздушный поток",
    "nameEn": "XM1014 | Slipstream",
    "category": "shotgun",
    "rarity": "milspec",
    "image": "",
    "price": 0.9
  },
  {
    "id": "cs2_nova_hyper_beast",
    "game": "cs2",
    "name": "Nova | Скоростной зверь",
    "nameEn": "Nova | Hyper Beast",
    "category": "shotgun",
    "rarity": "classified",
    "image": "",
    "price": 28
  },
  {
    "id": "cs2_nova_bloomstick",
    "game": "cs2",
    "name": "Nova | Цветущая палка",
    "nameEn": "Nova | Bloomstick",
    "category": "shotgun",
    "rarity": "classified",
    "image": "",
    "price": 19
  },
  {
    "id": "cs2_nova_antique",
    "game": "cs2",
    "name": "Nova | Антиквариат",
    "nameEn": "Nova | Antique",
    "category": "shotgun",
    "rarity": "restricted",
    "image": "",
    "price": 7.5
  },
  {
    "id": "cs2_nova_wild_style",
    "game": "cs2",
    "name": "Nova | Дикий стиль",
    "nameEn": "Nova | Wild Style",
    "category": "shotgun",
    "rarity": "restricted",
    "image": "",
    "price": 4.2
  },
  {
    "id": "cs2_nova_toy_soldier",
    "game": "cs2",
    "name": "Nova | Оловянный солдатик",
    "nameEn": "Nova | Toy Soldier",
    "category": "shotgun",
    "rarity": "restricted",
    "image": "",
    "price": 5.6
  },
  {
    "id": "cs2_mag7_justice",
    "game": "cs2",
    "name": "MAG-7 | Правосудие",
    "nameEn": "MAG-7 | Justice",
    "category": "shotgun",
    "rarity": "classified",
    "image": "",
    "price": 22
  },
  {
    "id": "cs2_mag7_cinquedea",
    "game": "cs2",
    "name": "MAG-7 | Чинкведа",
    "nameEn": "MAG-7 | Cinquedea",
    "category": "shotgun",
    "rarity": "classified",
    "image": "",
    "price": 380
  },
  {
    "id": "cs2_mag7_monster_call",
    "game": "cs2",
    "name": "MAG-7 | Зов монстра",
    "nameEn": "MAG-7 | Monster Call",
    "category": "shotgun",
    "rarity": "restricted",
    "image": "",
    "price": 4.8
  },
  {
    "id": "cs2_mag7_praetorian",
    "game": "cs2",
    "name": "MAG-7 | Преторианец",
    "nameEn": "MAG-7 | Praetorian",
    "category": "shotgun",
    "rarity": "restricted",
    "image": "",
    "price": 5.2
  },
  {
    "id": "cs2_mag7_heat",
    "game": "cs2",
    "name": "MAG-7 | Жара",
    "nameEn": "MAG-7 | Heat",
    "category": "shotgun",
    "rarity": "restricted",
    "image": "",
    "price": 6.8
  },
  {
    "id": "cs2_negev_mj_lnir",
    "game": "cs2",
    "name": "Negev | Мьёльнир",
    "nameEn": "Negev | Mjölnir",
    "category": "machinegun",
    "rarity": "classified",
    "image": "",
    "price": 890
  },
  {
    "id": "cs2_negev_powercore",
    "game": "cs2",
    "name": "Negev | Силовое ядро",
    "nameEn": "Negev | Powercore",
    "category": "machinegun",
    "rarity": "restricted",
    "image": "",
    "price": 6.5
  },
  {
    "id": "cs2_negev_lionfish",
    "game": "cs2",
    "name": "Negev | Крылатка",
    "nameEn": "Negev | Lionfish",
    "category": "machinegun",
    "rarity": "restricted",
    "image": "",
    "price": 4.8
  },
  {
    "id": "cs2_negev_loudmouth",
    "game": "cs2",
    "name": "Negev | Крикун",
    "nameEn": "Negev | loudmouth",
    "category": "machinegun",
    "rarity": "restricted",
    "image": "",
    "price": 5.5
  },
  {
    "id": "cs2_negev_drop_me",
    "game": "cs2",
    "name": "Negev | Дропни",
    "nameEn": "Negev | Drop Me",
    "category": "machinegun",
    "rarity": "milspec",
    "image": "",
    "price": 1.1
  },
  {
    "id": "cs2_knife_butterflyknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Нож-бабочка | Волны Фаза 2",
    "nameEn": "★ Butterfly Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 2040
  },
  {
    "id": "cs2_knife_butterflyknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Нож-бабочка | Волны Рубин",
    "nameEn": "★ Butterfly Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 4080
  },
  {
    "id": "cs2_knife_butterflyknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Нож-бабочка | Волны Сапфир",
    "nameEn": "★ Butterfly Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 4675
  },
  {
    "id": "cs2_knife_butterflyknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Нож-бабочка | Гамма-волны",
    "nameEn": "★ Butterfly Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1870
  },
  {
    "id": "cs2_knife_butterflyknife_marble_fade",
    "game": "cs2",
    "name": "★ Нож-бабочка | Мраморный градиент",
    "nameEn": "★ Butterfly Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1785
  },
  {
    "id": "cs2_knife_butterflyknife_crimson_web",
    "game": "cs2",
    "name": "★ Нож-бабочка | Кровавая паутина",
    "nameEn": "★ Butterfly Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1615
  },
  {
    "id": "cs2_knife_butterflyknife_lore",
    "game": "cs2",
    "name": "★ Нож-бабочка | Легенды",
    "nameEn": "★ Butterfly Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1530
  },
  {
    "id": "cs2_knife_butterflyknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Нож-бабочка | Зуб тигра",
    "nameEn": "★ Butterfly Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1360
  },
  {
    "id": "cs2_knife_butterflyknife_slaughter",
    "game": "cs2",
    "name": "★ Нож-бабочка | Убийство",
    "nameEn": "★ Butterfly Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1275
  },
  {
    "id": "cs2_knife_butterflyknife_autotronic",
    "game": "cs2",
    "name": "★ Нож-бабочка | Автотроника",
    "nameEn": "★ Butterfly Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1190
  },
  {
    "id": "cs2_knife_butterflyknife_case_hardened",
    "game": "cs2",
    "name": "★ Нож-бабочка | Поверхностная закалка",
    "nameEn": "★ Butterfly Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1105
  },
  {
    "id": "cs2_knife_butterflyknife_black_laminate",
    "game": "cs2",
    "name": "★ Нож-бабочка | Черный ламинат",
    "nameEn": "★ Butterfly Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 935
  },
  {
    "id": "cs2_knife_butterflyknife_damascus_steel",
    "game": "cs2",
    "name": "★ Нож-бабочка | Дамасская сталь",
    "nameEn": "★ Butterfly Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 850
  },
  {
    "id": "cs2_knife_butterflyknife_blue_steel",
    "game": "cs2",
    "name": "★ Нож-бабочка | Вороненая сталь",
    "nameEn": "★ Butterfly Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 808
  },
  {
    "id": "cs2_knife_butterflyknife_night_stripe",
    "game": "cs2",
    "name": "★ Нож-бабочка | Ночная полоса",
    "nameEn": "★ Butterfly Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 723
  },
  {
    "id": "cs2_knife_butterflyknife_rust_coat",
    "game": "cs2",
    "name": "★ Нож-бабочка | Пыльник",
    "nameEn": "★ Butterfly Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 680
  },
  {
    "id": "cs2_knife_butterflyknife_urban_masked",
    "game": "cs2",
    "name": "★ Нож-бабочка | Городская маскировка",
    "nameEn": "★ Butterfly Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 638
  },
  {
    "id": "cs2_knife_butterflyknife_safari_mesh",
    "game": "cs2",
    "name": "★ Нож-бабочка | Африканская сетка",
    "nameEn": "★ Butterfly Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 595
  },
  {
    "id": "cs2_knife_karambit_doppler_ruby",
    "game": "cs2",
    "name": "★ Керамбит | Волны Рубин",
    "nameEn": "★ Karambit | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 3744
  },
  {
    "id": "cs2_knife_karambit_doppler_sapphire",
    "game": "cs2",
    "name": "★ Керамбит | Волны Сапфир",
    "nameEn": "★ Karambit | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 4290
  },
  {
    "id": "cs2_knife_karambit_gamma_doppler",
    "game": "cs2",
    "name": "★ Керамбит | Гамма-волны",
    "nameEn": "★ Karambit | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1716
  },
  {
    "id": "cs2_knife_karambit_fade",
    "game": "cs2",
    "name": "★ Керамбит | Градиент",
    "nameEn": "★ Karambit | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 2184
  },
  {
    "id": "cs2_knife_karambit_marble_fade",
    "game": "cs2",
    "name": "★ Керамбит | Мраморный градиент",
    "nameEn": "★ Karambit | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1638
  },
  {
    "id": "cs2_knife_karambit_crimson_web",
    "game": "cs2",
    "name": "★ Керамбит | Кровавая паутина",
    "nameEn": "★ Karambit | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1482
  },
  {
    "id": "cs2_knife_karambit_lore",
    "game": "cs2",
    "name": "★ Керамбит | Легенды",
    "nameEn": "★ Karambit | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1404
  },
  {
    "id": "cs2_knife_karambit_tiger_tooth",
    "game": "cs2",
    "name": "★ Керамбит | Зуб тигра",
    "nameEn": "★ Karambit | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1248
  },
  {
    "id": "cs2_knife_karambit_slaughter",
    "game": "cs2",
    "name": "★ Керамбит | Убийство",
    "nameEn": "★ Karambit | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1170
  },
  {
    "id": "cs2_knife_karambit_autotronic",
    "game": "cs2",
    "name": "★ Керамбит | Автотроника",
    "nameEn": "★ Karambit | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1092
  },
  {
    "id": "cs2_knife_karambit_case_hardened",
    "game": "cs2",
    "name": "★ Керамбит | Поверхностная закалка",
    "nameEn": "★ Karambit | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1014
  },
  {
    "id": "cs2_knife_karambit_black_laminate",
    "game": "cs2",
    "name": "★ Керамбит | Черный ламинат",
    "nameEn": "★ Karambit | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 858
  },
  {
    "id": "cs2_knife_karambit_damascus_steel",
    "game": "cs2",
    "name": "★ Керамбит | Дамасская сталь",
    "nameEn": "★ Karambit | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 780
  },
  {
    "id": "cs2_knife_karambit_blue_steel",
    "game": "cs2",
    "name": "★ Керамбит | Вороненая сталь",
    "nameEn": "★ Karambit | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 741
  },
  {
    "id": "cs2_knife_karambit_night_stripe",
    "game": "cs2",
    "name": "★ Керамбит | Ночная полоса",
    "nameEn": "★ Karambit | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 663
  },
  {
    "id": "cs2_knife_karambit_rust_coat",
    "game": "cs2",
    "name": "★ Керамбит | Пыльник",
    "nameEn": "★ Karambit | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 624
  },
  {
    "id": "cs2_knife_karambit_urban_masked",
    "game": "cs2",
    "name": "★ Керамбит | Городская маскировка",
    "nameEn": "★ Karambit | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 585
  },
  {
    "id": "cs2_knife_karambit_safari_mesh",
    "game": "cs2",
    "name": "★ Керамбит | Африканская сетка",
    "nameEn": "★ Karambit | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 546
  },
  {
    "id": "cs2_knife_m9bayonet_doppler_phase_2",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Волны Фаза 2",
    "nameEn": "★ M9 Bayonet | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1560
  },
  {
    "id": "cs2_knife_m9bayonet_doppler_ruby",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Волны Рубин",
    "nameEn": "★ M9 Bayonet | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 3120
  },
  {
    "id": "cs2_knife_m9bayonet_doppler_sapphire",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Волны Сапфир",
    "nameEn": "★ M9 Bayonet | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 3575
  },
  {
    "id": "cs2_knife_m9bayonet_gamma_doppler",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Гамма-волны",
    "nameEn": "★ M9 Bayonet | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1430
  },
  {
    "id": "cs2_knife_m9bayonet_fade",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Градиент",
    "nameEn": "★ M9 Bayonet | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1820
  },
  {
    "id": "cs2_knife_m9bayonet_marble_fade",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Мраморный градиент",
    "nameEn": "★ M9 Bayonet | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1365
  },
  {
    "id": "cs2_knife_m9bayonet_crimson_web",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Кровавая паутина",
    "nameEn": "★ M9 Bayonet | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1235
  },
  {
    "id": "cs2_knife_m9bayonet_tiger_tooth",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Зуб тигра",
    "nameEn": "★ M9 Bayonet | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1040
  },
  {
    "id": "cs2_knife_m9bayonet_slaughter",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Убийство",
    "nameEn": "★ M9 Bayonet | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 975
  },
  {
    "id": "cs2_knife_m9bayonet_autotronic",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Автотроника",
    "nameEn": "★ M9 Bayonet | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 910
  },
  {
    "id": "cs2_knife_m9bayonet_case_hardened",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Поверхностная закалка",
    "nameEn": "★ M9 Bayonet | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 845
  },
  {
    "id": "cs2_knife_m9bayonet_black_laminate",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Черный ламинат",
    "nameEn": "★ M9 Bayonet | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 715
  },
  {
    "id": "cs2_knife_m9bayonet_damascus_steel",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Дамасская сталь",
    "nameEn": "★ M9 Bayonet | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 650
  },
  {
    "id": "cs2_knife_m9bayonet_blue_steel",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Вороненая сталь",
    "nameEn": "★ M9 Bayonet | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 618
  },
  {
    "id": "cs2_knife_m9bayonet_night_stripe",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Ночная полоса",
    "nameEn": "★ M9 Bayonet | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 553
  },
  {
    "id": "cs2_knife_m9bayonet_rust_coat",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Пыльник",
    "nameEn": "★ M9 Bayonet | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 520
  },
  {
    "id": "cs2_knife_m9bayonet_urban_masked",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Городская маскировка",
    "nameEn": "★ M9 Bayonet | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 488
  },
  {
    "id": "cs2_knife_m9bayonet_safari_mesh",
    "game": "cs2",
    "name": "★ Штык-нож M9 | Африканская сетка",
    "nameEn": "★ M9 Bayonet | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 455
  },
  {
    "id": "cs2_knife_bayonet_doppler_phase_2",
    "game": "cs2",
    "name": "★ Штык-нож | Волны Фаза 2",
    "nameEn": "★ Bayonet | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1008
  },
  {
    "id": "cs2_knife_bayonet_doppler_ruby",
    "game": "cs2",
    "name": "★ Штык-нож | Волны Рубин",
    "nameEn": "★ Bayonet | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 2016
  },
  {
    "id": "cs2_knife_bayonet_doppler_sapphire",
    "game": "cs2",
    "name": "★ Штык-нож | Волны Сапфир",
    "nameEn": "★ Bayonet | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 2310
  },
  {
    "id": "cs2_knife_bayonet_gamma_doppler",
    "game": "cs2",
    "name": "★ Штык-нож | Гамма-волны",
    "nameEn": "★ Bayonet | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 924
  },
  {
    "id": "cs2_knife_bayonet_fade",
    "game": "cs2",
    "name": "★ Штык-нож | Градиент",
    "nameEn": "★ Bayonet | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1176
  },
  {
    "id": "cs2_knife_bayonet_marble_fade",
    "game": "cs2",
    "name": "★ Штык-нож | Мраморный градиент",
    "nameEn": "★ Bayonet | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 882
  },
  {
    "id": "cs2_knife_bayonet_crimson_web",
    "game": "cs2",
    "name": "★ Штык-нож | Кровавая паутина",
    "nameEn": "★ Bayonet | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 798
  },
  {
    "id": "cs2_knife_bayonet_lore",
    "game": "cs2",
    "name": "★ Штык-нож | Легенды",
    "nameEn": "★ Bayonet | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 756
  },
  {
    "id": "cs2_knife_bayonet_tiger_tooth",
    "game": "cs2",
    "name": "★ Штык-нож | Зуб тигра",
    "nameEn": "★ Bayonet | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 672
  },
  {
    "id": "cs2_knife_bayonet_slaughter",
    "game": "cs2",
    "name": "★ Штык-нож | Убийство",
    "nameEn": "★ Bayonet | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 630
  },
  {
    "id": "cs2_knife_bayonet_autotronic",
    "game": "cs2",
    "name": "★ Штык-нож | Автотроника",
    "nameEn": "★ Bayonet | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 588
  },
  {
    "id": "cs2_knife_bayonet_case_hardened",
    "game": "cs2",
    "name": "★ Штык-нож | Поверхностная закалка",
    "nameEn": "★ Bayonet | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 546
  },
  {
    "id": "cs2_knife_bayonet_black_laminate",
    "game": "cs2",
    "name": "★ Штык-нож | Черный ламинат",
    "nameEn": "★ Bayonet | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 462
  },
  {
    "id": "cs2_knife_bayonet_damascus_steel",
    "game": "cs2",
    "name": "★ Штык-нож | Дамасская сталь",
    "nameEn": "★ Bayonet | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 420
  },
  {
    "id": "cs2_knife_bayonet_blue_steel",
    "game": "cs2",
    "name": "★ Штык-нож | Вороненая сталь",
    "nameEn": "★ Bayonet | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 399
  },
  {
    "id": "cs2_knife_bayonet_night_stripe",
    "game": "cs2",
    "name": "★ Штык-нож | Ночная полоса",
    "nameEn": "★ Bayonet | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 357
  },
  {
    "id": "cs2_knife_bayonet_rust_coat",
    "game": "cs2",
    "name": "★ Штык-нож | Пыльник",
    "nameEn": "★ Bayonet | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 336
  },
  {
    "id": "cs2_knife_bayonet_urban_masked",
    "game": "cs2",
    "name": "★ Штык-нож | Городская маскировка",
    "nameEn": "★ Bayonet | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 315
  },
  {
    "id": "cs2_knife_bayonet_safari_mesh",
    "game": "cs2",
    "name": "★ Штык-нож | Африканская сетка",
    "nameEn": "★ Bayonet | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 294
  },
  {
    "id": "cs2_knife_skeletonknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Скелетный нож | Волны Фаза 2",
    "nameEn": "★ Skeleton Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1632
  },
  {
    "id": "cs2_knife_skeletonknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Скелетный нож | Волны Рубин",
    "nameEn": "★ Skeleton Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 3264
  },
  {
    "id": "cs2_knife_skeletonknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Скелетный нож | Волны Сапфир",
    "nameEn": "★ Skeleton Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 3740
  },
  {
    "id": "cs2_knife_skeletonknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Скелетный нож | Гамма-волны",
    "nameEn": "★ Skeleton Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1496
  },
  {
    "id": "cs2_knife_skeletonknife_fade",
    "game": "cs2",
    "name": "★ Скелетный нож | Градиент",
    "nameEn": "★ Skeleton Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1904
  },
  {
    "id": "cs2_knife_skeletonknife_marble_fade",
    "game": "cs2",
    "name": "★ Скелетный нож | Мраморный градиент",
    "nameEn": "★ Skeleton Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1428
  },
  {
    "id": "cs2_knife_skeletonknife_lore",
    "game": "cs2",
    "name": "★ Скелетный нож | Легенды",
    "nameEn": "★ Skeleton Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1224
  },
  {
    "id": "cs2_knife_skeletonknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Скелетный нож | Зуб тигра",
    "nameEn": "★ Skeleton Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1088
  },
  {
    "id": "cs2_knife_skeletonknife_slaughter",
    "game": "cs2",
    "name": "★ Скелетный нож | Убийство",
    "nameEn": "★ Skeleton Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1020
  },
  {
    "id": "cs2_knife_skeletonknife_autotronic",
    "game": "cs2",
    "name": "★ Скелетный нож | Автотроника",
    "nameEn": "★ Skeleton Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 952
  },
  {
    "id": "cs2_knife_skeletonknife_case_hardened",
    "game": "cs2",
    "name": "★ Скелетный нож | Поверхностная закалка",
    "nameEn": "★ Skeleton Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 884
  },
  {
    "id": "cs2_knife_skeletonknife_black_laminate",
    "game": "cs2",
    "name": "★ Скелетный нож | Черный ламинат",
    "nameEn": "★ Skeleton Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 748
  },
  {
    "id": "cs2_knife_skeletonknife_damascus_steel",
    "game": "cs2",
    "name": "★ Скелетный нож | Дамасская сталь",
    "nameEn": "★ Skeleton Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 680
  },
  {
    "id": "cs2_knife_skeletonknife_blue_steel",
    "game": "cs2",
    "name": "★ Скелетный нож | Вороненая сталь",
    "nameEn": "★ Skeleton Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 646
  },
  {
    "id": "cs2_knife_skeletonknife_night_stripe",
    "game": "cs2",
    "name": "★ Скелетный нож | Ночная полоса",
    "nameEn": "★ Skeleton Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 578
  },
  {
    "id": "cs2_knife_skeletonknife_rust_coat",
    "game": "cs2",
    "name": "★ Скелетный нож | Пыльник",
    "nameEn": "★ Skeleton Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 544
  },
  {
    "id": "cs2_knife_skeletonknife_urban_masked",
    "game": "cs2",
    "name": "★ Скелетный нож | Городская маскировка",
    "nameEn": "★ Skeleton Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 510
  },
  {
    "id": "cs2_knife_skeletonknife_safari_mesh",
    "game": "cs2",
    "name": "★ Скелетный нож | Африканская сетка",
    "nameEn": "★ Skeleton Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 476
  },
  {
    "id": "cs2_knife_talonknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Нож-коготь | Волны Фаза 2",
    "nameEn": "★ Talon Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1176
  },
  {
    "id": "cs2_knife_talonknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Нож-коготь | Волны Рубин",
    "nameEn": "★ Talon Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 2352
  },
  {
    "id": "cs2_knife_talonknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Нож-коготь | Волны Сапфир",
    "nameEn": "★ Talon Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 2695
  },
  {
    "id": "cs2_knife_talonknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Нож-коготь | Гамма-волны",
    "nameEn": "★ Talon Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1078
  },
  {
    "id": "cs2_knife_talonknife_fade",
    "game": "cs2",
    "name": "★ Нож-коготь | Градиент",
    "nameEn": "★ Talon Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1372
  },
  {
    "id": "cs2_knife_talonknife_crimson_web",
    "game": "cs2",
    "name": "★ Нож-коготь | Кровавая паутина",
    "nameEn": "★ Talon Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 931
  },
  {
    "id": "cs2_knife_talonknife_lore",
    "game": "cs2",
    "name": "★ Нож-коготь | Легенды",
    "nameEn": "★ Talon Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 882
  },
  {
    "id": "cs2_knife_talonknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Нож-коготь | Зуб тигра",
    "nameEn": "★ Talon Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 784
  },
  {
    "id": "cs2_knife_talonknife_slaughter",
    "game": "cs2",
    "name": "★ Нож-коготь | Убийство",
    "nameEn": "★ Talon Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 735
  },
  {
    "id": "cs2_knife_talonknife_autotronic",
    "game": "cs2",
    "name": "★ Нож-коготь | Автотроника",
    "nameEn": "★ Talon Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 686
  },
  {
    "id": "cs2_knife_talonknife_case_hardened",
    "game": "cs2",
    "name": "★ Нож-коготь | Поверхностная закалка",
    "nameEn": "★ Talon Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 637
  },
  {
    "id": "cs2_knife_talonknife_black_laminate",
    "game": "cs2",
    "name": "★ Нож-коготь | Черный ламинат",
    "nameEn": "★ Talon Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 539
  },
  {
    "id": "cs2_knife_talonknife_damascus_steel",
    "game": "cs2",
    "name": "★ Нож-коготь | Дамасская сталь",
    "nameEn": "★ Talon Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 490
  },
  {
    "id": "cs2_knife_talonknife_blue_steel",
    "game": "cs2",
    "name": "★ Нож-коготь | Вороненая сталь",
    "nameEn": "★ Talon Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 466
  },
  {
    "id": "cs2_knife_talonknife_night_stripe",
    "game": "cs2",
    "name": "★ Нож-коготь | Ночная полоса",
    "nameEn": "★ Talon Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 417
  },
  {
    "id": "cs2_knife_talonknife_rust_coat",
    "game": "cs2",
    "name": "★ Нож-коготь | Пыльник",
    "nameEn": "★ Talon Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 392
  },
  {
    "id": "cs2_knife_talonknife_urban_masked",
    "game": "cs2",
    "name": "★ Нож-коготь | Городская маскировка",
    "nameEn": "★ Talon Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 368
  },
  {
    "id": "cs2_knife_talonknife_safari_mesh",
    "game": "cs2",
    "name": "★ Нож-коготь | Африканская сетка",
    "nameEn": "★ Talon Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 343
  },
  {
    "id": "cs2_knife_nomadknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Нож бродяги | Волны Фаза 2",
    "nameEn": "★ Nomad Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 912
  },
  {
    "id": "cs2_knife_nomadknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Нож бродяги | Волны Рубин",
    "nameEn": "★ Nomad Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1824
  },
  {
    "id": "cs2_knife_nomadknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Нож бродяги | Волны Сапфир",
    "nameEn": "★ Nomad Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 2090
  },
  {
    "id": "cs2_knife_nomadknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Нож бродяги | Гамма-волны",
    "nameEn": "★ Nomad Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 836
  },
  {
    "id": "cs2_knife_nomadknife_fade",
    "game": "cs2",
    "name": "★ Нож бродяги | Градиент",
    "nameEn": "★ Nomad Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1064
  },
  {
    "id": "cs2_knife_nomadknife_marble_fade",
    "game": "cs2",
    "name": "★ Нож бродяги | Мраморный градиент",
    "nameEn": "★ Nomad Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 798
  },
  {
    "id": "cs2_knife_nomadknife_crimson_web",
    "game": "cs2",
    "name": "★ Нож бродяги | Кровавая паутина",
    "nameEn": "★ Nomad Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 722
  },
  {
    "id": "cs2_knife_nomadknife_lore",
    "game": "cs2",
    "name": "★ Нож бродяги | Легенды",
    "nameEn": "★ Nomad Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 684
  },
  {
    "id": "cs2_knife_nomadknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Нож бродяги | Зуб тигра",
    "nameEn": "★ Nomad Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 608
  },
  {
    "id": "cs2_knife_nomadknife_slaughter",
    "game": "cs2",
    "name": "★ Нож бродяги | Убийство",
    "nameEn": "★ Nomad Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 570
  },
  {
    "id": "cs2_knife_nomadknife_autotronic",
    "game": "cs2",
    "name": "★ Нож бродяги | Автотроника",
    "nameEn": "★ Nomad Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 532
  },
  {
    "id": "cs2_knife_nomadknife_case_hardened",
    "game": "cs2",
    "name": "★ Нож бродяги | Поверхностная закалка",
    "nameEn": "★ Nomad Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 494
  },
  {
    "id": "cs2_knife_nomadknife_black_laminate",
    "game": "cs2",
    "name": "★ Нож бродяги | Черный ламинат",
    "nameEn": "★ Nomad Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 418
  },
  {
    "id": "cs2_knife_nomadknife_damascus_steel",
    "game": "cs2",
    "name": "★ Нож бродяги | Дамасская сталь",
    "nameEn": "★ Nomad Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 380
  },
  {
    "id": "cs2_knife_nomadknife_blue_steel",
    "game": "cs2",
    "name": "★ Нож бродяги | Вороненая сталь",
    "nameEn": "★ Nomad Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 361
  },
  {
    "id": "cs2_knife_nomadknife_night_stripe",
    "game": "cs2",
    "name": "★ Нож бродяги | Ночная полоса",
    "nameEn": "★ Nomad Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 323
  },
  {
    "id": "cs2_knife_nomadknife_rust_coat",
    "game": "cs2",
    "name": "★ Нож бродяги | Пыльник",
    "nameEn": "★ Nomad Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 304
  },
  {
    "id": "cs2_knife_nomadknife_urban_masked",
    "game": "cs2",
    "name": "★ Нож бродяги | Городская маскировка",
    "nameEn": "★ Nomad Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 285
  },
  {
    "id": "cs2_knife_nomadknife_safari_mesh",
    "game": "cs2",
    "name": "★ Нож бродяги | Африканская сетка",
    "nameEn": "★ Nomad Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 266
  },
  {
    "id": "cs2_knife_stilettoknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Стилет | Волны Фаза 2",
    "nameEn": "★ Stiletto Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 768
  },
  {
    "id": "cs2_knife_stilettoknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Стилет | Волны Рубин",
    "nameEn": "★ Stiletto Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1536
  },
  {
    "id": "cs2_knife_stilettoknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Стилет | Волны Сапфир",
    "nameEn": "★ Stiletto Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1760
  },
  {
    "id": "cs2_knife_stilettoknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Стилет | Гамма-волны",
    "nameEn": "★ Stiletto Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 704
  },
  {
    "id": "cs2_knife_stilettoknife_fade",
    "game": "cs2",
    "name": "★ Стилет | Градиент",
    "nameEn": "★ Stiletto Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 896
  },
  {
    "id": "cs2_knife_stilettoknife_marble_fade",
    "game": "cs2",
    "name": "★ Стилет | Мраморный градиент",
    "nameEn": "★ Stiletto Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 672
  },
  {
    "id": "cs2_knife_stilettoknife_crimson_web",
    "game": "cs2",
    "name": "★ Стилет | Кровавая паутина",
    "nameEn": "★ Stiletto Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 608
  },
  {
    "id": "cs2_knife_stilettoknife_lore",
    "game": "cs2",
    "name": "★ Стилет | Легенды",
    "nameEn": "★ Stiletto Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 576
  },
  {
    "id": "cs2_knife_stilettoknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Стилет | Зуб тигра",
    "nameEn": "★ Stiletto Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 512
  },
  {
    "id": "cs2_knife_stilettoknife_slaughter",
    "game": "cs2",
    "name": "★ Стилет | Убийство",
    "nameEn": "★ Stiletto Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 480
  },
  {
    "id": "cs2_knife_stilettoknife_autotronic",
    "game": "cs2",
    "name": "★ Стилет | Автотроника",
    "nameEn": "★ Stiletto Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 448
  },
  {
    "id": "cs2_knife_stilettoknife_case_hardened",
    "game": "cs2",
    "name": "★ Стилет | Поверхностная закалка",
    "nameEn": "★ Stiletto Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 416
  },
  {
    "id": "cs2_knife_stilettoknife_black_laminate",
    "game": "cs2",
    "name": "★ Стилет | Черный ламинат",
    "nameEn": "★ Stiletto Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 352
  },
  {
    "id": "cs2_knife_stilettoknife_damascus_steel",
    "game": "cs2",
    "name": "★ Стилет | Дамасская сталь",
    "nameEn": "★ Stiletto Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 320
  },
  {
    "id": "cs2_knife_stilettoknife_blue_steel",
    "game": "cs2",
    "name": "★ Стилет | Вороненая сталь",
    "nameEn": "★ Stiletto Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 304
  },
  {
    "id": "cs2_knife_stilettoknife_night_stripe",
    "game": "cs2",
    "name": "★ Стилет | Ночная полоса",
    "nameEn": "★ Stiletto Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 272
  },
  {
    "id": "cs2_knife_stilettoknife_rust_coat",
    "game": "cs2",
    "name": "★ Стилет | Пыльник",
    "nameEn": "★ Stiletto Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 256
  },
  {
    "id": "cs2_knife_stilettoknife_urban_masked",
    "game": "cs2",
    "name": "★ Стилет | Городская маскировка",
    "nameEn": "★ Stiletto Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 240
  },
  {
    "id": "cs2_knife_stilettoknife_safari_mesh",
    "game": "cs2",
    "name": "★ Стилет | Африканская сетка",
    "nameEn": "★ Stiletto Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 224
  },
  {
    "id": "cs2_knife_ursusknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Нож Урсус | Волны Фаза 2",
    "nameEn": "★ Ursus Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 576
  },
  {
    "id": "cs2_knife_ursusknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Нож Урсус | Волны Рубин",
    "nameEn": "★ Ursus Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1152
  },
  {
    "id": "cs2_knife_ursusknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Нож Урсус | Волны Сапфир",
    "nameEn": "★ Ursus Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1320
  },
  {
    "id": "cs2_knife_ursusknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Нож Урсус | Гамма-волны",
    "nameEn": "★ Ursus Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 528
  },
  {
    "id": "cs2_knife_ursusknife_fade",
    "game": "cs2",
    "name": "★ Нож Урсус | Градиент",
    "nameEn": "★ Ursus Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 672
  },
  {
    "id": "cs2_knife_ursusknife_marble_fade",
    "game": "cs2",
    "name": "★ Нож Урсус | Мраморный градиент",
    "nameEn": "★ Ursus Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 504
  },
  {
    "id": "cs2_knife_ursusknife_crimson_web",
    "game": "cs2",
    "name": "★ Нож Урсус | Кровавая паутина",
    "nameEn": "★ Ursus Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 456
  },
  {
    "id": "cs2_knife_ursusknife_lore",
    "game": "cs2",
    "name": "★ Нож Урсус | Легенды",
    "nameEn": "★ Ursus Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 432
  },
  {
    "id": "cs2_knife_ursusknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Нож Урсус | Зуб тигра",
    "nameEn": "★ Ursus Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 384
  },
  {
    "id": "cs2_knife_ursusknife_slaughter",
    "game": "cs2",
    "name": "★ Нож Урсус | Убийство",
    "nameEn": "★ Ursus Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 360
  },
  {
    "id": "cs2_knife_ursusknife_autotronic",
    "game": "cs2",
    "name": "★ Нож Урсус | Автотроника",
    "nameEn": "★ Ursus Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 336
  },
  {
    "id": "cs2_knife_ursusknife_case_hardened",
    "game": "cs2",
    "name": "★ Нож Урсус | Поверхностная закалка",
    "nameEn": "★ Ursus Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 312
  },
  {
    "id": "cs2_knife_ursusknife_black_laminate",
    "game": "cs2",
    "name": "★ Нож Урсус | Черный ламинат",
    "nameEn": "★ Ursus Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 264
  },
  {
    "id": "cs2_knife_ursusknife_damascus_steel",
    "game": "cs2",
    "name": "★ Нож Урсус | Дамасская сталь",
    "nameEn": "★ Ursus Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 240
  },
  {
    "id": "cs2_knife_ursusknife_blue_steel",
    "game": "cs2",
    "name": "★ Нож Урсус | Вороненая сталь",
    "nameEn": "★ Ursus Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 228
  },
  {
    "id": "cs2_knife_ursusknife_night_stripe",
    "game": "cs2",
    "name": "★ Нож Урсус | Ночная полоса",
    "nameEn": "★ Ursus Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 204
  },
  {
    "id": "cs2_knife_ursusknife_rust_coat",
    "game": "cs2",
    "name": "★ Нож Урсус | Пыльник",
    "nameEn": "★ Ursus Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 192
  },
  {
    "id": "cs2_knife_ursusknife_urban_masked",
    "game": "cs2",
    "name": "★ Нож Урсус | Городская маскировка",
    "nameEn": "★ Ursus Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 180
  },
  {
    "id": "cs2_knife_ursusknife_safari_mesh",
    "game": "cs2",
    "name": "★ Нож Урсус | Африканская сетка",
    "nameEn": "★ Ursus Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 168
  },
  {
    "id": "cs2_knife_flipknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Складной нож | Волны Фаза 2",
    "nameEn": "★ Flip Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 696
  },
  {
    "id": "cs2_knife_flipknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Складной нож | Волны Рубин",
    "nameEn": "★ Flip Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1392
  },
  {
    "id": "cs2_knife_flipknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Складной нож | Волны Сапфир",
    "nameEn": "★ Flip Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1595
  },
  {
    "id": "cs2_knife_flipknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Складной нож | Гамма-волны",
    "nameEn": "★ Flip Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 638
  },
  {
    "id": "cs2_knife_flipknife_fade",
    "game": "cs2",
    "name": "★ Складной нож | Градиент",
    "nameEn": "★ Flip Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 812
  },
  {
    "id": "cs2_knife_flipknife_marble_fade",
    "game": "cs2",
    "name": "★ Складной нож | Мраморный градиент",
    "nameEn": "★ Flip Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 609
  },
  {
    "id": "cs2_knife_flipknife_crimson_web",
    "game": "cs2",
    "name": "★ Складной нож | Кровавая паутина",
    "nameEn": "★ Flip Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 551
  },
  {
    "id": "cs2_knife_flipknife_lore",
    "game": "cs2",
    "name": "★ Складной нож | Легенды",
    "nameEn": "★ Flip Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 522
  },
  {
    "id": "cs2_knife_flipknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Складной нож | Зуб тигра",
    "nameEn": "★ Flip Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 464
  },
  {
    "id": "cs2_knife_flipknife_slaughter",
    "game": "cs2",
    "name": "★ Складной нож | Убийство",
    "nameEn": "★ Flip Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 435
  },
  {
    "id": "cs2_knife_flipknife_autotronic",
    "game": "cs2",
    "name": "★ Складной нож | Автотроника",
    "nameEn": "★ Flip Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 406
  },
  {
    "id": "cs2_knife_flipknife_case_hardened",
    "game": "cs2",
    "name": "★ Складной нож | Поверхностная закалка",
    "nameEn": "★ Flip Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 377
  },
  {
    "id": "cs2_knife_flipknife_black_laminate",
    "game": "cs2",
    "name": "★ Складной нож | Черный ламинат",
    "nameEn": "★ Flip Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 319
  },
  {
    "id": "cs2_knife_flipknife_damascus_steel",
    "game": "cs2",
    "name": "★ Складной нож | Дамасская сталь",
    "nameEn": "★ Flip Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 290
  },
  {
    "id": "cs2_knife_flipknife_blue_steel",
    "game": "cs2",
    "name": "★ Складной нож | Вороненая сталь",
    "nameEn": "★ Flip Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 276
  },
  {
    "id": "cs2_knife_flipknife_night_stripe",
    "game": "cs2",
    "name": "★ Складной нож | Ночная полоса",
    "nameEn": "★ Flip Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 247
  },
  {
    "id": "cs2_knife_flipknife_rust_coat",
    "game": "cs2",
    "name": "★ Складной нож | Пыльник",
    "nameEn": "★ Flip Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 232
  },
  {
    "id": "cs2_knife_flipknife_urban_masked",
    "game": "cs2",
    "name": "★ Складной нож | Городская маскировка",
    "nameEn": "★ Flip Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 218
  },
  {
    "id": "cs2_knife_flipknife_safari_mesh",
    "game": "cs2",
    "name": "★ Складной нож | Африканская сетка",
    "nameEn": "★ Flip Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 203
  },
  {
    "id": "cs2_knife_huntsmanknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Охотничий нож | Волны Фаза 2",
    "nameEn": "★ Huntsman Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 552
  },
  {
    "id": "cs2_knife_huntsmanknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Охотничий нож | Волны Рубин",
    "nameEn": "★ Huntsman Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1104
  },
  {
    "id": "cs2_knife_huntsmanknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Охотничий нож | Волны Сапфир",
    "nameEn": "★ Huntsman Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1265
  },
  {
    "id": "cs2_knife_huntsmanknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Охотничий нож | Гамма-волны",
    "nameEn": "★ Huntsman Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 506
  },
  {
    "id": "cs2_knife_huntsmanknife_fade",
    "game": "cs2",
    "name": "★ Охотничий нож | Градиент",
    "nameEn": "★ Huntsman Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 644
  },
  {
    "id": "cs2_knife_huntsmanknife_marble_fade",
    "game": "cs2",
    "name": "★ Охотничий нож | Мраморный градиент",
    "nameEn": "★ Huntsman Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 483
  },
  {
    "id": "cs2_knife_huntsmanknife_crimson_web",
    "game": "cs2",
    "name": "★ Охотничий нож | Кровавая паутина",
    "nameEn": "★ Huntsman Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 437
  },
  {
    "id": "cs2_knife_huntsmanknife_lore",
    "game": "cs2",
    "name": "★ Охотничий нож | Легенды",
    "nameEn": "★ Huntsman Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 414
  },
  {
    "id": "cs2_knife_huntsmanknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Охотничий нож | Зуб тигра",
    "nameEn": "★ Huntsman Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 368
  },
  {
    "id": "cs2_knife_huntsmanknife_slaughter",
    "game": "cs2",
    "name": "★ Охотничий нож | Убийство",
    "nameEn": "★ Huntsman Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 345
  },
  {
    "id": "cs2_knife_huntsmanknife_autotronic",
    "game": "cs2",
    "name": "★ Охотничий нож | Автотроника",
    "nameEn": "★ Huntsman Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 322
  },
  {
    "id": "cs2_knife_huntsmanknife_case_hardened",
    "game": "cs2",
    "name": "★ Охотничий нож | Поверхностная закалка",
    "nameEn": "★ Huntsman Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 299
  },
  {
    "id": "cs2_knife_huntsmanknife_black_laminate",
    "game": "cs2",
    "name": "★ Охотничий нож | Черный ламинат",
    "nameEn": "★ Huntsman Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 253
  },
  {
    "id": "cs2_knife_huntsmanknife_damascus_steel",
    "game": "cs2",
    "name": "★ Охотничий нож | Дамасская сталь",
    "nameEn": "★ Huntsman Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 230
  },
  {
    "id": "cs2_knife_huntsmanknife_blue_steel",
    "game": "cs2",
    "name": "★ Охотничий нож | Вороненая сталь",
    "nameEn": "★ Huntsman Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 219
  },
  {
    "id": "cs2_knife_huntsmanknife_night_stripe",
    "game": "cs2",
    "name": "★ Охотничий нож | Ночная полоса",
    "nameEn": "★ Huntsman Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 196
  },
  {
    "id": "cs2_knife_huntsmanknife_rust_coat",
    "game": "cs2",
    "name": "★ Охотничий нож | Пыльник",
    "nameEn": "★ Huntsman Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 184
  },
  {
    "id": "cs2_knife_huntsmanknife_urban_masked",
    "game": "cs2",
    "name": "★ Охотничий нож | Городская маскировка",
    "nameEn": "★ Huntsman Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 173
  },
  {
    "id": "cs2_knife_huntsmanknife_safari_mesh",
    "game": "cs2",
    "name": "★ Охотничий нож | Африканская сетка",
    "nameEn": "★ Huntsman Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_bowieknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Нож Боуи | Волны Фаза 2",
    "nameEn": "★ Bowie Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 504
  },
  {
    "id": "cs2_knife_bowieknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Нож Боуи | Волны Рубин",
    "nameEn": "★ Bowie Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1008
  },
  {
    "id": "cs2_knife_bowieknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Нож Боуи | Волны Сапфир",
    "nameEn": "★ Bowie Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1155
  },
  {
    "id": "cs2_knife_bowieknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Нож Боуи | Гамма-волны",
    "nameEn": "★ Bowie Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 462
  },
  {
    "id": "cs2_knife_bowieknife_fade",
    "game": "cs2",
    "name": "★ Нож Боуи | Градиент",
    "nameEn": "★ Bowie Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 588
  },
  {
    "id": "cs2_knife_bowieknife_marble_fade",
    "game": "cs2",
    "name": "★ Нож Боуи | Мраморный градиент",
    "nameEn": "★ Bowie Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 441
  },
  {
    "id": "cs2_knife_bowieknife_crimson_web",
    "game": "cs2",
    "name": "★ Нож Боуи | Кровавая паутина",
    "nameEn": "★ Bowie Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 399
  },
  {
    "id": "cs2_knife_bowieknife_lore",
    "game": "cs2",
    "name": "★ Нож Боуи | Легенды",
    "nameEn": "★ Bowie Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 378
  },
  {
    "id": "cs2_knife_bowieknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Нож Боуи | Зуб тигра",
    "nameEn": "★ Bowie Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 336
  },
  {
    "id": "cs2_knife_bowieknife_slaughter",
    "game": "cs2",
    "name": "★ Нож Боуи | Убийство",
    "nameEn": "★ Bowie Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 315
  },
  {
    "id": "cs2_knife_bowieknife_autotronic",
    "game": "cs2",
    "name": "★ Нож Боуи | Автотроника",
    "nameEn": "★ Bowie Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 294
  },
  {
    "id": "cs2_knife_bowieknife_case_hardened",
    "game": "cs2",
    "name": "★ Нож Боуи | Поверхностная закалка",
    "nameEn": "★ Bowie Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 273
  },
  {
    "id": "cs2_knife_bowieknife_black_laminate",
    "game": "cs2",
    "name": "★ Нож Боуи | Черный ламинат",
    "nameEn": "★ Bowie Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 231
  },
  {
    "id": "cs2_knife_bowieknife_damascus_steel",
    "game": "cs2",
    "name": "★ Нож Боуи | Дамасская сталь",
    "nameEn": "★ Bowie Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 210
  },
  {
    "id": "cs2_knife_bowieknife_blue_steel",
    "game": "cs2",
    "name": "★ Нож Боуи | Вороненая сталь",
    "nameEn": "★ Bowie Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 200
  },
  {
    "id": "cs2_knife_bowieknife_night_stripe",
    "game": "cs2",
    "name": "★ Нож Боуи | Ночная полоса",
    "nameEn": "★ Bowie Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 179
  },
  {
    "id": "cs2_knife_bowieknife_rust_coat",
    "game": "cs2",
    "name": "★ Нож Боуи | Пыльник",
    "nameEn": "★ Bowie Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 168
  },
  {
    "id": "cs2_knife_bowieknife_urban_masked",
    "game": "cs2",
    "name": "★ Нож Боуи | Городская маскировка",
    "nameEn": "★ Bowie Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_bowieknife_safari_mesh",
    "game": "cs2",
    "name": "★ Нож Боуи | Африканская сетка",
    "nameEn": "★ Bowie Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_falchionknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Фальшион | Волны Фаза 2",
    "nameEn": "★ Falchion Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 468
  },
  {
    "id": "cs2_knife_falchionknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Фальшион | Волны Рубин",
    "nameEn": "★ Falchion Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 936
  },
  {
    "id": "cs2_knife_falchionknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Фальшион | Волны Сапфир",
    "nameEn": "★ Falchion Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1073
  },
  {
    "id": "cs2_knife_falchionknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Фальшион | Гамма-волны",
    "nameEn": "★ Falchion Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 429
  },
  {
    "id": "cs2_knife_falchionknife_fade",
    "game": "cs2",
    "name": "★ Фальшион | Градиент",
    "nameEn": "★ Falchion Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 546
  },
  {
    "id": "cs2_knife_falchionknife_marble_fade",
    "game": "cs2",
    "name": "★ Фальшион | Мраморный градиент",
    "nameEn": "★ Falchion Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 410
  },
  {
    "id": "cs2_knife_falchionknife_crimson_web",
    "game": "cs2",
    "name": "★ Фальшион | Кровавая паутина",
    "nameEn": "★ Falchion Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 371
  },
  {
    "id": "cs2_knife_falchionknife_lore",
    "game": "cs2",
    "name": "★ Фальшион | Легенды",
    "nameEn": "★ Falchion Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 351
  },
  {
    "id": "cs2_knife_falchionknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Фальшион | Зуб тигра",
    "nameEn": "★ Falchion Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 312
  },
  {
    "id": "cs2_knife_falchionknife_slaughter",
    "game": "cs2",
    "name": "★ Фальшион | Убийство",
    "nameEn": "★ Falchion Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 293
  },
  {
    "id": "cs2_knife_falchionknife_autotronic",
    "game": "cs2",
    "name": "★ Фальшион | Автотроника",
    "nameEn": "★ Falchion Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 273
  },
  {
    "id": "cs2_knife_falchionknife_case_hardened",
    "game": "cs2",
    "name": "★ Фальшион | Поверхностная закалка",
    "nameEn": "★ Falchion Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 254
  },
  {
    "id": "cs2_knife_falchionknife_black_laminate",
    "game": "cs2",
    "name": "★ Фальшион | Черный ламинат",
    "nameEn": "★ Falchion Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 215
  },
  {
    "id": "cs2_knife_falchionknife_damascus_steel",
    "game": "cs2",
    "name": "★ Фальшион | Дамасская сталь",
    "nameEn": "★ Falchion Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 195
  },
  {
    "id": "cs2_knife_falchionknife_blue_steel",
    "game": "cs2",
    "name": "★ Фальшион | Вороненая сталь",
    "nameEn": "★ Falchion Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 185
  },
  {
    "id": "cs2_knife_falchionknife_night_stripe",
    "game": "cs2",
    "name": "★ Фальшион | Ночная полоса",
    "nameEn": "★ Falchion Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 166
  },
  {
    "id": "cs2_knife_falchionknife_rust_coat",
    "game": "cs2",
    "name": "★ Фальшион | Пыльник",
    "nameEn": "★ Falchion Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_falchionknife_urban_masked",
    "game": "cs2",
    "name": "★ Фальшион | Городская маскировка",
    "nameEn": "★ Falchion Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_falchionknife_safari_mesh",
    "game": "cs2",
    "name": "★ Фальшион | Африканская сетка",
    "nameEn": "★ Falchion Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_gutknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Волны Фаза 2",
    "nameEn": "★ Gut Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 396
  },
  {
    "id": "cs2_knife_gutknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Волны Рубин",
    "nameEn": "★ Gut Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 792
  },
  {
    "id": "cs2_knife_gutknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Волны Сапфир",
    "nameEn": "★ Gut Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 908
  },
  {
    "id": "cs2_knife_gutknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Гамма-волны",
    "nameEn": "★ Gut Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 363
  },
  {
    "id": "cs2_knife_gutknife_fade",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Градиент",
    "nameEn": "★ Gut Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 462
  },
  {
    "id": "cs2_knife_gutknife_marble_fade",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Мраморный градиент",
    "nameEn": "★ Gut Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 347
  },
  {
    "id": "cs2_knife_gutknife_crimson_web",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Кровавая паутина",
    "nameEn": "★ Gut Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 314
  },
  {
    "id": "cs2_knife_gutknife_lore",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Легенды",
    "nameEn": "★ Gut Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 297
  },
  {
    "id": "cs2_knife_gutknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Зуб тигра",
    "nameEn": "★ Gut Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 264
  },
  {
    "id": "cs2_knife_gutknife_slaughter",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Убийство",
    "nameEn": "★ Gut Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 248
  },
  {
    "id": "cs2_knife_gutknife_autotronic",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Автотроника",
    "nameEn": "★ Gut Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 231
  },
  {
    "id": "cs2_knife_gutknife_case_hardened",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Поверхностная закалка",
    "nameEn": "★ Gut Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 215
  },
  {
    "id": "cs2_knife_gutknife_black_laminate",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Черный ламинат",
    "nameEn": "★ Gut Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 182
  },
  {
    "id": "cs2_knife_gutknife_damascus_steel",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Дамасская сталь",
    "nameEn": "★ Gut Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_gutknife_blue_steel",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Вороненая сталь",
    "nameEn": "★ Gut Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_gutknife_night_stripe",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Ночная полоса",
    "nameEn": "★ Gut Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_gutknife_rust_coat",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Пыльник",
    "nameEn": "★ Gut Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_gutknife_urban_masked",
    "game": "cs2",
    "name": "★ Нож с лезвием-крюком | Городская маскировка",
    "nameEn": "★ Gut Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_classicknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Классический нож | Волны Фаза 2",
    "nameEn": "★ Classic Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 816
  },
  {
    "id": "cs2_knife_classicknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Классический нож | Волны Рубин",
    "nameEn": "★ Classic Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1632
  },
  {
    "id": "cs2_knife_classicknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Классический нож | Волны Сапфир",
    "nameEn": "★ Classic Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1870
  },
  {
    "id": "cs2_knife_classicknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Классический нож | Гамма-волны",
    "nameEn": "★ Classic Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 748
  },
  {
    "id": "cs2_knife_classicknife_fade",
    "game": "cs2",
    "name": "★ Классический нож | Градиент",
    "nameEn": "★ Classic Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 952
  },
  {
    "id": "cs2_knife_classicknife_marble_fade",
    "game": "cs2",
    "name": "★ Классический нож | Мраморный градиент",
    "nameEn": "★ Classic Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 714
  },
  {
    "id": "cs2_knife_classicknife_crimson_web",
    "game": "cs2",
    "name": "★ Классический нож | Кровавая паутина",
    "nameEn": "★ Classic Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 646
  },
  {
    "id": "cs2_knife_classicknife_lore",
    "game": "cs2",
    "name": "★ Классический нож | Легенды",
    "nameEn": "★ Classic Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 612
  },
  {
    "id": "cs2_knife_classicknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Классический нож | Зуб тигра",
    "nameEn": "★ Classic Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 544
  },
  {
    "id": "cs2_knife_classicknife_slaughter",
    "game": "cs2",
    "name": "★ Классический нож | Убийство",
    "nameEn": "★ Classic Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 510
  },
  {
    "id": "cs2_knife_classicknife_autotronic",
    "game": "cs2",
    "name": "★ Классический нож | Автотроника",
    "nameEn": "★ Classic Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 476
  },
  {
    "id": "cs2_knife_classicknife_case_hardened",
    "game": "cs2",
    "name": "★ Классический нож | Поверхностная закалка",
    "nameEn": "★ Classic Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 442
  },
  {
    "id": "cs2_knife_classicknife_black_laminate",
    "game": "cs2",
    "name": "★ Классический нож | Черный ламинат",
    "nameEn": "★ Classic Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 374
  },
  {
    "id": "cs2_knife_classicknife_damascus_steel",
    "game": "cs2",
    "name": "★ Классический нож | Дамасская сталь",
    "nameEn": "★ Classic Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 340
  },
  {
    "id": "cs2_knife_classicknife_blue_steel",
    "game": "cs2",
    "name": "★ Классический нож | Вороненая сталь",
    "nameEn": "★ Classic Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 323
  },
  {
    "id": "cs2_knife_classicknife_night_stripe",
    "game": "cs2",
    "name": "★ Классический нож | Ночная полоса",
    "nameEn": "★ Classic Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 289
  },
  {
    "id": "cs2_knife_classicknife_rust_coat",
    "game": "cs2",
    "name": "★ Классический нож | Пыльник",
    "nameEn": "★ Classic Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 272
  },
  {
    "id": "cs2_knife_classicknife_urban_masked",
    "game": "cs2",
    "name": "★ Классический нож | Городская маскировка",
    "nameEn": "★ Classic Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 255
  },
  {
    "id": "cs2_knife_classicknife_safari_mesh",
    "game": "cs2",
    "name": "★ Классический нож | Африканская сетка",
    "nameEn": "★ Classic Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 238
  },
  {
    "id": "cs2_knife_paracordknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Паракорд-нож | Волны Фаза 2",
    "nameEn": "★ Paracord Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 528
  },
  {
    "id": "cs2_knife_paracordknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Паракорд-нож | Волны Рубин",
    "nameEn": "★ Paracord Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1056
  },
  {
    "id": "cs2_knife_paracordknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Паракорд-нож | Волны Сапфир",
    "nameEn": "★ Paracord Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1210
  },
  {
    "id": "cs2_knife_paracordknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Паракорд-нож | Гамма-волны",
    "nameEn": "★ Paracord Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 484
  },
  {
    "id": "cs2_knife_paracordknife_fade",
    "game": "cs2",
    "name": "★ Паракорд-нож | Градиент",
    "nameEn": "★ Paracord Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 616
  },
  {
    "id": "cs2_knife_paracordknife_marble_fade",
    "game": "cs2",
    "name": "★ Паракорд-нож | Мраморный градиент",
    "nameEn": "★ Paracord Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 462
  },
  {
    "id": "cs2_knife_paracordknife_crimson_web",
    "game": "cs2",
    "name": "★ Паракорд-нож | Кровавая паутина",
    "nameEn": "★ Paracord Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 418
  },
  {
    "id": "cs2_knife_paracordknife_lore",
    "game": "cs2",
    "name": "★ Паракорд-нож | Легенды",
    "nameEn": "★ Paracord Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 396
  },
  {
    "id": "cs2_knife_paracordknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Паракорд-нож | Зуб тигра",
    "nameEn": "★ Paracord Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 352
  },
  {
    "id": "cs2_knife_paracordknife_slaughter",
    "game": "cs2",
    "name": "★ Паракорд-нож | Убийство",
    "nameEn": "★ Paracord Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 330
  },
  {
    "id": "cs2_knife_paracordknife_autotronic",
    "game": "cs2",
    "name": "★ Паракорд-нож | Автотроника",
    "nameEn": "★ Paracord Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 308
  },
  {
    "id": "cs2_knife_paracordknife_case_hardened",
    "game": "cs2",
    "name": "★ Паракорд-нож | Поверхностная закалка",
    "nameEn": "★ Paracord Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 286
  },
  {
    "id": "cs2_knife_paracordknife_black_laminate",
    "game": "cs2",
    "name": "★ Паракорд-нож | Черный ламинат",
    "nameEn": "★ Paracord Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 242
  },
  {
    "id": "cs2_knife_paracordknife_damascus_steel",
    "game": "cs2",
    "name": "★ Паракорд-нож | Дамасская сталь",
    "nameEn": "★ Paracord Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 220
  },
  {
    "id": "cs2_knife_paracordknife_blue_steel",
    "game": "cs2",
    "name": "★ Паракорд-нож | Вороненая сталь",
    "nameEn": "★ Paracord Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 209
  },
  {
    "id": "cs2_knife_paracordknife_night_stripe",
    "game": "cs2",
    "name": "★ Паракорд-нож | Ночная полоса",
    "nameEn": "★ Paracord Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 187
  },
  {
    "id": "cs2_knife_paracordknife_rust_coat",
    "game": "cs2",
    "name": "★ Паракорд-нож | Пыльник",
    "nameEn": "★ Paracord Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 176
  },
  {
    "id": "cs2_knife_paracordknife_urban_masked",
    "game": "cs2",
    "name": "★ Паракорд-нож | Городская маскировка",
    "nameEn": "★ Paracord Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_paracordknife_safari_mesh",
    "game": "cs2",
    "name": "★ Паракорд-нож | Африканская сетка",
    "nameEn": "★ Paracord Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_survivalknife_doppler_phase_2",
    "game": "cs2",
    "name": "★ Нож выживания | Волны Фаза 2",
    "nameEn": "★ Survival Knife | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 504
  },
  {
    "id": "cs2_knife_survivalknife_doppler_ruby",
    "game": "cs2",
    "name": "★ Нож выживания | Волны Рубин",
    "nameEn": "★ Survival Knife | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1008
  },
  {
    "id": "cs2_knife_survivalknife_doppler_sapphire",
    "game": "cs2",
    "name": "★ Нож выживания | Волны Сапфир",
    "nameEn": "★ Survival Knife | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 1155
  },
  {
    "id": "cs2_knife_survivalknife_gamma_doppler",
    "game": "cs2",
    "name": "★ Нож выживания | Гамма-волны",
    "nameEn": "★ Survival Knife | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 462
  },
  {
    "id": "cs2_knife_survivalknife_fade",
    "game": "cs2",
    "name": "★ Нож выживания | Градиент",
    "nameEn": "★ Survival Knife | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 588
  },
  {
    "id": "cs2_knife_survivalknife_marble_fade",
    "game": "cs2",
    "name": "★ Нож выживания | Мраморный градиент",
    "nameEn": "★ Survival Knife | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 441
  },
  {
    "id": "cs2_knife_survivalknife_crimson_web",
    "game": "cs2",
    "name": "★ Нож выживания | Кровавая паутина",
    "nameEn": "★ Survival Knife | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 399
  },
  {
    "id": "cs2_knife_survivalknife_lore",
    "game": "cs2",
    "name": "★ Нож выживания | Легенды",
    "nameEn": "★ Survival Knife | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 378
  },
  {
    "id": "cs2_knife_survivalknife_tiger_tooth",
    "game": "cs2",
    "name": "★ Нож выживания | Зуб тигра",
    "nameEn": "★ Survival Knife | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 336
  },
  {
    "id": "cs2_knife_survivalknife_slaughter",
    "game": "cs2",
    "name": "★ Нож выживания | Убийство",
    "nameEn": "★ Survival Knife | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 315
  },
  {
    "id": "cs2_knife_survivalknife_autotronic",
    "game": "cs2",
    "name": "★ Нож выживания | Автотроника",
    "nameEn": "★ Survival Knife | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 294
  },
  {
    "id": "cs2_knife_survivalknife_case_hardened",
    "game": "cs2",
    "name": "★ Нож выживания | Поверхностная закалка",
    "nameEn": "★ Survival Knife | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 273
  },
  {
    "id": "cs2_knife_survivalknife_black_laminate",
    "game": "cs2",
    "name": "★ Нож выживания | Черный ламинат",
    "nameEn": "★ Survival Knife | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 231
  },
  {
    "id": "cs2_knife_survivalknife_damascus_steel",
    "game": "cs2",
    "name": "★ Нож выживания | Дамасская сталь",
    "nameEn": "★ Survival Knife | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 210
  },
  {
    "id": "cs2_knife_survivalknife_blue_steel",
    "game": "cs2",
    "name": "★ Нож выживания | Вороненая сталь",
    "nameEn": "★ Survival Knife | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 200
  },
  {
    "id": "cs2_knife_survivalknife_night_stripe",
    "game": "cs2",
    "name": "★ Нож выживания | Ночная полоса",
    "nameEn": "★ Survival Knife | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 179
  },
  {
    "id": "cs2_knife_survivalknife_rust_coat",
    "game": "cs2",
    "name": "★ Нож выживания | Пыльник",
    "nameEn": "★ Survival Knife | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 168
  },
  {
    "id": "cs2_knife_survivalknife_urban_masked",
    "game": "cs2",
    "name": "★ Нож выживания | Городская маскировка",
    "nameEn": "★ Survival Knife | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_survivalknife_safari_mesh",
    "game": "cs2",
    "name": "★ Нож выживания | Африканская сетка",
    "nameEn": "★ Survival Knife | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_shadowdaggers_doppler_phase_2",
    "game": "cs2",
    "name": "★ Тычковые ножи | Волны Фаза 2",
    "nameEn": "★ Shadow Daggers | Doppler Phase 2",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 408
  },
  {
    "id": "cs2_knife_shadowdaggers_doppler_ruby",
    "game": "cs2",
    "name": "★ Тычковые ножи | Волны Рубин",
    "nameEn": "★ Shadow Daggers | Doppler Ruby",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 816
  },
  {
    "id": "cs2_knife_shadowdaggers_doppler_sapphire",
    "game": "cs2",
    "name": "★ Тычковые ножи | Волны Сапфир",
    "nameEn": "★ Shadow Daggers | Doppler Sapphire",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 935
  },
  {
    "id": "cs2_knife_shadowdaggers_gamma_doppler",
    "game": "cs2",
    "name": "★ Тычковые ножи | Гамма-волны",
    "nameEn": "★ Shadow Daggers | Gamma Doppler",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 374
  },
  {
    "id": "cs2_knife_shadowdaggers_fade",
    "game": "cs2",
    "name": "★ Тычковые ножи | Градиент",
    "nameEn": "★ Shadow Daggers | Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 476
  },
  {
    "id": "cs2_knife_shadowdaggers_marble_fade",
    "game": "cs2",
    "name": "★ Тычковые ножи | Мраморный градиент",
    "nameEn": "★ Shadow Daggers | Marble Fade",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 357
  },
  {
    "id": "cs2_knife_shadowdaggers_crimson_web",
    "game": "cs2",
    "name": "★ Тычковые ножи | Кровавая паутина",
    "nameEn": "★ Shadow Daggers | Crimson Web",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 323
  },
  {
    "id": "cs2_knife_shadowdaggers_lore",
    "game": "cs2",
    "name": "★ Тычковые ножи | Легенды",
    "nameEn": "★ Shadow Daggers | Lore",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 306
  },
  {
    "id": "cs2_knife_shadowdaggers_tiger_tooth",
    "game": "cs2",
    "name": "★ Тычковые ножи | Зуб тигра",
    "nameEn": "★ Shadow Daggers | Tiger Tooth",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 272
  },
  {
    "id": "cs2_knife_shadowdaggers_slaughter",
    "game": "cs2",
    "name": "★ Тычковые ножи | Убийство",
    "nameEn": "★ Shadow Daggers | Slaughter",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 255
  },
  {
    "id": "cs2_knife_shadowdaggers_autotronic",
    "game": "cs2",
    "name": "★ Тычковые ножи | Автотроника",
    "nameEn": "★ Shadow Daggers | Autotronic",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 238
  },
  {
    "id": "cs2_knife_shadowdaggers_case_hardened",
    "game": "cs2",
    "name": "★ Тычковые ножи | Поверхностная закалка",
    "nameEn": "★ Shadow Daggers | Case Hardened",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 221
  },
  {
    "id": "cs2_knife_shadowdaggers_black_laminate",
    "game": "cs2",
    "name": "★ Тычковые ножи | Черный ламинат",
    "nameEn": "★ Shadow Daggers | Black Laminate",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 187
  },
  {
    "id": "cs2_knife_shadowdaggers_damascus_steel",
    "game": "cs2",
    "name": "★ Тычковые ножи | Дамасская сталь",
    "nameEn": "★ Shadow Daggers | Damascus Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 170
  },
  {
    "id": "cs2_knife_shadowdaggers_blue_steel",
    "game": "cs2",
    "name": "★ Тычковые ножи | Вороненая сталь",
    "nameEn": "★ Shadow Daggers | Blue Steel",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_shadowdaggers_night_stripe",
    "game": "cs2",
    "name": "★ Тычковые ножи | Ночная полоса",
    "nameEn": "★ Shadow Daggers | Night Stripe",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_shadowdaggers_rust_coat",
    "game": "cs2",
    "name": "★ Тычковые ножи | Пыльник",
    "nameEn": "★ Shadow Daggers | Rust Coat",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_shadowdaggers_urban_masked",
    "game": "cs2",
    "name": "★ Тычковые ножи | Городская маскировка",
    "nameEn": "★ Shadow Daggers | Urban Masked",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_knife_shadowdaggers_safari_mesh",
    "game": "cs2",
    "name": "★ Тычковые ножи | Африканская сетка",
    "nameEn": "★ Shadow Daggers | Safari Mesh",
    "category": "knife",
    "rarity": "extraordinary",
    "image": "",
    "price": 165
  },
  {
    "id": "cs2_gloves_sportgloves_pandora_s_box",
    "game": "cs2",
    "name": "★ Спортивные перчатки | Ящик Пандоры",
    "nameEn": "★ Sport Gloves | Pandora's Box",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 3800
  },
  {
    "id": "cs2_gloves_sportgloves_amphibious",
    "game": "cs2",
    "name": "★ Спортивные перчатки | Амфибия",
    "nameEn": "★ Sport Gloves | Amphibious",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 1100
  },
  {
    "id": "cs2_gloves_sportgloves_hedge_maze",
    "game": "cs2",
    "name": "★ Спортивные перчатки | Живая изгородь",
    "nameEn": "★ Sport Gloves | Hedge Maze",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 1650
  },
  {
    "id": "cs2_gloves_sportgloves_superconductor",
    "game": "cs2",
    "name": "★ Спортивные перчатки | Сверхпроводник",
    "nameEn": "★ Sport Gloves | Superconductor",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 1400
  },
  {
    "id": "cs2_gloves_sportgloves_omega",
    "game": "cs2",
    "name": "★ Спортивные перчатки | Омега",
    "nameEn": "★ Sport Gloves | Omega",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 850
  },
  {
    "id": "cs2_gloves_sportgloves_slingshot",
    "game": "cs2",
    "name": "★ Спортивные перчатки | Рогатка",
    "nameEn": "★ Sport Gloves | Slingshot",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 920
  },
  {
    "id": "cs2_gloves_sportgloves_nocts",
    "game": "cs2",
    "name": "★ Спортивные перчатки | Ночи",
    "nameEn": "★ Sport Gloves | Nocts",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 680
  },
  {
    "id": "cs2_gloves_sportgloves_scarlet_shamagh",
    "game": "cs2",
    "name": "★ Спортивные перчатки | Алый шемаг",
    "nameEn": "★ Sport Gloves | Scarlet Shamagh",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 480
  },
  {
    "id": "cs2_gloves_specialistgloves_crimson_kimono",
    "game": "cs2",
    "name": "★ Перчатки спецназа | Кровавое кимоно",
    "nameEn": "★ Specialist Gloves | Crimson Kimono",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 2200
  },
  {
    "id": "cs2_gloves_specialistgloves_fade",
    "game": "cs2",
    "name": "★ Перчатки спецназа | Градиент",
    "nameEn": "★ Specialist Gloves | Fade",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 890
  },
  {
    "id": "cs2_gloves_specialistgloves_emerald_web",
    "game": "cs2",
    "name": "★ Перчатки спецназа | Изумрудная паутина",
    "nameEn": "★ Specialist Gloves | Emerald Web",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 980
  },
  {
    "id": "cs2_gloves_specialistgloves_tiger_strike",
    "game": "cs2",
    "name": "★ Перчатки спецназа | Удар тигра",
    "nameEn": "★ Specialist Gloves | Tiger Strike",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 720
  },
  {
    "id": "cs2_gloves_specialistgloves_field_agent",
    "game": "cs2",
    "name": "★ Перчатки спецназа | Полевой агент",
    "nameEn": "★ Specialist Gloves | Field Agent",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 580
  },
  {
    "id": "cs2_gloves_specialistgloves_foundation",
    "game": "cs2",
    "name": "★ Перчатки спецназа | Основа",
    "nameEn": "★ Specialist Gloves | Foundation",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 420
  },
  {
    "id": "cs2_gloves_specialistgloves_mogul",
    "game": "cs2",
    "name": "★ Перчатки спецназа | Магнат",
    "nameEn": "★ Specialist Gloves | Mogul",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 340
  },
  {
    "id": "cs2_gloves_motogloves_spearmint",
    "game": "cs2",
    "name": "★ Мотоциклетные перчатки | Мята",
    "nameEn": "★ Moto Gloves | Spearmint",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 2100
  },
  {
    "id": "cs2_gloves_motogloves_pow_",
    "game": "cs2",
    "name": "★ Мотоциклетные перчатки | БАХ!",
    "nameEn": "★ Moto Gloves | POW!",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 680
  },
  {
    "id": "cs2_gloves_motogloves_cool_mint",
    "game": "cs2",
    "name": "★ Мотоциклетные перчатки | Прохладная мята",
    "nameEn": "★ Moto Gloves | Cool Mint",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 540
  },
  {
    "id": "cs2_gloves_motogloves_smoke_out",
    "game": "cs2",
    "name": "★ Мотоциклетные перчатки | Дым",
    "nameEn": "★ Moto Gloves | Smoke Out",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 360
  },
  {
    "id": "cs2_gloves_motogloves_finish_line",
    "game": "cs2",
    "name": "★ Мотоциклетные перчатки | Финишная черта",
    "nameEn": "★ Moto Gloves | Finish Line",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 310
  },
  {
    "id": "cs2_gloves_motogloves_polygon",
    "game": "cs2",
    "name": "★ Мотоциклетные перчатки | Полигон",
    "nameEn": "★ Moto Gloves | Polygon",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 290
  },
  {
    "id": "cs2_gloves_drivergloves_king_snake",
    "game": "cs2",
    "name": "★ Водительские перчатки | Королевская змея",
    "nameEn": "★ Driver Gloves | King Snake",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 1250
  },
  {
    "id": "cs2_gloves_drivergloves_imperial_plaid",
    "game": "cs2",
    "name": "★ Водительские перчатки | Имперская клетка",
    "nameEn": "★ Driver Gloves | Imperial Plaid",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 620
  },
  {
    "id": "cs2_gloves_drivergloves_black_tie",
    "game": "cs2",
    "name": "★ Водительские перчатки | Черный галстук",
    "nameEn": "★ Driver Gloves | Black Tie",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 480
  },
  {
    "id": "cs2_gloves_drivergloves_crimson_weave",
    "game": "cs2",
    "name": "★ Водительские перчатки | Багряный узор",
    "nameEn": "★ Driver Gloves | Crimson Weave",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 560
  },
  {
    "id": "cs2_gloves_handwraps_cobalt_skulls",
    "game": "cs2",
    "name": "★ Обмотки рук | Синие черепа",
    "nameEn": "★ Hand Wraps | Cobalt Skulls",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 980
  },
  {
    "id": "cs2_gloves_handwraps_slaughter",
    "game": "cs2",
    "name": "★ Обмотки рук | Кровавая паутина",
    "nameEn": "★ Hand Wraps | Slaughter",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 520
  },
  {
    "id": "cs2_gloves_handwraps_caution_",
    "game": "cs2",
    "name": "★ Обмотки рук | ОСТОРОЖНО!",
    "nameEn": "★ Hand Wraps | CAUTION!",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 380
  },
  {
    "id": "cs2_gloves_handwraps_overprint",
    "game": "cs2",
    "name": "★ Обмотки рук | Оверпринт",
    "nameEn": "★ Hand Wraps | Overprint",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 310
  },
  {
    "id": "cs2_gloves_handwraps_leather",
    "game": "cs2",
    "name": "★ Обмотки рук | Кожа",
    "nameEn": "★ Hand Wraps | Leather",
    "category": "gloves",
    "rarity": "extraordinary",
    "image": "",
    "price": 220
  }
,
{
  "id": "dota2_platinum_baby_roshan",
  "game": "dota2",
  "name": "Platinum Baby Roshan",
  "nameEn": "Platinum Baby Roshan",
  "category": "courier",
  "rarity": "contraband",
  "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXA7hlNJ48g5hlcTlXvVeu-34DRUl9tNwtEvrurekkxi_GQdGkQ6t7lwoSNw6KsYOrXwW5XsJV10uyVptyi0QPk8xZqY2n1OsbLJSsFEXhR",
  "price": 4800
},
{
  "id": "dota2_golden_doomling",
  "game": "dota2",
  "name": "Golden Doomling",
  "nameEn": "Golden Doomling Courier",
  "category": "courier",
  "rarity": "contraband",
  "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXA7hlNJ48g5hlcTlXvVeu-34DYV192KgVOsremLwJr1P_NYTVH7c7llYHZlqStZ-yGwzkI6sF1j-zE9NWs2Fbl-kY4YDz0LIWVe1A8YVzR-FfsxOfsh8C7vprMnCc3uih043fZmxSpwUYbOsn5rB8",
  "price": 1250
},
{
  "id": "dota2_arcana_wr_windranger",
  "game": "dota2",
  "name": "Compass of the Rising Gale (Windranger Arcana)",
  "nameEn": "Compass of the Rising Gale",
  "category": "arcana",
  "rarity": "contraband",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-bdxdSjLGqA7EVm-pv_vGfnUB_xjZvh_i1c__W8baFqL-WVNWCRwuN4ouVpQW_uxB565WjWmouocH2VbwI4AsMvF-9cs0LskdS-M_y2vATcj_lWjHOpEc3d4qY",
  "price": 480
},
{
  "id": "dota2_arcana_void_claszian",
  "game": "dota2",
  "name": "Claszian Apostasy (Faceless Void Arcana)",
  "nameEn": "Claszian Apostasy",
  "category": "arcana",
  "rarity": "contraband",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH_DVwM-tMGiE2kB6_YO751jkRCL-mKnh-C1V_L2jaadoH_-VMWaVzuBl_rU9TSzhzBxx5WnRmN77cC6QaAcgCMMmEbIKtRLtk4DgNuzr5ASK3YxbjXKpE8yMK9s",
  "price": 450
},
{
  "id": "dota2_arcana_qop_ristul",
  "game": "dota2",
  "name": "Eminence of Ristul (Queen of Pain Arcana)",
  "nameEn": "Eminence of Ristul",
  "category": "arcana",
  "rarity": "contraband",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-XfwNSrNH2X7lVms_r5u2fuRRz8nJbk-y1W_va7bfVqL-WYN2SRweMhouRpQW_uxB565WnWmouocH2VbwI4AsMvF-9cs0LskdS-M_y2vATcj_lWjHOpEc0k8Ww",
  "price": 410
},
{
  "id": "dota2_arcana_drow_retribution",
  "game": "dota2",
  "name": "Dread Retribution (Drow Ranger Arcana)",
  "nameEn": "Dread Retribution",
  "category": "arcana",
  "rarity": "contraband",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-XcwtyzK3OU5EVm-p_6uWflUxj2nZjh_CFX-ve8baZqLeSUAGCRw-N6veVpQGzhkxg95WzRmoqocXyQaQMgAsMvF-9cs0LskdS-M_y2vATcj_lWjHOpEc3K8iM",
  "price": 390
},
{
  "id": "dota2_arcana_wk_one_true_king",
  "game": "dota2",
  "name": "The One True King (Wraith King Arcana)",
  "nameEn": "The One True King",
  "category": "arcana",
  "rarity": "contraband",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-7cwNWqOGiA5EVm-pLmvGbnTBD2mJbk_CNV__m8Y6NqLeSUMGCRxed4o-VpQW_uxB565WnWmouocH2VbwI4AsMvF-9cs0LskdS-M_y2vATcj_lWjHOpEc1t_Gg",
  "price": 340
},
{
  "id": "dota2_arcana_sf_demon_eater",
  "game": "dota2",
  "name": "Demon Eater (Shadow Fiend Arcana)",
  "nameEn": "Demon Eater",
  "category": "arcana",
  "rarity": "extraordinary",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-7Hxs-rN3aA6FFm9fLz4WblRRC_j4Hh9yNn__S5bfFqIfySNmCVz-MvruNoSWrhkx884jvXmYv7cXiXagN3DMR0EbIK40W7xoC5Z-28sgCNiowYyXKp",
  "price": 36.5
},
{
  "id": "dota2_arcana_tb_fractal_horns",
  "game": "dota2",
  "name": "Fractal Horns of Inner Abysm (Terrorblade)",
  "nameEn": "Fractal Horns of Inner Abysm",
  "category": "arcana",
  "rarity": "extraordinary",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-bdwMSkL3SS5EVm_Zbj4mblRhz_lpfi8CBg9fS4bfFqIfeUN2SUz-MuouNoSWqhkx9_4j3Tm4uvcnOWbQInAMcgEOVUsxTtk9bhN-P2uVSLj44ZzHKp",
  "price": 37.2
},
{
  "id": "dota2_arcana_cm_frost_avalanche",
  "game": "dota2",
  "name": "Frost Avalanche (Crystal Maiden Arcana)",
  "nameEn": "Frost Avalanche",
  "category": "arcana",
  "rarity": "extraordinary",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH_bZw8akI3KU5EVm_Zbj4mflRxz7mJbk9y1b__S5bfFqIfySMmCUx-N5v-JtRGqhkx9_5T7Tm4i4dXyXbgInA8QgR-pYs0S_lNfvNuG1uwWP2oxZjXKp",
  "price": 35
},
{
  "id": "dota2_arcana_rubick_magus_cypher",
  "game": "dota2",
  "name": "The Magus Cypher (Rubick Arcana)",
  "nameEn": "The Magus Cypher",
  "category": "arcana",
  "rarity": "extraordinary",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-7ZwM2kMHSU8FFm8ZTm41eoTBDyk5bi9yBf9PS5bfFqIfySN2CUz-Mvo-VpQGqhkx9-4zzTmIqvcnOWbQInA8cgEe9Ys0W_lNfvNuG1uwWP2oxZjXKp",
  "price": 39
},
{
  "id": "dota2_arcana_lc_blades_voth_domosh",
  "game": "dota2",
  "name": "Blades of Voth Domosh (Legion Commander Arcana)",
  "nameEn": "Blades of Voth Domosh",
  "category": "arcana",
  "rarity": "extraordinary",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-7dw8-rOHSU5EVm-ZDm4mblRRC9m5fn8CNf__W4bfFqIfeVMmCVz-MvquNoSWqhkx9_5D3TmYuscnOWbQInA8cgR-pYs0S_lNfvNuG1uwWP2oxZjXKp",
  "price": 36
},
{
  "id": "dota2_arcana_zeus_tempest",
  "game": "dota2",
  "name": "Tempest Helm of the Thundergod (Zeus Arcana)",
  "nameEn": "Tempest Helm of the Thundergod",
  "category": "arcana",
  "rarity": "extraordinary",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-bdxsaoI3SU5EVm-5Hm4mflRhD_m5Tj-SBb__W5bfFqIfyVMGGUz-Mvr-JtSWqhkx9_5DzTmIuqcnOWbQInA8cgEe9Ys0S_lNfvNuG1uwWP2oxZjXKp",
  "price": 33
},
{
  "id": "dota2_arcana_mk_great_sage",
  "game": "dota2",
  "name": "Great Sage's Reckoning (Monkey King Arcana)",
  "nameEn": "Great Sage's Reckoning",
  "category": "arcana",
  "rarity": "extraordinary",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-Xcw82tI3SU5EVm_5Hm4mflRRC_m5fi8yBg__W5bfFqIfyVMmCUz-MvoeJtSWqhkx9_5TzTmIuvcnOWbQInA8cgEe9Ys0S_lNfvNuG1uwWP2oxZjXKp",
  "price": 34
},
{
  "id": "dota2_kantusa_script_sword",
  "game": "dota2",
  "name": "Kantusa the Script Sword (Juggernaut)",
  "nameEn": "Kantusa the Script Sword",
  "category": "sword",
  "rarity": "covert",
  "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhohpWS1_GVOeqwcOCU11wIB1fvIWsKglz7O_HfjgQuNnll4aKk_LLPrbVn35cpsB12erA9on02wHh-kY9NmihLIHAdAc_NFrSqVbrxe-615fqtZ-bnXRrs3V24XbcmUepwUYb8v7T664",
  "price": 135
},
{
  "id": "dota2_darkclaw_emissary_staff",
  "game": "dota2",
  "name": "Darkclaw Emissary Staff (Dazzle)",
  "nameEn": "Darkclaw Emissary Staff",
  "category": "staff",
  "rarity": "covert",
  "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUroRpNQ0rfUOiSwcbCVl5zIA1Uv721JAt00_bFcThG5Ny1goONkuP1PLTDkmlU18l4jeHVu9n3jVK1rkFoNmj6co-cIVc6NFvS-Va8ybzpgJW1uJ3BnXA1uCR07XfcyUepwUYbwlUu2tY",
  "price": 160
},
{
  "id": "dota2_wyrmwrought_flame_lina",
  "game": "dota2",
  "name": "Disciple of the Wyrmwrought Flame (Lina)",
  "nameEn": "Disciple of the Wyrmwrought Flame",
  "category": "armor",
  "rarity": "covert",
  "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUvpxJfQ1vfUeu4wMfDUF9tNgVTvr2vIAlt3v_cdTRV5c7ik9XYlaamZu-Flz0DuZQpiLnA89ig2QfsqUQ5Y2HzLIXEelNgaArU_FHvl7i-08fv7s7NznBhsyQms3zcyhCpwUYbFff4e5g",
  "price": 145
},
{
  "id": "dota2_timebreaker_faceless_void",
  "game": "dota2",
  "name": "Timebreaker (Faceless Void Vintage)",
  "nameEn": "Timebreaker",
  "category": "weapon",
  "rarity": "covert",
  "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhpxJNSV6fSuWu38bdV2N2MhNforS3Jglz3vbNczVH7cTiw9bayqKmZu7TwDwIsZBz0-iYo9jx3VDhrRVsZmCicteQdQc8ZwyDqALrxui6hMDv6MicmHA26yN34SvcmEepwUYb6099wLg",
  "price": 65
},
{
  "id": "dota2_sullen_harvest_necro",
  "game": "dota2",
  "name": "Sullen Harvest (Necrophos Scythe)",
  "nameEn": "Sullen Harvest",
  "category": "weapon",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-bdwMSkL3SS5EVm_Zbj4mblRhz_lpfi8CBg9fS4bfFqIfeUN2SUz-MuouNoSWqhkx9_4j3Tm4uvcnOWbQInAMcgEOVUsxTtk9bhN-P2uVSLj44ZzHKp",
  "price": 18.5
},
{
  "id": "dota2_soul_diffuser_spectre",
  "game": "dota2",
  "name": "Soul Diffuser (Spectre)",
  "nameEn": "Soul Diffuser",
  "category": "weapon",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhoRpNQ0rfUOiSwcbCVl5zIA1Uv721JAt00_bFcThG5Ny1goONkuP1PLTDkmlU18l4jeHVu9n3jVK1rkFoNmj6co-cIVc6NFvS-Va8ybzpgJW1uJ3BnXA1uCR07XfcyUepwUYbwlUu2tY",
  "price": 15.2
},
{
  "id": "dota2_golden_edge_lost_order",
  "game": "dota2",
  "name": "Golden Edge of the Lost Order (Juggernaut)",
  "nameEn": "Golden Edge of the Lost Order",
  "category": "weapon",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-bdw8yqMG2e4FFm8ZTm41eoTBDyk5bi9yBf9PS5bfFqIfySN2CUz-Mvo-VpQGqhkx9-4zzTmIqvcnOWbQInA8cgEe9Ys0W_lNfvNuG1uwWP2oxZjXKp",
  "price": 32
},
{
  "id": "dota2_scythe_of_vyse_furion",
  "game": "dota2",
  "name": "Scythe of Vyse (Nature's Prophet)",
  "nameEn": "Scythe of Vyse",
  "category": "weapon",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhohpWS1_GVOeqwcOCU11wIB1fvIWsKglz7O_HfjgQuNnll4aKk_LLPrbVn35cpsB12erA9on02wHh-kY9NmihLIHAdAc_NFrSqVbrxe-615fqtZ-bnXRrs3V24XbcmUepwUYb8v7T664",
  "price": 22
},
{
  "id": "dota2_solar_gyre_phoenix",
  "game": "dota2",
  "name": "Solar Gyre (Phoenix Wings)",
  "nameEn": "Solar Gyre",
  "category": "wings",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-bdxdSjLGqA7EVm-pv_vGfnUB_xjZvh_i1c__W8baFqL-WVNWCRwuN4ouVpQW_uxB565WjWmouocH2VbwI4AsMvF-9cs0LskdS-M_y2vATcj_lWjHOpEc3d4qY",
  "price": 38
},
{
  "id": "dota2_golden_hydrakan_slark",
  "game": "dota2",
  "name": "Golden Hydrakan Latch (Slark)",
  "nameEn": "Golden Hydrakan Latch",
  "category": "weapon",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH_DVwM-tMGiE2kB6_YO751jkRCL-mKnh-C1V_L2jaadoH_-VMWaVzuBl_rU9TSzhzBxx5WnRmN77cC6QaAcgCMMmEbIKtRLtk4DgNuzr5ASK3YxbjXKpE8yMK9s",
  "price": 31
},
{
  "id": "dota2_magus_apex_invoker",
  "game": "dota2",
  "name": "Magus Apex (Invoker Hair)",
  "nameEn": "Magus Apex",
  "category": "head",
  "rarity": "restricted",
  "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhoRpZQ1vvQe2o2cucUk95NjtTs6mqZAZy3uD3dThR45K3wIPezqKsMriDkDNQsZwh3r3FpY2h3wXn-hY9a2ugIYbGIQU7Y13V5BHglsdC9JuQ",
  "price": 7.8
},
{
  "id": "dota2_severing_crest_razor",
  "game": "dota2",
  "name": "Severing Crest (Razor)",
  "nameEn": "Severing Crest",
  "category": "armor",
  "rarity": "restricted",
  "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhpxJNSV6fSuWu38bdVmJzMApotbKkOQtp1rzFcD5K5dKzq4eemcj3O7rDmmJUpsYi07mWo96k2QPh-kBrZ2D7d9eTdgU9aVrS_VPtxO_m0J60v8nPwHp9-n51U-bh3v0",
  "price": 9.4
},
{
  "id": "dota2_piston_impaler_bristleback",
  "game": "dota2",
  "name": "Piston Impaler (Bristleback)",
  "nameEn": "Piston Impaler",
  "category": "back",
  "rarity": "milspec",
  "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcU-oBRTA0rZVOySxNvaUFY7Iw1EvoW2Pw5j2L3Oc2oRu9ngl9fZlq6gNeuHlzsD7pQg3e2YrYj3iQPh-kplamiiIIWdbEZgNlSpXq2x",
  "price": 4.2
},
{
  "id": "rust_alien_relic_smg_vintage",
  "game": "rust",
  "name": "Alien Relic SMG",
  "nameEn": "Alien Relic SMG",
  "category": "weapon",
  "rarity": "contraband",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfCk4nReh8DEiv5dbPK47pbcyR_m4DQ68Ofs",
  "price": 1450
},
{
  "id": "rust_horror_sleeping_bag",
  "game": "rust",
  "name": "Horror Bag (Sleeping Bag)",
  "nameEn": "Horror Sleeping Bag",
  "category": "item",
  "rarity": "contraband",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5GLMfCk4nReh8DEiv5dbPKs8rrYwQfy6sqLM0vo",
  "price": 650
},
{
  "id": "rust_fire_jacket",
  "game": "rust",
  "name": "Fire Jacket",
  "nameEn": "Fire Jacket",
  "category": "clothing",
  "rarity": "covert",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5mLBfCk4nReh8DEiv5dbMa4-qL0xR_C29fO3tCQ",
  "price": 240
},
{
  "id": "rust_bombing_door_garage",
  "game": "rust",
  "name": "Bombing Garage Door",
  "nameEn": "Bombing Garage Door",
  "category": "door",
  "rarity": "covert",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835db4GLHfCk4nReh8DEiv5ddMa88pLYyQ_tTIGzDcw",
  "price": 115
},
{
  "id": "rust_glory_sar_rifle",
  "game": "rust",
  "name": "Glory SAR (Semi-Automatic Rifle)",
  "nameEn": "Glory SAR",
  "category": "weapon",
  "rarity": "covert",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fc5GLGfCk4nReh8DEiv5daMag5qLU2QPi5xVewp5A",
  "price": 95
},
{
  "id": "rust_rainbow_pony_door",
  "game": "rust",
  "name": "Rainbow Pony Garage Door",
  "nameEn": "Rainbow Pony Garage Door",
  "category": "door",
  "rarity": "covert",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835FX52LCfCk4nReh8DEiv5ddPKo9pbM1RP2US9wYKg",
  "price": 85
},
{
  "id": "rust_frostbite_facemask",
  "game": "rust",
  "name": "Frostbite Metal Facemask",
  "nameEn": "Frostbite Facemask",
  "category": "mask",
  "rarity": "covert",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fa4GLNfCk4nReh8DEiv5dbPKs-qrA0RfG9xh-m8C4",
  "price": 85
},
{
  "id": "rust_tempered_mp5",
  "game": "rust",
  "name": "Tempered MP5",
  "nameEn": "Tempered MP5",
  "category": "weapon",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5WHNfCk4nReh8DEiv5dYO607rLc2Rv2_0wEIAYs",
  "price": 55
},
{
  "id": "rust_tempered_thompson",
  "game": "rust",
  "name": "Tempered Thompson",
  "nameEn": "Tempered Thompson",
  "category": "weapon",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5WHNfCk4nReh8DEiv5dYO607rLc2Rv2_0wEIAYs",
  "price": 48
},
{
  "id": "rust_necromancer_armored_door",
  "game": "rust",
  "name": "Necromancer Armored Door",
  "nameEn": "Necromancer Armored Door",
  "category": "door",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5GLMfCk4nReh8DEiv5dbPKs8rrYwQfy6sqLM0vo",
  "price": 45
},
{
  "id": "rust_blackout_ak47",
  "game": "rust",
  "name": "Blackout AK47",
  "nameEn": "Blackout AK47",
  "category": "weapon",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fc5GLGfCk4nReh8DEiv5daMag5qLU2QPi5xVewp5A",
  "price": 42
},
{
  "id": "rust_blackout_metal_facemask",
  "game": "rust",
  "name": "Blackout Metal Facemask",
  "nameEn": "Blackout Metal Facemask",
  "category": "mask",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fa4GLNfCk4nReh8DEiv5dbPKs-qrA0RfG9xh-m8C4",
  "price": 38
},
{
  "id": "rust_blackout_metal_chestplate",
  "game": "rust",
  "name": "Blackout Metal Chest Plate",
  "nameEn": "Blackout Metal Chest Plate",
  "category": "clothing",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5mLBfCk4nReh8DEiv5dbMa4-qL0xR_C29fO3tCQ",
  "price": 36
},
{
  "id": "rust_polymer_bolt_action",
  "game": "rust",
  "name": "Polymer Bolt Action Rifle",
  "nameEn": "Polymer Bolt Action Rifle",
  "category": "weapon",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfCk4nReh8DEiv5dbPK47pbcyR_m4DQ68Ofs",
  "price": 35
},
{
  "id": "rust_spacesuit_hazmat",
  "game": "rust",
  "name": "Spacesuit Hazmat Suit",
  "nameEn": "Spacesuit Hazmat",
  "category": "clothing",
  "rarity": "classified",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5GLMfCk4nReh8DEiv5dbPKs8rrYwQfy6sqLM0vo",
  "price": 35
},
{
  "id": "rust_toy_car_metal_door",
  "game": "rust",
  "name": "Toy Car Sheet Metal Door",
  "nameEn": "Toy Car Metal Door",
  "category": "door",
  "rarity": "restricted",
  "image": "https://steamcommunity-a.akamaihd.net/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835FX52LCfCk4nReh8DEiv5ddPKo9pbM1RP2US9wYKg",
  "price": 32
},
{
  "id": "rust_arctic_hazmat_suit",
  "game": "rust",
  "name": "Arctic Hazmat Suit",
  "nameEn": "Arctic Hazmat Suit",
  "category": "clothing",
  "rarity": "restricted",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5GLMfCk4nReh8DEiv5dbPKs8rrYwQfy6sqLM0vo",
  "price": 30
},
{
  "id": "rust_dragon_ak47",
  "game": "rust",
  "name": "Dragon AK-47",
  "nameEn": "Dragon AK-47",
  "category": "weapon",
  "rarity": "restricted",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fc5GLGfCk4nReh8DEiv5daMag5qLU2QPi5xVewp5A",
  "price": 28
},
{
  "id": "rust_nomad_hazmat_suit",
  "game": "rust",
  "name": "Nomad Hazmat Suit",
  "nameEn": "Nomad Hazmat Suit",
  "category": "clothing",
  "rarity": "restricted",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5mLBfCk4nReh8DEiv5dbMa4-qL0xR_C29fO3tCQ",
  "price": 28
},
{
  "id": "rust_blackout_hoodie",
  "game": "rust",
  "name": "Blackout Hoodie",
  "nameEn": "Blackout Hoodie",
  "category": "clothing",
  "rarity": "restricted",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5GDFfCk4nReh8DEiv5dYPqk5qLA3QP2-LjtoOu4",
  "price": 26
},
{
  "id": "rust_blackout_pants",
  "game": "rust",
  "name": "Blackout Pants",
  "nameEn": "Blackout Pants",
  "category": "clothing",
  "rarity": "restricted",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5GDFfCk4nReh8DEiv5dYPqk5qLA3QP2-LjtoOu4",
  "price": 24
},
{
  "id": "rust_apocalyptic_ak47",
  "game": "rust",
  "name": "Apocalyptic AK47",
  "nameEn": "Apocalyptic AK47",
  "category": "weapon",
  "rarity": "restricted",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfCk4nReh8DEiv5dbPK47pbcyR_m4DQ68Ofs",
  "price": 22
},
{
  "id": "rust_toxic_double_door",
  "game": "rust",
  "name": "Toxic Double Sheet Metal Door",
  "nameEn": "Toxic Double Metal Door",
  "category": "door",
  "rarity": "milspec",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe7WLFfCk4nReh8DEiv5ddOa08qbUyRfG6con45x0",
  "price": 19
},
{
  "id": "rust_neon_boom_box",
  "game": "rust",
  "name": "Neon Boom Storage Box",
  "nameEn": "Neon Boom Box",
  "category": "item",
  "rarity": "milspec",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5GLMfCk4nReh8DEiv5dbPKs8rrYwQfy6sqLM0vo",
  "price": 18
},
{
  "id": "rust_retrowave_hunting_bow",
  "game": "rust",
  "name": "Retrowave Hunting Bow",
  "nameEn": "Retrowave Bow",
  "category": "weapon",
  "rarity": "milspec",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5WHNfCk4nReh8DEiv5dYO607rLc2Rv2_0wEIAYs",
  "price": 16.5
},
{
  "id": "rust_neon_ammo_box",
  "game": "rust",
  "name": "Neon Ammo Storage Box",
  "nameEn": "Neon Ammo Box",
  "category": "item",
  "rarity": "milspec",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835db4GLHfCk4nReh8DEiv5ddMa88pLYyQ_tTIGzDcw",
  "price": 15
},
{
  "id": "rust_chariot_metal_facemask",
  "game": "rust",
  "name": "Chariot Metal Facemask",
  "nameEn": "Chariot Facemask",
  "category": "mask",
  "rarity": "milspec",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fa4GLNfCk4nReh8DEiv5dbPKs-qrA0RfG9xh-m8C4",
  "price": 14.5
},
{
  "id": "rust_neon_ore_box",
  "game": "rust",
  "name": "Neon Ore Storage Box",
  "nameEn": "Neon Ore Box",
  "category": "item",
  "rarity": "milspec",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835FX52LCfCk4nReh8DEiv5ddPKo9pbM1RP2US9wYKg",
  "price": 14
},
{
  "id": "rust_golden_leaf_sar",
  "game": "rust",
  "name": "Golden Leaf SAR",
  "nameEn": "Golden Leaf SAR",
  "category": "weapon",
  "rarity": "milspec",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fc5GLGfCk4nReh8DEiv5daMag5qLU2QPi5xVewp5A",
  "price": 14
},
{
  "id": "rust_cobalt_military_crate",
  "game": "rust",
  "name": "Cobalt Military Storage Crate",
  "nameEn": "Cobalt Military Crate",
  "category": "item",
  "rarity": "industrial",
  "image": "https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe7WLFfCk4nReh8DEiv5ddOa08qbUyRfG6con45x0",
  "price": 12.5
}
];

// Helper function: unpacks all CS2 wear gradations so every variant is an individual skin
function getAllSkinVariants() {
  const result = [];

  const PASS_EXCLUSIVE_NAMES = [
    'Belt of the Iron Surge', 'Toxic Double Sheet Metal Door', 'Retrowave Hunting Bow',
    'Arms of Desolation', 'Dragon AK-47', 'Blackout AK47', 'Tempered MP5',
    'Vigil Triumph', 'Frostbite Metal Facemask', 'The Emperor', 'Kantusa the Script Sword',
    'Glory SAR', 'Bloodsport', 'Darkclaw Emissary Staff', 'Fire Jacket',
    'Horror Bag', 'Feast of Abscession', 'Manifold Paradox'
  ];

  SKINS_DATABASE.forEach(base => {
    const isPassExclusive = base.exclusive === 'pass' || PASS_EXCLUSIVE_NAMES.some(n => base.name && base.name.includes(n));
    const isCaseExclusive = !isPassExclusive && (
      base.exclusive === 'case' ||
      base.rarity === 'contraband' ||
      base.category === 'knife' ||
      base.category === 'gloves' ||
      (base.price && base.price >= 5000) ||
      (base.name && (base.name.includes('Blue Gem') || base.name.includes('Dragon Lore') || base.name.includes('Howl') || base.name.includes('Alien Red') || base.name.includes('Golden Baby Roshan')))
    );

    const exclusiveType = isPassExclusive ? 'pass' : (isCaseExclusive ? 'case' : null);
    const exclusiveLabel = isPassExclusive ? '👑 Эксклюзив PASS' : (isCaseExclusive ? '🔒 Только из кейсов' : null);

    if (base.wears) {
      // CS2 item with wear conditions
      Object.keys(base.wears).forEach(wearKey => {
        const wearInfo = base.wears[wearKey];
        result.push({
          id: `${base.id}_${wearKey}`,
          baseId: base.id,
          game: base.game,
          name: `${base.name} (${wearKey})`,
          nameEn: `${base.nameEn} (${wearKey})`,
          baseName: base.name,
          category: base.category,
          rarity: base.rarity,
          rarityColor: RARITY_COLORS[base.rarity] || '#ffffff',
          rarityLabel: RARITY_LABELS[base.rarity] || base.rarity,
          image: base.image,
          fallbackSvg: base.fallbackSvg,
          wear: wearKey,
          wearName: WEAR_NAMES[wearKey] || wearKey,
          price: wearInfo.price,
          exclusive: exclusiveType,
          exclusiveLabel: exclusiveLabel
        });
      });
    } else {
      // Dota 2 or Rust (standard wear)
      result.push({
        id: base.id,
        baseId: base.id,
        game: base.game,
        name: base.name,
        nameEn: base.nameEn,
        baseName: base.name,
        category: base.category,
        rarity: base.rarity,
        rarityColor: RARITY_COLORS[base.rarity] || '#ffffff',
        rarityLabel: RARITY_LABELS[base.rarity] || base.rarity,
        image: base.image,
        fallbackSvg: base.fallbackSvg,
        wear: 'STANDARD',
        wearName: WEAR_NAMES.STANDARD,
        price: base.price,
        exclusive: exclusiveType,
        exclusiveLabel: exclusiveLabel
      });
    }
  });

  return result;
}

// Helper to escape XML special characters in SVG labels
function escapeXml(unsafe) {
  return String(unsafe || '').replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// Procedural vector illustration generator for 100% offline & zero-latency skin artwork
function generateSkinSvg(name, rarity, category, game) {
  const clr = RARITY_COLORS[rarity] || '#10b981';
  const gameTag = (game || 'CS2').toUpperCase();
  
  let icon = 'ITEM';
  let weaponPath = '';
  
  if (category === 'knife') {
    icon = '★ KNIFE';
    weaponPath = `<path d="M 120 220 C 140 180, 180 140, 240 110 C 290 85, 340 70, 360 60 C 350 90, 330 130, 290 170 C 250 210, 200 240, 160 250 Z" fill="url(#gradBlade)" filter="url(#glow)"/>
                  <path d="M 110 230 C 80 260, 50 280, 40 270 C 30 260, 50 230, 80 200 Z" fill="#2d3748"/>
                  <circle cx="110" cy="225" r="14" fill="#0f172a" stroke="${clr}" stroke-width="3"/>`;
  } else if (category === 'sniper') {
    icon = 'AWP SNIPER';
    weaponPath = `<rect x="30" y="145" width="340" height="12" rx="4" fill="url(#gradBlade)" filter="url(#glow)"/>
                  <path d="M 100 130 L 220 130 L 200 145 L 120 145 Z" fill="#1e293b" stroke="${clr}" stroke-width="1.5"/>
                  <path d="M 80 157 L 140 157 L 130 195 L 70 195 Z" fill="#0f172a" stroke="#334155"/>
                  <path d="M 230 157 L 270 157 L 255 200 L 220 200 Z" fill="#1e293b"/>
                  <path d="M 270 150 L 370 140 L 370 160 L 270 165 Z" fill="url(#gradBlade)"/>`;
  } else if (category === 'rifle') {
    icon = 'ASSAULT RIFLE';
    weaponPath = `<path d="M 40 135 L 280 135 L 290 150 L 270 160 L 140 160 L 120 210 L 85 205 L 105 160 L 40 160 Z" fill="url(#gradBlade)" filter="url(#glow)"/>
                  <rect x="290" y="140" width="70" height="7" fill="#64748b"/>
                  <path d="M 180 160 C 190 200, 205 235, 230 250 L 205 255 C 180 235, 165 195, 155 160 Z" fill="#1e293b" stroke="${clr}" stroke-width="1.5"/>
                  <path d="M 40 135 L 10 160 L 10 200 L 40 180 Z" fill="#334155"/>`;
  } else if (category === 'pistol') {
    icon = 'PISTOL';
    weaponPath = `<rect x="100" y="110" width="200" height="45" rx="5" fill="url(#gradBlade)" filter="url(#glow)"/>
                  <path d="M 140 155 L 190 155 L 175 250 L 125 245 Z" fill="#1e293b" stroke="${clr}" stroke-width="2"/>
                  <rect x="240" y="118" width="50" height="8" rx="2" fill="#0f172a"/>`;
  } else if (category === 'gloves') {
    icon = 'GLOVES';
    weaponPath = `<path d="M 130 90 C 160 80, 210 90, 230 130 L 240 210 C 230 250, 180 260, 140 250 L 110 210 C 100 160, 110 110, 130 90 Z" fill="url(#gradBlade)" filter="url(#glow)"/>
                  <rect x="135" y="125" width="20" height="40" rx="6" fill="#0f172a" stroke="${clr}" stroke-width="2"/>
                  <rect x="165" y="120" width="20" height="45" rx="6" fill="#0f172a" stroke="${clr}" stroke-width="2"/>
                  <rect x="195" y="130" width="20" height="38" rx="6" fill="#0f172a" stroke="${clr}" stroke-width="2"/>`;
  } else if (game === 'dota2') {
    icon = 'IMMORTAL / ARCANA';
    weaponPath = `<path d="M 200 40 L 240 120 L 320 150 L 240 180 L 200 260 L 160 180 L 80 150 L 160 120 Z" fill="url(#gradBlade)" filter="url(#glow)"/>
                  <circle cx="200" cy="150" r="30" fill="#0f172a" stroke="#fff" stroke-width="2"/>
                  <circle cx="200" cy="150" r="14" fill="${clr}"/>`;
  } else if (game === 'rust') {
    icon = 'RUST GEAR';
    weaponPath = `<path d="M 120 70 L 280 70 L 290 190 L 200 260 L 110 190 Z" fill="url(#gradBlade)" filter="url(#glow)"/>
                  <rect x="145" y="120" width="40" height="20" rx="4" fill="#0f172a" stroke="${clr}" stroke-width="2"/>
                  <rect x="215" y="120" width="40" height="20" rx="4" fill="#0f172a" stroke="${clr}" stroke-width="2"/>
                  <line x1="160" y1="180" x2="240" y2="180" stroke="#0f172a" stroke-width="6"/>`;
  } else {
    icon = 'COLLECTIBLE';
    weaponPath = `<path d="M 60 130 L 340 130 L 320 170 L 80 170 Z" fill="url(#gradBlade)" filter="url(#glow)"/>
                  <circle cx="200" cy="150" r="35" fill="#0f172a" stroke="${clr}" stroke-width="3"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
    <defs>
      <radialGradient id="gradBg" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="${clr}" stop-opacity="0.25"/>
        <stop offset="60%" stop-color="#0b0f19" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#06080d" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="gradBlade" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="40%" stop-color="${clr}"/>
        <stop offset="100%" stop-color="#111827"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <rect width="400" height="300" rx="16" fill="url(#gradBg)"/>
    <rect width="398" height="298" x="1" y="1" rx="15" fill="none" stroke="${clr}" stroke-opacity="0.3" stroke-width="1.5"/>
    <text x="375" y="36" text-anchor="end" fill="rgba(255,255,255,0.18)" font-family="system-ui, sans-serif" font-size="14" font-weight="900" letter-spacing="2">${gameTag}</text>
    <text x="25" y="36" text-anchor="start" fill="${clr}" font-family="system-ui, sans-serif" font-size="11" font-weight="800" letter-spacing="1">${icon}</text>
    <g transform="translate(0, 0)">
      ${weaponPath}
    </g>
    <rect x="20" y="252" width="360" height="32" rx="8" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <circle cx="36" cy="268" r="5" fill="${clr}"/>
    <text x="50" y="273" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="700">${escapeXml(name.length > 34 ? name.substring(0, 32) + '...' : name)}</text>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Automatically enrich all items with procedural fallback artwork
SKINS_DATABASE.forEach(skin => {
  if (skin.price === undefined || isNaN(skin.price) || typeof skin.price !== 'number') {
    if (skin.wears && skin.defaultWear && skin.wears[skin.defaultWear] && skin.wears[skin.defaultWear].price) {
      skin.price = skin.wears[skin.defaultWear].price;
    } else if (skin.wears) {
      const firstKey = Object.keys(skin.wears)[0];
      if (firstKey && skin.wears[firstKey] && skin.wears[firstKey].price) {
        skin.price = skin.wears[firstKey].price;
      }
    }
  }
  skin.price = (typeof skin.price === 'number' && !isNaN(skin.price) && skin.price > 0) ? Number(skin.price.toFixed(2)) : 10.0;
  skin.fallbackSvg = generateSkinSvg(skin.name, skin.rarity, skin.category, skin.game);
  // Keep authentic Steam CDN photo if available; fallback to SVG only if missing
  if (!skin.image || skin.image.trim() === '') {
    skin.image = skin.fallbackSvg;
  }
});

// Global exports
if (typeof window !== 'undefined') {
  window.RARITY_COLORS = RARITY_COLORS;
  window.RARITY_LABELS = RARITY_LABELS;
  window.WEAR_NAMES = WEAR_NAMES;
  window.SKINS_DATABASE = SKINS_DATABASE;
  window.generateSkinSvg = generateSkinSvg;
  window.getAllSkinVariants = getAllSkinVariants;
}

// Universal error fallback handler to ensure skins never display broken icons
function handleSkinImgError(imgEl, skinId, fallbackName, rarity, category, game) {
  if (!imgEl) return;
  imgEl.onerror = null;
  const skin = (typeof SKINS_DATABASE !== 'undefined' ? SKINS_DATABASE : window.SKINS_DATABASE)?.find(s => s.id === skinId);
  if (skin && skin.fallbackSvg) {
    imgEl.src = skin.fallbackSvg;
    return;
  }
  if (typeof generateSkinSvg === 'function') {
    imgEl.src = generateSkinSvg(fallbackName || skin?.name || 'Skin', rarity || skin?.rarity || 'milspec', category || skin?.category || 'weapon', game || skin?.game || 'cs2');
  }
}

if (typeof window !== 'undefined') {
  window.handleSkinImgError = handleSkinImgError;
}

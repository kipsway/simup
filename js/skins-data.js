/* ==========================================================================
   SIMUP - MASSIVE SKINS DATABASE (CS2, DOTA 2, RUST)
   Includes accurate price tags, rarity classes, wear conditions and high-res imagery.
   ========================================================================== */

const RARITY_COLORS = {
  consumer: '#b0c3d9',   // Grey / Common
  industrial: '#5e98d9', // Light Blue / Industrial
  milspec: '#4b69ff',    // Blue / Mil-Spec
  restricted: '#8847ff', // Purple / Restricted
  classified: '#d32ce6', // Pink / Classified
  covert: '#eb4b4b',     // Red / Covert / Immortal
  extraordinary: '#ffd700', // Gold / Knife / Gloves / Arcana / Ancient
  contraband: '#e4ae39'  // Howl tier
};

const RARITY_LABELS = {
  consumer: 'Ширпотреб',
  industrial: 'Промышленное',
  milspec: 'Армейское',
  restricted: 'Запрещенное',
  classified: 'Засекреченное',
  covert: 'Тайное',
  extraordinary: 'Экстраординарное ★',
  contraband: 'Контрабанда'
};

const WEAR_NAMES = {
  FN: 'Прямо с завода (FN)',
  MW: 'Немного поношенное (MW)',
  FT: 'После полевых (FT)',
  WW: 'Поношенное (WW)',
  BS: 'Закаленное в боях (BS)',
  STANDARD: 'Базовое качество'
};

// Preset skins catalog
const SKINS_DATABASE = [
  // ==========================================
  // CS2 - KNIVES & GLOVES (Extraordinary)
  // ==========================================
  {
    id: 'cs2_karambit_doppler_p2',
    game: 'cs2',
    name: '★ Керамбит | Волны Фаза 2',
    nameEn: '★ Karambit | Doppler Phase 2',
    category: 'knife',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbssLQJf28_3JFlP6c_jlpKKg_LmDLbUkmJE5YtzieyT94mi31Xs-RFvZTymIoXAcANrN1nU_la4wenp0cS5vZ_XiSw02qA-pL4',
    wears: {
      FN: { price: 2150.00, wear: 'FN' },
      MW: { price: 1890.00, wear: 'MW' }
    },
    defaultWear: 'FN'
  },
  {
    id: 'cs2_butterfly_fade',
    game: 'cs2',
    name: '★ Нож-бабочка | Градиент 100%',
    nameEn: '★ Butterfly Knife | Fade',
    category: 'knife',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbssLQJf8OD3fixH_9W_mo-Elvj8NrrHjyVT650g2r_H996ligOyrUVuMW73d9OVdAVoZw7R-VToxuq6hce4tJqanCcx7ig8pGB8sj-kY2qB',
    wears: {
      FN: { price: 3450.00, wear: 'FN' },
      MW: { price: 2950.00, wear: 'MW' }
    },
    defaultWear: 'FN'
  },
  {
    id: 'cs2_m9_bayonet_lore',
    game: 'cs2',
    name: '★ Штык-нож M9 | Легенды',
    nameEn: '★ M9 Bayonet | Lore',
    category: 'knife',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbssLQJf1f_BYQJF_-O_k7-Flvj6NoTck29Y_cg_ju3F9Ij2jQfkrkBsNm-nd4eddFRtMl2FrlO7wOq-0cC0upzKnCAx6CYk4X_VnUepwUYb6gBqg4w',
    wears: {
      FN: { price: 1780.00, wear: 'FN' },
      MW: { price: 1250.00, wear: 'MW' },
      FT: { price: 680.00, wear: 'FT' },
      WW: { price: 510.00, wear: 'WW' },
      BS: { price: 390.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_skeleton_crimson_web',
    game: 'cs2',
    name: '★ Скелетный нож | Кровавая паутина',
    nameEn: '★ Skeleton Knife | Crimson Web',
    category: 'knife',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbssLQJfwOfBfTFH_9ajhoK0k_L4Or7fglRd4cJ5nqeWpIrzjFbg_xVlamzzcI7AIFM9NAzU-gG8ku26hcDuucydznNj6CQ8pGB8suT93pU',
    wears: {
      FN: { price: 2900.00, wear: 'FN' },
      MW: { price: 1420.00, wear: 'MW' },
      FT: { price: 740.00, wear: 'FT' },
      BS: { price: 420.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_gloves_vice',
    game: 'cs2',
    name: '★ Спортивные перчатки | Порок',
    nameEn: '★ Sport Gloves | Vice',
    category: 'gloves',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3Lnd3sbP8cwZf1OD3dj59_9jhq4iOqP_xMq3ehX9u5cB0teXI8oThxlKwqkc4MG6lIYSdcg5oYVHR_1C7wrvvhcXp75qcmCA2uyV35nrcnEe_1x1SLrs4fH59f-s',
    wears: {
      FN: { price: 16500.00, wear: 'FN' },
      MW: { price: 4200.00, wear: 'MW' },
      FT: { price: 1450.00, wear: 'FT' },
      BS: { price: 790.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_gloves_snow_leopard',
    game: 'cs2',
    name: '★ Перчатки водителя | Снежный барс',
    nameEn: '★ Driver Gloves | Snow Leopard',
    category: 'gloves',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3Lnd3176qOpGf0OD3fTxF7-OwmI-Zkvb6Jb7uk3lU-9J5j-jE8Nyj0AXgqBFvazumcIeVclc6NFGB_1Dvk-ruhJG7vc-Yn3NlsyYl5XzcyxKpwUYbU3u907k',
    wears: {
      FN: { price: 3100.00, wear: 'FN' },
      MW: { price: 920.00, wear: 'MW' },
      FT: { price: 440.00, wear: 'FT' },
      BS: { price: 230.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },

  // ==========================================
  // CS2 - SNIPER RIFLES (AWP)
  // ==========================================
  {
    id: 'cs2_awp_dragon_lore',
    game: 'cs2',
    name: 'AWP | История о драконе',
    nameEn: 'AWP | Dragon Lore',
    category: 'sniper',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJS5NO0m5O0m_7zO6-fzj9V7Pp8j-3I4IG72ADk-ERkY2r1d9fEIQc7YgnS-FW7k-rv05Tovp_InXQyuCV35XrcmhS_0B5SLrs4d_qXb7w',
    wears: {
      FN: { price: 12500.00, wear: 'FN' },
      MW: { price: 9200.00, wear: 'MW' },
      FT: { price: 5800.00, wear: 'FT' },
      WW: { price: 4300.00, wear: 'WW' },
      BS: { price: 3400.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_awp_gungnir',
    game: 'cs2',
    name: 'AWP | Гунгнир',
    nameEn: 'AWP | Gungnir',
    category: 'sniper',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FA957PHEcDB9_9W7h5C0mfPlP77DqWdY781lxOiSrYinkiKyqEQ-MTuhLY-cegZsZlzQ81C8kOrv08S0uZTLnHJls3U8pGB8sjT4XpI',
    wears: {
      FN: { price: 11200.00, wear: 'FN' },
      MW: { price: 8100.00, wear: 'MW' },
      FT: { price: 6200.00, wear: 'FT' },
      BS: { price: 4100.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_awp_desert_hydra',
    game: 'cs2',
    name: 'AWP | Пустынная гидра',
    nameEn: 'AWP | Desert Hydra',
    category: 'sniper',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJF7dC7nYeOhcj_P77ukk1Q4Mty2L2Vo4rz31Xlr0VuNWumcoOXdwdrNVGG_gDvx-ruhZC878vLnXRh63Ur7X7ZyxapwUYb3n-v79U',
    wears: {
      FN: { price: 3200.00, wear: 'FN' },
      MW: { price: 2100.00, wear: 'MW' },
      FT: { price: 1450.00, wear: 'FT' },
      BS: { price: 950.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_awp_asiimov',
    game: 'cs2',
    name: 'AWP | Азимов',
    nameEn: 'AWP | Asiimov',
    category: 'sniper',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJG6d2inL-GkvP9JrafwDMHscYh2LuQ9N-h0Fbs-kY5am2mLYfAcQ83Y13Z-1S6yeztgpK46MzJ1zI97Zf4mS0u',
    wears: {
      FT: { price: 145.00, wear: 'FT' },
      WW: { price: 105.00, wear: 'WW' },
      BS: { price: 85.00, wear: 'BS' } // Blackiimov easter egg tier
    },
    defaultWear: 'FT'
  },

  // ==========================================
  // CS2 - ASSAULT RIFLES (AK-47 & M4A4)
  // ==========================================
  {
    id: 'cs2_m4a4_howl',
    game: 'cs2',
    name: 'M4A4 | Вой',
    nameEn: 'M4A4 | Howl',
    category: 'rifle',
    rarity: 'contraband',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITfn2xV_Pp_g_eY99Sn2wfn_0dtNW-icdWSc1Q2M1-DqVe_w7y9hMDv6ZXKmCY36XM8pGB8sD8_H38',
    wears: {
      FN: { price: 6800.00, wear: 'FN' },
      MW: { price: 4700.00, wear: 'MW' },
      FT: { price: 3400.00, wear: 'FT' }
    },
    defaultWear: 'MW'
  },
  {
    id: 'cs2_ak47_wild_lotus',
    game: 'cs2',
    name: 'AK-47 | Дикий лотос',
    nameEn: 'AK-47 | Wild Lotus',
    category: 'rifle',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV19m5h5SEguP7IbrfkW5u5Mx2gv2PoIqg2QHm-RE9MmzxLYDEewU6YVGB8gTtl-a61sC6uc_Lm3d9-n51rSgQG3Q',
    wears: {
      FN: { price: 9500.00, wear: 'FN' },
      MW: { price: 6900.00, wear: 'MW' },
      FT: { price: 4200.00, wear: 'FT' },
      BS: { price: 2100.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_ak47_fire_serpent',
    game: 'cs2',
    name: 'AK-47 | Огненный змей',
    nameEn: 'AK-47 | Fire Serpent',
    category: 'rifle',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08y5nY6fqPP9ILrDhGpI18h0juDU-MKt0Fex-kdsMTumLISVJwA9aVvT_VK4ku7o05C76Z_AynFq7CR37CvazAv3308-41C-2Q',
    wears: {
      FN: { price: 2900.00, wear: 'FN' },
      MW: { price: 1100.00, wear: 'MW' },
      FT: { price: 780.00, wear: 'FT' },
      BS: { price: 460.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_ak47_case_hardened',
    game: 'cs2',
    name: 'AK-47 | Поверхностная закалка (Blue Gem #661)',
    nameEn: 'AK-47 | Case Hardened',
    category: 'rifle',
    rarity: 'classified',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQO3-UdsZGHyd4_BdwRtZ1rT-QC7k-zmg8S16cydm3Fh6HM8pGB8sk9I9vI',
    wears: {
      FN: { price: 850.00, wear: 'FN' },
      MW: { price: 420.00, wear: 'MW' },
      FT: { price: 290.00, wear: 'FT' },
      BS: { price: 180.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_ak47_printstream',
    game: 'cs2',
    name: 'AK-47 | Поток информации',
    nameEn: 'AK-47 | Printstream',
    category: 'rifle',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV086_h4yGg_L4NrrHjyVTvMR32LjE84iti1W3qUBqNzj3co7DcwY9ZwzUr1Hskum8g8Tu6MnOzSZi7CRw7GGdwULeP6tWsw',
    wears: {
      FN: { price: 280.00, wear: 'FN' },
      MW: { price: 175.00, wear: 'MW' },
      FT: { price: 110.00, wear: 'FT' },
      BS: { price: 65.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_ak47_redline',
    game: 'cs2',
    name: 'AK-47 | Красная линия',
    nameEn: 'AK-47 | Redline',
    category: 'rifle',
    rarity: 'classified',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08u_mpSOhcjnPLfWl3lu-sR1jeTE8YXghRq2rhI6Z23yLIWQcANsM1uFqVm-x-rvjZPotZqfynNqvyggsXmLnx2whx1SLrs40_pZ_9I',
    wears: {
      MW: { price: 95.00, wear: 'MW' },
      FT: { price: 18.50, wear: 'FT' },
      WW: { price: 14.20, wear: 'WW' },
      BS: { price: 12.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_m4a1s_printstream',
    game: 'cs2',
    name: 'M4A1-S | Поток информации',
    nameEn: 'M4A1-S | Printstream',
    category: 'rifle',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOxh7-Gw_alIITfn2xV_Pp_g_eY99mk2wTsqRE5ZTqnd4eccw89Y1yC81O-lO26jZXo7pqcm3s26XZw4H7UnAv330_5p6t_5w',
    wears: {
      FN: { price: 540.00, wear: 'FN' },
      MW: { price: 290.00, wear: 'MW' },
      FT: { price: 170.00, wear: 'FT' },
      BS: { price: 90.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },

  // ==========================================
  // CS2 - PISTOLS & BUDGET
  // ==========================================
  {
    id: 'cs2_deagle_blaze',
    game: 'cs2',
    name: 'Desert Eagle | Пламя',
    nameEn: 'Desert Eagle | Blaze',
    category: 'pistol',
    rarity: 'restricted',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH_9mkgIWKk_b4JITck29Y_cg_jruTo4isi1Xh-kVpZmn6J4addVJvNAzT_1DtyLzsg8Dv6Z-amHFh6D5iuyj9-sJ9uQ',
    wears: {
      FN: { price: 820.00, wear: 'FN' },
      MW: { price: 710.00, wear: 'MW' }
    },
    defaultWear: 'FN'
  },
  {
    id: 'cs2_usps_kill_confirmed',
    game: 'cs2',
    name: 'USP-S | Подтвержденное убийство',
    nameEn: 'USP-S | Kill Confirmed',
    category: 'pistol',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j_OrfdqWhe5sN4mOTE8bP4jVC9vh5yZG70LY7Geg84aV3Y-FK2xu7tgpW-up_BzSc27HRw7XmJnxzhg01FcKUxLH9k8Q69',
    wears: {
      FN: { price: 210.00, wear: 'FN' },
      MW: { price: 98.00, wear: 'MW' },
      FT: { price: 54.00, wear: 'FT' },
      BS: { price: 38.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_glock18_water_elemental',
    game: 'cs2',
    name: 'Glock-18 | Дух воды',
    nameEn: 'Glock-18 | Water Elemental',
    category: 'pistol',
    rarity: 'classified',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73fyhB4Nm3hr-Yksj4OrzZglRd6dd2j6eU99Sm3wHg-kNtYmn3JYOWcg9taF7V_1LrkLrogcO0uJqby3dluCQ8pGB8sjP29-iX',
    wears: {
      FN: { price: 16.50, wear: 'FN' },
      MW: { price: 11.20, wear: 'MW' },
      FT: { price: 6.80, wear: 'FT' },
      BS: { price: 5.20, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_p250_sand_dune',
    game: 'cs2',
    name: 'P250 | Песчаная буря',
    nameEn: 'P250 | Sand Dune',
    category: 'pistol',
    rarity: 'consumer',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS09-5h7-GkvP9Jrafw2lU6ccp07qU9ommigXh_kduZW-md9ecclRrMFGGqAW6we3uhp7vtcnKyydkuyA8pGB8smYx0i8',
    wears: {
      FN: { price: 2.10, wear: 'FN' },
      FT: { price: 0.15, wear: 'FT' },
      BS: { price: 0.10, wear: 'BS' }
    },
    defaultWear: 'FT'
  },

  // ==========================================
  // DOTA 2 - ARCANAS & IMMORTALS
  // ==========================================
  {
    id: 'dota2_dragonclaw_hook',
    game: 'dota2',
    name: 'Dragonclaw Hook (Pudge)',
    nameEn: 'Dragonclaw Hook',
    category: 'immortal',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjESt2-1t3ZWVtkLAlYs6WrLAZs3vr3eSgX7t-3k4TYkfv1NrnTmGxf781lyO2Spd-ljAbkqEJqNWvwcNeWcAc2Yg7R-1S3wr_m0ZW76czJzydk6yV25WGdwULGkXmCiw',
    wears: {
      STANDARD: { price: 185.00, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'dota2_golden_baby_roshan',
    game: 'dota2',
    name: 'Golden Baby Roshan',
    nameEn: 'Golden Baby Roshan',
    category: 'courier',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjESt2-1t3ZWVtkLAlYs6WrLAZh0eT3dClH6N63lY2OlvX1P7_Slm8Bvpx137yVo9r22FfhrkRvMW2hLNWTcAdqYAvU-AO6wL28g8S97smcwSRlvSEm5GGdwUKk3p4YlQ',
    wears: {
      STANDARD: { price: 2850.00, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'dota2_mace_of_aeons',
    game: 'dota2',
    name: 'Mace of Aeons (Faceless Void)',
    nameEn: 'Mace of Aeons',
    category: 'immortal',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjESt2-1t3ZWVtkLAlYs6WrLBNi0fD3fThF7-OwmI-Zkvb6Jb7uk3lU-9J5j-jE8Nz3ilC3_UY5ZGn1LIbBcAZvYgnV-1W5lO-7jZ7v6pqfzCZl63El4HfcyxOpwUYbo82218M',
    wears: {
      STANDARD: { price: 340.00, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'dota2_manifold_paradox',
    game: 'dota2',
    name: 'Manifold Paradox (Phantom Assassin Arcana)',
    nameEn: 'Manifold Paradox',
    category: 'arcana',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjESt2-1t3ZWVtkLAlYs6WrLBNm3vr3eSgX7t-3k4TYkfv1NrnTmGxf781lyO2Wpt_00AeyrRBpZj3yd47BdwdrM1_Y_wLsyLrmjcS6upqczHZh7CJwsCmIzkSpwUYbO9TfD8w',
    wears: {
      STANDARD: { price: 34.50, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'dota2_feast_of_abscession',
    game: 'dota2',
    name: 'Feast of Abscession (Pudge Arcana)',
    nameEn: 'Feast of Abscession',
    category: 'arcana',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjESt2-1t3ZWVtkLAlYs6WrLBNn0OD3dClH6N63lY2OlvX1P7_Slm8Bvpx13-qXod_33FG3-BdpZDr6J4XHdgM7MAnZqFG_yOnsg8fv6Mibz3U263Ml4GGdwUKaC9E8rQ',
    wears: {
      STANDARD: { price: 32.00, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'dota2_bladeform_legacy',
    game: 'dota2',
    name: 'Bladeform Legacy (Juggernaut Arcana)',
    nameEn: 'Bladeform Legacy',
    category: 'arcana',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjESt2-1t3ZWVtkLAlYs6WrLBNm0eT3dClH6N63lY2OlvX1P7_Slm8Bvpx12rnVo4T321W2_0RtNm-icdXDe1VsZAnSrlm-ye28g8S_6prKz3NisyYm52GdwUKqg58zrg',
    wears: {
      STANDARD: { price: 35.00, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'dota2_vigil_triumph',
    game: 'dota2',
    name: 'Vigil Triumph (Sven)',
    nameEn: 'Vigil Triumph',
    category: 'immortal',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjESt2-1t3ZWVtkLAlYs6WrLBNi0fD3fThF7-OwmI-Zkvb6Jb7uk3lU-9J5j-jE8Nz3ilC3_UY5ZGn1LIbBcAZvYgnV-1W5lO-7jZ7v6pqfzCZl63El4HfcyxOpwUYbo82218M',
    wears: {
      STANDARD: { price: 62.00, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'dota2_magus_apex',
    game: 'dota2',
    name: 'Magus Apex (Invoker)',
    nameEn: 'Magus Apex',
    category: 'immortal',
    rarity: 'classified',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjESt2-1t3ZWVtkLAlYs6WrLAZv0fD3fThF7-OwmI-Zkvb6Jb7uk3lU-9J5j-jE8Nz3ilC3_UY5ZGn1LIbBcAZvYgnV-1W5lO-7jZ7v6pqfzCZl63El4HfcyxOpwUYbo82218M',
    wears: {
      STANDARD: { price: 6.80, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'dota2_solar_forge',
    game: 'dota2',
    name: 'Solar Forge (Phoenix)',
    nameEn: 'Solar Forge',
    category: 'immortal',
    rarity: 'restricted',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjESt2-1t3ZWVtkLAlYs6WrLAZv0fD3fThF7-OwmI-Zkvb6Jb7uk3lU-9J5j-jE8Nz3ilC3_UY5ZGn1LIbBcAZvYgnV-1W5lO-7jZ7v6pqfzCZl63El4HfcyxOpwUYbo82218M',
    wears: {
      STANDARD: { price: 1.40, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },

  // ==========================================
  // RUST - LEGENDARY & GLOWING SKINS
  // ==========================================
  {
    id: 'rust_big_grin',
    game: 'rust',
    name: 'Big Grin (Большой оскал)',
    nameEn: 'Big Grin Mask',
    category: 'armor',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDii_RghLkAApxkJ3nd3f0PEW302aqq7vyf36CVwgVsBtVSp3yF2sA1-v_f222W568N4ra87prQ5Qe3_q62l0Lg',
    wears: {
      STANDARD: { price: 1250.00, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'rust_punishment_mask',
    game: 'rust',
    name: 'Punishment Mask (Маска наказания)',
    nameEn: 'Punishment Mask',
    category: 'armor',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDii_RghLkAApxkJ3nd3f0PEW302aqq7vyf36CVwgVsBtVSp3yF2sA1-v_f222W568N4ra87prcyQe3-W031uJk',
    wears: {
      STANDARD: { price: 820.00, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'rust_alien_red',
    game: 'rust',
    name: 'Alien Red (Красный пришелец AK-47)',
    nameEn: 'Alien Red AK47',
    category: 'weapon',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDii_RghLkAApxkJ3nd3f0PEW302aqq7vyf36CVwgVsBtVSp3yF2sA1-v_f222W568N4ra87prYzQuz2eQ9n-Q8',
    wears: {
      STANDARD: { price: 290.00, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'rust_glory_ak47',
    game: 'rust',
    name: 'Glory AK47 (Сияние славы)',
    nameEn: 'Glory AK47',
    category: 'weapon',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDii_RghLkAApxkJ3nd3f0PEW302aqq7vyf36CVwgVsBtVSp3yF2sA1-v_f222W568N4ra87prcxQe33wKkCqZg',
    wears: {
      STANDARD: { price: 340.00, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'rust_tempered_ak47',
    game: 'rust',
    name: 'Tempered AK47 (Закаленный калаш)',
    nameEn: 'Tempered AK47',
    category: 'weapon',
    rarity: 'classified',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDii_RghLkAApxkJ3nd3f0PEW302aqq7vyf36CVwgVsBtVSp3yF2sA1-v_f222W568N4ra87prg5Q-j9f00_s4c',
    wears: {
      STANDARD: { price: 65.00, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'rust_fireproof_door',
    game: 'rust',
    name: 'Fireproof Armored Door (Огнеупорная дверь)',
    nameEn: 'Fireproof Door',
    category: 'deployable',
    rarity: 'restricted',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDii_RghLkAApxkJ3nd3f0PEW302aqq7vyf36CVwgVsBtVSp3yF2sA1-v_f222W568N4ra87prc2Q-z4W70fS38',
    wears: {
      STANDARD: { price: 18.00, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'rust_neon_storage_box',
    game: 'rust',
    name: 'Neon Ammo Large Box (Неоновый ящик)',
    nameEn: 'Neon Ammo Box',
    category: 'deployable',
    rarity: 'restricted',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDii_RghLkAApxkJ3nd3f0PEW302aqq7vyf36CVwgVsBtVSp3yF2sA1-v_f222W568N4ra87prU5QO3-eUpvI-k',
    wears: {
      STANDARD: { price: 8.50, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  },
  {
    id: 'rust_metal_hunter_bow',
    game: 'rust',
    name: 'Hunter Hunting Bow (Охотничий лук)',
    nameEn: 'Hunter Bow',
    category: 'weapon',
    rarity: 'milspec',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDii_RghLkAApxkJ3nd3f0PEW302aqq7vyf36CVwgVsBtVSp3yF2sA1-v_f222W568N4ra87prA4Qun9dklj890',
    wears: {
      STANDARD: { price: 1.20, wear: 'STANDARD' }
    },
    defaultWear: 'STANDARD'
  }
];

// Helper to flatten skins with their respective wear conditions
function getAllSkinVariants() {
  const list = [];
  SKINS_DATABASE.forEach(skin => {
    Object.keys(skin.wears).forEach(wearKey => {
      const wearData = skin.wears[wearKey];
      list.push({
        id: `${skin.id}_${wearKey}`,
        baseId: skin.id,
        game: skin.game,
        name: skin.name,
        nameEn: skin.nameEn,
        wear: wearKey,
        wearName: WEAR_NAMES[wearKey] || wearKey,
        rarity: skin.rarity,
        rarityColor: RARITY_COLORS[skin.rarity] || '#888',
        rarityLabel: RARITY_LABELS[skin.rarity] || skin.rarity,
        price: wearData.price,
        image: skin.image,
        category: skin.category
      });
    });
  });
  return list;
}

window.SKINS_DATABASE = SKINS_DATABASE;
window.getAllSkinVariants = getAllSkinVariants;
window.RARITY_COLORS = RARITY_COLORS;
window.RARITY_LABELS = RARITY_LABELS;
window.WEAR_NAMES = WEAR_NAMES;

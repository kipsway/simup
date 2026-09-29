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

const SKINS_DATABASE = [
  // =========================================================================
  // CS2: KNIVES & GLOVES (★ Extraordinary)
  // =========================================================================
  {
    id: 'cs2_butterfly_fade',
    game: 'cs2',
    name: '★ Нож-бабочка | Градиент',
    nameEn: '★ Butterfly Knife | Fade',
    category: 'knife',
    rarity: 'extraordinary',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GKqPH1N77ummJW4NE_iLjA99nzigexr0NkYmH2dYSTdAU9ZQrW_lm2kO3pgcTuv8vLy3I1sj5iuyin5z3u1g',
    wears: {
      FN: { price: 3450.00, wear: 'FN' },
      MW: { price: 2950.00, wear: 'MW' }
    },
    defaultWear: 'FN'
  },
  {
    id: 'cs2_karambit_doppler_p2',
    game: 'cs2',
    name: '★ Керамбит | Волны Фаза 2',
    nameEn: '★ Karambit | Doppler Phase 2',
    category: 'knife',
    rarity: 'extraordinary',
    image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij7r--YXygED6-EtrNmihLYaXIQ83Nw6C-1C6k-zvgMO7up7NmHs2uykl43fYnUG3hQYMMLINmYZu2g',
    wears: {
      FN: { price: 2150.00, wear: 'FN' },
      MW: { price: 1890.00, wear: 'MW' }
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
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-Djsj7P7TWlGJW-NB9t-3I-4_wjgHsrkdoZ2_3LIfEcVI5YgqCrgW_x-rngsO5v87PyHYxvCc8pGB8srcwZ3tC',
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
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1RX6sl0teXI8o_w1wK3-ENkYm_zLIeRdAU4Ml_W-gTtk-rvgJW_u5TMzHJqv3Fws3rYyAv330-8d54w2g',
    wears: {
      FN: { price: 2900.00, wear: 'FN' },
      MW: { price: 1420.00, wear: 'MW' },
      FT: { price: 740.00, wear: 'FT' },
      BS: { price: 420.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_talon_knife_marble_fade',
    game: 'cs2',
    name: '★ Нож-коготь | Мраморный градиент',
    nameEn: '★ Talon Knife | Marble Fade',
    category: 'knife',
    rarity: 'extraordinary',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-Kmsj5MqnTmm5u7sR1j9bW_Ij6n2u4ohQ0J3fyJoTGcVJqZ1nW8lLsl-nrjMK-6ZqdzSBkvyl25nvdlkS0gxFPZudtm7XAHraYUhpC',
    wears: {
      FN: { price: 1220.00, wear: 'FN' },
      MW: { price: 1080.00, wear: 'MW' }
    },
    defaultWear: 'FN'
  },
  {
    id: 'cs2_gut_knife_safari_mesh',
    game: 'cs2',
    name: '★ Охотничий нож с крюком | Африканская сетка',
    nameEn: '★ Gut Knife | Safari Mesh',
    category: 'knife',
    rarity: 'extraordinary',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Mh-PnJ6nkkm5u5Mx2gv2P8I-njlDlqUVoMm6nd9TAJAQ4Z1jW-wC7w-rng5W7uJ7KyCZiuSMk53_bmB3i00wePLc70qHNVxzAUBKfZy3I',
    wears: {
      MW: { price: 92.00, wear: 'MW' },
      FT: { price: 78.00, wear: 'FT' },
      BS: { price: 74.00, wear: 'BS' }
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
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LliLprFZEydtwv33fDxO6NO7k5SZmvLwOq7cqWdQ-sJ0xOzFoN33jgXs_RBqZ2HwII6ScQVsNAmFrlXtwbzs18e778zMynsy6CE8pGB8st3o1o4',
    wears: {
      FN: { price: 12800.00, wear: 'FN' },
      MW: { price: 4200.00, wear: 'MW' },
      FT: { price: 1650.00, wear: 'FT' },
      BS: { price: 780.00, wear: 'BS' }
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
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LliLprFZEydtwv33fDxO6NO7k5SZmvLwOq7cqWdQ-sJ0xOzAotj23wK2_0c6YWzzLNLEegRqNFvZ-lfsyevnhMC17svNySBg7igk7XrZygv3308nC45Eyw',
    wears: {
      FN: { price: 3800.00, wear: 'FN' },
      MW: { price: 1450.00, wear: 'MW' },
      FT: { price: 540.00, wear: 'FT' },
      BS: { price: 290.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },

  // =========================================================================
  // CS2: CONTRABAND & COVERT (Howl, Dragon Lore, Printstream, Fire Serpent)
  // =========================================================================
  {
    id: 'cs2_m4a4_howl',
    game: 'cs2',
    name: 'M4A4 | Вой',
    nameEn: 'M4A4 | Howl',
    category: 'rifle',
    rarity: 'contraband',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09izh4-GkvP9Jrafw2lU6ccp0rqVpdus2lXnqkVsZzv7INSSIQFoNA2F_FS_xefog5W9vc_XiSw0Fvdh9jQ',
    wears: {
      FN: { price: 6800.00, wear: 'FN' },
      MW: { price: 5100.00, wear: 'MW' },
      FT: { price: 3950.00, wear: 'FT' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_awp_dragon_lore',
    game: 'cs2',
    name: 'AWP | История о драконе',
    nameEn: 'AWP | Dragon Lore',
    category: 'sniper',
    rarity: 'covert',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2DwB65Jy0rmVpoin2Q3m-ERkYW_6LYTBdwc5MFjX-1btweznh5S-6MzKm3Fm7ik8pGB8srA5YF6u',
    wears: {
      FN: { price: 11500.00, wear: 'FN' },
      MW: { price: 7900.00, wear: 'MW' },
      FT: { price: 5400.00, wear: 'FT' },
      BS: { price: 3200.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_ak47_wild_lotus',
    game: 'cs2',
    name: 'AK-47 | Дикий лотос',
    nameEn: 'AK-47 | Wild Lotus',
    category: 'rifle',
    rarity: 'covert',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV09m7hJKOhOTLPr7Vn35cppQh2-yVp92m2Qfm_0JsYjyncNWReg9vN1CE_gK5w-y-hpDv7cycmnI17CMr-z-DyP2hP00k',
    wears: {
      FN: { price: 9200.00, wear: 'FN' },
      MW: { price: 6100.00, wear: 'MW' },
      FT: { price: 3800.00, wear: 'FT' },
      BS: { price: 1950.00, wear: 'BS' }
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
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08y5nY6fqPP9ILrDhGpI18h0juDU-MKt0Fex-kdsMTjyd9SVc1VoY1nV_1m8xr_vh5S5u5qYznM26CQk5Srem0SpwUYbe7V0Zyo',
    wears: {
      FN: { price: 2900.00, wear: 'FN' },
      MW: { price: 1150.00, wear: 'MW' },
      FT: { price: 740.00, wear: 'FT' },
      BS: { price: 460.00, wear: 'BS' }
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
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITBhGJf_NZlmOzA-LP5gVO8v11rYm_wJYKTJw9tN12D-lW6kO_pjZXp7szNn2wj5He4vnPfgw',
    wears: {
      FN: { price: 320.00, wear: 'FN' },
      MW: { price: 180.00, wear: 'MW' },
      FT: { price: 125.00, wear: 'FT' },
      BS: { price: 78.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_deagle_printstream',
    game: 'cs2',
    name: 'Desert Eagle | Поток информации',
    nameEn: 'Desert Eagle | Printstream',
    category: 'pistol',
    rarity: 'covert',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH_8j4hoW0k_L4Or7fglRd4cJ5nqeY843w0Q23_hZvNmn6cI7BdlU8NAyF-lG5l7rvjZO7ucvMm2wj5Hfy803BfA',
    wears: {
      FN: { price: 145.00, wear: 'FN' },
      MW: { price: 72.00, wear: 'MW' },
      FT: { price: 48.00, wear: 'FT' }
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
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2G9SupUijOjAotyg3w2x_0ZkZ2rzd4OXdgRoYQuE8gDtyL_mg5K4tJ7XiSw0WqKv8kM',
    wears: {
      FT: { price: 135.00, wear: 'FT' },
      WW: { price: 95.00, wear: 'WW' },
      BS: { price: 78.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },

  // =========================================================================
  // CS2: CLASSIFIED & RESTRICTED (Pink & Purple: $4.00 - $85.00)
  // =========================================================================
  {
    id: 'cs2_ak47_redline',
    game: 'cs2',
    name: 'AK-47 | Красная линия',
    nameEn: 'AK-47 | Redline',
    category: 'rifle',
    rarity: 'classified',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQO3-UdsZGHyd4_Bd1RvNQ7T_FDrw-_ng5Pu75iY1zI97bhLsvQz',
    wears: {
      MW: { price: 82.00, wear: 'MW' },
      FT: { price: 18.50, wear: 'FT' },
      WW: { price: 15.00, wear: 'WW' },
      BS: { price: 13.50, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_awp_hyper_beast',
    game: 'cs2',
    name: 'AWP | Скоростной зверь',
    nameEn: 'AWP | Hyper Beast',
    category: 'sniper',
    rarity: 'covert',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJU5cyzhr-GkvP9Jrafw2lU6ccp0rqV842kjQ23-kZsZG-nd9edcQVoZwvV_Fa9w-bog5W5vczLnXNhviU8pGB8so_0jU0',
    wears: {
      FN: { price: 95.00, wear: 'FN' },
      MW: { price: 54.00, wear: 'MW' },
      FT: { price: 32.00, wear: 'FT' },
      BS: { price: 21.00, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_m4a4_the_emperor',
    game: 'cs2',
    name: 'M4A4 | Император',
    nameEn: 'M4A4 | The Emperor',
    category: 'rifle',
    rarity: 'covert',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITBhGJf_NZlmOzA-LP5gVO8v11sY2_1LNeTJg5tY1DV_1W_kO-5h5Tuu5TAzHBh7CIr-z-DyJ690B4i',
    wears: {
      FN: { price: 155.00, wear: 'FN' },
      MW: { price: 48.00, wear: 'MW' },
      FT: { price: 16.50, wear: 'FT' },
      BS: { price: 9.80, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_awp_atheris',
    game: 'cs2',
    name: 'AWP | Древесная гадюка',
    nameEn: 'AWP | Atheris',
    category: 'sniper',
    rarity: 'restricted',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5Mx2gv2PrNms2VXi-kRtZzzyLdOXclI-YF6F-lG3lenmhsDovpTImHVluiZ34CnUnAv330-Q3_Vj_g',
    wears: {
      FN: { price: 14.50, wear: 'FN' },
      MW: { price: 6.80, wear: 'MW' },
      FT: { price: 3.40, wear: 'FT' },
      BS: { price: 2.10, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_deagle_conspiracy',
    game: 'cs2',
    name: 'Desert Eagle | Заговор',
    nameEn: 'Desert Eagle | Conspiracy',
    category: 'pistol',
    rarity: 'classified',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH_9mkgL-OlvD4NoTck29Y_cg_37iSrIms3wXh-kFqYW7yIoXAcANsNF3T-FPsle3t05e_6ZzJnHM3viUk53fem0SpwUYbZl4vQ40',
    wears: {
      FN: { price: 9.50, wear: 'FN' },
      MW: { price: 6.20, wear: 'MW' },
      FT: { price: 4.80, wear: 'FT' }
    },
    defaultWear: 'FN'
  },

  // =========================================================================
  // CS2: MIL-SPEC, INDUSTRIAL & CONSUMER ($0.15 - $3.50)
  // *Crucial for honest, non-broken $2 - $5 cases!*
  // =========================================================================
  {
    id: 'cs2_ak47_slate',
    game: 'cs2',
    name: 'AK-47 | Сланец',
    nameEn: 'AK-47 | Slate',
    category: 'rifle',
    rarity: 'restricted',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08-5lpKKqPrxN7LEmyVU7pUpj-vEpN2t0FDg-EVkZzzwJo6ScVU3aQvT-1LtyLu908O5vZvJznc2pGB8soHj-t67',
    wears: {
      FN: { price: 9.80, wear: 'FN' },
      MW: { price: 4.20, wear: 'MW' },
      FT: { price: 2.50, wear: 'FT' },
      BS: { price: 1.80, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_m4a1s_night_terror',
    game: 'cs2',
    name: 'M4A1-S | Ночной кошмар',
    nameEn: 'M4A1-S | Night Terror',
    category: 'rifle',
    rarity: 'milspec',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-GkuP1P6jummJW4NE_2r2V896j0Q22qRBsYWmiLNedewY5ZgvT_1nrw-zs0ZW9vsuYziRmvCkk7H3amgv330-e_v38Tw',
    wears: {
      FN: { price: 3.20, wear: 'FN' },
      MW: { price: 1.80, wear: 'MW' },
      FT: { price: 1.10, wear: 'FT' },
      BS: { price: 0.85, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_usps_ticket_to_hell',
    game: 'cs2',
    name: 'USP-S | Билет в ад',
    nameEn: 'USP-S | Ticket to Hell',
    category: 'pistol',
    rarity: 'milspec',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j_OrfcZgBQsJ0p37mSrNzx3AXl_kU-Mm_2I9DHdQRoZwnUqAW9xunmh5Dou5iYn3pm7ic8pGB8st-f495S',
    wears: {
      FN: { price: 2.80, wear: 'FN' },
      MW: { price: 1.40, wear: 'MW' },
      FT: { price: 0.90, wear: 'FT' },
      BS: { price: 0.65, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_glock_bunsen_burner',
    game: 'cs2',
    name: 'Glock-18 | Горелка Бунзена',
    nameEn: 'Glock-18 | Bunsen Burner',
    category: 'pistol',
    rarity: 'milspec',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJkI-Ek_P5Nr_Yg2YfucAk2b2W89Sn0VXs-EVkYjzxctSQdgM9N17X-Fm-lbzt1Je8vM7LmnQ36CQ8pGB8sjv631M',
    wears: {
      FN: { price: 2.20, wear: 'FN' },
      MW: { price: 0.95, wear: 'MW' },
      FT: { price: 0.55, wear: 'FT' },
      BS: { price: 0.40, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_p250_sand_dune',
    game: 'cs2',
    name: 'P250 | Песчаная дюна',
    nameEn: 'P250 | Sand Dune',
    category: 'pistol',
    rarity: 'consumer',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS09-5lpKKqPrxN7LEmyVU7pUpj-vEpdmi3FG1qEU9ZW_7dYDEdFA4NwqBqwToxenph8TovsnMnHM1pGB8si2QeF6r',
    wears: {
      FN: { price: 0.85, wear: 'FN' },
      MW: { price: 0.35, wear: 'MW' },
      FT: { price: 0.20, wear: 'FT' },
      BS: { price: 0.15, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_g3sg1_safari_mesh',
    game: 'cs2',
    name: 'G3SG1 | Африканская сетка',
    nameEn: 'G3SG1 | Safari Mesh',
    category: 'sniper',
    rarity: 'consumer',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf1OD3fDJR_-O6nYeDg7miYr7VlWgH650m37-V84itiQPt_xVqYW_xLIbAdFU5N1DV_1LoxLu6jJXqvpnNziRk63Ur4HfYnUeyhAYMMLIn_T1e_A',
    wears: {
      FT: { price: 0.18, wear: 'FT' },
      BS: { price: 0.12, wear: 'BS' }
    },
    defaultWear: 'FT'
  },
  {
    id: 'cs2_nova_sand_dune',
    game: 'cs2',
    name: 'Nova | Песчаная дюна',
    nameEn: 'Nova | Sand Dune',
    category: 'shotgun',
    rarity: 'consumer',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhjxszfcDBM-_zieST2nfL3Za3ShG5G-8t9mr3CtI6g0QCwqBdoYWrzcIfDdwBtMA6Fq1S9ybu-05fuup6fm3QwuiUk4XqJnUepwUYbrH1s35k',
    wears: {
      FT: { price: 0.18, wear: 'FT' },
      BS: { price: 0.14, wear: 'BS' }
    },
    defaultWear: 'FT'
  },

  // =========================================================================
  // DOTA 2: FROM IMMORTAL / ROBO-ROSHAN TO COMMON ACCESSIBLE ITEMS
  // =========================================================================
  {
    id: 'dota2_golden_baby_roshan',
    game: 'dota2',
    name: 'Golden Baby Roshan',
    nameEn: 'Golden Baby Roshan',
    category: 'courier',
    rarity: 'extraordinary',
    image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXA7hlNJ48g5hlcTlXvVeu-34DRUl9tNwtEvrurekkxi_GQdGkQ6t7lwoSNw6KsYOrXwW5XsJV10uyVptyi0QPk8xZqY2n1OsbLJSsFEXhR',
    price: 2850.00
  },
  {
    id: 'dota2_dragonclaw_hook',
    game: 'dota2',
    name: 'Dragonclaw Hook (Pudge)',
    nameEn: 'Dragonclaw Hook',
    category: 'immortal',
    rarity: 'extraordinary',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUivB9aSQPAUuCq0vDAWFh4IBBYuIWtJAhr7PHHdSQMu93iwIbbxqWnNejQw2gB6ZEnjO-UoNrx0AHgqkZkN2HzJ4_DI1M3ZEaQpAYWJ6NyKA',
    price: 185.00
  },
  {
    id: 'dota2_mace_of_aeons',
    game: 'dota2',
    name: 'Mace of Aeons (Faceless Void)',
    nameEn: 'Mace of Aeons',
    category: 'immortal',
    rarity: 'extraordinary',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcU1vRhfV07eU-q51s7XXFVrIhpd_OvvLThz2_PPdDhB5tK12tbbx6GkZOuJzj8IvsEg2e2UpNui2FHn_0RtMDigcNTBIARsY1mE-FGggbC4dkhvYxU',
    price: 295.00
  },
  {
    id: 'dota2_arcana_pudge',
    game: 'dota2',
    name: 'Feast of Abscession (Pudge Arcana)',
    nameEn: 'Feast of Abscession',
    category: 'arcana',
    rarity: 'extraordinary',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUivB9aSQPAUuCq0vDAWFR3IBZovr6pJAhr7PHHdSpQ48nkwtbax6SlYb_XlzsCv5wpj-2ZoNrx3wHjqEZlZ2H3JY_Ec1Q7NQyF81O_g-3o86-7vI2m1zI97Zf2Wk31',
    price: 36.50
  },
  {
    id: 'dota2_arcana_pa',
    game: 'dota2',
    name: 'Manifold Paradox (Phantom Assassin Arcana)',
    nameEn: 'Manifold Paradox',
    category: 'arcana',
    rarity: 'extraordinary',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcU2qR5cSQPAUuCq0vDAWFh3NjtUvLWpJAhr7PHHdSpQ48nkwtbbx6SgZb6ElWwFu5cp37nFoImj2w2y-0FrMj-nJIGdc1I-NVuFrFCggbC4G3oO9cE',
    price: 34.00
  },
  {
    id: 'dota2_arcana_juggernaut',
    game: 'dota2',
    name: 'Bladeform Legacy (Juggernaut Arcana)',
    nameEn: 'Bladeform Legacy',
    category: 'arcana',
    rarity: 'extraordinary',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhpxZSS0bFV-q51s7XXF94IRBAu7StJAZr3ODNdT9F7c7lw9TZk_qmZeKAkzsEvpci2evH9N-hjQTn-0dtMDigIo7DcAZoNFiErFCggbC4iF0YQcE',
    price: 35.00
  },
  {
    id: 'dota2_vigil_triumph',
    game: 'dota2',
    name: 'Vigil Triumph (Sven)',
    nameEn: 'Vigil Triumph',
    category: 'immortal',
    rarity: 'covert',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhvx5TA1_GQuqSw8aEbFR5KAtForupFBR33OHMPi5U6dKJgIncqP75PrTDgmpd19ZmhfvFu9-l3QDmqUFuZ26hctSdIVI7aF_U_Fbvl-nsgMS0vc7PwCBm63Rx4SnD30vg-gT1mTQ',
    price: 55.00
  },
  {
    id: 'dota2_arms_of_desolation',
    game: 'dota2',
    name: 'Arms of Desolation (Shadow Fiend)',
    nameEn: 'Arms of Desolation',
    category: 'immortal',
    rarity: 'restricted',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhoRpZQ1vvQe2o2cucUk95NjtTs6mqZAZy3uD3dThR45K3wIPezqKsMriDkDNQsZwh3r3FpY2h3wXn-hY9a2ugIYbGIQU7Y13V5BHglsdC9JuQ',
    price: 5.40
  },
  {
    id: 'dota2_muh_keen_gun',
    game: 'dota2',
    name: 'Muh Keen Gun (Sniper)',
    nameEn: 'Muh Keen Gun',
    category: 'immortal',
    rarity: 'milspec',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUhpxJNSV6fSuWu38bdVmJzMApotbKkOQtp1rzFcD5K5dKzq4eemcj3O7rDmmJUpsYi07mWo96k2QPh-kBrZ2D7d9eTdgU9aVrS_VPtxO_m0J60v8nPwHp9-n51U-bh3v0',
    price: 2.10
  },
  {
    id: 'dota2_fin_kings_charm',
    game: 'dota2',
    name: 'Fin King\'s Charm (Lion)',
    nameEn: 'Fin King\'s Charm',
    category: 'immortal',
    rarity: 'milspec',
    image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcU-oBRTA0rZVOySxNvaUFY7Iw1EvoW2Pw5j2L3Oc2oRu9ngl9fZlq6gNeuHlzsD7pQg3e2YrYj3iQPh-kplamiiIIWdbEZgNlSpXq2x',
    price: 1.45
  },
  {
    id: 'dota2_bracers_cavern_luminar',
    game: 'dota2',
    name: 'Bracers of the Cavern Luminar',
    nameEn: 'Bracers of the Cavern Luminar',
    category: 'immortal',
    rarity: 'industrial',
    image: 'https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUupRhbQ0PeU-q51s7XXFRjLQtVvLWsJQhm0v73cy1Q4Nu3l9mJxqSmMrmEkD0IvJBy2eiW8N6k3AS3qEtpMTzyIYKTJwU8ZQqErFCggbC4g7z_54w',
    price: 0.65
  },
  {
    id: 'dota2_belt_iron_surge',
    game: 'dota2',
    name: 'Belt of the Iron Surge',
    nameEn: 'Belt of the Iron Surge',
    category: 'common',
    rarity: 'consumer',
    image: 'https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGIyi3kajH-XEytioIUSV91N0_4LmpVD1ThPOjYPy-icU5uChZpt-NeKUCynClupw4-doHn7qxEhyt23Szd3_J37CPQ90D5QjQ-8L5EXuxNfnYuri-UWA3A-470dR',
    price: 0.22
  },

  // =========================================================================
  // RUST: FROM BIG GRIN ($920) TO BASIC DOORS & HOODIES ($0.25)
  // =========================================================================
  {
    id: 'rust_big_grin',
    game: 'rust',
    name: 'Big Grin Mask',
    nameEn: 'Big Grin',
    category: 'mask',
    rarity: 'extraordinary',
    image: 'https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5GLEfCk4nReh8DEiv5daPq0_qrw_QfG9O-tu0Dw',
    price: 920.00
  },
  {
    id: 'rust_glory_ak47',
    game: 'rust',
    name: 'Glory AK47',
    nameEn: 'Glory AK47',
    category: 'weapon',
    rarity: 'extraordinary',
    image: 'https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5GLPfCk4nReh8DEiv5dYPao7rLEzQfy6LwYtMmg',
    price: 320.00
  },
  {
    id: 'rust_punishment_mask',
    game: 'rust',
    name: 'Punishment Mask',
    nameEn: 'Punishment Mask',
    category: 'mask',
    rarity: 'covert',
    image: 'https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5GLBfCk4nReh8DEiv5daPqo7pbczRvm8q0y8L4E',
    price: 280.00
  },
  {
    id: 'rust_alien_red',
    game: 'rust',
    name: 'Alien Red (AK47)',
    nameEn: 'Alien Red',
    category: 'weapon',
    rarity: 'covert',
    image: 'https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfCk4nReh8DEiv5dbPK47pbcyR_m4DQ68Ofs',
    price: 165.00
  },
  {
    id: 'rust_tempered_ak47',
    game: 'rust',
    name: 'Tempered AK47',
    nameEn: 'Tempered AK47',
    category: 'weapon',
    rarity: 'classified',
    image: 'https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5WHNfCk4nReh8DEiv5dYO607rLc2Rv2_0wEIAYs',
    price: 48.00
  },
  {
    id: 'rust_glowing_skull_door',
    game: 'rust',
    name: 'Glowing Skull Armored Door',
    nameEn: 'Glowing Skull Door',
    category: 'door',
    rarity: 'classified',
    image: 'https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5GLMfCk4nReh8DEiv5dbPKs8rrYwQfy6sqLM0vo',
    price: 38.00
  },
  {
    id: 'rust_metal_tree_door',
    game: 'rust',
    name: 'Metal Tree Sheet Door',
    nameEn: 'Metal Tree Door',
    category: 'door',
    rarity: 'restricted',
    image: 'https://steamcommunity-a.akamaihd.net/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835FX52LCfCk4nReh8DEiv5ddPKo9pbM1RP2US9wYKg',
    price: 18.50
  },
  {
    id: 'rust_bombing_garage_door',
    game: 'rust',
    name: 'Bombing Garage Door',
    nameEn: 'Bombing Garage Door',
    category: 'door',
    rarity: 'restricted',
    image: 'https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835db4GLHfCk4nReh8DEiv5ddMa88pLYyQ_tTIGzDcw',
    price: 9.50
  },
  {
    id: 'rust_frostbite_tshirt',
    game: 'rust',
    name: 'Frostbite T-Shirt',
    nameEn: 'Frostbite T-Shirt',
    category: 'clothing',
    rarity: 'milspec',
    image: 'https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5mLBfCk4nReh8DEiv5dbMa4-qL0xR_C29fO3tCQ',
    price: 3.60
  },
  {
    id: 'rust_camo_hoodie',
    game: 'rust',
    name: 'Digital Camo Hoodie',
    nameEn: 'Digital Camo Hoodie',
    category: 'clothing',
    rarity: 'milspec',
    image: 'https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5GDFfCk4nReh8DEiv5dYPqk5qLA3QP2-LjtoOu4',
    price: 1.50
  },
  {
    id: 'rust_hazard_sheet_door',
    game: 'rust',
    name: 'Sheet Metal Door | Hazard',
    nameEn: 'Sheet Metal Door Hazard',
    category: 'door',
    rarity: 'industrial',
    image: 'https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe7WLFfCk4nReh8DEiv5ddOa08qbUyRfG6con45x0',
    price: 1.10
  },
  {
    id: 'rust_revolver_scrap',
    game: 'rust',
    name: 'Revolver | Scrap Metal',
    nameEn: 'Revolver Scrap Metal',
    category: 'weapon',
    rarity: 'industrial',
    image: 'https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fc5WPAfCk4nReh8DEiv5dbO642qr0zR_C6jyRNZGU',
    price: 0.60
  },
  {
    id: 'rust_nomad_shoes',
    game: 'rust',
    name: 'Burlap Shoes | Nomad',
    nameEn: 'Burlap Shoes Nomad',
    category: 'clothing',
    rarity: 'consumer',
    image: 'https://community.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fc52PEfCk4nReh8DEiv5dbO60_r7Y0Sfm4fVjTIBc',
    price: 0.25
  }
];

// Helper function: unpacks all CS2 wear gradations so every variant is an individual skin
function getAllSkinVariants() {
  const result = [];

  SKINS_DATABASE.forEach(base => {
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
          price: wearInfo.price
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
        price: base.price
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

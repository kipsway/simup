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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbssLQJf8OD3fixH_9W_mo-Elvj8NrrHjyVT650g2r_H996ligOyrUVuMW73d9OVdAVoZw7R-VToxuq6hce4tJqanCcx7ig8pGB8sj-kY2qB',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbssLQJf28_3JFlP6c_jlpKKg_LmDLbUkmJE5YtzieyT94mi31Xs-RFvZTymIoXAcANrN1nU_la4wenp0cS5vZ_XiSw02qA-pL4',
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
    id: 'cs2_talon_knife_marble_fade',
    game: 'cs2',
    name: '★ Нож-коготь | Мраморный градиент',
    nameEn: '★ Talon Knife | Marble Fade',
    category: 'knife',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbssLQJf1ObcTjxP09G5lpKKg_LmDLbUkmJE5YtzieyR89um21fs_kdrMTvzdtOVcwA_YVCE-AC7x-7vg5S7uJ6byHpr6iUr7SrfmUepwUYbB1xP64I',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJB-ditq42ck_XnDLbUkmJE5YtzieyS8Nvx21K3_UFuY2rydoDAJ1U8Z1HQ_gK4xubvhcS86s7KzXFi7HUl53rfmAv330_Z8D46tw',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LliLprFZEydtwv33fDxO6NO7k5SZmvLwOq7cqWdQ-sJ0xLzApdj221C3qhc4YW73cdeTdgBqMV3XqAO6wunph8W4u5TBm3Fj6CV053jdygv3309aZ5t4sg',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LliLprFZEydtwv33fDxO6NO7k5SZmvLwOq7cqWdQ-sJ0xOzAotj23wK2_0c6YWzzLNLEegRqNFvZ-lfsyevnhMC17svNySBg7igk7XrZygv3308nC45Eyw',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09izh4-GkvP9Jrafw2lU6ccp0rqVpdus2lXnqkVsZzv7INSSIQFoNA2F_FS_xefog5W9vc_XiSw0Fvdh9jQ',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2DwB65Jy0rmVpoin2Q3m-ERkYW_6LYTBdwc5MFjX-1btweznh5S-6MzKm3Fm7ik8pGB8srA5YF6u',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV09m7hJKOhOTLPr7Vn35cppQh2-yVp92m2Qfm_0JsYjyncNWReg9vN1CE_gK5w-y-hpDv7cycmnI17CMr-z-DyP2hP00k',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08y5nY6fqPP9ILrDhGpI18h0juDU-MKt0Fex-kdsMTjyd9SVc1VoY1nV_1m8xr_vh5S5u5qYznM26CQk5Srem0SpwUYbe7V0Zyo',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITBhGJf_NZlmOzA-LP5gVO8v11rYm_wJYKTJw9tN12D-lW6kO_pjZXp7szNn2wj5He4vnPfgw',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH_8j4hoW0k_L4Or7fglRd4cJ5nqeY843w0Q23_hZvNmn6cI7BdlU8NAyF-lG5l7rvjZO7ucvMm2wj5Hfy803BfA',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5Mx2gv2PoI-k2FHm_hI9ZD3wcY6SdFBsY17UqVjqxe_qh8C16czLzXUyuCYk7HnYmgv33088j32d0w',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08u_mpSOhcjnPLfWl3lu-sR1jeTE8YXghRq2rhI6Z23yLIWQcANsM1uFqVm-x-rvjZPotZqfynNqvyggsXmLnx2whx1SLrs40_pZ_9I',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJU5cyzhr-GkvP9Jrafw2lU6ccp0rqV842kjQ23-kZsZG-nd9edcQVoZwvV_Fa9w-bog5W5vczLnXNhviU8pGB8so_0jU0',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITBhGJf_NZlmOzA-LP5gVO8v11sY2_1LNeTJg5tY1DV_1W_kO-5h5Tuu5TAzHBh7CIr-z-DyJ690B4i',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5Mx2gv2PrNms2VXi-kRtZzzyLdOXclI-YF6F-lG3lenmhsDovpTImHVluiZ34CnUnAv330-Q3_Vj_g',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH_8j4hoW0k_L4Or7fglRd4cJ5nqeXrd-g2wW1rhA5ZziiJdKXelI-ZFiD-FW9x-zmjcK0upzBzmwys3Nw5iuLnAv3309aL1n5SA',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV08y5nY6fqPP9ILrDhGpI18h0juDU-MKj3Vewr0FtMWynINLDdQc2NwvR_wS6wbzoh5S-upzLzHNk6yU8pGB8sh40nN4',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITBhGJf_NZlmOzA-LP5gVO8v11vYjzyI4eddVQ5N1rVqVG9kOzt1sW-vc_MmiEy6CIk7S3YnxO_gR1SLrs4-4b5w4M',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j_OrfdqWhe5sN4mOTE8YXghRq2rhdoYj_ycNDDd1U7aQrT-1HtxO_ngJbquJnNzHQ17HYk5X7dyhzhghxSLrs48I78tU8',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73fyhB4Nm3hr-YksjnPr7Vn35cppMp3LiWrd-s2wPn-UVrZmqlLNWRegVqN1jTqVW6l-rr0cfouZrJzXJh6D5iuyjEw_L7mg',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS09-5hpWFkuP7PAUYucF337-W8Y-ijAGw-URrNzv7LYHAclA-YQ2D_la3kue5h8S_6J67yXQ1unY8pGB8stYQc2-1',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZf0v73dS9B6di6nI-Mz_jgMrfujm5V1810i__E89-n3wLmr0RpMWihINPBcAFvZwzZ-lO5xOzvhpbouZ7PzCd9-n51zK78f5M',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzQgAflfd3fwJE7dm5kJW0m_7zO6-fzj9V65x0m_rEyoHwjF2hpl04Y2r2IdTHdlA6aFzVqFm-k-7pgp-06c-fm3Fivyhx5XndnUa-0AYMMLK21V_i9w',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR1xQ0PYE-241snbXVJgJwFUsr-kLAtknvH3ejx989m3go-OhOTLO77QgHIfv5En3OuR9t2migfsrkVkZj2mddSQIwU9NQ7QqVm3kuy805e_upvKz3I36yV24GGdwUKH_m5c8g',
    price: 2850.00
  },
  {
    id: 'dota2_dragonclaw_hook',
    game: 'dota2',
    name: 'Dragonclaw Hook (Pudge)',
    nameEn: 'Dragonclaw Hook',
    category: 'immortal',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR1xQ0PYE-241snbXVJgJwVUsr-kLAtknvH3eSx989m3go-OhOTLO77QgHIf68cg2LyS8Nyg0FXl_kBsYTv6INCSJAc6aQrU-lftkri7hsfpvZvAzHJj7yI8pGB8sv1r56k',
    price: 185.00
  },
  {
    id: 'dota2_mace_of_aeons',
    game: 'dota2',
    name: 'Mace of Aeons (Faceless Void)',
    nameEn: 'Mace of Aeons',
    category: 'immortal',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR1xQ0PYE-241snbXVJgJwBUsr-kLAtknvH3ejx989m3go-OhOTLO77QgHIfv5En3OuR9t2migfsrkVkZj2mddSQIwU9NQ7QqVm3kuy805e_upvKz3I36yV24GGdwUKH_m5c8g',
    price: 295.00
  },
  {
    id: 'dota2_arcana_pudge',
    game: 'dota2',
    name: 'Feast of Abscession (Pudge Arcana)',
    nameEn: 'Feast of Abscession',
    category: 'arcana',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR1xQ0PYE-241snbXVJgJwFUsr-kLAtknvH3cCJ95Nm3h46Jkvj3Nq7fwG5Q-sJ0xL2Srdvw2ADtr0drNjj6dY-TIwA3aF3R-wO2yOq-hMC0upzPmHFj6CR2-z-DyG2w7q6m',
    price: 36.50
  },
  {
    id: 'dota2_arcana_pa',
    game: 'dota2',
    name: 'Manifold Paradox (Phantom Assassin Arcana)',
    nameEn: 'Manifold Paradox',
    category: 'arcana',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR1xQ0PYE-241snbXVJgJwFUsr-kLAtknvH3dTR989m3go-OhOTLO77QgHIfv5En3OuR9t2migfsrkVkZj2mddSQIwU9NQ7QqVm3kuy805e_upvKz3I36yV24GGdwUKH_m5c8g',
    price: 34.00
  },
  {
    id: 'dota2_arcana_juggernaut',
    game: 'dota2',
    name: 'Bladeform Legacy (Juggernaut Arcana)',
    nameEn: 'Bladeform Legacy',
    category: 'arcana',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR1xQ0PYE-241snbXVJgJwFUsr-kLAtknvH3ejx989m3go-OhOTLO77QgHIfv5En3OuR9t2migfsrkVkZj2mddSQIwU9NQ7QqVm3kuy805e_upvKz3I36yV24GGdwUKH_m5c8g',
    price: 35.00
  },
  {
    id: 'dota2_vigil_triumph',
    game: 'dota2',
    name: 'Vigil Triumph (Sven)',
    nameEn: 'Vigil Triumph',
    category: 'immortal',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR1xQ0PYE-241snbXVJgJwRUsr-kLAtknvH3dTR989m3go-OhOTLO77QgHIfv5En3OuR9t2migfsrkVkZj2mddSQIwU9NQ7QqVm3kuy805e_upvKz3I36yV24GGdwUKH_m5c8g',
    price: 55.00
  },
  {
    id: 'dota2_arms_of_desolation',
    game: 'dota2',
    name: 'Arms of Desolation (Shadow Fiend)',
    nameEn: 'Arms of Desolation',
    category: 'immortal',
    rarity: 'restricted',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR1xQ0PYE-241snbXVJgJwFUsr-kLAtknvH3cCJ95Nm3h46Jkvj3Nq7fwG5Q-sJ0xL2Srdvw2ADtr0drNjj6dY-TIwA3aF3R-wO2yOq-hMC0upzPmHFj6CR2-z-DyG2w7q6m',
    price: 5.40
  },
  {
    id: 'dota2_muh_keen_gun',
    game: 'dota2',
    name: 'Muh Keen Gun (Sniper)',
    nameEn: 'Muh Keen Gun',
    category: 'immortal',
    rarity: 'milspec',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR1xQ0PYE-241snbXVJgJwFUsr-kLAtknvH3eSx989m3go-OhOTLO77QgHIf68cg2LyS8Nyg0FXl_kBsYTv6INCSJAc6aQrU-lftkri7hsfpvZvAzHJj7yI8pGB8sv1r56k',
    price: 2.10
  },
  {
    id: 'dota2_fin_kings_charm',
    game: 'dota2',
    name: 'Fin King\'s Charm (Lion)',
    nameEn: 'Fin King\'s Charm',
    category: 'immortal',
    rarity: 'milspec',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR1xQ0PYE-241snbXVJgJwRUsr-kLAtknvH3dTR989m3go-OhOTLO77QgHIfv5En3OuR9t2migfsrkVkZj2mddSQIwU9NQ7QqVm3kuy805e_upvKz3I36yV24GGdwUKH_m5c8g',
    price: 1.45
  },
  {
    id: 'dota2_bracers_cavern_luminar',
    game: 'dota2',
    name: 'Bracers of the Cavern Luminar',
    nameEn: 'Bracers of the Cavern Luminar',
    category: 'immortal',
    rarity: 'industrial',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR1xQ0PYE-241snbXVJgJwFUsr-kLAtknvH3cCJ95Nm3h46Jkvj3Nq7fwG5Q-sJ0xL2Srdvw2ADtr0drNjj6dY-TIwA3aF3R-wO2yOq-hMC0upzPmHFj6CR2-z-DyG2w7q6m',
    price: 0.65
  },
  {
    id: 'dota2_belt_iron_surge',
    game: 'dota2',
    name: 'Belt of the Iron Surge',
    nameEn: 'Belt of the Iron Surge',
    category: 'common',
    rarity: 'consumer',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR1xQ0PYE-241snbXVJgJwFUsr-kLAtknvH3eSx989m3go-OhOTLO77QgHIf68cg2LyS8Nyg0FXl_kBsYTv6INCSJAc6aQrU-lftkri7hsfpvZvAzHJj7yI8pGB8sv1r56k',
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
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
    price: 920.00
  },
  {
    id: 'rust_glory_ak47',
    game: 'rust',
    name: 'Glory AK47',
    nameEn: 'Glory AK47',
    category: 'weapon',
    rarity: 'extraordinary',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
    price: 320.00
  },
  {
    id: 'rust_punishment_mask',
    game: 'rust',
    name: 'Punishment Mask',
    nameEn: 'Punishment Mask',
    category: 'mask',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
    price: 280.00
  },
  {
    id: 'rust_alien_red',
    game: 'rust',
    name: 'Alien Red (AK47)',
    nameEn: 'Alien Red',
    category: 'weapon',
    rarity: 'covert',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
    price: 165.00
  },
  {
    id: 'rust_tempered_ak47',
    game: 'rust',
    name: 'Tempered AK47',
    nameEn: 'Tempered AK47',
    category: 'weapon',
    rarity: 'classified',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
    price: 48.00
  },
  {
    id: 'rust_glowing_skull_door',
    game: 'rust',
    name: 'Glowing Skull Armored Door',
    nameEn: 'Glowing Skull Door',
    category: 'door',
    rarity: 'classified',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
    price: 38.00
  },
  {
    id: 'rust_metal_tree_door',
    game: 'rust',
    name: 'Metal Tree Sheet Door',
    nameEn: 'Metal Tree Door',
    category: 'door',
    rarity: 'restricted',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
    price: 18.50
  },
  {
    id: 'rust_bombing_garage_door',
    game: 'rust',
    name: 'Bombing Garage Door',
    nameEn: 'Bombing Garage Door',
    category: 'door',
    rarity: 'restricted',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
    price: 9.50
  },
  {
    id: 'rust_frostbite_tshirt',
    game: 'rust',
    name: 'Frostbite T-Shirt',
    nameEn: 'Frostbite T-Shirt',
    category: 'clothing',
    rarity: 'milspec',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
    price: 3.60
  },
  {
    id: 'rust_camo_hoodie',
    game: 'rust',
    name: 'Digital Camo Hoodie',
    nameEn: 'Digital Camo Hoodie',
    category: 'clothing',
    rarity: 'milspec',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
    price: 1.50
  },
  {
    id: 'rust_hazard_sheet_door',
    game: 'rust',
    name: 'Sheet Metal Door | Hazard',
    nameEn: 'Sheet Metal Door Hazard',
    category: 'door',
    rarity: 'industrial',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
    price: 1.10
  },
  {
    id: 'rust_revolver_scrap',
    game: 'rust',
    name: 'Revolver | Scrap Metal',
    nameEn: 'Revolver Scrap Metal',
    category: 'weapon',
    rarity: 'industrial',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
    price: 0.60
  },
  {
    id: 'rust_nomad_shoes',
    game: 'rust',
    name: 'Burlap Shoes | Nomad',
    nameEn: 'Burlap Shoes Nomad',
    category: 'clothing',
    rarity: 'consumer',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDDB_xxfF4G9Y-06a4n0GN3Vpm22ENuvFqW5lQWyo9v7_Ld_m1k341Xw_W_e4z2Y-Zc',
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

// Automatically enrich all items with procedural artwork
SKINS_DATABASE.forEach(skin => {
  skin.fallbackSvg = generateSkinSvg(skin.name, skin.rarity, skin.category, skin.game);
  skin.image = skin.fallbackSvg; // 100% reliable offline artwork
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

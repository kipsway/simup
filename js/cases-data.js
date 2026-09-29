/* ==========================================================================
   SIMUP - 15 CASES DATABASE (5 FOR CS2, 5 FOR DOTA 2, 5 FOR RUST)
   Realistic drop tables with precise mathematical weights (probabilities)
   ========================================================================== */

const CASES_DATABASE = [
  // ==========================================
  // CS2 CASES (5 Unique Cases)
  // ==========================================
  {
    id: 'case_cs2_knife_dream',
    game: 'cs2',
    name: 'Knife Dream ★',
    nameEn: 'Knife Dream Case',
    price: 150.00,
    icon: '🗡️',
    color: '#ffd700',
    description: 'Легендарный кейс исключительно с ножами и топовыми перчатками!',
    items: [
      { skinId: 'cs2_gloves_vice_FT', weight: 3 },       // Sport Gloves Vice ($1,450) -> 0.3%
      { skinId: 'cs2_butterfly_fade_FN', weight: 8 },    // Butterfly Fade ($3,450) -> 0.8%
      { skinId: 'cs2_karambit_doppler_p2_FN', weight: 14 }, // Karambit Doppler ($2,150) -> 1.4%
      { skinId: 'cs2_m9_bayonet_lore_FT', weight: 35 },  // M9 Bayonet Lore ($680) -> 3.5%
      { skinId: 'cs2_skeleton_crimson_web_FT', weight: 50 }, // Skeleton Crimson ($740) -> 5.0%
      { skinId: 'cs2_gloves_snow_leopard_FT', weight: 190 }, // Gloves Snow Leopard ($440) -> 19.0%
      { skinId: 'cs2_m9_bayonet_lore_BS', weight: 320 },  // M9 Lore BS ($390) -> 32.0%
      { skinId: 'cs2_gloves_snow_leopard_BS', weight: 380 } // Snow Leopard BS ($230) -> 38.0%
    ]
  },
  {
    id: 'case_cs2_covert_beast',
    game: 'cs2',
    name: 'Covert Beast',
    nameEn: 'Covert Beast Case',
    price: 45.00,
    icon: '🐉',
    color: '#eb4b4b',
    description: 'Тайные винтовки и снайперки высшего калибра.',
    items: [
      { skinId: 'cs2_ak47_wild_lotus_FT', weight: 4 },     // Wild Lotus ($4,200) -> 0.4%
      { skinId: 'cs2_awp_desert_hydra_FT', weight: 16 },   // Desert Hydra ($1,450) -> 1.6%
      { skinId: 'cs2_m4a1s_printstream_FN', weight: 40 },  // M4A1-S Printstream ($540) -> 4.0%
      { skinId: 'cs2_ak47_printstream_FN', weight: 80 },   // AK-47 Printstream ($280) -> 8.0%
      { skinId: 'cs2_awp_asiimov_FT', weight: 260 },       // AWP Asiimov ($145) -> 26.0%
      { skinId: 'cs2_usps_kill_confirmed_FT', weight: 280 }, // USP-S Kill Confirmed ($54) -> 28.0%
      { skinId: 'cs2_ak47_printstream_BS', weight: 320 }   // AK-47 Printstream BS ($65) -> 32.0%
    ]
  },
  {
    id: 'case_cs2_sniper_elite',
    game: 'cs2',
    name: 'Sniper Elite',
    nameEn: 'Sniper Elite Case',
    price: 25.00,
    icon: '🎯',
    color: '#00d2ff',
    description: 'Всё для любителей AWP: от Dragon Lore до Asiimov.',
    items: [
      { skinId: 'cs2_awp_dragon_lore_FT', weight: 2 },    // Dragon Lore ($5,800) -> 0.2%
      { skinId: 'cs2_awp_gungnir_FT', weight: 3 },        // Gungnir ($6,200) -> 0.3%
      { skinId: 'cs2_awp_desert_hydra_BS', weight: 25 },  // Desert Hydra BS ($950) -> 2.5%
      { skinId: 'cs2_awp_asiimov_FT', weight: 120 },      // AWP Asiimov FT ($145) -> 12.0%
      { skinId: 'cs2_awp_asiimov_BS', weight: 250 },      // AWP Asiimov BS ($85) -> 25.0%
      { skinId: 'cs2_ak47_redline_FT', weight: 600 }      // AK-47 Redline ($18.5) -> 60.0%
    ]
  },
  {
    id: 'case_cs2_vintage_legends',
    game: 'cs2',
    name: 'Vintage Legends',
    nameEn: 'Vintage Legends Case',
    price: 80.00,
    icon: '👑',
    color: '#e4ae39',
    description: 'Классические скины первой эры: Howl, Fire Serpent и Deagle Blaze.',
    items: [
      { skinId: 'cs2_m4a4_howl_FT', weight: 8 },          // Howl ($3,400) -> 0.8%
      { skinId: 'cs2_ak47_fire_serpent_FT', weight: 32 }, // Fire Serpent ($780) -> 3.2%
      { skinId: 'cs2_deagle_blaze_FN', weight: 120 },     // Deagle Blaze ($820) -> 12.0%
      { skinId: 'cs2_ak47_case_hardened_FT', weight: 240 }, // Case Hardened ($290) -> 24.0%
      { skinId: 'cs2_ak47_redline_MW', weight: 600 }      // AK-47 Redline MW ($95) -> 60.0%
    ]
  },
  {
    id: 'case_cs2_budget_rush',
    game: 'cs2',
    name: 'Budget Rush',
    nameEn: 'Budget Rush Case',
    price: 2.50,
    icon: '⚡',
    color: '#10b981',
    description: 'Бюджетный кейс всего за $2.50 с шансом окупа в 50 раз!',
    items: [
      { skinId: 'cs2_awp_asiimov_FT', weight: 10 },        // AWP Asiimov ($145) -> 1.0%
      { skinId: 'cs2_usps_kill_confirmed_FT', weight: 35 }, // USP-S Kill Confirmed ($54) -> 3.5%
      { skinId: 'cs2_ak47_redline_FT', weight: 155 },      // AK-47 Redline ($18.5) -> 15.5%
      { skinId: 'cs2_glock18_water_elemental_FT', weight: 300 }, // Glock Water ($6.8) -> 30.0%
      { skinId: 'cs2_p250_sand_dune_FN', weight: 500 }     // P250 Sand Dune ($2.1) -> 50.0%
    ]
  },

  // ==========================================
  // DOTA 2 CASES (5 Unique Cases)
  // ==========================================
  {
    id: 'case_dota2_roshan_treasure',
    game: 'dota2',
    name: "Roshan's Treasure",
    nameEn: "Roshan's Treasure Case",
    price: 95.00,
    icon: '💎',
    color: '#ffd700',
    description: 'Золотой малыш Рошан, Драгонклав Хук и другие сокровища Доты.',
    items: [
      { skinId: 'dota2_golden_baby_roshan_STANDARD', weight: 15 }, // Golden Roshan ($2,850) -> 1.5%
      { skinId: 'dota2_mace_of_aeons_STANDARD', weight: 85 },      // Mace of Aeons ($340) -> 8.5%
      { skinId: 'dota2_dragonclaw_hook_STANDARD', weight: 200 },   // DC Hook ($185) -> 20.0%
      { skinId: 'dota2_vigil_triumph_STANDARD', weight: 700 }      // Vigil Triumph ($62) -> 70.0%
    ]
  },
  {
    id: 'case_dota2_arcana_vault',
    game: 'dota2',
    name: 'Arcana Vault',
    nameEn: 'Arcana Vault Case',
    price: 32.00,
    icon: '🔮',
    color: '#a855f7',
    description: 'Кейс легендарных Аркан: Phantom Assassin, Juggernaut и Pudge.',
    items: [
      { skinId: 'dota2_dragonclaw_hook_STANDARD', weight: 40 },      // DC Hook ($185) -> 4.0%
      { skinId: 'dota2_bladeform_legacy_STANDARD', weight: 300 },    // Juggernaut Arcana ($35) -> 30.0%
      { skinId: 'dota2_manifold_paradox_STANDARD', weight: 330 },    // PA Arcana ($34.5) -> 33.0%
      { skinId: 'dota2_feast_of_abscession_STANDARD', weight: 330 }  // Pudge Arcana ($32) -> 33.0%
    ]
  },
  {
    id: 'case_dota2_immortal_dominion',
    game: 'dota2',
    name: 'Immortal Dominion',
    nameEn: 'Immortal Dominion Case',
    price: 18.00,
    icon: '🛡️',
    color: '#eb4b4b',
    description: 'Оружие Immortal качества для Sven, Void и Invoker.',
    items: [
      { skinId: 'dota2_mace_of_aeons_STANDARD', weight: 25 },     // Mace of Aeons ($340) -> 2.5%
      { skinId: 'dota2_vigil_triumph_STANDARD', weight: 200 },    // Vigil Triumph ($62) -> 20.0%
      { skinId: 'dota2_feast_of_abscession_STANDARD', weight: 275 }, // Pudge Arcana ($32) -> 27.5%
      { skinId: 'dota2_magus_apex_STANDARD', weight: 500 }        // Magus Apex ($6.8) -> 50.0%
    ]
  },
  {
    id: 'case_dota2_midlane_glory',
    game: 'dota2',
    name: 'Midlane Glory',
    nameEn: 'Midlane Glory Case',
    price: 12.00,
    icon: '🔥',
    color: '#ff9900',
    description: 'Скины для легендарных мидеров: Invoker, SF и Storm.',
    items: [
      { skinId: 'dota2_manifold_paradox_STANDARD', weight: 80 },  // PA Arcana ($34.5) -> 8.0%
      { skinId: 'dota2_magus_apex_STANDARD', weight: 420 },       // Magus Apex ($6.8) -> 42.0%
      { skinId: 'dota2_solar_forge_STANDARD', weight: 500 }       // Solar Forge ($1.4) -> 50.0%
    ]
  },
  {
    id: 'case_dota2_support_soul',
    game: 'dota2',
    name: 'Support Soul',
    nameEn: 'Support Soul Case',
    price: 4.50,
    icon: '🕊️',
    color: '#34d399',
    description: 'Доступный кейс для саппортов с шансом сорвать джекпот!',
    items: [
      { skinId: 'dota2_dragonclaw_hook_STANDARD', weight: 5 },    // DC Hook ($185) -> 0.5%
      { skinId: 'dota2_feast_of_abscession_STANDARD', weight: 45 }, // Pudge Arcana ($32) -> 4.5%
      { skinId: 'dota2_magus_apex_STANDARD', weight: 250 },       // Magus Apex ($6.8) -> 25.0%
      { skinId: 'dota2_solar_forge_STANDARD', weight: 700 }       // Solar Forge ($1.4) -> 70.0%
    ]
  },

  // ==========================================
  // RUST CASES (5 Unique Cases)
  // ==========================================
  {
    id: 'case_rust_mask_collector',
    game: 'rust',
    name: 'Mask Collector',
    nameEn: 'Mask Collector Case',
    price: 120.00,
    icon: '👺',
    color: '#ffd700',
    description: 'Самые редкие маски в истории Rust: Big Grin и Punishment Mask.',
    items: [
      { skinId: 'rust_big_grin_STANDARD', weight: 65 },         // Big Grin ($1,250) -> 6.5%
      { skinId: 'rust_punishment_mask_STANDARD', weight: 135 }, // Punishment Mask ($820) -> 13.5%
      { skinId: 'rust_glory_ak47_STANDARD', weight: 300 },      // Glory AK ($340) -> 30.0%
      { skinId: 'rust_alien_red_STANDARD', weight: 500 }        // Alien Red ($290) -> 50.0%
    ]
  },
  {
    id: 'case_rust_glowing_night',
    game: 'rust',
    name: 'Glowing Night',
    nameEn: 'Glowing Night Case',
    price: 40.00,
    icon: '💡',
    color: '#00ff88',
    description: 'Светящиеся в темноте неоновые скины для рейдов.',
    items: [
      { skinId: 'rust_alien_red_STANDARD', weight: 80 },         // Alien Red ($290) -> 8.0%
      { skinId: 'rust_glory_ak47_STANDARD', weight: 120 },       // Glory AK ($340) -> 12.0%
      { skinId: 'rust_tempered_ak47_STANDARD', weight: 400 },    // Tempered AK ($65) -> 40.0%
      { skinId: 'rust_neon_storage_box_STANDARD', weight: 400 }  // Neon Box ($8.5) -> 40.0%
    ]
  },
  {
    id: 'case_rust_raiders_armory',
    game: 'rust',
    name: "Raider's Armory",
    nameEn: "Raider's Armory Case",
    price: 55.00,
    icon: '🔫',
    color: '#eb4b4b',
    description: 'Тяжелый арсенал для клановых рейдов.',
    items: [
      { skinId: 'rust_big_grin_STANDARD', weight: 15 },         // Big Grin ($1,250) -> 1.5%
      { skinId: 'rust_glory_ak47_STANDARD', weight: 135 },      // Glory AK ($340) -> 13.5%
      { skinId: 'rust_alien_red_STANDARD', weight: 150 },       // Alien Red ($290) -> 15.0%
      { skinId: 'rust_tempered_ak47_STANDARD', weight: 400 },   // Tempered AK ($65) -> 40.0%
      { skinId: 'rust_fireproof_door_STANDARD', weight: 300 }   // Fireproof Door ($18) -> 30.0%
    ]
  },
  {
    id: 'case_rust_toxic_wasteland',
    game: 'rust',
    name: 'Toxic Wasteland',
    nameEn: 'Toxic Wasteland Case',
    price: 15.00,
    icon: '☢️',
    color: '#f59e0b',
    description: 'Закаленный металл и радиоактивное снаряжение.',
    items: [
      { skinId: 'rust_alien_red_STANDARD', weight: 30 },        // Alien Red ($290) -> 3.0%
      { skinId: 'rust_tempered_ak47_STANDARD', weight: 170 },   // Tempered AK ($65) -> 17.0%
      { skinId: 'rust_fireproof_door_STANDARD', weight: 400 },  // Fireproof Door ($18) -> 40.0%
      { skinId: 'rust_neon_storage_box_STANDARD', weight: 400 } // Neon Box ($8.5) -> 40.0%
    ]
  },
  {
    id: 'case_rust_scrap_fortune',
    game: 'rust',
    name: 'Scrap Fortune',
    nameEn: 'Scrap Fortune Case',
    price: 3.00,
    icon: '🔩',
    color: '#6b7280',
    description: 'Сборщик металлолома: дешевый кейс для каждого выжившего.',
    items: [
      { skinId: 'rust_tempered_ak47_STANDARD', weight: 20 },    // Tempered AK ($65) -> 2.0%
      { skinId: 'rust_fireproof_door_STANDARD', weight: 80 },   // Fireproof Door ($18) -> 8.0%
      { skinId: 'rust_neon_storage_box_STANDARD', weight: 200 },// Neon Box ($8.5) -> 20.0%
      { skinId: 'rust_metal_hunter_bow_STANDARD', weight: 700 } // Bow ($1.2) -> 70.0%
    ]
  }
];

window.CASES_DATABASE = CASES_DATABASE;

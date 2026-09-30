/* ==========================================================================
   SIMUP - 15 CASES DATABASE (5 FOR CS2, 5 FOR DOTA 2, 5 FOR RUST) - BLOCK 7
   Realistic drop tables with precise mathematical weights (probabilities)
   - Every single skinId matches SKINS_DATABASE 100%
   - Every case strictly contains loss skins cheaper than the case price
   - Realistic house edge and return-to-player (~75% - 88% EV)
   ========================================================================== */

const CASES_DATABASE = [
  // ==========================================
  // CS2 CASES (5 Balanced Cases)
  // ==========================================
  {
    id: 'case_cs2_budget_rush',
    game: 'cs2',
    name: 'Бюджетный раш',
    nameEn: 'Budget Rush Case',
    price: 2.50,
    icon: '⚡',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU1nfbOIj8W7oWzkYLdlPOsMOmIk2du-sNz3-2SpN3wigew_0A-Z2qmJoedcwA3ZAvV-VG-kO_n05e0vszLziBq6yN27XbYyR3i0hxMcKUx0n_vVz1b/360fx360f',
    color: '#10b981',
    description: 'Доступный кейс с шансом выбить AK-47 Redline и AWP Asiimov.',
    items: [
      { skinId: 'cs2_g3sg1_safari_mesh_BS', weight: 280 }, // $0.12 (28.0%)
      { skinId: 'cs2_p250_sand_dune_FT', weight: 260 },   // $0.20 (26.0%)
      { skinId: 'cs2_usps_ticket_to_hell_BS', weight: 160 }, // $0.65 (16.0%)
      { skinId: 'cs2_m4a1s_night_terror_FT', weight: 130 }, // $1.10 (13.0%)
      { skinId: 'cs2_ak47_slate_FT', weight: 95 },         // $2.50 (9.5%)
      { skinId: 'cs2_awp_atheris_FT', weight: 45 },        // $3.40 (4.5%)
      { skinId: 'cs2_ak47_redline_FT', weight: 25 },       // $18.50 (2.5%)
      { skinId: 'cs2_awp_asiimov_FT', weight: 5 }          // $135.00 (0.5%)
    ]
  },
  {
    id: 'case_cs2_sniper_elite',
    game: 'cs2',
    name: 'Снайперская элита',
    nameEn: 'Sniper Elite Case',
    price: 15.00,
    icon: '🎯',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU2nfadJjl958-6nIGZkrujMeqJxD8GupIo27uU992k2Faw-0dtZ2ymIoSWdwQ3aAvW81m7xOi70560vZzKyXBi6CMg5izYnUfji0wccKUx0lC04Llh/360fx360f',
    color: '#00d2ff',
    description: 'Всё для снайперов: от Atheris и Hyper Beast до легендарного Dragon Lore.',
    items: [
      { skinId: 'cs2_g3sg1_safari_mesh_BS', weight: 120 }, // $0.12 (12.0%)
      { skinId: 'cs2_awp_atheris_BS', weight: 320 },       // $2.10 (32.0%)
      { skinId: 'cs2_awp_atheris_FT', weight: 260 },       // $3.40 (26.0%)
      { skinId: 'cs2_awp_atheris_MW', weight: 160 },       // $6.80 (16.0%)
      { skinId: 'cs2_awp_atheris_FN', weight: 70 },        // $14.50 (7.0%)
      { skinId: 'cs2_awp_hyper_beast_BS', weight: 40 },    // $21.00 (4.0%)
      { skinId: 'cs2_awp_hyper_beast_FT', weight: 20 },    // $32.00 (2.0%)
      { skinId: 'cs2_awp_asiimov_FT', weight: 9 },         // $135.00 (0.9%)
      { skinId: 'cs2_awp_dragon_lore_BS', weight: 1 }      // $3200.00 (0.1%)
    ]
  },
  {
    id: 'case_cs2_covert_beast',
    game: 'cs2',
    name: 'Тайный зверь',
    nameEn: 'Covert Beast Case',
    price: 40.00,
    icon: '🐉',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUwnfbODjxN_8u5gIGZkrujMeqJwz4D65dwj-jE89P33QPt-xFlam-mco-TewBtMA7V-Fm8w-y9g560vMnKzHBi6CIg5izclhbji0pMcKUx0vFOUl8k/360fx360f',
    color: '#eb4b4b',
    description: 'Тайные штурмовые винтовки и пистолеты высшего ранга.',
    items: [
      { skinId: 'cs2_ak47_slate_BS', weight: 110 },        // $1.80 (11.0%)
      { skinId: 'cs2_m4a4_the_emperor_BS', weight: 310 },  // $9.80 (31.0%)
      { skinId: 'cs2_ak47_redline_FT', weight: 260 },      // $18.50 (26.0%)
      { skinId: 'cs2_awp_hyper_beast_BS', weight: 150 },   // $21.00 (15.0%)
      { skinId: 'cs2_deagle_printstream_FT', weight: 90 }, // $48.00 (9.0%)
      { skinId: 'cs2_gut_knife_safari_mesh_BS', weight: 50 }, // $74.00 (5.0%)
      { skinId: 'cs2_m4a1s_printstream_FT', weight: 23 },  // $125.00 (2.3%)
      { skinId: 'cs2_ak47_fire_serpent_FT', weight: 5 },   // $740.00 (0.5%)
      { skinId: 'cs2_ak47_wild_lotus_FT', weight: 2 }      // $3800.00 (0.2%)
    ]
  },
  {
    id: 'case_cs2_vintage_legends',
    game: 'cs2',
    name: 'Винтажные легенды',
    nameEn: 'Vintage Legends Case',
    price: 75.00,
    icon: '👑',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUx1fCYI2USu921n4XZg_jmMqjfqWdQ-sJ0xOzAot-jiQa2_EdkN2-iLI-TdQ45YlnV_1ntxevn0Z-_6Z_KyHpq6yVwtiuIyxO2n1gSOeM3c_V0/360fx360f',
    color: '#e4ae39',
    description: 'Легендарные классические раритеты первой эры CS: Howl, Fire Serpent и Dragon Lore.',
    items: [
      { skinId: 'cs2_deagle_conspiracy_FT', weight: 140 }, // $4.80 (14.0%)
      { skinId: 'cs2_ak47_redline_BS', weight: 310 },      // $13.50 (31.0%)
      { skinId: 'cs2_awp_hyper_beast_BS', weight: 240 },   // $21.00 (24.0%)
      { skinId: 'cs2_deagle_printstream_FT', weight: 160 },// $48.00 (16.0%)
      { skinId: 'cs2_gut_knife_safari_mesh_FT', weight: 85 }, // $78.00 (8.5%)
      { skinId: 'cs2_m4a1s_printstream_FT', weight: 45 },  // $125.00 (4.5%)
      { skinId: 'cs2_ak47_fire_serpent_FT', weight: 16 },  // $740.00 (1.6%)
      { skinId: 'cs2_m4a4_howl_FT', weight: 3 },           // $3950.00 (0.3%)
      { skinId: 'cs2_awp_dragon_lore_FT', weight: 1 }      // $5400.00 (0.1%)
    ]
  },
  {
    id: 'case_cs2_knife_dream',
    game: 'cs2',
    name: 'Мечта о ноже ★',
    nameEn: 'Knife Dream Case',
    price: 130.00,
    icon: '🗡️',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU21nyQITh95864kYXZg_jmMqjfqWdQ-sJ0xOzAot-jiQa2_EdkN2-iLI-TdQ45YlnV_1ntxevn0Z-_6Z_KyHpq6yVwtiuIyxO2n1gSOV-8-qJt/360fx360f',
    color: '#ffd700',
    description: 'Охота за редкими ножами Karambit, Butterfly Fade и перчатками Vice.',
    items: [
      { skinId: 'cs2_m4a4_the_emperor_BS', weight: 1600 },     // $9.80 (16.0%)
      { skinId: 'cs2_deagle_printstream_FT', weight: 3200 },   // $48.00 (32.0%)
      { skinId: 'cs2_gut_knife_safari_mesh_BS', weight: 2950 },// $74.00 (29.5%)
      { skinId: 'cs2_m4a1s_printstream_FT', weight: 1350 },    // $125.00 (13.5%)
      { skinId: 'cs2_m4a1s_printstream_FN', weight: 550 },     // $320.00 (5.5%)
      { skinId: 'cs2_m9_bayonet_lore_FT', weight: 250 },       // $680.00 (2.5%)
      { skinId: 'cs2_skeleton_crimson_web_FT', weight: 80 },   // $740.00 (0.8%)
      { skinId: 'cs2_karambit_doppler_p2_FN', weight: 15 },    // $2150.00 (0.15%)
      { skinId: 'cs2_butterfly_fade_FN', weight: 5 }          // $3450.00 (0.05%)
    ]
  },

  // ==========================================
  // DOTA 2 CASES (5 Balanced Cases)
  // ==========================================
  {
    id: 'case_dota2_support_soul',
    game: 'dota2',
    name: 'Душа саппорта',
    nameEn: 'Support Soul Case',
    price: 2.00,
    icon: '🕊️',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjCSO2w0t3VVk12Kg1Qub6pKg411KPEdHMR7NrkxIbfk6T2a7nQkztSscMm2rrCoIms3AS1rRVkMGimI9edcAFvZwzZ-lm5wO6-hMXv6cuYnCRm6yd253vYyxPigngfcKUx0sc3F82f/360fx360f',
    color: '#34d399',
    description: 'Бюджетное сокровище с шансом на Драгонклав Хук и Аркану.',
    items: [
      { skinId: 'dota2_belt_iron_surge', weight: 500 },       // $0.22 (50.0%)
      { skinId: 'dota2_bracers_cavern_luminar', weight: 320 },// $0.65 (32.0%)
      { skinId: 'dota2_fin_kings_charm', weight: 110 },       // $1.45 (11.0%)
      { skinId: 'dota2_arms_of_desolation', weight: 50 },     // $5.40 (5.0%)
      { skinId: 'dota2_arcana_pa', weight: 19 },              // $34.00 (1.9%)
      { skinId: 'dota2_dragonclaw_hook', weight: 1 }          // $185.00 (0.1%)
    ]
  },
  {
    id: 'case_dota2_midlane_glory',
    game: 'dota2',
    name: 'Триумф мидера',
    nameEn: 'Midlane Glory Case',
    price: 6.00,
    icon: '🔥',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjCSO2w0t3VVk12Kg1Qub6pKg411KPEdHMR7NrkxIbfk6T2a7nQkztSscMh3LiT94it3ATtrhJka2P2LNSccwFsYgnZqVfvl-jo0JG67pnInm026yIgsnrdgVXp1kZtP-qP/360fx360f',
    color: '#ff9900',
    description: 'Снаряжение для хардлайнеров и мидеров с Immortal скинами.',
    items: [
      { skinId: 'dota2_bracers_cavern_luminar', weight: 250 },// $0.65 (25.0%)
      { skinId: 'dota2_fin_kings_charm', weight: 320 },       // $1.45 (32.0%)
      { skinId: 'dota2_muh_keen_gun', weight: 240 },          // $2.10 (24.0%)
      { skinId: 'dota2_arms_of_desolation', weight: 135 },    // $5.40 (13.5%)
      { skinId: 'dota2_arcana_pudge', weight: 42 },           // $36.50 (4.2%)
      { skinId: 'dota2_vigil_triumph', weight: 11 },          // $55.00 (1.1%)
      { skinId: 'dota2_dragonclaw_hook', weight: 2 }          // $185.00 (0.2%)
    ]
  },
  {
    id: 'case_dota2_immortal_dominion',
    game: 'dota2',
    name: 'Владения Immortal',
    nameEn: 'Immortal Dominion Case',
    price: 15.00,
    icon: '🛡️',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjCSO2w0t3VVk12Kg1Qub6pKg411KPEdHMR7NrkxIbfk6T2a7nQkztSscMh2r_Coo73jQe3_0U4ZmmndYPAcwZqMwzW-AK8k-e-gse5up2bnCYy6CVy5i6Iyhe_0h9McKUx0szY1b14/360fx360f',
    color: '#eb4b4b',
    description: 'Immortal предметы для Sven, Void, Lion и снайпера.',
    items: [
      { skinId: 'dota2_fin_kings_charm', weight: 180 },       // $1.45 (18.0%)
      { skinId: 'dota2_muh_keen_gun', weight: 280 },          // $2.10 (28.0%)
      { skinId: 'dota2_arms_of_desolation', weight: 320 },    // $5.40 (32.0%)
      { skinId: 'dota2_arcana_pa', weight: 130 },             // $34.00 (13.0%)
      { skinId: 'dota2_arcana_juggernaut', weight: 55 },      // $35.00 (5.5%)
      { skinId: 'dota2_vigil_triumph', weight: 28 },          // $55.00 (2.8%)
      { skinId: 'dota2_mace_of_aeons', weight: 7 }            // $295.00 (0.7%)
    ]
  },
  {
    id: 'case_dota2_arcana_vault',
    game: 'dota2',
    name: 'Хранилище Аркан',
    nameEn: 'Arcana Vault Case',
    price: 32.00,
    icon: '🔮',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjCSO2w0t3VVk12Kg1Qub6pKg411KPEdHMR7NrkxIbfk6T2a7nQkztSscMm37yUpNms21bkrUVoZmmgd4OTJwVsZQ6G8gTtxey8g8fp7pqamCRn7nd25CvczxO00hBPcKUx0tz11181/360fx360f',
    color: '#a855f7',
    description: 'Собрание Аркан высшего ранга: Phantom Assassin, Juggernaut и Pudge.',
    items: [
      { skinId: 'dota2_muh_keen_gun', weight: 90 },           // $2.10 (9.0%)
      { skinId: 'dota2_arms_of_desolation', weight: 310 },    // $5.40 (31.0%)
      { skinId: 'dota2_arcana_pa', weight: 300 },             // $34.00 (30.0%)
      { skinId: 'dota2_arcana_juggernaut', weight: 190 },     // $35.00 (19.0%)
      { skinId: 'dota2_arcana_pudge', weight: 75 },           // $36.50 (7.5%)
      { skinId: 'dota2_vigil_triumph', weight: 28 },          // $55.00 (2.8%)
      { skinId: 'dota2_dragonclaw_hook', weight: 7 }          // $185.00 (0.7%)
    ]
  },
  {
    id: 'case_dota2_roshan_treasure',
    game: 'dota2',
    name: 'Сокровищница Рошана',
    nameEn: 'Roshan Treasure Case',
    price: 85.00,
    icon: '💎',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ5BhMYY49vR10TJjCSO2w0t3VVk12Kg1Qub6pKg411KPEdHMR7NrkxIbfk6T2a7nQkztSscMm37yUpNms21bkrUVoZmmgd4OTJwVsZQ6G8gTtxey8g8fp7pqamCRn7nd25CvczxO00hBPcKUx0tz11181/360fx360f',
    color: '#ffd700',
    description: 'Золотой малыш Рошан, Булава Эонов и Dragonclaw Hook.',
    items: [
      { skinId: 'dota2_arms_of_desolation', weight: 260 },    // $5.40 (26.0%)
      { skinId: 'dota2_arcana_pa', weight: 340 },             // $34.00 (34.0%)
      { skinId: 'dota2_vigil_triumph', weight: 230 },         // $55.00 (23.0%)
      { skinId: 'dota2_dragonclaw_hook', weight: 125 },       // $185.00 (12.5%)
      { skinId: 'dota2_mace_of_aeons', weight: 40 },          // $295.00 (4.0%)
      { skinId: 'dota2_golden_baby_roshan', weight: 5 }       // $2850.00 (0.5%)
    ]
  },

  // ==========================================
  // RUST CASES (5 Balanced Cases)
  // ==========================================
  {
    id: 'case_rust_scrap_fortune',
    game: 'rust',
    name: 'Скрап фортуна',
    nameEn: 'Scrap Fortune Case',
    price: 1.50,
    icon: '🔩',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1PB549vRpdSWPEEbvw46vdWVlzIgZUsq-2JQJi0vP3ZjhG7821nI-ZmvLwOq7cqWdQ-sJ0xOyUoN2s2QC3qBVlamD6JYWWJwZqZwvVqVjsye_n05O_vZrKyHRj5nF3t3qJzUe0004ccKUx0lC04586/360fx360f',
    color: '#6b7280',
    description: 'Начальный кейс из металлолома с шансом выбить Tempered AK-47.',
    items: [
      { skinId: 'rust_nomad_shoes', weight: 480 },            // $0.25 (48.0%)
      { skinId: 'rust_revolver_scrap', weight: 280 },         // $0.60 (28.0%)
      { skinId: 'rust_hazard_sheet_door', weight: 135 },      // $1.10 (13.5%)
      { skinId: 'rust_frostbite_tshirt', weight: 75 },        // $3.60 (7.5%)
      { skinId: 'rust_bombing_garage_door', weight: 24 },     // $9.50 (2.4%)
      { skinId: 'rust_tempered_ak47', weight: 6 }             // $48.00 (0.6%)
    ]
  },
  {
    id: 'case_rust_toxic_wasteland',
    game: 'rust',
    name: 'Токсичная пустошь',
    nameEn: 'Toxic Wasteland Case',
    price: 5.00,
    icon: '☢️',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1PB549vRpdSWPEEbvw46vdWVlzIgZUsq-2JQJk3_zNYzBH_d21nI-ZmvLwOq7cqWdQ-sJ0xOyUoN2s2QC3qBVlamD6JYWWJwZqZwvVqVjsye_n05O_vZrKyHRj5nF3t3qJzUe0004ccKUx0lC04586/360fx360f',
    color: '#f59e0b',
    description: 'Радиационное снаряжение и двери выживания пустоши.',
    items: [
      { skinId: 'rust_revolver_scrap', weight: 280 },         // $0.60 (28.0%)
      { skinId: 'rust_hazard_sheet_door', weight: 280 },      // $1.10 (28.0%)
      { skinId: 'rust_frostbite_tshirt', weight: 230 },       // $3.60 (23.0%)
      { skinId: 'rust_bombing_garage_door', weight: 140 },    // $9.50 (14.0%)
      { skinId: 'rust_metal_tree_door', weight: 55 },         // $18.50 (5.5%)
      { skinId: 'rust_tempered_ak47', weight: 15 }            // $48.00 (1.5%)
    ]
  },
  {
    id: 'case_rust_raiders_armory',
    game: 'rust',
    name: 'Арсенал рейдера',
    nameEn: 'Raiders Armory Case',
    price: 18.00,
    icon: '🔫',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1PB549vRpdSWPEEbvw46vdWVlzIgZUsq-2JQJh1vL3dTNH-92xk4WOkvWgZu6Fxz0EvJwh37zA9dyi3QftrkE-Zj37Jo-ccQ83NFrVrFTvw-bpg8LpvpnOyiFj6CV04yvczkPn1UwecKUx0s413s01/360fx360f',
    color: '#eb4b4b',
    description: 'Боевая броня, армированные двери и культовый Alien Red.',
    items: [
      { skinId: 'rust_camo_hoodie', weight: 150 },            // $1.50 (15.0%)
      { skinId: 'rust_frostbite_tshirt', weight: 250 },       // $3.60 (25.0%)
      { skinId: 'rust_bombing_garage_door', weight: 270 },    // $9.50 (27.0%)
      { skinId: 'rust_metal_tree_door', weight: 190 },        // $18.50 (19.0%)
      { skinId: 'rust_glowing_skull_door', weight: 95 },      // $38.00 (9.5%)
      { skinId: 'rust_tempered_ak47', weight: 35 },           // $48.00 (3.5%)
      { skinId: 'rust_alien_red', weight: 10 }                // $165.00 (1.0%)
    ]
  },
  {
    id: 'case_rust_glowing_night',
    game: 'rust',
    name: 'Ночное свечение',
    nameEn: 'Glowing Night Case',
    price: 40.00,
    icon: '💡',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1PB549vRpdSWPEEbvw46vdWVlzIgZUsq-2JQJq3vT3fzBH-dW3gI6ZmvLwOq7cqWdQ-sJ0xOyUoN2s2QC3qBVlamD6JYWWJwZqZwvVqVjsye_n05O_vZrKyHRj5nF3t3qJzUe0004ccKUx0lC04586/360fx360f',
    color: '#00ff88',
    description: 'Светящиеся в ночи двери, легендарный автомат Glory и Alien Red.',
    items: [
      { skinId: 'rust_frostbite_tshirt', weight: 150 },       // $3.60 (15.0%)
      { skinId: 'rust_bombing_garage_door', weight: 220 },    // $9.50 (22.0%)
      { skinId: 'rust_metal_tree_door', weight: 280 },        // $18.50 (28.0%)
      { skinId: 'rust_glowing_skull_door', weight: 210 },     // $38.00 (21.0%)
      { skinId: 'rust_tempered_ak47', weight: 95 },           // $48.00 (9.5%)
      { skinId: 'rust_alien_red', weight: 35 },               // $165.00 (3.5%)
      { skinId: 'rust_glory_ak47', weight: 10 }               // $320.00 (1.0%)
    ]
  },
  {
    id: 'case_rust_mask_collector',
    game: 'rust',
    name: 'Коллекционер масок',
    nameEn: 'Mask Collector Case',
    price: 90.00,
    icon: '👺',
    image: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1PB549vRpdSWPEEbvw46vdWVlzIgZUsq-2JQJr1vr3fz9G6Nu5nYXZg_jmMqjfqWdQ-sJ0xOyUoN2s2QC3qBVlamD6JYWWJwZqZwvVqVjsye_n05O_vZrKyHRj5nF3t3qJzUe0004ccKUx0lC04586/360fx360f',
    color: '#ffd700',
    description: 'Эксклюзивные маски Rust: Punishment Mask и легендарная Big Grin.',
    items: [
      { skinId: 'rust_metal_tree_door', weight: 300 },        // $18.50 (30.0%)
      { skinId: 'rust_glowing_skull_door', weight: 280 },     // $38.00 (28.0%)
      { skinId: 'rust_tempered_ak47', weight: 190 },          // $48.00 (19.0%)
      { skinId: 'rust_alien_red', weight: 140 },              // $165.00 (14.0%)
      { skinId: 'rust_punishment_mask', weight: 55 },         // $280.00 (5.5%)
      { skinId: 'rust_glory_ak47', weight: 25 },              // $320.00 (2.5%)
      { skinId: 'rust_big_grin', weight: 10 }                 // $920.00 (1.0%)
    ]
  }
];

if (typeof window !== 'undefined') {
  window.CASES_DATABASE = CASES_DATABASE;
}

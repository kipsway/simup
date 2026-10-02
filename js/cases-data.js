/* ==========================================================================
   SIMUP - CASES DATABASE (BALANCED TO STRICT 88% - 94% RTP)
   Categories: Budget, Weaponry, Collection, Knives, Gloves, Elite Jackpot, Dota 2, Rust
   - 100% Verified valid skin IDs matching SKINS_DATABASE
   - Zero infinite money farm exploits
   - True mathematical Expected Value and house edge
   ========================================================================== */

const CASES_DATABASE = [
  {
    "id": "case_cs2_budget_rush",
    "game": "cs2",
    "tier": "budget",
    "name": "Бюджетный раш",
    "nameEn": "Budget Rush Case",
    "price": 2.5,
    "icon": "⚡",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU1nfbOIj8W7oWzkYLdlPOsMOmIk2du-sNz3-2SpN3wigew_0A-Z2qmJoedcwA3ZAvV-VG-kO_n05e0vszLziBq6yN27XbYyR3i0hxMcKUx0n_vVz1b/360fx360f",
    "color": "#10b981",
    "description": "Доступный кейс с шансом выбить AK-47 Redline и AWP Asiimov.",
    "items": [
      {
        "skinId": "cs2_nova_sand_dune",
        "weight": 232
      },
      {
        "skinId": "cs2_p250_sand_dune",
        "weight": 216
      },
      {
        "skinId": "cs2_usps_ticket_to_hell",
        "weight": 141
      },
      {
        "skinId": "cs2_m4a1s_night_terror",
        "weight": 108
      },
      {
        "skinId": "cs2_ak47_slate",
        "weight": 80
      },
      {
        "skinId": "cs2_awp_atheris",
        "weight": 50
      },
      {
        "skinId": "cs2_ak47_redline",
        "weight": 24
      },
      {
        "skinId": "cs2_awp_asiimov",
        "weight": 6
      }
    ]
  },
  {
    "id": "case_cs2_budget_starter",
    "game": "cs2",
    "tier": "budget",
    "name": "Стартовый капитал",
    "nameEn": "Starter Capital Case",
    "price": 5,
    "icon": "🪙",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU2nfadJjl958-6nIGZkrujMeqJxD8GupIo27uU992k2Faw-0dtZ2ymIoSWdwQ3aAvW81m7xOi70560vZzKyXBi6CMg5izYnUfji0wccKUx0lC04Llh/360fx360f",
    "color": "#38bdf8",
    "description": "Баланс надежных скинов с возможностью забрать дорогой Deagle или AWP.",
    "items": [
      {
        "skinId": "cs2_p250_sand_dune",
        "weight": 231
      },
      {
        "skinId": "cs2_usps_ticket_to_hell",
        "weight": 200
      },
      {
        "skinId": "cs2_m4a1s_night_terror",
        "weight": 179
      },
      {
        "skinId": "cs2_awp_atheris",
        "weight": 147
      },
      {
        "skinId": "cs2_m4a4_evil_daimyo",
        "weight": 90
      },
      {
        "skinId": "cs2_m4a4_spider_lily",
        "weight": 75
      },
      {
        "skinId": "cs2_ak47_redline",
        "weight": 50
      },
      {
        "skinId": "cs2_deagle_printstream",
        "weight": 18
      },
      {
        "skinId": "cs2_awp_hyper_beast",
        "weight": 12
      }
    ]
  },
  {
    "id": "case_cs2_weapon_rifles",
    "game": "cs2",
    "tier": "weapons",
    "name": "Штурмовой арсенал",
    "nameEn": "Assault Rifles Case",
    "price": 14,
    "icon": "🎯",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUwnfbODjxN_8u5gIGZkrujMeqJwz4D65dwj-jE89P33QPt-xFlam-mco-TewBtMA7V-Fm8w-y9g560vMnKzHBi6CIg5izclhbji0pMcKUx0vFOUl8k/360fx360f",
    "color": "#8847ff",
    "description": "Лучшие винтовки AK-47, M4A4 и M4A1-S от доступных до элитных.",
    "items": [
      {
        "skinId": "cs2_m4a1s_night_terror",
        "weight": 224
      },
      {
        "skinId": "cs2_ak47_slate",
        "weight": 194
      },
      {
        "skinId": "cs2_m4a4_evil_daimyo",
        "weight": 163
      },
      {
        "skinId": "cs2_m4a4_spider_lily",
        "weight": 143
      },
      {
        "skinId": "cs2_ak47_redline",
        "weight": 110
      },
      {
        "skinId": "cs2_m4a4_the_emperor",
        "weight": 45
      },
      {
        "skinId": "cs2_m4a1s_printstream",
        "weight": 18
      },
      {
        "skinId": "cs2_ak47_vulcan",
        "weight": 6
      },
      {
        "skinId": "cs2_ak47_fire_serpent",
        "weight": 1
      }
    ]
  },
  {
    "id": "case_cs2_weapon_snipers",
    "game": "cs2",
    "tier": "weapons",
    "name": "Снайперская элита",
    "nameEn": "Sniper Elite Case",
    "price": 25,
    "icon": "🔭",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU2nfadJjl958-6nIGZkrujMeqJxD8GupIo27uU992k2Faw-0dtZ2ymIoSWdwQ3aAvW81m7xOi70560vZzKyXBi6CMg5izYnUfji0wccKUx0lC04Llh/360fx360f",
    "color": "#00d2ff",
    "description": "Всё для снайперов: от Atheris и Hyper Beast до легендарного Dragon Lore.",
    "items": [
      {
        "skinId": "cs2_awp_atheris",
        "weight": 1550
      },
      {
        "skinId": "cs2_ssg08_dragonfire",
        "weight": 180
      },
      {
        "skinId": "cs2_awp_hyper_beast",
        "weight": 130
      },
      {
        "skinId": "cs2_awp_redline",
        "weight": 110
      },
      {
        "skinId": "cs2_awp_wildfire",
        "weight": 50
      },
      {
        "skinId": "cs2_awp_asiimov",
        "weight": 35
      },
      {
        "skinId": "cs2_awp_lightning_strike",
        "weight": 8
      },
      {
        "skinId": "cs2_awp_dragon_lore",
        "weight": 1
      }
    ]
  },
  {
    "id": "case_cs2_weapon_covert",
    "game": "cs2",
    "tier": "weapons",
    "name": "Тайный зверь",
    "nameEn": "Covert Beast Case",
    "price": 45,
    "icon": "🐉",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUwnfbODjxN_8u5gIGZkrujMeqJwz4D65dwj-jE89P33QPt-xFlam-mco-TewBtMA7V-Fm8w-y9g560vMnKzHBi6CIg5izclhbji0pMcKUx0vFOUl8k/360fx360f",
    "color": "#eb4b4b",
    "description": "Исключительно Тайное оружие высшего ранга и редчайшие штурмовые винтовки.",
    "items": [
      {
        "skinId": "cs2_ak47_redline",
        "weight": 474
      },
      {
        "skinId": "cs2_m4a4_the_emperor",
        "weight": 371
      },
      {
        "skinId": "cs2_deagle_printstream",
        "weight": 130
      },
      {
        "skinId": "cs2_awp_hyper_beast",
        "weight": 247
      },
      {
        "skinId": "cs2_m4a1s_printstream",
        "weight": 60
      },
      {
        "skinId": "cs2_awp_asiimov",
        "weight": 35
      },
      {
        "skinId": "cs2_ak47_vulcan",
        "weight": 16
      },
      {
        "skinId": "cs2_ak47_fire_serpent",
        "weight": 5
      },
      {
        "skinId": "cs2_ak47_wild_lotus",
        "weight": 1
      }
    ]
  },
  {
    "id": "case_cs2_collection_asiimov",
    "game": "cs2",
    "tier": "collection",
    "name": "Коллекция Азимов",
    "nameEn": "Asiimov Collection",
    "price": 35,
    "icon": "⚡",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUwnfbODjxN_8u5gIGZkrujMeqJwz4D65dwj-jE89P33QPt-xFlam-mco-TewBtMA7V-Fm8w-y9g560vMnKzHBi6CIg5izclhbji0pMcKUx0vFOUl8k/360fx360f",
    "color": "#f59e0b",
    "description": "Полная серия культовых футуристичных скинов Азимов.",
    "items": [
      {
        "skinId": "cs2_p250_asiimov",
        "weight": 4208
      },
      {
        "skinId": "cs2_p90_asiimov",
        "weight": 190
      },
      {
        "skinId": "cs2_ak47_asiimov",
        "weight": 160
      },
      {
        "skinId": "cs2_m4a4_asiimov",
        "weight": 70
      },
      {
        "skinId": "cs2_awp_asiimov",
        "weight": 80
      }
    ]
  },
  {
    "id": "case_cs2_collection_printstream",
    "game": "cs2",
    "tier": "collection",
    "name": "Коллекция Поток информации",
    "nameEn": "Printstream Collection",
    "price": 65,
    "icon": "🤍",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUx1fCYI2USu921n4XZg_jmMqjfqWdQ-sJ0xOzAot-jiQa2_EdkN2-iLI-TdQ45YlnV_1ntxevn0Z-_6Z_KyHpq6yVwtiuIyxO2n1gSOeM3c_V0/360fx360f",
    "color": "#ffffff",
    "description": "Жемчужно-перламутровые скины Printstream с голографическим эффектом.",
    "items": [
      {
        "skinId": "cs2_deagle_printstream",
        "weight": 4266
      },
      {
        "skinId": "cs2_m4a1s_printstream",
        "weight": 170
      },
      {
        "skinId": "cs2_ak47_vulcan",
        "weight": 50
      },
      {
        "skinId": "cs2_butterfly_fade",
        "weight": 6
      }
    ]
  },
  {
    "id": "case_cs2_collection_vintage",
    "game": "cs2",
    "tier": "collection",
    "name": "Винтажные легенды",
    "nameEn": "Vintage Legends Case",
    "price": 110,
    "icon": "👑",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUx1fCYI2USu921n4XZg_jmMqjfqWdQ-sJ0xOzAot-jiQa2_EdkN2-iLI-TdQ45YlnV_1ntxevn0Z-_6Z_KyHpq6yVwtiuIyxO2n1gSOeM3c_V0/360fx360f",
    "color": "#e4ae39",
    "description": "Легендарные классические раритеты первой эры CS: Howl, Fire Serpent и Dragon Lore.",
    "items": [
      {
        "skinId": "cs2_ak47_redline",
        "weight": 949
      },
      {
        "skinId": "cs2_deagle_printstream",
        "weight": 693
      },
      {
        "skinId": "cs2_awp_asiimov",
        "weight": 130
      },
      {
        "skinId": "cs2_ak47_vulcan",
        "weight": 75
      },
      {
        "skinId": "cs2_ak47_fire_serpent",
        "weight": 32
      },
      {
        "skinId": "cs2_m4a4_howl",
        "weight": 12
      },
      {
        "skinId": "cs2_awp_dragon_lore",
        "weight": 4
      }
    ]
  },
  {
    "id": "case_cs2_knives_budget",
    "game": "cs2",
    "tier": "knives",
    "name": "Ножевой старт",
    "nameEn": "Budget Knives Case",
    "price": 85,
    "icon": "🗡️",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU3nDbScD5H_ti3hIDFz_L3Z-qCwzsF7ccp3b2TrdmhjA22-kQ-ZWmgcY7AcQA8M1vQ_1e2xO_n08K1vcvLzCFi6CRxt3_cmkCxhUpSLrs48B1t0qA/360fx360f",
    "color": "#ffd700",
    "description": "Доступные ножи с шансом выбить Stiletto, Ursus или штык-нож.",
    "items": [
      {
        "skinId": "cs2_ak47_redline",
        "weight": 718
      },
      {
        "skinId": "cs2_gut_knife_safari_mesh",
        "weight": 1157
      },
      {
        "skinId": "cs2_knife_ursusknife_safari_mesh",
        "weight": 140
      },
      {
        "skinId": "cs2_knife_stilettoknife_safari_mesh",
        "weight": 90
      },
      {
        "skinId": "cs2_knife_ursusknife_damascus_steel",
        "weight": 45
      },
      {
        "skinId": "cs2_karambit_doppler_p2",
        "weight": 4
      }
    ]
  },
  {
    "id": "case_cs2_knives_karambit",
    "game": "cs2",
    "tier": "knives",
    "name": "Керамбит-мания",
    "nameEn": "Karambit Mania Case",
    "price": 240,
    "icon": "💫",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU3nDbScD5H_ti3hIDFz_L3Z-qCwzsF7ccp3b2TrdmhjA22-kQ-ZWmgcY7AcQA8M1vQ_1e2xO_n08K1vcvLzCFi6CRxt3_cmkCxhUpSLrs48B1t0qA/360fx360f",
    "color": "#e01e5a",
    "description": "Культовые Керамбиты всех расцветок от Закалки до Doppler и Fade.",
    "items": [
      {
        "skinId": "cs2_gut_knife_safari_mesh",
        "weight": 9331
      },
      {
        "skinId": "cs2_knife_ursusknife_safari_mesh",
        "weight": 7826
      },
      {
        "skinId": "cs2_knife_stilettoknife_urban_masked",
        "weight": 140
      },
      {
        "skinId": "cs2_karambit_doppler_p2",
        "weight": 45
      },
      {
        "skinId": "cs2_karambit_fade_fn",
        "weight": 12
      },
      {
        "skinId": "cs2_karambit_ch_387_fn_st",
        "weight": 1
      }
    ]
  },
  {
    "id": "case_cs2_knives_butterfly",
    "game": "cs2",
    "tier": "knives",
    "name": "Мечта: Нож-бабочка",
    "nameEn": "Butterfly Knife Dream",
    "price": 380,
    "icon": "🦋",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU3nDbScD5H_ti3hIDFz_L3Z-qCwzsF7ccp3b2TrdmhjA22-kQ-ZWmgcY7AcQA8M1vQ_1e2xO_n08K1vcvLzCFi6CRxt3_cmkCxhUpSLrs48B1t0qA/360fx360f",
    "color": "#a855f7",
    "description": "Королевский нож-бабочка: ультра-плавные анимации и максимальный профит.",
    "items": [
      {
        "skinId": "cs2_knife_ursusknife_safari_mesh",
        "weight": 1141
      },
      {
        "skinId": "cs2_knife_stilettoknife_urban_masked",
        "weight": 957
      },
      {
        "skinId": "cs2_knife_butterflyknife_doppler_phase_2",
        "weight": 60
      },
      {
        "skinId": "cs2_butterfly_fade",
        "weight": 25
      },
      {
        "skinId": "cs2_butterfly_sapphire_mw",
        "weight": 6
      }
    ]
  },
  {
    "id": "case_cs2_gloves_specialist",
    "game": "cs2",
    "tier": "gloves",
    "name": "Перчатки Специалиста",
    "nameEn": "Specialist Gloves Case",
    "price": 95,
    "icon": "🧤",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU3nDbScD5H_ti3hIDFz_L3Z-qCwzsF7ccp3b2TrdmhjA22-kQ-ZWmgcY7AcQA8M1vQ_1e2xO_n08K1vcvLzCFi6CRxt3_cmkCxhUpSLrs48B1t0qA/360fx360f",
    "color": "#06b6d4",
    "description": "Перчатки для создания идеального сета со скинами и ножами.",
    "items": [
      {
        "skinId": "cs2_p250_sand_dune",
        "weight": 729
      },
      {
        "skinId": "cs2_ak47_redline",
        "weight": 619
      },
      {
        "skinId": "cs2_gloves_snow_leopard",
        "weight": 90
      },
      {
        "skinId": "cs2_gloves_sportgloves_amphibious",
        "weight": 45
      },
      {
        "skinId": "cs2_gloves_vice",
        "weight": 12
      }
    ]
  },
  {
    "id": "case_cs2_gloves_sport_vice",
    "game": "cs2",
    "tier": "gloves",
    "name": "Спортивные перчатки: Порок",
    "nameEn": "Sport Gloves Vice Case",
    "price": 280,
    "icon": "🥊",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU3nDbScD5H_ti3hIDFz_L3Z-qCwzsF7ccp3b2TrdmhjA22-kQ-ZWmgcY7AcQA8M1vQ_1e2xO_n08K1vcvLzCFi6CRxt3_cmkCxhUpSLrs48B1t0qA/360fx360f",
    "color": "#ec4899",
    "description": "Легендарные Sport Gloves Vice и Pandora Box — главный символ роскоши.",
    "items": [
      {
        "skinId": "cs2_ak47_redline",
        "weight": 939
      },
      {
        "skinId": "cs2_awp_asiimov",
        "weight": 788
      },
      {
        "skinId": "cs2_gloves_snow_leopard",
        "weight": 110
      },
      {
        "skinId": "cs2_gloves_vice",
        "weight": 45
      },
      {
        "skinId": "cs2_gloves_sportgloves_pandora_s_box",
        "weight": 20
      },
      {
        "skinId": "cs2_vice_gloves_st_fn",
        "weight": 4
      }
    ]
  },
  {
    "id": "case_cs2_elite_dragon_lore",
    "game": "cs2",
    "tier": "elite",
    "name": "Логово Дракона",
    "nameEn": "Dragon Lore Lair",
    "price": 450,
    "icon": "🐉",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUx1fCYI2USu921n4XZg_jmMqjfqWdQ-sJ0xOzAot-jiQa2_EdkN2-iLI-TdQ45YlnV_1ntxevn0Z-_6Z_KyHpq6yVwtiuIyxO2n1gSOeM3c_V0/360fx360f",
    "color": "#eab308",
    "description": "Максимальный риск и титанический куш: AWP Dragon Lore и сувенирные реликвии.",
    "items": [
      {
        "skinId": "cs2_ak47_redline",
        "weight": 644
      },
      {
        "skinId": "cs2_m4a1s_printstream",
        "weight": 552
      },
      {
        "skinId": "cs2_ak47_vulcan",
        "weight": 437
      },
      {
        "skinId": "cs2_awp_lightning_strike",
        "weight": 130
      },
      {
        "skinId": "cs2_ak47_fire_serpent",
        "weight": 80
      },
      {
        "skinId": "cs2_awp_dragon_lore",
        "weight": 18
      },
      {
        "skinId": "cs2_awp_dragon_lore_reason_fn",
        "weight": 1
      }
    ]
  },
  {
    "id": "case_cs2_elite_blue_gem",
    "game": "cs2",
    "tier": "elite",
    "name": "Абсолютный Blue Gem",
    "nameEn": "Absolute Blue Gem Case",
    "price": 1200,
    "icon": "💎",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUx1fCYI2USu921n4XZg_jmMqjfqWdQ-sJ0xOzAot-jiQa2_EdkN2-iLI-TdQ45YlnV_1ntxevn0Z-_6Z_KyHpq6yVwtiuIyxO2n1gSOeM3c_V0/360fx360f",
    "color": "#0284c7",
    "description": "Самые редкие сиды закалки в истории видеоигр. Главный приз — #387 и #661.",
    "items": [
      {
        "skinId": "cs2_knife_ursusknife_damascus_steel",
        "weight": 3053
      },
      {
        "skinId": "cs2_awp_lightning_strike",
        "weight": 2480
      },
      {
        "skinId": "cs2_karambit_doppler_p2",
        "weight": 140
      },
      {
        "skinId": "cs2_karambit_blue_gem_387",
        "weight": 20
      },
      {
        "skinId": "cs2_ak47_ch_661_st_fn",
        "weight": 3
      }
    ]
  },
  {
    "id": "case_dota2_support_soul",
    "game": "dota2",
    "tier": "budget",
    "name": "Душа саппорта",
    "nameEn": "Support Soul Case",
    "price": 2.5,
    "icon": "🌿",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/W_I_5GLm4AKmBEj6vDAxEjCX9WAVpd-EJQ7MB4XTN4vEIw-rqn2-OjAHwvODcqbt1annWvmtT9Xj_A0k29gLh654oP_x2x1g4P_8xVhN8_u8vF_y2-wI9u-_21xG9-X1vF_y2-wI9u-_21xG9-X1",
    "color": "#10b981",
    "description": "Имморталки и артефакты для верных бойцов поддержки.",
    "items": [
      {
        "skinId": "dota2_belt_iron_surge",
        "weight": 118
      },
      {
        "skinId": "dota2_bracers_cavern_luminar",
        "weight": 109
      },
      {
        "skinId": "dota2_fin_kings_charm",
        "weight": 76
      },
      {
        "skinId": "dota2_muh_keen_gun",
        "weight": 38
      },
      {
        "skinId": "dota2_arcana_cm_frost_avalanche",
        "weight": 15
      }
    ]
  },
  {
    "id": "case_dota2_midlane_glory",
    "game": "dota2",
    "tier": "weapons",
    "name": "Слава мидлейна",
    "nameEn": "Midlane Glory Case",
    "price": 7,
    "icon": "⚔️",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/W_I_5GLm4AKmBEj6vDAxEjCX9WAVpd-EJQ7MB4XTN4vEIw-rqn2-OjAHwvODcqbt1annWvmtT9Xj_A0k29gLh654oP_x2x1g4P_8xVhN8_u8vF_y2-wI9u-_21xG9-X1vF_y2-wI9u-_21xG9-X1",
    "color": "#00d2ff",
    "description": "Оружие для доминации на центральной линии: SF, Invoker, Storm.",
    "items": [
      {
        "skinId": "dota2_fin_kings_charm",
        "weight": 146
      },
      {
        "skinId": "dota2_piston_impaler_bristleback",
        "weight": 122
      },
      {
        "skinId": "dota2_arms_of_desolation",
        "weight": 85
      },
      {
        "skinId": "dota2_magus_apex_invoker",
        "weight": 120
      },
      {
        "skinId": "dota2_arcana_sf_demon_eater",
        "weight": 30
      }
    ]
  },
  {
    "id": "case_dota2_immortal_dominion",
    "game": "dota2",
    "tier": "collection",
    "name": "Владычество Immortal",
    "nameEn": "Immortal Dominion Case",
    "price": 18,
    "icon": "🔮",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/W_I_5GLm4AKmBEj6vDAxEjCX9WAVpd-EJQ7MB4XTN4vEIw-rqn2-OjAHwvODcqbt1annWvmtT9Xj_A0k29gLh654oP_x2x1g4P_8xVhN8_u8vF_y2-wI9u-_21xG9-X1vF_y2-wI9u-_21xG9-X1",
    "color": "#8847ff",
    "description": "Золотые и багровые Immortal реликвии с потрясающими спецэффектами.",
    "items": [
      {
        "skinId": "dota2_arms_of_desolation",
        "weight": 276
      },
      {
        "skinId": "dota2_severing_crest_razor",
        "weight": 231
      },
      {
        "skinId": "dota2_sullen_harvest_necro",
        "weight": 180
      },
      {
        "skinId": "dota2_golden_edge_lost_order",
        "weight": 80
      },
      {
        "skinId": "dota2_dragonclaw_hook",
        "weight": 18
      }
    ]
  },
  {
    "id": "case_dota2_arcana_vault",
    "game": "dota2",
    "tier": "elite",
    "name": "Хранилище Аркан",
    "nameEn": "Arcana Vault Case",
    "price": 36,
    "icon": "👑",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/W_I_5GLm4AKmBEj6vDAxEjCX9WAVpd-EJQ7MB4XTN4vEIw-rqn2-OjAHwvODcqbt1annWvmtT9Xj_A0k29gLh654oP_x2x1g4P_8xVhN8_u8vF_y2-wI9u-_21xG9-X1vF_y2-wI9u-_21xG9-X1",
    "color": "#eb4b4b",
    "description": "Топовые Арканы Dota 2 на Pudge, Juggernaut, SF, PA и Terrorblade.",
    "items": [
      {
        "skinId": "dota2_sullen_harvest_necro",
        "weight": 381
      },
      {
        "skinId": "dota2_arcana_zeus_tempest",
        "weight": 309
      },
      {
        "skinId": "dota2_arcana_pa",
        "weight": 202
      },
      {
        "skinId": "dota2_arcana_pudge",
        "weight": 140
      },
      {
        "skinId": "dota2_dragonclaw_hook",
        "weight": 30
      }
    ]
  },
  {
    "id": "case_dota2_roshan_treasure",
    "game": "dota2",
    "tier": "elite",
    "name": "Сокровище Рошана",
    "nameEn": "Roshan Treasure Case",
    "price": 95,
    "icon": "💎",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/W_I_5GLm4AKmBEj6vDAxEjCX9WAVpd-EJQ7MB4XTN4vEIw-rqn2-OjAHwvODcqbt1annWvmtT9Xj_A0k29gLh654oP_x2x1g4P_8xVhN8_u8vF_y2-wI9u-_21xG9-X1vF_y2-wI9u-_21xG9-X1",
    "color": "#ffd700",
    "description": "Священный грааль Dota 2: Golden, Platinum и Dark Moon Рошаны.",
    "items": [
      {
        "skinId": "dota2_arcana_pudge",
        "weight": 927
      },
      {
        "skinId": "dota2_vigil_triumph",
        "weight": 731
      },
      {
        "skinId": "dota2_dragonclaw_hook",
        "weight": 120
      },
      {
        "skinId": "dota2_golden_doomling",
        "weight": 25
      },
      {
        "skinId": "dota2_platinum_baby_roshan",
        "weight": 6
      }
    ]
  },
  {
    "id": "case_rust_scrap_fortune",
    "game": "rust",
    "tier": "budget",
    "name": "Скраповая удача",
    "nameEn": "Scrap Fortune Case",
    "price": 2,
    "icon": "🔩",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/6bIIsk3j4VqhUZwaDrNuAaZdJgddnvZuRGYNTm55rhUBob4tWVicG47xE42QprFYGSq55wrReP_4q074dQf5qGkL4Zg4r_d5k_h1w-5h0tY_y-5s3tY-w-5s",
    "color": "#10b981",
    "description": "Начальный набор для выживания: ящики, топоры и бюджетные скины дверей.",
    "items": [
      {
        "skinId": "rust_nomad_shoes",
        "weight": 112
      },
      {
        "skinId": "rust_revolver_scrap",
        "weight": 94
      },
      {
        "skinId": "rust_hazard_sheet_door",
        "weight": 65
      },
      {
        "skinId": "rust_frostbite_tshirt",
        "weight": 80
      },
      {
        "skinId": "rust_bombing_garage_door",
        "weight": 25
      }
    ]
  },
  {
    "id": "case_rust_toxic_wasteland",
    "game": "rust",
    "tier": "weapons",
    "name": "Токсичные пустоши",
    "nameEn": "Toxic Wasteland Case",
    "price": 6,
    "icon": "☣️",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/6bIIsk3j4VqhUZwaDrNuAaZdJgddnvZuRGYNTm55rhUBob4tWVicG47xE42QprFYGSq55wrReP_4q074dQf5qGkL4Zg4r_d5k_h1w-5h0tY_y-5s3tY-w-5s",
    "color": "#00d2ff",
    "description": "Снаряжение для радиоактивных монументов и ночных рейдов.",
    "items": [
      {
        "skinId": "rust_hazard_sheet_door",
        "weight": 182
      },
      {
        "skinId": "rust_camo_hoodie",
        "weight": 137
      },
      {
        "skinId": "rust_bombing_garage_door",
        "weight": 140
      },
      {
        "skinId": "rust_metal_tree_door",
        "weight": 60
      }
    ]
  },
  {
    "id": "case_rust_raiders_armory",
    "game": "rust",
    "tier": "collection",
    "name": "Арсенал рейдера",
    "nameEn": "Raiders Armory Case",
    "price": 22,
    "icon": "💣",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/6bIIsk3j4VqhUZwaDrNuAaZdJgddnvZuRGYNTm55rhUBob4tWVicG47xE42QprFYGSq55wrReP_4q074dQf5qGkL4Zg4r_d5k_h1w-5h0tY_y-5s3tY-w-5s",
    "color": "#8847ff",
    "description": "Боевые автоматы, штурмовые винтовки и ракетницы.",
    "items": [
      {
        "skinId": "rust_bombing_garage_door",
        "weight": 202
      },
      {
        "skinId": "rust_metal_tree_door",
        "weight": 156
      },
      {
        "skinId": "rust_apocalyptic_ak47",
        "weight": 140
      },
      {
        "skinId": "rust_tempered_ak47",
        "weight": 75
      }
    ]
  },
  {
    "id": "case_rust_glowing_night",
    "game": "rust",
    "tier": "collection",
    "name": "Светящаяся ночь",
    "nameEn": "Glowing Night Case",
    "price": 48,
    "icon": "✨",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/6bIIsk3j4VqhUZwaDrNuAaZdJgddnvZuRGYNTm55rhUBob4tWVicG47xE42QprFYGSq55wrReP_4q074dQf5qGkL4Zg4r_d5k_h1w-5h0tY_y-5s3tY-w-5s",
    "color": "#e01e5a",
    "description": "Скины с неоновой подсветкой, видимой в темноте (From Hell, Alien Red, Glory).",
    "items": [
      {
        "skinId": "rust_glowing_skull_door",
        "weight": 4198
      },
      {
        "skinId": "rust_tempered_ak47",
        "weight": 190
      },
      {
        "skinId": "rust_alien_red",
        "weight": 110
      },
      {
        "skinId": "rust_glory_ak47",
        "weight": 35
      }
    ]
  },
  {
    "id": "case_rust_mask_collector",
    "game": "rust",
    "tier": "elite",
    "name": "Коллекционер масок",
    "nameEn": "Mask Collector Case",
    "price": 95,
    "icon": "👺",
    "image": "https://community.cloudflare.steamstatic.com/economy/image/6bIIsk3j4VqhUZwaDrNuAaZdJgddnvZuRGYNTm55rhUBob4tWVicG47xE42QprFYGSq55wrReP_4q074dQf5qGkL4Zg4r_d5k_h1w-5h0tY_y-5s3tY-w-5s",
    "color": "#ffd700",
    "description": "Редчайшие металлические маски и бронежилеты Rust: Punishment, Big Grin.",
    "items": [
      {
        "skinId": "rust_blackout_metal_facemask",
        "weight": 666
      },
      {
        "skinId": "rust_frostbite_facemask",
        "weight": 473
      },
      {
        "skinId": "rust_alien_red",
        "weight": 140
      },
      {
        "skinId": "rust_punishment_mask",
        "weight": 45
      },
      {
        "skinId": "rust_big_grin",
        "weight": 16
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.CASES_DATABASE = CASES_DATABASE;
}

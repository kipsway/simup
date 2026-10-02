/* ==========================================================================
   SIMUP 2.0 - SERVICE WORKER (OFFLINE CACHE & ULTRA FAST LOAD)
   ========================================================================== */

const CACHE_NAME = 'simup-v5.4-cache';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './robots.txt',
  './sitemap.xml',
  './css/style.css',
  './js/sound.js',
  './js/skins-data.js',
  './js/notifications.js',
  './js/auth.js',
  './js/economy.js',
  './js/market-economy.js',
  './js/catalog.js',
  './js/upgrader.js',
  './js/cases-data.js',
  './js/cases.js',
  './js/leaderboard.js',
  './js/players-db.js',
  './js/online-db.js',
  './js/contracts.js',
  './js/lucky-wheel.js',
  './js/case-builder.js',
  './js/mines.js',
  './js/quests.js',
  './js/coinflip.js',
  './js/crash.js',
  './js/case-battle.js',
  './js/simup-pass.js',
  './js/admin-panel.js',
  './js/qrcode.js',
  './js/simup-core.js',
  './js/app.js'
];

// Install: precache core assets with individual error catch so one missing asset never aborts install
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        PRECACHE_URLS.map((url) => cache.add(url).catch((err) => console.warn('Precache skip:', url, err)))
      );
    })
  );
});

// Activate: clean up old caches immediately and take control of all clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event listener: Fail-safe with strict timeout, zero-hang guarantee
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = req.url;

  // 1. Never intercept non-GET requests
  if (req.method !== 'GET') {
    return;
  }

  // 2. Never intercept external APIs (Supabase, CDNs, chrome-extensions)
  if (url.includes('supabase.co') || url.includes('jsdelivr.net') || url.includes('chrome-extension')) {
    return;
  }

  // 3. Cache-first for images (steamstatic, local images, icons)
  if (req.destination === 'image' || url.includes('steamstatic.com') || url.match(/\.(png|jpg|jpeg|svg|webp|gif|ico)$/i)) {
    event.respondWith(
      caches.match(req, { ignoreSearch: true }).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return networkResponse;
        }).catch(() => {
          return new Response('', { status: 408, headers: { 'Content-Type': 'image/svg+xml' } });
        });
      })
    );
    return;
  }

  // 4. Navigation requests (HTML page): race network with 1500ms timeout, then serve cached index.html
  if (req.mode === 'navigate') {
    event.respondWith(
      new Promise((resolve) => {
        let isDone = false;

        const timer = setTimeout(() => {
          if (!isDone) {
            isDone = true;
            caches.match('./index.html', { ignoreSearch: true })
              .then((cached) => resolve(cached || fetch(req)))
              .catch(() => resolve(fetch(req)));
          }
        }, 1500);

        fetch(req).then((networkResponse) => {
          if (!isDone) {
            isDone = true;
            clearTimeout(timer);
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
            }
            resolve(networkResponse);
          }
        }).catch(() => {
          if (!isDone) {
            isDone = true;
            clearTimeout(timer);
            caches.match('./index.html', { ignoreSearch: true })
              .then((cached) => resolve(cached || caches.match('./', { ignoreSearch: true })));
          }
        });
      })
    );
    return;
  }

  // 5. Core JS/CSS/Assets: Stale-While-Revalidate with ignoreSearch (instant 0ms response)
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      const fetchPromise = fetch(req).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return networkResponse;
      }).catch(() => cached);

      // Return cached immediately if available for 0ms load!
      return cached || fetchPromise;
    })
  );
});

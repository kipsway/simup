/* ==========================================================================
   SIMUP 2.0 - SERVICE WORKER (OFFLINE CACHE & ULTRA FAST LOAD)
   ========================================================================== */

const CACHE_NAME = 'simup-v5.1-cache';
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

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Ultra-fast cache-first for images (steamstatic, local images, icons)
  if (event.request.destination === 'image' || url.includes('steamstatic.com') || url.match(/\.(png|jpg|jpeg|svg|webp|gif|ico)$/i)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Return empty transparent gif or fallback
          return new Response('', { status: 408, headers: { 'Content-Type': 'image/svg+xml' } });
        });
      })
    );
    return;
  }

  // Network first with cache fallback for core files
  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
      }
      return networkResponse;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});

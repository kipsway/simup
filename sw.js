/* ==========================================================================
   SIMUP 2.0 - SERVICE WORKER (OFFLINE CACHE & FAST LOAD)
   ========================================================================== */

const CACHE_NAME = 'simup-v2.3-cache';
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
  './js/catalog.js',
  './js/upgrader.js',
  './js/cases-data.js',
  './js/cases.js',
  './js/leaderboard.js',
  './js/contracts.js',
  './js/lucky-wheel.js',
  './js/case-builder.js',
  './js/mines.js',
  './js/quests.js',
  './js/coinflip.js',
  './js/crash.js',
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
  // Network first with cache fallback
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

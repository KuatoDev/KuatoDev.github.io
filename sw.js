const CACHE_NAME = 'vern-pwa-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './blog.html',
  './profile.html',
  './spin.html',
  './wincross.html',
  './wearlevelinsight.html',
  './style.css',
  './script.js',
  './manifest.json',
  './blog/posts.json',
  './assets/logo.svg',
  './assets/logo.ico',
  './assets/profile.webp',
  './assets/wearlevelinsight.webp',
  './assets/woahelper.webp',
  './assets/oneuiicon.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

const CACHE_NAME = 'vern-pwa-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './blog.html',
  './profile.html',
  './spin.html',
  './style.css',
  './script.js',
  './posts.json',
  './assets/logo.svg',
  './assets/logo.ico'
];

// Install Service Worker & Cache Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Service Worker & Clean Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch Strategy (Cache First, falling back to Network)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

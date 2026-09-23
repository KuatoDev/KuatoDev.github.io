const CACHE_NAME = 'vern-pwa-v5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './blog.html',
  './profile.html',
  './spin.html',
  './wincross.html',
  './wearlevelinsight.html',
  './blog/article-1.html',
  './blog/article-2.html',
  './blog/article-3.html',
  './blog/article-4.html',
  './style.css',
  './script.js',
  './manifest.json',
  './blog/posts.json',
  './assets/logo.svg',
  './assets/logo.ico',
  './assets/profile.webp',
  './assets/wearlevelinsight.webp',
  './assets/woahelper.webp',
  './assets/oneuiicon.jpg',
  './assets/blogs/article4.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
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
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests within same-origin
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Network-first for HTML pages and posts.json to ensure fresh content
  const isHtmlOrJson = request.mode === 'navigate' ||
                       url.pathname.endsWith('.html') ||
                       url.pathname.endsWith('/') ||
                       url.pathname.endsWith('posts.json');

  if (isHtmlOrJson) {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  // Stale-While-Revalidate for static assets (CSS, JS, images)
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      const fetchPromise = fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

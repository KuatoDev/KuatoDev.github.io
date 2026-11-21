const CACHE_NAME = 'vern-pwa-v9';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './blog.html',
  './profile.html',
  './wincross.html',
  './wearlevelinsight.html',
  './antigravity.html',
  './404.html',
  './blog/article-1.html',
  './blog/article-2.html',
  './blog/article-3.html',
  './blog/article-4.html',
  './style.css',
  './script.js',
  './manifest.json',
  './blog/posts.json',
  './robots.txt',
  './sitemap.xml',
  './assets/logo.svg',
  './assets/logo.ico',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-maskable-512.png',
  './assets/profile.webp',
  './assets/wearlevelinsight.webp',
  './assets/woahelper.webp',
  './assets/antigravity.png',
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

  // Handle posts.json specifically (return empty JSON array on offline miss, never HTML!)
  if (url.pathname.endsWith('posts.json')) {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request).then(cached => cached || new Response('[]', {
          headers: { 'Content-Type': 'application/json' }
        })))
    );
    return;
  }

  // Network-first for HTML pages and navigations
  const isHtml = request.mode === 'navigate' ||
                 url.pathname.endsWith('.html') ||
                 url.pathname.endsWith('/');

  if (isHtml) {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match('./404.html') || caches.match('./index.html')))
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
        .catch(() => cachedResponse || new Response('', { status: 503, statusText: 'Offline' }));

      if (cachedResponse) {
        event.waitUntil(fetchPromise);
        return cachedResponse;
      }
      return fetchPromise;
    })
  );
});

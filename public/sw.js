const CACHE_NAME = 'vern-pwa-v10';
const CORE_PRECACHE = [
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
  './manifest.json',
  './blog/posts.json',
  './assets/logo.svg',
  './assets/logo.ico',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/profile.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Handle posts.json specifically
  if (url.pathname.endsWith('posts.json')) {
    event.respondWith(
      fetch(request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(request, clone));
          }
          return res;
        })
        .catch(() => caches.match(request).then(cached => cached || new Response('[]', {
          headers: { 'Content-Type': 'application/json' }
        })))
    );
    return;
  }

  // Stale-While-Revalidate for _astro assets, styles, scripts and images
  if (url.pathname.includes('/_astro/') || url.pathname.includes('/assets/')) {
    event.respondWith(
      caches.match(request).then(cached => {
        const fetchPromise = fetch(request).then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(request, clone));
          }
          return res;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // HTML navigation network-first fallback to cache
  const isHtml = request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/');
  if (isHtml) {
    event.respondWith(
      fetch(request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(request, clone));
          }
          return res;
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match('./404.html') || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request))
  );
});

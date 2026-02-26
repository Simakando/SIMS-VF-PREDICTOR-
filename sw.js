// BetPawa VFL Predictor — Service Worker v5.0
const CACHE_NAME = 'betpawa-vfl-v5';
const OFFLINE_URLS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install: cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(OFFLINE_URLS).catch(err => {
        console.warn('[SW] Cache install partial failure:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: network-first for API, cache-first for assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // API calls — always try network, don't cache
  if (url.hostname.includes('railway.app') || url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ error: 'offline', items: [] }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Google Fonts — cache
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME + '-fonts').then(cache => {
        return cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached || new Response('', { status: 503 }));
        });
      })
    );
    return;
  }

  // App shell — cache-first with network fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        // Offline fallback to index.html for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

// Background sync placeholder for future result tracking
self.addEventListener('sync', event => {
  if (event.tag === 'sync-results') {
    console.log('[SW] Background sync: results');
  }
});

// Push notification placeholder
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const title = data.title || 'BetPawa VFL — New Pick!';
  const options = {
    body: data.body || 'A new qualified prediction is available.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'vfl-pick',
    renotify: true,
    data: { url: '/' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});

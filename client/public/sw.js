const CACHE_NAME = 'synapsecv-cache-v2';
const ASSETS_TO_CACHE = [
  '/logo.svg',
  '/manifest.json'
];

// Skip caching for these patterns (JS, CSS, API calls, Vite HMR)
const SKIP_CACHE_PATTERNS = [
  /\.jsx?$/,
  /\.tsx?$/,
  /\.css$/,
  /\/api\//,
  /\/@vite\//,
  /\/__vite/,
  /\/node_modules\//,
  /\?v=/,
  /\?t=/,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Always bypass cache for JS, CSS, API requests and Vite dev server files
  const shouldSkip = SKIP_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname + url.search));
  if (shouldSkip) {
    return; // Let browser fetch directly — no SW interception
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => {
        return caches.match('/index.html');
      });
    })
  );
});

// Web Push Notification Listener
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'SynapseCV Update';
  const options = {
    body: data.body || 'Your resume ATS score has been updated.',
    icon: '/logo.svg',
    badge: '/logo.svg',
    data: {
      url: data.url || '/dashboard'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

const CACHE_NAME = 'crabclub-cache-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

// Activate Event
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

// ─── Push Notification Handler ────────────────────────────────────────────────
// Fires when a background push arrives (e.g. from postMessage via background tab).
// Also used directly from the app via registration.showNotification().
self.addEventListener('push', (event) => {
  let data = { title: '🦀 Crab Club Delivery', body: 'Статус вашого замовлення оновлено' };
  try {
    if (event.data) {
      const parsed = event.data.json();
      if (parsed.title) data.title = parsed.title;
      if (parsed.body) data.body = parsed.body;
    }
  } catch {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'https://img.postershop.me/21253/48ff3a5a-f1f0-4892-8331-602d1b6620bb_image.png',
      badge: 'https://img.postershop.me/21253/48ff3a5a-f1f0-4892-8331-602d1b6620bb_image.png',
      tag: 'crabclub-order-status',
      renotify: true,
      requireInteraction: false,
      vibrate: [100, 50, 150]
    })
  );
});

// ─── Notification Click Handler ───────────────────────────────────────────────
// When user taps the system notification — open/focus the app window.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('./');
      }
    })
  );
});




// Fetch Event - Stale While Revalidate for images, Network First for API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ignore Poster API & non-GET requests
  if (event.request.method !== 'GET' || url.pathname.includes('/api/')) {
    return;
  }

  // Handle Images (Cache First with Network Fallback)
  if (
    event.request.destination === 'image' ||
    url.hostname.includes('images.unsplash.com') ||
    url.hostname.includes('img.postershop.me') ||
    url.hostname.includes('joinposter.com')
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);
        });
      })
    );
    return;
  }

  // General Navigation / Scripts: Network First with Cache Fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && event.request.url.startsWith('http')) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

const CACHE_NAME = 'pt-bosses-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://script.google.com/macros/s/AKfycbxBOyU1-CxIpSqHJW94imrkMctg8WrbO7w8ZnWBmlyVRz53KaNklmyPbBVIdyluI246/exec'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('❌ Cache install failed:', err);
      })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Network fallback
        return fetch(event.request).then(response => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // Offline fallback
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
        });
      })
  );
});

// Background sync for notifications
self.addEventListener('sync', event => {
  if (event.tag === 'boss-notification') {
    event.waitUntil(sendBossNotifications());
  }
});

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : '🐉 Um boss está para spawnar!',
    icon: 'img/bosses/miniaturas/mini_babel.webp',
    badge: 'img/bosses/miniaturas/mini_valento.webp',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Boss',
        icon: 'img/bosses/miniaturas/mini_kelvezu.webp'
      },
      {
        action: 'close', 
        title: 'Fechar',
        icon: 'img/bosses/miniaturas/mini_shy.webp'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Portal PT Bosses', options)
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper function for background notifications
async function sendBossNotifications() {
  const registration = self.registration;
  
  // Check if user has notifications enabled
  if (registration.pushManager) {
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      // Send notification logic here
      console.log('📱 Sending boss notification...');
    }
  }
} 
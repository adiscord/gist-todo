const CACHE_NAME = 'github-todo-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Установка и кэширование
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Перехват запросов (сначала кэш, потом сеть)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
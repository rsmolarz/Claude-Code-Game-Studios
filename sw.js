// PROTOTYPE - NOT FOR PRODUCTION
// Offline cache for OCTOMON 3D, so it plays from the iPad home screen with no internet.
// Bump VERSION whenever a cached file changes; the old cache is deleted on activate.
const VERSION = 'octomon-3d-v5';   // bumped: four regions, the roster and the Octo Log
const FILES = [
  './',
  './index.html',
  './config.js',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './vendor/three.module.js',
  './vendor/three.core.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache first, network as a fallback; a page load with no cache hit falls back to index.html.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).catch(() =>
        req.mode === 'navigate' ? caches.match('./index.html') : Response.error()
      );
    })
  );
});

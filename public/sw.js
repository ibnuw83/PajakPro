// public/sw.js
self.addEventListener('install', () => {
  self.skipWaiting(); // langsung aktifkan versi baru
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); // klaim semua tab langsung
});

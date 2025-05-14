const CACHE_NAME = 'billetera-cmd-cache-v1'; // Nombre de caché diferente
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './favicon.ico', // Asegúrate de tener este archivo
    './icons/android-icon-36x36.png',
    './icons/android-icon-48x48.png',
    './icons/android-icon-72x72.png',
    './icons/android-icon-96x96.png',
    './icons/android-icon-144x144.png',
    './icons/android-icon-192x192.png',
    './icons/android-icon-512x512.png' // Si tienes el 512x512
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache CMD abierta');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.error('Fallo al cachear CMD durante la instalación:', err);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

const CACHE_NAME = "resume-maker-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png"
];

// نصب Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker Installed");

  event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log("Caching App Files...");
        return cache.addAll(urlsToCache);
      })
  );

  self.skipWaiting();
});

// فعال‌سازی
self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");

  event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(
            keys
                .filter((key) => key !== CACHE_NAME)
                .map((key) => caches.delete(key))
        );
      })
  );

  self.clients.claim();
});

// درخواست‌ها
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request);
      })
  );
});
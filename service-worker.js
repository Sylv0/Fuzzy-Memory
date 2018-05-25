const VERSION = "v1"

const urls = [
    "./",
    "./static/css/main.css",
    "./static/js/main.js",
    "./static/images/card-back.svg",
    "./manifest.json",
    "./static/images/icons-192.png",
    "./static/images/icons-512.png"
]

self.addEventListener("install", function(e) {
    e.waitUntil(
        caches.open(VERSION).then(function(cache) {
            console.log("Opened cache")
            return cache.addAll(urls)
        })
    )
})

self.addEventListener("fetch", function(e) {
    e.respondWith(
        caches.match(e.request).then(function(res) {
            if (res) return res
            const fetchRequest = e.request.clone()

            return fetch(fetchRequest).then(function(res) {
                if (!res || res.status !== 200 || res.type !== "basic")
                    return res

                const responseToCache = res.clone()

                caches.open(VERSION).then(function(cache) {
                    cache.put(e.request, responseToCache)
                })
                return res
            })
        })
    )
})

self.addEventListener("activate", function(e) {
    console.log("[ServiceWorker] activated")

    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(thisCacheName) {
                    if (thisCacheName !== VERSION) {
                        console.log("[ServiceWorker] deleteing old cache")
                        return caches.delete(thisCacheName)
                    }
                })
            )
        })
    )
})

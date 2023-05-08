self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open('static').then(cache => {
      return cache.addAll(['./'])
    })
  )
})

self.addEventListener('fetch', ev => {
  ev.respondWith(
    caches.match(ev.request).then(response => {
      return response || fetch(e.request)
    })
  )
})
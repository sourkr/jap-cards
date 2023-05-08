self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open('static').then(cache => {
      return cache.addAll([
        './',
        './main.js',
        './sw.js',
        './style/style.css',
        './style/sour.css'
      ])
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
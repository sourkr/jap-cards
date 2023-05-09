const KEY_STATIC = 'static_1.3'

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(KEY_STATIC).then(cache => {
      return cache.addAll([
        './',
        './main.js',
        './style/style.css',
        './style/sour.css',
        './words/hiragana.txt',
        './words/kanji.txt',
        './translate.js',
        './icon.jpg',
        './icon512.png',
        './google-fonts.woff2',
        './pages/offline.html'
      ])
    })
  )
})

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => (key !== KEY_STATIC))
          .map(name => caches.delete(name))
      )
    })
  )
})

self.addEventListener('fetch', ev => {
  ev.respondWith(
    caches.match(ev.request).then(response => {
      return response || fetch(ev.request).then(fRes => {
        return caches.open('dynamic').then(cache => {
          cache.put(ev.request, fRes)
          return fRes
        })
      }).catch(() => caches.match('/pages/offline.html'))
    })
  )
})
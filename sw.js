self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open('static').then(cache => {
      return cache.addAll([
        './',
        './main.js',
        './sw.js',
        './style/style.css',
        './style/sour.css',
        './add.html',
        './add.js',
        './test.html',
        './test.js',
        './words/hiragana.txt',
        './words/kanji.txt',
        './translate.js',
        './icon.jpg',
        './icon512.png',
        './google-fonts.woff2'
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
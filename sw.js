const KEY_STATIC = 'static_1.0.5'

const assets = [
  './',
  './pages/home/main.js',
  './style/style.css',
  './style/theme/light.css',
//   './words/hiragana.t/xt',
//   './words/kanji.txt',
//   './translate.js',
  './icon.jpg',
  './icon512.png',
//   './google-fonts.woff2',
  './pages/offline.html'
]

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(KEY_STATIC).then(cache => {
      return cache.addAll(assets)
    })
  )
})

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => (key !== KEY_STATIC) && (key !== 'dynamic'))
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
          cache.put(ev.request.url, fRes.clone())
          limitCacheSize('dynamic', 5)
          return fRes
        })
      }).catch(err => {
        if(ev.request.url.indexOf('.html') !== -1){
          return caches.match('/pages/offline.html')
        }
      })
    })
  )
})

function limitCacheSize(name, size){
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(() => limitCacheSize(name, size))
      } 
    })
  })
}
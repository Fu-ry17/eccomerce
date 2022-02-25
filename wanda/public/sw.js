const CACHE_NAME = 'eccomerce-v1'
const urlsCache = ['./index.html', './offline.css','./offline.html']

self.addEventListener('install', (e)=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
         .then(cache =>{
             cache.addAll(urlsCache)
         })
         .catch(err => console.log(err))
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(()=> {
            return fetch(e.request)
            .catch(()=> {
                return caches.match('offline.html')
            })
        })
    )
})

self.addEventListener('activate', e =>{
    let cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)

    e.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
             cacheNames.map(cacheName => {
                 if(!cacheWhiteList.includes(cacheName)){
                     return caches.delete(cacheName)
                 }
             })
         ))
    )
})


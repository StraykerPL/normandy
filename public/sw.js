const CACHE = 'techbestie-v4'
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    const response = await fetch('/', { cache: 'reload' })
    if (!response.ok) throw new Error('App shell could not be loaded')
    const html = await response.text()
    const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^" ]+)"/g)].map(match => match[1])
    await cache.addAll(['/manifest.webmanifest', '/icon-192.png', '/icon-512.png', '/favicon.svg', '/illustrations/techbestie-girls.png', '/portraits/maja.jpg', '/portraits/amara.jpg', '/portraits/lena.jpg', ...assets])
    await cache.put('/', new Response(html, { headers: { 'Content-Type': 'text/html' } }))
    await self.skipWaiting()
  })())
})
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await Promise.all((await caches.keys()).filter(key => (key.startsWith('stem-together-') || key.startsWith('techbestie-')) && key !== CACHE).map(key => caches.delete(key)))
    await self.clients.claim()
  })())
})
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin) return
  // Keep the shell and its hashed assets on the same release until a new worker installs.
  if (event.request.mode === 'navigate') {
    event.respondWith(caches.match('/').then(cached => cached || fetch(event.request)))
  } else {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(async response => {
      if (response.ok) (await caches.open(CACHE)).put(event.request, response.clone())
      return response
    })))
  }
})

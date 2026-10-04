const BASE = new URL('./', self.location.href).pathname
const CACHE = `techbestie-v10-${BASE}`
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    const response = await fetch(BASE, { cache: 'reload' })
    if (!response.ok) throw new Error('App shell could not be loaded')
    const html = await response.text()
    const assets = [...html.matchAll(/(?:src|href)="([^" ]+)"/g)].map(match => new URL(match[1], self.registration.scope)).filter(url => url.origin === self.location.origin && url.pathname.startsWith(`${BASE}assets/`)).map(url => url.href)
    await cache.addAll(['manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'favicon.svg', 'illustrations/techbestie-girls.png', 'portraits/maja.jpg', 'portraits/amara.jpg', 'portraits/lena.jpg'].map(path => `${BASE}${path}`).concat(assets))
    await cache.put(BASE, new Response(html, { headers: { 'Content-Type': 'text/html' } }))
    await self.skipWaiting()
  })())
})
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await Promise.all((await caches.keys()).filter(key => key !== CACHE && (key.endsWith(`-${BASE}`) || (BASE === '/' && /^(stem-together|techbestie)-v\d+$/.test(key)))).map(key => caches.delete(key)))
    await self.clients.claim()
  })())
})
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return
  // Keep the shell and its hashed assets on the same release until a new worker installs.
  if (event.request.mode === 'navigate') {
    event.respondWith(caches.match(BASE).then(cached => cached || fetch(event.request)))
  } else {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(async response => {
      if (response.ok) (await caches.open(CACHE)).put(event.request, response.clone())
      return response
    })))
  }
})

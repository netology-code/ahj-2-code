self.addEventListener('install', (event) => {
  console.log('Установлен');
  
  event.waitUntil(
    caches.open('my-best-cache')
      .then((cache) => {
        cache.addAll([
          './',
          './index.html',
          './node_modules/mini.css/dist/mini-default.min.css',
          './style.css',
          './image/fallback/user.jpg'
        ])
      })
  )
});

self.addEventListener('activate', (event) => {
  console.log('Активирован');
});

async function cachePriorityThenFetch(event) {
  const cacheResponse = await caches.match(event.request)

  if (cacheResponse) {
    return cacheResponse;
  }

  let response;

  try {
    response = await fetch(event.request);
  } catch (error) {
    return;
  }

  const cache = await caches.open('my-best-cache');

  cache.put(event.request, response.clone());

  return response;
}

self.addEventListener('fetch', (event) => {
  console.log('Происходит запрос на сервер');
  event.respondWith(cachePriorityThenFetch(event));
});

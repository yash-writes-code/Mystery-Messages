// var staticCacheName = 'djangopwa-v1';

// self.addEventListener('install', function(event) {
// event.waitUntil(
// 	caches.open(staticCacheName).then(function(cache) {
// 	return cache.addAll([
// 		'',
// 	]);
// 	})
// );
// });

// self.addEventListener('fetch', function(event) {
// var requestUrl = new URL(event.request.url);
// 	if (requestUrl.origin === location.origin) {
// 	if ((requestUrl.pathname === '/')) {
// 		event.respondWith(caches.match(''));
// 		return;
// 	}
// 	}
// 	event.respondWith(
// 	caches.match(event.request).then(function(response) {
// 		return response || fetch(event.request);
// 	})
// 	);
// });
var staticCacheName = 'djangopwa-v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                '/', // Add your main HTML file here
                // Add other assets you want to cache
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    var requestUrl = new URL(event.request.url);
    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            event.respondWith(caches.match('/')); // Serve the cached main HTML file
            return;
        }
    }
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
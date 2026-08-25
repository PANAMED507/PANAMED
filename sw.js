const CACHE_NAME = "panamed-v2";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/app.js",
    "./manifest.json",
    "./sw.js"
];

self.addEventListener("install", (evento) => {

    evento.waitUntil(

        caches.open(CACHE_NAME)
            .then((cache) => {

                return cache.addAll(ARCHIVOS);

            })

    );

    self.skipWaiting();

});


self.addEventListener("activate", (evento) => {

    evento.waitUntil(

        caches.keys()
            .then((nombres) => {

                return Promise.all(

                    nombres
                        .filter((nombre) => {

                            return nombre !== CACHE_NAME;

                        })
                        .map((nombre) => {

                            return caches.delete(nombre);

                        })

                );

            })

    );

    self.clients.claim();

});


self.addEventListener("fetch", (evento) => {

    if (evento.request.method !== "GET") {
        return;
    }

    evento.respondWith(

        caches.match(evento.request)
            .then((respuesta) => {

                if (respuesta) {
                    return respuesta;
                }

                return fetch(evento.request)
                    .then((respuestaRed) => {

                        return respuestaRed;

                    })
                    .catch(() => {

                        return caches.match("./index.html");

                    });

            })

    );

});
/* =============================================================================
 * sw.js — Service Worker do GTG Tracker
 * -----------------------------------------------------------------------------
 * Cache do app shell para uso OFFLINE + lembretes em background.
 * A versão do cache é gerenciada pelo app.js via postMessage — quando um novo
 * build é detectado, o SW troca o cache automaticamente sem intervenção manual.
 * ========================================================================== */

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./app.js",
  "./styles.css",
  "./skilltree.css",
  "./skilltree.js",
  "./skilltree-render.js",
  "./storage.js",
  "./manifest.webmanifest"
];

let CACHE_NAME = "gtg-cache-v3";

const LEMBRETES = [
  "Hora de uma serie! Lembre: 50-60% do seu maximo. Qualidade acima de tudo.",
  "Pavel diz: Uma serie perfeita agora vale mais do que dez ruins depois.",
  "20 minutos se passaram. Hora de trabalhar!",
  "Micro-dose de forca. Uma serie. Agora. Sem desculpa.",
  "O sistema nervoso esta pronto. Mais uma serie constroi o padrao.",
  "Streak em andamento. Nao quebre a corrente — uma serie mantem tudo!",
  "Frequencia > Intensidade. Uma serie agora > Zero series depois.",
  "O soldado nao espera a hora perfeita. Ele treina quando pode.",
  "Cada repeticiao de qualidade mieliniza a via nervosa. Faca agora.",
  "GTG e sobre acumulo. Cada serie conta — mesmo a mais simples."
];

const INTERVALO_MS = 20 * 60 * 1000;

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn("[SW] Falha ao pre-cachear:", err);
      })
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((name) => name.startsWith("gtg-cache-") && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
  agendarProximo();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  event.respondWith(
    url.origin === self.location.origin
      ? staleWhileRevalidate(request)
      : cacheFirst(request)
  );
});

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const networkFetch = fetch(request).then((response) => {
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  if (cached) return cached;
  const network = await networkFetch;
  if (network) return network;
  if (request.mode === "navigate") {
    const fallback = await cache.match("./index.html");
    if (fallback) return fallback;
  }
  return new Response("Offline e recurso nao disponivel em cache.", { status: 503, statusText: "Offline" });
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && (response.ok || response.type === "opaque")) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    return new Response("Offline e recurso externo nao disponivel em cache.", { status: 503, statusText: "Offline" });
  }
}

self.addEventListener("message", (e) => {
  const data = e.data;
  if (data === "INICIAR_LEMBRETES") agendarProximo();
  if (data === "PARAR_LEMBRETES" && self._lembreteTimeout) {
    clearTimeout(self._lembreteTimeout);
    self._lembreteTimeout = null;
  }
  if (data && data.type === "ATUALIZAR_CACHE") {
    e.waitUntil((async () => {
      const newCacheName = `gtg-cache-${data.version}`;
      if (newCacheName === CACHE_NAME) return;
      try {
        const cache = await caches.open(newCacheName);
        await cache.addAll(PRECACHE_URLS);
        CACHE_NAME = newCacheName;
        const names = await caches.keys();
        await Promise.all(
          names.filter((n) => n.startsWith("gtg-cache-") && n !== CACHE_NAME)
            .map((n) => caches.delete(n))
        );
        const clients = await self.clients.matchAll();
        clients.forEach((c) => c.postMessage({ type: "CACHE_ATUALIZADO", version: data.version }))
      } catch (err) {
        console.warn("[SW] Falha ao atualizar cache para versão", data.version, err);
      }
    })());
  }
});

function agendarProximo() {
  if (self._lembreteTimeout) clearTimeout(self._lembreteTimeout);
  self._lembreteTimeout = setTimeout(() => {
    dispararNotificacao();
    agendarProximo();
  }, INTERVALO_MS);
}

function dispararNotificacao() {
  const msg = LEMBRETES[Math.floor(Math.random() * LEMBRETES.length)];
  self.registration.showNotification("GTG TRACKER — FORÇA E RESISTÊNCIA", {
    body: msg,
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230A0A0A"/><text y=".9em" font-size="80">%E2%AD%90</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="80">%E2%AD%90</text></svg>',
    tag: "gtg-lembrete",
    renotify: true,
    requireInteraction: true,
    silent: false,
    vibrate: [200, 100, 200]
  });
}

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientsList) => {
      for (const c of clientsList) {
        if ("focus" in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow("./");
    })
  );
});

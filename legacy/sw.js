/* =============================================================================
 * sw.js — Service Worker do GTG Tracker v2
 * Cache do app shell para uso OFFLINE + lembretes em background.
 * Cache-first para assets locais, stale-while-revalidate para CDN.
 * ========================================================================== */

const CACHE_PREFIX = "gtg-cache-";
let CACHE_NAME = "gtg-cache-v10";

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./entrar.html",
  "./app.js",
  "./styles.css",
  "./treino-ux-refinements.css",
  "./skilltree.css",
  "./utils.js",
  "./storage.js",
  "./audio.js",
  "./rpe-groove.js",
  "./timer.js",
  "./exercicios.js",
  "./xp-streak.js",
  "./lembretes.js",
  "./historico.js",
  "./graficos.js",
  "./readiness.js",
  "./export-share.js",
  "./planejador.js",
  "./warmup.js",
  "./gtg-session.js",
  "./quicklog.js",
  "./skilltree.js",
  "./skilltree-render.js",
  "./manifest.webmanifest",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg",
  "./icons/icon-maskable.svg"
];

const CDN_CACHE = "gtg-cdn-v1";
const FONT_CACHE = "gtg-fonts-v1";

const CDN_URLS = [
  "cdnjs.cloudflare.com",
  "cdn.jsdelivr.net",
  "fonts.googleapis.com",
  "fonts.gstatic.com"
];

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
        names.filter((name) =>
          (name.startsWith(CACHE_PREFIX) || name === "gtg-cdn-v1" || name === "gtg-fonts-v1")
          && name !== CACHE_NAME
        ).map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  const isCDN = CDN_URLS.some(cdn => url.hostname.includes(cdn));

  if (isCDN) {
    event.respondWith(staleWhileRevalidate(request, url.hostname.includes("font") ? FONT_CACHE : CDN_CACHE));
  } else if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(request));
  }
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request, { cache: "no-store" });
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (request.mode === "navigate") {
      const fallback = await getFallbackNavigationResponse(cache);
      if (fallback) return fallback;
    }
    return new Response(`
      <!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>GTG — Offline</title>
      <style>body{background:#0a0a0a;color:#d4a843;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center;padding:20px}
      h1{font-size:48px;margin-bottom:10px;letter-spacing:6px}
      p{color:#888;font-size:14px;letter-spacing:2px;line-height:1.8}
      .star{font-size:64px}</style></head>
      <body><div><div class="star">★</div>
      <h1>OFFLINE</h1>
      <p>Você está sem conexão.<br>Os dados salvos no dispositivo estão disponíveis.<br>As alterações serão sincronizadas quando a rede voltar.</p>
      </div></body></html>`, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => cached);
  return cached || fetchPromise;
}

async function getFallbackNavigationResponse(cache) {
  const candidates = [
    cache.match("./index.html"),
    cache.match("./"),
    cache.match("/index.html"),
    cache.match("/")
  ];
  for (const candidate of candidates) {
    const response = await candidate;
    if (response) return response;
  }
  return null;
}

let _lembreteIntervalo = INTERVALO_MS;

self.addEventListener("message", (e) => {
  const data = e.data;
  if (data === "INICIAR_LEMBRETES") agendarProximo();
  if (data === "PARAR_LEMBRETES" && self._lembreteTimeout) {
    clearTimeout(self._lembreteTimeout);
    self._lembreteTimeout = null;
  }
  if (data && data.type === "ALTERAR_INTERVALO") {
    const novo = parseInt(data.intervalo);
    if (novo > 0 && novo !== _lembreteIntervalo) {
      _lembreteIntervalo = novo;
      if (self._lembreteTimeout) { clearTimeout(self._lembreteTimeout); agendarProximo(); }
    }
  }
  if (data === "LIMPAR_CACHES_PWA") {
    e.waitUntil((async () => {
      const names = await caches.keys();
      await Promise.all(names.filter((name) => name.startsWith(CACHE_PREFIX) || name === "gtg-cdn-v1" || name === "gtg-fonts-v1").map((name) => caches.delete(name)));
    })());
  }
  if (data && data.type === "ATUALIZAR_CACHE") {
    e.waitUntil((async () => {
      const newCacheName = `${CACHE_PREFIX}${data.version}`;
      if (newCacheName === CACHE_NAME) return;
      try {
        const cache = await caches.open(newCacheName);
        await cache.addAll(PRECACHE_URLS);
        CACHE_NAME = newCacheName;
        const names = await caches.keys();
        await Promise.all(names.filter((n) => n.startsWith(CACHE_PREFIX) && n !== CACHE_NAME).map((n) => caches.delete(n)));
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
  }, _lembreteIntervalo);
}

function dispararNotificacao() {
  const msg = LEMBRETES[Math.floor(Math.random() * LEMBRETES.length)];
  self.registration.showNotification("GTG TRACKER — FORÇA E RESISTÊNCIA", {
    body: msg,
    icon: "./icons/icon-512.svg",
    badge: "./icons/icon-192.svg",
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

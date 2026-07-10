/* =============================================================================
 * sw.js — Service Worker do GTG Tracker
 * -----------------------------------------------------------------------------
 * Duas responsabilidades:
 *   1) Cache do app shell para uso OFFLINE real (novo nesta versão).
 *   2) Lembretes em background a cada 20 min via Notification (já existia,
 *      antes vivia dentro de uma string SW_CODE / Blob em app.js).
 *
 * Por ser um arquivo estático (não mais um Blob gerado em runtime), o
 * navegador consegue comparar bytes a cada visita e detectar atualizações
 * sozinho — isso é o que faz o fluxo de versionamento abaixo funcionar.
 * ========================================================================== */

// Bump nesta versão sempre que qualquer arquivo do app shell (lista abaixo)
// for alterado. Isso troca o nome do cache, o que faz o `install` baixar tudo
// de novo e o `activate` apagar o cache da versão anterior.
const CACHE_VERSION = "v1";
const CACHE_NAME = `gtg-cache-${CACHE_VERSION}`;

// Arquivos do app shell, pré-cacheados na instalação.
// IMPORTANTE: as query strings (?v=N) precisam bater exatamente com as
// usadas nas tags <script>/<link> do index.html — senão o cache guarda uma
// URL que a página nunca vai pedir, e a real fica sempre indo pra rede.
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./app.js?v=3",
  "./styles.css?v=2",
  "./skilltree.css",
  "./skilltree.js?v=2",
  "./skilltree-render.js?v=2",
  "./manifest.webmanifest"
];
// Os ícones do manifest são data: URIs inline (SVG embutido no próprio
// manifest.webmanifest) — não existem como arquivo separado, então não há
// nada extra pra cachear ali.

/* ============================ LEMBRETES (preservado) ======================= */

const LEMBRETES = [
  "⏰ Hora de uma série! Lembre: 50-60% do seu máximo. Qualidade acima de tudo.",
  "🔔 Pavel diz: Uma série perfeita agora vale mais do que dez séries ruins depois.",
  "⚡ 20 minutos se passaram. Hora de trabalhar!",
  "🎯 Micro-dose de força. Uma série. Agora. Sem desculpa.",
  "💪 O sistema nervoso está pronto. Mais uma série constrói o padrão.",
  "🔥 Streak em andamento. Não quebre a corrente — uma série mantém tudo!",
  "⭐ Frequência > Intensidade. Uma série agora > Zero séries depois.",
  "🪖 O soldado não espera a hora perfeita. Ele treina quando pode.",
  "🧠 Cada repetição de qualidade mieliniza a via nervosa. Faça agora.",
  "⚔ GTG é sobre acúmulo. Cada série conta — mesmo a mais simples."
];

const INTERVALO_MS = 20 * 60 * 1000;

/* ================================ INSTALL =================================== */

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn("[SW] Falha ao pré-cachear um ou mais arquivos do app shell:", err);
      })
    )
  );
});

/* =============================== ACTIVATE ==================================== */

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name.startsWith("gtg-cache-") && name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
  agendarProximo();
});

/* ================================= FETCH ====================================== */
/*
 * Estratégia:
 *  - Mesma origem (app shell): stale-while-revalidate — responde do cache
 *    na hora (rápido, funciona offline) e atualiza o cache em segundo
 *    plano com o que vier da rede, pra próxima visita já vir fresca.
 *  - Outra origem (CDNs: Google Fonts, Font Awesome, Chart.js, jsPDF,
 *    html2canvas): cache-first simples — essas URLs já carregam a versão
 *    no próprio caminho (ex: Chart.js/4.4.1/...), então uma vez cacheadas
 *    não precisam ser buscadas de novo.
 *  - Só GET é interceptado; qualquer outro método vai direto pra rede.
 */

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  event.respondWith(isSameOrigin ? staleWhileRevalidate(request) : cacheFirst(request));
});

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  if (cached) {
    // Atualização roda em segundo plano — o .catch acima já evita erro
    // não tratado; não fazemos o usuário esperar por ela.
    return cached;
  }

  const network = await networkFetch;
  if (network) return network;

  // Offline, sem cache e é navegação de página: cai pro shell cacheado.
  if (request.mode === "navigate") {
    const fallback = await cache.match("./index.html");
    if (fallback) return fallback;
  }
  return new Response("Offline e recurso não disponível em cache.", {
    status: 503,
    statusText: "Offline"
  });
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    // Recursos de CDN sem CORS liberado voltam como "opaque" (status 0);
    // ainda são cacheáveis e utilizáveis, só não dá pra inspecionar o status.
    if (response && (response.ok || response.type === "opaque")) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    return new Response("Offline e recurso externo não disponível em cache.", {
      status: 503,
      statusText: "Offline"
    });
  }
}

/* ============================ LEMBRETES (preservado) ========================= */

self.addEventListener("message", (e) => {
  if (e.data === "INICIAR_LEMBRETES") agendarProximo();
  if (e.data === "PARAR_LEMBRETES" && self._lembreteTimeout) {
    clearTimeout(self._lembreteTimeout);
    self._lembreteTimeout = null;
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
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%230A0A0A%22/><text y=%22.9em%22 font-size=%2280%22>⭐</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>⭐</text></svg>',
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

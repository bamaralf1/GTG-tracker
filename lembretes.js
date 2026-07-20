function iniciarLembretes(showUI) {
  lembreteInterval && clearInterval(lembreteInterval);
  if (window._lembreteCountdownInterval) clearInterval(window._lembreteCountdownInterval);
  const intervalo = lembreteIntervaloMs || 900000;
  lembreteProximo = Date.now() + intervalo;
  lembreteInterval = setInterval(() => {
    const msg = LEMBRETES_GTG[Math.floor(Math.random() * LEMBRETES_GTG.length)];
    mostrarToast("LEMBRETE GTG", msg, "success"), tocarSomLembrete();
    lembreteContagem++;
    lembreteProximo = Date.now() + intervalo;
    _atualizarUIAlertas();
  }, intervalo);
  window._lembreteCountdownInterval = setInterval(_atualizarUIAlertas, 1000);
  _atualizarUIAlertas();
  if (showUI) {
    document.getElementById("btnAtivarLembrete").style.display = "none";
    document.getElementById("btnDesativarLembrete").style.display = "inline-block";
  }
}

function desativarLembretes() {
  lembreteInterval && (clearInterval(lembreteInterval), lembreteInterval = null);
  window._lembreteCountdownInterval && (clearInterval(window._lembreteCountdownInterval), window._lembreteCountdownInterval = null);
  lembreteProximo = null;
  lembreteSWAtivo = false;
  if (swRegistration && swRegistration.active) {
    swRegistration.active.postMessage("PARAR_LEMBRETES");
  }
  document.getElementById("btnAtivarLembrete").style.display = "inline-block";
  document.getElementById("btnDesativarLembrete").style.display = "none";
  document.getElementById("btnAtivarLembrete").textContent = "⚡ ATIVAR";
  document.getElementById("btnAtivarLembrete").style.background = "rgba(204,0,0,.25)";
  document.getElementById("btnAtivarLembrete").style.borderColor = "rgba(204,0,0,.5)";
  document.getElementById("btnAtivarLembrete").style.color = "var(--red-bright)";
  _atualizarUIAlertas();
  mostrarToast("Lembretes desativados", "Intervalo de notificações pausado.", "info");
}

function alterarIntervaloLembrete(val) {
  lembreteIntervaloMs = parseInt(val);
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: "ALTERAR_INTERVALO", intervalo: lembreteIntervaloMs });
  }
  if (lembreteInterval) {
    iniciarLembretes(true);
    mostrarToast("Intervalo alterado", "Lembretes a cada " + (lembreteIntervaloMs / 60000) + " min", "success");
  } else {
    _atualizarUIAlertas();
  }
}

function testarLembrete() {
  const msg = LEMBRETES_GTG[Math.floor(Math.random() * LEMBRETES_GTG.length)];
  mostrarToast("🔔 TESTE", msg, "success");
  tocarSomLembrete();
  enviarNotificacaoSW("🧪 TESTE: " + msg);
}

function _atualizarUIAlertas() {
  const dot = document.getElementById("lembreteStatusDot");
  const desc = document.getElementById("lembreteDesc");
  const proxEl = document.getElementById("lembreteProximo");
  const cntEl = document.getElementById("lembreteContagem");
  const ultMsg = document.getElementById("lembreteUltimaMsg");
  if (lembreteInterval || lembreteSWAtivo) {
    if (dot) dot.className = "rm-status-dot active";
    if (desc) desc.textContent = (lembreteInterval ? "ATIVO" : "SW ATIVO") + " — A CADA " + (lembreteIntervaloMs / 60000) + " MIN";
    if (cntEl) cntEl.textContent = lembreteContagem;
    if (proxEl && lembreteProximo) {
      const resto = Math.max(0, Math.round((lembreteProximo - Date.now()) / 1000));
      const m = Math.floor(resto / 60), s = resto % 60;
      proxEl.textContent = m + ":" + (s < 10 ? "0" : "") + s;
    }
  } else {
    if (dot) dot.className = "rm-status-dot";
    if (desc) desc.textContent = "DESLIGADO";
    if (proxEl) proxEl.textContent = "—";
    if (cntEl) cntEl.textContent = lembreteContagem || "0";
  }
  if (ultMsg && !lembreteInterval && !lembreteSWAtivo) ultMsg.textContent = "";
}

let swRegistration = null,
  deferredInstallPrompt = null,
  CACHE_BUILD = "20260713u"; // altere quando fizer deploy de novas versoes

async function instalarPWA() {
  if (!deferredInstallPrompt) return void mostrarToast("Info", "Use o menu do navegador para instalar (Adicionar à tela inicial).", "warning");
  deferredInstallPrompt.prompt();
  const {
    outcome: e
  } = await deferredInstallPrompt.userChoice;
  "accepted" === e && mostrarToast("✓ Instalando!", "GTG Tracker sendo instalado...", "success"), deferredInstallPrompt = null
}

async function registrarServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  try {
    swRegistration = await navigator.serviceWorker.register("./sw.js", {
      scope: "./"
    });
    return await navigator.serviceWorker.ready, swRegistration = await navigator.serviceWorker.getRegistration(), swRegistration
  } catch (e) {
    console.warn("[registrarServiceWorker] Falha ao registrar sw.js:", e.message);
    try {
      const e = await navigator.serviceWorker.getRegistration();
      if (e) return swRegistration = e, e
    } catch (e) {
      console.error("[registrarServiceWorker] Falha no fallback de registro:", e)
    }
    return null
  }
}

async function enviarNotificacaoSW(e) {
  if (swRegistration && swRegistration.active) try {
    return void await swRegistration.showNotification("GTG TRACKER — FORÇA E RESISTÊNCIA", {
      body: e,
      tag: "gtg-lembrete",
      renotify: !0,
      silent: !1,
      requireInteraction: !0,
      vibrate: [200, 100, 200],
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230A0A0A"/><text y=".9em" font-size="80">⭐</text></svg>'
    })
  } catch (e) {
    console.warn("[enviarNotificacaoSW] Falha na notificação via SW:", e)
  }
  if ("Notification" in window && "granted" === Notification.permission) try {
    new Notification("GTG TRACKER", {
      body: e,
      tag: "gtg-lembrete",
      renotify: !0
    })
  } catch (e) {
    console.warn("[enviarNotificacaoSW] Falha na notificação fallback:", e)
  }
}

async function solicitarPermissaoNotificacao() {
  if (!("Notification" in window)) return void mostrarToast("Info", "Navegador não suporta notificações.", "warning");
  let e = Notification.permission;
  if ("default" === e && (e = await Notification.requestPermission()), "granted" === e) {
    const e = await registrarServiceWorker();
    e ? (e.active ? (e.active.postMessage("INICIAR_LEMBRETES"), e.active.postMessage({ type: "ALTERAR_INTERVALO", intervalo: lembreteIntervaloMs || 900000 })) : e.addEventListener("updatefound", () => {
      e.installing?.addEventListener("statechange", () => {
        e.active && (e.active.postMessage("INICIAR_LEMBRETES"), e.active.postMessage({ type: "ALTERAR_INTERVALO", intervalo: lembreteIntervaloMs || 900000 }))
      })
    }),     document.getElementById("btnAtivarLembrete").style.display = "none", document.getElementById("btnDesativarLembrete").style.display = "inline-block", mostrarToast("✓ Ativado!", "Lembretes ativos — funcionam mesmo com a tela bloqueada!", "success")) : (document.getElementById("btnAtivarLembrete").style.display = "none", document.getElementById("btnDesativarLembrete").style.display = "inline-block", mostrarToast("Ativado", "Lembretes ativos (instale o app para funcionar em background).", "success")), iniciarLembretes(true), deferredInstallPrompt && (document.getElementById("btnInstalarPWA").style.display = "inline-block")
  } else mostrarToast("Bloqueado", "Permissão negada. Habilite notificações nas configurações do navegador.", "error")
}


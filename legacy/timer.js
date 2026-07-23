function _obterExercicioDoTimer() {
  const id = document.getElementById("timerExerciseSelect").value;
  if (!id) return null;
  return dados.exercicios.find(ex => ex.id === id) || null;
}

function _atualizarTimerWarning() {
  const warn = document.getElementById("timerWarning");
  if (!warn) return;
  const ex = _obterExercicioDoTimer();
  if (ex) {
    warn.textContent = "⏱ " + ex.nome + " — " + (ex.instrucoes || "Sem instruções").slice(0, 60);
    warn.className = "timer-warning timer-warning-ok";
    document.getElementById("timerLabel").textContent = ex.nome;
  } else {
    warn.textContent = "⚠ Selecione um exercício antes de iniciar o timer";
    warn.className = "timer-warning";
    document.getElementById("timerLabel").textContent = "CRONÔMETRO";
  }
}

function _timerTick() {
  plankTimer.segundos++;
  const mins = String(Math.floor(plankTimer.segundos / 60)).padStart(2, "0"),
    secs = String(plankTimer.segundos % 60).padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${mins}:${secs}`;
  document.getElementById("timerSeconds").textContent = plankTimer.segundos + "s";
  const fill = document.getElementById('timerRingFill');
  if (fill) fill.style.strokeDashoffset = 471 - (plankTimer.segundos % 60) / 60 * 471;
  if (plankTimer.segundos % 30 === 0) tocarBeepCronometro();
}

function _timerRun() {
  plankTimer.rodando = !0;
  document.getElementById("timerDisplay").classList.add("running");
  document.getElementById("timerSeconds").style.display = "block";
  const fill = document.getElementById('timerRingFill');
  if (fill) fill.classList.add('running');
  plankTimer.intervalo = setInterval(_timerTick, 1000);
}

function startPlankTimer(fromExId) {
  if (plankTimer.rodando || plankTimer.preparando) return;
  if (plankTimer.pausado) {
    plankTimer.pausado = !1;
    _timerRun();
    return;
  }
  if (fromExId) {
    document.getElementById("timerExerciseSelect").value = fromExId;
    _atualizarTimerWarning();
  }
  const exSel = document.getElementById("timerExerciseSelect");
  if (!exSel.value) {
    exSel.style.borderColor = "var(--red-bright)";
    exSel.style.boxShadow = "0 0 12px rgba(255,26,26,0.4)";
    mostrarToast("Selecione um exercício", "Escolha no cronômetro qual exercício timer vai registrar.", "warning");
    setTimeout(() => { exSel.style.borderColor = ""; exSel.style.boxShadow = ""; }, 2000);
    return;
  }
  plankTimer.preparando = !0;
  plankTimer.exercicioId = exSel.value;
  document.getElementById("btnStartTimer").textContent = "⏳ PREPARANDO...";
  document.getElementById("btnStartTimer").disabled = !0;
  document.getElementById("timerDisplay").style.opacity = "0.3";
  const prepOverlay = document.getElementById("prepCountdown"),
    prepNum = document.getElementById("prepNumber");
  let c = 7;
  prepOverlay.style.display = "block";
  prepNum.style.display = "block";
  prepNum.textContent = c;
  tocarSomPreparo(c);
  plankTimer.prepIntervalo = setInterval(() => {
    c--;
    if (c <= 0) {
      clearInterval(plankTimer.prepIntervalo);
      plankTimer.prepIntervalo = null;
      prepOverlay.style.display = "none";
      prepNum.style.display = "none";
      document.getElementById("timerDisplay").style.opacity = "1";
      document.getElementById("btnStartTimer").textContent = "▶ RODANDO...";
      document.getElementById("btnStartTimer").disabled = !1;
      plankTimer.preparando = !1;
      tocarSomInicioExercicio();
      _timerRun();
    } else {
      prepNum.textContent = c;
      tocarSomPreparo(c);
    }
  }, 1000);
}

function stopPlankTimer() {
  if (!plankTimer.rodando) return;
  clearInterval(plankTimer.intervalo);
  plankTimer.rodando = !1;
  plankTimer.pausado = !1;
  document.getElementById("timerDisplay").classList.remove("running");
  document.getElementById("btnStartTimer").textContent = "▶ INICIAR";
  somTimer();
  const fill = document.getElementById('timerRingFill');
  if (fill) { fill.classList.remove('running'); fill.style.strokeDashoffset = 471; }
  const selectedExId = plankTimer.exercicioId || document.getElementById("timerExerciseSelect").value;
  if (selectedExId && plankTimer.segundos > 0) {
    grooveState[selectedExId] = window.plankGroove ? [...window.plankGroove] : [0, 0, 0];
    document.getElementById(`valor-${selectedExId}`).value = plankTimer.segundos;
    adicionarSerie(selectedExId);
    mostrarToast("Timer Salvo", `${plankTimer.segundos}s registrados em ${_nomeExercicio(selectedExId)}`, "success");
  } else if (!selectedExId) {
    mostrarToast("Timer descartado", "Nenhum exercício selecionado — segundos não salvos.", "info");
  }
  resetPlankTimer()
}

function _nomeExercicio(id) {
  const ex = dados.exercicios.find(e => e.id === id);
  return ex ? ex.nome : id;
}

function resetPlankTimer() {
  clearInterval(plankTimer.prepIntervalo);
  clearInterval(plankTimer.intervalo);
  plankTimer = {
    intervalo: null, prepIntervalo: null, segundos: 0,
    rodando: !1, preparando: !1, pausado: !1, exercicioId: null
  };
  document.getElementById("timerDisplay").textContent = "00:00";
  document.getElementById("timerDisplay").classList.remove("running");
  document.getElementById("timerDisplay").style.opacity = "1";
  document.getElementById("timerSeconds").textContent = "0s";
  document.getElementById("timerSeconds").style.display = "none";
  document.getElementById("btnStartTimer").textContent = "▶ INICIAR";
  document.getElementById("btnStartTimer").disabled = !1;
  document.getElementById("prepCountdown").style.display = "none";
  document.getElementById("prepNumber").style.display = "none";
  const fill = document.getElementById('timerRingFill');
  if (fill) { fill.classList.remove('running'); fill.style.strokeDashoffset = 471; }
}

function pausePlankTimer() {
  if (!plankTimer.rodando) return;
  clearInterval(plankTimer.prepIntervalo);
  clearInterval(plankTimer.intervalo);
  plankTimer.rodando = !1;
  plankTimer.pausado = !0;
  document.getElementById("timerDisplay").classList.remove("running");
  document.getElementById("btnStartTimer").textContent = "▶ RETOMAR";
  const fill = document.getElementById('timerRingFill');
  if (fill) fill.classList.remove('running');
}

let restTimerExIdPendente = null;

function abrirTimerDescanso(exId) {
  const ex = dados.exercicios.find(e => e.id === exId);
  restTimerExIdPendente = exId, document.getElementById("restModalExercise").textContent = ex?.nome || exId, document.getElementById("restTimerModal").classList.add("active")
}

function confirmRestTimer() {
  const duration = parseInt(document.getElementById("restDuration").value),
    exId = restTimerExIdPendente,
    ex = dados.exercicios.find(e => e.id === exId);
  closeModal("restTimerModal"), iniciarRestTimer(duration, exId, ex?.nome || exId)
}

function _darBonusDescanso() {
  const w = document.getElementById("restTimerWidget");
  if (w) { w.classList.add("rt-complete"); w.classList.remove("rest-critical", "rest-urgent", "rest-warning") }
  var grad = document.getElementById("restRingGradient");
  if (grad) {
    var stops = grad.querySelectorAll("stop");
    if (stops.length >= 2) { stops[0].setAttribute("stop-color", "#22cc22"); stops[1].setAttribute("stop-color", "#66ee66") }
  }
  var glow = document.getElementById("restRingGlow");
  if (glow) glow.style.opacity = "0.35";
  try { adicionarXP(3); mostrarToast("✓ DESCANSO RESPEITADO", "+3 XP bônus por descanso completo!", "success"); } catch(_) {}
}

function _initRestRingGradient() {
  const svg = document.querySelector(".rest-timer-progress-ring svg");
  if (!svg) return;
  let defs = svg.querySelector("defs");
  if (!defs) { defs = document.createElementNS("http://www.w3.org/2000/svg", "defs"); svg.prepend(defs) }
  let grad = defs.querySelector("#restRingGradient");
  if (!grad) {
    grad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    grad.id = "restRingGradient";
    grad.setAttribute("x1", "0%"); grad.setAttribute("y1", "0%");
    grad.setAttribute("x2", "100%"); grad.setAttribute("y2", "100%");
    const s1 = document.createElementNS("http://www.w3.org/2000/svg", "stop"); s1.setAttribute("offset", "0%");
    const s2 = document.createElementNS("http://www.w3.org/2000/svg", "stop"); s2.setAttribute("offset", "100%");
    grad.append(s1, s2); defs.append(grad)
  }
  const fill = document.getElementById("restRingFill");
  if (fill) fill.setAttribute("stroke", "url(#restRingGradient)")
}

function _updateRestRingGradient(phase, pct) {
  const grad = document.getElementById("restRingGradient");
  if (!grad) return;
  const stops = grad.querySelectorAll("stop");
  if (stops.length < 2) return;
  var c1, c2;
  switch (phase) {
    case "critical": c1 = "#cc0000"; c2 = "#ff3333"; break;
    case "urgent":   c1 = "#e66600"; c2 = "#ffaa00"; break;
    case "warning":  c1 = "#d9a000"; c2 = "#ffcc00"; break;
    default:         c1 = "#d4a843"; c2 = "#ebd194"; break;
  }
  stops[0].setAttribute("stop-color", c1);
  stops[1].setAttribute("stop-color", c2);
  var glow = document.getElementById("restRingGlow");
  if (glow) glow.style.opacity = Math.min(0.55, 0.06 + 0.5 * (1 - pct))
}

function _ensureRestScanline() {
  var w = document.getElementById("restTimerWidget");
  if (!w || w.querySelector(".rt-scanline")) return;
  var sl = document.createElement("div");
  sl.className = "rt-scanline";
  w.prepend(sl)
}

function iniciarRestTimer(duration, exId, exName) {
  restTimer._hideTimeout && clearTimeout(restTimer._hideTimeout);
  restTimer.intervalo && clearInterval(restTimer.intervalo), restTimer = {
    intervalo: null,
    segundos: duration,
    rodando: !0,
    exercicioId: exId,
    exercicioNome: exName,
    _total: duration,
    _hideTimeout: null
  };
  const w = document.getElementById("restTimerWidget");
  w && (w.classList.remove("rt-complete", "rest-critical", "rest-urgent", "rest-warning"), w.classList.add("active"));
  document.getElementById("restTimerBackdrop")?.classList.add("active");
  document.getElementById("restTimerExercise") && (document.getElementById("restTimerExercise").textContent = exName);
  _initRestRingGradient(), _ensureRestScanline();
  var pctInit = Math.max(0, duration > 0 ? 1 : 0);
  _updateRestRingGradient("normal", pctInit);
  atualizarDisplayRestTimer();
  restTimer.intervalo = setInterval(() => {
    restTimer.segundos--, atualizarDisplayRestTimer(), restTimer.segundos <= 0 && (clearInterval(restTimer.intervalo), restTimer.rodando = !1, tocarSomDescanso(), _darBonusDescanso(), restTimer._hideTimeout = setTimeout(function() { document.getElementById("restTimerWidget")?.classList.remove("active"); document.getElementById("restTimerBackdrop")?.classList.remove("active"); }, 5e3))
  }, 1e3)
}

function _updateRestPremiumUI(pct, restantes, total) {
  const sub = document.getElementById("rtHeaderSub");
  if (sub) sub.textContent = pct <= 0.15 ? "CRÍTICO" : pct <= 0.3 ? "URGENTE" : pct <= 0.5 ? "ATENÇÃO" : "NORMAL";
  const phase = document.getElementById("rtPhase");
  if (phase) phase.textContent = pct <= 0.15 ? "FASE CRÍTICA" : pct <= 0.3 ? "FASE URGENTE" : pct <= 0.5 ? "ATENÇÃO" : "RECUPERANDO";
  const bar = document.getElementById("rtAccentBar");
  if (bar) { const pp = Math.round((1 - pct) * 100); bar.style.setProperty("--rt-pct", pp + "%"); bar.dataset.rtPct = pp }
  const hint = document.getElementById("rtFooterHint");
  if (hint) hint.textContent = restantes > 0 ? `⚡ Complete o descanso para +3 XP bônus — ${restantes}s restantes` : "⚡ DESCANSO CONCLUÍDO!";
}

function atualizarDisplayRestTimer() {
  var el = document.getElementById("restTimerDisplay");
  if (!el) return;
  var total = restTimer._total || 900;
  var restantes = restTimer.segundos;
  var mins = String(Math.floor(restantes / 60)).padStart(2, "0");
  var secs = String(restantes % 60).padStart(2, "0");
  el.textContent = mins + ":" + secs;
  var pct = total > 0 ? restantes / total : 0;
  var ring = document.getElementById("restRingFill");
  if (ring) {
    var circ = 2 * Math.PI * 52;
    var offset = circ * (1 - pct);
    ring.style.strokeDasharray = circ;
    ring.style.strokeDashoffset = offset;
  }
  var widget = document.getElementById("restTimerWidget"), phase = "normal";
  if (widget) {
    widget.classList.remove("rest-urgent", "rest-warning", "rest-critical");
    if (pct <= 0.15) { widget.classList.add("rest-critical"); phase = "critical" }
    else if (pct <= 0.3) { widget.classList.add("rest-urgent"); phase = "urgent" }
    else if (pct <= 0.5) { widget.classList.add("rest-warning"); phase = "warning" }
  }
  _updateRestRingGradient(phase, pct);
  _updateRestPremiumUI(pct, restantes, total);
}

function toggleRestTimer() {
  const btn = document.getElementById("btnPauseRestTimer");
  const icon = btn?.querySelector(".rt-btn-icon");
  const label = btn?.querySelector(".rt-btn-label");
  restTimer.rodando ? (clearInterval(restTimer.intervalo), restTimer.rodando = !1, icon && (icon.textContent = "▶"), label && (label.textContent = "RETOMAR")) : (restTimer.rodando = !0, icon && (icon.textContent = "⏸"), label && (label.textContent = "PAUSAR"), restTimer.intervalo = setInterval(() => {
    restTimer.segundos--, atualizarDisplayRestTimer(), restTimer.segundos <= 0 && (clearInterval(restTimer.intervalo), restTimer.rodando = !1, tocarSomDescanso(), _darBonusDescanso(), restTimer._hideTimeout = setTimeout(() => { document.getElementById("restTimerWidget")?.classList.remove("active"); document.getElementById("restTimerBackdrop")?.classList.remove("active"); }, 5e3))
  }, 1e3))
}

function resetRestTimer() {
  restTimer._hideTimeout && clearTimeout(restTimer._hideTimeout);
  clearInterval(restTimer.intervalo);
  const w = document.getElementById("restTimerWidget");
  if (w) w.classList.remove("active", "rt-complete", "rest-critical", "rest-urgent", "rest-warning");
  document.getElementById("restTimerBackdrop")?.classList.remove("active");
  restTimer = { intervalo: null, segundos: 0, rodando: !1, exercicioId: null, exercicioNome: "" };
  const btn = document.getElementById("btnPauseRestTimer");
  const icon = btn?.querySelector(".rt-btn-icon");
  const label = btn?.querySelector(".rt-btn-label");
  if (icon) icon.textContent = "⏸";
  if (label) label.textContent = "PAUSAR";
}


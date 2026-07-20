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
  }, document.getElementById("restTimerWidget").classList.add("active"), document.getElementById("restTimerBackdrop").classList.add("active"), document.getElementById("restTimerExercise").textContent = exName, atualizarDisplayRestTimer(), restTimer.intervalo = setInterval(() => {
    restTimer.segundos--, atualizarDisplayRestTimer(), restTimer.segundos <= 0 && (clearInterval(restTimer.intervalo), restTimer.rodando = !1, tocarSomDescanso(), mostrarToast("✓ DESCANSO COMPLETO!", `Hora de mais uma série de ${exName}!`, "success"), restTimer._hideTimeout = setTimeout(function() { document.getElementById("restTimerWidget").classList.remove("active"); document.getElementById("restTimerBackdrop").classList.remove("active"); }, 5e3))
  }, 1e3)
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
  var widget = document.getElementById("restTimerWidget");
  if (widget) {
    widget.classList.remove("rest-urgent", "rest-warning", "rest-critical");
    if (pct <= 0.15) widget.classList.add("rest-critical");
    else if (pct <= 0.3) widget.classList.add("rest-urgent");
    else if (pct <= 0.5) widget.classList.add("rest-warning");
  }
}

function toggleRestTimer() {
  restTimer.rodando ? (clearInterval(restTimer.intervalo), restTimer.rodando = !1, document.getElementById("btnPauseRestTimer").textContent = "▶ RETOMAR") : (restTimer.rodando = !0, document.getElementById("btnPauseRestTimer").textContent = "⏸ PAUSAR", restTimer.intervalo = setInterval(() => {
    restTimer.segundos--, atualizarDisplayRestTimer(), restTimer.segundos <= 0 && (clearInterval(restTimer.intervalo), restTimer.rodando = !1, tocarSomDescanso(), mostrarToast("✓ DESCANSO COMPLETO!", `Hora de mais uma série de ${restTimer.exercicioNome}!`, "success"), restTimer._hideTimeout = setTimeout(() => document.getElementById("restTimerWidget").classList.remove("active"), 5e3))
  }, 1e3))
}

function resetRestTimer() {
  restTimer._hideTimeout && clearTimeout(restTimer._hideTimeout);
  clearInterval(restTimer.intervalo), document.getElementById("restTimerWidget").classList.remove("active"), document.getElementById("restTimerBackdrop").classList.remove("active"), restTimer = {
    intervalo: null,
    segundos: 0,
    rodando: !1,
    exercicioId: null,
    exercicioNome: ""
  }
}


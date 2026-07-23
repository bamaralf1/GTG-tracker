/* =============================================================================
 * gtg-session.js — Sessão GTG (modo comprimido)
 * ========================================================================== */

let sessaoGTGState = null;

function atualizarSugestaoSessao() {
  const e = document.getElementById("sessionExSelect"),
    a = document.getElementById("sessionSugestao"),
    t = document.getElementById("sessionSerieValor"),
    n = document.getElementById("sessionPRDisplay");
  if (!e || !a) return;
  const o = dados.exercicios.find(a => a.id === e.value);
  if (!o) return void(a.textContent = "—");
  const pr = calcularPR2(o),
    r = calcularSugestaoGTG(pr, o.tipo),
    s = "tempo" === o.tipo ? "seg" : o.unidade || "reps";
  if (n) n.innerHTML = pr ? `PR&nbsp;${pr} ${s}` : "PR —";
  if (r) { a.textContent = `${r} ${s} • ${pr ? Math.round(r/pr*100) : 50}% do PR`; if (t && !t.value) t.value = r, t.placeholder = "GTG: " + r }
  else a.textContent = "Sem histórico, defina manualmente"
}

function iniciarSessaoGTG() {
  const e = document.getElementById("sessionExSelect").value;
  if (!e) return void mostrarToast("Erro", "Selecione um exercício para a sessão.", "error");
  const a = dados.exercicios.find(a => a.id === e);
  if (!a) return;
  const t = parseInt(document.getElementById("sessionNumSeries").value) || 5,
    o = parseInt(document.getElementById("sessionSerieValor").value) || calcularSugestaoGTG(calcularPR2(a), a.tipo) || 1,
    r = parseInt(document.getElementById("sessionDescanso").value) || 900;
  if (t < 1) return void mostrarToast("Erro", "Número de séries inválido.", "error");
  sessaoGTGState = {
    exercicioId: e,
    exercicioNome: a.nome,
    tipo: a.tipo,
    unidade: "tempo" === a.tipo ? "seg" : a.unidade || "reps",
    totalSeries: t,
    valorPorSerie: o,
    descansoSeg: r,
    seriesFeitas: 0,
    fase: "pronta",
    intervalo: null,
    segundosRestantes: 0
  };
  document.getElementById("sessionSetup").style.display = "none";
  document.getElementById("sessionProgress").style.display = "block";
  renderSessaoProgress();
  const bar = document.getElementById("ssAccentBar");
  if (bar) bar.style.background = "linear-gradient(180deg,var(--gold),rgba(212,168,67,.1))";
  atualizarSessaoUI();
  mostrarToast("🔗 SESSÃO INICIADA", `${a.nome} — ${t} séries de ${o} ${sessaoGTGState.unidade}`, "success")
}

function renderSessaoProgress() {
  const e = document.getElementById("sessionMuniBelt");
  if (!e || !sessaoGTGState) return;
  e.innerHTML = "";
  for (let a = 0; a < sessaoGTGState.totalSeries; a++) {
    const t = document.createElement("div");
    t.className = "ss-muni-round";
    if (a < sessaoGTGState.seriesFeitas) t.classList.add("ss-muni-spent");
    else if (a === sessaoGTGState.seriesFeitas) t.classList.add("ss-muni-current");
    e.appendChild(t)
  }
}

function atualizarSessaoUI() {
  if (!sessaoGTGState) return;
  const e = document.getElementById("sessionProgressTitle"),
    a = document.getElementById("sessionStateLabel"),
    t = document.getElementById("sessionTimerDisplay"),
    o = document.getElementById("sessionActionBtn"),
    n = document.getElementById("sessionProgressLabel"),
    r = document.getElementById("sessionProgressBar"),
    u = document.getElementById("sessionRingSub"),
    b = document.getElementById("ssAccentBar");
  const pct = sessaoGTGState.totalSeries > 0 ? (sessaoGTGState.seriesFeitas / sessaoGTGState.totalSeries * 100) : 0;
  e && (e.textContent = `SÉRIE ${Math.min(sessaoGTGState.seriesFeitas+1,sessaoGTGState.totalSeries)} DE ${sessaoGTGState.totalSeries}`);
  n && (n.textContent = `${sessaoGTGState.seriesFeitas} / ${sessaoGTGState.totalSeries}`);
  r && (r.style.width = pct + "%");
  if (b) { const pct2 = Math.round(pct); b.style.setProperty("--ss-pct", pct2 + "%"); b.dataset.ssPct = pct2 }
  if ("pronta" === sessaoGTGState.fase) {
    a && (a.textContent = "PRONTO");
    t && (t.textContent = "▶", t.style.color = "var(--gold)");
    u && (u.textContent = "REGISTRAR SÉRIE");
    o && (o.disabled = !1, o.textContent = "✓ REGISTRAR");
    if (b) b.style.background = "linear-gradient(180deg,var(--gold),rgba(212,168,67,.1))";
  } else if ("descansando" === sessaoGTGState.fase) {
    a && (a.textContent = "DESCANSO");
    const seg = sessaoGTGState.segundosRestantes || sessaoGTGState.descansoSeg || 0;
    const min = Math.floor(seg / 60);
    const s = seg % 60;
    t && (t.textContent = `${String(min).padStart(2,"0")}:${String(s).padStart(2,"0")}`, t.style.color = "var(--green-bright)");
    u && (u.textContent = "AGUARDE");
    o && (o.disabled = !0, o.textContent = "⏳ AGUARDE");
    if (b) b.style.background = "linear-gradient(180deg,var(--green-bright),rgba(68,204,68,.1))";
  }
}

function executarSerieSessao() {
  if (!sessaoGTGState || "pronta" !== sessaoGTGState.fase) return;
  const e = dados.exercicios.find(e => e.id === sessaoGTGState.exercicioId);
  if (!e) return void pararSessaoGTG();
  const inp = document.getElementById(`valor-${e.id}`);
  if (inp) {
    inp.value = sessaoGTGState.valorPorSerie;
    try { adicionarSerie(e.id); } catch(_) { console.warn("adicionarSerie:", _) }
  } else {
    const agora = new Date;
    const reg = {
      id: Date.now() + Math.random().toString(36).slice(2),
      exercicioId: e.id,
      exercicioNome: e.nome,
      valor: sessaoGTGState.valorPorSerie,
      peso: 0,
      data: agora.toISOString().slice(0, 10),
      hora: agora.toTimeString().slice(0, 5),
      timestamp: agora.getTime(),
      xp: calcularXPSerie(e, sessaoGTGState.valorPorSerie, 0),
      rpe: null
    };
    dados.registros.push(reg);
    try { adicionarXP(reg.xp); } catch(_) {}
    try { _gtgSpark(); } catch(_) {}
    try { verificarStreak(); } catch(_) {}
    try { verificarBadges(); } catch(_) {}
    try { salvarDadosDebounced(); } catch(_) {}
    try { atualizarCardExercicio(reg.exercicioId); } catch(_) {}
    try { atualizarStats(); } catch(_) {}
    try { renderHistory(); } catch(_) {}
    try { somRegistrar(); } catch(_) {}
  }
  sessaoGTGState.seriesFeitas++;
  renderSessaoProgress();
  _animarSerieConcluida();
  mostrarToast(`✓ Série ${sessaoGTGState.seriesFeitas}/${sessaoGTGState.totalSeries}`, `${sessaoGTGState.valorPorSerie} ${sessaoGTGState.unidade} registrados`, "success");
  if (sessaoGTGState.seriesFeitas >= sessaoGTGState.totalSeries) {
    concluirSessaoGTG();
  } else {
    iniciarDescansoSessao();
  }
}

function _animarSerieConcluida() {
  const belt = document.getElementById("sessionMuniBelt");
  if (!belt) return;
  const rounds = belt.querySelectorAll(".ss-muni-round");
  if (rounds.length < 1) return;
  const idx = Math.min(sessaoGTGState.seriesFeitas - 1, rounds.length - 1);
  if (idx >= 0) { const r = rounds[idx]; r.classList.remove("ss-muni-current"); r.classList.add("ss-muni-lit"); setTimeout(() => { r.classList.remove("ss-muni-lit") }, 500) }
}

function iniciarDescansoSessao() {
  sessaoGTGState.fase = "descansando", sessaoGTGState.segundosRestantes = sessaoGTGState.descansoSeg, atualizarSessaoUI();
  const e = document.getElementById("sessionTimerDisplay"),
    fill = document.getElementById("sessionRingFill"),
    sub = document.getElementById("sessionRingSub"),
    total = sessaoGTGState.descansoSeg,
    circum = 502;
  if (fill) { fill.style.transition = "none"; fill.style.stroke = "var(--green-bright)" }
  if (sub) sub.textContent = "PRÓXIMA SÉRIE EM";
  sessaoGTGState.intervalo && clearInterval(sessaoGTGState.intervalo), sessaoGTGState.intervalo = setInterval(() => {
    try {
      sessaoGTGState.segundosRestantes--;
      if (sessaoGTGState.segundosRestantes < 0) { clearInterval(sessaoGTGState.intervalo); return }
      const min = Math.floor(sessaoGTGState.segundosRestantes / 60),
        sec = sessaoGTGState.segundosRestantes % 60;
      const elap = total - sessaoGTGState.segundosRestantes,
        off = Math.max(0, circum - (elap / total) * circum);
      const cor = sessaoGTGState.segundosRestantes < 10 ? "var(--red-bright)" : sessaoGTGState.segundosRestantes < 30 ? "var(--green-bright)" : "var(--gold)";
      if (fill) { fill.style.transition = "stroke-dashoffset .8s var(--ease-expo)"; fill.style.strokeDashoffset = off; fill.style.stroke = cor }
      if (e) { e.textContent = `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`; e.style.color = cor }
      if (sessaoGTGState.segundosRestantes <= 0) {
        clearInterval(sessaoGTGState.intervalo); sessaoGTGState.intervalo = null; sessaoGTGState.fase = "pronta"; atualizarSessaoUI(); try { somTimer(); } catch(_) {}
        if (fill) { fill.style.transition = "none"; fill.style.strokeDashoffset = circum; fill.style.stroke = "var(--gold)" }
        mostrarToast("⚡ DESCANSO CONCLUÍDO", "Hora da próxima série!", "success")
      }
    } catch(_e) { console.warn("timer tick:", _e) }
  }, 1e3)
}

function concluirSessaoGTG() {
  sessaoGTGState.intervalo && clearInterval(sessaoGTGState.intervalo);
  const fill = document.getElementById("sessionRingFill");
  if (fill) fill.style.transition = "none", fill.style.strokeDashoffset = 502, fill.style.stroke = "var(--green-bright)";
  const card = document.querySelector(".sb-card-session-premium");
  if (card) { card.classList.add("ss-complete"); setTimeout(() => card.classList.remove("ss-complete"), 1800) }
  const e = sessaoGTGState.exercicioNome,
    a = sessaoGTGState.totalSeries;
  mostrarToast("🏆 SESSÃO CONCLUÍDA", `${a} séries de ${e} completadas. Excelente trabalho!`, "success"), _mostrarGTGNeural(), sessaoGTGState = null, resetarPainelSessao()
}

function _gtgSpark() {
  const p = document.createElement("div");
  p.className = "gtg-neural-particle";
  p.style.left = "50vw";
  p.style.top = "50vh";
  p.style.width = p.style.height = "3px";
  p.style.animation = "gtgSignalPulse 0.6s ease-out forwards";
  p.style.background = "var(--gold-light)";
  p.style.boxShadow = "0 0 8px var(--gold-light)";
  document.body.appendChild(p);
  setTimeout(() => { if (p.parentNode) p.remove(); }, 700);
}

function _mostrarGTGNeural() {
  const existing = document.querySelector(".gtg-neural-container");
  if (existing) existing.remove();
  const container = document.createElement("div");
  container.className = "gtg-neural-container";
  document.body.appendChild(container);
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "gtg-neural-particle";
    const x = 10 + Math.random() * 80, y = 10 + Math.random() * 80;
    p.style.left = x + "vw";
    p.style.top = y + "vh";
    p.style.animationDelay = (i * 0.07) + "s";
    p.style.width = p.style.height = (3 + Math.random() * 4) + "px";
    container.appendChild(p);
  }
  for (let i = 0; i < 6; i++) {
    const l = document.createElement("div");
    l.className = "gtg-nerve-line";
    const x = 5 + Math.random() * 90, y = 10 + Math.random() * 80;
    l.style.left = x + "vw";
    l.style.top = y + "vh";
    l.style.width = (30 + Math.random() * 80) + "px";
    l.style.animationDelay = (i * 0.15 + 0.5) + "s";
    l.style.transform = "rotate(" + (Math.random() * 60 - 30) + "deg)";
    container.appendChild(l);
  }
  setTimeout(() => { if (container.parentNode) container.remove(); }, 3000);
}

function pararSessaoGTG() {
  const fill = document.getElementById("sessionRingFill");
  if (fill) fill.style.transition = "none", fill.style.strokeDashoffset = 502, fill.style.stroke = "var(--gold)";
  sessaoGTGState && sessaoGTGState.intervalo && clearInterval(sessaoGTGState.intervalo), sessaoGTGState && sessaoGTGState.seriesFeitas > 0 && mostrarToast("Sessão encerrada", `${sessaoGTGState.seriesFeitas} série(s) registrada(s) antes de encerrar.`, "warning"), sessaoGTGState = null, resetarPainelSessao()
}

function resetarPainelSessao() {
  const fill = document.getElementById("sessionRingFill");
  if (fill) fill.style.transition = "none", fill.style.strokeDashoffset = 502, fill.style.stroke = "var(--gold)";
  const bar = document.getElementById("ssAccentBar");
  if (bar) { bar.style.background = ""; bar.style.setProperty("--ss-pct", "0%"); bar.dataset.ssPct = "0" }
  const e = document.getElementById("sessionSetup"),
    a = document.getElementById("sessionProgress");
  e && (e.style.display = "block"), a && (a.style.display = "none")
}

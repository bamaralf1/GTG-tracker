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
  if (n) n.textContent = pr ? `PR: ${pr} ${s}` : "PR: —";
  r ? (a.textContent = `${r} ${s} por série (${pr ? Math.round(r/pr*100) : 50}% do PR)`, t && !t.value && (t.value = r, t.placeholder = "GTG: " + r)) : a.textContent = "Sem histórico — defina manualmente"
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
  }, document.getElementById("sessionSetup").style.display = "none", document.getElementById("sessionProgress").style.display = "block", renderSessaoDots(), atualizarSessaoUI(), mostrarToast("🔗 SESSÃO INICIADA", `${a.nome} — ${t} séries de ${o} ${sessaoGTGState.unidade}`, "success")
}

function renderSessaoDots() {
  const e = document.getElementById("sessionSeriesDots");
  if (!e || !sessaoGTGState) return;
  e.innerHTML = "";
  for (let a = 0; a < sessaoGTGState.totalSeries; a++) {
    const t = document.createElement("div");
    t.style.cssText = "width:14px;height:14px;border-radius:50%;border:1px solid var(--gold-dim);" + (a < sessaoGTGState.seriesFeitas ? "background:var(--gold);box-shadow:0 0 8px rgba(212,160,23,.6);" : "background:transparent;"), e.appendChild(t)
  }
}

function atualizarSessaoUI() {
  if (!sessaoGTGState) return;
  const e = document.getElementById("sessionProgressTitle"),
    a = document.getElementById("sessionStateLabel"),
    t = document.getElementById("sessionTimerDisplay"),
    o = document.getElementById("sessionActionBtn"),
    n = document.getElementById("sessionProgressLabel"),
    r = document.getElementById("sessionProgressBar");
  const pct = sessaoGTGState.totalSeries > 0 ? (sessaoGTGState.seriesFeitas / sessaoGTGState.totalSeries * 100) : 0;
  e && (e.textContent = `SÉRIE ${Math.min(sessaoGTGState.seriesFeitas+1,sessaoGTGState.totalSeries)} DE ${sessaoGTGState.totalSeries}`);
  n && (n.textContent = `${sessaoGTGState.seriesFeitas} / ${sessaoGTGState.totalSeries}`);
  r && (r.style.width = pct + "%");
  "pronta" === sessaoGTGState.fase ? (a && (a.textContent = "PRONTO"), t && (t.textContent = "▶", t.style.color = "var(--gold)"), o && (o.disabled = !1, o.textContent = "✓ REGISTRAR")) : "descansando" === sessaoGTGState.fase && (a && (a.textContent = "DESCANSO"), o && (o.disabled = !0, o.textContent = "⏳ AGUARDE"))
}

function executarSerieSessao() {
  if (!sessaoGTGState || "pronta" !== sessaoGTGState.fase) return;
  const e = dados.exercicios.find(e => e.id === sessaoGTGState.exercicioId);
  if (!e) return void pararSessaoGTG();
  const a = document.getElementById(`valor-${e.id}`);
  a ? (a.value = sessaoGTGState.valorPorSerie, adicionarSerie(e.id)) : (() => {
    const a = new Date,
      t = {
        id: Date.now() + Math.random().toString(36).slice(2),
        exercicioId: e.id,
        exercicioNome: e.nome,
        valor: sessaoGTGState.valorPorSerie,
        peso: 0,
        data: a.toISOString().slice(0, 10),
        hora: a.toTimeString().slice(0, 5),
        timestamp: a.getTime(),
        xp: calcularXPSerie(e, sessaoGTGState.valorPorSerie, 0),
        rpe: null
      };
    dados.registros.push(t), adicionarXP(t.xp), _gtgSpark(), verificarStreak(), verificarBadges(), salvarDadosDebounced(), atualizarCardExercicio(t.exercicioId), atualizarStats(), renderHistory(), somRegistrar()
  })(), sessaoGTGState.seriesFeitas++, renderSessaoDots(), mostrarToast(`✓ Série ${sessaoGTGState.seriesFeitas}/${sessaoGTGState.totalSeries}`, `${sessaoGTGState.valorPorSerie} ${sessaoGTGState.unidade} registrados`, "success"), sessaoGTGState.seriesFeitas >= sessaoGTGState.totalSeries ? concluirSessaoGTG() : iniciarDescansoSessao()
}

function iniciarDescansoSessao() {
  sessaoGTGState.fase = "descansando", sessaoGTGState.segundosRestantes = sessaoGTGState.descansoSeg, atualizarSessaoUI();
  const e = document.getElementById("sessionTimerDisplay"),
    fill = document.getElementById("sessionRingFill"),
    total = sessaoGTGState.descansoSeg,
    circum = 502;
  if (fill) fill.style.transition = "none";
  sessaoGTGState.intervalo && clearInterval(sessaoGTGState.intervalo), sessaoGTGState.intervalo = setInterval(() => {
    sessaoGTGState.segundosRestantes--;
    const a = Math.floor(sessaoGTGState.segundosRestantes / 60),
      t = sessaoGTGState.segundosRestantes % 60;
    const elap = total - sessaoGTGState.segundosRestantes,
      off = Math.max(0, circum - (elap / total) * circum);
    if (fill && (fill.style.transition = "stroke-dashoffset .8s var(--ease-expo)", fill.style.strokeDashoffset = off, fill.style.stroke = sessaoGTGState.segundosRestantes < 30 ? "var(--green-bright)" : sessaoGTGState.segundosRestantes < 120 ? "var(--gold)" : "var(--gold-dim)"), e && (e.textContent = `${String(a).padStart(2,"0")}:${String(t).padStart(2,"0")}`, e.style.color = sessaoGTGState.segundosRestantes < 30 ? "var(--green-bright)" : "var(--gold)"), sessaoGTGState.segundosRestantes <= 0) {
      clearInterval(sessaoGTGState.intervalo), sessaoGTGState.intervalo = null, sessaoGTGState.fase = "pronta", atualizarSessaoUI(), somTimer();
      if (fill) fill.style.transition = "none", fill.style.strokeDashoffset = circum, fill.style.stroke = "var(--gold)";
      mostrarToast("⚡ DESCANSO CONCLUÍDO", "Hora da próxima série!", "success")
    }
  }, 1e3)
}

function concluirSessaoGTG() {
  sessaoGTGState.intervalo && clearInterval(sessaoGTGState.intervalo);
  const fill = document.getElementById("sessionRingFill");
  if (fill) fill.style.transition = "none", fill.style.strokeDashoffset = 502, fill.style.stroke = "var(--gold)";
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
  const e = document.getElementById("sessionSetup"),
    a = document.getElementById("sessionProgress");
  e && (e.style.display = "block"), a && (a.style.display = "none")
}

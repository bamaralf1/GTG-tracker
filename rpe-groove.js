const grooveState = {}; // {exercicioId: [amp:0-100, ten:0-100, bal:0-100]}

function setGrooveLevel(exId, idx, val) {
  if (!grooveState[exId]) grooveState[exId] = [0, 0, 0];
  const v = Math.min(100, Math.max(0, parseInt(val) || 0));
  grooveState[exId][idx] = v;
  const lvlEl = document.getElementById('groove-lvl-' + exId + '-' + idx);
  if (lvlEl) lvlEl.textContent = v;
  const sliderEl = document.getElementById(GROOVE_SLIDER_PREFIX[idx] + exId);
  if (sliderEl) {
    sliderEl.style.setProperty('--lvl', v);
    const tier = v >= 100 ? 4 : v >= 75 ? 3 : v >= 50 ? 2 : v >= 25 ? 1 : 0;
    tier > 0 ? sliderEl.setAttribute('data-tier', tier) : sliderEl.removeAttribute('data-tier');
  }
  atualizarPreviewGroove(exId);
  const st = grooveState[exId] || [0, 0, 0];
  atualizarGrooveStatus(st[0] + st[1] + st[2]);
}

const PLANK_GROOVE_IDS = ['plank-groove-amp', 'plank-groove-ten', 'plank-groove-bal'];

function setPlankGrooveLevel(idx, val) {
  const v = Math.min(100, Math.max(0, parseInt(val) || 0));
  plankGroove[idx] = v;
  const lvlEl = document.getElementById('plank-glvl-' + idx);
  if (lvlEl) lvlEl.textContent = v;
  const sliderEl = document.getElementById(PLANK_GROOVE_IDS[idx]);
  if (sliderEl) {
    sliderEl.style.setProperty('--lvl', v);
    const tier = v >= 100 ? 4 : v >= 75 ? 3 : v >= 50 ? 2 : v >= 25 ? 1 : 0;
    tier > 0 ? sliderEl.setAttribute('data-tier', tier) : sliderEl.removeAttribute('data-tier');
  }
  const total = plankGroove[0] + plankGroove[1] + plankGroove[2];
  const pct = Math.round(total / 10);
  const bonusEl = document.getElementById('plank-groove-bonus');
  if (bonusEl) {
    bonusEl.textContent = total >= 300 ? '+30% ★' : '+' + pct + '%';
    bonusEl.classList.toggle('perfeito', total >= 300);
  }
  atualizarGrooveStatus(total);
  try {
    if (typeof tocarTom === 'function') tocarTom(220 + 80 * (plankGroove.filter(v => v > 0).length), .04, 'square', .06);
  } catch(e) {}
}

function atualizarPreviewGroove(exId) {
  const st = grooveState[exId] || [0, 0, 0];
  const total = st[0] + st[1] + st[2];
  const pct = Math.round(total / 10);
  const bonusEl = document.getElementById('groove-bonus-preview-' + exId);
  if (bonusEl) {
    const valEl = bonusEl.querySelector('.bonus-val');
    if (valEl) valEl.textContent = (total >= 300 ? '+30% ★' : ('+' + pct + '%'));
    bonusEl.classList.toggle('perfeito', total >= 300);
  }
}

function atualizarGrooveStatus(total) {
  const el = document.getElementById('grooveStatus');
  const scoreEl = document.getElementById('grooveStatusScore');
  const ringEl = document.getElementById('grooveStatusRingFill');
  const ringContainer = document.querySelector('.groove-status-ring');
  if (!el || !scoreEl) return;
  const pct = Math.min(100, Math.round(total / 3));
  scoreEl.textContent = pct + '%';
  el.className = 'groove-status';
  if (total >= 300) el.classList.add('score-perfect');
  else if (total >= 200) el.classList.add('score-high');
  else if (total >= 100) el.classList.add('score-mid');
  else if (total > 0) el.classList.add('score-low');
  if (ringEl) {
    const prevActive = ringEl.classList.contains('active');
    const deg = total >= 300 ? 360 : Math.round(total / 300 * 360);
    ringEl.style.transform = 'rotate(-90deg) rotate(' + deg + 'deg)';
    ringEl.classList.toggle('active', total > 0);
    if (ringContainer) ringContainer.classList.toggle('active', total > 0);
    if (!prevActive && total > 0) {
      ringEl.classList.remove('bump');
      void ringEl.offsetWidth;
      ringEl.classList.add('bump');
    }
  }
}

function renderQualityIcons(groove) {
  if (!Array.isArray(groove)) return '<span class="log-quality empty" title="Série sem dados de Groove">—</span>';
  const lvl = groove.map(v => Math.min(100, Math.max(0, parseInt(v) || 0)));
  const total = lvl[0] + lvl[1] + lvl[2];
  const icons = ['⭐', '⚡', '✓'];
  let html = '<span class="log-quality' + (total >= 300 ? ' perfeito' : '') + '" title="A:' + lvl[0] + '% T:' + lvl[1] + '% S/B:' + lvl[2] + '%">';
  for (let i = 0; i < 3; i++) html += '<span class="qi ' + (lvl[i] >= 50 ? 'on' : (lvl[i] > 0 ? 'half' : '')) + '">' + icons[i] + '</span>';
  html += '</span>';
  return html;
}

function renderQualityClass(groove) {
  if (!Array.isArray(groove)) return 'empty';
  const lvl = groove.map(v => Math.min(100, Math.max(0, parseInt(v) || 0)));
  return (lvl[0] + lvl[1] + lvl[2]) >= 300 ? 'perfeito' : '';
}

function calcularQualityMedia(exId) {
  const regs = dados.registros.filter(e => e.exercicioId === exId && Array.isArray(e.groove));
  if (regs.length === 0) return 0;
  const sum = regs.reduce((acc, r) => {
    const lvl = r.groove.map(v => Math.min(100, Math.max(0, parseInt(v) || 0)));
    return acc + ((lvl[0] + lvl[1] + lvl[2]) / 300);
  }, 0);
  return Math.round((sum / regs.length) * 100);
}

function atualizarQualityBadges() {
  dados.exercicios.forEach(ex => {
    const wrap = document.getElementById('qbadge-wrap-' + ex.id);
    if (!wrap) return;
    const regs = dados.registros.filter(r => r.exercicioId === ex.id && Array.isArray(r.groove));
    if (regs.length === 0) {
      wrap.innerHTML = '';
      return
    }
    const pct = calcularQualityMedia(ex.id);
    const perfeitos = regs.filter(r => Array.isArray(r.groove) && r.groove.filter(Boolean).length === 3).length;
    let tier = 'baixa';
    if (pct >= 80) tier = 'alta';
    else if (pct >= 50) tier = 'media';
    const star = pct >= 80 ? '⭐' : pct >= 50 ? '✓' : '·';
    let html = '<span class="quality-badge" data-tier="' + tier + '" title="' + regs.length + ' séries avaliadas · ' + perfeitos + ' perfeitas"><span class="q-star">' + star + '</span><span>Q:</span><span class="q-val">' + pct + '%</span></span>';
    if (perfeitos > 0) html += '<span class="perfeito-stamp" title="' + perfeitos + ' séries perfeitas (3/3)">★ ×' + perfeitos + '</span>';
    wrap.innerHTML = html;
  });
}

function toggleFiltroPerfeitas(el) {
  filtroPerfeitas = !filtroPerfeitas;
  el.classList.toggle('active', filtroPerfeitas);
  renderGraficos();
  mostrarToast(
    filtroPerfeitas ? '★ Filtro Ativado' : 'Filtro Desativado',
    filtroPerfeitas ? 'Mostrando apenas séries perfeitas (3/3)' : 'Mostrando todas as séries',
    filtroPerfeitas ? 'success' : 'info'
  );
}

let rpeSelecionado = {};

function selecionarRPE(exId, val) {
  rpeSelecionado[exId] = val;
  var scale = document.getElementById("rpe-scale-" + exId);
  if (scale) {
    scale.querySelectorAll(".rpe-btn").forEach(function(b) { b.classList.remove("selected"); });
    var btns = scale.querySelectorAll(".rpe-btn");
    if (btns[val - 1]) btns[val - 1].classList.add("selected");
  }
}

function getRPEColorClass(e) {
  return e ? e <= 4 ? "rpe-low" : e <= 6 ? "rpe-mid" : e <= 8 ? "rpe-high" : "rpe-max" : ""
}

function calcularRPEMedio(e, a) {
  const t = dados.registros.filter(t => t.exercicioId === e && t.data === a && t.rpe);
  return 0 === t.length ? null : (t.reduce((e, a) => e + a.rpe, 0) / t.length).toFixed(1)
}

function calcularPR2(e) {
  return calcularPR(e);
}

function calcularSugestaoGTG(e, a) {
  if (!e || e <= 0) return null;
  return Math.max(1, Math.round(.5 * e))
}

function atualizarSugestoesGTG() {
  dados.exercicios.forEach(e => {
    const a = calcularPR2(e),
      t = calcularSugestaoGTG(a, e.tipo),
      o = document.getElementById("gtg-val-" + e.id);
    o && (t ? (o.textContent = "GTG: " + t, o.parentElement.style.display = "inline-flex") : o.textContent = "GTG: --");
    const r = document.getElementById("tooltip-pr-" + e.id);
    r && (r.textContent = a);
    const s = document.getElementById("pr-display-" + e.id);
    if (s) {
      const t = "tempo" === e.tipo ? "seg" : e.unidade || "reps";
      s.textContent = a + " " + t
    }
    const n = document.getElementById("valor-" + e.id);
    n && t && !n.value && !n.placeholder.startsWith("GTG") && (n.placeholder = "GTG: " + t)
  })
}

function aplicarSugestaoGTG(e, a) {
  a.stopPropagation();
  const t = dados.exercicios.find(a => a.id === e);
  if (!t) return;
  const o = calcularSugestaoGTG(calcularPR2(t), t.tipo);
  if (!o) return void mostrarToast("Sem dados", 'Faça séries primeiro ou use "Testar Máximo"', "warning");
  const r = document.getElementById("valor-" + e);
  r && (r.value = o, r.focus(), mostrarToast("💡 Sugestão aplicada", t.nome + ": " + o + " " + ("tempo" === t.tipo ? "seg" : "reps"), "success"))
}

let testMaxExercicioId = null;

function abrirTesteMaximo(e) {
  const a = dados.exercicios.find(a => a.id === e);
  a && (testMaxExercicioId = e, document.getElementById("testMaxTitle").textContent = "🎯 TESTAR MÁXIMO — " + a.nome, document.getElementById("testMaxExercise").textContent = a.nome, document.getElementById("testMaxInput").value = "", document.getElementById("testMaxModal").classList.add("active"))
}

function confirmarTesteMaximo() {
  if (!testMaxExercicioId) return;
  const e = document.getElementById("testMaxInput"),
    a = parseInt(e.value);
  if (!a || a < 1) return void mostrarToast("Erro", "Insira um valor válido", "error");
  const t = dados.exercicios.find(e => e.id === testMaxExercicioId);
  if (!t) return;
  const o = new Date,
    r = {
      id: "test_" + Date.now(),
      exercicioId: testMaxExercicioId,
      exercicioNome: t.nome,
      valor: a,
      peso: 0,
      data: o.toISOString().slice(0, 10),
      hora: o.toTimeString().slice(0, 5),
      timestamp: o.getTime(),
      xp: 0,
      rpe: null,
      isTest: !0
    };
  dados.registros.push(r), salvarDados(), atualizarSugestoesGTG(), closeModal("testMaxModal"), mostrarToast("✓ Máximo registrado", t.nome + ": " + a + " " + ("tempo" === t.tipo ? "seg" : "reps") + ". Sugestão GTG atualizada!", "success"), testMaxExercicioId = null
}


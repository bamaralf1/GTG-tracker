let readinessData = {
  sono: 5,
  stress: 5,
  dor: 5,
  energia: 5,
  hidratacao: 5,
  alimentacao: 5,
  motivacao: 5,
  score: 50,
  data: null
};
let _prevReadinessScore = 50;
let _readinessAnimFrame = null;
let _readinessRafPending = false;
let _isDragging = false;
const READINESS_KEY = "gtg_readiness";

const _rdCache = {};

/* === Pesos de prioridade por fator ===
 * Cada fator cicla entre BAIXA (0.7x), NORMAL (1x) e ALTA (1.5x) prioridade,
 * permitindo personalizar quanto cada um pesa na nota final de prontidão. */
const READINESS_FACTOR_KEYS = ["sono", "stress", "dor", "energia", "hidratacao", "alimentacao", "motivacao"];
const PRIORITY_LEVELS = [
  { valor: 0.7, nivel: "baixa", label: "0.7×" },
  { valor: 1, nivel: "normal", label: "1×" },
  { valor: 1.5, nivel: "alta", label: "1.5×" }
];
let readinessWeights = { sono: 1, stress: 1, dor: 1, energia: 1, hidratacao: 1, alimentacao: 1, motivacao: 1 };

async function carregarPesosReadiness() {
  try {
    const salvo = await getItem(READINESS_WEIGHTS_KEY);
    if (salvo) Object.assign(readinessWeights, JSON.parse(salvo));
  } catch (e) {
    console.error("Erro ao carregar pesos de prontidão:", e);
  }
  READINESS_FACTOR_KEYS.forEach(atualizarChipPrioridade);
}

async function salvarPesosReadiness() {
  try {
    await setItem(READINESS_WEIGHTS_KEY, JSON.stringify(readinessWeights));
  } catch (e) {
    console.error("Erro ao salvar pesos de prontidão:", e);
  }
}

function atualizarChipPrioridade(fator) {
  const idMap = { sono: "prioSono", stress: "prioStress", dor: "prioDor", energia: "prioEnergia", hidratacao: "prioHidratacao", alimentacao: "prioAlimentacao", motivacao: "prioMotivacao" };
  const chip = document.getElementById(idMap[fator]);
  if (!chip) return;
  const atual = readinessWeights[fator] ?? 1;
  const info = PRIORITY_LEVELS.find(p => p.valor === atual) || PRIORITY_LEVELS[1];
  chip.textContent = info.label;
  chip.setAttribute("data-lvl", info.nivel);
  chip.title = "Prioridade: " + info.nivel.toUpperCase() + " — clique para alternar (afeta o cálculo da nota final)";
}

async function cyclePriority(fator) {
  const atual = readinessWeights[fator] ?? 1;
  const idxAtual = PRIORITY_LEVELS.findIndex(p => p.valor === atual);
  const prox = PRIORITY_LEVELS[(idxAtual + 1) % PRIORITY_LEVELS.length];
  readinessWeights[fator] = prox.valor;
  atualizarChipPrioridade(fator);
  await salvarPesosReadiness();
  readinessData.score = calcularReadiness(readinessData.sono, readinessData.stress, readinessData.dor, readinessData.energia, readinessData.hidratacao, readinessData.alimentacao, readinessData.motivacao);
  salvarReadiness();
  await updateReadinessUI();
  const chip = document.getElementById({ sono: "prioSono", stress: "prioStress", dor: "prioDor", energia: "prioEnergia", hidratacao: "prioHidratacao", alimentacao: "prioAlimentacao", motivacao: "prioMotivacao" }[fator]);
  if (chip) { chip.style.transform = "scale(1.25)"; setTimeout(() => { chip.style.transform = ""; }, 200); }
}

async function carregarReadiness() {
  await carregarPesosReadiness();
  try {
    const e = await getItem(READINESS_KEY);
    if (e) {
      const a = JSON.parse(e),
        t = (new Date).toISOString().slice(0, 10);
      if (a.data === t) {
        readinessData = a;
        document.getElementById("sliderSono").value = readinessData.sono;
        document.getElementById("sliderStress").value = readinessData.stress;
        document.getElementById("sliderDor").value = readinessData.dor;
        document.getElementById("sliderEnergia").value = readinessData.energia ?? 5;
        document.getElementById("sliderHidratacao").value = readinessData.hidratacao ?? 5;
        document.getElementById("sliderAlimentacao").value = readinessData.alimentacao ?? 5;
        document.getElementById("sliderMotivacao").value = readinessData.motivacao ?? 5;
      } else resetReadinessData()
    }
  } catch (e) {
    console.error("Erro ao carregar readiness:", e)
  }
  _prevReadinessScore = readinessData.score;
  await updateReadinessUI()
}

function salvarReadiness() {
  try {
    readinessData.data = (new Date).toISOString().slice(0, 10), setItem(READINESS_KEY, JSON.stringify(readinessData)).catch(e => console.warn("[storage]", e))
  } catch (e) {
    console.error("Erro ao salvar readiness:", e)
  }
}

function resetReadinessData() {
  readinessData = { sono: 5, stress: 5, dor: 5, energia: 5, hidratacao: 5, alimentacao: 5, motivacao: 5, score: 50, data: null };
  _prevReadinessScore = 50;
  Object.keys(_rdCache).forEach(k => delete _rdCache[k]);
  ["sliderSono","sliderStress","sliderDor","sliderEnergia","sliderHidratacao","sliderAlimentacao","sliderMotivacao"].forEach(id => { document.getElementById(id).value = 5; });
  salvarReadiness()
}

async function resetReadiness() {
  resetReadinessData(), await updateReadinessUI(), mostrarToast("🔄 Resetado", "Estado de Prontidão resetado para padrão.", "success")
}

function calcularReadiness(sono, stress, dor, energia, hidratacao, alimentacao, motivacao) {
  const w = readinessWeights;
  const normalizados = {
    sono: sono, stress: 10 - stress, dor: 10 - dor, energia: energia,
    hidratacao: hidratacao, alimentacao: alimentacao, motivacao: motivacao
  };
  let somaPts = 0, somaPesos = 0;
  READINESS_FACTOR_KEYS.forEach(k => {
    const peso = w[k] ?? 1;
    somaPts += normalizados[k] * 10 * peso;
    somaPesos += peso;
  });
  const pts = somaPts / (somaPesos || 1);
  return Math.max(0, Math.min(100, Math.round(pts)))
}

function getReadinessConfig(e) {
  return e >= 80 ? {
    classe: "readiness-green",
    classeHeader: "",
    label: "PRONTO",
    mode: "PICO DE PRONTIDÃO",
    summary: "Treino denso, foco em força e execução limpa.",
    series: "15-20 séries",
    focus: "força + densidade",
    sugestao: "<strong>Dia de guerra.</strong> Aproveite o pico.",
    corScore: "var(--green-bright)"
  } : e >= 60 ? {
    classe: "readiness-yellow",
    classeHeader: "readiness-yellow-h",
    label: "MODERADO",
    mode: "TREINO NORMAL",
    summary: "Volume controlado. Mantenha técnica e recuperação.",
    series: "8-12 séries",
    focus: "técnica + volume",
    sugestao: "<strong>Volume normal.</strong> Foque na técnica.",
    corScore: "var(--accent-yellow)"
  } : e >= 40 ? {
    classe: "readiness-orange",
    classeHeader: "readiness-orange-h",
    label: "CUIDADO",
    mode: "AJUSTE DE INTENSIDADE",
    summary: "Reduza o volume e priorize qualidade em vez de impulso.",
    series: "4-7 séries",
    focus: "qualidade + descanso",
    sugestao: "<strong>Reduza séries em 25%.</strong> Mantenha qualidade.",
    corScore: "var(--accent-orange)"
  } : {
    classe: "readiness-red",
    classeHeader: "readiness-red-h",
    label: "DESCANSAR",
    mode: "DESCANSO ATIVO",
    summary: "Hoje não é para empurrar. Recuperação e mobilidade primeiro.",
    series: "0-3 séries",
    focus: "mobilidade + recuperação",
    sugestao: "<strong>Pavel diz:</strong> hoje é dia de descanso ativo.",
    corScore: "var(--accent-red-bright)"
  }
}

async function updateReadiness() {
  const sono = Math.round(parseFloat(document.getElementById("sliderSono").value));
  const stress = Math.round(parseFloat(document.getElementById("sliderStress").value));
  const dor = Math.round(parseFloat(document.getElementById("sliderDor").value));
  const energia = Math.round(parseFloat(document.getElementById("sliderEnergia").value));
  const hidratacao = Math.round(parseFloat(document.getElementById("sliderHidratacao").value));
  const alimentacao = Math.round(parseFloat(document.getElementById("sliderAlimentacao").value));
  const motivacao = Math.round(parseFloat(document.getElementById("sliderMotivacao").value));
  readinessData.sono = sono;
  readinessData.stress = stress;
  readinessData.dor = dor;
  readinessData.energia = energia;
  readinessData.hidratacao = hidratacao;
  readinessData.alimentacao = alimentacao;
  readinessData.motivacao = motivacao;
  readinessData.score = calcularReadiness(sono, stress, dor, energia, hidratacao, alimentacao, motivacao);
  if (_isDragging) {
    salvarReadiness();
    await updateReadinessUI();
  } else if (!_readinessRafPending) {
    _readinessRafPending = true;
    requestAnimationFrame(() => {
      _readinessRafPending = false;
      salvarReadiness();
      (async () => { await updateReadinessUI(); })().catch(e => console.warn("[storage]", e));
    });
  }
  try { if (typeof atualizarCheckinBanner === "function") atualizarCheckinBanner(); } catch(_) {}
}

function getZonaSlider(valor, invertido) {
  const pos = invertido ? 10 - valor : valor;
  return pos >= 8 ? "green" : pos >= 6 ? "yellow" : pos >= 4 ? "orange" : "red";
}

function _cacheReadinessDOM() {
  if (_rdCache._ready) return;
  _rdCache.fills = ["fillSono","fillStress","fillDor","fillEnergia","fillHidratacao","fillAlimentacao","fillMotivacao"].map(id => document.getElementById(id));
  _rdCache.vals = ["valSono","valStress","valDor","valEnergia","valHidratacao","valAlimentacao","valMotivacao"].map(id => document.getElementById(id));
  _rdCache.tracks = ["trackSono","trackStress","trackDor","trackEnergia","trackHidratacao","trackAlimentacao","trackMotivacao"].map(id => document.getElementById(id));
  _rdCache.circle = document.getElementById("readinessCircle");
  _rdCache.score = document.getElementById("readinessScore");
  _rdCache.label = document.getElementById("readinessLabel");
  _rdCache.suggestion = document.getElementById("readinessSuggestion");
  _rdCache.ring = document.getElementById("readinessRingFill");
  _rdCache.dir = document.getElementById("readinessDirection");
  _rdCache.sub = document.getElementById("readinessSub");
  _rdCache.header = document.getElementById("headerReadiness");
  _rdCache.headerScore = document.getElementById("headerReadinessScore");
  _rdCache._ready = true;
}

async function updateReadinessUI() {
  _cacheReadinessDOM();
  READINESS_FACTOR_KEYS.forEach(atualizarChipPrioridade);
  const c = _rdCache;
  const sono = readinessData.sono;
  const stress = readinessData.stress;
  const dor = readinessData.dor;
  const energia = readinessData.energia ?? 5;
  const hidratacao = readinessData.hidratacao ?? 5;
  const alimentacao = readinessData.alimentacao ?? 5;
  const motivacao = readinessData.motivacao ?? 5;
  const o = readinessData.score;
  const dragging = _isDragging;
  const vals = [sono, stress, dor, energia, hidratacao, alimentacao, motivacao];

  // Fill widths + values + zones — batched
  for (let j = 0; j < 7; j++) {
    const track = c.tracks[j];
    const input = track.querySelector(".readiness-slider-input");
    const rawVal = input ? parseFloat(input.value) : vals[j];
    const zone = getZonaSlider(rawVal, j === 1 || j === 2);
    track.setAttribute("data-zone", zone);
    const trackW = track.getBoundingClientRect().width;
    const fillPx = rawVal <= 0 ? 0 : ((rawVal / 10) * (trackW - 14) + 6);
    c.fills[j].style.width = Math.max(0, fillPx) + "px";
    const el = c.vals[j];
    const newVal = String(vals[j]);
    if (el.textContent !== newVal) el.textContent = newVal;
  }

  const r = getReadinessConfig(o);

  // Circle — instant class swap
  if (c.circle.className.indexOf(r.classe) === -1) {
    c.circle.classList.remove("readiness-green", "readiness-yellow", "readiness-orange", "readiness-red");
    c.circle.classList.add(r.classe);
  }
  c.label.textContent = r.label;
  c.sub.style.color = r.corScore;
  c.suggestion.innerHTML = r.sugestao;
  c.suggestion.style.borderLeftColor = r.corScore;
  _renderReadinessDecision(r);

  if (c.header && c.headerScore) {
    c.header.classList.remove("readiness-yellow-h", "readiness-orange-h", "readiness-red-h");
    if (r.classeHeader) c.header.classList.add(r.classeHeader);
    c.headerScore.textContent = o;
    c.headerScore.style.color = r.corScore;
  }

  // Ring — instant
  c.ring.style.strokeDashoffset = 263.89 - (o / 100) * 263.89;

  // Score — instant during drag
  if (dragging) {
    c.score.textContent = o;
    _prevReadinessScore = o;
    _renderReadinessInsight();
    _renderReadinessCorrelation();
  } else {
    // Release: effects
    const prevScore = _prevReadinessScore;
    const diff = o - prevScore;
    if (diff !== 0) {
      c.dir.className = diff > 0 ? "readiness-direction up" : "readiness-direction down";
      c.dir.textContent = diff > 0 ? "▲ +" + diff : "▼ " + diff;
      c.circle.classList.remove("flash-red", "flash-green");
      void c.circle.offsetWidth;
      c.circle.classList.add(diff > 0 ? "flash-green" : "flash-red");
      _spawnParticles(c.circle, diff > 0 ? "var(--green-bright)" : "var(--accent-red-bright)");
    } else {
      c.dir.className = "readiness-direction same";
      c.dir.textContent = "";
    }
    _prevReadinessScore = o;

    if (_readinessAnimFrame) cancelAnimationFrame(_readinessAnimFrame);
    _readinessAnimFrame = requestAnimationFrame(() => {
      _animateScore(c.score, parseInt(c.score.textContent) || 0, o, 180);
      c.score.classList.remove("pop");
      void c.score.offsetWidth;
      c.score.classList.add("pop");
      (async () => {
        await _renderReadinessPrev();
        await _renderReadinessHistory();
        await _renderReadinessTrendChart();
      })().catch(e => console.warn("[storage]", e));
      _renderReadinessRec();
      _renderReadinessInsight();
      _renderReadinessCorrelation();
    });
    setTimeout(() => { c.circle.classList.remove("flash-green", "flash-red"); }, 700);
  }
  _saveReadinessHistory().catch(e => console.warn("[storage]", e));
  _atualizarReadinessTooltips();
}

function _atualizarReadinessTooltips() {
  const fatorLabels = { sono: "Sono", stress: "Stress", dor: "Dor", energia: "Energia", hidratacao: "Hidratação", alimentacao: "Alimentação", motivacao: "Motivação" };
  const fatorEmojis = { sono: "😴", stress: "😰", dor: "💥", energia: "⚡", hidratacao: "💧", alimentacao: "🍽️", motivacao: "🧠" };
  const invertidos = { stress: true, dor: true };
  READINESS_FACTOR_KEYS.forEach(k => {
    const raw = readinessData[k] ?? 5;
    const invertido = invertidos[k];
    const normalizado = invertido ? 10 - raw : raw;
    const peso = readinessWeights[k] ?? 1;
    const contrib = (normalizado * 10 * peso) / (Object.values(readinessWeights).reduce((a, b) => a + b, 0) || 1);
    const emoji = fatorEmojis[k] || "";
    const nome = fatorLabels[k] || k;
    const labelPeso = peso === 0.7 ? "baixa" : peso === 1.5 ? "alta" : "normal";
    const zone = getZonaSlider(raw, invertido);
    const status = zone === "green" ? "✅" : zone === "yellow" ? "⚠️" : zone === "orange" ? "⚠️" : "🔴";
    const invertStr = invertido ? ` (invertido: ${raw}→${normalizado}/10)` : "";
    const detail = `${emoji} ${nome}: ${raw}/10${invertStr}\nPeso: ${peso}× (${labelPeso}) · Contribuição: ${contrib.toFixed(1)} pts\nStatus: ${status}`;
    const idMap = { sono: "valSono", stress: "valStress", dor: "valDor", energia: "valEnergia", hidratacao: "valHidratacao", alimentacao: "valAlimentacao", motivacao: "valMotivacao" };
    const valEl = document.getElementById(idMap[k]);
    if (valEl) {
      const label = valEl.closest(".readiness-slider-label");
      if (label) {
        const nameSpan = label.querySelector(".readiness-slider-name");
        if (nameSpan) nameSpan.setAttribute("data-detail", detail);
      }
    }
  });
}

function _renderReadinessDecision(config) {
  const pill = document.getElementById("readinessModePill");
  const summary = document.getElementById("readinessSummaryText");
  const series = document.getElementById("readinessSeriesChip");
  const focus = document.getElementById("readinessFocusChip");
  const strip = document.getElementById("readinessFactorStrip");
  if (pill) {
    pill.textContent = config.mode || "TREINO NORMAL";
    pill.className = "readiness-summary-pill " + (config.classe || "readiness-yellow");
  }
  if (summary) summary.textContent = config.summary || "";
  if (series) series.textContent = "META: " + (config.series || "8-12 séries");
  if (focus) focus.textContent = "FOCO: " + (config.focus || "técnica + volume");
  if (strip) {
    const topFactors = READINESS_FACTOR_KEYS.map(key => {
      const value = readinessData[key] ?? 5;
      const normalized = key === "stress" || key === "dor" ? 10 - value : value;
      const tone = normalized >= 7 ? "good" : normalized >= 4 ? "watch" : "critical";
      const labelMap = { sono: "Sono", stress: "Stress", dor: "Dor", energia: "Energia", hidratacao: "Hidratação", alimentacao: "Alimentação", motivacao: "Motivação" };
      return { key, label: labelMap[key] || key, value, normalized, tone };
    }).sort((a, b) => a.normalized - b.normalized).slice(0, 3);
    strip.innerHTML = topFactors.map(f => `
      <div class="readiness-factor-chip ${f.tone}">
        <span class="readiness-factor-chip-name">${f.label}</span>
        <span class="readiness-factor-chip-value">${f.value}/10</span>
      </div>`).join("");
  }
}

function _animateScore(el, from, to, duration) {
  if (_readinessAnimFrame) cancelAnimationFrame(_readinessAnimFrame);
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(from + (to - from) * eased);
    el.textContent = current;
    if (progress < 1) _readinessAnimFrame = requestAnimationFrame(tick);
  }
  _readinessAnimFrame = requestAnimationFrame(tick);
}

async function _renderReadinessPrev() {
  const el = document.getElementById("readinessPrev");
  if (!el) return;
  const today = (new Date).toISOString().slice(0, 10);
  const history = JSON.parse(await getItem("gtg_readiness_history") || "{}");
  let prevDate = null;
  for (let i = 1; i <= 7; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (history[key]) { prevDate = key; break; }
  }
  if (!prevDate || !history[prevDate]) { el.textContent = ""; el.className = "readiness-prev"; return; }
  const prevScore = history[prevDate].score;
  const curr = readinessData.score;
  const diff = curr - prevScore;
  if (diff > 0) { el.textContent = "Ontem: " + prevScore + " ▲+" + diff; el.className = "readiness-prev up"; }
  else if (diff < 0) { el.textContent = "Ontem: " + prevScore + " ▼" + diff; el.className = "readiness-prev down"; }
  else { el.textContent = "Ontem: " + prevScore + " — igual"; el.className = "readiness-prev same"; }
}

async function _renderReadinessHistory() {
  const el = document.getElementById("readinessHistory");
  if (!el) return;
  const history = JSON.parse(await getItem("gtg_readiness_history") || "{}");
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = ["D","S","T","Q","Q","S","S"][d.getDay()];
    days.push({ key, score: history[key] ? history[key].score : null, label, isToday: i === 0 });
  }
  let html = "";
  days.forEach(day => {
    if (day.score !== null) {
      const h = Math.max(4, day.score * 0.24);
      const cls = day.isToday ? "readiness-history-bar today" : "readiness-history-bar";
      let bg = "var(--green-bright)";
      if (day.score < 40) bg = "var(--accent-red-bright)";
      else if (day.score < 60) bg = "var(--accent-orange)";
      else if (day.score < 80) bg = "var(--accent-yellow)";
      html += '<div style="display:flex;flex-direction:column;align-items:center;gap:1px"><div class="' + cls + '" style="height:' + h + 'px;background:' + bg + ';color:' + bg + '" title="' + day.score + '"></div><div class="readiness-history-label">' + day.label + '</div></div>';
    } else {
      html += '<div style="display:flex;flex-direction:column;align-items:center;gap:1px"><div class="readiness-history-bar" style="height:2px;background:rgba(255,255,255,0.1)"></div><div class="readiness-history-label">' + day.label + '</div></div>';
    }
  });
  el.innerHTML = html;
}

async function _saveReadinessHistory() {
  const history = JSON.parse(await getItem("gtg_readiness_history") || "{}");
  const today = (new Date).toISOString().slice(0, 10);
  history[today] = { score: readinessData.score, data: readinessData };
  const keys = Object.keys(history).sort().slice(-14);
  const trimmed = {};
  keys.forEach(k => trimmed[k] = history[k]);
  await setItem("gtg_readiness_history", JSON.stringify(trimmed));
}

function _renderReadinessRec() {
  const el = document.getElementById("readinessRec");
  if (!el) return;
  const s = readinessData.score;
  let rec = "";
  if (s >= 80) rec = '<strong>⚡ PICO</strong> — GTG pesado: 15-20 séries no dia';
  else if (s >= 60) rec = '<strong>✓ NORMAL</strong> — GTG padrão: 8-12 séries no dia';
  else if (s >= 40) rec = '<strong>⚠ REDUZIDO</strong> — Metade das séries. Foco em qualidade';
  else rec = '<strong>🛑 DESCANSO</strong> — Sem treino pesado. Alongamento leve';
  el.innerHTML = rec;
}

const READINESS_FACTOR_INFO = {
  sono: { label: "Sono", icon: "😴", tip: "priorize dormir mais e mais cedo hoje — é a base da recuperação neural." },
  stress: { label: "Stress", icon: "😰", tip: "uma respiração de 2min antes de treinar pode baixar o stress percebido." },
  dor: { label: "Dor Muscular", icon: "💥", tip: "priorize mobilidade leve hoje e evite levar séries à falha." },
  energia: { label: "Energia", icon: "⚡", tip: "considere treinar mais tarde ou reduzir a intensidade das séries." },
  hidratacao: { label: "Hidratação", icon: "💧", tip: "beba água antes da próxima série — desidratação reduz força em até 10%." },
  alimentacao: { label: "Alimentação", icon: "🍽️", tip: "uma refeição leve 60-90min antes melhora bastante o desempenho." },
  motivacao: { label: "Motivação", icon: "🧠", tip: "comece com 1 série fácil só para destravar — a motivação vem depois da ação." }
};

function _renderReadinessInsight() {
  const el = document.getElementById("readinessInsight");
  if (!el) return;
  const d = readinessData;
  const normalizados = {
    sono: d.sono, stress: 10 - d.stress, dor: 10 - d.dor, energia: d.energia,
    hidratacao: d.hidratacao, alimentacao: d.alimentacao, motivacao: d.motivacao
  };
  const fatores = READINESS_FACTOR_KEYS.map(k => {
    const peso = readinessWeights[k] ?? 1;
    const norm = normalizados[k];
    return { key: k, norm, peso, drag: peso * (10 - norm) };
  }).sort((a, b) => b.drag - a.drag);
  const pior = fatores[0];
  if (!pior || pior.drag <= 6) {
    el.innerHTML = '<span class="readiness-insight-icon">✅</span><span><strong>Equilíbrio total.</strong> Nenhum fator específico está te atrapalhando hoje.</span>';
    el.style.borderLeftColor = "var(--green-bright)";
    el.classList.remove("warn");
    return;
  }
  const info = READINESS_FACTOR_INFO[pior.key];
  const val = pior.norm;
  let extra;
  if (val <= 2) extra = 'crítico — ' + info.tip.split('.')[0] + ' agora.';
  else if (val <= 4) extra = info.tip;
  else if (val <= 6) extra = 'já está na metade do caminho — ' + info.tip.split(' — ').pop() || 'um pouco mais de atenção hoje já resolve.';
  else extra = 'quase ok — só não deixe cair mais. ' + info.tip.split(' — ').pop() || 'mantenha o que está fazendo.';
  el.innerHTML = '<span class="readiness-insight-icon">' + info.icon + '</span><span><strong>' + info.label + ' (' + val.toFixed(0) + '/10)</strong> está puxando sua nota para baixo — ' + extra + '</span>';
  el.style.borderLeftColor = val <= 3 ? "var(--accent-red-bright)" : pior.drag > 12 ? "var(--accent-orange)" : "var(--gold)";
  el.classList.add("warn");
}

function getReadinessRange(score) {
  if (score >= 80) return [15, 20];
  if (score >= 60) return [8, 12];
  if (score >= 40) return [4, 7];
  return [0, 3];
}

function _renderReadinessCorrelation() {
  const el = document.getElementById("readinessCorrelation");
  if (!el) return;
  const hoje = (new Date).toISOString().slice(0, 10);
  const feitas = (typeof dados !== "undefined" && dados.registros) ? dados.registros.filter(r => r.data === hoje).length : 0;
  const [min, max] = getReadinessRange(readinessData.score);
  const meio = Math.round((min + max) / 2);
  el.classList.remove("match", "under", "over", "pending", "low-match", "high-match");
  if (feitas === 0) {
    el.innerHTML = '<span class="readiness-corr-icon">◌</span>Nenhuma série hoje ainda — meta: <strong>' + min + '-' + max + '</strong> séries. Comece com 1 só para quebrar a inércia.';
    el.classList.add("pending");
    return;
  }
  let statusTxt, cls;
  if (feitas < min) {
    const diff = min - feitas;
    statusTxt = diff === 1 ? "▼ FALTAPOUCO — Mais " + diff + " série e você entra na zona" : "▼ ABAIXO — Faltam " + diff + " séries para a zona ideal";
    cls = "under";
  } else if (feitas > max) {
    const diff = feitas - max;
    statusTxt = diff <= 2 ? "▲ LEVEMENTE acima — " + diff + " série" + (diff > 1 ? "s" : "") + " a mais que o recomendado" : "▲ ACIMA — " + diff + " séries além da meta. Cuidado com fadiga acumulada";
    cls = "over";
  } else if (feitas <= meio - 1) {
    statusTxt = "▸ LIMITE INFERIOR — no piso da zona, pode aumentar se sentir bem";
    cls = "low-match";
  } else if (feitas >= meio + 1) {
    statusTxt = "▸ LIMITE SUPERIOR — quase no teto da zona, excelente disciplina";
    cls = "high-match";
  } else {
    statusTxt = "✓ CONDIÇÃO CENTRAL — no meio exato da zona ideal. Perfeito.";
    cls = "match";
  }
  el.innerHTML = '<span class="readiness-corr-icon">📊</span><strong>' + feitas + '</strong> séries hoje (' + min + '-' + max + ' esperado) — ' + statusTxt;
  el.classList.add(cls);
}

let _readinessTrendChart = null;

function toggleReadinessTrend() {
  const panel = document.getElementById("readinessTrendPanel");
  const btn = document.getElementById("btnReadinessTrend");
  if (!panel) return;
  const abrindo = !panel.classList.contains("open");
  panel.classList.toggle("open", abrindo);
  btn && btn.classList.toggle("active", abrindo);
  if (abrindo) requestAnimationFrame(() => { _renderReadinessTrendChart().catch(e => console.warn("[storage]", e)); });
}

function _mediaMovelComGaps(valores, janela) {
  return valores.map((_, i) => {
    const inicio = Math.max(0, i - janela + 1);
    const fatia = valores.slice(inicio, i + 1).filter(v => v !== null && v !== undefined);
    if (!fatia.length) return null;
    return Math.round(fatia.reduce((a, b) => a + b, 0) / fatia.length);
  });
}

async function _renderReadinessTrendChart() {
  const canvas = document.getElementById("readinessTrendChart");
  if (!canvas || typeof Chart === "undefined") return;
  const panel = document.getElementById("readinessTrendPanel");
  if (!panel || !panel.classList.contains("open")) return;
  const history = JSON.parse(await getItem("gtg_readiness_history") || "{}");
  const dias = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dias.push({ key, score: history[key] ? history[key].score : null, label: d.getDate() + "/" + (d.getMonth() + 1) });
  }
  const scores = dias.map(d => d.score);
  const media = _mediaMovelComGaps(scores, 3);
  if (_readinessTrendChart) { _readinessTrendChart.destroy(); }
  _readinessTrendChart = new Chart(canvas.getContext("2d"), {
    type: "line",
    data: {
      labels: dias.map(d => d.label),
      datasets: [
        {
          label: "Prontidão",
          data: scores,
          borderColor: cssVar("--gold") || "#D4A843",
          backgroundColor: "rgba(212,168,67,0.08)",
          spanGaps: true,
          pointRadius: 2,
          pointBackgroundColor: cssVar("--gold") || "#D4A843",
          borderWidth: 1.5,
          tension: 0.3,
          fill: true
        },
        {
          label: "Média móvel (3d)",
          data: media,
          spanGaps: true,
          borderColor: cssVar("--accent-red-bright") || "#FF1A1A",
          borderDash: [4, 3],
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.35,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { labels: { color: "#9A9A9A", font: { family: "Share Tech Mono", size: 9 }, boxWidth: 10 } }
      },
      scales: {
        y: {
          min: 0, max: 100,
          ticks: { color: "#9A9A9A", font: { family: "Share Tech Mono", size: 8 } },
          grid: { color: "rgba(255,255,255,0.05)" }
        },
        x: {
          ticks: { color: "#9A9A9A", font: { family: "Share Tech Mono", size: 8 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 },
          grid: { display: false }
        }
      }
    }
  });
}

function scrollToReadiness(e) {
  e.preventDefault();
  const a = document.getElementById("readinessCard");
  a && (a.scrollIntoView({
    behavior: "smooth",
    block: "center"
  }), a.style.transition = "box-shadow 0.3s", a.style.boxShadow = "0 0 40px rgba(212,160,23,0.4)", setTimeout(() => {
    a.style.boxShadow = ""
  }, 800));
  const t = document.querySelector('.nav-tab[data-tab="treino"]'),
    o = document.getElementById("tab-treino");
  t && !t.classList.contains("active") && (document.querySelectorAll(".nav-tab").forEach(e => e.classList.remove("active")), document.querySelectorAll(".tab-content").forEach(e => e.classList.remove("active")), t.classList.add("active"), o.classList.add("active"))
}

let _dragSrcId = null;

function _initDragDrop() {
  const grid = document.getElementById("exerciseGrid");
  if (!grid) return;
  grid.querySelectorAll(".exercise-card .exercise-card-header").forEach(h => {
    h.style.cursor = "grab"; h.title = "Arraste para reordenar"; h.setAttribute("draggable", "true");
  });
  if (grid.dataset.dragInit) return;
  grid.dataset.dragInit = "1";
  grid.addEventListener("dragstart", e => {
    const card = e.target.closest(".exercise-card");
    if (!card) return;
    _dragSrcId = card.id.replace("excard-", "");
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => card.style.opacity = "0.4", 0);
  });
  grid.addEventListener("dragend", () => {
    grid.querySelectorAll(".exercise-card").forEach(c => { c.style.opacity = ""; c.style.outline = ""; });
  });
  grid.addEventListener("dragover", e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const card = e.target.closest(".exercise-card");
    if (card) {
      const id = card.id.replace("excard-", "");
      if (id !== _dragSrcId) card.style.outline = "2px solid var(--gold)";
    }
  });
  grid.addEventListener("dragleave", e => {
    const card = e.target.closest(".exercise-card");
    if (card) card.style.outline = "";
  });
  grid.addEventListener("drop", e => {
    e.preventDefault();
    const card = e.target.closest(".exercise-card");
    if (!card) return;
    card.style.outline = "";
    const targetId = card.id.replace("excard-", "");
    if (!_dragSrcId || _dragSrcId === targetId) return;
    const srcIdx = dados.exercicios.findIndex(ex => ex.id === _dragSrcId);
    const tgtIdx = dados.exercicios.findIndex(ex => ex.id === targetId);
    if (srcIdx === -1 || tgtIdx === -1) return;
    const [moved] = dados.exercicios.splice(srcIdx, 1);
    dados.exercicios.splice(tgtIdx, 0, moved);
    salvarDados(); renderExercicios(); _dragSrcId = null;
  });
}


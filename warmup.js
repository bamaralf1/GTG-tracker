/* =============================================================================
 * warmup.js — Ativação Pré-Combate (fases, streak, XP, auto-avanço)
 * ========================================================================== */

let warmupTimers = {};

const WARMUP_PHASES = [
  {
    id: "mobilidade",
    name: "MOBILIDADE ARTICULAR",
    desc: "Preparação das articulações e abertura de amplitude",
    drills: [
      { id: "mobilidade", name: "Agachamento de Mobilidade", time: 30, cat: "general",
        desc: "Pés afastados na largura dos ombros, segure um peso leve no peito (goblet). Agache até o fundo mantendo o tronco ereto, cotovelos entre os joelhos. Na posição mais baixa, faça pequenos círculos com os quadris (prying) por 5 segundos para abrir o quadril e alongar a virilha. Suba com controle." },
      { id: "ombros", name: "Círculo de Ombros", time: 30, cat: "general",
        desc: "Em pé, segure um disco ou kettlebell leve com as duas mãos. Eleve o peso acima da cabeça e faça círculos amplos ao redor da cabeça (halos), mantendo os braços estendidos e o core contraído. Os cotovelos devem passar para trás das orelhas a cada volta. Controle o movimento — sem inclinar o tronco." }
    ]
  },
  {
    id: "ativacao",
    name: "ATIVAÇÃO NEURAL",
    desc: "Recrutamento neuromuscular e cadeia posterior",
    drills: [
      { id: "gluteos", name: "Ponte de Glúteos", time: 30, cat: "general",
        desc: "Deitado de costas, joelhos flexionados e pés no chão na largura do quadril. Eleve o quadril apertando os glúteos no topo do movimento, formando uma linha reta dos ombros aos joelhos. Segure a contração por 2 segundos no topo, depois desça lentamente sem encostar o quadril no chão. Mantenha o abdômen contraído." },
      { id: "deadlift", name: "Levantamento Terra Ativo", time: 30, cat: "general",
        desc: "Com uma barra leve ou cabo de vassoura, execute o movimento do levantamento terra: pés sob a barra, flexione quadris e joelhos, mantenha as costas retas. Ao puxar, ative os dorsais (pense em 'quebrar a barra' com as mãos) e aperte os glúteos no topo. Cada repetição é lenta e consciente — desça com controle e repita." },
      { id: "band_pull", name: "Abertura de Ombros com Elástico", time: 20, cat: "pull",
        desc: "Segure um elástico leve à frente do peito com ambas as mãos. Estenda os braços para frente e depois puxe o elástico para os lados, apertando as escápulas. Retorne controladamente. Este movimento ativa os estabilizadores escapulares e prepara os ombros para exercícios de puxar." }
    ]
  },
  {
    id: "especifico",
    name: "PREPARAÇÃO ESPECÍFICA",
    desc: "Padrões de movimento do treino de hoje",
    drills: [
      { id: "rotacao_toracica", name: "Rotação Torácica em 4 Apoios", time: 20, cat: "core",
        desc: "Em posição de quatro apoios (mãos sob ombros, joelhos sob quadris), coloque uma mão atrás da nuca. Rotacione o tronco levando o cotovelo em direção ao teto, olhando para cima. Retorne e repita do outro lado. Abre a mobilidade da coluna torácica essencial para agachamento e overhead." },
      { id: "banded_walk", name: "Caminhada Lateral com Elástico", time: 20, cat: "legs",
        desc: "Coloque um elástico ao redor das pernas (acima dos joelhos ou tornozelos). Mantenha meio agachamento e dê passos laterais, mantendo tensão constante no elástico. Ativa glúteo médio e prepara o quadril para agachamentos e movimentos unilaterais." },
      { id: "scap_push", name: "Ativação Escapular (Push-up)", time: 15, cat: "push",
        desc: "Na posição de flexão (braços estendidos), apenas deprima e retraia as escápulas sem flexionar os cotovelos — seu peito vai descer alguns centímetros. Depois protraia (afaste as escápulas). Este movimento ensina o controle escapular essencial para flexões e dips de qualidade." }
    ]
  }
];

function initWarmupData() {
  if (!dados.aquecimento) dados.aquecimento = {};
  const hoje = (new Date).toISOString().slice(0, 10);
  if (dados.aquecimento.data !== hoje) {
    dados.aquecimento = {
      data: hoje,
      feitos: [],
      streak: dados.aquecimento.streak || 0,
      streakUltimaData: dados.aquecimento.streakUltimaData || null,
      autoAvancar: dados.aquecimento.autoAvancar || false
    };
  }
}

function _ontem() {
  const d = new Date; d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function getExerciciosHoje() {
  const hoje = (new Date).toISOString().slice(0, 10);
  const ids = new Set(dados.registros.filter(r => r.data === hoje).map(r => r.exercicioId));
  return dados.exercicios.filter(e => ids.has(e.id));
}

function _getCategoriasHoje() {
  const exs = getExerciciosHoje();
  const cats = new Set(["general"]);
  exs.forEach(e => {
    if (["flexao","dips","paralelas","handstand"].some(k => e.id.includes(k))) cats.add("push");
    if (["barra_fixa","remada","pull","face_pull"].some(k => e.id.includes(k))) cats.add("pull");
    if (["agachamento","leg","terra","stiff","passada","bulgaro","rpd"].some(k => e.id.includes(k))) cats.add("legs");
    if (["prancha","core","abdominal","dragon","rollout","rkc"].some(k => e.id.includes(k))) cats.add("core");
  });
  return cats;
}

function getPhasesDoDia() {
  const cats = _getCategoriasHoje();
  return WARMUP_PHASES.map(phase => ({
    ...phase,
    drills: phase.drills.filter(d => cats.has(d.cat))
  })).filter(phase => phase.drills.length > 0);
}

function _getGlobalDrillIndex(phaseIdx, drillIdx) {
  let idx = 0;
  const phases = getPhasesDoDia();
  for (let p = 0; p < phaseIdx; p++) idx += phases[p].drills.length;
  return idx + drillIdx;
}

function _phaseIsUnlocked(phaseIdx) {
  if (phaseIdx === 0) return true;
  const phases = getPhasesDoDia();
  const feitos = dados.aquecimento.feitos || [];
  let prevAllDone = true;
  for (let p = 0; p < phaseIdx; p++) {
    for (let d = 0; d < phases[p].drills.length; d++) {
      const gi = _getGlobalDrillIndex(p, d);
      if (!feitos.includes(gi)) { prevAllDone = false; break; }
    }
    if (!prevAllDone) break;
  }
  return prevAllDone;
}

function _phaseIsComplete(phaseIdx) {
  const phases = getPhasesDoDia();
  const feitos = dados.aquecimento.feitos || [];
  for (let d = 0; d < phases[phaseIdx].drills.length; d++) {
    const gi = _getGlobalDrillIndex(phaseIdx, d);
    if (!feitos.includes(gi)) return false;
  }
  return true;
}

function _getTotalRemainingTime() {
  const phases = getPhasesDoDia();
  const feitos = dados.aquecimento.feitos || [];
  let total = 0, idx = 0;
  for (const phase of phases) {
    for (const drill of phase.drills) {
      if (!feitos.includes(idx)) total += drill.time;
      idx++;
    }
  }
  return total;
}

function _formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m + ":" + String(s).padStart(2, "0");
}

function renderWarmup() {
  initWarmupData();
  const phases = getPhasesDoDia();
  const feitos = dados.aquecimento.feitos || [];
  const totalDrills = phases.reduce((s, p) => s + p.drills.length, 0);
  const count = feitos.filter(f => f < totalDrills).length;
  const allDone = count >= totalDrills && totalDrills > 0;

  const badge = document.getElementById("warmupBadge");
  const progress = document.getElementById("warmupProgressFill");
  const status = document.getElementById("warmupStatus");
  const list = document.getElementById("warmupList");
  const summary = document.getElementById("warmupSummary");
  const hint = document.getElementById("warmupHint");

  if (badge) {
    badge.textContent = count + "/" + totalDrills;
    if (count > 0) badge.style.opacity = "1";
  }
  if (progress) {
    progress.style.width = (totalDrills > 0 ? (count / totalDrills * 100) : 0) + "%";
    progress.classList.toggle("complete", allDone);
  }
  if (status) {
    status.classList.remove("ready", "mission-done");
    if (count === 0) status.innerHTML = "❄ NÃO AQUECIDO";
    else if (!allDone) status.innerHTML = "🔥 " + count + "/" + totalDrills;
    else { status.innerHTML = "★ PRONTO"; status.classList.add("mission-done"); }
  }

  const streak = dados.aquecimento.streak || 0;
  const streakEl = document.getElementById("warmupStreak");
  if (streakEl) {
    if (streak > 0) {
      streakEl.textContent = "🔥 " + streak + "d";
      streakEl.style.display = "inline";
    } else {
      streakEl.style.display = "none";
    }
  }

  if (list) {
    let globalIdx = 0;
    let html = "";
    for (let p = 0; p < phases.length; p++) {
      const phase = phases[p];
      const unlocked = _phaseIsUnlocked(p);
      for (let d = 0; d < phase.drills.length; d++) {
        const drill = phase.drills[d];
        const gi = _getGlobalDrillIndex(p, d);
        const done = feitos.includes(gi);
        const lockedItem = !unlocked && !done;
        const itemClass = "sb-warmup-item" + (done ? " done" : "") + (lockedItem ? " locked" : "");

        html += `<div class="${itemClass}" data-idx="${gi}" onclick="${lockedItem ? "" : 'toggleWarmup(' + gi + ')'}">
          <div class="sb-warmup-circle">
            <span class="sb-warmup-num">${done ? "✓" : globalIdx + 1}</span>
            <span class="sb-warmup-check">✓</span>
          </div>
          <div class="sb-warmup-info">
            <div class="sb-warmup-name">${lockedItem ? "🔒 " : ""}${drill.name}</div>
          </div>
          <button class="sb-warmup-timer-btn${done ? " done" : ""}" type="button" onclick="event.stopPropagation();${done || lockedItem ? "" : 'startWarmupTimer(' + gi + ')'}">${done ? "✓" : (lockedItem ? "🔒" : "▶ " + drill.time + "s")}</button>
        </div>`;
        globalIdx++;
      }
    }
    list.innerHTML = html;
  }

  if (summary) {
    if (count === 0) {
      const exs = getExerciciosHoje();
      if (exs.length > 0) summary.textContent = `${totalDrills} drills · preparação para o treino de hoje`;
      else summary.textContent = `${totalDrills} drills de ativação pré-combate`;
    } else if (!allDone) {
      summary.textContent = `${totalDrills - count} restantes · ~${_formatTime(_getTotalRemainingTime())}`;
    } else {
      const s = dados.aquecimento.streak || 0;
      if (s >= 7) summary.textContent = `${s} dias seguidos 🔥`;
      else if (s >= 3) summary.textContent = `${s} dias seguidos`;
      else summary.textContent = "Ativação concluída";
    }
  }
  if (hint) {
    hint.textContent = allDone ? "" : "Toque no drill ou aperte ▶ para iniciar o cronômetro";
  }

  _atualizarAutoBtn();
}

function toggleWarmup(idx) {
  initWarmupData();
  if (!dados.aquecimento.feitos) dados.aquecimento.feitos = [];
  const i = dados.aquecimento.feitos.indexOf(idx);
  if (i >= 0) {
    dados.aquecimento.feitos.splice(i, 1);
  } else {
    const phases = getPhasesDoDia();
    let globalIdx = 0;
    let unlocked = false;
    for (let p = 0; p < phases.length; p++) {
      if (idx < globalIdx + phases[p].drills.length) {
        unlocked = _phaseIsUnlocked(p);
        break;
      }
      globalIdx += phases[p].drills.length;
    }
    if (!unlocked) { mostrarToast("Fase bloqueada", "Complete a fase anterior primeiro.", "warning"); return; }
    dados.aquecimento.feitos.push(idx);
    if (warmupTimers[idx]) { clearTimeout(warmupTimers[idx]); delete warmupTimers[idx]; }
  }
  renderWarmup();
  salvarDadosDebounced();

  if (i < 0) {
    const f = dados.aquecimento.feitos || [];
    const phases = getPhasesDoDia();
    const total = phases.reduce((s, p) => s + p.drills.length, 0);
    if (f.length >= total && total > 0) _celebrarCompletacao();
  }
}

function _celebrarCompletacao() {
  const card = document.getElementById("warmupCard");
  if (card) {
    card.classList.add("wu-celebrate");
    setTimeout(() => card.classList.remove("wu-celebrate"), 2000);
  }
  const hoje = (new Date).toISOString().slice(0, 10);
  const ultima = dados.aquecimento.streakUltimaData;
  if (ultima !== hoje) {
    if (!ultima || ultima === _ontem()) {
      dados.aquecimento.streak = (dados.aquecimento.streak || 0) + 1;
    } else {
      dados.aquecimento.streak = 1;
    }
    dados.aquecimento.streakUltimaData = hoje;
  }
  const streak = dados.aquecimento.streak || 0;
  let xp = 5;
  if (streak >= 7) xp = 20;
  else if (streak >= 3) xp = 10;
  const bonus = streak >= 3 ? " (bônus streak)" : "";
  _aplicarXpWarmup(xp);
  let msg = "Ativação pré-combate completa! +" + xp + " XP" + bonus;
  if (streak >= 7) msg += " 🔥🔥🔥";
  else if (streak >= 3) msg += " 🔥🔥";
  mostrarToast(msg, "Body is primed. Mind is focused.", "success");
  renderWarmup();
  salvarDados();
}

function _aplicarXpWarmup(valor) {
  try { adicionarXP(valor); } catch(_e) {}
}

function startWarmupTimer(idx) {
  if (warmupTimers[idx]) return;
  const phases = getPhasesDoDia();
  let globalIdx = 0, targetDrill = null;
  for (const phase of phases) {
    for (const drill of phase.drills) {
      if (globalIdx === idx) { targetDrill = drill; break; }
      globalIdx++;
    }
    if (targetDrill) break;
  }
  if (!targetDrill) return;
  const dur = targetDrill.time;
  const item = document.querySelector(`.sb-warmup-item[data-idx="${idx}"]`);
  if (!item || item.classList.contains("done") || item.classList.contains("locked")) return;
  const btn = item.querySelector(".sb-warmup-timer-btn");
  if (!btn) return;

  if (dados.aquecimento.feitos && dados.aquecimento.feitos.includes(idx)) return;

  btn.dataset.remaining = String(dur);
  btn.textContent = String(dur);
  btn.classList.add("running");
  btn.disabled = true;

  function tick() {
    let r = parseInt(btn.dataset.remaining, 10);
    if (isNaN(r)) r = dur;
    r--;
    if (r <= 0) {
      delete warmupTimers[idx];
      btn.textContent = "✓";
      btn.classList.remove("running");
      btn.disabled = true;
      delete btn.dataset.remaining;
      toggleWarmup(idx);
      if (dados.aquecimento.autoAvancar) _autoAvancarProximo(idx);
    } else {
      btn.dataset.remaining = String(r);
      btn.textContent = String(r);
      warmupTimers[idx] = setTimeout(tick, 1000);
    }
  }
  warmupTimers[idx] = setTimeout(tick, 1000);
}

function _autoAvancarProximo(currentIdx) {
  const phases = getPhasesDoDia();
  const total = phases.reduce((s, p) => s + p.drills.length, 0);
  if (currentIdx + 1 >= total) return;
  const nextItem = document.querySelector(`.sb-warmup-item[data-idx="${currentIdx + 1}"]:not(.done):not(.locked)`);
  if (!nextItem) return;
  setTimeout(() => {
    startWarmupTimer(currentIdx + 1);
  }, 2500);
}

function completarWarmup() {
  initWarmupData();
  const phases = getPhasesDoDia();
  const total = phases.reduce((s, p) => s + p.drills.length, 0);
  const feitos = dados.aquecimento.feitos || [];
  const remaining = [];
  let idx = 0;
  for (const phase of phases) {
    for (const drill of phase.drills) {
      if (!feitos.includes(idx)) remaining.push(idx);
      idx++;
    }
  }
  remaining.forEach(i => {
    dados.aquecimento.feitos.push(i);
    if (warmupTimers[i]) { clearTimeout(warmupTimers[i]); delete warmupTimers[i]; }
  });
  renderWarmup();
  salvarDados();
  const card = document.getElementById("warmupCard");
  if (card) card.classList.add("minimized");
  _celebrarCompletacao();
}

function toggleWarmupCard() {
  const card = document.getElementById("warmupCard");
  if (card) {
    card.classList.toggle("minimized");
    if (!card.classList.contains("minimized")) renderWarmup();
  }
}

function toggleAutoAvancar() {
  initWarmupData();
  dados.aquecimento.autoAvancar = !dados.aquecimento.autoAvancar;
  _atualizarAutoBtn();
  salvarDadosDebounced();
  mostrarToast(
    dados.aquecimento.autoAvancar ? "Auto-avanço ATIVO" : "Auto-avanço DESATIVADO",
    dados.aquecimento.autoAvancar ? "Após cada drill, o próximo inicia automaticamente." : "Você precisa iniciar cada drill manualmente.",
    "info"
  );
}

function _atualizarAutoBtn() {
  const btn = document.getElementById("warmupAutoBtn");
  if (!btn) return;
  const active = dados.aquecimento.autoAvancar;
  btn.textContent = active ? "▶ AUTO" : "▶ MANUAL";
  btn.classList.toggle("active", active);
}

function resetWarmup() {
  Object.keys(warmupTimers).forEach(k => { clearTimeout(warmupTimers[k]); delete warmupTimers[k]; });
  document.querySelectorAll(".sb-warmup-timer-btn.running").forEach(el => {
    el.textContent = "▶ 30s";
    el.classList.remove("running");
    el.disabled = false;
    delete el.dataset.remaining;
  });
  initWarmupData();
  dados.aquecimento.feitos = [];
  renderWarmup();
  salvarDados();
  const card = document.getElementById("warmupCard");
  if (card) card.classList.remove("minimized");
  mostrarToast("Ativação reiniciada", "Refaça os passos quando quiser.", "info");
}

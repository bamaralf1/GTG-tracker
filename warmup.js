/* =============================================================================
 * warmup.js — Aquecimento / Ativação Pré-Combate
 * ========================================================================== */

let warmupTimers = {};

const WARMUP_DRILLS = [
  { id: "mobilidade", name: "Agachamento de Mobilidade", time: 30, desc: "Pés afastados na largura dos ombros, segure um peso leve no peito (goblet). Agache até o fundo mantendo o tronco ereto, cotovelos entre os joelhos. Na posição mais baixa, faça pequenos círculos com os quadris (prying) por 5 segundos para abrir o quadril e alongar a virilha. Suba com controle.", cat: "general" },
  { id: "ombros", name: "Círculo de Ombros", time: 30, desc: "Em pé, segure um disco ou kettlebell leve com as duas mãos. Eleve o peso acima da cabeça e faça círculos amplos ao redor da cabeça (halos), mantendo os braços estendidos e o core contraído. Os cotovelos devem passar para trás das orelhas a cada volta. Controle o movimento — sem inclinar o tronco.", cat: "general" },
  { id: "gluteos", name: "Ponte de Glúteos", time: 30, desc: "Deitado de costas, joelhos flexionados e pés no chão na largura do quadril. Eleve o quadril apertando os glúteos no topo do movimento, formando uma linha reta dos ombros aos joelhos. Segure a contração por 2 segundos no topo, depois desça lentamente sem encostar o quadril no chão. Mantenha o abdômen contraído.", cat: "general" },
  { id: "deadlift", name: "Levantamento Terra Ativo", time: 30, desc: "Com uma barra leve ou cabo de vassoura, execute o movimento do levantamento terra: pés sob a barra, flexione quadris e joelhos, mantenha as costas retas. Ao puxar, ative os dorsais (pense em 'quebrar a barra' com as mãos) e aperte os glúteos no topo. Cada repetição é lenta e consciente — desça com controle e repita.", cat: "general" },
  { id: "band_pull", name: "Abertura de Ombros com Elástico", time: 20, desc: "Segure um elástico leve à frente do peito com ambas as mãos. Estenda os braços para frente e depois puxe o elástico para os lados, apertando as escápulas. Retorne controladamente. Este movimento ativa os estabilizadores escapulares e prepara os ombros para exercícios de puxar.", cat: "pull" },
  { id: "rotacao_toracica", name: "Rotação Torácica em 4 Apoios", time: 20, desc: "Em posição de quatro apoios (mãos sob ombros, joelhos sob quadris), coloque uma mão atrás da nuca. Rotacione o tronco levando o cotovelo em direção ao teto, olhando para cima. Retorne e repita do outro lado. Abre a mobilidade da coluna torácica essencial para agachamento e overhead.", cat: "core" },
  { id: "banded_walk", name: "Caminhada Lateral com Elástico", time: 20, desc: "Coloque um elástico ao redor das pernas (acima dos joelhos ou tornozelos). Mantenha meio agachamento e dê passos laterais, mantendo tensão constante no elástico. Ativa glúteo médio e prepara o quadril para agachamentos e movimentos unilaterais.", cat: "legs" },
  { id: "scap_push", name: "Ativação Escapular (Push-up)", time: 15, desc: "Na posição de flexão (braços estendidos), apenas deprima e retraia as escápulas sem flexionar os cotovelos — seu peito vai descer alguns centímetros. Depois protraia (afaste as escápulas). Este movimento ensina o controle escapular essencial para flexões e dips de qualidade.", cat: "push" }
];

function initWarmupData() {
  if (!dados.aquecimento) dados.aquecimento = {};
  const hoje = (new Date).toISOString().slice(0, 10);
  if (dados.aquecimento.data !== hoje) dados.aquecimento = { data: hoje, feitos: [] };
}

function getExerciciosHoje() {
  const hoje = (new Date).toISOString().slice(0, 10);
  const ids = new Set(dados.registros.filter(r => r.data === hoje).map(r => r.exercicioId));
  return dados.exercicios.filter(e => ids.has(e.id));
}

function getDrillsDoDia() {
  const exs = getExerciciosHoje();
  const cats = new Set(["general"]);
  exs.forEach(e => {
    if (["flexao","dips","paralelas","handstand"].some(k => e.id.includes(k))) cats.add("push");
    if (["barra_fixa","remada","pull","face_pull"].some(k => e.id.includes(k))) cats.add("pull");
    if (["agachamento","leg","terra","stiff","passada","bulgaro","rpd"].some(k => e.id.includes(k))) cats.add("legs");
    if (["prancha","core","abdominal","dragon","rollout","rkc"].some(k => e.id.includes(k))) cats.add("core");
  });
  const drills = WARMUP_DRILLS.filter(d => cats.has(d.cat) || d.cat === "general");
  return drills.length > 0 ? drills : WARMUP_DRILLS.filter(d => d.cat === "general");
}

function renderWarmup() {
  initWarmupData();
  const drillsHoje = getDrillsDoDia();
  const feitos = dados.aquecimento.feitos || [];
  const total = drillsHoje.length;
  const count = feitos.filter(f => f < total).length;
  const badge = document.getElementById("warmupBadge");
  const progress = document.getElementById("warmupProgressFill");
  const status = document.getElementById("warmupStatus");
  const list = document.getElementById("warmupList");
  const summary = document.getElementById("warmupSummary");
  const hint = document.getElementById("warmupHint");
  if (badge) badge.textContent = count + "/" + total;
  if (progress) progress.style.width = (count / total * 100) + "%";
  if (status) {
    status.classList.remove("ready");
    if (count === 0) status.innerHTML = "❄ NÃO AQUECIDO";
    else if (count < total) status.innerHTML = "🔥 AQUECENDO · " + count + "/" + total;
    else { status.innerHTML = "★ PRONTO PARA O COMBATE"; status.classList.add("ready"); }
  }
  if (list) {
    list.innerHTML = drillsHoje.map((d, i) =>
      `<div class="sb-warmup-item${feitos.includes(i)?" done":""}" data-idx="${i}" onclick="toggleWarmup(${i})">
        <div class="sb-warmup-circle"><span class="sb-warmup-num">${i+1}</span><span class="sb-warmup-check">✓</span></div>
        <div class="sb-warmup-info">
          <div class="sb-warmup-name">${d.name}</div>
          <div class="sb-warmup-desc">${d.desc}</div>
        </div>
        <button class="sb-warmup-timer-btn" type="button" onclick="event.stopPropagation();startWarmupTimer(${i})">▶ ${d.time}s</button>
      </div>`
    ).join("");
  }
  const exs = getExerciciosHoje();
  if (summary) {
    if (count === 0) {
      if (exs.length > 0) summary.textContent = `Preparação para ${exs.map(e => e.nome).join(", ")}: ${total} passos de ativação.`;
      else summary.textContent = "Sua preparação começa com passos simples: mobilidade, ombros, glúteos e ativação de cadeia posterior.";
    } else if (count < total) summary.textContent = `Faltam ${total - count} passos para fechar a ativação e entrar em modo de trabalho.`;
    else summary.textContent = "Ativação concluída. O corpo já está pronto para a sessão e a mente pode focar no esforço.";
  }
  if (hint) {
    if (exs.length > 0 && count === 0) hint.textContent = `Warmup personalizado para os exercícios de hoje. Toque nos passos para marcar a ativação.`;
    else if (count === 0) hint.textContent = "Toque nos passos para marcar a ativação e preparar o corpo para a série.";
    else if (count < total) hint.textContent = "Continue marcando os blocos até chegar no estado ideal de prontidão.";
    else hint.textContent = "Ativação completa. Agora você está pronto para encarar a sessão com mais presença.";
  }
}

function toggleWarmup(idx) {
  initWarmupData();
  if (!dados.aquecimento.feitos) dados.aquecimento.feitos = [];
  const i = dados.aquecimento.feitos.indexOf(idx);
  if (i >= 0) dados.aquecimento.feitos.splice(i, 1);
  else {
    dados.aquecimento.feitos.push(idx);
    if (warmupTimers[idx]) { clearTimeout(warmupTimers[idx]); delete warmupTimers[idx]; }
  }
  renderWarmup();
  salvarDadosDebounced();
}

function startWarmupTimer(idx) {
  if (warmupTimers[idx]) return;
  const drillsHoje = getDrillsDoDia();
  const drill = drillsHoje[idx];
  const dur = drill ? drill.time : 30;
  const item = document.querySelector(`.sb-warmup-item[data-idx="${idx}"]`);
  if (!item || item.classList.contains("done")) return;
  const btn = item.querySelector(".sb-warmup-timer-btn");
  if (!btn) return;
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
      btn.textContent = `▶ ${dur}s`;
      btn.classList.remove("running");
      btn.disabled = false;
      delete btn.dataset.remaining;
      toggleWarmup(idx);
    } else {
      btn.dataset.remaining = String(r);
      btn.textContent = String(r);
      warmupTimers[idx] = setTimeout(tick, 1000);
    }
  }
  warmupTimers[idx] = setTimeout(tick, 1000);
}

function completarWarmup() {
  initWarmupData();
  const drillsHoje = getDrillsDoDia();
  dados.aquecimento.feitos = Array.from({ length: drillsHoje.length }, (_, idx) => idx);
  renderWarmup();
  salvarDados();
  const card = document.getElementById("warmupCard");
  if (card) card.classList.add("minimized");
  mostrarToast("Ativação concluída", "Seu corpo já está preparado para a sessão.", "success");
}

function toggleWarmupCard() {
  const card = document.getElementById("warmupCard");
  if (card) {
    card.classList.toggle("minimized");
    if (!card.classList.contains("minimized")) renderWarmup();
  }
}

function resetWarmup() {
  Object.keys(warmupTimers).forEach(k => { clearTimeout(warmupTimers[k]); delete warmupTimers[k]; });
  document.querySelectorAll(".sb-warmup-timer-btn.running").forEach(el => { el.textContent = "▶ 30s"; el.classList.remove("running"); el.disabled = false; delete el.dataset.remaining; });
  initWarmupData();
  dados.aquecimento.feitos = [];
  renderWarmup();
  salvarDados();
  const card = document.getElementById("warmupCard");
  if (card) card.classList.remove("minimized");
  mostrarToast("Ativação reiniciada", "Você pode refazer os passos quando quiser.", "info");
}

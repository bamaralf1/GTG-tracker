let _qlUltimoExId = null;
let _qlGroove = [0, 0, 0];

function toggleQuickLog() {
  const el = document.getElementById("quickLogOverlay");
  if (!el) return;
  const aberto = el.classList.toggle("active");
  if (aberto) {
    _preencherQuickLog();
    document.getElementById("qlReps")?.focus();
  }
}

function _preencherQuickLog() {
  const sel = document.getElementById("qlExercicio");
  if (!sel) return;
  const prevVal = sel.value;
  sel.innerHTML = dados.exercicios.map(e =>
    `<option value="${e.id}">${escapeHtml(e.nome)}</option>`
  ).join("");
  const target = _qlUltimoExId || prevVal || (dados.registros.length ? dados.registros[dados.registros.length-1].exercicioId : null) || dados.exercicios[0]?.id;
  if (target) sel.value = target;
}

function qlSetGroove(idx) {
  _qlGroove[idx] = _qlGroove[idx] >= 100 ? 0 : 100;
  for (let i = 0; i < 3; i++) {
    const star = document.getElementById("qlGroove" + i);
    if (star) star.textContent = i <= idx && _qlGroove[i] > 0 ? "★" : "☆";
  }
}

function qlEnviar() {
  const sel = document.getElementById("qlExercicio");
  const input = document.getElementById("qlReps");
  const exId = sel?.value;
  const reps = parseInt(input?.value);
  if (!exId || !reps || reps < 1) {
    mostrarToast("Erro", "Selecione exercício e valor válido", "error");
    return;
  }
  const ex = dados.exercicios.find(e => e.id === exId);
  if (!ex) return;
  _qlUltimoExId = exId;
  const inputPrincipal = document.getElementById("valor-" + exId);
  if (inputPrincipal) inputPrincipal.value = reps;
  grooveState[exId] = [..._qlGroove];
  _qlGroove = [0, 0, 0];
  document.querySelectorAll(".ql-star").forEach((s, i) => s.textContent = i === 0 ? "★" : "☆");
  document.getElementById("qlReps").value = "";
  toggleQuickLog();
  adicionarSerie(exId);
}

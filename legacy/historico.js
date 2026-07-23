let _historyPage = 0;
const _HISTORY_PAGE_SIZE = 200;

function _renderPageNav(container, total) {
  const totalPages = Math.ceil(total / _HISTORY_PAGE_SIZE);
  if (totalPages <= 1) return;
  const nav = document.createElement("div");
  nav.className = "history-pagination";
  nav.innerHTML = `<button class="btn btn-outline" onclick="_historyPage=Math.max(0,_historyPage-1);renderHistory()" ${_historyPage<=0?'disabled':''}>‹ ANTERIOR</button>`
    + `<span class="history-page-info">PÁG ${_historyPage+1}/${totalPages}</span>`
    + `<button class="btn btn-outline" onclick="_historyPage=Math.min(${totalPages-1},_historyPage+1);renderHistory()" ${_historyPage>=totalPages-1?'disabled':''}>PRÓXIMA ›</button>`;
  container.appendChild(nav)
}

function renderHistory() {
  var container = document.getElementById("historyLog"),
    filterDate = document.getElementById("filterDate")?.value,
    filterDateEnd = document.getElementById("filterDateEnd")?.value,
    filterEx = document.getElementById("filterExercise")?.value,
    filterOrdem = document.getElementById("filterOrdem")?.value || "recente";
  var filtered = dados.registros.slice();
  if (filterDate) {
    if (filterDateEnd) {
      filtered = filtered.filter(function(r) { return r.data >= filterDate && r.data <= filterDateEnd; });
    } else {
      filtered = filtered.filter(function(r) { return r.data === filterDate; });
    }
  }
  if (filterEx) filtered = filtered.filter(function(r) { return r.exercicioId === filterEx; });
  if (filtered.length === 0) {
    container.innerHTML = '<div class="text-mono" style="text-align:center;padding:30px;">Nenhum registro encontrado. Comece a treinar!</div>';
    return;
  }
  if ("exercicio" === filterOrdem) {
    var groups = {};
    filtered.forEach(function(r) {
      var key = r.exercicioNome || r.exercicioId || "DESCONHECIDO";
      if (!groups[key]) groups[key] = [];
      groups[key].push(r);
    });
    var sortedKeys = Object.keys(groups).sort();
    container.innerHTML = sortedKeys.map(function(exName, gi) {
      var regs = groups[exName];
      var ex = dados.exercicios.find(function(e) { return e.id === regs[0].exercicioId; });
      var unit = "tempo" === ex?.tipo ? "seg" : ex?.unidade || "reps";
      var totalVal = 0;
      regs.forEach(function(r) { totalVal += r.valor || 0; });
      var totalRegs = regs.length;
      var sliced = regs.slice(0, _HISTORY_PAGE_SIZE);
      var headerHtml = '<div class="log-group-header" onclick="this.nextElementSibling.classList.toggle(\'log-group-collapsed\')">'
        + '<span class="log-group-name">' + escapeHtml(exName) + '</span>'
        + '<span class="log-group-stats">' + totalRegs + ' s\u00e9ries \u00b7 ' + totalVal + ' ' + unit + '</span>'
        + '<span class="log-group-toggle">\u25bc</span></div>';
      var entriesHtml = sliced.map(function(reg, idx) {
        var rpeCls = getRPEColorClass(reg.rpe);
        var rpeHtml = reg.rpe ? '<span class="log-rpe ' + rpeCls + '">RPE ' + reg.rpe + '</span>' : "";
        return '<div class="log-entry" style="--i:' + idx + '">'
          + '<div class="log-dot"></div>'
          + '<div class="log-time">' + (reg.data ? reg.data.slice(5) : '') + ' ' + (reg.hora || '') + '</div>'
          + rpeHtml
          + '<div class="log-quality ' + renderQualityClass(reg.groove) + '">' + renderQualityIcons(reg.groove) + '</div>'
          + '<div class="log-detail">' + escapeHtml(String(reg.valor)) + ' ' + unit + (reg.peso ? ' @ ' + escapeHtml(String(reg.peso)) + 'kg' : '') + '</div>'
          + '<div class="log-xp">+' + (reg.xp||0) + ' XP</div>'
          + '<button class="btn-icon danger" onclick="removerRegistroComConfirm(\'' + reg.id + '\')" style="flex-shrink:0;">\u2715</button>'
          + '</div>';
      }).join("");
      if (totalRegs > _HISTORY_PAGE_SIZE) entriesHtml += `<div class="log-group-collapsed-hint">+ ${totalRegs - _HISTORY_PAGE_SIZE} registros antigos — use filtro de data para acessar</div>`;
      return '<div class="log-group">' + headerHtml + '<div class="log-group-entries">' + entriesHtml + '</div></div>';
    }).join("");
  } else {
    if ("recente" === filterOrdem) filtered.sort(function(a, b) { return b.timestamp - a.timestamp; });
    else if ("antigo" === filterOrdem) filtered.sort(function(a, b) { return a.timestamp - b.timestamp; });
    else if ("xp" === filterOrdem) filtered.sort(function(a, b) { return (b.xp || 0) - (a.xp || 0); });
    _historyPage = Math.min(_historyPage, Math.max(0, Math.ceil(filtered.length / _HISTORY_PAGE_SIZE) - 1));
    var start = _historyPage * _HISTORY_PAGE_SIZE,
      end = start + _HISTORY_PAGE_SIZE;
    var page = filtered.slice(start, end);
    container.innerHTML = page.map(function(reg, idx) {
      var ex = dados.exercicios.find(function(e) { return e.id === reg.exercicioId; });
      var unit = "tempo" === ex?.tipo ? "seg" : ex?.unidade || "reps";
      var rpeCls = getRPEColorClass(reg.rpe);
      var rpeHtml = reg.rpe ? '<span class="log-rpe ' + rpeCls + '">RPE ' + reg.rpe + '</span>' : "";
      return '<div class="log-entry" style="--i:' + idx + '">'
        + '<div class="log-dot"></div>'
        + '<div class="log-time">' + (reg.data ? reg.data.slice(5) : '') + ' ' + (reg.hora || '') + '</div>'
        + rpeHtml
        + '<div class="log-quality ' + renderQualityClass(reg.groove) + '">' + renderQualityIcons(reg.groove) + '</div>'
        + '<div class="log-exercise">' + escapeHtml(reg.exercicioNome||reg.exercicioId) + '</div>'
        + '<div class="log-detail">' + escapeHtml(String(reg.valor)) + ' ' + unit + (reg.peso ? ' @ ' + escapeHtml(String(reg.peso)) + 'kg' : '') + '</div>'
        + '<div class="log-xp">+' + (reg.xp||0) + ' XP</div>'
        + '<button class="btn-icon danger" onclick="removerRegistroComConfirm(\'' + reg.id + '\')" style="flex-shrink:0;">\u2715</button>'
        + '</div>';
    }).join("");
    _renderPageNav(container, filtered.length);
  }
}

function removerRegistroComConfirm(regId) {
  const reg = dados.registros.find(r => r.id === regId);
  reg && confirmarAcao("REMOVER ESTE REGISTRO?", `${reg.exercicioNome} — ${reg.valor} — ${reg.data} ${reg.hora}`, () => {
    dados.registros = dados.registros.filter(r => r.id !== regId), salvarDados(), renderHistory(), renderExercicios(), atualizarStats(), mostrarToast("Registro removido", "", "success")
  })
}

function clearFilters() {
  var d1 = document.getElementById("filterDate"), d2 = document.getElementById("filterDateEnd"), ex = document.getElementById("filterExercise");
  if (d1) d1.value = "";
  if (d2) d2.value = "";
  if (ex) ex.value = "";
  _historyPage = 0;
  renderHistory();
}

function preencherSelects() {
  ["filterExercise", "timerExerciseSelect", "sessionExSelect"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const prevVal = el.value;
    el.innerHTML = "filterExercise" === id ? '<option value="">TODOS OS EXERCÍCIOS</option>' : '<option value="">SELECIONAR EXERCÍCIO</option>', dados.exercicios.forEach(ex => {
      const opt = document.createElement("option");
      opt.value = ex.id, opt.textContent = ex.nome, el.appendChild(opt)
    }), prevVal && (el.value = prevVal)
  });
  _atualizarTimerWarning();
}


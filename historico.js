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
      var headerHtml = '<div class="log-group-header" onclick="this.nextElementSibling.classList.toggle(\'log-group-collapsed\')">'
        + '<span class="log-group-name">' + escapeHtml(exName) + '</span>'
        + '<span class="log-group-stats">' + regs.length + ' s\u00e9ries \u00b7 ' + totalVal + ' ' + unit + '</span>'
        + '<span class="log-group-toggle">\u25bc</span></div>';
      var entriesHtml = regs.slice(0, 200).map(function(reg, idx) {
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
      return '<div class="log-group">' + headerHtml + '<div class="log-group-entries">' + entriesHtml + '</div></div>';
    }).join("");
  } else {
    if ("recente" === filterOrdem) filtered.sort(function(a, b) { return b.timestamp - a.timestamp; });
    else if ("antigo" === filterOrdem) filtered.sort(function(a, b) { return a.timestamp - b.timestamp; });
    else if ("xp" === filterOrdem) filtered.sort(function(a, b) { return (b.xp || 0) - (a.xp || 0); });
    container.innerHTML = filtered.slice(0, 200).map(function(reg, idx) {
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


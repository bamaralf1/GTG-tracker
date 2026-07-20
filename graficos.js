function renderGraficos() {
  if (!dados.registros || dados.registros.length === 0) {
    chartSemanal && chartSemanal.destroy();
    document.getElementById("weeklyChart").getContext("2d").clearRect(0, 0, 1, 1);
    renderStreakChart(), renderHeatmap(), renderAnalise(), renderRanking(), renderVolumeChart(), renderCompararSemanas(), injetarCardPR();
    return
  }
  let registrosBase = dados.registros;
  if (filtroPerfeitas) {
    registrosBase = dados.registros.filter(e => Array.isArray(e.groove) && e.groove.filter(Boolean).length === 3)
  }
  const e = getDadosUltimasSemanas(8, registrosBase),
    a = e.map(e => e.label),
    t = e.map(e => e["series" === modoGrafico ? "series" : "reps" === modoGrafico ? "reps" : "volume"]),
    o = document.getElementById("weeklyChart").getContext("2d");
  chartSemanal && chartSemanal.destroy(), chartSemanal = new Chart(o, {
    type: "bar",
    data: {
      labels: a,
      datasets: [{
        label: "series" === modoGrafico ? "Séries" : "reps" === modoGrafico ? "Reps" : "Volume",
        data: t,
        backgroundColor: "rgba(204,0,0,0.6)",
        borderColor: cssVar("--accent-red"),
        borderWidth: 1,
        borderRadius: 2
      }, {
        label: "Média Móvel",
        data: calcularMediaMovel(t, 3),
        type: "line",
        borderColor: cssVar("--gold"),
        backgroundColor: "rgba(212,160,23,0.1)",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: cssVar("--gold"),
        tension: .4,
        fill: !1
      }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          labels: {
            color: "#888",
            font: {
              family: "Share Tech Mono",
              size: 10
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#888",
            font: {
              family: "Share Tech Mono",
              size: 10
            }
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          }
        },
        y: {
          ticks: {
            color: "#888",
            font: {
              family: "Share Tech Mono",
              size: 10
            }
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          },
          beginAtZero: !0
        }
      }
    }
  }), renderStreakChart(), renderHeatmap(), renderAnalise(), renderRanking(), renderVolumeChart(), renderCompararSemanas(), injetarCardPR()
}

function renderStreakChart() {
  const canvas = document.getElementById("streakChart");
  if (!dados.registros || dados.registros.length === 0) {
    chartStreak && chartStreak.destroy();
    if (canvas) {
      canvas.style.display = "none";
      let msg = canvas.parentNode?.querySelector(".empty-state-msg");
      msg || (msg = document.createElement("div"), msg.className = "empty-state-msg text-mono", msg.style.cssText = "text-align:center;padding:24px;color:var(--gray-light);font-size:12px", msg.textContent = "Sem histórico ainda. Comece a treinar!", canvas.parentNode?.appendChild(msg))
    }
    return
  }
  canvas.style.display = "";
  const msgEl = canvas.parentNode?.querySelector(".empty-state-msg");
  msgEl && msgEl.remove();
  const ctx = canvas.getContext("2d");
  const e = [];
  for (let a = 29; a >= 0; a--) {
    const t = new Date;
    t.setDate(t.getDate() - a);
    const o = t.toISOString().slice(0, 10),
      r = dados.registros.some(e => e.data === o) ? 1 : 0;
    e.push({
      label: o.slice(5),
      treinou: r
    })
  }
  chartStreak && chartStreak.destroy(), chartStreak = new Chart(ctx, {
    type: "bar",
    data: {
      labels: e.map(e => e.label),
      datasets: [{
        data: e.map(e => e.treinou),
        backgroundColor: e.map(e => e.treinou ? "rgba(204,0,0,0.8)" : "rgba(68,68,68,0.3)"),
        borderColor: e.map(e => e.treinou ? cssVar("--accent-red") : cssVar("--muted-dark")),
        borderWidth: 1,
        borderRadius: 2
      }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#555",
            font: {
              family: "Share Tech Mono",
              size: 8
            },
            maxRotation: 45
          },
          grid: {
            display: !1
          }
        },
        y: {
          display: !1,
          min: 0,
          max: 1
        }
      }
    }
  })
}

function renderProgresso() {
  if (!dados.registros || dados.registros.length === 0) {
    chartProgresso && chartProgresso.destroy();
    document.getElementById("progressChart").getContext("2d").clearRect(0, 0, 1, 1);
    document.getElementById("progressInsights") && (document.getElementById("progressInsights").innerHTML = '<div class="text-mono" style="text-align:center;padding:24px;color:var(--gray-light)">Sem dados de treino ainda. Comece a treinar para ver seu progresso!</div>');
    return
  }
  const e = getDadosUltimasSemanas(8),
    a = e.map(e => e.label);
  let t = [];
  if ("volume" === modoProgresso) {
    const a = e.map(e => e.reps),
      o = calcularMediaMovel(a, 3);
    t = [{
      label: "Volume Total (reps)",
      data: a,
      borderColor: cssVar("--accent-red"),
      backgroundColor: "rgba(204,0,0,0.1)",
      fill: !0,
      tension: .4,
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: cssVar("--accent-red")
    }, {
      label: "Média 3 semanas",
      data: o,
      borderColor: cssVar("--gold"),
      backgroundColor: "transparent",
      borderDash: [5, 5],
      tension: .4,
      borderWidth: 2,
      pointRadius: 0
    }]
  } else if ("media" === modoProgresso) t = [{
    label: "Média de reps/dia",
    data: e.map(e => Math.round(e.reps / 7)),
    borderColor: cssVar("--gold"),
    backgroundColor: "rgba(212,160,23,0.1)",
    fill: !0,
    tension: .4,
    borderWidth: 2,
    pointRadius: 4,
    pointBackgroundColor: cssVar("--gold")
  }];
  else {
    const a = [cssVar("--accent-red"), cssVar("--gold"), cssVar("--green-bright"), cssVar("--accent-blue"), cssVar("--accent-pink"), cssVar("--accent-orange")];
    t = dados.exercicios.slice(0, 6).map((t, o) => ({
      label: t.nome,
      data: e.map(e => dados.registros.filter(a => a.exercicioId === t.id && a.data >= e.inicio && a.data <= e.fim).reduce((e, a) => e + (a.valor || 0), 0)),
      borderColor: a[o],
      backgroundColor: a[o] + "22",
      fill: !1,
      tension: .4,
      borderWidth: 2,
      pointRadius: 3
    }))
  }
  const o = document.getElementById("progressChart").getContext("2d");
  chartProgresso && chartProgresso.destroy(), chartProgresso = new Chart(o, {
    type: "line",
    data: {
      labels: a,
      datasets: t
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          labels: {
            color: "#888",
            font: {
              family: "Share Tech Mono",
              size: 10
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#888",
            font: {
              family: "Share Tech Mono",
              size: 10
            }
          },
          grid: {
            color: "rgba(255,255,255,0.04)"
          }
        },
        y: {
          ticks: {
            color: "#888",
            font: {
              family: "Share Tech Mono",
              size: 10
            }
          },
          grid: {
            color: "rgba(255,255,255,0.04)"
          },
          beginAtZero: !0
        }
      }
    }
  }), renderInsights(e)
}

function renderInsights(e) {
  const a = document.getElementById("progressInsights");
  if (!a) return;
  const t = e[e.length - 1],
    o = e[e.length - 2],
    r = o.reps > 0 ? (t.reps - o.reps) / o.reps * 100 : 0,
    s = r > 0 ? "↑" : r < 0 ? "↓" : "→",
    n = r > 0 ? "trend-up" : r < 0 ? "trend-down" : "trend-flat";
  a.innerHTML = `\n    <div class="gtg-principle" style="padding:10px 14px;">\n      <div class="gtg-principle-title" style="font-size:12px;">SEMANA ATUAL</div>\n      <div class="progress-compare">\n        <span style="font-family:'Bebas Neue',sans-serif; font-size:24px; color:var(--gold);">${t.reps}</span>\n        <span class="text-mono">reps</span>\n        <span class="${n}" style="font-family:'Bebas Neue',sans-serif; font-size:20px;">${s}${Math.abs(Math.round(r))}%</span>\n      </div>\n    </div>\n    <div class="gtg-principle" style="padding:10px 14px;">\n      <div class="gtg-principle-title" style="font-size:12px;">MELHOR SEMANA</div>\n      <div style="font-family:'Bebas Neue',sans-serif; font-size:24px; color:var(--gold);">\n        ${Math.max(...e.map(e=>e.reps))} <span class="text-mono" style="font-size:11px;">reps</span>\n      </div>\n    </div>\n    <div class="gtg-principle" style="padding:10px 14px;">\n      <div class="gtg-principle-title" style="font-size:12px;">TENDÊNCIA 8 SEMANAS</div>\n      <div class="progress-compare">\n        ${calcularTendencia(e.map(e=>e.reps))}\n      </div>\n    </div>\n    <div class="gtg-principle" style="padding:10px 14px;">\n      <div class="gtg-principle-title" style="font-size:12px;">XP ACUMULADO</div>\n      <div style="font-family:'Bebas Neue',sans-serif; font-size:24px; color:var(--gold);">\n        ${xpData.total.toLocaleString("pt-BR")} <span class="text-mono" style="font-size:10px;">XP</span>\n      </div>\n    </div>`
}

function calcularTendencia(e) {
  if (e.length < 2) return '<span class="trend-flat">→ Sem dados</span>';
  const a = e.length,
    t = (a - 1) / 2,
    o = e.reduce((e, a) => e + a, 0) / a;
  let r = 0,
    s = 0;
  e.forEach((e, a) => {
    r += (a - t) * (e - o), s += (a - t) ** 2
  });
  const n = 0 !== s ? r / s : 0;
  return n > 5 ? '<span class="trend-up">↑ CRESCENDO</span>' : n < -5 ? '<span class="trend-down">↓ DECLINANDO</span>' : '<span class="trend-flat">→ ESTÁVEL</span>'
}

function calcularMediaMovel(e, a) {
  return e.map((t, o) => {
    if (o < a - 1) return null;
    const r = e.slice(o - a + 1, o + 1);
    return Math.round(r.reduce((e, a) => e + a, 0) / a)
  })
}

function renderEstatisticasMensais() {
  const e = document.getElementById("monthlyStats");
  if (!e) return;
  const a = {};
  dados.registros.forEach(e => {
    const t = e.data.slice(0, 7);
    a[t] || (a[t] = {
      series: 0,
      reps: 0,
      diasAtivos: new Set
    }), a[t].series++, a[t].reps += e.valor || 0, a[t].diasAtivos.add(e.data)
  });
  const t = Object.keys(a).sort().reverse().slice(0, 6);
  0 !== t.length ? e.innerHTML = t.map((e, o) => {
    const r = a[e],
      s = t[o + 1],
      n = s ? a[s] : null,
      i = n && n.reps > 0 ? (r.reps - n.reps) / n.reps * 100 : null,
      [d, c] = e.split("-"),
      l = Math.max(...t.map(e => a[e].reps));
    return `\n      <div class="timeline-week">\n        <div class="timeline-week-title">${["","JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"][parseInt(c)]} ${d}</div>\n        <div style="display:grid; grid-template-columns: repeat(3,1fr); gap:12px; margin-bottom:10px;">\n          <div><div class="text-mono">SÉRIES</div><div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--gold);">${r.series}</div></div>\n          <div><div class="text-mono">REPS</div><div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--gold);">${r.reps.toLocaleString("pt-BR")}</div></div>\n          <div><div class="text-mono">DIAS ATIVOS</div><div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--gold);">${r.diasAtivos.size}</div></div>\n        </div>\n        <div style="background:rgba(0,0,0,0.3);height:8px;border-radius:1px;overflow:hidden;margin-bottom:6px;">\n          <div style="width:${Math.round(r.reps/l*100)}%;height:100%;background:linear-gradient(90deg,var(--red-dark),var(--red));transition:width 1s;"></div>\n        </div>\n        ${null!==i?`<div class="progress-compare"><span class="${i>=0?"trend-up":"trend-down"}" style="font-family:'Bebas Neue',sans-serif;font-size:14px;">${i>=0?"↑":"↓"} ${Math.abs(Math.round(i))}% vs mês anterior</span></div>`:""}\n      </div>`
  }).join("") : e.innerHTML = '<div class="text-mono" style="text-align:center; padding:20px;">Sem dados históricos ainda. Comece a treinar!</div>'
}

function setChartMode(e, a) {
  modoGrafico = e, document.querySelectorAll(".chart-toggles .toggle-btn").forEach(e => e.classList.remove("active")), a.classList.add("active"), renderGraficos()
}

function setProgressMode(e, a) {
  modoProgresso = e, a.closest(".card").querySelectorAll(".toggle-btn").forEach(e => e.classList.remove("active")), a.classList.add("active"), renderProgresso()
}

function setFiltroDataPreset(preset) {
  var hoje = new Date();
  var dataStr = hoje.toISOString().slice(0, 10);
  if (preset === "hoje") {
    document.getElementById("filterDate").value = dataStr;
    document.getElementById("filterDateEnd").value = "";
  } else if (preset === "7d") {
    var d7 = new Date(hoje);
    d7.setDate(d7.getDate() - 6);
    document.getElementById("filterDate").value = d7.toISOString().slice(0, 10);
    document.getElementById("filterDateEnd").value = dataStr;
  } else if (preset === "30d") {
    var d30 = new Date(hoje);
    d30.setDate(d30.getDate() - 29);
    document.getElementById("filterDate").value = d30.toISOString().slice(0, 10);
    document.getElementById("filterDateEnd").value = dataStr;
  }
  renderHistory();
}

function renderHeatmap() {
  const e = document.getElementById("heatmapContainer"),
    a = document.getElementById("heatmapLegend");
  if (!e) return;
  const t = new Date,
    o = new Date(t);
  o.setFullYear(o.getFullYear() - 1), o.setDate(o.getDate() + 1);
  const r = {};
  dados.registros.forEach(e => {
    r[e.data] = (r[e.data] || 0) + 1
  });
  const s = Math.max(1, ...Object.values(r)),
    n = [],
    i = new Date(o);
  for (; i <= t;) n.push(i.toISOString().slice(0, 10)), i.setDate(i.getDate() + 1);
  const d = n.filter(e => r[e]).length;
  a && (a.textContent = `${d} dias treinados no último ano`);
  const c = [];
  let l = [];
  const m = new Date(n[0] + "T12:00:00");
  for (let e = 0; e < m.getDay(); e++) l.push(null);
  n.forEach(e => {
    l.push(e), 7 === l.length && (c.push(l), l = [])
  }), l.length && c.push(l);
  const u = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  function p(e) {
    if (!e) return "rgba(255,255,255,0.05)";
    const a = e / s;
    return a < .25 ? "rgba(139,0,0,0.5)" : a < .5 ? "rgba(204,0,0,0.7)" : a < .75 ? "var(--accent-red)" : "var(--accent-red-bright)"
  }
  let g = '<div style="display:flex; gap:3px; margin-bottom:4px; padding-left:16px;">',
    v = -1;
  c.forEach((e, a) => {
    const t = e.find(e => null !== e);
    if (t) {
      const e = new Date(t + "T12:00:00").getMonth();
      e !== v ? (g += `<span style="font-family:Share Tech Mono,monospace; font-size:9px; color:var(--gray-light); width:13px; min-width:13px;">${u[e]}</span>`, v = e) : g += '<span style="width:13px; min-width:13px;"></span>'
    } else g += '<span style="width:13px; min-width:13px;"></span>'
  }), g += "</div>";
  let f = '<div style="display:flex; gap:3px;">';
  f += '<div style="display:flex; flex-direction:column; gap:3px; margin-right:2px;">', ["D", "S", "T", "Q", "Q", "S", "S"].forEach(e => {
    f += `<div style="width:13px; height:13px; font-family:Share Tech Mono,monospace; font-size:8px; color:var(--gray); display:flex; align-items:center; justify-content:center;">${e}</div>`
  }), f += "</div>", c.forEach(e => {
    f += '<div style="display:flex; flex-direction:column; gap:3px;">';
    for (let a = 0; a < 7; a++) {
      const t = e[a],
        o = t && r[t] || 0,
        s = t ? p(o) : "transparent";
      f += `<div title="${t?`${t}: ${o} série(s)`:""}" style="width:13px; height:13px; border-radius:2px; background:${s}${t&&!o?"; border:1px solid rgba(255,255,255,0.08)":""}; cursor:${t?"pointer":"default"};"></div>`
    }
    f += "</div>"
  }), f += "</div>", e.innerHTML = g + f
}

function renderAnalise() {
  const e = document.getElementById("insightsContainer");
  if (!e) return;
  const a = [],
    t = (new Date).toISOString().slice(0, 10),
    o = new Date(Date.now() - 864e5).toISOString().slice(0, 10),
    r = new Date(Date.now() - 6048e5).toISOString().slice(0, 10);
  dados.exercicios.forEach(e => {
    const o = dados.registros.filter(a => a.exercicioId === e.id).sort((e, a) => a.data.localeCompare(e.data));
    if (0 === o.length) a.push({
      icon: "😴",
      cor: "rgba(204,0,0,0.15)",
      borda: "rgba(204,0,0,0.4)",
      titulo: "NUNCA TREINADO",
      texto: `<strong>${escapeHtml(e.nome)}</strong> ainda não tem nenhum registro. Comece hoje.`
    });
    else {
      const r = o[0].data,
        s = Math.floor((new Date(t) - new Date(r)) / 864e5);
      s >= 3 && a.push({
        icon: "⚠️",
        cor: "rgba(255,170,0,0.1)",
        borda: "rgba(255,170,0,0.4)",
        titulo: "EXERCÍCIO PARADO",
        texto: `<strong>${escapeHtml(e.nome)}</strong> não é treinado há <strong>${s} dias</strong>. Pavel diria que você está perdendo o groove.`
      })
    }
  });
  const s = getInicioSemana(t),
    n = getInicioSemana(r),
    i = new Date(s);
  i.setDate(i.getDate() - 1);
  const d = i.toISOString().slice(0, 10),
    c = dados.registros.filter(e => e.data >= s).length,
    l = dados.registros.filter(e => e.data >= n && e.data <= d).length;
  if (l > 0) {
    const e = c - l,
      t = Math.round(Math.abs(e) / l * 100);
    e < -3 ? a.push({
      icon: "📉",
      cor: "rgba(204,0,0,0.1)",
      borda: "rgba(204,0,0,0.3)",
      titulo: "VOLUME EM QUEDA",
      texto: `Esta semana: <strong>${c} séries</strong> vs ${l} na semana passada (−${t}%). Mantenha o ritmo.`
    }) : e > 3 && a.push({
      icon: "📈",
      cor: "rgba(45,122,45,0.1)",
      borda: "rgba(68,204,68,0.3)",
      titulo: "VOLUME CRESCENDO",
      texto: `Esta semana: <strong>${c} séries</strong> vs ${l} na semana passada (+${t}%). Excelente consistência.`
    })
  }
  const m = dados.exercicios.map(e => ({
    ex: e,
    total: dados.registros.filter(a => a.exercicioId === e.id).length
  })).sort((e, a) => a.total - e.total);
  m.length && m[0].total > 0 && a.push({
    icon: "👑",
    cor: "rgba(212,160,23,0.1)",
    borda: "rgba(212,160,23,0.4)",
    titulo: "EXERCÍCIO DOMINANTE",
    texto: `<strong>${escapeHtml(m[0].ex.nome)}</strong> é seu exercício mais praticado com <strong>${m[0].total} séries</strong> no histórico total.`
  });
  const u = [0, 0, 0, 0, 0, 0, 0],
    p = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  dados.registros.forEach(e => {
    const a = new Date(e.data + "T12:00:00").getDay();
    u[a]++
  });
  const g = u.indexOf(Math.max(...u));
  u[g] > 0 && a.push({
    icon: "📅",
    cor: "rgba(212,160,23,0.08)",
    borda: "rgba(212,160,23,0.3)",
    titulo: "DIA MAIS PRODUTIVO",
    texto: `<strong>${p[g]}</strong> é o dia em que você mais treina (<strong>${u[g]} séries</strong> históricas). Seu ritmo natural.`
  });
  const v = {};
  dados.registros.forEach(e => {
    if (e.hora) {
      const a = e.hora.slice(0, 2);
      v[a] = (v[a] || 0) + 1
    }
  });
  const f = Object.entries(v).sort((e, a) => a[1] - e[1]);
  if (f.length) {
    const [e, t] = f[0], o = parseInt(e) < 12 ? "manhã" : parseInt(e) < 18 ? "tarde" : "noite";
    a.push({
      icon: "🕐",
      cor: "rgba(83,74,183,0.1)",
      borda: "rgba(83,74,183,0.3)",
      titulo: "HORÁRIO DE PICO",
      texto: `Você treina mais às <strong>${e}h</strong> (${o}). <strong>${t} séries</strong> registradas nesse horário.`
    })
  }
  const x = dados.registros.some(e => e.data === t);
  dados.registros.some(e => e.data === o);
  !x && streakData.atual > 0 && a.push({
    icon: "🔥",
    cor: "rgba(204,0,0,0.15)",
    borda: "rgba(255,26,26,0.5)",
    titulo: "STREAK EM RISCO",
    texto: `Você ainda não treinou hoje. Sua streak de <strong>${streakData.atual} dias</strong> está em risco. Faça pelo menos uma série.`
  }), 0 === a.length && a.push({
    icon: "📊",
    cor: "rgba(255,255,255,0.03)",
    borda: "rgba(255,255,255,0.1)",
    titulo: "SEM DADOS SUFICIENTES",
    texto: "Continue treinando! Os insights aparecem conforme você acumula histórico no app."
  }), e.innerHTML = a.map(e => `\n    <div style="background:${e.cor}; border:1px solid ${e.borda}; border-radius:4px; padding:14px 16px;">\n      <div style="font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:2px; color:var(--gold-dim); margin-bottom:6px;">${e.icon} ${e.titulo}</div>\n      <div style="font-family:'Rajdhani',sans-serif; font-size:14px; color:var(--white-dim); line-height:1.5;">${e.texto}</div>\n    </div>\n  `).join("")
}

let chartPR = null;

function renderGraficoPR(e) {
  const a = document.getElementById("prChart");
  if (!a) return;
  const t = dados.exercicios.find(a => a.id === e);
  if (!t) return;
  const o = dados.registros.filter(a => a.exercicioId === e && a.valor > 0).sort((e, a) => e.data.localeCompare(a.data));
  if (0 === o.length) return void(a.parentElement.innerHTML = '<div class="text-mono" style="text-align:center;padding:30px;color:var(--gray-light);">Sem dados para este exercício ainda.</div>');
  const r = {};
  o.forEach(e => {
    const a = getInicioSemana(e.data);
    r[a] = Math.max(r[a] || 0, e.valor)
  });
  const s = Object.keys(r).sort(),
    n = s.map(e => r[e]),
    i = s.map(e => {
      const a = new Date(e + "T12:00:00");
      return `${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`
    }),
    d = [];
  let c = 0;
  n.forEach(e => {
    c = Math.max(c, e), d.push(c)
  }), chartPR && chartPR.destroy(), chartPR = new Chart(a, {
    type: "line",
    data: {
      labels: i,
      datasets: [{
        label: "Máx. Semanal",
        data: n,
        borderColor: "rgba(204,0,0,0.7)",
        backgroundColor: "rgba(204,0,0,0.1)",
        borderWidth: 2,
        pointRadius: 3,
        fill: !0,
        tension: .3
      }, {
        label: "PR Histórico",
        data: d,
        borderColor: cssVar("--gold"),
        backgroundColor: "transparent",
        borderWidth: 2,
        borderDash: [6, 3],
        pointRadius: 0,
        fill: !1,
        tension: 0
      }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          labels: {
            color: "#888",
            font: {
              family: "Rajdhani",
              size: 12
            }
          }
        },
        tooltip: {
          mode: "index",
          intersect: !1
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#666",
            maxTicksLimit: 8
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          }
        },
        y: {
          ticks: {
            color: "#666"
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          },
          title: {
            display: !0,
            text: "tempo" === t.tipo ? "segundos" : t.unidade || "reps",
            color: "#666"
          }
        }
      }
    }
  })
}

function injetarCardPR() {
  if (document.getElementById("prChartCard")) return;
  const e = document.createElement("div");
  e.className = "card", e.id = "prChartCard", e.style.marginTop = "20px", e.innerHTML = '\n    <div class="card-header">\n      <span class="card-title">🏆 EVOLUÇÃO DO PR — POR EXERCÍCIO</span>\n      <select class="form-select" id="prChartSelect" onchange="renderGraficoPR(this.value)" style="font-size:12px; padding:4px 8px;">\n      </select>\n    </div>\n    <div class="card-body">\n      <div class="chart-canvas-wrap" style="height:260px;">\n        <canvas id="prChart"></canvas>\n      </div>\n    </div>\n  ';
  const a = document.getElementById("tab-stats");
  if (a) {
    const t = a.querySelectorAll(".card");
    t.length >= 2 ? t[1].insertAdjacentElement("afterend", e) : a.appendChild(e)
  }
  preencherSelectPR()
}

function preencherSelectPR() {
  const e = document.getElementById("prChartSelect");
  e && (e.innerHTML = dados.exercicios.map(e => `<option value="${e.id}">${escapeHtml(e.nome)}</option>`).join(""), dados.exercicios.length && renderGraficoPR(dados.exercicios[0].id))
}

function renderRanking() {
  const e = document.getElementById("rankingContainer");
  if (!e) return;
  const a = document.getElementById("rankingMetrica")?.value || "volume",
    t = dados.exercicios.map(e => {
      const t = dados.registros.filter(a => a.exercicioId === e.id && !a.isTest);
      let o = 0;
      if ("volume" === a) o = t.reduce((e, a) => e + (a.valor || 0), 0);
      else if ("series" === a) o = t.length;
      else if ("consistencia" === a) o = new Set(t.map(e => e.data)).size;
      else if ("pr" === a) {
        const e = t.filter(e => e.timestamp > Date.now() - 2592e6);
        o = e.length ? Math.max(...e.map(e => e.valor || 0)) : 0
      }
      return {
        ex: e,
        score: o,
        regs: t
      }
    }).filter(e => e.score > 0).sort((e, a) => a.score - e.score);
  if (!t.length) return void(e.innerHTML = '<div class="text-mono" style="text-align:center;padding:20px;color:var(--gray-light);">Sem dados suficientes. Continue treinando!</div>');
  const o = t[0].score,
    r = ["🥇", "🥈", "🥉"],
    s = {
      volume: "total",
      series: "séries",
      consistencia: "dias",
      pr: "PR recente"
    };
  e.innerHTML = t.slice(0, 8).map((e, t) => {
    const n = Math.round(e.score / o * 100);
    return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">\n      <div style="width:28px;text-align:center;font-size:16px;flex-shrink:0;">${r[t]||`<span style="font-family:Bebas Neue,sans-serif;font-size:13px;color:var(--gray-light);">#${t+1}</span>`}</div>\n      <div style="flex:1;min-width:0;">\n        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">\n          <span style="font-family:Rajdhani,sans-serif;font-size:14px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(e.ex.nome)}</span>\n          <span class="text-mono" style="font-size:11px;color:var(--gold);flex-shrink:0;margin-left:8px;">${e.score} ${s[a]}</span>\n        </div>\n        <div style="height:5px;background:rgba(255,255,255,0.07);border-radius:1px;overflow:hidden;">\n          <div style="height:100%;width:${n}%;background:${0===t?"linear-gradient(90deg,var(--gold-dim),var(--gold))":1===t?"linear-gradient(90deg,var(--gray),var(--gray-light))":"linear-gradient(90deg,var(--red-dark),var(--red))"};border-radius:1px;transition:width 0.6s ease;"></div>\n        </div>\n      </div>\n    </div>`
  }).join("")
}

let _volumeChart = null;

function renderVolumeChart() {
  if (!dados.registros || dados.registros.length === 0) {
    _volumeChart && _volumeChart.destroy();
    return
  }
  const e = document.getElementById("volumeWeekChart");
  if (!e) return;
  const a = document.getElementById("volumeMetrica")?.value || "series",
    t = [],
    o = new Date;
  for (let e = 11; e >= 0; e--) {
    const a = new Date(o);
    a.setDate(a.getDate() - 7 * e), t.push(getInicioSemana(a.toISOString().slice(0, 10)))
  }
  const r = t.map(e => {
      const a = new Date(e + "T12:00:00");
      return `${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`
    }),
    s = t.map((e, r) => {
      const s = r < t.length - 1 ? t[r + 1] : new Date(o.getTime() + 864e5).toISOString().slice(0, 10),
        n = dados.registros.filter(a => a.data >= e && a.data < s && !a.isTest);
      return "series" === a ? n.length : "reps" === a ? n.reduce((e, a) => e + (a.valor || 0), 0) : "xp" === a ? n.reduce((e, a) => e + (a.xp || 0), 0) : 0
    }),
    n = {
      series: "séries",
      reps: "reps/seg",
      xp: "XP"
    };
  _volumeChart && _volumeChart.destroy(), _volumeChart = new Chart(e, {
    type: "bar",
    data: {
      labels: r,
      datasets: [{
        label: n[a] + " por semana",
        data: s,
        backgroundColor: s.map((e, a) => a === s.length - 1 ? "rgba(212,160,23,0.7)" : "rgba(204,0,0,0.6)"),
        borderColor: s.map((e, a) => a === s.length - 1 ? cssVar("--gold") : cssVar("--accent-red")),
        borderWidth: 1,
        borderRadius: 2
      }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          callbacks: {
            label: e => ` ${e.parsed.y} ${n[a]}`
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#666",
            font: {
              size: 10
            }
          },
          grid: {
            color: "rgba(255,255,255,0.04)"
          }
        },
        y: {
          ticks: {
            color: "#666"
          },
          grid: {
            color: "rgba(255,255,255,0.04)"
          },
          beginAtZero: !0
        }
      }
    }
  })
}

const PESO_KEY = "gtg_peso";
let _pesoChart = null;

async function getPesoData() {
  try {
    const raw = await getItem(PESO_KEY);
    return JSON.parse(raw || "{}")
  } catch (e) { return {} }
}

async function salvarPeso() {
  const dataEl = document.getElementById("pesoData"),
    valEl = document.getElementById("pesoValor");
  if (!dataEl || !valEl) return;
  const data = dataEl.value || new Date().toISOString().slice(0, 10),
    valor = parseFloat(valEl.value);
  if (!valor || valor < 20 || valor > 300) return void mostrarToast("Erro", "Insira um peso válido (20-300 kg)", "error");
  const pesos = await getPesoData();
  pesos[data] = valor;
  setItem(PESO_KEY, JSON.stringify(pesos)).catch(e => console.warn("[storage]", e));
  valEl.value = "";
  await renderPesoChart();
  mostrarToast("Peso registrado", `${data}: ${valor} kg`, "success")
}

async function renderPesoChart() {
  const e = document.getElementById("pesoChart");
  if (!e) return;
  const pesos = await getPesoData(),
    sorted = Object.keys(pesos).sort(),
    recentes = sorted.slice(-60);
  if (recentes.length < 1) {
    document.getElementById("pesoStats").textContent = "Nenhum registro de peso ainda. Adicione seu peso acima.";
    return
  }
  const labels = recentes.map(d => { const dt = new Date(d + "T12:00:00"); return `${String(dt.getDate()).padStart(2,"0")}/${String(dt.getMonth()+1).padStart(2,"0")}` }),
    values = recentes.map(d => pesos[d]),
    min = Math.min(...values),
    max = Math.max(...values);
  _pesoChart && _pesoChart.destroy();
  _pesoChart = new Chart(e, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Peso (kg)",
        data: values,
        borderColor: cssVar("--gold"),
        backgroundColor: "rgba(212,160,23,0.1)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: cssVar("--gold"),
        pointBorderColor: cssVar("--bg-dark"),
        pointBorderWidth: 1,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: e => ` ${e.parsed.y} kg`
          }
        }
      },
      scales: {
        x: {
          ticks: { color: "#666", font: { size: 9 }, maxTicksLimit: 10 },
          grid: { color: "rgba(255,255,255,0.04)" }
        },
        y: {
          ticks: { color: "#666" },
          grid: { color: "rgba(255,255,255,0.04)" },
          min: Math.floor(min - 2),
          max: Math.ceil(max + 2)
        }
      }
    }
  });
  const atual = values[values.length - 1],
    primeiro = values[0],
    diff = (atual - primeiro).toFixed(1),
    seta = diff > 0 ? "↑" : diff < 0 ? "↓" : "—",
    cor = diff > 0 ? "var(--green-bright)" : diff < 0 ? "var(--red-bright)" : "var(--gray-light)";
  document.getElementById("pesoStats").innerHTML =
    `Último: <strong>${atual} kg</strong> &nbsp;|&nbsp; Média: <strong>${(values.reduce((a,b)=>a+b,0)/values.length).toFixed(1)} kg</strong> &nbsp;|&nbsp; Variação: <span style="color:${cor}">${seta} ${Math.abs(diff)} kg</span> &nbsp;|&nbsp; ${recentes.length} registro(s)`
}

function renderCompararSemanas() {
  const e = document.getElementById("compararSemanasContainer");
  if (!e) return;
  const a = getInicioSemana((new Date).toISOString().slice(0, 10)),
    t = getInicioSemana(new Date(new Date(a + "T12:00:00").getTime() - 864e5).toISOString().slice(0, 10)),
    o = dados.registros.filter(e => e.data >= a && !e.isTest),
    r = dados.registros.filter(e => e.data >= t && e.data < a && !e.isTest),
    s = [...new Set([...o, ...r].map(e => e.exercicioId))];
  if (0 === s.length) return void(e.innerHTML = '<div class="text-mono" style="text-align:center;padding:20px;color:var(--gray-light);">Sem dados suficientes ainda.</div>');
  const n = s.map(e => {
      const a = dados.exercicios.find(a => a.id === e),
        t = a ? a.nome : e,
        s = o.filter(a => a.exercicioId === e).length,
        n = r.filter(a => a.exercicioId === e).length,
        i = o.filter(a => a.exercicioId === e).reduce((e, a) => e + (a.valor || 0), 0),
        d = r.filter(a => a.exercicioId === e).reduce((e, a) => e + (a.valor || 0), 0),
        c = s - n,
        l = i - d,
        m = l > 0 ? "var(--green-bright)" : l < 0 ? "var(--red-bright)" : "var(--gray-light)",
        u = e => e > 0 ? "▲" : e < 0 ? "▼" : "—";
      return `<tr style="border-bottom:1px solid rgba(255,255,255,0.05);">\n      <td style="padding:8px 12px;font-family:Rajdhani,sans-serif;font-size:13px;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(t)}</td>\n      <td style="padding:8px 12px;text-align:center;" class="text-mono">${n}</td>\n      <td style="padding:8px 12px;text-align:center;" class="text-mono">${s}</td>\n      <td style="padding:8px 12px;text-align:center;color:${c>0?"var(--green-bright)":c<0?"var(--red-bright)":"var(--gray-light)"};" class="text-mono">${u(c)}${Math.abs(c)||"—"}</td>\n      <td style="padding:8px 12px;text-align:center;" class="text-mono">${d}</td>\n      <td style="padding:8px 12px;text-align:center;" class="text-mono">${i}</td>\n      <td style="padding:8px 12px;text-align:center;color:${m};" class="text-mono">${u(l)}${Math.abs(l)||"—"}</td>\n    </tr>`
    }).join(""),
    i = "padding:6px 12px;text-align:center;font-family:Bebas Neue,sans-serif;font-size:11px;letter-spacing:2px;color:var(--gold-dim);background:rgba(212,160,23,0.06);";
  e.innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:12px;">\n    <thead>\n      <tr>\n        <th style="${i}text-align:left;">EXERCÍCIO</th>\n        <th style="${i}" colspan="2">SÉRIES</th>\n        <th style="${i}">±</th>\n        <th style="${i}" colspan="2">VOLUME</th>\n        <th style="${i}">±</th>\n      </tr>\n      <tr style="background:rgba(255,255,255,0.02);">\n        <td style="padding:4px 12px;"></td>\n        <td style="padding:4px 12px;text-align:center;font-size:10px;color:var(--gray-light);" class="text-mono">ANT.</td>\n        <td style="padding:4px 12px;text-align:center;font-size:10px;color:var(--gold);" class="text-mono">ESTA</td>\n        <td></td>\n        <td style="padding:4px 12px;text-align:center;font-size:10px;color:var(--gray-light);" class="text-mono">ANT.</td>\n        <td style="padding:4px 12px;text-align:center;font-size:10px;color:var(--gold);" class="text-mono">ESTA</td>\n        <td></td>\n      </tr>\n    </thead>\n    <tbody>${n}</tbody>\n  </table>`
}

function mostrarResumoOntem() {
  const e = (new Date).toISOString().slice(0, 10);
  getItem("gtg_resumo_visto").then(visto => {
    if (visto === e) return;
    const a = new Date(Date.now() - 864e5).toISOString().slice(0, 10),
      t = dados.registros.filter(e => e.data === a && !e.isTest);
    if (0 === t.length) return;
    setItem("gtg_resumo_visto", e).catch(e => console.warn("[storage]", e));
    const o = t.reduce((e, a) => e + (a.xp || 0), 0),
      r = t.reduce((e, a) => e + (a.valor || 0), 0),
      s = {};
    t.forEach(e => {
      s[e.exercicioId] || (s[e.exercicioId] = {
        nome: e.exercicioNome,
        series: 0,
        reps: 0
      }), s[e.exercicioId].series++, s[e.exercicioId].reps += e.valor || 0
    });
    carregarNotas().then(notas => {
      const n = notas[a] || "",
        i = new Date(a + "T12:00:00"),
        d = document.getElementById("resumoOntemModal"),
        c = document.getElementById("resumoOntemTitle"),
        l = document.getElementById("resumoOntemBody");
      if (!d || !l) return;
      c.textContent = `📊 RESUMO — ${["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"][i.getDay()].toUpperCase()}, ${i.toLocaleDateString("pt-BR")}`;
      const m = Object.values(s).map(e => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">\n      <span style="font-family:Rajdhani,sans-serif;font-size:14px;">${escapeHtml(e.nome)}</span>\n      <span class="text-mono" style="font-size:12px;color:var(--gold);">${e.series} séries · ${e.reps} vol</span>\n    </div>`).join("");
      l.innerHTML = `\n    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px;">\n      <div style="text-align:center;background:rgba(212,160,23,0.08);border:1px solid rgba(212,160,23,0.2);border-radius:4px;padding:10px;">\n        <div style="font-family:Bebas Neue,sans-serif;font-size:24px;color:var(--gold);">${t.length}</div>\n        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">SÉRIES</div>\n      </div>\n      <div style="text-align:center;background:rgba(204,0,0,0.08);border:1px solid rgba(204,0,0,0.2);border-radius:4px;padding:10px;">\n        <div style="font-family:Bebas Neue,sans-serif;font-size:24px;color:var(--red-bright);">${r}</div>\n        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">VOLUME</div>\n      </div>\n      <div style="text-align:center;background:rgba(45,122,45,0.08);border:1px solid rgba(45,122,45,0.2);border-radius:4px;padding:10px;">\n        <div style="font-family:Bebas Neue,sans-serif;font-size:24px;color:var(--green-bright);">+${o}</div>\n        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">XP</div>\n      </div>\n    </div>\n    <div style="margin-bottom:12px;">${m}</div>\n    ${n?`<div style="background:rgba(212,160,23,0.06);border:1px solid rgba(212,160,23,0.2);border-radius:4px;padding:10px;margin-bottom:12px;">\n      <div class="text-mono" style="font-size:10px;color:var(--gold-dim);margin-bottom:4px;">📝 SUA NOTA</div>\n      <div style="font-family:Rajdhani,sans-serif;font-size:14px;color:var(--white-dim);">${escapeHtml(n)}</div>\n    </div>`:""}\n    <button class="btn btn-red" style="width:100%;" onclick="document.getElementById('resumoOntemModal').classList.remove('active')">▶ TREINAR HOJE</button>\n  `, setTimeout(() => d.classList.add("active"), 1200)
    }).catch(e => console.warn("[storage]", e))
  }).catch(e => console.warn("[storage]", e))
}

function getFimSemana(dataStr) {
  const inicio = new Date(getInicioSemana(dataStr) + "T12:00:00");
  return new Date(inicio.getTime() + 6 * 864e5).toISOString().slice(0, 10)
}

function gerarRelatorioSemanal() {
  const hoje = (new Date).toISOString().slice(0, 10),
    segInicio = getInicioSemana(hoje),
    segFim = getFimSemana(hoje);
  const regs = dados.registros.filter(r => r.data >= segInicio && r.data <= segFim && !r.isTest),
    diasComTreino = new Set(regs.map(r => r.data)).size,
    totalSeries = regs.length,
    totalReps = regs.reduce((a, r) => a + (r.valor || 0), 0),
    totalXP = regs.reduce((a, r) => a + (r.xp || 0), 0);
  const agrupado = {};
  regs.forEach(r => {
    const key = r.exercicioNome || r.exercicioId || "?";
    agrupado[key] || (agrupado[key] = { series: 0, reps: 0 });
    agrupado[key].series++, agrupado[key].reps += r.valor || 0
  });
  const items = Object.entries(agrupado).sort((a, b) => b[1].series - a[1].series).slice(0, 8).map(([nome, st]) =>
    `<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:13px;">
      <span style="font-family:Rajdhani,sans-serif;">${escapeHtml(nome)}</span>
      <span class="text-mono" style="font-size:11px;color:var(--gold);">${st.series}s · ${st.reps} reps</span>
    </div>`
  ).join("");
  const badgesSemana = TODAS_BADGES.filter(b => badgesData.desbloqueadas.includes(b.id));
  const badgesHTML = badgesSemana.length
    ? badgesSemana.map(b => `<span style="display:inline-block;margin:3px 4px;padding:3px 8px;background:rgba(212,160,23,0.1);border:1px solid rgba(212,160,23,0.25);border-radius:4px;font-size:11px;">${b.icone} ${b.nome}</span>`).join("")
    : '<span class="text-mono" style="font-size:10px;color:var(--gray-light);">Nenhuma conquista nova esta semana</span>';
  const inicio = new Date(segInicio + "T12:00:00"),
    fim = new Date(segFim + "T12:00:00");
  const dataLabel = `${String(inicio.getDate()).padStart(2,"0")} ${["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][inicio.getMonth()]} — ${String(fim.getDate()).padStart(2,"0")} ${["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][fim.getMonth()]} ${fim.getFullYear()}`;
  return {
    dataLabel,
    totalSeries,
    totalReps: totalReps.toLocaleString("pt-BR"),
    totalXP: totalXP.toLocaleString("pt-BR"),
    diasComTreino,
    totalDias: 7,
    streak: streakData.atual,
    streakRec: streakData.recorde,
    itemsHTML: items || '<div class="text-mono" style="text-align:center;padding:16px;font-size:11px;color:var(--gray-light);">Nenhum registro nesta semana.</div>',
    badgesHTML
  }
}

function mostrarRelatorioSemanal() {
  const rel = gerarRelatorioSemanal(),
    d = document.getElementById("relSemanalModal"),
    t = document.getElementById("relSemanalTitle"),
    b = document.getElementById("relSemanalBody");
  if (!d || !b) return;
  t.textContent = `📊 RELATÓRIO SEMANAL`;
  b.innerHTML = `
    <div style="font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--gold);letter-spacing:2px;text-align:center;margin-bottom:12px;">${rel.dataLabel}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px;">
      <div style="text-align:center;background:rgba(212,160,23,0.08);border:1px solid rgba(212,160,23,0.2);border-radius:4px;padding:10px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:26px;color:var(--gold);">${rel.totalSeries}</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">SÉRIES</div>
      </div>
      <div style="text-align:center;background:rgba(204,0,0,0.08);border:1px solid rgba(204,0,0,0.2);border-radius:4px;padding:10px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:26px;color:var(--red-bright);">${rel.totalReps}</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">VOLUME</div>
      </div>
      <div style="text-align:center;background:rgba(45,122,45,0.08);border:1px solid rgba(45,122,45,0.2);border-radius:4px;padding:10px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:26px;color:var(--green-bright);">+${rel.totalXP}</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">XP</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
      <div style="text-align:center;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:8px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:20px;color:var(--white-dim);">🔥 ${rel.streak}</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">STREAK ATUAL</div>
      </div>
      <div style="text-align:center;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:8px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:20px;color:var(--white-dim);">📅 ${rel.diasComTreino}/7</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">DIAS TREINADOS</div>
      </div>
    </div>
    <div style="margin-bottom:12px;">${rel.itemsHTML}</div>
    <div style="margin-bottom:12px;">
      <div class="text-mono" style="font-size:10px;color:var(--gold-dim);margin-bottom:6px;letter-spacing:2px;">🏆 CONQUISTAS</div>
      <div style="text-align:center;">${rel.badgesHTML}</div>
    </div>
    <div style="margin-top:4px;font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--gray-light);text-align:center;letter-spacing:1px;">RECORDE STREAK: ${rel.streakRec} DIAS</div>
    <button class="btn btn-red" style="width:100%;margin-top:10px;" onclick="document.getElementById('relSemanalModal').classList.remove('active')">▶ FECHAR</button>
  `, setTimeout(() => d.classList.add("active"), 300)
}

function verificarRelatorioSemanal() {
  const hoje = (new Date).toISOString().slice(0, 10);
  getItem("gtg_semana_visto").then(visto => {
    if (visto === hoje) return;
    const segInicio = getInicioSemana(hoje);
    const regs = dados.registros.filter(r => r.data >= segInicio && r.data <= hoje && !r.isTest);
    if (regs.length < 1) return;
    setItem("gtg_semana_visto", hoje).catch(e => console.warn("[storage]", e));
    setTimeout(mostrarRelatorioSemanal, 2000)
  }).catch(e => console.warn("[storage]", e))
}


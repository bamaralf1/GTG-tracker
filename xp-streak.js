function verificarStreak() {
  const hoje = (new Date).toISOString().slice(0, 10),
    ontem = new Date(Date.now() - 864e5).toISOString().slice(0, 10),
    temHoje = dados.registros.some(reg => (reg.data || (reg.timestamp ? new Date(reg.timestamp).toISOString().slice(0, 10) : null)) === hoje);
  if (streakData.ultimaData === hoje);
  else if (temHoje) {
    if (streakData.ultimaData !== ontem && streakData.ultimaData) {
      const diff = streakData.ultimaData ? Math.floor((new Date(hoje) - new Date(streakData.ultimaData)) / 864e5) : 999;
      2 === diff && streakData.diasFolgaUsados < 1 ? (streakData.diasFolgaUsados += 1, streakData.atual += 1, mostrarToast("Dia de Folga Usado", "Sua streak foi preservada! (1 folga/semana)", "warning")) : diff > 1 && diff < 999 && (usarShield() ? streakData.atual += 1 : (streakData.atual = 1, streakData.diasFolgaUsados = 0, mostrarToast("💔 Streak Quebrada", "Sua streak foi resetada. Compre escudos para proteção!", "error")))
    } else streakData.atual += 1;
    streakData.ultimaData = hoje, streakData.atual > streakData.recorde && (streakData.recorde = streakData.atual);
    const inicioSemana = getInicioSemana(hoje);
    streakData.semanaInicio !== inicioSemana && (streakData.semanaInicio = inicioSemana, streakData.diasFolgaUsados = 0), salvarDadosDebounced()
  }
  atualizarUIStreak(), atualizarDisplayShields()
}

function getInicioSemana(data) {
  const parsed = new Date(data + "T12:00:00"),
    diaSemana = parsed.getDay(),
    diff = parsed.getDate() - diaSemana + (0 === diaSemana ? -6 : 1);
  return new Date(parsed.setDate(diff)).toISOString().slice(0, 10)
}

function atualizarUIStreak() {
  document.getElementById("streakCountHeader").textContent = streakData.atual, document.getElementById("statStreak").textContent = streakData.atual, document.getElementById("statStreakRecord").textContent = `Recorde: ${streakData.recorde} dias`, document.getElementById("streakCurrentLarge").textContent = streakData.atual, document.getElementById("streakRecordLabel").textContent = `RECORDE: ${streakData.recorde} DIAS`, document.getElementById("restDaysInfo").textContent = 1 - streakData.diasFolgaUsados + " folga(s) disponíve(is) esta semana";
  const e = calcularBonusStreak();
  document.getElementById("streakBonus").textContent = `+${Math.round(100*e)}%`, document.getElementById("bonusXpLabel").textContent = e > 0 ? `+${Math.round(100*e)}% XP (streak > ${streakData.atual>=30?"30":"7"} dias)` : "Sem bônus — mantenha a streak!", atualizarDisplayShields();
  _updateStreakBox()
}

function calcularBonusStreak() {
  return streakData.atual >= 30 ? .25 : streakData.atual >= 14 ? .15 : streakData.atual >= 7 ? .1 : 0
}

function calcularRankMult() {
  const level = getNivel(xpData.total);
  const idx = NIVEIS.indexOf(level);
  if (idx < 0) return 1;
  if (idx <= 3) return 1.0;
  if (idx <= 6) return 0.90;
  if (idx <= 9) return 0.78;
  if (idx <= 12) return 0.64;
  if (idx <= 15) return 0.50;
  if (idx <= 18) return 0.38;
  return 0.28;
}

function calcularXPSerie(exercicio, valor, peso) {
  let base = 0;
  return "reps" === exercicio.tipo ? base = valor : "tempo" === exercicio.tipo ? base = 2 * valor : "peso" === exercicio.tipo && (base = (peso || 0) * valor), base *= 1 + calcularBonusStreak(), Math.round(base)
}

function adicionarXP(amount) {
  const prevTotal = xpData.total;
  xpData.total += amount;
  const today = (new Date).toISOString().slice(0, 10);
  if (xpData.dailyDate === today) {
    xpData.dailyXP += amount;
  } else {
    xpData.dailyXP = amount;
    xpData.dailyDate = today;
  }
  xpData.xpHistory.push({ date: today, xp: amount, total: xpData.total });
  if (xpData.xpHistory.length > 30) xpData.xpHistory = xpData.xpHistory.slice(-30);
  const level = getNivel(xpData.total),
    oldLevelName = xpData.nivel;
  const leveledUp = oldLevelName !== level.nome && "RECRUTA" !== oldLevelName;
  if (xpData.nivel = level.nome, xpData.nivelAtualEm = level.min, xpData.proximoNivelEm = level.proximo, leveledUp) {
    const old = NIVEIS.find(n => n.nome === oldLevelName);
    if (old && old.min < level.min) {
      mostrarToast("★ PROMOÇÃO!", `Você avançou para ${level.nome} ${level.icone}`, "success");
      dispararConfetti();
      showLevelUpOverlay(level);
    }
  }
  _animateXPCounter(prevTotal, xpData.total);
  renderXPWeeklyChart();
  atualizarXP(), salvarDados()
}

function getNivel(xp) {
  for (let i = NIVEIS.length - 1; i >= 0; i--)
    if (xp >= NIVEIS[i].min) return NIVEIS[i];
  return NIVEIS[0]
}

function atualizarXP() {
  const level = getNivel(xpData.total),
    ratio = (xpData.total - level.min) / (level.proximo - level.min),
    pct = Math.min(100, Math.round(100 * ratio));
  const circumference = 163.36;
  const levelIdx = NIVEIS.indexOf(level);
  document.getElementById("levelIcon").textContent = level.icone;
  document.getElementById("levelName").textContent = level.nome;
  document.getElementById("levelSub").textContent = "NÍVEL " + (levelIdx + 1);
  document.getElementById("levelRankLabel").textContent = level.divisao.toUpperCase();
  const badge = document.getElementById("levelBadge");
  if (badge) {
    const divMap = { Tropa:1, Graduado:2, Oficial:2, "Oficial Superior":3, "Alto Comando":4, Lenda:4 };
    badge.setAttribute("data-tier", divMap[level.divisao] || 1);
    badge.setAttribute("data-divisao", level.divisao);
  }
  document.getElementById("xpBarFill").style.width = pct + "%";
  document.getElementById("xpNumbers").innerHTML = '<span class="xp-current" id="xpCurrentNum">' + xpData.total.toLocaleString("pt-BR") + '</span> / <span class="xp-target" id="xpTargetNum">' + level.proximo.toLocaleString("pt-BR") + '</span> XP';
  document.getElementById("xpTotalLabel").textContent = xpData.total.toLocaleString("pt-BR");
  const pctEl = document.getElementById("xpPct");
  if (pctEl) pctEl.textContent = pct + "%";
  const today = (new Date).toISOString().slice(0, 10);
  if (xpData.dailyDate === today) {
    document.getElementById("xpDailyLabel").textContent = "+" + xpData.dailyXP;
  } else {
    document.getElementById("xpDailyLabel").textContent = "+0";
  }
  const ringFill = document.getElementById("levelRingFill");
  if (ringFill) ringFill.style.strokeDashoffset = circumference * (1 - pct / 100);
  const nextLevel = NIVEIS[levelIdx + 1];
  const nextRankEl = document.getElementById("xpNextRank");
  if (nextRankEl) nextRankEl.textContent = nextLevel ? "Próximo posto: " + nextLevel.nome : "NÍVEL MÁXIMO";
  const quoteEl = document.getElementById("xpQuote");
  if (quoteEl) quoteEl.textContent = _getPavelQuote(levelIdx, pct);
  document.getElementById("headerRank").textContent = level.nome;
  document.getElementById("headerXpBar").style.width = pct + "%";
  document.getElementById("headerXP").setAttribute("data-estrelas", "★".repeat(Math.min(level.estrelas || 0, 7)));
  _updateStreakBox();
  renderXPWeeklyChart();
  _updateStreakMilestones()
}

let _xpAnimFrame = null;

function _animateXPCounter(from, to) {
  const el = document.getElementById("xpCurrentNum");
  if (!el) return;
  if (_xpAnimFrame) cancelAnimationFrame(_xpAnimFrame);
  const dur = 600, start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / dur);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (to - from) * ease).toLocaleString("pt-BR");
    if (t < 1) _xpAnimFrame = requestAnimationFrame(tick);
  }
  _xpAnimFrame = requestAnimationFrame(tick);
}

function _getPavelQuote(levelIdx, pct) {
  const quotes = [
    '"Pequenos passos todos os dias."',
    '"O peso é seu, o aço é seu, a vitória é sua."',
    '"A repetição é o caminho da maestria."',
    '"Força não se compra, se conquista."',
    '"Nunca vá ao fracasso — mas vá ao limite."',
    '"Respira, foca, executa."',
    '"O descanso também é treino."',
    '"O corpo obedece quem a mente domina."',
    '"Constância vence talento."',
    '"O groove é seu — o ritmo é seu."'
  ];
  const idx = (levelIdx * 3 + Math.round(pct / 10)) % quotes.length;
  return quotes[idx];
}

function _updateStreakBox() {
  const days = streakData.atual || 0;
  const daysEl = document.getElementById("xpStreakDays");
  if (daysEl) daysEl.textContent = days;
  const fill = document.querySelector(".xp-streak-bar-fill");
  const nextEl = document.getElementById("xpStreakNext");
  const bonusEl = document.getElementById("xpBonusLabel");
  let target = 7, bonus = 10;
  if (days >= 30) { target = 30; bonus = 25; }
  else if (days >= 14) { target = 14; bonus = 15; }
  else if (days >= 7) { target = 7; bonus = 10; }
  if (nextEl) {
    if (days >= 30) nextEl.textContent = "Máx: +25%";
    else nextEl.textContent = target + "d → +" + bonus + "%";
  }
  if (bonusEl) bonusEl.textContent = "+" + bonus + "%";
  if (fill) {
    const pct = Math.min(100, Math.round((days / target) * 100));
    fill.style.width = pct + "%";
  }
}

let _xpWeeklyChart = null;


function renderXPWeeklyChart() {
  const canvas = document.getElementById("xpWeeklyChart");
  if (!canvas || typeof Chart === "undefined") return;

  // Monta os últimos 7 dias (do mais antigo ao mais recente)
  const dias = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dias.push(d.toISOString().slice(0, 10));
  }

  const nomesDia = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  const labels = dias.map(d => {
    const dt = new Date(d + "T12:00:00");
    return nomesDia[dt.getDay()] + " " + String(dt.getDate()).padStart(2, "0");
  });

  const regsPorDia = dias.map(d => (dados.registros || []).filter(r => r.data === d && !r.isTest));
  const xpPorDia = regsPorDia.map(regs => regs.reduce((acc, r) => acc + (r.xp || 0), 0));
  const seriesPorDia = regsPorDia.map(regs => regs.length);

  // Mini-stats
  const totalSemana = xpPorDia.reduce((a, b) => a + b, 0);
  const mediaSemana = Math.round(totalSemana / 7);
  const melhorDia = Math.max(...xpPorDia, 0);
  const totalSeries = seriesPorDia.reduce((a, b) => a + b, 0);

  const totalEl = document.getElementById("xpWeekTotal");
  const avgEl = document.getElementById("xpWeekAvg");
  const bestEl = document.getElementById("xpWeekBest");
  const seriesEl = document.getElementById("xpWeekSeries");
  if (totalEl) totalEl.textContent = totalSemana.toLocaleString("pt-BR");
  if (avgEl) avgEl.textContent = mediaSemana.toLocaleString("pt-BR");
  if (bestEl) bestEl.textContent = melhorDia.toLocaleString("pt-BR");
  if (seriesEl) seriesEl.textContent = totalSeries.toLocaleString("pt-BR");

  const hojeIdx = dias.length - 1;
  const corBarras = xpPorDia.map((_, i) => i === hojeIdx ? cssVar("--gold") : "rgba(204,0,0,0.55)");
  const corBordas = xpPorDia.map((_, i) => i === hojeIdx ? cssVar("--gold-light") : cssVar("--accent-red"));

  if (_xpWeeklyChart) { _xpWeeklyChart.destroy(); _xpWeeklyChart = null; }

  _xpWeeklyChart = new Chart(canvas.getContext("2d"), {
    data: {
      labels,
      datasets: [
        {
          type: "bar",
          label: "XP Ganho",
          data: xpPorDia,
          backgroundColor: corBarras,
          borderColor: corBordas,
          borderWidth: 1,
          borderRadius: 3,
          order: 2,
          yAxisID: "yXP"
        },
        {
          type: "line",
          label: "Séries",
          data: seriesPorDia,
          borderColor: cssVar("--accent-cyan"),
          backgroundColor: "rgba(0,229,255,0.08)",
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: cssVar("--accent-cyan"),
          pointBorderColor: cssVar("--bg-dark"),
          fill: false,
          tension: .35,
          order: 1,
          yAxisID: "ySeries"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          labels: { color: "#9A9A9A", font: { family: "Share Tech Mono", size: 9 }, boxWidth: 10 }
        },
        tooltip: {
          callbacks: {
            label: ctx => {
              if (ctx.dataset.label === "XP Ganho") return " +" + ctx.parsed.y + " XP";
              return " " + ctx.parsed.y + " série(s)";
            }
          }
        }
      },
      scales: {
        yXP: {
          position: "left",
          beginAtZero: true,
          ticks: { color: "#9A9A9A", font: { family: "Share Tech Mono", size: 8 } },
          grid: { color: "rgba(255,255,255,0.05)" },
          title: { display: true, text: "XP", color: "#9A9A9A", font: { family: "Share Tech Mono", size: 8 } }
        },
        ySeries: {
          position: "right",
          beginAtZero: true,
          ticks: { color: "#9A9A9A", font: { family: "Share Tech Mono", size: 8 }, stepSize: 1, precision: 0 },
          grid: { display: false },
          title: { display: true, text: "Séries", color: "#9A9A9A", font: { family: "Share Tech Mono", size: 8 } }
        },
        x: {
          ticks: { color: "#9A9A9A", font: { family: "Share Tech Mono", size: 9 } },
          grid: { display: false }
        }
      }
    }
  });
}

function _updateStreakMilestones() {
  const days = streakData.atual || 0;
  document.querySelectorAll("#xpStreakMbs .streak-mb").forEach(el => {
    const req = parseInt(el.dataset.days);
    if (days >= req) el.classList.add("reached");
    else el.classList.remove("reached");
  });
}

function showLevelUpOverlay(level) {
  const overlay = document.getElementById("xpLevelUpOverlay");
  if (!overlay) return;
  document.getElementById("levelUpIcon").textContent = level.icone;
  document.getElementById("levelUpName").textContent = level.nome;
  const starsEl = document.getElementById("levelUpStars");
  if (starsEl) starsEl.textContent = "★".repeat(Math.min(level.estrelas || 1, 7));
  const descEl = document.getElementById("levelUpDesc");
  if (descEl) descEl.textContent = level.descricao || "Você ascendeu de posto!";
  const divEl = document.getElementById("levelUpDivisao");
  if (divEl) divEl.textContent = level.divisao.toUpperCase();
  const levelIdx = NIVEIS.indexOf(level);
  const ivEl = document.getElementById("levelUpNumber");
  if (ivEl && levelIdx >= 0) ivEl.textContent = "NÍVEL " + (levelIdx + 1);
  const prev = levelIdx > 0 ? NIVEIS[levelIdx - 1] : null;
  const prevEl = document.getElementById("levelUpPrev");
  if (prevEl && prev) prevEl.textContent = prev.icone + " " + prev.nome;
  if (prevEl && !prev) prevEl.textContent = "";
  overlay.classList.add("active");
  _spawnLevelUpParticles();
  dispararConfetti();
  setTimeout(() => dispararConfetti(), 400);
  setTimeout(() => dispararConfetti(), 800);
}

function _spawnLevelUpParticles() {
  const wrap = document.getElementById("levelUpParticles");
  if (!wrap) return;
  wrap.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.style.cssText = "position:absolute;width:" + (2 + Math.random() * 4) + "px;height:" + (2 + Math.random() * 4) + "px;border-radius:50%;background:var(--gold);left:50%;top:50%;opacity:0;";
    const angle = (i / 30) * Math.PI * 2;
    const dist = 80 + Math.random() * 200;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const dur = 0.8 + Math.random() * 0.6;
    const delay = Math.random() * 0.3;
    p.style.animation = "luParticle " + dur + "s cubic-bezier(.25,.8,.25,1) " + delay + "s forwards";
    p.style.setProperty("--tx", tx + "px");
    p.style.setProperty("--ty", ty + "px");
    wrap.appendChild(p);
  }
  if (!document.getElementById("luParticleKeyframes")) {
    const style = document.createElement("style");
    style.id = "luParticleKeyframes";
    style.textContent = "@keyframes luParticle{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(0)}}";
    document.head.appendChild(style);
  }
}

function closeLevelUp() {
  const overlay = document.getElementById("xpLevelUpOverlay");
  if (overlay) overlay.classList.remove("active");
}

function verificarBadges() {
  const hoje = (new Date).toISOString().slice(0, 10);
  dados.registros.length > 0 && desbloquearBadge("primeiro_sangue");
  dados.registros.filter(reg => Array.isArray(reg.groove) && reg.groove.filter(Boolean).length === 3).length >= 50 && desbloquearBadge("perfeccionista_sovietico");
  dados.registros.filter(reg => reg.data === hoje).length >= 50 && desbloquearBadge("submaximo_mestre"), streakData.atual >= 7 && desbloquearBadge("frequencia_intensidade"), dados.exercicios.forEach(ex => {
    dados.registros.filter(reg => reg.exercicioId === ex.id && "reps" === ex.tipo).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 1e3 && desbloquearBadge("pavel_aprovaria")
  });
  dados.registros.filter(reg => reg.data === hoje).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 500 && desbloquearBadge("volume_sovietico"), dados.exercicios.forEach(ex => {
    dados.registros.filter(reg => reg.exercicioId === ex.id).length >= 100 && desbloquearBadge("especialista")
  }), dados.registros.length >= 100 && desbloquearBadge("centuriao"), dados.registros.length >= 1e3 && desbloquearBadge("mil_soldados"), streakData.atual >= 7 && desbloquearBadge("semana_perfeita");
  dados.registros.filter(reg => "grip" === reg.exercicioId).length >= 50 && desbloquearBadge("grip_de_ferro");
  dados.registros.filter(reg => "dead_hang" === reg.exercicioId).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 1800 && desbloquearBadge("pendulo_humano");
  dados.registros.filter(reg => "rosca_direta" === reg.exercicioId).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 200 && desbloquearBadge("biceps_de_aco");
  dados.registros.some(reg => parseInt((reg.hora || "00:00").split(":")[0]) < 7) && desbloquearBadge("madrugador");
  dados.registros.some(reg => parseInt((reg.hora || "00:00").split(":")[0]) >= 22) && desbloquearBadge("noturno"), streakData.atual >= 30 && desbloquearBadge("consistencia_30");
  new Set(dados.registros.filter(reg => reg.data === hoje).map(reg => reg.exercicioId)).size >= 5 && desbloquearBadge("poliglota_forca");
  dados.registros.reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 1e4 && desbloquearBadge("dez_mil_reps");
  dados.registros.filter(reg => "prancha" === reg.exercicioId).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 3600 && desbloquearBadge("mestre_prancha"), dados.registros.length >= 5e3 && desbloquearBadge("cinco_mil_series"), xpData.total >= 3e3 && desbloquearBadge("strongfirst"), streakData.atual >= 14 && desbloquearBadge("streak_14"), streakData.atual >= 30 && desbloquearBadge("streak_30");
  dados.registros.filter(reg => "barra_fixa" === reg.exercicioId).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 500 && desbloquearBadge("rei_da_barra");
  dados.registros.filter(reg => "agachamento" === reg.exercicioId).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 1e3 && desbloquearBadge("squat_master"), atualizarUIBadges()
}

function desbloquearBadge(badgeId) {
  if (!badgesData.desbloqueadas.includes(badgeId)) {
    badgesData.desbloqueadas.push(badgeId), salvarDadosDebounced(), vibrar([150, 80, 150, 80, 200]);
    const badge = TODAS_BADGES.find(b => b.id === badgeId);
    badge && (somBadge(), setTimeout(() => mostrarUnlockBadge(badge), 500))
  }
}

function mostrarUnlockBadge(badge) {
  document.getElementById("unlockIcon").textContent = badge.icone, document.getElementById("unlockName").textContent = badge.nome, document.getElementById("unlockDesc").textContent = badge.desc, document.getElementById("badgeUnlockOverlay").classList.add("active"), dispararConfetti()
}

function closeBadgeUnlock() {
  document.getElementById("badgeUnlockOverlay").classList.remove("active")
}

function renderBadges() {
  const container = document.getElementById("badgesGrid");
  container.innerHTML = "", TODAS_BADGES.forEach((badge, idx) => {
    const unlocked = badgesData.desbloqueadas.includes(badge.id);
    container.insertAdjacentHTML("beforeend", `\n      <div class="badge-item ${unlocked?"unlocked":""}" data-id="${badge.id}">\n        <div class="badge-icon-wrap" aria-hidden="true">${badge.icone}</div>\n        <div class="badge-name">${badge.nome}</div>\n        <div class="badge-desc">${badge.desc}</div>\n        ${unlocked?'<div class="badge-check" title="Desbloqueada">✓</div>':'<div class="badge-locked-overlay">BLOQUEADA</div>'}\n      </div>\n    `)
  });
  const unlocked = badgesData.desbloqueadas.length;
  document.getElementById("badgeCount").textContent = `${unlocked} / ${TODAS_BADGES.length} desbloqueadas`, setTimeout(() => {
    document.querySelectorAll(".badge-item").forEach((el, i) => {
      el.style.transitionDelay = 30 * i + "ms", el.classList.add("rendered")
    })
  }, 40)
}

function atualizarUIBadges() {
  renderBadges()
} // ===== GROOVE QUALITY SCORE =====

function atualizarDisplayShields() {
  const star = document.getElementById("shieldStar");
  const count = document.getElementById("shieldCount");
  if (star) {
    star.classList.toggle("has-shields", streakData.streakShields > 0);
    if (count) count.textContent = streakData.streakShields;
  }
  const countDisplay = document.getElementById("shieldCountDisplay");
  countDisplay && (countDisplay.textContent = streakData.streakShields + " / 3");
  const buyBtn = document.getElementById("btnBuyShield");
  if (buyBtn) {
    const canBuy = xpData.total >= streakData.shieldCost && streakData.streakShields < 3;
    buyBtn.disabled = !canBuy, streakData.streakShields >= 3 ? buyBtn.textContent = "MÁXIMO ATINGIDO" : buyBtn.textContent = "COMPRAR (" + streakData.shieldCost + " XP)"
  }
}

function comprarShield() {
  streakData.streakShields >= 3 ? mostrarToast("Máximo Atingido", "Você já tem 3 escudos.", "warning") : xpData.total < streakData.shieldCost ? mostrarToast("XP Insuficiente", "Você precisa de " + streakData.shieldCost + " XP.", "error") : (xpData.total -= streakData.shieldCost, streakData.streakShields += 1, salvarDados(), atualizarXP(), atualizarDisplayShields(), mostrarToast("⭐ Escudo Adquirido!", "Escudo de Streak comprado. Proteção ativa.", "success"), tocarSomRegistro())
}

function usarShield() {
  return streakData.streakShields > 0 && (streakData.streakShields -= 1, salvarDados(), atualizarDisplayShields(), mostrarToast("⭐ Escudo Ativado!", "Sua streak foi preservada pelo Escudo de Streak!", "warning"), dispararConfetti(), !0)
}

function mostrarUndoBar(e) {
  const a = document.getElementById("undoBar");
  a && a.remove(), undoState.timeoutId && clearTimeout(undoState.timeoutId), undoState.countdownInterval && clearInterval(undoState.countdownInterval), undoState.ultimoRegistro = e, undoState.segundosRestantes = 5;
  const t = document.createElement("div");
  t.className = "undo-bar", t.id = "undoBar", t.innerHTML = `\n    <div class="undo-text">✓ <span>${escapeHtml(e.exercicioNome)}</span> +${escapeHtml(String(e.valor))} ${e.peso?"@ "+escapeHtml(String(e.peso))+"kg":""}</div>\n    <div class="undo-timer" id="undoTimer">5s</div>\n    <button class="btn-undo" onclick="desfazerRegistro()">↩ DESFAZER</button>\n  `, document.body.appendChild(t), undoState.countdownInterval = setInterval(() => {
    undoState.segundosRestantes--;
    const e = document.getElementById("undoTimer");
    e && (e.textContent = undoState.segundosRestantes + "s"), undoState.segundosRestantes <= 0 && (clearInterval(undoState.countdownInterval), esconderUndoBar())
  }, 1e3), undoState.timeoutId = setTimeout(() => {
    esconderUndoBar()
  }, 5e3)
}

function esconderUndoBar() {
  const e = document.getElementById("undoBar");
  e && (e.classList.add("hide"), setTimeout(() => e.remove(), 300)), undoState.ultimoRegistro = null, undoState.countdownInterval && clearInterval(undoState.countdownInterval)
}

function desfazerRegistro() {
  if (!undoState.ultimoRegistro) return;
  const e = undoState.ultimoRegistro;
  dados.registros = dados.registros.filter(a => a.id !== e.id), xpData.total -= e.xp, xpData.total < 0 && (xpData.total = 0);
  const a = (new Date).toISOString().slice(0, 10);
  dados.registros.some(e => e.data === a) || streakData.ultimaData !== a || (streakData.ultimaData = null, streakData.atual = Math.max(0, streakData.atual - 1)), salvarDadosDebounced(), atualizarCardExercicio(e.exercicioId), atualizarStats(), renderHistory(), atualizarXP(), atualizarUIStreak(), esconderUndoBar(), mostrarToast("↩ Desfeito", e.exercicioNome + " removido. XP revertido.", "success")
}

function calcularStreakExercicio(e) {
  const a = new Set(dados.registros.filter(a => a.exercicioId === e).map(e => e.data || (e.timestamp ? new Date(e.timestamp).toISOString().slice(0, 10) : null)).filter(Boolean));
  if (0 === a.size) return 0;
  let t = 0;
  const o = new Date,
    r = o.toISOString().slice(0, 10);
  for (a.has(r) || o.setDate(o.getDate() - 1);;) {
    const e = o.toISOString().slice(0, 10);
    if (!a.has(e)) break;
    t++, o.setDate(o.getDate() - 1)
  }
  return t
}

let _gtgTimers = {};

function iniciarTimerGTG(e) {
  pararTimerGTG(e);
  const a = Date.now() + 12e5,
    t = document.getElementById("gtg-timer-" + e),
    o = () => {
      const o = a - Date.now();
      if (o <= 0) return pararTimerGTG(e), somTimer(), void mostrarToast("⚡ GTG PRONTO!", `${dados.exercicios.find(a=>a.id===e)?.nome||e} — hora da próxima série!`, "success");
      const r = Math.floor(o / 6e4),
        s = Math.floor(o % 6e4 / 1e3);
      t && (t.style.display = "flex", t.textContent = `⏱ ${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}`, t.style.color = o < 6e4 ? "var(--green-bright)" : o < 3e5 ? "var(--gold)" : "var(--gray-light)")
    };
  o(), _gtgTimers[e] = {
    end: a,
    intervalId: setInterval(o, 1e3)
  }
}

function pararTimerGTG(e) {
  _gtgTimers[e] && (clearInterval(_gtgTimers[e].intervalId), delete _gtgTimers[e]);
  const a = document.getElementById("gtg-timer-" + e);
  a && (a.style.display = "none")
}

function mostrarConfete() {
  var container = document.getElementById("confettiContainer");
  if (!container) return;
  var cores = ["var(--gold)", "var(--red-bright)", "var(--accent-cyan)", "var(--green-bright)", "var(--accent-ffaa)", "var(--accent-orange)"];
  for (var i = 0; i < 30; i++) {
    var p = document.createElement("div");
    p.className = "confetti-piece";
    var cor = cores[i % cores.length];
    var left = Math.random() * 100;
    var delay = Math.random() * 0.5;
    var dur = 0.8 + Math.random() * 0.6;
    var size = 4 + Math.random() * 6;
    var rot = Math.random() * 360;
    p.style.cssText = "left:" + left + "%;--delay:" + delay + "s;--dur:" + dur + "s;width:" + size + "px;height:" + size * 0.6 + "px;background:" + cor + ";--rot:" + rot + "deg;";
    container.appendChild(p);
  }
  setTimeout(function() { container.innerHTML = ""; }, 2000);
}

function _spawnParticles(circle, color) {
  const container = document.getElementById("readinessParticles");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const p = document.createElement("div");
    p.className = "readiness-particle";
    const angle = (Math.PI * 2 * i) / 12;
    const dist = 30 + Math.random() * 25;
    const px = Math.cos(angle) * dist;
    const py = Math.sin(angle) * dist;
    p.style.cssText = "left:50%;top:50%;background:" + color + ";--px:" + px + "px;--py:" + py + "px;animation-delay:" + (i * 0.04) + "s;width:" + (2 + Math.random() * 2) + "px;height:" + (2 + Math.random() * 2) + "px;";
    container.appendChild(p);
  }
  setTimeout(() => { container.innerHTML = ""; }, 900);
}

function dispararConfetti() {
  const colors = [cssVar("--accent-red"), cssVar("--gold"), cssVar("--gold-light"), cssVar("--red-bright"), cssVar("--green-bright")];
  document.querySelectorAll(".confetti-piece").forEach(function(el) { el.remove() });
  for (let i = 0; i < 15; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece", piece.style.left = 100 * Math.random() + "vw", piece.style.background = colors[Math.floor(Math.random() * colors.length)], piece.style.animationDelay = .5 * Math.random() + "s", document.body.appendChild(piece), setTimeout(() => piece.remove(), 3500)
  }
}



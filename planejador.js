async function carregarMetas() {
  try {
    const e = await getItem("gtg_metas");
    e && (dados.metas = JSON.parse(e))
  } catch (e) {
    dados.metas = {}
  }
}

function salvarMetas() {
  setItem("gtg_metas", JSON.stringify(dados.metas || {})).catch(e => console.warn("[storage]", e))
}

function calcularProgressoMeta(e) {
  if (!dados.metas) return null;
  const a = dados.metas[e];
  if (!a || !a.valor) return null;
  const t = (new Date).toISOString().slice(0, 10),
    o = getInicioSemana(t),
    r = t.slice(0, 7) + "-01";
  let s;
  s = "dia" === a.periodo ? t : "semana" === a.periodo ? o : r;
  const n = dados.registros.filter(a => a.exercicioId === e && a.data >= s && !a.isTest);
  let i;
  return i = "series" === a.tipo ? n.length : n.reduce((e, a) => e + (a.valor || 0), 0), {
    atual: i,
    meta: a.valor,
    pct: Math.min(100, Math.round(i / a.valor * 100)),
    periodo: a.periodo,
    tipo: a.tipo
  }
}

function atualizarBarrasMeta() {
  dados.metas && dados.exercicios.forEach(e => {
    const a = document.getElementById("meta-wrap-" + e.id);
    if (!a) return;
    const t = calcularProgressoMeta(e.id);
    if (!t) return void(a.style.display = "none");
    a.style.display = "block";
    const o = document.getElementById("meta-label-" + e.id),
      r = document.getElementById("meta-fill-" + e.id),
      s = document.getElementById("meta-pct-" + e.id),
      n = {
        dia: "HOJE",
        semana: "SEMANA",
        mes: "MÊS"
      } [t.periodo],
      i = "series" === t.tipo ? "séries" : "tempo" === e.tipo ? "seg" : "reps";
    o && (o.textContent = `${t.atual}/${t.meta} ${i} (${n})`), s && (s.textContent = t.pct + "%"), r && (r.style.width = t.pct + "%", r.style.background = t.pct >= 100 ? "linear-gradient(90deg,#2D7A2D,#44CC44)" : t.pct >= 60 ? "linear-gradient(90deg,var(--gold-dim),var(--gold))" : "linear-gradient(90deg,var(--red-dark),var(--red))")
  })
}

function abrirModalMeta(e) {
  const a = dados.exercicios.find(a => a.id === e);
  if (!a) return;
  const t = (dados.metas || {})[e] || {
      tipo: "series",
      valor: "",
      periodo: "dia"
    },
    o = "tempo" === a.tipo ? `<option value="series" ${"series"===t.tipo?"selected":""}>Séries</option><option value="reps" ${"reps"===t.tipo?"selected":""}>Segundos</option>` : `<option value="series" ${"series"===t.tipo?"selected":""}>Séries</option><option value="reps" ${"reps"===t.tipo?"selected":""}>Reps</option>`;
  let r = document.getElementById("metaModal");
  r || (r = document.createElement("div"), r.id = "metaModal", r.className = "modal-overlay", r.innerHTML = '\n      <div class="modal" style="max-width:340px;">\n        <div class="modal-header">\n          <span class="modal-title" id="metaModalTitle">🎯 DEFINIR META</span>\n          <button class="modal-close" onclick="document.getElementById(\'metaModal\').classList.remove(\'active\')">✕</button>\n        </div>\n        <div class="modal-body" id="metaModalBody"></div>\n      </div>', document.body.appendChild(r)), document.getElementById("metaModalTitle").textContent = "🎯 META — " + a.nome, document.getElementById("metaModalBody").innerHTML = `\n    <div class="form-group" style="margin-bottom:12px;">\n      <label class="form-label">Tipo de meta</label>\n      <select class="form-select" id="metaTipo" style="width:100%;">${o}</select>\n    </div>\n    <div class="form-group" style="margin-bottom:12px;">\n      <label class="form-label">Quantidade</label>\n      <input type="number" class="form-input" id="metaValor" style="width:100%;" value="${escapeHtml(String(t.valor))}" placeholder="Ex: 10" min="1">\n    </div>\n    <div class="form-group" style="margin-bottom:16px;">\n      <label class="form-label">Período</label>\n      <select class="form-select" id="metaPeriodo" style="width:100%;">\n        <option value="dia" ${"dia"===t.periodo?"selected":""}>Por dia</option>\n        <option value="semana" ${"semana"===t.periodo?"selected":""}>Por semana</option>\n        <option value="mes" ${"mes"===t.periodo?"selected":""}>Por mês</option>\n      </select>\n    </div>\n    <div style="display:flex;gap:8px;">\n      <button class="btn btn-red" style="flex:1;" onclick="salvarMeta('${e}')">✓ SALVAR META</button>\n      <button class="btn btn-outline" onclick="removerMeta('${e}')">✕ REMOVER</button>\n    </div>\n  `, r.classList.add("active")
}

function salvarMeta(e) {
  const a = document.getElementById("metaTipo").value,
    t = parseInt(document.getElementById("metaValor").value),
    o = document.getElementById("metaPeriodo").value;
  !t || t < 1 ? mostrarToast("Erro", "Insira um valor válido", "error") : (dados.metas || (dados.metas = {}), dados.metas[e] = {
    tipo: a,
    valor: t,
    periodo: o
  }, salvarMetas(), document.getElementById("metaModal").classList.remove("active"), atualizarBarrasMeta(), mostrarToast("🎯 Meta definida", "Acompanhe o progresso no card do exercício.", "success"))
}

function removerMeta(e) {
  dados.metas && delete dados.metas[e], salvarMetas(), document.getElementById("metaModal").classList.remove("active"), atualizarBarrasMeta(), mostrarToast("Meta removida", "", "success")
}

function copiarTreinoDia() {
  const e = (new Date).toISOString().slice(0, 10),
    a = dados.registros.filter(a => a.data === e && !a.isTest).sort((e, a) => e.timestamp - a.timestamp);
  if (0 === a.length) return void mostrarToast("Sem treino hoje", "Nenhuma série registrada hoje ainda.", "error");
  const t = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][(new Date).getDay()],
    o = new Date(e + "T12:00:00").toLocaleDateString("pt-BR");
  let r = `🏋️ GTG TRACKER — ${t.toUpperCase()}, ${o}\n`;
  r += `${"─".repeat(36)}\n`;
  const s = {};
  a.forEach(e => {
    s[e.exercicioId] || (s[e.exercicioId] = {
      nome: e.exercicioNome,
      series: []
    }), s[e.exercicioId].series.push(e)
  }), Object.values(s).forEach(({
    nome: e,
    series: a
  }) => {
    const t = dados.exercicios.find(a => a.nome === e),
      o = "tempo" === t?.tipo ? "seg" : "reps",
      s = a.reduce((e, a) => e + (a.valor || 0), 0);
    r += `\n★ ${e}\n`, a.forEach((e, a) => {
      r += `  Série ${a+1}: ${e.valor} ${o}${e.peso?` @ ${e.peso}kg`:""}${e.rpe?` (RPE ${e.rpe})`:""}\n`
    }), r += `  Total: ${a.length} séries · ${s} ${o}\n`
  });
  const n = a.reduce((e, a) => e + (a.xp || 0), 0);
  r += `\n${"─".repeat(36)}\n`, r += `${a.length} séries · +${n} XP · Streak ${streakData.atual} dias 🔥\n`, r += "\n#GTG #GreaTheGroove #Pavel", navigator.clipboard.writeText(r).then(() => {
    mostrarToast("📋 Copiado!", "Treino do dia copiado. Cole no WhatsApp, Telegram ou onde quiser.", "success")
  }).catch(() => {
    const e = document.createElement("textarea");
    e.value = r, e.style.position = "fixed", e.style.opacity = "0", document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e), mostrarToast("📋 Copiado!", "Treino do dia copiado para a área de transferência.", "success")
  })
}

const DIAS_SEMANA = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"],
  DIAS_COMPLETOS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

let planejador = {};

async function carregarPlanejador() {
  try {
    const e = await getItem("gtg_planejador");
    planejador = e ? JSON.parse(e) : {}
  } catch (e) {
    planejador = {}
  }
}

function salvarPlanejador() {
  setItem("gtg_planejador", JSON.stringify(planejador)).catch(e => console.warn("[storage]", e))
}

function renderPlanejador() {
  carregarPlanejador();
  const e = document.getElementById("planejadorGrid");
  if (!e) return;
  const a = (new Date).getDay();
  e.innerHTML = DIAS_SEMANA.map((e, t) => {
    const o = planejador[t] || [],
      r = t === a,
      s = r ? "border:1.5px solid var(--gold); background:rgba(212,160,23,0.06);" : "border:1px solid rgba(255,255,255,0.08);",
      n = o.map(e => {
        const a = dados.exercicios.find(a => a.id === e);
        return a ? `<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05);">\n        <span style="font-family:Rajdhani,sans-serif;font-size:13px;color:var(--white-dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:105px;">${escapeHtml(a.nome)}</span>\n        <button onclick="removerDoPlanejador(${t},'${e}')" style="background:none;border:none;color:var(--gray);cursor:pointer;font-size:10px;padding:0 2px;flex-shrink:0;">x</button>\n      </div>` : ""
      }).join(""),
      i = 0 === o.length ? '<div style="color:var(--gray);font-family:Share Tech Mono,monospace;font-size:10px;text-align:center;padding:8px 0;">DESCANSO</div>' : "";
    return `<div style="${s}border-radius:4px;padding:12px;position:relative;">\n      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">\n        <span style="font-family:Bebas Neue,sans-serif;font-size:15px;letter-spacing:2px;color:${r?"var(--gold)":"var(--white)"};">${e}${r?" ★":""}</span>\n        <button onclick="abrirSeletorExercicio(${t})" style="background:rgba(255,255,255,0.08);border:none;color:var(--white);border-radius:2px;width:20px;height:20px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;padding:0;">+</button>\n      </div>\n      <div id="plano-dia-${t}">${n}${i}</div>\n    </div>`
  }).join(""), renderPlanoHoje()
}

function renderPlanoHoje() {
  const e = (new Date).getDay(),
    a = document.getElementById("planejadorHojeCard"),
    t = document.getElementById("planejadorHojeBody"),
    o = document.getElementById("planejadorHojeTitle");
  if (!a || !t) return;
  const r = planejador[e] || [];
  if (0 === r.length) return void(a.style.display = "none");
  a.style.display = "", o && (o.textContent = "🎯 PLANO DE " + DIAS_SEMANA[e] + " — " + DIAS_COMPLETOS[e].toUpperCase());
  const s = (new Date).toISOString().slice(0, 10);
  t.innerHTML = r.map(e => {
    const a = dados.exercicios.find(a => a.id === e);
    if (!a) return "";
    const t = dados.registros.filter(a => a.exercicioId === e && a.data === s).length,
      o = (dados.metas || {})[e],
      r = o ? " · Meta: " + o.valor + " " + ("series" === o.tipo ? "series" : "reps") : "";
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:${t>0?"rgba(45,122,45,0.15)":"rgba(255,255,255,0.03)"};border:1px solid ${t>0?"rgba(68,204,68,0.3)":"rgba(255,255,255,0.08)"};border-radius:4px;margin-bottom:8px;">\n      <div>\n        <div style="font-family:Bebas Neue,sans-serif;font-size:16px;letter-spacing:1px;">${escapeHtml(a.nome)}</div>\n        <div class="text-mono" style="font-size:10px;color:var(--gray-light);">${t} serie(s) hoje${r}</div>\n      </div>\n      <div style="display:flex;gap:8px;align-items:center;">\n        ${t>0?'<span style="color:var(--green-bright);font-size:18px;">✓</span>':""}\n        <button class="btn btn-outline btn-sm" onclick="document.querySelector('.nav-tab[data-tab=treino]').click();setTimeout(()=>document.getElementById('excard-${e}')?.scrollIntoView({behavior:'smooth',block:'center'}),300);">IR →</button>\n      </div>\n    </div>`
  }).join("")
}

function abrirSeletorExercicio(e) {
  let a = document.getElementById("seletorExModal");
  a || (a = document.createElement("div"), a.id = "seletorExModal", a.className = "modal-overlay", a.innerHTML = '<div class="modal" style="max-width:380px;"><div class="modal-header"><span class="modal-title" id="seletorExTitle">ADICIONAR</span><button class="modal-close" onclick="document.getElementById(\'seletorExModal\').classList.remove(\'active\')">x</button></div><div class="modal-body" style="padding:0;max-height:400px;overflow-y:auto;" id="seletorExBody"></div></div>', document.body.appendChild(a)), document.getElementById("seletorExTitle").textContent = "+ " + DIAS_COMPLETOS[e].toUpperCase();
  const t = planejador[e] || [];
  document.getElementById("seletorExBody").innerHTML = dados.exercicios.map(a => {
    const o = t.includes(a.id);
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid rgba(255,255,255,0.05);${o?"opacity:0.4;":""}">\n      <span style="font-family:Rajdhani,sans-serif;font-size:15px;">${escapeHtml(a.nome)}</span>\n      <button class="btn btn-sm ${o?"btn-outline":"btn-red"}" ${o?"disabled":'onclick="adicionarAoPlanejador('+e+",'"+a.id+"')\""}>\n        ${o?"✓ JA ADD":"+ ADD"}\n      </button>\n    </div>`
  }).join(""), a.classList.add("active")
}

function adicionarAoPlanejador(e, a) {
  planejador[e] || (planejador[e] = []), planejador[e].includes(a) || planejador[e].push(a), salvarPlanejador(), document.getElementById("seletorExModal").classList.remove("active"), renderPlanejador();
  const t = dados.exercicios.find(e => e.id === a);
  mostrarToast("📅 Adicionado", (t ? t.nome : a) + " adicionado ao " + DIAS_COMPLETOS[e] + ".", "success")
}

function removerDoPlanejador(e, a) {
  planejador[e] && (planejador[e] = planejador[e].filter(e => e !== a), salvarPlanejador(), renderPlanejador())
}

function limparPlanejador() {
  confirmarAcao("LIMPAR SEMANA?", "Remove todos os exercicios do planejador semanal.", () => {
    planejador = {}, salvarPlanejador(), renderPlanejador(), mostrarToast("Planejador limpo", "", "success")
  })
}

function irParaTreinoHoje() {
  document.querySelector('.nav-tab[data-tab="treino"]')?.click()
}

let _notaData = (new Date).toISOString().slice(0, 10),
  _notaTimer = null;

async function carregarNotas() {
  try {
    const raw = await getItem("gtg_notas");
    return JSON.parse(raw || "{}")
  } catch (e) {
    return {}
  }
}

async function salvarNotaDia() {
  const e = await carregarNotas(),
    a = document.getElementById("notaDiaria")?.value || "";
  a.trim() ? e[_notaData] = a : delete e[_notaData], setItem("gtg_notas", JSON.stringify(e)).catch(e => console.warn("[storage]", e));
  const t = document.getElementById("notaSalvoLabel");
  t && (t.textContent = "Salvo automaticamente", setTimeout(() => {
    t.textContent = ""
  }, 2e3))
}

async function renderNotaDia() {
  const e = await carregarNotas(),
    a = document.getElementById("notaDiaria"),
    t = document.getElementById("notaDataLabel"),
    o = document.getElementById("notaProxBtn"),
    r = (new Date).toISOString().slice(0, 10);
  if (a && (a.value = e[_notaData] || ""), t) {
    const e = new Date(_notaData + "T12:00:00"),
      a = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    t.textContent = a[e.getDay()] + ", " + e.toLocaleDateString("pt-BR")
  }
  o && (o.disabled = _notaData >= r)
}

async function navegarNota(e) {
  const a = new Date(_notaData + "T12:00:00");
  a.setDate(a.getDate() + e);
  const t = (new Date).toISOString().slice(0, 10),
    o = a.toISOString().slice(0, 10);
  o > t || (_notaData = o, await renderNotaDia())
}

const CAL_MESES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const CAL_DIAS = ["Domingo","Segunda","Terça","Quarta","Quita","Sexta","Sábdo"];

let calState = { mes: new Date().getMonth(), ano: new Date().getFullYear() };

function renderCalendario() {
  const grid = document.getElementById("calGrid"), title = document.getElementById("calNavTitle");
  if (!grid) return;
  const { mes, ano } = calState;
  title.textContent = `${CAL_MESES[mes]} ${ano}`;
  const primeiro = new Date(ano, mes, 1).getDay(),
    diasNoMes = new Date(ano, mes + 1, 0).getDate(),
    hoje = new Date(),
    hojeStr = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
  const dias = {};
  dados.registros.forEach(r => {
    if (r.data) {
      const [y, m, d] = r.data.split("-").map(Number);
      if (y === ano && m === mes + 1) dias[d] = (dias[d] || 0) + ((r.valor || 0) + (r.xp || 0))
    }
  });
  const maxVal = Math.max(...Object.values(dias), 1);
  let html = CAL_DIAS.map(d => `<div class="cal-day-header">${d}</div>`).join("");
  for (let i = 0; i < primeiro; i++) html += '<div class="cal-day cal-day-empty"></div>';
  for (let d = 1; d <= diasNoMes; d++) {
    const val = dias[d] || 0,
      nivel = val === 0 ? 0 : Math.min(5, Math.ceil(val / maxVal * 5)),
      hojeClass = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}` === hojeStr ? " cal-day-today" : "";
    html += `<div class="cal-day cal-day-nivel-${nivel}${hojeClass}" onclick="mostrarDetalheDia(${ano},${mes},${d})">${d}</div>`
  }
  grid.innerHTML = html
}

function navegarCalendario(delta) {
  calState.mes += delta;
  if (calState.mes > 11) { calState.mes = 0; calState.ano++ }
  if (calState.mes < 0) { calState.mes = 11; calState.ano-- }
  renderCalendario()
}

function mostrarDetalheDia(ano, mes, dia) {
  const data = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`,
    regs = dados.registros.filter(r => r.data === data),
    modal = document.getElementById("calDetalheModal");
  if (!modal || !regs.length) return;
  document.getElementById("calDetalheTitle").textContent = `📆 ${dia} ${CAL_MESES[mes]} ${ano}`;
  const totalReps = regs.reduce((a, r) => a + (r.valor || 0), 0),
    totalXP = regs.reduce((a, r) => a + (r.xp || 0), 0),
    agrupado = {};
  regs.forEach(r => {
    const key = r.exercicioNome || r.exercicioId || "?";
    agrupado[key] || (agrupado[key] = { series: 0, reps: 0 });
    agrupado[key].series++, agrupado[key].reps += r.valor || 0
  });
  const items = Object.entries(agrupado).map(([nome, st]) =>
    `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
      <span style="font-family:Rajdhani,sans-serif;font-size:14px;">${escapeHtml(nome)}</span>
      <span class="text-mono" style="font-size:12px;color:var(--gold);">${st.series}s &middot; ${st.reps} reps</span>
    </div>`
  ).join("");
  document.getElementById("calDetalheBody").innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;">
      <div style="text-align:center;background:rgba(212,160,23,0.08);border:1px solid rgba(212,160,23,0.2);border-radius:4px;padding:10px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:26px;color:var(--gold);">${regs.length}</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">SÉRIES</div>
      </div>
      <div style="text-align:center;background:rgba(45,122,45,0.08);border:1px solid rgba(45,122,45,0.2);border-radius:4px;padding:10px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:26px;color:var(--green-bright);">+${totalXP}</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">XP</div>
      </div>
    </div>
    ${items}
    <div style="margin-top:12px;font-family:Share Tech Mono,monospace;font-size:10px;color:var(--gray-light);letter-spacing:1px;text-align:center;">VOLUME TOTAL: ${totalReps} reps</div>
  `, modal.classList.add("active")
}


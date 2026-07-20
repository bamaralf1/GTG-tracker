let shareCardTema = "dark";

function toggleTemaCard(tema) {
  shareCardTema = "dark";
  abrirShareCard(!0);
}

let shareCardBlob = null;

function abrirShareCard(skipToast) {
  preencherShareCard(), skipToast || mostrarToast("Gerando...", "Preparando cartão do dia", "success"), setTimeout(() => {
    const canvas = document.getElementById("shareCardCanvas");
    html2canvas(canvas, {
      width: 1080,
      height: 1920,
      scale: 1,
      useCORS: !0,
      allowTaint: !0,
      backgroundColor: shareCardTema === "light" ? "#F0F4F8" : cssVar("--bg-dark"),
      logging: !1,
      onclone: function(doc) {
        const cloned = doc.getElementById("shareCardCanvas");
        cloned && (cloned.style.position = "relative", cloned.style.left = "0", cloned.style.top = "0")
      }
    }).then(canvas => {
      canvas.toBlob(blob => {
        shareCardBlob = blob;
        const url = URL.createObjectURL(blob);
        document.getElementById("shareCardPreview").src = url, document.getElementById("shareCardModal").classList.add("active")
      }, "image/png", 1)
    }).catch(err => {
      console.error("Erro ao gerar cartão:", err), mostrarToast("Erro", "Não foi possível gerar a imagem. Tente novamente.", "error")
    })
  }, 200)
}

function preencherShareCard() {
  const hoje = (new Date).toISOString().slice(0, 10),
    now = new Date;
  document.getElementById("sc-date").textContent = `${["DOMINGO","SEGUNDA","TERÇA","QUARTA","QUINTA","SEXTA","SÁBADO"][now.getDay()]} · ${String(now.getDate()).padStart(2,"0")} ${["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"][now.getMonth()]} ${now.getFullYear()}`;
  const regsHoje = dados.registros.filter(r => r.data === hoje),
    totalReps = regsHoje.reduce((acc, r) => acc + (r.valor || 0), 0),
    totalXP = regsHoje.reduce((acc, r) => acc + (r.xp || 0), 0);
  document.getElementById("sc-series").textContent = regsHoje.length, document.getElementById("sc-reps").textContent = totalReps, document.getElementById("sc-xp").textContent = totalXP, document.getElementById("sc-streak").textContent = streakData.atual;
  const level = getNivel(xpData.total),
    xpNoNivel = xpData.total - level.min,
    xpParaProximo = level.proximo - level.min || 1,
    xpPct = Math.min(100, Math.round(xpNoNivel / xpParaProximo * 100));
  document.getElementById("sc-level-icon").textContent = level.icone, document.getElementById("sc-level-name").textContent = level.nome, document.getElementById("sc-level-xp").textContent = `${xpData.total} XP TOTAL`, document.getElementById("sc-xp-bar").style.width = xpPct + "%";
  const listEl = document.getElementById("sc-exercises-list");
  listEl.innerHTML = "";
  const grupos = {};
  regsHoje.forEach(r => {
    grupos[r.exercicioId] || (grupos[r.exercicioId] = { nome: r.exercicioNome, series: 0, reps: 0 }), grupos[r.exercicioId].series++, grupos[r.exercicioId].reps += r.valor || 0
  });
  const entries = Object.values(grupos);
  0 === entries.length ? listEl.innerHTML = '<div style="width:100%; padding:30px; background:var(--bg-111); border-left:5px solid var(--accent-red); font-family:\'Share Tech Mono\',monospace; font-size:20px; color:var(--gray); letter-spacing:3px; text-align:center;">SEM REGISTROS HOJE</div>' : entries.slice(0, 7).forEach(g => {
    const ex = dados.exercicios.find(e => e.id === Object.keys(grupos).find(k => grupos[k].nome === g.nome)),
      unit = ex ? "tempo" === ex.tipo ? "seg" : ex.unidade || "reps" : "reps";
    listEl.innerHTML += `\n        <div class="sc-exercise-row">\n          <div class="sc-ex-name">${escapeHtml(g.nome)}</div>\n          <div class="sc-ex-chips">\n            <div class="sc-ex-chip">\n              <div class="sc-ex-chip-val">${g.series}</div>\n              <div class="sc-ex-chip-lbl">SÉRIES</div>\n            </div>\n            <div class="sc-ex-chip">\n              <div class="sc-ex-chip-val">${g.reps}</div>\n              <div class="sc-ex-chip-lbl">${unit.toUpperCase()}</div>\n            </div>\n          </div>\n        </div>`
  })
}

function baixarShareCard() {
  if (!shareCardBlob) return void mostrarToast("Erro", "Gere o cartão primeiro", "error");
  const hoje = (new Date).toISOString().slice(0, 10),
    url = URL.createObjectURL(shareCardBlob),
    link = document.createElement("a");
  link.href = url, link.download = `gtg_cartao_${hoje}.png`, link.click(), URL.revokeObjectURL(url), mostrarToast("✓ Baixado!", "Imagem salva. Pronto para Stories e Status!", "success")
}

async function copiarShareCard() {
  if (shareCardBlob) try {
    await navigator.clipboard.write([new ClipboardItem({ "image/png": shareCardBlob })]), mostrarToast("✓ Copiado!", "Imagem copiada — cole direto no WhatsApp ou Instagram", "success")
  } catch (err) {
    baixarShareCard(), mostrarToast("Info", "Seu navegador não suporta copiar imagem. Arquivo baixado!", "warning")
  } else mostrarToast("Erro", "Gere o cartão primeiro", "error")
}

function montarResumoHoje() {
  const hoje = (new Date).toISOString().slice(0, 10);
  const regsHoje = dados.registros.filter(r => r.data === hoje);
  const totalSeries = regsHoje.length;
  const totalReps = regsHoje.reduce((acc, r) => acc + (r.valor || 0), 0);
  const grupos = {};
  regsHoje.forEach(r => {
    grupos[r.exercicioId] || (grupos[r.exercicioId] = { nome: r.exercicioNome, series: 0, reps: 0 });
    grupos[r.exercicioId].series++;
    grupos[r.exercicioId].reps += r.valor || 0;
  });
  const linhas = Object.values(grupos).map(g => `  ${g.nome}: ${g.series} séries, ${g.reps} reps`).join("\n");
  const streak = streakData?.atual || 0;
  const xp = xpData?.total || 0;
  let texto = `🔥 *GTG TRACKER — RESUMO DO DIA*\n`;
  texto += `📅 ${new Date().toLocaleDateString("pt-BR")}\n\n`;
  texto += totalSeries > 0 ? `💪 ${totalSeries} séries · ${totalReps} reps\n${linhas}\n` : `💤 Dia de descanso\n`;
  texto += `\n📈 Streak: ${streak} dias · XP: ${xp}\n`;
  texto += `🏋️ #GTG #GreaseTheGroove`;
  return texto;
}

async function compartilharWhatsApp() {
  if (!shareCardBlob) return void mostrarToast("Erro", "Gere o cartão primeiro", "error");
  const texto = montarResumoHoje();
  try {
    if (navigator.canShare && navigator.canShare({ files: [new File([shareCardBlob], "gtg_cartao.png", { type: "image/png" })] })) {
      await navigator.share({ files: [new File([shareCardBlob], "gtg_cartao.png", { type: "image/png" })], text: texto });
    } else {
      await navigator.share({ text: texto });
    }
  } catch (err) {
    if (err.name === "AbortError") return;
    const url = "https://wa.me/?text=" + encodeURIComponent(texto);
    window.open(url, "_blank");
  }
}

async function compartilharInstagram() {
  if (!shareCardBlob) return void mostrarToast("Erro", "Gere o cartão primeiro", "error");
  try {
    const file = new File([shareCardBlob], "gtg_cartao.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file] });
    } else {
      mostrarToast("ℹ️ Salve a imagem", "Instagram não aceita compartilhamento direto. Baixe a imagem e poste manualmente nos Stories / Status.", "warning");
      baixarShareCard();
    }
  } catch (err) {
    if (err.name === "AbortError") return;
    mostrarToast("ℹ️ Salve a imagem", "Instagram não aceita compartilhamento direto. Baixe a imagem e poste manualmente nos Stories / Status.", "warning");
    baixarShareCard();
  }
}

function exportTXTHoje() {
  const hoje = (new Date).toISOString().slice(0, 10),
    regs = dados.registros.filter(r => r.data === hoje);
  if (0 === regs.length) return void mostrarToast("Info", "Sem registros hoje para exportar.", "warning");
  downloadFile(gerarTXTHoje(regs, hoje), `gtg_treino_${hoje}.txt`, "text/plain"), mostrarToast("Exportado", "TXT do dia de hoje baixado!", "success")
}

function gerarTXTHoje(regs, data) {
  const now = new Date,
    dataExt = `${["DOMINGO","SEGUNDA","TERÇA","QUARTA","QUINTA","SEXTA","SÁBADO"][now.getDay()]} ${String(now.getDate()).padStart(2,"0")} ${["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"][now.getMonth()]} ${now.getFullYear()}`;
  let out = "══════════════════════════════════════════════════════════════\n";
  out += "GTG TRACKER — FORÇA E RESISTÊNCIA — TREINO DO DIA\n", out += "══════════════════════════════════════════════════════════════\n\n", out += `DATA: ${dataExt}\n`, out += `XP TOTAL: ${xpData.total} | NÍVEL: ${xpData.nivel} | STREAK: ${streakData.atual} dias\n`, out += `GERADO EM: ${now.toLocaleString("pt-BR")}\n\n`, out += "────────────────────────────────────────────────────────────────\n", out += "EXERCÍCIOS DE HOJE:\n", out += "────────────────────────────────────────────────────────────────\n\n";
  const grupos = {};
  regs.forEach(r => {
    grupos[r.exercicioId] || (grupos[r.exercicioId] = { nome: r.exercicioNome, series: [], xpTotal: 0 }), grupos[r.exercicioId].series.push(r), grupos[r.exercicioId].xpTotal += r.xp || 0
  }), Object.values(grupos).forEach(g => {
    const total = g.series.reduce((acc, s) => acc + (s.valor || 0), 0);
    out += `▶ ${g.nome}\n`, out += `   Séries: ${g.series.length} | Total: ${total} | XP: +${g.xpTotal}\n`, g.series.forEach((s, i) => {
      out += `   [${i+1}] ${s.hora} — ${s.valor} ${s.peso?"@ "+s.peso+"kg":""}\n`
    }), out += "\n"
  });
  const totalReps = regs.reduce((acc, r) => acc + (r.valor || 0), 0),
    totalXP = regs.reduce((acc, r) => acc + (r.xp || 0), 0);
  return out += "────────────────────────────────────────────────────────────────\n", out += `TOTAL DO DIA: ${regs.length} séries | ${totalReps} reps | +${totalXP} XP\n`, out += "══════════════════════════════════════════════════════════════\n", out
}

function exportTXT() {
  downloadFile(gerarTXT(dados.registros), "gtg_historico.txt", "text/plain"), mostrarToast("Exportado", "Arquivo TXT baixado com sucesso!", "success")
}

function exportTXTRange() {
  const start = document.getElementById("exportStart").value,
    end = document.getElementById("exportEnd").value;
  if (!start || !end) return void mostrarToast("Erro", "Selecione as datas", "error");
  downloadFile(gerarTXT(dados.registros.filter(r => r.data >= start && r.data <= end)), `gtg_historico_${start}_${end}.txt`, "text/plain"), mostrarToast("Exportado", "Arquivo TXT do intervalo baixado!", "success")
}

function gerarTXT(registros) {
  let out = "══════════════════════════════════════════════════════════════\n";
  out += "GTG TRACKER — FORÇA E RESISTÊNCIA — RELATÓRIO DE TREINO\n", out += "══════════════════════════════════════════════════════════════\n\n", out += `XP TOTAL: ${xpData.total} | NÍVEL: ${xpData.nivel} | STREAK: ${streakData.atual} dias\n`, out += `GERADO EM: ${(new Date).toLocaleString("pt-BR")}\n\n`, out += "────────────────────────────────────────────────────────────────\n", out += "HISTÓRICO DE SÉRIES:\n", out += "────────────────────────────────────────────────────────────────\n\n";
  const sorted = [...registros].sort((a, b) => b.timestamp - a.timestamp);
  return sorted.forEach(r => {
    out += `[${r.data} ${r.hora}] ${r.exercicioNome}: ${r.valor} ${r.peso?"@ "+r.peso+"kg ":""}(+${r.xp} XP)\n`
  }), out += "\n────────────────────────────────────────────────────────────────\n", out += `TOTAL: ${sorted.length} séries | ${sorted.reduce((acc,r)=>acc+(r.valor||0),0)} reps acumulados\n`, out += "══════════════════════════════════════════════════════════════\n", out
}

async function exportPDF() {
  await gerarRelatorioPDF(dados.registros, "HISTÓRICO COMPLETO", "gtg_relatorio_completo.pdf")
}

async function exportPDFRange() {
  const start = document.getElementById("exportStart").value,
    end = document.getElementById("exportEnd").value;
  if (!start || !end) return void mostrarToast("Erro", "Selecione o intervalo de datas inicial e final.", "error");
  const regs = dados.registros.filter(r => r.data >= start && r.data <= end),
    titulo = `DE ${formatarDataPtBR(start)} ATÉ ${formatarDataPtBR(end)}`;
  await gerarRelatorioPDF(regs, titulo, `gtg_relatorio_${start}_${end}.pdf`)
}

async function gerarRelatorioPDF(registros, titulo, fileName) {
  if (registros && 0 !== registros.length) {
    mostrarToast("Iniciando...", "Preparando o Relatório de Combate em PDF...", "success");
    try {
      const { jsPDF: PDFLib } = window.jspdf, doc = new PDFLib("p", "pt", "a4");
      doc.text("Relatório GTG — " + titulo, 40, 40), doc.text("Total de séries: " + registros.length, 40, 60), doc.text("XP total: " + registros.reduce((acc, r) => acc + (r.xp || 0), 0), 40, 80), doc.save(fileName), mostrarToast("Sucesso!", "PDF gerado com sucesso!", "success")
    } catch (err) {
      mostrarToast("Erro", "Falha ao gerar PDF. Tente exportar TXT.", "error")
    }
  } else mostrarToast("Aviso", "Nenhum registro encontrado para exportar.", "warning")
}

function exportJSON() {
  const payload = { dados, streakData, xpData, badgesData };
  downloadFile(JSON.stringify(payload, null, 2), "gtg_backup.json", "application/json"), mostrarToast("Backup", "Arquivo JSON baixado!", "success")
}

function importJSON() {
  document.getElementById("importFile").click()
}

function handleImport(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader;
  reader.onload = e => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed || typeof parsed !== "object") throw new Error("Formato inválido");
      if (parsed.dados) {
        if (typeof parsed.dados !== "object" || !Array.isArray(parsed.dados.exercicios) || !Array.isArray(parsed.dados.registros)) throw new Error("Estrutura 'dados' inválida");
        dados = parsed.dados;
      }
      if (parsed.streakData) {
        if (typeof parsed.streakData !== "object" || typeof parsed.streakData.atual !== "number") throw new Error("Estrutura 'streakData' inválida");
        streakData = parsed.streakData;
      }
      if (parsed.xpData && typeof parsed.xpData === "object") xpData = parsed.xpData;
      if (parsed.badgesData && typeof parsed.badgesData === "object") badgesData = parsed.badgesData;
      salvarDados(), inicializar(), mostrarToast("Importado", "Dados restaurados com sucesso!", "success")
    } catch (err) {
      mostrarToast("Erro", err.message === "Arquivo inválido" || err.message.startsWith("Estrutura") ? err.message : "Arquivo inválido", "error")
    }
  }, reader.readAsText(file)
}

async function limparCachesPWA() {
  if (!("caches" in window)) return;
  try {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith("gtg-cache-")).map((name) => caches.delete(name)));
  } catch (e) {
    console.warn("[pwa] Falha ao limpar caches da PWA:", e);
  }
}

async function clearAllData() {
  if (!window.confirm("APAGAR TODOS OS DADOS? Isso não pode ser desfeito!")) return;
  try {
    await clearAll();
  } catch (e) {
    console.warn("[storage] Erro ao limpar IndexedDB:", e);
  }
  try {
    await limparCachesPWA();
  } catch (e) {
    console.warn("[pwa] Erro ao limpar caches da PWA:", e);
  }
  try { localStorage.clear(); } catch(e) {}
  location.reload()
}

function exportCSV() {
  const e = [...dados.registros].sort((e, a) => e.timestamp - a.timestamp).map(e => {
    const a = dados.exercicios.find(a => a.id === e.exercicioId),
      t = "tempo" === a?.tipo ? "seg" : a?.unidade || "reps";
    return [e.data || "", e.hora || "", `"${(e.exercicioNome||"").replace(/"/g,'""')}"`, e.exercicioId || "", a?.tipo || "", e.valor || 0, t, e.peso || 0, e.xp || 0, e.rpe || "", e.isTest ? "sim" : "nao"].join(",")
  });
  downloadFile("\ufeff" + [
    ["Data", "Hora", "Exercício", "ID", "Tipo", "Valor", "Unidade", "Peso (kg)", "XP", "RPE", "Teste"].join(","), ...e
  ].join("\n"), "gtg_historico.csv", "text/csv;charset=utf-8"), mostrarToast("CSV exportado", `${e.length} registros exportados. Abra no Excel ou Google Sheets.`, "success")
}


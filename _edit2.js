const fs = require('fs');
const path = 'C:\\Users\\PICHAU\\Desktop\\GTG GM\\app.js';
let content = fs.readFileSync(path, 'utf8');

const log = (msg) => console.log('[EDIT]', msg);
let editsApplied = 0;

function safeReplace(haystack, needle, replacement, name) {
    const idx = haystack.indexOf(needle);
    if (idx === -1) {
        console.error('[MISS]', name, '— needle not found');
        return haystack;
    }
    if (haystack.indexOf(needle, idx + 1) !== -1) {
        console.error('[MULTI]', name, '— needle appears multiple times');
        return haystack;
    }
    const before = haystack.substring(0, idx);
    const after = haystack.substring(idx + needle.length);
    editsApplied++;
    log(name);
    return before + replacement + after;
}

// The JS template strings use \n (newline escaped) and the file is a single line.
// Needles must include \\n (literal backslash-n in the file)

// ==========================================
// 1. renderExercicios: quality badge slot in card header
// ==========================================
const needle1 = `btn-icon danger\\" onclick=\\"removerExercicio('${'${a.id}'}')\\" title=\\"Remover\\">✕</button>\\n          </div>\\n        </div>`;
console.log('needle1 exists:', content.indexOf(needle1));

const rep1 = `btn-icon danger\\" onclick=\\"removerExercicio('${'${a.id}'}')\\" title=\\"Remover\\">✕</button>\\n            <div class=\\"quality-badge-wrap\\" id=\\"qbadge-wrap-${'${a.id}'}\\" style=\\"margin-left:8px;display:inline-flex;align-items:center;gap:4px;\\"></div>\\n          </div>\\n        </div>`;

// Since the template uses ${a.id}, we need to escape it differently in the JS source
// Use a simpler approach - direct substring manipulation

const idx1 = content.indexOf(`title=\\"Remover\\">✕</button>\\n          </div>\\n        </div>\\n        <div class=\\"exercise-stats\\">`);
console.log('idx1:', idx1);
if (idx1 >= 0) {
    const insert = `<div class=\\"quality-badge-wrap\\" id=\\"qbadge-wrap-${'${a.id}'}\\" style=\\"margin-left:8px;display:inline-flex;align-items:center;gap:4px;\\"></div>\\n          </div>\\n        </div>\\n        <div class=\\"exercise-stats\\">`;
    const old = `</button>\\n          </div>\\n        </div>\\n        <div class=\\"exercise-stats\\">`;
    content = content.replace(old, `</button>\\n            <div class=\\"quality-badge-wrap\\" id=\\"qbadge-wrap-\\${a.id}\\" style=\\"margin-left:8px;display:inline-flex;align-items:center;gap:4px;\\"></div>\\n          </div>\\n        </div>\\n        <div class=\\"exercise-stats\\">`);
    editsApplied++;
    log('renderExercicios: quality badge slot');
}

// ==========================================
// 2. renderExercicios: groove toggles below reps input
// ==========================================
const idx2 = content.indexOf(`DESCANSO</button>\\n        </div>\\n        <div class=\\"meta-bar-wrap`);
console.log('idx2:', idx2);
if (idx2 >= 0) {
    const old = `DESCANSO</button>\\n        </div>\\n        <div class=\\"meta-bar-wrap`;
    const rep = `DESCANSO</button>\\n          <div class=\\"groove-toggles\\" id=\\"groove-toggles-\\${a.id}\\" style=\\"flex-basis:100%;\\">\\n            <span class=\\"groove-label\\">⚙ GROOVE</span>\\n            <div class=\\"missile-switch\\" id=\\"groove-amp-\\${a.id}\\" data-tip=\\"Amplitude completa: do topo ao fundo, sem truncar.\\" data-key=\\"amp\\" onclick=\\"toggleGroove('\\${a.id}', 0, this)\\">\\n              <span class=\\"missile-switch__icon\\">📏</span>\\n              <span class=\\"missile-switch__track\\"><span class=\\"missile-switch__knob\\"></span></span>\\n              <span>AMPLITUDE</span>\\n            </div>\\n            <div class=\\"missile-switch\\" id=\\"groove-ten-\\${a.id}\\" data-tip=\\"Tensão irradiante: contraia glúteos, abdômen e punhos antes de cada rep.\\" data-key=\\"ten\\" onclick=\\"toggleGroove('\\${a.id}', 1, this)\\">\\n              <span class=\\"missile-switch__icon\\">⚡</span>\\n              <span class=\\"missile-switch__track\\"><span class=\\"missile-switch__knob\\"></span></span>\\n              <span>TENSÃO</span>\\n            </div>\\n            <div class=\\"missile-switch\\" id=\\"groove-bal-\\${a.id}\\" data-tip=\\"Sem balanço/momentum: cada rep começa do zero, sem trapaça.\\" data-key=\\"bal\\" onclick=\\"toggleGroove('\\${a.id}', 2, this)\\">\\n              <span class=\\"missile-switch__icon\\">⚖</span>\\n              <span class=\\"missile-switch__track\\"><span class=\\"missile-switch__knob\\"></span></span>\\n              <span>SEM BALANÇO</span>\\n            </div>\\n            <div class=\\"groove-bonus-preview\\" id=\\"groove-bonus-preview-\\${a.id}\\">BÔNUS: <span class=\\"bonus-val\\">+0%</span></div>\\n          </div>\\n        </div>\\n        <div class=\\"meta-bar-wrap`;
    content = content.replace(old, rep);
    editsApplied++;
    log('renderExercicios: groove toggles');
}

// ==========================================
// 3. renderHistory: quality column
// ==========================================
const idx3 = content.indexOf(`<div class=\\"log-entry\\">`);
console.log('idx3:', idx3);
if (idx3 >= 0) {
    const old = `<div class=\\"log-entry\\">\\n        <div class=\\"log-dot\\"></div>\\n        <div class=\\"log-time\\">\\${e.data?.slice(5)} \\${e.hora}</div>\\n        \\${r}\\n        <div class=\\"log-exercise\\">\\${e.exercicioNome||e.exercicioId}</div>`;
    const rep = `<div class=\\"log-entry\\">\\n        <div class=\\"log-dot\\"></div>\\n        <div class=\\"log-time\\">\\${e.data?.slice(5)} \\${e.hora}</div>\\n        \\${r}\\n        <div class=\\"log-quality \\${renderQualityClass(e.groove)}\\">\\${renderQualityIcons(e.groove)}</div>\\n        <div class=\\"log-exercise\\">\\${e.exercicioNome||e.exercicioId}</div>`;
    const iOld = content.indexOf(old);
    console.log('  idx3 old match:', iOld);
    if (iOld >= 0) {
        content = content.replace(old, rep);
        editsApplied++;
        log('renderHistory: quality column');
    }
}

// ==========================================
// 4. adicionarSerie: read groove toggles, calculate bonus, save groove array
// ==========================================
const idx4 = content.indexOf('function adicionarSerie(e)');
console.log('idx4:', idx4);
if (idx4 >= 0) {
    // Find end of function
    const start = idx4;
    const endMarker = content.indexOf('function addExercise', start);
    console.log('  end marker at:', endMarker);
    if (endMarker > start) {
        const oldBody = content.substring(start, endMarker);
        const newBody = `function adicionarSerie(e){
  const a=dados.exercicios.find(a=>a.id===e);if(!a)return;
  const t=document.getElementById(\`valor-\${e}\`),o=parseInt(t.value);
  if(!o||o<1)return void mostrarToast("Erro","Insira um valor válido","error");
  const r="peso"===a.tipo&&parseFloat(document.getElementById(\`peso-\${e}\`)?.value)||0;
  const s=new Date,n=s.toISOString().slice(0,10),i=s.toTimeString().slice(0,5),d=s.getTime();
  const c=dados.registros.filter(a=>a.exercicioId===e).sort((e,a)=>a.timestamp-e.timestamp)[0];
  if(c){if((d-c.timestamp)/6e4<15){const a=document.getElementById(\`warn-\${e}\`);a&&(a.style.display="block",setTimeout(()=>a.style.display="none",5e3))}
  else desbloquearBadge("descanso_digno")}

  // === GROOVE QUALITY: lê toggles + calcula bônus ===
  const groovRaw=grooveState[e]||[false,false,false];
  const groovAmp=!!groovRaw[0],groovTen=!!groovRaw[1],groovBal=!!groovRaw[2];
  const groovChecks=[groovAmp,groovTen,groovBal];
  const groovCount=groovChecks.filter(Boolean).length;
  const groovBonusMult=1+groovCount*0.1; // +10% por checkbox, +30% perfeito
  const xpBase=calcularXPSerie(a,o,r);
  const l=Math.round(xpBase*groovBonusMult);
  const m=rpeSelecionado[e]||null;
  const u={id:Date.now()+Math.random().toString(36).slice(2),exercicioId:e,exercicioNome:a.nome,valor:o,peso:r,data:n,hora:i,timestamp:d,xp:l,xpBase:xpBase,rpe:m,groove:groovChecks,perfeito:groovCount===3};
  dados.registros.push(u),adicionarXP(l),verificarStreak(),verificarBadges(),salvarDados(),t.value="",document.getElementById(\`peso-\${e}\`)&&(document.getElementById(\`peso-\${e}\`).value=""),delete rpeSelecionado[e];
  const p=document.getElementById("rpe-scale-"+e);p&&p.querySelectorAll(".rpe-btn").forEach(e=>e.classList.remove("selected"));
  const g=document.getElementById("rpe-warn-"+e);g&&g.classList.remove("show");

  // Toast mensagem inclui o bônus de groove
  const bonusPct=groovCount*10;
  const bonusMsg=groovCount>0?(\` · ⚙ GROOVE +\${bonusPct}% XP\`+(groovCount===3?" · ★ SÉRIE PERFEITA":"")):"";
  const toastVal=\`+\${o} \${"tempo"===a.tipo?"seg":"reps"}\`;
  const xpToast=groovCount>0?\`+\${xpBase} → +\${l} XP — \${a.nome}\${bonusMsg}\`:\`+\${l} XP — \${a.nome}\`;
  mostrarToast(toastVal,xpToast,"success"),mostrarUndoBar(u);

  // Reset groove toggles após registrar
  grooveState[e]=[false,false,false];

  renderExercicios(),atualizarStats(),renderHistory(),setTimeout(()=>{renderGraficos(),renderProgresso(),renderEstatisticasMensais()},100),somRegistrar(),iniciarTimerGTG(e)
}

`;
        content = content.substring(0, start) + newBody + content.substring(endMarker);
        editsApplied++;
        log('adicionarSerie: groove integration');
    }
}

// ==========================================
// 5. getDadosUltimasSemanas: optional source
// ==========================================
const idx5 = content.indexOf('function getDadosUltimasSemanas');
console.log('idx5:', idx5);
if (idx5 >= 0) {
    // Find function end - next function definition
    const end5 = content.indexOf('function renderGraficos', idx5);
    console.log('  end5:', end5);
    if (end5 > idx5) {
        const oldFn = content.substring(idx5, end5);
        const newFn = `function getDadosUltimasSemanas(e=8,registrosSource){
  const src=registrosSource||dados.registros;
  const a=[];for(let t=e-1;t>=0;t--){const o=new Date;o.setDate(o.getDate()-7*t);const r=getInicioSemana(o.toISOString().slice(0,10)),s=new Date(r);s.setDate(s.getDate()+6);const n=s.toISOString().slice(0,10),i=src.filter(e=>e.data>=r&&e.data<=n);a.push({label:"S"+(e-t),inicio:r,fim:n,series:i.length,reps:i.reduce((e,a)=>e+(a.valor||0),0),volume:i.reduce((e,a)=>e+(a.valor||0),0)})}
  return a}

`;
        content = content.substring(0, idx5) + newFn + content.substring(end5);
        editsApplied++;
        log('getDadosUltimasSemanas: optional source');
    }
}

// ==========================================
// 6. renderGraficos: support perfeito filter
// ==========================================
const idx6 = content.indexOf('function renderGraficos');
console.log('idx6:', idx6);
if (idx6 >= 0) {
    const end6 = content.indexOf('function renderStreakChart', idx6);
    console.log('  end6:', end6);
    if (end6 > idx6) {
        const oldFn = content.substring(idx6, end6);
        const newFn = `function renderGraficos(){
  let registrosBase=dados.registros;
  if(filtroPerfeitas){registrosBase=dados.registros.filter(e=>Array.isArray(e.groove)&&e.groove.filter(Boolean).length===3)}
  const e=getDadosUltimasSemanas(8,registrosBase),a=e.map(e=>e.label),t=e.map(e=>e["series"===modoGrafico?"series":"reps"===modoGrafico?"reps":"volume"]),o=document.getElementById("weeklyChart").getContext("2d");chartSemanal&&chartSemanal.destroy(),chartSemanal=new Chart(o,{type:"bar",data:{labels:a,datasets:[{label:"series"===modoGrafico?"S\u00e9ries":"reps"===modoGrafico?"Reps":"Volume",data:t,backgroundColor:"rgba(204,0,0,0.6)",borderColor:cssVar("--accent-red"),borderWidth:1,borderRadius:2},{label:"M\u00e9dia M\u00f3vel",data:calcularMediaMovel(t,3),type:"line",borderColor:cssVar("--gold"),backgroundColor:"rgba(212,160,23,0.1)",borderWidth:2,pointRadius:3,pointBackgroundColor:cssVar("--gold"),tension:.4,fill:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{color:"#888",font:{family:"Share Tech Mono",size:10}}}},scales:{x:{ticks:{color:"#888",font:{family:"Share Tech Mono",size:10}},grid:{color:"rgba(255,255,255,0.05)"}},y:{ticks:{color:"#888",font:{family:"Share Tech Mono",size:10}},grid:{color:"rgba(255,255,255,0.05)"},beginAtZero:!0}}}}),renderStreakChart(),renderHeatmap(),renderAnalise(),renderRanking(),renderVolumeChart(),renderCompararSemanas(),injetarCardPR()
}

`;
        content = content.substring(0, idx6) + newFn + content.substring(end6);
        editsApplied++;
        log('renderGraficos: filter perfeito');
    }
}

fs.writeFileSync(path, content);
console.log('Total edits applied:', editsApplied);
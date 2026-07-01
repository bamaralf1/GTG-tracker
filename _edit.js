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

// ==========================================
// 1. Update renderExercicios - inject quality badge in card header
// ==========================================
// Find the exercise-card-actions closing in the header, append quality badge before </div></div>
const headerNeedle = '<button class="btn-icon danger" onclick="removerExercicio(\'${a.id}\')" title="Remover">✕</button>\n          </div>\n        </div>';
const headerReplacement = '<button class="btn-icon danger" onclick="removerExercicio(\'${a.id}\')" title="Remover">✕</button>\n            <div class="quality-badge-wrap" id="qbadge-wrap-${a.id}" style="margin-left:8px;display:inline-flex;align-items:center;gap:4px;"></div>\n          </div>\n        </div>';
content = safeReplace(content, headerNeedle, headerReplacement, 'renderExercicios: quality badge slot');

// ==========================================
// 2. Inject groove toggles + bonus preview into exercise-add-form (after the rest button)
// ==========================================
const formNeedle = '<button class="btn btn-outline btn-sm" onclick="abrirTimerDescanso(\'${a.id}\')">⏱ DESCANSO</button>\n        </div>';
const formReplacement = `<button class="btn btn-outline btn-sm" onclick="abrirTimerDescanso('\${a.id}')">⏱ DESCANSO</button>
          <div class="groove-toggles" id="groove-toggles-\${a.id}" style="flex-basis:100%;">
            <span class="groove-label">⚙ GROOVE</span>
            <div class="missile-switch" id="groove-amp-\${a.id}" data-tip="Amplitude completa: do topo ao fundo, sem truncar." data-key="amp" onclick="toggleGroove('\${a.id}', 0, this)">
              <span class="missile-switch__icon">📏</span>
              <span class="missile-switch__track"><span class="missile-switch__knob"></span></span>
              <span>AMPLITUDE</span>
            </div>
            <div class="missile-switch" id="groove-ten-\${a.id}" data-tip="Tensão irradiante: contraia glúteos, abdômen e punhos antes de cada rep." data-key="ten" onclick="toggleGroove('\${a.id}', 1, this)">
              <span class="missile-switch__icon">⚡</span>
              <span class="missile-switch__track"><span class="missile-switch__knob"></span></span>
              <span>TENSÃO</span>
            </div>
            <div class="missile-switch" id="groove-bal-\${a.id}" data-tip="Sem balanço/momentum: cada rep começa do zero, sem trapaça." data-key="bal" onclick="toggleGroove('\${a.id}', 2, this)">
              <span class="missile-switch__icon">⚖</span>
              <span class="missile-switch__track"><span class="missile-switch__knob"></span></span>
              <span>SEM BALANÇO</span>
            </div>
            <div class="groove-bonus-preview" id="groove-bonus-preview-\${a.id}">BÔNUS: <span class="bonus-val">+0%</span></div>
          </div>
        </div>`;
content = safeReplace(content, formNeedle, formReplacement, 'renderExercicios: groove toggles');

// ==========================================
// 3. Update renderHistory - add quality icons column
// ==========================================
const oldLogEntry = `<div class="log-entry">
        <div class="log-dot"></div>
        <div class="log-time">\${e.data?.slice(5)} \${e.hora}</div>
        \${r}
        <div class="log-exercise">\${e.exercicioNome||e.exercicioId}</div>
        <div class="log-detail">\${e.valor} \${t}\${e.peso?\` @ \${e.peso}kg\`:\`\`}</div>
        <div class="log-xp">+\${e.xp||0} XP</div>
        <button class="btn-icon danger" onclick="removerRegistroComConfirm('\${e.id}')" style="flex-shrink:0;">✕</button>
      </div>`;
const newLogEntry = `<div class="log-entry">
        <div class="log-dot"></div>
        <div class="log-time">\${e.data?.slice(5)} \${e.hora}</div>
        \${r}
        <div class="log-quality \${renderQualityClass(e.groove)}">\${renderQualityIcons(e.groove)}</div>
        <div class="log-exercise">\${e.exercicioNome||e.exercicioId}</div>
        <div class="log-detail">\${e.valor} \${t}\${e.peso?\` @ \${e.peso}kg\`:\`\`}</div>
        <div class="log-xp">+\${e.xp||0} XP</div>
        <button class="btn-icon danger" onclick="removerRegistroComConfirm('\${e.id}')" style="flex-shrink:0;">✕</button>
      </div>`;
content = safeReplace(content, oldLogEntry, newLogEntry, 'renderHistory: quality column');

// ==========================================
// 4. Update adicionarSerie - read toggles, calculate XP bonus, save groove
// ==========================================
const oldAdicionar = `function adicionarSerie(e){const a=dados.exercicios.find(a=>a.id===e);if(!a)return;const t=document.getElementById(\`valor-\${e}\`),o=parseInt(t.value);if(!o||o<1)return void mostrarToast("Erro","Insira um valor válido","error");const r="peso"===a.tipo&&parseFloat(document.getElementById(\`peso-\${e}\`)?.value)||0,s=new Date,n=s.toISOString().slice(0,10),i=s.toTimeString().slice(0,5),d=s.getTime(),c=dados.registros.filter(a=>a.exercicioId===e).sort((e,a)=>a.timestamp-e.timestamp)[0];if(c){if((d-c.timestamp)/6e4<15){const a=document.getElementById(\`warn-\${e}\`);a&&(a.style.display="block",setTimeout(()=>a.style.display="none",5e3))}
else desbloquearBadge("descanso_digno")}

const l=calcularXPSerie(a,o,r),m=rpeSelecionado[e]||null,u={id:Date.now()+Math.random().toString(36).slice(2),exercicioId:e,exercicioNome:a.nome,valor:o,peso:r,data:n,hora:i,timestamp:d,xp:l,rpe:m};dados.registros.push(u),adicionarXP(l),verificarStreak(),verificarBadges(),salvarDados(),t.value="",document.getElementById(\`peso-\${e}\`)&&(document.getElementById(\`peso-\${e}\`).value=""),delete rpeSelecionado[e];const p=document.getElementById("rpe-scale-"+e);p&&p.querySelectorAll(".rpe-btn").forEach(e=>e.classList.remove("selected"));const g=document.getElementById("rpe-warn-"+e);g&&g.classList.remove("show"),mostrarToast(\`+\${o} \${"tempo"===a.tipo?"seg":"reps"}\`,\`+\${l} XP — \${a.nome}\`,"success"),mostrarUndoBar(u),renderExercicios(),atualizarStats(),renderHistory(),setTimeout(()=>{renderGraficos(),renderProgresso(),renderEstatisticasMensais()},100),somRegistrar(),iniciarTimerGTG(e)}`;

const newAdicionar = `function adicionarSerie(e){const a=dados.exercicios.find(a=>a.id===e);if(!a)return;const t=document.getElementById(\`valor-\${e}\`),o=parseInt(t.value);if(!o||o<1)return void mostrarToast("Erro","Insira um valor válido","error");const r="peso"===a.tipo&&parseFloat(document.getElementById(\`peso-\${e}\`)?.value)||0,s=new Date,n=s.toISOString().slice(0,10),i=s.toTimeString().slice(0,5),d=s.getTime(),c=dados.registros.filter(a=>a.exercicioId===e).sort((e,a)=>a.timestamp-e.timestamp)[0];if(c){if((d-c.timestamp)/6e4<15){const a=document.getElementById(\`warn-\${e}\`);a&&(a.style.display="block",setTimeout(()=>a.style.display="none",5e3))}
else desbloquearBadge("descanso_digno")}

// === GROOVE QUALITY: lê os 3 toggles + calcula bônus ===
const groovRaw=grooveState[e]||[false,false,false];
const groovAmp=!!groovRaw[0],groovTen=!!groovRaw[1],groovBal=!!groovRaw[2];
const groovChecks=[groovAmp,groovTen,groovBal];
const groovCount=groovChecks.filter(Boolean).length;
const groovBonusPct=groovCount*10; // +10% por checkbox
const groovBonusMult=1+groovBonusPct/100;
const l=Math.round(calcularXPSerie(a,o,r)*groovBonusMult),m=rpeSelecionado[e]||null;
const u={id:Date.now()+Math.random().toString(36).slice(2),exercicioId:e,exercicioNome:a.nome,valor:o,peso:r,data:n,hora:i,timestamp:d,xp:l,xpBase:calcularXPSerie(a,o,r),rpe:m,groove:groovChecks,perfeito:groovCount===3};
dados.registros.push(u),adicionarXP(l),verificarStreak(),verificarBadges(),salvarDados(),t.value="",document.getElementById(\`peso-\${e}\`)&&(document.getElementById(\`peso-\${e}\`).value=""),delete rpeSelecionado[e];const p=document.getElementById("rpe-scale-"+e);p&&p.querySelectorAll(".rpe-btn").forEach(e=>e.classList.remove("selected"));const g=document.getElementById("rpe-warn-"+e);g&&g.classList.remove("show");

// Toast mensagem inclui o bônus de groove
const xpBase=calcularXPSerie(a,o,r);
const bonusMsg=groovCount>0?(\` · ⚙ GROOVE +\${groovBonusPct}% XP\`+(groovCount===3?" · ★ SÉRIE PERFEITA":"")):"";
const toastMsg=\`+\${o} \${"tempo"===a.tipo?"seg":"reps"}\`;
// Toast de XP mostra base + bônus detalhado se houver
const xpToast=groovCount>0?\`+\${xpBase} → +\${l} XP — \${a.nome}\${bonusMsg}\`:\`+\${l} XP — \${a.nome}\`;
mostrarToast(toastMsg,xpToast,"success"),mostrarUndoBar(u);

// Reset groove toggles depois de registrar (UX limpo para próxima série)
grooveState[e]=[false,false,false];

renderExercicios(),atualizarStats(),renderHistory(),setTimeout(()=>{renderGraficos(),renderProgresso(),renderEstatisticasMensais()},100),somRegistrar(),iniciarTimerGTG(e)}`;

content = safeReplace(content, oldAdicionar, newAdicionar, 'adicionarSerie: groove integration');

// ==========================================
// 5. Update renderGraficos - support perfeito filter
// ==========================================
// Add a state variable near the top
const oldStateVars = `let fraseAtualIndex=-1,lembreteInterval=null`;
const newStateVars = `let fraseAtualIndex=-1,lembreteInterval=null,filtroPerfeitas=false`;
content = safeReplace(content, oldStateVars, newStateVars, 'state: filtroPerfeitas flag');

// Update renderGraficos data source when filter is on
const oldChart = `function renderGraficos(){const e=getDadosUltimasSemanas(8),a=e.map(e=>e.label),t=e.map(e=>e["series"===modoGrafico?"series":"reps"===modoGrafico?"reps":"volume"]),o=document.getElementById("weeklyChart").getContext("2d");`;
const newChart = `function renderGraficos(){
  let registrosBase=dados.registros;
  if(filtroPerfeitas){registrosBase=dados.registros.filter(e=>Array.isArray(e.groove)&&e.groove.filter(Boolean).length===3)}
  const e=getDadosUltimasSemanas(8,registrosBase),a=e.map(e=>e.label),t=e.map(e=>e["series"===modoGrafico?"series":"reps"===modoGrafico?"reps":"volume"]),o=document.getElementById("weeklyChart").getContext("2d");`;
content = safeReplace(content, oldChart, newChart, 'renderGraficos: filter perfeito');

// ==========================================
// 6. Update getDadosUltimasSemanas to accept optional registros source
// ==========================================
const oldGetDados = `function getDadosUltimasSemanas(e=8){const a=[];for(let t=e-1;t>=0;t--){const o=new Date;o.setDate(o.getDate()-7*t);const r=getInicioSemana(o.toISOString().slice(0,10)),s=new Date(r);s.setDate(s.getDate()+6);const n=s.toISOString().slice(0,10),i=dados.registros.filter(e=>e.data>=r&&e.data<=n);a.push({label:"S"+(e-t),inicio:r,fim:n,series:i.length,reps:i.reduce((e,a)=>e+(a.valor||0),0),volume:i.reduce((e,a)=>e+(a.valor||0)*(a.exercicioId,1),0)})}
  return a}`;
const newGetDados = `function getDadosUltimasSemanas(e=8,registrosSource){
  const src=registrosSource||dados.registros;
  const a=[];for(let t=e-1;t>=0;t--){const o=new Date;o.setDate(o.getDate()-7*t);const r=getInicioSemana(o.toISOString().slice(0,10)),s=new Date(r);s.setDate(s.getDate()+6);const n=s.toISOString().slice(0,10),i=src.filter(e=>e.data>=r&&e.data<=n);a.push({label:"S"+(e-t),inicio:r,fim:n,series:i.length,reps:i.reduce((e,a)=>e+(a.valor||0),0),volume:i.reduce((e,a)=>e+(a.valor||0),0)})}
  return a}`;
content = safeReplace(content, oldGetDados, newGetDados, 'getDadosUltimasSemanas: optional source');

// ==========================================
// 7. Update verificarBadges - add Perfeccionista Sovietico check
// ==========================================
const oldVerificar = `function verificarBadges(){const e=(new Date).toISOString().slice(0,10);dados.registros.length>0&&desbloquearBadge("primeiro_sangue");`;
const newVerificar = `function verificarBadges(){const e=(new Date).toISOString().slice(0,10);dados.registros.length>0&&desbloquearBadge("primeiro_sangue");dados.registros.filter(a=>Array.isArray(a.groove)&&a.groove.filter(Boolean).length===3).length>=50&&desbloquearBadge("perfeccionista_sovietico");`;
content = safeReplace(content, oldVerificar, newVerificar, 'verificarBadges: Perfeccionista');

// ==========================================
// 8. Add the badge to TODAS_BADGES (insert after squat_master - the last badge)
// ==========================================
const oldBadgesEnd = `{id:"squat_master",icone:"🦿",nome:"Squat Master",desc:"1000 reps de Agachamento acumuladas"}`;
const newBadgesEnd = `{id:"squat_master",icone:"🦿",nome:"Squat Master",desc:"1000 reps de Agachamento acumuladas"},{id:"perfeccionista_sovietico",icone:"🎖",nome:"Perfeccionista Soviético",desc:"50 séries executadas com 3/3 de Groove Quality — amplitude completa, tensão irradiante e zero balanço"}`;
content = safeReplace(content, oldBadgesEnd, newBadgesEnd, 'TODAS_BADGES: Perfeccionista badge');

// ==========================================
// 9. Add toggleGroove function, renderQualityIcons, renderQualityClass, calcularQualityMedia, toggleFiltroPerfeitas
//    Insert before function renderExercicios
// ==========================================
const helperFunctions = `// ===== GROOVE QUALITY SCORE =====
const grooveState={}; // {exercicioId: [amp:bool, ten:bool, bal:bool]}

function toggleGroove(exId, idx, el){
  if(!grooveState[exId]) grooveState[exId]=[false,false,false];
  grooveState[exId][idx]=!grooveState[exId][idx];
  el.classList.toggle('active',grooveState[exId][idx]);
  // play a tiny click tone if available
  try{if(typeof tocarTom==='function')tocarTom(220+80*grooveState[exId].filter(Boolean).length,.04,'square',.06)}catch(e){}
  atualizarPreviewGroove(exId);
}

function atualizarPreviewGroove(exId){
  const st=grooveState[exId]||[false,false,false];
  const n=st.filter(Boolean).length;
  const pct=n*10;
  const bonusEl=document.getElementById('groove-bonus-preview-'+exId);
  if(bonusEl){
    const valEl=bonusEl.querySelector('.bonus-val');
    if(valEl)valEl.textContent=(n===3?'+30% ★':('+'+pct+'%'));
    bonusEl.classList.toggle('perfeito',n===3);
  }
}

function renderQualityIcons(groove){
  if(!Array.isArray(groove))return '<span class="log-quality empty" title="Série sem dados de Groove">—</span>';
  const cls=groove.filter(Boolean).length;
  const icons=['⭐','⚡','✓']; // amplitude, tensão, sem balanço
  let html='<span class="log-quality'+(cls===3?' perfeito':'')+'">';
  for(let i=0;i<3;i++)html+='<span class="qi '+(groove[i]?'on':'')+'">'+icons[i]+'</span>';
  html+='</span>';
  return html;
}

function renderQualityClass(groove){
  if(!Array.isArray(groove))return 'empty';
  return groove.filter(Boolean).length===3?'perfeito':'';
}

function calcularQualityMedia(exId){
  const regs=dados.registros.filter(e=>e.exercicioId===exId&&Array.isArray(e.groove));
  if(regs.length===0)return 0;
  const sum=regs.reduce((acc,r)=>acc+(r.groove.filter(Boolean).length/3),0);
  return Math.round((sum/regs.length)*100);
}

function atualizarQualityBadges(){
  dados.exercicios.forEach(ex=>{
    const wrap=document.getElementById('qbadge-wrap-'+ex.id);
    if(!wrap)return;
    const regs=dados.registros.filter(r=>r.exercicioId===ex.id&&Array.isArray(r.groove));
    if(regs.length===0){wrap.innerHTML='';return}
    const pct=calcularQualityMedia(ex.id);
    const perfeitos=regs.filter(r=>r.groove.filter(Boolean).length===3).length;
    let tier='baixa';
    if(pct>=80)tier='alta';
    else if(pct>=50)tier='media';
    const star=pct>=80?'⭐':pct>=50?'✓':'·';
    let html='<span class="quality-badge" data-tier="'+tier+'" title="'+regs.length+' séries avaliadas · '+perfeitos+' perfeitas"><span class="q-star">'+star+'</span><span>Q:</span><span class="q-val">'+pct+'%</span></span>';
    if(perfeitos>0)html+='<span class="perfeito-stamp" title="'+perfeitos+' séries perfeitas (3/3)">★ ×'+perfeitos+'</span>';
    wrap.innerHTML=html;
  });
}

function toggleFiltroPerfeitas(el){
  filtroPerfeitas=!filtroPerfeitas;
  el.classList.toggle('active',filtroPerfeitas);
  renderGraficos();
  mostrarToast(
    filtroPerfeitas?'★ Filtro Ativado':'Filtro Desativado',
    filtroPerfeitas?'Mostrando apenas séries perfeitas (3/3)':'Mostrando todas as séries',
    filtroPerfeitas?'success':'info'
  );
}
// ===== END GROOVE =====

`;

content = safeReplace(content, 'function renderExercicios()', helperFunctions + 'function renderExercicios()', 'helper functions injected');

// ==========================================
// 10. Hook atualizarQualityBadges into renderExercicios flow
// ==========================================
// Find the part where rpe-avg is updated at end of renderExercicios, and add our update there
const oldRpeEnd = `dados.exercicios.forEach(e=>{const t=calcularRPEMedio(e.id,a),o=document.getElementById("rpe-avg-val-"+e.id);`;
const newRpeEnd = `atualizarQualityBadges();dados.exercicios.forEach(e=>{const t=calcularRPEMedio(e.id,a),o=document.getElementById("rpe-avg-val-"+e.id);`;
content = safeReplace(content, oldRpeEnd, newRpeEnd, 'renderExercicios: quality update hook');

// ==========================================
// Save
// ==========================================
fs.writeFileSync(path, content);
console.log('Total edits applied:', editsApplied);
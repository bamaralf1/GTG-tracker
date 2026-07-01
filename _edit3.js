const fs = require('fs');
const path = 'C:\\Users\\PICHAU\\Desktop\\GTG GM\\app.js';
let content = fs.readFileSync(path, 'utf8');

const log = (msg) => console.log('[EDIT]', msg);
let editsApplied = 0;

function safeReplace(haystack, needle, replacement, name) {
    const idx = haystack.indexOf(needle);
    if (idx === -1) {
        console.error('[MISS]', name);
        return haystack;
    }
    if (haystack.indexOf(needle, idx + 1) !== -1) {
        console.error('[MULTI]', name);
        return haystack;
    }
    editsApplied++;
    log(name);
    return haystack.substring(0, idx) + replacement + haystack.substring(idx + needle.length);
}

// In the minified JS file, literal \n in source code (i.e. `\n` inside a template literal) is encoded as the two characters: backslash followed by n.
// In a JS string, to represent this we need "\\n".

// ==========================================
// 1. renderExercicios: quality badge slot
// ==========================================
const needle1 = `title=\"Remover\">✕</button>\\n          </div>\\n        </div>\\n        <div class=\"exercise-stats\">`;
const rep1 = `title=\"Remover\">✕</button>\\n            <div class=\"quality-badge-wrap\" id=\"qbadge-wrap-\${a.id}\" style=\"margin-left:8px;display:inline-flex;align-items:center;gap:4px;\"></div>\\n          </div>\\n        </div>\\n        <div class=\"exercise-stats\">`;
content = safeReplace(content, needle1, rep1, 'renderExercicios: quality badge slot');

// ==========================================
// 2. renderExercicios: groove toggles
// ==========================================
const needle2 = `DESCANSO</button>\\n        </div>\\n        <div class=\"meta-bar-wrap`;
const rep2 = `DESCANSO</button>\\n          <div class=\"groove-toggles\" id=\"groove-toggles-\${a.id}\" style=\"flex-basis:100%;\">\\n            <span class=\"groove-label\">⚙ GROOVE</span>\\n            <div class=\"missile-switch\" id=\"groove-amp-\${a.id}\" data-tip=\"Amplitude completa: do topo ao fundo, sem truncar.\" data-key=\"amp\" onclick=\"toggleGroove('\${a.id}', 0, this)\">\\n              <span class=\"missile-switch__icon\">📏</span>\\n              <span class=\"missile-switch__track\"><span class=\"missile-switch__knob\"></span></span>\\n              <span>AMPLITUDE</span>\\n            </div>\\n            <div class=\"missile-switch\" id=\"groove-ten-\${a.id}\" data-tip=\"Tensão irradiante: contraia glúteos, abdômen e punhos antes de cada rep.\" data-key=\"ten\" onclick=\"toggleGroove('\${a.id}', 1, this)\">\\n              <span class=\"missile-switch__icon\">⚡</span>\\n              <span class=\"missile-switch__track\"><span class=\"missile-switch__knob\"></span></span>\\n              <span>TENSÃO</span>\\n            </div>\\n            <div class=\"missile-switch\" id=\"groove-bal-\${a.id}\" data-tip=\"Sem balanço/momentum: cada rep começa do zero, sem trapaça.\" data-key=\"bal\" onclick=\"toggleGroove('\${a.id}', 2, this)\">\\n              <span class=\"missile-switch__icon\">⚖</span>\\n              <span class=\"missile-switch__track\"><span class=\"missile-switch__knob\"></span></span>\\n              <span>SEM BALANÇO</span>\\n            </div>\\n            <div class=\"groove-bonus-preview\" id=\"groove-bonus-preview-\${a.id}\">BÔNUS: <span class=\"bonus-val\">+0%</span></div>\\n          </div>\\n        </div>\\n        <div class=\"meta-bar-wrap`;
content = safeReplace(content, needle2, rep2, 'renderExercicios: groove toggles');

// ==========================================
// 3. renderHistory: quality column
// ==========================================
const needle3 = `<div class=\"log-entry\">\\n        <div class=\"log-dot\"></div>\\n        <div class=\"log-time\">\${e.data?.slice(5)} \${e.hora}</div>\\n        \${r}\\n        <div class=\"log-exercise\">\${e.exercicioNome||e.exercicioId}</div>`;
const rep3 = `<div class=\"log-entry\">\\n        <div class=\"log-dot\"></div>\\n        <div class=\"log-time\">\${e.data?.slice(5)} \${e.hora}</div>\\n        \${r}\\n        <div class=\"log-quality \${renderQualityClass(e.groove)}\">\${renderQualityIcons(e.groove)}</div>\\n        <div class=\"log-exercise\">\${e.exercicioNome||e.exercicioId}</div>`;
content = safeReplace(content, needle3, rep3, 'renderHistory: quality column');

fs.writeFileSync(path, content);
console.log('Total edits applied:', editsApplied);
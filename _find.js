const fs = require('fs');
const path = 'C:\\Users\\PICHAU\\Desktop\\GTG GM\\index.html';
const content = fs.readFileSync(path, 'utf8');

// Search for the chart-toggles in raw bytes - dump the exact byte sequence
const idx = content.indexOf('chart-toggles');
console.log('chart-toggles found at:', idx);
console.log('Context (raw):', JSON.stringify(content.substring(idx, idx + 350)));

// Also find VOLUME button end
const volumeIdx = content.indexOf('VOLUME</button>');
console.log('VOLUME button at:', volumeIdx);
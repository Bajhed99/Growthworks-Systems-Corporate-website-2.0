const fs = require('fs');
const path = 'client/src/pages/Framework.tsx';
let content = fs.readFileSync(path, 'utf8');

const funcStart = content.indexOf('// ─── SECTION 06: FRAGMENTED VS CONNECTED ──────────────────────────────────────\nfunction FragmentedVsConnectedSection() {');
if (funcStart === -1) { console.error('Start marker not found'); process.exit(1); }

const afterStart = content.slice(funcStart + 1);
const nextFuncMatch = afterStart.match(/\nfunction [A-Z]/);
if (!nextFuncMatch) { console.error('End marker not found'); process.exit(1); }
const funcEnd = funcStart + afterStart.indexOf('\n' + nextFuncMatch[0]) + 1;

const R = fs.readFileSync('section-replacement.txt', 'utf8');
const newContent = content.slice(0, funcStart) + R + content.slice(funcEnd);
fs.writeFileSync(path, newContent);
console.log('Done! Replaced function.');

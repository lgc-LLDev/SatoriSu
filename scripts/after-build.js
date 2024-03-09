const fs = require('fs');

fs.renameSync('lib/index.d.ts', 'dist/SatoriSu.d.ts');
fs.rmSync('lib', { recursive: true });

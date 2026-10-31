const fs = require('node:fs');
const tarEntry = require.resolve('tar');
let source = fs.readFileSync(tarEntry, 'utf8');
const compatibilityExport = ';exports.default = exports;';

// Capacitor CLI 6 expects the default export shape used by tar 6. Its tar 7
// security override is API-compatible, but marks itself __esModule without a
// default export; restore the CommonJS default alias for that legacy import.
if (!source.includes(compatibilityExport)) {
  if (!source.includes('Object.defineProperty(exports,"__esModule"')) {
    throw new Error(`Unexpected tar CommonJS entry point: ${tarEntry}`);
  }
  fs.appendFileSync(tarEntry, `\n${compatibilityExport}\n`);
}

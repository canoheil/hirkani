// Design-time helper for render-icons.py; install @resvg/resvg-js separately.
const { Resvg } = require('@resvg/resvg-js');
const fs = require('node:fs');
const [input, size] = process.argv.slice(2);
process.stdout.write(new Resvg(fs.readFileSync(input), {fitTo:{mode:'width',value:Number(size)}}).render().asPng());

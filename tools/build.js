const { build } = require('esbuild');
const glob = require('glob');

build({
  entryPoints: glob.sync('./src/**/*.ts'),
  outbase: './src',
  outdir: './dist',
  platform: 'node',
  format: 'cjs',
  watch: process.env.WATCH === 'true',
});

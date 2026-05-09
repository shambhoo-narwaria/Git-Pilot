import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: false,
  clean: true,
  outDir: 'dist',
  target: 'node16',
  shims: true,
  noExternal: [/.*/],
});

import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({ build: { rollupOptions: { input: { home: resolve('index.html'), merge: resolve('merge-pdf/index.html'), split: resolve('split-pdf/index.html'), rotate: resolve('rotate-pdf/index.html') } } } });

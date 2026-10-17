import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { LANGUAGES, TOOLS, toolPath } from './src/paths.js';
export default defineConfig({ build: { rollupOptions: { input: {
  home: resolve('index.html'),
  ...Object.fromEntries(LANGUAGES.flatMap((lang) => TOOLS.map((tool) => [`${lang}-${tool}`, resolve(`.${toolPath(tool, lang)}index.html`)]))),
} } } });

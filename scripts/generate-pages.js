import { mkdirSync, writeFileSync } from 'node:fs';
import { renderPage } from '../src/page.js';
import { LANGUAGES, TOOLS, SITE_ORIGIN, toolPath } from '../src/paths.js';
const source = process.env.VITE_SOURCE_URL || 'https://github.com/liuyan-wjy/pdftomd-pdfcraft-tools';
if (new URL(source).protocol !== 'https:') throw new Error('VITE_SOURCE_URL must be an HTTPS source URL.');
for (const lang of LANGUAGES) for (const tool of TOOLS) {
  const directory = `.${toolPath(tool, lang)}`;
  mkdirSync(directory, { recursive: true });
  writeFileSync(`${directory}index.html`, renderPage(tool, lang, source));
}
writeFileSync('index.html', `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>PDF tools · PDF to MD</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="${SITE_ORIGIN}/merge-pdf/"></head><body><a href="/merge-pdf/">Merge PDF</a><script type="module" src="/src/redirect.js"></script></body></html>`);
mkdirSync('public/pdf-tools', { recursive: true });
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_ORIGIN}/pdf-tools/sitemap.xml\n`);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${LANGUAGES.flatMap((lang) => TOOLS.map((tool) => `  <url><loc>${SITE_ORIGIN}${toolPath(tool, lang)}</loc></url>`)).join('\n')}\n</urlset>\n`;
writeFileSync('public/pdf-tools/sitemap.xml', sitemap);
writeFileSync('public/sitemap.xml', sitemap);
writeFileSync('public/_redirects', '/ /merge-pdf/ 301\n');

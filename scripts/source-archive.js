import { execFileSync } from 'node:child_process';
import { mkdirSync, copyFileSync } from 'node:fs';
const licenseFiles = { 'pdf-lib': 'LICENSE.md', '@pdf-lib/standard-fonts': 'LICENSE.md', '@pdf-lib/upng': 'LICENSE', pako: 'LICENSE', tslib: 'LICENSE.txt', fflate: 'LICENSE' };
// Retain the original locations for cached Pages clients during migration.
for (const directory of ['public/pdf-tools/licenses', 'public/licenses']) {
  mkdirSync(directory, { recursive: true });
  for (const [name, file] of Object.entries(licenseFiles)) copyFileSync(`node_modules/${name}/${file}`, `${directory}/${name.replaceAll('/', '-')}.txt`);
  copyFileSync('LICENSE', `${directory}/AGPL-3.0.txt`);
  copyFileSync('NOTICE.md', `${directory}/NOTICE.md`);
}
mkdirSync('public/pdf-tools', { recursive: true });
execFileSync('tar', ['--exclude=node_modules', '--exclude=dist', '--exclude=.git', '--exclude=public/source.tar', '--exclude=public/pdf-tools/source.tar', '--exclude=*.log', '-cf', 'public/pdf-tools/source.tar', 'package.json', 'package-lock.json', '.gitignore', 'vite.config.js', 'wrangler.jsonc', 'playwright.config.js', 'index.html', 'merge-pdf', 'split-pdf', 'rotate-pdf', 'zh', 'ja', 'de', 'public/_headers', 'public/_redirects', 'public/robots.txt', 'public/sitemap.xml', 'public/pdf-tools/sitemap.xml', 'src', 'scripts', 'test', 'upstream', 'README.md', 'NOTICE.md', 'LICENSE']);
copyFileSync('public/pdf-tools/source.tar', 'public/source.tar');
console.log('Generated public/pdf-tools/source.tar and legacy copy with corresponding source, tests, lockfile and Worker configuration.');

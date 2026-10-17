import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vite from '../vite.config.js';
import { SITE_ORIGIN } from '../src/paths.js';

test('independent Worker claims only tool prefixes and its resource namespace', async () => {
  const worker = JSON.parse(await readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8'));
  const paths = ['', 'zh/', 'ja/', 'de/'].flatMap((prefix) => ['merge', 'split', 'rotate'].map((tool) => `pdf-to-md.app/${prefix}${tool}-pdf*`));
  assert.deepEqual(worker.routes.map((route) => route.pattern).sort(), [...paths, 'pdf-to-md.app/pdf-tools/*'].sort());
  assert.ok(worker.routes.every((route) => route.zone_name === 'pdf-to-md.app' && !route.custom_domain));
  assert.equal(worker.workers_dev, false);
  assert.equal(worker.assets.directory, './dist');
  assert.equal(worker.assets.html_handling, 'force-trailing-slash');
  assert.equal(worker.assets.not_found_handling, 'none');
  assert.equal(SITE_ORIGIN, 'https://pdf-to-md.app');
  assert.equal(vite.base, '/');
  assert.equal(vite.build.assetsDir, 'pdf-tools/assets');
});

test('static responses prevent injected network scripts under the local-only CSP', async () => {
  const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8');
  assert.match(headers, /^  Cache-Control: public, no-transform$/m);
  assert.match(headers, /connect-src 'none'/);
});

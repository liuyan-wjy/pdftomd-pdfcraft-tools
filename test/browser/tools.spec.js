import { test, expect } from '@playwright/test';
import { PDFDocument, degrees } from 'pdf-lib';
import { unzipSync } from 'fflate';
import { readFile } from 'node:fs/promises';

async function pdf(name, widths, rotation = 0) {
  const document = await PDFDocument.create();
  for (const width of widths) document.addPage([width, 300]).setRotation(degrees(rotation));
  return { name, mimeType: 'application/pdf', buffer: Buffer.from(await document.save()) };
}
async function clickDownload(page) {
  const download = page.waitForEvent('download');
  await page.locator('#download').click();
  const result = await download;
  expect(await result.failure()).toBeNull();
  return readFile(await result.path());
}
async function resultPages(bytes) { return (await PDFDocument.load(bytes)).getPages(); }
function collectErrors(page) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  return errors;
}

test('12 localized tool pages fit at 320px with source and converter links', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  const errors = collectErrors(page);
  for (const lang of ['en', 'zh', 'ja', 'de']) {
    for (const tool of ['merge', 'split', 'rotate']) {
      const path = `${lang === 'en' ? '' : `/${lang}`}/${tool}-pdf/`;
      const response = await page.goto(path);
      expect(response.status()).toBe(200);
      await expect(page.locator('#files')).toBeVisible();
      for (const asset of await page.locator('script[src], link[rel="stylesheet"]').all()) {
        const path = await asset.getAttribute((await asset.evaluate((node) => node.tagName)) === 'SCRIPT' ? 'src' : 'href');
        expect(path).toMatch(/^\/pdf-tools\/assets\//);
      }
      await expect(page.locator('html')).toHaveAttribute('lang', lang === 'zh' ? 'zh-CN' : lang);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await expect(page.locator('.tools a[aria-current="page"]')).toHaveAttribute('href', path);
      await expect(page.locator('header .brand')).toHaveAttribute('href', `https://pdf-to-md.app/${lang === 'en' ? '' : `${lang}/`}`);
      await expect(page.locator('#converter')).toHaveAttribute('href', `https://pdf-to-md.app/${lang === 'en' ? '' : `${lang}/`}`);
      await expect(page.locator('#source')).toHaveAttribute('href', /^https:\/\/github\.com\/liuyan-wjy\/pdftomd-pdfcraft-tools/);
      await expect(page.locator('a[download][href="/pdf-tools/source.tar"]')).toBeVisible();
      await expect(page.locator('a[href*="PDFCraftTool/pdfcraft/tree/85bcc98"]')).toBeVisible();
      for (const link of await page.locator('.tools a').all()) await expect(link).toHaveAttribute('href', new RegExp(`^${lang === 'en' ? '' : `/${lang}`}/(?:merge|split|rotate)-pdf/$`));
    }
  }
  expect(errors).toEqual([]);
});

test('language switch retains the current tool path', async ({ page }) => {
  await page.goto('/ja/split-pdf/');
  await page.locator('header .locale a[hreflang="de"]').click();
  await expect(page).toHaveURL(/\/de\/split-pdf\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await page.locator('.tools a[href="/de/rotate-pdf/"]').click();
  await expect(page).toHaveURL(/\/de\/rotate-pdf\/$/);
});

test('merge order and removal work with keyboard controls and an explicit PDF download', async ({ page }) => {
  const errors = collectErrors(page);
  const uploads = [];
  let downloads = 0;
  page.on('download', () => downloads++);
  page.on('request', (request) => { if (request.method() !== 'GET') uploads.push(request.url()); });
  await page.goto('/merge-pdf/');
  await page.locator('#files').setInputFiles([await pdf('first.pdf', [101, 102]), await pdf('second.pdf', [201]), await pdf('remove.pdf', [301])]);
  await page.locator('#file-list li').nth(2).getByRole('button', { name: 'Remove: remove.pdf', exact: true }).click();
  await expect(page.locator('#file-list li')).toHaveCount(2);
  const move = page.locator('#file-list li').nth(1).getByRole('button', { name: 'Move up: second.pdf', exact: true });
  await move.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#file-list li').first()).toContainText('second.pdf');
  await page.locator('#run').click();
  await expect(page.locator('#download')).toBeVisible();
  expect(downloads).toBe(0);
  const bytes = await clickDownload(page);
  expect((await resultPages(bytes)).map((p) => p.getWidth())).toEqual([201, 101, 102]);
  expect(downloads).toBe(1);
  expect(uploads).toEqual([]);
  expect(errors).toEqual([]);
});

test('split rejects bad ranges, keeps original selection, recovers, and invalidates stale results', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/split-pdf/');
  await page.locator('#files').setInputFiles(await pdf('source.pdf', [101, 102, 103, 104, 105]));
  for (const ranges of ['6', '1,1', '1-2-3']) {
    await page.locator('#ranges').fill(ranges);
    await page.locator('#run').click();
    await expect(page.locator('#status')).toHaveClass(/error/);
    await expect(page.locator('#file-list li')).toHaveCount(1);
    await expect(page.locator('#file-list')).toContainText('source.pdf');
    await expect(page.locator('#download')).toBeHidden();
    await expect(page.locator('#run')).toBeEnabled();
  }
  await page.locator('#ranges').fill('4-5,1');
  await page.locator('#run').click();
  await expect(page.locator('#download')).toBeVisible();
  const files = Object.values(unzipSync(await clickDownload(page)));
  expect(files).toHaveLength(2);
  expect((await resultPages(files[0])).map((p) => p.getWidth())).toEqual([104, 105]);
  expect((await resultPages(files[1])).map((p) => p.getWidth())).toEqual([101]);
  await page.locator('#ranges').fill('2');
  await expect(page.locator('#download')).toBeHidden();
  await expect(page.locator('#download')).not.toHaveAttribute('href', /blob:/);
  await page.locator('#run').click();
  await expect(page.locator('#download')).toBeVisible();
  const retry = Object.values(unzipSync(await clickDownload(page)));
  expect((await resultPages(retry[0])).map((p) => p.getWidth())).toEqual([102]);
  expect(errors).toEqual([]);
});

test('rotation adds existing angle on selected pages; changed range and angle clear the old download', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/rotate-pdf/');
  await page.locator('#files').setInputFiles(await pdf('rotated-source.pdf', [101, 102], 270));
  await page.locator('#ranges').fill('2');
  await page.locator('#angle').selectOption('180');
  await page.locator('#run').click();
  await expect(page.locator('#download')).toBeVisible();
  expect((await resultPages(await clickDownload(page))).map((p) => p.getRotation().angle)).toEqual([270, 90]);
  await page.locator('#angle').selectOption('90');
  await expect(page.locator('#download')).toBeHidden();
  await expect(page.locator('#download')).not.toHaveAttribute('href', /blob:/);
  await page.locator('#run').click();
  await expect(page.locator('#download')).toBeVisible();
  await page.locator('#ranges').fill('');
  await expect(page.locator('#download')).toBeHidden();
  await page.locator('#run').click();
  await expect(page.locator('#download')).toBeVisible();
  expect((await resultPages(await clickDownload(page))).map((p) => p.getRotation().angle)).toEqual([0, 0]);
  expect(errors).toEqual([]);
});

test('cancel terminates a blocked worker, preserves files, and permits a fresh run', async ({ page }) => {
  await page.goto('/rotate-pdf/');
  await page.locator('#files').setInputFiles(await pdf('cancel-source.pdf', [101, 102]));
  let seen;
  const workerRequested = new Promise((resolve) => { seen = resolve; });
  let release;
  const gate = new Promise((resolve) => { release = resolve; });
  await page.route(/\/pdf-tools\/assets\/worker-[^/]+\.js$/, async (route) => {
    seen();
    await gate;
    await route.continue().catch(() => {});
  }, { times: 1 });
  await page.locator('#run').click();
  await workerRequested;
  await expect(page.locator('#cancel')).toBeVisible();
  await page.locator('#cancel').click();
  release();
  await expect(page.locator('#cancel')).toBeHidden();
  await expect(page.locator('#file-list')).toContainText('cancel-source.pdf');
  await expect(page.locator('#download')).toBeHidden();
  await expect(page.locator('#run')).toBeEnabled();
  await page.locator('#run').click();
  await expect(page.locator('#download')).toBeVisible();
  expect((await resultPages(await clickDownload(page))).map((p) => p.getRotation().angle)).toEqual([90, 90]);
});

test('corresponding source archive includes reproducible source and browser tests', async ({ page, request }) => {
  await page.goto('/merge-pdf/?lang=en');
  const archiveHref = await page.locator('a[download][href="/pdf-tools/source.tar"]').getAttribute('href');
  const response = await request.get(archiveHref);
  expect(response.status()).toBe(200);
  const tar = await response.body();
  const legacy = await request.get('/source.tar');
  expect(legacy.status()).toBe(200);
  expect(await legacy.body()).toEqual(tar);
  const license = await request.get('/pdf-tools/licenses/AGPL-3.0.txt');
  expect(license.status()).toBe(200);
  expect(await license.text()).toContain('GNU AFFERO GENERAL PUBLIC LICENSE');
  const legacyLicense = await request.get('/licenses/AGPL-3.0.txt');
  expect(legacyLicense.status()).toBe(200);
  expect(await legacyLicense.body()).toEqual(await license.body());
  const names = [];
  for (let offset = 0; offset + 512 <= tar.length;) {
    const name = tar.subarray(offset, offset + 100).toString().replace(/\0.*$/, '');
    if (!name) break;
    names.push(name);
    const size = parseInt(tar.subarray(offset + 124, offset + 136).toString().replace(/\0.*$/, '').trim() || '0', 8);
    offset += 512 + Math.ceil(size / 512) * 512;
  }
  expect(names).toEqual(expect.arrayContaining(['src/pdf.js', 'src/worker.js', 'src/validation.js', 'upstream/merge.ts', 'upstream/split.ts', 'upstream/rotate.ts', 'package-lock.json', 'README.md', 'NOTICE.md', 'LICENSE', 'playwright.config.js', 'test/browser/tools.spec.js', 'scripts/source-archive.js', 'scripts/generate-pages.js', 'src/page.js', 'src/paths.js', 'zh/merge-pdf/index.html', 'ja/split-pdf/index.html', 'de/rotate-pdf/index.html', 'public/robots.txt', 'public/sitemap.xml', 'public/_redirects', 'public/pdf-tools/sitemap.xml', 'wrangler.jsonc']));
});

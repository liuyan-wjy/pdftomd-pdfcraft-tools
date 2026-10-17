import { test, expect } from '@playwright/test';
import { locales } from '../../src/locales.js';
const origin = 'https://pdf-to-md.app';
const languages = ['en', 'zh', 'ja', 'de'];
const tools = ['merge', 'split', 'rotate'];
const expectedPath = (lang, tool) => `${lang === 'en' ? '' : `/${lang}`}/${tool}-pdf/`;

test('12 pages expose localized content, canonical and reciprocal alternates in raw HTML without JavaScript', async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 740 } });
  const page = await context.newPage();
  const titles = new Set();
  const descriptions = new Set();
  for (const lang of languages) for (const tool of tools) {
    const path = expectedPath(lang, tool);
    const response = await request.get(`http://127.0.0.1:4175${path}`);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(`<h1>${locales[lang][tool]}</h1>`);
    expect(html).toContain(locales[lang][`${tool}Intro`]);
    expect(html).toContain(locales[lang].limits);
    expect(html).toContain(locales[lang].credit);
    expect(html).toContain(locales[lang][`${tool}Steps`][0]);
    expect(html).not.toContain('PDFCRAFT /');
    await page.goto(`http://127.0.0.1:4175${path}`);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText(locales[lang][tool]);
    await expect(page.locator('html')).toHaveAttribute('lang', lang === 'zh' ? 'zh-CN' : lang);
    await expect(page.getByText(locales[lang].javascript, { exact: true })).toBeVisible();
    await expect(page.locator('#files')).toBeVisible();
    await expect(page.locator('.steps li')).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}${path}`);
    const alternates = page.locator('link[rel="alternate"][hreflang]');
    await expect(alternates).toHaveCount(5);
    for (const alternate of languages) {
      const tag = alternate === 'zh' ? 'zh-CN' : alternate;
      await expect(page.locator(`link[hreflang="${tag}"]`)).toHaveAttribute('href', `${origin}${expectedPath(alternate, tool)}`);
      await expect(page.locator(`header a[hreflang="${tag}"]`)).toHaveAttribute('href', expectedPath(alternate, tool));
    }
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', `${origin}${expectedPath('en', tool)}`);
    titles.add(await page.title());
    descriptions.add(await page.locator('meta[name="description"]').getAttribute('content'));
  }
  expect(titles.size).toBe(12);
  expect(descriptions.size).toBe(12);
  await context.close();
});

test('namespaced sitemap contains the 12 canonical tool pages; legacy standalone root remains compatible', async ({ page, request }) => {
  const response = await request.get('/pdf-tools/sitemap.xml');
  expect(response.status()).toBe(200);
  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  expect(locations.sort()).toEqual(languages.flatMap((lang) => tools.map((tool) => `${origin}${expectedPath(lang, tool)}`)).sort());
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${origin}/pdf-tools/sitemap.xml`);
  const root = await request.get('/');
  const html = await root.text();
  expect(html).toContain(`<link rel="canonical" href="${origin}/merge-pdf/">`);
  expect(html).toContain('content="noindex,follow"');
  await page.goto('/');
  await expect(page).toHaveURL(/\/merge-pdf\/$/);
});

test('legacy language queries redirect to the corresponding clean tool path', async ({ page }) => {
  for (const lang of languages) for (const tool of tools) {
    await page.goto(`/${tool}-pdf/?lang=${lang}`);
    await expect(page).toHaveURL(`http://127.0.0.1:4175${expectedPath(lang, tool)}`);
    await expect(page.locator('body')).toHaveAttribute('data-tool', tool);
    await expect(page.locator('body')).toHaveAttribute('data-lang', lang);
  }
  await page.goto('/zh/rotate-pdf/?lang=en&ref=test');
  await expect(page).toHaveURL('http://127.0.0.1:4175/rotate-pdf/?ref=test');
});

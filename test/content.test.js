import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderPage } from '../src/page.js';

for (const lang of ['en', 'zh', 'ja', 'de']) {
  for (const tool of ['merge', 'split', 'rotate']) {
    test(`${lang}/${tool}: static task content has working section and related links`, () => {
      const html = renderPage(tool, lang, 'https://github.com/liuyan-wjy/pdftomd-pdfcraft-tools');
      const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((match) => match[1]);
      assert.equal(new Set(ids).size, ids.length, 'HTML IDs must be unique');
      const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
      assert.ok(anchors.length > 0, 'The task content has in-page navigation');
      for (const id of anchors) {
        assert.ok(ids.includes(id), `Missing target for #${id}`);
        assert.match(html, new RegExp(`<section[^>]*id="${id}"><h2>[^<]+</h2>`));
      }
      const related = html.match(/<section class="notes" id="related">([\s\S]*?)<\/section>/)?.[1];
      assert.ok(related, 'Related navigation must render in the initial HTML');
      const prefix = lang === 'en' ? '' : `/${lang}`;
      for (const other of ['merge', 'split', 'rotate'].filter((candidate) => candidate !== tool)) {
        assert.ok(related.includes(`href="${prefix}/${other}-pdf/"`));
      }
      const main = `https://pdf-to-md.app${prefix}/`;
      for (const target of [main, `${main}guides/scanned-pdf-ocr`, `${main}scanned-pdf-to-markdown`]) {
        assert.ok(related.includes(`href="${target}"`), `Missing related link: ${target}`);
      }
      assert.match(html, /<table><thead><tr><th scope="col">/);
      assert.match(html, /<details><summary>[^<]+<\/summary><p>[^<]+<\/p><\/details>/);
    });
  }
}

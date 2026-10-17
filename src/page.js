import { locales } from './locales.js';
import { toolContent } from './tool-content.js';
import { LANGUAGES, SITE_ORIGIN, languageTag, toolPath } from './paths.js';
const languageNames = { en: 'English', zh: '中文', ja: '日本語', de: 'Deutsch' };
function escape(value) { return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
export function renderPage(operation, lang, source) {
  const t = locales[lang];
  const content = toolContent[lang];
  const detail = content[operation];
  const labels = content.labels;
  const mainSite = `${SITE_ORIGIN}/${lang === 'en' ? '' : `${lang}/`}`;
  const sections = [['how', t.how], ['examples', labels.examples], ['capabilities', labels.scope], ['check-output', labels.checks], ['file-handling', labels.handling], ['troubleshooting', labels.trouble], ['faq', labels.faq], ['related', labels.related]];
  const canonical = `${SITE_ORIGIN}${toolPath(operation, lang)}`;
  return `<!doctype html>
<html lang="${languageTag(lang)}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(t[operation])} · PDF to MD</title><meta name="description" content="${escape(t[`${operation}Description`])}">
<link rel="canonical" href="${canonical}">
${LANGUAGES.map((code) => `<link rel="alternate" hreflang="${languageTag(code)}" href="${SITE_ORIGIN}${toolPath(operation, code)}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${toolPath(operation)}">
<link rel="stylesheet" href="/src/style.css"></head><body data-tool="${operation}" data-lang="${lang}">
  <header><a class="brand" href="${mainSite}">PDF to MD <span>/ ${t.brand}</span></a><nav class="locale" aria-label="${t.language}">${LANGUAGES.map((code) => `<a href="${toolPath(operation, code)}" lang="${languageTag(code)}" hreflang="${languageTag(code)}" ${code === lang ? 'aria-current="true"' : ''}>${languageNames[code]}</a>`).join('')}</nav></header>
  <main><nav class="tools" aria-label="${t.brand}">${['merge','split','rotate'].map((tool) => `<a ${tool === operation ? 'aria-current="page"' : ''} href="${toolPath(tool, lang)}">${t[tool]}</a>`).join('')}</nav>
    <div class="intro"><h1>${t[operation]}</h1><p>${t[`${operation}Intro`]}</p><p class="small">${t.privacy}</p></div>
    <noscript><p>${t.javascript}</p></noscript><section class="workbench" aria-labelledby="tool-title"><h2 id="tool-title">${t.choose}</h2><form id="tool-form"><fieldset id="controls"><label class="upload" for="files">${t.choose}<input id="files" name="files" type="file" accept=".pdf,application/pdf" ${operation === 'merge' ? 'multiple' : ''} aria-describedby="limits"></label><p class="small" id="limits">${t.limits}</p>
      <h3>${t.files}</h3><ol id="file-list"></ol><p id="empty">${t.empty}</p>
${operation !== 'merge' ? `<label class="field" for="ranges">${t.range}<input id="ranges" name="ranges" type="text" placeholder="1-3,5" maxlength="4000" ${operation === 'split' ? 'required' : ''} aria-describedby="range-help"></label><p class="small" id="range-help">${operation === 'split' ? t.rangeSplit : t.rangeRotate}</p>` : ''}
${operation === 'rotate' ? `<label class="field" for="angle">${t.angle}<select id="angle" name="angle"><option value="90">90°</option><option value="180">180°</option><option value="270">270°</option></select></label>` : ''}
      <button class="primary" id="run" type="submit" disabled>${t.run}</button></fieldset><button class="secondary" id="cancel" type="button" hidden>${t.cancel}</button></form>
      <div class="status" id="status" role="status" aria-live="polite">${t.ready}</div><progress id="progress" max="100" value="0" hidden aria-label="${t.busy}"></progress><a class="download" id="download" hidden>${t.download}</a>
    </section>
    <nav class="contents" aria-label="${escape(labels.jump)}"><p>${escape(labels.jump)}</p><ul>${sections.map(([id, title]) => `<li><a href="#${id}">${escape(title)}</a></li>`).join('')}</ul></nav>
    <section class="notes" id="how"><h2>${t.how}</h2><ol class="steps">${t[`${operation}Steps`].map((step) => `<li>${escape(step)}</li>`).join('')}</ol></section>
    <section class="notes" id="examples"><h2>${escape(labels.examples)}</h2><table><thead><tr><th scope="col">${escape(labels.input)}</th><th scope="col">${escape(labels.output)}</th></tr></thead><tbody>${detail.examples.map(([input, output]) => `<tr><td>${escape(input)}</td><td>${escape(output)}</td></tr>`).join('')}</tbody></table></section>
    <section class="notes" id="capabilities"><h2>${escape(labels.scope)}</h2><ul>${detail.scope.map((item) => `<li>${escape(item)}</li>`).join('')}</ul></section>
    <section class="notes" id="check-output"><h2>${escape(labels.checks)}</h2><ul>${detail.checks.map((item) => `<li>${escape(item)}</li>`).join('')}</ul><p class="small">${t.warning}</p></section>
    <section class="notes" id="file-handling"><h2>${escape(labels.handling)}</h2>${content.handling.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('')}</section>
    <section class="notes" id="troubleshooting"><h2>${escape(labels.trouble)}</h2>${detail.trouble.map(([problem, answer]) => `<h3>${escape(problem)}</h3><p>${escape(answer)}</p>`).join('')}</section>
    <section class="notes" id="faq"><h2>${escape(labels.faq)}</h2>${detail.faqs.map(([question, answer]) => `<details><summary>${escape(question)}</summary><p>${escape(answer)}</p></details>`).join('')}</section>
    <section class="notes" id="related"><h2>${escape(labels.related)}</h2><ul>${['merge', 'split', 'rotate'].filter((tool) => tool !== operation).map((tool) => `<li><a href="${toolPath(tool, lang)}">${t[tool]}</a></li>`).join('')}<li><a id="converter" href="${mainSite}">${t.converter}</a><p>${t.converterHelp}</p></li><li><a href="${mainSite}guides/scanned-pdf-ocr">${escape(labels.ocrGuide)}</a></li><li><a href="${mainSite}scanned-pdf-to-markdown">${escape(labels.scannedTool)}</a></li></ul></section>
  </main><footer><p>${t.credit}</p><p>${t.sourceNote}</p><div class="source-links"><a id="source" href="${escape(source)}" rel="noopener noreferrer" target="_blank">${t.source}</a><a href="/pdf-tools/source.tar" download>${t.archive}</a><a href="https://github.com/PDFCraftTool/pdfcraft/tree/85bcc98bde29ffd3336bc8b63651c066e95ad2d0" target="_blank" rel="noopener noreferrer">PDFCraftTool/pdfcraft ↗</a></div></footer>
<script type="module" src="/src/main.js"></script></body></html>`;
}

import './style.css';
import { locales } from './locales.js';
import { validateFiles } from './validation.js';

const requested = new URLSearchParams(location.search).get('lang');
const lang = Object.hasOwn(locales, requested) ? requested : 'en';
const t = locales[lang];
const operation = location.pathname.startsWith('/split-pdf') ? 'split' : location.pathname.startsWith('/rotate-pdf') ? 'rotate' : 'merge';
const source = import.meta.env.VITE_SOURCE_URL || 'https://github.com/liuyan-wjy/pdftomd-pdfcraft-tools';
document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
document.title = `${t[operation]} · ${t.brand}`;
const app = document.querySelector('#app');
app.innerHTML = `
  <header><a class="brand" href="/merge-pdf/?lang=${lang}">PDF to MD <span>/ ${t.brand}</span></a><label class="locale">${t.language}<select id="language" aria-label="${t.language}"><option value="en">English</option><option value="zh">中文</option><option value="ja">日本語</option><option value="de">Deutsch</option></select></label></header>
  <main><nav aria-label="${t.brand}">${['merge','split','rotate'].map((tool) => `<a ${tool === operation ? 'aria-current="page"' : ''} href="/${tool}-pdf/?lang=${lang}">${t[tool]}</a>`).join('')}</nav>
    <div class="intro"><span class="eyebrow">PDFCRAFT / ${t.brand}</span><h1>${t[operation]}</h1><p>${t.privacy}</p></div>
    <section class="workbench" aria-labelledby="tool-title"><h2 id="tool-title">${t.choose}</h2><form id="tool-form"><fieldset id="controls"><label class="upload" for="files">${t.choose}<input id="files" name="files" type="file" accept=".pdf,application/pdf" ${operation === 'merge' ? 'multiple' : ''} aria-describedby="limits"></label><p class="small" id="limits">${t.limits}</p>
      <h3>${t.files}</h3><ol id="file-list"></ol><p id="empty">${t.empty}</p>
      ${operation !== 'merge' ? `<label class="field" for="ranges">${t.range}<input id="ranges" name="ranges" type="text" placeholder="1-3,5" maxlength="4000" ${operation === 'split' ? 'required' : ''} aria-describedby="range-help"></label><p class="small" id="range-help">${operation === 'split' ? t.rangeSplit : t.rangeRotate}</p>` : ''}
      ${operation === 'rotate' ? `<label class="field" for="angle">${t.angle}<select id="angle" name="angle"><option value="90">90°</option><option value="180">180°</option><option value="270">270°</option></select></label>` : ''}
      <button class="primary" id="run" type="submit" disabled>${t.run}</button></fieldset><button class="secondary" id="cancel" type="button" hidden>${t.cancel}</button></form>
      <div class="status" id="status" role="status" aria-live="polite">${t.ready}</div><progress id="progress" max="100" value="0" hidden aria-label="${t.busy}"></progress><a class="download" id="download" hidden>${t.download}</a>
    </section><section class="notes"><h2>${t.how}</h2><p>${t[`${operation}Help`]}</p><p>${t.warning}</p><p><a id="converter" href="https://pdf-to-md.app/${lang === 'en' ? '' : `${lang}/`}">${t.converter}</a></p><p>${t.converterHelp}</p></section>
  </main><footer><p>${t.credit}</p><p>${t.sourceNote}</p><div class="source-links"><a id="source" rel="noopener noreferrer" target="_blank">${t.source}</a><a href="/source.tar" download>${t.archive}</a><a href="https://github.com/PDFCraftTool/pdfcraft/tree/85bcc98bde29ffd3336bc8b63651c066e95ad2d0" target="_blank" rel="noopener noreferrer">PDFCraftTool/pdfcraft ↗</a></div></footer>`;
const sourceLink = document.querySelector('#source');
try { const url = new URL(source); if (url.protocol === 'https:') sourceLink.href = url.href; } catch { /* Keep invalid build configuration non-clickable. */ }
const language = document.querySelector('#language');
language.value = lang;
language.onchange = () => { const url = new URL(location.href); url.searchParams.set('lang', language.value); location.href = url.href; };
const input = document.querySelector('#files');
const list = document.querySelector('#file-list');
const run = document.querySelector('#run');
const controls = document.querySelector('#controls');
const status = document.querySelector('#status');
const progress = document.querySelector('#progress');
const download = document.querySelector('#download');
const cancel = document.querySelector('#cancel');
let files = [];
let worker;
let outputURL;
function clearOutput() {
  if (outputURL) URL.revokeObjectURL(outputURL);
  outputURL = undefined;
  download.hidden = true;
  download.removeAttribute('href');
}
function showError(code) {
  const key = ({ range: 'rangeError', angle: 'angleError' })[code] || code;
  status.textContent = t[key] || t.error;
  status.classList.add('error');
}
function invalidateOutput() {
  clearOutput();
  status.textContent = t.ready;
  status.classList.remove('error');
}
for (const selector of ['#ranges', '#angle']) {
  const field = document.querySelector(selector);
  field?.addEventListener('input', invalidateOutput);
  field?.addEventListener('change', invalidateOutput);
}
function renderFiles() {
  list.replaceChildren();
  document.querySelector('#empty').hidden = files.length > 0;
  files.forEach((file, index) => {
    const row = document.createElement('li');
    const name = document.createElement('span');
    name.textContent = `${index + 1}. ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MiB)`;
    row.append(name);
    const actions = document.createElement('div');
    for (const [label, delta] of [[t.up, -1], [t.down, 1], [t.remove, 0]]) {
      if (operation !== 'merge' && delta) continue;
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = delta === -1 ? '↑' : delta === 1 ? '↓' : '×';
      button.setAttribute('aria-label', `${label}: ${file.name}`);
      button.title = label;
      button.disabled = delta === -1 && index === 0 || delta === 1 && index === files.length - 1;
      button.onclick = () => {
        if (!delta) files.splice(index, 1);
        else [files[index], files[index + delta]] = [files[index + delta], files[index]];
        clearOutput(); renderFiles(); status.textContent = t.ready;
        const focusRow = list.children[Math.min(Math.max(index + delta, 0), files.length - 1)];
        focusRow?.querySelector('button:not(:disabled)')?.focus();
      };
      actions.append(button);
    }
    row.append(actions); list.append(row);
  });
  run.disabled = operation === 'merge' ? files.length < 2 : files.length !== 1;
}
input.onchange = () => {
  const additions = [...input.files];
  input.value = '';
  if (!additions.length) return;
  const selected = operation === 'merge' ? [...files, ...additions] : additions;
  try {
    // A single file is allowed while assembling a merge selection.
    validateFiles(selected, operation === 'merge' && selected.length === 1 ? 'rotate' : operation);
    files = selected; clearOutput(); renderFiles();
    status.textContent = t.ready; status.classList.remove('error');
  } catch (error) { showError(error.message); }
};
function endWorker() {
  worker?.terminate(); worker = undefined;
  controls.disabled = false; cancel.hidden = true; progress.hidden = true;
}
document.querySelector('#tool-form').onsubmit = (event) => {
  event.preventDefault(); clearOutput();
  status.classList.remove('error'); status.textContent = t.busy;
  controls.disabled = true; cancel.hidden = false; progress.hidden = false; progress.value = 0;
  worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
  worker.onmessage = ({ data }) => {
    if (typeof data.progress === 'number') { progress.value = data.progress; return; }
    endWorker();
    if (data.error) { showError(data.error); return; }
    outputURL = URL.createObjectURL(new Blob([data.result.bytes], { type: data.result.type }));
    download.href = outputURL; download.download = data.result.name; download.hidden = false;
    status.textContent = t.done; download.focus();
  };
  worker.onerror = () => { endWorker(); showError('error'); };
  worker.postMessage({ operation, files, ranges: document.querySelector('#ranges')?.value || '', angle: Number(document.querySelector('#angle')?.value || 90) });
};
cancel.onclick = () => { endWorker(); status.textContent = t.cancelled; run.focus(); };
window.addEventListener('pagehide', () => { endWorker(); clearOutput(); });
renderFiles();

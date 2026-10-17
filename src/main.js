import { locales } from './locales.js';
import { toolPath } from './paths.js';
import { validateFiles } from './validation.js';

const lang = document.body.dataset.lang;
const operation = document.body.dataset.tool;
const t = locales[lang];
const query = new URLSearchParams(location.search);
if (query.has('lang')) {
  const requested = query.get('lang');
  const target = new URL(toolPath(operation, Object.hasOwn(locales, requested) ? requested : lang), location.origin);
  query.delete('lang');
  target.search = query.toString();
  target.hash = location.hash;
  location.replace(target.href);
}
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

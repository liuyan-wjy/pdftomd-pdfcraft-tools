// SPDX-License-Identifier: AGPL-3.0-only
export const LIMITS = { fileBytes: 20 * 1024 * 1024, totalBytes: 50 * 1024 * 1024, pages: 500, files: 50 };
export function fail(code) { throw new Error(code); }
export function validateFiles(files, operation) {
  if (!['merge', 'split', 'rotate'].includes(operation)) fail('operation');
  if (operation === 'merge' ? files.length < 2 : files.length !== 1) fail('count');
  if (files.length > LIMITS.files) fail('limits');
  let total = 0;
  for (const file of files) {
    if (!/\.pdf$/i.test(file.name)) fail('type');
    if (!file.size || file.size > LIMITS.fileBytes) fail('limits');
    total += file.size;
  }
  if (total > LIMITS.totalBytes) fail('limits');
}
export function parseRanges(text, totalPages) {
  if (typeof text !== 'string' || !text.trim() || text.length > 4000) fail('range');
  const used = new Set();
  return text.split(',').map((part) => {
    const match = /^\s*([1-9]\d*)\s*(?:-\s*([1-9]\d*)\s*)?$/.exec(part);
    if (!match) fail('range');
    const start = Number(match[1]);
    const end = Number(match[2] || match[1]);
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || end < start || end > totalPages) fail('range');
    for (let page = start; page <= end; page++) {
      if (used.has(page)) fail('duplicate');
      used.add(page);
    }
    return { start, end };
  });
}

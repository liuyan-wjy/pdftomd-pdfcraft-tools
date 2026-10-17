import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument, PDFName, degrees } from 'pdf-lib';
import { unzipSync } from 'fflate';
import { processPDFs, parseRanges, validateFiles, LIMITS } from '../src/pdf.js';
async function fixture(widths, rotation = 0) {
  const doc = await PDFDocument.create();
  widths.forEach((width) => doc.addPage([width, 300]).setRotation(degrees(rotation)));
  return new File([await doc.save()], 'fixture.pdf', { type: 'application/pdf' });
}
async function widths(bytes) { return (await PDFDocument.load(bytes)).getPages().map((page) => page.getWidth()); }
test('merge keeps file-list and page order, and does not mutate originals', async () => {
  const a = await fixture([101, 102]); const b = await fixture([201]);
  const before = new Uint8Array(await a.arrayBuffer());
  const result = await processPDFs({ operation: 'merge', files: [b, a] });
  assert.deepEqual(await widths(result.bytes), [201, 101, 102]);
  assert.deepEqual(new Uint8Array(await a.arrayBuffer()), before);
});
test('split creates one real PDF per range in a ZIP, preserving specified order', async () => {
  const result = await processPDFs({ operation: 'split', files: [await fixture([101, 102, 103, 104, 105])], ranges: '4-5,1' });
  const parts = Object.values(unzipSync(result.bytes));
  assert.equal(parts.length, 2);
  assert.deepEqual(await widths(parts[0]), [104, 105]);
  assert.deepEqual(await widths(parts[1]), [101]);
});
test('rotation adds to existing rotation only for selected pages', async () => {
  const result = await processPDFs({ operation: 'rotate', files: [await fixture([101, 102], 270)], ranges: '2', angle: 180 });
  const pages = (await PDFDocument.load(result.bytes)).getPages();
  assert.deepEqual(pages.map((page) => page.getRotation().angle), [270, 90]);
  const all = await processPDFs({ operation: 'rotate', files: [await fixture([101, 102], 270)], angle: 90 });
  assert.deepEqual((await PDFDocument.load(all.bytes)).getPages().map((p) => p.getRotation().angle), [0, 0]);
});
test('range syntax is strict, bounded and duplicate-free', () => {
  for (const text of ['', '0', '3-1', '1-6', '2x', '1.5', '1,', '1,,2', '1-2-3', '-1', '1e2', '999999999999999999999']) assert.throws(() => parseRanges(text, 5), /range/);
  for (const text of ['1,1', '1-3,3-4']) assert.throws(() => parseRanges(text, 5), /duplicate/);
  assert.deepEqual(parseRanges(' 1 - 3 , 5 ', 5), [{ start: 1, end: 3 }, { start: 5, end: 5 }]);
});
test('actual processing rejects out-of-bounds, repeated ranges and invalid angle', async () => {
  const files = [await fixture([100, 101])];
  await assert.rejects(processPDFs({ operation: 'split', files, ranges: '3' }), /range/);
  await assert.rejects(processPDFs({ operation: 'split', files, ranges: '1,1' }), /duplicate/);
  await assert.rejects(processPDFs({ operation: 'rotate', files, ranges: '3' }), /range/);
  await assert.rejects(processPDFs({ operation: 'rotate', files, angle: 45 }), /angle/);
});
test('damaged files, fake extensions and encrypted PDF dictionaries are rejected', async () => {
  await assert.rejects(processPDFs({ operation: 'rotate', files: [new File(['%PDF-1.7\nnot a document'], 'bad.pdf')] }), /invalid/);
  await assert.rejects(processPDFs({ operation: 'rotate', files: [new File(['hello'], 'fake.pdf')] }), /type/);
  const valid = await fixture([100]);
  await assert.rejects(processPDFs({ operation: 'rotate', files: [new File([await valid.arrayBuffer()], 'file.txt')] }), /type/);
  // A real PDF with an /Encrypt trailer is enough to exercise pdf-lib's encrypted-document boundary.
  const doc = await PDFDocument.create(); doc.addPage();
  doc.context.trailerInfo.Encrypt = doc.context.register(doc.context.obj({ Filter: PDFName.of('Standard'), V: 1, R: 2, Length: 40, P: -4 }));
  const encrypted = new File([await doc.save({ useObjectStreams: false })], 'encrypted.pdf');
  await assert.rejects(processPDFs({ operation: 'rotate', files: [encrypted] }), /encrypted/);
});
test('resource and file-count limits apply before work or output', async () => {
  assert.throws(() => validateFiles([{ name: 'huge.pdf', size: LIMITS.fileBytes + 1 }], 'rotate'), /limits/);
  assert.throws(() => validateFiles(Array.from({ length: 3 }, () => ({ name: 'large.pdf', size: LIMITS.fileBytes })), 'merge'), /limits/);
  assert.throws(() => validateFiles(Array.from({ length: 51 }, () => ({ name: 'small.pdf', size: 10 })), 'merge'), /limits/);
  await assert.rejects(processPDFs({ operation: 'rotate', files: [await fixture(Array(501).fill(100))] }), /limits/);
});

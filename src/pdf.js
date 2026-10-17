/**
 * SPDX-License-Identifier: AGPL-3.0-only
 * Adapted 2026-10-17 from PDFCraftTool/pdfcraft processors merge.ts,
 * split.ts (pdf-lib fallback), rotate.ts (standard rotation).
 * Copyright: PDFCraft contributors. See NOTICE.md and upstream/ for originals.
 * Modifications: plain JS functions, strict validation/limits, no bookmark or
 * alternate engines, strict ranges, ZIP outputs, encrypted document rejection.
 */
import { PDFDocument, degrees } from 'pdf-lib';
import { zipSync } from 'fflate';

import { LIMITS, fail, parseRanges, validateFiles } from './validation.js';
export { LIMITS, parseRanges, validateFiles } from './validation.js';

async function load(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (bytes.byteLength !== file.size || bytes.byteLength > LIMITS.fileBytes) fail('limits');
  if (String.fromCharCode(...bytes.slice(0, 5)) !== '%PDF-') fail('type');
  try {
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: false, throwOnInvalidObject: true });
    if (doc.isEncrypted) fail('encrypted');
    if (doc.getPageCount() < 1) fail('invalid');
    // Access every page now so malformed page trees cannot produce partial output.
    for (const page of doc.getPages()) page.getSize();
    return doc;
  } catch (error) {
    if (error.message === 'encrypted' || /encrypt/i.test(error.message)) fail('encrypted');
    fail('invalid');
  }
}
export async function processPDFs({ operation, files, ranges = '', angle = 90 }, progress = () => {}) {
  validateFiles(files, operation);
  const documents = [];
  let pages = 0;
  for (let i = 0; i < files.length; i++) {
    const doc = await load(files[i]);
    pages += doc.getPageCount();
    if (pages > LIMITS.pages) fail('limits');
    documents.push(doc);
    progress(Math.round(((i + 1) / files.length) * 30));
  }
  if (operation === 'merge') {
    const mergedPdf = await PDFDocument.create();
    for (let i = 0; i < documents.length; i++) {
      const sourcePdf = documents[i];
      // PDFCraft merge.ts: copy every source page in file-list order.
      const copiedPages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
      for (const page of copiedPages) mergedPdf.addPage(page);
      progress(30 + Math.round(((i + 1) / documents.length) * 60));
    }
    return { bytes: await mergedPdf.save({ useObjectStreams: true }), name: 'merged.pdf', type: 'application/pdf' };
  }
  const sourcePdf = documents[0];
  const totalPages = sourcePdf.getPageCount();
  if (operation === 'split') {
    const parsed = parseRanges(ranges, totalPages);
    const outputs = {};
    let outputBytes = 0;
    for (let i = 0; i < parsed.length; i++) {
      const range = parsed[i];
      // PDFCraft split.ts: original pdf-lib fallback extraction loop.
      const newPdf = await PDFDocument.create();
      const pageIndices = [];
      for (let pageNum = range.start; pageNum <= range.end; pageNum++) pageIndices.push(pageNum - 1);
      const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
      for (const page of copiedPages) newPdf.addPage(page);
      const pdfBytes = await newPdf.save({ useObjectStreams: true });
      outputBytes += pdfBytes.byteLength;
      if (outputBytes > LIMITS.totalBytes) fail('limits');
      outputs[`part-${i + 1}-pages-${range.start}-${range.end}.pdf`] = pdfBytes;
      progress(30 + Math.round(((i + 1) / parsed.length) * 60));
    }
    return { bytes: zipSync(outputs, { level: 0 }), name: 'split-pdf.zip', type: 'application/zip' };
  }
  if (![90, 180, 270].includes(angle)) fail('angle');
  const selected = ranges.trim() ? parseRanges(ranges, totalPages) : [{ start: 1, end: totalPages }];
  const rotationsMap = new Map();
  for (const range of selected) for (let p = range.start; p <= range.end; p++) rotationsMap.set(p, angle);
  const newPdf = await PDFDocument.create();
  for (let i = 0; i < totalPages; i++) {
    // PDFCraft rotate.ts: retain existing rotation and add the requested angle.
    const originalPage = sourcePdf.getPage(i);
    const currentRotation = originalPage.getRotation().angle;
    const totalRotation = ((currentRotation + (rotationsMap.get(i + 1) || 0)) % 360 + 360) % 360;
    const [copiedPage] = await newPdf.copyPages(sourcePdf, [i]);
    copiedPage.setRotation(degrees(totalRotation));
    newPdf.addPage(copiedPage);
    progress(30 + Math.round(((i + 1) / totalPages) * 60));
  }
  return { bytes: await newPdf.save({ useObjectStreams: true }), name: 'rotated.pdf', type: 'application/pdf' };
}

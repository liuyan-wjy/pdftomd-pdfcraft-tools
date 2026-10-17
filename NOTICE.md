# Attribution and changes

This independent service is a modified work under AGPL-3.0-only. It is not affiliated with or endorsed by PDFCraftTool or PDFCraft. Retain this notice and the full `LICENSE` when redistributing.

Upstream: **PDFCraftTool/pdfcraft**, PDFCraft contributors. Pinned commit: **85bcc98bde29ffd3336bc8b63651c066e95ad2d0**. Retrieved and modified on **2026-10-17**.

Exact, unmodified upstream files are included in `upstream/`:

- `merge.ts`: https://github.com/PDFCraftTool/pdfcraft/blob/85bcc98bde29ffd3336bc8b63651c066e95ad2d0/src/lib/pdf/processors/merge.ts
- `split.ts`: https://github.com/PDFCraftTool/pdfcraft/blob/85bcc98bde29ffd3336bc8b63651c066e95ad2d0/src/lib/pdf/processors/split.ts
- `rotate.ts`: https://github.com/PDFCraftTool/pdfcraft/blob/85bcc98bde29ffd3336bc8b63651c066e95ad2d0/src/lib/pdf/processors/rotate.ts
- License: https://github.com/PDFCraftTool/pdfcraft/blob/85bcc98bde29ffd3336bc8b63651c066e95ad2d0/LICENSE

`src/pdf.js` directly adapts the merge `copyPages` loop, the split processor's original pdf-lib fallback range extraction loop, and the standard rotation loop (including existing angle addition) from these files. The upstream source files contain no per-file copyright headers; their comments and text are preserved in `upstream/` without adding invented copyright claims. The upstream AGPL license is preserved verbatim in `LICENSE`.

Modifications by this service's contributors, 2026-10-17: removed processor classes, TypeScript, bookmark generation, image/Office input, PyMuPDF, arbitrary angles, UI dependencies and alternate engines; retained PDF-only copy logic as small JS functions; changed encryption handling to reject encrypted documents; added strict file signatures and ranges, duplicate rejection, resource limits, ZIP output, a Web Worker with cancellation, four-language UI, source offer and tests. The original project supports more functionality; no equivalence or fidelity claim is made.

Bundled runtime dependencies retain their own license notices: pdf-lib (MIT), @pdf-lib/standard-fonts (MIT), @pdf-lib/upng (MIT), pako (MIT/Zlib), tslib (0BSD), and fflate (MIT). Exact installed license texts are shipped with production assets under `/licenses/`. Vite is the build-time tool, not a PDF engine. The lockfile identifies the complete dependency versions.

SEO/localization cleanup (2026-10-17): rendered the existing UI from one shared template into twelve static locale/tool pages; added canonical/alternate metadata, sitemap, robots, root redirect and compatibility for legacy language queries. Replaced implementation branding above the tool with task-specific introductions and steps. The PDF processors and original upstream files are unchanged in this pass.

Same-origin hosting migration (2026-10-18): moved generated resources, source offer and tool sitemap under `/pdf-tools/`; changed canonical URLs to `pdf-to-md.app`; added a separate assets-only Worker configuration with bounded Routes, localized main-site home links and explicit manual converter handoff. Retained old source/license copies for Pages compatibility. PDF processing and original upstream files are unchanged.

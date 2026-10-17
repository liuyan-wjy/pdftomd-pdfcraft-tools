# PDF to MD — independent PDFCraft tools

An AGPL-3.0-only browser service offering `/merge-pdf/`, `/split-pdf/`, and `/rotate-pdf/`. PDF handling directly adapts selected PDFCraftTool/pdfcraft processors at commit `85bcc98bde29ffd3336bc8b63651c066e95ad2d0`; see [NOTICE.md](NOTICE.md) for source mappings and modifications. This is an independent modified project, not the official PDFCraft service.

## Release sequence

Publish the corresponding independent source revision and deploy the independent tool service with its matching source archive first. Verify the twelve canonical language/tool URLs on that deployment before releasing the main site's new links to those URLs. Keep the public source offer matched to the deployed tool build throughout this sequence.

## Run and build

Requires Node.js 22.18+ and npm. No account, database, secret, external script or upload server is required.

```sh
npm ci
npm test
npm run e2e:install # once, if Chromium is not installed
npm run e2e
npm run dev
# http://127.0.0.1:4174/zh/merge-pdf/
VITE_SOURCE_URL=https://github.com/liuyan-wjy/pdftomd-pdfcraft-tools/tree/YOUR_DEPLOYED_COMMIT npm run build
npm run preview
```

Build `dist/` for the independent assets-only Worker `pdftomd-pdf-tools`. The included `wrangler.jsonc` assigns only the twelve tool prefixes on `pdf-to-md.app` and `/pdf-tools/*`; it does not replace the main site's Worker or bind another Custom Domain. HTML uses trailing slashes and unknown assets return a 404. The Worker disables its workers.dev hostname. Deployment can use an existing compatible Wrangler CLI; no additional runtime or build dependency is required.

The canonical origin is `https://pdf-to-md.app`, defined once in `src/paths.js`. Vite emits JavaScript, CSS and the processing worker under `/pdf-tools/assets/`. Keep `/pdf-tools/source.tar`, `/pdf-tools/licenses/` and `/pdf-tools/sitemap.xml` publicly available. The main Worker continues to own `/`, `/robots.txt`, `/sitemap.xml` and all unrelated routes. Its sitemap/robots configuration must discover the twelve tool URLs or the namespaced tool sitemap. Standalone root, robots, sitemap, `/source.tar` and `/licenses/` copies remain only for the previous Pages deployment's compatibility; the tool Worker's route list does not claim these root paths. This migration does not redirect the old Pages tool URLs; that release step is coordinated separately after same-origin verification.

Set `VITE_SOURCE_URL` to the public source repository's immutable deployed commit URL before release; absent that variable, the source link defaults to https://github.com/liuyan-wjy/pdftomd-pdfcraft-tools. The shared `src/page.js` template and locale records generate all 12 complete HTML entries via `scripts/generate-pages.js`. The browser script binds PDF interactions to that markup rather than rendering a second copy. Each build generates the complete corresponding source at `/pdf-tools/source.tar` and a byte-identical legacy `/source.tar` copy, so the source offer remains available independently of GitHub. Run `npm run source:archive` after `npm ci` to regenerate it separately. The archive contains source, original upstream processors, licenses, attribution, tests, lockfile, build scripts and the Worker configuration; dependencies can be reproduced with `npm ci`.

Languages have canonical paths: English `/merge-pdf/`, Chinese `/zh/merge-pdf/`, Japanese `/ja/merge-pdf/`, and German `/de/merge-pdf/` (likewise for split and rotate). Ordinary language links retain the current tool. Old `?lang=en|zh|ja|de` links redirect to these paths in the browser; with JavaScript disabled, the original page still exposes its canonical URL and language links. Unsupported query values resolve to the current page language. Processing runs in a dedicated module Web Worker and does not upload file bytes. Cancel terminates the worker and keeps the original selection. There is no automatic download: users explicitly click the result link. The header home link and converter link return to the corresponding language homepage. Users download their result and select it in the converter themselves; the tool never automatically passes the file to the converter.

## Contracts and limits

- Merge accepts PDFs only, appends newly selected files to the list, permits move-up/down and removal, and uses visible list order. At least two PDFs are required.
- Split accepts one PDF. Each comma-separated range creates a distinct PDF, all bundled in a ZIP. `1-3,5` creates two PDFs. Input order is preserved. Invalid, reversed, out-of-bounds, overlapping and repeated ranges are rejected.
- Rotate accepts one PDF and adds 90/180/270 degrees clockwise to existing rotation. Blank range means all pages; otherwise the same strict range grammar applies.
- Inputs require `.pdf` extension and `%PDF-` at byte zero, and must parse without invalid objects. Encrypted PDFs are rejected. Some valid files with leading data before the PDF header are intentionally rejected.
- Limits: 20 MiB per input, 50 MiB total input, 50 files and 500 total pages. Split output is also capped at 50 MiB before ZIP packaging. These are input limits, not a guarantee of peak browser memory usage: complex PDFs can still exceed device memory. Worker cancellation is available; originals are never overwritten.
- Bookmarks, interactive forms, attachments, accessibility tags and digital signatures are not preserved as a guaranteed contract. Inspect outputs. No OCR, repair, decryption, Office conversion or server fallback is included.

## Verification

`npm test` generates and processes actual pdf-lib PDFs: merge order, split ZIP page counts and range order, rotation accumulation and selection, strict invalid ranges, damaged and encrypted document rejection, extension/signature validation and resource limits. The encrypted-boundary fixture uses a PDF with an `/Encrypt` trailer; it is not a password decryption or full cryptographic interoperability test. `npm run e2e` runs persistent Playwright browser tests for all three paths and four languages at 320px, file ordering and removal, downloaded PDFs/ZIPs, strict ranges and recovery, stale-result invalidation, cancellation and explicit download, plus raw-HTTP HTML, JavaScript-disabled content, reciprocal hreflang, the namespaced sitemap, legacy-language redirects and source/archive compatibility. A static Node contract checks that Worker routes do not claim the main root or unrelated paths and that all compiled assets use the namespace. Tests start an isolated production preview on port 4175. No test claims PDF fidelity across arbitrary third-party documents.

## License

AGPL-3.0-only. Keep the complete license, original source notices, modification notices and corresponding source available to users of deployed versions. Third-party package licenses accompany their packages and are copied into the production build. Publish corresponding source before deploying this service, then verify the source archive and language routes before releasing main-site links.

## Local content expansion plan (2026-10-17)

Keep the existing PDF controls and processing behavior. Extend each of the twelve static pages below the tool with practical examples, exact capabilities, an output checklist, file handling and limits, troubleshooting, task-specific FAQs and related tool/converter/OCR-guide links. Use the current build-time renderer and a single translated content record for each language; do not add dependencies or client-side rendering. Keep file-list styling scoped so normal lists and mobile tables remain readable. Re-run the existing PDF unit and browser journeys, plus a small static contract for section/link relationships; do not test marketing wording. The release review passed 19 Node tests and all 10 browser journeys, including production build, static SEO and actual PDF downloads.

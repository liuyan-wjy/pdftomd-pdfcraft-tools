# PDF tool journeys

- Four languages × merge/split/rotate: 320px without horizontal overflow or browser errors; correct document language, language switching retains tool path, ordinary namespaced source/archive/upstream links, localized converter and header home URLs.
- Merge: add real PDFs, adjust order, remove/re-add, create, explicitly click download, parse downloaded PDF to verify page widths/order. No upload requests.
- Split: one real PDF, strict ranges create separate PDF members in one downloaded ZIP. Reject invalid/duplicate/out-of-bounds ranges without losing selection, correct and retry.
- Rotate: select a range and angle, add to original rotation, preserve unselected page angles. Changing range or angle hides the stale download until recreated.
- Cancel: hold the worker script request, start processing, cancel, release request; original selection remains, no result/download appears; retry succeeds.
- Source: download /pdf-tools/source.tar; the legacy /source.tar copy matches. Check tar contains source, originals, licenses, lockfile, Worker configuration, tests and build instructions.

- Static SEO: all 12 clean language paths return complete localized HTML with one H1, task steps, limitations, source notices, unique title/description, self canonical and reciprocal en/zh-CN/ja/de/x-default alternates. With JavaScript disabled, content and ordinary language/tool links remain available at 320px.
- Discovery: /pdf-tools/sitemap.xml contains exactly the 12 main-domain canonical tool URLs. Legacy standalone root/robots/sitemap copies remain for Pages compatibility; Worker routes do not claim the main site root, robots or sitemap.
- Compatibility: legacy ?lang=en|zh|ja|de tool URLs redirect to the matching clean language path, removing only lang and preserving other query parameters.

- Task content relationships (Node/static HTML): page-directory links resolve to unique semantic sections; each tool links to the other two tools in the same language and the matching main-site converter, scanned converter and OCR guide. Examples and FAQs are ordinary server-delivered HTML. Wording and FAQ counts are not acceptance contracts.

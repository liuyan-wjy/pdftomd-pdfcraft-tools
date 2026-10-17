# PDF tool journeys

- Four languages × merge/split/rotate: 320px without horizontal overflow or browser errors; correct document language, language switching retains tool path, ordinary source/archive/upstream links, localized converter return URL.
- Merge: add real PDFs, adjust order, remove/re-add, create, explicitly click download, parse downloaded PDF to verify page widths/order. No upload requests.
- Split: one real PDF, strict ranges create separate PDF members in one downloaded ZIP. Reject invalid/duplicate/out-of-bounds ranges without losing selection, correct and retry.
- Rotate: select a range and angle, add to original rotation, preserve unselected page angles. Changing range or angle hides the stale download until recreated.
- Cancel: hold the worker script request, start processing, cancel, release request; original selection remains, no result/download appears; retry succeeds.
- Source: download the complete source archive, check gzip/tar contains source, originals, licenses, lockfile, tests and build instructions.

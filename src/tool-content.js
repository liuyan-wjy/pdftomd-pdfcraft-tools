export const toolContent = {
  "en": {
    "labels": {
      "examples": "What will the result look like?",
      "input": "Your input",
      "output": "Downloaded result",
      "scope": "What this tool changes",
      "checks": "Check the downloaded PDF",
      "handling": "Files, limits and cancellation",
      "trouble": "If the result is not what you expected",
      "faq": "Common questions",
      "related": "Continue with your document",
      "jump": "On this page",
      "ocrGuide": "How to handle a scanned PDF with OCR",
      "scannedTool": "Convert a scanned PDF to Markdown"
    },
    "handling": [
      "These tools require no sign-up or payment. PDF processing runs in your browser, without uploading the files. A result is a new download; the selected originals are never overwritten.",
      "The tools do not add watermarks. Watermarks already on the original pages remain in the output.",
      "Damaged and encrypted PDFs are not supported. An encrypted document can be rejected even if your reader opens it without asking for a password; there is no unlock or password-entry step here.",
      "Inputs are limited to 20 MiB per PDF, 50 MiB combined, 50 files and 500 pages in total. Complex documents may still exceed the memory available on your device. If you hit a limit, select fewer files or obtain a smaller source PDF; this tool cannot accept an oversized original first.",
      "Cancel stops the current job and keeps your file selection. Refreshing, closing the page or following a link clears the selection and settings. Keep the originals available so you can select them again."
    ],
    "merge": {
      "examples": [
        [
          "A.pdf (2 pages), then B.pdf (3 pages)",
          "One 5-page PDF: A1, A2, B1, B2, B3."
        ],
        [
          "Move B.pdf above A.pdf",
          "One PDF: B1, B2, B3, A1, A2."
        ],
        [
          "An A4 portrait PDF and a landscape PDF",
          "The page sizes and orientations can remain different."
        ]
      ],
      "scope": [
        "The arrows arrange whole files. Pages within each input keep their original order; this is not a page-by-page editor.",
        "Merging does not make every page the same paper size or orientation. Use Rotate PDF separately if particular pages need turning.",
        "Scanned pages remain scans. Merging does not add OCR text, remove blank pages or optimize the file size."
      ],
      "checks": [
        "Open the downloaded merged.pdf and compare its total page count with the inputs.",
        "Check the joins between documents, especially covers, appendices and pages with a different orientation.",
        "Test any important links and form fields. Keep a separate original copy of signed documents."
      ],
      "trouble": [
        [
          "Create file is disabled",
          "Select at least two PDFs. Choosing another file adds it to the list; remove any file you added by mistake."
        ],
        [
          "The documents are in the wrong order",
          "Move the file up or down in the visible list and create the result again. A previously downloaded PDF does not update itself."
        ],
        [
          "A file is rejected",
          "Check that it is a readable, unencrypted PDF and within the input limits. This tool cannot repair a damaged PDF or unlock a password-protected one."
        ]
      ],
      "faqs": [
        [
          "Can I move one page ahead of another page?",
          "Not within this merge tool. It changes the order of whole files, not individual pages inside them."
        ],
        [
          "Will a digital signature still be valid?",
          "Do not assume so. Combining pages produces a new document; retain the signed original and check any signature requirements before using the merged copy."
        ],
        [
          "Will merging make images or text blurry?",
          "The tool copies PDF pages and offers no image-compression or resolution settings. This is not a guarantee that every document feature will look identical; inspect small text, fine lines and images in the downloaded PDF."
        ],
        [
          "Why is the new PDF not smaller?",
          "This tool combines documents; it does not compress them. The output size can change and is not guaranteed to be smaller than the inputs."
        ]
      ]
    },
    "split": {
      "examples": [
        [
          "1-3,5",
          "Two PDFs in one ZIP: pages 1–3, and page 5."
        ],
        [
          "1,2,3",
          "Three separate one-page PDFs in one ZIP."
        ],
        [
          "1-3",
          "One three-page PDF, still packaged in a ZIP."
        ],
        [
          "5,1-3",
          "The ZIP parts follow that order: page 5 first, then pages 1–3."
        ]
      ],
      "scope": [
        "Use physical page positions, starting at 1. A cover is page 1 even if the printed numbering starts later or uses Roman numerals.",
        "Each comma-separated range becomes one PDF. Ranges may be listed in any order, but must not overlap or repeat a page.",
        "Only the chosen pages appear in the results. This does not change or delete pages from the original PDF.",
        "The combined generated PDF data is also limited to 50 MiB before ZIP packaging. Even a source below 20 MiB can exceed that output limit when shared resources are copied into separate parts."
      ],
      "checks": [
        "Extract the downloaded split-pdf.zip before opening the PDFs.",
        "Check the number of parts and the first and last page of each part against your intended physical page ranges.",
        "Check diagrams, links and interactive fields in the parts you intend to share."
      ],
      "trouble": [
        [
          "A range is rejected",
          "Use numbers and hyphens, separated by commas, such as 1-3,5. Do not use 0, reversed ranges, repeated pages or a number above the document page count."
        ],
        [
          "The wrong chapter was extracted",
          "Count from the very first physical page, including the cover and front matter; do not rely only on the numbers printed on the page."
        ],
        [
          "The source or output is too large",
          "An original above 20 MiB cannot be loaded to split it here. Obtain a smaller source or choose fewer output ranges if the generated parts exceed 50 MiB."
        ]
      ],
      "faqs": [
        [
          "Can I extract just one page?",
          "Yes. Enter its physical page number, for example 5. The single resulting PDF is still delivered inside a ZIP."
        ],
        [
          "Can I split into parts of a target file size?",
          "No. Splitting uses page ranges, not a target number of MiB. File sizes also depend on images and other shared PDF resources."
        ],
        [
          "What happens to pages I leave out?",
          "They are omitted from the downloaded parts. The original PDF still contains all of its pages."
        ],
        [
          "Do the parts retain bookmarks and forms?",
          "Do not rely on that. Page extraction can change document-level features; inspect any bookmarks, links and fields you need in each part."
        ]
      ]
    },
    "rotate": {
      "examples": [
        [
          "90° with an upright page",
          "Turn the page one quarter-turn clockwise."
        ],
        [
          "270° with an upright page",
          "Turn the page one quarter-turn counterclockwise."
        ],
        [
          "180° with an upright page",
          "Turn the page upside down."
        ],
        [
          "A page already rotated 90°, plus 270°",
          "The rotations add to 360°, so its resulting angle is 0°."
        ]
      ],
      "scope": [
        "Leave the page range blank to rotate every page. Use a range such as 1-3,5 for selected physical page positions only.",
        "The chosen angle is added to the rotation already stored on each selected page. Pages outside the range keep their original rotation and order.",
        "The output is a new PDF with the rotation saved in it, not a temporary turn inside the preview. This does not perform OCR or change a scan into selectable text."
      ],
      "checks": [
        "Download rotated.pdf and open that new file, rather than the original.",
        "Check both a page inside the selected range and a page outside it. Mixed starting orientations can still produce mixed results.",
        "Close and reopen the downloaded file to check that the intended orientation persists."
      ],
      "trouble": [
        [
          "The page turned the wrong way",
          "90° is clockwise; 270° is equivalent to 90° counterclockwise. Choose the other angle and create a new result."
        ],
        [
          "The wrong pages rotated",
          "Ranges use physical positions from page 1, including the cover. A blank range applies to all pages."
        ],
        [
          "The PDF will not open",
          "Damaged or encrypted PDFs are not supported. Use a readable, unencrypted copy from the document owner; this tool does not repair or unlock files."
        ]
      ],
      "faqs": [
        [
          "Can I fix pages that need different angles?",
          "Each run applies one angle to its selected pages. Download the result, select that new PDF and run another rotation on the next group if needed."
        ],
        [
          "Does it straighten a tilted scan or detect orientation?",
          "No. It does not automatically detect page direction, deskew a small scan angle, mirror a page or run OCR. It supports fixed quarter-turns only."
        ],
        [
          "Why did the download disappear when I changed a setting?",
          "A change to the angle or page range makes the old result outdated. Click Create file again to generate a result for the new settings."
        ],
        [
          "Can I undo a rotation?",
          "Keep the original PDF for a clean restart. You can also apply the opposite rotation to a downloaded copy, but that does not restore any other document features changed during processing."
        ]
      ]
    }
  },
  "zh": {
    "labels": {
      "examples": "输入后会得到什么？",
      "input": "输入示例",
      "output": "下载结果",
      "scope": "这个工具会改变什么",
      "checks": "下载后检查这些内容",
      "handling": "文件、限额与取消操作",
      "trouble": "结果不符合预期时",
      "faq": "常见问题",
      "related": "继续处理文档",
      "jump": "本页内容",
      "ocrGuide": "扫描 PDF 的 OCR 处理指南",
      "scannedTool": "将扫描 PDF 转为 Markdown"
    },
    "handling": [
      "这三个工具无需注册或付费。PDF 在浏览器内处理，不会上传文件。结果通过新文件下载，所选原文件不会被覆盖。",
      "工具不会添加水印，原页面已有的水印会保留在结果中。",
      "不支持损坏或加密 PDF。即使阅读器打开时没有要求密码，加密文件也可能被拒绝；这里没有解锁或输入密码的步骤。",
      "输入限制为每个 PDF 20 MiB、累计 50 MiB、最多 50 个文件和共 500 页。复杂文档仍可能超过设备可用内存。遇到限额时，减少文件数量或获取更小的源 PDF；不能先传入超限原件再处理。",
      "取消会停止当前任务并保留已选文件。刷新、关闭页面或点击链接离开后，文件选择和设置会丢失。请保留原文件，以便重新选择。"
    ],
    "merge": {
      "examples": [
        [
          "先选 A.pdf（2 页），再选 B.pdf（3 页）",
          "生成 5 页 PDF：A1、A2、B1、B2、B3。"
        ],
        [
          "将 B.pdf 移到 A.pdf 上方",
          "顺序变为 B1、B2、B3、A1、A2。"
        ],
        [
          "A4 竖版 PDF 与横版 PDF",
          "各页纸张大小和方向可能仍然不同。"
        ]
      ],
      "scope": [
        "箭头调整的是整个文件的顺序。各原文件内部页序保持不变，不能在这里逐页重排。",
        "合并不会统一所有页面的纸张大小或方向。如需转正部分页面，可另用旋转 PDF 工具。",
        "扫描页仍是扫描页。合并不会进行 OCR、移除空白页或优化文件体积。"
      ],
      "checks": [
        "打开下载的 merged.pdf，核对总页数是否等于各输入文件页数之和。",
        "检查文档之间的衔接位置，尤其是封面、附录和方向不同的页面。",
        "测试重要链接和表单字段。已签名文档应另外保留原件。"
      ],
      "trouble": [
        [
          "“生成文件”不可用",
          "至少选择两个 PDF。再次选择文件会追加到列表，误加的文件可从列表移除。"
        ],
        [
          "文档顺序不对",
          "在可见列表中上移或下移文件，然后重新生成。已经下载的 PDF 不会随设置自动更新。"
        ],
        [
          "文件被拒绝",
          "检查文件是否为可正常打开、未加密且未超过限额的 PDF。本工具不能修复损坏文件或解锁密码保护文件。"
        ]
      ],
      "faqs": [
        [
          "能把某一页移到另一页前面吗？",
          "此合并工具只能调整整个文件的顺序，不能调整单个文件内部的页序。"
        ],
        [
          "数字签名还能保持有效吗？",
          "不能这样假定。合并会生成新文档，请保留带签名的原件，并在使用合并副本前核对签名要求。"
        ],
        [
          "合并后图片或文字会变模糊吗？",
          "工具会复制 PDF 页面，不提供图片压缩或分辨率设置，但不承诺所有文档特征都完全一致。下载后请检查小字、细线和图片。"
        ],
        [
          "为什么新 PDF 没有变小？",
          "本工具合并文档，不压缩文档。输出体积可能变化，并不保证小于输入文件。"
        ]
      ]
    },
    "split": {
      "examples": [
        [
          "1-3,5",
          "一个 ZIP 内有两个 PDF：第 1–3 页，以及第 5 页。"
        ],
        [
          "1,2,3",
          "一个 ZIP 内有三个独立的单页 PDF。"
        ],
        [
          "1-3",
          "一个包含三页的 PDF，仍打包在 ZIP 中。"
        ],
        [
          "5,1-3",
          "按输入顺序生成：第一个 PDF 是第 5 页，第二个是第 1–3 页。"
        ]
      ],
      "scope": [
        "页码指从 1 开始的实际页面位置。即使正文编号从后面开始或使用罗马数字，封面仍算第 1 页。",
        "每个用逗号分隔的范围各生成一个 PDF。范围可按任意顺序输入，但不能重叠或重复包含某页。",
        "结果只包含选中的页面，不会修改原 PDF 或从原件中删除页面。",
        "打包前生成的 PDF 数据累计也限 50 MiB。即使原件未超过 20 MiB，共享资源复制到多个分片后仍可能超出输出限额。"
      ],
      "checks": [
        "先解压下载的 split-pdf.zip，再打开里面的 PDF。",
        "核对分片数量，以及每个分片的起止页面是否对应所需的实际页码范围。",
        "检查准备分享的分片中的图表、链接和交互表单字段。"
      ],
      "trouble": [
        [
          "范围被拒绝",
          "请使用半角数字、半角连字符 - 和半角逗号 ,，例如 1-3,5；不支持全角逗号或顿号。不能使用 0、倒序范围、重复页面或超过文件总页数的数字。"
        ],
        [
          "提取到了错误章节",
          "从文件最前面的实际页面开始计数，包括封面和前言，不要只看页面印刷的编号。"
        ],
        [
          "原件或结果体积超限",
          "超过 20 MiB 的原件不能先传入本工具拆分。请获取更小的源文件；如果生成分片超出 50 MiB，可减少输出范围。"
        ]
      ],
      "faqs": [
        [
          "可以只提取一页吗？",
          "可以。输入该页的实际位置，例如 5。即使只生成一个单页 PDF，也会放在 ZIP 中下载。"
        ],
        [
          "可以按目标文件体积拆分吗？",
          "不能。这里按页码范围拆分，不按指定的 MiB 数拆分；体积还受图片和其他共享资源影响。"
        ],
        [
          "没有选中的页面会怎么样？",
          "它们不会出现在下载的分片中，原 PDF 仍保留全部页面。"
        ],
        [
          "分片会保留书签和表单吗？",
          "不能依赖这一点。页面提取可能改变文档级功能，请逐个检查所需的书签、链接和字段。"
        ]
      ]
    },
    "rotate": {
      "examples": [
        [
          "正向页面旋转 90°",
          "顺时针转四分之一圈。"
        ],
        [
          "正向页面旋转 270°",
          "相当于逆时针转 90°。"
        ],
        [
          "正向页面旋转 180°",
          "页面上下倒转。"
        ],
        [
          "原本已有 90° 旋转，再加 270°",
          "累计为 360°，结果角度为 0°。"
        ]
      ],
      "scope": [
        "页码范围留空会旋转全部页面；输入 1-3,5 等范围，只处理指定的实际页面位置。",
        "所选角度会叠加到各页原有的旋转角度上。范围之外的页面保持原有方向和顺序。",
        "结果是保存了旋转方向的新 PDF，而非阅读器中的临时转向。此操作不进行 OCR，也不会让扫描文字变得可选中。"
      ],
      "checks": [
        "下载 rotated.pdf 并打开这个新文件，不要误开原件。",
        "同时检查范围内与范围外的页面。原本方向不同的页面，处理后仍可能方向不同。",
        "关闭后重新打开下载的文件，确认所需方向已保存。"
      ],
      "trouble": [
        [
          "转反了方向",
          "90° 是顺时针，270° 相当于逆时针 90°。改选另一个角度后重新生成结果。"
        ],
        [
          "旋转了错误的页面",
          "范围从实际第 1 页起计数，包括封面。范围留空表示全部页面。 请使用半角连字符 - 和半角逗号 ,，例如 1-3,5；不支持全角逗号或顿号。"
        ],
        [
          "PDF 无法打开",
          "不支持损坏或加密 PDF。请向文档所有者获取可正常打开的未加密副本；此工具不能修复或解锁文件。"
        ]
      ],
      "faqs": [
        [
          "不同页面需要不同角度怎么办？",
          "每次运行对指定页面应用一个角度。可先下载结果，再选择该新 PDF，对另一组页面继续旋转。"
        ],
        [
          "可以自动识别方向、校正歪斜扫描吗？",
          "不能。这里不自动判断方向，不做小角度纠偏、镜像或 OCR，只支持固定的四分之一圈旋转。"
        ],
        [
          "改了角度或范围后，下载入口为什么消失了？",
          "设置变化后旧结果已不适用。请再次点击“生成文件”，得到符合新设置的结果。"
        ],
        [
          "可以撤销旋转吗？",
          "保留原 PDF 可随时从原件重新开始。也可对下载副本反向旋转，但这不会恢复处理过程中可能变化的其他文档功能。"
        ]
      ]
    }
  },
  "ja": {
    "labels": {
      "examples": "どのような結果になりますか？",
      "input": "入力例",
      "output": "ダウンロードする結果",
      "scope": "このツールで変わること",
      "checks": "ダウンロード後の確認",
      "handling": "ファイル・制限・キャンセル",
      "trouble": "期待した結果にならないとき",
      "faq": "よくある質問",
      "related": "文書の処理を続ける",
      "jump": "このページの内容",
      "ocrGuide": "スキャン PDF の OCR 処理ガイド",
      "scannedTool": "スキャン PDF を Markdown に変換"
    },
    "handling": [
      "登録や支払いは不要です。PDF はブラウザー内で処理し、アップロードしません。結果は新しいファイルとしてダウンロードするため、選択した原本を上書きしません。",
      "ツールは透かしを追加しません。元のページにある透かしは出力にも残ります。",
      "破損・暗号化 PDF は非対応です。閲覧時にパスワードを求められなくても、暗号化された文書は拒否される場合があります。解除やパスワード入力の機能はありません。",
      "入力の上限は PDF ごとに 20 MiB、合計 50 MiB、最大 50 ファイル、合計 500 ページです。複雑な文書は端末の空きメモリーを超える場合があります。制限に達した場合はファイル数を減らすか、より小さい原本を用意してください。上限を超えた原本を先に読み込むことはできません。",
      "キャンセルすると処理が止まり、選択したファイルは保持されます。更新・ページを閉じる・リンク先に移動すると、選択と設定が失われます。再選択できるよう原本を保管してください。"
    ],
    "merge": {
      "examples": [
        [
          "A.pdf（2 ページ）、次に B.pdf（3 ページ）",
          "5 ページの PDF：A1、A2、B1、B2、B3。"
        ],
        [
          "B.pdf を A.pdf より上に移動",
          "B1、B2、B3、A1、A2 の順になります。"
        ],
        [
          "A4 縦向きの PDF と横向きの PDF",
          "ページサイズや向きの違いは残る場合があります。"
        ]
      ],
      "scope": [
        "矢印で変えられるのはファイル単位の順序です。各ファイル内のページ順は保持され、個別のページを並べ替える編集機能はありません。",
        "結合しても全ページの用紙サイズや向きは統一されません。向きを変える必要があるページには、別途 PDF 回転ツールを使用してください。",
        "スキャンはスキャンのままです。結合では OCR、空白ページの削除、ファイルサイズの最適化を行いません。"
      ],
      "checks": [
        "ダウンロードした merged.pdf を開き、ページ数が入力ファイルの合計と一致するか確認します。",
        "表紙・付録・向きの異なるページなど、文書のつなぎ目を確認します。",
        "重要なリンクやフォームを試してください。署名済み文書は原本を別途保管してください。"
      ],
      "trouble": [
        [
          "「ファイルを作成」が使えない",
          "2 つ以上の PDF を選択してください。追加で選んだファイルは一覧に追加されるので、不要なものは削除できます。"
        ],
        [
          "文書の順番が違う",
          "一覧でファイルを上下に移動してから、結果を作り直してください。ダウンロード済みの PDF は自動更新されません。"
        ],
        [
          "ファイルが拒否される",
          "正常に開ける、暗号化されていない、入力制限内の PDF か確認してください。破損の修復やパスワード解除はできません。"
        ]
      ],
      "faqs": [
        [
          "特定のページを別のページより前に移動できますか？",
          "この結合ツールで変更できるのはファイル単位の順序です。ファイル内の個別ページは並べ替えられません。"
        ],
        [
          "電子署名の有効性は保たれますか？",
          "保たれるとは限りません。結合すると新しい文書になるため、署名済みの原本を保管し、結合版を使う前に署名の要件を確認してください。"
        ],
        [
          "結合すると画像や文字がぼやけますか？",
          "PDF ページをコピーする処理で、画像圧縮や解像度の設定はありません。ただし、すべての文書要素が同じ見た目になる保証はありません。ダウンロード後に小さな文字、細い線、画像を確認してください。"
        ],
        [
          "新しい PDF が小さくならないのはなぜですか？",
          "このツールは文書を結合しますが、圧縮はしません。出力サイズは変わる場合があり、入力より小さくなる保証はありません。"
        ]
      ]
    },
    "split": {
      "examples": [
        [
          "1-3,5",
          "1 つの ZIP に 2 つの PDF：1～3 ページ、および 5 ページ。"
        ],
        [
          "1,2,3",
          "1 つの ZIP に、1 ページずつの PDF が 3 つ入ります。"
        ],
        [
          "1-3",
          "3 ページを含む PDF が 1 つ。これも ZIP にまとめます。"
        ],
        [
          "5,1-3",
          "指定順に、まず 5 ページ、次に 1～3 ページの PDF を作成します。"
        ]
      ],
      "scope": [
        "番号は 1 から始まる物理的なページ位置です。本文の番号が後から始まる場合やローマ数字の場合でも、表紙が 1 ページ目です。",
        "コンマで区切った範囲ごとに 1 つの PDF になります。範囲の指定順は自由ですが、ページの重複や範囲の重なりは使えません。",
        "出力に含まれるのは選択したページだけです。原本を変更したり、原本からページを削除したりはしません。",
        "ZIP にまとめる前の生成 PDF データも合計 50 MiB が上限です。共有リソースが各ファイルにコピーされると、20 MiB 未満の原本でも出力上限に達する場合があります。"
      ],
      "checks": [
        "ダウンロードした split-pdf.zip を展開してから PDF を開きます。",
        "ファイル数と各ファイルの最初・最後のページが、指定した物理ページ範囲と一致するか確認します。",
        "共有する PDF 内の図表・リンク・フォーム欄を確認してください。"
      ],
      "trouble": [
        [
          "範囲が拒否される",
          "半角数字・半角ハイフン -・半角コンマ , を使い、1-3,5 のように指定します。全角コンマや読点（、）は使えません。0、逆順、重複、文書のページ数を超える番号も指定できません。"
        ],
        [
          "別の章が抽出された",
          "表紙や前付けを含む、文書の最初の物理ページから数えてください。印刷されたページ番号だけを基準にしないでください。"
        ],
        [
          "原本または結果が大きすぎる",
          "20 MiB を超える原本を読み込んで分割することはできません。小さい原本を用意するか、生成結果が 50 MiB を超える場合は出力範囲を減らしてください。"
        ]
      ],
      "faqs": [
        [
          "1 ページだけ抽出できますか？",
          "はい。例えば 5 のように物理ページ番号を指定します。PDF が 1 つだけの場合も、ZIP 内に入れてダウンロードします。"
        ],
        [
          "目標ファイルサイズごとに分割できますか？",
          "いいえ。MiB 単位のサイズではなくページ範囲で分割します。サイズは画像や PDF の共有リソースにも左右されます。"
        ],
        [
          "指定しなかったページはどうなりますか？",
          "ダウンロードするファイルには含まれません。原本にはすべてのページが残ります。"
        ],
        [
          "しおりやフォームは保持されますか？",
          "保持を前提にしないでください。ページ抽出で文書全体の機能が変わる場合があります。必要なしおり・リンク・フォーム欄を各ファイルで確認してください。"
        ]
      ]
    },
    "rotate": {
      "examples": [
        [
          "正しい向きのページに 90° を指定",
          "時計回りに 4 分の 1 回転します。"
        ],
        [
          "正しい向きのページに 270° を指定",
          "反時計回りの 90° と同じです。"
        ],
        [
          "正しい向きのページに 180° を指定",
          "上下が逆になります。"
        ],
        [
          "すでに 90° 回転しているページに 270° を追加",
          "合計 360° となり、結果の角度は 0° です。"
        ]
      ],
      "scope": [
        "範囲が空欄なら全ページを回転します。1-3,5 のように指定すると、該当する物理ページだけを回転します。",
        "指定角度は各ページに保存されている回転角度に加算されます。範囲外のページの向きと順序は変わりません。",
        "結果は回転を保存した新しい PDF です。ビューアーでの一時的な表示変更ではありません。OCR は行わず、スキャン文字を選択可能にする機能もありません。"
      ],
      "checks": [
        "rotated.pdf をダウンロードし、原本ではなくこの新しいファイルを開きます。",
        "範囲内と範囲外のページをそれぞれ確認します。元の向きが混在していれば、結果の向きも混在する場合があります。",
        "ダウンロードしたファイルを閉じて開き直し、向きが保存されていることを確認します。"
      ],
      "trouble": [
        [
          "逆方向に回った",
          "90° は時計回り、270° は反時計回りの 90° です。別の角度を選んで作り直してください。"
        ],
        [
          "違うページが回転した",
          "範囲は表紙を含む物理的な 1 ページ目から数えます。空欄の場合は全ページが対象です。 半角ハイフン - と半角コンマ , で 1-3,5 のように指定してください。全角コンマや読点（、）は使えません。"
        ],
        [
          "PDF を開けない",
          "破損・暗号化された PDF は非対応です。所有者から正常に開ける未暗号化コピーを入手してください。このツールは修復や解除を行いません。"
        ]
      ],
      "faqs": [
        [
          "ページごとに必要な角度が違う場合は？",
          "1 回の処理で選択ページに 1 つの角度を適用します。結果をダウンロードして選び直し、別のページ群に次の回転を適用できます。"
        ],
        [
          "傾いたスキャンの補正や向きの自動検出はできますか？",
          "いいえ。向きの自動検出、小角度の傾き補正、鏡像化、OCR は行いません。固定の 4 分の 1 回転単位のみです。"
        ],
        [
          "設定を変えたらダウンロードが消えたのはなぜですか？",
          "角度や範囲を変えると古い結果は現在の設定と一致しなくなります。「ファイルを作成」を再度押してください。"
        ],
        [
          "回転を元に戻せますか？",
          "原本を保管しておけば最初からやり直せます。ダウンロード版に逆方向の回転を加えることもできますが、処理で変わった他の文書機能までは戻りません。"
        ]
      ]
    }
  },
  "de": {
    "labels": {
      "examples": "Wie sieht das Ergebnis aus?",
      "input": "Ihre Eingabe",
      "output": "Heruntergeladenes Ergebnis",
      "scope": "Was dieses Werkzeug ändert",
      "checks": "Die heruntergeladene PDF prüfen",
      "handling": "Dateien, Grenzen und Abbrechen",
      "trouble": "Wenn das Ergebnis nicht passt",
      "faq": "Häufige Fragen",
      "related": "Mit dem Dokument weiterarbeiten",
      "jump": "Auf dieser Seite",
      "ocrGuide": "OCR-Leitfaden für gescannte PDFs",
      "scannedTool": "Gescannte PDF in Markdown umwandeln"
    },
    "handling": [
      "Für diese Werkzeuge sind weder Registrierung noch Bezahlung erforderlich. Die PDF-Verarbeitung erfolgt im Browser ohne Datei-Upload. Das Ergebnis ist ein neuer Download; die ausgewählten Originale werden nicht überschrieben.",
      "Die Werkzeuge fügen keine Wasserzeichen hinzu. Bereits auf den Originalseiten vorhandene Wasserzeichen bleiben im Ergebnis erhalten.",
      "Beschädigte und verschlüsselte PDFs werden nicht unterstützt. Auch wenn Ihr Betrachter kein Passwort verlangt, kann eine verschlüsselte Datei abgelehnt werden. Hier gibt es keinen Schritt zum Entsperren oder zur Passworteingabe.",
      "Die Eingabe ist auf 20 MiB je PDF, insgesamt 50 MiB, 50 Dateien und 500 Seiten begrenzt. Komplexe Dokumente können trotzdem den verfügbaren Gerätespeicher überschreiten. Wählen Sie dann weniger Dateien oder beschaffen Sie eine kleinere Quelldatei. Ein zu großes Original lässt sich nicht zuerst laden und anschließend bearbeiten.",
      "Abbrechen stoppt den Vorgang und behält die Dateiauswahl. Neuladen, Schließen oder das Folgen eines Links löscht Auswahl und Einstellungen. Bewahren Sie die Originale auf, um sie erneut auswählen zu können."
    ],
    "merge": {
      "examples": [
        [
          "A.pdf (2 Seiten), danach B.pdf (3 Seiten)",
          "Eine PDF mit 5 Seiten: A1, A2, B1, B2, B3."
        ],
        [
          "B.pdf vor A.pdf verschieben",
          "Reihenfolge: B1, B2, B3, A1, A2."
        ],
        [
          "Eine A4-PDF im Hochformat und eine im Querformat",
          "Unterschiedliche Seitengrößen und Ausrichtungen können erhalten bleiben."
        ]
      ],
      "scope": [
        "Die Pfeile verschieben ganze Dateien. Innerhalb jeder Eingabe bleibt die Seitenreihenfolge erhalten; einzelne Seiten lassen sich hier nicht umsortieren.",
        "Zusammenführen vereinheitlicht weder Papiergröße noch Ausrichtung. Nutzen Sie bei Bedarf PDF drehen für einzelne Seiten.",
        "Scans bleiben Scans. Es erfolgt keine OCR, Entfernung leerer Seiten oder Größenoptimierung."
      ],
      "checks": [
        "Öffnen Sie merged.pdf und vergleichen Sie die Seitenzahl mit der Summe der Eingaben.",
        "Prüfen Sie die Übergänge zwischen Dokumenten, insbesondere Deckblätter, Anhänge und anders ausgerichtete Seiten.",
        "Testen Sie wichtige Links und Formularfelder. Bewahren Sie signierte Originale separat auf."
      ],
      "trouble": [
        [
          "„Datei erstellen“ ist deaktiviert",
          "Wählen Sie mindestens zwei PDFs. Weitere ausgewählte Dateien werden zur Liste hinzugefügt; versehentlich gewählte Dateien können Sie entfernen."
        ],
        [
          "Die Dokumente sind falsch sortiert",
          "Verschieben Sie die Dateien in der sichtbaren Liste und erstellen Sie das Ergebnis erneut. Eine bereits heruntergeladene PDF aktualisiert sich nicht automatisch."
        ],
        [
          "Eine Datei wird abgelehnt",
          "Prüfen Sie, ob die PDF lesbar, unverschlüsselt und innerhalb der Grenzen ist. Beschädigte PDFs lassen sich hier nicht reparieren und passwortgeschützte nicht entsperren."
        ]
      ],
      "faqs": [
        [
          "Kann ich eine einzelne Seite vor eine andere verschieben?",
          "Hier können Sie nur ganze Dateien sortieren, keine einzelnen Seiten innerhalb einer Datei."
        ],
        [
          "Bleibt eine digitale Signatur gültig?",
          "Verlassen Sie sich nicht darauf. Das Zusammenführen erzeugt ein neues Dokument. Bewahren Sie das signierte Original auf und prüfen Sie die Signaturanforderungen vor der Nutzung der Kopie."
        ],
        [
          "Werden Bilder oder Text beim Zusammenführen unscharf?",
          "Das Werkzeug kopiert PDF-Seiten und bietet keine Einstellungen für Bildkompression oder Auflösung. Eine identische Darstellung aller Dokumentmerkmale ist damit nicht garantiert; prüfen Sie kleine Schrift, feine Linien und Bilder in der heruntergeladenen PDF."
        ],
        [
          "Warum ist die neue PDF nicht kleiner?",
          "Dieses Werkzeug führt Dokumente zusammen, komprimiert sie aber nicht. Die Ausgabegröße kann sich ändern und ist nicht garantiert kleiner als die Eingaben."
        ]
      ]
    },
    "split": {
      "examples": [
        [
          "1-3,5",
          "Zwei PDFs in einer ZIP: Seiten 1–3 und Seite 5."
        ],
        [
          "1,2,3",
          "Drei separate einseitige PDFs in einer ZIP."
        ],
        [
          "1-3",
          "Eine dreiseitige PDF, ebenfalls als ZIP verpackt."
        ],
        [
          "5,1-3",
          "Die Teile folgen der Eingabe: zuerst Seite 5, danach Seiten 1–3."
        ]
      ],
      "scope": [
        "Verwenden Sie die tatsächliche Seitenposition ab 1. Das Deckblatt ist Seite 1, auch wenn die gedruckte Nummerierung später beginnt oder römische Zahlen nutzt.",
        "Jeder durch Komma getrennte Bereich wird eine PDF. Die Reihenfolge ist frei, Bereiche dürfen sich aber nicht überschneiden oder Seiten wiederholen.",
        "Nur ausgewählte Seiten erscheinen in der Ausgabe. Das Original wird nicht geändert und verliert keine Seiten.",
        "Auch die erzeugten PDF-Daten sind vor dem ZIP-Verpacken auf insgesamt 50 MiB begrenzt. Beim Kopieren gemeinsamer Ressourcen in mehrere Teile kann selbst eine Quelle unter 20 MiB die Ausgabegrenze überschreiten."
      ],
      "checks": [
        "Entpacken Sie split-pdf.zip, bevor Sie die enthaltenen PDFs öffnen.",
        "Vergleichen Sie die Anzahl der Teile sowie ihre erste und letzte Seite mit den gewünschten tatsächlichen Seitenbereichen.",
        "Prüfen Sie Abbildungen, Links und Formularfelder in den Teilen, die Sie weitergeben möchten."
      ],
      "trouble": [
        [
          "Ein Bereich wird abgelehnt",
          "Verwenden Sie Zahlen, Bindestriche und Kommas, etwa 1-3,5. Keine 0, umgekehrten Bereiche, Wiederholungen oder Nummern über der Seitenzahl."
        ],
        [
          "Das falsche Kapitel wurde extrahiert",
          "Zählen Sie ab der ersten tatsächlichen Seite einschließlich Deckblatt und Vorspann. Verlassen Sie sich nicht nur auf gedruckte Seitenzahlen."
        ],
        [
          "Quelle oder Ergebnis ist zu groß",
          "Ein Original über 20 MiB kann hier nicht zum Teilen geladen werden. Beschaffen Sie eine kleinere Quelle oder wählen Sie weniger Bereiche, wenn die erzeugten Teile 50 MiB überschreiten."
        ]
      ],
      "faqs": [
        [
          "Kann ich nur eine Seite extrahieren?",
          "Ja. Geben Sie ihre tatsächliche Position ein, z. B. 5. Auch eine einzelne erzeugte PDF wird als ZIP heruntergeladen."
        ],
        [
          "Kann ich nach einer Ziel-Dateigröße aufteilen?",
          "Nein. Die Aufteilung erfolgt nach Seitenbereichen, nicht nach einer MiB-Vorgabe. Die Größe hängt auch von Bildern und gemeinsamen PDF-Ressourcen ab."
        ],
        [
          "Was passiert mit ausgelassenen Seiten?",
          "Sie fehlen nur in den heruntergeladenen Teilen. Das Original enthält weiterhin alle Seiten."
        ],
        [
          "Bleiben Lesezeichen und Formulare erhalten?",
          "Verlassen Sie sich nicht darauf. Das Extrahieren kann dokumentweite Funktionen ändern. Prüfen Sie benötigte Lesezeichen, Links und Felder in jedem Teil."
        ]
      ]
    },
    "rotate": {
      "examples": [
        [
          "90° bei einer aufrechten Seite",
          "Eine Vierteldrehung im Uhrzeigersinn."
        ],
        [
          "270° bei einer aufrechten Seite",
          "Entspricht 90° gegen den Uhrzeigersinn."
        ],
        [
          "180° bei einer aufrechten Seite",
          "Die Seite steht danach auf dem Kopf."
        ],
        [
          "Bereits 90° gedrehte Seite, zusätzlich 270°",
          "Zusammen 360°; der Ergebniswinkel beträgt 0°."
        ]
      ],
      "scope": [
        "Ein leerer Seitenbereich dreht alle Seiten. Mit einer Angabe wie 1-3,5 drehen Sie nur diese tatsächlichen Seitenpositionen.",
        "Der gewählte Winkel wird zur gespeicherten Drehung jeder ausgewählten Seite addiert. Nicht ausgewählte Seiten behalten Ausrichtung und Reihenfolge.",
        "Das Ergebnis ist eine neue PDF mit gespeicherter Drehung, keine vorübergehende Drehung im Betrachter. OCR wird nicht ausgeführt; Scantext wird nicht auswählbar."
      ],
      "checks": [
        "Laden Sie rotated.pdf herunter und öffnen Sie diese neue Datei statt des Originals.",
        "Prüfen Sie eine Seite innerhalb und eine außerhalb des Bereichs. Unterschiedliche Ausgangsausrichtungen können auch unterschiedliche Ergebnisse ergeben.",
        "Schließen und öffnen Sie den Download erneut, um die gespeicherte Ausrichtung zu prüfen."
      ],
      "trouble": [
        [
          "Die Seite dreht sich falsch herum",
          "90° ist im Uhrzeigersinn, 270° entspricht 90° gegen den Uhrzeigersinn. Wählen Sie den anderen Winkel und erstellen Sie das Ergebnis erneut."
        ],
        [
          "Die falschen Seiten wurden gedreht",
          "Bereiche zählen ab der tatsächlichen Seite 1 einschließlich Deckblatt. Ein leerer Bereich gilt für alle Seiten."
        ],
        [
          "Die PDF lässt sich nicht öffnen",
          "Beschädigte oder verschlüsselte PDFs werden nicht unterstützt. Fordern Sie beim Eigentümer eine lesbare, unverschlüsselte Kopie an. Reparieren oder Entsperren ist hier nicht möglich."
        ]
      ],
      "faqs": [
        [
          "Was ist bei Seiten mit verschiedenen benötigten Winkeln?",
          "Pro Vorgang wird ein Winkel auf die gewählten Seiten angewendet. Laden Sie das Ergebnis herunter, wählen Sie diese neue PDF und drehen Sie bei Bedarf eine weitere Seitengruppe."
        ],
        [
          "Werden schräge Scans begradigt oder Ausrichtungen erkannt?",
          "Nein. Es gibt keine automatische Richtungserkennung, Korrektur kleiner Schräglagen, Spiegelung oder OCR. Unterstützt werden feste Vierteldrehungen."
        ],
        [
          "Warum verschwindet der Download nach einer Einstellungsänderung?",
          "Nach einer Änderung von Winkel oder Bereich ist das alte Ergebnis veraltet. Klicken Sie erneut auf „Datei erstellen“."
        ],
        [
          "Kann ich eine Drehung rückgängig machen?",
          "Mit dem Original können Sie neu beginnen. Auch eine entgegengesetzte Drehung der heruntergeladenen Kopie ist möglich, stellt aber keine anderen bei der Verarbeitung geänderten Dokumentfunktionen wieder her."
        ]
      ]
    }
  }
};

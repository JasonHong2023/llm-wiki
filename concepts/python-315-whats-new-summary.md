---
title: Python 3.15 新功能摘要
type: concept
created: 2026-11-24T14:55
updated: 2026-11-24T14:55
tags: [Markdown, 中文, English, 技術, programming, Python, 3.15, features, optimization, security, 效能優化, 語言特性]
confidence: high
sources: [raw/articles/python-whatsnew-315.md, raw/articles/python-docs-315-index.md]
---

# Python 3.15 新功能摘要

Python 3.15 是 Python 程式語言的最新穩定版本，結合了語言、實作和標準函式庫的變革。主要亮點包括延遲導入（lazy imports）、frozendict 和 sentinel 內建類型、預設 UTF-8 編碼、推導式中的解包（unpacking in comprehensions），以及適用於自由執行緒建構的穩定 ABI。

## 主要新功能與改進

*   **延遲導入 (Lazy Imports)**: 改善啟動時間，特別是對於大型應用程式。
*   **frozendict 和 sentinel 內建類型**: 提供了新的不可變字典類型和更清晰的哨兵值定義。
*   **預設 UTF-8 編碼**: 將 UTF-8 作為預設文本編碼，提升跨平台一致性。
*   **推導式中的解包 (Unpacking in Comprehensions)**: 允許在列表、集合和字典推導式中進行更靈活的解包操作。
*   **適用於自由執行緒建構的穩定 ABI (Stable ABI for free-threaded builds)**: 為 C/C++ 擴充模組提供更穩定的介面，利於多執行緒環境。
*   **Tachyon 高頻率統計採樣分析器**: 新增的效能分析工具，有助於識別程式碼瓶頸。
*   **PEP 831**: 預設啟用 Frame pointers，提升偵錯和分析能力。
*   **PEP 798**: 推導式中的解包。
*   **PEP 829**: 套件啟動設定檔。
*   **PEP 803**: 自由執行緒建構的穩定 ABI。
*   **PEP 788**: 保護 C API 免受解釋器終止的影響。
*   **錯誤訊息改進**: 提供更清晰、更有幫助的錯誤訊息。

## 其他值得注意的變更

*   **新的 `math.integer` 模組**: 擴充了數學運算功能。
*   **模組改進**: `argparse`, `asyncio`, `dataclasses`, `json`, `os`, `pathlib`, `typing` 等多個標準函式庫模組獲得了改進。
*   **優化**: `base64`, `binascii`, `csv` 等模組以及實驗性 JIT 編譯器都有性能提升。
*   **C API 變更**: 新功能、變更和移除了一些 C API。

更多詳細資訊請參閱 [[python-whatsnew-315]] 原始文件和 [[python-docs-315-index]]。

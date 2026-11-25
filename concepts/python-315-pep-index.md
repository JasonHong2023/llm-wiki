---
title: Python 3.15 PEP 索引
type: concept
created: 2026-11-24T14:55
updated: 2026-11-24T14:55
tags: [Markdown, 中文, English, 技術, programming, Python, 3.15, PEP, 語言特性, 型別系統, C API]
confidence: high
sources: [raw/articles/python-whatsnew-315.md]
---

# Python 3.15 PEP 索引

Python 3.15 於 2026 年 10 月 9 日釋出（stable 版本為 3.15.2）。本頁索引該版本引入或實作的主要 PEP，作為交叉連結的中心節點。完整規格與設計理由請見各 PEP 原文（PEP 一旦實作完成通常不再更新，因此最終行為以官方文件為準）。

## 語言與解譯器改進

| PEP | 標題 | 對應頁面 |
|---|---|---|
| [PEP 661](https://peps.python.org/pep-0661/) | Add sentinel built-in type | [[python-sentinel]] |
| [PEP 686](https://peps.python.org/pep-0686/) | Python now uses UTF-8 as the default encoding | — |
| [PEP 798](https://peps.python.org/pep-0798/) | Unpacking in comprehensions | — |
| [PEP 810](https://peps.python.org/pep-0810/) | Explicit lazy imports for faster startup times | [[python-lazy-imports]] |
| [PEP 814](https://peps.python.org/pep-0814/) | Add frozendict built-in type | [[python-frozendict]] |
| [PEP 829](https://peps.python.org/pep-0829/) | Package startup configuration files | — |

此外，實驗性 JIT 編譯器有顯著升級，錯誤訊息也獲得改進。

## 標準函式庫改進

| PEP | 標題 | 對應頁面 |
|---|---|---|
| [PEP 799](https://peps.python.org/pep-0799/) | A dedicated profiling package for organizing Python profiling tools | [[python-tachyon-profiler]] |
| [PEP 799](https://peps.python.org/pep-0799/) | Tachyon: High-frequency statistical sampling profiler | [[python-tachyon-profiler]] |

另有命令列輸出增加更多顏色、`math.integer` 新模組，以及多達 60 餘個標準函式庫模組的改進。

## 新型別系統功能

| PEP | 標題 |
|---|---|
| [PEP 728](https://peps.python.org/pep-0728/) | TypedDict with typed extra items |
| [PEP 747](https://peps.python.org/pep-0747/) | Annotating type forms with TypeForm |
| [PEP 800](https://peps.python.org/pep-0800/) | Disjoint bases in the type system |

## C API 改進

| PEP | 標題 |
|---|---|
| [PEP 782](https://peps.python.org/pep-0782/) | A new PyBytesWriter C API to create a Python bytes object |
| [PEP 788](https://peps.python.org/pep-0788/) | Protection against finalization in the C API |
| [PEP 793](https://peps.python.org/pep-0793/) | Stable ABI for free-threaded builds and related C API |
| [PEP 803](https://peps.python.org/pep-0803/) | Stable ABI for free-threaded builds |
| [PEP 820](https://peps.python.org/pep-0820/) | PySlot – Unified slot system for the C API |

## 建置改進

| PEP | 標題 |
|---|---|
| [PEP 831](https://peps.python.org/pep-0831/) | Frame pointers are enabled by default for improved system-level observability |

## 發行變更

*   官方 Windows 64 位元二進位檔現在使用尾呼叫解譯器（tail-calling interpreter）。
*   官方 macOS 二進位檔預設安裝自由執行緒（free-threading）支援。

## 相關頁面

*   [[python-315-whats-new-summary]] — Python 3.15 新功能整體摘要
*   [[python-whatsnew-315]] — 原始文件（What's new in Python 3.15）
*   [[python-docs-315-index]] — 官方文件首頁

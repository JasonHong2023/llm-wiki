---
title: Python Tachyon 採樣分析器
type: concept
created: 2026-11-24T14:55
updated: 2026-11-24T14:55
tags: [Markdown, 中文, English, 技術, programming, Python, 3.15, profiling, 效能優化, 除錯, 效能分析]
confidence: high
sources: [raw/articles/python-whatsnew-315.md]
---

# Python Tachyon 採樣分析器 PEP 799（詳見 [[python-315-pep-index]]）

Python 3.15 新增了統計採樣分析器 **Tachyon**，位於 `profiling.sampling` 模組。它能對執行中的 Python 程序進行低負載的效能分析，**不需要修改程式碼，也不需要重新啟動程序**。

## profiling 套件

PEP 799 新增了 `profiling` 模組，將 Python 內建的效能分析工具整合到單一命名空間下：

*   `profiling.tracing` — 確定性函式呼叫追蹤分析器（由 `cProfile` 搬移而來）
*   `profiling.sampling` — 統計採樣分析器，即 Tachyon

`cProfile` 模組保留作為向後相容的別名；`profile` 模組（純 Python 分析器）已被棄用，將於 Python 3.17 移除。

## Tachyon 的運作原理

與對每個函式呼叫都插入探針的確定性分析器（如 `profiling.tracing`）不同，採樣分析器會**定期擷取執行中程序的堆疊軌跡**。這種做法提供近乎零的負載，同時可達到**每秒 1,000,000 Hz** 的採樣率 — 依貢獻當時的狀態，是最快的 Python 採樣分析器。

Tachyon 的設計承襲 Austin、py-spy、Pyflame 與 rbspy 等外部採樣分析器的工作成果。

## 關鍵特性

*   **零負載分析**：可直接附加到任何執行中的 Python 程序而不影響其效能。適合在無法重啟或放慢應用程式的正式環境中除錯效能問題。
*   **無需修改程式碼**：直接以 PID 指向執行中的程序即可開始收集資料。
*   **靈活的目標模式**：
    *   以 PID 附加到執行中的程序（`attach`）
    *   其他模式包含啟動新程序進行分析等
*   **正式環境適用**：傳統分析方式在正式環境中過於侵入性，Tachyon 解決了這個問題。

## 相關頁面

*   [[python-315-pep-index]] — Python 3.15 PEP 索引
*   [[python-315-whats-new-summary]] — Python 3.15 新功能摘要
*   [[python-lazy-imports]] — 同屬 3.15 的效能相關改進

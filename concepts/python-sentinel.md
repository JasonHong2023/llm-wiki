---
title: Python sentinel 內建型別
type: concept
created: 2026-11-24T14:55
updated: 2026-11-24T14:55
tags: [Markdown, 中文, English, 技術, programming, Python, 3.15, features, 語言特性, builtins, 型別標註]
confidence: high
sources: [raw/articles/python-whatsnew-315.md]
---

# Python sentinel 內建型別 PEP 661（詳見 [[python-315-pep-index]]）

Python 3.15 在 `builtins` 模組中新增了 `sentinel` 型別，用於建立具有簡潔表示的唯一哨兵值（unique sentinel values）。

## 關鍵特性

*   **唯一性**：每個 `sentinel` 物件都是獨特的，可用於表示「沒有傳入值」或「特定缺失狀態」等情境，取代傳統上使用 `None` 或自訂物件的做法。
*   **保留身份（identity）**：在複製（copy）過程中保留身份，不會因複製而產生新的不同物件，因此 `is` 比較仍然可靠。
*   **簡潔表示**：具有簡潔的字串表示，便於在日誌與錯誤訊息中辨識。
*   **支援型別表達式中的 `|` 運算子**：可用於型別表達式中組合型別，與現代型別語法整合。
*   **可 pickle**：當 sentinel 可透過模組與名稱被匯入時，可被序列化（pickle）。

## 典型用途

`object()` 長期以來被用來建立哨兵值，但它的表示不具可讀性（例如 `<object object at 0x...>`），且語意不明。`sentinel` 型別提供了標準化的替代方案，讓「缺省值」與「使用者明確傳入的 None」能清楚區分。

## 相關頁面

*   [[python-315-pep-index]] — Python 3.15 PEP 索引
*   [[python-315-whats-new-summary]] — Python 3.15 新功能摘要
*   [[python-frozendict]] — 同為 3.15 新增的內建型別

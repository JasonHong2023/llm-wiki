---
title: Python 延遲導入 (Lazy Imports)
type: concept
created: 2026-11-24T14:55
updated: 2026-11-24T14:55
tags: [Markdown, 中文, English, 技術, programming, Python, 3.15, features, 效能優化, 語言特性, 啟動效能]
confidence: high
sources: [raw/articles/python-whatsnew-315.md]
---

# Python 延遲導入 (Lazy Imports) PEP 810（詳見 [[python-315-pep-index]]）

Python 3.15 引入了顯式延遲導入 (Explicit lazy imports)，透過新的 `lazy` 軟關鍵字，旨在解決大型 Python 應用程式啟動時間緩慢的問題。過去，開發者常透過將導入語句移至函式內部或使用 `importlib` 實現按需加載來解決此問題，但這些方法會增加程式碼的複雜性和維護難度。

## 機制與優點

當使用 `lazy import module_name` 語句時，Python 不會立即加載模組。相反，它會創建一個輕量級的代理物件。實際的模組加載會延遲到第一次使用該導入的名稱時才發生。這使得開發者可以在檔案頂部聲明所有導入，同時只為實際使用的模組支付加載成本，從而減少啟動延遲。

**範例:**

```python
lazy import json
lazy from pathlib import Path

print("Starting up...")  # json 和 pathlib 尚未完全導入

data = json.loads('{"key": "value"}')  # json 在此處完全導入
p = Path(".")  # pathlib 在此處完全導入
```

若延遲導入的模組加載失敗，異常會在第一次使用該名稱時拋出，而不是在導入時。追溯資訊將同時包含名稱被訪問的位置和原始導入語句，便於診斷和調試。

## 全局控制與過濾器

*   **命令列選項/環境變數**: 可以透過 [`-X lazy_imports`](../using/cmdline.html#cmdoption-X) 命令列選項或 [`PYTHON_LAZY_IMPORTS`](../using/cmdline.html#envvar-PYTHON_LAZY_IMPORTS) 環境變數來啟用全局延遲加載。它們接受 `all`（所有導入預設為延遲）和 `normal`（預設，尊重 `lazy` 關鍵字）。
*   **運行時控制**: `sys.set_lazy_imports()` 和 `sys.get_lazy_imports()` 函式允許在運行時更改和查詢此模式。
*   **過濾器**: `sys.set_lazy_imports_filter()` 接受一個可調用對象，用於判斷特定模組是否應延遲加載。這允許開發者實現更精細的控制，例如只對自己的應用程式模組啟用延遲加載，而第三方依賴則保持即時加載。

**過濾器範例:**

```python
import sys

def myapp_filter(importing, imported, fromlist):
    return imported.startswith("myapp.")
sys.set_lazy_imports_filter(myapp_filter)
sys.set_lazy_imports("all")

import myapp.slow_module  # 延遲加載 (匹配過濾器)
import json               # 即時加載 (不匹配過濾器)
```

代理類型本身可作為 [`types.LazyImportType`](../library/types.html#types.LazyImportType) 供程式碼偵測延遲導入。

## 限制與替代方案

*   **範圍限制**: `lazy` 關鍵字僅允許在模組範圍內使用；在函式、類別主體或 `try`/`except`/`finally` 區塊中使用會引發 `SyntaxError`。
*   **不支援星號導入和未來導入**: `lazy from module import *` 和 `lazy from __future__ import ...` 都會引發 `SyntaxError`。
*   **`__lazy_modules__`**: 對於無法直接使用 `lazy` 關鍵字的程式碼（例如，為了兼容舊版 Python），模組可以定義 `__lazy_modules__` 作為包含完全限定模組名稱字串的容器。對於這些模組的常規 `import` 語句將被視為延遲導入，具有與 `lazy` 關鍵字相同的語義。

**`__lazy_modules__` 範例:**

```python
__lazy_modules__ = ["json", "pathlib"]

import json     # 延遲加載
import os       # 仍然即時加載
```

更多詳細資訊請參閱 PEP 810（詳見 [[python-315-pep-index]]）。

## 相關頁面

*   [[python-315-pep-index]] — Python 3.15 PEP 索引
*   [[python-315-whats-new-summary]] — Python 3.15 新功能摘要
*   [[python-tachyon-profiler]] — 同屬 3.15 的效能分析工具

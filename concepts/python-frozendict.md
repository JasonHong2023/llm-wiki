---
title: Python frozendict 內建型別
type: concept
created: 2026-11-24T14:55
updated: 2026-11-24T14:55
tags: [Markdown, 中文, English, 技術, programming, Python, 3.15, features, 語言特性, builtins, 資料型別, 不可變型別]
confidence: high
sources: [raw/articles/python-whatsnew-315.md]
---

# Python frozendict 內建型別 PEP 814（詳見 [[python-315-pep-index]]）

Python 3.15 在 `builtins` 模組中新增了不可變的 `frozendict` 型別。它在建立後不允許修改。

## 關鍵特性

*   **不是 `dict` 的子類別**：`frozendict` 直接繼承自 `object`，而非 `dict`。這代表 `isinstance(x, dict)` 對 `frozendict` 會回傳 `False`。
*   **可雜湊（hashable）**：只要其所有的鍵與值皆為可雜湊，`frozendict` 本身即為可雜湊，可安全用作字典的鍵或放入 `set`。
*   **保留插入順序**：與 `dict` 相同，`frozendict` 保留插入順序。
*   **比較不考慮順序**：`frozendict(y=2, x=1) == frozendict(x=1, y=2)` 為 `True`，雜湊值也相同。

**範例:**

```python
>>> a = frozendict(x=1, y=2)
>>> a
frozendict({'x': 1, 'y': 2})
>>> a['z'] = 3
Traceback (most recent call last):
  File "<python-input-2>", line 1, in <module>
    a['z'] = 3
    ~^^^^^
TypeError: 'frozendict' object does not support item assignment
>>> b = frozendict(y=2, x=1)
>>> hash(a) == hash(b)
True
>>> a == b
True
```

## 標準函式庫支援

以下模組已更新以接受 `frozendict`：

*   `copy` — 淺複製與深複製
*   `decimal` — 十進位算術實作
*   `json` — JSON 編碼與解碼
*   `marshal` — Python 物件與位元組串流互轉
*   `plistlib` — 解析 Apple plist 檔案（僅序列化支援）
*   `pickle` — Python 物件序列化
*   `pprint` — 資料美化列印
*   `xml.etree.ElementTree` — ElementTree API

此外，`eval()` 與 `exec()` 接受 `frozendict` 作為 `_globals_`，`type()` 與 `str.maketrans()` 接受 `frozendict` 作為 `dict` 參數。

## 既有程式碼的相容性

檢查 `dict` 型別的程式碼可改為 `isinstance(arg, (dict, frozendict))` 以同時接受兩者；若希望一併接受 `MappingProxyType` 等其他 mapping 型別，則可改用 `isinstance(arg, collections.abc.Mapping)`。

## 相關頁面

*   [[python-315-pep-index]] — Python 3.15 PEP 索引
*   [[python-315-whats-new-summary]] — Python 3.15 新功能摘要
*   [[python-sentinel]] — 同為 3.15 新增的內建型別

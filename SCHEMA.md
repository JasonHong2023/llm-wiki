# Wiki Schema

## Domain
綜合知識庫，涵蓋程式語言技術、專案管理、AI 應用、金融投資、個人成長、命理學、中國古籍等跨領域知識。

## Conventions
- 檔案名稱：小寫，使用連字號，無空格（例如 `python-asyncio-overview.md`）
- 每個 Wiki 頁面都以 YAML Frontmatter 開頭（見下文）
- 使用 `[[wikilinks]]` 連結頁面之間（每個頁面至少 2 個出站連結）
- 更新頁面時，務必更新 `updated` 日期
- 每個新頁面必須添加到 `index.md` 的正確區段中
- 每個操作都必須附加到 `log.md`
- **出處標記：** 在綜合 3 個以上來源的頁面上，在聲明來自特定來源的段落末尾添加 `^[raw/articles/source-file.md]`。這讓讀者可以追溯每個聲明而無需重讀整個原始檔案。對於單一來源的頁面，如果 `sources:` Frontmatter 足夠，則為可選。

## Frontmatter
  ```yaml
  ---
  title: Page Title
  created: YYYY-MM-DDTHH:MM
  updated: YYYY-MM-DDTHH:MM
  type: entity | concept | comparison | query | summary | framework | research | business | general
  tags: [from taxonomy below]
  sources: [raw/articles/source-name.md]
  # 可選的品質信號：
  confidence: high | medium | low        # 聲明的支持程度
  contested: true                        # 頁面存在未解決的矛盾時設定
  contradictions: [other-page-slug]      # 此頁面與之衝突的頁面
  ---
  ```

`confidence` 和 `contested` 是可選的，但對於意見較多或快速變化的主題建議使用。Lint 會將 `contested: true` 和 `confidence: low` 的頁面標記出來供審查，以防止弱聲明悄然成為 Wiki 公認的事實。

### raw/ Frontmatter

原始來源也會有一個小的 Frontmatter 區塊，以便重新整合時可以檢測漂移：

```yaml
---
source_url: https://example.com/article   # 原始 URL，如果適用
ingested: YYYY-MM-DD
sha256: <hex digest of the raw content below the frontmatter>
---
```

`sha256:` 允許未來重新整合相同的 URL 時，如果內容未更改則跳過處理，如果內容已更改則標記漂移並更新。僅計算正文（結束 `---` 後的所有內容），不包括 Frontmatter 本身。

## Tag Taxonomy
根據既有 Wiki 的使用頻率，列出常用的標籤。

範例標籤（此處僅列出部分高頻標籤，詳細請參考 `tags.yaml`）：
- Markdown, 中文, English, 技術, programming, development
- 專案管理, 領導力, 會議管理, 團隊協作, 時間管理
- 知識圖譜, AI, LLM Wiki, 個人知識庫, 知識工程
- Python, 3.15, features, optimization, security, 效能優化, 語言特性, 啟動效能, builtins, 資料型別, 不可變型別, 型別標註, profiling, 除錯, 效能分析
- 研究, analysis, business, strategy, 商業管理
- 中國命理, 占星術, 命理學, 古籍
- web, API, REST, JavaScript, TypeScript
- Docker, 資料庫, database, scripting

規則：頁面上的每個標籤都必須出現在此分類法中。如果需要新標籤，請先在此處添加，然後再使用。這可以防止標籤蔓延。

## Page Thresholds
- **建立頁面**：當實體/概念出現在 2 個以上來源中，或者是一個來源的核心內容時
- **新增至現有頁面**：當來源提及已涵蓋的內容時
- **不要建立頁面**：對於附帶提及、次要細節或領域之外的內容
- **拆分頁面**：當頁面超過約 200 行時，將其拆分為子主題並帶有交叉連結
- **歸檔頁面**：當其內容被完全取代時，移至 `_archive/`，從索引中移除

## Entity Pages
每個值得注意的實體一個頁面。包括：
- 概述/是什麼
- 主要事實和日期
- 與其他實體的關係（`[[wikilinks]]`）
- 來源參考

## Concept Pages
每個概念或主題一個頁面。包括：
- 定義/解釋
- 當前知識狀態
- 開放問題或爭論
- 相關概念（`[[wikilinks]]`）

## Comparison Pages
並排分析。包括：
- 比較內容和原因
- 比較維度（偏好表格格式）
- 結論或綜合
- 來源

## Update Policy
當新資訊與現有內容衝突時：
1. 檢查日期 — 較新的來源通常取代舊的來源
2. 如果確實存在矛盾，請註明兩個立場的日期和來源
3. 在 Frontmatter 中標記矛盾：`contradictions: [page-name]`
4. 在 Lint 報告中標記以供使用者審查

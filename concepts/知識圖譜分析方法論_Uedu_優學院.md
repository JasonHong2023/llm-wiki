---
title: 知識圖譜分析方法論 - Uedu 優學院
type: framework
created: 2026-06-29T15:28
updated: 2026-07-02T17:10
tags: [Markdown, 中文, English, 技術, programming, development, API, REST, 知識圖譜, 知識萃取, 大型語言模型, 知識掌握度分析, 學生對話分析, 課程知識結構]
confidence: high
---

# 知識圖譜分析方法論 - Uedu 優學院

說明 Uedu 平台如何從教師上傳的教材中萃取知識概念與關聯，並透過學生對話分析知識掌握度的演進。

Uedu 的知識圖譜（Knowledge Graph）模組從兩個面向建構知識結構：

此系統讓教師能可視化課程知識結構，並觀察每位學生在各概念上的學習進展。

知識萃取的輸入是 RAG 系統已處理完成的教材 chunks。每個 chunk 已經過分塊（800 tokens / 塊）與向量化。

系統使用 `gpt-4o-mini` 模型，以結構化 Prompt 從教材 chunks 中萃取知識概念與關聯：

資料庫對 `(classroom_id, name)` 設有唯一索引。當不同 chunks 萃取出相同概念名稱時，系統僅保留一筆，並將多個來源 chunk IDs 合併追蹤。

| 欄位 | 說明 | 範例 | 
|---|---|---|
| `name` | 概念名稱（中文，2-8 字） | 遞迴、光合作用 | 
| `name_en` | 英文名稱（跨語言對照） | Recursion, Photosynthesis | 
| `category` | 分類群組 | 基礎語法、資料結構 | 
| `description` | 一句話描述 | 函數在定義中呼叫自身的程式設計技巧 | 
| `source_chunk_ids` | 來源 RAG chunk IDs | [42, 43, 51] | 

系統定義四種概念間的關聯類型：

| 類型 | 語意 | 範例 | 
|---|---|---|
| `prerequisite` | A 是 B 的先備知識（學 B 之前需先學 A） | 「變數」→「迴圈」 | 
| `contains` | A 包含 B 作為子概念 | 「資料結構」→「陣列」 | 
| `related` | A 和 B 相關但無因果 / 包含關係 | 「堆疊」↔「佇列」 | 
| `applies_to` | A 可以應用到 B 的情境 | 「遞迴」→「樹走訪」 | 

每條關聯邊包含 `weight`（強度 0.0-1.0）和 `evidence`（LLM 的判斷依據）。關聯數量不超過概念數量的 3 倍。

與 Bloom's 分析類似，學生送出訊息後，系統在背景 thread 中自動進行知識掌握度分析。分析時會參考：

LLM 對學生在對話中涉及的每個概念判定掌握程度，共五個等級：

| 等級 | 定義 | 判斷依據 | 
|---|---|---|
| mentioned | 學生僅提及該概念 | 無法判斷是否理解 | 
| exploring | 學生正在探索 | 提出基礎問題 | 
| understanding | 學生能正確解釋概念 | 用語準確、邏輯清晰 | 
| applying | 學生能在新情境中使用 | 嘗試將概念應用到問題 | 
| mastered | 學生能整合、評價或創造性使用 | 跨概念整合、提出改進 | 

每筆標記包含：

`concept_name`：涉及的概念名稱`mastery_level`：五個等級之一`confidence`：LLM 的判斷信心度（0.0-1.0）`evidence`：判斷依據的簡短說明若學生的訊息不涉及任何已知概念（如閒聊），則回傳空陣列，不產生標記。

系統定期將學生的知識掌握度標記聚合為**每週快照**，儲存於 `kg_student_snapshot` 資料表。每筆快照包含：

`mastery_score`：綜合掌握分數（0.0-1.0），基於該週的標記加權計算`interaction_count`：該週與此概念的互動次數`bloom_level_avg`：相關對話的平均 Bloom's 認知層次（整合 Bloom's 分析的數據）教師可透過儀表板檢視學生知識掌握度的時間軌跡，觀察哪些概念在學期中逐漸掌握、哪些仍停留在探索階段。

知識圖譜與 RAG 系統緊密整合：

`source_chunk_ids`，可追溯到原始教材片段當教師開啟 GraphRAG 模式時，學生提問的檢索流程會額外利用知識圖譜：

詳細說明見 RAG 方法論第 6 節。

| API 端點 | 說明 | 
|---|---|
| `GET /api/kg/classroom/{id}/graph` | 課程完整知識圖譜（nodes + edges） | 
| `GET /api/kg/classroom/{id}/concepts` | 概念清單（含分類統計） | 
| `POST /api/kg/classroom/{id}/generate` | 從教材生成 / 重新生成知識圖譜 | 
| `GET /api/kg/classroom/{id}/students` | 全班各概念的掌握概覽 | 
| `PUT /api/kg/concepts/{id}` | 教師手動編輯概念名稱 / 分類 | 
| `DELETE /api/kg/concepts/{id}` | 軟刪除不適當的概念 | 

教師可在萃取後手動編輯或刪除不適當的概念，確保知識圖譜的品質。

課程知識結構透過 Uedu 平台的知識圖譜模組自動建構。系統使用大型語言模型（LLM; OpenAI gpt-4o-mini, prompt v1.0）從教師上傳的教材（經 RAG pipeline 分塊處理）中萃取知識概念及概念間的關聯（prerequisite、contains、related、applies_to 四種類型）。學生與 AI 助教的對話則由同一 LLM 比對課程概念清單，判定學生對各概念的掌握程度（mentioned → exploring → understanding → applying → mastered 五個等級），並附帶信心度分數。掌握度標記每週聚合為快照，供時間序列分析。詳細方法論說明見 https://uedu.tw/doc/knowledge-graph。

建議同時提供以下資訊：

## Related Pages

- [[中華電信研究院｜科技新知]]

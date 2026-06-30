---
title: Karpathy LLM Wiki 知識系統實踐：基礎安裝與建置篇 | Kenmingの鮮思維
type: framework
created: 2026-06-30T18:57
updated: 2026-06-30T18:57
tags: [Markdown, 中文, English, 技術, programming, development]
confidence: high
---

# Karpathy LLM Wiki 知識系統實踐：基礎安裝與建置篇 | Kenmingの鮮思維

**[實作資源]** 本文所述之 `llm-wiki` 完整目錄結構、`AGENTS.md` 操作規範與相關模板已封裝為壓縮檔。讀者可逕行下載，作為建置環境之參考：https://reurl.cc/M2zlAW

## 前言

在上一篇文章〈Karpathy LLM Wiki 知識系統實踐：解析核心理念〉中，我整理了 Karpathy 所提出的 LLM Wiki 方法論，其核心並不在於使用某個特定工具，而是建立一套可以持續演化的知識處理流程：

- 原始資料放在 `raw/`
- LLM 將資料整理為 `wiki/`
- 透過 `AGENTS.md`或`CLAUDE.md`定義操作規範
- 每次新增資料時，不只是產生摘要，而是整合進既有知識結構

這篇接續上一篇，聚焦在「基礎建置」：如何用最少工具，先建立一個可運作的 Karpathy LLM Wiki。

這裡的目標不是一次就打造完整系統，也不是導入複雜 RAG、向量資料庫或自動化 pipeline，而是先建立一個最小可行流程（Minimum Viable Workflow）：

能收集資料、能讓 LLM ingest、能產出 wiki、能持續查詢與維護。


## 準備工具

基礎設置只需要三類工具。

### 1. Obsidian

Obsidian 是本地 Markdown 筆記工具，在這套方法中扮演 Wiki 的載體。

Karpathy 對它有一個很直覺的比喻：

- Obsidian 是 IDE
- LLM 是 programmer
- Wiki 是 codebase

也就是說，我們不是把 Obsidian 當成一般筆記軟體，而是把整個 Vault 視為一個由 LLM 維護的知識工程專案。

Obsidian 的好處在於：

- 所有內容都是本地 Markdown 檔案
- 支援 `[[wikilinks]]`雙向鍊結樣式
- 可以用 Graph View 檢視知識圖譜
- 不需要先導入資料庫或雲端服務

### 2. LLM Agent

第二個工具是能操作本地檔案的 LLM Agent，例如：

- OpenAI Codex
- Claude Code
- Gemini
- 使用如 Ollama 建置本地的 LLM
- 其他可讀寫本地 Markdown 檔案的 agent

重點不是模型品牌，而是它必須能做到幾件事：

- 讀取 `raw/`裡的來源
- 在 `wiki/`建立與更新 Markdown
- 維護 `index.md`與`log.md`
- 依照規格檔執行 ingest、query、lint

如果使用 Codex，該行為規範檔名命名為 `AGENTS.md`；而如果使用 Claude Code，則命名為 `CLAUDE.md`。

兩者在概念上扮演同一個角色：告訴 LLM 這個知識庫應如何被維護。

### 3. Obsidian Web Clipper

第三個工具是 Obsidian Web Clipper。

它不是必要條件，但很實用。因為多數研究素材來自網頁文章、Youtube、技術文件、Blog、教學文章等。Web Clipper 可以直接把網頁轉成 Markdown，保存到 Obsidian Vault（可以指定任一 Vault） 中。

在這套流程裡，建議將 Web Clipper 的輸出位置設定為：/raw

如果文章中有圖片，也建議讓附件下載到：raw/assets/

這樣原始資料與附件就會一起保存在本地，避免日後網頁圖片失效，LLM 也可以在需要時檢視圖片內容。

## 創建 LLM Wiki Vaullt 目錄結構

安裝 Obsidian 後，先建立一個新的 Vault，本例命名為：`llm-wiki-demo`。

啟動 Obsidian 並開啟該 Vault，接著需要執行對應的 LLM Agents。Obsidian 可透過安裝 `obsidian-terminal` 插件，在應用程式內直接呼叫 Agent CLI。然而，在 Windows 11 上的使用體驗並不理想，因此本例改採在 Vault 目錄下另開 PowerShell 執行 Codex CLI，並將兩個應用程式並排顯示於同一螢幕，以便同步檢視與操作。

接著無需手動逐一建立目錄與檔案結構。我的作法是只先建立 `\raw` 目錄，並透過 Codex CLI 將 Karpathy 發表於 Gist 的 LLM Wiki 下載至該目錄。同時，也要求 Agent 一併擷取所有留言討論，整理並儲存為單一 Markdown 文件。

然後我在 Agent CLI 聊天框內輸入以下訊息：

根據

`raw/karpathy-llm-wiki-gist.md`的主文內容（僅採用其三層目錄架構，不納入留言討論中的建議），建立本`llm-wiki-demo`的知識庫目錄結構。既有`raw/`內的原始文檔則維持不變。

建議啟用 `/plan` 模式，讓 Agent 在實際建立目錄前，先確認所採用的結構符合主文所建議的設計。以下為最小必要的目錄結構：

```
llm-wiki-demo/        # Obsidian vault 根目錄
├─ AGENTS.md          # LLM Wiki schema 與操作規範
├─ raw/               # 原始來源層，作為 source of truth
├─ templates/         # wiki 頁面與紀錄模板
└─ wiki/              # 由 LLM 維護的知識頁主體
```
最後，Agent 會依據 Karpathy 的 LLM Wiki 主文建立目錄結構，並生成必要的規範檔（`AGENTS.md` 或 `CLAUDE.md`）、索引（`index`）與日誌（`log`）等完整模板，最終呈現在 Obsidian 的檔案目錄窗格中。

## 透過 Web Clipper 設定與擷取網頁內容

Obsidian 官方推出的 Web Clipper 插件功能相當強大！它的主要功能特徵有：

- 一鍵擷取網頁內容並儲存為 Obsidian 筆記；支援擷取 YouTube 影片並將逐字稿一併保存
- 支援頁面文字高亮（Highlight）並一併保存
- 可選擇擷取完整頁面或特定區塊（如文章主體）
- 自動轉換為 Markdown，保留基本結構與格式
- 支援自訂模板與指定儲存位置（Vault／資料夾）

安裝 Obsidian Web Clipper 後，建議設定：

- Vault：選擇你的 LLM Wiki Vault
- Save location：`raw/`
- Attachment folder：`raw/assets/`

這樣每次剪藏網頁時，就會直接進入 raw source 層。

一個基本流程會是：

- 在瀏覽器看到值得研究的文章或影片
- 用 Obsidian Web Clipper 存到 `raw/`
- 若文章有圖片，下載到 `raw/assets/`
- 回到 LLM Agent，要求 ingest 該來源

這裡要注意一點：不要把 Web Clipper 剪下來的文章直接當成整理後的知識。

**它只是 raw source**。

**真正的整理工作，應由 LLM 在  wiki/ 中完成**。

## 第一次 Ingest

當目錄與規格建立完成後，就可以進行第一次 ingest（擷取）。

當 \raw 目錄內有多筆尚未被 ingest 處理過的原始文檔，就可以對 Agent 下達如下的指令：

請 ingest raw/ 內所有尚未 ingest 的來源。


理想情況下，LLM 不應只產生一篇摘要，而是會建立多個頁面，例如：

```
wiki/
├─ sources/
│  └─ karpathy-llm-wiki-gist.md
├─ concepts/
│  ├─ llm-wiki.md
│  ├─ rag.md
│  ├─ persistent-wiki.md
│  ├─ raw-sources.md
│  ├─ wiki-layer.md
│  └─ schema-layer.md
├─ operations/
│  ├─ ingest.md
│  ├─ query.md
│  └─ lint.md
├─ architecture/
│  └─ raw-wiki-schema.md
├─ index.md
└─ log.md
```
這才是 LLM Wiki 的精神：把來源整合進一個可持續維護的知識結構。

## 查詢與回寫

完成第一次 ingest 後，就可以開始用 wiki 提問。

例如：

請根據 wiki，說明 LLM Wiki 與傳統 RAG 的差異。


或：

請比較 raw/wiki/schema 三層架構各自的責任。


在回答時，LLM 應該先讀：

wiki/index.md


再依照索引讀相關頁面。

如果回答產生了有長期價值的整理，例如：

- 一份比較表
- 一個設計取捨分析
- 一個跨來源綜合結論
- 一份未來改進建議

就應該要求 LLM 將它回寫到：

wiki/syntheses/


這就是 query file-back。

它能讓每一次查詢不只是得到答案，也能讓知識庫本身變得更完整。

## 知識圖譜

當 LLM Agent 完成多次 Ingest 並在 `wiki/` 目錄下生成多個具備雙向連結（`[[wikilinks]]`）的 Markdown 文件後，知識庫便從平面的文檔堆疊轉化為具備拓樸結構的知識網路。

透過 Obsidian 的知識圖譜（Graph View），我們可以對系統進行以下實務觀察：

- **語義網路的實體化**：圖譜中的節點代表概念（Concepts）或來源（Sources），連線則是 LLM 根據- `AGENTS.md`規範所識別出的邏輯關聯。這將原本隱含在內文中的知識脈絡，轉化為直觀的架構圖。
- **知識成熟度評估**：密集的節點集群（Clusters）代表該領域已有足夠的交叉參照與資訊深度；相對地，孤立節點（Orphan Nodes）則揭示了知識庫中的斷層，作為後續執行- `lint`或補充- `raw`資料的標靶。
- **驗證 Codebase 結構**：誠如 Karpathy 所述，Wiki 是 Codebase，而圖譜即是該 Codebase 的架構藍圖。透過視覺化，維護者能確認- `index.md`是否正確發揮樞紐節點（Hub）的作用，確保 LLM 在執行查詢時能循序存取相關路徑。

這種展現方式不僅是為了美觀，更是確保知識系統在演化過程中，始終保持結構化的完整性與可導航性。

## 定期 Lint Wiki

當 wiki 開始累積頁面後，需要定期檢查健康狀態。

可以直接要求：

請 lint 這個 wiki，檢查是否有矛盾、過期資訊、孤立頁、缺少 backlinks、重要概念缺頁，並提出修正建議。


Lint 應檢查：

- 是否有頁面互相矛盾
- 是否有舊結論被新來源推翻
- 是否有孤立頁
- 是否有概念被多次提到但沒有獨立頁
- `index.md`是否漏列頁面
- `log.md`是否記錄最近操作

這個步驟很重要。

因為知識庫真正困難的不是新增資料，而是長期維護。

知識庫的持續維護與整理，對於知識工作者是很煩心的工作，而這反而是 LLM 最為專長所在。

## 基礎設置完成後的目錄樣貌

一個完成基礎 ingest 後的 Vault，大致會像這樣：

```
llm-wiki-demo/           # Obsidian Vault 根目錄
├─ raw/                  # 原始來源層；來源真相，不應由 LLM 修改
│  └─ assets/            # raw 來源引用的圖片、附件與本地資產
├─ templates/            # Wiki 頁面模板；供後續 ingest/query/lint 建頁使用
│  ├─ architecture.md    # 架構頁模板
│  ├─ concept.md         # 概念頁模板
│  ├─ operation.md       # 操作流程頁模板
│  ├─ source.md          # 來源摘要頁模板
│  └─ synthesis.md       # 綜合分析頁模板
├─ wiki/                 # LLM 生成與維護的知識庫主體
│  ├─ applications/      # 應用場景頁；如 personal、research、business/team
│  ├─ architecture/      # 架構與資料流頁；如 raw → wiki → schema
│  ├─ concepts/          # 核心概念頁；如 RAG、persistent wiki、schema
│  ├─ operations/        # 操作流程頁；如 ingest、query、lint
│  ├─ sources/           # raw 來源的摘要與 metadata 頁
│  ├─ syntheses/         # 跨來源綜合分析與 query file-back 頁
│  ├─ tools/             # 工具與整合方式；如 Obsidian、qmd、MCP
│  ├─ index.md           # Wiki 內容索引；回答問題前優先讀取
│  ├─ log.md             # 時序操作日誌；記錄 ingest/query/lint/update
│  └─ overview.md        # 知識庫總覽；目前對 LLM Wiki pattern 的整體理解
├─ AGENTS.md             # Schema layer；定義 Codex/LLM 如何維護此 Vault
├─ README.md             # README文件，介紹三層架構與基本工作流
```
這個結構已經足以支撐基礎使用：

- 新資料進 `raw/`
- LLM 維護 `wiki/`
- `AGENTS.md`定義行為
- `index.md`導覽內容
- `log.md`追蹤演化

此時還不需要導入向量資料庫、MCP 或複雜搜尋工具。

先讓流程跑起來，比一開始就把架構做大更重要。

## 一些實務建議

### 1. 一次 ingest 一份來源

初期建議一次只 ingest 一份來源。

這樣比較容易檢查 LLM 的整理結果，也比較容易調整 `AGENTS.md` 的規則。

等流程穩定後，再考慮批次 ingest。

### 2. 不要讓 LLM 修改 raw

這點要反覆強調。

`raw/` 是原始證據，不是工作區。

如果 LLM 整理錯了，可以修 wiki；但如果 raw 被改掉，就失去追溯依據。

### 3. index.md 要保持簡潔

`index.md` 不是全文目錄，也不是所有內容的複製。

它應該是一份導覽：

- 頁面名稱
- 一句話摘要
- 分類
- 必要 metadata

它的用途是讓人與 LLM 都能快速找到入口。

### 4. log.md 要持續追加

`log.md` 不需要寫得很長，但一定要記錄操作。

最重要的是：

- 何時 ingest
- ingest 了什麼
- 建立或更新了哪些頁
- 是否有 query 被回寫
- 是否做過 lint

### 5. 先用 Markdown，再談工具升級

當 wiki 還在早期階段時，不需要急著加搜尋引擎、資料庫或自動化。

等到你真的遇到問題，例如：

- 頁面太多，index 不夠用
- 查詢需要全文搜尋
- 多人或多 agent 同時維護
- 需要更嚴格的 metadata 查詢

再考慮導入 qmd、MCP、Obsidian Bases、Dataview 或 SQLite 等工具。

## 結語

Karpathy LLM Wiki 的基礎設置其實不複雜。

真正重要的是建立正確分工：

- `raw/`保存原始資料
- `wiki/`保存整理後的知識
- `AGENTS.md`或- `CLAUDE.md`定義 LLM 的操作規範
- `index.md`幫助定位
- `log.md`保存演化紀錄

這套方法的價值，不在於一次產生漂亮的筆記，而在於讓知識可以持續累積與維護。

當新資料加入時，LLM 不是重新開始，而是把新資料整合進既有結構。

當你提出問題時，答案也不只是聊天回覆，而可以回寫成新的知識頁。

這就是 LLM Wiki 和傳統文件整理或一次性 RAG 最大的差別。

下一步，等基礎流程穩定後，就可以進一步討論如何導入 skill、搜尋工具與自動化流程，讓這套知識系統更適合長期維運。

## Related Pages

- [[AI大神教你改善工作流，用「LLM Wiki」打造知識複利｜天下雜誌]]
- [[LLM Wiki]]
- [[5個寫會議記錄Meeting minutes貼士（附範例）]]
- [[專案經理 PM 的 AI 實戰指南：PRD、風險分析、會議管理全攻略 | Mason AI Lab]]
- [[整理會議紀錄超痛苦？5招NotebookLM「AI筆記轉化術」，中英夾雜、專有名詞也能精準轉譯]]
- [[會議記錄怎麼做？會議記錄完全指南：從入門到精通的實用技巧與範本]]
- [[天文學家發現宇宙最蓬鬆行星 堪比棉花糖 | 太陽系外天體 | 木星 | 行星演化 | 新唐人电视台]]
- [[AI 會議紀錄 & 文書處理：會議摘要、公文撰寫、SOP 自動化 | Mason AI Lab]]
- [[告別會議筆記困境！【Google NotebookLM 高效會議記錄完全指南】AI協作 + 雅婷逐字稿實戰教學，讓你的筆記精準又省力！]]
- [[「取消 PM」是個餿主意！當實作不再昂貴，PM 該如何練就挑選的品味？|經理人]]
- [[【CC字幕 】【AI 工作流】開會還在手打紀錄？工程師的「零手打」會議系統：iPhone + NotebookLM 實戰（附 SOP）]]
- [[開會總是沒效率？讓主管愛上你的10個高效會議技巧]]
- [[Gemini教學｜AI自動生成會議紀錄，比手寫快100倍的高效筆記法-職場AI培訓 客服中心委外&服務外包-程曦資訊]]
- [[開會的能力決定你職位的高低]]
- [[未來 2 年，一半的PM 將被淘汰？寓意科技執行長：比寫 PRD 更值錢的是「場景想像力」|經理人]]
- [[會議記錄與摘要 - ClaudeWorld]]
- [[展望2025｜AI引領專案 管理者創造職場新高峰 | 專案經理雜誌]]
- [[專案經理人與AI共舞的數位轉型生存指南 | 專案經理雜誌]]
- [[讓領導有節奏！用 Scrum 改變行銷團隊的協作節奏 | 專案經理雜誌]]
- [[如何讓會議開的更有效率？ | 專案經理雜誌]]
- [[一鍵生成會議記錄、週報與追蹤計畫：PM 的超強效率活絡加倍術！ - TechLines 科技線]]
- [[用會議記錄從菜鳥變成局內人｜PM 筆記]]
- [[如何有效率開會]]
- [[如何做會議紀錄？2026 新手也能快速上手的會議記錄完整指南 - 元筆記]]
- [[【會議記錄，不只是紀錄 —重現會議現場的魔法】]]
- [[每天開會開到心累？新手PM必學的高效率會議方法]]
- [[職場筆記、會議記錄、反省日記如何避免寫過就忘？ - 專案管理生活思維]]
- [[PM必學！Google AI NotebookLM保姆級教學：會議紀錄、週報、培訓3大場景全自動化！高手都在用這招！（附完整Prompt）]]
- [[PMP專案管理實務教材（長宏）]]
- [[《超級專案管理》讀後心得：看懂專案三個失敗與成功的關鍵]]
- [[【專案管理書摘】關於利害關係人管理-集體開會，只會讓你的產品走向平庸 - 專案管理生活思維]]
- [[專案管理為什麼？14 個專案新手的常見問題]]
- [[這些10個問題專案管理員需要在開始新的專案之前提問]]
- [[新手專案管理必修課：定義問題與流程技巧完全拆解]]
- [[專案規劃-六大致命問題與解法 - ProjectClub 專案管理輕鬆學 – 職場菁英培育基地]]
- [[第12章_專案溝通管理]]
- [[12 個專案經理面試問題以及如何回答 - Soft & Share]]
- [[天下雜誌出版 - 專案為何這麼難管？破解三大痛點，讓你的專案高效完成，精準達標！]]
- [[專案問題多又多，範疇過大、規格不清怎麼辦？ - 專案管理生活思維]]
- [[專案經理6種常見專案管理文件，專案計畫書、工作時程表、需求規... - 專案人力資源管理學習｜104學習]]
- [[Homebrew (macOS)]]
- [[中醫醫理與道家易經]]
- [[孫子兵法]]
- [[戰國日本]]
- [[戰國日本Ⅱ─敗者的美學]]
- [[諸葛孔明]]
- [[品三國]]
- [[三國史話]]
- [[輝達市值上10兆？ChatGPT預測「這時」達成]]
- [[Zenkit Projects Tips l 六個最常見的專案管理問題]]
- [[專案管理是什麼？一文掌握專案管理五大流程＆高效專案管理工具！]]
- [[什麼是專案管理？其優勢是什麼？ [2025] • Asana]]
- [[Google知識圖譜 - 維基百科，自由的百科全書]]
- [[awesome-knowledge-graph]]
- [[什麼是知識圖譜？AI 能不能進工廠的關鍵 | 製造新觀點]]
- [[【知识图谱】深入浅出讲解知识图谱（技术、构建、应用）]]
- [[知識圖譜（Knowledge Graph）的定義為何？ - OOSGA]]
- [[知識圖譜：讓 AI 理解事物之間的關係]]
- [[知識圖譜概論(下)]]
- [[知識圖譜分析方法論 - Uedu 優學院]]
- [[新手 PM 懶人包｜專案經理（Project Manager）在做什麼？要考證照嗎？7 大 PM 問題幫你解！ - 專案管理生活思維]]
- [[為何需要專案管理？]]
- [[專案管理 - 維基百科，自由的百科全書]]
- [[專案管理｜怎麼規劃管理專案？圖解專案管理５步驟與工具|經理人]]
- [[知識圖譜 (Knowledge Graph, KG)]]
- [[企業知識圖]]
- [[AI知识图谱 GraphRAG 是怎么回事？]]
- [[長文本為什麼容易漏掉中段？GraphRAG、知識圖譜與長文本處理 | iPAS AI 應用規劃師中級 L21103]]
- [[中華電信研究院｜科技新知]]
- [[知識圖譜概論(上)]]
- [[用AI生成器解鎖知識圖譜（Knowledge Graphs），輕鬆搭建知識體系！]]
- [[知識圖譜 - 維基百科，自由的百科全書]]
- [[World Monitor — By the time it's news, you already knew.]]
- [[三小時吃透《易經》：從職場困境到人生破局的底層邏輯全揭秘]]
- [[代码搜索省92% Token？拆解 Headroom 的上下文优化真相]]
- [[零成本无限 Token！Hermes + Qwen3.6，本地最强 Agent 组合来了！附部署教程 | 零度解说]]
- [[🚀 API Mega List]]
- [[Fractal — the recursive language model CLI agent]]
- [[Hermes Agent 新增 /learn 指令：讓任何資料都能變成可重複使用的 AI 技能 - 電腦王阿達]]
- [[MCP Servers]]
- [[精選的 MCP 伺服器 [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)]]
- [[不得不裝的 AI 代理工具｜GitHub 萬星項目｜OPENCODE]]
- [[少子化時代：台灣缺的到底是人口，還是制度升級?]]
- [[「沒錢、沒資源、沒人脈，你要憑什麼贏？｜孫子兵法以少勝多九大心法｜越級打怪的底層邏輯｜孫武、老子、孔子同時告訴你｜孫子說」]]
- [[為什麼PDF還是這麼難用？其實是故意的]]
- [[Claude_Code整理Obsidian筆記Karpathy公開LLM知識庫系統貼一段指令就能建起來]]
- [[Andrej_Karpathys_LLM_Wiki_Create_your_own_knowledge_base]]
- [[llm-wiki_1]]
- [[Karpathy_LLM_Wiki_是什麼一個卡片盒筆記法使用者的實測_WenHao_Yu]]
- [[Karpathy_的_LLM_Wiki_缺少了什麼以及如何修正]]
- [[llm_wiki]]
- [[LLM_Wiki_是什麼OpenAI_創始成員提出的_AI_知識庫玩法讓_LLM_幫你打造第二大腦]]
- [[安全验证_知乎]]
- [[Karpathy_LLM_Wiki_知識系統實踐解析核心理念_Kenmingの鮮思維]]
- [[LLM_Wiki_實戰我們怎麼把部落格變成一座知識庫_News]]
- [[LLM_Knowledge_Base_用_LLM_編譯個人知識庫各路實作全比較]]
- [[Andrej_Karpathy完整LLM_wiki_建構提示詞_基於ObsidianAI_Agent的個人知識庫完整建構]]
- [[Why_LLM_Wiki_Future_Of_Knowledge_For_Agentic_AI_Humans]]
- [[EP_80LLM_Wiki讓_AI_把資料變成第二顆大腦]]
- [[Llm_Wiki_Karpathys_LLM_Wiki_buildquery_interlinked_markdown]]
- [[Karpathy_的新工作流用_LLM_把原始資料編譯成私人_wiki]]
- [[Building_an_LLM_Research_Wiki_How_I_Turned_3000_Pages_of_Phi]]

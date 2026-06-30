---
title: 知識圖譜分析方法論 - Uedu 優學院
type: framework
created: 2026-06-29T15:28
updated: 2026-06-29T15:28
tags: [Markdown, 中文, English, 技術, programming, development, API, REST]
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
- [[知識圖譜概論下]]
- [[知識圖譜讓_AI_理解事物之間的關係]]
- [[知識圖譜Knowledge_Graph的定義為何_OOSGA]]
- [[知识图谱深入浅出讲解知识图谱技术构建应用_CSDN博客]]
- [[什麼是知識圖譜AI_能不能進工廠的關鍵_製造新觀點]]
- [[awesome-knowledge-graph]]
- [[Google知識圖譜_維基百科自由的百科全書]]
- [[什麼是專案管理其優勢是什麼_2025_Asana]]
- [[專案管理是什麼一文掌握專案管理五大流程高效專案管理工具]]
- [[Zenkit_Projects_Tips_l_六個最常見的專案管理問題]]
- [[輝達市值上10兆ChatGPT預測這時達成]]
- [[電子檔案格式轉置(SmallPdf.com)]]
- [[1764]]
- [[三國史話]]
- [[品三國]]
- [[諸葛孔明]]
- [[戰國日本]]
- [[戰國日本Ⅱ敗者的美學]]
- [[孫子兵法]]
- [[中醫醫理與道家易經]]
- [[squad]]
- [[專案經理6種常見專案管理文件專案計畫書工作時程表需求規_專案人力資源管理學習104學習]]
- [[專案問題多又多範疇過大規格不清怎麼辦_專案管理生活思維]]
- [[天下雜誌出版_專案為何這麼難管破解三大痛點讓你的專案高效完成精準達標]]
- [[12_個專案經理面試問題以及如何回答_Soft_Share]]
- [[第12章_專案溝通管理]]
- [[專案規劃_六大致命問題與解法_ProjectClub_專案管理輕鬆學_職場菁英培育基地]]
- [[新手專案管理必修課定義問題與流程技巧完全拆解]]
- [[PM是什麼想知道適不適合當PM先問自己3個問題_應徵技巧分享面試經驗暨工作甘苦談_1111人力銀行]]
- [[專案管理為什麼14_個專案新手的常見問題]]
- [[這些10個問題專案管理員需要在開始新的專案之前提問]]
- [[專案管理書摘關於利害關係人管理_集體開會只會讓你的產品走向平庸_專案管理生活思維]]
- [[超級專案管理讀後心得看懂專案三個失敗與成功的關鍵]]
- [[120521006]]
- [[Microsoft_PowerPoint_010_ProjectManagementPracticeCourse_相容模式]]
- [[PM必學Google_AI_NotebookLM保姆級教學會議紀錄週報培訓3大場景全自動化高手都在用這招附完整Promp]]
- [[職場筆記會議記錄反省日記如何避免寫過就忘_專案管理生活思維]]
- [[每天開會開到心累新手PM必學的高效率會議方法]]
- [[會議記錄不只是紀錄_重現會議現場的魔法]]
- [[如何做會議紀錄2026_新手也能快速上手的會議記錄完整指南_元筆記]]
- [[如何有效率開會]]
- [[一鍵生成會議記錄週報與追蹤計畫PM_的超強效率活絡加倍術_TechLines_科技線]]
- [[用會議記錄從菜鳥變成局內人PM_筆記]]
- [[如何讓會議開的更有效率_專案經理雜誌]]
- [[讓領導有節奏用_Scrum_改變行銷團隊的協作節奏_專案經理雜誌]]
- [[專案經理人與AI共舞的數位轉型生存指南_專案經理雜誌]]
- [[展望2025AI引領專案_管理者創造職場新高峰_專案經理雜誌]]
- [[JavaScript_is_disabled]]
- [[會議記錄與摘要_ClaudeWorld]]
- [[未來_2_年一半的PM_將被淘汰寓意科技執行長比寫_PRD_更值錢的是場景想像力經理人]]
- [[Gemini教學AI自動生成會議紀錄比手寫快100倍的高效筆記法_職場AI培訓_客服中心委外服務外包_程曦資訊]]
- [[開會的能力決定你職位的高低]]
- [[開會總是沒效率讓主管愛上你的10個高效會議技巧]]
- [[CC字幕_AI_工作流開會還在手打紀錄工程師的零手打會議系統iPhone_NotebookLM_實戰附_SOP]]
- [[取消_PM是個餿主意當實作不再昂貴PM_該如何練就挑選的品味經理人]]
- [[告別會議筆記困境Google_NotebookLM_高效會議記錄完全指南AI協作_雅婷逐字稿實戰教學讓你的筆記精準又省]]
- [[AI_會議紀錄_文書處理會議摘要公文撰寫SOP_自動化_Mason_AI_Lab]]
- [[天文學家發現宇宙最蓬鬆行星_堪比棉花糖_太陽系外天體_木星_行星演化_新唐人电视台]]
- [[會議記錄怎麼做會議記錄完全指南從入門到精通的實用技巧與範本]]
- [[會議記錄整理模板_TryAI_政府AI應用實驗站]]
- [[整理會議紀錄超痛苦5招NotebookLMAI筆記轉化術中英夾雜專有名詞也能精準轉譯]]
- [[5個寫會議記錄Meeting_minutes貼士附範例]]
- [[專案經理_PM_的_AI_實戰指南PRD風險分析會議管理全攻略_Mason_AI_Lab]]
- [[llm-wiki]]
- [[AI大神教你改善工作流用LLM_Wiki打造知識複利天下雜誌]]
- [[Karpathy_LLM_Wiki_知識系統實踐基礎安裝與建置篇_Kenmingの鮮思維]]
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

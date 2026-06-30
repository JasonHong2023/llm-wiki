---
title: Claude Code整理Obsidian筆記！Karpathy公開LLM知識庫系統，貼一段指令就能建起來
type: framework
created: 2026-06-30T18:58
updated: 2026-06-30T18:58
tags: [Markdown, 中文, English, 技術, programming, development, 資料庫, database]
confidence: high
---

# Claude Code整理Obsidian筆記！Karpathy公開LLM知識庫系統，貼一段指令就能建起來

你存了幾百篇文章，打了幾十份筆記，但要用的時候怎麼也找不到。

這不是你的問題。知識管理最耗人的部分，從來不是「讀」和「想」，而是**整理**：把資訊分類、建立連結、讓舊筆記和新資料串起來。

OpenAI 共同創辦人安德烈·卡帕西 (Andrej Karpathy) 最近公開了他的解法：**讓 AI 代替你做這些整理工作**。

你只需要把資料丟進去，剩下的摘要、分類、交叉連結、維護——全部交給 AI。他自己用這個方法，在某個研究主題上累積了將近 100 篇筆記、40 萬字，而且查得動。

這篇文章說明這套系統怎麼運作，以及怎麼用最快的方式把它建起來。

## 你需要準備什麼？

**1. Obsidian**（免費）

存放筆記的桌面應用程式。所有筆記存在你自己的電腦上，不上傳雲端。到 obsidian.md 下載，安裝後建立一個新的「保險庫」（Vault），這就是你的知識庫所在地。

如果你是第一次使用 Obsidian，可以先參考這篇入門教學。

**2. Obsidian Web Clipper**（免費）

瀏覽器擴充功能，讓你在看網頁文章時，一鍵把整篇文章存進 Obsidian，格式乾淨不跑版。

在瀏覽器的擴充功能商店搜尋「Obsidian Web Clipper」安裝即可。

**3. Claude Code**（需要 Anthropic 帳號）

這是整套系統的核心，也是和一般 AI 工具最不一樣的地方。

一般的 ChatGPT 或 Claude 網頁版只能在對話框裡交換文字。**Claude Code 則可以直接進入你的資料夾**，讀取筆記、寫入新內容、更新目錄，就像一個能操作你電腦的 AI 助理，不需要人工複製貼上。

前往 claude.ai/code 下載 Mac 或 Windows 的桌面應用程式。

關鍵是需要Anthropic 帳號，Claude Pro 訂閱方案（每月約 20 美元）包含 Claude Code 的使用權限。如果你對 Claude Code 還不熟悉，可先參考這篇入門教學。

## 最快的起步方式？

準備好之後，打開 Claude Code，把它指向你的 Obsidian 保險庫資料夾。有兩種方式可以讓它幫你把系統建起來：

### 方法一：餵入卡帕西的原始文件（英文）

把以下指令貼給 Claude Code：

```
請根據以下卡帕西的 GitHub Gist，在這個資料夾裡幫我建立 LLM 知識庫系統，並說明我接下來要怎麼使用：
> [https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
```
### 方法二：使用完整架構說明文件

AI 研究者 Elvis Saravia 根據卡帕西的系統整理了一份完整的架構說明文件，並發布在 dair.ai。

把這份文件直接貼給 Claude Code，它就能根據完整的架構說明建立系統，細節比方法一更豐富一些，整體架構如下：

現在把以下指令全部複製，貼給 Claude Code，並在最後加上一句：「請根據以上架構，在這個資料夾裡建立系統，所有筆記使用繁體中文，完成後告訴我怎麼開始使用。」

```
# LLM Knowledge Bases - Architecture (Karpathy)
## Overview
A personal knowledge base system where an LLM acts as a compiler that reads raw source documents and produces a structured, interlinked markdown wiki. No vector databases or embeddings needed at personal scale.
## Phase 1: Ingest
- Obsidian Web Clipper: Browser extension converts web articles into clean .md files with locally downloaded images
- Papers & Repos: arXiv papers, GitHub repos, datasets collected into raw/ staging directory
- raw/ directory: All source documents land here first - the LLM reads from this staging area
## Phase 2: Compile (LLM Compiler)
The LLM incrementally reads raw/ and builds a structured wiki:
- Index & Summaries: Auto-maintained index files with brief summaries of all documents - entry point for queries
- Concept Articles: ~100 articles, ~400K words, organized by topic with backlinks and cross-references
- Derived Outputs: Marp slide decks, matplotlib charts, filed-back query answers
- Backlinks & Cross-links: Auto-generated link graph between concepts, finding connections for new article candidates
## Phase 3: Query & Enhance
- Obsidian IDE: Frontend for browsing the wiki and visualizations
- Q&A Agent: Complex research questions across articles - answers rendered as markdown, slides, or charts
- Search Engine: Vibe-coded naive search over the wiki, usable via web UI or as a CLI tool for the LLM
- Key insight: Outputs from queries get filed back into the wiki - every exploration adds up
## Phase 4: Lint & Maintain
- Scan for inconsistent data
- Impute missing information via web search
- Find connections between concepts for new articles
- Suggest further questions to explore
- After linting, cycle returns to Phase 2 - wiki keeps growing
## Feedback Loops
- Q&A Agent outputs -> filed back into wiki (Derived Outputs)
- Linting results -> enhance the wiki
- Phase 4 cycles back to Phase 2 continuously
## Future Direction
Synthetic data generation from the wiki to fine-tune an LLM so it "knows" the data in its weights rather than just through context windows.
## Tools Used
- Obsidian (IDE + file viewer)
- Obsidian Web Clipper (article ingestion)
- LLM with large context window (compilation)
- Markdown directory structure (wiki storage)
```
兩個方法的效果一樣：Claude Code 會照著說明把整個系統建好，並告訴你後續怎麼操作。不需要手動設定任何東西。

## 這套系統怎麼運作？

整套系統由三個區域和四個動作組成：

三個區域：

- `raw/`原始資料夾
- `wiki/`知識庫
- `index.md`＋- `log.md`

四個動作：

- **蒐集**：用 Obsidian Web Clipper 把網頁文章存進- `raw/`
- **整理**：讓 Claude Code 把原始資料編譯成知識庫筆記
- **提問**：對知識庫問問題，把回答也存回去累積
- **清理**：定期讓 AI 掃描知識庫，找矛盾、補缺漏

### 蒐集資料

看到一篇好文章，點一下瀏覽器上的 Obsidian Web Clipper，文章就自動存進原始資料夾（`raw/`）。PDF、截圖、逐字稿，直接拖進去就好。這個資料夾只進不改，是你所有知識的原始存檔。

### 讓 AI 整理

每次累積了幾篇新資料，在 Claude Code 下一個指令，它會自動讀取原始資料、為每個概念建立或更新筆記、在相關筆記之間加上連結，並更新整座知識庫的目錄。**整個過程你不需要複製貼上任何東西**——Claude Code 直接在你的 Obsidian 資料夾裡寫入修改。

### 問問題，把答案存回去

知識庫累積到一定規模，就可以開始對它提問。問題可以很廣：「幫我整理 XX 主題的重點」、「我在這個領域還有哪些盲點」、「把這些筆記的矛盾找出來」。

卡帕西的做法是讓 AI 把回答也整理成新筆記，直接存回知識庫——讓每一次提問都成為知識的一部分，而不是問完就消失。目前他在某個研究主題上的知識庫已達約 100 篇筆記、40 萬字，在這個規模下可以提出相當複雜的問題。

### 定期清理

每隔一段時間，讓 Claude Code 掃描整座知識庫，找出頁面之間的矛盾、過時的資訊、以及值得深入的新方向。AI 在這個環節也很擅長主動建議下一步值得追問的問題。

## 為什麼這樣做有意義？

傳統知識管理工具，無論是 Notion、Roam 還是 Obsidian，都把整理的苦工甩給人做。連結要人建、標籤要人貼、矛盾要人找。大多數人最終放棄，不是因為沒有毅力，而是維護成本超過了回報。

LLM 知識庫把這個成本轉移給 AI：人負責找素材、定方向、問好問題；AI 負責摘要、交叉連結、一致性維護。

卡帕西在公開這套方法時留下一句話：

「我認為這裡有空間誕生一個了不起的產品，而不只是一堆雜七雜八的腳本。」


目前這套系統還需要自己動手搭建，但它的邏輯已經完整。選一個方法，把文件餵給 Claude Code，就是開始的第一步。

資料來源：Andrej Karpathy GitHub Gist、Karpathy X 貼文、Elvis Saravia / dair.ai

本文初稿為AI編撰，整理．編輯/ 李先泰

## Related Pages

- [[AI大神教你改善工作流，用「LLM Wiki」打造知識複利｜天下雜誌]]
- [[Karpathy LLM Wiki 知識系統實踐：基礎安裝與建置篇 | Kenmingの鮮思維]]
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

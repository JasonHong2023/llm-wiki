---
title: Karpathy LLM Wiki 是什麼？一個卡片盒筆記法使用者的實測 | WenHao Yu
type: framework
created: 2026-06-30T19:01
updated: 2026-06-30T19:01
tags: [Markdown, 中文, English, 技術, programming, development]
confidence: high
---

# Karpathy LLM Wiki 是什麼？一個卡片盒筆記法使用者的實測 | WenHao Yu

這篇文章也有英文版本Read in English →

# Karpathy LLM Wiki 是什麼？一個卡片盒筆記法使用者的實測

這一週，AI 社群被一篇技術筆記洗版。

作者是 Andrej Karpathy。

如果你沒聽過他 —— 他是 OpenAI 最早的創辦成員之一，後來去 Tesla 當 AI 總監，現在自己開了 Eureka Labs 做 AI 教育。在 AI 圈子裡，他說什麼、隔天就會有一堆人跟著試。

4 月 3 日他在 X 發了一段話，隔天把整套做法寫成一份 GitHub gist 放出來。一週之內 Hacker News、X、Substack 全在討論。

最被瘋狂轉的一句是這個：

Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase. — Karpathy gist


老實說，這篇紅起來的時候我有點困惑。

這半年 Obsidian + Claude Code / Codex 的組合已經是 PKM 圈的顯學之一。我自己去年底從 Roam 轉到 Obsidian，跑 Nick Milo 的 LYT 框架加 Claude Code 當後台，也快半年了。身邊還有幾個朋友在做類似的事。

所以 Karpathy 這篇對我來說，第一眼看過去幾乎沒有新東西。

為什麼這篇會爆成這樣？

帶著這個困惑，我花了半天用他的方法研究他的方法 —— 把 7 份素材丟進去跑了一次 ingest，然後跟我自己用了半年的 LYT 系統做對照。

跑完之後我想跟你說兩件事。

第一，骨架一樣。差在 workflow。

第二，根本的分歧不在技術，在哲學 —— 一張卡到底是什麼？

## Karpathy 說了什麼？

他的核心主張很簡單：**不要做 RAG，改做 wiki**。

RAG 的做法是每次查詢時才臨時從 raw 文件找答案。Karpathy 的做法是：讓 LLM 作為 compiler，把 raw 文件增量編譯成一份持久化的 markdown wiki，然後一直維護它。

這兩者的根本差異是時間維度：

- **RAG**：每次查詢 = 重新找答案（stateless、transient）
- **LLM Wiki**：一次編譯、持續維護（stateful、compounding）

「the wiki is a persistent, compounding artifact. The cross-references are already there. The contradictions have already been flagged.」（wiki 是一個持久的、會累積的產物。交叉引用已經建好了，矛盾已經被標出來了。）

Karpathy 的理由是這個：

The tedious part of maintaining a knowledge base is not the reading or the thinking — it’s the bookkeeping. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don’t get bored. — Karpathy gist


人會放棄 wiki，因為維護成本超過回報。LLM 不會累、不會忘記更新 cross-reference、可以一次動 15 個檔案 —— 維護成本被壓到接近零。

所以這個 pattern 的核心不是「讓 AI 寫筆記」。是「把 bookkeeping 壓到接近零，人才有力氣思考」。

順帶一提，Karpathy 把這個 pattern 連回 Vannevar Bush 1945 的 Memex 願景。Bush 80 年前就想做「人的延伸記憶系統」，但他解決不了一件事 —— 誰來維護？Karpathy 對這句話的回答是：

The part he couldn’t solve was who does the maintenance. The LLM handles that.


這個歷史縱深讓這個 pattern 不只是 2026 年的一時熱潮。是一個 80 年前的願景終於有了答案。

## 骨架相同，但長大方式不同

我打開自己在 Obsidian 上的知識管理系統對照 Karpathy 的 gist，骨架幾乎一樣：

| Karpathy Pattern | 我的 LYT | 
|---|---|
| `raw/`（原始來源） | `Atlas/Sources/` | 
| `wiki/`（LLM 維護的知識頁） | `Atlas/Dots/`+`Maps/` | 
| schema 檔（規則設定） | `CLAUDE.md`+ 各`SKILL.md` | 
| `index.md`（索引） | `Maps/`MOC | 

Karpathy 的 gist 是工具不可知的 —— 他同時列了 Claude Code、OpenAI Codex、OpenCode 等選項。我用 Claude Code，所以對照我這邊用 `CLAUDE.md`。

四個層對到了。但骨架像不代表兩條路一樣 —— 我用 LYT 半年，搭配 Claude Code 打了一套完整的 AI 工作流，知識庫一直在長大，只是長大的方式跟 Karpathy 描述的完全不同。

## 我從 Karpathy 學到了什麼？

跑完骨架對照之後，我發現 Karpathy 的 pattern 有幾件事是我的系統還沒做到的。

**Ingest 時的矛盾偵測**。新 source 進來，LLM 會比對新資訊跟舊 wiki page 的衝突，標出矛盾，留給人判斷。我的原子卡片目前不會互相比對。

**跨 page 連鎖更新**。一個新 source 可能同時更新 10-15 張 wiki page。我建新卡時會補連結，但不會動舊卡的內文。

**Lint**。定期掃整座 wiki 做健康檢查 —— 找矛盾、找孤立 page、找過期內容。更厲害的是它會偵測概念缺口：「你在好幾個地方提到這個概念，但沒有獨立的 page」—— LLM 主動建議你建一張。

這些功能技術上都能加進我的系統。但 Karpathy 的貢獻是**他先把這些想清楚了，然後寫成一份任何人都能用的 pattern**。

學到了這些之後，剩下一個繞不過去的問題。

## 一張卡到底是什麼？

LYT 的答案是一個**原子概念**。一張卡一件事，邊界由概念本身決定。好處是歸檔不用想太多，新東西進來就開新卡。代價是你要掌握一個主題的最新狀態，得靠 MOC 和連結自己拼圖。

Karpathy 的答案是一個**主題聚合**。一張 wiki page 是那個主題目前的 best-of 總整理。10 個 sources 可能被 LLM 併進 1-2 張 page。好處是打開一張就看到全貌，不用自己拼。

但我昨天跑 ingest 的時候就卡住了 —— **主題的邊界在哪？** 幾份 source 該併成一張 page、哪些該獨立出來？最後跑出來的數量和邊界，都是我臨時決定的，不是某個規則告訴我的。

然後我意識到：這個問題我見過。Evernote 時代你在問「這個筆記放哪個 folder」。Notion 早期你在問「這個頁面打哪些 tag」。Karpathy wiki 現在在問「這個 source 併進哪張 wiki page」。

三個問題的形狀一模一樣：**對一個新進來的東西，你要決定它屬於哪個容器**。

卡片盒筆記法的核心概念 —— 原子化 —— 就是在繞開這個問題。一張卡一個概念，連結取代分類。新東西進來，同一個概念就補在舊卡上、不同概念就開新卡。邊界由概念本身決定，不用想「歸到哪個容器」。我用的 LYT 繼承了這個核心，加上 MOC 和 AI 整合 —— 不是 pure Zettelkasten，但原子化的精神是一樣的。

Karpathy 的主題聚合是往回走。它用 LLM 的能力把 compound 成本壓低，但沒解決「容器邊界在哪」這個老問題。

## 反對的聲音

容器邊界是我自己跑完實驗後的觀察。但 HN 上還有兩層不同角度的反對，攻擊的都是**人類的懶惰**，不是 LLM 的能力。

### 反對一：Model Collapse（技術面）

除了容器邊界問題，Karpathy 的 pattern 還有一個更根本的技術擔憂。HN 上有人直接點名：

I don’t see why this wouldn’t just lead to model collapse. The compounding will just be rewriting valid information with less sense information.


論點是：LLM 寫出來的 wiki 本身就有資訊損耗 —— 看起來通順但細節被磨平、風格被單一化。下次 ingest 時 LLM 會讀到舊 wiki + 新 source，等於「LLM 在自己寫的東西上再寫」。長期下來可能變成平均的平均的平均，細節慢慢消失。這個現象 AI 圈有個名字叫 **Model Collapse**，2024 年 Nature 的論文 有完整論證。

HN thread 上有反駁的聲音，但那些反駁針對的是 LLM 訓練場景，跟 Karpathy 的 ingest 場景不完全一樣。這個 pattern 會不會真的觸發 Model Collapse，目前還沒人跑夠久可以證明。

### 反對二：Vibe Thinking（認知面）

這個反對最狠。HN 原文：

Rule of thumb: if you find yourself having to come up with instead of what it helps you produce, ask yourself ‘am I thinking?’


有深度的寫作是從 **produce**（生產）的過程中 **come up with**（想出）東西。如果你只是讓 AI produce、你只負責 come up with 問題，那你可能根本沒在思考。

Karpathy 其實在 gist 裡有預先反駁這點：

The human’s job is to curate sources, direct the analysis, ask good questions, and think about what it all means.


「think about what it all means」這句話是他留給人類的。但 HN 的論點是：**這是理論上的分工，實際上很少人會做到**。

「vibe coding」是一個已經存在的現象 —— 不懂原理就讓 AI 寫 code，結果能跑但你不懂。HN 擔心的是 vibe thinking —— 把「整理」外包等於把「思考」外包，wiki 看起來很有組織但你根本沒內化。

### 那對我來說真正的問題是什麼？

這兩個反對聲音都在攻擊人類的懶惰。但對我來說，它們不是真正的問題。

我也懶。但我的防禦是前置的 —— 新東西進來先跟 LLM 討論到我理解，理解完才決定要不要歸檔。思考在對話裡發生，歸檔是思考完的結果。所以進知識庫的每張卡都是我驗證過的，LLM 下次讀到的不是它自己 compound 出來的東西，Model Collapse 的前提就不成立。Vibe Thinking 也一樣，歸檔是理解完的儲存，不是理解前的外包。

而前面提到的矛盾偵測、lint、跨卡改寫，我也都準備整合進自己的系統。

真正讓我不搬家的原因只有一個：**容器**。

兩條路都用 LLM 做 compound，bookkeeping 成本兩邊都壓得下來。但 Karpathy 的 wiki page 是主題聚合 —— 你要決定主題邊界在哪、哪些東西該併進同一張 page。LYT 的原子卡片繞開了這個問題 —— 一張卡一個概念，不用想歸到哪裡。

如果你有一個明確的主題要長期維護，而且對「這個東西該放哪張 page」這類決策不覺得煩，Karpathy 的 pattern 值得試。去讀他的 gist，搭配 Mehmet 的實作文章。

如果你跟我一樣，從 folder 出來、從 tag 出來，不想再走進另一個分類系統 —— 那原子化可能更適合你。

我用他的方法研究他的方法，結果沒讓我換系統。但讓我搞清楚一件事：兩條路的分歧不在技術，在你對分類的容忍度。

### 延伸閱讀

想看我怎麼把 LYT + Claude Code 串成一套完整的 AI 工作流？這篇是完整介紹——從每天早上的「開工」到知識庫、郵件、會議、目標管理全部串起來。

*如果這篇讓你有了想法，訂閱每週一封信——我固定寫 AI 工作流、和一路上想通的事。*

*想聊聊怎麼把 AI 融入你的工作流？看看我的服務。*

## 常見問題

- Karpathy 的 LLM Wiki 跟 RAG 有什麼不同？
- RAG 每次查詢重新從 raw 文件找答案，什麼都不留。LLM Wiki 讓 LLM 把 raw 增量編譯成一份持久化的知識管理 wiki，然後一直維護它。差別是時間維度 —— RAG 每次重新推導，wiki 把推導結果存起來持續累積。
- 什麼是 Model Collapse？
- LLM 反覆讀自己寫的東西再改寫，長期下來細節被磨平、風格單一化 —— 平均的平均的平均。Nature 2024 有論文論證。這是 HN 對 Karpathy pattern 最大的技術擔憂。
- 卡片盒筆記法和 Karpathy LLM Wiki 的核心差別是什麼？
- 容器。卡片盒筆記法的原子卡片一張一個概念，連結取代分類，不用想「這個東西歸哪裡」。Karpathy 的 wiki page 是主題聚合，一張 page 裝一個主題的所有東西，但你要決定主題邊界在哪。這是 folder 和 tag 時代的老問題換了個皮。
- 我該用 Karpathy 的方法嗎？
- 問自己一個問題：你對「這個東西該放哪」這類分類決策煩不煩？如果不煩，而且有明確的主題要長期維護，Karpathy 的 pattern 值得試。如果你跟我一樣，從 folder 出來、從 tag 出來，不想再走進另一個分類系統，那卡片盒筆記法的原子化路線可能更適合你。

## Related Pages

- [[LLM Wiki 使用说明]]
- [[Claude Code整理Obsidian筆記！Karpathy公開LLM知識庫系統，貼一段指令就能建起來]]
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

---
title: Hermes Agent 新增 /learn 指令：讓任何資料都能變成可重複使用的 AI 技能 - 電腦王阿達
type: framework
created: 2026-06-27T23:33
updated: 2026-06-27T23:33
tags: [Markdown, 中文, English, 技術, programming, development, API, REST]
confidence: high
---

# Hermes Agent 新增 /learn 指令：讓任何資料都能變成可重複使用的 AI 技能 - 電腦王阿達

開源 AI 代理 Hermes Agent 再推出一個重磅新功能，Nous Research 於 6 月 23 日在 X 上宣布，Hermes Agent 新增 `/learn` 指令，使用者只要指向一個目錄，無論裡面是程式碼、API 文件、產品手冊、PDF 或設定檔，Agent 都能自動消化並將其蒸餾成一個可驗證、可重複使用的「技能（Skill）」。

Hermes Agent can now /learn from anything: feed it directories of any source material (code, API docs, manuals, PDFs, configs) and it distills a verifiable reusable skill pic.twitter.com/oRznwCRF3E

— Nous Research (@NousResearch) June 23, 2026



這項功能看似簡單，卻直指 AI 代理長久以來的痛點：每次新對話都要重新解釋上下文。過去使用者若想讓 Agent 熟悉自家的 API 或工作流程，得在每次對話中手動貼上文件、反覆說明慣例，對話結束後這些知識就消失。`/learn` 的出現，代表 Hermes Agent 正式補上「從原始資料到持久化能力」這最後一哩路。


### 什麼是 /learn？一次搞懂功能邏輯

傳統的 AI 助手處理文件的方式，通常是把內容塞進當前對話的上下文視窗，模型在該次對話中「看過」這些資料，但對話結束後一切歸零。下次要用同樣的資訊，使用者得再貼一次。

`/learn` 的做法完全不同。使用者指向一個包含原始資料的目錄後，Hermes Agent 會執行以下步驟：

- **讀取所有檔案**：支援程式碼、API 規格文件、操作手冊、PDF、設定檔等多種格式
- **萃取關鍵知識**：從大量資料中辨識出真正有用的程序、規則、慣例與陷阱
- **生成 Skill 文件**：產出一個結構化的 SKILL.md 檔案，包含觸發條件、步驟流程、已知陷阱與驗證方法
- **持久化儲存**：Skill 存放在本機- `~/.hermes/skills/`目錄，跨 session 存活，不需要重複解釋

用 Nous Research 的話來說：「You build it once, you use it forever.」建一次，永久使用。


### Skill 系統：Hermes Agent 的核心差異化

要理解 `/learn` 為什麼重要，得先理解 Skill 系統在 Hermes Agent 架構中的角色。Skill 不是單純的提示詞範本，而是一份結構化的知識文件。每個 Skill 都遵循統一格式：YAML 前置資料（名稱、描述、觸發條件）加上 Markdown 內文（程序步驟、陷阱警示、驗證方式）。Agent 在對話中遇到相關任務時，會自動判斷是否需要載入對應的 Skill，採用漸進式載入策略以節省 token：先看列表（約 3k tokens），需要時才載入完整內容。

這個設計讓 Hermes Agent 成為少數具備「經驗累積」能力的 AI 代理。多數 Agent 框架在每次對話結束後就重置狀態，Hermes 則透過 Skill 和 Memory 兩套機制讓知識跨 session 延續。GitHub 上的官方文件明確指出：「It’s the only agent with a built-in learning loop.」

### 與 v0.17.0 的時間線巧合

`/learn` 功能的宣布時間點，恰好落在 Hermes Agent v0.17.0 發布（6 月 19 日）之後不久。v0.17.0 被官方稱為「The Reach Release」，是一次大規模更新：超過 1,475 個 commit、800 個合併 PR、1,693 個檔案變更，以及 245 位社群貢獻者參與。

該版本的主要亮點包括：透過 Photon 支援 iMessage 通訊、加入 Raft 代理網路、桌面應用程式大幅強化（子代理 watch-window、VS Code 主題支援）、背景非同步子代理、圖片生成可編輯等。`/learn` 功能的推出，可以視為這波更新的延伸，進一步強化 Hermes Agent 在「知識持久化」這個核心賣點上的領先地位。

Hermes Agent 目前在 GitHub 上已累積超過 202,000 顆星標，是 Nous Research 最受關注的開源專案之一。Nous Research 由 Teknium 共同創辦，定位為「一群朝開源 AI 前進的極客」，旗下除了 Hermes Agent 外，還包含多個開源語言模型。

在 AI 代理框架的競爭中，Hermes Agent 的差異化策略相當清晰：不追求最多的工具整合數量，而是專注於「自我改進」這個核心能力。Skill 系統讓 Agent 能從經驗中學習，Memory 系統讓它記住使用者偏好，而 `/learn` 則讓這個學習迴圈的輸入端大幅擴展，從「對話中學」升級到「從任何資料中學」。

相較之下，多數開源 Agent 框架（如 LangChain、AutoGen、CrewAI）更偏向工具鏈的組裝與任務調度，缺乏這種內建的知識累積機制。Hermes Agent 的做法更接近一位「會成長的同事」，而非一個「每次都要從頭訓練的工具」。隨著`/learn` 功能的推出，標誌著 Hermes Agent 在知識管理上的最後一塊拼圖到位。從過去只能在對話中被動學習，到現在能主動消化任何格式的原始資料並產出可執行的技能，這個躍遷讓 Hermes Agent 從「聰明的對話工具」進一步走向「能累積組織知識的 AI 工作者」。

## Related Pages

- [[🚀 API Mega List]]
- [[不得不裝的 AI 代理工具｜GitHub 萬星項目｜OPENCODE]]
- [[Fractal_the_recursive_language_model_CLI_agent]]
- [[沒錢沒資源沒人脈你要憑什麼贏孫子兵法以少勝多九大心法越級打怪的底層邏輯孫武老子孔子同時告訴你孫子說]]
- [[為什麼PDF還是這麼難用其實是故意的]]
- [[少子化時代台灣缺的到底是人口還是制度升級]]
- [[MCP_Servers]]
- [[README-zh_TW]]
- [[代码搜索省92_Token拆解_Headroom_的上下文优化真相]]
- [[零成本无限_TokenHermes_Qwen36本地最强_Agent_组合来了附部署教程_零度解说]]
- [[三小時吃透易經從職場困境到人生破局的底層邏輯全揭秘]]
- [[World_Monitor_By_the_time_its_news_you_already_knew]]
- [[用AI生成器解鎖知識圖譜Knowledge_Graphs輕鬆搭建知識體系]]
- [[知識圖譜_維基百科自由的百科全書]]
- [[知識圖譜概論上]]
- [[中華電信研究院科技新知]]
- [[長文本為什麼容易漏掉中段GraphRAG知識圖譜與長文本處理_iPAS_AI_應用規劃師中級_L21103]]
- [[AI知识图谱_GraphRAG_是怎么回事]]
- [[企業知識圖]]
- [[知識圖譜_Knowledge_Graph_KG]]
- [[專案管理怎麼規劃管理專案圖解專案管理５步驟與工具經理人]]
- [[專案管理_維基百科自由的百科全書]]
- [[為何需要專案管理]]
- [[新手_PM_懶人包專案經理Project_Manager在做什麼要考證照嗎7_大_PM_問題幫你解_專案管理生活思維]]
- [[知識圖譜分析方法論_Uedu_優學院]]
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

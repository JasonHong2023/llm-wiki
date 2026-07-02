---
title: Hermes Agent 新增 /learn 指令：讓任何資料都能變成可重複使用的 AI 技能 - 電腦王阿達
type: framework
created: 2026-06-27T23:33
updated: 2026-07-02T17:18
tags: [Markdown, 中文, English, 技術, programming, development, API, REST, Hermes Agent, AI 代理, 知識圖譜, Skill 系統, 持久化儲存, 學習迴圈]
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

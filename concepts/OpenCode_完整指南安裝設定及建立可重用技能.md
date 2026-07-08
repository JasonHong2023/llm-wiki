---
title: OpenCode 完整指南：安裝、設定及建立可重用技能
type: framework
created: 2026-07-08T17:03
updated: 2026-07-08T17:03
tags: [Markdown, 中文, English, 技術, programming, development, OpenCode, AI 編程代理, 程式碼生成, 開發工作流程, 可重用技能, We0ai, source:browser-extension]
confidence: high
---

# OpenCode 完整指南：安裝、設定及建立可重用技能

**OpenCode 最被低估的部分，並不是它能否為你寫程式碼。**

真正的問題是，它能否將重複的開發動作轉化為可重用的工作流程。安裝一次。設定模型。加入專案規則。然後使用 Skills 定義某類任務應如何處理。這樣，AI 就不再像一位新隊友，需要你一次又一次解釋同樣的背景。

原文有一條清晰路線：先讓 OpenCode 跑起來，再設定 Skills。這次改寫保留了這個結構，同時按照目前官方文件更新了安裝設定邏輯。

對 We0ai 這樣的平台來說，這一點很重要，因為 AI 編程代理不只是用來寫程式碼。**它們可以幫助團隊將網站、組件、SEO/GEO 頁面，以及增長實驗，連接到更大的「Build -> Showcase -> Grow -> Leads」工作流程之中。**

**OpenCode 是甚麼：不是聊天視窗，而是終端機中的 AI 編程代理**

OpenCode 最適合理解為面向開發者的 AI 編程代理。它可以在終端機中運行，也可透過桌面及 IDE 相關體驗使用。相比一般聊天機械人，它更接近一位工程助手，能閱讀專案、理解上下文、編輯檔案，並協助除錯。

這正是它與 Skills 配合得很好的原因。你無需每次都問「幫我寫這個函式」，而是可以為發佈說明、SEO 頁面審核、測試修復、Pull Request 檢查，以及程式碼審查定義可重複的行為。

**步驟 1：安裝 OpenCode**

*原圖：OpenCode 官方安裝入口。*

*原圖：在 Windows Terminal 中使用 npm 全域安裝 OpenCode。*

*原圖：啟動後的 OpenCode 終端機介面。*

官方文件列出的安裝腳本是最容易上手的起點。你亦可以使用 npm、Bun、pnpm、Yarn、Homebrew 或其他套件管理器安裝 OpenCode。對很多前端及全端開發者來說，npm 仍然是最熟悉的入口。

# 建議：官方安裝腳本 curl -fsSL https://opencode.ai/install | bash npm install -g opencode-ai # 啟動 opencode

Windows 用戶應留意運行環境。如果你的工作流程依賴終端機工具、依賴項、Git 及 shell scripts，WSL 通常會是更順暢的選擇。直接在 Windows 上運行亦可行，但類 Linux 環境通常可減少路徑及權限方面的摩擦。

**步驟 2：連接模型，而不是盲目信任預設值**

*原圖：在 OpenCode 中查看及切換模型。*

*原圖：選擇模型後開始第一次對話。*

模型選擇是不少新手用戶卡住的地方。不要只按「免費」或「最強」來選。應先從你需要完成的工作類型出發。

官方文件建議在 TUI 內使用 /connect 來連接你的提供商。設定好金鑰後，開啟專案目錄，並在該目錄中啟動 OpenCode。

# 在 OpenCode TUI 中連接提供商 /connect # 在專案中啟動 cd your-project opencode

**步驟 3：使用 opencode.jsonc 管理設定**

預設設定已足夠用作快速測試。但如果你希望 OpenCode 成為長期工作流程的一部分，設定檔就很重要。OpenCode 支援 JSON 及 JSONC 設定，並可結合全域及專案設定。

{ "$schema": "https://opencode.ai/config.json", "model": "anthropic/claude-sonnet-4-5", "autoupdate": true, "permission": { "edit": "ask", "bash": "ask" }, "instructions": [ "AGENTS.md" ] }

### 目標不是令設定看起來複雜。目標是令工作邊界清晰：使用哪個模型、更新如何處理、哪些操作需要批准，以及必須讀取哪些專案規則。

**步驟 4：理解 Skills，可重用行為的核心**

*原圖：官方 Anthropic Skills 儲存庫。*

*原圖：一個中文社群 Agent Skills Marketplace。*

Skill 不只是另一個資料夾。它是給 AI 助手重用的指令套件。你描述某個特定任務應該如何判斷、執行及回傳。然後 OpenCode 就可以在有用時載入該行為。

根據官方文件，OpenCode 會在專案層級的 .opencode/skills、全域 ~/.config/opencode/skills，以及相容的 Claude / Agents skill 目錄中搜尋 Skills。

# 專案層級 Skill your-project/ .opencode/ skills/ seo-page-review/ SKILL.md # 全域 Skill ~/.config/opencode/skills/ release-notes/ SKILL.md

一個最基本的 SKILL.md 通常需要 name 和 description。name 應該簡短、小寫，並以連字號分隔。description 應該足夠具體，讓 agent 知道何時要載入它。

--- name: seo-page-review description: 檢視一個展示網站頁面的 SEO、GEO、信任訊號及潛在客戶轉化。 compatibility: opencode --- ## 要檢查的內容 - 搜尋意圖及頁面結構 - 信任訊號及證明 - 潛在客戶收集路徑 - 內部連結及轉化清晰度

**步驟 5：Windows 全域 Skill 設定**

*原圖：Windows 用戶目錄下的 OpenCode skills 資料夾。*

*原圖：skills 目錄內有多個 Skill 資料夾。*

*原圖：使用 skill list 檢查已載入的 Skills。*

*原圖：OpenCode 自動匹配 frontend-design Skill。*

*原圖：Skill 觸發後產生的頁面程式碼及結構化輸出。*

*原圖：OpenCode 產生的最終網頁預覽。*

原文重點放在 Windows 上的全域 Skill 設定。這個概念很實用：如果每個專案都應該使用同一個 Skill，就把它放在用戶層級目錄。如果 Skill 只適用於某一個專案，就把它保留在專案層級。

一個簡單規則很有幫助：如果 Skill 代表團隊知識，就把它跟 repository 放在一起。如果它只是你的個人習慣，就把它設為全域。

**步驟 6：不要隨便混用 AGENTS.md、Skills 和設定檔**

## 懂搜索的 AI 建站，讓精準客戶主動找到你。

告別死板模板，拒絕為流量交租。融合 AI 智能建站、強大 CMS 與內置 SEO/GEO 自動優化，無論跨境出海還是深耕本地，我們為你打造一整套獨立增長基建。

很多團隊會把所有內容都塞進一個混亂的指令檔。這會令助手更難控制。更乾淨的設定方式是分清職責。

簡單來說：AGENTS.md 用於長期專案規則，Skills 用於特定而可重複的任務，而 opencode.jsonc 則用於執行時設定。

**OpenCode 與 We0ai：建構層遇上增長層**

OpenCode 主要協助 Build 層：程式碼、重構、腳本、專案規則及可重用的開發工作流程。We0ai 則專注於 Showcase 和 Growth：把產品、服務、案例、範本、內容，以及 SEO/GEO 頁面轉化為展示網站，讓它們可被搜尋到、可被 AI 搜尋理解，並轉化為潛在客戶。

它們不是彼此的替代品。實際做法是使用 OpenCode 改善開發及內容工程工作流程，同時使用 We0ai 將最終網站轉化為面向用戶及搜尋流量的增長資產。

**最後重點**

OpenCode 並不難安裝。真正的問題是你是否把它視為一個長期工作流程工具。

如果你只是安裝它，你會得到一個 AI 程式編寫助手。如果你設定模型和權限，你會得到一個更穩定的專案助手。如果你善用 Skills、AGENTS.md 和 opencode.jsonc，你會得到一套可重用、可跨專案移動，並可由團隊共享的 AI 開發系統。

對於正在建立展示網站、SEO/GEO 頁面、產品案例頁及增長實驗的團隊來說，這一點很重要。網站增長不會停留在頁面生成。它需要程式碼、內容、元件及工作流程持續改善。

這亦是 We0ai 背後的邏輯：Build -> Showcase -> Grow -> Leads。建立資產，展示價值，提升能見度，並將注意力轉化為潛在客戶及客戶。

行動呼籲：如果你的網站需要做到不只是上線，請一併設計開發工作流程及展示增長路徑。

**常見問題**

**OpenCode 是甚麼？**

OpenCode 是為開發人員而設的 AI 編碼代理。它可在終端機中協助理解、編輯、生成程式碼，以及進行項目協作。

**如何安裝 OpenCode？**

你可以使用官方安裝腳本，或透過 npm install -g opencode-ai 安裝。

**OpenCode Skills 有甚麼用途？**

Skills 會封裝可重用的任務指示，例如程式碼審查、SEO 頁面審查、發佈說明，以及測試修復工作流程。

**Skills 應放在哪裏？**

常見路徑包括 .opencode/skills/<name>/SKILL.md 及 ~/.config/opencode/skills/<name>/SKILL.md。

**AGENTS.md 和 SKILL.md 有甚麼分別？**

AGENTS.md 較適合長期項目規則，而 SKILL.md 較適合特定且可重複的任務工作流程。

**這與 We0ai 有甚麼關係？**

OpenCode 支援構建層，而 We0ai 支援展示及增長。兩者結合可連接程式碼、內容、SEO/GEO 及潛在客戶轉化。

**相關工具**

- __OpenCode__

- __Node.js__

- __npm__

- __We0ai__

**來源**

## Related Pages

- [[OpenCode AI 編碼助理完全入門指南：開源免費工具的力量 | LETWEBS 來網頁資訊 ─ 引領未來線上整合提供商]]
- [[opencode server,web两命令, --mDNS 参数的使用场景]]
- [[2026 OpenCode 教程：完整安裝、設定與配置指南 | NxCode]]
- [[5分鐘掌握_OpenCode開源_AI_編程助手新人完整指南_Apiyicom_Blog]]

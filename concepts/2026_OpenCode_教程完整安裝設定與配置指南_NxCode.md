---
title: 2026 OpenCode 教程：完整安裝、設定與配置指南 | NxCode
type: framework
created: 2026-07-07T18:30
updated: 2026-07-07T18:30
tags: [Python, 非同步, scripting, Markdown, 中文, English, 技術, programming, OpenCode, AI 編碼助手, 終端機, 開源, 供應商無關, IDE 整合, source:browser-extension]
confidence: high
---

# 2026 OpenCode 教程：完整安裝、設定與配置指南 | NxCode

# OpenCode 2026 教程：終極終端機 AI 編碼入門指南

OpenCode 席捲了開發者世界——它擁有超過 **45,000 個 GitHub 星標** 以及每月 65 萬名以上的使用者，已成為目前最受歡迎的開源 AI 編碼工具之一。

但如果您是第一次接觸基於終端機的 AI 助手，入門可能會讓您感到不知所措。

在這份詳盡的教程中，我們將帶領您了解關於 OpenCode 的一切——從安裝到進階功能——讓您從今天起就能在 AI 的協助下開始編碼。

## 什麼是 OpenCode？

**OpenCode** 是一款在終端機中運行的開源 AI 編碼代理。您可以將它想像成一位坐在您身旁的資深開發者，隨時準備協助您：

- 編寫與除錯程式碼
- 理解現有的代碼庫 (Codebases)
- 程式碼重構與優化
- 回答技術問題
- 自動化重複性任務

與雲端編碼助手不同，OpenCode 採用 **本地優先 (Local-first)** 策略——除非您另有選擇，否則您的程式碼會保留在您的機器上。

### 關鍵功能

| 功能 | 描述 | 
|---|---|
| 100% 免費且開源 | 沒有隱藏費用、訂閱費或陷阱 | 
| 供應商無關 (Provider Agnostic) | 可搭配 Claude、GPT、Gemini 或本地模型使用 | 
| 終端機原生 | 精美的 TUI (終端機使用者介面) | 
| IDE 整合 | 支援 VS Code、Cursor 以及任何支援終端機的 IDE | 
| GitHub 整合 | 直接從評論中自動化處理 Issue 和 PR | 

## 安裝

### 方法 1：快速安裝 (推薦)

```
curl -fsSL https://opencode.ai/install | bash
```
### 方法 2：套件管理器

**macOS (Homebrew):**

```
brew install opencode
```
**Windows (Scoop):**

```
scoop install opencode
```
**npm/bun:**

```
npm i -g opencode-ai@latest
# or
bun add -g opencode-ai
```
### 方法 3：桌面應用程式

直接從 opencode.ai/download 下載，享受原生桌面體驗。

### 描述您想要的——NxCode 為您建構。

將您的想法變成可運行的應用——無需編程。

## 初始配置

### 步驟 1：選擇您的 AI 供應商

OpenCode 支援多個供應商。以下是您的選擇：

- **OpenCode Zen**(推薦) - 針對編碼優化的精選模型
- **Claude Pro/Max**- 品質最佳，重度使用最具成本效益
- **OpenAI GPT**- ChatGPT 使用者的熟悉選擇
- **Google Gemini**- 非常適合多模態任務
- **本地模型 (Local Models)**- 專注隱私，完全在您的機器上運行

要配置您的供應商，請建立一個設定檔：

```
# Global config
~/.config/opencode/opencode.json
# Or project-specific
./opencode.json
```
### 步驟 2：設定您的 API 金鑰

```
export ANTHROPIC_API_KEY="your-key-here"
# or
export OPENAI_API_KEY="your-key-here"
```
### 步驟 3：啟動 OpenCode

導覽至您的專案目錄並執行：

```
opencode
```
您將看到一個精美的終端機介面，隨時準備協助您編碼！

## 核心概念：計畫模式 (Plan) vs 構建模式 (Build)

OpenCode 有兩種主要模式，您可以使用 **Tab** 鍵進行切換：

### 🧠 計畫模式 (Plan Mode)

- **唯讀**- 無法對您的程式碼進行更改
- 分析並探索您的代碼庫
- 建議實作策略
- 適合在修改前進行理解

### 🔨 構建模式 (Build Mode - 預設)

- **完整權限**- 可以讀取、寫入和修改檔案
- 執行程式碼變更
- 執行指令
- 最適合實際開發工作

**專業提示：** 對於複雜的功能，務必先在計畫模式中開始以勾勒方法，然後再切換到構建模式進行實作。

## 基本指令

| 指令 | 描述 | 
|---|---|
| `/undo` | 撤銷上一次變更 | 
| `/redo` | 重做已撤銷的變更 | 
| `@` | 在專案中模糊搜尋檔案 | 
| `Tab` | 在計畫模式與構建模式之間切換 | 
| `Cmd+Esc` | 在 IDE 分離檢視中開啟 OpenCode (Mac) | 
| `Ctrl+Esc` | 在 IDE 分離檢視中開啟 OpenCode (Windows/Linux) | 

## 建立 AGENTS.md 檔案

為了獲得最佳效果，請在專案根目錄建立一個 `AGENTS.md` 檔案。這有助於 OpenCode 理解：

- 您的專案結構
- 編碼慣例
- 偏好的模式
- 技術棧 (Tech Stack)

範例：

```
# Project: My SaaS App
## Tech Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- PostgreSQL with Prisma
## Conventions
- Use functional components
- Prefer server components when possible
- Follow REST API naming conventions
- Write tests for all new features
## Structure
- /app - Next.js app router pages
- /components - Reusable UI components
- /lib - Utility functions and helpers
- /prisma - Database schema and migrations
```
## 實作範例

### 範例 1：理解代碼庫

```
You: Explain the authentication flow in this project
```
OpenCode 將分析您的檔案，並提供關於身份驗證運作方式的詳細說明。

### 範例 2：增加功能

```
You: Add a dark mode toggle to the settings page
```
OpenCode 將會：

- 找到設定頁面
- 識別主題系統
- 實作切換開關
- 更新必要的樣式

### 範例 3：除錯

```
You: The login form is not submitting. Here's the error: [paste error]
```
OpenCode 將追蹤問題並建議修復方案。

### 範例 4：重構

```
You: Refactor the UserService class to use dependency injection
```
OpenCode 將在保持功能的同時使您的程式碼現代化。

## IDE 整合

### VS Code / Cursor

- 在 IDE 中開啟終端機
- 執行 `opencode`
- 使用 `Cmd+Esc`(Mac) 或`Ctrl+Esc`(Windows/Linux) 在分離檢視中開啟

### 非互動模式

用於腳本編寫與自動化：

```
opencode -p "Explain the use of context in this Go project"
```
這會處理您的提示詞，印出結果後退出。

## GitHub 整合

OpenCode 可以直接在您的 GitHub 工作流中運作：

- 在 Issue 或 PR 評論中提及 `/opencode`或`/oc`
- OpenCode 在您的 GitHub Actions runner 中執行
- 它會建立一個新分支並提交帶有變更的 PR

範例評論：

```
/opencode Fix the bug described in this issue
```
## 可用的免費模型

OpenCode 提供數個免費模型：

- **Grok Code Fast 1**- 限時免費（收集意見回饋中）
- **GLM 4.7**- 限時免費
- **Big Pickle**- 隱藏版模型，限時免費

這些模型非常適合在不花任何費用的情況下嘗試 OpenCode！

## 給初學者的建議

### 1. 描述要具體

❌ "讓它變得更好" ✅ "重構 handleSubmit 函式以使用 async/await 並增加錯誤處理"

### 2. 提供上下文

❌ "修復 bug" ✅ "登入表單在點擊提交時拋出 'undefined is not a function'。錯誤發生在 auth.ts 第 45 行"

### 3. 先使用計畫模式

對於複雜功能，在實作前先要求 OpenCode 制定計畫。

### 4. 利用圖片支援

將螢幕截圖或設計稿拖放到終端機中——OpenCode 可以理解圖片！

### 5. 建立專案專用的設定

不同專案可能需要不同設定。請使用本地的 `opencode.json` 檔案。

## OpenCode vs 其他工具

| 功能 | OpenCode | Claude Code | Cursor | 
|---|---|---|---|
| 開源 | ✅ | ❌ | ❌ | 
| 免費層級 | ✅ | 有限 | 有限 | 
| 終端機優先 | ✅ | ✅ | ❌ | 
| 供應商無關 | ✅ | ❌ (僅限 Claude) | ❌ | 
| 本地模型 | ✅ | ❌ | ✅ | 
| IDE 整合 | ✅ | ✅ | 原生支援 | 

## 當 OpenCode 可能不夠用時

OpenCode 對於希望在編碼時獲得 AI 協助的開發者來說非常出色。但如果您：

- 不知道如何編碼？
- 想僅憑一個點子就建立一個完整的應用程式？
- 需要全棧解決方案且不想碰終端機？

這就是 **NxCode** 派上用場的地方。

使用 NxCode，您只需用平常說話的語言描述您的應用程式：

"幫我建立一個 CRM，具備潛在客戶追蹤、電子郵件整合和團隊協作功能"


NxCode 的 AI 代理會在幾分鐘內建立整個應用程式——包括前端、後端、資料庫和部署。

**OpenCode** = 為開發者提供的 AI 輔助編碼
**NxCode** = 為所有人提供的 AI 驅動應用程式開發

👉 免費嘗試 NxCode — 一句話就能建立應用程式。

## 總結

OpenCode 是一款強大的開源 AI 編碼助手，將智慧化協助直接帶入您的終端機。憑藉其供應商無關的設計、免費模型和深度 IDE 整合，它是開發者提升生產力的絕佳選擇。

**關鍵要點：**

- 單一指令即可安裝
- 配置您偏好的 AI 供應商
- 使用計畫模式進行分析，構建模式進行變更
- 建立 AGENTS.md 以提供更好的上下文
- 利用 GitHub 整合實現自動化工作流

祝您編碼愉快！ 🚀

*由 NxCode 團隊撰寫 | 以 AI 賦能開發者與創作者。*

## Related Pages

- [[LLM Wiki]]
- [[Karpathy 的 LLM Wiki 缺少了什麼（以及如何修正）]]
- [[🚀 API Mega List]]

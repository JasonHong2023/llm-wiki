---
title: 5分鐘掌握 OpenCode：開源 AI 編程助手新人完整指南 - Apiyi.com Blog
type: framework
created: 2026-07-08T17:06
updated: 2026-07-08T17:06
tags: [Markdown, 中文, English, 技術, programming, development, API, REST, OpenCode, AI 編程助手, 開源, 終端, 多模型支持, 隱私優先, source:browser-extension]
confidence: high
---

# 5分鐘掌握 OpenCode：開源 AI 編程助手新人完整指南 - Apiyi.com Blog

作者注：OpenCode 是一款基於終端的開源 AI 編程助手，支持 Claude、OpenAI、Gemini 等多種大模型。本文提供完整的安裝配置和使用教程，幫助新人快速上手這款 65萬+開發者信賴的工具

<！– 教程型開頭 （tutorial） –>

想在終端中使用 AI 輔助編程，但不想被單一服務商綁定？OpenCode 是目前最受歡迎的開源解決方案，GitHub 星標超過 7萬，每月有 65萬+開發者在使用。

**核心價值**: 讀完本文，你將學會安裝配置 OpenCode、連接多種 AI 模型，並掌握日常開發中最實用的功能。

## OpenCode AI 編程助手核心要點

| 要點 | 說明 | 價值 | 
|---|---|---|
| 完全開源 | MIT 協議，代碼託管在 GitHub | 免費使用，可自由定製 | 
| 多模型支持 | Claude、OpenAI、Gemini、本地模型 | 靈活選擇最適合的 AI | 
| 隱私優先 | 不存儲代碼，支持本地運行 | 適合企業和敏感項目 | 
| 終端原生 | 精美的 TUI 界面，vim 風格操作 | 無需離開終端，效率更高 | 
| 多端協同 | 客戶端/服務器架構 | 支持遠程驅動和移動端控制 | 

### OpenCode 是什麼

OpenCode 是一個基於 Go 語言開發的命令行 AI 編程助手。與 Claude Code、Cursor 等商業工具不同，OpenCode 完全開源，允許開發者自由選擇 AI 提供商——可以是 Claude、OpenAI、Google Gemini，也可以是本地運行的開源模型。

它採用 Bubble Tea 框架構建了精美的終端用戶界面（TUI），提供流暢的交互體驗。你可以在 VS Code、Cursor 或任何支持終端的 IDE 中使用它。

### OpenCode 核心優勢

**隱私與安全**：OpenCode 默認不向遠程服務器發送你的代碼。選擇模型提供商和數據共享範圍完全由你控制。如果使用本地模型，整個工作流都可以保持私密。

**靈活的模型選擇**：雖然官方推薦 OpenCode Zen 服務，但你可以自由接入任何兼容的 AI 服務。通過 API易 等聚合平臺，可以使用統一接口調用 Claude、GPT、Gemini 等多種模型。

## OpenCode 安裝配置指南

### 安裝方式

OpenCode 支持多種安裝方式，選擇適合你係統的方法：

| 平臺 | 安裝命令 | 說明 | 
|---|---|---|
| 自動安裝 | `curl -fsSL https://opencode.ai/install | bash` | 推薦，自動檢測系統 | 
| npm | `npm i -g opencode-ai@latest` | Node.js 用戶首選 | 
| Homebrew | `brew install opencode-ai/tap/opencode` | macOS/Linux 用戶 | 
| Scoop | `scoop install opencode` | Windows 用戶 | 
| Chocolatey | `choco install opencode` | Windows 備選方案 | 

### 快速配置流程

安裝完成後，按以下步驟配置：

**第一步：啓動 OpenCode**

```
# 進入你的項目目錄
cd your-project
# 啓動 OpenCode
opencode
```
**第二步：連接 AI 提供商**

在 OpenCode 界面中執行 `/connect` 命令，選擇你的 AI 服務提供商並完成認證。

**第三步：初始化項目**

執行 `/init` 命令，OpenCode 會分析你的代碼庫結構並生成 `AGENTS.md` 配置文件，幫助 AI 更好地理解項目上下文。

### 極簡示例

以下是使用 API易 接入 OpenCode 的配置示例：

```
# 設置環境變量
export OPENAI_API_KEY="your-apiyi-key"
export OPENAI_API_BASE="https://vip.apiyi.com/v1"
# 啓動 OpenCode
opencode
```
**查看完整配置文件示例**

```
{
  "providers": {
    "apiyi": {
      "apiKey": "your-apiyi-key"，
      "baseURL": "https://vip.apiyi.com/v1"，
      "models": [
        "claude-sonnet-4-20250514"，
        "gpt-4o"，
        "gemini-2.0-flash"
      ]
    }
  }，
  "defaultProvider": "apiyi"，
  "defaultModel": "claude-sonnet-4-20250514"
}
```
配置文件位置：

- macOS/Linux: `~/.config/opencode/config.json`
- Windows: `%APPDATA%\opencode\config.json`


配置建議: 通過 API易 apiyi.com 平臺獲取 API Key，可以使用統一接口調用 Claude、GPT、Gemini 等主流模型，無需分別註冊多個服務商賬號。

## OpenCode 核心功能詳解

### 雙模式切換

OpenCode 提供兩種內置工作模式，按 `Tab` 鍵即可切換：

| 模式 | 功能 | 適用場景 | 
|---|---|---|
| Build 模式 | 完整讀寫權限，可修改文件 | 實際開發、代碼修改 | 
| Plan 模式 | 只讀模式，僅分析不修改 | 代碼審查、探索陌生代碼庫 | 

**Plan 模式特點**：

- 默認拒絕文件編輯操作
- 執行 bash 命令前需確認
- 適合理解代碼邏輯後再動手修改

### 文件引用語法

使用 `@` 符號引用特定文件，讓 AI 獲得更精準的上下文：

```
@src/components/Button.tsx 這個組件的 props 類型定義有問題，請幫我修復
```
### 常用命令

| 命令 | 功能 | 
|---|---|
| `/init` | 初始化項目，生成 AGENTS.md | 
| `/connect` | 連接或切換 AI 提供商 | 
| `/undo` | 撤銷上一次修改 | 
| `/redo` | 重做被撤銷的修改 | 
| `/share` | 生成對話分享鏈接 | 
| `/clear` | 清空當前會話 | 

### 自定義命令

OpenCode 支持創建自定義命令，將常用提示詞保存爲 Markdown 文件：

```
<！-- ~/.config/opencode/commands/review.md -->
請對當前文件進行代碼審查，關注以下方面：
1. 潛在的性能問題
2. 安全漏洞
3. 代碼可讀性
4. 最佳實踐遵循情況
```
保存後，在 OpenCode 中執行 `/review` 即可調用。

## OpenCode 進階功能

### GitHub 集成

OpenCode 可以直接集成到 GitHub 工作流中。在 PR 或 Issue 評論中使用 `/opencode` 或 `/oc` 觸發：

- **問題分析**：讓 OpenCode 解讀和分析 Issue
- **自動修復**：OpenCode 在新分支工作，完成後自動提交 PR
- **安全執行**：所有操作在 GitHub Actions Runner 中隔離運行

### LSP 集成

OpenCode 支持語言服務器協議（LSP），提供：

- 多語言代碼智能提示
- 實時錯誤診斷
- 自動文件變更監控

### MCP 協議支持

OpenCode 支持 Model Context Protocol（MCP），可以添加自定義的 MCP 服務器擴展功能邊界。

## OpenCode 使用技巧

### 高效工作流建議

| 場景 | 推薦做法 | 
|---|---|
| 探索新項目 | 先用 Plan 模式理解架構 | 
| 修復 Bug | 使用 `@`引用相關文件 | 
| 重構代碼 | 分步進行，每步用 `/undo`確認 | 
| 代碼審查 | 切換 Plan 模式，只讀分析 | 

### 最佳實踐

- **善用 Plan 模式**：在不確定時先用只讀模式探索，避免意外修改
- **精確引用文件**：使用- `@filename`給 AI 提供上下文，結果更準確
- **分步執行復雜任務**：將大任務拆解，每步確認後再繼續
- **定期使用 /init**：項目結構變化後重新初始化，保持上下文同步

## 常見問題

**Q1: OpenCode 支持哪些 AI 模型？**

OpenCode 支持主流的 AI 服務商，包括 OpenAI（GPT 系列）、Anthropic（Claude 系列）、Google（Gemini 系列）、AWS Bedrock、Groq、Azure OpenAI 等，也支持本地運行的開源模型。

**Q2: 如何同時使用多個模型進行對比測試？**

推薦使用 API易 apiyi.com 等聚合平臺，通過統一的 OpenAI 兼容接口調用不同模型，只需切換 model 參數即可快速對比 Claude、GPT、Gemini 的效果。

**Q3: OpenCode 的代碼會被髮送到雲端嗎？**

這取決於你選擇的 AI 提供商。如果使用本地模型，代碼完全不會離開你的電腦。使用雲端服務時，代碼會發送到對應的 AI 服務商進行處理，但 OpenCode 本身不存儲任何代碼數據。

**Q4: 如何快速開始測試？**

推薦使用支持多模型的 API 聚合平臺進行測試：

- 訪問 API易 apiyi.com 註冊賬號
- 獲取 API Key 和免費額度
- 按本文配置示例設置環境變量
- 運行 `opencode`開始使用

## 總結

OpenCode AI 編程助手的核心要點：

- **開源免費**：MIT 協議，7萬+ GitHub 星標，65萬+開發者信賴
- **多模型靈活**：支持 Claude、OpenAI、Gemini 等主流模型，可自由切換
- **隱私可控**：代碼不經 OpenCode 服務器，支持本地模型完全離線
- **高效易用**：終端原生體驗，雙模式切換，豐富的自定義能力

對於想要在終端中使用 AI 輔助編程的開發者，OpenCode 是目前最值得嘗試的開源方案。

推薦通過 API易 apiyi.com 快速體驗多模型切換能力，平臺提供免費額度和 OpenAI/Claude/Gemini 原生格式的統一接口。

## 參考資料


鏈接格式說明: 所有外鏈使用`資料名: domain.com`格式，方便複製但不可點擊跳轉，避免 SEO 權重流失。

- 
**OpenCode 官網**: 項目官方網站，提供安裝包下載和文檔- 鏈接: `opencode.ai`
- 說明: 獲取最新版本和官方教程
 
- 鏈接: 
- 
**OpenCode GitHub 倉庫**: 開源代碼和 Issue 討論- 鏈接: `github.com/opencode-ai/opencode`
- 說明: 查看源碼、提交 Bug 反饋
 
- 鏈接: 
- 
**OpenCode 官方文檔**: 詳細的配置和使用指南- 鏈接: `opencode.ai/docs`
- 說明: 深入瞭解高級功能和配置選項
 
- 鏈接: 
- 
**API易 開發者平臺**: 多模型 API 聚合服務- 鏈接: `apiyi.com`
- 說明: 獲取統一接口調用 Claude、GPT、Gemini 等模型
 
- 鏈接: 


作者: 技術團隊

技術交流: 歡迎在評論區討論，更多資料可訪問 API易 apiyi.com 技術社區

## Related Pages

- [[2026 OpenCode 教程：完整安裝、設定與配置指南 | NxCode]]
- [[OpenCode 完整指南：安裝、設定及建立可重用技能]]
- [[OpenCode AI 編碼助理完全入門指南：開源免費工具的力量 | LETWEBS 來網頁資訊 ─ 引領未來線上整合提供商]]
- [[opencode server,web两命令, --mDNS 参数的使用场景]]

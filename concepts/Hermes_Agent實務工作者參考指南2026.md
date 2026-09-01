---
title: Hermes Agent：實務工作者參考指南（2026）
type: framework
created: 2026-07-22T13:45
updated: 2026-07-22T13:45
tags: [Python, 非同步, scripting, TypeScript, typed, web, Markdown, 中文, Hermes Agent, AI Agent, 自我改進型 AI 代理, 跨平台訊息閘道, 供應商驗證, OAuth, 設定檔, 技能系統, source:browser-extension]
confidence: high
---

# Hermes Agent：實務工作者參考指南（2026）

# Hermes Agent：實務工作者參考指南（2026）

# Hermes Agent 實務工作者參考指南。這款由 Nous Research 推出的開放原始碼自我改進 AI 代理，涵蓋供應商驗證與 OAuth、設定檔、技能系統，以及如何將其作為跨平台訊息閘道執行。


重點摘要：Hermes Agent 是 Nous Research 推出的開源自我改進型 AI 代理程式。它可作為 CLI 執行，也能充當多平台訊息 gateway；它會將持久身分與長期記憶儲存在磁碟上，彙整可隨使用持續改進的 skills，並支援任何與 OpenAI 相容的 LLM 供應商——包括 Nous Portal、OpenRouter、Anthropic、GitHub Copilot、z.ai、Kimi、MiniMax、DeepSeek、Qwen Cloud、Hugging Face、Google、xAI/SuperGrok，以及您自行託管的端點。1219自 v0.14.0（2026年5月16日）起，Hermes 新增支援具備 grok-4.3 100萬 context 的 SuperGrok OAuth、供 OAuth 供應商使用且與 OpenAI 相容的本機 proxy（`hermes proxy`）、原生`x_search`、PyPI 安裝支援（此方式自 v0.19.0 起已棄用——目前支援的安裝方式為單行安裝程式）、延遲安裝相依套件、涵蓋 LINE 與 SimpleX Chat 的 22 個訊息平台、`/handoff`、寫入後的 LSP 語意診斷、統一的`video_generate`、透過 cua-driver 為非 Anthropic 供應商提供的`computer_use`、原生 Windows Beta 版，以及 12 項 P0／50 項 P1 問題結案。19對多數新使用者而言，最困難的環節是供應商驗證：Hermes 支援約 20 個一級供應商及自訂端點，並提供 3 種不同的驗證途徑（`.env`中的 API 金鑰、透過`hermes model`使用 OAuth，或在`config.yaml`中設定自訂端點）。驗證模型是首要掌握的重點——後續一切都取決於最終解析出的供應商。

**Hermes Agent 是完整的代理程式執行環境**，而非聊天介面的簡單包裝。它能讀取您的檔案系統、在沙箱後端執行指令、擷取網頁、產生子代理程式、執行排程 cron 工作，並透過單一 gateway 程序與 Telegram／Discord／Slack／WhatsApp／Signal／Email 通訊，還能從經驗中建立自己的 skills。1 CLI 是建構於 `run_agent.py` 對話迴圈之上的終端機 UI；gateway 則是長時間執行的程序，負責將訊息平台傳來的訊息導向同一個對話迴圈。3


Hermes 的一般用法與專家級用法，差別歸根究柢在於 5 套系統。掌握這些系統後，Hermes 就能讓您的工作效能倍增：

- **供應商解析**：驗證流程如何對應至 API 呼叫
- **設定階層**：- `config.yaml`+- `.env`+- `auth.json`+- `SOUL.md`+- `AGENTS.md`
- **工具與 toolset 系統**：代理程式能執行哪些操作，以及各平台如何限制其權限
- **Skills 系統**：由代理程式建立並持續演進的程序性記憶
- **Gateway、cron 與 profiles**：讓 Hermes 在您日常使用的平台上運作，而不只侷限於目前所在的介面

### 重點整理

- **供應商驗證有 3 種途徑，而非只有一種。**在- `.env`中設定 API 金鑰、透過- `hermes model`／- `hermes auth`使用 OAuth，或在- `config.yaml`中設定自訂端點。請選擇符合供應商的途徑，而非僅憑熟悉程度決定。
- **切換供應商只需一行指令。**- `hermes model`會以互動方式引導您設定每個支援的供應商，包括 OAuth 登入；- `/model provider:model`則可在工作階段途中切換，且不會遺失歷史記錄。- 2
- **使用者可編輯的設定介面由 2 個檔案構成。**- `~/.hermes/config.yaml`儲存設定，- `~/.hermes/.env`儲存機密資料。- `auth.json`、- `SOUL.md`、- `MEMORY.md`與- `skills/`皆由 Hermes 直接管理——您可以手動編輯- `SOUL.md`，其餘項目則由代理程式自行處理。- 4
- **Hermes 是 OpenClaw 的後繼者。**若要移轉，- `hermes claw migrate`可自動匯入超過 30 類狀態資料。- 5
- **服務品質取決於您的輔助模型。**視覺處理、網頁摘要、壓縮與記憶體寫回皆使用另一個輔助 LLM。預設會透過自動偵測選用 Gemini Flash（OpenRouter → Nous → Codex）——若上述服務皆未設定，這些功能會悄然降級，直到您將輔助欄位指向主要供應商為止。- 4

### v0.14 的變更

v0.14.0 並非著重於某項指標性功能，而是致力於降低設定門檻，同時擴大 Hermes 的執行環境。19 主要操作變更如下：

- **安裝與啟動更加輕量。**可透過 PyPI 執行- `pip install hermes-agent`，大型轉接器會在首次使用時才安裝，而啟動流程也會延後足夠多的工作，使冷啟動時間縮短約 19 秒。（v0.19.0 此後已棄用 pip 安裝——請參閱安裝。）
- **訂閱服務可轉換為本機 API 端點。**- `hermes proxy`可將 Claude Pro、ChatGPT Pro 與 SuperGrok 等採用 OAuth 的供應商，轉換為與 OpenAI 相容的本機端點，供 Codex、Aider、Cline 與 Continue 等工具使用。
- **Gateway 的觸及範圍進一步擴大。**LINE 與 SimpleX Chat 將平台總數提升至 22 個，Microsoft Teams 已完成端對端串接，Discord 預設啟用歷史記錄回填，而 Telegram／Discord 的- `clarify`提示現在會使用原生按鈕。
- **寫入時驗證更加完善。**編輯完成後，Hermes 可在下一輪互動前顯示每輪的檔案變更摘要與語言伺服器語意診斷，使其更接近以證據為本的代理程式工作方式。
- **桌面與媒體工具的支援範圍更廣。**非 Anthropic 供應商可透過 cua-driver 使用- `computer_use`，- `video_generate`已整合至可插拔後端架構，而- `vision_analyze`會將原始像素傳送至真正具備視覺能力的模型。

以下各節皆以 hermes-agent.nousresearch.com/docs 的上游文件，以及 github.com/NousResearch/hermes-agent 的原始碼樹狀結構為依據。每項事實陳述皆附有註腳，指向其出處的特定上游頁面。

### 選擇您的路徑

| 您的需求 | 前往此處 | 
|---|---|
| 安裝 Hermes | 安裝——單行安裝程式或手動步驟 | 
| 登入供應商 | 驗證與供應商——這正是您要找的章節 | 
| 在工作階段途中切換模型 | `hermes auth`指令，以及提供`/model`語法的自訂與自行託管端點 | 
| 執行本機 LLM | 自訂與自行託管端點——Ollama、vLLM、SGLang、llama.cpp、LM Studio | 
| 連接訊息平台 | 訊息 Gateway——Telegram、Discord、Slack、WhatsApp、Signal、Google Chat、LINE、SimpleX Chat（共 22 個） | 
| 撰寫或安裝 skill | Skills 系統——漸進式揭露 + skill 中心 | 
| 每項 CLI 指令的深入參考資料 | 請繼續閱讀——或直接前往 CLI 指令 | 

## Hermes 的運作方式：心智模型

Hermes 以單一對話迴圈為核心，任何進入點都能呼叫此迴圈。進入點包括 CLI（`cli.py`）、訊息 gateway（`gateway/run.py`）、用於編輯器整合的 ACP 介接器、批次執行器，以及 API 伺服器。3這些進入點最終都會呼叫 `run_agent.py` 中的 `AIAgent.run_conversation()`，其流程如下：

- 透過 `prompt_builder.py`，根據`SOUL.md`、`MEMORY.md`、`USER.md`、skills、context 檔案及工具指引建構系統提示3
- 透過 `runtime_provider.py`解析執行階段 provider——此步驟會選定您的驗證方式、基底 URL 及 API 模式3
- 使用下列 3 種 API 模式之一呼叫 provider：`chat_completions`、`codex_responses`或`anthropic_messages`3
- 透過 `model_tools.py`與中央工具登錄檔（`tools/registry.py`）分派傳回的所有工具呼叫3
- 持續迴圈，直到模型產生最終回覆，再將工作階段持久化至採用 FTS5 的 SQLite3

理解此迴圈至關重要，因為每項功能——personality、記憶、skills、壓縮、fallback——都會附加至其中一個階段。閱讀某個設定鍵並思考其用途時，答案通常是：「它是用來調整上述迴圈第 1、2、3 或 4 階段的控制項。」

**跨平台核心。**單一 `AIAgent` 類別即可服務 CLI、gateway、ACP、批次作業及 API 伺服器。平台差異存在於進入點，而非 agent 本身。3因此，相同的斜線命令能同時在終端機與 Telegram 中運作——它們都由 `hermes_cli/commands.py` 內共用的 `COMMAND_REGISTRY` 分派。6

**目錄結構就是系統本身。**Hermes 將所有內容儲存於 `~/.hermes/`（非預設 profiles 則位於 `$HERMES_HOME`）：4

```
~/.hermes/
├── config.yaml        # Settings (model, terminal, TTS, compression, etc.)
├── .env               # API keys and secrets
├── auth.json          # OAuth provider credentials (Nous Portal, Codex, Anthropic)
├── SOUL.md            # Primary agent identity (slot #1 in system prompt)
├── memories/          # Persistent memory (MEMORY.md, USER.md)
├── skills/            # Bundled + agent-created + hub-installed skills
├── cron/              # Scheduled jobs
├── sessions/          # Gateway session state
└── logs/              # agent.log, gateway.log, errors.log (secrets auto-redacted)
```
上述每個檔案各司其職，彼此不會重疊。若想知道「Hermes 將 X 儲存在哪裡」，答案就在其中。

## v0.19.0（Quicksilver Release）有哪些新功能

Hermes Agent v0.19.0（標籤 `v2026.7.20`，2026年7月20日）以信使之神自身的速度命名：本次版本的主軸是全面提升回應速度，所有平台的首輪首個 token 等候時間皆縮短約 80%。圍繞此主軸推出的功能還包括終端機帳務管理、密碼管理器密鑰來源、預設啟用智慧核准、可觀測的 subagents，以及不受當機影響的回覆傳送機制。自 v0.18.0 以來的開發規模更創下專案新高：約 2,245 次提交、約 1,065 個合併的 PR、約 3,300 個已關閉的議題，以及超過 450 位社群貢獻者。23

- **在任何平台上，首個 token 都快約 80%。**從冷啟動送出到分派的時間，在 CLI、gateway、TUI、桌面版及 cron 中均由約 4.3 秒降至約 0.9 秒——Discord 功能偵測已移出關鍵路徑；遇到已知非 Ollama provider 時會略過 Ollama 探測；agent 初始化階段也不再執行阻塞作業。感知延遲亦經過專門改善：推理模型現在預設會即時串流其思考過程（- `display.show_reasoning`為 ON），回覆方塊也改為逐 token 繪製，而非逐行繪製。- 23
- **桌面版與 TUI 的算繪革新。**桌面應用程式經歷約 20 個 PR 的速度大幅改造：串流 Markdown 分割器藉由增量區塊詞法分析，CPU 使用量減少 14 倍；檢閱窗格採用虛擬化差異檢視；大型逐字稿的工作階段切換更加迅速；側邊欄與工具列也不再隨每個 token 重新算繪。TUI 現在則會依區塊增量算繪串流 Markdown。- 23
- **pip 與 Homebrew 安裝方式已淘汰。**這兩種途徑現已標示為「不受支援的舊版」安裝方式——所有介面都會發出警告，但不會阻止使用，並已規劃停止透過 PyPI/Homebrew 發布。官方支援的途徑是一行式安裝程式；若先前透過 pip 或 brew 安裝，請立即規劃移轉。- 23
- **密鑰可取自密碼管理器。**全新的可插拔- `SecretSource`介面會在載入時，從 Bitwarden 與 1Password（- `op://`參照）擷取密鑰；可同時啟用多個保存庫，並提供明確且固定的優先順序、衝突警告，以及逐變數的來源追蹤——API 金鑰不必再存放於純文字- `.env`中。未來的保存庫 provider 也能以 plugins 形式直接加入。- 23
- **智慧核准現已成為預設選項。**當 Hermes 想執行遭標記的命令時，獨立的 LLM 檢閱者會進行評估，不再每次都提示您——而且每項裁決僅適用於該次確切命令。使用者定義的- **deny rules**即使在 YOLO 模式下也會封鎖符合條件的命令；- `/deny <reason>`會將您的拒絕理由傳回，讓 agent 修正方向；plugin 的- `pre_tool_call`核准動作（重新加入 rule keys 後再次推出）則會將工具呼叫升級為由人員把關。- 23
- **終端機帳務管理：**無須離開終端機，即可管理 Nous Portal 方案——查看方案與剩餘額度、準確預覽升級費用或降級生效時間，並套用變更且可復原。桌面應用程式也新增了對應的帳務設定分頁。- `/subscription`與- `/topup`。- 23
- **即時查看 subagents 的工作，完成的答案永不遺失。**- `delegate_task`分派後會傳回即時逐字稿檔案，subagents 一啟動即可使用- `tail -f`追蹤——每個工具呼叫、結果及串流回覆都會記錄在各 child 專屬、易於閱讀的日誌中。背景委派即使重新啟動也能保留完成狀態；gateway 的最終回覆則會記錄於- `state.db`內的- **傳送義務帳本**。若 gateway 在傳送途中終止，便會於下次啟動時重新傳送。- `max_async_children`設定選項已- **淘汰**，改由統一的委派並行上限取代。- 23
- **單一 gateway，多個 profiles。**單一多工 gateway 可共用同一個機器人 token，並將特定 guild、頻道或討論串路由至不同 profiles——各自擁有完全隔離的設定、skills、記憶及密鑰——亦可透過- `GATEWAY_MULTIPLEX_PROFILES`覆寫。路由索引已移至- `state.db`；- `sessions.json`現為選用的舊版鏡像。- 23
- **Providers 與模型更新浪潮。**Fireworks AI 獲得第一級支援（包括成本估算，且在 provider 選擇器中位居第 2），DeepInfra 與 Upstage Solar 也同步加入。模型目錄新增 GPT-5.6（Sol/Terra/Luna + Pro，完整串接端對端流程）、grok-4.5（正式推出）、kimi-k3（kimi-k2.x 已退役），以及完整串接的 Claude Sonnet 5。每個 provider 可使用- `enabled: false`旗標，並透過- `excluded_providers`設定，從- `/model`選擇器與解析流程中徹底移除未使用的 providers。- 23
- **推理強度成為可調旋鈕。**所有介面均新增- `max`與- `ultra`強度層級，並支援設定中的逐模型覆寫、MoA presets 中的逐 slot 強度（advisors 深入思考，synthesizer 維持快速）、輔助模型的逐任務強度，以及 CLI 中僅限當前工作階段的- `/reasoning`。- 23
- **CLI 與 MCP 介面。**- `hermes sessions export`可匯出 Markdown、Quarto、HTML、僅提示內容及 Hugging Face trace 格式，並提供選用的- `--redact`清除功能；- `/model --once`可單次覆寫一輪模型；斜線 skill 呼叫可堆疊使用（- `/skill-a /skill-b do XYZ`）；- `--safe-mode`有助於疑難排解；- `hermes config get`/- `unset`補齊設定管理功能；- `hermes serve`成為真正的無介面後端；MCP 工具則採用- `mcp__server__tool`命名慣例。- 23

若要從 v0.18.x 升級，應優先留意 2 項變更：透過 pip 或 Homebrew 安裝現會顯示「不受支援的舊版」警告（請改用一行式安裝程式），而 `max_async_children` 也已淘汰，改由統一的委派並行上限取代。其餘變更皆為新增功能——最值得升級的理由包括首輪延遲縮短約 80%、智慧核准，以及讓完成答案不受當機影響的傳送帳本。

## v0.18.0 的新功能（The Judgment Release）

Hermes Agent v0.18.0（標籤 `v2026.7.1`，2026年7月1日）以「判斷」為名：agent 會驗證自己的成果，不再只是宣稱成功；您也能實際檢視整合式推理過程。此版本還清空了所有 P0/P1 待辦事項——在 12 天內解決約 692 個最高優先級項目。22

- **將 Mixture-of-Agents 提升為第一級模型。**現在，您可以像選擇其他模型一樣，在所有介面中選用 MoA，並查看整合式推理過程。每個參考模型的完整輸出都會呈現為獨立的標示區塊，並即時串流答案——您能親眼觀察模型群如何思考，而不是只得到內容不透明的合併答案。- 22
- `/goal`的完成契約。- 22
- `/learn`——將任何描述轉化為 skill。- 22
- `/journey`時間軸。- 22
- **背景 subagent 扇出執行。**可委派多項任務同時執行，且不會阻塞對話——v0.17.0 的單一背景 subagent 如今擴展為一支團隊。- 22
- **桌面版 Projects。**提供第一級程式開發 Projects，採用 project/repo/lane 組織模型。- 22
- **可縮減至零的 gateway。**gateway 可在閒置時休眠，並協調流量排空以實現無縫部署——對於將 Hermes 作為常駐服務執行的使用者而言，意義重大。- 22
- **支援 Google Vertex AI。**可透過 GCP 服務帳戶存取 Gemini，並自動重新整理 OAuth2 token，正式納入 provider 目錄。- 22
- `/prompt`編輯器指令。- `$EDITOR`編寫多行提示，不必再受限於單行輸入。- 22

若從 v0.17.x 升級，此版本不會破壞 CLI。最值得升級的功能包括完成契約（能自行驗證的目標）、具備可檢視模型群的第一級 MoA，以及用於擷取 skill 的 `/learn`。

## v0.17.0 的新功能（The Reach Release）

Hermes Agent v0.17.0（標籤 `v2026.6.19`，2026年6月19日）以 agent 如今觸及的廣度為名——新增訊息通道、模型 provider，以及更深入的桌面版與 dashboard 控制功能。此版本在 v0.16.x 的基礎上擴充，CLI 介面維持不變。21

- **新增訊息通道。**iMessage 現在可透過- **Photon Spectrum**運作，- **無須 Mac relay**（使用裝置代碼 OAuth、- `hermes photon login`）；- **WhatsApp Business Cloud API**成為 Meta 官方 adapter，取代原有的 bridge process 要求；- **SimpleX**新增群組、原生附件、文字批次處理及自動接受功能；- **Raft**也以內建 platform plugin 之姿加入，採用以隱私契約為基礎的喚醒通道設計。- 21
- **新增模型與 provider。**目錄新增- `z-ai/glm-5.2`（1M context）、- `anthropic/claude-fable-5`、- `laguna-m.1`、- `nemotron-3-ultra`與- `grok-composer-2.5-fast`（透過 xAI OAuth 使用的 Cursor 模型，200k context）。xAI 的預設模型已改為- `grok-build-0.1`，Anthropic adaptive 模型現在也遵循現代 thinking contract（絕不傳送- `reasoning`欄位）。- 21
- **桌面版與 dashboard。**桌面版新增- **背景 subagent**，透過即時「watch-windows」串流委派活動（- `delegate_task(background=true)`），並提供 Composer 模型選擇器、可重新綁定的鍵盤快速鍵、原生作業系統通知、各 thread 獨立的 composer 草稿、VS Code Marketplace 主題，以及日文與繁體中文介面。dashboard 則新增- **完整的 profile 建立工具**（無須編輯- `config.yaml`即可設定 model/skills/MCPs）、全域 profile 切換器、經過重新設計且具備安全掃描功能的- **Skills Hub**、- **Automation Blueprints**（適用於表單、slash command、對話與文件的參數化範本），以及安全登入機制；位於 OAuth gate 後方時會傳回 401。- 21
- **Skills 與工具。**- `image_generate`現在不僅能從頭建立圖片，也能在所有支援的圖片 provider 上- **編輯及轉換**來源圖片；- `memory`工具新增- `operations`陣列，可在單次呼叫中以不可分割的批次方式新增、取代或移除內容；新的- `simplify-code`skill 會執行由 3 個 agent 並行處理的檢閱與清理流程，並以 Chesterton’s-Fence 風險等級把關；布林值- `write_approval`則取代了三態的- `write_mode`。- 21
- **架構。**背景 subagent 會立即傳回 handle，並將結果作為新的 turn 重新帶入；- **MCP elicitation handler**可在 tool call 進行期間要求確認，較晚連線的 MCP 工具則會在 turn 之間公開（可安全快取）；cron 改為可插拔的- **CronScheduler**，並支援 Chronos 代管 cron provider；新的- **Managed scope**（- `/etc/hermes`）可讓管理員固定使用者無法修改的設定，另提供 Gateway-Gateway relay，以支援多 gateway 拓撲。- 21
- **新增指令。**- `/version`、- `/billing`（互動式終端機帳務）、- `hermes photon login`（iMessage auth），以及- `hermes curator run --consolidate`——consolidation 現在改為選用，因此例行的背景整理不會耗用任何 token。- 21
- **安全性。**v0.17.0 修補 shell escape denylist 繞過問題；缺少 approval module 或自有政策 gateway adapter 時，改為採取封閉式失敗；清理 cron 工作指令碼子行程的環境；遮蔽 request debug dump 中的秘密資訊；掃描 MCP stdio 設定中的資料外洩模式；並升級 urllib3 與 PyJWT，以排除 CVE。- 21

若從 v0.16.x 升級，此版本不會破壞 CLI；它只是在同一個 agent 周邊加入新的通道、模型與介面。無須 relay 的 iMessage、官方 WhatsApp adapter，以及供管理員使用的 **Managed scope**，是本次升級的重點。

## v0.16.0 的新功能（The Surface Release）

Hermes Agent v0.16.0（標籤 `v2026.6.5`，2026年6月5日）以它為 CLI 優先的 agent 帶來全新介面而得名。最大亮點是 Hermes 不再僅限於終端機。20

- **原生桌面應用程式。**Hermes Desktop 是適用於 macOS、Linux 與 Windows 的全新 Electron 應用程式，支援一鍵安裝與應用程式內自動更新。它提供串流聊天視窗、檔案拖放、從剪貼簿貼上圖片、- `Cmd+K`選單、支援封存與搜尋的 session 清單，以及狀態列模型選擇器。它能透過安全的 WebSocket 連線至遠端 Hermes gateway，並以 OAuth 或使用者名稱與密碼進行驗證；還支援各 profile 獨立的遠端主機，以及透過跨 profile 的- `@session`參照連結多個並行 profile session。桌面介面亦透過強型別 i18n 層（- `display.language`；英文仍為預設語言）提供完整的簡體中文（简体中文）翻譯。- 20
- **瀏覽器管理面板。**本機 web dashboard 已從狀態檢視畫面升級為完整的管理面板，包含具備啟用／停用切換功能的 MCP 目錄、憑證管理、webhook 與 hook 建立功能、記憶設定、gateway 控制，以及提供更新前檢查與一鍵 Debug Share 的 System 頁面。新的 Channels 頁面可直接從瀏覽器設定所有 gateway 訊息平台（Telegram、Discord、Slack 等）。驗證機制現在可插拔，包括使用者名稱／密碼登入、通用的自行代管 OIDC provider、用於自行代管 OAuth client 的- `hermes dashboard register`，以及 refresh token session rotation。- 20
- **新增 CLI 與 slash command。**- `/undo [N]`可回退最近 N 個使用者 turn，並提供預先填入與軟刪除功能；此指令可在 CLI、TUI 與各訊息平台使用。新增可設定的預設介面（- `cli`或- `tui`），並可使用- `--cli`覆寫；TUI 則新增統一的- `/model`指令與 Sessions overlay。- `hermes portal`是 Nous Portal 新手設定流程中易於理解的別名，首次執行時新增 Quick Setup 與 Full Setup 路徑，另提供兩項診斷功能：- `hermes prompt-size`與- `hermes sessions optimize`。- 20
- **新增模型與 provider。**選擇器新增- `deepseek-v4-flash`、- `MiniMax-M3`（1M context、原生 MiniMax provider）、- `qwen3.7-plus`（Nous + OpenRouter）與- `gemini-3.5-flash`（Gemini OAuth + API key）。第一級 xAI Grok OAuth provider 也加入桌面啟動器；模型選擇器在所有介面上都改為模糊搜尋；多 endpoint provider 會歸在同一列；目錄重新整理頻率則從每日一次改為每小時一次。- 20
- **更精簡的 skills 與漸進式揭露。**預設 skill 組合移除重複及已失效的 skills（Spotify 移至原生 plugin，Linear 改用- `hermes mcp install linear`，另移除數個過時項目），將更多 skills 改為選用，並新增- `environments:`frontmatter 關聯性 gate（- `kanban`／- `docker`／- `s6`），在使用者提出要求前，不會讓特定情境的 skills 出現在索引中。- `NVIDIA/skills`現在與 OpenAI、Anthropic 及 HuggingFace 一同列為 Skills Hub 的預設信任 tap。MCP 與 plugin 工具新增漸進式（範圍限定）工具揭露功能；此外，先前 MCP 在未取得 token 時仍錯誤回報 OAuth 成功的問題也已修正。- 20
- **安全性。**v0.16.0 固定使用已修補的 Starlette（≥1.0.1），以處理- **CVE-2026-48710**（BadHost）；在非同步路徑中，將 SSRF URL 檢查移出 event loop；從子行程環境中移除 Bedrock inference bearer token；將- `bws_cache.json`加入檔案安全讀取防護；將- `docker restart/stop/kill`加入危險模式清單；並清理經審查 skill 內容中的不可見 Unicode 字元。此版本關閉了 2 個 P0 與 62 個 P1 問題，其中 16 個標記為安全性問題。- 20

若從 v0.15.x 升級，這些變更都不會對 CLI 本身造成破壞性影響；它們只是在同一個 agent 周邊增添介面與 provider。若您希望讓不使用終端機的使用者也能操作 Hermes，或要從瀏覽器管理遠端 gateway，桌面應用程式與管理面板便是升級的主要理由。

## 安裝

單行安裝程式是官方支援的安裝方式。它會處理Python、uv、Node.js、ripgrep、ffmpeg、複製儲存庫、虛擬環境，以及全域`hermes`指令。7

```
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

自v0.19.0起，已不建議使用pip和Homebrew安裝。v0.14.0推出的PyPI套件（`pip install hermes-agent`）與Homebrew公式，如今均標示為「不受支援的舊版」安裝方式。Hermes偵測到其中任一方式時，所有介面都會顯示警告（但不會阻擋執行），並計畫停止透過PyPI/Homebrew發布。若先前使用pip或brew安裝，請改用上述安裝程式。23

支援Linux、macOS、WSL2及Android/Termux（安裝程式會自動偵測Termux，並改用通過測試的Android套件組合）。7 v0.14.0透過PowerShell安裝程式新增仍處於早期測試階段的原生Windows支援；但在Windows安裝方式更加成熟之前，正式環境仍建議使用較穩妥的WSL2。19

完成後：

```
source ~/.bashrc    # or ~/.zshrc
hermes              # Start chatting
```
唯一的先決條件是`git`。安裝程式會透過`uv`自動佈建Python 3.11（無須sudo權限）、Node.js v22（供瀏覽器自動化及WhatsApp橋接器使用）、ripgrep與ffmpeg。7

### 驗證安裝

```
hermes version      # Check version
hermes doctor       # Diagnose config/dependency issues
hermes status       # Show current configuration + auth state
hermes dump         # Copy-pasteable setup summary for debugging
```
`hermes doctor`會明確指出缺少哪些項目，以及修正方式。7 尋求協助時，可執行`hermes dump`並將診斷結果貼到GitHub議題或Discord討論串。它會以純文字摘要呈現完整設定，並遮蔽其中的機密資訊。8

### 手動安裝

若需要完整掌控安裝流程，例如自訂Python版本、指定額外套件或整合Nix/NixOS，上游安裝指南提供了逐步操作說明。7 以下是可搭配`uv pip install -e ".[<extras>]"`組合使用的主要選用額外套件：

| 額外套件 | 新增功能 | 
|---|---|
| `all` | 下列所有功能 | 
| `messaging` | Telegram與Discord gateway | 
| `cron` | Cron運算式剖析 | 
| `cli` | 設定精靈的終端機選單介面 | 
| `modal` | Modal雲端執行後端 | 
| `voice` | CLI麥克風輸入與音訊播放 | 
| `tts-premium` | ElevenLabs進階語音 | 
| `honcho` | AI原生記憶（Honcho整合） | 
| `mcp` | Model Context Protocol支援 | 
| `homeassistant` | Home Assistant整合 | 
| `acp` | ACP編輯器整合支援 | 
| `slack` | Slack訊息傳送 | 
| `pty` | PTY終端機支援（互動式CLI工具） | 
| `dev` | pytest與測試公用工具 | 
| `termux` | 通過測試的Android套件組合（包含 `cron`、`cli`、`pty`、`mcp`、`honcho`、`acp`） | 

**Termux的安裝指令有所不同**——它使用帶有約束檔案的`pip`，而非`uv pip`：

```
python -m pip install -e ".[termux]" -c constraints-termux.txt
```
這是因為Android上的`.[all]`會透過`voice`額外套件引入`faster-whisper`，而後者依賴尚未針對Android發布的`ctranslate2`wheel套件。7

## 驗證與供應商

Hermes 支援約22個一級供應商及自訂端點（v0.19.0 新增 Fireworks AI、DeepInfra 與 Upstage Solar），並提供3種不同的驗證路徑。以下按路徑整理完整的驗證方式，方便您找到符合現有條件的選項。

### 3種驗證路徑

Hermes 中的每個供應商都採用以下3種驗證模式之一：

**路徑1—將 API 金鑰存入  .env。** 將金鑰放入 

`~/.hermes/.env`，Hermes 會在啟動時讀取。OpenRouter、AI Gateway、z.ai/GLM、Kimi/Moonshot、MiniMax（含 MiniMax China）、Alibaba Cloud/DashScope、Kilo Code、OpenCode Zen、OpenCode Go、DeepSeek、Hugging Face、Google/Gemini，以及大多數第三方供應商皆採用此方式。2自 v0.19.0 起，金鑰不再必須存放於純文字檔案：可插拔的

`SecretSource` 介面能在載入時從 Bitwarden 或 1Password（`op://` 參照）擷取機密資料，且可同時啟用多個密碼庫，提供明確固定的優先順序、衝突警告及個別變數的來源追蹤；`.env` 則仍作為後備方案。（這與 v0.15.0 的 Bitwarden Secrets Manager 啟動權杖不同；後者以單一權杖集中管理供應商金鑰。`SecretSource` 直接取代純文字檔案本身，未來的密碼庫供應商也能以外掛形式加入。）23

**路徑2—透過  hermes model 或 hermes auth 使用 OAuth。** 此方式會啟動裝置代碼流程、開啟瀏覽器，並將憑證儲存於 

`~/.hermes/auth.json`（也能從 Claude Code 或 Codex CLI 等工具匯入現有憑證）。Nous Portal、OpenAI Codex（ChatGPT 帳戶）、GitHub Copilot 與 Anthropic（Claude Pro/Max）皆採用此方式。2

**路徑3—在  config.yaml 中設定自訂端點。** 適用於任何與 OpenAI 相容的 API，包括 Ollama、vLLM、SGLang、llama.cpp、LM Studio、LiteLLM proxy、Together AI、Groq、Azure OpenAI，或自行託管的伺服器。透過 

`hermes model → Custom endpoint` 設定一次後，便會永久儲存至 `config.yaml`。2

### 完整供應商對照表

以下是一級供應商的完整清單，以及各自確切的設定流程。2

| 供應商 | 驗證路徑 | 設定方式 | 
|---|---|---|
| Nous Portal | OAuth | `hermes model`（OAuth 登入，採訂閱制） | 
| OpenAI Codex | OAuth | `hermes model`（ChatGPT 裝置代碼，使用 Codex 模型） | 
| GitHub Copilot | OAuth 或權杖 | `hermes model`（OAuth 裝置代碼），或`COPILOT_GITHUB_TOKEN`/`GH_TOKEN`/`gh auth token` | 
| GitHub Copilot ACP | 本機子程序 | `hermes model`（PATH 中須有`copilot`CLI，並執行`copilot login`） | 
| Anthropic | OAuth 或 API 金鑰 | `hermes model`（優先使用 Claude Code 憑證），或設定`ANTHROPIC_API_KEY`，或使用`ANTHROPIC_TOKEN`設定權杖 | 
| OpenRouter | API 金鑰 | 在 `~/.hermes/.env`中設定`OPENROUTER_API_KEY` | 
| AI Gateway (Vercel) | API 金鑰 | 在 `~/.hermes/.env`中設定`AI_GATEWAY_API_KEY`（供應商：`ai-gateway`） | 
| z.ai / GLM (ZhipuAI) | API 金鑰 | 在 `~/.hermes/.env`中設定`GLM_API_KEY`（供應商：`zai`） | 
| Kimi / Moonshot | API 金鑰 | 在 `~/.hermes/.env`中設定`KIMI_API_KEY`（供應商：`kimi-coding`）。v0.19.0 將 kimi-k3 加入目錄（kimi-k2.x 已退役）。23 | 
| MiniMax（全球） | API 金鑰 | 在 `~/.hermes/.env`中設定`MINIMAX_API_KEY`（供應商：`minimax`） | 
| MiniMax China | API 金鑰 | 在 `~/.hermes/.env`中設定`MINIMAX_CN_API_KEY`（供應商：`minimax-cn`） | 
| Alibaba Cloud (Qwen) | API 金鑰 | 在 `~/.hermes/.env`中設定`DASHSCOPE_API_KEY`（供應商：`alibaba`，別名：`dashscope`、`qwen`） | 
| Kilo Code | API 金鑰 | 在 `~/.hermes/.env`中設定`KILOCODE_API_KEY`（供應商：`kilocode`） | 
| OpenCode Zen | API 金鑰 | 在 `~/.hermes/.env`中設定`OPENCODE_ZEN_API_KEY`（供應商：`opencode-zen`） | 
| OpenCode Go | API 金鑰 | 在 `~/.hermes/.env`中設定`OPENCODE_GO_API_KEY`（供應商：`opencode-go`） | 
| DeepSeek | API 金鑰 | 在 `~/.hermes/.env`中設定`DEEPSEEK_API_KEY`（供應商：`deepseek`） | 
| Hugging Face | API 金鑰 | 在 `~/.hermes/.env`中設定`HF_TOKEN`（供應商：`huggingface`，別名：`hf`） | 
| Google / Gemini | API 金鑰 | 在 `~/.hermes/.env`中設定`GOOGLE_API_KEY`或`GEMINI_API_KEY`（供應商：`gemini`） | 
| Fireworks AI | API 金鑰 | 一級供應商，模型選擇器支援成本估算與快取價格欄位，並已提升至供應商選擇器的第2順位。v0.19.0 新增。 23 | 
| DeepInfra | API 金鑰 | 一級供應商，具備經過強化的整合。v0.19.0 新增。 23 | 
| Upstage Solar | API 金鑰 | 一級供應商。v0.19.0 新增。 23 | 
| xAI (Grok) | 原生供應商 / SuperGrok OAuth | 一級供應商，提供直接 API 存取及模型目錄（v0.9.0+）。v0.14.0 新增 SuperGrok OAuth，並將具備權限之帳戶的 grok-4.3 context window 提升至1M。 21619v0.17.0 新增`grok-composer-2.5-fast`（透過 xAI OAuth 使用 Cursor 的模型，200k context），並將 xAI 預設模型改為`grok-build-0.1`。21v0.19.0 將目錄中的 grok-4.5 升為正式可用版本。23 | 
| xAI Custom Voices | API 金鑰 | 支援語音複製的 TTS 供應商。v0.13.0 新增；請在 `config.yaml`的`tts:`下設定，並於`.env`提供 xAI 金鑰。18 | 
| Xiaomi MiMo | 原生供應商 | 一級供應商，提供設定精靈與模型目錄。Nous Portal 為輔助工作免費提供 MiMo v2 Pro（v0.9.0+）。 1615 | 
| Google AI Studio | API 金鑰 | 在 `~/.hermes/.env`中設定`GOOGLE_API_KEY`或`GEMINI_API_KEY`。可直接存取 Gemini，並透過 models.dev 登錄檔自動偵測 context 長度（v0.8.0+）。15 | 
| Qwen Cloud | OAuth | 支援入口網站請求的 OAuth 供應商（v0.8.0+）。此供應商在 v0.14.0 從 Alibaba Cloud 更名為 Qwen Cloud；現有設定鍵仍可繼續使用。 1519 | 
| 自訂端點 | config.yaml | `hermes model`→ “Custom endpoint”（儲存於`config.yaml`） | 

自 v0.19.0 起，還能排除不使用的供應商：個別供應商的 `enabled: false` 旗標及 `excluded_providers` 設定鍵，可將其從 `/model` 選擇器和內建供應商解析流程中移除。23

### Anthropic：3種驗證方式

Anthropic 值得另闢一節說明，因為 Hermes 支援3種不同的 Claude 存取路徑，選對方式至關重要。依據上游文件：2

```
# Method 1: API key (pay-per-token)
export ANTHROPIC_API_KEY=***
hermes chat --provider anthropic --model claude-sonnet-4-6
# Method 2: OAuth through hermes model (preferred)
# Uses Claude Code's credential store when available
hermes model
# Method 3: Manual setup-token (fallback/legacy)
export ANTHROPIC_TOKEN=***
hermes chat --provider anthropic
# Auto-detect Claude Code credentials
hermes chat --provider anthropic   # reads Claude Code files automatically
```
透過 `hermes model` 選擇 Anthropic OAuth 時，Hermes 會優先使用 Claude Code 自己的憑證儲存區，而非將權杖複製到 `~/.hermes/.env`。如此可讓能夠重新整理的 Claude 憑證繼續保持該能力。2 若同一台機器已在使用 Claude Code，這是最簡潔的做法。

若要在 `config.yaml` 中永久指定 Anthropic：

```
model:
  provider: "anthropic"
  default: "claude-sonnet-4-6"
```
`--provider claude` 與 `--provider claude-code` 也可作為 `--provider anthropic` 的簡寫。2

### GitHub Copilot：2種模式

Copilot 支援2種模式：直接使用 Copilot API（建議）及 Copilot ACP（將本機 Copilot CLI 啟動為子程序）。2

```
# Direct Copilot API
hermes chat --provider copilot --model gpt-5.4
# Copilot ACP (requires the Copilot CLI in PATH + an existing copilot login)
hermes chat --provider copilot-acp --model copilot-acp
```
依上游文件，驗證會按以下順序檢查：2
1. `COPILOT_GITHUB_TOKEN` 環境變數
2. `GH_TOKEN` 環境變數
3. `GITHUB_TOKEN` 環境變數
4. `gh auth token` CLI 後備方式
5. 透過 `hermes model` 使用 OAuth 裝置代碼登入

**權杖類型很重要。** Copilot API 不支援傳統 Personal Access Token（`ghp_*`）。支援的類型包括 OAuth 權杖（`gho_*`）、細粒度 PAT（具備 `Copilot Requests` 權限的 `github_pat_*`），以及 GitHub App 權杖（`ghu_*`）。若 `gh auth token` 傳回 `ghp_*` 權杖，請改用 `hermes model` 透過 OAuth 驗證。2

### 中國 AI 供應商（一級支援）

Hermes 內建支援 z.ai/GLM、Kimi/Moonshot、MiniMax（全球與中國端點）及 Alibaba Cloud，並為其提供專用供應商 ID。2

```
# z.ai / ZhipuAI GLM
hermes chat --provider zai --model glm-5                 # Requires: GLM_API_KEY
# Kimi / Moonshot AI
hermes chat --provider kimi-coding --model kimi-for-coding   # Requires: KIMI_API_KEY
# MiniMax (global)
hermes chat --provider minimax --model MiniMax-M2.7          # Requires: MINIMAX_API_KEY
# MiniMax (China)
hermes chat --provider minimax-cn --model MiniMax-M2.7       # Requires: MINIMAX_CN_API_KEY
# Alibaba Cloud / DashScope (Qwen)
hermes chat --provider alibaba --model qwen3.5-plus          # Requires: DASHSCOPE_API_KEY
```
您可以使用 `GLM_BASE_URL`、`KIMI_BASE_URL`、`MINIMAX_BASE_URL`、`MINIMAX_CN_BASE_URL` 或 `DASHSCOPE_BASE_URL` 環境變數覆寫基礎 URL。2

**Z.AI 會自動偵測端點。** 使用 z.ai/GLM 供應商時，Hermes 會探測多個端點（全球、中國及程式開發版本），找出可接受您 API 金鑰的端點。可用端點會自動快取，因此多數使用者不必設定 `GLM_BASE_URL`。2

**xAI (Grok) 會自動啟用提示快取。** 當基礎 URL 包含 `x.ai` 時，Hermes 會在每個請求中傳送 `x-grok-conv-id` 標頭，讓同一對話工作階段的請求路由至相同伺服器，藉此重複使用已快取的系統提示與歷史記錄。2 此流程全自動，無須設定。

`hermes auth` 指令

`hermes auth` 是管理憑證集區與 OAuth 憑證的指令。6

```
hermes auth                              # Interactive wizard
hermes auth list                         # Show all credential pools
hermes auth list openrouter              # Show one provider's pool
hermes auth add openrouter --api-key sk-or-v1-xxx
hermes auth add anthropic --type oauth
hermes auth remove openrouter 2          # Remove by index
hermes auth reset openrouter             # Clear cooldowns
```
憑證集區可為相同供應商輪替多個 API 金鑰或 OAuth 權杖，適合在不變更程式碼的情況下，將速率限制分散至多組金鑰。6 舊版 `hermes login` / `hermes logout` 指令已移除；請改用 `hermes auth`。6

### 自訂與自行託管的端點

Hermes 可搭配任何與 OpenAI 相容的 API 端點使用。只要伺服器實作 `/v1/chat/completions`，即可讓 Hermes 指向該端點。2

**互動式設定（建議）：**

```
hermes model
# Select "Custom endpoint (self-hosted / VLLM / etc.)"
# Enter: API base URL, API key, Model name
```
**手動設定  config.yaml：**

```
model:
  default: your-model-name
  provider: custom
  base_url: http://localhost:8000/v1
  api_key: your-key-or-leave-empty-for-local
```
兩種方式都會永久儲存至 `config.yaml`；此檔案是主要模型、供應商及基礎 URL 的唯一真實來源。2 舊版環境變數 `OPENAI_BASE_URL` 與 `LLM_MODEL` **已不再用於讀取主要模型設定**；請使用 `hermes model`，或直接編輯 `config.yaml`。2（`OPENAI_BASE_URL` + `OPENAI_API_KEY` 仍會作為輔助 `provider: "main"` 路由路徑的後備設定；若正在該處使用，切勿貿然刪除。）4

**在工作階段中切換自訂端點：**

```
/model custom:qwen-2.5             # Custom endpoint with explicit model
/model custom                      # Auto-detect the model from the endpoint
/model custom:local:qwen-2.5       # Named custom provider "local"
/model custom:work:llama3          # Named custom provider "work"
/model openrouter:claude-sonnet-4  # Back to a cloud provider
```
`/model custom`（僅輸入此指令，不附模型名稱）會查詢端點的 `/v1/models` API；若恰好只載入1個模型，便會自動選取。這對僅執行單一模型的本機伺服器相當實用。2

### 本機 LLM 伺服器（設定範本）

上游文件提供 Ollama、vLLM、SGLang、llama.cpp 與 LM Studio 的完整設定指南。以下列出實際需要執行的主要指令。每組指令都能建立可供 Hermes 指向的正常運作端點。2

**Ollama**—最簡單的本機方案，無須設定：

```
ollama pull qwen2.5-coder:32b
OLLAMA_CONTEXT_LENGTH=32768 ollama serve   # Raise from 4k default
hermes model   # Custom endpoint → http://localhost:11434/v1 → qwen2.5-coder:32b
```
**Ollama 的關鍵陷阱：** Ollama 預設的 context 長度很低（VRAM 低於24GB時為4,096個權杖）。您必須透過 `OLLAMA_CONTEXT_LENGTH` 或 Modelfile 提高限制；與 OpenAI 相容的 API **不接受**用戶端傳入的 context 長度，因此 Hermes 無法代為設定。2 用於 agent 時，至少應設為16k–32k。

**vLLM**—高效能 GPU 服務：

```
pip install vllm
vllm serve meta-llama/Llama-3.1-70B-Instruct \
  --port 8000 \
  --max-model-len 65536 \
  --tensor-parallel-size 2 \
  --enable-auto-tool-choice \
  --tool-call-parser hermes
```
工具呼叫必須使用 `--enable-auto-tool-choice` 與 `--tool-call-parser <name>`。支援的解析器包括：`hermes`（Qwen 2.5、Hermes 2/3）、`llama3_json`、`mistral`、`deepseek_v3`、`deepseek_v31`、`xlam`、`pythonic`。若未加入這些旗標，工具呼叫會以純文字傳回。2

**SGLang**—使用 RadixAttention 重複運用 KV 快取的高速服務：

```
pip install "sglang[all]"
python -m sglang.launch_server \
  --model meta-llama/Llama-3.1-70B-Instruct \
  --port 30000 \
  --context-length 65536 \
  --tp 2 \
  --tool-call-parser qwen
```
**SGLang 的陷阱：** 預設 `max_tokens` 為128。若回應遭到截斷，請在伺服器上設定 `--default-max-tokens`，或於 `config.yaml` 中設定 `model.max_tokens`。2

**llama.cpp / llama-server**—CPU 與 Apple Silicon Metal：

```
./build/bin/llama-server \
  --jinja -fa \
  -c 32768 \
  -ngl 99 \
  -m models/qwen2.5-coder-32b-instruct-Q4_K_M.gguf \
  --port 8080 --host 0.0.0.0
```
**工具呼叫必須使用  --jinja。** 若未啟用，llama-server 會完全忽略 

`tools` 參數，模型只能在回應文字中寫出 JSON 來嘗試呼叫工具；Hermes 無法將其解析為真正的工具呼叫。2

**LM Studio**—具備 GUI 的桌面應用程式：

從 LM Studio 應用程式啟動伺服器（Developer 分頁 → Start Server），或透過 CLI 執行：`lms server start`（在連接埠1234上啟動）及 `lms load qwen2.5-coder --context-length 32768`。2 接著讓 `hermes model` 指向 `http://localhost:1234/v1`。

**LM Studio 的關鍵陷阱：** LM Studio 會從模型中繼資料讀取 context 長度，但許多 GGUF 模型回報的預設值是2048或4096。請務必在 LM Studio 的模型設定中明確指定 context 長度：按一下模型選擇器旁的齒輪圖示，將「Context Length」設為至少16384（最好是32768），再重新載入模型。2

### 具名自訂供應商

若您使用多個自訂端點（例如本機開發伺服器和遠端 GPU 伺服器），可在 `config.yaml` 中將其定義為具名自訂供應商：2

```
custom_providers:
  - name: local
    base_url: http://localhost:8080/v1
    # api_key omitted — Hermes uses "no-key-required" for keyless local servers
  - name: work
    base_url: https://gpu-server.internal.corp/v1
    api_key: corp-api-key
    api_mode: chat_completions      # optional, auto-detected from URL
  - name: anthropic-proxy
    base_url: https://proxy.example.com/anthropic
    api_key: proxy-key
    api_mode: anthropic_messages    # for Anthropic-compatible proxies
```
接著使用三段式語法，在工作階段中切換：

```
/model custom:local:qwen-2.5
/model custom:work:llama3-70b
/model custom:anthropic-proxy:claude-sonnet-4
```
也能從 `hermes model` 互動式選單中選取具名自訂供應商。2

### 可插拔供應商架構（v0.13.0+）

v0.13.0 提供 ** ProviderProfile ABC** 及 

`plugins/model-providers/` 資料夾，讓第三方推論供應商無須修改核心即可直接加入。18若供應商採用與 OpenAI、Anthropic 或 Codex 相容的 API 模式，您可以實作

`ProviderProfile` 子類別，宣告驗證路徑、基礎 URL、模型目錄及快取標頭；Hermes 會透過內建供應商所使用的相同 `runtime_provider.py` 路徑進行解析。這正是 v0.13.0 供應商擴充背後的架構變革：新增供應商不必再編輯核心程式碼，只需發布外掛即可。### 與 OpenAI 相容的本機 Proxy（v0.14.0+）

`hermes proxy` 會公開與 OpenAI 相容的本機端點，後端採用 Hermes 已登入的 OAuth 供應商，例如 Claude Pro、ChatGPT Pro、SuperGrok，或其他已設定且相容的供應商。19 因此，包括 Codex CLI、Aider、Cline、Continue 或自訂指令碼在內，凡是預期使用 OpenAI 風格 API 的工具，都能重複使用 Hermes 以訂閱為基礎的驗證，無須另備 API 金鑰。請將此 proxy 視為本機開發基礎設施：審慎選擇繫結介面，切勿廣泛公開，並留意各供應商的特定條款。

### Context 長度偵測

依據上游文件，以下2項設定經常遭到混淆：2

- `context_length`
- `model.max_tokens`

自動偵測的 window 大小有誤時，請設定 `context_length`：

```
model:
  default: "qwen3.5:9b"
  base_url: "http://localhost:8080/v1"
  context_length: 131072      # tokens
```
Hermes 透過多來源解析鏈偵測 context window：設定覆寫 → 自訂供應商的個別模型設定 → 永久快取 → 端點 `/models` → Anthropic `/v1/models` → OpenRouter API → Nous Portal → `models.dev`（由社群維護、收錄超過3800個模型的登錄檔）→ 後備預設值（128K）。2 此系統能辨識供應商，因此同一模型可能因服務供應商不同而具有不同的 context 限制（例如 `claude-opus-4.6` 直接透過 Anthropic 使用時為1M，但在 GitHub Copilot 上僅有128K）。2

### 供應商輪替與後備機制

**憑證集區。** 若同一供應商有多個 API 金鑰，請透過 `hermes auth` 設定輪替策略。如此即可將速率限制分散至多組金鑰。6

**後備模型。** 設定備用的 `provider:model`；主要模型發生失敗（速率限制、伺服器錯誤或驗證失敗）時，Hermes 會自動切換：2

```
fallback_model:
  provider: openrouter            # required
  model: anthropic/claude-sonnet-4  # required
  # base_url: http://localhost:8000/v1    # optional, for custom endpoints
  # api_key_env: MY_CUSTOM_KEY           # optional, env var name
```
後備機制會在工作階段中切換模型與供應商，同時保留對話內容。每個工作階段最多觸發1次。2 支援後備機制的供應商：`openrouter`、`nous`、`openai-codex`、`copilot`、`copilot-acp`、`anthropic`、`huggingface`、`zai`、`kimi-coding`、`minimax`、`minimax-cn`、`deepseek`、`ai-gateway`、`opencode-zen`、`opencode-go`、`kilocode`、`alibaba`、`custom`。2

### 輔助模型

Hermes 使用輕量「輔助」模型處理周邊工作：影像分析、網頁摘要、瀏覽器螢幕截圖分析、危險指令核准分類、context 壓縮、工作階段搜尋摘要、skill 配對、MCP 工具分派及記憶體排清。4 預設會透過自動偵測使用 Gemini Flash（OpenRouter → Nous → Codex）。

**您可以設定每項輔助工作要使用的模型與供應商。** 每個輔助插槽都使用相同的3項設定：`provider`、`model`、`base_url`。4

```
auxiliary:
  vision:
    provider: "auto"                # "auto", "openrouter", "nous", "codex", "main", etc.
    model: ""                       # e.g. "openai/gpt-4o", "google/gemini-2.5-flash"
    base_url: ""                    # Custom OpenAI-compatible endpoint
    api_key: ""                     # Falls back to OPENAI_API_KEY
    timeout: 30
    download_timeout: 30
  web_extract:
    provider: "auto"
    model: ""
    timeout: 360
  approval:
    provider: "auto"
    model: ""
    timeout: 30
  compression:
    timeout: 120
  session_search: { provider: "auto", model: "", timeout: 30 }
  skills_hub:    { provider: "auto", model: "", timeout: 30 }
  mcp:           { provider: "auto", model: "", timeout: 30 }
  flush_memories:{ provider: "auto", model: "", timeout: 30 }
```
`"main"` 供應商選項代表「使用主要 agent 所使用的供應商」；此選項**僅能**用於 `auxiliary:`、`compression:` 及 `fallback_model:` 設定，**不能**用於最上層的 `model.provider` 設定。若主要模型採用自訂且與 OpenAI 相容的端點，請在 `model:` 區段設定 `provider: custom`。4

**這為何重要：** 若只設定 Anthropic OAuth（沒有 OpenRouter 金鑰），視覺處理、網頁摘要及壓縮功能可能品質下降或直接失敗，因為預設輔助後備鏈會先嘗試 OpenRouter。請為輔助工作加入 `OPENROUTER_API_KEY`，或重新設定各輔助插槽以使用主要供應商：

```
auxiliary:
  vision:
    provider: "main"
  web_extract:
    provider: "main"
```
這是 Hermes 新使用者最常遇到的「功能悄悄失效」陷阱。

## 設定系統

Hermes 採用分層設定系統。理解其優先順序至關重要，因為較高層級會覆寫較低層級；其中一層是您無法在 `config.yaml` 中看到的全域提供者登錄檔。

### 設定檔案配置

根據上游文件，Hermes 設定由以下檔案組成：4

```
~/.hermes/
├── config.yaml       # All settings (model, terminal, TTS, compression, memory, toolsets, ...)
├── .env              # Secrets (API keys, bot tokens, passwords)
├── auth.json         # OAuth provider credentials (Nous Portal, Codex, Anthropic)
├── SOUL.md           # Primary agent identity (slot #1 in system prompt)
├── memories/         # Persistent memory (MEMORY.md, USER.md)
├── skills/           # Bundled + agent-created + hub-installed skills
├── cron/             # Scheduled jobs
├── sessions/         # Gateway session state
└── logs/             # agent.log, gateway.log, errors.log (secrets auto-redacted)
```
`config.yaml` 與 `.env`——兩者皆有設定時，非機密設定以 `config.yaml` 為準。4規則如下：
- **機密資訊**（API 金鑰、機器人權杖、密碼）→ `.env`
- **其他所有項目**（模型、終端機後端、壓縮設定、記憶體限制、toolsets）→ `config.yaml`

您可以在 `config.yaml` 中使用 shell 風格的插值語法參照機密資訊：4

```
auxiliary:
  vision:
    api_key: ${GOOGLE_API_KEY}
    base_url: ${CUSTOM_VISION_URL}
  delegation:
    api_key: ${DELEGATION_KEY}
```
### 管理設定

```
hermes config                # View current configuration
hermes config show           # Same as above
hermes config edit           # Open config.yaml in your editor
hermes config set KEY VAL    # Set a specific value
hermes config get KEY        # Print a single value (v0.19.0+)
hermes config unset KEY      # Remove a key so the default applies again (v0.19.0+)
hermes config path           # Print the config file path
hermes config env-path       # Print the .env file path
hermes config check          # Check for missing options (after updates)
hermes config migrate        # Interactively add missing options
```
範例：4

```
hermes config set model anthropic/claude-opus-4
hermes config set terminal.backend docker
hermes config set OPENROUTER_API_KEY sk-or-...   # Saves to .env
```
每次執行 `hermes update` 後，都應執行 `hermes config check` 與 `hermes config migrate`——這些命令能找出新增但尚未納入您檔案的設定選項。6

### 設定優先順序

Hermes 會從數個來源載入設定。若多個來源設定了相同的值，則以優先順序較高者為準：4

- **CLI 引數**——- `hermes chat --model anthropic/claude-sonnet-4`（覆寫單次叫用的設定）
- **環境變數**——於程序啟動時套用
- `config.yaml`
- `.env`
- **內建預設值**——未由其他來源設定值時套用

CLI 旗標在該次叫用中一律具有最高優先權。`config.yaml` 則是長期採用的單一真實來源。

### 在地化（v0.13.0+）

v0.13.0 為 CLI 與 gateway 訊息新增了 **7 種語系**：簡體中文、日文、德文、西班牙文、法文、烏克蘭文及土耳其文。18v0.14.0 將所有 gateway 命令與網頁儀表板在地化，另增 8 種語系，使總數達到 16 種。19目前文件僅提供 zh-Hans 在地化版本。語系會根據 `LC_ALL`／`LANG` 環境變數，或 `config.yaml` 中明確指定的 `locale:` 鍵來決定。英文仍為預設語言，也是翻譯尚未涵蓋之字串的單一真實來源。

### Profiles——多個彼此隔離的 Hermes 執行個體

Profiles 可讓您建立多個彼此隔離的 Hermes 執行個體，每個執行個體都有各自的設定、工作階段、skills、記憶體與 gateway PID。如此一來，便能同時執行「工作用 Hermes」與「個人用 Hermes」，且彼此無法存取對方的狀態。6

```
hermes profile list
hermes profile create work --clone                  # Clone from current profile
hermes profile use work                             # Set sticky default
hermes profile alias work --name h-work             # Create wrapper script
hermes profile export work -o work-backup.tar.gz
hermes profile import work-backup.tar.gz --name restored
hermes -p work chat -q "Hello from work profile"    # One-off without switching
```
每個 profile 都有自己的 `HERMES_HOME`（預設為 `~/.hermes-<name>/`），因此多個 profiles 能同時執行 gateway，互不干擾。63

## CLI 指令

本節提供頂層CLI指令的實務參考。若需查閱由程式碼衍生的權威參考資料，請參閱上游的CLI指令參考。6

### 全域選項

```
hermes [global-options] <command> [subcommand/options]
```
| 選項 | 說明 | 
|---|---|
| `--version`,`-V` | 顯示版本並結束 | 
| `--profile <name>`,`-p <name>` | 選擇要使用的Hermes profile | 
| `--resume <session>`,`-r <session>` | 依ID或標題繼續session | 
| `--continue [name]`,`-c [name]` | 繼續最近的session（或比對標題） | 
| `--worktree`,`-w` | 在隔離的git worktree中啟動 | 
| `--yolo` | 略過危險指令的核准提示 | 
| `--safe-mode` | 疑難排解旗標——以最小化安全模式啟動Hermes，以隔離啟動問題（v0.19.0+） 23 | 
| `--pass-session-id` | 在代理程式的系統提示詞中納入session ID | 

### 頂層指令

| 指令 | 用途 | 
|---|---|
| `hermes chat` | 互動式或單次對話 | 
| `hermes model` | 以互動方式選擇預設提供者與模型 | 
| `hermes gateway` | 執行或管理訊息gateway | 
| `hermes setup` | 互動式設定精靈 | 
| `hermes auth` | 管理憑證——新增、列出、移除、重設及設定策略 | 
| `hermes status` | 顯示代理程式、驗證與平台狀態 | 
| `hermes cron` | 檢查並觸發cron排程器 | 
| `hermes webhook` | 管理動態webhook訂閱 | 
| `hermes doctor` | 診斷設定與相依套件問題 | 
| `hermes dump` | 產生可直接複製貼上的設定摘要，供支援與除錯使用 | 
| `hermes logs` | 檢視、即時追蹤及篩選代理程式、gateway與錯誤日誌 | 
| `hermes config` | 顯示、編輯、遷移及查詢設定 | 
| `hermes pairing` | 核准或撤銷訊息配對碼 | 
| `hermes skills` | 瀏覽、安裝、發布及稽核skill | 
| `hermes honcho` | 管理Honcho跨session記憶 | 
| `hermes memory` | 設定外部記憶提供者 | 
| `hermes acp` | 將Hermes作為ACP伺服器執行（編輯器整合） | 
| `hermes mcp` | 管理MCP伺服器設定；將Hermes作為MCP伺服器執行 | 
| `hermes plugins` | 管理外掛程式 | 
| `hermes tools` | 依平台設定啟用的工具 | 
| `hermes sessions` | 瀏覽、匯出、清理及刪除session。v0.19.0擴充了 `hermes sessions export`，支援Markdown、Quarto、HTML、僅提示詞及Hugging Face追蹤格式，並提供選用的`--redact`機密資訊清除程序，以及依存續時間、工作區與平台篩選的功能23 | 
| `hermes insights` | 顯示token、成本與活動分析 | 
| `hermes claw` | OpenClaw遷移輔助工具 | 
| `hermes profile` | 管理profile（多個彼此隔離的執行個體） | 
| `hermes completion` | 輸出shell自動完成指令碼（bash/zsh） | 
| `hermes whatsapp` | 設定並配對WhatsApp橋接器 | 
| `hermes version` | 輸出版本資訊 | 
| `hermes update` | 拉取最新程式碼並重新安裝相依套件 | 
| `hermes uninstall` | 從系統移除Hermes（ `--full`也會刪除設定與資料） | 
| `hermes backup` | 完整備份設定、session、skill與記憶（v0.9.0+） 16 | 
| `hermes import` | 從備份封存檔還原——用於在電腦之間遷移或復原至先前狀態（v0.9.0+） 16 | 
| `hermes dashboard` | 啟動本機網頁儀表板，以透過瀏覽器管理代理程式（v0.9.0+） 16 | 
| `hermes serve` | 以無介面模式執行後端API伺服器——自v0.19.0起，不再建置或掛載網頁UI 23 | 
| `hermes debug share` | 將完整除錯報告上傳至pastebin，以便在疑難排解時分享（v0.9.0+） 16 | 

`hermes chat`——主要進入點

執行不含引數的`hermes`會直接進入互動式對話。`hermes chat`是可搭配選項使用的明確形式：6

```
hermes chat -q "Summarize the latest PRs"           # One-shot, non-interactive
hermes chat --provider openrouter --model anthropic/claude-sonnet-4.6
hermes chat --toolsets web,terminal,skills          # Enable specific toolsets
hermes chat --quiet -q "Return only JSON"           # Programmatic mode
hermes chat --worktree -q "Review repo and open a PR"
```
主要選項：

| 選項 | 說明 | 
|---|---|
| `-q`,`--query "..."` | 單次、非互動式提示詞 | 
| `-m`,`--model <model>` | 覆寫本次執行使用的模型 | 
| `-t`,`--toolsets <csv>` | 啟用以逗號分隔的一組toolset | 
| `--provider <provider>` | 強制使用指定提供者（請參閱完整清單） | 
| `-s`,`--skills <name>` | 為此session預先載入一個或多個skill | 
| `-v`,`--verbose` | 顯示詳細輸出 | 
| `-Q`,`--quiet` | 程式化模式（不顯示橫幅、旋轉指示器與預覽） | 
| `--resume <session>` | 直接從 `chat`繼續session | 
| `--worktree` | 建立隔離的git worktree | 
| `--checkpoints` | 在破壞性變更前啟用檔案系統checkpoint | 
| `--yolo` | 略過核准提示 | 
| `--source <tag>` | session來源標籤（預設： `cli`；整合時使用`tool`） | 
| `--max-turns <N>` | 每回合呼叫工具的最大迭代次數（預設：90） | 

`hermes setup`——完整精靈

執行完整設定精靈，或直接跳至特定區段：6

```
hermes setup                 # Full wizard
hermes setup model           # Provider and model only
hermes setup terminal        # Terminal backend only
hermes setup gateway         # Messaging platforms only
hermes setup tools           # Tool enable/disable per platform
hermes setup agent           # Agent behavior only
hermes setup --non-interactive
hermes setup --reset         # Reset config to defaults before setup
```
`hermes logs`——結構化日誌查詢

`hermes logs`比直接對日誌檔案執行`tail -f`更為強大，因為它支援同時依層級、session ID與時間範圍進行篩選。6

```
hermes logs                          # Last 50 lines of agent.log
hermes logs -f                       # Follow in real time
hermes logs gateway -n 100           # Last 100 lines of gateway.log
hermes logs --level WARNING --since 1h   # Warnings from the last hour
hermes logs --session abc123         # Filter by session ID substring
hermes logs errors --since 30m -f    # Follow errors.log from 30m ago
hermes logs list                     # List all log files with sizes
```
日誌檔案位於`~/.hermes/logs/`：6
- `agent.log`——所有代理程式活動（API呼叫、工具分派、session生命週期、INFO以上層級）
- `errors.log`——僅包含警告與錯誤（agent.log經篩選後的子集）
- `gateway.log`——訊息gateway活動（平台連線、分派、webhook）

系統會透過Python的`RotatingFileHandler`自動輪替日誌——可查看`agent.log.1`、`agent.log.2`等檔案。6

`hermes doctor`——診斷

發生問題時，應先執行`hermes doctor [--fix]`。此指令會檢查設定有效性、相依套件是否存在、API金鑰可用性與服務狀態，並可透過`--fix`嘗試自動修復。6

若要與他人分享診斷資訊，請使用`hermes dump`。它會產生精簡的純文字摘要，並遮蔽API金鑰，方便直接貼至GitHub議題或Discord討論串。6

## Slash 指令

Slash 指令會在作用中的聊天工作階段（CLI 或通訊平台）內執行。這些指令由 `hermes_cli/commands.py` 中共用的 `COMMAND_REGISTRY` 分派，因此大多數指令在各種介面上的運作方式完全相同。9

### 工作階段控制

| 指令 | 說明 | 
|---|---|
| `/new`（別名`/reset`） | 開始新的工作階段 | 
| `/clear` | 清除畫面並開始新的工作階段 | 
| `/history` | 顯示對話記錄 | 
| `/save` | 儲存目前的對話 | 
| `/retry` | 重試上一則訊息 | 
| `/undo` | 移除最後一組使用者與助理的訊息往返 | 
| `/title <name>` | 設定目前工作階段的標題 | 
| `/compress` | 手動壓縮對話 context | 
| `/rollback [number]` | 列出或還原檔案系統 checkpoint | 
| `/stop` | 終止所有執行中的背景程序 | 
| `/queue <prompt>` | 將 prompt 排入佇列，供下一輪使用。 注意：`/queue`與`/quit`都註冊了`/q`；後註冊者優先，因此實際上`/q`會解析為`/quit`。請務必完整輸入`/queue`。9 | 
| `/resume [name]` | 繼續先前已命名的工作階段 | 
| `/statusbar`（別名`/sb`） | 切換 context／模型狀態列 | 
| `/background <prompt>`（別名`/bg`） | 在獨立的背景工作階段中執行 prompt | 
| `/btw <question>` | 暫時性的附帶問題（不使用工具，也不會保存） | 
| `/plan [request]` | 載入內建的 `plan`skill，以撰寫計畫而非直接執行 | 
| `/branch [name]`（別名`/fork`） | 從目前工作階段建立分支 | 
| `/goal <target>` | 將 agent 鎖定於指定目標，使其跨輪次持續專注於任務。這是將 Ralph-loop 模式納為一級基本功能的實作，並可設定輪次預算。v0.13.0 新增。 18 | 
| `/subgoal <criterion>` | 在不重新啟動迴圈的情況下，為作用中的 `/goal`新增成功條件。v0.14.0 新增。19 | 
| `/handoff <target>` | 將即時工作階段（包括訊息、工具呼叫與 context）移交給其他模型、persona 或 profile。v0.14.0 新增。 19 | 

### 設定與模型

| 指令 | 說明 | 
|---|---|
| `/config` | 顯示目前設定 | 
| `/model [model-name]` | 顯示或變更目前模型 | 
| `/provider` | 顯示可用的 provider 與目前使用的 provider | 
| `/personality [name]` | 設定 personality 疊加層 | 
| `/verbose` | 循環切換工具進度的顯示方式 | 
| `/reasoning` | 管理推理強度與顯示方式。v0.19.0 新增 `max`與`ultra`強度層級，並將`/reasoning`改為僅作用於目前工作階段；設定中也可針對個別模型與各 MoA slot 覆寫推理強度23 | 
| `/skin` | 顯示或變更顯示外觀／主題 | 
| `/voice [on\|off\|tts\|status]` | 切換 CLI 語音模式 | 
| `/yolo` | 切換 YOLO 模式（略過核准提示）。自 v0.19.0 起，即使處於 YOLO 模式，使用者自訂的拒絕規則仍會封鎖相符的指令 23 | 
| `/fast` | 切換 Fast Mode，為 OpenAI 與 Anthropic 模型提供優先處理（v0.9.0+） 16 | 
| `/debug` | 在所有平台上執行快速診斷（v0.9.0+） 16 | 
| `/subscription` | 從終端機管理您的 Nous Portal 方案，包括查看方案與剩餘額度、預覽升級／降級費用，以及套用或復原變更（v0.19.0+） 23 | 
| `/topup` | 無須離開終端機，即可為 Nous Portal 餘額加值（v0.19.0+） 23 | 

`/model` 指令是工作階段進行期間切換 provider 的主力工具：9

```
/model                              # Show current model and options
/model claude-sonnet-4              # Switch model (auto-detect provider)
/model zai:glm-5                    # Switch provider:model
/model custom:qwen-2.5              # Use model on custom endpoint
/model custom                       # Auto-detect model from custom endpoint
/model custom:local:qwen-2.5        # Named custom provider
/model openrouter:anthropic/claude-sonnet-4   # Back to cloud
```
v0.19.0 新增 `/model --once`，可暫時覆寫一輪所用的模型，並在回覆後自動恢復先前的模型。23

### 工具、Skills 與資訊

| 指令 | 說明 | 
|---|---|
| `/tools [list\|disable\|enable] [name...]` | 管理目前工作階段的工具 | 
| `/toolsets` | 列出可用的 toolset | 
| `/browser [connect\|disconnect\|status]` | 管理本機 Chrome CDP 連線 | 
| `/skills` | 搜尋、安裝、檢查或管理 skill | 
| `/cron` | 管理排程任務 | 
| `/reload-mcp` | 從 config.yaml 重新載入 MCP 伺服器 | 
| `/plugins` | 列出已安裝的外掛 | 
| `/help` | 顯示所有指令 | 
| `/usage` | 顯示 token 用量、成本與持續時間 | 
| `/insights` | 顯示最近 30 天的使用情況分析 | 
| `/platforms` | 顯示通訊平台狀態 | 
| `/profile` | 顯示作用中的 profile 名稱與主目錄 | 

### 動態 Skill Slash 指令

每個已安裝的 skill 都會自動公開為 Slash 指令：9

```
/gif-search funny cats
/axolotl help me fine-tune Llama 3 on my dataset
/github-pr-workflow create a PR for the auth refactor
/excalidraw       # Just the skill name loads it and lets the agent ask what you need
```
自 v0.19.0 起，Slash skill 呼叫可以**堆疊**：`/skill-a /skill-b do XYZ` 能在單一輪次中依序載入兩個 skill，並為串連的名稱提供自動完成與預覽文字。23

您也可以在 `config.yaml` 中定義**快速指令**，以簡短名稱作為較長 prompt 的別名：9

```
quick_commands:
  review: "Review my latest git diff and suggest improvements"
  deploy: "Run the deployment script at scripts/deploy.sh and verify the output"
  morning: "Check my calendar, unread emails, and summarize today's priorities"
```
接著在 CLI 中輸入 `/review`、`/deploy` 或 `/morning` 即可。

### 前綴比對

指令支援前綴比對：輸入 `/h` 會解析為 `/help`，輸入 `/mod` 則會解析為 `/model`。若前綴指向多個指令，將以 registry 註冊順序中最先出現的指令為準。完整指令名稱與已註冊的別名，一律優先於前綴比對。9

### 通訊平台專用指令

部分指令僅適用於通訊平台（Telegram、Discord、Slack、WhatsApp、Signal、Email、Home Assistant）：9

- `/status`— 顯示工作階段資訊
- `/sethome`（別名- `/set-home`）— 將目前聊天設為平台首頁
- `/approve [session|always]`— 核准待處理的危險指令
- `/deny [reason]`— 拒絕待處理的危險指令。自 v0.19.0 起，- `/deny <reason>`會將您的拒絕理由轉達給 agent，使其能調整方向，而非在毫無頭緒的情況下反覆嘗試- 23
- `/update`— 將 Hermes Agent 更新至最新版本
- `/commands [page]`— 分頁瀏覽所有指令與 skill

另有部分指令僅限 CLI 使用：`/skin`、`/tools`、`/toolsets`、`/browser`、`/config`、`/cron`、`/skills`、`/platforms`、`/paste`、`/statusbar`、`/plugins`。9

## Tools 與 Toolsets

Hermes 內建功能廣泛的工具登錄系統，涵蓋網頁搜尋、瀏覽器自動化、終端機執行、檔案編輯、記憶、委派、RL 訓練、訊息傳送、Home Assistant 整合等功能。10 工具會依邏輯分類為不同的 **toolset**，並可針對各平台啟用或停用。

### 高階分類

| 類別 | 範例 | 說明 | 
|---|---|---|
| 網頁 | `web_search`,`web_extract` | 搜尋網頁並擷取頁面內容 | 
| 終端機與檔案 | `terminal`,`process`,`read_file`,`patch` | 執行命令及操作檔案 | 
| 瀏覽器 | `browser_navigate`,`browser_snapshot`,`browser_vision` | 結合文字與視覺功能的互動式瀏覽器自動化 | 
| 媒體 | `vision_analyze`,`video_analyze`,`video_generate`,`image_generate`,`text_to_speech` | 多模態分析與生成。 `video_analyze`優先採用 Gemini，並可擴充支援相容的多模態供應商（v0.13.0+）。v0.14.0 新增統一的`video_generate`，提供可插拔的供應商後端；當使用中的模型具備視覺能力時，也會透過`vision_analyze`傳送原始像素。1819 | 
| Agent 協調 | `todo`,`clarify`,`execute_code`,`delegate_task` | 規劃、釐清、程式碼執行及子 Agent 委派 | 
| 電腦操作 | `computer_use` | 透過 cua-driver 後端控制桌面；v0.14.0 使其可搭配非 Anthropic 且具備視覺能力的供應商使用。 19 | 
| 記憶與回溯 | `memory`,`session_search` | 持久化記憶與工作階段搜尋 | 
| 自動化與傳送 | `cronjob`,`send_message` | 排程工作與對外傳送訊息 | 
| 整合 | `ha_*`, MCP 工具,`rl_*` | Home Assistant、MCP、RL 訓練 | 

常見的 toolset 名稱包括 `web`、`terminal`、`file`、`browser`、`vision`、`image_gen`、`moa`、`skills`、`tts`、`todo`、`memory`、`session_search`、`cronjob`、`code_execution`、`delegation`、`clarify`、`homeassistant` 與 `rl`。10

### 管理工具

```
hermes chat --toolsets "web,terminal"       # Use specific toolsets
hermes tools                                # Interactive per-platform tool config
hermes tools --summary                      # Print enabled-tools summary
```
您也可以在工作階段進行期間，透過 `/tools disable <name>` 與 `/tools enable <name>` 切換工具。這會重設工作階段，讓新的工具組合生效。9

### 終端機後端

終端機工具可在 6 種不同環境中執行命令：10

| 後端 | 使用情境 | 
|---|---|
| `local` | 在您的機器上執行（預設）——適合開發與受信任的工作 | 
| `docker` | 隔離式容器——適合安全性與可重現性需求 | 
| `ssh` | 遠端伺服器——提供沙箱環境，避免 Agent 接觸自身程式碼 | 
| `singularity` | HPC 容器——適合叢集運算與無 root 執行環境 | 
| `modal` | 無伺服器雲端執行環境 | 
| `daytona` | 雲端沙箱工作區——持久化的遠端開發環境 | 

使用 `hermes config set terminal.backend <name>` 切換後端，或在 `config.yaml` 中設定：

```
terminal:
  backend: docker      # or: local, ssh, singularity, modal, daytona
  cwd: "."             # Working directory
  timeout: 180         # Command timeout in seconds
```
**SSH 後端**（基於安全考量，建議使用此後端——Agent 無法修改自身程式碼）：10

```
terminal:
  backend: ssh
```
```
# In ~/.hermes/.env
TERMINAL_SSH_HOST=my-server.example.com
TERMINAL_SSH_USER=myuser
TERMINAL_SSH_KEY=~/.ssh/id_rsa
```
**Docker 後端：**

```
terminal:
  backend: docker
  docker_image: python:3.11-slim
```
**容器資源**（適用於 docker、singularity、modal、daytona）：10

```
terminal:
  container_cpu: 1
  container_memory: 5120          # MB (default 5GB)
  container_disk: 51200           # MB (default 50GB)
  container_persistent: true      # Persist filesystem across sessions
```
設定 `container_persistent: true` 後，已安裝的套件、檔案及設定會跨工作階段保留。10

所有容器後端均採用安全強化措施：唯讀根檔案系統（Docker）、捨棄除 `DAC_OVERRIDE`、`CHOWN` 與 `FOWNER` 以外的所有 Linux capability、禁止權限提升、PID 限制（256 個程序）、完整的命名空間隔離，以及透過 volume 提供持久化工作區。10

### 背景程序

終端機工具支援背景執行，並提供明確的程序管理功能：10

```
terminal(command="pytest -v tests/", background=true)
# Returns: {"session_id": "proc_abc123", "pid": 12345}
process(action="list")                            # Show all running processes
process(action="poll", session_id="proc_abc123")  # Check status
process(action="wait", session_id="proc_abc123")  # Block until done
process(action="log", session_id="proc_abc123")   # Full output
process(action="kill", session_id="proc_abc123")  # Terminate
process(action="write", session_id="proc_abc123", data="y")  # Send input
```
PTY 模式（`pty=true`）可啟用 Codex 與 Claude Code 等互動式 CLI 工具。10

### Sudo

若命令需要 sudo，Hermes 會提示您輸入密碼，並在該工作階段中快取。也可在 `~/.hermes/.env` 中設定 `SUDO_PASSWORD`。10

## Multi-Agent Kanban（v0.13.0+）

v0.13.0 將多 Agent 協作提升為核心基礎功能：使用**持久化 Kanban 看板**，跨 Agent、跨重新啟動追蹤工作、狀態與工作者身分。18 正是這個看板讓 Hermes 工作者群能真正完成工作，不會因無效交接而停滯不前。

| 機制 | 功能 | 
|---|---|
| 心跳 | 每位工作者擁有工作期間都會持續傳送心跳。若未收到心跳，該工作者會被標記為可疑，並釋放工作供其他工作者重新認領。 | 
| 重新認領 | 其他工作者可接手遭棄置的工作，並取得完整的工作狀態與先前的部分輸出。 | 
| 殭屍偵測 | 若工作者退出時未將工作標記為完成，系統會自動禁止其認領新工作，避免工作者群累積失效身分。 | 
| 幻覺關卡 | 未通過關卡的輸出不會標記為完成；工作會附上原因退回看板。 | 
| 個別工作的 `max_retries` | 針對已知較不穩定的工作，覆寫預設的重試次數上限。 | 
| 多專案看板 | 同一個 Hermes 主目錄可容納多個彼此獨立的看板。 | 

Kanban 看板可自然地搭配 `/goal`（鎖定目標的 Ralph 迴圈）處理目標端，並以現有的 `delegate_task` 工具處理生成語意。最終形成的工作者群模式，讓每個 Agent 都能共用唯一可信的資訊來源，清楚掌握接下來該做什麼、由誰執行，以及哪些工作陷入停滯。

## skill 系統

skill 是代理程式可視需要載入的**隨選知識文件**。採用漸進式揭露模式，以盡量減少 token 用量，並相容於 agentskills.io 開放標準。11

**所有 skill 均位於  ~/.hermes/skills/**——這是主要目錄，也是唯一可靠的資料來源。全新安裝時，內建 skill 會從儲存庫複製至此。透過 Hub 安裝及代理程式建立的 skill 也會存放於此。

11

### 漸進式揭露

```
Level 0: skills_list()           → [{name, description, category}, ...]   (~3k tokens)
Level 1: skill_view(name)        → Full content + metadata                 (varies)
Level 2: skill_view(name, path)  → Specific reference file                 (varies)
```
只有在實際需要時，代理程式才會載入 skill 的完整內容。11

### SKILL.md 格式

```
---
name: my-skill
description: Brief description of what this skill does
version: 1.0.0
platforms: [macos, linux]      # Optional — restrict to OS platforms
metadata:
  hermes:
    tags: [python, automation]
    category: devops
    fallback_for_toolsets: [web]     # Conditional activation
    requires_toolsets: [terminal]    # Conditional activation
    config:                          # Config.yaml settings
      - key: my.setting
        description: "What this controls"
        default: "value"
        prompt: "Prompt for setup"
---
# Skill Title
## When to Use
Trigger conditions for this skill.
## Procedure
1. Step one
2. Step two
## Pitfalls
- Known failure modes and fixes
## Verification
How to confirm it worked.
```
### 條件式啟用

skill 可依據目前有哪些工具可用，決定顯示或隱藏。這對**備援 skill**尤其實用——當付費工具無法使用時，才顯示免費或本機替代方案：11

| 欄位 | 行為 | 
|---|---|
| `fallback_for_toolsets` | 列出的 toolset 可用時隱藏 skill | 
| `fallback_for_tools` | 同上，但檢查個別工具 | 
| `requires_toolsets` | 列出的 toolset 無法使用時隱藏 skill | 
| `requires_tools` | 同上，但檢查個別工具 | 

**範例：**內建的 `duckduckgo-search` skill 使用 `fallback_for_toolsets: [web]`。設定 `FIRECRAWL_API_KEY` 後，web toolset 即可使用，代理程式會改用 `web_search`，因此 DuckDuckGo skill 會保持隱藏。若未設定 API 金鑰，DuckDuckGo skill 便會自動顯示為備援方案。11

### 代理程式管理的 skill

代理程式可透過 `skill_manage` 工具建立、更新及刪除自己的 skill。這就是代理程式的**程序性記憶**——當它摸索出一套不平凡的工作流程後，便會將方法儲存為 skill，以便日後重複使用。11

**代理程式建立 skill 的時機：**11
- 成功完成複雜任務（使用工具達 5 次以上）後
- 遇到錯誤或走入死胡同，並找到可行做法時
- 使用者修正其處理方式時
- 發現不平凡的工作流程時

**動作：**11

| 動作 | 用途 | 
|---|---|
| `create` | 從頭建立新的 skill | 
| `patch` | 進行針對性修正（首選——最節省 token） | 
| `edit` | 大幅改寫結構 | 
| `delete` | 完整移除 skill | 
| `write_file` | 新增或更新支援檔案 | 
| `remove_file` | 移除支援檔案 | 

### Skill Hub

```
hermes skills browse                          # Browse all hub skills
hermes skills browse --source official        # Browse official optional skills
hermes skills search kubernetes               # Search all sources
hermes skills search react --source skills-sh # Search skills.sh directory
hermes skills inspect openai/skills/k8s       # Preview before installing
hermes skills install openai/skills/k8s       # Install with security scan
hermes skills install skills-sh/anthropics/skills/pdf --force
hermes skills check                           # Check for upstream updates
hermes skills update                          # Reinstall changed hub skills
hermes skills audit                           # Re-scan installed hub skills
hermes skills uninstall k8s
hermes skills publish skills/my-skill --to github --repo owner/repo
hermes skills tap add myorg/skills-repo       # Add custom GitHub source
```
**整合的 Hub 來源：**11

| 來源 | 範例 | 說明 | 
|---|---|---|
| `official` | `official/security/1password` | Hermes 隨附的選用 skill（具內建信任） | 
| `skills-sh` | `skills-sh/vercel-labs/agent-skills/vercel-react-best-practices` | Vercel 的公開 skill 目錄 | 
| `well-known` | `well-known:https://mintlify.com/docs/.well-known/skills/mintlify` | 從發布 `/.well-known/skills/index.json`的網站，透過 URL 探索 skill | 
| `github` | `openai/skills/k8s` | 直接安裝 GitHub 儲存庫／路徑 | 
| `clawhub` | — | 第三方 skill 市集 | 
| `claude-marketplace` | — | 相容於 Claude 的外掛程式／市集資訊清單 | 
| `lobehub` | — | 轉換 LobeHub 代理程式目錄 | 

**預設 GitHub taps**（無須設定即可瀏覽）：`openai/skills`、`anthropics/skills`、`VoltAgent/awesome-agent-skills`、`garrytan/gstack`。11

### 安全性掃描

所有透過 Hub 安裝的 skill 都會經過安全性掃描，檢查資料外洩、提示詞注入、破壞性命令、供應鏈風險訊號及其他威脅。11

**信任層級：**11

| 層級 | 來源 | 政策 | 
|---|---|---|
| `builtin` | Hermes 隨附 | 一律信任 | 
| `official` | 儲存庫中的 `optional-skills/` | 具內建信任，不顯示第三方警告 | 
| `trusted` | 受信任的登錄中心（ `openai/skills`、`anthropics/skills`） | 採用較寬鬆的政策 | 
| `community` | 其他所有來源 | 非危險的判定可使用 `--force`覆寫；`dangerous`判定仍會遭到封鎖 | 

對於社群 skill，`--force` 可覆寫非危險的政策封鎖，但**無法**覆寫掃描結果為 `dangerous` 的判定。11

### 外部 skill 目錄

您可以讓 Hermes 指向其他 skill 目錄，並與本機目錄一併掃描：11

```
skills:
  external_dirs:
    - ~/.agents/skills
    - /home/shared/team-skills
    - ${SKILLS_REPO}/skills
```
路徑支援展開 `~`，也支援替換 `${VAR}` 環境變數。外部目錄為**唯讀**——代理程式建立或編輯 skill 時，一律寫入 `~/.hermes/skills/`。若兩處存在同名 skill，則以本機版本優先。11

## 永久記憶

Hermes 具備容量有限且經過整理的記憶，可跨工作階段保留。代理程式的記憶由兩個檔案組成，皆儲存於`~/.hermes/memories/`：12

| 檔案 | 用途 | 字元上限 | 
|---|---|---|
| `MEMORY.md` | 代理程式的個人筆記——環境資訊、慣例、已習得事項 | 2,200個字元（約800個token） | 
| `USER.md` | 使用者profile——偏好、溝通風格、期望 | 1,375個字元（約500個token） | 

兩者皆會以**工作階段開始時的凍結快照**注入系統提示。代理程式透過`memory`工具自行管理記憶，可執行`add`、`replace`或`remove`。12

**凍結快照模式：**系統提示的注入內容只會在工作階段開始時擷取一次，且不會在工作階段進行期間變更。這是刻意設計，旨在保留LLM的前綴快取以提升效能。工作階段期間所做的變更會立即保存至磁碟，但要到下一個工作階段才會出現在系統提示中。12

### 應儲存的內容

**儲存以下內容（代理程式會主動執行）：**12
- **使用者偏好：**「相較於JavaScript，我偏好TypeScript」→ `user`
- **環境資訊：**「此伺服器執行Debian 12與PostgreSQL 16」→ `memory`
- **修正事項：**「執行Docker命令時不要使用`sudo`，使用者已加入docker群組」→ `memory`
- **慣例：**「專案使用Tab、每行上限120個字元，以及Google風格的docstring」→ `memory`
- **已完成的工作：**「已於2026年1月15日將資料庫從MySQL移轉至PostgreSQL」→ `memory`

**略過以下內容：**12
- 瑣碎或顯而易見的資訊
- 容易重新查明的資訊
- 原始資料傾印（對記憶而言過於龐大）
- 僅與當前工作階段相關的短暫資訊
- 情境檔案中已有的資訊

### 工作階段搜尋

除了`MEMORY.md`與`USER.md`，代理程式還能使用`session_search`工具搜尋過往對話。所有CLI與訊息工作階段皆儲存於SQLite（`~/.hermes/state.db`），並透過FTS5進行全文搜尋。查詢會傳回相關的過往對話，並由Gemini Flash產生摘要。12

| 功能 | 永久記憶 | 工作階段搜尋 | 
|---|---|---|
| 容量 | 總計約1,300個token | 無上限（所有工作階段） | 
| 速度 | 即時（位於系統提示中） | 需要搜尋及LLM摘要 | 
| 使用情境 | 隨時可用的關鍵資訊 | 尋找特定的過往對話 | 
| 管理方式 | 由代理程式手動整理 | 自動——儲存所有工作階段 | 
| Token成本 | 每個工作階段固定（約1,300個token） | 隨需產生 | 

### 外部記憶供應商

若需要比`MEMORY.md`與`USER.md`更深入的永久記憶，Hermes 隨附8個外部記憶供應商外掛：**Honcho、OpenViking、Mem0、Hindsight、Holographic、RetainDB、ByteRover及Supermemory**。12

外部供應商會與內建記憶**並行運作**（絕不取代內建記憶），並增添知識圖譜、語意搜尋、自動擷取資訊，以及跨工作階段使用者建模等功能：612

```
hermes memory setup         # Pick a provider and configure it
hermes memory status        # Check what's active
hermes memory off           # Disable external provider (built-in only)
```
一次只能啟用一個外部供應商。內建記憶則會永遠保持啟用。6

### 工作階段自動續接（v0.13.0+）

v0.13.0讓代理程式即使在執行途中遭到中斷，也能恢復運作。gateway會在重新啟動後自動續接中斷的工作階段；透過`/update`重新啟動時，升級過程仍會保留工作階段狀態；開發期間重新載入原始檔案時，也會維持目前工作階段，不再被迫建立新的工作階段。18實際效果是：長時間執行的gateway工作與cron驅動的作業，不再因程序重新啟動而重設context engine視窗。

### Checkpoint v2（v0.13.0+）

v0.13.0將狀態持久化改寫為單一儲存區設計，具備**真正的修剪機制、磁碟防護措施，且不會產生孤立的影子儲存庫**。18舊版checkpoint系統會在長時間執行的profile中持續累積磁碟狀態；v2儲存區為本機checkpoint儲存空間設定明確上限，並移除導致空間不斷增長的重複簿記資料。使用者無須變更任何設定；下一次寫入checkpoint時便會採用v2路徑。

## 個性與SOUL.md

`SOUL.md`是Hermes實例的**主要身分**。它位於系統提示的第1個位置，取代硬式編碼的預設身分。13

Hermes會自動在`~/.hermes/SOUL.md`（自訂profile則位於`$HERMES_HOME/SOUL.md`）建立預設的`SOUL.md`。現有的使用者檔案絕不會遭到覆寫。Hermes只會從`HERMES_HOME`載入`SOUL.md`，不會在目前的工作目錄中尋找。如此一來，個性便能在不同專案間保持一致且可預期。13

### SOUL.md應包含的內容

請用它設定長期適用的語氣與個性指引：13
- 語氣
- 溝通風格
- 直接程度
- 預設互動風格
- 應避免的文風
- Hermes應如何處理不確定性、意見分歧與模糊情況

**以下內容則應少用：**13
- 一次性的專案指示
- 檔案路徑
- repo慣例
- 暫時性的工作流程細節

這些內容應放在`AGENTS.md`，而非`SOUL.md`。

### SOUL.md與AGENTS.md的差異

這是Hermes身分管理中最重要的區別：13

** SOUL.md**——身分、語氣、風格、預設溝通方式，以及個性層級的行為。

** AGENTS.md**——專案架構、程式設計慣例、工具偏好、repo專屬工作流程、命令、通訊埠、路徑及部署備註。

有個實用原則：若某項設定應隨時隨地跟著您，就應放在`SOUL.md`；若只屬於特定專案，則應放在`AGENTS.md`。13

### 內建個性

Hermes隨附多種內建個性，可使用`/personality`切換：13

| 名稱 | 說明 | 
|---|---|
| `helpful` | 友善的通用助理 | 
| `concise` | 簡短扼要、直奔重點的回覆 | 
| `technical` | 詳盡且精確的技術專家 | 
| `creative` | 創新且跳脫框架的思考方式 | 
| `teacher` | 耐心的教學者，提供清楚易懂的範例 | 
| `kawaii` | 可愛的表達、閃亮特效與滿腔熱情 | 
| `catgirl` | 使用貓系表達方式的Neko-chan | 
| `pirate` | Captain Hermes，精通科技的海盜 | 
| `shakespeare` | 充滿戲劇張力的莎士比亞式文風 | 
| `surfer` | 輕鬆悠閒的衝浪哥風格 | 
| `noir` | 冷硬派偵探敘事 | 
| `uwu` | 使用uwu語氣，將可愛程度推至極致 | 
| `philosopher` | 對每項問題進行深入思辨 | 
| `hype` | 能量全開 | 

`config.yaml`中的**自訂個性**：13

```
agent:
  personalities:
    codereviewer: >
      You are a meticulous code reviewer. Identify bugs, security issues,
      performance concerns, and unclear design choices. Be precise and constructive.
```
接著使用`/personality codereviewer`切換。

### SOUL.md與`/personality`的差異

`SOUL.md`是基準語氣，`/personality`則是工作階段層級的疊加設定。13建議在`SOUL.md`中維持務實的預設值，再於教學對話中使用`/personality teacher`，或在腦力激盪時使用`/personality creative`。

## Nous Tool Gateway（v0.10.0+）

自Hermes Agent v0.10.0（2026年4月16日）起，付費的**Nous Portal訂閱者**可使用現有的Portal憑證，透過代管方式存取一組精選工具，無須管理額外的API金鑰。28 Hermes CLI本身仍採用MIT授權，並完全開放原始碼。改變之處在於，Portal驗證如今除了模型推論，還能解鎖更多功能。

### Gateway包含哪些工具

| 工具 | 供應商 | 使用情境 | 
|---|---|---|
| 網頁搜尋 | Firecrawl | 為需要最新資訊的agent擷取資料 | 
| 圖像生成 | FAL / FLUX 2 Pro | 無須設定FAL金鑰，即可直接生成圖像 | 
| 文字轉語音 | OpenAI TTS | 在messaging gateway上提供語音輸出 | 
| 瀏覽器自動化 | Browser Use | 無頭瀏覽與資料擷取 | 

### 運作方式

gateway透過新增的`use_gateway`設定欄位，讓每項工具都能**個別選擇啟用**。若您已在`hermes auth`中設定Portal憑證，並為某項工具啟用gateway，該工具的呼叫便會透過Portal路由。否則，系統會使用您的直接API金鑰（若有）。

```
# config.yaml — per-tool gateway opt-in
tools:
  web_search:
    provider: firecrawl
    use_gateway: true          # route via Nous Portal subscription
  image_generation:
    provider: fal
    use_gateway: true
```
**執行階段優先順序：**當gateway可用，且工具設有`use_gateway: true`時，即使您也設定了直接API金鑰，Hermes仍會優先使用gateway。這會影響計費方式：gateway呼叫會扣除Portal訂閱額度，而非直接API金鑰的餘額。

### 啟用gateway

```
hermes model                      # select Nous Portal (OAuth flow)
hermes tools                      # per-platform tool picker integrates gateway tools
hermes status                     # confirms gateway/subscription detection
```
系統會根據您已在`hermes auth`中設定的Portal OAuth憑證，自動偵測訂閱狀態，無須另行登入。自v0.19.0起，您也能直接在工作階段中管理訂閱：`/subscription`會顯示方案與剩餘額度、準確預覽升級費用或降級生效時間，並套用變更，同時顯示排程變更橫幅並提供復原功能；`/topup`則可加購額度。桌面應用程式也提供對應的帳務設定分頁。23

### 定價與存取權限

定價與方案名稱公布於Nous Portal定價頁面（`https://portal.nousresearch.com/pricing`）。本指南不逐一列出方案，因為這些方案由Portal產品負責，而非Hermes CLI，且其變更不依附於Hermes版本。請前往`https://portal.nousresearch.com/`註冊，並在定價頁面查看目前方案。

### 棄用通知

- `HERMES_ENABLE_NOUS_MANAGED_TOOLS`環境變數已於v0.10.0中- **移除**。代管工具現在透過各工具的- `use_gateway`設定欄位啟用，並依您的Portal訂閱狀態決定是否開放。- 28

### 釐清：此版本*並非*如此

Hermes Agent CLI**並未受訂閱限制**。此專案仍採用MIT授權；所有核心功能（CLI、skills、記憶、messaging gateway、cron、MCP、本機儀表板，以及所有供應商的BYOK）均可端對端運作，無須向任何人付費。v0.10.0只是為已訂閱Nous Portal的使用者增添一條便利途徑，並未移除免費使用方式中的任何功能。

## Messaging Gateway

Hermes能以長時間執行的gateway程序運作，透過單一gateway程序連接**22個通訊平台**：Telegram、Discord、Slack、WhatsApp、Signal、SMS、Email、Home Assistant、Mattermost、Matrix、DingTalk、Feishu/Lark、WeCom、Weixin（WeChat）、BlueBubbles（iMessage）、QQBot、Microsoft Teams、Tencent Yuanbao、Google Chat、LINE、SimpleX Chat，以及通用Webhook介接器。327171819 v0.9.0新增透過BlueBubbles使用iMessage的支援（自動註冊webhook、設定精靈與當機復原能力），並透過iLink Bot API原生支援WeChat，同時為企業應用程式提供WeCom回呼模式。16 v0.11.0新增QQBot。27 v0.12.0新增Microsoft Teams與Tencent Yuanbao。17 **v0.13.0新增Google Chat，成為第20個平台**，並沿用相同的可插拔介接器架構；IRC與Microsoft Teams也已移轉至新的介接器模式，採用通用的`env_enablement_fn`／`cron_deliver_env_var`外掛掛鉤。18 **v0.14.0新增LINE與SimpleX Chat**，並完成Microsoft Teams的端對端技術堆疊，包括Graph驗證、webhook監聽器、管線執行階段與對外傳送功能。19 **v0.17.0（2026年6月19日）新增透過Photon Spectrum且無須中繼的iMessage支援**（使用`hermes photon login`進行裝置代碼OAuth，不再需要Mac／BlueBubbles中繼）、**官方WhatsApp Business Cloud API介接器**（取代原有的橋接程序需求）、**SimpleX群組與原生附件支援**，並將**Raft**納入內建平台外掛。21

### 設定

```
hermes gateway setup                # Interactive platform configuration
hermes gateway install              # Install as user service (systemd/launchd)
hermes gateway start                # Start the installed service
hermes gateway stop
hermes gateway restart
hermes gateway status
hermes gateway run                  # Run in foreground (debugging)
```
互動式設定會逐步引導您連接各平台，包括API權杖、bot ID、頻道對應與允許清單。6

### 訊息流程

根據上游架構文件：3

```
Platform event → Adapter.on_message() → MessageEvent
  → GatewayRunner._handle_message()
    → authorize user
    → resolve session key
    → create AIAgent with session history
    → AIAgent.run_conversation()
    → deliver response back through adapter
```
**每個通訊平台都使用與CLI相同的 AIAgent對話迴圈。**因此，斜線指令在兩者中的運作方式完全一致，而在Telegram中排程的cron工作，也能將輸出傳送至Discord。平台之間的差異只存在於邊緣層。

3

**v0.19.0新增以profile為基礎的訊息路由與持久化傳送機制。**共用單一bot權杖的多工gateway，可將特定guild、頻道或討論串路由至不同profile；每個profile的設定、skills、記憶與密鑰皆完全隔離，並可透過`GATEWAY_MULTIPLEX_PROFILES`覆寫。經過一系列強化後，單一profile設定錯誤也不會再拖垮整個gateway。底層路由索引已移至`state.db`（`sessions.json`如今僅為選用的舊版鏡像），最終回應則會在平台傳送前後，記錄至持久化的傳送責任帳本。若完成的回答因gateway當機而未能送出，系統會在下次啟動時重新傳送，而不會無聲遺失。23

### 使用者授權與配對

```
hermes pairing list                    # Show pending and approved users
hermes pairing approve <platform> <code>
hermes pairing revoke <platform> <user-id>
hermes pairing clear-pending
```
配對碼可防止陌生人任意與您的gateway互動。使用者從其通訊平台傳送配對碼；您透過`hermes pairing approve`核准後，該使用者日後即獲得授權。6

## 排程工作（Cron）

Hermes具備第一級的cron系統，其中的工作是**agent任務**，而非shell指令。每個排程工作都會使用設定的提示、可選的附加skills，透過全新的`AIAgent`執行，並將結果傳送至任何平台：36

```
hermes cron list
hermes cron create --prompt "Check HN for AI news and summarize" --schedule "0 9 * * *" --deliver telegram
hermes cron edit <id>
hermes cron pause <id>
hermes cron resume <id>
hermes cron run <id>         # Trigger now on the next tick
hermes cron remove <id>
hermes cron status           # Check if scheduler is running
hermes cron tick             # Run due jobs once and exit
```
也可以直接在通訊聊天中透過對話建立：

```
Every morning at 9am, check Hacker News for AI news and send me a summary on Telegram.
```
agent會使用其工具設定cron工作。工作會持久儲存於JSON，並在重新啟動後繼續保留。3

## MCP整合

Hermes同時支援以用戶端與伺服器身分使用Model Context Protocol：6

**作為用戶端**——將Hermes連接至外部MCP伺服器，以擴充其工具範圍：

```
hermes mcp add <name> --url https://example.com/mcp
hermes mcp add <name> --command npx --args "-y,@modelcontextprotocol/server-github"
hermes mcp list
hermes mcp test <name>
hermes mcp remove <name>
hermes mcp configure <name>   # Toggle individual tool selection
```
或在`config.yaml`中手動設定：14

```
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_xxx"
```
自v0.19.0起，MCP工具會依照`mcp__server__tool`命名慣例提供給模型。每個工具名稱都會包含其伺服器名稱，因此兩部伺服器即使提供同名工具，也不會再發生衝突；MCP伺服器的日誌通知也會顯示於`agent.log`。23

**作為伺服器**——將Hermes對話開放給其他agent：

```
hermes mcp serve
hermes mcp serve -v    # Verbose
```
## Context 壓縮

Hermes 會自動壓縮過長的對話，使其維持在模型的 Context Window 範圍內。壓縮摘要器會另外呼叫一次 LLM，您可以將其指向任何提供者或端點。4

```
compression:
  enabled: true
  threshold: 0.50                           # Compress at this % of context limit
  target_ratio: 0.20                        # Fraction to preserve as recent tail
  protect_last_n: 20                        # Min recent messages to keep uncompressed
  summary_model: "google/gemini-3-flash-preview"
  summary_provider: "auto"                  # "auto", "openrouter", "nous", "codex", "main", etc.
  summary_base_url: null                    # Custom OpenAI-compatible endpoint
```
**提供者選項：**4

| `summary_provider` | `summary_base_url` | 結果 | 
|---|---|---|
| `auto`（預設） | 未設定 | 自動偵測最佳的可用提供者 | 
| `nous`/`openrouter`/ 等 | 未設定 | 強制使用該提供者及其驗證機制 | 
| 任意值 | 已設定 | 直接使用自訂端點（忽略提供者） | 

`summary_model` 支援的 Context Length 必須至少與主要模型相同，因為它會接收對話中間的完整內容進行壓縮。4

### 預算壓力警告

當 agent 執行包含大量工具呼叫的複雜任務時，可能會在不知不覺間耗盡迭代預算（預設：90 輪）。預算壓力機制會自動警告模型：4

| 門檻 | 等級 | 模型看到的內容 | 
|---|---|---|
| 70% | 注意 | `[BUDGET: 63/90. 27 iterations left. Start consolidating.]` | 
| 90% | 警告 | `[BUDGET WARNING: 81/90. Only 9 left. Respond NOW.]` | 

### 串流逾時

LLM 串流連線設有兩層逾時機制，並會針對本機提供者（localhost、區域網路 IP）自動調整：4

| 逾時 | 預設值 | 本機提供者 | 環境變數 | 
|---|---|---|---|
| Socket 讀取逾時 | 120 秒 | 自動提高至 1800 秒 | `HERMES_STREAM_READ_TIMEOUT` | 
| 停滯串流偵測 | 180 秒 | 自動停用 | `HERMES_STREAM_STALE_TIMEOUT` | 
| API 呼叫（非串流） | 1800 秒 | 不變 | `HERMES_API_TIMEOUT` | 

本機端點的 Socket 讀取逾時會提高至 30 分鐘，因為本機 LLM 在處理大型 Context 時，可能需要數分鐘才能完成預填並產生第一個 Token。4

## 本機 Web 儀表板（v0.9.0+）

這是一套透過瀏覽器操作的儀表板，可在本機管理 Hermes Agent。無須接觸設定檔或終端機，即可調整設定、監控工作階段、瀏覽 skills，以及管理 gateway。16請使用 `hermes dashboard` 啟動。對於偏好 GUI 的新使用者而言，這是最容易上手的途徑。

## 背景程序監控（v0.9.0+）

`watch_patterns` 可讓您設定要在背景程序輸出中監控的模式，並於符合條件時即時收到通知。16無須輪詢，即可監控錯誤、等待特定事件（「listening on port」），或查看建置記錄。搭配 v0.8.0 推出的 `notify_on_complete`（會在背景任務完成時發出通知），Hermes 如今已具備完整的背景程序可觀測性層。15

## 可插拔式 Context Engine（v0.9.0+）

現在可透過 `hermes plugins` 將 Context 管理作為可插拔的插槽。您可以換用自訂 context engine，控制 agent 在每一輪看到的內容，包括篩選、摘要或注入特定領域的 Context。16這使 Context 策略與 agent 核心迴圈彼此解耦，從而能依專案或領域自訂 Context。

## 備份與還原（v0.9.0+）

`hermes backup` 會建立完整封存檔，其中包含設定、工作階段、skills 與記憶。`hermes import` 則可從備份封存檔還原。16您可以利用這項功能在不同機器間移轉、於重大變更前建立快照，或與團隊成員分享經過驗證的設定。

## Termux / Android 支援（v0.9.0+）

Hermes 可透過 Termux 在 Android 上原生執行。經過調整的安裝路徑、針對行動裝置螢幕最佳化的 TUI、語音後端支援，以及 `/image` 指令，皆可直接在裝置上運作。16

## 安全性強化（v0.13.0+）

v0.13.0 修正了 **8 項 P0 安全性問題**，並調整一項預設值，使其更有利於使用者。18隨後推出的 v0.14.0 又修正了 12 項 P0 與 50 項 P1 問題，包括防範 sudo 暴力破解與強化 sudo-stdin、修正危險指令繞過漏洞、在將工具錯誤重新注入模型前進行清理、儀表板外掛 API 驗證、補強 skills-hub 的 SSRF 防護範圍，以及在安裝期間掃描供應鏈安全公告。19

| 修正項目 | 變更內容 | 
|---|---|
| 預設啟用機密資訊遮蔽 | 過去必須選擇啟用。除非明確停用，否則記錄與 `hermes debug share`上傳內容都會遮蔽機密資訊。v0.12.0 曾因接獲承載資料損毀的回報而預設停用遮蔽功能；v0.13.0 則重新啟用，將其恢復為更安全的基準設定。 | 
| Discord 跨 guild 私訊繞過漏洞（CVSS 8.1） | Discord 角色允許清單現在以 guild 為範圍，封堵了使用者憑藉某個 guild 的角色，即可取得所有 guild 私訊授權的途徑。 | 
| WhatsApp 預設限制 | WhatsApp 轉接器預設會拒絕陌生人，且絕不回應自己與自己的聊天。 | 
| MCP OAuth TOCTOU 時窗 | 修正 MCP OAuth 流程儲存憑證時的競爭條件。 | 
| CLI `auth.json`TOCTOU | 修正 CLI 驗證儲存區的憑證寫入器中，性質相似的 TOCTOU 時窗。 | 
| 瀏覽器 SSRF 防護底線 | 混合路由會強制套用雲端中繼資料 SSRF 防護底線，阻擋嘗試存取 `169.254.169.254`及同等位址的要求。 | 
| Cron 提示注入掃描 | cron 工作執行前，系統會掃描組合完成的提示（包括載入的 skill 內容），檢查是否存在提示注入。 | 
| `hermes debug share`遮蔽 | Debug share 上傳會在上傳時遮蔽記錄內容，而不僅是在寫入時處理。 | 

若您負責維護 Hermes 部署環境，應將 v0.13.0 與 v0.14.0 視為**攸關安全性的升級**，而非單純的功能更新。v0.13.0 修正了 Discord 跨 guild 繞過漏洞與兩個 TOCTOU 時窗；v0.14.0 則進一步強化 sudo 處理、工具錯誤重新注入、外掛 APIs、skills-hub SSRF，以及相依套件安全公告等面向。

## 實務工作者的架構指南

本節適合希望深入瞭解底層運作方式，以便除錯、擴充或分析效能的人士。內容綜合整理自上游架構文件。3

### 進入點 → AIAgent

Hermes 中的每個進入點最終都會呼叫 `AIAgent.run_conversation()`：

```
┌──────────────────────────────────────────────────────────────────┐
│                        Entry Points                              │
│                                                                  │
│  CLI (cli.py)    Gateway (gateway/run.py)    ACP (acp_adapter/)  │
│  Batch Runner    API Server                  Python Library     │
└──────────┬──────────────┬───────────────────────┬────────────────┘
           │              │                       │
           ▼              ▼                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                     AIAgent (run_agent.py)                       │
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │ Prompt      │  │ Provider     │  │ Tool         │             │
│  │ Builder     │  │ Resolution   │  │ Dispatch     │             │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘             │
│         │                │                 │                    │
│  ┌──────┴───────┐ ┌──────┴───────┐  ┌──────┴───────┐             │
│  │ Compression  │ │ 3 API Modes  │  │ Tool Registry│             │
│  │ & Caching    │ │ chat_compl   │  │ 47 tools     │             │
│  │              │ │ codex_resp   │  │ 20 toolsets  │             │
│  │              │ │ anthropic    │  │              │             │
│  └──────────────┘ └──────────────┘  └──────────────┘             │
└──────────────────────────────────────────────────────────────────┘
```
圖表改編自上游架構文件。3

**啟動畫面中的「47 個工具／20 個 toolset」與「28 個工具」有何差異？**「47 個工具」是上游儲存庫完整工具登錄表的總數，也就是 Hermes 隨附原始程式碼的所有 toolset 內全部工具。實際執行中的 CLI 會在啟動畫面顯示較小的數字（本指南驗證所用的安裝環境顯示 `28 tools / 89 skills`）。這並非錯誤。許多 toolset 都是選用項目，必須在 `config.yaml` 的 `toolsets:` 下明確啟用，例如訊息平台介面卡、瀏覽器自動化，以及負載較高的資料擷取工具等。登錄表總數代表「可用項目」，啟動畫面數字則代表「目前 profile 中已啟用的項目」。可透過 `hermes tools --list` 查看啟用中的 toolset，並使用 `~/.hermes/config.yaml` 內的 `toolsets:` 區塊啟用或停用個別 toolset（亦可在執行中的工作階段內使用 `/tools list`、`/tools enable <name>` 或 `/tools disable <name>`；移除工具會觸發工作階段重設，讓 agent 重新建置工具資訊清單）。

### 3 種 API 模式

Hermes 將不同提供者之間的差異抽象化為 3 種 API 模式，並在執行階段自動選用：3

| API 模式 | 適用對象 | 
|---|---|
| `chat_completions` | OpenRouter、z.ai、Kimi、MiniMax、DeepSeek、Alibaba、大多數自訂端點，以及任何與 OpenAI 相容的伺服器 | 
| `codex_responses` | OpenAI Codex（透過 ChatGPT OAuth） | 
| `anthropic_messages` | Anthropic API（原生）、Anthropic OAuth、與 Anthropic 相容的代理伺服器 | 

`runtime_provider.py` 解析器會為 18 個以上的提供者，將 `(provider, model)` 元組對應至 `(api_mode, api_key, base_url)`，同時處理 OAuth 流程、憑證集區與別名解析。3

### CLI 工作階段中的資料流

```
User input → HermesCLI.process_input()
  → AIAgent.run_conversation()
    → prompt_builder.build_system_prompt()
    → runtime_provider.resolve_runtime_provider()
    → API call (chat_completions / codex_responses / anthropic_messages)
    → tool_calls? → model_tools.handle_function_call() → loop
    → final response → display → save to SessionDB
```
出自上游架構頁面。3

### 提示詞組裝順序

提示詞堆疊依序包含：13

- `SOUL.md`（agent 身分；若無法使用，則採用內建備援內容）
- 能感知工具的行為指引
- 記憶／使用者情境（`MEMORY.md`、`USER.md`）
- Skills 指引
- 情境檔案（`AGENTS.md`、`.cursorrules`）
- 時間戳記
- 平台專用格式提示
- 選用的系統提示詞覆寫內容，例如 `/personality`

`SOUL.md` 是整體基礎，其餘內容皆建構於此。13

### 工作階段儲存空間

採用 SQLite 的工作階段儲存機制，並支援 FTS5 全文搜尋。工作階段具備譜系追蹤功能（記錄壓縮前後的父子關係）、各平台相互隔離，以及包含競爭狀況處理的不可分割寫入機制。3

### 外掛系統

共有 3 個探索來源：`~/.hermes/plugins/`（使用者）、`.hermes/plugins/`（專案）及 pip 進入點。外掛透過情境 API 登錄工具、掛鉤與 CLI 命令。記憶提供者是位於 `plugins/memory/` 下的特殊外掛類型。3

```
hermes plugins                       # Interactive enable/disable UI
hermes plugins install <repo>        # Install from Git URL or owner/repo
hermes plugins enable <name>
hermes plugins disable <name>
hermes plugins list
```
### 設計原則

出自上游架構頁面：3

| 原則 | 實務上的意義 | 
|---|---|
| 提示詞穩定性 | 系統提示詞不會在對話途中變更。除非使用者明確執行操作（ `/model`），否則不會產生破壞快取的變更 | 
| 執行過程可觀測 | 每次工具呼叫都會透過回呼向使用者顯示。CLI 會以旋轉指示器呈現進度，gateway 則使用聊天訊息 | 
| 可中斷 | 使用者可透過輸入或訊號，在執行途中取消 API 呼叫與工具執行 | 
| 不受平台限制的核心 | 單一 `AIAgent`類別同時服務 CLI、gateway、ACP、批次作業及 API 伺服器。平台差異由進入點處理 | 
| 鬆散耦合 | 選用子系統（MCP、外掛、記憶提供者、RL 環境）採用登錄模式與 check_fn 閘控，不形成強制相依關係 | 
| Profile 隔離 | 每個 profile 都有各自的 `HERMES_HOME`、設定、記憶、工作階段與 gateway PID。多個 profile 可同時執行 | 

## 從 OpenClaw 移轉

Hermes Agent 是 OpenClaw 的後繼產品。若要從現有的 OpenClaw 安裝環境移轉：65

```
hermes claw migrate --dry-run                    # Preview what would be migrated
hermes claw migrate --preset full                # Full migration including API keys
hermes claw migrate --preset user-data --overwrite   # User data only, no secrets
hermes claw migrate --source /custom/path        # Non-default OpenClaw location
```
`hermes claw migrate` 預設會從 `~/.openclaw` 讀取資料（也會自動偵測舊版 `~/.clawdbot` 與 `~/.moldbot` 目錄），並寫入 `~/.hermes`。6

**直接匯入**（30 多種類別）：`SOUL.md`、`MEMORY.md`、`USER.md`、`AGENTS.md`、來自 4 個來源目錄的 skills、預設模型、自訂提供者、MCP 伺服器、訊息平台權杖與允許清單（Telegram、Discord、Slack、WhatsApp、Signal、Matrix、Mattermost）、agent 預設值（推理強度、壓縮、人為延遲、時區、沙箱）、工作階段重設原則、核准規則、TTS 設定、瀏覽器設定、工具設定、執行逾時、命令允許清單、gateway 設定，以及來自 3 個來源的 API 金鑰。6

**封存以供手動檢閱：**cron 工作、外掛、掛鉤／webhook、記憶後端（QMD）、skills 登錄設定、UI／身分、記錄、多 agent 設定、頻道繫結、`IDENTITY.md`、`TOOLS.md`、`HEARTBEAT.md`、`BOOTSTRAP.md`。6

API 金鑰會依下列優先順序檢查 3 個來源：設定值 → `~/.openclaw/.env` → `auth-profiles.json`。6

## 疑難排解

### 「尚未設定推論供應商。請執行 ‘hermes model’ 選擇供應商與模型」

每次全新安裝最先遇到的錯誤：Hermes 尚未解析出可用的供應商。這正如訊息所示——3 種驗證路徑均未產生可用的供應商。請執行：

```
hermes model
```
互動式選擇器會引導您完成所有支援的供應商設定，包括 OAuth 裝置代碼流程（Nous Portal、GitHub Copilot、Anthropic、OpenAI Codex），以及自架伺服器的自訂端點。若您原本預期供應商已設定完成，`hermes doctor` 會顯示 Hermes 實際可存取哪些憑證。常見原因包括：API 金鑰設在錯誤的位置（應放在 `.env` 中或透過 `hermes config set` 設定，而非放在 shell profile）、`~/.hermes/auth.json` 中的 OAuth 憑證已過期，或 `config.yaml` 的自訂端點遺失了 `base_url`。如需深入瞭解驗證路徑，請參閱驗證與供應商。27

### 「未設定 API 金鑰」

執行 `hermes model` 以互動方式設定供應商，或執行 `hermes config set OPENROUTER_API_KEY your_key`。`hermes doctor` 指令會明確指出缺少哪些金鑰。7

### 啟動時出現「Context limit: 2048 tokens」（本機模型）

Hermes 會從伺服器的 `/v1/models` 端點自動偵測 context 長度，但許多本機伺服器回報的預設值偏低。請在 `config.yaml` 中明確設定：2

```
model:
  default: your-model
  provider: custom
  base_url: http://localhost:11434/v1
  context_length: 32768
```
### 工具呼叫顯示為文字，而未實際執行

您的伺服器未啟用工具呼叫，或該模型無法透過伺服器的實作方式支援此功能。2

| 伺服器 | 修正方式 | 
|---|---|
| llama.cpp | 在啟動指令中加入 `--jinja` | 
| vLLM | 加入 `--enable-auto-tool-choice --tool-call-parser hermes` | 
| SGLang | 加入 `--tool-call-parser qwen`（或適用的解析器） | 
| Ollama | 工具呼叫預設為啟用——請使用 `ollama show <model>`確認您的模型支援此功能 | 
| LM Studio | 更新至 0.3.6 以上版本，並使用原生支援工具的模型 | 

### 回應在句子中途遭到截斷

可能有以下 2 種原因：2

- 伺服器上的**輸出上限過低**（`max_tokens`）——SGLang 預設每次回應為 128 個 token。請在伺服器上設定`--default-max-tokens`，或在`config.yaml`中設定`model.max_tokens`。
- **Context 耗盡**——模型已填滿 context window。請提高- `model.context_length`，或在 Hermes 中啟用 context 壓縮。

### 從 WSL2 連線至 Windows 主機上的模型伺服器時出現「Connection refused」

WSL2 使用具有獨立子網路的虛擬網路介面卡——WSL2 內的 `localhost` 指向 Linux VM，而非 Windows 主機。有 2 種解決方式：2

**鏡像網路**（Windows 11 22H2 以上版本）：編輯 `%USERPROFILE%\.wslconfig`：

```
[wsl2]
networkingMode=mirrored
```
接著執行 `wsl --shutdown` 並重新啟動。現在 `localhost` 可進行雙向連線。

**主機 IP 備援方式**（舊版 Windows）：從 WSL2 內取得 Windows 主機 IP，並用它取代 `localhost`：

```
ip route show | grep -i default | awk '{ print $3 }'
# Use that IP as the base_url host
```
此外，模型伺服器也必須繫結至 `0.0.0.0`，而非 `127.0.0.1`——Ollama 請設定 `OLLAMA_HOST=0.0.0.0`；llama-server／SGLang 請加入 `--host 0.0.0.0`；LM Studio 則請啟用「Serve on Network」。2

### 所有內容都存放在哪裡？

此時 `hermes status` 和 `hermes dump` 正好派上用場。`hermes logs list` 會顯示所有記錄檔及其大小。`hermes config path` 會輸出設定檔位置，而 `hermes config env-path` 則會輸出 `.env` 的位置。6

## 常見問題

### Hermes Agent 與 Claude Code 有何不同？

Claude Code 是 Anthropic 官方推出的 CLI，僅限使用 Anthropic 模型。Hermes Agent 則是 Nous Research 推出的開放原始碼 agent 框架，可搭配任何與 OpenAI 相容的供應商——包括 Nous Portal、OpenRouter、Anthropic、GitHub Copilot、z.ai、Kimi、MiniMax、DeepSeek、Hugging Face、Google，或您自行架設的端點。12 Hermes 還內建 Telegram／Discord／Slack／WhatsApp／Signal 的訊息 gateway，而 Claude Code 並未提供此功能。

### 我可以搭配 Anthropic API 金鑰使用 Hermes 嗎？

可以，共有 3 種方式：2

- 在 `~/.hermes/.env`中設定`ANTHROPIC_API_KEY`，再執行`hermes chat --provider anthropic --model claude-sonnet-4-6`
- 執行 `hermes model`並選擇 Anthropic——若可用，Hermes 將使用 Claude Code 的憑證儲存區
- 手動設定 `ANTHROPIC_TOKEN`（setup-token 或 OAuth token）作為備援

若您已在同一台電腦上使用 Claude Code，建議選擇第 2 種方式——如此可讓能重新整理的 Claude 憑證繼續保持可重新整理狀態。

### 如何在不遺失對話的情況下切換供應商？

請在工作階段中使用 `/model provider:model`。對話記錄、memory 與 skills 都會完整保留：9

```
/model zai:glm-5
/model openrouter:anthropic/claude-sonnet-4
/model custom:local:qwen-2.5
```
### 我已設定 Anthropic，但視覺／網頁／壓縮功能無法運作

這是輔助模型備援所造成的問題。視覺、網頁摘要、壓縮及其他輔助工作會使用獨立的輔助 LLM——預設會透過自動偵測使用 Gemini Flash（OpenRouter → Nous → Codex）。若上述供應商均未設定，而您只設定了 Anthropic，這些功能便會在沒有明顯提示的情況下降級。4

修正方式：加入 `OPENROUTER_API_KEY` 以處理輔助工作，或重新設定輔助 slot，讓其使用主要供應商。請注意，context 壓縮位於獨立的頂層 `compression:` 區塊，並使用 `summary_provider`，而不是 `auxiliary.compression.provider`——`auxiliary.compression` slot 僅提供 `timeout`。完整修正方式如下：

```
auxiliary:
  vision:      { provider: "main" }
  web_extract: { provider: "main" }
compression:
  summary_provider: "main"
```
### SOUL.md 與 AGENTS.md 有何不同？

`SOUL.md` 定義 agent 的身分——語氣、風格與預設溝通方式。它位於 `~/.hermes/SOUL.md`，無論使用場景為何都會隨您使用。`AGENTS.md` 則專屬於個別專案——涵蓋架構、慣例、指令與路徑——並存放在專案目錄中。13 若內容應在所有情境下套用，請放入 `SOUL.md`；若內容僅適用於特定專案，則放入 `AGENTS.md`。

### 如何同時並行多個 Hermes 執行個體？

使用 profiles。每個 profile 都有各自的 `HERMES_HOME`、設定、memory、工作階段與 gateway PID：6

```
hermes profile create work --clone
hermes profile use work                 # Sticky default
hermes -p work chat -q "..."            # One-off without switching
hermes profile alias work --name h-work # Wrapper script
```
### Hermes 支援本機 LLM 嗎？

支援，可透過自訂端點路徑使用。Hermes 可搭配任何與 OpenAI 相容的伺服器，包括 Ollama、vLLM、SGLang、llama.cpp／llama-server、LM Studio、LocalAI、Jan，或您自行架設的伺服器。2 各伺服器的設定方式，請參閱自訂與自行架設的端點。

### 為什麼啟動橫幅顯示的工具數量少於指南所述？

本指南引用上游架構登錄中的 47 項工具／20 個 toolsets——這是 Hermes 在所有 toolset 中提供原始程式碼的完整工具數量。您執行中的安裝版本會在橫幅顯示較少的數量（本指南使用的參考安裝環境顯示 28 項工具），因為 Hermes 啟動時只會啟用預設的 toolset 組合。許多 toolsets 必須自行啟用：訊息 gateway 介接器、瀏覽器自動化、較大型的擷取技術堆疊，以及數種專用整合，都必須明確列在 `~/.hermes/config.yaml` 的 `toolsets:` 下方才會載入。登錄總數＝「啟用後可使用的項目」；橫幅總數＝「目前 profile 實際載入的項目」。請使用 `hermes tools --list` 查看哪些 toolsets 已啟用，以及哪些可用但尚未啟用。執行時可使用 `/tools enable <name>` 和 `/tools disable <name>` 切換個別 toolsets（停用時會重設工作階段，讓 agent 依照新的工具組成重建工具資訊清單）。

### 主要供應商失敗時，Hermes 如何處理模型備援？

在 `config.yaml` 中設定 `fallback_model` 區塊：2

```
fallback_model:
  provider: openrouter
  model: anthropic/claude-sonnet-4
```
主要供應商發生失敗時（速率限制、伺服器錯誤或驗證失敗），Hermes 會在工作階段進行期間切換至備援模型，且不會遺失對話記錄。每個工作階段最多觸發 1 次。

### Agent 能否隨時間推移改善自己的 skills？

可以——這正是 Hermes Agent「自我改進」的核心。Agent 可透過 `skill_manage` 工具建立、更新及刪除 skills。當它掌握一套不簡單的工作流程後，便會將方法儲存為 skill，供日後重複使用。11 Agent 會在完成複雜工作（呼叫工具 5 次以上）、遇到錯誤並找到可行做法、您修正其處理方式，或發現不簡單的工作流程後建立 skills。

### 是否提供 IDE 整合？

有——Hermes 可作為 ACP（Agent Client Protocol）伺服器執行，供 VS Code、Zed 與 JetBrains 使用：6

```
pip install -e '.[acp]'
hermes acp
```
## 變更日誌

| 日期 | 變更 | 來源 | 
|---|---|---|
| 2026-07-21 | 指南v1.11： v0.19.0「The Quicksilver Release」（2026年7月20日，標籤新增「v0.19.0的新功能」一節：`v2026.7.20`）。首次回合TTFT縮短約80%（冷啟動提交至派送時間，在CLI/gateway/TUI/桌面版/cron全面由約4.3秒降至約0.9秒）；預設即時串流顯示推理過程（`display.show_reasoning`為開啟狀態）；桌面版迎來約20個PR的效能提升（串流Markdown速度加快14倍），TUI也支援增量Markdown；已棄用pip/Homebrew安裝方式（僅顯示「不受支援的舊版方式」警告，並計畫停止發布至PyPI/Homebrew）——安裝章節與TL;DR已修正為單行安裝程式；新增可插拔的，支援Bitwarden與1Password供應者（`SecretSource``op://`參照、多保管庫、確定性優先順序、逐變數來源追蹤）；智慧核准成為預設值（每個遭標記的命令均由獨立LLM審查者檢查），另有即使在YOLO模式下仍然有效的使用者自訂拒絕規則、`/deny <reason>`，以及重新加入的plugin`pre_tool_call`核准升級機制；新增終端機計費功能`/subscription`與`/topup`，以及桌面版計費分頁（撤回「沒有獨立訂閱命令」的說法）；`state.db`新增即時subagent逐字記錄、持久化背景委派與交付義務帳本；`max_async_children`已棄用，改採統一的委派並行上限；新增以profile為基礎的gateway訊息路由（單一多工bot權杖→彼此隔離的profile、`GATEWAY_MULTIPLEX_PROFILES`、`state.db`中的路由索引，以及作為選用舊版鏡像的`sessions.json`）；供應者／模型：Fireworks AI（選擇器第2順位）、DeepInfra、Upstage Solar、完整端對端支援GPT-5.6（Sol/Terra/Luna與Pro）、grok-4.5正式發布、kimi-k3（kimi-k2.x已退役）、完整接通Claude Sonnet 5、各供應者可設`enabled: false`並搭配`excluded_providers`、推理強度新增`max`／`ultra`層級並支援逐模型／逐MoA位置覆寫，以及工作階段範圍的`/reasoning`；CLI/MCP：`hermes sessions export`（Markdown/Quarto/HTML/僅提示詞/HF-trace、`--redact`）、`/model --once`、堆疊式斜線skill呼叫、`--safe-mode`、`hermes config get`／`unset`、真正無介面的`hermes serve`，以及MCP的`mcp__server__tool`命名方式。另補記先前遺漏的修補標籤：v0.18.1（標籤——基礎架構修補彙整；v0.18.2的實質修正是解除WhatsApp Baileys的版本鎖定，改用7.0.0-rc13，以確保Docker建置可靠。`v2026.7.7`）與v0.18.2（標籤`v2026.7.7.2`），2026年7月7日至8日 | 2324 | 
| 2026-07-16 | 新增第一則疑難排解項目，處理以下逐字啟動錯誤：「No inference provider configured. Run ‘hermes model’ to choose a provider and model」——此項目源於搜尋需求，並引導至互動式選擇器、`hermes doctor`及3種驗證途徑。產品本身沒有變更。 | 27 | 
| 2026-07-01 | 指南v1.10： v0.18.0「The Judgment Release」（2026年7月1日，標籤新增「v0.18.0的新功能」一節：完整清除P0/P1待辦項目（約692項）；`v2026.7.1`）。Mixture-of-Agents成為一級功能，提供帶標籤的逐模型集成輸出與即時串流；新增完成契約——`/goal`會執行專案檢查，自行驗證工作成果；新增（描述工作流程→產生符合CONTRIBUTING.md規範的可重用skill）；新增`/learn`記憶／skill時間軸與桌面版記憶圖譜；支援`/journey`背景subagent扇出（並行委派任務）；新增桌面版Projects（專案／儲存庫／lane）；新增具備排空協調功能的縮容至零gateway；支援Google Vertex AI（透過GCP服務帳戶使用Gemini，自動重新整理OAuth2）；新增\$EDITOR編輯器。來源：hermes-agent releases。`/prompt` | 22 | 
| 2026-06-21 | 指南v1.9： v0.17.0「The Reach Release」（2026年6月19日，標籤新增「v0.17.0的新功能」一節。`v2026.6.19`）。訊息功能：透過Photon Spectrum直接連接iMessage，無須中繼（`hermes photon login`、裝置代碼OAuth）；官方WhatsApp Business Cloud API轉接器（無須橋接）；SimpleX群組與附件；Raft平台plugin。模型：`z-ai/glm-5.2`（1M）、`anthropic/claude-fable-5`、`laguna-m.1`、`nemotron-3-ultra`、`grok-composer-2.5-fast`（xAI OAuth、200k）；xAI預設模型改為`grok-build-0.1`；Anthropic自適應模型不再使用`reasoning`欄位。桌面版／儀表板：背景subagent與即時監看視窗（`delegate_task(background=true)`）、完整profile建構工具、重新設計的Skills Hub、Automation Blueprints、安全的401登入、VS Code Marketplace主題，以及日文與繁體中文介面。Skills／工具：`image_generate`圖生圖編輯、`memory`不可分割的`operations`批次處理、`simplify-code`skill，以及取代`write_mode`的布林值`write_approval`。架構：MCP引導處理常式、可插拔CronScheduler與Chronos、Managed範圍（`/etc/hermes`）、Gateway對Gateway中繼。命令：`/version`、`/billing`、`hermes curator run --consolidate`（選擇啟用）。安全性：封堵shell跳脫拒絕清單繞過、核准／gateway轉接器採失敗時關閉機制、清理cron環境、從偵錯傾印中遮蔽密鑰、MCP stdio資料外洩篩查，以及urllib3與PyJWT的CVE版本更新。已解決2項P0與62項P1（其中16項帶有安全性標籤）。 | 21 | 
| 2026-06-08 | 指南v1.8： v0.16.0「The Surface Release」（2026年6月5日，標籤將指南標題更新為v0.16，並新增「v0.16.0的新功能」一節。重點：Hermes不再僅限於終端機。新增`v2026.6.5`）。原生Hermes Desktop應用程式（Electron，支援macOS/Linux/Windows），具備一鍵安裝、應用程式內自行更新、串流聊天、拖放與剪貼簿圖片貼上、`Cmd+K`選單、工作階段封存／搜尋、狀態列模型選擇器、透過安全WebSocket連線至遠端gateway（OAuth或使用者名稱／密碼、逐profile主機、跨profile的`@session`連結），以及採用具型別i18n的完整簡體中文翻譯。瀏覽器管理面板（網頁儀表板→完整管理介面）：MCP目錄啟用／停用、憑證管理、webhook／hook建立、記憶設定、gateway控制、含更新前檢查與Debug Share的System頁面、新增Channels頁面，以及可插拔驗證（使用者名稱／密碼、自架OIDC、`hermes dashboard register`）。新命令：`/undo [N]`（CLI/TUI/訊息平台）、可設定的預設介面（`cli`/`tui`、`--cli`）、TUI統一的`/model`與Sessions覆疊介面、`hermes portal`、`hermes prompt-size`、`hermes sessions optimize`。新模型：`deepseek-v4-flash`、`MiniMax-M3`（1M context）、`qwen3.7-plus`、`gemini-3.5-flash`；桌面版啟動器提供一級xAI Grok OAuth支援；模糊模型選擇器；每小時重新整理目錄。Skills：更精簡的預設集合（Spotify→原生plugin、Linear→`hermes mcp install linear`、移除失效skills）、`environments:`關聯性門檻（`kanban`/`docker`/`s6`）、預設受信任的`NVIDIA/skills`tap，以及漸進式（限定範圍）揭露MCP/plugin工具。安全性：將CVE-2026-48710（Starlette BadHost）版本鎖定為≥1.0.1；SSRF檢查移出事件迴圈；從子行程環境中移除Bedrock bearer權杖；為`bws_cache.json`加入讀取保護；將`docker restart/stop/kill`納入危險模式；清理不可見Unicode字元。已解決2項P0與62項P1（其中16項帶有安全性標籤）。 | 20 | 
| 2026-05-31 | 指南v1.7.1： v0.15.1（2026年5月29日01:12 UTC）——Velocity修補版。Velocity發布當日推出的hotfix；版本鎖定於標籤`v2026.5.29`系列。修正影響loopback模式部署的儀表板401重新載入迴圈。Docker不再將`--insecure`視為隱含設定——若要重新選擇啟用，請明確設定`HERMES_DASHBOARD_INSECURE=1`。MCP裸命令（`npx`、`npm`、`node`）現在可再次於Docker容器內正確解析。Skills頁面的來源標籤與分類側邊欄可正常呈現。Kanban worker能妥善回應SIGTERM，不再留下孤立行程。透過探索sitemap，Skills.sh目錄從858筆擴增至19,932筆項目。共28次commit、21個合併PR、9位貢獻者。v0.15.2（2026年5月29日13:37 UTC）——Velocity封裝修補版。修正wheel與sdist發行套件，使其納入`plugin.yaml`manifest，確保從PyPI安裝時無須側載原始碼樹。僅限封裝的hotfix，共4位貢獻者。 | 25 | 
| 2026-05-28 | 指南v1.7：新增 v0.15.0（2026年5月28日）——The Velocity release（標籤`v2026.5.28`）。重點：大規模重構與新的協調基本元件。程式碼庫重構：`run_agent.py`縮減76%（16,083→3,821行），並拆分至14個職責內聚的模組。Multi-agent Kanban v2：自動將高階目標拆解為子任務、以swarm拓樸協調平行worker、逐任務模型覆寫、排程任務及worktree管理。效能：冷啟動再縮短1秒；每段對話的函式呼叫次數減少47%；重新設計的，並移除LLM相依套件（也一併消除其API成本）。`session_search`快4,500倍安全性：Promptware防禦在3個安全關卡抵禦Brainworm類提示詞注入；Bitwarden Secrets Manager整合以單一bootstrap權杖取代多組逐供應者API金鑰。Skill套件組合：可透過一個斜線命令同時載入多個skills。TUI工作階段協調器：在單一終端機視窗內管理多個工作階段。新供應者：Krea 2（Medium/Large）與支援影像生成的FAL plugin；本輪xAI整合新增網頁搜尋plugin、OAuth上游支援、退役模型偵測及自然的TTS停頓。統計：1,302次commit、747個合併PR、321位社群貢獻者。根據GitHub版本資訊，當日或隔日的修補版本解決了儀表板401重新載入迴圈、Docker`--insecure`明確環境變數、Docker內的MCP裸命令解析（`npx`、`npm`、`node`）、Skills頁面復原、Kanban worker的SIGTERM處理，以及透過sitemap提供完整的19,932筆Skills目錄。 | 26 | 
| 2026-05-21 | 指南v1.6：新增 v0.14.0（2026年5月16日）——The Foundation release。重點：更輕量的安裝／執行基礎，並擴充供應者、gateway、媒體與驗證介面。新增具有grok-4.3 1M context的SuperGrok OAuth、供OAuth供應者使用且與OpenAI相容的`hermes proxy`、一級`x_search`、`pip install hermes-agent`、延遲安裝相依套件、啟動速度加快約19秒、瀏覽器CDP呼叫速度加快180倍、LINE與SimpleX Chat（使訊息平台總數達22個）、完整端對端Microsoft Teams支援、`/handoff`、`/subgoal`、Telegram/Discord原生釐清按鈕、Discord歷史記錄回填、原始像素`vision_analyze`、逐回合檔案異動驗證器頁尾、每次寫入皆執行LSP語意診斷、統一的`video_generate`、供非Anthropic供應者透過cua-driver使用的`computer_use`、OSC8可點擊URL、Zed ACP Registry支援、OpenRouter Pareto Code路由器、NovitaAI、Codex app-server執行環境、受信任的`huggingface/skills`tap、9個選用skills、plugin`ctx.llm`／`tool_override`、Brave/DDGS網頁搜尋、Qwen Cloud重新命名、原生Windows測試版，以及解決12項P0／50項P1。 | 19 | 
| 2026-05-07 | 指南v1.5：新增 v0.13.0（2026年5月7日）——The Tenacity release。重點：耐久可靠的multi-agent Kanban看板（心跳、回收、殭屍偵測、幻覺門檻、逐任務`max_retries`、多專案看板），使swarm不再只是委派模式，而成為一級基本元件。新增，跨回合鎖定代理程式的目標（將Ralph迴圈模式化為斜線命令）。新增`/goal`命令，以Gemini為優先，並可擴充支援相容模型。新增具備語音複製功能的`video_analyze`toolxAI Custom Voices TTS供應者。CLI與gateway訊息支援7種語言i18n（zh-Hans、ja、de、es、fr、uk、tr）；文件僅提供zh-Hans。透過可插拔轉接器模式新增Google Chat作為第20個訊息平台；IRC與Microsoft Teams也遷移至相同模式。新增，讓可插拔的第三方供應者無須修改核心即可整合。gateway重新啟動、`ProviderProfile`ABC與`plugins/model-providers/``/update`及原始檔重新載入後，均可自動續接工作階段。Checkpoints v2改寫為單一儲存區設計，並提供真正的修剪與磁碟防護機制。解決8項P0安全性問題：預設啟用密鑰遮蔽、Discord跨guild私訊繞過（CVSS 8.1）、WhatsApp拒絕陌生人與將自己設為靜音、MCP OAuth TOCTOU、CLI`auth.json`TOCTOU、瀏覽器SSRF最低防線、cron提示詞注入掃描、`hermes debug share`遮蔽。新增Python/JSON/YAML/TOML的寫入後lint檢查、cron`no_agent`純指令碼模式、橫跨Slack/Telegram/Mattermost/Matrix/DingTalk的平台允許清單，以及MCP增強功能（SSE傳輸、OAuth轉送、圖片MEDIA標籤）。自v0.12.0以來統計：864次commit、588個合併PR、829個檔案變更、295位社群貢獻者、解決282項issue（13項P0、36項P1）。 | 18 | 
| 2026-05-06 | 指南v1.4：新增 v0.12.0（2026年4月30日）——The Curator release。重點：在gateway的cron計時器上執行的自主背景Curator（預設週期為7天），依評分規準評鑑skill程式庫、修剪失效skills、整併相關skills，並為每次執行撰寫報告——Hermes可在非使用中工作階段自行維護。自我改進迴圈升級為依評分規準評鑑、偏重現行更新、正確繼承執行環境，以及僅限記憶與skills的範圍化toolsets。新增4個推論供應者：GMI Cloud、Azure AI Foundry、MiniMax OAuth及Tencent Tokenhub。LM Studio提升為一級支援。遠端模型目錄manifest現在無須發布新版本即可自動更新。新增2個訊息平台：Microsoft Teams（第19個，採可插拔gateway架構）與Tencent Yuanbao（第18個，原生支援文字與媒體）。透過PKCE OAuth提供原生Spotify與隨附skill；用於通話與轉錄的Google Meetplugin；Piper本機TTS供應者。ComfyUI v5與TouchDesigner-MCP從選用項目改為預設隨附。新skills：Humanizer、claude-design、design-md、airtable。CLI新增：`hermes -z`單次模式、`hermes update --check`預先檢查、`/reload-skills`斜線命令，以及可插拔的忙碌指示器樣式。透過延遲初始化代理程式與延遲匯入，可見的TUI冷啟動時間縮短約57%。安全性：預設停用密鑰遮蔽，以避免承載資料損毀；針對無法復原的命令採用強制封鎖清單。統計：1,096次commit、550個合併PR、213位社群貢獻者。 | 17 | 
| 2026-04-25 | 指南v1.3：新增 v0.11.0（2026年4月23日）——The Interface release。互動式TUI以React/Ink全面改寫，搭配Python JSON-RPC後端（`tui_gateway`）；固定式撰寫區、支援OSC-52剪貼簿的即時串流、穩定的選擇器按鍵、附逐回合計時器與git分支的狀態列、`/clear`確認、淺色主題預設集，以及subagent產生可觀測性覆疊介面。新增可插拔傳輸架構——將格式轉換與HTTP傳輸抽離至`agent/transports/`，使供應者管線更加簡潔。透過Converse API提供原生AWS Bedrock。新增5種推論途徑：NVIDIA NIM、Arcee AI、Step Plan、Google Gemini CLI OAuth及Vercel ai-gateway。透過Codex OAuth使用GPT-5.5——現在無須獨立API金鑰，即可透過ChatGPT Codex OAuth使用新的OpenAI旗艦模型。新增QQBot（第17個訊息平台），支援掃描QR code設定與串流。擴充plugin介面：斜線命令、tool派送、執行封鎖、結果轉換。新增——在代理程式執行途中提供引導，注入一則代理程式會在下次tool呼叫後看到的備註，無須中斷該回合，也不會破壞提示詞快取。`/steer <prompt>`Shell hooks無須Python plugins，即可將指令碼接入生命週期hooks。Webhook直接交付模式可將承載資料直接轉送至平台聊天，略過代理程式以進行扇出。提供更聰明的委派機制，包括協調器角色、可設定的產生深度與檔案協作。儀表板新增plugin系統、即時主題切換、i18n與行動裝置響應式設計。自v0.9.0以來統計：1,556次commit、761個合併PR、1,314個檔案變更、224,174行新增內容、29位社群貢獻者。 | 27 | 
| 2026-04-16 | 指南v1.2：新增v0.10.0—— Nous Tool Gateway。Nous Portal付費訂閱者現在無須額外的API金鑰，即可使用受管理的工具（Firecrawl網頁搜尋、FAL / FLUX 2 Pro影像生成、OpenAI TTS、Browser Use瀏覽器自動化）。可透過新的`use_gateway`設定欄位逐一選擇啟用工具。同時設定gateway與直接API金鑰時，執行環境會優先使用gateway。已移除`HERMES_ENABLE_NOUS_MANAGED_TOOLS`環境變數。Hermes Agent CLI仍採MIT授權，且完全免費。 | 28 | 
| 2026-04-13 | 指南v1.1：新增v0.8.0與v0.9.0功能。本機網頁儀表板、 `/fast`模式、iMessage與WeChat平台（共16個）、背景行程監控（`watch_patterns`）、可插拔context engine、`hermes backup`/`hermes import`、Termux/Android、xAI、MiMo、Google AI Studio與Qwen供應者、`/debug`命令，以及全面強化安全性。 | 1516 | 
| 2026-04-10 | 指南v1.0：首次發布，涵蓋Hermes Agent v0.7.0。供應者驗證、設定、CLI、斜線命令、工具、skills、記憶、gateway、cron、MCP、壓縮、架構、OpenClaw遷移、疑難排解及常見問題。 | 

## 參考資料

- 
Nous Research，GitHub 上的 “Hermes Agent” 專案 README。產品說明（自我改進的代理、多供應商、訊息 gateway、終端機後端、skill 演進、cron 排程器、委派）以及 “Quick Install” 單行安裝指令的主要來源。 ↩↩↩ 
- 
Hermes Agent 文件中的 Nous Research “AI Providers”。完整供應商清單、各供應商驗證方式（Nous Portal OAuth、Codex 裝置代碼、GitHub Copilot 權杖類型、Anthropic 的3種驗證方式、中國 AI 供應商、Hugging Face 路由、自訂端點）、3種驗證途徑（ `.env`中的 API 金鑰、透過`hermes model`使用 OAuth、`config.yaml`中的自訂端點）、`/model`斜線命令語法（包括`custom:name:model`）、Ollama/vLLM/SGLang/llama.cpp/LM Studio 設定範本、WSL2 網路操作說明、context 長度偵測鏈、備援模型設定、智慧模型路由，以及具名自訂供應商的主要來源。本文所有供應商專用環境變數名稱、權杖類型、基礎 URL 覆寫及模型識別碼皆源自此頁。 ↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent 開發人員指南中的 Nous Research “Architecture”。系統概觀圖、目錄結構、資料流經 CLI session 與 gateway 訊息路徑的方式、3種 API 模式（ `chat_completions`、`codex_responses`、`anthropic_messages`）、透過`runtime_provider.py`解析供應商、透過 SQLite + FTS5 保存 session、訊息 gateway 平台清單、外掛系統探索來源、profile 隔離，以及6項設計原則的主要來源。 ↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent 使用者指南中的 Nous Research “Configuration”。設定目錄結構、 `config.yaml`與`.env`的規則（「非機密設定以`config.yaml`為準」）、設定優先順序（CLI 引數 → 環境變數 → config.yaml → .env → 預設值）、context 壓縮設定（含`threshold`、`target_ratio`、`protect_last_n`、`summary_model`、`summary_provider`、`summary_base_url`的`compression.*`區塊）、預算壓力門檻（70% 提醒、90% 警告）、可隨本機供應商自動調整的串流逾時，以及完整輔助模型設定區塊（`auxiliary:`，包含`vision`、`web_extract`、`approval`、`compression`、`session_search`、`skills_hub`、`mcp`、`flush_memories`插槽）的主要來源。輔助、壓縮及備援插槽僅能使用`"main"`供應商的限制也源自此頁。 ↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent 指南中的 Nous Research “Migrate from OpenClaw”。OpenClaw → Hermes 遷移流程的來源。 ↩↩ 
- 
Hermes Agent 參考文件中的 Nous Research “CLI Commands Reference”。本文記載之所有頂層 CLI 命令的主要來源，包括 `hermes chat`、`hermes model`、`hermes gateway`、`hermes setup`、`hermes auth`、`hermes status`、`hermes cron`、`hermes webhook`、`hermes doctor`、`hermes dump`、`hermes logs`、`hermes config`、`hermes pairing`、`hermes skills`、`hermes honcho`、`hermes memory`、`hermes acp`、`hermes mcp`、`hermes plugins`、`hermes tools`、`hermes sessions`、`hermes insights`、`hermes claw`、`hermes profile`、`hermes completion`、`hermes update`及`hermes uninstall`。本文所有子命令旗標、選項說明、憑證集區行為、日誌篩選語法、OpenClaw 遷移旗標、profile 管理命令及服務安裝命令皆源自此頁。 ↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent 入門指南中的 Nous Research “Installation”。單行安裝程式命令、安裝程式行為（先決條件、平台支援、Termux 自動偵測、Windows/WSL2 需求）、選用額外套件表格、手動安裝步驟及驗證命令的主要來源。 ↩↩↩↩↩↩↩↩↩ 
- 
Nous Research，“CLI Commands Reference”——請特別參閱 `hermes dump`章節，其中說明該命令的輸出格式（標頭、環境、身分、模型、終端機、API 金鑰、功能、服務、工作負載、設定覆寫）及其分享診斷資訊的用途。 ↩
- 
Hermes Agent 參考文件中的 Nous Research “Slash Commands Reference”。本文所列每個斜線命令、 `COMMAND_REGISTRY`架構、CLI 與訊息平台之間的差異、動態 skill 斜線命令、`config.yaml`中的快速命令、前綴比對行為，以及僅限訊息平台的命令（`/status`、`/sethome`、`/approve`、`/deny`、`/update`、`/commands`）的主要來源。 ↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent 使用者指南中的 Nous Research “Tools & Toolsets”。工具類別概觀、toolset 使用命令、6種終端機後端（local、docker、ssh、singularity、modal、daytona）、容器設定（cpu、memory、disk、persistent）、容器安全強化、背景程序管理 API，以及 sudo 支援的主要來源。 ↩↩↩↩↩↩↩↩↩↩ 
- 
Hermes Agent 使用者指南中的 Nous Research “Skills System”。漸進式揭露、 `SKILL.md`格式、平台專用 skills、條件式啟用（`fallback_for_toolsets`、`requires_toolsets`、`fallback_for_tools`、`requires_tools`）、代理透過`skill_manage`管理 skills、skill hub 命令與來源清單（`official`、`skills-sh`、`well-known`、`github`、`clawhub`、`claude-marketplace`、`lobehub`）、安全掃描與信任等級，以及外部 skill 目錄的主要來源。 ↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent 使用者指南中的 Nous Research “Persistent Memory”。 `MEMORY.md`／`USER.md`字元限制、凍結快照模式、memory 工具動作（`add`、`replace`、`remove`）、應儲存與應略過的內容、memory 與 session 搜尋的比較，以及8個外部 memory 供應商（Honcho、OpenViking、Mem0、Hindsight、Holographic、RetainDB、ByteRover、Supermemory）清單的主要來源。 ↩↩↩↩↩↩↩↩
- 
Hermes Agent 使用者指南中的 Nous Research “Personality & SOUL.md”。 `SOUL.md`行為（位於`HERMES_HOME`、永不覆寫、在系統提示中居第1順位、納入前會進行安全掃描）、SOUL.md 與 AGENTS.md 的差異、內建 personality 清單（從`helpful`到`hype`，共14種）、`config.yaml`中的自訂 personalities、`/personality`疊加模式，以及完整提示堆疊組裝順序的主要來源。 ↩↩↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent 指南與參考文件中的 Nous Research “Use MCP with Hermes” 及 MCP Config Reference。 `config.yaml`中包含`command`、`args`、`env`欄位之`mcp_servers:`設定格式的來源。 ↩
- 
Hermes Agent v0.8.0 Release Notes。2026年4月8日。背景程序自動通知、Nous Portal 上免費的 MiMo v2 Pro、跨平台即時切換 `/model`、Google AI Studio 原生供應商、Qwen OAuth、依閒置時間計算的逾時、Slack/Telegram 核准按鈕、MCP OAuth 2.1 PKCE、集中式日誌，以及外掛系統擴充。 ↩↩↩↩↩
- 
Hermes Agent v0.9.0 Release Notes。2026年4月13日。本機網頁儀表板、Fast Mode（ `/fast`）、透過 BlueBubbles 使用 iMessage、WeChat + WeCom、Termux/Android、背景程序監控（`watch_patterns`）、xAI + Xiaomi MiMo 原生供應商、可插拔 context engine、統一代理伺服器支援、安全強化（修正路徑遍歷、shell 注入、SSRF、RCE）、`hermes backup`／`hermes import`、`/debug`+`hermes debug share`，以及支援16個平台。487次提交、269個合併的 PR、24位貢獻者。 ↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent v0.12.0 Release Notes。2026年4月30日。「The Curator release」。新增自主背景 Curator，依預設7天週期在 gateway 的 cron 計時器上執行，為 skill 程式庫評分、刪減並整併。自我改進迴圈升級：依評分準則評級、偏重主動更新、正確繼承執行階段，以及僅限 memory 與 skills 的範圍化 toolsets。新增4個推論供應商：GMI Cloud、Azure AI Foundry、MiniMax OAuth、Tencent Tokenhub。LM Studio 提升為第一級支援。遠端模型目錄資訊清單無須發行新版本即可自動更新。新增2個訊息平台：Microsoft Teams（第19個，採用可插拔 gateway 架構）及 Tencent Yuanbao（第18個，原生支援文字 + 媒體）。透過 PKCE OAuth 原生支援 Spotify 並隨附 skill；用於通話與轉錄的 Google Meet 外掛；Piper 本機 TTS 供應商。預設隨附 ComfyUI v5 + TouchDesigner-MCP。新增 skills：Humanizer、claude-design、design-md、airtable。CLI： `hermes -z`單次執行模式、`hermes update --check`預先檢查、`/reload-skills`斜線命令，以及可插拔忙碌指示器樣式。透過延遲初始化，TUI 冷啟動時間縮短約57%。安全性：預設停用機密遮蔽；對無法復原的命令採用嚴格封鎖清單。自 v0.11.0 起的統計：1,096次提交、550個合併的 PR、213位社群貢獻者。另請參閱：v2026.4.30 release tag。 ↩↩↩
- 
Hermes Agent v0.13.0 Release Notes。2026年5月7日。「The Tenacity release」。新增多代理 Kanban 看板，具備 heartbeat、回收、殭屍偵測、幻覺閘門、各任務 `max_retries`及多專案看板。新增`/goal`斜線命令，可跨輪次鎖定目標（Ralph 迴圈原語），並能設定輪次預算。新增`video_analyze`工具，以 Gemini 為優先，並可相容擴充多模態功能。新增具備語音複製功能的 xAI Custom Voices TTS 供應商。支援7種語言的 i18n：zh-Hans、ja、de、es、fr、uk、tr（CLI + gateway 訊息；文件僅有 zh-Hans）。Google Chat 成為第20個訊息平台，採用可插拔轉接器模式及通用`env_enablement_fn`／`cron_deliver_env_var`外掛掛鉤；IRC 與 Microsoft Teams 亦遷移至相同模式。新增`ProviderProfile`ABC +`plugins/model-providers/`，支援可插拔第三方供應商。gateway 重新啟動、`/update`及來源檔案重新載入後可自動恢復 session。checkpoints v2 改寫為單一儲存區，具備真正的修剪、磁碟防護機制，且不會留下孤立的影子儲存庫。修正8項 P0 安全問題：預設啟用機密遮蔽、Discord 跨伺服器 DM 繞過（CVSS 8.1，角色允許清單限定於伺服器範圍）、WhatsApp 預設拒絕陌生人 + 絕不在與自己的對話中回覆、MCP OAuth 憑證儲存 TOCTOU、憑證寫入器中的 CLI`auth.json`TOCTOU、混合路由中的瀏覽器雲端中繼資料 SSRF 防線、掃描 cron 組裝提示（包括 skill 內容）以防提示注入，以及上傳時對`hermes debug share`日誌內容進行遮蔽。其他重要項目：針對 Python/JSON/YAML/TOML 的寫入後 lint、cron`no_agent`純指令碼監看模式、Slack/Telegram/Mattermost/Matrix/DingTalk 的平台允許清單、MCP 強化功能（SSE 傳輸、OAuth 轉送、以 MEDIA 標籤表示圖片結果）。自 v0.12.0 起的統計：864次提交、588個合併的 PR、829個檔案異動、295位社群貢獻者、282個已關閉問題（13個 P0、36個 P1）。 ↩↩↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent v0.14.0 Release Notes。2026年5月16日。「The Foundation release」。自 v0.13.0 起：808次提交、633個合併的 PR、1,393個檔案異動、165,061行新增、545個已關閉問題（12個 P0、50個 P1），以及215位社群貢獻者。新增具備 grok-4.3 1M context 的 SuperGrok OAuth、 `hermes proxy`、`x_search`、PyPI 封裝、延遲載入相依套件、跨 session 1小時 Claude 提示快取、啟動速度加快約19秒、瀏覽器 CDP 呼叫速度提升180倍、LINE 與 SimpleX Chat（訊息平台總數達22個）、`/handoff`、原生釐清按鈕、Discord 歷史記錄回填、原始像素`vision_analyze`、每輪檔案異動驗證器頁尾、LSP 語意診斷、統一的`video_generate`、cua-driver`computer_use`、OSC8 連結、Zed ACP Registry 支援、OpenRouter Pareto Code 路由器、NovitaAI、Codex app-server 執行階段、`huggingface/skills`、外掛`ctx.llm`、`tool_override`、Brave/DDGS 搜尋、危險命令強化、`/subgoal`、Qwen Cloud 重新命名、原生 Windows 測試版、總計16個語系，以及廣泛的文件／測試更新。 ↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent v0.16.0 release notes，「The Surface Release」，標籤 `v2026.6.5`，發佈於 2026-06-06T00:55:58Z（發行標籤日期為2026年6月5日）；截至2026年6月8日為最新版本。新增原生 Hermes Desktop（Electron，支援 macOS/Linux/Windows；透過安全的 WebSocket 搭配 OAuth 或使用者名稱／密碼連線至遠端 gateway；各 profile 可設定遠端主機；支援跨 profile 的`@session`連結；透過具型別 i18n 提供簡體中文介面，`display.language`）。網頁儀表板擴充為完整管理面板（MCP 目錄切換、憑證管理、建立 webhook/hook、memory 設定、gateway 控制、含更新前檢查 + Debug Share 的 System 頁面、Channels 頁面；可插拔驗證包括自行託管的 OIDC 及`hermes dashboard register`）。新增命令：`/undo [N]`、可設定的預設介面（`cli`/`tui`、`--cli`）、TUI`/model`+ Sessions 覆疊介面、`hermes portal`、`hermes prompt-size`、`hermes sessions optimize`。新增模型：`deepseek-v4-flash`、`MiniMax-M3`（1M context）、`qwen3.7-plus`、`gemini-3.5-flash`；xAI Grok OAuth；模糊選擇器；每小時重新整理目錄。Skills：更精簡的預設組合、`environments:`相關性閘門、預設信任的`NVIDIA/skills`tap、漸進式工具揭露、修正 MCP 假性 OAuth 成功問題。安全性：將 CVE-2026-48710（Starlette BadHost）固定為 ≥1.0.1、將 SSRF 檢查移出事件迴圈、從子程序環境移除 Bedrock bearer token、對`bws_cache.json`加入讀取防護、在危險模式中新增`docker restart/stop/kill`、清理不可見 Unicode；已關閉2個 P0 + 62個 P1（其中16個標記為安全性）。已排除發行說明中的行銷式敘述（PR／提交數量、「一週前這些全都不存在」）；僅記錄與該標籤相關的具體功能／版本事實。於2026年6月8日的目前 session 完成驗證。 ↩↩↩↩↩↩↩↩
- 
Hermes Agent v0.17.0 release notes，「The Reach Release」，標籤 `v2026.6.19`，2026年6月19日；截至2026年6月21日為最新版本。訊息平台：透過 Photon Spectrum 使用 iMessage（裝置代碼 OAuth、`hermes photon login`，無須 Mac 中繼）；官方 WhatsApp Business Cloud API 轉接器（取代橋接程序）；SimpleX 群組、原生附件、文字批次處理、自動接受；隨附 Raft 平台外掛。模型／供應商：`z-ai/glm-5.2`（1M context）、`anthropic/claude-fable-5`、`laguna-m.1`、`nemotron-3-ultra`、`grok-composer-2.5-fast`（xAI OAuth、200k context）；xAI 預設值 →`grok-build-0.1`；Anthropic 自適應模型採用現代 thinking contract（無`reasoning`欄位）。CLI/斜線命令：`/version`、`/billing`、`hermes photon login`、`hermes curator run --consolidate`（選擇性啟用）、`hermes model`GUI、profile 複製。Desktop：背景 subagent 監看視窗（`delegate_task(background=true)`）、Composer 模型選擇器、可重新綁定的快速鍵、原生作業系統通知、各討論串草稿、VS Code Marketplace 主題、日文 + 繁體中文介面。Dashboard：完整 profile 建構器、全域 profile 切換器、Skills Hub 全面翻新並加入安全掃描、Automation Blueprints、安全登入（在 OAuth 後方傳回401）。Skills／工具：跨供應商的`image_generate`圖片轉圖片編輯、`memory``operations`原子批次、`simplify-code`平行審查 skill，以布林值`write_approval`取代`write_mode`。架構：背景 subagents（立即傳回控制代碼，結果以新輪次重新進入）、用於工具呼叫途中確認的 MCP 引導處理常式、較晚連線的 MCP 工具會在輪次之間公開、可插拔 CronScheduler + Chronos 代管 cron、Managed 範圍（`/etc/hermes`由管理員固定）、Gateway-Gateway 中繼。安全性：封堵 shell 跳脫拒絕清單繞過、缺少核准模組及自有原則 gateway 轉接器時採取封閉式失敗、清理 cron 工作指令碼環境、在偵錯傾印中遮蔽機密、不在公開狀態中顯示主機中繼資料、篩查 MCP stdio 資料外洩模式、升級 urllib3 + PyJWT 以修補 CVE。已排除發行版的行銷式敘述（提交／PR 數量）。於2026年6月21日的目前 session 完成驗證。 ↩↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent v0.18.0 release notes（標籤 `v2026.7.1`），2026年7月1日——「The Judgment Release」。優先處理積壓項目（12天內關閉所有 P0/P1，約692項）；Mixture-of-Agents 成為所有介面皆可選擇的第一級模型，每個參考模型的完整輸出均呈現為各自帶有標籤的區塊，並即時串流最終答案；`/goal`的完成契約（代理透過執行專案檢查自行驗證成果）；`/learn`命令（只要描述內容，即可將任何事物轉化為可重複使用的 skill，並自動遵循 CONTRIBUTING.md）；`/journey`視覺化 memory/skill 時間軸，具備編輯功能及桌面版 memory 圖表；背景 subagent 扇出（多個並行委派任務）；Desktop Projects（project/repo/lane 模型）；具備排空協調的 gateway 縮容至零；支援 Google Vertex AI（透過 GCP 服務帳戶使用 Gemini，自動重新整理 OAuth2 權杖）；`/prompt`$EDITOR 命令。於2026年7月1日（PST）的目前 session 依 GitHub 發行頁面完成驗證；v0.18.0 為最新版本。 ↩↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent v0.19.0 release notes，「The Quicksilver Release」，標籤 `v2026.7.20`，2026年7月20日；截至2026年7月21日為最新版本。自 v0.18.0 起的統計：約2,245次提交、約1,065個合併的 PR、約3,300個已關閉問題、450多位社群貢獻者。效能骨幹：首次輪次 TTFT 縮短約80%，CLI/gateway/TUI/desktop/cron 的冷啟動提交→分派時間由約4.3秒降至約0.9秒（PR #59332）；預設即時串流推理內容，`display.show_reasoning`為 ON，並逐權杖繪製回應（PR #59389）；desktop 約20個 PR 的效能改善，包括串流 Markdown 加快14倍；TUI 採用增量 Markdown。pip/Homebrew 安裝已棄用，僅顯示「不支援的舊版」警告，並計畫移除 PyPI/Homebrew 發佈（PR #57225）。新增可插拔`SecretSource`介面，提供 Bitwarden + 1Password 供應商、`op://`參照、多保管庫、確定性優先順序及各變數來源追蹤（PR #59498）。預設採用智慧核准（由獨立 LLM 審查器檢視每個標記命令）、即使在 YOLO 模式下仍有效的使用者自訂拒絕規則，以及`/deny <reason>`（PRs #62661、#59164、#54518）；外掛`pre_tool_call`核准升級功能重新納入（PR #60504）。終端機帳務`/subscription`+`/topup`+ desktop 帳務分頁（PR #51639）。即時 subagent 記錄檔 + 持久化背景委派（PRs #67479、#63494）；`state.db`中的交付義務帳本（PR #67181）；`max_async_children`已棄用，改採統一委派並行上限（PR #56955）。依 profile 路由 gateway +`GATEWAY_MULTIPLEX_PROFILES`+ 路由索引移至`state.db`，`sessions.json`成為選用的舊版鏡像（PRs #64835、#65700、#60589、#59203）。供應商／模型：Fireworks AI 成為選擇器第2順位的第一級供應商（PR #62593）、DeepInfra、Upstage Solar、GPT-5.6 Sol/Terra/Luna + Pro 完整串接（PR #61616）、grok-4.5 正式發佈、kimi-k3（kimi-k2.x 退役）、Claude Sonnet 5 完整串接、各供應商`enabled: false`+`excluded_providers`（PR #67971）；新增推理強度`max`/`ultra`層級，支援各模型／各 MoA 插槽覆寫，以及 session 範圍的`/reasoning`（PRs #62650、#64458）。CLI/MCP：`hermes sessions export`支援 Markdown/Quarto/HTML/僅提示/HF-trace，並提供`--redact`（PR #60186）、`/model --once`（PR #67113）、堆疊式斜線 skill 呼叫（PR #57987）、`--safe-mode`、`hermes config get`/`unset`（PR #65540）、真正無介面的`hermes serve`（PR #55923）、MCP`mcp__server__tool`命名（PR #52750）。已排除發行版的行銷式敘述；刻意不將此期間內已還原的項目（iron-proxy 輸出防火牆、dynamic-workflow skill、memory provider-actions）記錄為已推出。於2026年7月21日的目前 session 完成驗證。 ↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩↩
- 
Hermes Agent v0.18.1 release tag 與 v0.18.2 release tag，2026年7月7日至8日。v0.18 系列的基礎架構修補彙整；v0.18.2 的主要修正是解除 WhatsApp Baileys 的版本固定，改用 7.0.0-rc13，以確保 Docker 建置可靠。這兩個修補期間的內容均已彙整至 v0.19.0 release notes，並在其中完整記載。 ↩ 
- 
Hermes Agent v0.15.1 release notes 與 Hermes Agent v0.15.2 release notes。v0.15.1（2026年5月29日01:12 UTC）是同日推出的 Velocity 緊急修補：修正儀表板在 loopback 模式下的401重新載入迴圈；Docker 現在必須明確設定 `HERMES_DASHBOARD_INSECURE=1`；MCP 的裸命令（`npx`、`npm`、`node`）可在 Docker 容器中解析；恢復 Skills 頁面的來源膠囊標籤 + 分類側邊欄；Kanban worker 會回應 SIGTERM；Skills.sh 目錄透過網站地圖由858筆增至19,932筆。28次提交、21個合併的 PR、9位貢獻者。v0.15.2（2026年5月29日13:37 UTC）是純封裝緊急修補，將`plugin.yaml`資訊清單納入 wheel 與 sdist 發行套件，使 PyPI 安裝無須從旁載入原始碼即可運作。4位貢獻者。 ↩
- 
Hermes Agent v0.15.0 release notes 與 Hermes Agent releases page。「The Velocity release」，標籤 `v2026.5.28`。統計：1,302次提交、747個合併的 PR、321位社群貢獻者。重構`run_agent.py`的76%（從16,083行降至3,821行，分布於14個模組）。新增多代理 Kanban 平台（自動拆解、群集拓撲、各任務模型覆寫、排程任務、worktree 管理）。重新設計`session_search`，速度提升4,500倍，並移除 LLM 相依套件。在3個安全關卡加入針對 Brainworm 類提示注入的 Promptware 防禦。Bitwarden Secrets Manager 整合以單一啟動權杖取代多個供應商專用 API 金鑰。Skill bundles 可透過單一斜線命令載入多個 skills。新增 TUI session 協調器，可在單一終端機視窗中管理多個 sessions。支援 Krea 2（Medium/Large）及用於圖片生成的 FAL 外掛。新一輪 xAI 整合加入網路搜尋外掛、OAuth 上游支援、退役模型偵測，以及語音輸出中的自然 TTS 停頓。GitHub 上提及的修補版本處理儀表板401重新載入迴圈、Docker`--insecure`必須明確設定`HERMES_DASHBOARD_INSECURE=1`環境變數、Docker 中的 MCP 裸命令解析（`npx`、`npm`、`node`）、Skills 頁面呈現、Kanban worker SIGTERM 處理、透過網站地圖提供完整19,932筆 Skills 目錄，以及一小批`.md`交付、gateway 探測安全性、網頁 URL 遮蔽、kanban-worker vision 能力及 hindsight observation 預設值相關修正。 ↩
- 
Hermes Agent v0.11.0 Release Notes。2026年4月23日。「The Interface release」——以 Python JSON-RPC 後端（ `tui_gateway`）全面改寫互動式 CLI 的 React/Ink 介面；可插拔傳輸架構（`agent/transports/`）；透過 Converse API 原生支援 AWS Bedrock；新增5條推論路徑（NVIDIA NIM、Arcee AI、Step Plan、Google Gemini CLI OAuth、Vercel ai-gateway）；透過 Codex OAuth 支援 GPT-5.5；QQBot 成為第17個訊息平台，支援掃描 QR code 設定；擴充外掛介面（斜線命令、工具分派、執行封鎖、結果轉換）；新增`/steer <prompt>`，可在執行途中引導代理，在下一次工具呼叫後注入 context，且不會破壞提示快取；不使用 Python 外掛也能透過 shell hooks 處理生命週期事件；webhook 直接交付模式會將承載資料直接轉送至平台對話；更智慧的委派，包含協調器角色 + 可設定的生成深度 + 檔案協調；儀表板外掛系統、即時主題切換、i18n、行動裝置響應式設計。自 v0.9.0 起的統計：1,556次提交 · 761個合併的 PR · 1,314個檔案異動 · 224,174行新增 · 29位社群貢獻者。另請參閱：Hermes Agent v0.11.0 GitHub release tag。 ↩↩↩
- 
Hermes Agent v0.10.0 Release Notes。2026年4月16日。「The Tool Gateway Release」。為付費 Nous Portal 訂閱者整合 Nous Tool Gateway——無須額外 API 金鑰，即可使用受管理的 Firecrawl 網路搜尋、FAL / FLUX 2 Pro 圖片生成、OpenAI TTS 及 Browser Use 瀏覽器自動化。透過新的 `use_gateway`設定欄位選擇性啟用各項工具。同時設定 gateway 與直接 API 金鑰時，執行階段會優先使用 gateway。完整整合`hermes tools`與`hermes status`。取代已棄用的`HERMES_ENABLE_NOUS_MANAGED_TOOLS`環境變數。由 @jquesnelle（emozilla）實作。Hermes Agent CLI 仍採 MIT 授權並完全開放原始碼；gateway 是既有 Portal 訂閱產品的整合功能，並非對 CLI 設置付費牆。訂閱價格與註冊方式另請參閱：Nous Portal。 ↩↩↩

## Related Pages

- [[2026 OpenCode 教程：完整安裝、設定與配置指南 | NxCode]]
- [[🚀 API Mega List]]
- [[我的 AI 每天自動抓新聞、寫文案、產圖——這套基本上免費]]
- [[Voicebox：整合聲音複製、全域聽寫與 AI Agent 語音輸出的本機開源工具 | 網路資源 | DeTools 工具翼零]]
- [[LLM Wiki]]
- [[How to Convert Any Text Into a Graph of Concepts]]
- [[祖克伯：Meta AI代理發展不如預期 重組時機判斷有誤]]
- [[Hermes Agent vs OpenClaw：2026 年最完整的 AI Agent 比較]]

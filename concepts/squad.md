---
title: Homebrew (macOS)
type: framework
created: 2026-06-30T08:22
updated: 2026-06-30T08:22
tags: [Markdown, 中文, English, 技術, programming, development, API, REST, source:github]
confidence: high
---

<p align="center">
  <img src="./assets/squad-readme-hero.png" alt="squad multi-agent terminal collaboration through SQLite" />
</p>

<h1 align="center">squad</h1>

<p align="center"><strong>Multi-AI-agent terminal collaboration via simple CLI commands.</strong></p>

<p align="center">
  <a href="https://github.com/mco-org/squad/stargazers"><img src="https://img.shields.io/github/stars/mco-org/squad?style=flat-square&color=f59e0b" alt="GitHub stars" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="License: MIT" /></a>
  <img src="https://img.shields.io/badge/Rust-1.77%2B-orange?style=flat-square&logo=rust&logoColor=white" alt="Rust 1.77+" />
  <img src="https://img.shields.io/badge/Platforms-4%20supported-7c3aed?style=flat-square" alt="4 supported platforms" />
</p>

<p align="center">squad lets multiple AI CLI agents communicate through shell commands + SQLite.<br/>No daemon, no background processes — every command is a one-shot operation.</p>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/anthropics/claude-code"><img src="https://github.com/anthropics.png?size=96" alt="Claude Code" width="48" /></a></td>
    <td align="center"><a href="https://github.com/google-gemini/gemini-cli"><img src="https://github.com/google-gemini.png?size=96" alt="Gemini CLI" width="48" /></a></td>
    <td align="center"><a href="https://github.com/openai/codex"><img src="https://github.com/openai.png?size=96" alt="Codex CLI" width="48" /></a></td>
    <td align="center"><a href="https://github.com/sst/opencode"><img src="https://raw.githubusercontent.com/sst/opencode/master/packages/console/app/src/asset/brand/opencode-logo-light-square.svg" alt="OpenCode" width="48" /></a></td>
  </tr>
  <tr>
    <td align="center"><strong>Claude Code</strong></td>
    <td align="center"><strong>Gemini CLI</strong></td>
    <td align="center"><strong>Codex CLI</strong></td>
    <td align="center"><strong>OpenCode</strong></td>
  </tr>
  <tr>
    <td align="center"><code>claude</code></td>
    <td align="center"><code>gemini</code></td>
    <td align="center"><code>codex</code></td>
    <td align="center"><code>opencode</code></td>
  </tr>
</table>

> One slash command. Multiple agents collaborating in real-time.
>
> Assign a manager, spin up workers, add an inspector — each in its own terminal, communicating through SQLite.

---

## Install

```bash
# Homebrew (macOS)
brew install mco-org/tap/squad

# Windows (GitHub Releases)
# 1. Download squad-x86_64-pc-windows-msvc.zip
# 2. Extract squad.exe to a folder like C:\Tools\squad
# 3. Add that folder to PATH

# Or download another prebuilt binary from GitHub Releases
# https://github.com/mco-org/squad/releases

# Or build from source
cargo install --git https://github.com/mco-org/squad.git
```

## Quick Start

```bash
# Install /squad slash command for your AI tools
squad setup

# Initialize workspace in your project
squad init

# In any AI CLI terminal — just use the slash command
/squad manager      # terminal 1
/squad worker       # terminal 2
/squad inspector    # terminal 3
```

That's it. Each agent joins, reads its role instructions, and enters a work loop that checks for messages. The manager breaks down your goal and assigns tasks to workers.

## Optional tmux Launcher

For Unix-like environments that already use Claude Code, this repo also ships an optional helper script:

```bash
scripts/squad-tmux-launch.sh /path/to/project --dry-run
```

It can:
- read project-local launcher config from `.squad/launcher.yaml`
- read a task brief from `.squad/run-task.md`
- generate manager / inspector prompt files under `.squad/quickstart/`
- start a tiled `tmux` session and inject `/squad` commands into Claude panes
- optionally create an isolated git worktree before launching agents

Requirements:
- `tmux`
- `ruby` (used to parse `launcher.yaml`)
- `claude`

This launcher is intentionally separate from the core Rust CLI. Treat it as optional automation for people who want a repeatable multi-terminal workflow.

## Usage Flow

```
You (human)
  │
  ├── Terminal 1: /squad manager
  │     Manager joins, asks you for the goal,
  │     breaks it into tasks, assigns to workers.
  │
  ├── Terminal 2: /squad worker
  │     Worker joins, checks for tasks via squad receive,
  │     executes assigned work, reports back.
  │
  └── Terminal 3: /squad worker
        Auto-assigned as worker-2 (ID conflict resolved automatically).
        Same behavior — checks, executes, reports.
```

Multiple agents with the same role get unique IDs automatically (`worker`, `worker-2`, `worker-3`).

## Commands

| Command | Description |
|---------|-------------|
| `squad init [--refresh-roles]` | Initialize workspace, create `.squad/`, add `.squad/` to `.gitignore`, and append squad guidance to `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md` if missing. `--refresh-roles` rewrites only builtin `manager`/`worker`/`inspector` files under `.squad/roles/`. |
| `squad join <id> [--role <role>] [--client <claude\|gemini\|codex\|opencode>] [--protocol-version <n>]` | Join as agent (auto-suffixes if ID is taken; omitted capability metadata stays `NULL`) |
| `squad leave <id>` | Archive agent and preserve unread work |
| `squad agents [--all] [--json]` | List online agents (`--json` emits one JSON object per line including raw/effective capability fields and protocol-derived support booleans) |
| `squad send [--task-id <id>] [--reply-to <message-id>] <from> <to> <message>` | Send a note (`@all` to broadcast, or `squad send [flags] --file <path-or-> <from> <to>` to read from file/stdin) |
| `squad receive <id> [--wait] [--timeout N] [--json]` | Check inbox (`--wait` blocks until a message arrives; `--json` emits one JSON object per line) |
| `squad task create <from> <to> --title <title> [--body <body>]` | Create a structured task assignment |
| `squad task ack <agent> <task-id>` | Claim a queued task |
| `squad task complete <agent> <task-id> --summary <text>` | Mark an acked task complete with a summary |
| `squad task requeue <task-id> [--to <agent>]` | Put a task back into the queue, optionally to a new assignee |
| `squad task list [--agent <id>] [--status <status>]` | List tasks with optional filters |
| `squad pending` | Show all unread messages |
| `squad history [agent] [--from <id>] [--to <id>] [--since <RFC3339\|unix-seconds>]` | Show timestamped message history with optional filters |
| `squad roles` | List available roles |
| `squad teams` | List available teams |
| `squad team <name>` | Show team template |
| `squad setup [platform]` | Install `/squad` slash command for AI tools |
| `squad setup --list` | List supported platforms and status |
| `squad clean` | Clear all state |

## Setup

Install the `/squad` slash command for your AI tools:

```bash
squad setup           # auto-detect and install for all found tools
squad setup claude    # install only for Claude Code
squad setup --list    # show supported platforms
```

Supported platforms:

| Platform | Binary | Command location |
|----------|--------|-----------------|
| Claude Code | `claude` | `~/.claude/commands/squad.md` |
| Gemini CLI | `gemini` | `~/.gemini/commands/squad.toml` |
| Codex CLI | `codex` | `~/.codex/skills/squad/SKILL.md` |
| OpenCode | `opencode` | `~/.config/opencode/commands/squad.md` |

Once installed, use `/squad <role>` (or `$squad <role>` in Codex) in any project where `squad init` has been run. Generated slash templates automatically join with their platform client type and the current supported protocol version.

`squad init` does more than create `.squad/`: it also appends `.squad/` to `.gitignore` and adds a short squad collaboration section to `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md` when those files do not already contain one. Existing builtin role files stay untouched unless you run `squad init --refresh-roles`.

## How It Works

Agents communicate through a shared SQLite database (`.squad/messages.db`). Each agent runs in its own terminal and uses CLI commands to send and receive messages.

```
Terminal 1 (manager)          Terminal 2 (worker)          Terminal 3 (worker-2)
┌─────────────────────┐      ┌─────────────────────┐      ┌─────────────────────┐
│ /squad manager       │      │ /squad worker        │      │ /squad worker        │
│                      │      │ (auto-ID: worker)    │      │ (auto-ID: worker-2)  │
│                      │      │                      │      │                      │
│ squad task create    │─────>│ squad receive worker │      │                      │
│   manager worker     │      │                      │      │                      │
│   "task-a" "details" │      │                      │      │                      │
│                      │      │                      │      │                      │
│ squad task create    │──────────────────────────────────>│ squad receive         │
│   manager worker-2   │      │                      │      │   worker-2           │
│   "task-b" "details" │      │                      │      │                      │
│                      │      │                      │      │                      │
│ squad receive manager│<─────│ squad task complete  │      │                      │
│                      │      │   worker <task-id>   │      │                      │
│                      │      │   "done A"           │      │                      │
│                      │      │                      │      │                      │
│                      │<──────────────────────────────────│ squad task complete   │
│                      │      │                      │      │   worker-2 <task-id> │
│                      │      │                      │      │   "done B"           │
└─────────────────────┘      └─────────────────────┘      └─────────────────────┘
```

All messages flow through SQLite — no daemon, no sockets, no background processes.

### Message Flow

Agents should prefer `squad task ...` when assignment state matters, and keep `squad send` / `squad receive` as the fallback path for freeform coordination. Agents use `squad receive --wait` to block until messages arrive:

```
Agent joins
  → squad receive <id> --wait          ← blocks until a message arrives
  → receives task from manager
  → squad task ack <id> <task-id>
  → executes the task
  → squad task complete <id> <task-id> --summary "done: summary..."
  → squad receive <id> --wait          ← blocks again for next message
```

`squad receive <id>` (without `--wait`) checks once and returns immediately, useful for scripting or manual checks.

### ID Auto-Suffix

When multiple agents join with the same ID, squad automatically assigns unique IDs:

```bash
squad join worker --role worker --client codex --protocol-version 2
# → Joined as worker

squad join worker --role worker --client opencode --protocol-version 2
# → ID 'worker' was taken. Joined as worker-2
```

This is handled server-side (atomic `INSERT OR IGNORE`), so even simultaneous joins from different terminals are safe.

## Agent Capability Metadata

`squad join` can optionally record agent capability metadata:

```bash
squad join worker --role worker --client codex --protocol-version 2
```

- If `--client` or `--protocol-version` is omitted, the database stores `NULL`.
- `squad agents` shows client/protocol details in human-readable output using the effective fallback view, so legacy rows appear as `client: unknown, protocol: 1`.
- `squad agents --json` exposes `client_type_raw`, `protocol_version_raw`, `effective_client_type`, `effective_protocol_version`, `supports_task_commands`, and `supports_json_receive`.
- In the current phase, `supports_task_commands` and `supports_json_receive` are both derived from the effective protocol version, with support enabled at protocol `>= 2`.

## Role Templates

Roles are `.md` files in `.squad/roles/` that define agent behavior. Three are built in:

- **manager** — breaks down goals, assigns tasks, coordinates review
- **worker** — executes tasks, reports results
- **inspector** — reviews code, sends PASS/FAIL verdicts

Create custom roles by adding `.md` files to `.squad/roles/`:

```bash
echo "You are a database specialist..." > .squad/roles/dba.md
squad join db-expert --role dba
```

If the builtin role templates in `.squad/roles/` drift from the bundled defaults, run `squad init --refresh-roles` to refresh only `manager.md`, `worker.md`, and `inspector.md`. Custom role files are left untouched.

## Team Templates

Teams are YAML files in `.squad/teams/` that define which roles are needed:

```yaml
# .squad/teams/dev.yaml
name: dev
roles:
  manager:
    prompt_file: manager
  worker:
    prompt_file: worker
  inspector:
    prompt_file: inspector
```

View a team's setup instructions:

```bash
squad team dev
```

## Broadcast

Send a message to all agents at once:

```bash
squad task create manager worker --title "auth-module" --body "implement auth module with JWT"
squad task ack worker <task-id>
squad task complete worker <task-id> --summary "JWT auth shipped"
squad send --task-id <task-id> inspector worker "please handle follow-up edge cases"
squad receive worker --json
squad send manager @all "API contract changed, update your implementations"
```

## Requirements

- Rust 1.77+ (for building)
- macOS or Linux

## License

MIT


## Related Pages

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
- [[專案管理實務上]]

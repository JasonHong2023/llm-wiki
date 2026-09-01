---
title: LLM Wiki
type: framework
created: 2026-06-30T18:56
updated: 2026-07-08T14:20
tags: [Markdown, English, 中文, 技術, programming, development, LLM, 個人知識庫, 知識圖譜, wiki, Obsidian, 大語言模型, Python, 非同步, scripting, source:github]
confidence: high
---

# LLM Wiki

A pattern for building personal knowledge bases using LLMs — instead of traditional RAG (retrieve-and-answer from scratch every time), the LLM **incrementally builds and maintains a persistent wiki** from your sources. Knowledge is compiled once and kept current, not re-derived on every query.

這篇合併了兩個來源：**Andrej Karpathy** 提出的原始構想文件（一份設計理念文件），以及 **nashsu/llm_wiki** 這個依此構想打造的開源桌面應用（一套具體實作）。

## 原始構想（Andrej Karpathy）

This is an idea file, it is designed to be copy pasted to your own LLM Agent (e.g. OpenAI Codex, Claude Code, OpenCode / Pi, or etc.). Its goal is to communicate the high level idea, but your agent will build out the specifics in collaboration with you.

### The core idea

Most people's experience with LLMs and documents looks like RAG: you upload a collection of files, the LLM retrieves relevant chunks at query time, and generates an answer. This works, but the LLM is rediscovering knowledge from scratch on every question. There's no accumulation. Ask a subtle question that requires synthesizing five documents, and the LLM has to find and piece together the relevant fragments every time. Nothing is built up. NotebookLM, ChatGPT file uploads, and most RAG systems work this way.

The idea here is different. Instead of just retrieving from raw documents at query time, the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files that sits between you and the raw sources. When you add a new source, the LLM doesn't just index it for later retrieval. It reads it, extracts the key information, and integrates it into the existing wiki — updating entity pages, revising topic summaries, noting where new data contradicts old claims, strengthening or challenging the evolving synthesis. The knowledge is compiled once and then *kept current*, not re-derived on every query.

This is the key difference: **the wiki is a persistent, compounding artifact.** The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read. The wiki keeps getting richer with every source you add and every question you ask.

You never (or rarely) write the wiki yourself — the LLM writes and maintains all of it. You're in charge of sourcing, exploration, and asking the right questions. The LLM does all the grunt work — the summarizing, cross-referencing, filing, and bookkeeping that makes a knowledge base actually useful over time. In practice, I have the LLM agent open on one side and Obsidian open on the other. The LLM makes edits based on our conversation, and I browse the results in real time — following links, checking the graph view, reading the updated pages. Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.

This can apply to a lot of different contexts. A few examples:

- **Personal**: tracking your own goals, health, psychology, self-improvement — filing journal entries, articles, podcast notes, and building up a structured picture of yourself over time.
- **Research**: going deep on a topic over weeks or months — reading papers, articles, reports, and incrementally building a comprehensive wiki with an evolving thesis.
- **Reading a book**: filing each chapter as you go, building out pages for characters, themes, plot threads, and how they connect. By the end you have a rich companion wiki. Think of fan wikis like [Tolkien Gateway](https://tolkiengateway.net/wiki/Main_Page) — thousands of interlinked pages covering characters, places, events, languages, built by a community of volunteers over years. You could build something like that personally as you read, with the LLM doing all the cross-referencing and maintenance.
- **Business/team**: an internal wiki maintained by LLMs, fed by Slack threads, meeting transcripts, project documents, customer calls. Possibly with humans in the loop reviewing updates. The wiki stays current because the LLM does the maintenance that no one on the team wants to do.
- **Competitive analysis, due diligence, trip planning, course notes, hobby deep-dives** — anything where you're accumulating knowledge over time and want it organized rather than scattered.

### Architecture

There are three layers:

**Raw sources** — your curated collection of source documents. Articles, papers, images, data files. These are immutable — the LLM reads from them but never modifies them. This is your source of truth.

**The wiki** — a directory of LLM-generated markdown files. Summaries, entity pages, concept pages, comparisons, an overview, a synthesis. The LLM owns this layer entirely. It creates pages, updates them when new sources arrive, maintains cross-references, and keeps everything consistent. You read it; the LLM writes it.

**The schema** — a document (e.g. CLAUDE.md for Claude Code or AGENTS.md for Codex) that tells the LLM how the wiki is structured, what the conventions are, and what workflows to follow when ingesting sources, answering questions, or maintaining the wiki. This is the key configuration file — it's what makes the LLM a disciplined wiki maintainer rather than a generic chatbot. You and the LLM co-evolve this over time as you figure out what works for your domain.

### Operations

**Ingest.** You drop a new source into the raw collection and tell the LLM to process it. An example flow: the LLM reads the source, discusses key takeaways with you, writes a summary page in the wiki, updates the index, updates relevant entity and concept pages across the wiki, and appends an entry to the log. A single source might touch 10-15 wiki pages. Personally I prefer to ingest sources one at a time and stay involved — I read the summaries, check the updates, and guide the LLM on what to emphasize. But you could also batch-ingest many sources at once with less supervision. It's up to you to develop the workflow that fits your style and document it in the schema for future sessions.

**Query.** You ask questions against the wiki. The LLM searches for relevant pages, reads them, and synthesizes an answer with citations. Answers can take different forms depending on the question — a markdown page, a comparison table, a slide deck (Marp), a chart (matplotlib), a canvas. The important insight: **good answers can be filed back into the wiki as new pages.** A comparison you asked for, an analysis, a connection you discovered — these are valuable and shouldn't disappear into chat history. This way your explorations compound in the knowledge base just like ingested sources do.

**Lint.** Periodically, ask the LLM to health-check the wiki. Look for: contradictions between pages, stale claims that newer sources have superseded, orphan pages with no inbound links, important concepts mentioned but lacking their own page, missing cross-references, data gaps that could be filled with a web search. The LLM is good at suggesting new questions to investigate and new sources to look for. This keeps the wiki healthy as it grows.

### Indexing and logging

Two special files help the LLM (and you) navigate the wiki as it grows. They serve different purposes:

**index.md** is content-oriented. It's a catalog of everything in the wiki — each page listed with a link, a one-line summary, and optionally metadata like date or source count. Organized by category (entities, concepts, sources, etc.). The LLM updates it on every ingest. When answering a query, the LLM reads the index first to find relevant pages, then drills into them. This works surprisingly well at moderate scale (~100 sources, ~hundreds of pages) and avoids the need for embedding-based RAG infrastructure.

**log.md** is chronological. It's an append-only record of what happened and when — ingests, queries, lint passes. A useful tip: if each entry starts with a consistent prefix (e.g. `## [2026-04-02] ingest | Article Title`), the log becomes parseable with simple unix tools — `grep "^## \[" log.md | tail -5` gives you the last 5 entries. The log gives you a timeline of the wiki's evolution and helps the LLM understand what's been done recently.

### Optional: CLI tools

At some point you may want to build small tools that help the LLM operate on the wiki more efficiently. A search engine over the wiki pages is the most obvious one — at small scale the index file is enough, but as the wiki grows you want proper search. [qmd](https://github.com/tobi/qmd) is a good option: it's a local search engine for markdown files with hybrid BM25/vector search and LLM re-ranking, all on-device. It has both a CLI (so the LLM can shell out to it) and an MCP server (so the LLM can use it as a native tool). You could also build something simpler yourself — the LLM can help you vibe-code a naive search script as the need arises.

### Tips and tricks

- **Obsidian Web Clipper** is a browser extension that converts web articles to markdown. Very useful for quickly getting sources into your raw collection.
- **Download images locally.** In Obsidian Settings → Files and links, set "Attachment folder path" to a fixed directory (e.g. `raw/assets/`). Then in Settings → Hotkeys, search for "Download" to find "Download attachments for current file" and bind it to a hotkey (e.g. Ctrl+Shift+D). After clipping an article, hit the hotkey and all images get downloaded to local disk. This is optional but useful — it lets the LLM view and reference images directly instead of relying on URLs that may break. Note that LLMs can't natively read markdown with inline images in one pass — the workaround is to have the LLM read the text first, then view some or all of the referenced images separately to gain additional context. It's a bit clunky but works well enough.
- **Obsidian's graph view** is the best way to see the shape of your wiki — what's connected to what, which pages are hubs, which are orphans.
- **Marp** is a markdown-based slide deck format. Obsidian has a plugin for it. Useful for generating presentations directly from wiki content.
- **Dataview** is an Obsidian plugin that runs queries over page frontmatter. If your LLM adds YAML frontmatter to wiki pages (tags, dates, source counts), Dataview can generate dynamic tables and lists.
- The wiki is just a git repo of markdown files. You get version history, branching, and collaboration for free.

### Why this works

The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping. Updating cross-references, keeping summaries current, noting when new data contradicts old claims, maintaining consistency across dozens of pages. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass. The wiki stays maintained because the cost of maintenance is near zero.

The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means. The LLM's job is everything else.

The idea is related in spirit to Vannevar Bush's Memex (1945) — a personal, curated knowledge store with associative trails between documents. Bush's vision was closer to this than to what the web became: private, actively curated, with the connections between documents as valuable as the documents themselves. The part he couldn't solve was who does the maintenance. The LLM handles that.

This document is intentionally abstract. It describes the idea, not a specific implementation. The exact directory structure, the schema conventions, the page formats, the tooling — all of that will depend on your domain, your preferences, and your LLM of choice. Everything mentioned above is optional and modular — pick what's useful, ignore what isn't.

## 具體實作：nashsu/llm_wiki（開源桌面應用）

[nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) 是依上述 Karpathy 構想打造的**跨平台桌面應用**（Tauri + React），把抽象的 pattern 實作成完整產品，並大幅擴充功能。

**沿用原始構想的部分**：三層架構（Raw Sources / Wiki / Schema）、Ingest / Query / Lint 三大操作、`index.md` 內容目錄、`log.md` 時序紀錄、`[[wikilink]]` 語法、YAML frontmatter、Obsidian 相容、「人類策劃、LLM 維護」的分工原則。

### 主要擴充功能

- **兩階段 Chain-of-Thought Ingest** — 先分析再生成 wiki 頁面，附來源可追溯性與增量快取（SHA256 雜湊跳過未變更檔案）
- **多模態圖片擷取** — 從 PDF 抽取內嵌圖片，用 vision LLM 生成描述文字，支援圖片感知搜尋與燈箱預覽
- **可選 MinerU 雲端 PDF 解析** — 處理複雜表格/公式/版面，內建本地解析器為預設
- **4 訊號知識圖譜關聯模型** — 直接連結（×3.0）、來源重疊（×4.0）、Adamic-Adar（×1.5）、類型相似度（×1.0）
- **Louvain 社群偵測** — 自動發現知識群集，凝聚度評分
- **圖譜洞察** — 意外連結與知識缺口偵測，一鍵觸發 Deep Research
- **向量語意搜尋（可選）** — 透過 LanceDB + 任意 OpenAI 相容 embedding endpoint，召回率從 58.2% 提升到 71.4%
- **持久化匯入佇列** — 序列處理、當機復原、取消/重試、進度視覺化
- **資料夾匯入與來源自動監控** — 遞迴匯入並保留目錄結構，`raw/sources/` 外部變更自動同步
- **Deep Research** — LLM 優化搜尋主題，透過 Tavily / SerpApi / SearXNG 多查詢網頁搜尋，結果自動 ingest
- **非同步審核佇列** — LLM 標記需人工判斷的項目，預先產生的動作與搜尋查詢
- **Chrome 網頁擷取擴充功能** — 一鍵擷取網頁並自動 ingest
- **本地 HTTP API + MCP Server + Agent Skill** — `127.0.0.1:19828` JSON API，內建 MCP server，一行指令即可安裝到 Claude Code / Codex
- **多會話對話、思考過程顯示、KaTeX 數學公式渲染、多格式文件支援（PDF/DOCX/PPTX/XLSX）、串接式刪除清理、可調上下文視窗（4K～1M tokens）、跨平台（macOS/Windows/Linux）**

### 技術棧

| 層 | 技術 |
|---|---|
| 桌面框架 | Tauri v2（Rust） |
| 前端 | React 19 + TypeScript + Vite |
| UI | shadcn/ui + Tailwind CSS v4 |
| 編輯器 | Milkdown（ProseMirror） |
| 圖譜 | sigma.js + graphology + ForceAtlas2 |
| 向量資料庫 | LanceDB（可選） |
| PDF/Office | pdf-extract、MinerU（可選）、docx-rs、calamine |

### 安裝

```bash
# 下載預建版本：https://github.com/nashsu/llm_wiki/releases
# 或從原始碼建置（需 Node.js 20+、Rust 1.70+）
git clone https://github.com/nashsu/llm_wiki.git
cd llm_wiki
npm install
npm run tauri dev      # 開發模式
npm run tauri build    # 正式建置
```

Agent Skill 一行安裝：
```bash
npx skills add https://github.com/nashsu/llm_wiki_skill.git --skill llm_wiki_skill
```

授權：GNU GPL v3.0

## Related Pages

- [[Andrej_Karpathys_LLM_Wiki]]
- [[AI大神教你改善工作流用LLM_Wiki打造知識複利天下雜誌]]
- [[Karpathy_LLM_Wiki_知識系統實踐解析核心理念_Kenmingの鮮思維]]
- [[LLM_Wiki_是什麼OpenAI_創始成員提出的_AI_知識庫玩法讓_LLM_幫你打造第二大腦]]
- [[知識圖譜_Knowledge_Graph_KG]]
- [[知識圖譜（Knowledge Graph）的定義為何？ - OOSGA]]
- [[Karpathy_LLM_Wiki_知識系統實踐基礎安裝與建置篇_Kenmingの鮮思維]]
- [[Karpathy_LLM_Wiki_是什麼一個卡片盒筆記法使用者的實測_WenHao_Yu]]
- [[🚀 API Mega List]]
- [[Karpathy_的_LLM_Wiki_缺少了什麼以及如何修正]]
- [[2026_OpenCode_教程完整安裝設定與配置指南_NxCode]]
- [[Hermes_Agent實務工作者參考指南2026]]

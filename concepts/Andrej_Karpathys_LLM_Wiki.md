---
title: Andrej Karpathy’s LLM Wiki: Create your own knowledge base
type: framework
created: 2026-06-30T18:58
updated: 2026-06-30T18:58
tags: [Markdown, English, 技術, programming, development]
confidence: high
---

# Andrej Karpathy’s LLM Wiki: Create your own knowledge base

# Andrej Karpathy’s LLM Wiki: Create your own knowledge base

Andrej Karpathy **tweeted **something that quietly broke the AI community’s understanding of how we should be using LLMs to manage knowledge.

Two days later, he followed up with a GitHub gist called **llm-wiki.md**. The idea isn’t a product. It’s not code. It’s a *pattern *a special one that might make will help you create a small scale personal knowledge base in few minutes.

Let’s break this down.

## 🍥The Tweet That Started It

Karpathy’s original tweet:

“Something I’m finding very useful recently: using LLMs to build personal knowledge bases for various topics of research interest. In this way, a large fraction of my recent token throughput is going less into manipulating code, and more into manipulating…”


— @karpathy, April 2, 2026

And that’s what he published a single markdown file on GitHub Gist. Something he calls an **idea file**: a document meant to be copy-pasted into an LLM agent like Claude Code , OpenAI Codex or any agent, where *your* agent then instantiates the pattern for *your* specific needs.

## ✨**The Core Idea: Stop Retrieving. Start Compiling.**

Here’s the insight in one sentence: **instead of having the LLM re-read your raw documents every time you ask a question, build a persistent, structured wiki once and keep it updated forever.**

Karpathy used an analogy from software engineering: **compilation**.

```
┌─────────────────────────────────────────────────────────────┐
│                  SOFTWARE ENGINEERING                       │
│                                                             │
│     Source Code  ──[ compile once ]──►  Binary              │
│     (readable)                          (runs fast every    │
│                                          single call)       │
└─────────────────────────────────────────────────────────────┘
                          ⇕  same idea  ⇕
┌─────────────────────────────────────────────────────────────┐
│                      LLM WIKI                               │
│                                                             │
│     Raw Sources  ──[ LLM compiles ]──►  Wiki                │
│     (PDFs, notes,                       (pre-synthesized,   │
│      articles)                           interlinked,       │
│                                          always ready)      │
└─────────────────────────────────────────────────────────────┘
```
You don’t execute source code every time you want to run a program. You compile it once into a binary and run *that*. Karpathy says: treat knowledge the same way. Your PDFs and notes are the source code. The wiki is the binary.

Every time you add a new document, the LLM doesn’t just index it. It **reads it, extracts the key information, updates existing pages, revises summaries, flags contradictions, and strengthens cross-links**. The wiki is a persistent, compounding artifact.

In Karpathy’s own words, the line that captures the whole philosophy:

“Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.”


You rarely write the wiki yourself. You curate sources, ask questions, and think. The LLM handles the whole work summarizing, cross-referencing, filing, and bookkeeping.

## 🔍The Three-Layer Architecture

```
╔══════════════════════════════════════════════════════════════╗
║                   LAYER 3 — THE SCHEMA                       ║
║                    (CLAUDE.md / AGENTS.md)                   ║
║                                                              ║
║   Rules • Conventions • Workflows • How to ingest/query     ║
║                                                              ║
║             ↕  tells the LLM HOW to behave                  ║
╠══════════════════════════════════════════════════════════════╣
║                   LAYER 2 — THE WIKI                         ║
║                 (LLM owns this entirely)                     ║
║                                                              ║
║   ┌──────────┐  ┌──────────┐  ┌──────────┐                  ║
║   │ Entity   │──│ Concept  │──│ Overview │   index.md       ║
║   │ pages    │  │ pages    │  │ pages    │   log.md         ║
║   └──────────┘  └──────────┘  └──────────┘                  ║
║       ↑ LLM creates, links, updates, maintains              ║
╠══════════════════════════════════════════════════════════════╣
║                 LAYER 1 — RAW SOURCES                        ║
║                      (IMMUTABLE)                             ║
║                                                              ║
║    📄 PDFs     📰 Articles    🎧 Podcast notes    🖼️ Images ║
║                                                              ║
║         LLM reads • NEVER modifies • source of truth         ║
╚══════════════════════════════════════════════════════════════╝
```
**Layer 1 — Raw sources.** Your curated collection. Articles, papers, meeting notes, images. Immutable. The LLM reads them but *never* modifies them. This is your ground truth. The fact that they’re immutable is a deliberate design choice: you can always re-compile the wiki from scratch if needed.

**Layer 2 — The wiki.** A directory of markdown files the LLM owns completely. Entity pages, concept pages, summaries, an index, a log. You read it. The LLM writes it.

**Layer 3 — The schema.** This is a CLAUDE.md (for Claude Code) or AGENTS.md (for Codex) file. It’s the config that turns a generic agent into a *disciplined wiki maintainer*. It defines how pages are structured, how new sources get ingested, how answers get formatted.

## 🧰The Three Operations

```
                    ┌──────────────────────┐
                    │      YOU (Human)     │
                    │   curates & asks     │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   ┌────────────┐       ┌────────────┐       ┌────────────┐
   │ 1. INGEST  │       │  2. QUERY  │       │  3. LINT   │
   ├────────────┤       ├────────────┤       ├────────────┤
   │ Drop new   │       │ Ask a      │       │ Health-    │
   │ source →   │       │ question → │       │ check wiki │
   │ LLM reads, │       │ LLM reads  │       │ → find     │
   │ summarises,│       │ wiki &     │       │ contra-    │
   │ updates    │       │ synthesises│       │ dictions,  │
   │ 10–15 wiki │       │ answer     │       │ orphans,   │
   │ pages      │       │ w/ cites   │       │ stale data │
   └─────┬──────┘       └─────┬──────┘       └─────┬──────┘
         │                    │                    │
         └────────────────────┴────────────────────┘
                              │
                              ▼
                    ┌──────────────────────┐
                    │   WIKI COMPOUNDS     │
                    │  (every op makes it  │
                    │     richer over time)│
                    └──────────────────────┘
```
**Ingest.** You drop a source into the raw folder. The LLM reads it, writes a summary page, and touches some related pages updating, cross-linking, flagging contradictions. A single article becomes a web of updates across your entire knowledge base.

**Query.** You ask a question. The LLM doesn’t search raw documents it reads the already synthesized wiki and answers. And here’s the compounding trick: **good answers can be filed back into the wiki as new pages**. Your explorations become permanent knowledge.

**Lint.** Periodically, you ask the LLM to audit the whole wiki. Find contradictions. Find orphan pages with no links pointing in. Find concepts that are mentioned but missing their own page. The wiki stays healthy because the LLM does the maintenance no human ever wants to do.

## ✨Let’s Actually Build One

Let’s build a working LLM Wiki together.

### What you need

- **Claude Code**(or OpenAI Codex, or any agent) the brain
- **Obsidian**(free, obsidian.md) — the viewer
- A folder on your computer — your vault

### Step 1: Create the folder structure

Open your terminal:

bash

```
mkdir llm-wiki-demo && cd llm-wiki-demo
mkdir raw
```
You now have:

```
llm-wiki-demo/
├── raw/         (your immutable sources go here)
```
### Step 2: Open Claude Code in that folder, and paste this single message

“I want you to read this idea file by Andrej Karpathy and help me set up an LLM Wiki in this directory. Before you do anything, ask me what this wiki will be about, and what sources I plan to feed it. Once I answer, write me a CLAUDE.md schema file based on my answer”.


paste the full contents of Karpathy’s original gist here

### Step 3: Claude will respond with some clarifying questions

Claude will respond with a few clarifying questions like:

- What topic will this wiki cover?
- What kinds of sources will you feed it?
- Roughly how many sources are you planning to ingest?
- What page types do you want?

### Step 4: Answer honestly

For this demo, I’m building a wiki about **AI and the philosophy of software**. My answer:

“The wiki covers AI research and the philosophy of software. I’ll feed it short essays and blog posts from people like Rich Sutton and Andrej Karpathy. Probably 10–20 sources. I want concept pages, essay summaries, and author pages.”


Claude will now write a `CLAUDE.md` file tailored to that use case, initialize `wiki/index.md` and `wiki/log.md`, and say something like *"Ready to ingest your first source."*

You just built the whole schema without writing a line of code. That’s Karpathy’s pattern working exactly as intended.

### Step 5: Ingest sources

For my demo I have two sources

**#1 Rich Sutton’s “The Bitter Lesson”**

Drop Rich Sutton’s “The Bitter Lesson” into `raw/` as `bitter-lesson.pdf`.

Tell Claude:

“Ingest

`raw/bitter-lesson.pdf`."

Watch what happens. Claude reads the 2-page essay and generates something like:

```
wiki/
├── index.md                    (updated)
├── log.md                      (new entry appended)
├── sources/
│   └── bitter-lesson.md        (summary page)
├── concepts/
│   ├── search.md
│   ├── learning.md
│   ├── moores-law.md
│   ├── general-methods.md
│   └── human-knowledge-approaches.md
├── examples/
│   ├── computer-chess.md
│   ├── computer-go.md
│   ├── speech-recognition.md
│   └── computer-vision.md
└── people/
    └── rich-sutton.md
```
One 2-page PDF just became ~10 interlinked pages. Each page cross-references the others with Obsidian-style `[[wikilinks]]`.

**#2 — Karpathy’s “Software 2.0”**

Drop **Karpathy’s “Software 2.0”** into `raw/`as *software-2-0.pdf*

Tell Claude:

“Ingest

`raw/software-2-0.pdf`."

Claude doesn’t start from scratch. It reads your existing wiki first, recognizes that Karpathy’s “Software 2.0” essay is arguing something closely related to the Bitter Lesson, and does something remarkable: it **updates the existing pages** to add Karpathy’s framing, strengthens the cross-references, and creates new pages only where needed.

The `software-2-0.md` page now includes a `[[bitter-lesson]]` backlink because the LLM detected the conceptual connection between the two essays a link *no human added*.

**Your wiki got denser, not just bigger.** This is the compounding property Karpathy is pointing at.

### Step 6: Ask a synthesis question

Now the payoff:

“How do Sutton and Karpathy agree about the future of software, and where might they disagree?”


Claude doesn’t reopen the PDFs. It reads the two wiki pages you just built, follows the `[[links]]` between them, and gives you a grounded cross-author synthesis in seconds. That answer which draws on connections that didn't exist 60 seconds ago is now a file sitting in your vault forever.

This is what Karpathy means when he says knowledge *compounds*.

### Step 7: Open Obsidian and point it at the folder

Install Obsidian, create a new vault, point it at your `llm-wiki-demo/` folder, and hit the **graph view**.

You’re now looking at your knowledge as a network. Nodes are pages. Edges are the links Claude added automatically. Every source you add makes the graph denser.

That moment when the graph renders for the first time is when most people get it.

## 🔍RAG vs LLM Wiki: The Honest Comparison

The question everyone asks: is this actually better than RAG?

Honest answer: **neither wins. They solve different problems.**

```
┌─────────────────────────────────┬─────────────────────────────────┐
│            RAG                  │          LLM WIKI               │
├─────────────────────────────────┼─────────────────────────────────┤
│                                 │                                 │
│  📄 Raw docs stay raw           │  📄 Raw docs compiled into      │
│                                 │     structured wiki pages       │
│                                 │                                 │
│  🔍 Retrieves chunks per query  │  📖 Reads pre-synthesized pages │
│                                 │                                 │
│  🔁 Stateless — every query     │  📈 Stateful — knowledge        │
│     starts from scratch         │     compounds over time         │
│                                 │                                 │
│  🧩 Answers assembled from      │  🔗 Answers drawn from already- │
│     fragments at runtime        │     connected concepts          │
│                                 │                                 │
│  🕒 Cheap per query             │  💰 Expensive ingest,           │
│                                 │     cheap query                 │
│                                 │                                 │
│  ✅ Perfect traceability to     │  ⚠️  Answers 1–2 steps removed  │
│     source (which chunk?)       │     from raw source             │
│                                 │                                 │
│  ❌ No cross-time synthesis     │  ✅ Links March article to      │
│                                 │     October article naturally   │
│                                 │                                 │
│  ✅ Fresh data always re-read   │  ⚠️  Updates require re-ingest  │
│                                 │                                 │
│  ✅ Hallucinations stay local   │  ⚠️  Hallucinations can get     │
│     to one answer               │     baked in as "facts"         │
│                                 │                                 │
│  🎯 Best for: large, changing   │  🎯 Best for: ~100–500 curated  │
│     corpora, fact lookup,       │     sources, research projects, │
│     millions of docs            │     personal knowledge, books   │
│                                 │                                 │
└─────────────────────────────────┴─────────────────────────────────┘
```
**RAG** is great when you have millions of documents that change constantly and you need precise citations to an exact chunk. Think customer support, legal search, enterprise fact lookup.

**LLM Wiki** is great when you have a bounded, curated corpus maybe a few hundred sources on a topic you’re going deep on. Research projects. A book you’re studying. A course you’re taking. Your own journal. Situations where **synthesis matters more than retrieval **where the valuable answers require connecting five sources, not looking up one.

There’s a real critique of the LLM Wiki pattern worth taking seriously: because the LLM summarizes and compresses sources into wiki pages, there’s a risk of hallucinations getting baked in as *“facts.”* With pure RAG, a wrong answer is just one wrong answer. With an LLM Wiki, a small misunderstanding can quietly propagate across linked pages.

That’s why Karpathy emphasizes the **lint** step periodic audits and why any serious implementation should spot-check generated pages against raw sources.

## 🧰Why This Actually Matters

It’s not really about wikis. Karpathy is pointing at something much older a 1945 vision by Vannevar Bush called the **Memex**: a personal, curated knowledge store where the *connections between documents* are as valuable as the documents themselves.

Bush’s vision was closer to this than to what the web became: private, actively curated, with associative trails between ideas. The reason the Memex was never really built isn’t technical. It’s that nobody wants to do the *bookkeeping *updating cross-references, keeping summaries current, noting when new data contradicts old claims.

As Karpathy writes in the gist:

“The tedious part of maintaining a knowledge base is not the reading or the thinking it’s the bookkeeping. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don’t get bored, don’t forget to update a cross-reference, and can touch 15 files in one pass.”


**The tedious part of knowledge is finally solved.**

Your job shifts from *filing* to *thinking*. From *organizing* to *curating*. From *searching* to *asking better questions*. The LLM handles everything else.

## 🎗️Reference

- **Karpathy’s Tweet:**https://x.com/karpathy/status/2039805659525644595
- **Karpathy’s original gist:**gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- **Claude Code:**claude.com/claude-code
- **Obsidian:**obsidian.md
- **Demo source 1 — Sutton’s “The Bitter Lesson”:**incompleteideas.net/IncIdeas/BitterLesson.html
- **Demo source 2 — Karpathy’s “Software 2.0”:**karpathy.medium.com/software-2–0-a64152b37c35
- **Karpathy’s LLM Wiki Changes Everything:**https://youtu.be/04z2M_Nv_Rk

## Related Pages

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
- [[Fractal — the recursive language model CLI agent]]
- [[Hermes Agent 新增 /learn 指令：讓任何資料都能變成可重複使用的 AI 技能 - 電腦王阿達]]
- [[MCP Servers]]
- [[精選的 MCP 伺服器 [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)]]
- [[不得不裝的 AI 代理工具｜GitHub 萬星項目｜OPENCODE]]
- [[少子化時代：台灣缺的到底是人口，還是制度升級?]]
- [[「沒錢、沒資源、沒人脈，你要憑什麼贏？｜孫子兵法以少勝多九大心法｜越級打怪的底層邏輯｜孫武、老子、孔子同時告訴你｜孫子說」]]
- [[為什麼PDF還是這麼難用？其實是故意的]]

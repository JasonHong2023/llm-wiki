---
title: Building an LLM Research Wiki: How I Turned 3,000 Pages of Philosophy into a Living Knowledge…
type: framework
created: 2026-06-30T20:31
updated: 2026-06-30T20:31
tags: [Markdown, English, 技術, programming, development, 資料庫, database]
confidence: high
---

# Building an LLM Research Wiki: How I Turned 3,000 Pages of Philosophy into a Living Knowledge…

# Building an LLM Research Wiki: How I Turned 3,000 Pages of Philosophy into a Living Knowledge System

*How an artist-researcher adapted Andrej Karpathy’s LLM Wiki pattern to build a structured knowledge base across Continental philosophy, music ontology, and posthumanism — using Claude Code as a dedicated research intelligence agent.*

—

### The Spark

In early April 2026, Andrej Karpathy published a gist describing what he called an “LLM Wiki” — the idea that instead of using RAG (Retrieval-Augmented Generation) to re-derive knowledge from raw documents on every query, an LLM should incrementally build and maintain a **persistent, structured wiki** that compounds over time. Raw sources go in; structured, interlinked knowledge comes out. The wiki becomes smarter than your memory about connections across your reading.

I was immediately interested. As an artist-researcher working across Continental philosophy, music composition, and posthumanism, I deal with dense, interconnected primary sources — Deleuze, Simondon, Rancière, Stiegler, Barad — where the connections between concepts across books and authors are precisely what makes the research productive. Traditional note-taking and reference management tools don’t capture these connections. They store documents; they don’t *think across* them.

Karpathy’s pattern was designed for a software engineer’s needs (Obsidian-based, focused on technical documentation). I needed something for a humanities researcher working with 300-page philosophical monographs where a single concept might appear in five different authors with five different meanings. So I set out to adapt it.

### The Design Phase

I started by taking Karpathy’s core insight — raw sources as immutable ground truth, the wiki as a living synthesis layer, structured workflows for ingest/query/lint — and exploring how to adapt it for academic research. I used ChatGPT to brainstorm the initial architecture: What page types does a humanities wiki need? How should concepts, authors, and debates be structured? What kind of frontmatter enables fast navigation?

This exploration produced the first draft of the schema: six page types (source notes, concepts, authors, debates, syntheses, projects), YAML frontmatter conventions, and the three-layer architecture (raw → wiki → schema).

Then I moved to Claude Code — Anthropic’s terminal-based coding agent — for the actual implementation. Claude Code operates directly in your file system, reading and writing markdown files, and it retains context across long sessions. This made it the ideal tool for building and maintaining a wiki: it could read a 300-page PDF, create 15 interlinked wiki pages, and update the index — all in a single conversational session.

An important detail: the initial build was not a single-agent operation. I had previously created three specialised agents within Claude Code, and the setup session orchestrated all three:

**Agent A** — Orchestrated the full setup; routed tasks to the other two agents

**Agent B** — Researched the onboarding strategy for large existing collections (the “5,000 notes / 4,000 PDFs” problem)

**Agent C** — Built the folder structure, authored the CLAUDE.md schema and all template files, and executed the first ingest — which produced 38 wiki pages in a single pass

This multi-agent division of labour meant that the entire system — schema, folders, templates, onboarding strategy, and a fully populated first ingest — was built in a single session. After that, the agents were no longer needed: the CLAUDE.md schema itself became the permanent operator, read by Claude Code at the start of every subsequent session.

What I didn’t expect was that Claude Code would become not just the builder but the *operator* of the wiki. The CLAUDE.md file at the root of the project functions as a permanent instruction set: every time a new session starts, Claude reads it and acts as a dedicated research intelligence agent — following the ingest, query, and lint workflows defined in the schema.

### The Architecture

The system has three layers:

**raw/** — Immutable source documents (PDFs, transcripts, notes). *Written by the researcher.*

**wiki/** — Structured markdown pages (concepts, authors, debates, syntheses, source notes, projects). *Written by the LLM.*

**schema** — CLAUDE.md (operational instructions), index.md (master index), log.md (change log). *Written by both.*

The raw/ layer is sacred — source files are never modified after being placed there. The wiki/ layer is the living synthesis that grows with every ingest. The schema layer governs everything.

### Six Page Types

Every wiki page follows one of six templates, each with specific YAML frontmatter:

- **Source notes**— one per ingested document. Summary, key claims (with page numbers), direct quotes, connections to other pages, open questions.
- **Concept pages**— one per concept (e.g., “assemblage,” “transduction,” “haecceity”). Definition, key thinkers, related concepts, source support from multiple texts.
- **Author pages**— one per key thinker. Bio sketch, key works, concepts, relevance to my research.
- **Debate pages**— framed intellectual disagreements across the literature.
- **Synthesis pages**— evolving argumentative overviews across a cluster of related pages.
- **Project pages**— active research or writing projects with their concept/source inventories.

### Epistemic Markers

A feature I’m particularly proud of: every claim in the wiki carries an epistemic register marker.

- *(no marker)*— Directly attributable to a named source
- **[W]**— Wiki synthesis: the LLM’s editorial integration across multiple sources
- **[P]**— My own research position: not what a source says, but what I argue
- **[?]**— Uncertain: a date, attribution, or claim the wiki cannot confidently verify

This matters because in humanities research, the distinction between “what Deleuze says,” “what Sauvagnargues says Deleuze says,” and “what I claim about both” is philosophically consequential. The markers keep these registers visible.

### Navigation Design

After about 50 pages, I hit a scaling problem: a flat alphabetical index becomes too slow to navigate. The solution was a three-layer navigation cascade:

- **Concept clusters**in index.md — thematic groupings (4–6 per domain) that a query checks first
- **Synthesis pages**— pre-digested argumentative overviews for each cluster (one page instead of six)
- **related: YAML fields**— every concept/author page carries 3–5 pointers to its closest neighbours

The cascade means that at 185 pages, query cost is roughly the same as it was at 50.

### The Numbers

After approximately two weeks of intensive work (April 6–17, 2026), the wiki looks like this:

- **Source documents ingested:**70
- **Total wiki pages:**185 (65 concepts, 39 authors, 70 source notes, 4 debates, 2 syntheses, 5 projects)
- **Total cross-references (markdown links):**1,592
- **Total words in wiki:**233,881
- **Pages of primary source material read:**~3,200
- **Log entries:**73

The debate and synthesis counts are low — these page types grow more slowly because they require genuine argumentative integration across multiple sources, not just extraction from a single text. They will grow as the wiki matures. The concept and author pages, by contrast, are already dense: every concept page has at least 2 source support entries, and the richest have 17.

### The Ingest Multiplier

On average, each ingested source produces **2.6 wiki pages** (1 source note + updates to ~1.6 existing pages). But this average conceals wide variation:

- **A short article**(5–20 pp) typically produces 1 source note + updates to 2–3 existing pages =- **3–4 page operations**
- **A major monograph**(200+ pp) can produce 1 source note + updates to 8–10 existing pages =- **10–12 page operations**
- **The largest single ingest**— Sauvagnargues’s- *Deleuze and Art*(187 pp) — created 7 new pages (6 new concept stubs + 1 source note) and updated 10 existing pages =- **17 page operations**

The real power is not in the creation of new pages but in the *updating* of existing ones. When I ingest Deleuze’s *Difference and Repetition* Chapter 4, the LLM doesn’t just create a source note — it adds the primary source reference to the *multiplicity* concept page, updates the *differenciation* page, enriches the *univocal being* page, and adds it to the Deleuze author page. Each new ingest makes every previous ingest more valuable.

### The Densest Nodes

Some concept pages have become extraordinarily rich through accumulated ingests:

**Assemblage** — 17 source support entries, spanning Deleuze-Guattari, DeLanda (4 books), Sauvagnargues (2 books), my own texts, Beistegui, Haraway, Rancière, Simondon

**Posthumanism** — 13 entries, spanning Hassan, Haraway, Hayles, Braidotti (2 books), Ferrando (2 sources), Wolfe, Tomlinson, my ERC grant description

**Transduction** — 9 entries, spanning Simondon (2 sources), Stiegler, Hui (2 sources), Beistegui, Sauvagnargues (2 books), my own article on performative transduction

These densely supported pages are where the wiki becomes genuinely useful as a research tool. The *assemblage* page, for instance, now contains DeLanda’s properties/capacities distinction, Deleuze-Guattari’s tetravalent definition, Sauvagnargues’s machinic assemblage, my own six musical strata, and the genealogy of the *agencement/assemblage* translation problem — all in one page, with citations to their primary sources. No single book or article contains all of this. Only the wiki does.

### The Onboarding Problem

If you’re an established researcher, you likely have thousands of notes and thousands of PDFs. The single most important lesson I learned — before ingesting a single source — is this:

**The wiki is NOT the library. It is a curated synthesis of what matters NOW.**

During the design phase, we identified five traps to avoid:

- **The Migration Fantasy**— never try to ingest everything. Your existing library stays where it is.
- **Premature Categorization**— don’t create 50 empty stubs before ingesting a single source.
- **Batch ingesting before the spine exists**— you need 5–10 carefully supervised ingests before the wiki has enough structure to guide itself.
- **Starting with your most complex source**— start with your own research map, not with- *Difference and Repetition*.
- **Treating raw/ as a copy of your PDF library**— raw/ is a curated intake folder, not a mirror.

The phased approach that worked for me:

- **Phase 0:**Write a research map in your own words — 2–3 pages describing your current research constellation. Ingest it first. This seeds the wiki with- *your*conceptual framework.
- **Phase 1 (sources 1–5):**Fully supervised, one source at a time, spread across your projects. You’re training both the wiki and yourself.
- **Phase 2 (sources 6–20):**Still supervised, but you can do 2–3 per session. The schema and accumulated wiki context start guiding the LLM’s decisions.
- **Phase 3 (sources 20+):**Lighter supervision. Batch ingesting becomes viable. The wiki has enough density to catch its own errors through lint.

For existing collections: keep your 5,000 notes and 4,000 PDFs where they are. Copy a source to raw/ only when you’re ready to ingest it. For books, ingest chapters rather than entire volumes. The priority test: *“Would I cite this in something I’m writing right now?”*

The growth trajectory I’ve observed:

- **5 sources / ~20 pages**— Basic Q&A on ingested sources
- **20 sources / ~80 pages**— First real syntheses viable
- **50 sources / ~200 pages**— Draft paper sections from queries
- **100 sources / ~400 pages**— Wiki smarter than memory about cross-connections

The break-even point is around source 20–30: when a query returns a cited answer in 30 seconds instead of 20 minutes of PDF digging.

### The Three Workflows in Practice

### INGEST

I say: *ingest Deleuze, Gilles. 1968 [1994] Difference and Repetition. CHAPTER 4.pdf*

Claude reads the full chapter (54 pages of dense philosophy), then:

- Discusses key takeaways with me before writing anything
- Creates a source note with 13 key claims, 10 direct quotes, and 4 open questions
- Updates the *multiplicity*concept page (adds the “primary philosophical source”)
- Updates the *differenciation*page (adds the primary source, demotes Beistegui to “secondary”)
- Resolves the “thin source support” issue on *onto-hetero-genesis*and*univocal being*
- Updates the Deleuze author page
- Updates index.md and log.md

Total: 1 page created, 5 pages updated, 2 thin-source issues resolved. Time: about 10 minutes.

### QUERY

I can ask: “How does the line of flight concept work politically?”

Claude checks index.md, identifies Cluster C, reads the *line-of-flight* concept page (which has 3 source support entries: ATP Ch. 1, Sauvagnargues 2013, and Thornton 2020), follows the related fields to *assemblage* and *becoming*, and constructs an answer from the synthesised wiki — citing specific pages and passages without needing to re-read the original PDFs.

### LINT

I say: *lint*

Claude audits all 185 pages against 8 criteria: orphan pages, broken links, missing epistemic markers, thin source support, stale pages, source notes not in index, concepts missing from index. The last lint returned: 0 orphans, 0 missing markers, 0 thin-source pages, 0 broken concept links, 1,592 cross-references intact. Every concept page has 2+ sources.

### What I Learned

### 1. The wiki is more than the sum of its sources

The most valuable pages are the ones that synthesise across sources no single author has connected. The *assemblage* page — drawing on Deleuze-Guattari’s philosophical concept, DeLanda’s social ontology, Sauvagnargues’s aesthetics, and my own musical application — contains knowledge that exists nowhere else in published form. The wiki *produces* knowledge through the act of structured accumulation.

### 2. Supervision matters at the start, less so later

The first 10–15 ingests required close supervision: checking that concepts were correctly identified, that connections were genuine rather than superficial, that epistemic markers were applied correctly. After that, the schema and the accumulated wiki context guided the LLM toward increasingly accurate and consistent page updates. The wiki trains its own operator.

### 3. The lint workflow is essential

Without regular linting, the wiki would drift: orphan pages, broken links, inconsistent markers. The lint workflow catches these before they compound. I run it every 10–15 ingests. It takes 2 minutes and prevents hours of cleanup.

### 4. Obsidian is the natural companion

After building the wiki entirely through Claude Code, I opened the folder in Obsidian. Everything worked immediately — the graph view, the backlinks panel, the search. No migration, no conversion. Obsidian reads the same markdown files that Claude writes. The two tools are complementary: Claude for structured operations (ingest, query, lint), Obsidian for visual exploration and serendipitous discovery.

### 5. The schema is the real product

The wiki pages are valuable, but the reusable product is the CLAUDE.md schema — the operational instruction set that turns any LLM coding agent into a research wiki operator. It’s open-sourced on GitHub. Anyone can clone it, edit the domain context for their own field, and start ingesting.

### Try It Yourself

The repository is at github.com/MetamusicX/llm-research-wiki.

What you need:

- Claude Code (terminal, desktop, or VS Code extension)
- The CLAUDE.md file from the repo — this is the schema that makes it work
- Your own source documents (PDFs, markdown notes, transcripts)
- No database, no embeddings, no plugins — just markdown files and folders

Start with your own research map as the first ingest. It seeds the wiki with *your* conceptual framework. Then add sources one at a time. Supervise the first 10. Run lint every 15. After 50 sources, you’ll have a genuine research tool. After 100, it’s indispensable.

— -

*Paulo de Assis is an artist-researcher with expertise in composition, piano performance, Continental philosophy, science and technology studies, *and *epistemology. He is the author of* Logic of Experimentation: Rethinking Music Performance through Artistic Research *(Leuven University Press, 2018). The wiki described in this article was built as part of his ongoing ERC Advanced Grant project PosthumanMusic (2026–2030).*

*The LLM Research Wiki pattern is open-sourced at **github.com/MetamusicX/llm-research-wiki**.*

## Related Pages

- [[Karpathy 的新工作流：用 LLM 把原始資料編譯成私人 wiki]]
- [[EP-80｜LLM Wiki：讓 AI 把資料變成第二顆大腦]]
- [[Why LLM Wiki? 🧠 Future Of Knowledge For Agentic AI & Humans]]
- [[Andrej Karpathy：完整LLM wiki 建構提示詞! 基於Obsidian+AI Agent的個人知識庫完整建構指南 | 科技 | 鉅亨號 | Anue鉅亨]]
- [[LLM Wiki 實戰：我們怎麼把部落格變成一座知識庫 - News]]
- [[Karpathy LLM Wiki 知識系統實踐：解析核心理念 | Kenmingの鮮思維]]
- [[进入知乎]]
- [[LLM Wiki 是什麼？OpenAI 創始成員提出的 AI 知識庫玩法，讓 LLM 幫你打造第二大腦]]
- [[LLM Wiki]]
- [[Karpathy 的 LLM Wiki 缺少了什麼（以及如何修正）]]
- [[Karpathy LLM Wiki 是什麼？一個卡片盒筆記法使用者的實測 | WenHao Yu]]
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

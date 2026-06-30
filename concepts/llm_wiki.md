---
title: LLM Wiki
type: framework
created: 2026-06-30T19:03
updated: 2026-06-30T19:03
tags: [Python, 非同步, scripting, Markdown, 中文, English, 技術, programming, source:github]
confidence: high
---

# LLM Wiki

<p align="center">
  <img src="logo.jpg" width="128" height="128" style="border-radius: 22%;" alt="LLM Wiki Logo">
</p>

<p align="center">
  <strong>A personal knowledge base that builds itself.</strong><br>
  LLM reads your documents, builds a structured wiki, and keeps it current.
</p>

<p align="center">
  <a href="#what-is-this">What is this?</a> •
  <a href="#what-we-changed--added">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#installation">Installation</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  English | <a href="README_CN.md">中文</a> | <a href="README_JA.md">日本語</a> | <a href="README_KO.md">한국어</a>
</p>

---

<p align="center">
  <img src="assets/overview.jpg" width="100%" alt="Overview">
</p>

## Features

- **Two-Step Chain-of-Thought Ingest** — LLM analyzes first, then generates wiki pages with source traceability and incremental cache
- **Multimodal Image Ingestion** — extract embedded images from PDFs, generate factual captions with a vision LLM, surface them in image-aware search results with lightbox preview and jump-to-source
- **Optional MinerU PDF Parsing** — use MinerU cloud parsing for complex PDFs with tables, formulas, and dense layouts; the built-in local parser remains the default
- **4-Signal Knowledge Graph** — relevance model with direct links, source overlap, Adamic-Adar, and type affinity
- **Louvain Community Detection** — automatic knowledge cluster discovery with cohesion scoring
- **Graph Insights** — surprising connections and knowledge gaps with one-click Deep Research
- **Vector Semantic Search** — optional embedding-based retrieval via LanceDB, supports any OpenAI-compatible endpoint
- **Persistent Ingest Queue** — serial processing with crash recovery, cancel, retry, and progress visualization
- **Folder Import** — recursive folder import preserving directory structure, folder context as LLM classification hint
- **Source Folder Auto-Watch** — detects external changes in `raw/sources/` and keeps ingest/delete cleanup in sync
- **Deep Research** — LLM-optimized search topics, multi-query web search via Tavily, SerpApi, or SearXNG, auto-ingest results into wiki
- **Async Review System** — LLM flags items for human judgment, predefined actions, pre-generated search queries
- **Chrome Web Clipper** — one-click web page capture with auto-ingest into knowledge base
- **Local HTTP API + MCP Server + AI Agent Skill** — built-in `127.0.0.1:19828` JSON API and bundled MCP server for hybrid search, file read, graph traversal, and source rescan; ready-made [agent skill](https://github.com/nashsu/llm_wiki_skill) installs into Claude Code / Codex with one command (`npx skills add …`)

## What is this?

LLM Wiki is a cross-platform desktop application that turns your documents into an organized, interlinked knowledge base — automatically. Instead of traditional RAG (retrieve-and-answer from scratch every time), the LLM **incrementally builds and maintains a persistent wiki** from your sources. Knowledge is compiled once and kept current, not re-derived on every query.

This project is based on [Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — a methodology for building personal knowledge bases using LLMs. We implemented the core ideas as a full desktop application with significant enhancements.

<p align="center">
  <img src="assets/llm_wiki_arch.jpg" width="100%" alt="LLM Wiki Architecture">
</p>

## Credits

The foundational methodology comes from **Andrej Karpathy**'s [llm-wiki.md](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), which describes the pattern of using LLMs to incrementally build and maintain a personal wiki. The original document is an abstract design pattern; this project is a concrete implementation with substantial extensions.

## What We Kept from the Original

The core architecture follows Karpathy's design faithfully:

- **Three-layer architecture**: Raw Sources (immutable) → Wiki (LLM-generated) → Schema (rules & config)
- **Three core operations**: Ingest, Query, Lint
- **index.md** as the content catalog and LLM navigation entry point
- **log.md** as the chronological operation record with parseable format
- **[[wikilink]]** syntax for cross-references
- **YAML frontmatter** on every wiki page
- **Obsidian compatibility** — the wiki directory works as an Obsidian vault
- **Human curates, LLM maintains** — the fundamental role division

<p align="center">
  <img src="assets/5-obsidian_compatibility.jpg" width="100%" alt="Obsidian Compatibility">
</p>

## What We Changed & Added

### 1. From CLI to Desktop Application

The original is an abstract pattern document designed to be copy-pasted to an LLM agent. We built it into a **full cross-platform desktop application** with:
- **Three-column layout**: Knowledge Tree / File Tree (left) + Chat (center) + Preview (right)
- **Icon sidebar** for switching between Wiki, Sources, Search, Graph, Lint, Review, Deep Research, Settings
- **Custom resizable panels** — drag-to-resize left and right panels with min/max constraints
- **Activity panel** — real-time processing status showing file-by-file ingest progress
- **All state persisted** — conversations, settings, review items, project config survive restarts
- **Scenario templates** — Research, Reading, Personal Growth, Business, General — each pre-configures purpose.md and schema.md

### 2. Purpose.md — The Wiki's Soul

The original has Schema (how the wiki works) but no formal place for **why** the wiki exists. We added `purpose.md`:
- Defines goals, key questions, research scope, evolving thesis
- LLM reads it during every ingest and query for context
- LLM can suggest updates based on usage patterns
- Different from schema — schema is structural rules, purpose is directional intent

### 3. Two-Step Chain-of-Thought Ingest

The original describes a single-step ingest where the LLM reads and writes simultaneously. We split it into **two sequential LLM calls** for significantly better quality:

```
Step 1 (Analysis): LLM reads source → structured analysis
  - Key entities, concepts, arguments
  - Connections to existing wiki content
  - Contradictions & tensions with existing knowledge
  - Recommendations for wiki structure

Step 2 (Generation): LLM takes analysis → generates wiki files
  - Source summary with frontmatter (type, title, sources[])
  - Entity pages, concept pages with cross-references
  - Updated index.md, log.md, overview.md
  - Review items for human judgment
  - Search queries for Deep Research
```

Additional ingest enhancements beyond the original:
- **SHA256 incremental cache** — source file content is hashed before ingest; unchanged files are skipped automatically, saving LLM tokens and time
- **Persistent ingest queue** — serial processing prevents concurrent LLM calls; queue persisted to disk, survives app restart; failed tasks auto-retry up to 3 times
- **Folder import** — recursive folder import preserving directory structure; folder path passed to LLM as classification context (e.g., "papers > energy" helps categorize content)
- **Source folder auto-watch** — files added, edited, or deleted in `raw/sources/` outside the app are picked up automatically and reuse the same ingest/delete lifecycle as in-app actions
- **Queue visualization** — Activity Panel shows progress bar, pending/processing/failed tasks with cancel and retry buttons
- **Auto-embedding** — when vector search is enabled, new pages are automatically embedded after ingest
- **Source traceability** — every generated wiki page includes a `sources: []` field in YAML frontmatter, linking back to the raw source files that contributed to it
- **overview.md auto-update** — global summary page regenerated on every ingest to reflect the latest state of the wiki
- **Guaranteed source summary** — fallback ensures a source summary page is always created, even if the LLM omits it
- **Language-aware generation** — LLM responds in the user's configured language (English or Chinese)
- **Progressive Sources view** — large source folders render progressively while scrolling, keeping big source collections responsive

### 4. Knowledge Graph with Relevance Model

<p align="center">
  <img src="assets/3-knowledge_graph.jpg" width="100%" alt="Knowledge Graph">
</p>

The original mentions `[[wikilinks]]` for cross-references but has no graph analysis. We built a **full knowledge graph visualization and relevance engine**:

**4-Signal Relevance Model:**
| Signal | Weight | Description |
|--------|--------|-------------|
| Direct link | ×3.0 | Pages linked via `[[wikilinks]]` |
| Source overlap | ×4.0 | Pages sharing the same raw source (via frontmatter `sources[]`) |
| Adamic-Adar | ×1.5 | Pages sharing common neighbors (weighted by neighbor degree) |
| Type affinity | ×1.0 | Bonus for same page type (entity↔entity, concept↔concept) |

**Graph Visualization (sigma.js + graphology + ForceAtlas2):**
- Node colors by page type or community, sizes scaled by link count (√ scaling)
- Edge thickness and color by relevance weight (green=strong, gray=weak)
- Hover interaction: neighbors stay visible, non-neighbors dim, edges highlight with relevance score label
- Zoom controls (ZoomIn, ZoomOut, Fit-to-screen)
- Position caching prevents layout jumps when data updates
- Legend switches between type counts and community info based on coloring mode

### 5. Louvain Community Detection

Not in the original. Automatic discovery of knowledge clusters using the **Louvain algorithm** (graphology-communities-louvain):

- **Auto-clustering** — discovers which pages naturally group together based on link topology, independent of predefined page types
- **Type / Community toggle** — switch between coloring nodes by page type (entity, concept, source...) or by discovered knowledge cluster
- **Cohesion scoring** — each community scored by intra-edge density (actual edges / possible edges); low-cohesion clusters (< 0.15) flagged with warning
- **12-color palette** — distinct visual separation between clusters
- **Community legend** — shows top node label, member count, and cohesion per cluster

<p align="center">
  <img src="assets/kg_community.jpg" width="100%" alt="Louvain Community Detection">
</p>

### 6. Graph Insights — Surprising Connections & Knowledge Gaps

Not in the original. The system **automatically analyzes graph structure** to surface actionable insights:

**Surprising Connections:**
- Detects unexpected relationships: cross-community edges, cross-type links, peripheral↔hub couplings
- Composite surprise score ranks the most noteworthy connections
- Dismissable — mark connections as reviewed so they don't reappear

**Knowledge Gaps:**
- **Isolated pages** (degree ≤ 1) — pages with few or no connections to the rest of the wiki
- **Sparse communities** (cohesion < 0.15, ≥ 3 pages) — knowledge areas with weak internal cross-references
- **Bridge nodes** (connecting 3+ clusters) — critical junction pages that hold multiple knowledge areas together

**Interactive:**
- Click any insight card to **highlight** corresponding nodes and edges in the graph; click again to deselect
- Knowledge gaps and bridge nodes have a **Deep Research button** — triggers LLM-optimized research with domain-aware topics (reads overview.md + purpose.md for context)
- Research topic shown in **editable confirmation dialog** before starting — user can refine topic and search queries

<p align="center">
  <img src="assets/kg_insights.jpg" width="100%" alt="Graph Insights">
</p>

### 7. Optimized Query Retrieval Pipeline

The original describes a simple query where the LLM reads relevant pages. We built a **multi-phase retrieval pipeline** with optional vector search and budget control:

```
Phase 1: Tokenized Search
  - English: word splitting + stop word removal
  - Chinese: CJK bigram tokenization (每个 → [每个, 个…])
  - Title match bonus (+10 score)
  - Searches both wiki/ and raw/sources/

Phase 1.5: Vector Semantic Search (optional)
  - Embedding via any OpenAI-compatible /v1/embeddings endpoint
  - Stored in LanceDB (Rust backend) for fast ANN retrieval
  - Cosine similarity finds semantically related pages even without keyword overlap
  - Results merged into search: boosts existing matches + adds new discoveries

Phase 2: Graph Expansion
  - Top search results used as seed nodes
  - 4-signal relevance model finds related pages
  - 2-hop traversal with decay for deeper connections

Phase 3: Budget Control
  - Configurable context window: 4K → 1M tokens
  - Proportional allocation: 60% wiki pages, 20% chat history, 5% index, 15% system
  - Pages prioritized by combined search + graph relevance score

Phase 4: Context Assembly
  - Numbered pages with full content (not just summaries)
  - System prompt includes: purpose.md, language rules, citation format, index.md
  - LLM instructed to cite pages by number: [1], [2], etc.
```

**Vector Search** is fully optional — disabled by default, enabled in Settings with independent endpoint, API key, and model configuration. When disabled, the pipeline falls back to tokenized search + graph expansion. Benchmark: overall recall improved from 58.2% to 71.4% with vector search enabled.

### 8. Multi-Conversation Chat with Persistence

The original has a single query interface. We built **full multi-conversation support**:

- **Independent chat sessions** — create, rename, delete conversations
- **Conversation sidebar** — quick switching between topics
- **Per-conversation persistence** — each conversation saved to `.llm-wiki/chats/{id}.json`
- **Configurable history depth** — limit how many messages are sent as context (default: 10)
- **Cited references panel** — collapsible section on each response showing which wiki pages were used, grouped by type with icons
- **Reference persistence** — cited pages stored directly in message data, stable across restarts
- **Regenerate** — re-generate the last response with one click (removes last assistant + user message pair, re-sends)
- **Save to Wiki** — archive valuable answers to `wiki/queries/`, then auto-ingest to extract entities/concepts into the knowledge network

### 9. Thinking / Reasoning Display

Not in the original. For LLMs that emit `<think>` blocks (DeepSeek, QwQ, etc.):

- **Streaming thinking** — rolling 5-line display with opacity fade during generation
- **Collapsed by default** — thinking blocks hidden after completion, click to expand
- **Visual separation** — thinking content shown in distinct style, separate from the main response

### 10. KaTeX Math Rendering

Not in the original. Full LaTeX math support across all views:

- **KaTeX rendering** — inline `$...$` and block `$$...$$` formulas rendered via remark-math + rehype-katex
- **Milkdown math plugin** — preview editor renders math natively via @milkdown/plugin-math
- **Auto-detection** — bare `\begin{aligned}` and other LaTeX environments automatically wrapped with `$$` delimiters
- **Unicode fallback** — 100+ symbol mappings (α, ∑, →, ≤, etc.) for simple inline notation outside math blocks

### 11. Review System (Async Human-in-the-Loop)

The original suggests staying involved during ingest. We added an **asynchronous review queue**:

- LLM flags items needing human judgment during ingest
- **Predefined action types**: Create Page, Deep Research, Skip — constrained to prevent LLM hallucination of arbitrary actions
- **Search queries generated at ingest time** — LLM pre-generates optimized web search queries for each review item
- User handles reviews at their convenience — doesn't block ingest

### 12. Deep Research

<p align="center">
  <img src="assets/1-deepresearch.jpg" width="100%" alt="Deep Research">
</p>

Not in the original. When the LLM identifies knowledge gaps:

- **Web search** via Tavily, SerpApi, or SearXNG finds relevant sources with full content extraction (no truncation)
- **Provider-specific configuration** — Tavily and SerpApi use independent API keys; SerpApi supports selectable engines, while SearXNG uses a configured instance URL and search categories
- **Multiple search queries** per topic — LLM-generated at ingest time, optimized for search engines
- **LLM-optimized research topics** — when triggered from Graph Insights, LLM reads overview.md + purpose.md to generate domain-specific topics and queries (not generic keywords)
- **User confirmation dialog** — editable topic and search queries shown for review before research starts
- **LLM synthesizes** findings into a wiki research page with cross-references to existing wiki
- **Thinking display** — `<think>` blocks shown as collapsible sections during synthesis, auto-scroll to latest content
- **Auto-ingest** — research results automatically processed to extract entities/concepts into the wiki
- **Task queue** with 3 concurrent tasks
- **Research Panel** — dedicated sidebar panel with dynamic height, real-time streaming progress

### 13. Browser Extension (Web Clipper)

<p align="center">
  <img src="assets/4-chrome_extension_webclipper.jpg" width="100%" alt="Chrome Extension Web Clipper">
</p>

The original mentions Obsidian Web Clipper. We built a **dedicated Chrome Extension** (Manifest V3):

- **Mozilla Readability.js** for accurate article extraction (strips ads, nav, sidebars)
- **Turndown.js** for HTML → Markdown conversion with table support
- **Project picker** — choose which wiki to clip into (supports multi-project)
- **Local HTTP API** (port 19827, tiny_http) — Extension ↔ App communication
- **Auto-ingest** — clipped content automatically triggers the two-step ingest pipeline
- **Clip watcher** — polls every 3 seconds for new clips, processes automatically
- **Offline preview** — shows extracted content even when app is not running

### 14. Multi-format Document Support

The original focuses on text/markdown. We support structured extraction preserving document semantics:

| Format | Method |
|--------|--------|
| PDF | Built-in pdf-extract (Rust) with file caching; optional MinerU cloud parsing for tables, formulas, and complex layouts |
| DOCX | docx-rs — headings, bold/italic, lists, tables → structured Markdown |
| PPTX | ZIP + XML — slide-by-slide extraction with heading/list structure |
| XLSX/XLS/ODS | calamine — proper cell types, multi-sheet support, Markdown tables |
| Images | Native preview (png, jpg, gif, webp, svg, etc.) |
| Video/Audio | Built-in player |
| Web clips | Readability.js + Turndown.js → clean Markdown |

> MinerU is optional. When enabled, PDF files are uploaded to MinerU cloud for parsing; keep the built-in parser for sensitive documents. If MinerU fails, LLM Wiki falls back to the built-in parser. MinerU usage is subject to its file size, page count, and quota limits.

### 15. File Deletion with Cascade Cleanup

The original has no deletion mechanism. We added **intelligent cascade deletion**:

- Deleting a source file removes its wiki summary page
- **3-method matching** finds related wiki pages: frontmatter `sources[]` field, source summary page name, frontmatter section references
- **Shared entity preservation** — entity/concept pages linked to multiple sources only have the deleted source removed from their `sources[]` array, not deleted entirely
- **Index cleanup** — removed pages are purged from index.md
- **Wikilink cleanup** — dead `[[wikilinks]]` to deleted pages are removed from remaining wiki pages

### 16. Configurable Context Window

Not in the original. Users can configure how much context the LLM receives:

- **Slider from 4K to 1M tokens** — adapts to different LLM capabilities
- **Proportional budget allocation** — larger windows get proportionally more wiki content
- **60/20/5/15 split** — wiki pages / chat history / index / system prompt

### 17. Cross-Platform Compatibility

The original is platform-agnostic (abstract pattern). We handle concrete cross-platform concerns:

- **Path normalization** — unified `normalizePath()` used across 22+ files, backslash → forward slash
- **Unicode-safe string handling** — char-based slicing instead of byte-based (prevents crashes on CJK filenames)
- **macOS close-to-hide** — close button hides window (app stays running in background), click dock icon to restore, Cmd+Q to quit
- **Windows/Linux close confirmation** — confirmation dialog before quitting to prevent accidental data loss
- **Tauri v2** — native desktop on macOS, Windows, Linux
- **GitHub Actions CI/CD** — automated builds for macOS (ARM + Intel), Windows (.msi), Linux (.deb / .AppImage)

### 18. Other Additions

- **i18n** — English + Chinese interface (react-i18next)
- **Settings persistence** — LLM provider, API key, model, context size, language saved via Tauri Store
- **Obsidian config** — auto-generated `.obsidian/` directory with recommended settings
- **Markdown rendering** — GFM tables with borders, proper code blocks, wikilink processing in chat and preview
- **Multi-provider LLM support** — OpenAI, Anthropic, Google, Ollama, Custom — each with provider-specific streaming and headers
- **15-minute timeout** — long ingest operations won't fail prematurely
- **dataVersion signaling** — graph and UI automatically refresh when wiki content changes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop | Tauri v2 (Rust backend) |
| Frontend | React 19 + TypeScript + Vite |
| UI | shadcn/ui + Tailwind CSS v4 |
| Editor | Milkdown (ProseMirror-based WYSIWYG) |
| Graph | sigma.js + graphology + ForceAtlas2 |
| Search | Tokenized search + graph relevance + optional vector (LanceDB) |
| Vector DB | LanceDB (Rust, embedded, optional) |
| PDF | pdf-extract + optional MinerU cloud parser |
| Office | docx-rs + calamine |
| i18n | react-i18next |
| State | Zustand |
| LLM | Streaming fetch (OpenAI, Anthropic, Google, Ollama, Custom) |
| Web Search | Tavily, SerpApi, SearXNG JSON API |

## Installation

### Pre-built Binaries

Download from [Releases](https://github.com/nashsu/llm_wiki/releases):
- **macOS**: `.dmg` (Apple Silicon + Intel)
- **Windows**: `.msi`
- **Linux**: `.deb` / `.AppImage`

### Build from Source

```bash
# Prerequisites: Node.js 20+, Rust 1.70+
git clone https://github.com/nashsu/llm_wiki.git
cd llm_wiki
npm install
npm run tauri dev      # Development
npm run tauri build    # Production build
```

### Chrome Extension

1. Open `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension/` directory

## Quick Start

1. Launch the app → Create a new project (choose a template)
2. Go to **Settings** → Configure your LLM provider (API key + model)
3. Optional: configure **Web Search** providers and source folder auto-watch in Settings
4. Go to **Sources** → Import documents (PDF, DOCX, MD, etc.)
5. Watch the **Activity Panel** — LLM automatically builds wiki pages
6. Use **Chat** to query your knowledge base
7. Browse the **Knowledge Graph** to see connections
8. Check **Review** for items needing your attention
9. Run **Lint** periodically to maintain wiki health

## Local HTTP API + MCP Server + AI Agent Skill

LLM Wiki ships a built-in local HTTP API at `http://127.0.0.1:19828` (token-protected, `127.0.0.1`-only) so external tools — including AI agents like **Claude Code**, **Codex**, or any HTTP-capable script — can query your wiki:

- `GET /api/v1/health` — server status (no auth)
- `GET /api/v1/projects` — list projects
- `GET /api/v1/projects/{id}/files` / `files/content` — read files and content
- `GET /api/v1/projects/{id}/reviews?status=unresolved` — export Review tab items for wiki maintenance (`status`: `unresolved`, `resolved`, or `all`; optional `type` and `limit`)
- `PATCH /api/v1/projects/{id}/reviews/{reviewId}` — update one Review item (JSON body `{ "resolved": true, "action": "label" }`; `resolved` defaults to true, pass false to reopen)
- `POST /api/v1/projects/{id}/reviews/resolve` — bulk-resolve Review items (JSON body `{ "ids": [...], "action": "label" }`), returns `{ resolved, notFound, count }`; the Review tab's Refresh button re-reads the result from disk
- `POST /api/v1/projects/{id}/search` — **hybrid** retrieval (keyword + vector) returning `mode`, `tokenHits`, `vectorHits`, per-result `vectorScore`
- `GET /api/v1/projects/{id}/graph` — wikilinks graph
- `POST /api/v1/projects/{id}/sources/rescan` — trigger a backend rescan

Enable the API, generate a token, and choose whether local unauthenticated access is allowed in **Settings → API + MCP**.

For MCP-compatible clients, LLM Wiki also includes a local MCP server in `mcp-server/`. After building it with `npm run mcp:build`, **Settings → API + MCP** shows a copyable MCP client configuration with the correct local path for your machine. The MCP tools call the same API surface, so agent clients can list projects, read files, export unresolved Review items, run hybrid search, inspect the graph, and trigger source rescans without custom HTTP glue code.

### Plug your AI agent in with one command

A ready-made **agent skill** for LLM Wiki lives in its own repo. Install it into Claude Code / Codex / any skills-compatible runtime:

```bash
npx skills add https://github.com/nashsu/llm_wiki_skill.git --skill llm_wiki_skill
```

After install, the agent can answer prompts like "what does my LLM Wiki say about X", "search my 知识库 for Y", "show the neighborhood of node Z in my wiki graph", and "rescan my wiki sources" by talking to your locally-running app — read-only by default, citing wiki page paths so you can verify in-app.

- **Skill repo**: <https://github.com/nashsu/llm_wiki_skill>
- **Trigger discipline**: it intentionally does **not** trigger on generic "search my notes" / "check my Obsidian / Notion / Logseq" — only when you explicitly name LLM Wiki / `my wiki` / `知识库`.

## Project Structure

```
my-wiki/
├── purpose.md              # Goals, key questions, research scope
├── schema.md               # Wiki structure rules, page types
├── raw/
│   ├── sources/            # Uploaded documents (immutable)
│   └── assets/             # Local images
├── wiki/
│   ├── index.md            # Content catalog
│   ├── log.md              # Operation history
│   ├── overview.md         # Global summary (auto-updated)
│   ├── entities/           # People, organizations, products
│   ├── concepts/           # Theories, methods, techniques
│   ├── sources/            # Source summaries
│   ├── queries/            # Saved chat answers + research
│   ├── synthesis/          # Cross-source analysis
│   └── comparisons/        # Side-by-side comparisons
├── .obsidian/              # Obsidian vault config (auto-generated)
└── .llm-wiki/              # App config, chat history, review items
```

## Star History

<a href="https://www.star-history.com/?repos=nashsu%2Fllm_wiki&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=nashsu/llm_wiki&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=nashsu/llm_wiki&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=nashsu/llm_wiki&type=date&legend=top-left" />
 </picture>
</a>

## License

This project is licensed under the **GNU General Public License v3.0** — see [LICENSE](LICENSE) for details.


## Related Pages

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
- [[PMP專案管理實務教材（長宏）]]
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
- [[🚀 API Mega List]]
- [[Fractal — the recursive language model CLI agent]]
- [[Hermes Agent 新增 /learn 指令：讓任何資料都能變成可重複使用的 AI 技能 - 電腦王阿達]]
- [[MCP Servers]]
- [[精選的 MCP 伺服器 [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)]]
- [[不得不裝的 AI 代理工具｜GitHub 萬星項目｜OPENCODE]]
- [[少子化時代：台灣缺的到底是人口，還是制度升級?]]
- [[「沒錢、沒資源、沒人脈，你要憑什麼贏？｜孫子兵法以少勝多九大心法｜越級打怪的底層邏輯｜孫武、老子、孔子同時告訴你｜孫子說」]]
- [[為什麼PDF還是這麼難用？其實是故意的]]
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

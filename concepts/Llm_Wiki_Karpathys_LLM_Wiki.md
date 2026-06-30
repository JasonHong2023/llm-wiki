---
title: Llm Wiki — Karpathy's LLM Wiki: build/query interlinked markdown KB | Hermes Agent
type: framework
created: 2026-06-30T19:11
updated: 2026-06-30T19:11
tags: [Python, 非同步, scripting, Markdown, English, 技術, programming, development]
confidence: high
---

# Llm Wiki — Karpathy's LLM Wiki: build/query interlinked markdown KB | Hermes Agent

# Llm Wiki

Karpathy's LLM Wiki: build/query interlinked markdown KB.

## Skill metadata

| Source | Bundled (installed by default) | 
| Path | `skills/research/llm-wiki` | 
| Version | `2.1.0` | 
| Author | Hermes Agent | 
| License | MIT | 
| Platforms | linux, macos, windows | 
| Tags | `wiki`,`knowledge-base`,`research`,`notes`,`markdown`,`rag-alternative` | 
| Related skills | `obsidian`,`arxiv` | 

## Reference: full SKILL.md

The following is the complete skill definition that Hermes loads when this skill is triggered. This is what the agent sees as instructions when the skill is active.

# Karpathy's LLM Wiki

Build and maintain a persistent, compounding knowledge base as interlinked markdown files. Based on Andrej Karpathy's LLM Wiki pattern.

Unlike traditional RAG (which rediscovers knowledge from scratch per query), the wiki compiles knowledge once and keeps it current. Cross-references are already there. Contradictions have already been flagged. Synthesis reflects everything ingested.

**Division of labor:** The human curates sources and directs analysis. The agent
summarizes, cross-references, files, and maintains consistency.

## When This Skill Activates

Use this skill when the user:

- Asks to create, build, or start a wiki or knowledge base
- Asks to ingest, add, or process a source into their wiki
- Asks a question and an existing wiki is present at the configured path
- Asks to lint, audit, or health-check their wiki
- References their wiki, knowledge base, or "notes" in a research context

## Wiki Location

**Location:** Set via `WIKI_PATH` environment variable (e.g. in `${HERMES_HOME:-~/.hermes}/.env`).

If unset, defaults to `~/wiki`.

```
WIKI="${WIKI_PATH:-$HOME/wiki}"
```
The wiki is just a directory of markdown files — open it in Obsidian, VS Code, or any editor. No database, no special tooling required.

## Architecture: Three Layers

```
wiki/
├── SCHEMA.md           # Conventions, structure rules, domain config
├── index.md            # Sectioned content catalog with one-line summaries
├── log.md              # Chronological action log (append-only, rotated yearly)
├── raw/                # Layer 1: Immutable source material
│   ├── articles/       # Web articles, clippings
│   ├── papers/         # PDFs, arxiv papers
│   ├── transcripts/    # Meeting notes, interviews
│   └── assets/         # Images, diagrams referenced by sources
├── entities/           # Layer 2: Entity pages (people, orgs, products, models)
├── concepts/           # Layer 2: Concept/topic pages
├── comparisons/        # Layer 2: Side-by-side analyses
└── queries/            # Layer 2: Filed query results worth keeping
```
**Layer 1 — Raw Sources:** Immutable. The agent reads but never modifies these.
**Layer 2 — The Wiki:** Agent-owned markdown files. Created, updated, and
cross-referenced by the agent.
**Layer 3 — The Schema:** `SCHEMA.md` defines structure, conventions, and tag taxonomy.

## Resuming an Existing Wiki (CRITICAL — do this every session)

When the user has an existing wiki, **always orient yourself before doing anything**:

① **Read  SCHEMA.md** — understand the domain, conventions, and tag taxonomy.
② 

**Read**— learn what pages exist and their summaries. ③

`index.md`**Scan recent**— read the last 20-30 entries to understand recent activity.

`log.md````
WIKI="${WIKI_PATH:-$HOME/wiki}"
# Orientation reads at session start
read_file "$WIKI/SCHEMA.md"
read_file "$WIKI/index.md"
read_file "$WIKI/log.md" offset=<last 30 lines>
```
Only after orientation should you ingest, query, or lint. This prevents:

- Creating duplicate pages for entities that already exist
- Missing cross-references to existing content
- Contradicting the schema's conventions
- Repeating work already logged

For large wikis (100+ pages), also run a quick `search_files` for the topic
at hand before creating anything new.

## Initializing a New Wiki

When the user asks to create or start a wiki:

- Determine the wiki path (from `$WIKI_PATH`env var, or ask the user; default`~/wiki`)
- Create the directory structure above
- Ask the user what domain the wiki covers — be specific
- Write `SCHEMA.md`customized to the domain (see template below)
- Write initial `index.md`with sectioned header
- Write initial `log.md`with creation entry
- Confirm the wiki is ready and suggest first sources to ingest

### SCHEMA.md Template

Adapt to the user's domain. The schema constrains agent behavior and ensures consistency:

```
# Wiki Schema
## Domain
[What this wiki covers — e.g., "AI/ML research", "personal health", "startup intelligence"]
## Conventions
- File names: lowercase, hyphens, no spaces (e.g., `transformer-architecture.md`)
- Every wiki page starts with YAML frontmatter (see below)
- Use `[[wikilinks]]` to link between pages (minimum 2 outbound links per page)
- When updating a page, always bump the `updated` date
- Every new page must be added to `index.md` under the correct section
- Every action must be appended to `log.md`
- **Provenance markers:** On pages that synthesize 3+ sources, append `^[raw/articles/source-file.md]`
  at the end of paragraphs whose claims come from a specific source. This lets a reader trace each
  claim back without re-reading the whole raw file. Optional on single-source pages where the
  `sources:` frontmatter is enough.
## Frontmatter
  ```yaml
  ---
  title: Page Title
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
  type: entity | concept | comparison | query | summary
  tags: [from taxonomy below]
  sources: [raw/articles/source-name.md]
  # Optional quality signals:
  confidence: high | medium | low        # how well-supported the claims are
  contested: true                        # set when the page has unresolved contradictions
  contradictions: [other-page-slug]      # pages this one conflicts with
  ---
```
`confidence` and `contested` are optional but recommended for opinion-heavy or fast-moving
topics. Lint surfaces `contested: true` and `confidence: low` pages for review so weak claims
don't silently harden into accepted wiki fact.

### raw/ Frontmatter

Raw sources ALSO get a small frontmatter block so re-ingests can detect drift:

```
---
source_url: https://example.com/article   # original URL, if applicable
ingested: YYYY-MM-DD
sha256: <hex digest of the raw content below the frontmatter>
---
```
The `sha256:` lets a future re-ingest of the same URL skip processing when content is unchanged,
and flag drift when it has changed. Compute over the body only (everything after the closing
`---`), not the frontmatter itself.

## Tag Taxonomy

[Define 10-20 top-level tags for the domain. Add new tags here BEFORE using them.]

Example for AI/ML:

- Models: model, architecture, benchmark, training
- People/Orgs: person, company, lab, open-source
- Techniques: optimization, fine-tuning, inference, alignment, data
- Meta: comparison, timeline, controversy, prediction

Rule: every tag on a page must appear in this taxonomy. If a new tag is needed, add it here first, then use it. This prevents tag sprawl.

## Page Thresholds

- **Create a page**when an entity/concept appears in 2+ sources OR is central to one source
- **Add to existing page**when a source mentions something already covered
- **DON'T create a page**for passing mentions, minor details, or things outside the domain
- **Split a page**when it exceeds ~200 lines — break into sub-topics with cross-links
- **Archive a page**when its content is fully superseded — move to- `_archive/`, remove from index

## Entity Pages

One page per notable entity. Include:

- Overview / what it is
- Key facts and dates
- Relationships to other entities ([[wikilinks]])
- Source references

## Concept Pages

One page per concept or topic. Include:

- Definition / explanation
- Current state of knowledge
- Open questions or debates
- Related concepts ([[wikilinks]])

## Comparison Pages

Side-by-side analyses. Include:

- What is being compared and why
- Dimensions of comparison (table format preferred)
- Verdict or synthesis
- Sources

## Update Policy

When new information conflicts with existing content:

- Check the dates — newer sources generally supersede older ones
- If genuinely contradictory, note both positions with dates and sources
- Mark the contradiction in frontmatter: `contradictions: [page-name]`
- Flag for user review in the lint report


### index.md Template


The index is sectioned by type. Each entry is one line: wikilink + summary.


```markdown

# Wiki Index


> Content catalog. Every wiki page listed under its type with a one-line summary.

> Read this first to find relevant pages for any query.

> Last updated: YYYY-MM-DD | Total pages: N


## Entities

<!-- Alphabetical within section -->


## Concepts


## Comparisons


## Queries

**Scaling rule:** When any section exceeds 50 entries, split it into sub-sections
by first letter or sub-domain. When the index exceeds 200 entries total, create
a `_meta/topic-map.md` that groups pages by theme for faster navigation.

### log.md Template

```
# Wiki Log
> Chronological record of all wiki actions. Append-only.
> Format: `## [YYYY-MM-DD] action | subject`
> Actions: ingest, update, query, lint, create, archive, delete
> When this file exceeds 500 entries, rotate: rename to log-YYYY.md, start fresh.
## [YYYY-MM-DD] create | Wiki initialized
- Domain: [domain]
- Structure created with SCHEMA.md, index.md, log.md
```
## Core Operations

### 1. Ingest

When the user provides a source (URL, file, paste), integrate it into the wiki:

① **Capture the raw source:**

- URL → use `web_extract`to get markdown, save to`raw/articles/`
- PDF → use `web_extract`(handles PDFs), save to`raw/papers/`
- Pasted text → save to appropriate `raw/`subdirectory
- Name the file descriptively: `raw/articles/karpathy-llm-wiki-2026.md`
- **Add raw frontmatter**(- `source_url`,- `ingested`,- `sha256`of the body). On re-ingest of the same URL: recompute the sha256, compare to the stored value — skip if identical, flag drift and update if different. This is cheap enough to do on every re-ingest and catches silent source changes.

② **Discuss takeaways** with the user — what's interesting, what matters for
the domain. (Skip this in automated/cron contexts — proceed directly.)

③ **Check what already exists** — search index.md and use `search_files` to find
existing pages for mentioned entities/concepts. This is the difference between
a growing wiki and a pile of duplicates.

④ **Write or update wiki pages:**

- **New entities/concepts:**Create pages only if they meet the Page Thresholds in SCHEMA.md (2+ source mentions, or central to one source)
- **Existing pages:**Add new information, update facts, bump- `updated`date. When new info contradicts existing content, follow the Update Policy.
- **Cross-reference:**Every new or updated page must link to at least 2 other pages via- `[[wikilinks]]`. Check that existing pages link back.
- **Tags:**Only use tags from the taxonomy in SCHEMA.md
- **Provenance:**On pages synthesizing 3+ sources, append- `^[raw/articles/source.md]`markers to paragraphs whose claims trace to a specific source.
- **Confidence:**For opinion-heavy, fast-moving, or single-source claims, set- `confidence: medium`or- `low`in frontmatter. Don't mark- `high`unless the claim is well-supported across multiple sources.

⑤ **Update navigation:**

- Add new pages to `index.md`under the correct section, alphabetically
- Update the "Total pages" count and "Last updated" date in index header
- Append to `log.md`:`## [YYYY-MM-DD] ingest | Source Title`
- List every file created or updated in the log entry

⑥ **Report what changed** — list every file created or updated to the user.

A single source can trigger updates across 5-15 wiki pages. This is normal and desired — it's the compounding effect.

### 2. Query

When the user asks a question about the wiki's domain:

① **Read  index.md** to identify relevant pages.
② 

**For wikis with 100+ pages**, also

`search_files` across all `.md` files
for key terms — the index alone may miss relevant content.
③ **Read the relevant pages**using

`read_file`.
④ **Synthesize an answer**from the compiled knowledge. Cite the wiki pages you drew from: "Based on [[page-a]] and [[page-b]]..." ⑤

**File valuable answers back**— if the answer is a substantial comparison, deep dive, or novel synthesis, create a page in

`queries/` or `comparisons/`.
Don't file trivial lookups — only answers that would be painful to re-derive.
⑥ **Update log.md**with the query and whether it was filed.

### 3. Lint

When the user asks to lint, health-check, or audit the wiki:

① **Orphan pages:** Find pages with no inbound `[[wikilinks]]` from other pages.

```
# Use execute_code for this — programmatic scan across all wiki pages
import os, re
from collections import defaultdict
wiki = "<WIKI_PATH>"
# Scan all .md files in entities/, concepts/, comparisons/, queries/
# Extract all [[wikilinks]] — build inbound link map
# Pages with zero inbound links are orphans
```
② **Broken wikilinks:** Find `[[links]]` that point to pages that don't exist.

③ **Index completeness:** Every wiki page should appear in `index.md`. Compare
the filesystem against index entries.

④ **Frontmatter validation:** Every wiki page must have all required fields
(title, created, updated, type, tags, sources). Tags must be in the taxonomy.

⑤ **Stale content:** Pages whose `updated` date is >90 days older than the most
recent source that mentions the same entities.

⑥ **Contradictions:** Pages on the same topic with conflicting claims. Look for
pages that share tags/entities but state different facts. Surface all pages
with `contested: true` or `contradictions:` frontmatter for user review.

⑦ **Quality signals:** List pages with `confidence: low` and any page that cites
only a single source but has no confidence field set — these are candidates
for either finding corroboration or demoting to `confidence: medium`.

⑧ **Source drift:** For each file in `raw/` with a `sha256:` frontmatter, recompute
the hash and flag mismatches. Mismatches indicate the raw file was edited
(shouldn't happen — raw/ is immutable) or ingested from a URL that has since
changed. Not a hard error, but worth reporting.

⑨ **Page size:** Flag pages over 200 lines — candidates for splitting.

⑩ **Tag audit:** List all tags in use, flag any not in the SCHEMA.md taxonomy.

⑪ **Log rotation:** If log.md exceeds 500 entries, rotate it.

⑫ **Report findings** with specific file paths and suggested actions, grouped by
severity (broken links > orphans > source drift > contested pages > stale content > style issues).

⑬ **Append to log.md:** `## [YYYY-MM-DD] lint | N issues found`

## Working with the Wiki

### Searching

```
# Find pages by content
search_files "transformer" path="$WIKI" file_glob="*.md"
# Find pages by filename
search_files "*.md" target="files" path="$WIKI"
# Find pages by tag
search_files "tags:.*alignment" path="$WIKI" file_glob="*.md"
# Recent activity
read_file "$WIKI/log.md" offset=<last 20 lines>
```
### Bulk Ingest

When ingesting multiple sources at once, batch the updates:

- Read all sources first
- Identify all entities and concepts across all sources
- Check existing pages for all of them (one search pass, not N)
- Create/update pages in one pass (avoids redundant updates)
- Update index.md once at the end
- Write a single log entry covering the batch

### Archiving

When content is fully superseded or the domain scope changes:

- Create `_archive/`directory if it doesn't exist
- Move the page to `_archive/`with its original path (e.g.,`_archive/entities/old-page.md`)
- Remove from `index.md`
- Update any pages that linked to it — replace wikilink with plain text + "(archived)"
- Log the archive action

### Obsidian Integration

The wiki directory works as an Obsidian vault out of the box:

- `[[wikilinks]]`render as clickable links
- Graph View visualizes the knowledge network
- YAML frontmatter powers Dataview queries
- The `raw/assets/`folder holds images referenced via`![[image.png]]`

For best results:

- Set Obsidian's attachment folder to `raw/assets/`
- Enable "Wikilinks" in Obsidian settings (usually on by default)
- Install Dataview plugin for queries like `TABLE tags FROM "entities" WHERE contains(tags, "company")`

If using the Obsidian skill alongside this one, set `OBSIDIAN_VAULT_PATH` to the
same directory as the wiki path.

### Obsidian Headless (servers and headless machines)

On machines without a display, use `obsidian-headless` instead of the desktop app.
It syncs vaults via Obsidian Sync without a GUI — perfect for agents running on
servers that write to the wiki while Obsidian desktop reads it on another device.

**Setup:**

```
# Requires Node.js 22+
npm install -g obsidian-headless
# Login (requires Obsidian account with Sync subscription)
ob login --email <email> --password '<password>'
# Create a remote vault for the wiki
ob sync-create-remote --name "LLM Wiki"
# Connect the wiki directory to the vault
cd ~/wiki
ob sync-setup --vault "<vault-id>"
# Initial sync
ob sync
# Continuous sync (foreground — use systemd for background)
ob sync --continuous
```
**Continuous background sync via systemd:**

```
# ~/.config/systemd/user/obsidian-wiki-sync.service
[Unit]
Description=Obsidian LLM Wiki Sync
After=network-online.target
Wants=network-online.target
[Service]
ExecStart=/path/to/ob sync --continuous
WorkingDirectory=/home/user/wiki
Restart=on-failure
RestartSec=10
[Install]
WantedBy=default.target
```
```
systemctl --user daemon-reload
systemctl --user enable --now obsidian-wiki-sync
# Enable linger so sync survives logout:
sudo loginctl enable-linger $USER
```
This lets the agent write to `~/wiki` on a server while you browse the same
vault in Obsidian on your laptop/phone — changes appear within seconds.

## Pitfalls

- **Never modify files in**— sources are immutable. Corrections go in wiki pages.- `raw/`
- **Always orient first**— read SCHEMA + index + recent log before any operation in a new session. Skipping this causes duplicates and missed cross-references.
- **Always update index.md and log.md**— skipping this makes the wiki degrade. These are the navigational backbone.
- **Don't create pages for passing mentions**— follow the Page Thresholds in SCHEMA.md. A name appearing once in a footnote doesn't warrant an entity page.
- **Don't create pages without cross-references**— isolated pages are invisible. Every page must link to at least 2 other pages.
- **Frontmatter is required**— it enables search, filtering, and staleness detection.
- **Tags must come from the taxonomy**— freeform tags decay into noise. Add new tags to SCHEMA.md first, then use them.
- **Keep pages scannable**— a wiki page should be readable in 30 seconds. Split pages over 200 lines. Move detailed analysis to dedicated deep-dive pages.
- **Ask before mass-updating**— if an ingest would touch 10+ existing pages, confirm the scope with the user first.
- **Rotate the log**— when log.md exceeds 500 entries, rename it- `log-YYYY.md`and start fresh. The agent should check log size during lint.
- **Handle contradictions explicitly**— don't silently overwrite. Note both claims with dates, mark in frontmatter, flag for user review.

## Related Tools

llm-wiki-compiler is a Node.js CLI that compiles sources into a concept wiki with the same Karpathy inspiration. It's Obsidian-compatible, so users who want a scheduled/CLI-driven compile pipeline can point it at the same vault this skill maintains. Trade-offs: it owns page generation (replaces the agent's judgment on page creation) and is tuned for small corpora. Use this skill when you want agent-in-the-loop curation; use llmwiki when you want batch compile of a source directory.

## Related Pages

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
- [[🚀 API Mega List]]
- [[Fractal — the recursive language model CLI agent]]
- [[Hermes Agent 新增 /learn 指令：讓任何資料都能變成可重複使用的 AI 技能 - 電腦王阿達]]
- [[MCP Servers]]
- [[精選的 MCP 伺服器 [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)]]
- [[不得不裝的 AI 代理工具｜GitHub 萬星項目｜OPENCODE]]
- [[少子化時代：台灣缺的到底是人口，還是制度升級?]]
- [[「沒錢、沒資源、沒人脈，你要憑什麼贏？｜孫子兵法以少勝多九大心法｜越級打怪的底層邏輯｜孫武、老子、孔子同時告訴你｜孫子說」]]
- [[為什麼PDF還是這麼難用？其實是故意的]]

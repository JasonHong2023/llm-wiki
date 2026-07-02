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

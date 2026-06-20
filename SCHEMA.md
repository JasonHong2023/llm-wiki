# Wiki Schema

## Domain
AI應用 — 團體專案知識庫，涵蓋 AI 產品、工具、應用場景、框架、部署方案、案例分析。

## Conventions
- File names: lowercase, hyphens, no spaces (e.g., `ai-chatbot-comparison.md`)
- Every wiki page starts with YAML frontmatter (see below)
- Use `[[wikilinks]]` to link between pages (minimum 2 outbound links per page)
- When updating a page, always bump the `updated` date
- Every new page must be added to `index.md` under the correct section
- Every action must be appended to `log.md`
- **Provenance markers:** On pages that synthesize 3+ sources, append `^[raw/articles/source-file.md]`
  at the end of paragraphs whose claims come from a specific source.

## Frontmatter
```yaml
---
title: Page Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: entity | concept | comparison | query | summary
tags: [from taxonomy below]
sources: [raw/articles/source-name.md]
confidence: high | medium | low
contested: true
contradictions: [other-page-slug]
---
```

### raw/ Frontmatter
```yaml
---
source_url: https://example.com/article
ingested: YYYY-MM-DD
sha256: <hex digest>
---
```

## Tag Taxonomy
- **Products/Tools:** chatbot, rag, agent, llm, vision, speech, embedding, vector-db
- **Platforms:** cloud, edge, mobile, web, api, saas, open-source
- **Techniques:** fine-tuning, prompt-engineering, training, inference, retrieval, evaluation
- **Domains:** customer-service, content-gen, code-assist, analytics, automation, education, healthcare
- **Meta:** comparison, case-study, tutorial, benchmark, architecture, best-practice

## Page Thresholds
- **Create a page** when an entity/concept appears in 2+ sources OR is central to one source
- **Add to existing page** when a source mentions something already covered
- **DON'T create a page** for passing mentions or minor details
- **Split a page** when it exceeds ~200 lines
- **Archive a page** when its content is fully superseded

## Entity Pages
One page per AI product, tool, platform, or organization.

## Concept Pages
One page per technique, pattern, or architecture.

## Comparison Pages
Side-by-side analysis of tools, platforms, or approaches.

## Update Policy
When new information conflicts with existing content:
1. Check the dates — newer sources generally supersede older ones
2. If genuinely contradictory, note both positions with dates and sources
3. Mark the contradiction in frontmatter: `contradictions: [page-name]`
4. Flag for user review in the lint report

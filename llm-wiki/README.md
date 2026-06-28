# Hermes LLM-Wiki Plugin

LLM-powered wiki with URL import, YouTube/GitHub content, tag management, knowledge graph, and GitHub sync backup.

## Installation

```bash
# Copy plugin to Hermes plugins directory
cp -r llm-wiki ~/.hermes/hermes-agent/plugins/

# Restart Hermes dashboard
hermes dashboard
```

## Features

- **URL Import** — Import web articles, YouTube videos, GitHub repos
- **File Upload** — Upload .md, .txt, .html, .pdf files
- **Batch Import** — Import multiple URLs at once
- **Tag Management** — Browse and manage wiki tags
- **Knowledge Graph** — 2D/3D force-directed graph of wiki connections
- **GitHub Sync** — Backup and restore wiki to/from GitHub

## Configuration

Set `WIKI_PATH` environment variable to your wiki directory (default: `~/wiki`).

For GitHub sync, configure in the GitHub tab after installing.

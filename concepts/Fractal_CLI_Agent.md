---
title: Fractal — the recursive language model CLI agent
type: framework
created: 2026-06-27T23:33
updated: 2026-06-27T23:33
tags: [Markdown, English, 技術, programming, development, Docker, container]
confidence: high
---

# Fractal — the recursive language model CLI agent

the recursive language model cli agent

by
          A terminal agent that **is** an RLM. Powered by
          **predict-rlm**
          — our self-harnessed Recursive Language Model runtime.
        

`$ curl -LsSf https://fractal.trampoline.ai/install.sh | sh`
          
        how it works

          Most agents call a model in a loop. Fractal's loop *is* the model —
          predict-rlm recurses, spawning sub-LMs to work the shards of a task that won't
          fit one context, then folds their results back up. Fractal is a thin UI on top,
          adding session memory so you can hold a conversation across turns. It's probably
          the easiest way to get started with an RLM, and to actually understand how one
          works — by experimenting on your own tasks.
        

where it shines

Reasoning across a big or deep codebase, synthesizing across many files, audits, investigation — anything where the context is the hard part.

              Use it directly in your terminal, or have your main agent hand the heavy
              lifting to it in headless mode with `fractal -p "…"`. We ship a
              skill that teaches agents when and how to reach for it.
            

what you get

Recursive and self-harnessed. The runtime is the agent — no orchestration to assemble.

OpenAI, Anthropic, Gemini, Groq, Ollama, OpenRouter, or any OpenAI-compatible endpoint.

Every turn runs in an isolated Docker sandbox. Point it at real work without flinching.

Drive it from CI or another agent with `fractal -p`.

go deeper

The recursive, self-harnessed RLM runtime that powers Fractal.

→ The RLM paperRecursive Language Models, from MIT CSAIL.

→ DiscordBuild with us. It's early — we'd genuinely love contributions.

Fractal is a fully open-source proof of concept we're putting out to see what people build with it. It's early, and moving fast.

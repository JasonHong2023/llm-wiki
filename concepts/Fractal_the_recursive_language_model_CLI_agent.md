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

## Related Pages

- [[Hermes Agent 新增 /learn 指令：讓任何資料都能變成可重複使用的 AI 技能 - 電腦王阿達]]
- [[不得不裝的 AI 代理工具｜GitHub 萬星項目｜OPENCODE]]
- [[沒錢沒資源沒人脈你要憑什麼贏孫子兵法以少勝多九大心法越級打怪的底層邏輯孫武老子孔子同時告訴你孫子說]]
- [[為什麼PDF還是這麼難用其實是故意的]]
- [[少子化時代台灣缺的到底是人口還是制度升級]]
- [[MCP_Servers]]
- [[README-zh_TW]]
- [[代码搜索省92_Token拆解_Headroom_的上下文优化真相]]
- [[零成本无限_TokenHermes_Qwen36本地最强_Agent_组合来了附部署教程_零度解说]]
- [[三小時吃透易經從職場困境到人生破局的底層邏輯全揭秘]]
- [[World_Monitor_By_the_time_its_news_you_already_knew]]
- [[用AI生成器解鎖知識圖譜Knowledge_Graphs輕鬆搭建知識體系]]
- [[知識圖譜_維基百科自由的百科全書]]
- [[知識圖譜概論上]]
- [[中華電信研究院科技新知]]
- [[長文本為什麼容易漏掉中段GraphRAG知識圖譜與長文本處理_iPAS_AI_應用規劃師中級_L21103]]
- [[AI知识图谱_GraphRAG_是怎么回事]]
- [[企業知識圖]]
- [[知識圖譜_Knowledge_Graph_KG]]
- [[專案管理怎麼規劃管理專案圖解專案管理５步驟與工具經理人]]
- [[專案管理_維基百科自由的百科全書]]
- [[為何需要專案管理]]
- [[新手_PM_懶人包專案經理Project_Manager在做什麼要考證照嗎7_大_PM_問題幫你解_專案管理生活思維]]

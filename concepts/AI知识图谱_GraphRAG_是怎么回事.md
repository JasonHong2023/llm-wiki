---
title: AI知识图谱 GraphRAG 是怎么回事？
type: concept
created: 2026-06-28T00:21
updated: 2026-06-28T00:21
tags: [Markdown, 中文, English, 技術, programming, development, 資料庫, database, source:youtube]
confidence: high
---

# AI知识图谱 GraphRAG 是怎么回事？

> **Source:** [https://www.youtube.com/watch?v=WoU7XxDafbA](https://www.youtube.com/watch?v=WoU7XxDafbA)

## Video Info

| Field | Value |
|-------|-------|
| Title | AI知识图谱 GraphRAG 是怎么回事？ |
| Channel | 程序员老王 |
| Duration | 14m 11s |
| Views | 25.8K |
| Published | 2025-06-26 |

## Description

RAG原理：https://www.youtube.com/watch?v=qMc0v2OUK3s
RAG代码：https://www.youtube.com/watch?v=329G_4vJveU

时间轴
00:00:00 RAG的问题
00:02:01 知识图谱
00:06:08 合并
00:07:58 简化
00:09:49 查询
00:13:09 最后说两句

## Transcript (English)

*≈2482 words, fetched from YouTube captions*

In traditional RAG, we first split the article into chunks of text. Then, we convert each chunk into a vector through embedding and store it in a vector database. For those who are not familiar with traditional RAG, you can refer to these two videos. They explain the principles and code implementation respectively, telling you everything about RAG. I will put the links in the video description. Here, let's take a simple example. If we chunk by sentence and store it in the vector database, then when a user asks what Wang likes to eat, the system can easily find "Wang likes to eat watermelon" and "Wang also likes to eat peaches" because their topics are highly relevant. But if you ask in this article how many times watermelon was mentioned, that would be a bit tricky. Although "watermelon" appears in many sentences, it is scattered across different fragments. No single sentence can answer this question alone. So RAG is likely to retrieve incorrectly or miss some information. Why does this happen? Let's look at the first sentence. "Wang likes to eat watermelon." This contains three layers of information: "Wang," "likes to eat," and "watermelon." In traditional RAG, we calculate relevance based on the entire passage. If the question is just "how many times is watermelon mentioned in the article," then it has nothing to do with "Wang" and "likes to eat." Therefore, the overall relevance is not high enough. So when querying, it's possible to miss "Wang likes to eat watermelon." This is the first problem with traditional RAG. The match between a global question and a local fragment is too low. So you might think, "Then I'll just cut the fragments even smaller," for example, by word. This way, every "watermelon" will be a hit. This can certainly solve the problem of counting watermelons. But on the other hand, if we ask another question, "What does Wang like to eat?" RAG can't handle it anymore. Because the relationships between the information have been broken. So here comes the contradiction. If you cut it too large, you'll easily miss details. But if you cut it too small, you'll easily lose the semantic connections. This contradiction is one of the root causes of the inaccuracy of traditional RAG. So is there a way to not miss details and still retain the semantic structure? There actually is. That is the Knowledge Graph. GraphRAG uses a knowledge graph to solve the problems of traditional RAG. Let's take our previous example. "Wang loves to eat watermelon." If we convert it into the form of a knowledge graph, it looks like this. Here, "Wang" and "watermelon" are called Entities. The edge between them is a relationship, called a Relationship. These relationships are not just lines. You can also add attributes. For example, "loves to eat." Entities can also have attributes. For example, Wang is a person. Watermelon is a fruit. This graph structure that has both entities and relationships, and can also have attributes, is called an LPG, which stands for Labeled Property Graph. Here, let's first focus on how GraphRAG builds this knowledge graph. Then we'll worry about how to query it. Before large language models appeared, building a knowledge graph was a very, very complex process. The algorithms were obscure, and the results were not very good. We won't go into detail here. But now, the emergence of large models has greatly simplified this process. For example, the prompt for generating a knowledge graph in GraphRAG looks like this. It's a bit long. Let's use a simplified version to demonstrate the idea. Suppose we want to generate an LPG from the sentence "Wang loves to eat watermelon." generate an LPG. We can write the prompt like this: "Goal: Generate an LPG for 'Wang likes to eat watermelon'." Then we give the core process. First is to identify entities, which are "Wang" and "watermelon" in this sentence. We can write it like this: Step 1: Identify entity types, including person, object, and taste. Here, the entity types need to be manually set by us based on the text content. The default entity types used in GraphRAG include organization, person, location, and event. The second step is to identify the relationships between the entities. Both of these steps have formal names in technical terms. The first step is called Named Entity Recognition. The second step is called Relation Extraction. In the past, both of these tasks had very complex models and algorithms. Now, we can get it done with just one prompt. Then we define the output format. For example, entities and types are separated by a colon, and relationships between entities are indicated by arrows, and so on. In addition, GraphRAG will ask the large model to generate a brief text description for each entity and relationship. Then GraphRAG will take this large pile of prompts and send it all to the large language model. If the AI model is smart enough, the AI will return a format like this according to the requirements. It will identify Wang and watermelon as two entities, and a relationship that Wang loves to eat watermelon. Note that all this content is automatically generated by AI. It may not be exactly the same as the original text. The AI might even make up stories. So we usually have to add a warning to the prompt, telling the AI not to fabricate information. Just like that, GraphRAG parses the structured text returned by the AI. It's like a joke. "Wang loves to eat melon." The knowledge graph for this sentence is parsed out. Doesn't that sound a bit unreliable? But surprisingly, the effect is actually quite good. Because the knowledge graph itself is a very old concept. Long before large models, it has been frequently used in many public corpora. It turns out that large models are still very good at processing it. In GraphRAG, there is a particularly interesting little design here. Each time the AI finishes generating a knowledge graph, GraphRAG will take this knowledge graph and send it to the AI again along with the original text. Asking it, "Did you miss anything?" "Do you want to add anything else?" If the AI says yes, then it adds another round. Then ask again and add again. This process will loop continuously until the AI admits it itself, "I have nothing more to add." Now the programmers have finally found an object they can bully too. This process of repeated questioning and extracting information has a specific term called Data Gleaning. I haven't found a Chinese translation for it yet. Let's just call it "large model PUA" for now. So GraphRAG will for each paragraph of text in the article generate such a knowledge graph separately. We've already talked about "Wang likes to eat melons." The next two sentences are actually quite similar. Let's pay attention here. The last sentence. The taste "sweet" in it is also identified as an entity. This is because "taste" in our prompt is defined as an entity. After all the fragments have been processed, GraphRAG will automatically merge entities with the same name. For example, merging all the "Wang"s, merging all the "watermelon"s, and so on. Finally, it will piece together a complete article-level knowledge graph. This process does not require AI participation. It is done automatically by the program. But during the merging process, the descriptive information originally scattered in different nodes or edges will also be integrated together. Our example is relatively simple. Only the descriptive information of the nodes has been merged. But in actual use, the description of the edge will also be included in the merge. Then, at this time, GraphRAG will take each merged descriptive information and give it to the large language model. Please generate a more complete based on these descriptions, a more fluent summary description. And use it as the final description after merging. This way, what we finally get is not only a structurally clear graph, but also a natural language description organized by AI. There is a detail worth mentioning. GraphRAG has been maintaining the correspondence between the knowledge graph and the original text. For example, the entity "Wang" in the graph, GraphRAG knows which paragraphs of the original text this information was generated from. The reverse is also true. Give it a paragraph of original text, it can also tell you which entities and relationships this sentence corresponds to in the knowledge graph. This will be used in the query later. Now we have the knowledge graph corresponding to the article. But if the article is very long, this graph will become very large and complex. Querying it is actually not that convenient. So GraphRAG did one more step of processing. It will use a method called Leiden community detection to merge nodes with dense edges in the graph into a whole. Please study the specific algorithm yourself. Here we only look at the results. But our graph is really too simple, so here we can only give a rough idea. If the four nodes on the left have many edges between them, they can be combined into a whole. And the "taste" on the right can be a separate whole. Then, just like merging entities with the same name before, GraphRAG will let the AI use the information from each subgraph's node and edge description information to generate a more advanced summary description. For example, if we take the descriptions of all the nodes and edges in the left subgraph, AI can summarize that Wang loves to eat melons and peaches. Xiao Wang loves to eat melons. And this summarizing process is not just a simple abstraction of information. It can often infer additional information. For example, Xiao Wang only likes to eat melons. Combined with Wang's love for melons and peaches, it can be inferred that Xiao Wang does not like to eat peaches. This sentence never appeared in the original text. This is where the knowledge graph surpasses simple text matching and truly begins to understand and think. This way, we get a simplified knowledge graph. Each node represents a local information block in the original graph. If this graph is not simple enough, then continue to repeat this process. Merge again, summarize again. Abstract further up. Layer by layer upwards, eventually forming a hierarchical structure of a knowledge graph. The higher up in this structure, the more abstract and refined the information becomes. The further down, the closer to the original text and the more specific the details. Alright, now we have this knowledge-rich, well-structured knowledge graph. The final step is to turn it into a quickly searchable index library. This brings us back to our familiar operation, embedding. We take each node in the knowledge graph, the entity information and summary description of each edge, and treat them all as a text fragment for embedding. Then store them in a vector database. In addition, each slice from the original text at the beginning is also stored in the vector database. This is the final form of the knowledge graph. Actually, the subsequent query becomes very simple. Just like a regular RAG, we take the user's question, for example, "What does Wang like to eat?" do an embedding to also convert it into a vector. Then we can use it to match against the original text or the embedding of the knowledge graph. to perform matching. Matching is very flexible. We can query only a certain layer of the knowledge graph, or a few layers, or we can query only the original text. We can even query everything. There are no fixed rules for this process. For example, in GraphRAG, it provides a strategy called "local search." It will first start from the bottom layer of the knowledge graph to find the entity that is closest to the question. Remember we mentioned earlier that GraphRAG maintains the mapping relationship between the graph and the original text? Once a relevant graph point is found, GraphRAG can reverse-lookup which original text these points and edges were generated from. And these points and edges, which upper-level graph structures do they appear in? What are their neighboring points and edges? As for the "Covariate" at the bottom, it's equivalent to a textual summary of the original text snippet. It's an experimental feature. I personally think it's a bit redundant. Friends who are interested can read the extract_covariates and claim_extractor files. Then GraphRAG will take all the found summary descriptions of these points and edges, and their associated original text snippets, plus the user's question, "What does Wang like to eat?" and package them all together to send to the AI large model. This way, whether you're asking a high-level abstract question or a detailed question about a specific passage of the original text, the relevant information will be brought along. Because local search starts from the bottom level of the graph, so it's particularly good at handling detail-rich, precisely located questions. This is also why it's called local search. GraphRAG also has another query strategy called global search. Contrary to local search, global search starts from the higher levels of the graph. and then traces down layer by layer. So its advantage is that it is more suitable than local search for answering questions that are a bit more abstract and have a stronger global nature. For example, "What is the core idea of this article?" In short, this is the overall architecture of GraphRAG. From building the knowledge graph, to summarizing descriptions, almost every step is inseparable from the participation of large language models. It does sound a bit unreliable. But according to the experimental data in Microsoft's paper, the results are actually quite good. So it's not hard to understand why everyone is complaining that GraphRAG is too token-intensive. Because it is essentially a kind of design that allows large language models to permeate the entire process. You can say it's extravagant and burns money, but you can't say it's not serious. The process of GraphRAG is actually very similar to our learning journey. Initially, our minds are filled with scattered knowledge points and isolated notes, just like those unorganized text fragments. With continuous accumulation and thinking, those points slowly form lines, and eventually weave a web in our minds, our own knowledge graph. And our perspective in this process is raised bit by bit. But I think the most wonderful part is that in this process, we can even discover some connections that didn't exist before. Just like me sharing GraphRAG now, and you quietly listening in front of the screen. Although we have never met, but because of a sense of curiosity, a tacit understanding arises in our hearts. Perhaps this is the romance that belongs to knowledge seekers. I'm programmer Wang. See you next time.

![Video Thumbnail](https://i.ytimg.com/vi/WoU7XxDafbA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDvTMNAzpxlf-f66LBNCHZchzoS0A)


## Related Pages

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
- [[企業知識圖]]
- [[知識圖譜_Knowledge_Graph_KG]]
- [[專案管理怎麼規劃管理專案圖解專案管理５步驟與工具經理人]]
- [[專案管理_維基百科自由的百科全書]]
- [[為何需要專案管理]]
- [[新手_PM_懶人包專案經理Project_Manager在做什麼要考證照嗎7_大_PM_問題幫你解_專案管理生活思維]]
- [[知識圖譜分析方法論_Uedu_優學院]]
- [[知識圖譜概論下]]
- [[知識圖譜讓_AI_理解事物之間的關係]]
- [[知識圖譜Knowledge_Graph的定義為何_OOSGA]]
- [[知识图谱深入浅出讲解知识图谱技术构建应用_CSDN博客]]
- [[什麼是知識圖譜AI_能不能進工廠的關鍵_製造新觀點]]
- [[awesome-knowledge-graph]]
- [[Google知識圖譜_維基百科自由的百科全書]]
- [[什麼是專案管理其優勢是什麼_2025_Asana]]
- [[專案管理是什麼一文掌握專案管理五大流程高效專案管理工具]]
- [[Zenkit_Projects_Tips_l_六個最常見的專案管理問題]]
- [[輝達市值上10兆ChatGPT預測這時達成]]
- [[電子檔案格式轉置(SmallPdf.com)]]
- [[1764]]
- [[三國史話]]
- [[品三國]]
- [[諸葛孔明]]
- [[戰國日本]]
- [[戰國日本Ⅱ敗者的美學]]
- [[孫子兵法]]
- [[中醫醫理與道家易經]]
- [[squad]]
- [[專案經理6種常見專案管理文件專案計畫書工作時程表需求規_專案人力資源管理學習104學習]]
- [[專案問題多又多範疇過大規格不清怎麼辦_專案管理生活思維]]
- [[天下雜誌出版_專案為何這麼難管破解三大痛點讓你的專案高效完成精準達標]]
- [[12_個專案經理面試問題以及如何回答_Soft_Share]]
- [[第12章_專案溝通管理]]
- [[專案規劃_六大致命問題與解法_ProjectClub_專案管理輕鬆學_職場菁英培育基地]]
- [[新手專案管理必修課定義問題與流程技巧完全拆解]]
- [[PM是什麼想知道適不適合當PM先問自己3個問題_應徵技巧分享面試經驗暨工作甘苦談_1111人力銀行]]
- [[專案管理為什麼14_個專案新手的常見問題]]
- [[這些10個問題專案管理員需要在開始新的專案之前提問]]
- [[專案管理書摘關於利害關係人管理_集體開會只會讓你的產品走向平庸_專案管理生活思維]]
- [[超級專案管理讀後心得看懂專案三個失敗與成功的關鍵]]
- [[120521006]]
- [[Microsoft_PowerPoint_010_ProjectManagementPracticeCourse_相容模式]]
- [[PM必學Google_AI_NotebookLM保姆級教學會議紀錄週報培訓3大場景全自動化高手都在用這招附完整Promp]]
- [[職場筆記會議記錄反省日記如何避免寫過就忘_專案管理生活思維]]
- [[每天開會開到心累新手PM必學的高效率會議方法]]
- [[會議記錄不只是紀錄_重現會議現場的魔法]]
- [[如何做會議紀錄2026_新手也能快速上手的會議記錄完整指南_元筆記]]
- [[如何有效率開會]]
- [[一鍵生成會議記錄週報與追蹤計畫PM_的超強效率活絡加倍術_TechLines_科技線]]
- [[用會議記錄從菜鳥變成局內人PM_筆記]]
- [[如何讓會議開的更有效率_專案經理雜誌]]
- [[讓領導有節奏用_Scrum_改變行銷團隊的協作節奏_專案經理雜誌]]
- [[專案經理人與AI共舞的數位轉型生存指南_專案經理雜誌]]
- [[展望2025AI引領專案_管理者創造職場新高峰_專案經理雜誌]]
- [[JavaScript_is_disabled]]
- [[會議記錄與摘要_ClaudeWorld]]
- [[未來_2_年一半的PM_將被淘汰寓意科技執行長比寫_PRD_更值錢的是場景想像力經理人]]
- [[Gemini教學AI自動生成會議紀錄比手寫快100倍的高效筆記法_職場AI培訓_客服中心委外服務外包_程曦資訊]]
- [[開會的能力決定你職位的高低]]
- [[開會總是沒效率讓主管愛上你的10個高效會議技巧]]
- [[CC字幕_AI_工作流開會還在手打紀錄工程師的零手打會議系統iPhone_NotebookLM_實戰附_SOP]]
- [[取消_PM是個餿主意當實作不再昂貴PM_該如何練就挑選的品味經理人]]
- [[告別會議筆記困境Google_NotebookLM_高效會議記錄完全指南AI協作_雅婷逐字稿實戰教學讓你的筆記精準又省]]
- [[AI_會議紀錄_文書處理會議摘要公文撰寫SOP_自動化_Mason_AI_Lab]]
- [[天文學家發現宇宙最蓬鬆行星_堪比棉花糖_太陽系外天體_木星_行星演化_新唐人电视台]]
- [[會議記錄怎麼做會議記錄完全指南從入門到精通的實用技巧與範本]]
- [[會議記錄整理模板_TryAI_政府AI應用實驗站]]
- [[整理會議紀錄超痛苦5招NotebookLMAI筆記轉化術中英夾雜專有名詞也能精準轉譯]]
- [[5個寫會議記錄Meeting_minutes貼士附範例]]
- [[專案經理_PM_的_AI_實戰指南PRD風險分析會議管理全攻略_Mason_AI_Lab]]
- [[llm-wiki]]
- [[AI大神教你改善工作流用LLM_Wiki打造知識複利天下雜誌]]
- [[Karpathy_LLM_Wiki_知識系統實踐基礎安裝與建置篇_Kenmingの鮮思維]]
- [[Claude_Code整理Obsidian筆記Karpathy公開LLM知識庫系統貼一段指令就能建起來]]
- [[Andrej_Karpathys_LLM_Wiki_Create_your_own_knowledge_base]]
- [[llm-wiki_1]]
- [[Karpathy_LLM_Wiki_是什麼一個卡片盒筆記法使用者的實測_WenHao_Yu]]
- [[Karpathy_的_LLM_Wiki_缺少了什麼以及如何修正]]
- [[llm_wiki]]
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

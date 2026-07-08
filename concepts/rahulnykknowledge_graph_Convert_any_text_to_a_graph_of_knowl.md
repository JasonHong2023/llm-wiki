---
title: "rahulnyk/knowledge_graph: Convert any text to a graph of knowledge. This can be used for Graph Augmented Generation or Knowledge Graph based QnA"
type: framework
created: 2026-07-06T13:34
updated: 2026-07-06T13:34
tags: [Markdown, English, 技術, programming, development, 資料庫, database, Docker, 知識圖譜, Graph Augmented Generation, 知識工程, 語義搜尋, 企業知識管理, 知識提取, source:browser-extension]
confidence: high
---

# rahulnyk/knowledge_graph: Convert any text to a graph of knowledge. This can be used for Graph Augmented Generation or Knowledge Graph based QnA

*A knowledge graph generated using this code*
ghpages link of this graph: https://rahulnyk.github.io/knowledge_graph/

A knowledge graph, also known as a semantic network, represents a network of real-world entities—i.e. objects, events, situations, or concepts—and illustrates the relationship between them. This information is usually stored in a graph database and visualized as a graph structure, prompting the term knowledge “graph.”

Source: https://www.ibm.com/topics/knowledge-graph

- Clean the text corpus (The body of work).
- Extract concepts and entities from the body of work.
- Extract relations between the entities.
- Convert a graph schema.
- Populate nodes (concepts) and edges (relations).
- Visualise and Query.

Step 6 is purely optional, but it has certain artistic gratification associated with it. Network graphs are beautiful objects (just look at the banner image above, isn't it beautiful?). Fortunately, there are a good number of Python libraries available for generating graph visualisations.

Once the Knowledge Graph (KG) is build, we can use it for many purposes. We can run graph algorithms and calculate centralities of any node, to understand how important a concept (node) is to this body of work. We can calculate communities to bunch the concepts together to better analyse the text. We can understand the connectedness between seemingly disconnected concepts.

The best of all, we can achieve **Graph Retrieval Augmented Generation (GRAG)** and chat with our text in a much more profound way using Graph as a retriever. This is a new and improved version of **Retrieval Augmented Generation (RAG)** where we use a vectory db as a retriever to chat with our documents.

Here I have created a simple knowledge graph from a PDF document. The process I follow here is very similar to what is outlined in the above sections, with some simplifications.

First I split the entire text into chunks. Then I extract concepts mentioned within each chunk using an LLM. Note that I am not extracting entities using an NER model here. There is a difference between concepts and entities. For example 'Bangalore' is an entity, and 'Pleasant weather in Bangalore' is a concept. In my experience, concepts make more meaningful KG than entities.

I assume that the concepts that are mentioned in the vicinity of each other are related. So every edge in the KG is a text chunk in which the two connected concepts are mentioned.

Once the nodes (concepts) and the edges (text chunks) are calculated, It is easy to create a graph out of them using the libraries mentioned here. All the components I used here are set up locally, so this project can be run very easily on a personal machine. I have adopted a no-GPT approach here to keep things economical. I am using the fantastic Mistral 7B openorca instruct, which crushes this use case wonderfully. The model can be set up locally using Ollama so generating the KG is basically free (No calls to GPT).

To generate a graph this the notebook you have to tweak.

The notebook implements the method outlined in the following flowchart.

- Split the corpus of text into chunks. Assign a chunk_id to each of these chunks.
- For every text chunk extract concepts and their semantic relationships using an LLM. Let’s assign this relation a weightage of W1. There can be multiple relationships between the same pair of concepts. Every such relation is an edge between a pair of concepts.
- Consider that the concepts that occur in the same text chunk are also related by their contextual proximity. Let’s assign this relation a weightage of W2. Note that the same pair of concepts may occur in multiple chunks.
- Group similar pairs, sum their weights, and concatenate their relationships. So now we have only one edge between any distinct pair of concepts. The edge has a certain weight and a list of relations as its name.

Additional it also calculates the Degree of each node, and Communities of nodes, for sizing and coloring the nodes in the graph respectively.

**Here is a Medium article explaining the method in detail **

- Docker

- Clone the repository:
`git clone https://github.com/rahulnyk/knowledge_graph.git cd knowledge_graph`
- Build
`docker build -t knowledge-graph .`
- Run
`docker run -p 8888:8888 knowledge-graph`

I am using the Mistral 7B Openorca for extracting concepts out of text chunks. It can follow the system prompt instructions very well.

Ollama makes it easy to host any model locally. Mistral 7B OpenOrca version is already available with Ollama to use out of the box.

To set up this project, you must install Ollama on your local machine.

Step 1: Install Ollama https://ollama.ai

Step 2: run `ollama run zephyr` in your terminal. This will pull the zephyr model to your local machine and start the Ollama server.

dataframes for graph schema (can use a graphdb at a later stage).

This is a python library that makes dealing with graphs super easy

Pyvis python library for visualisation. Pyvis generates Javascript Graph visualisations using python, so the final graphs can be hosted on the web. For example the github link of this repo is a graph generated by pyvis

This project needs a lot more work. There are some wonderful ideas suggested by folks on medium and here on Github. If this interests you, Please join hands and lets' build this together. Here are a few suggested imrpovements.

- 
Use embeddings to deduplicate semantically similar concepts ( **Suggested by William Claude on the Medium Article**)- Avoid having similar concepts written differently by the LLM (eg: "doctor" and "doctors")
- Reinforce the clustering of strongly similar concepts (eg: "doctor" and "medical practitioner")?
 
- 
Filter out the redundant, or outlier concepts that may not be useful in understanding the text. For example, generic concepts that occur too often in the text. ( **Suggested by Luke Chesley**)
- 
Better implement the concept of contextual proximity to avoide overweighting certain concepts that occur too frequently, or to weed out useless edges. ( **Suggested by Luke Chesley**)

-  Create a Frontend for rendering Graph of Concepts in a more useful way. for example here is a flow. (**Suggested by David Garcia on the Medium Article**).- Provide a list concept/interest/topics
- User selects what they're interested in
- This expands to show sub-topics, sub-concepts, sub-x, etc.
- This is how you get deep into a specialty

## Related Pages

- [[How to Convert Any Text Into a Graph of Concepts]]
- [[知識圖譜與語義搜尋技術指南 | LargitData]]
- [[知識圖譜 (Knowledge Graph, KG)]]
- [[什麼是知識圖譜？AI 能不能進工廠的關鍵 | 製造新觀點]]
- [[紫微諭德]]
- [[麥肯錫顫抖了！OpenAI 親自下場做諮詢，私募大佬竟成最強推手？💸]]
- [[中華電信研究院｜科技新知]]
- [[知識圖譜概論(下)]]
- [[諸子集成第六冊孫子十家注吳子尹文子呂氏春秋]]

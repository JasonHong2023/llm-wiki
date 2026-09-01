---
title: Voicebox：整合聲音複製、全域聽寫與 AI Agent 語音輸出的本機開源工具 | 網路資源 | DeTools 工具翼零
type: framework
created: 2026-07-18T20:25
updated: 2026-07-18T20:25
tags: [Markdown, 中文, English, 技術, programming, development, API, REST, Voicebox, AI Agent, 語音輸入, 語音輸出, TTS, 本機開源工具, source:browser-extension]
confidence: high
---

# Voicebox：整合聲音複製、全域聽寫與 AI Agent 語音輸出的本機開源工具 | 網路資源 | DeTools 工具翼零

Voicebox 是一款本機優先（Local-first）的開源 AI 語音工具，將聲音複製、文字轉語音、語音輸入、長篇內容製作與 AI Agent 語音輸出整合在同一套桌面應用程式中。官方將它定位為 ElevenLabs 與 WisprFlow 的免費開源替代方案：前者主要處理文字轉語音與聲音複製，後者著重語音輸入與聽寫，而 Voicebox 希望同時處理完整的語音輸入與輸出流程。

這也代表 Voicebox 不只是一套 TTS 模型操作介面，更不是單純供開發者串接服務的 Voice AI Framework。使用者可以從幾秒鐘的參考音訊複製聲音、選擇預設聲線產生語音，也能按下全域快捷鍵直接對任何應用程式聽寫，再讓支援 MCP 的 AI Agent 使用指定聲音回覆。整套流程可在使用者自己的電腦上執行，模型、錄音、語音資料、逐字稿與本機 LLM 的處理結果不必送往雲端。

Voicebox 的市場定位相當明確。ElevenLabs 解決的是 AI 語音輸出，WisprFlow 解決的是語音輸入，但兩者分別位於語音互動迴路的不同端點。Voicebox 則把語音合成、聽寫、文字修整與 Agent 回覆串在一起，再透過內建的本機 LLM 清理逐字稿、調整內容，或依照不同聲音設定檔套用角色個性。這使它從一般聲音複製工具，進一步發展成涵蓋人類與 AI Agent 的完整 Voice I/O 工作環境。

在語音輸出方面，Voicebox 支援多種定位不同的 TTS 引擎，使用者可依硬體、語言、品質及生成速度切換。官方目前列出的七套引擎包括：

- Qwen3-TTS
- Qwen CustomVoice
- LuxTTS
- Chatterbox Multilingual
- Chatterbox Turbo
- HumeAI TADA
- Kokoro

這些引擎並非全部提供相同能力。Qwen3-TTS、LuxTTS、Chatterbox 與 TADA 可用於聲音複製；Qwen CustomVoice 與 Kokoro 則提供整理好的預設聲音。部分模型適合高品質輸出，部分著重 CPU 即時效能，也有模型專門支援多語言或更具表現力的說話方式。

Voicebox 支援以短音訊進行零樣本聲音複製，也提供超過 50 款整理好的預設聲音。使用者不一定要準備自己的參考錄音，即可直接挑選聲線產生內容；需要建立個人化聲音時，則能匯入一段參考音訊建立 Voice Profile。語言方面，專案整體可處理最多 23 種語言，包括英文、中文、日文、阿拉伯文、印地文與史瓦希里文等，不過實際支援範圍會因所選 TTS 引擎而有所差異。

除了基本的文字轉語音，Voicebox 也提供多項偏向內容製作的功能：

- 調整音高，並加入混響、延遲、合唱、壓縮與濾波效果。
- 使用 `[laugh]`、`[sigh]`、`[gasp]`等標記控制笑聲、嘆氣與吸氣等語氣。
- 透過自然語言描述說話方式，控制部分模型的情緒與表達。
- 自動將長篇文字切分生成，再以 Crossfade 銜接不同片段。
- 利用 Stories Editor 的多軌時間軸製作對話、Podcast 與敘事內容。

因此，它不只適合輸出短句或旁白，也能處理文章、故事、章節及多人對話等較長內容。相較於只有文字輸入框與音訊下載按鈕的 TTS 工具，Voicebox 更接近一套精簡的 AI 語音製作環境。

語音輸入是 Voicebox 從聲音複製工具發展為完整 AI 語音工具的重要功能。使用者可設定全域快捷鍵，在任何應用程式中使用 Push-to-talk 或切換式錄音；錄音完成後，Whisper 會在本機將語音轉換成文字，再由本機 LLM 處理標點、語助詞與自我修正，最後自動貼入原本取得焦點的文字欄位。Voicebox 也會保存錄音與逐字稿，方便搜尋、重新轉錄、再次修整，或直接將某次錄音轉為新的聲音複製樣本。

對於使用 Claude Code、Cursor、Cline 等 AI 開發工具的人，Voicebox 還提供 MCP Server。支援 MCP 的 Agent 可透過 `voicebox.speak` 工具呼叫指定聲音，將原本只會顯示在畫面上的文字回應直接朗讀出來。這項整合的重點不是另外建立一個語音 Agent，而是替既有 Agent 補上可自由選擇、甚至自行複製的聲音。

Voice Profile 也不只保存聲音本身。使用者可以為不同聲音附加自由格式的 Persona，描述角色的個性、語氣與表達方式，再透過內建本機 LLM 執行 Compose、Rewrite 或 Respond。如此一來，同一段資訊可依不同角色設定重新組織，再交由對應聲音朗讀；透過 MCP 連接的 Agent 也能使用相同模式。這讓 Voicebox 的「聲音」不只是音色設定，而能同時包含可重複使用的角色表達方式。

在技術架構上，Voicebox 使用 Tauri 建立桌面程式，核心桌面層採用 Rust，而不是 Electron。專案同時提供 REST API、WebSocket API 與 MCP Server，讓使用者除了操作圖形介面，也能把語音輸入與輸出能力整合進自己的應用程式、自動化流程或 AI Agent。平台方面則涵蓋 macOS、Windows 與 Linux，並針對 Apple Silicon 的 MLX／Metal、NVIDIA CUDA、AMD ROCm、Intel Arc、CPU 及 Docker 等不同環境提供支援；不過，實際可使用的模型與效能仍會受到作業系統、顯示卡及記憶體容量影響。

從實際使用情境來看，Voicebox 適合的對象包括：

- 想在本機複製聲音與產生 AI 配音的內容創作者。
- 需要製作 Podcast、角色對話或長篇有聲內容的使用者。
- 希望以全域快捷鍵取代鍵盤輸入的語音聽寫使用者。
- 重視錄音、逐字稿及聲音資料隱私的個人與團隊。
- 想讓 Claude Code、Cursor 或其他 MCP Agent 開口回應的開發者。
- 希望透過 API 將本機語音能力整合進應用程式的工程師。

與 ElevenLabs 相比，Voicebox 的優勢在於開源、本機執行、沒有依字數計價的雲端生成模式，並提供多種可替換的 TTS 引擎；與 WisprFlow 相比，它除了語音聽寫，也涵蓋聲音複製、語音合成與 Agent 語音回覆。不過，本機執行也代表使用者需要自行下載模型、準備儲存空間，生成速度與可用功能則取決於電腦硬體。它並不是以雲端便利性取勝，而是以資料自主、模型選擇與完整語音工作流程作為主要差異。

整體而言，Voicebox 是一款整合語音輸入與輸出的本機 AI 語音工具。它一方面提供多引擎文字轉語音、聲音複製、效果處理及多軌故事編輯，另一方面加入全域聽寫、本機 LLM 修整、Voice Persona 與 MCP Agent 語音輸出。對於希望減少對雲端語音平台依賴，同時把配音、聽寫與 AI Agent 語音互動集中在同一個應用程式中的使用者而言，Voicebox 提供了一套完整且具高度擴充性的開源方案。

## Related Pages

- [[祖克伯：Meta AI代理發展不如預期 重組時機判斷有誤]]
- [[Hermes_Agent實務工作者參考指南2026]]

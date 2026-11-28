---
title: CUDA Programming Guide
created: 2026-11-28T11:05
updated: 2026-11-28T11:05
type: concept
tags: [CUDA, NVIDIA, GPU程式設計, 平行運算]
sources: [raw/articles/cuda-programming-guide-summary.md]
confidence: medium
---

# CUDA Programming Guide（NVIDIA 官方 CUDA 程式設計指南）

CUDA 是 NVIDIA 的平行運算平台與程式設計模型，用 GPU 的算力加速深度學習、科學計算與高效能運算（HPC）。CUDA Programming Guide 是官方的完整說明，從程式設計模型、平台概覽，到語言擴充與硬體、軟體特性都有涵蓋，新手和資深開發者都適用。

## 五個部分

1. **介紹與程式設計模型概論**：和語言無關的 CUDA 模型與平台導覽，不寫程式的人也能讀。
2. **用 CUDA 寫 GPU 程式**：C++ 與 Python 的基礎，教學性質，涵蓋最重要的部分與常見效能考量。
3. **進階 CUDA**：細粒度控制與效能最大化，例如單一程式使用多張 GPU。
4. **CUDA 特性**：個別功能的完整說明，例如 CUDA graphs、動態平行、與圖形 API 互通、統一記憶體。
5. **技術附錄**：CUDA C++ 語言支援、各硬體規格等參考資料。

第一到三部分是給新手循序學習的路線，第四、五部分是寫程式時查閱的參考。即使主要用函式庫或框架，理解這個模型也有助於了解抽象層底下的運作。

## 相關

- 章節深度分析（v13.5）：[[cuda-programming-guide-v13.5-analysis]]
- 網頁重點摘錄：[[cuda-programming-guide-summary]]

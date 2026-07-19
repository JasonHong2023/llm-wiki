---
title: 我的 AI 每天自動抓新聞、寫文案、產圖——這套基本上免費
type: framework
created: 2026-07-18T21:06
updated: 2026-07-18T21:06
tags: [JavaScript, frontend, web, TypeScript, typed, Markdown, 中文, English, Google, Apps Script, AI, 自動化, 新聞資料庫, 行銷總監, source:browser-extension]
confidence: high
---

# 我的 AI 每天自動抓新聞、寫文案、產圖——這套基本上免費

不用會寫程式，也還不需要動用 Claude 或任何分身平台。用 Google 全套免費工具＋一點 AI，照這頁抄，30～60 分鐘架起來。這不是概念文，是一間台灣辦公家具工廠**每天早上實際在跑**的系統。

白話版：**Google 快訊當你的新聞雷達，試算表當資料庫，Apps Script 當不睡覺的工讀生，AI 當行銷總監。**你只出一張嘴（審稿）。

替你想追的關鍵字（產業、競品、客戶圈）建立快訊，Google 全網幫你盯，新文章出現就進清單。

google.com/alerts・免費把每組快訊改成 RSS（一種「機器看的訂閱網址」，程式一讀就拿到最新清單），這是整套自動化的入水口。

快訊內建・免費新聞資料庫、產品輪播表、貼文草稿全放同一份試算表，看得到、改得動、不用架任何伺服器。

Google Sheets・免費Apps Script（試算表內建的程式功能，寫好掛上排程就自動執行）每天早上：抓 RSS → 存進資料庫 → 叫 AI 上工 → 把成果寫回草稿分頁。

試算表內建・免費AI 讀今天的新聞標題＋你的產品清單，挑出值得講的，寫成三個平台版本的文案，每則附一段英文生圖提示詞——貼進 Gemini 就能直接生圖。

Gemini（免費額度）或 Claude API先看地圖：每一步在做什麼、大概多久，點卡片直接跳到該步驟。

API 金鑰（一串像密碼的文字，讓你的程式有權限呼叫 AI）二選一：

金鑰先複製存好，第 4 步會用到。**金鑰＝密碼，不要貼給別人、不要寫進會分享出去的檔案。**

**①「快訊設定」分頁**——把第 2 步的清單填進去（啟用欄填 Y；留空也會啟用，填 N 才停用）：

| 分類 | RSS網址 | 啟用(Y/N) | 
|---|---|---|
| 產業動態 | https://www.google.com/alerts/feeds/… | Y | 
| 原物料 | https://www.google.com/alerts/feeds/… | Y | 

**②「產品輪播」分頁**——列出你的產品／服務（AI 會自動挑「最久沒推的」來寫，冷門品也輪得到曝光）：

| 產品名 | 賣點 | 適用場景 | 上次使用日期 | 
|---|---|---|---|
| 人體工學椅 A 款 | 台灣製造、久坐支撐 | 辦公室、居家工作 | （留空，程式自動回填） | 

**③ 放金鑰**——回 Apps Script，左側齒輪 專案設定 → 最下面「指令碼屬性」→ 新增：名稱填 GEMINI_API_KEY，值貼你的金鑰 → 儲存。（走 Claude 路線的話：名稱改填 CLAUDE_API_KEY，並把程式碼最上方 CONFIG 裡的 AI: 'gemini' 改成 AI: 'claude'）

**④ 改提示詞**——程式碼最上方 SYSTEM_PROMPT 那一段，把「＿＿公司」等空白處換成你公司的背景、產品、受眾。這段就是 AI 的「職位說明書」，寫得越具體，文案越像你。

約 240 行，每一段都有中文註解。看不懂沒關係——先照抄跑起來，之後想改哪段，把那段連同你的需求丟給任何 AI，它會教你改。

```
/**********************************************************************
 * 每日新聞自動化：Google 快訊 RSS → 試算表 → AI 挑選寫文案 → 生圖提示詞
 * 版本：公開教學版 v1.0（2026-07-18）
 * 用法：完整教學見 https://hy-ai-newsbot.pages.dev/
 * 授權：可自由複製修改使用（記得把「基本設定」換成你自己的）
 **********************************************************************/
/* ===== 基本設定（只要改這一區）===== */
const CONFIG = {
  AI: 'gemini',                                // 'gemini'（有免費額度）或 'claude'
  GEMINI_MODEL: 'gemini-2.5-flash',            // Gemini 模型
  CLAUDE_MODEL: 'claude-haiku-4-5-20251001',   // Claude 便宜模型
  TZ: 'Asia/Taipei',
  NEWS_KEEP_ROWS: 2000,                        // 新聞資料庫只保留最近 N 筆，舊的自動刪
  // 圖片提示詞的固定結尾（換成你的品牌色與風格，每張圖視覺才會一致）
  BRAND_IMG_SUFFIX: 'clean professional commercial photography, brand palette deep green and warm gold accents, soft natural daylight, photorealistic, 16:9, no text, no logo, no watermark.'
};
/* ===== 給 AI 的「總監人設」提示詞（把＿＿換成你公司的資料）===== */
const SYSTEM_PROMPT = `你是「＿＿公司」的社群行銷總監。全程使用台灣繁體中文，輸出前自我檢查，絕對不可出現簡體字。
【公司背景（換成你的）】
- 產業與年資：＿＿＿＿
- 產品或服務：＿＿＿＿
- 主要受眾：＿＿＿＿
- 語氣：專業、務實、不浮誇
【最重要：角度要輪流，不可每篇都一樣】
我會給你「近 7 天用過的角度」，你這次產出的角度必須和近期不同。
從以下 8 大角度庫挑：
1.痛點解決 2.數據佐證 3.幕後故事 4.產業趨勢連結 5.客戶情境 6.永續環保 7.專業知識 8.通路視角
【本次產出 2 則】
第 1 則＝產品介紹（主打我指定的那個「最久沒推」的產品）
第 2 則＝新聞延伸（從我給的新聞標題挑 1 則最能連結到你產業的，延伸成觀點；真的全部無關才寫趨勢觀點）
【每則都要寫 3 個平台版本】
- fb：200-300 字，情境或故事開頭，段落分明，結尾一句行動呼籲
- ig：100 字內，短句斷行，3-5 個 emoji，hashtag 不放這欄
- li：LinkedIn 專業 B2B 語氣，用數據或觀點切入，不用 emoji
【每則附 1 個英文圖片提示詞】
img 欄＝一句英文畫面描述（依內容想像畫面），結尾固定接這段品牌風格文字：
${CONFIG.BRAND_IMG_SUFFIX}
【輸出格式：只輸出一個 JSON 陣列，剛好 2 個物件，前後不要任何說明文字，不要加程式碼框】
[
 {"type":"產品介紹","angle":"角度名稱","ref":"主打產品名","fb":"...","ig":"...","li":"...","hashtags":"#你的品牌 #...","img":"英文畫面...（結尾接品牌風格句）"},
 {"type":"新聞延伸","angle":"角度名稱","ref":"參考的新聞標題","fb":"...","ig":"...","li":"...","hashtags":"#...","img":"英文畫面...（結尾接品牌風格句）"}
]`;
/* ===== 第 0 步：自動建好 4 個分頁（貼上程式碼後先跑這個一次）===== */
function setupSheets() {
  const defs = {
    '快訊設定':   ['分類', 'RSS網址', '啟用(Y/N)'],
    '新聞資料庫': ['日期', '分類', '標題', '連結'],
    '產品輪播':   ['產品名', '賣點', '適用場景', '上次使用日期'],
    '貼文草稿':   ['日期', '類型', '角度', '參考', 'FB文案', 'IG文案', 'LinkedIn文案', 'Hashtags', '圖片提示詞', '狀態']
  };
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(defs).forEach(function (name) {
    let sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);
    if (sh.getLastRow() === 0) sh.appendRow(defs[name]);
  });
  Logger.log('4 個分頁已建好，請到「快訊設定」貼上你的 Google 快訊 RSS 網址');
}
/* ===== 每日入口（時間觸發器指到這個函式）===== */
function dailyRoutine() {
  try { fetchAlerts(); }        catch (e) { Logger.log('抓新聞失敗：' + e); }
  try { pruneNewsDB_(); }       catch (e) { Logger.log('清資料庫失敗：' + e); }
  try { generateDailyPosts(); } catch (e) { Logger.log('產文案失敗：' + e); }
}
/* ===== 抓 Google 快訊 RSS → 寫進「新聞資料庫」（自動去重）===== */
function fetchAlerts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const setSh = ss.getSheetByName('快訊設定');
  const dbSh = ss.getSheetByName('新聞資料庫');
  const rows = setSh.getDataRange().getValues().slice(1);   // 略過表頭
  const today = Utilities.formatDate(new Date(), CONFIG.TZ, 'yyyy-MM-dd');
  const atom = XmlService.getNamespace('http://www.w3.org/2005/Atom');
  // 用最近 500 筆的連結當「已存過」名單，避免重複灌
  const seen = {};
  const last = dbSh.getLastRow();
  if (last > 1) {
    dbSh.getRange(Math.max(2, last - 499), 4, Math.min(500, last - 1), 1)
        .getValues().forEach(function (r) { if (r[0]) seen[r[0]] = true; });
  }
  let added = 0;
  rows.forEach(function (row) {
    const cat = row[0], url = row[1], on = String(row[2] || '').toUpperCase();
    if (!url || on === 'N') return;   // 留空視為啟用，填 N 才停用（防呆）
    try {
      const xml = UrlFetchApp.fetch(url, { muteHttpExceptions: true }).getContentText();
      const entries = XmlService.parse(xml).getRootElement().getChildren('entry', atom);
      entries.forEach(function (en) {
        const title = String(en.getChildText('title', atom) || '').replace(/<[^>]+>/g, '');
        const linkEl = en.getChild('link', atom);
        if (!title || !linkEl) return;
        let link = linkEl.getAttribute('href').getValue();
        const m = link.match(/[?&]url=([^&]+)/);   // 快訊給的是轉址，取出真正的新聞網址
        if (m) link = decodeURIComponent(m[1]);
        if (seen[link]) return;
        seen[link] = true;
        dbSh.appendRow([today, cat, title, link]);
        added++;
      });
    } catch (e) { Logger.log(cat + ' 這條 RSS 讀取失敗：' + e); }
  });
  Logger.log('今天新增 ' + added + ' 則新聞');
}
/* ===== 資料庫瘦身：只留最近 N 筆，永遠不會爆掉 ===== */
function pruneNewsDB_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('新聞資料庫');
  if (!sh) return;
  const excess = sh.getLastRow() - 1 - CONFIG.NEWS_KEEP_ROWS;
  if (excess > 0) sh.deleteRows(2, excess);   // 新資料在最下面，從第 2 列刪最舊的
}
/* ===== 主流程：讀新聞＋讀近期角度＋挑最久沒推的產品 → 叫 AI 寫 → 存草稿 ===== */
function generateDailyPosts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const draft = ss.getSheetByName('貼文草稿');
  const today = Utilities.formatDate(new Date(), CONFIG.TZ, 'yyyy-MM-dd');
  const news = getTodayNews_(20);        // 今天的新聞標題，最多 20 則
  const recent = getRecentAngles_();     // 近 7 天用過的角度（防重複的關鍵）
  const product = pickOldestProduct_();  // 最久沒推的產品（輪播）
  const user =
    '今天日期：' + today + '\n\n' +
    '【近 7 天用過的角度，請避開】\n' + (recent.join('、') || '（無）') + '\n\n' +
    '【產品介紹請主打這個（最久沒推）】\n' +
    (product ? (product.name + '｜賣點：' + product.selling + '｜場景：' + product.scenario)
             : '（輪播表為空，產品介紹自由發揮）') + '\n\n' +
    '【今日新聞標題】\n' +
    (news.length ? news.map(function (n, i) { return (i + 1) + '. ' + n; }).join('\n')
                 : '（今日無新聞，兩則都用產品／趨勢角度）');
  const posts = parseJsonLoose_(callAI_(SYSTEM_PROMPT, user));
  posts.slice(0, 2).forEach(function (p) {
    draft.appendRow([today, p.type || '', p.angle || '', p.ref || '',
                     p.fb || '', p.ig || '', p.li || '', p.hashtags || '', p.img || '', '待審核']);
  });
  if (product) ss.getSheetByName('產品輪播').getRange(product.row, 4).setValue(today); // 回填日期
  Logger.log('已產出 ' + Math.min(posts.length, 2) + ' 則草稿');
}
/* ===== 小工具們 ===== */
function getTodayNews_(n) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('新聞資料庫');
  const last = sh.getLastRow();
  if (last < 2) return [];
  const today = Utilities.formatDate(new Date(), CONFIG.TZ, 'yyyy-MM-dd');
  const rows = sh.getRange(Math.max(2, last - 199), 1, Math.min(200, last - 1), 3).getValues();
  return rows.filter(function (r) {
    const d = (r[0] instanceof Date) ? Utilities.formatDate(r[0], CONFIG.TZ, 'yyyy-MM-dd') : String(r[0]);
    return d === today;
  }).map(function (r) { return r[2]; }).slice(-n);
}
function getRecentAngles_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('貼文草稿');
  const last = sh.getLastRow();
  if (last < 2) return [];
  // 近 14 筆 ≒ 7 天 × 每天 2 則
  const rows = sh.getRange(Math.max(2, last - 13), 3, Math.min(14, last - 1), 1).getValues();
  return rows.map(function (r) { return r[0]; }).filter(String);
}
function pickOldestProduct_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('產品輪播');
  if (!sh || sh.getLastRow() < 2) return null;
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues();
  let best = null;
  rows.forEach(function (r, i) {
    if (!r[0]) return;
    const t = r[3] ? new Date(r[3]).getTime() : 0;   // 從沒推過＝最優先
    if (!best || t < best.t) best = { row: i + 2, name: r[0], selling: r[1], scenario: r[2], t: t };
  });
  return best;
}
/* ===== 呼叫 AI（金鑰放「專案設定 → 指令碼屬性」，絕對不要寫死在程式碼裡）===== */
function callAI_(system, user) {
  const props = PropertiesService.getScriptProperties();
  if (CONFIG.AI === 'gemini') {
    const key = props.getProperty('GEMINI_API_KEY');
    if (!key) throw new Error('請到「專案設定 → 指令碼屬性」新增 GEMINI_API_KEY');
    const res = UrlFetchApp.fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/' + CONFIG.GEMINI_MODEL + ':generateContent?key=' + key,
      { method: 'post', contentType: 'application/json', muteHttpExceptions: true,
        payload: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts: [{ text: user }] }]
        }) });
    const data = JSON.parse(res.getContentText());
    if (!data.candidates) throw new Error('Gemini 回應異常：' + res.getContentText().slice(0, 300));
    return data.candidates[0].content.parts[0].text;
  }
  const key = props.getProperty('CLAUDE_API_KEY');
  if (!key) throw new Error('請到「專案設定 → 指令碼屬性」新增 CLAUDE_API_KEY');
  const res = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    payload: JSON.stringify({ model: CONFIG.CLAUDE_MODEL, max_tokens: 4000,
      system: system, messages: [{ role: 'user', content: user }] }) });
  const data = JSON.parse(res.getContentText());
  if (!data.content) throw new Error('Claude 回應異常：' + res.getContentText().slice(0, 300));
  return data.content[0].text;
}
/* AI 有時會多講話或包程式碼框——只取第一個 [ 到最後一個 ] 之間的 JSON */
function parseJsonLoose_(text) {
  const s = text.indexOf('['), e = text.lastIndexOf(']');
  if (s === -1 || e === -1) throw new Error('AI 沒有回 JSON，開頭是：' + text.slice(0, 200));
  return JSON.parse(text.slice(s, e + 1));
}
/* ===== 加分題：把當日草稿寄到自己信箱（要用就把觸發器多指一條到這個）===== */
function emailTodayDigest() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('貼文草稿');
  const last = sh.getLastRow();
  if (last < 2) return;
  const today = Utilities.formatDate(new Date(), CONFIG.TZ, 'yyyy-MM-dd');
  const rows = sh.getRange(Math.max(2, last - 5), 1, Math.min(6, last - 1), 9).getValues()
    .filter(function (r) {
      const d = (r[0] instanceof Date) ? Utilities.formatDate(r[0], CONFIG.TZ, 'yyyy-MM-dd') : String(r[0]);
      return d === today;
    });
  if (!rows.length) return;
  const body = rows.map(function (r) {
    return '【' + r[1] + '｜' + r[2] + '】\n' + r[4] + '\n\n圖片提示詞：\n' + r[8];
  }).join('\n\n----------------\n\n');
  MailApp.sendEmail(Session.getActiveUser().getEmail(), '今日 AI 貼文草稿 ' + today, body);
}
```
    跑一陣子你會發現 AI 連三天講同一套說法。我後來抓到根因：**問題常出在自己的提示詞**——如果你規定「每篇都要回到某個核心訊息」，AI 就會每篇都繞回去，怪不了它。

解法兩件事，程式碼裡都做好了：**（1）**每次產文前，把「近 7 天用過的角度」讀出來塞回給 AI，明令避開；**（2）**給它一個 8 大角度庫（痛點解決／數據佐證／幕後故事／趨勢連結／客戶情境／永續／專業知識／通路視角）要求輪流。

JSON（一種固定格式的資料寫法，程式才讀得懂）。AI 很愛在前後加「好的，以下是您要的內容：」這類客套話，程式一解析就掛。

兩道保險：提示詞明寫「**只輸出 JSON 陣列，前後不要任何說明文字、不要程式碼框**」；程式端再用「只取第一個 [ 到最後一個 ] 之間」的寬鬆解析保底。雙保險之後基本不再失敗。

親身教訓：AI 生的產品圖很美，但那不是你的產品，細節全是編的。拿去當產品介紹配圖，客戶收到實物會覺得被騙。

鐵則：**產品介紹文 → 配自己的實拍照；趨勢文、觀點文、情境文 → 才用 AI 生圖**（沒有指定產品、純氛圍，怎麼生都不會穿幫）。

同一件事，FB 要故事感、IG 要短句＋emoji、LinkedIn 要專業觀點對決策者說話。一稿貼三處＝三處都普通。

讓 AI 一次寫三版幾乎不增加成本（就多一點輸出字數），但每個平台都拿到「當地話」。這是這套系統裡 CP 值最高的一個設定。

AI 寫中文偶爾會飄出簡體字或大陸用語，對外文案出這種包很傷。提示詞第一句就寫死：「全程使用台灣繁體中文，輸出前自我檢查，絕對不可出現簡體字」，中獎率大幅下降。發文前自己再掃一眼，雙保險。

每天灌上百則新聞，幾個月就是幾萬列，試算表越開越慢。程式碼裡有一行設定 **NEWS_KEEP_ROWS = 2000**：每天自動只留最近 2000 筆（約 10～14 天的量，選材綽綽有餘），舊的自動刪。一次設好，永遠不用管。

整套管線（抓新聞→資料庫→排程→AI）完全不動，把給 AI 的「職位說明書」從行銷總監換成 SEO 編輯即可。模板直接拿去用：

```
你是「＿＿產業」的 SEO 內容編輯。全程台灣繁體中文，輸出前自查，禁止簡體字。
從我給的今日新聞挑 1 則與本產業最相關的，寫成一篇 SEO 文章。
要求：
1. 標題含主關鍵字「＿＿」，30 字內，讓人想點
2. 前 100 字直接回答讀者搜尋這個關鍵字時最想知道的事
3. 結構：前言 → 3~5 個小節（各 150-250 字，每節一個小標）→ 常見問題 3 題 → 結論含行動呼籲
4. 自然置入次要關鍵字：＿＿、＿＿（禁止硬塞）
5. 引用新聞事實時保留來源名稱；沒把握的數字不要寫
只輸出一個 JSON 物件，不要任何說明文字：
{"title":"...","meta":"120字內的搜尋結果描述","body":"文章全文（Markdown 格式）","faq":[{"q":"...","a":"..."}],"tags":["...","..."]}
```
    產出寫回試算表後，人工看過再發——**AI 負責 0 到 80 分，最後 20 分（事實查核＋你的觀點）永遠是人的活**。這也是整套系統的設計哲學：草稿全自動，發布權在人。

可以。整份程式碼是現成的，你要做的只有：複製貼上、填試算表、貼金鑰、點幾個按鈕。卡住的話，把錯誤訊息連同「我在做某教學的第幾步」丟給任何 AI 聊天工具，它會帶你排錯——這年頭「會問 AI」就等於會一半的程式。

Google 快訊、試算表、Apps Script、排程全部免費。唯一可能花錢的是 AI 呼叫：這套每天只叫 1～2 次、每次幾千字，用 Gemini 免費額度通常是 $0；用 Claude Haiku 大約每月幾十元台幣。生圖用 Gemini 的免費額度也夠日常用。

爬蟲（自動抓網頁內容的程式）要對付改版、擋機器人、法律灰區，維護成本高。Google 快訊等於 Google 替你全網掃描，穩定、合法、零維護，還自帶關鍵字過濾。自動化系統能用「官方提供的入口」就不要硬爬，這是讓系統活得久的第一原則。

正常。因為這支程式是「你自己寫給自己用」的，沒送 Google 官方審核。點「進階」→「前往（你的專案名稱）」→ 允許即可。它要的權限就是讀寫你這份試算表＋連網抓 RSS；另外因為程式碼附了選配的「寄草稿到信箱」功能，授權清單也會列出「傳送電子郵件」，屬正常現象。

建議永遠留「人審」這一關（所以草稿欄有「待審核」狀態）。AI 偶爾會過度發揮：數字沒根據、效果講太滿。我的鐵則是——**對外只講做得到、有佐證的話**；AI 給 80 分草稿，最後把關的是你的專業。

需要，但那是下一階段。這套 Google 版是「固定流程自動化」的入門款：便宜、穩、不用值班。等你開始用 Claude 這類 AI 工作夥伴，Skill 的概念其實一樣——**把固定流程寫成一份說明書，讓 AI 每次照著做**，只是它更聰明、能處理更多變化。先用這套把「每天自動產內容」跑起來，之後要升級，流程和提示詞都能原封不動搬過去。

## Related Pages

- [[OpenCode AI 編碼助理完全入門指南：開源免費工具的力量 | LETWEBS 來網頁資訊 ─ 引領未來線上整合提供商]]
- [[How to Convert Any Text Into a Graph of Concepts]]
- [[flomesh-io/ztm: ZTM (Zero Trust Mesh) is a privacy-first open-source decentralized end-to-end encrypted software defined network, based on HTTP/2 tunnels. Experience boundless connectivity and mesh the globe!]]

---
title: Hermes 真·官方宠物系统完全指南：3248 只数字萌宠静静陪伴你
type: framework
created: 2026-07-03T22:50
updated: 2026-07-03T22:50
tags: [Markdown, 中文, English, 技術, programming, development, Hermes, Petdex, 数字宠物, 终端, 动画状态, 渲染模式, source:browser-extension]
confidence: high
---

# Hermes 真·官方宠物系统完全指南：3248 只数字萌宠静静陪伴你

# Hermes 真·官方宠物系统完全指南：3248 只数字萌宠静静陪伴你

一、这是什么？

Hermes Agent 内置了一套名为 **Petdex** 的动画吉祥物系统。它不是表情包，也不是壁纸——而是一群**真正会动的数字宠物**，会根据你写代码时的不同状态，做出不同的动画反应。

想象一下：当你让 AI agent 跑测试时，桌角的小家伙蹲在旁边盯着屏幕；测试出错时，它耷拉着耳朵；你让它休息时，它打个哈欠……这种陪伴感，让冷冰冰的终端有了温度。

**核心特点：**

- **3248 只宠物**可选，涵盖角色、生物、物件三大类(这个数量与hermes自己统计的不同，3248为客户端显示的数量)
- **动画状态**自动切换，实时反映 agent 工作状态
- 支持**终端、桌面端、CLI 三端**显示
- 一键安装，零配置启动

## 二、3248 只宠物，都在哪？

### 分类统计

| 类别 | 数量 | 占比 | 说明 | 
|---|---|---|---|
| character（角色） | 1629 只 | 50.1% | 动漫、游戏、影视人物 | 
| creature（生物） | 1247 只 | 38.3% | 动物、幻想生物、吉祥物 | 
| object（物件） | 377 只 | 11.6% | 文具、摆件、道具 | 

### 部分代表性宠物一览

**角色类（character）：** Homelander（黑袍纠察队）、Panam（赛博朋克2077）、绘梨衣（龙族）、Strike Freedom Gundam（高达）、Artoria Saber（Fate）、The Herta（崩坏：星穹铁道）、SD Girlfriend、Heimerdinger（英雄联盟）……

**生物类（creature）：** 噜噜、官喵、墨团团、小黑、英短银渐层、Bytechomp v2、Glitchcat、Pelican Pedal、Wukong……

**物件类（object）：** Paperclip、Opal File Ledger、Porcelain Folio Button、Sonic Screwdriver（神秘博士音速起子）、Tatsumaki Codex……

`完整画廊可通过 ``hermes pets list --limit 0` 查看全部 3253 只。## 三、6 种动画状态

宠物会根据 agent 的工作状态自动切换动画，无需任何手动干预：

| 状态 | 英文 | 触发时机 | 表现 | 
|---|---|---|---|
| 空闲等待 | idle | 无任务执行时 | 发呆、打盹、环顾四周 | 
| 正在工作 | run | agent 执行工具/代码时 | 专注地看着屏幕、敲键盘 | 
| 审查反思 | review | agent 在审查结果时 | 托腮思考、皱眉 | 
| 出错报错 | failed | 工具执行失败时 | 惊讶、捂脸、叹气 | 
| 打招呼 | wave | 交互触发 | 挥手、蹦跳 | 
| 跳跃互动 | jump | 交互触发 | 原地跳跃、转圈 | 

你甚至可以在终端里手动预览每种状态：

```
# 预览指定状态
hermes pets show cache-capy --state run
# 循环播放全部 6 种状态
hermes pets show --cycle
```
## 四、渲染模式：你的终端能画多好看？

宠物本质上是 192×208 像素的帧动画，渲染质量取决于你的终端：

| 模式 | 画质 | 支持的终端 | 
|---|---|---|
| kitty | ⭐⭐⭐⭐⭐ 原生图形，最高清 | Kitty Terminal | 
| iterm | ⭐⭐⭐⭐ 高质量图像协议 | iTerm2 (macOS) | 
| sixel | ⭐⭐⭐ 终端内嵌图像 | WezTerm、foot、alacritty | 
| unicode | ⭐⭐ 字符回退方案 | 任何真彩色终端 | 
| off | 关闭 | — | 

`大多数终端默认使用 ``unicode` 回退模式，效果是用 Unicode 半块字符模拟图像，虽然不够精美但兼容性好。## 五、完整操作手册

### 1. 浏览画廊

```
# 查看全部 3253 只（一次性输出）
hermes pets list --limit 0
# 每次看 50 条，滚动翻阅
hermes pets list --limit 50
# 按关键词搜索（比如找猫）
hermes pets list cat --limit 0
# 按类别筛选
hermes pets list character --limit 50
hermes pets list creature --limit 50
hermes pets list object --limit 50
```
### 2. 安装宠物

```
# 安装一只宠物（下载到本地）
hermes pets install <slug>
# 安装并立即设为活跃（一步到位）
hermes pets install <slug> --select
# 强制重新下载（覆盖旧版本）
hermes pets install <slug> --force
```
### 3. 切换活跃宠物

```
# 切换到指定宠物
hermes pets select <slug>
# 弹出交互式选择器（推荐）
hermes pets select
```
### 4. 调整大小

```
# 全局调整宠物尺寸（0.1 ~ 3.0，默认 0.33）
hermes pets scale 0.5    # 放大一倍
hermes pets scale 0.2    # 缩小
```
这个参数控制的是 192×208 原始帧的缩放比例，一个数值全局生效。

### 5. 预览动画

```
# 预览当前活跃宠物
hermes pets show
# 预览指定宠物
hermes pets show cache-capy
# 预览指定状态
hermes pets show cache-capy --state run
# 循环播放全部 6 种状态
hermes pets show --cycle
# 只播放一次
hermes pets show --once
# 覆盖渲染模式预览
hermes pets show --mode kitty
```
### 6. 关闭与删除

```
# 临时关闭宠物显示
hermes pets off
# 彻底移除已安装的宠物
hermes pets remove <slug>
```
### 7. 环境诊断

```
# 检查宠物系统是否正常工作
hermes pets doctor
```
## 六、配置文件详解

宠物系统的配置位于 `config.yaml` 的 `display.pet` 段：

```
display:
  pet:
    enabled: true          # 总开关：true/false
    slug: "cache-capy"     # 当前活跃的宠物 slug
    render_mode: "auto"    # auto | kitty | iterm | sixel | unicode | off
    scale: 0.33            # 缩放系数，范围 0.1 ~ 3.0
    unicode_cols: 32       # unicode 模式下的列宽
```
`安装/选择宠物时，``hermes pets` 会自动修改这份配置，无需手动编辑。## 七、文件存储位置

| 内容 | 路径 | 
|---|---|
| 宠物文件 | ~/.hermes/profiles/<profile>/pets/<slug>/ | 
| 配置文件 | ~/.hermes/profiles/<profile>/config.yaml | 

每个宠物独立存放在自己的文件夹里，删除宠物就是删掉对应的文件夹。

## 八、实用技巧

### 技巧 1：快速找到想要的宠物

```
# 搜索所有含 "cat" 的宠物
hermes pets list cat --limit 0
# 搜索中文宠物
hermes pets list 喵 --limit 0
# 搜索角色类宠物
hermes pets list character --limit 0
```
### 技巧 2：安装后不满意？一键换

```
# 弹出选择器，滚轮挑选
hermes pets select
# 或者一步到位：安装+切换
hermes pets install guan-miao --select
```
### 技巧 3：在 TUI（终端界面）中也能看到

宠物不仅出现在桌面端 GUI 中，在 Hermes 的 TUI（终端用户界面）里同样可见。不过要注意：**管道/重定向（无 TTY）环境下，终端渲染会自动关闭**——这是设计如此，因为管道中没有屏幕可以绘制。

### 技巧 4：和桌面端外观设置联动

桌面端的「外观」面板中有一个宠物大小滑块，和 `hermes pets scale` 命令完全同步。在 GUI 里拖滑块和在终端里输命令效果一样。

## 九、常见问题

**Q：装了宠物但看不到？** A：检查三点——① 是否已安装（`hermes pets list --installed`）；② 是否已选中（`hermes pets doctor` 查看 active slug）；③ 是否启用（`config.yaml` 中 `enabled: true`）。

**Q：能看到多少只？为什么只显示了部分？** A：画廊共 3253 只，但 `hermes pets list` 默认只显示前 30 条。加上 `--limit 0` 可查看全部。

**Q：宠物动画卡顿/模糊？** A：尝试更换渲染模式。如果你的终端支持 kitty/iterm/sixel 协议，设为对应模式可大幅提升画质。

**Q：能不能自己制作宠物？** A：Petdex 本身是开源项目（GitHub: crafter-station/petdex），精灵图格式有固定规范。理论上可以自己制作并提交到社区画廊，但本文不涉及制作教程。

## 十、总结

| 维度 | 数据 | 
|---|---|
| 宠物总数 | 3253 只 | 
| 角色类（character） | 1629 只 | 
| 生物类（creature） | 1247 只 | 
| 物件类（object） | 377 只 | 
| 动画状态 | 6 种（idle/run/review/failed/wave/jump） | 
| 渲染模式 | 5 种（kitty/iterm/sixel/unicode/auto） | 
| 安装路径 | ~/.hermes/profiles/<profile>/pets/ | 
| 画廊入口 | hermes pets list --limit 0 | 

3253 只宠物，总有一只会成为你的编程搭档。选一只，装上，让你的终端不再孤单。

`hermes pets install <你喜欢的slug> --select`*本文基于 Hermes Agent v2.x + Petdex 画廊数据撰写。宠物数量随社区贡献持续增长，实际数字请以* *hermes pets list --limit 0**为准。*

## Related Pages

- [[Google_Gemini]]

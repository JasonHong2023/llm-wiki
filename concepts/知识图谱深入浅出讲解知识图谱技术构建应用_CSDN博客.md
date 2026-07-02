---
title: 【知识图谱】深入浅出讲解知识图谱（技术、构建、应用）
type: framework
created: 2026-06-29T21:25
updated: 2026-07-02T17:09
tags: [Markdown, 中文, English, 技術, programming, development, API, REST, 知识图谱, 人工智能, 自然语言处理, 认知智能, 语义网络, 知识库]
confidence: high
---

[![Image 1: CSDN首页](https://img-home.csdnimg.cn/images/20201124032511.png)](https://www.csdn.net/)

*   [博客](https://blog.csdn.net/)
*   [下载](https://download.csdn.net/)
*   [社区](https://devpress.csdn.net/)
*   [![Image 2](https://img-home.csdnimg.cn/images/20240829093757.png)AtomGit](https://link.csdn.net/?target=https%3A%2F%2Fgitcode.com%3Futm_source%3Dcsdn_toolbar)
*   [![Image 3](https://i-operation.csdnimg.cn/images/39657dbbb2604501b9aa9f52194654ad.png)模型市场 ![Image 4](https://i-operation.csdnimg.cn/images/649cffb08af94768b41d9f9485799efe.png)](https://taotoken.net/?utm_source=tt_csdn_home_topbar)
*   [更多](https://blog.csdn.net/kevinjin2011/article/details/124686668)[会议](https://www.bagevent.com/event/9117243 "会议")[学习](https://edu.csdn.net/?utm_source=zhuzhantoolbar "高质量课程·大会云会员")[![Image 5](https://i-operation.csdnimg.cn/images/77c4dd7a760a493498bee1d336b064c0.png)InsCode](https://inscode.net/?utm_source=csdn_blog_top_bar "InsCode") 

搜索
AI 搜索

[登录](https://blog.csdn.net/kevinjin2011/article/details/124686668)

登录后您可以：

*   复制代码和一键运行
*   与博主大V深度互动
*   解锁海量精选资源
*   获取前沿技术资讯

[立即登录](https://blog.csdn.net/kevinjin2011/article/details/124686668)

[会员·新人礼包 ![Image 6](https://i-operation.csdnimg.cn/images/105eda9d414f4250a7c3fe45be3cd15f.png)](https://mall.csdn.net/vip?utm_source=260618_vip_toolbarhyzx_hy)

[消息](https://i.csdn.net/#/msg/index)

[创作中心](https://mp.csdn.net/ "创作中心")

[创作](https://mp.csdn.net/edit)

[![Image 7](https://i-operation.csdnimg.cn/images/1e8f150a68a74c53a83400d69f535a92.png)](https://mall.csdn.net/vip?utm_source=260618_vip_blogrighticon)![Image 8](https://i-operation.csdnimg.cn/images/43349e98a45341699652b0b6fa4ea541.png)![Image 9](https://i-operation.csdnimg.cn/images/394e99a49b19451fb89baacbe7ae5f0e.png)

# 【知识图谱】深入浅出讲解知识图谱（技术、构建、应用）

原创 已于 2022-06-06 15:46:01 修改·2w 阅读

·![Image 10](https://csdnimg.cn/release/blogv2/dist/pc/img/newHeart2023Active.png)![Image 11](https://csdnimg.cn/release/blogv2/dist/pc/img/newHeart2023Black.png) 21 

·[![Image 12](https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollect2.png)![Image 13](https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollectionActive2.png) 182](https://blog.csdn.net/kevinjin2011/article/details/124686668)·

本内容遵循CC 4.0 BY-SA版权协议

 版权声明：本文为博主原创文章，遵循[CC 4.0 BY-SA](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。 

标签

[#知识图谱](https://so.csdn.net/so/search/s.do?q=%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1&t=all&o=vip&s=&l=&f=&viparticle=&from_tracking_code=tag_word&from_code=app_blog_art)[#人工智能](https://so.csdn.net/so/search/s.do?q=%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD&t=all&o=vip&s=&l=&f=&viparticle=&from_tracking_code=tag_word&from_code=app_blog_art)[#自然语言处理](https://so.csdn.net/so/search/s.do?q=%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E5%A4%84%E7%90%86&t=all&o=vip&s=&l=&f=&viparticle=&from_tracking_code=tag_word&from_code=app_blog_art)

收录于

于 2022-05-10 14:02:32 首次发布

[![Image 14](https://i-blog.csdnimg.cn/blog_column_migrate/758088d2b247c99cd196d5478792b049.png?x-oss-process=image/resize,m_fixed,h_224,w_224)深入浅出讲解自然语言处理 专栏收录该内容](https://blog.csdn.net/kevinjin2011/category_9797399.html "深入浅出讲解自然语言处理")

43 篇文章

[订阅专栏](https://blog.csdn.net/kevinjin2011/article/details/124686668)

![Image 15](https://i-operation.csdnimg.cn/images/a7311a21245d4888a669ca3155f1f4e5.png)本文详细介绍了知识图谱的背景、定义、三要素、分类、技术流程和构建方法，强调了其在搜索、问答系统和智能推荐等方面的应用。知识图谱作为一种重要的认知智能技术，通过结构化表示实体、关系和属性，改善了信息检索和理解的效率。 

该文章已生成可运行项目，预览并下载项目源码

*   ![Image 16](https://i-blog.csdnimg.cn/blog_migrate/24cd3cd1739578aad98885afe405b3f1.png)本文收录于《[深入浅出讲解自然语言处理](https://blog.csdn.net/kevinjin2011/category_9797399.html "深入浅出讲解自然语言处理")》专栏，此专栏聚焦于自然语言处理领域的各大经典算法，将持续更新，欢迎大家订阅！
*   ![Image 17](https://i-blog.csdnimg.cn/blog_migrate/a97bbe6f56b42202014b395d5b538055.png)个人主页：[有梦想的程序星空](https://blog.csdn.net/kevinjin2011?type=blog "有梦想的程序星空")
*   ![Image 18](https://i-blog.csdnimg.cn/blog_migrate/a6903682cdc71d388834fa116059d789.png)个人介绍：小编是人工智能领域硕士，全栈工程师，深耕Flask后端开发、数据挖掘、NLP、Android开发、自动化等领域，有较丰富的软件系统、人工智能算法服务的研究和开发经验。
*   ![Image 19](https://i-blog.csdnimg.cn/blog_migrate/7504c8fd23c1a0819bcd833d69d52c8c.png)如果文章对你有帮助，欢迎![Image 20](https://i-blog.csdnimg.cn/blog_migrate/f70713190a91dd2a07a8e4d0010eb1f2.png)`关注`、![Image 21](https://i-blog.csdnimg.cn/blog_migrate/9998bb6a92390452104d482cfeb13dca.png)`点赞`、![Image 22](https://i-blog.csdnimg.cn/blog_migrate/f70713190a91dd2a07a8e4d0010eb1f2.png)`收藏`、![Image 23](https://i-blog.csdnimg.cn/blog_migrate/9998bb6a92390452104d482cfeb13dca.png)`订阅。`

*   ## [](https://blog.csdn.net/kevinjin2011/article/details/124686668)知识图谱的背景

2012 年 5 月 17 日，Google 正式提出了 知识图谱（Knowledge Graph）的概念，其初衷是为了优化搜索引擎返回的结果，改善用户的搜索质量以及搜索体验。当前的人工智能技术其实可以简单地划分为**感知智能**（主要是图像、视频、语音、文字等识别）和**认知智能**（涉及知识推理、因果分析等），知识图谱技术就是认知智能领域中的主要技术，是 人工智能 技术的组成部分，其强大的语义处理和互联组织能力，为智能化信息应用提供了基础。

*   ## [](https://blog.csdn.net/kevinjin2011/article/details/124686668)知识图谱的定义和三要素

**知识图谱**（Knowledge Graph，简称**KG**）本质上是一种叫做**语义网络**（semantic network）的知识库，即具有有向图结构的一个知识库。由**节点（point)、边（edge)和属性（property)**组成，在知识图谱里，每个节点表示现实世界中的‘实体’，每条边表示实体与实体之间的‘关系’。

知识图谱的组成三要素包括：实体、关系和属性。

**实体**：又叫作本体（Ontology），指客观存在并可相互区别的事物，可以是具体的人、事、物，也可以是抽象的概念或联系，实体是知识图谱中最基本的元素。

**关系**：在知识图谱中，边表示知识图谱中的关系，用来表示不同实体间的某种联系。

**属性**：知识图谱中的实体和关系都可以有各自的属性。

![Image 24](https://i-blog.csdnimg.cn/blog_migrate/b940554080df2f57396d7a1883cd766c.png)

图1 知识图谱中的三要素

*   ## [](https://blog.csdn.net/kevinjin2011/article/details/124686668)知识图谱的分类

**通用知识图谱**：面向通用领域的“结构化的百科知识库”，侧重构建行业常识性的知识，并用于 搜索引擎 和 推荐系统 。

**特定领域知识图谱**（行业知识图谱，垂直知识图谱）：面向某一特定领域，可看成是一个“基于语义技术的行业知识库”，主要面向企业，通过构建不同行业、企业的知识图谱，对企业内部提供知识化服务。

*   ## [](https://blog.csdn.net/kevinjin2011/article/details/124686668)知识图谱的技术流程

**知识来源**：可以从多种来源获取知识图谱数据（文本，结构化数据库，多媒体数据，传感器数据等）。

**知识表示**：知识表示是指用计算机符号描述和表示人脑中的知识，以支持机器模拟人的心智进行推理的方法与技术。

**知识抽取**：知识抽取按任务可以分为概念抽取、实体识别、关系抽取、事件抽取和规则抽取等。

**知识融合**：在构建知识图谱时，可以从第三方知识库产品或已有结构化数据中获取知识输入。

**知识图谱补全与推理**：常用的方法有基于本体推理的补全方法，基于表示和知识图谱嵌入的链接预测，基于图结构和关系路径特征的方法。

**知识检索与知识分析：**基于知识图谱的知识检索的实现形式主要包括语义检索和智能问答，知识图谱和语义技术也被用来辅助做数据分析与决策。

*   ## [](https://blog.csdn.net/kevinjin2011/article/details/124686668)知识图谱的构建

![Image 25](https://i-blog.csdnimg.cn/blog_migrate/5070670958c77d968c40bac773774077.jpeg)

图2 知识图谱的构建流程

知识图谱的构建方式主要有两种，自顶向下（top-down）与自底向上（bottom-up）两种构建方式。

**自顶向下**：需要先定义好本体（schema）与数据模式，再将实体加入到知识库，基于输入数据完成信息抽取到图谱构建的过程。该构建方式需要利用一些现有的结构化知识库作为其基础知识库。适用于专业知识方面图谱的构建，比如企业知识图谱、面向领域专业用户使用。

**自底向上**：指的是从一些开放链接的数据中提取出置信度高的实体加入到知识库，再构建顶层的本体模式。更适合常识性知识，比如人名、机构名等通用知识图谱的构建。大多数知识图谱都采用自底向上的方式进行构建，其中最典型的就是Google的Knowledge  Vault 和微软的Satori知识库。这也符合互联网数据内容知识产生的特点。

*   ## [](https://blog.csdn.net/kevinjin2011/article/details/124686668)知识图谱的应用

知识图谱为互联网上海量、异构、动态的大数据表达、组织、管理以及利用提供了一种更为有效的方式，使得网络的智能化水平更高，更加接近于人类的认知思维。知识图谱的应用主要集中在**搜索和推荐领域**。如**语义搜索，智能推荐，知识存储，数据校验，专家系统，客服机器人**等。

### [](https://blog.csdn.net/kevinjin2011/article/details/124686668)（1） 语义搜索

当前基于关键词的搜索技术在KG的知识支持下可以上升到基于实体和关系的检索。它能准确捕捉用户搜索意图，解决关键字语义多样性及语义消歧难题，并且直接给出满足用户搜索意图的答案，而不是包含关键词的相关网页的链接。

![Image 26](https://i-blog.csdnimg.cn/blog_migrate/c883bf002871c23ca7f65f53866cf869.png)

图3 知识图谱在搜索引擎中的应用

### [](https://blog.csdn.net/kevinjin2011/article/details/124686668)（2）问答系统

问答系统是信息检索系统的一种高级形式，能够以准确简洁的自然语言为用户提供问题的解答。多数问答系统更倾向于将给定的问题分解为多个小的问题，然后逐一去知识库中抽取匹配的答案，并自动检测其在时间与空间上的吻合度等，最后将答案进行合并，以直观的方式展现给用户。

### [](https://blog.csdn.net/kevinjin2011/article/details/124686668)（3）智能推荐

除了优化搜索结果，知识图谱还可以帮助电商以及社交平台解决一些智能推荐问题。例如，当前一些中小平台在智能推荐方面最大的问题是“买了啥，推荐啥”或者“推荐的商品与客户无关联”。推荐商品缺乏新颖性，导致转化效果一般。

知识图谱可以帮助电商平台跳出这种简单的推荐逻辑，使得推荐结果更加智能化，促进用户购买。

_关注微信公众号【有梦想的程序星空】，了解软件系统和人工智能算法领域的前沿知识，让我们一起学习、一起进步吧！_

![Image 27](https://img-blog.csdnimg.cn/0e15d41f1cb64e8c82150ef8583165ad.jpeg)有梦想的程序星空 聚焦软件开发和人工智能算法领域，欢迎关注

![Image 28](https://g.csdnimg.cn/extension-box/2.0.4/image/weixin.png)微信公众号

![Image 29](https://g.csdnimg.cn/extension-box/2.0.4/image/ic_move.png)

本文章已经生成可运行项目 一键运行

 生成项目 ![Image 30: 查看更多](https://csdnimg.cn/release/blogv2/dist/pc/img/btnInscodeAiAskWhite.png)

[关注博主即可阅读全文![Image 31](https://csdnimg.cn/release/blogv2/dist/pc/img/arrowDownAttend.png)](https://blog.csdn.net/kevinjin2011/article/details/124686668)

![Image 32](https://csdnimg.cn/release/blogv2/dist/pc/img/vip-limited-close-newWhite.png)

 确定要放弃本次机会？ 

福利倒计时

_:_ _:_

![Image 33](https://csdnimg.cn/release/blogv2/dist/pc/img/vip-limited-close-roup.png)立减 ¥

普通VIP年卡可用

[立即使用](https://mall.csdn.net/vip)

[![Image 34](https://profile-avatar.csdnimg.cn/a78bf3d549024b5dacd03305e331d4c6_kevinjin2011.jpg!1) 有梦想的程序星空](https://blog.csdn.net/kevinjin2011)

[关注](javascript:;)[关注](https://blog.csdn.net/kevinjin2011/article/details/124686668)

*   [![Image 35](https://csdnimg.cn/release/blogv2/dist/pc/img/tobarThumbUpactive.png)![Image 36](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/like-active.png)![Image 37](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/like.png) 21](https://blog.csdn.net/kevinjin2011/article/details/124686668)点赞 
*   [![Image 38](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/unlike-active.png)![Image 39](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/unlike.png)](https://blog.csdn.net/kevinjin2011/article/details/124686668)踩 
*   [![Image 40](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/collect-active.png)![Image 41](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/collect.png)![Image 42](https://csdnimg.cn/release/blogv2/dist/pc/img/newCollectActive.png) 182](javascript:;) 收藏    觉得还不错?  一键收藏 ![Image 43](https://csdnimg.cn/release/blogv2/dist/pc/img/collectionCloseWhite.png)  
*   [![Image 44](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/comment.png) 2](https://blog.csdn.net/kevinjin2011/article/details/124686668#commentBox)评论 
*   [![Image 45](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/share.png)分享](javascript:;)[复制链接](https://blog.csdn.net/kevinjin2011/article/details/124686668) [分享到 QQ](https://blog.csdn.net/kevinjin2011/article/details/124686668) [分享到新浪微博](https://blog.csdn.net/kevinjin2011/article/details/124686668) ![Image 46](https://blog.csdn.net/kevinjin2011/article/details/124686668) ![Image 47](https://csdnimg.cn/release/blogv2/dist/pc/img/share/icon-wechat.png)扫一扫     
*   [![Image 48: 打赏](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/reward.png)打赏](javascript:;)打赏 
*   [![Image 49](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/more.png)](https://blog.csdn.net/kevinjin2011/article/details/124686668)[![Image 50: 打赏](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/reward.png)打赏](https://blog.csdn.net/kevinjin2011/article/details/124686668)[![Image 51](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/report.png)举报](https://blog.csdn.net/kevinjin2011/article/details/124686668) [![Image 52](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/report.png)举报](https://blog.csdn.net/kevinjin2011/article/details/124686668)  

[专栏目录](https://blog.csdn.net/kevinjin2011/article/details/124686668)

[_知识图谱_ 简介](https://blog.csdn.net/qq_27586341/article/details/93588720)

[满腹的小不甘](https://blog.csdn.net/qq_27586341)

06-25![Image 53](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 4万+ 

[1. 什么是 _知识图谱_ _知识图谱_ 的概念是由谷歌公司于2012年5月17日首次提出，旨在描述客观世界的概念、实体、事件及其之间的关系，并作为 _构建_ 下一代智能化搜索引擎的核心基础。通俗地讲，_知识图谱_ 就是把所有不同种类的信息连接在一起而得到的一个关系网络。_知识图谱_ 提供了从“关系”的角度去分析问题的能力。一个简单的 _知识图谱_ 如下图所示。 ...](https://blog.csdn.net/qq_27586341/article/details/93588720)

[_知识图谱_ 与语义理解原理与代码实战案例 _讲解_](https://dreamit.blog.csdn.net/article/details/139160768)

[东海陈光剑的博客：禅与计算机程序设计艺术](https://blog.csdn.net/universsky2015)

05-24![Image 54](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 651 

[_知识图谱_ 与语义理解原理与代码实战案例 _讲解_ 作者：禅与计算机程序设计艺术 1. 背景介绍 1.1 语义理解的挑战与机遇 在信息爆炸的时代，如何从海量数据中获取有价值的信息成为了各个领域共同面临的难题。传统的关键](https://dreamit.blog.csdn.net/article/details/139160768)

[](https://blog.csdn.net/kevinjin2011/article/details/124686668)

2 条评论 您还未登录，请先 登录 后发表或查看评论

[_知识图谱_ 综述_cyc _知识图谱_](https://blog.csdn.net/liangwqi/article/details/82225140)

6-26

[ Concept Graph是以概念层次体系为中心的 _知识图谱_。与Freebase等 _知识图谱_ 不同,Concept Gra...](https://blog.csdn.net/liangwqi/article/details/82225140)

[_知识图谱_ _构建_ 解析](https://blog.csdn.net/Class_guy/article/details/79152987)

6-12

[_知识图谱_ 主要有自顶向下 _(_ top-down _)_ 与自底向上 _(_ bottom-up _)_ 两种 _构建_ 方式。自顶向下指的是先...](https://blog.csdn.net/Class_guy/article/details/79152987)

[一文读懂什么是 _知识图谱_（Knowledge Graph）](https://blog.csdn.net/liwenxiang629/article/details/146938371)

[liwenxiang629的博客](https://blog.csdn.net/liwenxiang629)

04-07![Image 55](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 9201 

[_知识图谱_（Knowledge Graph）是一种用图结构表示知识和关系的 _技术_，通过节点（实体）和边（关系）_构建_ 语义网络，旨在将分散的数据转化为机器可理解、可推理的知识体系。其核心目标是解决数据的 语义关联 和 复杂关系推理 问题。节点代表实体（如人物、地点、事件），边表示实体间的关系（如“出生于”“属于”）。](https://blog.csdn.net/liwenxiang629/article/details/146938371)

[_知识图谱_（Knowledge Graph）详解](https://blog.csdn.net/sweet_ran/article/details/152516372)

[sweet_ran的博客](https://blog.csdn.net/sweet_ran)

10-04![Image 56](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 6323 

[_知识图谱_ 是一种以图结构节点（Node）表示实体（如人物、地点、事件、概念等）边（Edge）表示实体之间的关系（如“出生于”、“属于”、“是……的作者”等）每个节点还可以拥有多个属性（如姓名、出生日期、职业等）[张艺谋] ——_(_ 导演 _)_——> [《英雄》][《英雄》] ——_(_ 主演 _)_——> [李连杰][李连杰] ——_(_ 国籍 _)_——> [中国]这种结构使得机器不仅能“知道”信息，还能“理解”信息之间的逻辑联系。_知识图谱_ 不仅是AI时代的“大脑”，更是连接人类智慧与机器智能的桥梁。从原始数据出发，经过。](https://blog.csdn.net/sweet_ran/article/details/152516372)

[【_知识图谱_】 一个有效的 _知识图谱_ 是如何 _构建_ 的?_公司如何形成 _知识图谱_-C...](https://blog.csdn.net/np4rHI455vg29y2/article/details/79831288)

6-9

[_知识图谱_ 的 _构建_ 过程包括本体建模、知识抽取、知识融合、知识存储、知识推理这几个步骤。 1 本体建模 就鲍立飞而言,_构建_ 本体的目的是识别、描述和表示相关领域的知识,提供对该领域知识的共同理解,确定领域内共同认可的对象模型,并从不同层次的形式化模式上给出了这些对象和对象间相互关系的明确定义。本体描述了 _知识图谱_...](https://blog.csdn.net/np4rHI455vg29y2/article/details/79831288)

[通俗易懂解释 _知识图谱_ _(_ Knowledge Graph _)_](https://blog.csdn.net/qq_38403590/article/details/116585997)

6-12

[的聊天机器人、大数据风控、证券投资、智能医疗、自适应教育、推荐系统,无一不跟 _知识图谱_...](https://blog.csdn.net/qq_38403590/article/details/116585997)

[_技术_ 图谱 _构建_ 实战：从知识网络到架构决策的完整指南 最新发布](https://blog.csdn.net/weixin_26750831/article/details/160605631)

[weixin_26750831的博客](https://blog.csdn.net/weixin_26750831)

04-28![Image 57](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 519 

[_知识图谱_ 作为一种结构化的知识表示方法，通过将实体、属性及其关系进行网络化建模，实现了对复杂信息的有效组织与推理。其核心原理在于利用图数据模型，将离散的知识点连接成网，从而揭示数据背后的深层关联与模式。这一 _技术_ 为知识管理、智能推荐和决策支持等领域带来了巨大价值，尤其在 _技术_ 领域，它能将碎片化的工具、框架和最佳实践系统化。_应用_ 场景广泛，从个人学习路径规划到企业级 _技术_ 栈治理都不可或缺。本文聚焦于 _技术_ 图谱的工程化实践，详细阐述了如何利用图数据库（如Neo4j）和自动化采集工具，_构建_ 一个能反映 _技术_ 生态动态、辅助架构选型](https://blog.csdn.net/weixin_26750831/article/details/160605631)

[【AI知识点】_知识图谱_（Knowledge Graph）](https://blog.csdn.net/weixin_43221845/article/details/142915622)

[AI完全体](https://blog.csdn.net/weixin_43221845)

10-14![Image 58](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 5898 

[_知识图谱_（Knowledge Graph） 是一种用于组织、存储和表示知识的结构化数据模型，它通过实体（entities） 和实体之间的关系（relationships） _构建_ 一个网络，展示现实世界中各种概念及其相互关系。_知识图谱_ 能够将不同领域的数据和信息整合到一起，形成知识网络，从而帮助机器进行更智能的决策、推理和查询。](https://blog.csdn.net/weixin_43221845/article/details/142915622)

[_知识图谱_ 入门笔记](https://blog.csdn.net/Moliay/article/details/140191096)

6-20

[_知识图谱_ _(_ Knowledge graph _)_:由结点和边组成,是结构化的语义知识库。 结点可以是实体,如一...](https://blog.csdn.net/Moliay/article/details/140191096)

[_知识图谱_ _构建_ 概念、工具、实例调研_ _知识图谱_ _构建_ 工具](https://blog.csdn.net/weixin_40325675/article/details/143870065)

6-14

[_知识图谱_ 的 _构建_ 方法主要有两种:自底向上和自顶而下。 1.开放域 _知识图谱_ 的本体 _构建_ 通常用自底向上的方法,自动地从 _知识图谱_ 中抽取概念、概念层次和概念之间的关系。 2.领域 _知识图谱_ 多采用自顶向下的方法来 _构建_ 本体。一方面,相对于开放域 _知识图谱_,领域 _知识图谱_ 涉及的概念和范围都是固定或者可控的;另一方面,对于领域知识...](https://blog.csdn.net/weixin_40325675/article/details/143870065)

[全网最全 _知识图谱_ _讲解_！](https://blog.csdn.net/qq_41604676/article/details/133135168)

[创邻科技](https://blog.csdn.net/qq_41604676)

09-21![Image 59](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 5162 

[_知识图谱_ 标准化白皮书定义：_知识图谱_（Knowledge Graph）以结构化的形式描述客观世界中概念、实体及其关系，将互联网的信息表达成更接近人类认知世界的形式，提供了一种更好地组织、管理和理解互联网海量信息的能力。简单讲，_知识图谱_ 由节点（point）和边（edge）组成，每个节点表示一个实体，实体可以指客观世界中的人、事、物，每条边表示一种关系，关系可以表达不同实体间的联系。本质上，_知识图谱_ 可以理解为以图结构存储的语义网络。](https://blog.csdn.net/qq_41604676/article/details/133135168)

[浅析 _知识图谱_（Knowledge Graph）](https://devpress.csdn.net/v1/article/detail/143209436)

[ZKYX_AI的博客](https://blog.csdn.net/ZKYX_AI)

10-24![Image 60](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 9067 

[从一开始的Google搜索，到现在的聊天机器人、大数据风控、证券投资、智能医疗、自适应教育、推荐系统，无一不跟 _知识图谱_ 相关。它在 _技术_ 领域的热度也在逐年上升。本文以通俗易懂的方式来 _讲解_ _知识图谱_ 相关的知识、尤其对从零开始搭建 _知识图谱_ 过程当中需要经历的步骤以及每个阶段需要考虑的问题都给予了比较详细的解释。_知识图谱_（ Knowledge Graph）的概念由谷歌2012年正式提出，旨在实现更智能的搜索引擎，并且于2013年以后开始在学术界和业界普及。目前，随着智能信息服务 _应用_ 的不断发展，_知识图谱_ 已被广泛 _应用_ 于。](https://devpress.csdn.net/v1/article/detail/143209436)

[【科普】快速学习 _知识图谱_](https://blog.csdn.net/m0_52784465/article/details/144152232)

6-3

[_知识图谱_ _(_ Knowledge Graph _)_ 以结构化的形式描述客观世界中概念、实体及其关系。是融合了认知计...](https://blog.csdn.net/m0_52784465/article/details/144152232)

[_知识图谱_ _构建_ _ _知识图谱_ 怎么 _构建_](https://blog.csdn.net/m0_64531791/article/details/142965618)

5-28

[1._知识图谱_ 简介:_知识图谱_ 是一种揭示实体之间关系的语义网络,可以对现实世界的事物及其相互...](https://blog.csdn.net/m0_64531791/article/details/142965618)

[通俗易懂解释 _知识图谱_（Knowledge Graph）](https://devpress.csdn.net/v1/article/detail/113859090)

[sjyisdog的博客](https://blog.csdn.net/sjyisdog)

02-19![Image 61](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 5797 

[1. 前言 从一开始的Google搜索，到现在的聊天机器人、大数据风控、证券投资、智能医疗、自适应教育、推荐系统，无一不跟 _知识图谱_ 相关。它在 _技术_ 领域的热度也在逐年上升。 本文以通俗易懂的方式来 _讲解_ _知识图谱_ 相关的知识、尤其对从零开始搭建 _知识图谱_ 过程当中需要经历的步骤以及每个阶段需要考虑的问题都给予了比较详细的解释。 _知识图谱_（ Knowledge Graph）的概念由谷歌2012年正式提出，旨在实现更智能的搜索引擎，并且于2013年以后开始在学术界和业界普及。目前，随着智能信息服务 _应用_ 的不断发展，_知识图谱_.](https://devpress.csdn.net/v1/article/detail/113859090)

[_知识图谱_ _技术_ 学习笔记](https://sulinyn.blog.csdn.net/article/details/87919052)

[AcceptedLin的博客](https://blog.csdn.net/u013185349)

02-25![Image 62](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 2359 

[_知识图谱_ _技术_ 学习笔记 从一开始的Google搜索，到现在的聊天机器人、大数据风控、证券投资、智能医疗、自适应教育、推荐系统，无一不跟 _知识图谱_ 相关。它在 _技术_ 领域的热度也在逐年上升。 本文以通俗易懂的方式来 _讲解_ _知识图谱_ 相关的知识、尤其对从零开始搭建 _知识图谱_ 过程当中需要经历的步骤以及每个阶段需要考虑的问题都给予了比较详细的解释。 ...](https://sulinyn.blog.csdn.net/article/details/87919052)

[_知识图谱_ 关键 _技术_ 与 _应用_ 案例](https://gitchat.blog.csdn.net/article/details/83784719)

[GitChat](https://blog.csdn.net/valada)

11-06![Image 63](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 2万+ 

[本课程从 _知识图谱_ 的历史由来开展，讲述 _知识图谱_ 与 _人工智能_ 的关系与现状；_知识图谱_ 辐射至各行业领域的 _应用_；在 _知识图谱_ 关键 _技术_ 概念与工具的实践 _应用_ 中，本课程也会 _讲解_ _知识图谱_ 的 _构建_ 经验；以及达观在各行业领域系统中的产品开发和系统 _应用_。 报名地址： https://edu.csdn.net/huiyiCourse/detail/844 作者简介：桂洪冠，达观数据联合创始人，中国计算机学会 CCF 会员，自然...](https://gitchat.blog.csdn.net/article/details/83784719)

[_知识图谱_ _构建_ 全流程](https://zengxiaojian.blog.csdn.net/article/details/125641593)

[强化学习曾小健](https://blog.csdn.net/sinat_37574187)

07-06![Image 64](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 7万+ 

[_知识图谱_，是结构化的语义知识库，用于迅速描述物理世界中的概念及其相互关系，通过 _知识图谱_ 能够将Web上的信息、数据以及链接关系聚集为知识，使信息资源更易于计算、理解以及评价，并能实现知识的快速响应和推理。当下 _知识图谱_ 已在工业领域得到了广泛 _应用_，如搜索领域的Google搜索、百度搜索，社交领域的领英经济图谱，企业信息领域的天眼查企业图谱，电商领域的淘宝商品图谱，O2O领域的美团知识大脑，医疗领域的丁香园 _知识图谱_，以及工业制造业 _知识图谱_ 等。在 _知识图谱_ _技术_ 发展初期，很多企业和科研机构会采用自顶向下的方式 _构建_ 基础知识](https://zengxiaojian.blog.csdn.net/article/details/125641593)

[_知识图谱_ 实战导论：从什么是KG到LLM与KG/DB的结合实战](https://blog.csdn.net/v_JULY_v/article/details/132916269)

[结构之法 算法之道](https://blog.csdn.net/v_JULY_v)

09-16![Image 65](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 1万+ 

[DB-GPT基于 FastChat _构建_ 大模型运行环境，并提供 vicuna 作为基础的大语言模型。此外，通过LangChain提供私域知识库问答能力，且有统一的数据向量化存储与索引：提供一种统一的方式来存储和索引各种数据类型，同时支持插件模式，在设计上原生支持Auto-GPT插件，具备以下功能或能力根据自然语言对话生成分析图表、生成SQL与数据库元数据信息进行对话, 生成准确SQL语句与数据对话, 直接查看执行结果。](https://blog.csdn.net/v_JULY_v/article/details/132916269)

[_构建_ _知识图谱_ 之二（_知识图谱_ _构建_ _技术_）](https://blog.csdn.net/tomlone/article/details/144673039)

[tomlone的专栏](https://blog.csdn.net/tomlone)

12-23![Image 66](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 1133 

[_构建_ _知识图谱_（_知识图谱_ _构建_ _技术_）](https://blog.csdn.net/tomlone/article/details/144673039)

[_知识图谱_ 全 _讲解_ + 电商 _应用_ 场景](https://blog.csdn.net/randompeople/article/details/89426073)

[笔记小屋](https://blog.csdn.net/randompeople)

04-26![Image 67](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 1万+ 

[前言 读研的时候了解过 _知识图谱_，现在想总结出来，方便自己和他人，本文章会从一下几个方面来 _讲解_ _知识图谱_： 什么是 _知识图谱_ 如何 _构建_ _知识图谱_ 现有的 _知识图谱_ _知识图谱_ 的 _应用_ _知识图谱_ 的发展 什么是 _知识图谱_ _知识图谱_ 是谷歌在2012年提出来的，主要是为了解决谷歌搜索方面的问题，以前的搜索都是基于搜索关键词得到网页的信息，比如搜索“姚明的年龄”，得到的全是跟姚明有关的新闻、网页、等等，这些内容包含了一...](https://blog.csdn.net/randompeople/article/details/89426073)

[KG-_知识图谱_](https://blog.csdn.net/u010451780/article/details/108333993)

[u010451780的专栏](https://blog.csdn.net/u010451780)

09-01![Image 68](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 1622 

[https://www.cnblogs.com/huangyc/p/10043749.html 1. 通俗易懂解释 _知识图谱_（Knowledge Graph） 完整机器学习实现代码GitHub 欢迎转载，转载请注明出处https://www.cnblogs.com/huangyc/p/10043749.html 欢迎沟通交流： 339408769@qq.com 0. 目录 1. 前言 2. _知识图谱_ 定义 3. 数据类型和存储方式 4. _知识图谱_ 的架构 4.1 逻辑架构 4.2 _技术_ 架](https://blog.csdn.net/u010451780/article/details/108333993)

[_知识图谱_ _(_ 6 _)_ 基于KG _构建_ 问答系统](https://blog.csdn.net/qq_40943760/article/details/133305270)

[白景屹的博客](https://blog.csdn.net/qq_40943760)

09-26![Image 69](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 850 

[_知识图谱_ _(_ 6 _)_ 基于KG的QA](https://blog.csdn.net/qq_40943760/article/details/133305270)

[_知识图谱_：_知识图谱_ 概述（一）](https://devpress.csdn.net/v1/article/detail/140571983)

[qq_50086023的博客](https://blog.csdn.net/qq_50086023)

07-22![Image 70](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 9753 

[_知识图谱_ 概述学习](https://devpress.csdn.net/v1/article/detail/140571983)

[什么是 _知识图谱_？](https://devpress.csdn.net/v1/article/detail/125645204)

[cuguanren的博客](https://blog.csdn.net/cuguanren)

07-06![Image 71](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 6万+ 

[笔者总结网上关于 _知识图谱_ 的相关资料并总结了一些基本概念，对于想了解这一概念的读者提供了一个新手入门的视角。](https://devpress.csdn.net/v1/article/detail/125645204)

[_知识图谱_ _构建_（概念，工具，实例调研） 热门推荐](https://xushuai.blog.csdn.net/article/details/109257727)

[AIGC Studio：分享AIGC前沿知识和好玩应用，公众号同名。](https://blog.csdn.net/xs1997)

10-24![Image 72](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 8万+ 

[_知识图谱_（Knowledge graph）_知识图谱_ 是一种用图模型来描述知识和建模世界万物之间的关联关系的 _技术_ 方法。_知识图谱_ 由节点和边组成。节点可以是实体，如一个人、一本书等，或是抽象的概念，如 _人工智能_、_知识图谱_ 等。边可以是实体的属性，如姓名、书名或是实体之间的关系，如朋友、配偶。_知识图谱_ 的早期理念来自Semantic Web（语义网络），其最初理想是把基于文本链接的万维网落转化为基于实体链接的语义网络。](https://xushuai.blog.csdn.net/article/details/109257727)

*   [关于我们](https://www.csdn.net/company/index.html#about)
*   [招贤纳士](https://www.csdn.net/company/index.html#recruit)
*   [商务合作](https://fsc-p05.txscrm.com/T8PN8SFII7W)
*   [寻求报道](https://marketing.csdn.net/questions/Q2202181748074189855)
*   ![Image 73](https://g.csdnimg.cn/common/csdn-footer/images/tel.png)400-660-0108
*   ![Image 74](https://g.csdnimg.cn/common/csdn-footer/images/email.png)[kefu@csdn.net](mailto:webmaster@csdn.net)
*   ![Image 75](https://g.csdnimg.cn/common/csdn-footer/images/cs.png)[在线客服](https://csdn.s2.udesk.cn/im_client/?web_plugin_id=29181)
*    工作时间 8:30-22:00 

*   ![Image 76](https://g.csdnimg.cn/common/csdn-footer/images/badge.png)[公安备案号11010502030143](http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502030143)
*   [京ICP备19004658号](http://beian.miit.gov.cn/publish/query/indexFirst.action)
*   [京网文〔2020〕1039-165号](https://csdnimg.cn/release/live_fe/culture_license.png)
*   [经营性网站备案信息](https://csdnimg.cn/cdn/content-toolbar/csdn-ICP.png)
*   [北京互联网违法和不良信息举报中心](http://www.bjjubao.org/)
*   [家长监护](https://download.csdn.net/tutelage/home)
*   [网络110报警服务](https://cyberpolice.mps.gov.cn/)
*   [中国互联网举报中心](http://www.12377.cn/)
*   [Chrome商店下载](https://chrome.google.com/webstore/detail/csdn%E5%BC%80%E5%8F%91%E8%80%85%E5%8A%A9%E6%89%8B/kfkdboecolemdjodhmhmcibjocfopejo?hl=zh-CN)
*   [账号管理规范](https://blog.csdn.net/blogdevteam/article/details/126135357)
*   [版权与免责声明](https://www.csdn.net/company/index.html#statement)
*   [版权申诉](https://blog.csdn.net/blogdevteam/article/details/90369522)
*   [出版物许可证](https://img-home.csdnimg.cn/images/20250103023206.png)
*   [营业执照](https://img-home.csdnimg.cn/images/20250103023201.png)
*   ©1999-2026北京创新乐知网络技术有限公司

[![Image 77](https://profile-avatar.csdnimg.cn/a78bf3d549024b5dacd03305e331d4c6_kevinjin2011.jpg!1)](https://blog.csdn.net/kevinjin2011)[![Image 78](https://csdnimg.cn/release/blogv2/dist/mobile/img/vipIcon.png)](https://blog.csdn.net/kevinjin2011)

[有梦想的程序星空](https://blog.csdn.net/kevinjin2011 "有梦想的程序星空")

博客等级 ![Image 79](https://csdnimg.cn/identity/blog5.png)

码龄10年

![Image 80](https://i-operation.csdnimg.cn/images/b6e4d056bf60411fb3dca60bc68c7b39.png)优质创作者: 人工智能技术领域

[110 原创](https://blog.csdn.net/kevinjin2011)1415 点赞 6679 收藏 12万+粉丝

[关注](https://blog.csdn.net/kevinjin2011/article/details/124686668)

[私信](https://im.csdn.net/chat/kevinjin2011)

### 更多优质【一键运行】博文

*   [1 阿里开源ViT图像识别：餐厅菜品自动识别系统](https://blog.csdn.net/weixin_42602241/article/details/158163630)
*   [2 ESP32 Arduino平台可用的Modbus RTU主站通信库，含SDM630读取示例与完整协议文档](https://blog.csdn.net/r2s3t4/article/details/161912671)
*   [3 ModelArts平台打卡体验活动-使用mindspore自定义数据集搭建CNN实现猫狗分类](https://blog.csdn.net/weixin_73838412/article/details/144334737)
*   [4 MATLAB离线版Arduino工具箱：含Uno/Mega/Nano主控及BNO055、电机驱动板、CAN模块等硬件驱动](https://blog.csdn.net/water/article/details/161915707)
*   [5 COMSOL中P2D电化学-热耦合模型：同步模拟SEI增长与锂枝晶演化对电池温升和性能衰退的影响](https://blog.csdn.net/prometheus9mon/article/details/161915357)

[查看更多 ![Image 81: 查看更多](https://csdnimg.cn/release/blogv2/dist/pc/img/runBlogWhite.png)](https://blog.csdn.net/rank/list/blog_project)

### TA的精选

*   [新【入门】一文搞懂 Flume+Kafka+ZooKeeper：概念关系与 CentOS 7 完整部署指南](https://blog.csdn.net/kevinjin2011/article/details/162395446)
189 阅读

*   [新【入门】Hadoop 生态圈技术栈入门：9 大组件全解析](https://blog.csdn.net/kevinjin2011/article/details/162171451)
377 阅读

*   [热【CNN】深入浅出讲解卷积神经网络（介绍、结构、原理）](https://blog.csdn.net/kevinjin2011/article/details/124944728)
104875 阅读

*   [热【RNN】深入浅出讲解循环神经网络（介绍、原理）](https://blog.csdn.net/kevinjin2011/article/details/125069293)
69110 阅读

*   [热【分布函数】详解常用的分布函数（均匀分布、正态分布、泊松分布等）](https://blog.csdn.net/kevinjin2011/article/details/125370878)
64719 阅读

[查看更多 ![Image 82](https://csdnimg.cn/release/blogv2/dist/pc/img/commentArrowRightWhite.png)](https://blog.csdn.net/kevinjin2011?type=blog)

### 大家在看

*   [Token Studio：本地AI编程ROI复盘系统 ![Image 83](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png)480](https://blog.csdn.net/2401_87875091/article/details/162238522)
*   [AXI协议核心机制详解](https://blog.csdn.net/liuluyang530/article/details/162430923)
*   [LangGraph状态管理详解](https://blog.csdn.net/2302_80130040/article/details/162430791)
*   [C# WinForms图表控件详解](https://blog.csdn.net/aoyanan/article/details/162430260)
*   [VLLMService Operator 部署与模型服务验证](https://blog.csdn.net/weixin_44349426/article/details/162428210)

### TA的历史创作历程

[2026年 6篇](https://blog.csdn.net/kevinjin2011?type=blog&year=2026&month=06)

[2024年 17篇](https://blog.csdn.net/kevinjin2011?type=blog&year=2024&month=11)

[2023年 22篇](https://blog.csdn.net/kevinjin2011?type=blog&year=2023&month=04)

[2022年 44篇](https://blog.csdn.net/kevinjin2011?type=blog&year=2022&month=10)

[2021年 4篇](https://blog.csdn.net/kevinjin2011?type=blog&year=2021&month=02)

[2020年 16篇](https://blog.csdn.net/kevinjin2011?type=blog&year=2020&month=04)

[2018年 1篇](https://blog.csdn.net/kevinjin2011?type=blog&year=2018&month=03)

### 分类专栏

*   [![Image 84](https://i-blog.csdnimg.cn/blog_column_migrate/758088d2b247c99cd196d5478792b049.png?x-oss-process=image/resize,m_fixed,h_64,w_64) 深入浅出讲解自然语言处理](https://blog.csdn.net/kevinjin2011/category_9797399.html)43篇
*   [![Image 85](https://i-blog.csdnimg.cn/blog_column_migrate/758088d2b247c99cd196d5478792b049.png?x-oss-process=image/resize,m_fixed,h_64,w_64) Python开发教程](https://blog.csdn.net/kevinjin2011/category_9795376.html)35篇
*   [![Image 86](https://i-blog.csdnimg.cn/blog_column_migrate/13b2b4fad44a5c4b43dcb18fe7fa46b8.png?x-oss-process=image/resize,m_fixed,h_64,w_64) Java开发教程](https://blog.csdn.net/kevinjin2011/category_7516249.html)12篇
*   [![Image 87](https://i-blog.csdnimg.cn/columns/default/20201014180756919.png?x-oss-process=image/resize,m_fixed,h_64,w_64) 机器学习](https://blog.csdn.net/kevinjin2011/category_9804456.html)12篇
*   [![Image 88](https://i-blog.csdnimg.cn/columns/default/20201014180756922.png?x-oss-process=image/resize,m_fixed,h_64,w_64) 项目实战](https://blog.csdn.net/kevinjin2011/category_13175440.html)6篇
*   [![Image 89](https://i-blog.csdnimg.cn/columns/default/20201014180756780.png?x-oss-process=image/resize,m_fixed,h_64,w_64) Vue前端开发教程](https://blog.csdn.net/kevinjin2011/category_13178363.html)2篇
*   [![Image 90](https://i-blog.csdnimg.cn/columns/default/20201014180756919.png?x-oss-process=image/resize,m_fixed,h_64,w_64) 解决方案](https://blog.csdn.net/kevinjin2011/category_9809912.html)9篇
*   [![Image 91](https://i-blog.csdnimg.cn/columns/default/20201014180756930.png?x-oss-process=image/resize,m_fixed,h_64,w_64) 深度学习](https://blog.csdn.net/kevinjin2011/category_9815907.html)2篇
*   [![Image 92](https://i-blog.csdnimg.cn/columns/default/20201014180756913.png?x-oss-process=image/resize,m_fixed,h_64,w_64) 大数据与云计算](https://blog.csdn.net/kevinjin2011/category_11898570.html)4篇
*   [![Image 93](https://i-blog.csdnimg.cn/blog_column_migrate/f9e5dc48891ae58afd67623c027982e4.png?x-oss-process=image/resize,m_fixed,h_64,w_64) Flask后端开发](https://blog.csdn.net/kevinjin2011/category_9812764.html)2篇
*   [![Image 94](https://i-blog.csdnimg.cn/columns/default/20201014180756923.png?x-oss-process=image/resize,m_fixed,h_64,w_64) HTML5与jQuery教程](https://blog.csdn.net/kevinjin2011/category_11912788.html)5篇
*   [![Image 95](https://i-blog.csdnimg.cn/columns/default/20201014180756925.png?x-oss-process=image/resize,m_fixed,h_64,w_64) Android开发教程](https://blog.csdn.net/kevinjin2011/category_11827825.html)4篇

[展开全部![Image 96](https://csdnimg.cn/release/blogv2/dist/pc/img/arrowup-line-bot-White.png)](https://blog.csdn.net/kevinjin2011/article/details/124686668)[收起![Image 97](https://csdnimg.cn/release/blogv2/dist/pc/img/arrowup-line-top-White.png)](https://blog.csdn.net/kevinjin2011/article/details/124686668)

 上一篇： [python对list列表进行排序方法总结](https://blog.csdn.net/kevinjin2011/article/details/124629379) 下一篇： [【实体识别】深入浅出讲解命名实体识别（介绍、常用算法）](https://blog.csdn.net/kevinjin2011/article/details/124691670)

### 目录

1.   [知识图谱的背景](https://blog.csdn.net/kevinjin2011/article/details/124686668#t0)
2.   [知识图谱的定义和三要素](https://blog.csdn.net/kevinjin2011/article/details/124686668#t1)
3.   [知识图谱的分类](https://blog.csdn.net/kevinjin2011/article/details/124686668#t2)
4.   [知识图谱的技术流程](https://blog.csdn.net/kevinjin2011/article/details/124686668#t3)
5.   [知识图谱的构建](https://blog.csdn.net/kevinjin2011/article/details/124686668#t4)
6.   [知识图谱的应用](https://blog.csdn.net/kevinjin2011/article/details/124686668#t5)
7.       1.   [（1）语义搜索](https://blog.csdn.net/kevinjin2011/article/details/124686668#t6)
    2.   [（2）问答系统](https://blog.csdn.net/kevinjin2011/article/details/124686668#t7)
    3.   [（3）智能推荐](https://blog.csdn.net/kevinjin2011/article/details/124686668#t8)

展开全部![Image 98](https://csdnimg.cn/release/blogv2/dist/pc/img/arrowup-line-bot-White.png)

收起![Image 99](https://csdnimg.cn/release/blogv2/dist/pc/img/arrowup-line-top-White.png)

![Image 100](https://cdn-static.gitcode.com/static/images/gitcode-ai-logo-dark_atomgit.png)新一代人工智能开源社区

![Image 101: gift](https://cdn-static.gitcode.com/gitcode-quick-app-fe/points-card.gif)

首次登录/注册领取 200万 Token

企业级模型推理API服务

· 支持以下模型使用 ·

![Image 102: DeepSeek-V3.1-Base](https://cdn-static-cache.gitcode.com/gitcode-quick-app-components-fe/deepseek.png)DeepSeek

![Image 103: Kimi-K2-Instruct](https://cdn-static-cache.gitcode.com/gitcode-quick-app-components-fe/kimi.png)Kimi

![Image 104: Qwen-Image](https://cdn-static-cache.gitcode.com/gitcode-quick-app-components-fe/qwen.png)Qwen

限时领取

登录后您可以享受以下权益：

*   ![Image 105](blob:http://localhost/e891c3a7c1a92038da15617ead1c0096)免费复制代码
*   ![Image 106](blob:http://localhost/3d84693e43989ca72c63590d38052fc8)和博主大V互动
*   ![Image 107](blob:http://localhost/a746ba3bd4746d1ec8acd6b5071ccf00)下载海量资源
*   ![Image 108](blob:http://localhost/7cd6e3cbe7e0076d0b9199193b4b832d)发动态/写文章/加入社区

×立即登录

评论 2

![Image 109](https://csdnimg.cn/release/blogv2/dist/pc/img/closeBt.png)

![Image 110](https://csdnimg.cn/release/blogv2/dist/pc/img/commentArrowLeftWhite.png)被折叠的 条评论 [为什么被折叠?](https://blogdev.blog.csdn.net/article/details/122245662)[![Image 111](https://csdnimg.cn/release/blogv2/dist/pc/img/iconPark.png)到【灌水乐园】发言](https://bbs.csdn.net/forums/FreeZone)

[查看更多评论![Image 112](https://csdnimg.cn/release/blogv2/dist/pc/img/commentArrowDownWhite.png)](https://blog.csdn.net/kevinjin2011/article/details/124686668)

 添加红包 [](https://blog.csdn.net/kevinjin2011/article/details/124686668)

祝福语 

[](https://blog.csdn.net/kevinjin2011/article/details/124686668)

请填写红包祝福语或标题

红包数量 

个

红包个数最小为10个

红包总金额 

元

红包金额最低5元

余额支付 

 当前余额 3.43 元 [前往充值 >](https://i.csdn.net/#/wallet/balance/recharge)

 需支付：10.00 元 

取消 确定

![Image 113](https://blog.csdn.net/kevinjin2011/article/details/124686668)

成就一亿技术人!

 领取后你会自动成为博主和红包主的粉丝 [规则](https://blogdev.blog.csdn.net/article/details/128932621)

[![Image 114](https://profile-avatar.csdnimg.cn/default.jpg!2)](https://blog.csdn.net/kevinjin2011/article/details/124686668)

hope_wisdom

 发出的红包 

打赏作者![Image 115](https://csdnimg.cn/release/blogv2/dist/pc/img/closeBt.png)

[![Image 116](https://profile-avatar.csdnimg.cn/a78bf3d549024b5dacd03305e331d4c6_kevinjin2011.jpg!1)](https://blog.csdn.net/kevinjin2011)
有梦想的程序星空

你的鼓励将是我创作的最大动力

¥1¥2¥4¥6¥10¥20

扫码支付：¥1

![Image 117](https://csdnimg.cn/release/blogv2/dist/pc/img/pay-time-out.png)获取中

![Image 118](https://csdnimg.cn/release/blogv2/dist/pc/img/newWeiXin.png)![Image 119](https://csdnimg.cn/release/blogv2/dist/pc/img/newZhiFuBao.png)扫码支付

您的余额不足，请更换扫码支付或[充值](https://i.csdn.net/#/wallet/balance/recharge?utm_source=RewardVip)

[打赏作者](https://blog.csdn.net/kevinjin2011/article/details/124686668)

实付 元

[使用余额支付](javascript:;)

![Image 120](https://csdnimg.cn/release/blogv2/dist/pc/img/pay-time-out.png)点击重新获取

![Image 121](https://csdnimg.cn/release/blogv2/dist/pc/img/weixin.png)![Image 122](https://csdnimg.cn/release/blogv2/dist/pc/img/zhifubao.png)![Image 123](https://csdnimg.cn/release/blogv2/dist/pc/img/jingdong.png)扫码支付

钱包余额 0

![Image 124](https://csdnimg.cn/release/blogv2/dist/pc/img/pay-help.png)

抵扣说明：

1.余额是钱包充值的虚拟货币，按照1:1的比例进行支付金额的抵扣。

 2.余额无法直接购买下载，可以购买VIP、付费专栏及课程。

[![Image 125](https://csdnimg.cn/release/blogv2/dist/pc/img/recharge.png)余额充值](https://i.csdn.net/#/wallet/balance/recharge)

![Image 126](https://blog.csdn.net/kevinjin2011/article/details/124686668)

确定 取消![Image 127](https://csdnimg.cn/release/blogv2/dist/pc/img/closeBt.png)

×

本文章已经生成可运行项目

一键运行 

举报

![Image 128](https://csdnimg.cn/release/blogv2/dist/pc/img/closeBlack.png)

选择你想要举报的内容（必选）

*   内容涉黄
*   政治相关
*   内容抄袭
*   涉嫌广告
*   内容侵权
*   侮辱谩骂
*   样式问题
*   其他

原文链接（必填）

请选择具体原因（必选）

*   包含不实信息
*   涉及个人隐私

请选择具体原因（必选）

*   侮辱谩骂
*   诽谤

请选择具体原因（必选）

*   搬家样式
*   博文样式

补充说明（选填）

取消

确定

[![Image 129](https://csdnimg.cn/release/blogv2/dist/pc/img/toolbar/Group.png)点击体验 DeepSeekR1满血版](https://ai.csdn.net/chat?utm_source=cknow_pc_blogdetail&spm=1001.2101.3001.10583)[![Image 130](https://g.csdnimg.cn/side-toolbar/3.6/images/mobile.png) 下载APP ![Image 131: 程序员都在用的中文IT技术交流社区](https://g.csdnimg.cn/side-toolbar/3.6/images/qr_app.png) 程序员都在用的中文IT技术交流社区 公众号 ![Image 132: 专业的中文 IT 技术社区，与千万技术人共成长](https://g.csdnimg.cn/side-toolbar/3.6/images/qr_wechat.png) 专业的中文 IT 技术社区，与千万技术人共成长 视频号 ![Image 133: 关注【CSDN】视频号，行业资讯、技术分享精彩不断，直播好礼送不停！](https://g.csdnimg.cn/side-toolbar/3.6/images/qr_video.png) 关注【CSDN】视频号，行业资讯、技术分享精彩不断，直播好礼送不停！](https://blog.csdn.net/kevinjin2011/article/details/124686668)[![Image 134](https://g.csdnimg.cn/side-toolbar/3.6/images/customer.png)客服](https://blog.csdn.net/kevinjin2011/article/details/124686668)

新手引导

[![Image 135](https://g.csdnimg.cn/side-toolbar/3.6/images/totop.png)返回顶部](https://blog.csdn.net/kevinjin2011/article/details/124686668)

微信公众号![Image 136](https://g.csdnimg.cn/extension-box/2.0.4/image/ic_close.png)

![Image 137](https://img-blog.csdnimg.cn/ab9608e5948f44ea9071342904710280.jpeg)公众号名称：有梦想的程序星空 微信扫码关注或搜索公众号名称

复制公众号名称

[![Image 138](https://csdnimg.cn/release/blogv2/dist/pc/img/quoteClose1White.png)](https://blog.csdn.net/kevinjin2011/article/details/124686668)

![Image 139](https://i-blog.csdnimg.cn/blog_migrate/24cd3cd1739578aad98885afe405b3f1.png)

![Image 140](https://i-blog.csdnimg.cn/blog_migrate/a97bbe6f56b42202014b395d5b538055.png)

![Image 141](https://i-blog.csdnimg.cn/blog_migrate/a6903682cdc71d388834fa116059d789.png)

![Image 142](https://i-blog.csdnimg.cn/blog_migrate/7504c8fd23c1a0819bcd833d69d52c8c.png)

![Image 143](https://i-blog.csdnimg.cn/blog_migrate/f70713190a91dd2a07a8e4d0010eb1f2.png)

![Image 144](https://i-blog.csdnimg.cn/blog_migrate/9998bb6a92390452104d482cfeb13dca.png)

![Image 145](https://i-blog.csdnimg.cn/blog_migrate/f70713190a91dd2a07a8e4d0010eb1f2.png)

![Image 146](https://i-blog.csdnimg.cn/blog_migrate/9998bb6a92390452104d482cfeb13dca.png)

![Image 147](https://i-blog.csdnimg.cn/blog_migrate/b940554080df2f57396d7a1883cd766c.png)

![Image 148](https://i-blog.csdnimg.cn/blog_migrate/5070670958c77d968c40bac773774077.jpeg)

![Image 149](https://i-blog.csdnimg.cn/blog_migrate/c883bf002871c23ca7f65f53866cf869.png)

-还原+1:1 还原

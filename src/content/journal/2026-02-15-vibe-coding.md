---
title: 如何正确的Vibe Coding
description: 哦草我只是想分享经验，不是博眼球来的
date: 2026-02-15
tags: [AI]
categories: [技术]
---

# 以下内容完全为 Typeless 语音输入，并没有使用任何 AI 生成。可能有AI味是因为语音被 Typeless 自动处理了，请放心观看
Vibe Coding 除了 Web 之外，其实第二层意思是 AI coding。

AI coding 我们可以这么分：
1. 如果你是一个公司中的程序员，你该怎么做
2. 如果你是个产品经理，你该怎么做
3. 如果你是个独立开发者，你该怎么做

如果你有项目，或者你没项目要从零开始搭建，每一个场景都是可以单独分出一条技术路线的。

先讲一些比较大的，比如说 Agents.MD 以及 commit.md。我来给大家讲一讲我的 Agents.MD 是怎么做的吧：

1. 为了剔除非常明显的 AI 味，我想给它分个类：
   (a) 限制了 emoji
   (b) 限制了一些非常恶心的词语
   (c) 防止 AI 去写过多的无用注释
2. 之前有一个原则叫"全球开发指南"，这里可以直接复制进去。
3. 在此之外，我一般会给 agents 限制一些东西，比如 Node.js 可能会优先使用 pnpm。

并且，我对配置文件有一个规范：如果当前的文件夹中存在 project.md，模型必须先去阅读。

在 project.md 里面主要包含以下内容：
1. 项目架构：例如前端是 React 还是 Vue，后端是 Python 还是 JavaScript。
2. 包管理工具：如果是 JavaScript，需要标明使用 npm、pnpm 还是各种 bundler。
3. 环境配置：如果是 Python，要标明在测试时请使用环境变量。
4. 运行环境：告知当前工作的系统（例如 Windows、macOS 或 Linux），以便模型选择正确的指令去运行。
5. 行为限制：不要创建无意义的文件夹，并且一定要限制虚假 mock 的行为。
6. 价值观引导：我还在里面塞了一个"八荣八耻"进去。

虽然我的 Agents.MD 个人认为并不算好看（因为没有统一化 Markdown 格式，也没有放到正确的位置），但它非常有规范性。我用这一套配合 Codex 已经开发了很久。

实际上，我对 Codex 并没有进行过多的设置。我并不是说 skills 和 agents team 不好用，但目前来看，Codex 确实是能力最强的 coder。虽然我开启了 sub-agent，但目前感觉 sub-agent 的作用并不明显。

有很多时候我也不会用它的 Plan Mode。Codex 的 Plan Mode 分为一个大 Plan 和一个小 Plan：

1. 小 Plan 就是列几条 TODOs，那个也叫 Plan
2. 大 Plan 则是写一个非常长的 Plan，就像 AntiGravity 一样

但这一个其实并不太好用，因为它会占用非常长的上下文，导致时间花得很长，但任务可能最后写的也就差不多吧，这个就因人而异了。

对于 commit.md 实际上也就这样，其实有时候还不如 GitHub 和 tree 的总结。但是你直接让写代码的去总结，我认为有时候会好一点。

这三个文件我都会一起放在这个文章的最下面。

我认为 Vibe Coding 的第一需求就是不要把过多的精力放在没用的地方。如果你不熟悉账号、IP 池，去折腾One API、搞 sub to api，我觉得是没什么必要的。你不如花钱去买一个 200 刀的 Claude Max，或者用 20 块钱买一个 ChatGPT Plus。

那个 Codex 限额大概够大部分人用了。并且一定要用最顶级的模型，不要在大量国产模型上浪费时间，它们很强，但是会折磨自己。

AI 的发展速度就像是程序员的进化镜子：程序员每次看三个月前自己写的代码总是感到羞耻，大概也是这个道理。

除此之外，我讲一讲我的开发流程吧。

如果是一个从零构建的项目，我会先在文件夹中写 PRD。

你要像一个产品经理一样对待自己的项目，但请注意不要写一堆冗长的文档堆在文件夹里。每个文档如果有一两千字，甚至详细到每一个函数的定义，这是万万不可以的。

这是我之前花了 2000 美元 API 费用才实验出的教训：不要过度详细。AI 无法处理（AI can't work），而且 AI 写文档时也充满幻觉。

目前的建议是：
1. 确定细而精的发展方向，文档数量要尽量少。
2. 建立一个 Guides（各种规范）文件夹和一个 Roadmap，这一点非常重要。
3. 把所有的行为写进 Roadmap，并且一定要细化：
   (a) 把一个大的功能拆成 10 个薄片。
   (b) 每个薄片控制在 10 到 20 行的内容。
   (c) 让 AI 先读这 10 到 20 行，再结合刚才的规范去实现，基本上就能解决问题。
4. 建立一个 Specs 文件夹，定义各种规范草案和模型。

但还是那句话，不要定义得太细。Roadmap 和 README 是非常有必要的，它们能让 AI 快速了解你的项目。

我建议将你项目的各种 README、PRD 以及各种方向的文档，融进一个最多 200 行的文件中，这样才能更好地进行 AI Coding。

关于文档管理，我有几个核心建议：

1. 明确区分 Docs 与代码
   一定要把文档和代码分明白。

2. 手写核心技术文档
   建议亲自手写一份技术文档，例如说明 CLI 怎么用、Parser 怎么用。这非常建议手写，因为 AI 生成的内容你大概率看不懂，而且由于它的 Token 数限制（Context Window）或者理解偏差，实现过程会朝着一个非常恶心的方向发展。

3. 学习成熟的项目结构
   在大家开始 Coding 之前，建议先去学习目前大部分主流项目的项目结构和框架。

4. 规范文件夹管理
   比如文件夹该如何管理，代码是做到 SRC 目录里的。在 SRC 里应该怎么做？肯定不是乱丢 .py 文件。

建议大家专门去学一学这方面的规范。

另外，在项目实现一个小功能的时候，一定要去做真实的体验测试。

如果你在做 Agent，可以做一个前端来让自己体验大模型：
1. 能不能流式输出
2. 能不能调用工具
3. 能不能调用 MCP

一定不要让模型在 pytest 的黑盒里面跑。因为我大概知道做 vibecoding 的人是不太会去 review pytest 代码的。由于一个项目非常大，我们一般只能让第二个模型去 review 它有没有 mock 虚假结果，但它究竟有没有实现你真正的结果，其实是不太清楚的，就像一个黑盒一样。

所以我建议大家：
1. 做一个前端或者做一个 CLI
2. 真正地测试一下你自己的架构和项目能不能使用

在前期开发的时候，这一点非常重要，每一个薄片做完都是可以测试的。

另外还有一个很重要的点，就是一定要处理好 .env provider 以及各种隐私内容。

这些内容的管理非常重要：
1. 严禁被 Git 提交。
2. 关于明文落库还是使用密钥：是存哈希还是采取其他方式？是在数据库还是存磁盘？

这些都是非常关键的细节。你可以和 AI 讨论一下，但请让它不要跟着你的思路走，让它给出一个业界最常用、最安全的方案。

现在有一个很新的 vibecoding 方式，是安装一个 OpenClaw，让 OpenClaw 来替你写代码，或者让 OpenClaw 去控制 codex 来帮你写代码。

这个方式非常新颖，大家可以学一学，这样就可以远程 coding 了。

### Agents.md
<iframe src="/reports/AGENTS.md" style="width:100%;height:80vh;border:1px solid var(--c-border);border-radius:8px;" title="我的Agents.md"></iframe>

### COMMIT.md
<iframe src="/reports/COMMIT.md" style="width:100%;height:80vh;border:1px solid var(--c-border);border-radius:8px;" title="COMMIT.md"></iframe>

### Project.md
<iframe src="/reports/project.md" style="width:100%;height:80vh;border:1px solid var(--c-border);border-radius:8px;" title="Project.md"></iframe>

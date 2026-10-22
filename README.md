# 具身智能 · 研究笔记

统一的方格纸手写风笔记首页与内容页，使用 GitHub Pages 从 `main` 分支根目录发布。

- **DeepGEMM 源码学习笔记**：https://futurehafuture.github.io/embodied-ai-notes/deepgemm/
- **大模型面试八股**：https://futurehafuture.github.io/embodied-ai-notes/llm-interview/
- **总览首页**：https://futurehafuture.github.io/embodied-ai-notes/
- **Astra × 具身智能**：https://futurehafuture.github.io/embodied-ai-notes/astra/
- **GR00T 学习笔记**：https://futurehafuture.github.io/embodied-ai-notes/gr00t/
- **ZR-0 原论文中英对照**：https://futurehafuture.github.io/embodied-ai-notes/zr0/bilingual/
- **上下文压缩**：https://futurehafuture.github.io/embodied-ai-notes/context-compression/
- **VLA 真机 Sim2Real 实操笔记**：https://futurehafuture.github.io/embodied-ai-notes/vla-sim2real/
- **具身 VLA 求职基础与面试路线**：https://futurehafuture.github.io/embodied-ai-notes/vla-interview-foundations/

旧的 Astra 章节地址（例如 `/#s-paradigm`）会自动跳转到新的 Astra 页面相应章节。

## 文件结构

- `index.html` / `index.css`：笔记总览首页。
- `notebook-theme.css`：所有页面共用的配色、字体、方格纸和批注样式。
- `astra/index.html`：Astra 研究笔记。
- `gr00t/index.html` / `gr00t/theme.css`：GR00T 完整笔记及专用组件适配。
- `vla-sim2real/index.html`：VLA 真机部署长文；同目录保留研究范围与原始资料索引。
- `vla-interview-foundations/index.html`：面向具身 VLA 岗位的基础知识、现有笔记覆盖地图、项目与面试路线。

正文、图示和交互计算器保留在各自内容页，每篇笔记均提供返回首页的入口。新增笔记时，创建独立目录并在首页的 `notebook-list` 中添加入口，然后更新首页数量。

`context-compression/index.html` 保留原笔记的正文编辑、分级目录、字体切换和 HTML 保存功能，样式内联以便下载后独立打开。

`zr0/bilingual/index.html` 为 ZR-0 论文完整中英对照阅读页；正文、译文、图片、公式与原 PDF 均内嵌，可独立离线打开。现有 `zr0/` 精读笔记保持独立，两个入口均可从首页访问。

`deepgemm/index.html` 为单文件源码学习教程：17 章、3 个附录、5 个交互实验、NVIDIA 官方图与手绘；固定 DeepGEMM commit `5081f8513af57e61696de4f4f04b0e707ffb503e`。正文、字体、图片与脚本内嵌，来源和许可随附。

`llm-interview/index.html` 为从零开始的大模型面试教材，覆盖数学前置、Tokenizer、Transformer、训练与对齐、推理优化、RAG、工具 Agent 和评测；`style.css` 沿用本站方格纸手写风格，`app.js` 提供目录、阅读进度和主题切换。教材长文的源稿在 `llm-interview/textbook.md`，修改后在仓库根目录运行 `python3 llm-interview/build.py`（需要 Pandoc）即可重新嵌入 HTML；各章后面保留简短面试速答供复习。

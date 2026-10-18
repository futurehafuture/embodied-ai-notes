# 具身智能 · 研究笔记

统一的方格纸手写风笔记首页与内容页，使用 GitHub Pages 从 `main` 分支根目录发布。

- **总览首页**：https://futurehafuture.github.io/embodied-ai-notes/
- **Astra × 具身智能**：https://futurehafuture.github.io/embodied-ai-notes/astra/
- **GR00T 学习笔记**：https://futurehafuture.github.io/embodied-ai-notes/gr00t/
- **上下文压缩**：https://futurehafuture.github.io/embodied-ai-notes/context-compression/

旧的 Astra 章节地址（例如 `/#s-paradigm`）会自动跳转到新的 Astra 页面相应章节。

## 文件结构

- `index.html` / `index.css`：笔记总览首页。
- `notebook-theme.css`：所有页面共用的配色、字体、方格纸和批注样式。
- `astra/index.html`：Astra 研究笔记。
- `gr00t/index.html` / `gr00t/theme.css`：GR00T 完整笔记及专用组件适配。

正文、图示和交互计算器保留在各自内容页，每篇笔记均提供返回首页的入口。新增笔记时，创建独立目录并在首页的 `notebook-list` 中添加入口，然后更新首页数量。

`context-compression/index.html` 保留原笔记的正文编辑、分级目录、字体切换和 HTML 保存功能，样式内联以便下载后独立打开。

---
name: aisdk-doc-scraper
description: 抓取 Vercel AI SDK 文档页面的 Markdown 内容并保存到本地。使用 agent-browser 访问 ai-sdk.dev 文档页面，通过 JS 拦截点击"Copy markdown"按钮获取页面 Markdown 内容，按网站目录结构在本地 docs/ 下创建对应的目录和 .md 文件。触发词：抓取文档、爬取文档、同步文档、下载文档、AI SDK 文档、scrape docs。支持单页抓取和批量抓取整个文档站点。
---

# AI SDK Doc Scraper

从 ai-sdk.dev 文档网站抓取 Markdown 内容并保存到本地目录结构。

## 工作流程

### 1. 打开目标页面

使用 agent-browser 访问目标文档 URL：

```bash
agent-browser open <url> && agent-browser wait --load networkidle
```

### 2. 通过 JS 拦截剪贴板获取 Markdown 内容

由于 headless 模式下系统剪贴板不可用，需要通过 JavaScript 重写 `navigator.clipboard.writeText` 来拦截"Copy markdown"按钮写入的内容。

```bash
agent-browser eval --stdin <<'EVALEOF'
(async () => {
  let captured = '';
  const origWrite = navigator.clipboard.writeText.bind(navigator.clipboard);
  navigator.clipboard.writeText = async function(text) {
    captured = text;
    return origWrite(text);
  };
  const buttons = Array.from(document.querySelectorAll('button'));
  const copyBtn = buttons.find(b => b.textContent.includes('Copy markdown'));
  if (copyBtn) {
    copyBtn.click();
    await new Promise(r => setTimeout(r, 1500));
  }
  return captured || 'NOT_CAPTURED';
})()
EVALEOF
```

如果返回 `NOT_CAPTURED`，可能是因为页面上没有"Copy markdown"按钮或者按钮的行为发生了变化。此时应截图排查问题。

### 3. URL 到本地路径的映射规则

将 URL 路径映射到本地 `docs/` 目录。

**规则：**
- 基础 URL: `https://ai-sdk.dev/docs/`
- 本地根目录: `docs/`（位于项目根目录下）
- URL 路径中的 `/` 映射为本地目录层级
- 最后一段路径作为文件名，加 `.md` 后缀

**示例：**

| URL | 本地路径 |
|-----|---------|
| `https://ai-sdk.dev/docs/introduction` | `docs/introduction.md` |
| `https://ai-sdk.dev/docs/foundations/overview` | `docs/foundations/overview.md` |
| `https://ai-sdk.dev/docs/ai-sdk-core/generating-text` | `docs/ai-sdk-core/generating-text.md` |
| `https://ai-sdk.dev/docs/agents/building-agents` | `docs/agents/building-agents.md` |

### 4. 保存文件

使用 Write 工具将获取到的 Markdown 内容写入对应的本地文件。需要先创建必要的目录：

```bash
mkdir -p docs/<parent-dirs>
```

然后使用 Write 工具写入内容。

### 5. 关闭浏览器

完成后记得关闭浏览器：

```bash
agent-browser close
```

## 批量抓取

当用户要求批量抓取时，可以先从侧边栏提取所有文档链接，然后逐一抓取。

### 提取侧边栏目录

在任意文档页面上，用 JS 提取侧边栏的所有链接：

```bash
agent-browser eval --stdin <<'EVALEOF'
JSON.stringify(
  Array.from(document.querySelectorAll('nav a[href^="/docs/"]'))
    .map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href') }))
    .filter(item => item.href && item.text)
)
EVALEOF
```

### 逐页抓取流程

对每个链接重复以下步骤：

1. `agent-browser open https://ai-sdk.dev{href} && agent-browser wait --load networkidle`
2. 执行 JS 拦截剪贴板并点击"Copy markdown"按钮
3. 将获取到的 Markdown 保存到对应的本地路径
4. 继续下一个页面

**注意：** 批量抓取时浏览器保持打开状态，不需要每次都 open/close。只在全部完成后关闭浏览器。

## 注意事项

- 获取到的 Markdown 可能包含 MDX 组件标签（如 `<PreviewSwitchProviders />`、`<Templates type="..." />`），这些是 Next.js MDX 组件，在纯 Markdown 环境中不会渲染，但保留即可
- 如果某个页面没有"Copy markdown"按钮，跳过该页面并告知用户
- 整个 docs 的目录结构与 ai-sdk.dev 的 URL 路径完全对应
- 批量抓取前建议先告知用户将要抓取的页面数量，征求确认

## 使用示例

### 单页抓取
用户: "帮我抓取 AI SDK 的 Tool Calling 文档"
→ 访问 `https://ai-sdk.dev/docs/ai-sdk-core/tool-calling`，获取 Markdown，保存到 `docs/ai-sdk-core/tool-calling.md`

### 批量抓取
用户: "帮我把 AI SDK 的 Agents 章节全部抓取下来"
→ 提取侧边栏中 Agents 下的所有链接，逐一抓取并保存

### 全站抓取
用户: "帮我同步整个 AI SDK 文档"
→ 提取侧边栏所有链接，逐一抓取保存到对应目录结构

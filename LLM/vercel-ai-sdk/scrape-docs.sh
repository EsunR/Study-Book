#!/bin/bash
# AI SDK 文档批量抓取脚本
# 使用 agent-browser 逐页抓取 Markdown 内容

DOCS_DIR="/Users/jiguangrui/Desktop/aisdk/docs"
BASE_URL="https://ai-sdk.dev"

# JS 脚本：拦截剪贴板并点击 Copy markdown 按钮
JS_CAPTURE='
(async () => {
  let captured = "";
  const origWrite = navigator.clipboard.writeText.bind(navigator.clipboard);
  navigator.clipboard.writeText = async function(text) {
    captured = text;
    return origWrite(text);
  };
  const buttons = Array.from(document.querySelectorAll("button"));
  const copyBtn = buttons.find(b => b.textContent.includes("Copy markdown"));
  if (copyBtn) {
    copyBtn.click();
    await new Promise(r => setTimeout(r, 1500));
  }
  return captured || "NOT_CAPTURED";
})()
'

# 所有需要抓取的路径
PAGES=(
  # Introduction
  "introduction"
  # Foundations
  "foundations"
  "foundations/overview"
  "foundations/providers-and-models"
  "foundations/prompts"
  "foundations/tools"
  "foundations/streaming"
  "foundations/provider-options"
  # Getting Started
  "getting-started"
  "getting-started/choosing-a-provider"
  "getting-started/navigating-the-library"
  "getting-started/nextjs-app-router"
  "getting-started/nextjs-pages-router"
  "getting-started/svelte"
  "getting-started/nuxt"
  "getting-started/nodejs"
  "getting-started/expo"
  "getting-started/tanstack-start"
  "getting-started/coding-agents"
  # Agents
  "agents"
  "agents/overview"
  "agents/building-agents"
  "agents/workflows"
  "agents/loop-control"
  "agents/configuring-call-options"
  "agents/memory"
  "agents/subagents"
  # AI SDK Core
  "ai-sdk-core"
  "ai-sdk-core/overview"
  "ai-sdk-core/generating-text"
  "ai-sdk-core/generating-structured-data"
  "ai-sdk-core/tools-and-tool-calling"
  "ai-sdk-core/mcp-tools"
  "ai-sdk-core/prompt-engineering"
  "ai-sdk-core/settings"
  "ai-sdk-core/embeddings"
  "ai-sdk-core/reranking"
  "ai-sdk-core/image-generation"
  "ai-sdk-core/transcription"
  "ai-sdk-core/speech"
  "ai-sdk-core/video-generation"
  "ai-sdk-core/middleware"
  "ai-sdk-core/provider-management"
  "ai-sdk-core/error-handling"
  "ai-sdk-core/testing"
  "ai-sdk-core/telemetry"
  "ai-sdk-core/devtools"
  "ai-sdk-core/event-listeners"
  # AI SDK UI
  "ai-sdk-ui"
  "ai-sdk-ui/overview"
  "ai-sdk-ui/chatbot"
  "ai-sdk-ui/chatbot-message-persistence"
  "ai-sdk-ui/chatbot-resume-streams"
  "ai-sdk-ui/chatbot-tool-usage"
  "ai-sdk-ui/generative-user-interfaces"
  "ai-sdk-ui/completion"
  "ai-sdk-ui/object-generation"
  "ai-sdk-ui/streaming-data"
  "ai-sdk-ui/error-handling"
  "ai-sdk-ui/transport"
  "ai-sdk-ui/reading-ui-message-streams"
  "ai-sdk-ui/message-metadata"
  "ai-sdk-ui/stream-protocol"
  # AI SDK RSC
  "ai-sdk-rsc"
  "ai-sdk-rsc/overview"
  "ai-sdk-rsc/streaming-react-components"
  "ai-sdk-rsc/generative-ui-state"
  "ai-sdk-rsc/saving-and-restoring-states"
  "ai-sdk-rsc/multistep-interfaces"
  "ai-sdk-rsc/streaming-values"
  "ai-sdk-rsc/loading-state"
  "ai-sdk-rsc/error-handling"
  "ai-sdk-rsc/authentication"
  "ai-sdk-rsc/migrating-to-ui"
  # Advanced
  "advanced"
  "advanced/prompt-engineering"
  "advanced/stopping-streams"
  "advanced/backpressure"
  "advanced/caching"
  "advanced/multiple-streamables"
  "advanced/rate-limiting"
  "advanced/rendering-ui-with-language-models"
  "advanced/model-as-router"
  "advanced/multistep-interfaces"
  "advanced/sequential-generations"
  "advanced/vercel-deployment-guide"
)

TOTAL=${#PAGES[@]}
SUCCESS=0
FAIL=0

echo "=== 开始抓取 AI SDK 文档，共 ${TOTAL} 页 ==="

for i in "${!PAGES[@]}"; do
  PAGE="${PAGES[$i]}"
  NUM=$((i + 1))
  URL="${BASE_URL}/docs/${PAGE}"

  # 确定本地文件路径
  DIR=$(dirname "${PAGE}")
  FILE=$(basename "${PAGE}")
  if [ "$DIR" = "." ]; then
    LOCAL_PATH="${DOCS_DIR}/${FILE}.md"
  else
    mkdir -p "${DOCS_DIR}/${DIR}"
    LOCAL_PATH="${DOCS_DIR}/${DIR}/${FILE}.md"
  fi

  echo "[${NUM}/${TOTAL}] 抓取: ${PAGE}"

  # 导航到页面
  agent-browser open "${URL}" > /dev/null 2>&1
  agent-browser wait --load networkidle > /dev/null 2>&1

  # 通过 JS 拦截剪贴板获取 Markdown
  CONTENT=$(agent-browser eval --stdin <<'EVALEOF'
(async () => {
  let captured = "";
  const origWrite = navigator.clipboard.writeText.bind(navigator.clipboard);
  navigator.clipboard.writeText = async function(text) {
    captured = text;
    return origWrite(text);
  };
  const buttons = Array.from(document.querySelectorAll("button"));
  const copyBtn = buttons.find(b => b.textContent.includes("Copy markdown"));
  if (copyBtn) {
    copyBtn.click();
    await new Promise(r => setTimeout(r, 1500));
  }
  return captured || "NOT_CAPTURED";
})()
EVALEOF
  )

  # 检查是否成功获取
  if [ -z "$CONTENT" ] || [ "$CONTENT" = '"NOT_CAPTURED"' ] || [ "$CONTENT" = "NOT_CAPTURED" ]; then
    echo "  ✗ 未能获取 Markdown"
    FAIL=$((FAIL + 1))
  else
    # 去掉首尾引号并处理转义字符，写入文件
    echo "$CONTENT" | sed 's/^"//;s/"$//' | sed 's/\\n/\
/g; s/\\"/"/g; s/\\\\/\\/g' > "${LOCAL_PATH}"
    echo "  ✓ 已保存: ${LOCAL_PATH}"
    SUCCESS=$((SUCCESS + 1))
  fi
done

echo ""
echo "=== 抓取完成 ==="
echo "成功: ${SUCCESS} / ${TOTAL}"
echo "失败: ${FAIL} / ${TOTAL}"

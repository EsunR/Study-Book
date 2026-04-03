import Link from 'next/link'

export default function Home() {
  const frontendFeatures = [
    {
      title: 'useChat - 聊天应用',
      description: '构建完整的聊天界面，支持流式输出、多轮对话、消息管理等功能',
      href: '/chat',
      emoji: '💬',
    },
    {
      title: 'useCompletion - 文本补全',
      description: '单次文本生成场景，适用于内容创作、代码补全等场景',
      href: '/completion',
      emoji: '✨',
    },
    {
      title: 'useObject - 结构化数据',
      description: '实时生成符合 Schema 的结构化数据，支持流式输出',
      href: '/object',
      emoji: '📊',
    },
  ]

  const advancedFeatures = [
    {
      title: '结构化输出',
      description: '使用 Output 对象让 AI 输出符合预定义 Schema 的结构化数据',
      href: '/structured-output',
      examples: ['Output.object()', 'Output.array()', 'Output.choice()'],
    },
    {
      title: '工具调用',
      description: '定义工具让 AI 调用外部函数获取数据或执行操作',
      href: '/tool-calling',
      examples: ['定义工具', '执行工具', '工具选择控制'],
    },
    {
      title: '多步推理',
      description: '使用 stopWhen 实现 AI 自动多步推理和工具链调用',
      href: '/multi-step',
      examples: ['stepCountIs()', '步骤追踪', 'prepareStep'],
    },
    {
      title: '工具审批',
      description: '为敏感操作添加审批机制，确保用户知情同意',
      href: '/tool-approval',
      examples: ['needsApproval', '审批响应', '动态审批'],
    },
    {
      title: '流式结构化输出',
      description: '实时展示结构化数据的生成过程',
      href: '/stream-object',
      examples: ['partialOutputStream', '实时更新', '渐进式显示'],
    },
    {
      title: '工具修复',
      description: '当模型生成无效工具调用时的自动修复策略',
      href: '/tool-repair',
      examples: ['repairToolCall', 'Schema 验证', '自动重试'],
    },
  ]

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">AI SDK 学习演示</h1>
      <p className="opacity-70 mb-8">
        学习 Vercel AI SDK 的前端集成和进阶功能
      </p>

      {/* 前端集成部分 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">01</span> 前端集成
        </h2>
        <p className="opacity-70 mb-4">
          学习 useChat、useCompletion、useObject 三个核心 Hook
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {frontendFeatures.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="block bg-card-bg border border-border rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-2xl mb-2">{feature.emoji}</div>
              <h3 className="text-primary font-semibold mb-1">{feature.title}</h3>
              <p className="opacity-70 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 进阶功能部分 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">02</span> 进阶功能
        </h2>
        <p className="opacity-70 mb-4">
          学习结构化输出、工具调用、多步推理等高级特性
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {advancedFeatures.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="block bg-card-bg border border-border rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-primary text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="opacity-80 text-sm leading-relaxed mb-3">{feature.description}</p>
              <div className="flex flex-wrap gap-2">
                {feature.examples.map((example) => (
                  <span
                    key={example}
                    className="inline-flex items-center px-2 py-0.5 bg-primary text-white rounded-full text-xs"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 运行说明 */}
      <div className="bg-card-bg border border-border rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">运行说明</h2>
        <pre>{`# 设置环境变量（在项目根目录的 .env 文件中）
API_BASE_URL=your-api-base-url
MODEL_ID=your-model-id

# 安装依赖并运行
npm install
npm run demo:dev

# 访问 http://localhost:3000`}</pre>
      </div>
    </main>
  )
}

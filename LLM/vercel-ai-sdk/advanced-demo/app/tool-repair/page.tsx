'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ToolRepairPage() {
  const [prompt, setPrompt] = useState('')
  const [enableRepair, setEnableRepair] = useState(true)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/tool-repair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, enableRepair }),
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      setResult({ error: '请求失败' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <nav className="flex gap-4 flex-wrap mb-8 pb-4 border-b border-border">
        <Link
          href="/"
          className="px-4 py-2 bg-card-bg rounded hover:bg-primary hover:text-white hover:no-underline transition-colors text-sm"
        >
          ← 返回首页
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-2">工具修复</h1>
      <p className="opacity-70 mb-8">
        当模型生成无效工具调用时的自动修复策略
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">提示词</label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例如：查询用户表中年龄大于25的记录"
            required
            className="w-full p-3 border border-border rounded-md text-base bg-background text-foreground"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 font-medium">
            <input
              type="checkbox"
              checked={enableRepair}
              onChange={(e) => setEnableRepair(e.target.checked)}
              className="w-auto"
            />
            启用工具调用修复
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white border-none px-6 py-3 rounded-md cursor-pointer text-base transition-colors hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? '执行中...' : '执行'}
        </button>
      </form>

      {result && (
        <div className="bg-code-bg rounded-lg p-4 mt-4 whitespace-pre-wrap break-words">
          <h3 className="text-lg font-semibold mb-2">AI 回复</h3>
          <p>{result.text}</p>

          {result.toolCalls && result.toolCalls.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-2">工具调用</h3>
              {result.toolCalls.map((tc: any, i: number) => (
                <div
                  key={i}
                  className="bg-[#1a1a1a] border-l-3 border-primary p-2 px-4 my-2 rounded-r"
                >
                  <strong>{tc.toolName}</strong>
                  <pre>{JSON.stringify(tc.args, null, 2)}</pre>
                </div>
              ))}
            </>
          )}

          {result.toolResults && result.toolResults.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-2">工具结果</h3>
              <pre>{JSON.stringify(result.toolResults, null, 2)}</pre>
            </>
          )}
        </div>
      )}

      <div className="bg-card-bg border border-border rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">修复机制说明</h2>
        <p className="mb-4">当模型生成的工具调用参数不符合 Schema 时，使用结构化输出自动修复：</p>
        <pre>{`experimental_repairToolCall: async ({
  toolCall,
  tools,
  error,
}) => {
  // 使用结构化输出修复参数
  const { output: repairedArgs } = await generateText({
    model: openai('gpt-4o'),
    output: Output.object({
      schema: tools[toolCall.toolName].parameters
    }),
    prompt: \`修复工具输入: \${JSON.stringify(toolCall.args)}\`,
  });

  return { ...toolCall, args: repairedArgs };
}`}</pre>

        <h3 className="text-lg font-semibold mt-4 mb-2">示例提示词</h3>
        <ul className="leading-8">
          <li>查询用户表中年龄大于25的记录</li>
          <li>搜索产品表，找出价格小于100的商品</li>
          <li>查询订单表，筛选状态为已完成的订单</li>
        </ul>
      </div>
    </main>
  )
}

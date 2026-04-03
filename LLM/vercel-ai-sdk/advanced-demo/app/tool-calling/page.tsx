'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ToolCallingPage() {
  const [prompt, setPrompt] = useState('北京和上海今天的天气')
  const [toolChoice, setToolChoice] = useState('auto')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/tool-calling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, toolChoice }),
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

      <h1 className="text-3xl font-bold mb-2">工具调用</h1>
      <p className="opacity-70 mb-8">
        定义工具让 AI 调用外部函数获取数据或执行操作
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">提示词</label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例如：北京和上海今天天气怎么样？"
            required
            className="w-full p-3 border border-border rounded-md text-base bg-background text-foreground"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">工具选择策略</label>
          <select
            value={toolChoice}
            onChange={(e) => setToolChoice(e.target.value)}
            className="w-full p-3 border border-border rounded-md text-base bg-background text-foreground"
          >
            <option value="auto">auto - 自动决定</option>
            <option value="required">required - 必须调用工具</option>
            <option value="none">none - 不调用工具</option>
          </select>
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
                  className="bg-gray-500 border-l-3 border-primary p-2 px-4 my-2 rounded-r"
                >
                  <strong>{tc.toolName}</strong>
                  <pre>{JSON.stringify(tc.input, null, 2)}</pre>
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

          {result.usage && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-2">Token 用量</h3>
              <pre>{JSON.stringify(result.usage, null, 2)}</pre>
            </>
          )}
        </div>
      )}

      <div className="bg-card-bg border border-border rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">可用工具</h2>
        <ul className="leading-8">
          <li><strong>weather</strong>: 获取城市天气信息</li>
          <li><strong>calculator</strong>: 计算数学表达式</li>
          <li><strong>search</strong>: 搜索用户信息</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-2">示例提示词</h3>
        <ul className="leading-8">
          <li>北京今天天气怎么样？</li>
          <li>计算 123 * 456 等于多少</li>
          <li>搜索技术部的员工</li>
          <li>比较北京和上海的天气，告诉我温差</li>
        </ul>
      </div>
    </main>
  )
}

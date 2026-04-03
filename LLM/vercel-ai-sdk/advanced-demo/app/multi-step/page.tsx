'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MultiStepPage() {
  const [prompt, setPrompt] = useState('')
  const [maxSteps, setMaxSteps] = useState(5)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/multi-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, maxSteps }),
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

      <h1 className="text-3xl font-bold mb-2">多步推理</h1>
      <p className="opacity-70 mb-8">
        使用 stopWhen 实现 AI 自动多步推理和工具链调用
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">提示词</label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例如：查询北京的天气，然后推荐穿搭和活动"
            required
            className="w-full p-3 border border-border rounded-md text-base bg-background text-foreground"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">最大步数</label>
          <input
            type="number"
            value={maxSteps}
            onChange={(e) => setMaxSteps(parseInt(e.target.value))}
            min={1}
            max={20}
            className="w-full p-3 border border-border rounded-md text-base bg-background text-foreground"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white border-none px-6 py-3 rounded-md cursor-pointer text-base transition-colors hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? '推理中...' : '开始推理'}
        </button>
      </form>

      {result && (
        <div className="bg-code-bg rounded-lg p-4 mt-4 whitespace-pre-wrap break-words">
          <h3 className="text-lg font-semibold mb-2">最终回复</h3>
          <p>{result.text}</p>

          <h3 className="text-lg font-semibold mt-4 mb-2">
            推理步骤 ({result.totalSteps} 步)
          </h3>
          <ul className="list-none p-0">
            {result.steps?.map((step: any, i: number) => (
              <li
                key={i}
                className="p-3 px-4 border-l-3 border-primary mb-2 bg-card-bg rounded-r"
              >
                <strong>步骤 {step.stepNumber}</strong>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-full text-xs ml-2">
                  {step.finishReason}
                </span>
                {step.toolCalls && step.toolCalls.length > 0 && (
                  <div className="mt-2">
                    {step.toolCalls.map((tc: any, j: number) => (
                      <div
                        key={j}
                        className="bg-[#1a1a1a] border-l-3 border-primary p-2 px-4 my-2 rounded-r"
                      >
                        <strong>{tc.toolName}</strong>
                        <pre className="m-0 text-sm">
                          {JSON.stringify(tc.args, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

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
          <li><strong>getWeather</strong>: 获取城市天气</li>
          <li><strong>recommendClothing</strong>: 根据天气推荐穿衣</li>
          <li><strong>suggestActivity</strong>: 根据天气推荐活动</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-2">示例提示词</h3>
        <ul className="leading-8">
          <li>查询北京的天气，然后推荐穿搭</li>
          <li>比较北京和上海的天气，推荐合适的活动</li>
          <li>我在深圳，今天应该穿什么？适合做什么活动？</li>
        </ul>
      </div>
    </main>
  )
}

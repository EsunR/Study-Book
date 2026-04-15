'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function StructuredOutputPage() {
  const [type, setType] = useState('object')
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const defaultPrompts: Record<string, string> = {
    text: '用一句话解释什么是人工智能',
    object: '生成一个软件工程师的档案',
    array: '列出北京、上海、广州三个城市的天气信息',
    choice: '分析这句话的情感：今天天气真不错！',
    json: '返回一个包含城市名称、人口和著名景点的 JSON 对象',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/structured-output', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          prompt: prompt || defaultPrompts[type],
        }),
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

      <h1 className="text-3xl font-bold mb-2">结构化输出</h1>
      <p className="opacity-70 mb-8">
        使用 Output 对象让 AI 输出符合预定义 Schema 的结构化数据
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">输出类型</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border border-border rounded-md text-base bg-background text-foreground"
          >
            <option value="text">Output.text() - 纯文本</option>
            <option value="object">Output.object() - 对象</option>
            <option value="array">Output.array() - 数组</option>
            <option value="choice">Output.choice() - 选择</option>
            <option value="json">Output.json() - 自由 JSON</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">提示词（可选，留空使用默认）</label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={defaultPrompts[type]}
            className="w-full p-3 border border-border rounded-md text-base bg-background text-foreground"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white border-none px-6 py-3 rounded-md cursor-pointer text-base transition-colors hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? '生成中...' : '生成'}
        </button>
      </form>

      {result && (
        <div className="bg-code-bg rounded-lg p-4 mt-4 whitespace-pre-wrap break-words">
          <h3 className="text-lg font-semibold mb-2">结果</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <div className="bg-card-bg border border-border rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Schema 定义示例</h2>
        <pre>{`import { z } from 'zod';

const personSchema = z.object({
  name: z.string().describe('人物姓名'),
  age: z.number().describe('年龄'),
  occupation: z.string().describe('职业'),
  skills: z.array(z.string()).describe('技能列表'),
});`}</pre>
      </div>
    </main>
  )
}

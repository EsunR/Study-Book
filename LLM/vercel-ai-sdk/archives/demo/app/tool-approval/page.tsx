'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ApprovalRequest {
  approvalId: string
  toolName: string
  args: Record<string, any>
  reason: string
}

interface Message {
  role: string
  content: string | any[]
}

export default function ToolApprovalPage() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([])
  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setApprovalRequests([])

    try {
      const res = await fetch('/api/tool-approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()

      if (data.messages) {
        setMessages(data.messages)
      }

      if (data.approvalRequests && data.approvalRequests.length > 0) {
        setApprovalRequests(data.approvalRequests)
      }

      setResult(data)
    } catch (error) {
      setResult({ error: '请求失败' })
    } finally {
      setLoading(false)
    }
  }

  const handleApproval = async (request: ApprovalRequest, approved: boolean) => {
    setLoading(true)

    try {
      // 创建审批响应
      const approvals = [{
        type: 'tool-approval-response',
        approvalId: request.approvalId,
        approved,
        reason: approved ? '用户确认执行' : '用户拒绝执行',
      }]

      const res = await fetch('/api/tool-approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, approvals }),
      })
      const data = await res.json()

      if (data.messages) {
        setMessages(data.messages)
      }

      // 清除审批请求
      setApprovalRequests([])

      // 如果还有新的审批请求，显示它们
      if (data.approvalRequests && data.approvalRequests.length > 0) {
        setApprovalRequests(data.approvalRequests)
      }

      setResult(data)
    } catch (error) {
      setResult({ error: '审批处理失败' })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setPrompt('')
    setResult(null)
    setApprovalRequests([])
    setMessages([])
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
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-card-bg rounded hover:bg-red-500 hover:text-white transition-colors text-sm"
        >
          重置对话
        </button>
      </nav>

      <h1 className="text-3xl font-bold mb-2">工具审批</h1>
      <p className="opacity-70 mb-8">
        为敏感操作添加审批机制，确保用户知情同意
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">提示词</label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例如：删除 temp.txt 文件"
            required
            className="w-full p-3 border border-border rounded-md text-base bg-background text-foreground"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white border-none px-6 py-3 rounded-md cursor-pointer text-base transition-colors hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? '处理中...' : '执行'}
        </button>
      </form>

      {/* 显示需要审批的请求 */}
      {approvalRequests.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4 dark:bg-amber-900/20 dark:border-amber-800">
          <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">⚠️ 需要审批</h3>
          <p className="text-amber-700 dark:text-amber-300">以下操作需要您的确认：</p>
          {approvalRequests.map((req, i) => (
            <div key={i} className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p><strong>工具:</strong> {req.toolName}</p>
              <p><strong>原因:</strong> {req.reason}</p>
              <p><strong>参数:</strong></p>
              <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-sm overflow-x-auto">
                {JSON.stringify(req.args, null, 2)}
              </pre>
              <div className="flex gap-4 mt-4">
                <button
                  className="flex-1 bg-green-500 text-white border-none px-6 py-3 rounded-md cursor-pointer text-base transition-colors hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => handleApproval(req, true)}
                  disabled={loading}
                >
                  ✓ 批准
                </button>
                <button
                  className="flex-1 bg-red-500 text-white border-none px-6 py-3 rounded-md cursor-pointer text-base transition-colors hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => handleApproval(req, false)}
                  disabled={loading}
                >
                  ✗ 拒绝
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 显示结果 */}
      {result && !result.needsApproval && (
        <div className="bg-code-bg rounded-lg p-4 mt-4 whitespace-pre-wrap break-words">
          <h3 className="text-lg font-semibold mb-2">结果</h3>
          <p className="whitespace-pre-wrap">{result.text}</p>

          {result.toolCalls && result.toolCalls.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-2">工具调用</h3>
              {result.toolCalls.map((tc: any, i: number) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2">
                  <p className="font-medium">{tc.toolName}</p>
                  <pre className="text-sm mt-1">{JSON.stringify(tc.input, null, 2)}</pre>
                </div>
              ))}
            </>
          )}

          {result.toolResults && result.toolResults.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-2">工具执行结果</h3>
              {result.toolResults.map((tr: any, i: number) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2">
                  <p className="font-medium">{tr.toolName}</p>
                  <pre className="text-sm mt-1">{JSON.stringify(tr.result, null, 2)}</pre>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* 显示错误 */}
      {result?.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-700 dark:text-red-300">{result.error}</p>
        </div>
      )}

      <div className="bg-card-bg border border-border rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">工具审批规则</h2>
        <ul className="leading-8">
          <li><strong>deleteFile</strong>: 始终需要审批（使用 <code>needsApproval: true</code>）</li>
          <li><strong>payment</strong>: 金额超过 100 需要审批（使用动态审批函数）</li>
          <li><strong>sendEmail</strong>: 无需审批，自动执行</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-2">示例提示词</h3>
        <ul className="leading-8">
          <li>删除 config.txt 文件</li>
          <li>支付 50 元给张三作为午餐费（无需审批）</li>
          <li>支付 200 元给李四作为项目费用（需要审批）</li>
          <li>发送邮件给 test@example.com</li>
          <li>删除 temp.txt 文件并发送邮件通知 admin@example.com（混合场景）</li>
        </ul>

        <div className="mt-6 p-4 bg-code-bg rounded-lg">
          <h3 className="text-lg font-semibold mb-2">核心实现</h3>
          <pre className="text-sm">{`// 静态审批
const deleteFileTool = tool({
  needsApproval: true, // 始终需要审批
  // ...
});

// 动态审批
const paymentTool = tool({
  needsApproval: async ({ amount }) => amount > 100,
  // ...
});`}</pre>
        </div>
      </div>
    </main>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI SDK 学习演示',
  description: '学习 Vercel AI SDK 前端集成和进阶功能',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

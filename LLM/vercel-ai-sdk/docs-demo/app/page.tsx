import Link from "next/link";

export default function Home() {
  const directory: Array<{
    sectionTitle: string;
    lessons: {
      title: string;
      description: string;
      href: string;
      emoji?: string;
    }[];
  }> = [
    {
      sectionTitle: "Getting Started",
      lessons: [
        {
          title: "Nuxt.js App Router",
          description: "Learn how to use the Nuxt.js App Router with Vercel AI SDK",
          href: "/getting-started/nuxt-app-router",
          emoji: "🚀",
        },
      ],
    },
    {
      sectionTitle: "Demo Case",
      lessons: [
        {
          title: "结构化输出与文本灵活切换",
          description: "Tool Calling 实现商品查询返回结构化商品卡，普通问答返回文本",
          href: "/demo-case/optional-struct-output",
          emoji: "🛒",
        },
        {
          title: "低代码页面生成器",
          description: "AI 对话收集需求 + Tool Calling 生成页面 Schema + 实时预览",
          href: "/demo-case/lowcode-agent",
          emoji: "🧩",
        },
      ],
    },
  ];

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">AI SDK 学习演示</h1>
      <p className="opacity-70 mb-8">学习 Vercel AI SDK 的前端集成和进阶功能</p>

      {directory.map((section, index) => (
        <section key={section.sectionTitle} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">{String(index + 1).padStart(2, "0")}</span>{" "}
            {section.sectionTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {section.lessons.map((lesson) => (
              <Link
                key={lesson.href}
                href={lesson.href}
                className="block bg-card-bg border border-border rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-2xl mb-2">{lesson.emoji}</div>
                <h3 className="text-primary font-semibold mb-1">{lesson.title}</h3>
                <p className="opacity-70 text-sm">{lesson.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

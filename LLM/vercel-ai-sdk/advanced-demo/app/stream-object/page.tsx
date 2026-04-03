'use client'

import { experimental_useObject as useObject } from '@ai-sdk/react'
import Link from 'next/link'
import { useState } from 'react'
import { articleOutlineSchema, recipeSchema, type ArticleOutline, type Recipe } from '../api/stream-object/schema'

export default function StreamObjectPage() {
  const [type, setType] = useState<'article' | 'recipe'>('article')

  const { object, submit, isLoading, stop, error } = useObject({
    api: '/api/stream-object',
    schema: type === 'article' ? articleOutlineSchema : recipeSchema,
  })

  const defaultPrompts: Record<string, string> = {
    article: '写一篇关于人工智能未来发展的文章大纲',
    recipe: '生成一道经典川菜的菜谱',
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const prompt = formData.get('prompt') as string
    submit({
      type,
      prompt: prompt || defaultPrompts[type],
    })
  }

  // 渲染文章大纲
  const renderArticle = (article: Partial<ArticleOutline> | undefined) => {
    if (!article) return null
    return (
      <div className="space-y-4">
        {article.title && (
          <div>
            <h3 className="text-lg font-semibold text-primary">{article.title}</h3>
          </div>
        )}
        {article.summary && (
          <div>
            <h4 className="font-medium mb-1">摘要</h4>
            <p className="opacity-80">{article.summary}</p>
          </div>
        )}
        {article.sections && article.sections.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">章节</h4>
            {article.sections.map((section, i) => (
              <div key={i} className="mb-3 p-3 bg-card-bg rounded-lg border border-border">
                {section?.heading && (
                  <h5 className="font-medium text-primary mb-2">{section.heading}</h5>
                )}
                {section?.points && section.points.length > 0 && (
                  <ul className="list-disc list-inside text-sm opacity-80">
                    {section.points.map((point, j) => (
                      point && <li key={j}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        {article.keywords && article.keywords.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">关键词</h4>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword, i) => (
                keyword && (
                  <span key={i} className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">
                    {keyword}
                  </span>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // 渲染菜谱
  const renderRecipe = (recipe: Partial<Recipe> | undefined) => {
    if (!recipe) return null
    return (
      <div className="space-y-4">
        {recipe.name && (
          <div>
            <h3 className="text-lg font-semibold text-primary">{recipe.name}</h3>
            {recipe.cuisine && (
              <span className="text-sm opacity-60 ml-2">({recipe.cuisine})</span>
            )}
          </div>
        )}
        <div className="flex gap-4 flex-wrap">
          {recipe.difficulty && (
            <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded text-sm">
              难度: {recipe.difficulty}
            </div>
          )}
          {recipe.time && (
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
              时间: {recipe.time}
            </div>
          )}
        </div>
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">食材</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {recipe.ingredients.map((ing, i) => (
                ing && (
                  <div key={i} className="p-2 bg-card-bg rounded border border-border text-sm">
                    <span className="font-medium">{ing.name}</span>
                    {ing.amount && <span className="opacity-60 ml-1">- {ing.amount}</span>}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
        {recipe.steps && recipe.steps.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">步骤</h4>
            {recipe.steps.map((step, i) => (
              step && (
                <div key={i} className="mb-3 p-3 bg-card-bg rounded-lg border border-border">
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm">
                      {step.step || i + 1}
                    </span>
                    <div>
                      {step.instruction && <p className="opacity-80">{step.instruction}</p>}
                      {step.tips && (
                        <p className="text-sm text-amber-600 mt-1">💡 {step.tips}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    )
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

      {type}

      <h1 className="text-3xl font-bold mb-2">流式结构化输出</h1>
      <p className="opacity-70 mb-8">
        实时展示结构化数据的生成过程，使用 useObject hook
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">输出类型</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value as 'article' | 'recipe')}
            className="w-full p-3 border border-border rounded-md text-base bg-background text-foreground"
          >
            <option value="article">文章大纲</option>
            <option value="recipe">菜谱</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">提示词（可选）</label>
          <textarea
            name="prompt"
            rows={3}
            placeholder={defaultPrompts[type]}
            className="w-full p-3 border border-border rounded-md text-base bg-background text-foreground"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white border-none px-6 py-3 rounded-md cursor-pointer text-base transition-colors hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? '生成中...' : '开始流式生成'}
          </button>

          {isLoading && (
            <button
              type="button"
              onClick={() => stop()}
              className="bg-red-500 text-white border-none px-6 py-3 rounded-md cursor-pointer text-base transition-colors hover:bg-red-600"
            >
              停止
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-700 dark:text-red-300">生成失败: {error.message}</p>
        </div>
      )}

      {object && (
        <div className="bg-code-bg rounded-lg p-4 mt-4">
          <h3 className="text-lg font-semibold mb-4">实时输出</h3>
          {type === 'article' ? renderArticle(object as Partial<ArticleOutline>) : renderRecipe(object as Partial<Recipe>)}
        </div>
      )}
    </main>
  )
}

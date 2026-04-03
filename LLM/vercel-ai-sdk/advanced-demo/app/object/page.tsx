'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { DeepPartial } from 'ai';
import { z } from 'zod';
import Link from 'next/link';

// 定义与后端相同的 Schema
const schema = z.object({
  name: z.string().describe('姓名'),
  age: z.number().describe('年龄'),
  skills: z.array(z.string()).describe('技能列表'),
  bio: z.string().describe('个人简介'),
  experience: z.number().describe('工作年限'),
});

type Profile = z.infer<typeof schema>;

export default function ObjectPage() {
  const { object, submit, isLoading, error } = useObject({
    api: '/api/object',
    schema,
  });

  const handleGenerate = () => {
    submit('生成一个软件工程师的人才档案');
  };

  const profile = object as DeepPartial<Profile> | undefined;

  return (
    <div className="chat-container">
      <div style={{ marginBottom: 20 }}>
        <Link href="/" style={{ color: '#0070f3' }}>
          ← 返回首页
        </Link>
      </div>

      <h1>📊 结构化数据示例</h1>
      <p style={{ color: '#666', marginBottom: 20 }}>
        点击按钮生成一个虚拟的人才档案，数据会实时流式更新。
      </p>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        style={{
          padding: '12px 24px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.5 : 1,
          marginBottom: 20,
        }}
      >
        {isLoading ? '生成中...' : '生成人才档案'}
      </button>

      {/* 错误处理 */}
      {error && (
        <div
          style={{
            padding: 16,
            background: '#fee',
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          发生错误: {error.message}
        </div>
      )}

      {/* 结果展示 */}
      {profile && (
        <div
          style={{
            padding: 20,
            background: '#f5f5f5',
            borderRadius: 12,
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>人才档案</h2>

          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <strong>姓名：</strong>
              {profile.name || '生成中...'}
            </div>

            <div>
              <strong>年龄：</strong>
              {profile.age ?? '生成中...'}
            </div>

            <div>
              <strong>工作年限：</strong>
              {profile.experience ?? '生成中...'} 年
            </div>

            <div>
              <strong>技能列表：</strong>
              {profile.skills && profile.skills.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                  {profile.skills.filter(Boolean).map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '4px 12px',
                        background: '#0070f3',
                        color: 'white',
                        borderRadius: 16,
                        fontSize: 14,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                '生成中...'
              )}
            </div>

            <div>
              <strong>个人简介：</strong>
              <p style={{ margin: '8px 0 0', lineHeight: 1.6 }}>
                {profile.bio || '生成中...'}
              </p>
            </div>
          </div>

          {/* 原始 JSON */}
          <details style={{ marginTop: 20 }}>
            <summary style={{ cursor: 'pointer', color: '#666' }}>
              查看原始 JSON
            </summary>
            <pre
              style={{
                padding: 16,
                background: '#333',
                color: '#fff',
                borderRadius: 8,
                overflow: 'auto',
                marginTop: 12,
              }}
            >
              {JSON.stringify(profile, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}

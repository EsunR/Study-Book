import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { ProxyAgent, setGlobalDispatcher, fetch } from "undici";

// 代理配置
const PROXY_URL = "http://127.0.0.1:8085";

// 禁用 TLS 证书验证（仅开发环境）
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// 设置全局代理（允许自签名证书）
setGlobalDispatcher(
  new ProxyAgent({
    uri: PROXY_URL,
    requestTls: {
      rejectUnauthorized: false,
    },
  })
);

// 创建兼容的 provider
const provider = createOpenAICompatible({
  name: "qianfan",
  baseURL: process.env.API_BASE_URL!,
  apiKey: process.env.OPENAI_API_KEY!,
  fetch: fetch as unknown as typeof globalThis.fetch,
  // 启用结构化输出支持（关键！）
  supportsStructuredOutputs: true,
});

// 导出模型实例
export const model = provider(process.env.MODEL_ID || "qianfan-code-latest");

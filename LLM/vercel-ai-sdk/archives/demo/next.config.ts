import type { NextConfig } from "next";
import { config } from "dotenv";
import { resolve } from "path";

// 加载项目根目录的 .env 文件
config({ path: resolve(__dirname, "../.env") });

const nextConfig: NextConfig = {
  // 允许长时间运行的请求（AI 生成可能需要较长时间）
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  // 将环境变量传递给客户端（如果需要的话）
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    MODEL_ID: process.env.MODEL_ID,
  },
};

export default nextConfig;

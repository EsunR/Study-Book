import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from "ai";
import { model } from "@/lib/model";
import { z } from "zod";

// 模拟商品数据库
const productDB: Record<string, Array<{
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  rating: number;
}>> = {
  手机: [
    { name: "iPhone 16 Pro", price: 8999, image: "https://placehold.co/200x200/1a1a2e/ffffff?text=iPhone+16", description: "A18 Pro 芯片，钛金属设计，4800万像素主摄", inStock: true, rating: 4.8 },
    { name: "小米 15", price: 4499, image: "https://placehold.co/200x200/1a1a2e/ffffff?text=Mi+15", description: "骁龙8至尊版，徕卡光学，5400mAh大电池", inStock: true, rating: 4.6 },
    { name: "华为 Mate 70 Pro", price: 6499, image: "https://placehold.co/200x200/1a1a2e/ffffff?text=Mate+70", description: "麒麟芯片，红枫原色影像，卫星通信", inStock: false, rating: 4.7 },
  ],
  笔记本: [
    { name: "MacBook Pro 14", price: 14999, image: "https://placehold.co/200x200/1a1a2e/ffffff?text=MBP+14", description: "M4 Pro 芯片，Liquid Retina XDR 显示屏", inStock: true, rating: 4.9 },
    { name: "ThinkPad X1 Carbon", price: 9999, image: "https://placehold.co/200x200/1a1a2e/ffffff?text=X1+Carbon", description: "英特尔酷睿Ultra，商务旗舰，超轻薄", inStock: true, rating: 4.5 },
  ],
  耳机: [
    { name: "AirPods Pro 3", price: 1899, image: "https://placehold.co/200x200/1a1a2e/ffffff?text=AirPods+Pro", description: "自适应降噪，H3芯片，个性化空间音频", inStock: true, rating: 4.7 },
    { name: "索尼 WH-1000XM6", price: 2699, image: "https://placehold.co/200x200/1a1a2e/ffffff?text=XM6", description: "行业领先降噪，30小时续航，LDAC高清音质", inStock: true, rating: 4.8 },
  ],
  平板: [
    { name: "iPad Pro 13", price: 11499, image: "https://placehold.co/200x200/1a1a2e/ffffff?text=iPad+Pro", description: "M4 芯片，Ultra Retina XDR，Apple Pencil Pro", inStock: true, rating: 4.8 },
    { name: "小米平板 7 Pro", price: 2999, image: "https://placehold.co/200x200/1a1a2e/ffffff?text=Mi+Pad+7", description: "骁龙8s Gen3，11.2英寸2.8K屏，PC级办公", inStock: true, rating: 4.4 },
  ],
};

const searchProductTool = tool({
  description: "搜索商品信息。当用户想要购买、查询、推荐商品，或者询问某个品类的产品时使用此工具",
  inputSchema: z.object({
    category: z.string().describe("商品品类，如：手机、笔记本、耳机、平板"),
  }),
  execute: async ({ category }) => {
    const products = productDB[category];
    if (!products) {
      // 模糊匹配
      const key = Object.keys(productDB).find((k) =>
        category.includes(k) || k.includes(category)
      );
      if (key) {
        return { category: key, products: productDB[key] };
      }
      return {
        category,
        products: [],
        message: `暂时没有找到"${category}"品类的商品，目前支持查询：手机、笔记本、耳机、平板`,
      };
    }
    return { category, products };
  },
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model,
    system: `你是一个智能购物助手，用中文回答问题。
当用户询问商品相关信息（如推荐、购买、比较、查询价格等），你应该使用 searchProduct 工具来获取商品数据，然后根据返回的数据给用户推荐。
当用户只是普通聊天或询问非商品问题时，直接用文本回复即可。`,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      searchProduct: searchProductTool,
    },
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse();
}

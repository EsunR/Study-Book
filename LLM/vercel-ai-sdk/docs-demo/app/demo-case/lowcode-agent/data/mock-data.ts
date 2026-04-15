export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Company {
  name: string;
  slogan: string;
  logo: string;
  description: string;
  founded: string;
  employees: string;
  location: string;
  stats: Array<{ label: string; value: string }>;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  icon: string;
}

// --- Mock 数据 ---

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "智能手环 Pro",
    price: 299,
    image: "https://placehold.co/200x200/e2e8f0/64748b?text=手环",
    description: "全天候健康监测，7天超长续航",
    category: "智能穿戴",
  },
  {
    id: "p2",
    name: "无线降噪耳机",
    price: 599,
    image: "https://placehold.co/200x200/e2e8f0/64748b?text=耳机",
    description: "主动降噪，沉浸式音质体验",
    category: "音频设备",
  },
  {
    id: "p3",
    name: "便携投影仪",
    price: 1299,
    image: "https://placehold.co/200x200/e2e8f0/64748b?text=投影",
    description: "1080P高清，随身携带的大屏体验",
    category: "影音设备",
  },
  {
    id: "p4",
    name: "机械键盘 RGB",
    price: 399,
    image: "https://placehold.co/200x200/e2e8f0/64748b?text=键盘",
    description: "热插拔轴体，1680万色背光",
    category: "外设",
  },
  {
    id: "p5",
    name: "4K 运动相机",
    price: 899,
    image: "https://placehold.co/200x200/e2e8f0/64748b?text=相机",
    description: "防水防摔，记录每一个精彩瞬间",
    category: "影音设备",
  },
  {
    id: "p6",
    name: "智能台灯",
    price: 199,
    image: "https://placehold.co/200x200/e2e8f0/64748b?text=台灯",
    description: "无极调光，护眼模式自动切换",
    category: "智能家居",
  },
];

export const mockCategories: Category[] = [
  { id: "c1", name: "智能穿戴", icon: "⌚", count: 24 },
  { id: "c2", name: "音频设备", icon: "🎧", count: 18 },
  { id: "c3", name: "影音设备", icon: "📷", count: 12 },
  { id: "c4", name: "外设", icon: "⌨️", count: 31 },
  { id: "c5", name: "智能家居", icon: "🏠", count: 15 },
  { id: "c6", name: "健康监测", icon: "❤️", count: 9 },
];

export const mockCompany: Company = {
  name: "星辰科技",
  slogan: "让科技触手可及",
  logo: "⭐",
  description:
    "星辰科技成立于2018年，专注于智能硬件研发与销售。我们致力于通过创新技术，让每个人都能享受科技带来的便利与美好。",
  founded: "2018",
  employees: "500+",
  location: "北京市海淀区",
  stats: [
    { label: "产品数量", value: "120+" },
    { label: "服务用户", value: "50万+" },
    { label: "合作商家", value: "2000+" },
    { label: "专利技术", value: "68项" },
  ],
};

export const mockCertifications: Certification[] = [
  {
    id: "cert1",
    name: "ISO 9001 质量管理",
    issuer: "国际标准化组织",
    date: "2023-06",
    icon: "🏅",
  },
  {
    id: "cert2",
    name: "3C 国家强制认证",
    issuer: "中国质量认证中心",
    date: "2023-03",
    icon: "🛡️",
  },
  {
    id: "cert3",
    name: "CE 欧盟认证",
    issuer: "欧盟委员会",
    date: "2022-12",
    icon: "🇪🇺",
  },
  {
    id: "cert4",
    name: "FCC 美国联邦认证",
    issuer: "美国联邦通信委员会",
    date: "2023-01",
    icon: "🇺🇸",
  },
];

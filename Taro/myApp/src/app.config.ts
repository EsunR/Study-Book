export default {
  pages: [
    // 首页
    "pages/index/index",
    "pages/index/appleWallet/index",
    // 新闻
    "pages/news/index",
    // 用户页
    "pages/user/index",
  ],
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/news/index",
        text: "新闻",
      },
      {
        pagePath: "pages/user/index",
        text: "用户",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};

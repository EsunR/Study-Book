export default {
  pages: ["pages/index/index", "pages/news/index", "pages/user/index"],
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

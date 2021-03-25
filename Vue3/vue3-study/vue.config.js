module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.ixiaowai.cn",
      },
    },
  },
};

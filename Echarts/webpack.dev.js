const merge = require("webpack-merge")
const common = require("./webpack.common.js")

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    // 设置 inline 这样当 html 发生改变后，页面也会呗刷新
    inline: true,
    hot: false,
    host: "localhost"
  }
})

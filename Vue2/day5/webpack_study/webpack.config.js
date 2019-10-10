const path = require('path');
// 启用热更新的第二步
const webpack = require('webpack');
// 导入在内存中生成HTML页面的插件
// 只要是插件一定要放到plugins中
const htmlWebpackPlugin = require('html-webpack-plugin');
// html-webpack-plugin插件的两个作用：
//  1. 自动在内存中根据指定的页面生成一个内存的页面
//  2. 自动把打包好的bundle.js追加到页面去

// 这个配置文件实际上就是一个js文件，通过node中的快捷操作，向外暴露了一个配置对象
module.exports = {
  // entry: 入口
  entry: path.join(__dirname, './src/main.js'),
  // output: 出口
  output: {
    path: path.join(__dirname, './dist'), // 指定打包好的文件输出到哪个目录中去
    filename: 'bundle.js' // 指定输出的文件的名称
  },
  devServer: {  // 这是配置dev-server命令参数的第二种形式，相对来说这种方式麻烦一些
    open: true,          // 自动打开浏览器
    port: 3000,          // 设置启动时候的运行端口
    contentBase: 'src',  // 指定托管的根目录
    hot: true            // 启动热更新，启动热更新的第一步
  },
  plugins: [  // 配置插件的节点
    new webpack.HotModuleReplacementPlugin(),  // new一个热更新的模块对象，这是启用热更新的第三步
    new htmlWebpackPlugin({   // 创建一个在内存中生成 HTML 页面的插件
      template: path.join(__dirname, './src/index.html'),   //指定模板页面，将来会根据指定的页面路径去生成内存中的页面
      filename: 'index.html'    // 指定生成的页面的名称
    })
  ],
  module: {   // 这个节点用来配置所有的第三方模块加载器
    rules: [  // 所有第三方模块的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },                // 配置处理.css文件的第三方loader规则
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 配置处理.less文件的第三方loader规则
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 配置处理.scss文件的第三方loader规则
    ]
  }
}
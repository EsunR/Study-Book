// 这个main.js是我们项目的js入口文件
// 1.导入Jquery
import $ from 'jquery';
// ES6中导入模块的方式
// 相当于node中的 const $ = require('jquery');
// 但由于ES6语法太高级了，浏览器报错

// 使用import语法导入css样式表
import './css/index.css';
// 注意：webpack只能处理js文件，无法处理非js的文件
// 如果要处理非js的文件，我们需要手动安装一些第三方的加载器loader加载器
// 如果需要打包处理css文件:
//  1. 需要安装 npm i style-loader css-loader -D
//  2. 打开webpack.config.js这个配置文件，新增一个
//     配置节点叫做module，她是一个对象；在这个对象
//     上有个rules属性，这个rules属性是个数组，这个
//     数组中存放了所有第三方文件的匹配和处理规则

import './css/index.less';

import './css/index.scss';

// 注意： webpack 处理第三方文件类型的过程：
// 1. 发现这个 要处理的文件不是JS文件，然后就去 配置文件中，查找有没有对应的第三方 loader 规则
// 2. 如果能找到对应的规则， 就会调用 对应的 loader 处理 这种文件类型；
// 3. 在调用loader 的时候，是从后往前调用的；
// 4. 当最后的一个 loader 调用完毕，会把 处理的结果，直接交给 webpack 进行 打包合并，最终输出到  bundle.js 中去



$(function () {  
  $('li:odd').css('background','pink')
  $('li:even').css('background','yellow')
})

// 使用webpack-dev-server来实现自动打包编译的功能
// npm install webpack-dev-server -D
// 安装完毕后这个工具的用法和webpack的用法完全一样

// webpack-dev-server打包的bundle.js文件，并没有
// 存放到实际的物理磁盘上；而是直接托管到了电脑的内
// 存中，所以，我们在项目根目录中，根本找不到这个打
// 包好的bundle.js

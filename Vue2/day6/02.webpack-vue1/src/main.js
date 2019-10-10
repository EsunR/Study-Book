// 如何在webpack构建的项目中使用Vue进行开发

// 在webpack中使用 import Vue from 'vue' 导入的Vue构造函数，只提供了 runtime-only 的方式，并没有提供像网页中的使用方式
// import Vue from 'vue'
import Vue from '../node_modules/vue/dist/vue.js'
// 回顾：包的查找规则：
// 1. 查看项目根目录中有 node_modules 的文件夹
// 2. 根据包名找对应的vue文件夹
// 3. 在vue文件夹中找一个叫做 package.json 的包配置文件
// 4. 在 package.json 中查找一个 main 属性 [main 属性指定了这个包在被加载的时候的入口文件 ]


// 传统方式导入login组件：
// var login = {
//   template: '<h1>这是login组件</h1>'
// }

// 用.vue文件导入login组件
// 默认webpack无法打包.vue文件，需要安装相关的loader
// cnpm i vue-loader vue-template-compiler -D
import login from './login.vue';

var vm = new Vue({
  el: '#app',
  data: {
    msg: '123'
  },
  // 传统方式注册组件
  // components: {
  //   login
  // }

  // 用.vue文件导入的login组件只能被渲染出来 (vue-loader 15 用传统方式也可以)
  // render: function (createElements) {  
  //   return createElements(login);
  // }
  // 简写：
  render: c => c(login),
})



import m1, { title as title123, content } from './test.js'
console.log(m1);
console.log(title123);
console.log(content);
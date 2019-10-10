
- [`watch`属性的使用](#watch%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%BF%E7%94%A8)
- [`computed`计算属性的使用](#computed%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%BF%E7%94%A8)
- [`watch`、`computed`和`methods`之间的对比](#watchcomputed%E5%92%8Cmethods%E4%B9%8B%E9%97%B4%E7%9A%84%E5%AF%B9%E6%AF%94)
- [`nrm`的安装使用](#nrm%E7%9A%84%E5%AE%89%E8%A3%85%E4%BD%BF%E7%94%A8)
- [在网页中会引用哪些常见的静态资源？](#%E5%9C%A8%E7%BD%91%E9%A1%B5%E4%B8%AD%E4%BC%9A%E5%BC%95%E7%94%A8%E5%93%AA%E4%BA%9B%E5%B8%B8%E8%A7%81%E7%9A%84%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90)
- [网页中引入的静态资源多了以后有什么问题？？？](#%E7%BD%91%E9%A1%B5%E4%B8%AD%E5%BC%95%E5%85%A5%E7%9A%84%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%E5%A4%9A%E4%BA%86%E4%BB%A5%E5%90%8E%E6%9C%89%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
- [如何解决上述两个问题](#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E4%B8%8A%E8%BF%B0%E4%B8%A4%E4%B8%AA%E9%97%AE%E9%A2%98)
- [什么是webpack?](#%E4%BB%80%E4%B9%88%E6%98%AFwebpack)
- [如何完美实现上述的2种解决方案](#%E5%A6%82%E4%BD%95%E5%AE%8C%E7%BE%8E%E5%AE%9E%E7%8E%B0%E4%B8%8A%E8%BF%B0%E7%9A%842%E7%A7%8D%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
- [webpack安装的两种方式](#webpack%E5%AE%89%E8%A3%85%E7%9A%84%E4%B8%A4%E7%A7%8D%E6%96%B9%E5%BC%8F)
- [初步使用webpack打包构建列表隔行变色案例](#%E5%88%9D%E6%AD%A5%E4%BD%BF%E7%94%A8webpack%E6%89%93%E5%8C%85%E6%9E%84%E5%BB%BA%E5%88%97%E8%A1%A8%E9%9A%94%E8%A1%8C%E5%8F%98%E8%89%B2%E6%A1%88%E4%BE%8B)
  - [新版本的webpack4语法上做出了改变](#%E6%96%B0%E7%89%88%E6%9C%AC%E7%9A%84webpack4%E8%AF%AD%E6%B3%95%E4%B8%8A%E5%81%9A%E5%87%BA%E4%BA%86%E6%94%B9%E5%8F%98)
- [使用webpack的配置文件简化打包时候的命令(兼容v3/v4)](#%E4%BD%BF%E7%94%A8webpack%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E7%AE%80%E5%8C%96%E6%89%93%E5%8C%85%E6%97%B6%E5%80%99%E7%9A%84%E5%91%BD%E4%BB%A4%E5%85%BC%E5%AE%B9v3v4)
- [实现webpack的实时打包构建](#%E5%AE%9E%E7%8E%B0webpack%E7%9A%84%E5%AE%9E%E6%97%B6%E6%89%93%E5%8C%85%E6%9E%84%E5%BB%BA)
- [使用`html-webpack-plugin`插件配置启动页面](#%E4%BD%BF%E7%94%A8html-webpack-plugin%E6%8F%92%E4%BB%B6%E9%85%8D%E7%BD%AE%E5%90%AF%E5%8A%A8%E9%A1%B5%E9%9D%A2)
- [使用webpack打包css文件](#%E4%BD%BF%E7%94%A8webpack%E6%89%93%E5%8C%85css%E6%96%87%E4%BB%B6)
- [使用webpack打包less文件](#%E4%BD%BF%E7%94%A8webpack%E6%89%93%E5%8C%85less%E6%96%87%E4%BB%B6)
- [使用webpack打包sass文件](#%E4%BD%BF%E7%94%A8webpack%E6%89%93%E5%8C%85sass%E6%96%87%E4%BB%B6)
- [使用webpack处理css中的路径](#%E4%BD%BF%E7%94%A8webpack%E5%A4%84%E7%90%86css%E4%B8%AD%E7%9A%84%E8%B7%AF%E5%BE%84)
- [使用babel处理高级JS语法](#%E4%BD%BF%E7%94%A8babel%E5%A4%84%E7%90%86%E9%AB%98%E7%BA%A7js%E8%AF%AD%E6%B3%95)
- [相关文章](#%E7%9B%B8%E5%85%B3%E6%96%87%E7%AB%A0)

> 对应视频 P83-P101

## `watch`属性的使用
考虑一个问题：想要实现 `名` 和 `姓` 两个文本框的内容改变，则全名的文本框中的值也跟着改变；（用以前的知识如何实现？？？）

1. 监听`data`中属性的改变：
```
<div id="app">
    <input type="text" v-model="firstName"> +
    <input type="text" v-model="lastName"> =
    <span>{{fullName}}</span>
  </div>

  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        firstName: 'jack',
        lastName: 'chen',
        fullName: 'jack - chen'
      },
      methods: {},
      watch: {
        'firstName': function (newVal, oldVal) { // 第一个参数是新数据，第二个参数是旧数据
          this.fullName = newVal + ' - ' + this.lastName;
        },
        'lastName': function (newVal, oldVal) {
          this.fullName = this.firstName + ' - ' + newVal;
        }
      }
    });
  </script>
```
2. 监听路由对象的改变：
```
<div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>

    <router-view></router-view>
  </div>

  <script>
    var login = Vue.extend({
      template: '<h1>登录组件</h1>'
    });

    var register = Vue.extend({
      template: '<h1>注册组件</h1>'
    });

    var router = new VueRouter({
      routes: [
        { path: "/login", component: login },
        { path: "/register", component: register }
      ]
    });

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      router: router,
      watch: {
        '$route': function (newVal, oldVal) {
          if (newVal.path === '/login') {
            console.log('这是登录组件');
          }
        }
      }
    });
  </script>
```

## `computed`计算属性的使用
1. 默认只有`getter`的计算属性：
```
<div id="app">
    <input type="text" v-model="firstName"> +
    <input type="text" v-model="lastName"> =
    <span>{{fullName}}</span>
  </div>

  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        firstName: 'jack',
        lastName: 'chen'
      },
      methods: {},
      computed: { // 计算属性； 特点：当计算属性中所以来的任何一个 data 属性改变之后，都会重新触发 本计算属性 的重新计算，从而更新 fullName 的值
        fullName() {
          return this.firstName + ' - ' + this.lastName;
        }
      }
    });
  </script>
```
2. 定义有`getter`和`setter`的计算属性：
```
<div id="app">
    <input type="text" v-model="firstName">
    <input type="text" v-model="lastName">
    <!-- 点击按钮重新为 计算属性 fullName 赋值 -->
    <input type="button" value="修改fullName" @click="changeName">

    <span>{{fullName}}</span>
  </div>

  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        firstName: 'jack',
        lastName: 'chen'
      },
      methods: {
        changeName() {
          this.fullName = 'TOM - chen2';
        }
      },
      computed: {
        fullName: {
          get: function () {
            return this.firstName + ' - ' + this.lastName;
          },
          set: function (newVal) {
            var parts = newVal.split(' - ');
            this.firstName = parts[0];
            this.lastName = parts[1];
          }
        }
      }
    });
  </script>
```

## `watch`、`computed`和`methods`之间的对比
1. `computed`属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
2. `methods`方法表示一个具体的操作，主要书写业务逻辑；
3. `watch`一个对象，键是需要观察的表达式，值是对应回调函数。主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作；可以看作是`computed`和`methods`的结合体；

## `nrm`的安装使用
作用：提供了一些最常用的NPM包镜像地址，能够让我们快速的切换安装包时候的服务器地址；
什么是镜像：原来包刚一开始是只存在于国外的NPM服务器，但是由于网络原因，经常访问不到，这时候，我们可以在国内，创建一个和官网完全一样的NPM服务器，只不过，数据都是从人家那里拿过来的，除此之外，使用方式完全一样；
1. 运行`npm i nrm -g`全局安装`nrm`包；
2. 使用`nrm ls`查看当前所有可用的镜像源地址以及当前所使用的镜像源地址；
3. 使用`nrm use npm`或`nrm use taobao`切换不同的镜像源地址；

> 注意： nrm 只是单纯的提供了几个常用的 下载包的 URL地址，并能够让我们在 这几个 地址之间，很方便的进行切换，但是，我们每次装包的时候，使用的 装包工具，都是  npm

## 在网页中会引用哪些常见的静态资源？
+ JS
  - .js  .jsx  .coffee  .ts（TypeScript 类C#语言）
+ CSS
  - .css  .less   .sass  .scss
+ Images
  - .jpg   .png   .gif   .bmp   .svg
+ 字体文件（Fonts）
  - .svg   .ttf   .eot   .woff   .woff2
+ 模板文件
  - .ejs   .jade  .vue【这是在webpack中定义组件的方式，推荐这么用】


## 网页中引入的静态资源多了以后有什么问题？？？
1. 网页加载速度慢， 因为 我们要发起很多的二次请求；
2. 要处理错综复杂的依赖关系


## 如何解决上述两个问题
1. 合并、压缩、精灵图、图片的Base64编码
2. 可以使用之前学过的requireJS、也可以使用webpack可以解决各个包之间的复杂依赖关系；

## 什么是webpack?
webpack 是前端的一个项目构建工具，它是基于 Node.js 开发出来的一个前端工具；


## 如何完美实现上述的2种解决方案
1. 使用Gulp， 是基于 task 任务的；
2. 使用Webpack， 是基于整个项目进行构建的；
+ 借助于webpack这个前端自动化构建工具，可以完美实现资源的合并、打包、压缩、混淆等诸多功能。
+ 根据官网的图片介绍webpack打包的过程
+ [webpack官网](http://webpack.github.io/)

## webpack安装的两种方式
1. 运行`npm i webpack -g`全局安装webpack，这样就能在全局使用webpack的命令
2. 在项目根目录中运行`npm i webpack --save-dev`安装到项目依赖中
3. PS:新版本的webpack需要同时安装webpack-cli才能运行

## 初步使用webpack打包构建列表隔行变色案例
1. 运行`npm init`初始化项目，使用npm管理项目中的依赖包
2. 创建项目基本的目录结构
3. 使用`cnpm i jquery --save`安装jquery类库
4. 创建`main.js`并书写各行变色的代码逻辑：
```js
// 导入jquery类库
import $ from 'jquery'

// 设置偶数行背景色，索引从0开始，0是偶数
$('#list li:even').css('backgroundColor','lightblue');
// 设置奇数行背景色
$('#list li:odd').css('backgroundColor','pink');
```
5. 直接在页面上引用`main.js`会报错，因为浏览器不认识`import`这种高级的JS语法，需要使用webpack进行处理，webpack默认会把这种高级的语法转换为低级的浏览器能识别的语法；
6. 运行`webpack 入口文件路径 输出文件路径`对`main.js`进行处理：
```
webpack src/js/main.js dist/bundle.js       //webpack 3
webpack src/js/main.js -o dist/bundle.js    //webpack 4
```
### 新版本的webpack4语法上做出了改变
不使用配置文件输出的方法：`webpack <entry> [<entry>] -o <output>`  
> `entey`：为入口的文件  
> `output`：为出口的文件  

**注意事项：**  
1. 当单独使用 `npx webpack` 且没有配置文件时，则会自动的将 `.\src\index.js` 文件转化为 `.\dist\bundel.js` 文件。
2. 使用配置文件后，会根据配置文件的信息来生成打包后的文件。配置文件模板如下：  
   /webpack.config.js
    ```js
    const path = require('path');
    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      }
    };
    ```
3. 当参数 `<output>` 未填写时，输出文件会被放置在 `.\dist\` 目录下，文件名跟源文件相同。
4. 在终端中运行webpack代码时，目录需要用 `\` 反斜杠来分隔。
5. webpack3 的最后发行版本为 3.10.0

## 使用webpack的配置文件简化打包时候的命令(兼容v3/v4)
1. 在项目根目录中创建`webpack.config.js`
2. 由于运行webpack命令的时候，webpack需要指定入口文件和输出文件的路径，所以，我们需要在`webpack.config.js`中配置这两个路径：
    ```js
    var path = require('path');
    module.exports = {
      // 项目入口文件
      entry: path.resolve(__dirname, './src/js/main.js'),
      // 配置输出选项
      output: { 
        path: path.resolve(__dirname, './dist'),  // 配置输出的路径
        filename: 'bundle.js'                     // 配置输出的文件名
      }
    }
    ```

## 实现webpack的实时打包构建
1. 由于每次重新修改代码之后，都需要手动运行webpack打包的命令，比较麻烦，所以使用`webpack-dev-server`来实现代码实时打包编译，当修改代码之后，会自动进行打包构建。
2. 运行`cnpm i webpack-dev-server --save-dev`安装到开发依赖
3. 安装完成之后，在命令行直接运行`webpack-dev-server`来进行打包，发现报错，此时需要借助于`package.json`文件中的指令，来进行运行`webpack-dev-server`命令，在`scripts`节点下新增`"dev": "webpack-dev-server"`指令，发现可以进行实时打包，但是dist目录下并没有生成`bundle.js`文件，这是因为`webpack-dev-server`将打包好的文件放在了内存中
  + 把`bundle.js`放在内存中的好处是：由于需要实时打包编译，所以放在内存中速度会非常快
  + 这个时候访问webpack-dev-server启动的`http://localhost:8080/`网站，发现是一个文件夹的面板，需要点击到src目录下，才能打开我们的index首页，此时引用不到bundle.js文件，需要修改index.html中script的src属性为:`<script src="../bundle.js"></script>`
  + 为了能在访问`http://localhost:8080/`的时候直接访问到`/src/index.html`首页，可以使用`--contentBase src`指令来修改dev指令，指定启动的根目录：
    ```json
    "dev": "webpack-dev-server --contentBase src"
    ```
  + 其他指令：

    自动打开浏览器并转到指定的端口，开启热加载
    ```json
    "dev": "webpack-dev-server [--open] [--port <端口号>] [--hot]"
    ```

    同时修改index页面中script的src属性为`<script src="bundle.js"></script>`

  + 将指令写至 `webpack.config.js` 中使配置结构更清晰:
    ```js
    var path = require('path');
    // 想要启用devServer设置中的热更新就要在配置文件中调用webpack模块 (启动热更新的第二步)
    var webpack = require('webpack'); 

    module.exports = {
      entry: ... ,
      output: ... ,
      devServer: {  // 这是配置dev-server命令参数的第二种形式，相对来说这种方式麻烦一些
        open: true,          // 自动打开浏览器
        port: 3000,          // 设置启动时候的运行端口
        contentBase: 'src',  // 指定托管的根目录
        hot: true            // 启动热更新 (启动热更新的第一步)
      },
      plugins: [ 
        // 启用热更新需 new 一个热更新插件对象放入 plugins 选项中
        new webpack.HotModuleReplacementPlugin()
      ]
    }
    ```

## 使用`html-webpack-plugin`插件配置启动页面

由于使用`--contentBase`指令的过程比较繁琐，需要指定启动的目录，同时还需要修改index.html中script标签的src属性，所以推荐大家使用`html-webpack-plugin`插件配置启动页面.

1. 运行`cnpm i html-webpack-plugin --save-dev`安装到开发依赖
2. 修改`webpack.config.js`配置文件如下：
```js
var path = require('path');
// 导入自动生成HTMl文件的插件
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ... ,
  output: ... ,
  plugins:[ // 添加plugins节点配置插件
    new htmlWebpackPlugin({
      template:path.resolve(__dirname, 'src/index.html'),//模板路径
      filename:'index.html'//自动生成的HTML文件的名称，需要与模板路径一致
    })
  ]
}
```
1. 修改`package.json`中`script`节点中的dev指令如下：
```json
"dev": "webpack-dev-server"
```
4. 将index.html中script标签注释掉，因为`html-webpack-plugin`插件会自动把bundle.js注入到index.html页面中！





## 使用webpack打包css文件
1. 运行`cnpm i style-loader css-loader --save-dev`
2. 修改`webpack.config.js`这个配置文件：
```js
module: { // 用来配置第三方loader模块的
  rules: [ // 文件的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }//处理css文件的规则
  ]
}
```
3. 注意：`use`表示使用哪些模块来处理`test`所匹配到的文件；`use`中相关loader模块的调用顺序是从后向前调用的；

## 使用webpack打包less文件
1. 运行`cnpm i less-loader less -D`
2. 修改`webpack.config.js`这个配置文件：
```js
module: { // 用来配置第三方loader模块的
  rules: [ // 文件的匹配规则
    { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //处理css文件的规则 
    { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] } //处理less文件的规则
  ]
}
```

## 使用webpack打包sass文件
1. 运行`cnpm i sass-loader node-sass --save-dev`
2. 在`webpack.config.js`中添加处理sass文件的loader模块：
```js
module: { // 用来配置第三方loader模块的
  rules: [ // 文件的匹配规则
    { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //处理css文件的规则 
    { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //处理less文件的规则
    { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, //处理scss文件的规则
  ]
}
```

## 使用webpack处理css中的路径
1. 运行`cnpm i url-loader file-loader --save-dev`
2. 在`webpack.config.js`中添加处理url路径的loader模块：
```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader' }
```
3. 可以通过`limit`指定进行base64编码的图片大小；只有小于指定字节（byte）的图片才会进行base64编码：
```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43960' },
```

## 使用babel处理高级JS语法
1. 运行`cnpm i babel-core babel-loader babel-plugin-transform-runtime --save-dev`安装babel的相关loader包
2. 运行`cnpm i babel-preset-es2015 babel-preset-stage-0 --save-dev`安装babel转换的语法
3. 在`webpack.config.js`中添加相关loader模块，其中需要注意的是，一定要把`node_modules`文件夹添加到排除项：
```
{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
```
4. 在项目根目录中添加`.babelrc`文件，并修改这个配置文件如下：
```
{
    "presets":["es2015", "stage-0"],
    "plugins":["transform-runtime"]
}
```
5. **注意：语法插件`babel-preset-es2015`可以更新为`babel-preset-env`，它包含了所有的ES相关的语法；**

## 相关文章
[babel-preset-env：你需要的唯一Babel插件](https://segmentfault.com/p/1210000008466178)
[Runtime transform 运行时编译es6](https://segmentfault.com/a/1190000009065987)
- [使用webpack处理css中的路径](#%E4%BD%BF%E7%94%A8webpack%E5%A4%84%E7%90%86css%E4%B8%AD%E7%9A%84%E8%B7%AF%E5%BE%84)
  - [处理图片路径](#%E5%A4%84%E7%90%86%E5%9B%BE%E7%89%87%E8%B7%AF%E5%BE%84)
  - [处理字体路径](#%E5%A4%84%E7%90%86%E5%AD%97%E4%BD%93%E8%B7%AF%E5%BE%84)
- [使用babel处理高级JS语法](#%E4%BD%BF%E7%94%A8babel%E5%A4%84%E7%90%86%E9%AB%98%E7%BA%A7js%E8%AF%AD%E6%B3%95)
- [在普通页面中使用render函数渲染组件](#%E5%9C%A8%E6%99%AE%E9%80%9A%E9%A1%B5%E9%9D%A2%E4%B8%AD%E4%BD%BF%E7%94%A8render%E5%87%BD%E6%95%B0%E6%B8%B2%E6%9F%93%E7%BB%84%E4%BB%B6)
- [在webpack中配置.vue组件页面的解析](#%E5%9C%A8webpack%E4%B8%AD%E9%85%8D%E7%BD%AEvue%E7%BB%84%E4%BB%B6%E9%A1%B5%E9%9D%A2%E7%9A%84%E8%A7%A3%E6%9E%90)
- [在使用webpack构建的Vue项目中使用模板对象？](#%E5%9C%A8%E4%BD%BF%E7%94%A8webpack%E6%9E%84%E5%BB%BA%E7%9A%84vue%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%A8%A1%E6%9D%BF%E5%AF%B9%E8%B1%A1)
- [ES6中语法使用总结](#es6%E4%B8%AD%E8%AF%AD%E6%B3%95%E4%BD%BF%E7%94%A8%E6%80%BB%E7%BB%93)
- [在vue组件页面中，集成vue-router路由模块](#%E5%9C%A8vue%E7%BB%84%E4%BB%B6%E9%A1%B5%E9%9D%A2%E4%B8%AD%E9%9B%86%E6%88%90vue-router%E8%B7%AF%E7%94%B1%E6%A8%A1%E5%9D%97)
- [组件中的css作用域问题](#%E7%BB%84%E4%BB%B6%E4%B8%AD%E7%9A%84css%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%97%AE%E9%A2%98)
- [抽离路由为单独的模块](#%E6%8A%BD%E7%A6%BB%E8%B7%AF%E7%94%B1%E4%B8%BA%E5%8D%95%E7%8B%AC%E7%9A%84%E6%A8%A1%E5%9D%97)
- [相关文章](#%E7%9B%B8%E5%85%B3%E6%96%87%E7%AB%A0)

## 使用webpack处理css中的路径

### 处理图片路径
1. 运行`cnpm i url-loader file-loader --save-dev`
2. 在 webpack.config.js 中 `module` 配置下的 `rules` 选项中添加
    ```js
    { test: /\.(png|jpg|gif)$/, use: 'url-loader' }
    ```
3. 可以通过 `limit` 指定进行base64编码的图片大小；只有小于指定字节（byte）的图片才会进行base64编码：
    ```js
    { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43960' }
    ```
4. 由于图片引入后，图片会被重命名为一个编码字符串，我们可以用 `name` 指定图片文件名。
   
   > `[name]` 表示文件名原名，`[ext]` 表示文件原拓展名，托管路径会显示为服务器根目录

    ```js
    { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43960&name=[name].[ext]' }
    ```
5. 为图片名添加前缀哈希值，防止重复命名

    > `[hash:8]` 表示八位哈希值，最长为32位

    ```js
    { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43960&name=[hash:8]-[name].[ext]' }
    ```

### 处理字体路径
1. 在 main.js 中引入 `bootstrap.css` 
   ```js
   import 'bootstrap/dist/css/bootstrap.css'
   ```
   > 注意：在引入node_modules文件下的node模块时，引入目录可以直接以node_modules为根目录引用  ， `./` 在事例项目中代表的路径为 `/src` 
2. 在 webpack.config.js 中 `module` 配置下的 `rules` 选项中添加
   ```js
   { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }
   ```
    


## 使用babel处理高级JS语法
1. 运行`cnpm i babel-core babel-loader babel-plugin-transform-runtime --save-dev`安装babel的相关loader包
2. 运行`cnpm i babel-preset-es2015 babel-preset-stage-0 --save-dev`安装babel转换的语法
3. 在`webpack.config.js`中添加相关loader模块，其中需要注意的是，一定要把`node_modules`文件夹添加到排除项：
    ```
    { test: /\.js$/, use: 'babel-loader', exclude: /node_module s/ }
    ```
    > `exclude` : 排除规定目录下的文件
4. 在项目根目录中添加`.babelrc`文件，并修改这个配置文件如下：
    ```
    {
      "presets":["es2015", "stage-0"],
      "plugins":["transform-runtime"]
    }
    ```
    > `presets` : 存放语法插件，语法插件名称不包含前缀 "babel-preset-"  
    > `plugins` : 存放插件，插件名称不包含前缀 "babel-plugin-"　　
5. **注意：语法插件`babel-preset-es2015`可以更新为`babel-preset-env`，它包含了所有的ES相关的语法；**



## 在普通页面中使用render函数渲染组件
> `render` 是vm实例中的一个配置选项，本身是一个方法，会将返回的组件对象完全替换页面中el指定的那个容器
1. 定义模板：
```js
var login = {
template: '<h1>这是登录组件</h1>'
}
```
2. 配置render：
```js
var vm = new Vue({
  el: '#app',
  ...
  render: function(createElements){
  // createElements是一个方法，调用它能把指定的模板组件渲染为html结构
  return createElements(login);
  }
});
```


## 在webpack中配置.vue组件页面的解析

1. 运行`cnpm i vue -S`将vue安装为运行依赖；

2. 运行`cnpm i vue-loader vue-template-compiler -D`将解析转换vue的包安装为开发依赖；

3. 运行`cnpm i style-loader css-loader -D`将解析转换CSS的包安装为开发依赖，因为.vue文件中会写CSS样式；

4. 在`webpack.config.js`中，添加如下`module`规则：

```js
module: {
  rules: [
    { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    { test: /\.vue$/, use: 'vue-loader' }
  ]
}

// "vue-loader": "^13.3.0",
// "vue-template-compiler": "^2.5.2",
```
> 注意：vue-loader 14 迁移到 vue-loader 15 需要在 `webpack.config.js` 引入一个 webpack 插件才能正确使用！
```js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // ...
  plugins: [
    new VueLoaderPlugin()
  ]
}
```


5. 创建`App.js`组件页面：

```html
<template>
  <!-- 注意：在 .vue 的组件中，template 中必须有且只有唯一的根元素进行包裹，一般都用 div 当作唯一的根元素 -->
  <div>
    <h1>这是APP组件 - {{msg}}</h1>
    <h3>我是h3</h3>
  </div>
</template>


<script>
// 注意：在 .vue 的组件中，通过 script 标签来定义组件的行为，需要使用 ES6 中提供的 export default 方式，导出一个vue实例对象
export default {
  data() {
    return {
      msg: 'OK'
    }
  }
}
</script>


<style scoped>
h1 {
  color: red;
}
</style>
```

6. 创建`main.js`入口文件：

```js
// 导入 Vue 组件
import Vue from 'vue'

// 导入 App组件
import App from './components/App.vue'

// 创建一个 Vue 实例，使用 render 函数，渲染指定的组件
var vm = new Vue({
  el: '#app',
  // render: function (createElements) {  
  //   return createElements(app);
  // }
  // 简写：
  render: c => c(app)
});
```

## 在使用webpack构建的Vue项目中使用模板对象？
1. 方法1：在`webpack.config.js`中添加`resolve`属性：
> resolve: 解决  
> alias: 别号
```js
// 设置vue被导入时候的包的路径
resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
```

1. 方法2：在入口文件 `main.js` 引包的时候以路径的方式引入
```js
import Vue from '../node_modules/vue/dist/vue.js'
```

3. 方法3：因为包的查找规则是，先查看项目根目录中有 `node_modules` 的文件夹，然后根据包名找对应  的 `vue` 文件夹，在 `vue` 文件夹中找一个叫做 `package.json` 的包配置文件，在 `package.json` 中查找一个 `main` 属性 ( `main` 属性指定了这个包在被加载的时候的入口文件)。所以我们可以直接修改 `packgae.json` 中的 `mian` 属性来改改引入的文件。
```js
- "main": "dist/vue.runtime.common.js"
+ "main": "dist/vue.js"
```




## ES6中语法使用总结

1. 使用 `export default` 和 `export` 导出模块中的成员; 对应ES5中的 `module.exports` 和 `export`

2. 使用 `import ** from '**'` 和 `import '路径'` 还有 `import {a, b} from '模块标识'` 导入其他模块

3. 使用箭头函数：`(a, b)=> { return a-b; }`



## 在vue组件页面中，集成vue-router路由模块

[vue-router官网](https://router.vuejs.org/)

0. 目录结构
```
index.html
main.js
App.vue
components
| acount
| | login.vue
| | register.vue 
```

1. 导入路由模块：

```js
// main.js
import VueRouter from 'vue-router'
```

2. 安装路由模块：

```js
// main.js
Vue.use(VueRouter);
```

1. 导入需要展示的组件:

```js
// main.js
import login from './components/account/login.vue'
import register from './components/account/register.vue'
```

4. 创建路由对象:

```js
// main.js
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/register', component: register }
  ]
});
```

5. 将路由对象，挂载到 Vue 实例上:
```js
// mian.js
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  // 1. 渲染方法：
  // render: function render(c){
  //   return c(app);
  // }
  // 2. 可简化为：
  // render(c) {
  //   return c(app);
  // }
  // 3. 再简化
  // render: c => { return c(app) }
  // 4. 最终简化
  render: c => c(app)
  router // 将路由对象，挂载到 Vue 实例上
});
```

6. 改造App.vue组件，在 template 中，添加`router-link`和`router-view`：

```html
<!-- App.vue -->
<router-link to="/login">登录</router-link>
<router-link to="/register">注册</router-link>
<router-view></router-view>
```



## 组件中的css作用域问题

vue文件中的 `style` 标签可用来写该组件的样式，也可以写插入样式为全局的样式。

1. 插入全局样式：
```html
<style>
div{
  color: red;
}
</style>
```

2. 设置作用域，让写入的样式仅覆盖当前组件：
```html
<style scoped>
div{
  color: blue;
}
</style>
```

3. 用 `lang` 属性设置css语法类型

```scss
<style lang="scss" scoped>
body {
  div {
    font-style: italic;
  }
}
</style>
```

## 抽离路由为单独的模块

由于之前的路由信息全写入在 `main.js` 文件中，会导致文件内容冗杂，所以用模块化思想，将 `vue-router` 的部分分离出去为一个单独的 `router.js` 文件，之后再向外暴露一个 `router` 对象，我们在 `main.js` 中接收这个 `router` 对象就可以了。

简单来说，我们只是把原来 `main.js` 中构造 `router` 对象的过程移出去再导入了而已，其余的内容并未改变。

1. 抽离 `router` 对象的构建过程：
```js
// main.js
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 原来在此构建router对象，现在在此引入router对象
import router from './router.js';

import app from './App.vue';
var vm = new Vue({
  // ...
})
```

2. 在外部构建 `router` 对象：
```js
// router.js
// 由于使用了VueRouter对象，所以要要入vue-router模块
import VueRouter from 'vue-router';

// ... 用 'import xxx form xxx' 引入相关的 '.vue' 文件，并实例化为一个对象

var router = new VueRouter({
  routes: [
    // ... 路由规则
  ]
})

// 把路由对象暴露出去
export default router;
```


## 相关文章
[babel-preset-env：你需要的唯一Babel插件](https://segmentfault.com/p/1210000008466178)  
[Runtime transform 运行时编译es6](https://segmentfault.com/a/1190000009065987)
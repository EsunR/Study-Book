> 本讲义对应视频 P117-P136  
> api地址：http://www.liulongbin.top:3005/api/
- [使用 饿了么的 MintUI 组件](#%E4%BD%BF%E7%94%A8-%E9%A5%BF%E4%BA%86%E4%B9%88%E7%9A%84-mintui-%E7%BB%84%E4%BB%B6)
- [Mint-UI中按需导入的配置方式](#mint-ui%E4%B8%AD%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F)
- [使用 MUI 代码片段](#%E4%BD%BF%E7%94%A8-mui-%E4%BB%A3%E7%A0%81%E7%89%87%E6%AE%B5)
- [将项目源码托管到oschina中](#%E5%B0%86%E9%A1%B9%E7%9B%AE%E6%BA%90%E7%A0%81%E6%89%98%E7%AE%A1%E5%88%B0oschina%E4%B8%AD)
- [App.vue 组件的基本设置](#appvue-%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E8%AE%BE%E7%BD%AE)
- [实现 tabbar 页签不同组件页面的切换](#%E5%AE%9E%E7%8E%B0-tabbar-%E9%A1%B5%E7%AD%BE%E4%B8%8D%E5%90%8C%E7%BB%84%E4%BB%B6%E9%A1%B5%E9%9D%A2%E7%9A%84%E5%88%87%E6%8D%A2)
- [使用 mt-swipe 轮播图组件](#%E4%BD%BF%E7%94%A8-mt-swipe-%E8%BD%AE%E6%92%AD%E5%9B%BE%E7%BB%84%E4%BB%B6)
- [在`.vue`组件中使用`vue-resource`获取数据](#%E5%9C%A8vue%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8vue-resource%E8%8E%B7%E5%8F%96%E6%95%B0%E6%8D%AE)
- [使用mui的`tab-top-webview-main`完成分类滑动栏](#%E4%BD%BF%E7%94%A8mui%E7%9A%84tab-top-webview-main%E5%AE%8C%E6%88%90%E5%88%86%E7%B1%BB%E6%BB%91%E5%8A%A8%E6%A0%8F)
  - [兼容问题](#%E5%85%BC%E5%AE%B9%E9%97%AE%E9%A2%98)
- [移除严格模式](#%E7%A7%BB%E9%99%A4%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F)
- [vue-preview](#vue-preview)

## 使用 饿了么的 MintUI 组件

[Github 仓储地址](https://github.com/ElemeFE/mint-ui)

[Mint-UI官方文档](http://mint-ui.github.io/#!/zh-cn)

1. 导入所有MintUI组件：

```js
import MintUI from 'mint-ui'
```

2. 导入样式表：

```js
import 'mint-ui/lib/style.css'
```

3. 在 vue 中使用 MintUI中的Button按钮和Toast弹框提示：

```js
Vue.use(MintUI)
```

4. 使用的例子：

```js
<mt-button type="primary" size="large">primary</mt-button>
```


## Mint-UI中按需导入的配置方式



## 使用 MUI 代码片段
> 注意： MUI 不同于 Mint-UI，MUI只是开发出来的一套好用的代码片段，里面提供了配套的样式、配套的HTML代码段，类似于 Bootstrap； 而 Mint-UI，是真正的组件库，是使用 Vue 技术封装出来的 成套的组件，可以无缝的和 VUE项目进行集成开发；
> 因此，从体验上来说， Mint-UI体验更好，因为这是别人帮我们开发好的现成的Vue组件；
> 从体验上来说， MUI和Bootstrap类似；
> 理论上，任何项目都可以使用 MUI 或 Bootstrap，但是，MInt-UI只适用于Vue项目；


注意： MUI 并不能使用  npm 去下载，需要自己手动从 github 上，下载现成的包，自己解压出来，然后手动拷贝到项目中使用；

相关连接： 
[官网首页](http://dev.dcloud.net.cn/mui/)
[文档地址](http://dev.dcloud.net.cn/mui/ui/)

1. 导入 MUI 的样式表：

```js
import '../lib/mui/css/mui.min.css'
```

2. 在`webpack.config.js`中添加新的loader规则：

```js
{ test: /\.(png|jpg|gif|ttf)$/, use: 'url-loader' }
```

3. 根据官方提供的文档和example，尝试使用相关的组件



## 将项目源码托管到oschina中

1. 点击头像 -> 修改资料 -> SSH公钥 [如何生成SSH公钥](http://git.mydoc.io/?t=154712)

2. 创建自己的空仓储，使用 `git config --global user.name "用户名"` 和 `git config --global user.email ***@**.com` 来全局配置提交时用户的名称和邮箱

3. 使用 `git init` 在本地初始化项目

4. 使用 `touch README.md` 和 `touch .gitignore` 来创建项目的说明文件和忽略文件；

5. 使用 `git add .` 将所有文件托管到 git 中

6. 使用 `git commit -m "init project"` 将项目进行本地提交

7. 使用 `git remote add origin 仓储地址`将本地项目和远程仓储连接，并使用origin最为远程仓储的别名

8. 使用 `git push -u origin master` 将本地代码push到仓储中



## App.vue 组件的基本设置

1. 头部的固定导航栏使用 `Mint-UI` 的 `Header` 组件；

2. 底部的页签使用 `mui` 的 `tabbar`;

3. 购物车的图标，使用 `icons-extra` 中的 `mui-icon-extra mui-icon-extra-cart`，同时，应该把其依赖的字体图标文件 `mui-icons-extra.ttf`，复制到 `fonts` 目录下！

4. 将底部的页签，改造成 `router-link` 来实现单页面的切换；

5. Tab Bar 路由激活时候设置高亮的两种方式：

 + 全局设置样式如下：

 ```css
.router-link-active{
    color:#007aff !important;
}
 ```

 + 或者在 `new VueRouter` 的时候，通过 `linkActiveClass` 来指定高亮的类：

 ```js
// 创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' }
  ],
  linkActiveClass: 'mui-active'
});
 ```



## 实现 tabbar 页签不同组件页面的切换

1. 将 tabbar 改造成 `router-link` 形式，并指定每个连接的 `to` 属性；

2. 在入口文件中导入需要展示的组件，并创建路由对象：

```js
//  Router.js
// 导入需要展示的组件
import Home from './components/home/home.vue'
import Member from './components/member/member.vue'
import Shopcar from './components/shopcar/shopcar.vue'
import Search from './components/search/search.vue'


// 创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/member', component: Member },
    { path: '/shopcar', component: Shopcar },
    { path: '/search', component: Search }
  ],
  linkActiveClass: 'mui-active'
});

```



## 使用 mt-swipe 轮播图组件

1. 假数据：

```js
lunbo: [
  'http://www.itcast.cn/images/slidead/BEIJING/2017440109442800.jpg',
  'http://www.itcast.cn/images/slidead/BEIJING/2017511009514700.jpg',
  'http://www.itcast.cn/images/slidead/BEIJING/2017421414422600.jpg'
]
```

2. 引入轮播图组件：

```html
<!-- Mint-UI 轮播图组件 -->
<div class="home-swipe">
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="(item, i) in lunbo" :key="i">
      <img :src="item" alt="">
    </mt-swipe-item>
  </mt-swipe>
</div>
```



## 在`.vue`组件中使用`vue-resource`获取数据

1. 运行`cnpm i vue-resource -S`安装模块

2. 导入 vue-resource 组件

```js
import VueResource from 'vue-resource'
```

3. 在vue中使用 vue-resource 组件

```js
Vue.use(VueResource);
```

## 使用mui的`tab-top-webview-main`完成分类滑动栏


### 兼容问题
1. 和 App.vue 中的 `router-link` 身上的类名 `mui-tab-item` 存在兼容性问题，导致tab栏失效，可以把`mui-tab-item`改名为`mui-tab-item1`，并复制相关的类样式，来解决这个问题；
```css
.mui-bar-tab .mui-tab-item1.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item1 {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item1 .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
```
2. `tab-top-webview-main`组件第一次显示到页面中的时候，无法被滑动的解决方案：
 + 先导入 mui 的JS文件:
 ```js
 import mui from '../../../lib/mui/js/mui.min.js'
 ```
 + 在 组件的 `mounted` 事件钩子中，注册 mui 的滚动事件：
```js
mounted() {
  // 需要在组件的 mounted 事件钩子中，注册 mui 的 scroll 滚动事件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
}
```
3. 滑动的时候报警告：`Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080`
```
解决方法，可以加上* { touch-action: none; } 这句样式去掉。
```
原因：（是chrome为了提高页面的滑动流畅度而新折腾出来的一个东西） http://www.cnblogs.com/pearl07/p/6589114.html  
https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action


## 移除严格模式
[babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)

## vue-preview
[Github地址](https://github.com/LS1231/vue-preview)


一个Vue集成PhotoSwipe图片预览插件
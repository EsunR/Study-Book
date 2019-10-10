- [用Promise构造函数来解决地狱回调问题](#%E7%94%A8promise%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E6%9D%A5%E8%A7%A3%E5%86%B3%E5%9C%B0%E7%8B%B1%E5%9B%9E%E8%B0%83%E9%97%AE%E9%A2%98)
  - [简介](#%E7%AE%80%E4%BB%8B)
  - [举个例子](#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90)
  - [Promise的内部执行顺序](#promise%E7%9A%84%E5%86%85%E9%83%A8%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F)
  - [用Promise的 `.then()` 方法解决地狱回调](#%E7%94%A8promise%E7%9A%84-then-%E6%96%B9%E6%B3%95%E8%A7%A3%E5%86%B3%E5%9C%B0%E7%8B%B1%E5%9B%9E%E8%B0%83)
  - [Promise中的异常处理](#promise%E4%B8%AD%E7%9A%84%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86)
- [使用mui的`tab-top-webview-main`完成分类滑动栏](#%E4%BD%BF%E7%94%A8mui%E7%9A%84tab-top-webview-main%E5%AE%8C%E6%88%90%E5%88%86%E7%B1%BB%E6%BB%91%E5%8A%A8%E6%A0%8F)
  - [兼容问题](#%E5%85%BC%E5%AE%B9%E9%97%AE%E9%A2%98)
- [移除严格模式](#%E7%A7%BB%E9%99%A4%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F)
- [使用缩略图插件: Vue-preview](#%E4%BD%BF%E7%94%A8%E7%BC%A9%E7%95%A5%E5%9B%BE%E6%8F%92%E4%BB%B6-vue-preview)
- [编程式导航](#%E7%BC%96%E7%A8%8B%E5%BC%8F%E5%AF%BC%E8%88%AA)
- [DOM节点映射](#dom%E8%8A%82%E7%82%B9%E6%98%A0%E5%B0%84)
- [Vuex](#vuex)
  - [概念](#%E6%A6%82%E5%BF%B5)
  - [安装](#%E5%AE%89%E8%A3%85)
  - [初始化](#%E5%88%9D%E5%A7%8B%E5%8C%96)
  - [挂载store对象到VM实例上](#%E6%8C%82%E8%BD%BDstore%E5%AF%B9%E8%B1%A1%E5%88%B0vm%E5%AE%9E%E4%BE%8B%E4%B8%8A)
  - [调用state中的数据](#%E8%B0%83%E7%94%A8state%E4%B8%AD%E7%9A%84%E6%95%B0%E6%8D%AE)
  - [变更state中的数据](#%E5%8F%98%E6%9B%B4state%E4%B8%AD%E7%9A%84%E6%95%B0%E6%8D%AE)
  - [获取state中的数据](#%E8%8E%B7%E5%8F%96state%E4%B8%AD%E7%9A%84%E6%95%B0%E6%8D%AE)
- [localStorage本地存储](#localstorage%E6%9C%AC%E5%9C%B0%E5%AD%98%E5%82%A8)
  - [存放数据](#%E5%AD%98%E6%94%BE%E6%95%B0%E6%8D%AE)
  - [读取数据](#%E8%AF%BB%E5%8F%96%E6%95%B0%E6%8D%AE)

## 用Promise构造函数来解决地狱回调问题

### 简介

1. Promise 是一个 构造函数，既然是构造函数， 那么，我们就可以  new Promise() 得到一个 Promise 的实例；
2. 在 Promise 上，有两个函数，分别叫做 resolve（成功之后的回调函数） 和 reject（失败之后的回调函数）
3. 在 Promise 构造函数的 Prototype 属性上，有一个 .then() 方法，也就说，只要是 Promise 构造函数创建的实例，都可以访问到 .then() 方法
4. Promise 表示一个 异步操作；每当我们 new 一个 Promise 的实例，这个实例，就表示一个具体的异步操作；
5. 既然 Promise 创建的实例，是一个异步操作，那么，这个 异步操作的结果，只能有两种状态：
 - 状态1： 异步执行成功了，需要在内部调用 成功的回调函数 resolve 把结果返回给调用者；
 - 状态2： 异步执行失败了，需要在内部调用 失败的回调函数 reject 把结果返回给调用者；
 - 由于 Promise 的实例，是一个异步操作，所以，内部拿到 操作的结果后，无法使用 return 把操作的结果返回给调用者； 这时候，只能使用回调函数的形式，来把 成功 或 失败的结果，返回给调用者；
6. 我们可以在 new 出来的 Promise 实例上，调用 .then() 方法，【预先】 为 这个 Promise 异步操作，指定 成功（resolve） 和 失败（reject） 回调函数；

### 举个例子
```js
const fs = require('fs')

function getFileByPaht(fpath) {
  var promise = new Promise(function (resolve, reject) {
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
      if (err) return reject(err);
      resolve(dataStr);
    });
  });
  return promise;
}

getFileByPaht('./files/3.txt')
.then(function (dataStr) {
  console.log(dataStr);
}, function (err) {
  console.log(err.message);
})

```

### Promise的内部执行顺序
![avatar](http://pj1wbw4gq.bkt.clouddn.com/18-12-1/23432556.jpg)

### 用Promise的 `.then()` 方法解决地狱回调

> 注意： Promise的 `reject` 部分传入的函数可以为空，即可不写文件读取失败后的操作，
```js
getFileByPath('./files/1222.txt')
  .then(function (data) {
    console.log(data);
    return getFileByPath('./files/2.txt');
  }, 
  .then(function (data) {
    console.log(data);
    return getFileByPath('./files/3.txt');
  })
  .then(function (data) {
    console.log(data);
  })
```

### Promise中的异常处理

1. 情况一：在读取文件出错的部分报错，但不影响后方代码的执行 
```js
getFileByPath('./files/1222.txt')
  .then(function (data) {
    console.log(data);
    return getFileByPath('./files/2.txt');
  }, function (err) {
    console.log('读取失败:' + err.message);
    return getFileByPath('./files/2.txt');
  })
  .then(function (data) {
    console.log(data);
    return getFileByPath('./files/3.txt');
  })
  .then(function (data) {
    console.log(data);
  })
```

2. 情况二：如果前面任何的Promise执行失败，就停止运行后面的方法（catch捕获机制）
```js
getFileByPath('./files/1222.txt')
  .then(function (data) {
    console.log(data);
    return getFileByPath('./files/2.txt');
  })
  .then(function (data) {
    console.log(data);
    return getFileByPath('./files/3.txt');
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {  
    console.log('异常捕获: ' + err.message);
  })
```


## 使用mui的`tab-top-webview-main`完成分类滑动栏
问题出现在：`/home/newslist`
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

    > 解决方法，可以加上* { touch-action: none; } 这句样式去掉。

    原因：（是chrome为了提高页面的滑动流畅度而新折腾出来的一个东西）   
    http://www.cnblogs.com/pearl07/p/6589114.html  
    https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action  


## 移除严格模式
问题出现在 `/home/newslist`  
在使用MUI的滑动栏插件的时候，点击滑动栏会报错，这是由于没有关闭严格模式导致的，所以需要在`babel`的设置中移除严格模式

babel严格模式说明文档：[babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)


## 使用缩略图插件: Vue-preview
一个Vue集成PhotoSwipe图片预览插件: [vue-preview](https://github.com/LS1231/vue-preview)


## 编程式导航

导航的两种方式，一种是利用`router-link`标签的`to`属性来跳转url地址，如：
```html
<router-link 
+ :to="'/home/goodsinfo/' + item.id" 
  class="goods-item" 
  v-for="item in goodslist" 
  :key="item.id" 
+ tag="div">
... ...
</router-link>
```

但这种导航有一定的局限性，不方便我们大量的添加，同时还会导致`<router-link>`标签的滥用，还需要对标签渲染进行转换。所以假如同一页面对相似的块元素点击他们时要进行页面跳转（如商品展示页面中点击每个商品都会跳转到对应的页面）推荐使用编程式导航，将其作为`@click`事件绑定在对应的DOM元素身上。

还有一种称之为“编程式”导航，为原标签添加 `@click` 属性，来在Vue的函数中添加一个跳转的方法代码，如：
```html
<div
  class="goods-item" 
  v-for="item in goodslist" 
  :key="item.id" 
+ @click="goDetail(item.id)">
... ...
</div>
```
```js
// Vue
methods: {
  goDetail(id) {
    this.$router.push("/home/goodsinfo/" + this.id);
  }
}
```
**TAG** ：`$router` 和 `$router` 的区别：
+ this.$route 是路由参数对象，所有路由中的参数，params，query都属于它
+ this.$router 是一个路由导航对象，用它可以方便地使用用js代码实现路由的前进、后退、跳转刷新到新的URL地址

以上面的例子为例，编程式导航分为几种方式：

1. 简单传值
   ```js
   this.$router.push("/home/goodsinfo/" + this.id);
   ```
   
2. 传递对象
   ```js
   this.$router.push({ path: "/home/goodsinfo/" + this.id });
   ```
   对于一个有 `name` 属性的路由，可以直接通过其 `name` 来使用路由，同时，可以用 `params` 参数来设置要传入的参数名和值

   ```js
   // router.js中设置的路由
   { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' }

   // 在GoodsList.vue中通过name参数使用该路由，并且通过params参数来传入参数
   this.$router.push({ name: "goodinfo", params: { id: this.id } });
   ```

> 说明文档：https://router.vuejs.org/zh/guide/essentials/navigation.html

## DOM节点映射

在Vue中，还是有一部分操作需要操作原生DOM节点，如获取input中的value，我们可以为DOM节点添加一个属性值 `ref` 就可以在Vue的函数中调用 `this.$refs.<DOM_Value>` 来操作DOM或者获取DOM中的属性值

> 如：当id为`test`的文本框中的值发生改变时，触发`numberChange`方法，然后输出文本框中的值。

```html
<input id="test" class="mui-input-numbox" type="number" value="1" @change="numberChange" ref="number_box">
```

```js
methods: {
  numberChange(){
    console.log(this.$refs.number_box.value);
  }
}
```

## Vuex
### 概念
vuex 是 Vue 配套的 公共数据管理工具，它可以把一些共享的数据，保存到 vuex 中，方便 整个程序中的任何组件直接获取或修改我们的公共数据；
![](http://img.cdn.esunr.xyz/18-12-31/26977480.jpg)

### 安装
npm安装：
```
npm install vuex --save
```

在一个模块化的打包系统中，您必须显式地通过 `Vue.use()` 来安装 Vuex：
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

### 初始化
```js
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

`state` 可以想象为组件中的 `data`
`mutations` 可以想象为组件中的 `methods`

### 挂载store对象到VM实例上
只要挂载到了 vm 上，任何组件都能使用 store 来存取数据
```js
const vm = new Vue({
  el: '#app',
  render: c => c(App),
+ store: store
})
```

### 调用state中的数据
1. 文本框双向绑定state中的数据

```html
<input type="text" v-model="$store.state.count">
```

### 变更state中的数据
1. 对一个DOM节点绑定一个 `v-on` 事件，如 `@click` 
```html
<input type="button" value="减少" @click="remove">
<input type="button" value="增加" @click="add">
```

2. 在该组件的`methods`区域添加事件函数
```js
methods: {
  add() {
    // TODO: 操作函数
  },
  remove() {
    // TODO: 操作函数
  }
}
```

> TAG: 在此要注意的是，我们可以直接在操作函数中利用 `this.$store.state.count` 来处理store中存放的数据，但是这样做会使代码混乱不堪，如进行一个简单的add值加操作，就需要在多行代码中重复调用 `this.$store.state.count++` ，这样大大减少了代码的可读性。
> 
> 所以我们要进行的思路就是在store中定义一个方法，如果组件要进行某一对值的操作，就来调用这个方法，从而申请对store中存放的变量做出改变。而这些存放在store内部的方法，就写在store实例的 `mutations(变动)` 部分。

![操作原理](http://img.cdn.esunr.xyz/18-12-31/7991927.jpg)


1. 在store的`mutations`中写入变动值的方法函数
```js
mutations: {
  increment(state) {
    state.count++
  },
  subtract(state, obj) {
    console.log(obj)
    state.count -= (obj.c + obj.d)
  }
}
```

之后便可以在组件中补全`add`方法和`remove`方法了，也可以对其传递参数
```js
methods: {
  add() {
    // TODO: 操作函数
    this.$store.commit("increment");
  },
  remove() {
    // TODO: 操作函数
    this.$store.commit("subtract", { c: 3, d: 1 });
  }
}
```

### 获取state中的数据
1. 直接利用 `$store.state.变量` 来调用数据，如：
```html
<h3>{{ $store.state.count }}</h3>
```

2. 利用 `getters` 调用
```js
getters: {
  optCount: function (state) {
    return '当前最新的count值是：' + state.count
  }
}
```

```html
<h3>{{ $store.getters.optCount }}</h3>
```

在state中设置 `getters`，这里的 getters， 只负责对外提供数据，不负责修改数据，如果想要修改 state 中的数据，请去找 `mutations`

经过回顾对比，发现 `getters` 中的方法，和组件中的过滤器比较类似，因为过滤器和 `getters` 都没有修改原数据，都是把原数据做了一层包装，提供给了调用者；

其次， `getters` 也和 `computed` 比较像， 只要 `state` 中的数据发生变化了，那么，如果 `getters` 正好也引用了这个数据，那么 就会立即触发 `getters` 的重新求值。


## localStorage本地存储
localStorage用于本地浏览器存储数据。

### 存放数据
```js
loaclStorage.setItem('obj_name', value)
```
> `obj_name` 为存储到localStorage中的值的名字，`value` 为存储的值。

如果我们要存放一个JSON对象，在存放的时候可以使用 `JSON.stringify(obj)` 来将JSON对象转化为字符串存入localStorage中。

### 读取数据
```js
var data = localStorage.getItem('obj_name')
```
> `obj_name` 为为存储到localStorage中的值的名字。

如果我们在localStorage中存放的是一个字符串化的JSON对象，我们可以使用 `JSON.parse()` 方法来转换。

```js
// 转化 [{name: zs, age:10}, {name:ls, age: 18}] 这种数组对象
var date = JSON.parse(localStorage.getItem('obj_name') || '[]');
```




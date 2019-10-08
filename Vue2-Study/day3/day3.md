# Day 3
> 原地址到期，新接口地址如下 接口地址：http://www.liulongbin.top:3005/api/
<!-- TOC -->

- [Day 3](#day-3)
  - [配置本地数据库和数据接口API](#配置本地数据库和数据接口api)
  - [品牌管理改造](#品牌管理改造)
    - [展示品牌列表](#展示品牌列表)
    - [添加品牌数据](#添加品牌数据)
    - [删除品牌数据](#删除品牌数据)
  - [Vue中的动画](#vue中的动画)
    - [快速使用 - 制作一个渐入渐出动画](#快速使用---制作一个渐入渐出动画)
    - [使用过渡类名](#使用过渡类名)
    - [使用第三方CSS动画库](#使用第三方css动画库)
    - [使用动画钩子函数](#使用动画钩子函数)
    - [v-for 的列表过渡](#v-for-的列表过渡)
    - [列表的排序过渡](#列表的排序过渡)
  - [定义Vue组件](#定义vue组件)
    - [全局组件定义的三种方式](#全局组件定义的三种方式)
    - [组件中展示数据和响应事件](#组件中展示数据和响应事件)
    - [【重点】为什么组件中的data属性必须定义为一个方法并返回一个对象](#重点为什么组件中的data属性必须定义为一个方法并返回一个对象)
    - [使用`components`属性定义局部子组件](#使用components属性定义局部子组件)
  - [使用`flag`标识符结合`v-if`和`v-else`切换组件](#使用flag标识符结合v-if和v-else切换组件)
  - [使用`:is`属性来切换不同的子组件,并添加切换动画](#使用is属性来切换不同的子组件并添加切换动画)

<!-- /TOC -->

## 配置本地数据库和数据接口API
1. 先解压安装 `PHPStudy`;
2. 解压安装 `Navicat` 这个数据库可视化工具，并激活；
3. 打开 `Navicat` 工具，新建空白数据库，名为 `dtcmsdb4`;
4. 双击新建的数据库，连接上这个空白数据库，在新建的数据库上`右键` -> `运行SQL文件`，选择并执行 `dtcmsdb4.sql` 这个数据库脚本文件；如果执行不报错，则数据库导入完成；
5. 进入文件夹 `vuecms3_nodejsapi` 内部，执行 `npm i` 安装所有的依赖项；
6. 先确保本机安装了 `nodemon`, 没有安装，则运行 `npm i nodemon -g` 进行全局安装，安装完毕后，进入到 `vuecms3_nodejsapi`目录 -> `src`目录 -> 双击运行 `start.bat`
7. 如果API启动失败，请检查 PHPStudy 是否正常开启，同时，检查 `app.js` 中第 `14行` 中数据库连接配置字符串是否正确；PHPStudy 中默认的 用户名是root，默认的密码也是root

## 品牌管理改造
### 展示品牌列表

### 添加品牌数据

### 删除品牌数据

## Vue中的动画
为什么要有动画：动画能够提高用户的体验，帮助用户更好的理解页面中的功能；  
[Vue动画 - 开发者文档](https://cn.vuejs.org/v2/guide/transitions.html)

### 快速使用 - 制作一个渐入渐出动画
1. html结构:   
   将动画想要控制的元素放在 `<transition></transition>` 标签中
```html
<div id="app">
  <input type="button" value="toggle" @click="flag = !flag">
  <!-- 需求： 点击按钮，让 h3 显示，再点击，让 h3 隐藏 -->
  <!-- 1. 使用 transition 元素，把 需要被动画控制的元素，包裹起来 -->
  <!-- transition 元素，是 Vue 官方提供的 -->
  <transition>
      <h3 v-if="flag">这是一个H3</h3>
  </transition>
</div>
```

2. CSS结构  
    
   对于一组渐变动画，动画开始前的样式写在 `.v-enter` 中，动画结束后的样式写在 `.v-leave-to` 中。   
   动画的进出效果动画则分别写在 `.v-enter-active` 和 `.v-leave-active` 中。

   ![](https://ws1.sinaimg.cn/large/a71efaafly1fwtu3iya3dj20xc0godfv.jpg)

```css
/* v-enter 【这是一个时间点】 是进入之前，元素的起始状态，此时还没有开始进入 */
/* v-leave-to 【这是一个时间点】 是动画离开之后，离开的终止状态，此时，元素 动画已经结束了 */
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

/* v-enter-active 【入场动画的时间段】 */
/* v-leave-active 【离场动画的时间段】 */
.v-enter-active,
.v-leave-active{
  transition: all 1s ease;
}
```
3. 为 `<transition></transition>` 创建不同的动画操作空间


   如果不分离动画的操作空间，`.v-enter` 所有的 `<transition></transition>` 中的元素的动画效果都会是一样的，为 `<transition></transition>` 添加一个额外的 `name` 属性，如 `<transition name="my"></transition>`，在样式表中写 `.my-enter` 这样就可以与其他的动画操作空间分离开。

   EPX:
```html
<input type="button" value="toggle" @click="flag2 = !flag2">
<transition name="my">
  <h6 v-if="flag2">这是一个H6</h6> 
</transition>
```

```css
.my-enter,
.my-leave-to {
  opacity: 0;
  transform: translateY(150px);
}

.my-enter-active,
.my-leave-active{
  transition: all 1s ease;
}
```


### 使用过渡类名
1. HTML结构：
```html
<div id="app">
    <input type="button" value="动起来" @click="myAnimate">
    <!-- 使用 transition 将需要过渡的元素包裹起来 -->
    <transition name="fade">
      <div v-show="isshow">动画哦</div>
    </transition>
  </div>
```
2. VM 实例：
```
// 创建 Vue 实例，得到 ViewModel
var vm = new Vue({
  el: '#app',
  data: {
    isshow: false
  },
  methods: {
    myAnimate() {
      this.isshow = !this.isshow;
    }
  }
});
```
3. 定义两组类样式：
```
/* 定义进入和离开时候的过渡状态 */
    .fade-enter-active,
    .fade-leave-active {
      transition: all 0.2s ease;
      position: absolute;
    }

    /* 定义进入过渡的开始状态 和 离开过渡的结束状态 */
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
      transform: translateX(100px);
    }
```

### 使用第三方CSS动画库 
[使用第三方CSS动画库 - 开发者文档](https://cn.vuejs.org/v2/guide/transitions.html#自定义过渡类名)
1. 导入动画类库：
```html
<link rel="stylesheet" type="text/css" href="./lib/animate.css">
```
2. 定义 transition 及属性 (注意要加基础类 `animated`)：

   参数：
   - `enter-active-class`: 入场动画
   - `leave-active-class`: 离场动画
   - `:duration`: 动画时间(ms)
      - `:duration="200"` 入场离场动画时间统一为200ms
      - `:duration="{ enter:200, leave:500 }"` 入场200ms，离场500ms

```html
<transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight" :duration="{ enter: 500, leave: 800 }">
  	<div class="animated" v-show="isshow">动画哦</div>
</transition>
```

### 使用动画钩子函数
1. 定义 transition 组件以及三个钩子函数：
```html
<div id="app">
    <input type="button" value="切换动画" @click="isshow = !isshow">
    <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
      <div v-if="isshow" class="show">OK</div>
    </transition>
  </div>
```
2. 定义三个 methods 钩子方法：
```js
methods: {
        beforeEnter(el) { // 动画进入之前的回调
          el.style.transform = 'translateX(500px)';
        },
        enter(el, done) { // 动画进入完成时候的回调
          // 这句话没有实际的作用，但是，如果不写，出不来动画效果
          // 可以认为el.offsetWidth会强制动画刷新
          el.offsetWidth;
          el.style.transform = 'translateX(0px)';
          done();
        },
        afterEnter(el) { // 动画进入完成之后的回调
          this.isshow = !this.isshow;
        }
      }
```
3. 定义动画过渡时长和样式：
```css
.show{
      transition: all 0.4s ease;
    }
```


### v-for 的列表过渡
[v-for的列表过渡 - 开发者文档](https://cn.vuejs.org/v2/guide/transitions.html#列表的进入和离开过渡)
1. 定义过渡样式：
```css
<style>
    .list-enter,
    .list-leave-to {
      opacity: 0;
      transform: translateY(10px);
    }

    .list-enter-active,
    .list-leave-active {
      transition: all 0.3s ease;
    }
</style>
```
2. 定义DOM结构，其中，需要使用 transition-group 组件把v-for循环的列表包裹起来：
```html
  <div id="app">
    <input type="text" v-model="txt" @keyup.enter="add">

    <transition-group tag="ul" name="list">
      <li v-for="(item, i) in list" :key="i">{{item}}</li>
    </transition-group>
  </div>
```
3. 定义 VM中的结构：
```js
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        txt: '',
        list: [1, 2, 3, 4]
      },
      methods: {
        add() {
          this.list.push(this.txt);
          this.txt = '';
        }
      }
    });
```


### 列表的排序过渡
`<transition-group>` 组件还有一个特殊之处。不仅可以进入和离开动画，**还可以改变定位**。要使用这个新功能只需了解新增的 `v-move` 特性，**它会在元素的改变定位的过程中应用**。
+ `v-move` 和 `v-leave-active` 结合使用，能够让列表的过渡更加平缓柔和：
```css
.v-move{
  transition: all 0.8s ease;
}
.v-leave-active{
  position: absolute;
}
```

## 定义Vue组件
什么是组件： 组件的出现，就是为了拆分Vue实例的代码量的，能够让我们以不同的组件，来划分不同的功能模块，将来我们需要什么样的功能，就可以去调用对应的组件即可；
组件化和模块化的不同：
 + 模块化： 是从代码逻辑的角度进行划分的；方便代码分层开发，保证每个功能模块的职能单一；
 + 组件化： 是从UI界面的角度进行划分的；前端的组件化，方便UI组件的重用；
### 全局组件定义的三种方式
1. 使用 Vue.extend 配合 Vue.component 方法：
```js
var login = Vue.extend({
      template: '<h1>登录</h1>'
    });
    Vue.component('login', login);
```
2. 直接使用 Vue.component 方法：
```js
Vue.component('register', {
      template: '<h1>注册</h1>'
    });
```
3. 将模板字符串，定义到script标签种：
```html
<script id="tmpl" type="x-template">
  <div><a href="#">登录</a> | <a href="#">注册</a></div>
</script>
```
同时，需要使用 Vue.component 来定义组件：
```js
Vue.component('account', {
      template: '#tmpl'
    });
```

> 注意： 组件中的DOM结构，有且只能有唯一的根元素（Root Element）来进行包裹！


### 组件中展示数据和响应事件
1. 在组件中，`data`需要被定义为一个方法，例如：
```js
Vue.component('account', {
      template: '#tmpl',
      data() {
        return {
          msg: '大家好！'
        }
      },
      methods:{
        login(){
          alert('点击了登录按钮');
        }
      }
    });
```
2. 在子组件中，如果将模板字符串，定义到了script标签中，那么，要访问子组件身上的`data`属性中的值，需要使用`this`来访问；
### 【重点】为什么组件中的data属性必须定义为一个方法并返回一个对象
1. 通过计数器案例演示

### 使用`components`属性定义局部子组件
1. 组件实例定义方式：
```js
<script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      components: { // 定义子组件
        account: { // account 组件
          template: '<div><h1>这是Account组件{{name}}</h1><login></login></div>', // 在这里使用定义的子组件
          components: { // 定义子组件的子组件
            login: { // login 组件
              template: "<h3>这是登录组件</h3>"
            }
          }
        }
      }
    });
  </script>
```
2. 引用组件：
```html
<div id="app">
  <account></account>
</div>
```

## 使用`flag`标识符结合`v-if`和`v-else`切换组件
1. 页面结构：
```html
<div id="app">
  <input type="button" value="toggle" @click="flag=!flag">
  <my-com1 v-if="flag"></my-com1>
  <my-com2 v-else="flag"></my-com2>
</div>
```
2. Vue实例定义：
```js
<script>
  Vue.component('myCom1', {
    template: '<h3>奔波霸</h3>'
  })

  Vue.component('myCom2', {
    template: '<h3>霸波奔</h3>'
  })

  // 创建 Vue 实例，得到 ViewModel
  var vm = new Vue({
    el: '#app',
    data: {
      flag: true
    },
    methods: {}
  });
</script>
```

## 使用`:is`属性来切换不同的子组件,并添加切换动画
1. 组件实例定义方式：
```JS
// 登录组件
const login = Vue.extend({
  template: `<div>
    <h3>登录组件</h3>
  </div>`
});
Vue.component('login', login);

// 注册组件
const register = Vue.extend({
  template: `<div>
    <h3>注册组件</h3>
  </div>`
});
Vue.component('register', register);

// 创建 Vue 实例，得到 ViewModel
var vm = new Vue({
  el: '#app',
  data: { comName: 'login' },
  methods: {}
});
```
2. 使用`component`标签，来引用组件，并通过`:is`属性来指定要加载的组件：
```html
<div id="app">
  <a href="#" @click.prevent="comName='login'">登录</a>
  <a href="#" @click.prevent="comName='register'">注册</a>
  <hr>
  <!-- 动画模式：先出再进 -->
  <!-- transition 切换动画标签 -->
  <!-- component 切换组件标签 -->
  <transition mode="out-in">
    <component :is="comName"></component>
  </transition>
</div>
```
3. 添加切换样式：
```css
<style>
  .v-enter,
  .v-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .v-enter-active,
  .v-leave-active {
    position: absolute;
    transition: all 0.3s ease;
  }

  h3{
    margin: 0;
  }
</style>
```

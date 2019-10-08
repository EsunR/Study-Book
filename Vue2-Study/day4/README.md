> 本讲义对应视频: P64-P82
<!-- TOC -->

- [父组件向子组件传值](#父组件向子组件传值)
- [子组件调用父组件的方法](#子组件调用父组件的方法)
- [子组件向父组件传值](#子组件向父组件传值)
- [组件中data和props的区别](#组件中data和props的区别)
- [评论列表案例](#评论列表案例)
- [使用 `this.$refs` 来获取元素和组件](#使用-thisrefs-来获取元素和组件)
- [什么是路由](#什么是路由)
- [在 vue 中使用 vue-router](#在-vue-中使用-vue-router)
- [使用tag属性指定router-link渲染的标签类型](#使用tag属性指定router-link渲染的标签类型)
- [设置路由重定向](#设置路由重定向)
- [设置路由高亮](#设置路由高亮)
- [设置路由切换动效](#设置路由切换动效)
- [在路由规则中定义参数](#在路由规则中定义参数)
  - [利用 `params` 传递参数](#利用-params-传递参数)
  - [利用 `query` 传递参数](#利用-query-传递参数)
- [使用 `children` 属性实现路由嵌套](#使用-children-属性实现路由嵌套)
- [命名视图实现经典布局](#命名视图实现经典布局)
- [相关文件](#相关文件)

<!-- /TOC -->
## 父组件向子组件传值
1. 子组件中默认无法访问到父组件中data上的数据和methods中的方法
```js
var vm = new Vue({
  el: '#app',
  data: {
    msg: '123 啊-父组件中的数据'
  },
  methods: {},
  components: {
    com1: {
      // 子组件中默认无法访问到父组件中data上的数据和methods中的方法
      template: '<h1>这是子组件 -- {{msg}}</h1>'
    }
  }
});
```
渲染之后报错 msg 是 undefined
```html
<div id="app">
  <com1></com1>
</div>
```


1. 组件实例定义方式，注意：一定要使用`props`属性来定义父组件传递过来的数据
```js
<script>
  // 创建 Vue 实例，得到 ViewModel
  var vm = new Vue({
    el: '#app',
    data: {
      msg: '这是父组件中的消息'
    },
    components: {
      son: {
        template: '<h1>这是子组件 --- {{finfo}}</h1>',
        props: ['finfo']
      }
    }
  });
</script>
```
2. 使用`v-bind`或简化指令，将数据传递到子组件中：
```html
<div id="app">
  <son :finfo="msg"></son>
</div>
```

## 子组件调用父组件的方法
1. 编写一个字面类型的组件模板对象命名为 `com2`
```js
var com2 = {
  template: '#tmp1',
}
```

2. 在Vue实例中注册这个组件模板，并在Vue实例中写入要被子级组件调用的方法，命名为 `show`
```js
var vm = new Vue({
  el: '#app',
  data: {},
  methods: {
    show(data){
      console.log('调用了父组件的show()方法 -- ' + data );
    }
  },
  components: {
    com2 // 相当于com2: com2;
  }
});
```

3. 在Vue实例的HTML部分引用模板，并且在模板中用“事件绑定机制” `v-on` 绑定一个自定义属性
```html
<div id="app">
  <!-- 
    父组件向子组件传递方法使用的是事件绑定机制：v-on
    当我们定义了一个事件属性之后，那么，子组件就能够
    通过某些方式，来调用方法
  -->
  <com2 @func="show"></com2>
  <!-- 
    如果在 @func 中传递一个 show()，那传递过去的方法会立刻被执行 
    然而我们只需要把方法传递过去就可以了，并不需要再传递时调用该方法
  -->
</div>
```
4. 在定义的组件模板对象 `com2` 上的 `methods` 部分创建一个 `myclick()` 函数，供模板调用。这个click函数中使用 `$emit('func')` 方法来调用父级的 `show` 函数。
> 在此我们需要注意的是，我们是把 `show` 方法赋值到了子组件的一个自定义属性 `func` 上，这个 `func` 才是 `show` 方法在子级模板的实体对象，所以我们调用 `$emit()` 方法时去调用的函数对象应该为 `func` 
```js
var com2 = {
  template: '#tmp1', 
  methods: {
    myclick(){
      // emit: 触发，调用，发射‘
      //$emit()的第一个参数为触发的函数方法，第二个参数以及往后的参数为传入方法内部的参数
      this.$emit('func', 111) 
    }
  }
}
```
1. 在模板调用 `myclick()` 方法从而间接调用父级的 `func()` 方法。
```html
<template id="tmp1">
  <div>
    <h1>这是子组件</h1>
    <input type="button" value="这是子组件中的按钮 - 点击他就出发父组件的方法" @click="myclick">
  </div>
</template>
```


## 子组件向父组件传值
1. 原理：父组件将方法的引用，传递到子组件内部，子组件在内部调用父组件传递过来的方法，同时把要发送给父组件的数据，在调用方法的时候当作参数传递进去；
2. 父组件将方法的引用传递给子组件，其中，`getMsg`是父组件中`methods`中定义的方法名称，`func`是子组件调用传递过来方法时候的方法名称
```html
<son @func="getMsg"></son>
```
3. 子组件内部通过`this.$emit('方法名', 要传递的数据)`方式，来调用父组件中的方法，同时把数据传递给父组件使用
```html
<div id="app">
    <!-- 引用父组件 -->
    <son @func="getMsg"></son>

    <!-- 组件模板定义 -->
    <script type="x-template" id="son">
      <div>
        <input type="button" value="向父组件传值" @click="sendMsg" />
      </div>
    </script>
  </div>

  <script>
    // 子组件的定义方式
    Vue.component('son', {
      template: '#son', // 组件模板Id
      methods: {
        sendMsg() { // 按钮的点击事件
          this.$emit('func', 'OK'); // 调用父组件传递过来的方法，同时把数据传递出去
        }
      }
    });

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {
        getMsg(val){ // 子组件中，通过 this.$emit() 实际调用的方法，在此进行定义
          alert(val);
        }
      }
    });
  </script>
```

## 组件中data和props的区别

## 评论列表案例
目标：主要练习父子组件之间传值

## 使用 `this.$refs` 来获取元素和组件
```html
  <div id="app">
    <div>
      <input type="button" value="获取元素内容" @click="getElement" />
      <!-- 使用 ref 获取元素 -->
      <h1 ref="myh1">这是一个大大的H1</h1>

      <hr>
      <!-- 使用 ref 获取子组件 -->
      <my-com ref="mycom"></my-com>
    </div>
  </div>

  <script>
    Vue.component('my-com', {
      template: '<h5>这是一个子组件</h5>',
      data() {
        return {
          name: '子组件'
        }
      }
    });

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {
        getElement() {
          // 通过 this.$refs 来获取元素
          console.log(this.$refs.myh1.innerText);
          // 通过 this.$refs 来获取组件
          console.log(this.$refs.mycom.name);
        }
      }
    });
  </script>
```


## 什么是路由
1. **后端路由：** 对于普通的网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上对应的资源；

2. **前端路由：** 对于单页面应用程序来说，主要通过URL中的hash(#号)来实现不同页面之间的切换，同时，hash有一个特点：HTTP请求中不会包含hash相关的内容；所以，单页面程序中的页面跳转主要用hash实现；

3. 在单页面应用程序中，这种通过hash改变来切换页面的方式，称作前端路由（区别于后端路由）；

## 在 vue 中使用 vue-router
1. 导入 vue-router 组件类库：
```html
<!-- 1. 导入 vue-router 组件类库 -->
  <script src="./lib/vue-router-2.7.0.js"></script>
```
2. 使用 router-link 组件来导航
```html
<!-- 2. 使用 router-link 组件来导航 -->
<router-link to="/login">登录</router-link>
<router-link to="/register">注册</router-link>
```
3. 使用 router-view 组件来显示匹配到的组件
```html
<!-- 3. 使用 router-view 组件来显示匹配到的组件 -->
<router-view></router-view>
```
4. 创建使用`Vue.extend`创建组件
```js
    // 4.1 使用 Vue.extend 来创建登录组件
    var login = Vue.extend({
      template: '<h1>登录组件</h1>'
    });

    // 4.2 使用 Vue.extend 来创建注册组件
    var register = Vue.extend({
      template: '<h1>注册组件</h1>'
    });
```
5. 创建一个路由 router 实例，通过 routers 属性来定义路由匹配规则
```js
// 5. 创建一个路由 router 实例，通过 routers 属性来定义路由匹配规则
    var router = new VueRouter({
      routes: [
        { path: '/login', component: login },
        { path: '/register', component: register }
      ]
    });
```
6. 使用 router 属性来使用路由规则
```js
// 6. 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      router: router // 使用 router 属性来使用路由规则
    });
```

## 使用tag属性指定router-link渲染的标签类型
```html
<router-link to="/login" tag="span">登录</router-link>
```

## 设置路由重定向
将路由访问的默认地址改为 `#/login`
```js
var routerObj = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    ...
  ]
})
```


## 设置路由高亮
`<router-link></router-link>` 标签用来设置触发模板转换的按钮，当当前模板对应的 `<router-link></router-link>` 被点击激活时，该标签会添加一个名为 `router-link-active` 的 class 属性，只需要对 `.router-link-active` 定义样式就可以设置路由高亮，如：
```css
.router-link-active {
  color: red;
  font-weight: 800;
  font-style: italic;
  font-size: 80px;
}
```
同时默认的 class 名 `.router-link-active` 也可以在Router的配置 `linkActiveClass` 项中更改
```js
var routerObj = new VueRouter({
  routes: [
    ...
  ],
  // 替换原来的 .router-link-active 
  linkActiveClass: 'myActive'
})
```



## 设置路由切换动效
将 `router-view` 标签放在 `transition` 标签中即可为其添加css动画效果
```html
<transition mode="out-in">
  <router-view></router-view>
</transition>
```

```css
.v-enter,
.v-leave-to{
  opacity: 0;
  transform: translateX(140px);
}

.v-enter-active,
.v-leave-active{
  transition: all 0.5s ease;
}
```


## 在路由规则中定义参数
### 利用 `params` 传递参数
1. 在规则中定义参数：
```js
{ path: '/register/:id', component: register }
```
2. 通过url传递数据：
```html
<router-link to="/login?id=10&name=ZhangSan">登录</router-link>
```
3. 通过 `this.$route.params`来获取路由中的参数：
```js
var register = Vue.extend({
  template: '<h1>注册 --- {{this.$route.params.id}} --- {{this.$route.params.name}}</h1>'
});
```

### 利用 `query` 传递参数
1. 在规则中定义参数：
```js
{path:'/login', component: login}
```
3. 通过url传递数据：
```html
<router-link to="/login?id=10&name=ZhangSan">登录</router-link>
```
4. 通过 `this.$route.query` 来获取路由中的参数：
```js
template: '<h1>登录 --- {{$route.query.id}} --- {{$route.query.name}}</h1>',
```



## 使用 `children` 属性实现路由嵌套
```html
<div id="app">
  <router-link to="/account">Account</router-link>

  <router-view></router-view>
</div>

<script>
// 父路由中的组件
const account = Vue.extend({
  template: `<div>
    这是account组件
    <router-link to="/account/login">login</router-link> | 
    <router-link to="/account/register">register</router-link>
    <router-view></router-view>
  </div>`
});

// 子路由中的 login 组件
const login = Vue.extend({
  template: '<div>登录组件</div>'
});

// 子路由中的 register 组件
const register = Vue.extend({
  template: '<div>注册组件</div>'
});

// 路由实例
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/account/login' }, // 使用 redirect 实现路由重定向
    {
      path: '/account',
      component: account,
      children: [ // 通过 children 数组属性，来实现路由的嵌套
        { path: 'login', component: login }, // 注意，子路由的开头位置，不要加 / 路径符
        { path: 'register', component: register }
      ]
    }
  ]
});

// 创建 Vue 实例，得到 ViewModel
var vm = new Vue({
  el: '#app',
  data: {},
  methods: {},
  components: {
    account
  },
  router: router
});
</script>
```

## 命名视图实现经典布局
1. 标签代码结构：
```html
<div id="app">
    <router-view></router-view>
    <div class="content">
      <router-view name="a"></router-view>
      <router-view name="b"></router-view>
    </div>
  </div>
```
2. JS代码：
```js
<script>
    var header = Vue.component('header', {
      template: '<div class="header">header</div>'
    });

    var sidebar = Vue.component('sidebar', {
      template: '<div class="sidebar">sidebar</div>'
    });

    var mainbox = Vue.component('mainbox', {
      template: '<div class="mainbox">mainbox</div>'
    });

    // 创建路由对象
    var router = new VueRouter({
      routes: [
        {
          path: '/', components: {
            default: header,
            a: sidebar,
            b: mainbox
          }
        }
      ]
    });

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      router
    });
  </script>
```
3. CSS 样式：
```css
  <style>
    .header {
      border: 1px solid red;
    }

    .content{
      display: flex;
    }
    .sidebar {
      flex: 2;
      border: 1px solid green;
      height: 500px;
    }
    .mainbox{
      flex: 8;
      border: 1px solid blue;
      height: 500px;
    }
  </style>
```

## 相关文件
1. [URL中的hash（井号）](http://www.cnblogs.com/joyho/articles/4430148.html)
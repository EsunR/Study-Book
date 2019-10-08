<!-- TOC -->

- [课程介绍](#课程介绍)
  - [什么是Vue.js](#什么是vuejs)
- [为什么要学习流行框架](#为什么要学习流行框架)
- [框架和库的区别](#框架和库的区别)
- [Node（后端）中的 MVC 与 前端中的 MVVM 之间的区别](#node后端中的-mvc-与-前端中的-mvvm-之间的区别)
- [Vue.js 基本代码 和 MVVM 之间的对应关系](#vuejs-基本代码-和-mvvm-之间的对应关系)
- [Vue之 - `基本的代码结构`和`插值表达式`、`v-cloak`](#vue之---基本的代码结构和插值表达式v-cloak)
- [Vue指令之`v-text`和`v-html`](#vue指令之v-text和v-html)
- [Vue指令之`v-bind`的三种用法](#vue指令之v-bind的三种用法)
- [Vue指令之`v-on`和`跑马灯效果`](#vue指令之v-on和跑马灯效果)
  - [跑马灯效果](#跑马灯效果)
- [Vue指令之`v-on的缩写`和`事件修饰符`](#vue指令之v-on的缩写和事件修饰符)
  - [事件修饰符：](#事件修饰符)
- [Vue指令之`v-model`和`双向数据绑定`](#vue指令之v-model和双向数据绑定)
  - [单向绑定指](#单向绑定指)
  - [双向绑定](#双向绑定)
- [简易计算器案例](#简易计算器案例)
- [在Vue中使用样式](#在vue中使用样式)
  - [使用class样式](#使用class样式)
  - [使用内联样式](#使用内联样式)
- [Vue指令之`v-for`和`key`属性](#vue指令之v-for和key属性)
- [`v-for` 属性](#v-for-属性)
- [`v-if` 和 `v-show` 的使用](#v-if-和-v-show-的使用)

<!-- /TOC -->

## 课程介绍
前5天： 都在学习Vue基本的语法和概念；打包工具 Webpack , Gulp
后5天： 以项目驱动教学；


### 什么是Vue.js

+ Vue.js 是目前最火的一个前端框架，React是最流行的一个前端框架（React除了开发网站，还可以开发手机App， Vue语法也是可以用于进行手机App开发的，需要借助于Weex）

+ Vue.js 是前端的**主流框架之一**，和Angular.js、React.js 一起，并成为前端三大主流框架！

+ Vue.js 是一套构建用户界面的框架，**只关注视图层**，它不仅易于上手，还便于与第三方库或既有项目整合。（Vue有配套的第三方类库，可以整合起来做大型项目的开发）

+ 前端的主要工作？主要负责MVC中的V这一层；主要工作就是和界面打交道，来制作前端页面效果；





## 为什么要学习流行框架
 + 企业为了提高开发效率：在企业中，时间就是效率，效率就是金钱；
  - 企业中，使用框架，能够提高开发的效率；



 + 提高开发效率的发展历程：原生JS -> Jquery之类的类库 -> 前端模板引擎 -> Angular.js / Vue.js（能够帮助我们减少不必要的DOM操作；提高渲染效率；双向数据绑定的概念【通过框架提供的指令，我们前端程序员只需要关心数据的业务逻辑，不再关心DOM是如何渲染的了】）
 + 在Vue中，一个核心的概念，就是让用户不再操作DOM元素，解放了用户的双手，让程序员可以更多的时间去关注业务逻辑；



 + 增强自己就业时候的竞争力
  - 人无我有，人有我优
  - 你平时不忙的时候，都在干嘛？

## 框架和库的区别



 + 框架：是一套完整的解决方案；对项目的侵入性较大，项目如果需要更换框架，则需要重新架构整个项目。

  - node 中的 express；



 + 库（插件）：提供某一个小功能，对项目的侵入性较小，如果某个库无法完成某些需求，可以很容易切换到其它库实现需求。
  - 1. 从Jquery 切换到 Zepto
  - 2. 从 EJS 切换到 art-template







## Node（后端）中的 MVC 与 前端中的 MVVM 之间的区别

 + MVC 是后端的分层开发概念；
 + MVVM是前端视图层的概念，主要关注于 视图层分离，也就是说：MVVM把前端的视图层，分为了 三部分 Model, View , VM ViewModel

 + 为什么有了MVC还要有MVVM



## Vue.js 基本代码 和 MVVM 之间的对应关系


## Vue之 - `基本的代码结构`和`插值表达式`、`v-cloak`


## Vue指令之`v-text`和`v-html`


## Vue指令之`v-bind`的三种用法

1. 直接使用指令`v-bind`

2. 使用简化指令`:`

3. 在绑定的时候，拼接绑定内容：`:title="btnTitle + ', 这是追加的内容'"`


## Vue指令之 `v-on` 监听事件
可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。

`@click` 监听事件：
```html
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```
```js
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```

`@change` 监听事件：
```html
<input type="number" value="1" @change="numberChange" ref="number_box">
```
```js
methods: {
  numberChange(){
    console.log(this.$refs.number_box.value);
  }
}
```

### 跑马灯效果

1. HTML结构：

```

<div id="app">

    <p>{{info}}</p>

    <input type="button" value="开启" v-on:click="go">

    <input type="button" value="停止" v-on:click="stop">

  </div>

```

2. Vue实例：

```

	// 创建 Vue 实例，得到 ViewModel

    var vm = new Vue({

      el: '#app',

      data: {

        info: '猥琐发育，别浪~！',

        intervalId: null

      },

      methods: {

        go() {

          // 如果当前有定时器在运行，则直接return

          if (this.intervalId != null) {

            return;

          }

          // 开始定时器

          this.intervalId = setInterval(() => {

            this.info = this.info.substring(1) + this.info.substring(0, 1);

          }, 500);

        },

        stop() {

          clearInterval(this.intervalId);

        }

      }

    });

```







## Vue指令之`v-on的缩写`和`事件修饰符`



### 事件修饰符：

+ .stop       阻止冒泡

+ .prevent    阻止默认事件

+ .capture    添加事件侦听器时使用事件捕获模式

+ .self       只当事件在该元素本身（比如不是子元素）触发时触发回调

+ .once       事件只触发一次







## Vue指令之`v-model`和`双向数据绑定`

### 单向绑定指
vm实例中的`data`中的数据可以传递给DOM节点中，如使用`v-bind`指令绑定的数据就属于是单向绑定。

```html
<input type="text" v-bind:value="msg" style="width: 100%;">
```
```js
var vm = new Vue({
    el: '#app',
    data: {
        msg: 'Eveyone is a good boy to code!'
    },
    methods: {}
});
```
此时，用户在界面`input`中不可以改变`msg`的内容，`msg`中的内容只能单向绑定给前端页面。

### 双向绑定
vm实例中的`data`不仅可以传递给DOM节点，而且用户通过页面的控件可以更改vm实例中`data`部分的值。

```html
<input type="text" v-model="msg" style="width: 100%;">
```
```js
var vm = new Vue({
    el: '#app',
    data: {
        msg: 'Eveyone is a good boy to code!'
    },
    methods: {}
}); 
``` 
> 注意：`v-model` 只能运用在表单元素中

## 简易计算器案例

1. HTML 代码结构

```html

  <div id="app">

    <input type="text" v-model="n1">

    <select v-model="opt">

      <option value="0">+</option>

      <option value="1">-</option>

      <option value="2">*</option>

      <option value="3">÷</option>

    </select>

    <input type="text" v-model="n2">

    <input type="button" value="=" v-on:click="getResult">

    <input type="text" v-model="result">

  </div>

```

2. Vue实例代码：

```js

	// 创建 Vue 实例，得到 ViewModel

    var vm = new Vue({

      el: '#app',

      data: {

        n1: 0,

        n2: 0,

        result: 0,

        opt: '0'

      },

      methods: {

        getResult() {

          switch (this.opt) {

            case '0':

              this.result = parseInt(this.n1) + parseInt(this.n2);

              break;

            case '1':

              this.result = parseInt(this.n1) - parseInt(this.n2);

              break;

            case '2':

              this.result = parseInt(this.n1) * parseInt(this.n2);

              break;

            case '3':

              this.result = parseInt(this.n1) / parseInt(this.n2);

              break;

          }

        }

      }

    });

```









## 在Vue中使用样式



### 使用class样式

1. 数组
   
    ```html
    <h1 :class="['red', 'thin']">这是一个邪恶的H1</h1>
    ```
    类名必须要用 `''` 包裹，因为在vue内部，style的样式内容是以字符串的形式存放的而不是变量的形式，若不加 `''` 是在向vue内部查找变量，导致报错。


2. 数组中使用三元表达式
   
    在`data`中设置一个变量名为`isactive`的布尔变量作为判断依据：

    ```html
    <h1 :class="['red', 'thin', isactive?'active':'']">这是一个邪恶的H1</h1>
    ```

3. 数组中嵌套对象

    在`data`中设置一个变量名为`isactive`的布尔变量作为判断依据:
    ```html
    <h1 :class="['red', 'thin', {'active': isactive}]">这是一个邪恶的H1</h1>
    ```

4. 直接使用对象

    行间方法：
    ```html
    <h1 :class="{'red':true, 'thin':false}">text_content</h1>
    ```
    调用方法：
        
    ```html
    <h1 :class="classObj">text_content</h1>
    ```
    
    ```js
    var vm = new Vue({
        el: '#app',
        data: {
            classObj: {'red':true, 'thin':false}
        }
    });
    ```



### 使用内联样式

1. 直接在元素上通过 `:style` 的形式，书写样式对象
    ```html
    <h1 :style="{color: 'red', 'font-size': '40px'}">这是一个善良的H1</h1>
    ```

2. 将样式对象，定义到 `data` 中，并直接引用到 `:style` 中
  + 在data上定义样式：
    ```js
    data: {
      h1StyleObj: { color: 'red', 'font-size': '40px', 'font-weight': '200' }
    }
    ```
  + 在元素中，通过属性绑定的形式，将样式对象应用到元素中：
    ```html
    <h1 :style="h1StyleObj">这是一个善良的H1</h1>
    ```

3. 在 `:style` 中通过数组，引用多个 `data` 上的样式对象
  + 在data上定义样式：  
    ```js
    data: {
      h1StyleObj: { color: 'red', 'font-size': '40px', 'font-weight': '200' },
      h1StyleObj2: { fontStyle: 'italic' }
    }
    ```
  + 在元素中，通过属性绑定的形式，将样式对象应用到元素中：
    ```html
    <h1 :style="[h1StyleObj, h1StyleObj2]">这是一个善良的H1</h1>
    ```



## Vue指令之`v-for`和`key`属性

1. 迭代数组

```html
<ul>
  <li v-for="(item, i) in list">索引：{{i}} --- 姓名：{{item.name}} --- 年龄：{{item.age}}</li>
</ul>
```

2. 迭代对象中的属性

## `v-for` 属性
   
1. v-for指令可以用来循环迭代数组，`item`指代`list`数据中的每一项，在DOM中为每个`list`中的数据生成一个`<p>`标签。
    
    > v-for="*item_name* in *data_name*"  
      使用`{{item_name}}`渲染数据

    ```html
    <div id="app">
        <p v-for="item in list">{{item}}</p>
    </div>
    ```
    ```js
    var vm = new Vue({
        el: '#app',
        data: {
            list: [1,2,3,4,5,6]
        },
        methods: {}
    });
    ```
    效果：
    <div id="app">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
    </div>
    <br>


2. 调用索引值
    > v-for="( *item_name*, *i* ) in *data_name*"  
    使用`{{i}}`渲染索引值，使用`{{item_name}}`渲染数据   

    ```html
    <div id="app">
        <p v-for="(item, i) in list">索引值: {{i}} --- 每一项：{{item}}</p>
    </div>
    ```
    效果：
    <div id="app">
        <p>索引值: 0 --- 每一项：1</p>
        <p>索引值: 1 --- 每一项：2</p>
        <p>索引值: 2 --- 每一项：3</p>
        <p>索引值: 3 --- 每一项：4</p>
        <p>索引值: 4 --- 每一项：5</p>
        <p>索引值: 5 --- 每一项：6</p>
    </div>
    <br>

3. 循环对象数组
    ```html
    <p v-for="user in list">ID: {{user.id}} === Nanme: {{user.name}}</p>
    ```
    ```js
    data: {
        list: [
            {id: 1, name: 'zs1'},
            {id: 2, name: 'zs2'},
            {id: 3, name: 'zs3'},
            {id: 4, name: 'zs4'},
        ]
    }
    ```

4. 遍历对象
   ```html
   <p v-for="(val, key, i) in user">值是: {{val}} === 键是: {{key}} === 索引是: {{i}}</p>
   ```
   ```js
   data: {
        user: {
            id: 1,
            name: 'EsunR',
            sex: 'Man'
        }
    }
    ```
    
    效果：
    <div id="app"><p>值是: 1 === 键是: id === 索引是: 0</p><p>值是: EsunR === 键是: name === 索引是: 1</p><p>值是: Man === 键是: sex === 索引是: 2</p></div>
    <br>

5. 迭代数字
    ```html
    <p v-for="count in 10">这是第 {{count}} 次循环</p>
    ```

    <div id="app"><p>这是第 1 次循环</p><p>这是第 2 次循环</p><p>这是第 3 次循环</p><p>这是第 4 次循环</p><p>这是第 5 次循环</p><p>这是第 6 次循环</p><p>这是第 7 次循环</p><p>这是第 8 次循环</p><p>这是第 9 次循环</p><p>这是第 10 次循环</p></div>







    



> 2.2.0+ 的版本里，**当在组件中使用** v-for 时，key 现在是必须的。



当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用 “**就地复用**” 策略。如果数据项的顺序被改变，Vue将**不是移动 DOM 元素来匹配数据项的顺序**， 而是**简单复用此处每个元素**，并且确保它在特定索引下显示已被渲染过的每个元素。



为了给 Vue 一个提示，**以便它能跟踪每个节点的身份，从而重用和重新排序现有元素**，你需要为每项提供一个唯一 key 属性。



## `v-if` 和 `v-show` 的使用

```html
<div id="app">
    <input type="button" value="toggle" @click="flag = !flag">
    <h3 v-if="flag">this is v-for control element</h3>
    <h3 v-show="flag">this is v-show control element</h3>
</div>
```
```js
data: {
    flag: true,
}
```
效果：  
点击按钮后，可以切换两个H3标签显示与否  
  
区别：  
`v-if` 是把标签从DOM中移出/插入来决定显示与否的（消耗切换性能）。  
`v-show` 是给标签添加 `display: none` 来决定显示与否的（消耗初始渲染性能）。


建议：  
如果涉及到频繁的切换，最好不要使用 `v-if`   
如果元素可能永远也不会被显示出来被用户看到，则推荐使用 `v-if`

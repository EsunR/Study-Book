> 视频教程: https://www.bilibili.com/video/BV1cE411B7by?from=search&seid=5214127956231478250

# 1. Parcel 安装与使用

Parcel 是 Web 应用打包工具，适用于经验不同的开发者。它利用多核处理提供了极快的速度，并且不需要任何配置。

> 文档：https://www.parceljs.cn/getting_started.html

本地安装：

```shell
yarn add parcel-bundler --dev
```

安装 babel ，将 jsx 语法转化成 js 对象（虚拟DDM）：

```shell
yarn add @babel/core @babel/plugin-transform-react-jsx @babel/preset-env --dev
```

配置 .babelrc ：

```json
{
  "presets": [
    "evn"
  ],
  "plugins": [
    [
      "transform-react-jsx",
      {
        "prama": "React.createElement"
      }
    ]
  ]
}
```

# 2. JSX 的渲染

## 2.1 Babel 转义

先举个例子，当我们编写一个正常的 jsx 文件时，其结构是这样的：

```jsx
import React from "./lib/react";
import ReactDOM from "./lib/react-dom";

const ele = (
  <div className="active" title="123">
    hello,<span style={{ color: "red" }}>React!</span>
  </div>
);

ReactDOM.render(ele, document.querySelector("#app"));
```


其中， babel 会对 jsx 部分进行转义，调用 react 的 `createElement` 方法去创建虚拟 DOM 树：

```jsx
function Test(){
  const flag = true
  const name = "ZhangSan"
  
  return <div className="active" title="123">
    hello<span style={{ color: "red" }}>React!</span>
    my name is {flag === true ? name : "LiSi"}
  </div>
}
```

Babel 转义后：

```js
"use strict";

function Test() {
  const flag = true;
  const name = "ZhangSan";
  return /*#__PURE__*/React.createElement("div", {
    className: "active",
    title: "123"
  }, "hello", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "red"
    }
  }, "React!"), "my name is ", flag === true ? name : "LiSi");
}
```

> 在 Babel 进行对 jsx 语法的转义过程中，也会对模板语法直接进行转义，调用其中使用的变量

同样的，我们可以不编写 JSX，直接调用 `React.createElement()` 方法来生成虚拟 DOM 树，然后再调用 `ReactDOM.render()` 来渲染虚拟 DOM 树：

```js
import React from "./lib/react";
import ReactDOM from "./lib/react-dom";

const ele = React.createElement(
  "div",
  {
    className: "active",
    title: "123",
  },
  "hello,",
  React.createElement(
    "span",
    {
      style: {
        color: "red",
      },
    },
    "React!"
  )
);

ReactDOM.render(ele, document.querySelector("#app"));
```

> 在 Babel 转义后由于会转义为 `React.createElement` 因此必须把 `React` 引入到当前代码中，这也就是为什么我们即使在代码中并没有用到 `React` 对象，却仍要引用它的原因。

## 2.2 React.createElement

`React.createElement` 方法会生成一个对象，这个对象包含了将来生成节点的类型、属性、内容（包含子节点），其是一个嵌套的结构，这就形成了一个树形结构，我们便将其称之为 **虚拟DOM树**。

我们先来看下其 API 设计:

```js
React.createElement(tagName, attribute, ...children)
```

tag 表示虚拟节点的类型，attribute 表示虚拟节点的属性，children 表示虚拟节点的子节点。这里要注意的是，如果子节点是文本节点，那么会直接传入一个字符串，如：

```jsx
<h1>标题</h1>
```

会被 Babel 转化为：

```js
React.createElement("h1", null, "标题")
```

实现这个方法其实也很简单，我们只需要返回一个对象就可以了：

```js
const React = {
  createElement,
};

function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children,
  };
}

export default React;
```

借用最初的例子：

```jsx
const dom = (
  <div className="active" title="123">
    hello,<span style={{ color: "red" }}>React!</span>
  </div>
)
```

经 Babel 转义并使用调用 React.createElement() 后，打印出 dom：

```js
{
    "tag": "div",
    "attrs": {
        "className": "active",
        "title": "123"
    },
    "children": [
        "hello,",
        {
            "tag": "span",
            "attrs": {
                "style": {
                    "color": "red"
                }
            },
            "children": [
                "React!"
            ]
        }
    ]
}
```

## 2.3 ReactDOM.render

React 生成了虚拟 DOM 树，那么 ReactDOM 就需要将虚拟 DOM 树渲染为 html 节点，其核心就是调用 `ReactDOM.render` 函数。

我们先来看一下 `ReactDOM.render` 函数的 API：

```js
ReactDOM.render(vnode, container);
```

其中，vnode 就是虚拟 DOM 树，container 就是由虚拟 DOM 树生成真实 html 节点后，节点挂载的目标父节点，其是一个 HTMLElement。

其实现也并不复杂，只需分如下几步：

1. 判断 vnode 类型，如果是字符串，就创建文本节点，并将文本节点挂载到目标父节点中；
2. 如果不是字符串，那就根据 tag 名称，调用 `document.createElement` 生成真实节点；
3. 为真实节点添加属性；
4. 使用递归，遍历子节点，将当前生成的真实节点作为子节点的目标父节点，调用 render 函数渲染子节点；
5. 调用 `appendChild` 方法将生成的节点挂载到目标父节点中。

代码实现如下：

```js
const ReactDOM = { render };

function render(vnode, container) {
  if (vnode === undefined) {
    return;
  }

  // 如果 vnode 是字符串
  if (typeof vnode === "string") {
    // 创建文本节点
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }

  // 否则就是一个虚拟 DOM 对象
  const { tag, attrs, children } = vnode;
  const dom = document.createElement(tag);
  if (attrs) {
    for (let key in attrs) {
      const value = attrs[key];
      setAttribute(dom, key, value);
    }
  }

  // 渲染子节点
  if (children && children instanceof Array) {
    children.forEach((child) => render(child, dom));
  }

  return container.appendChild(dom);
}

function setAttribute(dom, key, value) {
  // 将属性名 className 转化为 class
  if (key === "className") {
    key = "class";
  }

  // 如果是事件
  if (/on\w+/.test(key)) {
    key = key.toLowerCase();
    dom[key] = value || "";
  }
  // 如果是样式
  else if (key === "style") {
    // 样式是字符串
    if (!value || typeof value === "string") {
      dom.style.cssText = value || "";
    }
    // 样式是对象
    else if (value && typeof value === "object") {
      for (let key in value) {
        if (typeof value === "number") {
          dom.style[key] = value[key] + "px";
        } else {
          dom.style[key] = value[key];
        }
      }
    }
  }
  // 其他属性直接赋值
  else {
    if (key in dom) {
      dom[key] = value || "";
    }
    if (value) {
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  }
}

export default ReactDOM;
```

# 3. 组件的实现

在上一节中，我们实现了 render 函数，render 函数的第一个参数可以传入一个虚拟节点。但是，在实际的 React 中，第一个参数还可以传入一个函数组件，因此我们以此为切入点，探讨一下 React 中组件的渲染原理。

## 3.1 让 render 函数支持传入组件

我们先来看一下经过 babel 转义的组件 jsx 长什么样子：

```jsx
function Home() {
  return (
    <div className="active" title="123">
      hello, <span>react</span>
    </div>
  );
}

const title = "active";

console.log(<Home name={title} />);
```

输出结果：

![](https://i.loli.net/2021/04/11/cvX3gjTHPVD1OBI.png)

我们可以发现，函数组件被处理为虚拟节点对象后，tag 中包含了改组件的渲染函数，因此我们可以通过 render 函数来判断 tag 属性来判断渲染对象到底是 HTMLElement 还是 React 组件，同时我们将 render 函数进行一下简单的拆分：

```js
function render(vnode, container) {
  return container.appendChild(_render(vnode));
}

function _render(vnode) {
  if (vnode === undefined || vnode === null || typeof vnode === "boolean") {
    return;
  }

  // 1. 如果 tag 是函数，则渲染函数组件
  if (typeof vnode.tag === "function") {
    // 1. 创建组件
    const comp = createComponent(vnode.tag, vnode.attrs);
    // 2. 设置组件 props 并渲染组件
    setComponentProps(com, vnode.attrs);
    // 3. 组件渲染后的 DOM 对象返回
    return comp.base;
  }


  // 2. 如果 vnode 是字符串
  if (typeof vnode === "string") {
    // ... ...
  }

  // 3. 否则就是一个虚拟 DOM 对象
  // ... ...

  return dom;
}
```

## 3.2 createComponent

在 `_render()` 函数中，如果传入的是一个函数或 class 组件，首先要实现一个 `createComponent` 方法，来将组件进行 **实例化**，最终的实例化对象上会有一个 `render()` 方法来生成具体的虚拟 DOM 对象。

以下是 `createComponent` 方法的具体实现：

```js
function createComponent(comp, props) {
  let inst;
  if (comp.prototype && comp.prototype.render) {
    inst = new comp(props); // (1)
  } else {
    inst = new Component(props); // (2)
    inst.constructor = comp; // (3)
    inst.render = function () {
      return this.constructor(props);
    }; // (4)
  }
  return inst;
}
```

如果我们传入的是一个 class 组件，那么直接将其进行实例化，**注意此时组件就会执行构造函数的 `constructor` 部分，如进行 state 的初始化**，最终实例化后的对象上会挂载一个 `render` 方法（1）；

但如果我们传入的是一个函数组件，我们要将其构造为一个 class 组件，在构造为一个 class 组件之前，我们需要首先声明 `Component` 类：

```js
// component.js
class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }
}

export default Component;
```

首先我们实例化一个 `Component` 对象，作为我们即将改造的“初始对象”，此时要注意将组件属性 `props` 传入，这样在组件对象上才能取到传入的 `props`（2）；之后我们将函数组件的函数体挂载到生成的 Component 对象的 `constructor` 上，我们这一步是改写了生成的 Component 对象的构造方法（3），目前来看意义不大；之后，我们将生成的 Component 对象的 `render()` 方法改写为函数组件的函数体（4），这样就将一个函数组件改写为了 class 组件。

## 3.3 setComponentProps

`setComponentProps` 方法负责对组件的 props 进行更新，并触发组件的渲染：

```jsx
export function setComponentProps(comp, props) {
  comp.props = props;
  renderComponent(comp);
}
```

> 其实，在目前组件执行初次渲染时 `comp.props = props` 的执行是没有意义的，因为在执行 `createComponent` 组件实例化时，就已经完成了对 props 的挂载。我们在这里再重新挂载一次是因为该方法不仅在组件初始化时调用，也会在组件更新时调用。当组件更新时，直接调用该方法就可以直接完成 props 的更新以及组件的重新渲染。

## 3.4 renderComponent

在调用 `renderComponent` 之前，我们已经完成了对函数组件、class 组件的实例化，并且将外部传入的组件属性挂载到了实例化对象的 `props` 属性上，同时实例化好的组件对象上有用 `render()` 方法，执行后可以返回一个虚拟节点对象。

因此，在 `renderComponent` 方法中，我们主要是调用组件的 `render()` 函数（1），然后再将生成的虚拟节点对象传入到 `_render()` 函数中，渲染为真实的 DOM 对象，并将 DOM 对象挂载到组件实例的 base 属性上（2）：

```js
function renderComponent(comp) {
  const renderer = comp.render(); // (1)
  comp.base = _render(renderer); // (2)
}
```

# 4. 生命周期

在上一节中，我们已经完善了组件的渲染过程，那么在本章节中，我们将还原 React 组件[生命周期函数](https://zh-hans.reactjs.org/docs/react-component.html#the-component-lifecycle)的调用过程。我们将着重探讨 `componentWillMount` `componentDidMount` `componentWillUpdate` `componentDidUpdate` 这四个生命周期函数。

## 4.1 componentWillMount 与 componentDidMount

> UNSAFE_componentWillMount() 在挂载之前被调用。它在 render() 之前调用，因此在此方法中同步调用 setState() 不会触发额外渲染。

根据以上的特性我们很容易判断出 `componentWillMount` 的执行位置，让其在 `renderComponent()` 之前执行并且仅执行一次即可：

```js
function _render(vnode) {
  // ... ...

  if (typeof vnode.tag === "function") {
    const comp = createComponent(vnode.tag, vnode.attrs);

    if (!comp.base) {
      comp?.componentWillMount();
    } // 执行 componentWillMount

    renderComponent(comp);

    return comp.base;
  }

  // ... ... 
}
```

> componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。

`componentDidMount` 要在组件完成挂载时执行，且只执行一次，那么在 `renderComponent` 过程中，我们可以将其放置在组件渲染完成并且是初次挂载时执行。

> !!! 此处教程有误，componentDidMount 应该在组件 DOM 挂载到页面上后再执行，按照下面的写法显然实在 DOM 被挂载之前执行  !!!

```js
export function renderComponent(comp) {
  // 对组件进行渲染，获取虚拟节点对象
  const renderer = comp.render();
  let base = _render(renderer);

  if (!comp.base) {
    comp?.componentDidMount();
  }

  comp.base = base;
}
```

## 4.2 componentWillUpdate 与 componentDidUpdate

要执行这两个方法，我们首先要实现组件内部 state 的更新以及重新渲染，我们先编写一个如下的 demo 组件：

```jsx
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };
  }
  // Handle
  handleClick() {
    this.setState({
      num: this.state.num + 1,
    });
  }
  render() {
    return (
      <div id="home">
        <h1>{this.props.title}</h1>
        <span>hello, react!</span>
        <button onClick={this.handleClick.bind(this)}>
          Click me! ({this.state.num})
        </button>
      </div>
    );
  }
}
```

![](https://i.loli.net/2021/04/14/3aBXAwJmQlzVtKx.png)

当用户点击按钮后，state 中存放的 num 变量就会被加一，然后页面会触发重新渲染，来展示整个页面。

要实现 state 的变更以及重新渲染，我们首先要扩展一下 Component 组件：

```diff
+ import { renderComponent } from "../react-dom/index";

  class Component {
    constructor(props = {}) {
      this.props = props;
      this.state = {};
    }
+   setState(stateChange) {
+     Object.assign(this.state, stateChange); // (1)
+     renderComponent(this); // (2)
+   }
  }

export default Component;
```

我们为 `Component` 添加 `setState` 方法，此时我们为了方便编写 demo，只是简单的将 state 进行了浅拷贝并覆盖值（1），实际的 setState 操作是异步的。进行了赋值操作之后，我们重新调用 `renderComponent` 方法对组件进行重新渲染，并将当前组件作为渲染对象传入（2）。

此时我们点击按钮后，会发现页面上的 DOM 结构并不会改变，但是在 `renderComponent` 方法中打印出当前的组件对象，其 base 上挂载的 HTMLElement 的确是已经发生了更新，这就说明我们并没有将更新后的 HTMLElement 挂载到页面上。

更新节点的方法其实也很简单，我们只需要获取到当前组件的父节点，然后使用 `replaceChild()` 方法，替换父节点的内容为最新的组件节点就可以了（1）。

```diff
  export function renderComponent(comp) {
    // 对组件进行渲染，获取虚拟节点对象
    const renderer = comp.render();
    let base = _render(renderer);

+   // 节点替换
+   if (comp?.base?.parentNode) {
+     comp.base.parentNode.replaceChild(base, comp.base); // (1)
+   }

    comp.base = base;
  }
```

这时，我们根据 `componentWillUpdate` 与 `componentDidUpdate` 的定义，就很容易得知其执行的位置：

> 当组件收到新的 props 或 state 时，会在渲染之前调用 UNSAFE_componentWillUpdate()。使用此作为在更新发生之前执行准备更新的机会。初始渲染不会调用此方法。

> componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法。

```diff
  export function renderComponent(comp) {
    const renderer = comp.render();
    let base = _render(renderer);

+   if (comp.base) {
+     comp?.componentWillUpdate(comp.props, comp.state);
+   } else {
+     comp?.componentDidMount();
+   }

    if (comp?.base?.parentNode) {
      comp.base.parentNode.replaceChild(base, comp.base);
+     comp?.componentDidUpdate();
    }

    comp.base = base;
  }
```

# 5. Diff 算法的实现

截至目前，我们已经刨析了 jsx 的渲染以及组件 state 的更新，那么接下来我们会进一步对渲染流程进行优化。

在前面的写法中，每当 state 改变触发组件重新渲染时，都会从头开始进行渲染，这样对性能的损耗是很大的。为了优化 DOM 结构的更新性能，react 引入了 diff 算法，这个算法会对比每个**同级节点的变更**，如果当前节点与之前相较发生了变更，就会更新当前节点与其子节点，这比重新渲染整个 DOM 结构要高效的多。

![](https://i.loli.net/2021/04/24/fZUiX1TAMw2aI8F.png)

总而言之,我们的diff算法有两个原则：

- 对比当前真实的DOM和虚拟DOM,在对比过程中直接更新真实DOM
- 只对比同一层级的变化

## 5.1 起步

先修改render函数,将\_render方法渲染的方式改为我们即将写的diff算法方式

`/react-dom/index.js`

```jsx
import diff from './diff';
const ReactDOM = {
    render
}

function render(vnode, container) {
    // return container.appendChild(_render(vnode));
    return diff(dom,vnode,container);
}
```

由上面的`diff()`可以看出,传入了 `真实DOM对象,虚拟DOM对象,根元素`

## 5.2 实现

实现一个diff算法,它的作用是对比真实的DOM和虚拟DOM,最后返回更新后的DOM

`/react-dom/diff.js`

```jsx
/*
dom:真实DOM
vnode:虚拟DOM
container: 容器
return : 更新后的DOM
*/
export function diff(dom,vnode,container) {
    // 返回更新后的节点
    let ret =  diffNode(dom,vnode);

    return ret;
}
function diffNode(dom,vnode){
	//......
}
```

接下来实现这个方法

在这之前先来回忆一下我们虚拟DOM的结构:

虚拟DOM的结构可以分为三种,分别表示文本,原生DOM节点以及组件

```jsx
// 原生DOM节点的vnode
{
    tag: 'div',
    attrs: {
        className: 'container'
    },
    children: []
}

// 文本节点的vnode
"hello,world"

// 组件的vnode
{
    tag: ComponentConstrucotr,
    attrs: {
        className: 'container'
    },
    children: []
}
```

## 5.3 对比文本节点

首先考虑最简单的文本节点,如果当前的DOM就是文本节点,则直接更新内容,否则就新建一个文本节点,并移除原来的DOM

```jsx
function diffNode(dom,vnode) {
    let out = dom;
    if(typeof vnode === 'string'){
      // 如果当前的dom是文本节点,则直接更新内容
      if(dom && dom.nodeType === 3){
          if(dom.textContent !== vnode) dom.textContent = vnode;
      } else{
        //  如果dom不是文本节点,则新建一个文本节点dom,并移除原来的dom
        out = document.createTextNode(vnode);
        if(dom && dom.parentNode){
            dom.parentNode.replaceChild(out,dom);
        }
      }
        return out;
    }
    return out;
}
```

文本节点十分简单,它没有属性,也没有子元素

## 5.4 对比组件

之前也说过,react组件分为函数组件和类组件,我们定制一个方法`diffComponent`

```jsx
import setComponentProps from "./index.js"

function diffNode(dom,vnode){
    //...
    //如果是一个组件
    if (typeof vnode.tag === 'function') {
        return diffComponent(dom, vnode);
    }
    //....
}
function diffComponent(dom, vnode) {
    let comp = dom;
    // 如果组件没有变化,则重新设置 props;   执行
    if (comp && comp.constructor === vnode.tag) {
        // 重新设置 props 并渲染
        setComponentProp(comp, vnode.attrs);
        // 赋值
        dom = comp.base;
    } else {
        // 如果组件类型变化,则移除掉原来组件,并渲染新组件
        // 移除
        if (comp) {
            unmountComponent(comp);
            comp = null;
        }
        //核心代码
        // 1.创建新组件
        comp = createComponent(vnode.tag, vnode.attrs);
        // 2.设置组件属性
        setComponentProp(comp, vnode.attrs);
        dom = comp.base;
    }
    return dom;
}
```

## 5.5 对比非文本DOM节点

如果vnode表示的是一个非文本DOM节点,分两种情况分析:

情况一: 如果真实DOM不存在,表示此节点是新增的

```jsx
if(!dom){
    updateDOM = document.createElement(vnode.tag);
}
```

情况二:如果真实DOM存在,需要`对比属性`和`对比子节点`

### 5.5.1 对比属性

找出来节点的属性以及事件监听的变化 单独起一个`diffAttributes`方法

```jsx
//设置属性和移除属性的时候 使用到了此方法.注意:移除属性 只需要设置属性值为undefined就可以
import { setAttribute } from './index';
function diffNode(dom,vnode){
    let out = dom;
	  //  ....
    // 如果是非文本DOM节点
    // 真实DOM不存在
    if(!dom){
      out = document.createElement(vnode.tag);
	  }
    // 如果真实DOM存在,需要对比属性和对比子节点
    diffAttributes(out,vnode);
    //...
    return out;
}
function diffAttributes(dom, vnode) {
    // 保存之前的真实DOM的所有属性
    const oldAttrs = {};
    const newAttrs = vnode.attrs; //虚拟DOM的属性 (也是最新的属性)
    // 获取真实DOM属性
    const domAttrs = dom.attributes;
    // const domAttrs =  document.querySelector('#root').attributes;
    [...domAttrs].forEach(item => {
        oldAttrs[item.name] = item.value;
    })
    // 比较
    // 如果原来的属性不在新的属性当中,则将其移除掉  (属性值直接设置undefined)
    for (let key in oldAttrs) {
        if (!(key in newAttrs)) {
            // 移除
            setAttribute(dom, key, undefined);
        }
    }
    // 更新新的属性值
    for (let key in newAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            console.log(dom, newAttrs[key], key);
            // 只更值不相等的属性
            setAttribute(dom, key, newAttrs[key]);
        }
    }
}
```

### 5.5.2 对比子节点

节点对比完成之后,接下来对比它的子节点

这个时候会有一个问题,前面我们实现的不同的diff算法,都是明确知道哪一个是真实DOM和虚拟DOM对比,但是子节点childrens是一个数组,他们可能改变顺序,或者数量有所变化,我们很难确定是和虚拟DOM对比的是哪一个?

> 思路:给节点设置一个key值,重新渲染时对比key值相同的节点,这样我们就能找到真实DOM和哪个虚拟DOM进行对比了

对比子节点的方法有点复杂,在这里理解一下原理

```jsx
function diffNode(dom,vnode){
     if (vnode.childrens && vnode.childrens.length > 0 || (out.childNodes && out.childNodes.length > 0)) {
        diffChildren(out, vnode.childrens);
    }
}
```

```jsx
function diffChildren(dom, vchildren) {
  const domChildren = dom.childNodes;
  const children = [];
  const keyed = {};
  // 将有key的节点(用对象保存)和没有key的节点(用数组保存)分开
  if (domChildren.length > 0) {
    [...domChildren].forEach((item) => {
      // 获取key
      const key = item.key;
      if (key) {
        // 如果key存在,保存到对象中
        keyed[key] = item;
      } else {
        // 如果key不存在,保存到数组中
        children.push(item);``
      }
    });
  }
  if (vchildren && vchildren.length > 0) {
    let min = 0;
    let childrenLen = children.length; //2
    [...vchildren].forEach((vchild, i) => {
      // 获取虚拟DOM中所有的key
      const key = vchild.key;
      let child;
      if (key) {
        // 如果有key,找到对应key值的节点
        if (keyed[key]) {
          child = keyed[key];
          keyed[key] = undefined;
        }
      } else if (childrenLen > min) {
        // 如果没有key,则优先找类型相同的节点
        // 遍历所有真实节点的子节点
        for (let j = min; j < childrenLen; j++) {
          let c = children[j];
          if (c) {
            child = c;
            children[j] = undefined;
            if (j === childrenLen - 1) {
              childrenLen--;
            }
            if (j === min) {
              min++;
            }
            break;
          }
        }
      }
      // 对比
      child = diffNode(child, vchild);
      // 更新DOM
      const f = domChildren[i];
      if (child && child !== dom && child !== f) {
        // 如果更新前的对应位置为空，说明此节点是新增的
        if (!f) {
          dom.appendChild(child);
          // 如果更新后的节点和更新前对应位置的下一个节点一样，说明当前位置的节点被移除了
        } else if (child === f.nextSibling) {
          dom.removeChild(f);
          // 将更新后的节点移动到正确的位置
        } else {
          // 注意insertBefore的用法，第一个参数是要插入的节点，第二个参数是已存在的节点
          dom.insertBefore(child, f);
        }
      }
    });
  }
}
```

整个流程如下：

![](https://i.loli.net/2021/04/24/ZH2CcJqKeiDtBu3.png)

最后再修改`renderComponent`方法的两个地方


```diff
  export function renderComponent(comp) {
+   let base
    // 对组件进行渲染，获取虚拟节点对象
    const renderer = comp.render();
-   let base = _render(renderer);

    if (comp.base) {
      // 组件更新时引发重新渲染
      comp?.componentWillUpdate(comp.props, comp.state);
+     base = diffNode(comp.base,renderer);
+     comp?.componentDidUpdate();
    } else {
      // 初次渲染
+     base = _render(renderer);
      comp?.componentDidMount();
    }

-   // 组件 state 发生变化后，重新渲染节点，需要进行节点替换
-   if (comp?.base?.parentNode) {
-     comp.base.parentNode.replaceChild(base, comp.base);
-     comp?.componentDidUpdate();
-   }

    comp.base = base;
  }
```
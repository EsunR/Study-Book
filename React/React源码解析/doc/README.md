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
}

export default ReactDOM;
```

# 3. 组件的实现

在上一节中，我们实现了 render 函数，render 函数的第一个参数可以传入一个虚拟节点。但是，在实际的 React 中，第一个参数还可以传入一个函数组件，因此我们以此为切入点，探讨一下 React 中组件的渲染原理。

# 3.1 让 render 函数支持传入组件

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
    // 2. 渲染组件
    renderComponent(comp)
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

## 3.3 renderComponent

在调用 `renderComponent` 之前，我们已经完成了对函数组件、class 组件的实例化，并且将外部传入的组件属性挂载到了实例化对象的 `props` 属性上，同时实例化好的组件对象上有用 `render()` 方法，执行后可以返回一个虚拟节点对象。

因此，在 `renderComponent` 方法中，我们主要是调用组件的 `render()` 函数（1），然后再将生成的虚拟节点对象传入到 `_render()` 函数中，渲染为真实的 DOM 对象，并将 DOM 对象挂载到组件实例的 base 属性上（2）：

```js
function renderComponent(comp) {
  const renderer = comp.render(); // (1)
  comp.base = _render(renderer); // (2)
}
```
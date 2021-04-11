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
<div className="active" title="123">
  hello,<span style={{ color: "red" }}>React!</span>
</div>
```

Babel 转义后：

```js
"use strict";

/*#__PURE__*/
React.createElement("div", {
  className: "active",
  title: "123"
}, "hello,", /*#__PURE__*/React.createElement("span", {
  style: {
    color: "red"
  }
}, "React!"));
```

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
    // 2. 设置组件的属性
    setComponentProps(comp, vnode.attrs);
    // 3. 组件渲染的节点对象返回
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


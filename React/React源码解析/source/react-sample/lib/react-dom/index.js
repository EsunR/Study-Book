import Component from "../react/component";

const ReactDOM = { render };

function render(vnode, container) {
  return container.appendChild(_render(vnode));
}

function createComponent(comp, props) {
  let inst;
  if (comp.prototype && comp.prototype.render) {
    inst = new comp(props);
  } else {
    // 如果是函数组件，将函数组件扩展成类组件 方便后面统一管理
    inst = new Component(props);
    // 改写 constructor 为函数组件
    inst.constructor = comp;
    // 定义 render 函数
    inst.render = function () {
      return this.constructor(props);
    };
  }
  return inst;
}

export function renderComponent(comp) {
  // 对组件进行渲染，获取虚拟节点对象
  const renderer = comp.render();
  let base = _render(renderer);

  if (comp.base) {
    comp?.componentWillUpdate(comp.props, comp.state);
  } else {
    comp?.componentDidMount();
  }

  // 节点替换
  if (comp?.base?.parentNode) {
    comp.base.parentNode.replaceChild(base, comp.base);
    comp?.componentDidUpdate();
  }

  comp.base = base;
}

// function setComponentProps(comp, props) {
//   comp.props = props;
//   renderComponent(comp);
// }

function _render(vnode) {
  if (vnode === undefined || vnode === null || typeof vnode === "boolean") {
    return;
  }

  // 1. 如果 tag 是函数，则渲染函数组件
  if (typeof vnode.tag === "function") {
    // 1. 创建组件
    const comp = createComponent(vnode.tag, vnode.attrs);

    // 2. 渲染组件
    if (!comp.base) {
      comp?.componentWillMount();
    }
    renderComponent(comp);

    // 3. 组件渲染后的 DOM 对象返回
    return comp.base;
  }

  // 2. 如果 vnode 是字符串
  if (typeof vnode === "string" || typeof vnode === "number") {
    // 创建文本节点
    return document.createTextNode(vnode.toString());
  }

  // 3. 否则就是一个虚拟 DOM 对象
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

  return dom;
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

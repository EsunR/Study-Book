import { setAttribute } from "./index";

export function diff(dom, vnode, container) {
  // 对比节点的变化
  const ret = diffNode(dom, vnode);
  if (container) {
    container.appendChild(ret);
  }
  return ret;
}

/**
 *
 * @param {*} dom 真实节点
 * @param {*} vnode 虚拟节点
 * @returns 生成的新节点
 */
function diffNode(dom, vnode) {
  let out = dom;

  if (vnode === undefined || vnode === null || typeof vnode === "boolean") {
    return;
  }

  // 文本节点
  if (typeof vnode === "string" || typeof vnode === "number") {
    // 如果真实节点同样是文本节点
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vnode) {
        // 执行完之后直接替换文本内容
        dom.textContent = vnode;
      }
    }
    // 如果真实节点不是文本节点，直接替换
    else {
      out = document.createTextNode(vnode);
      if (dom && dom.parentNode) {
        dom.parentNode.replaceNode(out, dom);
      }
    }
    return out;
  }

  // 非文本的 dom 节点
  if (!dom) {
    out = document.createElement(vnode.tag);
  }

  // 比较自动节点（dom节点和组件）
  if (
    (vnode.children && vnode.children.length > 0) ||
    (out.childNodes && out.childNodes.length > 0)
  ) {
    diffChildren(out, vnode.children);
  }
  // 如果真实DOM存在,需要对比属性和对比子节点
  diffAttributes(out, vnode);

  return out;
}

function diffAttributes(dom, vnode) {
  // 保存之前的真实DOM的所有属性
  const oldAttrs = {};
  const newAttrs = vnode.attrs; //虚拟DOM的属性 (也是最新的属性)
  // 获取真实DOM属性
  const domAttrs = dom.attributes;
  // const domAttrs =  document.querySelector('#root').attributes;
  [...domAttrs].forEach((item) => {
    oldAttrs[item.name] = item.value;
  });
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
      // 只更值不相等的属性
      setAttribute(dom, key, newAttrs[key]);
    }
  }
}

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

/**
 * 1. 异步更新 state 短时间内把多个 setState 合并成一个（队列：先进先出）
 * 2. 一段时间之后，循环清空队列，渲染组件
 */
const setStateQueue = [];
export function enqueueSetState(stateChange, component) {
  // 1. 短时间内，合并多个 state
  setStateQueue.push({
    stateChange,
    component,
  });
}

// 一段时间之后
function flush() {
  let time;
  while ((item = setStateQueue.shift())) {
    const { stateChange, component } = item;
    if (!component.prevState) {
      component.prevState = Object.assign({}, component.state);
    }
    if (typeof stateChange === "function") {
      // 是一个函数
    } else {
      // 是一个值
      Object.assign(component.state, stateChange);
    }
  }
}

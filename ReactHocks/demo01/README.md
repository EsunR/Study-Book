# 1. 函数式组件

在新版本的 React 中，可以将组件直接导出为一个函数使用，即为函数式组件：

```jsx
import React  from "react";

function Example() {
  return (
    <div>
      hi~
    </div>
  );
}

export default Example;
```

函数式组件有以下几个优点：

- 没有生命周期
- 无组件实例，没有 `this`
- 没有内部状态(state)

函数式组件也有以下几个优点：

- 不需要声明 `class`，没有 `constructor`、`extends`等代码，代码简洁，占用内存小。
- 不需要使用 `this`
- 可以写成无副作用的纯函数。
- 更佳的性能。函数式组件没有了生命周期，不需要对这部分进行管理，从而保证了更好地性能。

同时，其也有不可避免的一些缺点：

- 没有生命周期方法。
- 没有实例化。
- 没有 `shouldComponentUpdate` ，不能避免重复渲染。

# 2. useState

`useState` 可以帮助我们代替原有的 state ，更好的去使用 state ，我们可以按照如下方法定义一个简单的累加器：

```jsx
import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(1);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点我
      </button>
    </div>
  );
}

export default Example;
```

![累加器](https://i.loli.net/2019/12/20/IWPfhZqu3UcovRr.png)

`useState()` 方法的返回值为一个记录值以及修改该值的 `set` 方法，其传入的参数是一个记录值的初始值，我们可以使用数组结构赋值取出这两部分，通过输出 `useState(1)` 我们可以看到返回值的结构：

![useState(1) 的返回值](https://i.loli.net/2019/12/20/OhbK1JHESidYto8.png)

# 3. useEffect

从字面意思上来看，`useEffect` 即为产生副作用，其可以按照如同 `useState` 方法一样去引入：

```js
import React, { useState, useEffect } from "react";
```

使用方法也相同：

```jsx
function Example() {
  useEffect(() => {
    // Do sometiong here
  });
  return (
    // DOM here
  );
}
```

其类似于 React 的 `ComponentDidMount` 与 `ComponentDidUpdate` 生命周期函数，也就是说其会在组件挂载时与组件更新时被调用，并会对组件产生一定的副作用，同时其也时异步调用的。

同时，`useEffect()` 方法第一个参数位传入的函数，允许返回一个额外的函数，这个函数将在组件被移除时调用，相当于 `componentWillUnmount()` 生命周期函数：

```jsx
function Example() {
  useEffect(() => {
    console.log("useEffect");
    return () => {
      console.log("useEffect return");
    }
  });
  return (
    // DOM here
  );
}
```

但是我们会发现，虽然组件在挂载时会触发 `useEffect()` 第一个参数的函数，在组件被卸载时会触发 `useEffect()` 第一个参数的函数的返回函数。但是每当组件内的状态被更新，或者父组件更新导致子组件也被刷新时，两个函数都会被各执行一次，仔细梳理一下我们得出结论：

- `useEffect()` 第一个参数的函数的作用 = `componentDidMount()` + `componentDidUpdate()`
- `useEffect()` 第一个参数的函数的返回值的作用 = `componentWillUpdate()` + `componentWillUnmount()`

那么我们如何控制函数的触发时间呢，这就要使用 `useEffect` 的第二个参数，其是一个数组，代表着当哪个 state 发生变化时会执行 `useState()` 第一个参数传入的函数，如：

```jsx
function Example() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    console.log("只在组件挂载与 count 更新时被调用");
  }, [count]);
  return (
    // DOM here
  );
}
```

不论数组中的内容时什么，`userEffect()` 第一个参数传入的函数与其返回的函数都会在组件被挂载与销毁时被调用，因此，只要留空的话，就可以达到 `componentDidMount()` 与 `componentWillUnmount()` 只执行一次的效果：

```jsx
function Example() {
  useEffect(() => {
    console.log("componentDidMount");
    return () => {
      componentWillUnmount();
    }
  }, []);
  return (
    // DOM here
  );
}
```

# 4. createContext useContent

React Hock 提供了一个组件间传递数据的方式 —— 使用 `createContext()` 与 `useContent()` 创建与使用上下文，其主要的思想就是创建一个 Context 上下文对象，在父组件中向子组件传递这个对象，那么子组件就可以获取父组件的数据，示例如下：

```jsx
import React, { useState, createContext, useContext } from "react";

// 创建一个上下文对象，用于传递 count
const CountContext = createContext();

// 创建子组件
function Counter() {
  // 使用父组件传递的上下文对象并取出 count 值
  let count = useContext(CountContext);
  return <h1>{count}</h1>;
}

// 创建父组件
function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        // 按钮点击一次 count 数值累加 1
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点我
      </button>
      // 创建一个传递上下文的组件
      <CountContext.Provider value={count}>
        // 引入子组件
        <Counter />
      </CountContext.Provider>
    </div>
  );
}

export default Example;
```
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
      {// 创建一个传递上下文的组件}
      <CountContext.Provider value={count}>
        {// 引入子组件}
        <Counter />
      </CountContext.Provider>
    </div>
  );
}

export default Example;
```

# 5. useReducer

首先回顾一下 Redux 中 Reducer 的写法：

```js
// ./store/reducer.js

export default (state = defaultState, action) => {
  if (action.type === 'change_input_value') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }
  return state;
}
```

在 ReactHocks 中，useReducer 的概念与写法与 Redux 的一致。`useReducer(reducer, initialArg, init)` 方法提供了三个参数：

第一个参数为一个 reducer 函数，该 reducer 函数中提供了两个参数，分别为当前的 state 与派发的 action，我们在 reducer 函数中可以通过判断 action 的值来选择性修改 state 的数据；

第二个参数为 state 提供了一个默认值，也就是 defaultState；

第三个参数为惰性初始化 state 的函数，具体使用可见 [官方文档](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer)，我们在此暂时不会用到。

最终 `useReducer()` 方法返回了一个 `state` 与一个 `dispath` 对象，分别用来读取 state 的数据与派发 action 。

因此，我们可以使用 `useReducer` 来替代 `useState`：

```jsx
import React, { useReducer } from "react";

function ReducerDemo() {
  const defaultState = {
    count: 0
  };
  const [state, dispatch] = useReducer((state, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action) {
      case "add":
        newState.count = state.count + 1;
        return newState;
      case "sub":
        newState.count = state.count - 1;
        return newState;
      default:
        return state;
    }
  }, defaultState);
  return (
    <div>
      <h2>现在的分数是{state.count}</h2>
      <button onClick={() => dispatch("sub")}>Decrement</button>
      <button onClick={() => dispatch("add")}>Increment</button>
    </div>
  );
}

export default ReducerDemo;
```

![实现效果](http://study.esunr.xyz/1578222613439.png)


# 6. useContext 与 useReducer 替代 Redux

`useContext`：可访问全局状态，避免一层层的传递状态。这符合 `Redux` 其中的一项规则，就是状态全局化，并能统一管理。

`useReducer`：通过action的传递，更新复杂逻辑的状态，主要是可以实现类似 `Redux` 中的 `Reducer` 部分，实现业务逻辑的可行性。

因此，将两者结合可以实现 Redux 的效果，在组件之间传递数据，接下来我们演示一个利用按钮组件控制显示组件显示的字体颜色的 Demo，其中涉及了组件之间数据的传递，我们在这里使用了 `useContext` 与 `useReducer`。

首先，我们来看一下界面的 UI：

![默认字体为蓝色](http://img.cdn.esunr.xyz/markdown/20200207152525.png)

![点击后变为红色](http://img.cdn.esunr.xyz/markdown/20200207152558.png)

![点击后变为黄色](http://img.cdn.esunr.xyz/markdown/20200207152617.png)

我们可以将页面拆分为两个组件，`<ShowArea />` 组件与 `<Buttons />` 组件：

![](http://img.cdn.esunr.xyz/markdown/20200207153337.png)

我们在当前页面引入这两个组件：

```jsx
import React from "react";
import ShowArea from "./components/ShowArea";
import Buttons from "./components/Buttons";

function Page_6() {
  return (
    <div>
      <ShowArea></ShowArea>
      <Buttons></Buttons>
    </div>
  );
}

export default Page_6;
```

这样就完成了页面的基本布局，那么接下来我们需要另外编写一个 `color.js` 文件：

其内部使用了 `createContext()` 方法创建了一个上下文对象，并向外暴露这个上下文对象 `ColorContext`；

同时又向外暴露了一个 `Color` 组件，该组件为一个上下文组件，并且在组件内部使用 `useReducer()` 方法创建了 `state` 对象与 `dispath` 方法，并完成了 state 的初始化，最后在上下文组件的 `value` 属性中传入 `state` 与 `dispath`；

同时创建一个 `UPDATE_COLOR` 变量作为每次派发 action 的类型变量；

经过上述编写过程，使用 `<Color/>` 组件包裹的子组件就可以通过使用 `useContext` 方法就可以来获取到 `state` 与 `dispatch` 方法，进而在组件之间共享状态，详细代码如下：

整体目录结构：

```
components
|- Button,jsx
|- ShowArea.jsx
Page.jsx
color.js
```

color.js 的编写：

```js
// color.js

import React, { createContext, useReducer } from "react";

export const ColorContext = createContext();

export const UPDATE_COLOR = "UPDATE_COLOR";

const reducer = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case UPDATE_COLOR:
      newState.color = action.payload;
      return newState;
    default:
      return state;
  }
};

export function Color(props) {
  const [state, dispatch] = useReducer(reducer, { color: "blue" });
  return (
    <ColorContext.Provider value={{ state, dispatch }}>
      {/* props.children 为当前组件内包含的子组件，相当于插槽 */}
      {props.children}
    </ColorContext.Provider>
  );
}
```

Button 组件：

```jsx
// Button.jsx
import React, { useContext } from "react";
import { ColorContext, UPDATE_COLOR } from "../color";

function Buttons() {
  const { dispatch } = useContext(ColorContext);
  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: UPDATE_COLOR, payload: "red" });
        }}
      >
        红色
      </button>
      <button
        onClick={() => {
          dispatch({ type: UPDATE_COLOR, payload: "yellow" });
        }}
      >
        黄色
      </button>
    </div>
  );
}

export default Buttons;
```

ShowArea 组件：

```jsx
// ShowArea.jsx
import React, { useContext } from "react";
import { ColorContext } from "../color";

function ShowArea() {
  const { state } = useContext(ColorContext);
  return <div style={{ color: state.color }}>字体的颜色为 {state.color}</div>;
}

export default ShowArea;
```

最外部的页面组件：

```jsx
// page.jsx
import React from "react";
import ShowArea from "./components/ShowArea";
import Buttons from "./components/Buttons";
import { Color } from "./color.js";

function Page_6() {
  return (
    <div>
      <Color>
        <ShowArea></ShowArea>
        <Buttons></Buttons>
      </Color>
    </div>
  );
}

export default Page_6;
```

# 7. useMemo 优化组件性能

在 React 中，父组件更新后会导致子组件的重新渲染，因此也会触发子组件重新执行某些函数。在普通的 React 组件中，我们会使用 `shouldComponentUpdate()` 生命周期函数，来限制子组件重新渲染过程中所执行的方法，从而优化组件性能。而在 React Hooks 中，我们需要用到 `useMemo()` 来达到此需求：

[useMemo 官方文档](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

`useMemo()` 方法提供了两个参数，第一个参数为方法执行函数，第二个参数为一个 Array，代表侦测值，如果侦测值发生变化，才会执行方法执行函数，如果侦测值没有发生变化，则不会执行。最终 `useMemo()` 的返回值为第一个参数传入的方法执行函数的返回值。

我们在此举一个例子：

在父组件中存在两个按钮，子组件会显示两个时间戳，当父组件点击了某一按钮后，子组件中与之对应的时间戳就会发生改变，如下：

![](http://img.cdn.esunr.xyz/markdown/选择.gif)

父组件如下：

```jsx
function UseMemo() {
  // 设置 tiem1 与 time2
  const [time1, setTime1] = useState(0);
  const [time2, setTime2] = useState(0);
  return (
    <div>
      {/* 按钮组件，点击后会分别修改 time1 和 time2 的值 */}
      <button
        onClick={() => {
          setTime1(new Date().getTime());
        }}
      >
        获取 time1
      </button>
      <button
        onClick={() => {
          setTime2(new Date().getTime());
        }}
      >
        获取 time2
      </button>
      {/* 引入子组件，并向子组件的 props 中传入 time1 与 time2 */}
      <ChildComponent time1={time1} time2={time2}></ChildComponent>
    </div>
  );
}
```

子组件编写:

```jsx
function ChildComponent(props) {
  const { time1, time2 } = props;

  // 格式化时间函数
  function parseTime(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
    return date
      .toJSON()
      .substr(0, 19)
      .replace("T", " ");
  }

  //IIFE 函数获取结果
  const parsedTime1 = (() => {
    console.log("parsing time1");
    return parseTime(time1);
  })();

  const parsedTime2 = (() => {
    console.log("parsing time2");
    return parseTime(time2);
  })();

  return (
    <>
      <div>{parsedTime1}</div>
      <div>{parsedTime2}</div>
    </>
  );
}
```

当我们预览效果后，会发现，当点击任意一个按钮后，`parsedTime1` 的值与 `parsedTime2` 的值都会被重新计算：

![第一组为初始化时的两次计算，第二组为点击任意一按钮后又重新执行的两次计算](http://img.cdn.esunr.xyz/markdown/20200207181856.png)

当我们使用 `useMemo()` 方法后，就可以避免重复计算：

```jsx
function ChildComponent(props) {
  const { time1, time2 } = props;

  // 格式化时间函数
  function parseTime(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
    return date
      .toJSON()
      .substr(0, 19)
      .replace("T", " ");
  }

  /*
  //IIFE 函数获取结果
  const parsedTime1 = (() => {
    console.log("parsing time1");
    return parseTime(time1);
  })();

  const parsedTime1 = useMemo(() => {
    console.log("parsing time1");
    return parseTime(time1);
  }, [time1]);
  */

  const parsedTime2 = useMemo(() => {
    console.log("parsing time2");
    return parseTime(time2);
  }, [time2]);

  const parsedTime2 = (() => {
    console.log("parsing time2");
    return parseTime(time2);
  })();

  return (
    <>
      <div>{parsedTime1}</div>
      <div>{parsedTime2}</div>
    </>
  );
}
```

![分别计算 parsedTime1 与 parsedTime2](http://img.cdn.esunr.xyz/markdown/20200207182218.png)

# 7. useRef

当我们需要引用 DOM 节点时就可以使用 `useRef()` 方法。`useRef()` 传入一个初始值，其返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数。

[官方文档](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref)

```js
const refContainer = useRef(initialValue);
```

`useRef()` 比 `ref` 属性更有用。它可以[很方便地保存任何可变值](https://zh-hans.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)，其类似于在 class 中使用实例字段的方式。

这是因为它创建的是一个普通 Javascript 对象。而 `useRef()` 和自建一个 `{current: ...}` 对象的唯一区别是，`useRef` 会在每次渲染时返回同一个 ref 对象。

具体使用示例：

```js
import React, { useRef } from "react";

function UseRefDemo() {
  // 创建引用
  const inputEl = useRef(null);

  // 设置点击事件，点击后，input被填入文字
  const handleButtonClick = () => {
    inputEl.current.value = "Hello World";
  };

  return (
    <div>
      <input type="text" ref={inputEl} />
      <button onClick={handleButtonClick}>在input中展示文字</button>
    </div>
  );
}

export default UseRefDemo;
```

效果：

![点击按钮前](http://img.cdn.esunr.xyz/markdown/20200209194304.png)

![点击按钮后](http://img.cdn.esunr.xyz/markdown/20200209194322.png)

# 8. 自定义 Hooks

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

以上就是对 Hook 的官方定义，所谓的自定义 Hook，就是可以将组件逻辑提取到可重用的函数中。

举个例子，当我们向要获取当前页面的大小，我们可以编写一个 `ShowWindowSize` 组件：

```js
function ShowWindowSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return (
    <div>
      <h2>自定义Hooks</h2>
      <div>
        页面的大小为：{size.width} * {size.height}
      </div>
    </div>
  );
}
```

显示效果：

![](http://img.cdn.esunr.xyz/markdown/20200209215609.png)

如果我们想在别的组件中使用，那么可以在别的组件中直接引入 `ShowWindowSize` 即可。

但是这样有必要吗，如果我们仅仅需要某个组件的能力（如上述组件的计算页面大小的能力），是否可以单独引入该能力，而不去引入一个组件，这就是自定义 Hook 存在的原因。

我们可以将计算页面大小的能力单独处理为一个 `useWinSize()` 方法，这个方法就是一个自定义 Hook，按照规范自定义 Hook 必须以 `use` 开头。实际上自定义 Hook 就类似于创建了一个方法，不过可以使用 React Hook 中的部分能力。

我们将计算窗口高度的方法抽离为一个名为 `useWinSize` 的自定义 Hook：

```js
function useWinSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  // 返回一个 size 对象
  return size;
}
```

这样在普通组件中，我们可以通过引入该 Hook 来获取 size 对象：

```js
function ShowWindowSize() {
  const size = useWinSize();
  return (
    <div>
      <h2>自定义Hooks</h2>
      <div>
        页面的大小为：{size.width} * {size.height}
      </div>
    </div>
  );
}
```

当然，与普通函数一样，自定义 Hook 也可以传递参数，这里就不再演示。


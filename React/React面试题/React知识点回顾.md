# 1. useState

略

# 2. useEffect

## 2.1 什么是副作用

副作用：纯函数只要和外部进行交互，都可以认为其有副作用

1. 引用外部变量；
2. 调用外部函数；

宗旨：相同的输入 ==一定会有==> 相同的输出

只要不是在组件渲染时执行的操作，都是副作用操作。

一定会是副作用的操作：

1. 修改dom
2. 修改全局变量 window
3. Ajax 请求
4. 计时器
5. 存储相关

## 2.2 useEffect 的调用时机，以及其与 class 组件生命周期的关系

> 如果你熟悉 React class 的生命周期函数，你可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

![](https://i.loli.net/2021/05/16/cRXL7ywGoHx89hE.png)

> 图片来源：https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

不同于 ClassComponent，当 componentDidMount、componentDidUpdate 执行时，真实 DOM 尚未构建完成；**useEffect 是在真实 DOM 构建完成之后执行的**，同时 useEffect 是 **异步的** 。

> **`useEffect` 做了什么？** 
>
> 通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 **DOM 更新之后调用它**。
>
> **为什么在组件内部调用 `useEffect`？**
>
>  将 `useEffect` 放在组件内部让我们可以在 effect 中直接访问 `count` state 变量（或其他 props）。我们不需要特殊的 API 来读取它 —— 它已经保存在函数作用域中。**Hook 使用了 JavaScript 的闭包机制**，而不用在 JavaScript 已经提供了解决方案的情况下，还引入特定的 React API。
>
> **`useEffect` 会在每次渲染后都执行吗？** 
>
> 是的，默认情况下，它在第一次渲染之后*和*每次更新之后都会执行。你可能会更容易接受 effect 发生在“渲染之后”这种概念，不用再去考虑“挂载”还是“更新”。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

如果非要在 hook 中获取 DOM 更新前的状态并直行某些操作，可以使用 `useLayoutEffect`，其和 `componentDidMount` 在表现以及调用时机上 **是完全等价的** 。

> 与 `componentDidMount` 或 `componentDidUpdate` 不同，使用 `useEffect` 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 [`useLayoutEffect`](https://zh-hans.reactjs.org/docs/hooks-reference.html#uselayouteffect) Hook 供你使用，其 API 与 `useEffect` 相同。

`useLayoutEffect` 是同步的，在 `useLayoutEffect` 执行的时候也能获取到最新的 DOM 状态，只不过会阻塞以及”打断“ DOM 的渲染，因此应该尽量避免在 useLayoutEffect 中进行复杂的操作，举例来说：

```tsx
import React, { useEffect, useLayoutEffect, useState } from "react";

const Home: React.FC = () => {
  const [text, setText] = useState<string>("hello world");

  // useEffect(() => {
  //   let i = 0;
  //   while (i <= 1000000) {
  //     i++;
  //   }
  //   setText("world hello");
  // }, []);

  useLayoutEffect(() => {
    let i = 0;
    while (i <= 100000000) {
      i++;
    }
    const head = document.querySelector("#title");
    console.log(head?.innerHTML); // hello word
    setText("world hello");
  }, []);

  return (
    <h1 id="title">{text}</h1>
  );
};

export default Home;
```

当我们使用 useEffect 在组件创建后更新文本内容时，屏幕上会显示 "hello world" 后再转变为 "world hello"；

然而当我们使用 useLayoutEffect 在组件创建后更新文本内容时，屏幕上不会显示 "hello world" 而是直接显示 "world hello"，渲染似乎会被 useLayoutEffect 给"打断"掉，起渲染流程如下：

![渲染流程](https://i.loli.net/2021/05/17/6utCGzekOlRb3w2.png)

## 2.3 需要清除的 Effect

当使用 `useEffect` 时，可以返回一个函数，返回的这个函数被称为 **清理函数** 。每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。

```tsx
useEffect(()=>{
	let timer = setInterval(()=>{
    setCount(count + 1);
  }, 1000) 
  return ()=>{
    clearInterval(timer); // 形成闭包，可以获取到 timer
  }
})
```

同时，清理函数不仅在上一个 Effect 被清除时执行，在组件卸载时也会执行。

## 2.4 闭包问题

在前面，我们提到 Hook 使用了闭包机制，我们先看一个示例：

```tsx
const [count, setCount] = useState(0);

useEffect(()=>{
	let timer = setInterval(()=>{
    setCount(count + 1);
  }, 1000) 
  return ()=>{
    clearInterval(timer);
  }
}, [])

return <div>{count}</div>
```

在上面的示例中，`count` 会一直为1，这是因为在执行定时器时形成了一个闭包，`setCount(count + 1)` 获取到的是闭包中的 `count`，也就是定时器最开始启用时的 `count`，在定时器执行过程中，是无法获取到最新的 `count`。同时浏览器也会报出一个警告，提醒开发人员在 `useEffect` 使用到了一个未声明的依赖项。

解决这个问题有两个办法：

1. 将 `count` 作为依赖项传入 `useEffect` 中，这样每次都能获取到最新的 `count`。其相当于每次 count 更新后都清除上个定时器并重新创建一个新的定时器；

```diff
  const [count, setCount] = useState(0);

  useEffect(()=>{
    let timer = setInterval(()=>{
      setCount(count + 1);
    }, 1000) 
    return ()=>{
      clearInterval(timer);
    }
- }, [])
+ }, [count])

  return <div>{count}</div>
```

2. `setCount` 传入一个函数，在函数中可以获取到最新的 state，这样就能摆脱闭包；在 React 执行渲染流程时会去执行 setCount 传入的函数，此时传入的 count 是最新的。

```diff
  const [count, setCount] = useState(0);

  useEffect(()=>{
    let timer = setInterval(()=>{
-     setCount(count + 1);
+     setCount(count => count + 1);
    }, 1000) 
    return ()=>{
      clearInterval(timer);
    }
  }, [])

  return <div>{count}</div>
```

# 3. useContext

## 3.1 使用 useContext

可以使用 `useContext` 来获取上级组件的 Provider 中传入的 `value`，如下：

```jsx
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

## 3.2 使用 Consumer

除此之外，我们还可以使用 `Context.Consumer` 组件来获取 Provider 传入的 `value`，该组件可以传入一个函数，函数传入一个 `value` 并返回一个 ReactComponent：

```jsx
function ThemedButton() {
  return (
    <ThemeContext.Consumer>
      {
        theme => 
          <button style={{ background: theme.background, color: theme.foreground }}>
            I am styled by theme context!
          </button>
      }
    </ThemeContext.Consumer>
  );
}
```

# 4. useMemo

## 4.1 memo 组件

使用 memo 创建函数组件可以让父组件重新渲染时，子组件不重新渲染，而是只有当子组件的 props 更新时，子组件才会被渲染：

```tsx
import React, { memo, useState } from "react";

const MemoComponent = memo<{ count: number }>((props) => {
  // 使用 memo 后，只有当组件的 props 改变后，才会触发组件重新渲染
  console.log("render");

  return (
    <div>
      <h2>Memo Component</h2>
      <div>{props.count}</div>
    </div>
  );
});

const Home: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1 id="title">Home</h1>
      <button onClick={handleClick} id="btn" style={{ marginLeft: count }}>
        Click{count}
      </button>
      {/* 传入子组件的 count 始终为 1，父组件的 count 更新时，子组件不更新 */}
      <MemoComponent count={1} />
    </div>
  );
};

export default Home;
```
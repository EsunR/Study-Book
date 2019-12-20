# 函数式组件

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

# useState

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

# useEffect

从字面意思上来看，`useEffect` 即为产生副作用，其可以按照如同 `useState` 方法一样去引入：

```js
import React, { useState, useEffect } from "react";
```

使用方法也相同：

```jsx
function Example() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    // do sometiong here
  });
  return (
    // ... ...
  );
}
```

其类似于 React 的 `ComponentDidMount` 与 `ComponentDidUpdate` 生命周期函数，也就是说其会在组件挂载时与组件更新时被调用，并会对组件产生一定的副作用，同时其时异步调用的。
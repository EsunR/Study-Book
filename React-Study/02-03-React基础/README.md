- [1.用 Create React App 创建一个 React 应用](#1%E7%94%A8-create-react-app-%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-react-%E5%BA%94%E7%94%A8)
- [2.文件结构](#2%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
- [3.App.js](#3appjs)
- [4.idnex.js](#4idnexjs)
- [5.Fragment占位符](#5fragment%E5%8D%A0%E4%BD%8D%E7%AC%A6)
- [6.数据操作](#6%E6%95%B0%E6%8D%AE%E6%93%8D%E4%BD%9C)
- [7.渲染数据 (循环渲染)](#7%E6%B8%B2%E6%9F%93%E6%95%B0%E6%8D%AE-%E5%BE%AA%E7%8E%AF%E6%B8%B2%E6%9F%93)
  - [ES6展开运算符：](#es6%E5%B1%95%E5%BC%80%E8%BF%90%E7%AE%97%E7%AC%A6)
- [8.class属性的处理](#8class%E5%B1%9E%E6%80%A7%E7%9A%84%E5%A4%84%E7%90%86)
- [9.不转义字符串](#9%E4%B8%8D%E8%BD%AC%E4%B9%89%E5%AD%97%E7%AC%A6%E4%B8%B2)
- [10.for属性的处理](#10for%E5%B1%9E%E6%80%A7%E7%9A%84%E5%A4%84%E7%90%86)
- [11.父组件与子组件](#11%E7%88%B6%E7%BB%84%E4%BB%B6%E4%B8%8E%E5%AD%90%E7%BB%84%E4%BB%B6)
- [12. 通过ES6语法引入props](#12-%E9%80%9A%E8%BF%87es6%E8%AF%AD%E6%B3%95%E5%BC%95%E5%85%A5props)
- [13. 关于bind与this指向的问题](#13-%E5%85%B3%E4%BA%8Ebind%E4%B8%8Ethis%E6%8C%87%E5%90%91%E7%9A%84%E9%97%AE%E9%A2%98)

## 1.用 Create React App 创建一个 React 应用
```
npx create-react-app my-app
cd my-app
npm start
```

## 2.文件结构
App.js 构建网页内容
index.js 引入内容

## 3.App.js
```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        HELLO WORLD
      </div>
    );
  }
}

export default App;
```
等价于：
```javascript
import React from 'react';

// ES6语法创建一个名为App的类，这个类继承了React.Component类，就说明这个App是一个React组件
class App extends React.Component {
  // reader就是组件的内容
  render() {
    return (
      <div>
        HELLO WORLD
      </div>
    );
  }
}

export default App;
```

<br>

```javascript
import React from 'react';
import { Component } from 'react';
// 等价于
import React from 'react';
const Component = React.Compinent;
```

## 4.idnex.js

ReactDOM.reader函数: 挂载一个 `<APP />`，节点到DOM中的root
```javascript
ReactDOM.render(<App />, document.getElementById('root'))
```

> 要使用JSX语法必须引入整个React

## 5.Fragment占位符
可以隐藏最外层标签
```javascript
// TodoList.js
import React, { Component, Fragment } from 'react'

class TodoList extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <input /><button>提交</button>
        </div>
        <ul>
          <li>学英语</li>
          <li>Learning English</li>
        </ul>
      </Fragment>
    )
  }
}

export default TodoList;
```



## 6.数据操作
1. `constructor`构造函数，最优先执行

```javascript
// TodoList.js
class TodoList extends Component {
  constructor(props){
    super(props); // super调用父类（Component）固定写法
    this.state = { // 组件的状态
      inputValue: '',
      list: []
    }
  }

  reader(){
    ... ...
  }
}
```

2. 用 `{this.state.KEY}` 绑定状态中的数据，这种绑定，对应的值无法被改变
```javascript
// TodoList.js
  <div>
    <input value={this.state.inputValue}/>
    <button>提交</button>
  </div>
```

3. 用`onChange`来执行某个方法：
```javascript
// TodoList.js
render() {
  return (
    <Fragment>
      ... ...
      <input
        value={this.state.inputValue}
        onChange={this.handleInputChange} {/*绑定事件*/}
      />
      ... ...
    </Fragment>
  )
}

handleInputChange(e){
  console.log(e.target.value);
  // `e.target.value` 为获取输入的新内容
}
```

4. 以 `handleInputChange` 方法为入口，调用 `setState()` 方法更改`state`中的数据
```javascript
// TodoList.js
render() {
  return (
    <Fragment>
      ...
      <input
        value={this.state.inputValue}
        onChange={this.handleInputChange.bind(this)} 
        {/* 
        1. 在javascript中，类方法没有指定this，所以使用onChange触发的放法中的this为undefined。
        2. 使用bind绑定 handleInputChange 方法 this 的指向为 TodoList 类。
        3. 使用 onChange={(e) => { this.handleInputChange(e) }} （需要再此传入合成的事件e）也可以达到同样的效果
        */}
      />
      ...
    </Fragment>
  )
}

handleInputChange(e) {
  this.setState({
    inputValue: e.target.value
  })
}
```
> this指向问题：我们用 `this.[METHODS].bind(this)` 能解决 [METHODS] 函数中 this 的指向问题，但是这会造成性能上的影响。更优的解决方案是在 `constructor` 部分中添加一个 `this.[METHODS] = this.[METHODS].bind(this)`，这样性能就会被优化。

> 在新版的React中 `this.setState` 推荐改写为传入一个方法，这个方法返回的是一个state对象，如下：

```javascript
const value = e.target.value // 新版的方法会将setState方法改写为异步，所以要再此保存状态
this.setState(()=>{
  return ({
    inputValue: value
  })
})
// ES6可以简写为：
const value = e.target.value
this.setState(()=>({ 
  // 剪头函数后面直接跟一个括号，这个括号内的内容即为返回的内容
  inputValue: value
}))
```



## 7.渲染数据 (循环渲染)

> `this.state.[LIST].map` 效果相当于 Vue 中的 `v-for`

用`{}`包住的是js语句

```javascript
constructor(props) {
  super(props);
  this.state = {
    list: ["11","22"]
  }
}

render(
  <div>
    {
      this.state.list.map((item, index) => {
        return <li key={index}>{item}</li>
      })
    }
  </div>
)
```

### ES6展开运算符：  
> 
> 假如已定义一个数组 `let arr = [1,2,3]`  
> 
> `[...arr]` 表示为 `[1,2,3]`
>
> 我们可以对其进行操作连接赋值操作，如：
> 
> `let arr2 = [...arr,4,5]`
> 
> 那么，`arr2`被输出后即为`[1,2,3,4,5]`
   
   
## 8.class属性的处理
用`className`替代
```javascriptx
<input
+ className="input"
  value={this.state.inputValue}
  onChange={this.handleInputChange.bind(this)}
/>
```

## 9.不转义字符串
`dangerouslySetInnerHTML` 取消转义内容
```javascriptx
<ul>
  {
    this.state.list.map((item, index) => {
      return <li
        key={index}
        onClick={this.handleDelete.bind(this, index)}
+       dangerouslySetInnerHTML={{__html: item}}
      >
      {/*注意中间不能有内容*/}
      </li>
    })
  }
</ul>
```

## 10.for属性的处理
用`htmlFor`替代
```javascript
<label htmlFor="insertArea"></label>
```

## 11.父组件与子组件

1. 父组件中使用子组件：
    ```javascript
    // 在TodoList.js中引入TodoItem.js
    import TodoItem from './TodoItem'
    ...
    <ul>
    {
      this.state.list.map((item, index) => {
        return (
          <div>
            <TodoItem /> 
            {/* 在TodoList.js中要调用TodoItem组件的位置用一个 */}
          </div>
        )
      })
    }
    </ul>
    ...
    ```

    ```javascript
    // TodoItem.js
    import React, { Component } from 'react';
    class TodoItem extends Component {
      render() {
        return <div>item</div>
      }
    }
    export default TodoItem;
    ```

2. 父组件向子组件传值：父组件以标签属性的方式，向子组件传入值。如下，父组件为子组件设置一个 `content` 属性，属性的值为父组件的 `item` 的值：
   ```html
   // TodoList.js
   ...
   <TodoItem content={item}/>
   ...
   ```

   子组件通过 `this.props.[PROPS_NAME]` 来接收数据
   ```html
   ...
   <div>{this.props.content}</div>
   ...
   ```

3. 父组件向子组件传递父组件的方法(子组件内部触发父组件的方法)：
- 用属性传递的方法将函数传递给子组件，同时强行将父组件中的this传递给子组件。
   ```html
   <!-- TodoList中调用TodoItem组件 -->
   <TodoItem 
   + deleteItem = {this.handleDelete.bind(this)}
   />
   ```
   ```javascript
   // TodoItem.js ...
   render() {
     const { index,content } = this.props
     return (
       <div
         onClick={this.handleClick}
         key={index}
       >
         {content}
       </div>
     )
   }

   handleClick() {
     const { index, deleteItem } = this.props;
     deleteItem(index);
   }
   // ...
   ```
- 在子组件中使用父组件的方法，同时this指向没问题

## 12. 通过ES6语法引入props

> 组件的 this.props 是一个聚合属性，我们可以用ES6的解构赋值来取这些属性到一个变量中
```javascript
const { index } = this.props;
// 相当于
let index = this.props.index;
```

## 13. 关于bind与this指向的问题
```html
<input
  value={this.state.inputValue}
  onChange={this.handleInputChange.bind(this)} 
/>
```

1. 在javascript中，类方法没有指定this，所以使用onChange触发的放法中的this为undefined。

2. 使用bind绑定 handleInputChange 方法 this 的指向为 TodoList 类。

3. 使用 onChange={(e) => { this.handleInputChange(e) }} （需要再此传入合成的事件e）也可以达到同样的效果

4. JSX在类方法方法中调用组件中的方法，如果带括号方法会在Virtual DOM渲染过 程中就执行，如：
    ```
    onClick={this.handleDeleteItem()}
    ```

    是不可行的，但是通过bind方法绑定this和参数后在渲染过程中不会立即执行，如：
    ```
    onClick={this.handleDeleteItem.bind(this, index)}
    ```

    但是假如方法已经在`constructor`中绑定了this，同时方法还需要传入参数，这时候不能直接使用
    ```
    onClick={this.handleDeleteItem(index)} 
    ```

    而需要通过剪头函数来传递参数，这时绑定this是非必要的：
    ```
    onClick={() => {this.handleDeleteItem(index)}} 
    ```



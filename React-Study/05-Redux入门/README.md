- [02.redux概念](#02redux%E6%A6%82%E5%BF%B5)
- [03.使用AntDesign](#03%E4%BD%BF%E7%94%A8antdesign)
- [04.Redux的创建与使用](#04redux%E7%9A%84%E5%88%9B%E5%BB%BA%E4%B8%8E%E4%BD%BF%E7%94%A8)
  - [文件结构](#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
  - [安装Redux](#%E5%AE%89%E8%A3%85redux)
  - [创建Reducer和Store](#%E5%88%9B%E5%BB%BAreducer%E5%92%8Cstore)
  - [在组件中使用Redux中保存的数据](#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8redux%E4%B8%AD%E4%BF%9D%E5%AD%98%E7%9A%84%E6%95%B0%E6%8D%AE)
- [05.Action和Reducer的编写](#05action%E5%92%8Creducer%E7%9A%84%E7%BC%96%E5%86%99)
  - [使用Redux DevTools](#%E4%BD%BF%E7%94%A8redux-devtools)
  - [组件中直接请求更改数据](#%E7%BB%84%E4%BB%B6%E4%B8%AD%E7%9B%B4%E6%8E%A5%E8%AF%B7%E6%B1%82%E6%9B%B4%E6%94%B9%E6%95%B0%E6%8D%AE)
    - [1.组件发送修改请求action](#1%E7%BB%84%E4%BB%B6%E5%8F%91%E9%80%81%E4%BF%AE%E6%94%B9%E8%AF%B7%E6%B1%82action)
    - [2.Store转发请求给Reducer](#2store%E8%BD%AC%E5%8F%91%E8%AF%B7%E6%B1%82%E7%BB%99reducer)
    - [3.Reducers处理数据](#3reducers%E5%A4%84%E7%90%86%E6%95%B0%E6%8D%AE)
    - [4.Store拿到Reducer的处理结果](#4store%E6%8B%BF%E5%88%B0reducer%E7%9A%84%E5%A4%84%E7%90%86%E7%BB%93%E6%9E%9C)
    - [5.组件感知Store中数据变化](#5%E7%BB%84%E4%BB%B6%E6%84%9F%E7%9F%A5store%E4%B8%AD%E6%95%B0%E6%8D%AE%E5%8F%98%E5%8C%96)
- [06.ActionType的拆分](#06actiontype%E7%9A%84%E6%8B%86%E5%88%86)
- [07.使用ActionCreator统一创建action](#07%E4%BD%BF%E7%94%A8actioncreator%E7%BB%9F%E4%B8%80%E5%88%9B%E5%BB%BAaction)
- [09. 知识点补充](#09-%E7%9F%A5%E8%AF%86%E7%82%B9%E8%A1%A5%E5%85%85)
  - [总流程](#%E6%80%BB%E6%B5%81%E7%A8%8B)
  - [注意事项](#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
  - [核心API](#%E6%A0%B8%E5%BF%83api)

# 02.redux概念

![](http://ww1.sinaimg.cn/large/a71efaafly1g191kj6wkej20rj0icjxn.jpg)

图书馆模型：
- React Components：借书的用户
- Action Creators：借书说的话（借哪本书）
- Store：图书管理员
- Reducers（减速器，还原剂 ）：记录本

# 03.使用AntDesign
> 示例：./03.AntDesign-TodoList
https://ant.design/docs/react/introduce-cn

# 04.Redux的创建与使用

## 文件结构
```
src
├── index.js
├── TodoList.js
├── store
|   ├── index.js
|   ├── reducer.js
|   ├── actionCreator.js
└── └── actionTypes.js
```

## 安装Redux
> yarn add redux

## 创建Reducer和Store

在这一步中我们创建一个Reducer去生成一个存放数据的位置，再把Reducer交给Store。

```javascript
// .store/index.js
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer);

export store;
```

```javascript
// ./store/reducer.js
const defaultState ={
  // 在此初始化rudecuer中的数据
}

export default (state = defaultState, action) => {
  return state;
  // state 存放数据（存放图书馆里所有书的信息）
}
```

## 在组件中使用Redux中保存的数据
1. 在组件中导入store文件的位置
    ```javascript
    import store from '../04.Redux/store.js';
    ```
2. 在组件中可以使用`store.getState()`获取数据
    ```javascript
    // 将store中的数据绑定在state上
    constructor(props){     
      super(props);
      this.state = store.getState()
    }
    ```

# 05.Action和Reducer的编写

## 使用Redux DevTools
在创建store的文件下，添加一句代码
```diff
const store = createStore(
  reducer,
+ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

## 组件中直接请求更改数据

### 1.组件发送修改请求action

在组件中可以直接创建一个`action`来请求更改Store中的数据，但是这个`action`必须符合规范，之后组件可以通过调用`store.dispatch(action)`方法，把`action`传递给`Store` 

拿TodoList项目来说，当用户在文本框内输入了文字，会触发`onChange`而调用`handleInputChange`方法，此时在方法中要向Store中发送一个修改请求，如下：
```javascript
handleInputChange(e) {
  const action = {
    type: 'change_input_value',
    value: e.target.value
  }
  store.dispatch(action)
}
```

### 2.Store转发请求给Reducer

Store接受到一个`action`后，会将 **当前的数据（previousState）** 和 **操作指令（action）** 转发给Reducer（这就是在`reducer.js`中，要接收的两个变量），这一步是自动执行的。


### 3.Reducers处理数据

Reducers接收到当前的数据（previousState）和操作的指令（action）后，会将它们对并且处理数据，之后将新的数据（newState）传回给Store。

如在TodoList示例中，在Reducers中设置一个`change_input_value`的判断方法，去设置数据的方法：

```javascript
// ./store/reducer.js

export default (state = defaultState, action) => {
  // state：store上一次存储的数据，action指的是用户传入的那句话
  console.log(state, action);

  // 查看用户的指令是什么
  if (action.type === 'change_input_value') {
    // 对previousState进行一次深拷贝
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }

  return state;
}
```

> 在此要注意的是：reducer可以接收state，但是绝对不能修改state，必须对state进行深拷贝后再处理数据。

### 4.Store拿到Reducer的处理结果

Store拿到Reducer的处理结果后，会将旧的数据替换为新的数据，这个阶段Store并未将数据交给组件，需要组件去自我感知数据发生了变化并自行更新界面。

### 5.组件感知Store中数据变化

在组件中的`constror`中调用`store.subscribe()`设置一个事件订阅，它的参数为个方法函数，用来检查store中的数据（state）是否发生了变化，如果发生了变化，就会调用参数中传入的方法，从而更新组件state中的数据，如下：

```javascript
constructor() {
  ... ...
  // 注意this绑定（在设置订阅前绑定this）
  this.handleStoreChange = this.handleStoreChange.bind(this)
  // 订阅store的改变
  store.subscribe(this.handleStoreChange)
  ... ...
}

... ...

handleStoreChange() {
  // 组件感知到store数据变化后更新数据
  this.setState(store.getState());
}
```

# 06.ActionType的拆分

在`./store`目录下创建actionTypes来存放action的命名

```javascript
// actionTypes.js
export const CHANGE_INPUT_VALUE = 'change_input_value';
export const ADD_TODO_ITEM = 'add_todo_item';
export const DELETE_TODO_ITEM = 'delete_todo_item';
```

之后将`actionTypes.js`中的变量分别导入`TodoList.js`和`ruducer.js`中，之后在定义`action`时，调用变量即可

```javascript
// reducer.js
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes'
```

# 07.使用ActionCreator统一创建action

我们按照 [组件中直接请求更改数据](###组件中直接请求更改数据) 的方法直接在业务逻辑中创建action会导致代码变得混乱，为了统一，我们将创建action的方法写入`./store/actionCreator`文件下，结合`actionTypes`统一创建action，然后再在业务逻辑中调用。

```javascript
// actionCreator.js
import { CHANGE_INPUT_VALUE } from './actionTypes'

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})
```

```javascript
// Todolist.js
import { getInputChangeAction } from './store/actionCreator'

... ...

handleInputChange(e) {
  const action = getInputChangeAction(e.target.value);
  store.dispatch(action)
}
```

# 09. 知识点补充

## 总流程
1. 在 `actionTypes.js` 中创建变量存放action的操作类型，并向外暴露出变量名，提供给 `actionCreator.js` 和 `reducer.js` 调用。
2. 在 `actionCreator.js` 中集中编写生成action对象，设置action对象的类型以及传入的数据名称，向外暴露该对象，供组件在业务逻辑代码部分调取使用。
3. 在 `reducer.js` 判断某个action的type，编写与之对应的数据操作，并返回给store。
4. 在组件业务逻辑代码中调用 `actionCreator.js` 提供的方法，生成一个action，并利用 `store.dispatch()` 向store发送一个action。

```
文件依赖关系:

actionTypes.js ──[actionType]── actionCreator.js ──[actionObj]── component.js
            |
            └────[actionType]── reducer.js
```

## 注意事项
1. store是唯一的
2. 只有store才能变更自己的内容
3. Reducer必须是纯函数：纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用


## 核心API
`createStore`: 创建store

`store.dispatch`: 派发action

`store.getState`: 获取store中的数据内容

`store.subscribe`: 订阅stote中的改变






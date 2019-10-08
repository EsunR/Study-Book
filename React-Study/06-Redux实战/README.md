- [01.UI组件与容器组件](#01ui%E7%BB%84%E4%BB%B6%E4%B8%8E%E5%AE%B9%E5%99%A8%E7%BB%84%E4%BB%B6)
- [02.无状态组件](#02%E6%97%A0%E7%8A%B6%E6%80%81%E7%BB%84%E4%BB%B6)
- [03.使用Redux-thunk中间件实现ajax数据请求](#03%E4%BD%BF%E7%94%A8redux-thunk%E4%B8%AD%E9%97%B4%E4%BB%B6%E5%AE%9E%E7%8E%B0ajax%E6%95%B0%E6%8D%AE%E8%AF%B7%E6%B1%82)
  - [使用Redux中间件Redux-thunk](#%E4%BD%BF%E7%94%A8redux%E4%B8%AD%E9%97%B4%E4%BB%B6redux-thunk)
- [04.使用Redux-saga中间件使用入门](#04%E4%BD%BF%E7%94%A8redux-saga%E4%B8%AD%E9%97%B4%E4%BB%B6%E4%BD%BF%E7%94%A8%E5%85%A5%E9%97%A8)
  - [初始化Redux-saga](#%E5%88%9D%E5%A7%8B%E5%8C%96redux-saga)
  - [在项目中使用Redux-saga](#%E5%9C%A8%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8redux-saga)
- [05.React-Redux的基本使用使用](#05react-redux%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8%E4%BD%BF%E7%94%A8)
  - [基本作用](#%E5%9F%BA%E6%9C%AC%E4%BD%9C%E7%94%A8)
  - [具体流程](#%E5%85%B7%E4%BD%93%E6%B5%81%E7%A8%8B)
# 01.UI组件与容器组件

UI组件负责页面渲染，容器组件负责页面逻辑

创建UI组件的核心思想就是把原组件中的`render`函数中的内容抽离出去为一个子组件，在父组件的`render`函数中只引入这个子组件。

如：我们把TodoList项目中的render部分抽离出去后，文件结构变为
```diff
  index.js
  TodoList.js
+ TodoListUI.js
  /store 
```

```javascript
// TodoList.js
import TodoListUI from './TodoListUI'
... ...
render(){
  return (
    <TodoListUI />
  )
}
```

```javascript
// TodoListUI.js
import { Button, List, Input } from 'antd';
... ...
render(){
  return (
    // JSX中的DOM树
  )
}
```

为了能使`TodoListUI.js`中的方法和数据正常使用，在`TodoList.js`中调用子组件的时候需要将子组件中可能用到的所有方法和数据都传入子组件，如：
```javascript
render() {
  return <TodoListUI
    inputValue={this.state.inputValue}
    list={this.state.list}
    handleInputChange={this.handleInputChange}
    handleButtonClick={this.handleButtonClick}
    handleItemDelete={this.handleItemDelete}
  />
}
```

# 02.无状态组件

当我们设计一个UI组件，如果这个组件只有render函数，可以将其转化为一个无状态组件，可以优化其性能，具体写法为使用一个变量存放一个函数，函数的参数为`props`，函数的返回值即为JSX的Virtual DOM内容。如下：

```javascript
import React from 'react'

const NoStatusComponent = (props) => {
  return (
    <div>Virtual DOM here</div>
  )
}

return NoStatusComponent
```

# 03.使用Redux-thunk中间件实现ajax数据请求

Redux-thunk可以让`actionCreator.js`中返回一个方法（默认actionCreator只能返回一个action对象），可以方便我们把异步操作抽离到`actionCreator.js`文件中。

## 使用Redux中间件Redux-thunk

1. 在创建store的文件中（如Demon中的`./store/index.js`），在引入Redux时，引入`applyMiddleware`组件
    ```diff
    import { 
      createStore, 
    + applyMiddleware 
    } from 'redux';
    + import thunk from 'redux-thunk'
    ```

2. 在调用`createStore()`创建store时，第一个参数填入`reducer`对象，第二个参数传入一个`applyMiddleware()`方法，~~这个方法的参数时一个数组，数组的内容即为要在store中使用的中间件列表（Redux DevTools实际也是一个中间件）~~。我们在此处调用`thunk`

    ```diff
    const store = createStore(
      reducer,
    + applyMiddleware(thunk)
    );
    ```

3. 如果在此时还需要使用Redux DevTools，需要按照 [官方文档](https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup) 进行如下设置

    ```diff
    // 方案一 (不推荐)
    import { 
      createStore, 
      applyMiddleware, 
    + compose 
    } from 'redux';
    import thunk from 'redux-thunk'

    + const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    + const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    - const store = createStore(reducer, /* preloadedState, */ compose(
        applyMiddleware(thunk)
      ));
    ```

    ```diff
    // 方案二（推荐）
      import { 
        createStore, 
        applyMiddleware, 
    +   compose 
      } from 'redux';
      import thunk from 'redux-thunk'

    + const composeEnhancers =
    +   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    +   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    + }) : compose;

    + const enhancer = composeEnhancers(
    +   applyMiddleware(thunk)
    + );

      const store = createStore(
        reducer,
    +   enhancer
      );
    ```

4. 将异步方法转入`actionCreator.js`中编写。

    我们在此模拟一个场景：当TodoList项目在页面加载后，需要发出AJAX请求来获取已有的TODO列表项，我们可以把这个AJAX请求放入`actionCreator.js`中，编写一个方法名为`getTodoList`。我们再这个方法中需要做三件事：
      1. 通过AJAX获取数据，并生成一个action对象。
      2. 将数据通过store的`dispatch()`方法，将生成的action对象传递给store，让其处理数据。
      3. 将方法暴露出去，提供给`TodoList.js`组件使用。

    ```javascript
    export const getTodoList = () => {
      return (dispatch) => {
        axios.get('https://www.easy-mock.com/mock/5cb48651462c851178e00ed0/study/todoList')
          .then(res => {
            const data = res.data;  // 获取数据
            const action = {
              type: INIT_LIST_ACTION,
              data: data
            };  // 生成action对象（要借助actionCreator已写好的方法）
            dispatch(action);  // 向store传递action对象
          })
      }
    }
    ```

    之后，我们在`TodoList.js`组件中引入该方法并且使用该方法
    ```javascript
    import { getTodoList } from './store/actionCreator.js'
    ... ...
    componentDidMount() {
      const action = getTodoList();
      store.dispatch(action);
    }
    ```
    在此，我们调用`getTodoList()`，返回值是一个方法，而并非一个action对象，即`action`变量现在是一个方法。
    
    当执行代码`store.dispatch(action)`时，redux-thunk将其进行了一个处理，当检测到传入`dispatch()`方法的参数是一个方法而并非一个对象时，会在此时执行传入的方法，并且在该方法(也就是`action`)的参数位上，传入store提供的`dispatch()`方法，这样在`action`方法执行时，`action`方法内部就可以直接使用`dispatch()`方法。
    
    这就是为什么我们再`actionCreator.js`编写`getTodoList()`方法时，可以直接调用`dispatch()`方法的原因。

    可以参考如下代码来理解redux-thunk在此处的操作（中间件操作原理）：
    ```javascript
    // 模拟原有的Store对象
    var Store = function () {
      // 挂载dispatch方法，只能处理对象
      this.dispatch = (obj) => {
        if (typeof obj === "object") {
          // 处理对象
          console.log(obj);
        } else {
          throw "arguments error";
        }
      }
    }
    ```

    ```javascript
    // 通过redux-thunk中间件封装后的Store对象
    var Store = function () {
      // 挂载dispatch方法，dispatch可以处理对象和函数
      this.dispatch = (obj) => {
        if (typeof obj === "function") {
          // 如果传入的是一个方法，就把该方法执行，并且向方法内部再传入dispatch方法本身
          obj(this.dispatch);
        } else if (typeof obj === "object") {
          // 如果传入的是一个对象，就直接处理对象
          console.log(obj);
        } else {
          throw "arguments error";
        }
      }
    }

    // 模拟在actionCreator.js中创建的方法
    var fun = function (dispatch) {
      let action = {
        type: "fun",
        msg: "dispatch carry by a function inner"
      }
      dispatch(action)
    }

    var store = new Store();
    // 向实例化的store对象中传入方法
    store.dispatch(fun)
    ```

    运行结果：
    ```
    { type: 'fun', msg: 'dispatch carry by a function inner' }
    ```
    原理图解：

    ![a71efaafly1g24hqz4xkvj20dg0dkgmk.jpg](http://img.cdn.esunr.xyz/markdown/a71efaafly1g24hqz4xkvj20dg0dkgmk.jpg)


# 04.使用Redux-saga中间件使用入门

## 初始化Redux-saga

1. 更改目录结构
    ```diff
    /store 
      reducer.js
      actionCreator.js
      actionTypes.js
      index.js
    + saga.js
    ```

2. 在`./store/index.js`导入Redux-saga中间件（同时保持与Redux DevTools的兼容）
    ```diff
      import { createStore, applyMiddleware, compose } from 'redux'
      import reducer from './reducer'
    + import createSagaMiddleware from 'redux-saga'
    + import TodoSagas from './saga.js'

    + const sagaMiddleware = createSagaMiddleware()

      const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          }) : compose;

      const enhancer = composeEnhancers(
    +   applyMiddleware(sagaMiddleware)
      );

      const store = createStore(
        reducer,
        enhancer
      );

    + sagaMiddleware.run(TodoSagas)

      export default store;
    ```

3. 在`sagas.js`中创建一个初始化的Generator函数
    ```javascript
    import { takeEvery } from 'redux-saga/effects'
    function* mySaga() {
      ... ...
    }
    export default mySaga;
    ```

## 在项目中使用Redux-saga

我们还借用之前的例子，当TodoList项目在页面加载后，需要发出AJAX请求来获取已有的TODO列表项。

我们先来讲解一下Redux-saga的原理：它会检查Store派发给Reducer的每个action，如果这个action代表的操作是期望执行一个异步函数，那么Redux-saga就会捕获这action，拿到`sagas.js`文件的业务代码中处理，进行一系列的异步操作，最后再生成一个action，交付给Reducer。

![a71efaafly1g24leszo7yj20tu0e2q3v.jpg](http://img.cdn.esunr.xyz/markdown/a71efaafly1g24leszo7yj20tu0e2q3v.jpg)

接下来进行一个列子的详细流程：

1. 在 `actionTypes.js` 中创建一个actionType并导出，提供一个action的类型名
    ```javascript
    export const GET_INIT_LIST = 'get_init_list'
    ```

2. 在 `actionCreator.js` 中创建 `getInitList` 方法并导出，提供一个生成action对象的方法
    ```javascript
    export const getInitList = () => ({
      type: GET_INIT_LIST
    })
    ```
3. 在 `TodoList.js` 组件中调用 `getInitList` 方法生成一个action对象，提供给Redux-saga劫持
    ```diff
    + import { getInitList } from './store/actionCreator'
    ... ...
    componentDidMount() {
    + const action = getInitList();
      store.dispatch(action);
    - axios.get('https://www.easy-mock.com/mock/5cb48651462c851178e00ed0/study/todoList')
    -   .then(res => {
    -     const data = res.data;
    -     const action = initListAction(data);
    -     store.dispatch(action);
    -   })
    }
    ```

4. 编写 `saga.js` 劫持 `type: 'get_init_list'` 的action，并进行异步操作，最终返回一个新的action交付给Reducer。
    ```javascript
    import { takeEvery, put } from 'redux-saga/effects' // 导入put方法
    import axios from 'axios'
    import { GET_INIT_LIST } from './actionTypes'
    import { initListAction } from './actionCreator'

    function* getInitList() {
      const res = yield axios.get('https://www.easy-mock.com/mock/5cb48651462c851178e00ed0/study/todoList');
      const action = initListAction(res.data);
      yield put(action); // Redux-saga使用put()方法来代替store.dispatch()方法
    }

    function* mySaga() {
      yield takeEvery(GET_INIT_LIST, getInitList);  // 如果action的type为GET_INIT_LIST，就劫持这个action，并执行getInitList()方法
    }

    export default mySaga;
    ```

# 05.React-Redux的基本使用使用

## 基本作用
React-Redux优化了组件中对store的调用方式，在传统的组件中，如果想要调用store则需要引入store并让store与当前组件的state做关联。而React-Redux，提供了一个 `<Provider></Provider>` 容器组件，可以将store作为容器组件的props传入组件，这样在 `<Provider>` 容器组件中的其他组件就可以获取store，而不需要重复调用。

使用React-Redux基本步骤为：
1. 在项目的index.js中（或其他组件中也可以）设置`<Provider>`容器
2. 在`<Provider>`容器的组件代码中，设置store与该组件props的映射关系，以及映射相关的disoatch操作到组件props中。
3. 连接组件与state

## 具体流程

文件目录：
```
/src
+- index.js
+- TodoList.js
+- store
   +- index.js
   +- reducer.js
```

1. `index.js` 中引入store和react-redux，并设置`<Provider>`容器组件：
    ```diff
    // index.js

      import React from 'react';
    + import ReactDOM from 'react-dom';
    + import store from './store'

      import TodoList from './06-3.React-Redux/TodoList'
    + import { Provider } from 'react-redux'

    + const App = (
    +   <Provider store={store}>
          <TodoList></TodoList>
    +   </Provider>
    + )

    - ReactDOM.render(<App />, document.getElementById('root'));
    + ReactDOM.render(App, document.getElementById('root'));
    ```
2. 在`TodoList.js`组件中配置关于store和dispatch方法的映射：
    
    首先要引入react-redux的connect方法，`connect()`方法用来建设映射关系，它包含两个参数，第一个参数为映射的state相关设置，第二个为映射的dispatch相关设置，设置好之后，就可以将store的数据和有关于dispatch的操作挂载到组件的props属性中。
    ```javascript
    // TodoList.js

    import React, { Component } from 'react'
    import { connect } from 'react-redux'
    ... ...
    class TodoList extends Component {
      ... ...
    }
    // 映射store中的数据到组件中的props
    const mapStateToProps = (store) => {
      return {
        // 把store中inputValue的值映射到组件的props中
        inputValue: store.inputValue
      }
    }
    // 将有关于dispatch操作相关的方法传入props中
    const mapDispatchToProps = (dispatch) => {
      return {
        handelInputChange(e) {
          const action = {
            type: 'change_input_value',
            value: e.target.value
          }
          dispatch(action)
        }
      }
    }
    // 核心API：connect 如果不需要connect()中的某个参数，则填写为null
    export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
    ```
    当我们在组件内部使用传入的store的值时，可以直接调用组件的props属性，如当我们要取出刚才挂载到props上的
    ```html
    <input value={this.props.inputValue} onChange= {this.props.handelInputChange} />
    ```
3. 在`reducer.js`中编写处理store数据的业务逻辑


import React from 'react';
import ReactDOM from 'react-dom';

// 使用react-redux
import { Provider } from 'react-redux'
import TodoList from './06-3.React-Redux/TodoList'
import store from './06-3.React-Redux/store'

// import App from './02-03.TodoList/TodoList(优化)'
// import App from './04.Animate/Animate'
// import App from './05.AntDesign&Redux/TodoList'
// import App from './06-1.Redux-thunk/TodoList'
// import App from './06-2.Redux-saga/TodoList'


const App = (
  // 核心API：Provider将store提供给Provider组件内部的所有组件
  <Provider store={store}>
    <TodoList></TodoList>
  </Provider>
)


ReactDOM.render(App, document.getElementById('root'));


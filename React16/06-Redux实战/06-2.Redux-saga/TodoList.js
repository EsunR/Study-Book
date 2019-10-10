import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction, getInitList } from './store/actionCreator'
import TodoListUI from './TodoListUI'
import store from './store';


class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState()

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)

    // 订阅store的改变
    this.handleStoreChange = this.handleStoreChange.bind(this)
    store.subscribe(this.handleStoreChange)

  }

  render() {
    return <TodoListUI
      inputValue={this.state.inputValue}
      list={this.state.list}
      handleInputChange={this.handleInputChange}
      handleButtonClick={this.handleButtonClick}
      handleItemDelete={this.handleItemDelete}
    />
  }

  componentDidMount() {
    const action = getInitList();
    store.dispatch(action);
    // axios.get('https://www.easy-mock.com/mock/5cb48651462c851178e00ed0/study/todoList')
    //   .then(res => {
    //     const data = res.data;
    //     const action = initListAction(data);
    //     store.dispatch(action);
    //   })
  }

  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value);
    store.dispatch(action)
  }

  handleStoreChange() {
    // 组件感知到store数据变化
    this.setState(store.getState());
  }

  handleButtonClick() {
    // 空值校验
    if (this.state.inputValue === "") {
      return
    }
    const action = getAddItemAction();
    store.dispatch(action)
  }

  handleItemDelete(index) {
    const action = getDeleteItemAction(index);
    store.dispatch(action)
  }

}

export default TodoList;
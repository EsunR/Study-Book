import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Button, List, Input } from 'antd';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreator'


import store from './store';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState()

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)

    // 订阅store的改变
    this.handleStoreChange = this.handleStoreChange.bind(this)
    store.subscribe(this.handleStoreChange)

  }

  render() {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "20px"
      }}>
        <div>
          <Input
            placeholder="Basic usage"
            style={{ width: '300px', marginRight: '10px' }}
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <Button type="primary" onClick={this.handleButtonClick}>提交</Button>
          <List
            bordered
            dataSource={this.state.list}
            renderItem={
              (item, index) => (<List.Item onClick={this.handleItemDelete.bind(this, index)}>{item}</List.Item>)}
            style={{
              marginTop: "20px"
            }}
          />
        </div>
      </div>
    )
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
    // const action = {
    //   type: DELETE_TODO_ITEM,
    //   value: index
    // }
    const action = getDeleteItemAction(index);
    store.dispatch(action)
  }

}

export default TodoList;
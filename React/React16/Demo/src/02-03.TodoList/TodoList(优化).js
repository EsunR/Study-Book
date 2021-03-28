import React, { Component, Fragment } from 'react'
import './style.css'
import TodoItem from './TodoItem'

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 'hellow',
      list: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  render() {
    return (
      <Fragment>
        <div>
          <label htmlFor="insertArea"></label>
          <input
            id="insertArea"
            className="input"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleButtonClick}>提交</button>
        </div>
        <ul> {this.getList()} </ul>
      </Fragment>
    )
  }

  getList() {
    return (
      this.state.list.map((item, index) => {
        return (
          <TodoItem
            content={item}
            index={index}
            deleteItem={this.handleDelete}
            key={index}
          />
        )
      })
    )
  }

  handleInputChange(e) {
    const value = e.target.value;
    this.setState(() => ({
      inputValue: value
    }))
    // this.setState({
    //   inputValue: e.target.value
    // })
  }

  handleButtonClick(e) {
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ""
    }))
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ""
    // })
  }

  handleDelete(index) {
    // const list = [...this.state.list];
    // list.splice(index, 1);
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return { list }
    })
    // this.setState({
    //   list: list
    // })
  }
}

export default TodoList;
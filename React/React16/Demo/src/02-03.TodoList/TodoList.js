import React, { Component, Fragment } from 'react'
import './style.css'
import TodoItem from './TodoItem'

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 'hellow',
      list: []
    }
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
            onChange={this.handleInputChange.bind(this)}
          />
          <button onClick={this.handleButtonClick.bind(this)}>提交</button>
        </div>
        <ul>
          {
            this.state.list.map((item, index) => {
              return (
                <div>
                  <TodoItem 
                  content={item} 
                  index={index}
                  deleteItem = {this.handleDelete.bind(this)}
                  />
                  {/* <li
                    key={index}
                    onClick={this.handleDelete.bind(this, index)}
                    dangerouslySetInnerHTML={{ __html: item }}
                  >
                  </li> */}
                </div>
              )

            })
          }
        </ul>
      </Fragment>
    )
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleButtonClick(e) {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ""
    })
  }

  handleDelete(index) {
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState({
      list: list
    })
  }
}

export default TodoList;
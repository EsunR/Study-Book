import React from 'react'
import { Button, List, Input } from 'antd';

const TodoListUI = (props) => {
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
          value={props.inputValue}
          onChange={props.handleInputChange}
        />
        <Button type="primary" onClick={props.handleButtonClick}>提交</Button>
        <List
          bordered
          dataSource={props.list}
          renderItem={
            (item, index) => (
              < List.Item
                onClick={() => {
                  props.handleItemDelete(index)
                }}
              >{item}</List.Item>
            )
          }
          style={{
            marginTop: "20px"
          }}
        />
      </div>
    </div>
  )
}

/*
class TodoListUI extends Component {
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
            value={this.props.inputValue}
            onChange={this.props.handleInputChange}
          />
          <Button type="primary" onClick={this.props.handleButtonClick}>提交</Button>
          <List
            bordered
            dataSource={this.props.list}
            renderItem={
              (item, index) => (
                < List.Item
                  onClick={() => {
                    this.props.handleItemDelete(index)
                  }}
                >{item}</List.Item>
              )
            }
            style={{
              marginTop: "20px"
            }}
          />
        </div>
      </div>
    )
  }
}
*/
export default TodoListUI
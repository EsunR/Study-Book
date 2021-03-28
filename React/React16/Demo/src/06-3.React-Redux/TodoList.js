import React from 'react'
import { connect } from 'react-redux'

const TodoList = (props) => {
  const { inputValue, list, handelInputChange, handelClick, handelDelete } = props
  return (
    <div>
      <input
        value={inputValue}
        onChange={handelInputChange}
      />
      <button onClick={handelClick}>提交</button>
      <ul>
        {
          list.map((item, index) => {
            return <li onClick={() => { handelDelete(index) }} key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
}

// 映射store中的数据到组件中的props
const mapStateToProps = (store) => {
  return {
    // 把store中inputValue的值映射到state
    inputValue: store.inputValue,
    list: store.list
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
    },
    handelClick() {
      const action = {
        type: "add_item"
      }
      dispatch(action);
    },
    handelDelete(index) {
      const action = {
        type: "delete_item",
        index
      }
      dispatch(action);
    }
  }
}

// 核心API：connect 让TodoList组件与store进行连接，连接规则为mapStateToProps，
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
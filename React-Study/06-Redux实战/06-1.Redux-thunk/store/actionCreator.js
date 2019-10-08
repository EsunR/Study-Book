import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes'
import axios from 'axios'

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})

export const getAddItemAction = () => ({
  type: ADD_TODO_ITEM
})

export const getDeleteItemAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
})

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
})

export const getTodoList = () => {
  return (dispatch) => {
    console.log(dispatch.__proto__);
    axios.get('https://www.easy-mock.com/mock/5cb48651462c851178e00ed0/study/todoList')
      .then(res => {
        const data = res.data;
        const action = initListAction(data);
        dispatch(action);
      })
  }
}
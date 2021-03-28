import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'
import { GET_INIT_LIST } from './actionTypes'
import { initListAction } from './actionCreator'

function* getInitList() {
  try {
    const res = yield axios.get('https://www.easy-mock.com/mock/5cb48651462c851178e00ed0/study/todoList');
    const action = initListAction(res.data);
    yield put(action);
  }catch(e) {
    console.log('网络请求失败');
  }
}

// generator 函数
function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getInitList);
}

export default mySaga;

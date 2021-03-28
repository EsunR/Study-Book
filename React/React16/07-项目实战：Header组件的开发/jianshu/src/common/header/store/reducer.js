import { constants } from './index'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  focused: false,
  mouseIn: false,
  list: [],
  page: 1,
  totalPage: 1
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SEARCH_FOCUE:
      return state.set('focused', true);
    case constants.SEARCH_BLUR:
      return state.set('focused', false);
    case constants.CHANGE_LIST:
      // merge可以同时修改多个数据
      return state.merge({
        list: action.data,
        totalPage: action.totalPage
      })
    case constants.MOUSE_ENTER:
      return state.set('mouseIn', true);
    case constants.MOUSE_LEAVE:
      return state.set('mouseIn', false);
    case constants.CHANGE_PAGE:
      return state.set('page', action.page);
    default:
      return state;
  }


  // if (action.type === constants.SEARCH_FOCUE) {
  //   // return {
  //   //   focused: true
  //   // }
  //   return state.set('focused', true);
  // }
  // if (action.type === constants.SEARCH_BLUR) {
  //   return state.set('focused', false);
  // }
  // if (action.type === constants.CHANGE_LIST) {
  //   // fromJS 会将 list 数组对象也改变为 immutable 对象，如果这时候将从 Ajax 获取的数据传入 list，则改变了 list 的数据类型（由immutable类型转变为普通数组类型），这是非法的，所以会出错。
  //   // 解决方法就是将 action.data 转化为 immutable 对象处理（在actionCreators.js中进行转化）
  //   return state.set('list', action.data);
  // }
  // return state;
}


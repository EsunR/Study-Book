import * as constans from './constants'
import { fromJS } from 'immutable';
import axios from 'axios'

const changeList = (data) => ({
  type: constans.CHANGE_LIST,
  data: fromJS(data),
  totalPage: Math.ceil(data.length / 10)
})

export const searchFocus = () => ({
  type: constans.SEARCH_FOCUE
})

export const searchBlur = () => ({
  type: constans.SEARCH_BLUR
})

export const getList = () => {
  return (dispatch) => {
    axios.get('/api/headerList.json').then(res => {
      const data = res.data;
      dispatch(changeList(data.data));
    }).catch(() => {
      console.log('error');
    })
  }
};

export const mouseEnter = () => ({
  type: constans.MOUSE_ENTER
});

export const mouseLeave = () => ({
  type: constans.MOUSE_LEAVE
})

export const changePage = (page) => ({
  type: constans.CHANGE_PAGE,
  page
})
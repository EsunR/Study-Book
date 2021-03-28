import axios from 'axios'
import { constants } from './index'
import { fromJS } from 'immutable'


const changeHomeData = (result) => ({
  type: constants.CHANGE_HOME_DATA,
  topicList: result.topicList,
  articleList: result.articleList,
  recommendList: result.recommendList
})

const addHomeList = (list, nextPage) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: fromJS(list),
  nextPage: fromJS(nextPage)
})

export const getHomeInfo = () => {
  return (dispatch) => {
    axios.get('/api/home.json').then((res) => {
      const result = res.data.data;
      dispatch(changeHomeData(result));
    })
  }
}

export const getMoreList = (page) => {
  return (dispatch) => {
    axios.get('/api/homeList.json?page=' + page).then((res) => {
      const result = res.data.data;
      dispatch(addHomeList(result, page + 1));
    })
  }
}

export const toggleTopShow = (flag) => ({
  type: constants.TOGGLE_SCROLL_SHOW,
  show: flag
})
import axios from 'axios'
import { constants } from './index'

const changeDetail = (title, content) => ({
  type: constants.CHANGE_DETAIL,
  title,
  content
})

export const getDetail = (id) => {
  return (dispatch) => {
    axios.get('/api/detail.json?id=' + id).then(res => {
      const detail = res.data.data;
      dispatch(changeDetail(detail.title, detail.content));
    })
  }
}
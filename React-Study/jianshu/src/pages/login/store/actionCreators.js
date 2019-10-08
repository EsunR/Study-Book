import { constants } from './index'
import axios from 'axios'

const changeLogin = () => ({
  type: constants.CHANGE_LOGIN,
  value: true
})

export const logout = () => ({
  type: constants.CHANGE_LOGIN,
  value: false
})

export const login = (account, password) => {
  return (dispatch) => {
    axios.get(`/api/login.json?account=${account}&password=${password}`).then(res => {
      if (res.data.data) {
        dispatch(changeLogin());
      } else {
        alert('登录失败');
      }
    }).catch((err) => {
      alert(err);
    })
  }
}


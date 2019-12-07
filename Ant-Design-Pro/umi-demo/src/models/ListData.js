import request from '../utils/request';

export default {
  namespace: 'list',
  state: {
    listData: [],
    maxNum: 0,
    neverChange: 'I have never changed!',
  },
  reducers: {
    addNewData(state, action) {
      if (action.payload) {
        const newState = JSON.parse(JSON.stringify(state));
        return Object.assign(newState, action.payload);
      }
      let maxNum = state.maxNum + 1;
      let newArr = [...state.listData, maxNum];
      const newState = JSON.parse(JSON.stringify(state));
      newState.maxNum = maxNum;
      newState.listData = newArr;
      return newState;
    },
  },
  effects: {
    *fetchData(action, { call, put }) {
      const data = yield call(request, '/api/list', { method: 'GET' });
      yield put({
        type: 'addNewData',
        payload: data,
      });
    },
  },
};

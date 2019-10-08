import { createStore } from 'redux';
import reducer from './reducer'

const store = createStore(
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store接受到新数据后，会将旧的数据替换为新的数据

export default store;
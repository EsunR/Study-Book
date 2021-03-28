import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Header from './common/header'
import { GlobalStyle } from './statics/icon-font/iconfont'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GlobalStyle></GlobalStyle>
        <Header></Header>
      </Provider>
    );
  }
}

export default App;
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Header from './common/header'
import { GlobalStyle } from './statics/icon-font/iconfont'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/home';
import Detail from './pages/detail/loadable';
import Login from './pages/login'
import Write from './pages/write'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <GlobalStyle></GlobalStyle>
          <BrowserRouter>
            <div>
              <Header></Header>
              <Route path='/login' exact component={Login}></Route>
              <Route path='/' exact component={Home}></Route>
              <Route path='/write' exect component={Write}></Route>
              <Route path='/detail/:id' exact component={Detail}></Route>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
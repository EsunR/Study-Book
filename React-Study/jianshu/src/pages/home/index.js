import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Topic from './components/Topic'
import List from './components/List'
import Recomment from './components/Recomment'
import Writter from './components/Writter'
import { actionCreators } from './store'
import { BackTop } from './style'

import {
  HomeWrapper,
  HomeLeft,
  HomeRight
} from './style'

class Home extends PureComponent {

  handelScrollTop() {
    // window.scrollTo(0, 0);
    let timmer = setInterval(() => {
      let y = document.documentElement.scrollTop;
      if (y !== 0) {
        window.scrollTo(0, y - 50);
      } else {
        clearInterval(timmer)
      }
    }, 10);
  }
  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollTopShow);
  }

  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img className="banner-img" src="//upload.jianshu.io/admin_banners/web_images/4592/22f5cfa984d47eaf3def6a48510cc87c157bf293.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="" />
          <Topic></Topic>
          <List></List>
        </HomeLeft>
        <HomeRight>
          <Recomment></Recomment>
          <Writter></Writter>
        </HomeRight>
        {this.props.showScroll ? <BackTop onClick={this.handelScrollTop}>顶部</BackTop> : null}

      </HomeWrapper>
    )
  }

  componentDidMount() {
    this.props.changeHomeData();
    this.bindEvents();
  }

  componentWillUnmount() {
    // 在组件被销毁时，取消对窗口的事件绑定
    window.removeEventListener('scroll', this.props.changeScrollTopShow);
  }

}

const mapState = (state) => ({
  showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatch = (dispatch) => ({
  changeHomeData() {
    const action = actionCreators.getHomeInfo();
    dispatch(action);
  },
  changeScrollTopShow() {
    if (document.documentElement.scrollTop > 400) {
      dispatch(actionCreators.toggleTopShow(true));
    } else {
      dispatch(actionCreators.toggleTopShow(false));
    }
  }
})

export default connect(mapState, mapDispatch)(Home);
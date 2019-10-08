import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { actionCreators as loginActionCreator } from '../../pages/login/store'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  SearchInfoList
} from './style'

class Header extends Component {
  getListArea() {

    const { focused, list, page, totalPage, handleMouseEnter, handleMouseLeave, mouseIn, handlePageChange } = this.props;
    const newList = list.toJS(); // 因为list是immutable类型的数据，要转化成js类型的数组才能使用
    const pageList = [];

    if (newList.length) {
      // i为数据起始位置
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        if (newList[i]) {
          pageList.push(
            <SearchInfoItem key={i}>{newList[i]}</SearchInfoItem>
          )
        }
      }
    }

    if (focused || mouseIn) {
      return (
        <SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SearchInfoTitle>
            热门搜索
              <SearchInfoSwitch onClick={() => handlePageChange(page, totalPage, this.spinIcon)}>
              <i ref={(icon) => { this.spinIcon = icon }} className="iconfont spin">&#xe606;</i> 换一批
              </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {pageList}
          </SearchInfoList>
        </SearchInfo>
      )
    }

  }

  render() {
    const { focused, list, handleInputFocus, handleInputBlur, login } = this.props
    return (
      <HeaderWrapper>
        <Link to="/">
          <Logo />
        </Link>

        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载APP</NavItem>

          <SearchWrapper>
            <CSSTransition
              in={focused}
              timeout={200}
              classNames="slide"
            >
              <NavSearch
                className={focused ? 'focused' : ''}
                onFocus={() => handleInputFocus(list)}
                onBlur={handleInputBlur}
              ></NavSearch>
            </CSSTransition>
            <i
              className={focused ? 'focused iconfont zoom' : 'iconfont zoom'
              }>&#xe6cf;</i>
            {this.getListArea()}
          </SearchWrapper>


          {
            login ?
              <NavItem className="right" onClick={this.props.logout}>退出</NavItem>
              :
              <Link to="/login">
                <NavItem className="right">登录</NavItem>
              </Link>
          }

          <NavItem className="right">
            <span className="iconfont">&#xe636;</span>
          </NavItem>

        </Nav>

        <Addition>
          <Link to="/write">
            <Button className="writting">
              <span className="iconfont">&#xe615;</span>
              写文章
            </Button>
          </Link>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper >
    )
  }
}



const mapStateToProps = (state) => {
  return {
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    totalPage: state.getIn(['header', 'totalPage']),
    login: state.getIn(['login', 'login'])
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      list.size === 0 && dispatch(actionCreators.getList())

      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },
    handlePageChange(page, totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
      console.log(originAngle);
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        originAngle = 0;
      }
      spin.style.transform = `rotate(${originAngle + 360}deg)`;
      if (page < totalPage) {
        dispatch(actionCreators.changePage(page + 1))
      } else {
        dispatch(actionCreators.changePage(1))
      }
    },
    logout() {
      dispatch(loginActionCreator.logout())
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Header);

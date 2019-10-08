import styled from '../../../node_modules/styled-components';
import logoPic from '../../statics/logo.png'

export const HeaderWrapper = styled.div`
  height: 58px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  z-index: 1;
`
export const Logo = styled.div`
  display: block;
  height: 58px;
  width: 100px;
  background: pink;
  position: absolute;
  top: 0;
  left: 0;
  background: url(${logoPic});
  background-size: contain;
`

export const Nav = styled.div`
  width: 960px;
  margin: 0 auto;
  height: 100%;
  padding-right: 70px;
  box-sizing: border-box;
`

export const NavItem = styled.div`
  line-height: 56px;
  padding: 0 15px;
  font-size: 17px;
  color: #333;
  &.left{
    float: left;
  }
  &.right{
    float: right;
    color: #969696;
  }
  &.active{
    color: #ea6f5a;
  }
`

export const SearchWrapper = styled.div`
  position: relative;
  float: left;
  .zoom {
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 100%;
    cursor: pointer;
    &.focused{
      background-color: #777;
      color: #fff;
    }
  }
`

export const NavSearch = styled.input.attrs({
  placeholder: '搜索'
})`
  width: 160px;
  height: 38px;
  margin-top: 9px;
  margin-left: 20px;
  padding: 0 30px 0 20px;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-radius: 19px;
  background: #eee;
  font-size: 14px;
  color: #666;
  &::placeholder{
    color: #999;
  }
  &.focused{
    width: 240px;
  }
  &.slide-enter{
    transition: all .2s ease-out;
  }
  &.slide-enter-active{
    width: 240px;
  }
  &.slide-exit{
    transition: all .2s ease-out;
  }
  &.slide-exit-active{
    width: 160px;
  }
`


export const SearchInfo = styled.div`
  position: absolute;
  left: 0;
  top: 56px;
  width: 240px;
  padding: 0 20px;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  background-color: #fff;
`

export const SearchInfoTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  line-height: 20px;
  font-size: 14px;
  color: #969696;
`
export const SearchInfoSwitch = styled.div`
  float: right;
  font-size: 12px;
  cursor: pointer;
  .spin{
    display: block;
    float: left;
    font-size: 14px;
    margin-right: 5px;
    transition: all .3s ease-in;
    transform-origin: center;
  }
`

export const SearchInfoList = styled.div`
  overflow: hidden;
  margin-bottom: 20px;
`

export const SearchInfoItem = styled.a`
  display: block;
  float: left;
  font-size: 12px;
  padding: 0 5px;
  line-height: 20px;
  border: 1px solid #ddd;
  color: #787878;
  border-radius: 3px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`



export const Addition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 56px;
`

export const Button = styled.div`
  float: right;
  margin-top: 9px;
  line-height: 38px;
  border-radius: 19px;
  border: solid 1px #ec6149;
  margin-right: 20px;
  padding: 0 20px;
  &.reg {
    color: #ec6149;
  }
  &.writting{
    color: #fff;
    background: #ec6149;
  }
`


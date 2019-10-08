import styled from 'styled-components'

export const LoginWrapper = styled.div`
  z-index: 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 56px;
  background: #eee;
`

export const LoginBox = styled.div`
  width: 400px;
  height: 180px;
  margin: 80px auto;
  background: #fff;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
  padding-top: 30px;
`

export const Input = styled.input`
  display: block;
  width: 200px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin: 10px auto;
  background: #fff;
  color: #777;
`

export const Button = styled.div`
  width: 200px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin: 10px auto;
  background: #3194d0;
  color: #fff;
  border-radius: 15px;
  text-align: center;
`
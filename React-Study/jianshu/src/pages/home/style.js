import styled from 'styled-components'

// 主样式

export const HomeWrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  overflow: hidden;
`

export const HomeLeft = styled.div`
  float: left;
  margin-left: 15px;
  margin-top: 30px;
  width: 625px;
  .banner-img{
    width: 625px;
    height: 240px;
  }
`

export const HomeRight = styled.div`
  width: 280px;
  float: right;
`

export const BackTop = styled.div`
  position: fixed;
  right: 100px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border: 1px solid #ccc;
  font-size: 14px;
`

// 左侧话题

export const TopicWrapper = styled.div`
  padding: 20px 0 10px 0;
  overflow: hidden;
  margin-left: -18px;
  border-bottom: 1px solid #dcdcdc;
`

export const TopicItem = styled.div`
  float: left;
  background-color: #f7f7f7;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #000;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  overflow: hidden;
  padding-right: 10px;
  margin-left: 18px;
  margin-bottom: 18px;
  .topic-pic{
    width: 32px;
    height: 32px;
    display: block;
    float: left;
    margin-right: 10px;
  }
`

// 左侧文章列表

export const ListItem = styled.div`
 padding: 20px 0;
 border-bottom: 1px solid #dcdcdc;
 overflow: hidden;
 .pic{
   width: 125px;
   height: 100px;
   display: block;
   float: right;
   border-radius: 10px;
 }
`

export const ListInfo = styled.div`
  width: 500px;
  float: left;
  .title{
    font-size: 18px;
    line-height: 27px;
    font-weight: bold;
    color: #333;
    margin: 0;  
  }
  .desc{
    line-height: 18px;
    font-size: 13px;
    color: #999;
  }
`

// 右侧板块

export const RecommentWrapper = styled.div`
  margin: 30px 0;
  width: 280px;
`

export const RecommentItem = styled.div`
 width: 280px;
 height: 50px; 
 background: url(${(props) => props.imgUrl});
 background-size: contain;
 margin-bottom: 10px;
`

export const LoadMore = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #a5a5a5;
  text-align: center;
  border-radius: 20px;
  margin: 30px 0;
  color: #fff;
`
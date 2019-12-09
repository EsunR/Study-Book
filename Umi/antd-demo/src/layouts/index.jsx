import React from 'react';
import style from './index.less';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class BasicLayout extends React.Component {
  render() {
    return (
      <Layout id={style.layout}>
        <Sider id={style.sider}>Sider</Sider>
        <Layout>
          <Header id={style.header}>Header</Header>
          <Content id={style.content}>{this.props.children}</Content>
          <Footer id={style.footer}>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;

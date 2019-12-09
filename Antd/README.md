# 1. Ant Design

## 1.1 安装

使用 umi 快速创建 antd 项目框架（前提已安装 umi）：

```sh
# 创建 umi 框架
yarn create umi

# 类型选择 app
> app

# 使用 antd 与 dva
> antd(*)
> dva(*)

# 安装依赖
yarn
```

## 1.2 搭建布局

> umi 默认使用 js 格式，用户可以使用 jsx，但是需要在 `.umirc.js` 文件下，将自动生成的路由文件名改为 `.jsx` 后缀。

在创建好的 umi 项目中，打开 `/src/layout/`  目录，修改 `index.jsx`：

```jsx
// /src/layout/index.jsx
import React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class BasicLayout extends React.Component {
  render() {
    return (
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
```

![生成布局](https://i.loli.net/2019/12/08/QtnPiYGwv9hTUx1.png)

按照 umi 规范，Content 部分生成的页面在 layout 文件中可以用 `this.props.children` 来调用：

```diff
- <Content>Content</Content>
+ <Content>{ this.props.children }</Content>
```

如果要是想要手动配置路由，可以在 `.umirc.js` 中的 `router` 选项中进行配置。


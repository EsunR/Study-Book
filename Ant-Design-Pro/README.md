# 1. UMI

## 1.1 快速使用

安装 umi：

```sh
yarn add global umi
```

快速创建一个项目：


```sh
mkdir umi-demo && cd umi-demo
yarn create umi
yarn # 安装依赖
```

运行：

```
yarn start
```

## 1.2 文件约定

umi 会在每次构建时根据文件规范自动生成路由，文件约定如下：

```
.
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── config/
    ├── config.js                  // umi 配置，同 .umirc.js，二选一
└── src/                           // 源码目录，可选
    ├── layouts/index.js           // 全局布局
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── document.ejs           // HTML 模板
        ├── 404.js                 // 404 页面
        ├── page1.js               // 页面 1，任意命名，导出 react 组件
        ├── page1.test.js          // 用例文件，umi test 会匹配所有 .test.js 和 .e2e.js 结尾的文件
        └── page2.js               // 页面 2，任意命名
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── global.js                  // 可以在这里加入 polyfill
    ├── app.js                     // 运行时配置文件
├── .umirc.js                      // umi 配置，同 config/config.js，二选一
├── .env                           // 环境变量
└── package.json
```



## 1.3 路由

umi 的核心在于组织路由，只要创建的文件符合规范就可以自动生成路由。

详情请查询 [官方文档](https://umijs.org/zh/guide/router.html#%E7%BA%A6%E5%AE%9A%E5%BC%8F%E8%B7%AF%E7%94%B1)

首先要创建应用的基础样式，文件存放于 `/src/layouts` 路径下：

```js
// 引入 css module
import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      {props.children} {/*插入子路由*/}
    </div>
  );
}

export default BasicLayout;
```

单个页面的样式可以在 `/src/pages` 下创建，如我们想要访问 `http://yourwebsite.com/list` 就在 `pages` 文件夹下创建一个 `list` 目录，以及一个 `index.js` 文件：

```js
// index.js
export default function() {
  return <div>list</div>;
}
```

页面之间的跳转可以引入 `Link` 声明式路由组件：

```js
import Link from 'umi/link';

export default () => (
  <Link to="/list">Go to list page</Link>
);
```

同时还可以引入 `router` 方法来进行命令式导航：

```js
import router from 'umi/router';
import styles from './index.css';

function backHome() {
  router.push('/');
}

export default function() {
  return (
    <button className={styles.btn} onClick={backHome}>
      List
    </button>
  );
}

```

# 2. DVA

## 2.1 开启 DVA

![数据分层的概念](http://img.cdn.esunr.xyz/markdown/20191206184557.png)

dva 是基于 redux redux-saga 和 react-router 的轻量级前端框架。

umi 对 dva 进行了整合，可以直接在配置文件 `config.js` 设置引入：

```js
export default {
  plugins: [
    ['umi-plugin-react', {
      dva: true
    }]
  ]
}
```

## 2.2 创建 Model

按照规范，我们应该在 `/src/models` 下创建 Model 层的数据，每个数据层单独存放在一个 `.js` 文件下，并拥有一个独立的 namespace 进行区分，如：

```js
export default {
  namespace: 'list',
  state: {
    data: [1, 2, 3],
    maxNum: 3, 
  },
};
```

## 2.3 连接 Model 到组件中

有了 Model 层的数据之后，我们就不需要在组件内使用 state 来存放数据。调用 Model 层的数据首先需要从 `dva` 引入 `content` 装饰器：

```js
import { connect } from 'dva';
```

之后按照命名空间，来讲数据作为组件的 `props` 传入组件：

```js
@connect(state => {
  return {
    data: state[namespace].data,
    maxNum: state[namespace].maxNum,
  };
})
class List extends React.Component {
  // ... ...
}
```

在组件内对数据进行调用：

```js
console.log(this.props.data);
```


# 1. UMI

> umi 可以简单地理解为 roadhog + 路由，思路类似 next.js/nuxt.js，辅以一套插件机制，目的是通过框架的方式简化 React 开发

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

> dva 目前是纯粹的数据流，和 umi 以及 roadhog 之间并没有相互的依赖关系，可以分开使用也可以一起使用

![Dva 中的数据流](http://img.cdn.esunr.xyz/markdown/20191207152816.png)

## 2.1 开启 DVA

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

## 2.2 创建 Model 层 （State）

> dva 通过 model 的概念把一个领域的模型管理起来，包含同步更新 state 的 reducers，处理异步逻辑的 effects，订阅数据源的 subscriptions 。

![数据分层的概念](http://img.cdn.esunr.xyz/markdown/20191206184557.png)

按照 UMI 规范，我们应该在 `/src/models` 下创建 Model 层的数据，每个数据层单独存放在一个 `.js` 文件下，并拥有一个独立的 namespace 进行区分，如：

```js
export default {
  namespace: 'list',
  state: {
    data: [1, 2, 3],
    maxNum: 3, 
  },
};
```

## 2.3 连接 Model 到组件中 （connect）

> `connect` 方法继承与 React-Redux

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

除此之外可以按照传统的用法而不使用装饰器用法，使用 `connect` 方法将组件与 state 数据关联，注意这样做的话，当前返回的不是组件，而是 `connect` 方法的返回值

```js
export default connect((state)=>{
  return { /* ... ... */ }
})(List)
```

## 2.4 修改 Model 层的数据 （Reducer）

![同步数据的数据流图](http://img.cdn.esunr.xyz/markdown/20191207164324.png)

首先要在 Model 层设置一个 Reducer 函数，一个 Reducer 函数接收两个参数，分别为 state 和 action。可以用来直接修改 state 中的数据。

> Reducer 函数返回一个新的 state 来与原来的 state 进行 **覆盖操作**，也就是说如果返回的 state 如果缺少某一项，会导致数据丢失。

```js
// listData.js
export default {
  namespace: 'list',
  state: {
    // ... ...
  },
  reducers: {
    addNewData: function(state, action) {
      let maxNum = state.maxNum + 1;
      let newArr = [...state.data, maxNum];
      return {
        data: newArr,
        maxNum,
      };
    },
  },
};
```

之后在组件中，使用 dva 提供的 `connect` 装饰器的第二个参数掺入的函数，可以拿到 `dispatch` 方法，调用 `dispatch` 方法可以派发一个 **Action** 从而调用一个 **Reducer 函数**，同时要注意结合 namespace 命名空间调用：

```js
// list.jsx
@connect(
  state => {
    return {
      // ... ...
    };
  },
  dispatch => {
    return {
      add() {
        const action = { 
          type: `${namespace}/addNewData` 
        }
        dispatch(action); 
      },
    };
  },
)
class List extends React.Component {
  // ... ...
}
```

设置好派发 `dispatch` 的方法后，方法就被挂载到组件的 `props` 中了，在组件中调用就可以使用：

```js
this.props.add()
```

## 2.5 使用 mapStateToProps 与 mapDispatchToProps

两个方法我们可以在外部定义，然后再传入到装饰器内，这样就能更清晰的显示代码调理：

```js
// list.jsx

const mapStateToProps = (state) => {
  return {
    data: state[namespace].data,
    maxNum: state[namespace].maxNum,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add() {
      // 派发一个 listData 中的 addNewData 方法
      dispatch({ type: `${namespace}/addNewData` }); 
    },
  };
}

@connect( mapStateToProps, mapDispatchToProps )
class List extends React.Component {
  // ... ...
}
```

## 2.6 异步数据的处理

> Dva 的异步能力继承与 Redux-Saga

![异步数据的数据流图](http://img.cdn.esunr.xyz/markdown/20191207164413.png)

Model 对象上的 effect 属性里可以写入 Generator 函数来进行异步数据的获取。创建的 Generator 函数内可以获取到两个参数，分别为 `action` 和 `sagaEffects` 对象。

其中 `sagaEffects` 对象下存在两个方法，`call()` 方法用于执行异步数据的获取，`put()` 方法用于派发一个 Action 来更新 state 中的数据。

关于 `call()` 方法，我们可以不使用 `call()` 方法而直接去 `yield` 获取一个异步方法得到的数据，但是按照规范我们必须使用 `call()` 来包裹一个异步方法，其官方解释如下：

> call 创建了一条描述结果的信息，就像在 Redux 里你使用 action 创建器，创建一个将被 Store 执行的、描述 action 的纯文本对象，call 创建一个纯文本对象描述函数调用。redux-saga middleware 确保执行函数调用并在响应被 resolve 时恢复 generator。这让你能容易地测试 Generator，就算它在 Redux 环境之外。因为 call 只是一个返回纯文本对象的函数而已。

UMI 为开发者很好的提供了一个 mock 环境，可以直接在项目的 `/mock/` 路径下创建 js 文件写入 mock 数据，如：

```js
// mockListData.js
export default {
  'get /api/list': function(req, res) {
    res.json({
      listData: [1, 2, 3, 4],
      maxNum: 4,
    });
  },
};
```

有了数据流之后，就可以使用 AJAX 来获取数据。在 `effects` 中我们来编写一个 Generator 函数：

```js
import request from '../utils/request';

export default {
  namespace: 'list',
  state: {
    // ... ...
  },
  reducers: {
    // ... ...
    addNewData(state, action) {
      if (action.payload) {
        const newState = JSON.parse(JSON.stringify(state));
        return Object.assign(newState, action.payload);
      }
      // ... ...
    },
  },
  effects: {
    *fetchData(action, { call, put }) {
      // request 是从外部引入的 XHR 封装的方法
      const data = yield call(request, '/api/list', { method: 'GET' });
      // 使用 put() 方法来派发一个 action
      yield put({
        type: 'addNewData',
        payload: data,
      });
    },
  },
};
```

与 Reducer 函数一样，Effect 函数也可以通过派发一个 Action 来调用，但 Effect 函数不会主动修改 State 中的数据，而是在获取了数据之后另外生成一个 Action 来调用直接修改数据的 Reducer 函数。

> Effect 函数只是拦截了 Action 然后进行了数据的转发

在调用时，我们也需要利用 `connect` 来获取 `dispatch` 方法来调用一个 Effect 函数：

```js
@connect(
  state => {
    return {
      // ... ...
    };
  },
  dispatch => {
    return {
      // ... ...
      fetchData() {
        dispatch({
          type: `${namespace}/fetchData`,
        });
      },
    };
  },
)
class List extends React.Component {
  // ... ...
}
```

方法调用：

```js
this.props.fetchData()
```

# 3. Ant Design

## 3.1 安装

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

## 3.2 搭建布局

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

 
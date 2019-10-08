# 1. 在React项目中使用路由功能

## 1.1 基本使用方法

首先下载 `react-router-dom`：

```shell
yarn add react-router-dom
```

在主文件 `App.js` 中引入 `BrowserRouter` ， `Route` 组件，然后在JSX的VDOM树中直接插入路由

```javascript
import React, { Component } from 'react'
... ...
import { BrowserRouter, Route } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div> 
        <Header />
        ... ...
        <BrowserRouter>
          <div>
            <Route path='/' exact render={() => <div>home</div>}></Route>
            <Route path='/detail' exact render={() => <div>detail</div>}></Route>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
```

![](http://img.cdn.esunr.xyz/markdown/20190522203023.png)

![](http://img.cdn.esunr.xyz/markdown/20190522203104.png)

需要注意的几点：

- 普通组件与路由组件需要包裹在同一个div中
- `<BrowserRouter></BrowserRouter>` 内部需要由一个div包裹
- `path` 为路由组件的路由属性
- `exact` 表示当完全符合 `path` 的路径时，只渲染当前 `<Route></Route>` 标签。如果不添加 `exact`，那么按照上面的例子，访问 `/detail` 时，`<Route path='/' exact render={() => <div>home</div>}></Route>` 也会被渲染

## 1.2 将Route渲染的组件抽离为单个页面文件

如果想单独把页面抽离为组件，利用 `Route` 导入组件，就将 `Route` 标签下的 `render` 改为 `component` ，其值为引入的组件，如

```
新增目录：
src
|- pages
|  |- detail
|  |  |- index.js
|  |- home
|  |  |- index.js
+++++++++++++++++
```

将主页面文件 `App.js` 改为：

```diff
  import React, { Component } from 'react'
  import Header from './common/header'
  ... ...
  import { BrowserRouter, Route } from 'react-router-dom'
+ import Home from './pages/home';
+ import Detail from './pages/detail';


  class App extends Component {
    render() {
      return (
        <div>
          <Header></Header>
          <BrowserRouter>
            <div>
-             <Route path='/' exact render={() => <div>home</div>}></Route>
+             <Route path='/' exact component={Home}></Route>
-             <Route path='/detail' exact render={() => <div>detail</div>}></Route>
+             <Route path='/detail' exact component={Detail}></Route>
            </div>
          </BrowserRouter>
        </div>
      );
    }
  }

  export default App;
```

## 1.3 在组件中进行页面跳转

使用 react-router-dom 中的 Link 组件可以实现页面的跳转

```javascript
import { Link } from 'react-router-dom'
... ...
render(){
  return (
    <Link to="detail"></Link>
  )
}
... ...
```

## 1.4 在路由中传入参数

### 1.4.1 params动态路由

在简书项目中，通过对路由传入不同的参数来跳转到不同的文章界面，如查看文章id为1的文章，其路由地址为 `/detail/1`。

在 `<Router>` 标签中为其设置路由接收的参数：

```diff
  // App.js
  ... ...
  render() {
    return (
      ... ...
      <BrowserRouter>
+         <Route path='/detail/:id' exact component={Detail}></Route>
      </BrowserRouter>
      ... ...
    );
  }
  ... ...
```

获取当前路由的参数：

```javascript
this.props.match.params
```

### 1.4.2 query参数路由

在简书项目中，通过对路由传入不同的参数来跳转到不同的文章界面，如查看文章id为1的文章，其路由地址为 `/detail?id=1`。

获取参数路由：

```javascript
this.props.location.search // search:"?id=1"
```

我们再 `String` 上挂载一个方法手动解析字符串：

```javascript
String.prototype.parseQuery = function () {
  var queryStr = this.split("?")[1];
  var queryArr = queryStr.split("&");
  var queryObj = {};

  
  for (var i in queryArr) {
    var queryItem = queryArr[i].split('=');
    queryObj[queryItem[0]] = queryItem[1];
  }
  return queryObj;
}

var url = "www.baidu.com/search?id=1&content=hahahahah&time=2019524"
console.log(url.parseQuery());
```

## 1.5 使用`<Redirect/>`标签对页面重定向

如果我们希望在进入页面时让页跳转到某一个路由地址，就在当前页面添加一个 `<Redirect/>` 标签，其包含一个 `to` 属性，属性值为希望跳转到的路由地址，如下示例：

```js
import { Redirect } from 'react-router-dom'
... ...
render(){
  return (
    <Redirect to="/" />
  )
}
... ...
```


# 2. 在Styled-components中使用组件Props传入的值

在某组件使用 Styled-components 处理样式时，可以在该组件上添加一个属性值，然后再其对应的 `style.js` 文件中，在编写其组件样式时就可以用 `${ (props) => props.[propsKey] }`

如我们再开发简书项目时，右侧会有不同的板块图片，每个板块图片都是由一个 `RecommentItem` 组件渲染出的，但其每个组件的背景图片都不一样，如下：

![20190523144309.png](http://img.cdn.esunr.xyz/markdown/20190523144309.png)

所以我们可以在 `RecommentItem` 组件中传入一个 `imgUrl` 的参数，来让该组件的CSS样式在渲染时，`background` 渲染出不同的 url 地址，具体做法如下：

```html
<!-- jsx -->
<RecommentWrapper>
  <RecommentItem imgUrl="http://img.cdn.esunr.xyz/banner-s-club-aa8bdf19f8cf729a759da42e4a96f366.png"></RecommentItem>
  <RecommentItem imgUrl="http://img.cdn.esunr.xyz/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png"></RecommentItem>
</RecommentWrapper>
```

```javascript
// styled-component
export const RecommentItem = styled.div`
  width: 280px;
  height: 50px; 
  background: url(${(props) => props.imgUrl});
  background-size: contain;
  margin-bottom: 10px;
`
```

# 3. 使用PureComponent来优化组件性能

在简书项目中首页创建的所有组件几乎都使用了Connect方法来与Store进行了连接，那么只要数据发生了改变，那么每一个组件都会被重新渲染。这时候可以使用之前学到的 `shuoldComponentUpdate` 来判断改变的数据是否与当前组件相关，如果相关才会重新渲染，否则不渲染。

在React16中提供了一个新的方法，使用 `PureComponent` 来代替 `Component` 创建一个纯组件，使用 `PureComponent` 创建的组件将要被重新渲染时，会自动判断自己 `props` 中的数据是否发生了变动，如果发生了变动才会重新渲染自己。

```diff
- import React, { Component } from 'react'
+ import React, { PureComponent } from 'react'
  import { connect } from 'react-redux'

- class Home extends Component {
+ class Home extends PureComponent {
    render() {
      return (
        ... ...
      )
    }
  }

  const mapState = (state) => ({
    ... ...
  })

  const mapDispatch = (dispatch) => ({
    ... ...
  })

  export default connect(mapState, mapDispatch)(Home);
```

注意：PureComponent 与 immutable.js 结合使用才有效


# 4. react-loadable的使用

[Guide](https://github.com/jamiebuilds/react-loadable)

react-loadable 可以实现异步加载路由，用来优化加载，以修改简书项目中的detail页面为例：

1. 在detail页面的根目录下创建一个 `loadable.js` 文件：
    ```diff
      /store
      index.js
    + loadable.js
      style.js
    ```

2. 在 `loadable.js` 中添加
    ```js
    import Loadable from 'react-loadable';
    import Loading from './my-loading-component';

    const LoadableComponent = Loadable({
      loader: () => import('./my-component'),
      loading: Loading,
    });

    export default class App extends React.Component {
      render() {
        return <LoadableComponent/>;
      }
    }
    ```
    根据需求修改成合适项目的代码：
    ```diff
      import Loadable from 'react-loadable';
    - import Loading from './my-loading-component';
    + import React from 'react'; // 获取语法jsx支持

      const LoadableComponent = Loadable({
        loader: () => import('./my-component'),
    -   loading: Loading,
    +   loading(){
    +     return <div>正在加载</div>
    +   }
      });

    + export default () => <LoadableComponent /> 

    - export default class App extends React.Component {
    -   render() {
    -     return <LoadableComponent/>;
    -   }
    - }
    ```

3. 修改入口文件 `App.js` 的引入代码
    ```diff
    - import Detail from './pages/detail';
    + import Detail from './pages/detail/loadable.js';
    ```

## 4.1 处理路由参数

我们首先要明白 react-loadable 改变了组件的加载方式，由之前直接读取 `index.js` 加载组件，改变为以读取 `loadable.js` 然后再异步获取 `index.js`，返回 `<LoadableComponent />` 组件来加载新的页面。

我们在入口文件 `App.js` 中将路由传递给了由 `loadable.js` 导出的组件，也就是说，我们将路由传递给的是 `<LoadableComponent />` 组件，而并非 `index.js` 中导出的组件。所以真正的组件无法获取到路由对象，当我们在组件中使用了 `this.props.match` 时就会报错。

这时我们需要改写 `index.js` 来让真正的组件获取到路由的参数。

首先要引入 react-router-dom 中提供的 `withRouter` 方法，这个方法可以让我们渲染出的组件可以读取到当前的路由信息：

```js
import { withRouter } from 'react-router-dom'
```

之后再导出组件时，我们要使用 `withRouter` 来渲染组件：

```js
export default connect(mapState, mapDispatch)(withRouter(Detail));
```





















- [1.使用styled-components管理样式](#1%E4%BD%BF%E7%94%A8styled-components%E7%AE%A1%E7%90%86%E6%A0%B7%E5%BC%8F)
  - [1.1 准备环境](#11-%E5%87%86%E5%A4%87%E7%8E%AF%E5%A2%83)
  - [1.2 使用流程](#12-%E4%BD%BF%E7%94%A8%E6%B5%81%E7%A8%8B)
  - [1.3 全局样式的使用](#13-%E5%85%A8%E5%B1%80%E6%A0%B7%E5%BC%8F%E7%9A%84%E4%BD%BF%E7%94%A8)
  - [1.4 子级样式的使用](#14-%E5%AD%90%E7%BA%A7%E6%A0%B7%E5%BC%8F%E7%9A%84%E4%BD%BF%E7%94%A8)
- [2. 使用combineReducers完成对数据的拆分管理](#2-%E4%BD%BF%E7%94%A8combinereducers%E5%AE%8C%E6%88%90%E5%AF%B9%E6%95%B0%E6%8D%AE%E7%9A%84%E6%8B%86%E5%88%86%E7%AE%A1%E7%90%86)
  - [2.1 主要步骤](#21-%E4%B8%BB%E8%A6%81%E6%AD%A5%E9%AA%A4)
  - [2.2 处理出口文件](#22-%E5%A4%84%E7%90%86%E5%87%BA%E5%8F%A3%E6%96%87%E4%BB%B6)
- [3. Immutable.js](#3-immutablejs)
  - [3.1 简介](#31-%E7%AE%80%E4%BB%8B)
  - [3.2 API](#32-api)
    - [3.2.1 fromJS() set()](#321-fromjs-set)
    - [3.2.2 get()](#322-get)
    - [3.2.3 toJS](#323-tojs)
    - [3.2.4 List() 和 Map()](#324-list-%E5%92%8C-map)
    - [3.2.5 List.of() 和 Map.of()](#325-listof-%E5%92%8C-mapof)
    - [3.2.6 size](#326-size)
  - [3.3 将Redux中的所有数据都immutable化](#33-%E5%B0%86redux%E4%B8%AD%E7%9A%84%E6%89%80%E6%9C%89%E6%95%B0%E6%8D%AE%E9%83%BDimmutable%E5%8C%96)
- [4. 在开发过程中使用假数据](#4-%E5%9C%A8%E5%BC%80%E5%8F%91%E8%BF%87%E7%A8%8B%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%81%87%E6%95%B0%E6%8D%AE)
- [5. 用ref获取DOM元素](#5-%E7%94%A8ref%E8%8E%B7%E5%8F%96dom%E5%85%83%E7%B4%A0)

# 1.使用styled-components管理样式

如果在组件文件中引入一个css文件，那么这个css文件会在全局中生效，也就是说会造成该组件的样式被应用到其他组件上，这时候需要使用 styled-components 来帮助我们管理样式

## 1.1 准备环境
1. 安装
    > yarn add styled-components

2. 更改`style.css`为`style.js`并引入`index.js`
    ```diff
    // index.js
    - import './style.css';
    + import './style.js';
    ```

## 1.2 使用流程

1. 创建`style.js`，引入`styled-components`
    ```js
    import styled from '../../../node_modules/styled-components';
    ```
2. 编写带有样式的组件容器
    ```js
    export const [StyleConponentName] = styled.[TagName]`
      [Style]: [Value]
    `
    ```
    如：
    ```js
    export const Nav = styled.div`
      width: 960px;
    `
    ```

3. 在组件中调用样式容器
    ```js
    import { [StyleConponentName] } from './style.js'
    ```
    ```html
    <StyleConponentName>Conetne Text Here</StyleConponentName>
    ```

## 1.3 全局样式的使用

styled-components 默认只应用于单个组件的样式，但是通过其提供的 `createGlobalStyle` 方法可以创建全局样式，我们在此以引入字体样式为例，在字体所在的文件夹中创建一个 `iconfont.js`

```js
// iconfont-.js
import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "iconfont";
    src: url('./iconfont.eot?t=1558516833762'); /* IE9 */
    ... ...
  }
  .iconfont {
    font-family: "iconfont"!important;
    font-size: 16px;
    font-style: normal;
  }
`
```

之后将 `iconfont.js` 导入到 `App.js` 中应用于全局：

```diff
  import React, { Component } from 'react'
  ... ...
+ import { GlobalStyle } from './statics/icon-font/iconfont'


  class App extends Component {
    render() {
      return (
        <Provider store={store}>
+         <GlobalStyle></GlobalStyle>
          ... ...
        </Provider>
      );
    }
  }

  export default App;
```

在此要注意的是，全局样式 `<GlobalStyle></GlobalStyle>` 必须引入到渲染的根节点中，即与组件同级，不能在其内部添加任何组件。

## 1.4 子级样式的使用

如果创建的样式组件需要通过className来判断样式，则使用 `&.className{...}` 来编写样式，如：

```html
<!-- jsx -->
<NavItem className="active">Login</NavItem>
```

```js
// style.js
export const NavItem = styled.div`
  [Style]: [Value];
  &.className: {
    [Style]: [Value];
  }
```




# 2. 使用combineReducers完成对数据的拆分管理

Reducer主要负责对action的判断和数据的处理以及初始化工作，假如我们把所有组件的操作都放到一个`reducer.js`文件中去处理，那么可能就会导致代码过长，所以Redux提供了一个 `combineReducers()` API可以让我们把Reducer拆分到每个组件中，再合并到主要的Reducer文件中。

目录结构：
```
/src
+-- /store
+   +-- index.js
+   +-- reducer.js
+
+-- /common
+   +-- /header
+       +-- index.js
+       +-- style.js
+       +-- /store
+           +-- index.js
+           +-- reducer.js
+
+-- index.js
+-- App.js
+-- style.js
```

`/comon/header` 中存放了header组件的的相关信息，我们可以把与该组件有关的store单独写在该目录下的 `store` 文件夹中。

## 2.1 主要步骤

1. 在 `/common/header/store/reducer.js` 编写关于 `header` 组件的reducer操作
    ```js
    const defaultState = {
      [dataName]: [value]
      // ... ... 处理初始化数据
    }
    export default (store = defaultState, action) => {
      // ... ... 处理action
      return store;
    }
    ```

2. `/common/header/store/index.js` 作为模块出口导出模块
    ```js
    import reducer from './reducer'
    export { reducer }
    ```

3. 改写 `/store/reducer.js`，在此引入 `combineReducers` 方法，然后将合并好的reducer导出：
    ```js
    import { combineReducers } from 'redux'
    import { reducer as HeaderReducer } from '../common/header/store'

    const reducer = combineReducers({
      header: HeaderReducer
    })

    export default reducer
    ```
4. 如果在组件中调用数据，则需要将原来的 `state.[dataName]` 改为 `state.[componentName].[dataName]`，如：
    ```diff
    const mapStateToProps = (state) => {
      return {
    -   focused: state.focused
    +   focused: state.header.focused
      }
    }
    ```

## 2.2 处理出口文件
当我们在代码中引入`actionCreators.js`和`constants.js`来存放action生成器以及管理变量名时，可以使用已有的`index.js`统一向外暴露接口。

目录变更:
```diff
  /common
  +-- /header
      +-- index.js
      +-- style.js
      +-- /store
          +-- index.js
          +-- reducer.js
+         +-- actionCreators.js
+         +-- constants.js
```

```js
/*   /common/header/store/index.js   */
import reducer from './reducer'
import * as actionCreators from './actionCreators'
import * as constants from './constants'

export { reducer, constants, actionCreators }
```

之后如果需要使用相关的action生成器则只需要调用:
```diff
- import * actionCreators from './store/actionCreators.js';
+ import { actionCreators } from './store';
... ...
const action = actionCreators.searchFocus()
```




# 3. Immutable.js

## 3.1 简介
Immutable.js是用来限制某一个数据为不可变更数据，它将原有的数据转化为一个immutable对象，之后如果想要获取某个immutable对象的值，则使用`get()`方法。它还提供了一个`set()`方法，这个方法并没有去修改原有数据的值，而是将原有值与新值结合，返回一个新的对象。

由于在Redux模型中，Reducer不可以更改state中的数据，只是将一个做了变更的数据交付给Store，由Store去变更数据。在之前的方法中，我们使用深拷贝state来防止变更数据，使用Immutable.js就可以简化操作。

注意：immutable对象只能使用immutable提供的API，且immutable对象不能与普通的对象混用，必须要进行转换。

## 3.2 API

### 3.2.1 fromJS() set()

利用immutable中的`fromJS()`可以将一个js对象转化成为一个immutable对象，利用`set()`方法可以处理immutable对象中的数据：

```diff
  import { constants } from './index'
+ import { fromJS } from 'immutable'

- const defaultState = {
-   focused: false
- }

=== 将默认的defaultState转化为一个immutable对象 ===
+ const defaultState = fromJS({
+   focused: false
+ })

  export default (state = defaultState, action) => {
    if (action.type == constants.SEARCH_FOCUE) {
-     const newState = JSON.parse(JSON.stringify(state));
-     newState.focused = true;
-     return newState;
+     return state.set('focused', true);
    }
    return state;
  }
```

### 3.2.2 get()

使用`get()`方法获取一个immutable对象中的数据（此时state中的数据已被转化为一个immutable对象）

```diff
const mapStateToProps = (state) => {
  return {
-   focused: state.header.focused
+   focused: state.header.get('focused')
  }
}
```

### 3.2.3 toJS

作用：将一个Immutable数据转换为JS类型的数据。

用法：value.toJS()

### 3.2.4 List() 和 Map()

作用：用来创建一个新的List/Map对象

用法:

```
//List

List(): List<any>
List<T>(): List<T>

//Map

Map(): Map<any>
Map<T>(): Map<T>
```

### 3.2.5 List.of() 和 Map.of()

作用：创建一个新的包含value的List/Map对象

用法：

```
List.of<T>(...values: Array<T>): List<T>

Map.of<T>(...values: Object<T>): Map<T>
```

### 3.2.6 size

作用：获取List/Map的长度

## 3.3 将Redux中的所有数据都immutable化

安装`redux-immutable`

> yarn add redux-immutable

在项目的主store中引入redux-immutable提供的`combineReducers()`方法去取代redux提供的`combineReducers()`方法

```diff
- import { combineReducers } from 'redux'
+ import { combineReducers } from 'redux-immutable'
```

此时就可以在组件中使用 immutable 来规范化数据了

```diff
const mapStateToProps = (state) => {
  return {
-   focused: state.header.get('focused')
+   focused: state.get('header').get('focused')
  }
}
```

也可以利用`getIn()`方法写为：
```diff
- focused: state.get('header').get('focused')
+ focused: state.getIn(['header','focused'])
```



# 4. 在开发过程中使用假数据

由Webpack的特性，项目在本地开发时，通过本地服务器可以访问到 `/public` 文件夹中的数据，也就是说我们可以再额外创建一个 `/api` 目录在 `/public` 目录下，在该目录下防止一些 json 文件来用以模拟访问的 json 数据，这样我们就可以通过 axios 直接访问 `http://localhost:8080/api/xxx.json` 来获取数据。




# 5. 用ref获取DOM元素

当我们要获取jsx中的某个DOM元素时，可以使用ref来获取，然后将ref对象作为参数传入方法中，我们就可以在方法中处理该DOM了，例如我们再点击“换一批”时，需要获取icon字体，改变其样式

```diff
  <SearchInfoSwitch 
+   onClick={() => handlePageChange(this.spinIcon)}
  >
    <i 
+     ref={(icon) => { this.spinIcon = icon }} 
      className="iconfont spin"
    >&#xe606;</i>换一批
  </SearchInfoSwitch>
```
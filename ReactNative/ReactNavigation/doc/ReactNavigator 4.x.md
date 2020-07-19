# 0. 安装 React Navigator

> 官方文档：https://reactnavigation.org/docs/4.x/getting-started

安装 React Navigator

```shell
npm install react-navigation
```

# 1. 堆栈导航 StackNavigator

在网络浏览器中，您可以使用定位 `<a>` 标记链接到其他页面 。 当用户单击链接时，URL将被推送到浏览器历史记录堆栈。 当用户按下“后退”按钮时，浏览器从历史记录堆栈的顶部弹出该项目，因此活动页面现在是以前访问的页面。 React Native 不像 Web 浏览器那样具有内置的全局历史堆栈概念。

React Navigation 的堆栈导航器为您的应用程序提供了一种在屏幕之间转换和管理导航历史记录的方式。 如果您的应用仅使用一个堆栈导航器，那么它在概念上类似于 Web 浏览器处理导航状态的方式，您的应用在用户与之交互时从导航堆栈中推送和弹出项目，这导致用户看到不同的屏幕。 它在 Web 浏览器和 React Navigation 中的工作方式之间的主要区别在于，React Navigation 的堆栈导航器提供了在堆栈中的路线之间导航时在 Android 和 iOS 手势和动画。

在继续之前，请先安装 [`react-navigation-stack`](https://github.com/react-navigation/stack) ：

```shell
$ yarn add react-navigation-stack @react-native-community/masked-view react-native-safe-area-context
```

创建一个 Home 页：

```tsx
import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const Home: React.FC = () => {
  return (
    <View>
      <Text>这是你的Home</Text>
    </View>
  );
};

export default Home;
```

在 App.tsx 中可以引入该 Home 页：

```tsx
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './src/pages/home';

// 这一步利用 createStackNavigator() 方法生成了  Navigator 对象
const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
});

// 由 Navigator 对象生成 AppContainer 组件
const AppContainer = createAppContainer(AppNavigator);

const App = () => <AppContainer />;

export default App;
```

`createStackNavigator()` 提供了创建页面堆栈的方法，其第一个参数传的是页面的配置项，第二个参数传递的是堆栈的相关设置，如默认页面等，我们可以创建多个页面，并指定初始页面：


```tsx
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    MovieList: MovieList, // 可以使用简写
  },
  {
    initialRouteName: 'Home',
  },
);
```

# 2. 页面间导航跳转

在由 `createAppContainer()` 生成的 AppContainer 组件中，其可以向所有的子页面组件传入 props。因此，我们可以在页面组件中，通过组件 props 调用传入的 `navigation` 对象([API DOC](https://reactnavigation.org/docs/4.x/navigation-prop/))，进行导航跳转：

```tsx
import React from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import reactotron from 'reactotron-react-native';
import {NavigationContainerProps} from 'react-navigation';

const Home: React.FC<any> = (props) => {
  const {navigation}: {navigation: NavigationStackProp} = props;
  return (
    <View>
      <Text>这是你的Home</Text>
      <Button
        title="这是你的Button"
        onPress={() => {
          // 机型页面跳转
          navigation.navigate('MovieList');
        }}
      />
    </View>
  );
};

export default Home;
```

> 如果目标路由是不存在的页面（在堆栈中未定义）或者是当前页面的话，那么什么都不会发生。

但是，有些情况我们需要在当前页面重新跳转到当前页面，从而对页面上的数据进行刷新，如果我们想要在详情页面进行路由跳转，从而改变 url params 让页面发生改变。那么此时应该使用 `navigation.push('MovieList')`，这样就会有效了。

在堆栈页面中，使用 `push` 来跳转新页面就相当于一直在堆栈中加入新页面，每次返回都是返回到堆栈的上一个页面中，这与浏览器的 History 是同一个逻辑,直到顶层页面页面调用 `goBack()` 方法无效，同时左上角没有返回按钮。
 
然而使用 `navigate` 即为导航到某个页面，并不会在路由堆栈中添加新页面。

> push、pop 等方法只有在堆栈导航中传入的 navigation 才存在

# 3. 导航生命周期

react 导航支持声明周期（与其说是生命周期不如说是事件监听），这些声明周期事件需要我们在组件被挂载时进行订阅，在组件被卸载时移除订阅。

例如，我们想要订阅用户离开当前界面时出发的事件：

```tsx
useEffect(() => {
  // Add the listener
  const didBlurSubscription = navigation.addListener('didBlur', (payload) => {
    reactotron.debug('didBlur');
    reactotron.log(payload);
  });
  return () => {
    // Remove the listener
    reactotron.debug('didBlur removed');
    didBlurSubscription.remove();
  };
}, []);
```

其中 payload 记录了路由的如下信息（我也看不懂）：

```json
{
  "context": "id-1595004781572-19:Navigation/COMPLETE_TRANSITION_Root",
  "state": {
    "routeName": "Home",
    "key": "id-1595004781572-19"
  },
  "lastState": {
    "routeName": "Home",
    "key": "id-1595004781572-19"
  },
  "action": {
    "type": "Navigation/COMPLETE_TRANSITION",
    "preserveFocus": true,
    "key": "StackRouterRoot",
    "toChildKey": "id-1595004781572-19"
  },
  "type": "action"
}
```

React Navigation 支持订阅如下事件：

- `willFocus` 屏幕将聚焦
- `didFocus` 屏幕聚焦后（如果有过渡，则过渡完成）
- `willBlur` 前屏将离开
- `didBlur` 屏幕离开后（如果有过渡，则过渡完成）

> 您还可以使用 withNavigationFocus HOC 或 `<NavigationEvents />` 组件对生命周期更改做出反应。

# 4. 路由参数

> https://reactnavigation.org/docs/4.x/params

配置参数：

```js
navigation.navigate('MovieDetail', {movieInfo: movie});
```

获取参数：

```js
const movieInfo = navigation.getParam('movieInfo');
```

# 5. 配置标题栏

> https://reactnavigation.org/docs/4.x/headers

我们可以在创建路由导航对象时可以为路由页面设置标题，同时还可以在标题中拆入 JSX 节点：

```tsx
const AppNavigator = createStackNavigator(
  {
    // other screen options ... ... 
    MovieDetail: {
      screen: MovieDetail,
      navigationOptions: {
        headerTitle: '电影详情',
        headerRight: () => (
          <Button
            title="返回首页"
            onPress={() => {
              alert('无情哈拉少');
            }}
          />
        ),
      },
    },
  },
  {
    // other options ... ...
  },
);
```

如果我们想要在顶部按钮中使用导航对象从而控制路由，那么 `navigationOptions` 传入的应该是一个方法，从方法的参数中可以解构出导航对象：

```tsx
const AppNavigator = createStackNavigator(
  {
    // ... ...
    MovieDetail: {
      screen: MovieDetail,
      navigationOptions: ({navigation}) => ({
        headerTitle: '电影详情',
        headerRight: () => (
          <Button
            title="返回首页"
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
        ),
      }),
    },
  },
  {
    // ... ...
  },
);
```

# 6. 全屏模式

> https://reactnavigation.org/docs/4.x/modal

模态就像是一个弹出窗口，它不是您的主要导航流程的一部分，它通常具有不同的过渡，不同的消除方式，并且旨在关注某一特定的内容或交互。

React Navigation 可以实现模态框的效果，其实现原理是基于嵌套路由的。在 React Navigation 中支持嵌套路由，我们可以创建多个堆栈导航，然后将他们放在一个根级的导航堆栈中：

```tsx
const MovieStack = createStackNavigator(
  {
    MovieHome: MovieHome,
    MovieList: MovieList,
    MovieDetail: MovieDetail,
  },
  {
    initialRouteName: 'MovieHome',
  },
);

const RootStack = createStackNavigator(
  {
    Movie: {
      screen: MovieStack,
    },
    Modal: {
      screen: ModalPage,
    },
  },
  {
    initialRouteName: 'Movie',
    mode: 'modal', // modal 与 card 在定义上以及部分手机系统的动画上可能会有区分
    headerMode: 'none', // 如果 headerMode 在这里设置为可见，那么 MovieStack 的 Header 将被遮挡住
  },
);

const AppContainer = createAppContainer(RootStack);

const App = () => <AppContainer />;
```

效果：

![1.gif](https://i.loli.net/2020/07/18/IsQPgeDojzTaNvi.gif)

# 7. 标签导航 TabNavigator

> https://reactnavigation.org/docs/4.x/tab-based-navigation

移动应用中最常见的导航样式可能是基于标签的导航。它可以是屏幕底部的标题，也可以是标题下方的顶部（甚至代替标题）。

要想使用标签导航，那么首先需要安装 `react-navigation-stack`

```sh
$ yarn add react-navigation-stack
```

创建一个底部导航栏：

```js
const MovieStack = createStackNavigator(
  {
    MovieHome: MovieHome
    // ... ...
  }
);

const UserStack = createStackNavigator(
  {
    UserHome: UserHome
    // ... ...
  }
);

const BottomNavigator = createBottomTabNavigator({
  Movie: MovieStack,
  User: UserStack,
});

const AppContainer = createAppContainer(BottomNavigator);
const App = () => <AppContainer />;
export default App;
```

![](https://i.loli.net/2020/07/18/TPizk87GfgU65vF.png)

当然我们想指定底部导航栏的样式以及 Icon 也是可以的，可以参考该章节的官方文档。

# 8. 抽屉导航 DrawerNavigator

> https://reactnavigation.org/docs/4.x/drawer-based-navigation

抽屉导航就是用户从屏幕左侧向内滑动而展开的侧边抽屉，通常这个页面用于导航到其他页面所使用，要想使用该方式用作页面导航，那么首先要安装依赖：

```sh
$ yarn add react-navigation-drawer
```

之后我们可以使用 Drawer 导航来控制页面的路由：

```tsx
const MovieStack = createStackNavigator(
  {
    MovieHome: MovieHome
    // ... ...
  }
);

const UserStack = createStackNavigator(
  {
    UserHome: UserHome
    // ... ...
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Movie: MovieStack,
    User: UserStack,
  },
);

const AppContainer = createAppContainer(BottomNavigator);
const App = () => <AppContainer />;
export default App;
```

**特别注意!!!**

引入了 Drawer Navigator 后，滑动展开 Drawer 的动作是不起效的，如果想让其生效，则必须安装 `react-native-gesture-handler`，同时在 `index.js` 中使用 `react-native-gesture-handler` 的 `gestureHandlerRootHOC` 来包裹整个 APP 组件，这样才会生效：

```diff
  import {AppRegistry} from 'react-native';
  import App from './App';
  import {name as appName} from './app.json';
+ import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

- AppRegistry.registerComponent(appName, () => App);
+ AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
```

> 引用参考：https://stackoverflow.com/questions/53394982/react-navigation-swipe-on-drawer-does-not-work-in-android
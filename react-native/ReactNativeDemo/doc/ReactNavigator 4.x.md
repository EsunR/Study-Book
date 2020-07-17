# 安装 React Navigator

安装 React Navigator

```shell
npm install react-navigation
```

# 1. 堆栈导航

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

const Home: React.FC<NavigationContainerProps> = ({navigation}) => {
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

在堆栈页面中，页面间反复跳转就相当于一直在堆栈中加入新页面，每次返回都是返回到堆栈的上一个页面中，这与浏览器的 History 是同一个逻辑,直到顶层页面页面调用 `goBack()` 方法无效，同时左上角没有返回按钮。


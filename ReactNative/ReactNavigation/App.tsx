import React from 'react';
import {Button} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import MovieHome from './src/pages/movie/home';
import MovieList from './src/pages/movie/movie-list';
import MovieDetail from './src/pages/movie/movie-detail';
import UserHome from './src/pages/user/home';
import TestHome from './src/pages/test/home';
import SvgTest from './src/pages/test/SvgTest';
import ChartKit from './src/pages/test/ChartKit';

const MovieStack = createStackNavigator(
  {
    MovieHome: {
      screen: MovieHome,
      navigationOptions: {
        headerShown: false,
      },
    },
    MovieList: {
      screen: MovieList,
    },
    MovieDetail: {
      screen: MovieDetail,
      navigationOptions: ({navigation}) => ({
        headerTitle: '电影详情',
        headerRight: () => (
          <Button
            title="返回首页"
            onPress={() => {
              navigation.navigate('MovieHome');
            }}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'MovieHome',
  },
);

const UserStack = createStackNavigator(
  {
    UserHome: {
      screen: UserHome,
    },
  },
  {
    initialRouteName: 'UserHome',
  },
);

const TestStack = createStackNavigator(
  {
    TestHome: {
      screen: TestHome,
    },
    SvgTest: {
      screen: SvgTest,
    },
    ChartKit: {
      screen: ChartKit,
    },
  },
  {
    initialRouteName: 'TestHome',
  },
);

const DrawerNavigator = createDrawerNavigator({
  Movie: MovieStack,
  User: UserStack,
  Test: TestStack,
});

const AppContainer = createAppContainer(DrawerNavigator);

const App = () => <AppContainer />;

export default App;

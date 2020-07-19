import React from 'react';
import {Button} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import MovieHome from './src/pages/movie/home';
import MovieList from './src/pages/movie/movie-list';
import MovieDetail from './src/pages/movie/movie-detail';
import ModalPage from './src/pages/modal';
import UserHome from './src/pages/user/home';
import Drawer from './src/pages/drawer';

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

const BottomNavigator = createBottomTabNavigator({
  Movie: MovieStack,
  User: UserStack,
});

const DrawerNavigator = createDrawerNavigator(
  {
    Movie: MovieStack,
    User: UserStack,
  },
  {
    // drawerLockMode: 'unlocked',
  },
);

const AppContainer = createAppContainer(DrawerNavigator);

// const RootStack = createStackNavigator(
//   {
//     Movie: {
//       screen: MovieStack,
//     },
//     Modal: {
//       screen: ModalPage,
//     },
//   },
//   {
//     initialRouteName: 'Movie',
//     mode: 'modal',
//     headerMode: 'none',
//   },
// );

// const AppContainer = createAppContainer(RootStack);

const App = () => <AppContainer />;

export default App;

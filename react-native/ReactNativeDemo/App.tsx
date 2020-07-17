import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './src/pages/home';
import MovieList from './src/pages/movie-list';
import reactotron from 'reactotron-react-native';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    MovieList: {
      screen: MovieList,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => <AppContainer />;

export default App;

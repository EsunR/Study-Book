import React, {useEffect} from 'react';
import {Button} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import MovieHome from '@/pages/movie/home';
import MovieList from '@/pages/movie/movie-list';
import MovieDetail from '@/pages/movie/movie-detail';
import UserHome from '@/pages/user/home';
import TestHome from '@/pages/test';
import SvgTest from '@/pages/test/svg-test';
import ChartKit from '@/pages/test/chart-kit';
import NativeModule from '@/pages/test/native-module';
import RNBaiduMtj from 'react-native-baidu-mtj';
import Camera from '@/pages/test/camera';

const App = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const MovieStack = () => (
    <Stack.Navigator initialRouteName="MovieHome">
      <Stack.Screen
        name="MovieHome"
        component={MovieHome}
        options={{headerShown: false}}
      />
      <Stack.Screen name="MovieList" component={MovieList} />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={({navigation}) => ({
          headerTitle: '电影详情',
          headerRight: () => (
            <Button
              title="返回首页"
              onPress={() => {
                navigation.navigate('MovieHome');
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );

  const UserStack = () => (
    <Stack.Navigator initialRouteName="UserHome">
      <Stack.Screen name="UserHome" component={UserHome} />
    </Stack.Navigator>
  );

  const TestStack = () => (
    <Stack.Navigator initialRouteName="TestHome">
      <Stack.Screen name="TestHome" component={TestHome} />
      <Stack.Screen name="SvgTest" component={SvgTest} />
      <Stack.Screen name="ChartKit" component={ChartKit} />
      <Stack.Screen name="NativeModule" component={NativeModule} />
      <Stack.Screen name="Camera" component={Camera} />
    </Stack.Navigator>
  );

  useEffect(() => {
    RNBaiduMtj.start();
    RNBaiduMtj.setDebugOn(true);
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Movie">
        <Drawer.Screen name="Movie" component={MovieStack} />
        <Drawer.Screen name="User" component={UserStack} />
        <Drawer.Screen name="Test" component={TestStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

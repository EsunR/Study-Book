import React from 'react';
import {View, Button} from 'react-native';
import global from '@/style/global';
import {NavigationStackProp} from 'react-navigation-stack';

const TestHome = (props) => {
  const {navigation}: {navigation: NavigationStackProp} = props;

  return (
    <View style={[global.flexCenter, global.fullWH]}>
      <View style={{width: 200, height: 200, justifyContent: 'space-between'}}>
        <Button
          title="SvgTest"
          onPress={() => {
            navigation.navigate('SvgTest');
          }}
        />
        <Button
          title="ChartKit"
          onPress={() => {
            navigation.navigate('ChartKit');
          }}
        />
        <Button
          title="Native Module"
          onPress={() => {
            navigation.navigate('NativeModule');
          }}
        />
        <Button
          title="Camera"
          onPress={() => {
            navigation.navigate('Camera');
          }}
        />
      </View>
    </View>
  );
};

export default TestHome;

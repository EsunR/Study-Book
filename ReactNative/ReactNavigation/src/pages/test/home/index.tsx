import React from 'react';
import {View, Button} from 'react-native';
import global from '../../../style/global';
import {NavigationStackProp} from 'react-navigation-stack';

const TestHome = (props) => {
  const {navigation}: {navigation: NavigationStackProp} = props;

  return (
    <View style={[global.flexCenter, global.fullWH]}>
      <View style={{width: 200}}>
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
      </View>
    </View>
  );
};

export default TestHome;

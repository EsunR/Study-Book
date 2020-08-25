import React from 'react';
import {View} from 'react-native';
import {Circle, Svg} from 'react-native-svg';
import global from '../../../style/global';

const SvgTest: React.FC<any> = () => {
  return (
    <View style={[global.fullWH]}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Circle
          r="20"
          cx="50"
          cy="50"
          stroke="red"
          strokeWidth="2"
          transform="translate(30 12)"
        />
      </Svg>
    </View>
  );
};

export default SvgTest;

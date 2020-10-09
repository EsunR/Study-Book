import React from 'react';
import {View, Text, Button} from 'react-native';
import global from '@/style/global';

const Camera: React.FC<any> = () => {
  return (
    <View style={[global.flexCenter, global.fullWH]}>
      <View style={{width: 200, height: 200, justifyContent: 'space-between'}}>
        <Button title="Open Camera" onPress={() => {}} />
      </View>
    </View>
  );
};

export default Camera;

import React from 'react';
import {View, Button} from 'react-native';
import CustomToast from './components/CustomToast';

const NativeModule: React.FC<any> = () => {
  return (
    <View>
      <Button
        title="弹出"
        onPress={() => {
          CustomToast.show('测试', 1000);
        }}
      />
    </View>
  );
};

export default NativeModule;

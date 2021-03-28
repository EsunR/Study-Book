import React from 'react';
import {View, Button} from 'react-native';
import CustomToast from './components/CustomToast';
import RNBaiduMtj from 'react-native-baidu-mtj';

const NativeModule: React.FC<any> = () => {
  return (
    <View>
      <Button
        title="弹出"
        onPress={() => {
          CustomToast.show('测试', 1000);
        }}
      />

      <Button
        title="开始统计"
        onPress={() => {
          RNBaiduMtj.start();
          RNBaiduMtj.setDebug(true);
        }}
      />

      <Button
        title="统计事件"
        onPress={() => {
          RNBaiduMtj.onEvent('test', '牛逼');
        }}
      />
    </View>
  );
};

export default NativeModule;

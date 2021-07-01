// import RNBaiduMtj from 'react-native-baidu-mtj';
import React from 'react';
import {Button, NativeModules, View} from 'react-native';
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
          RNBaiduMtj.setDebugOn(true);
        }}
      />

      <Button
        title="统计事件"
        onPress={() => {
          RNBaiduMtj.onEvent('test', '牛逼');
        }}
      />

      <Button
        title="设置用户属性"
        onPress={() => {
          RNBaiduMtj.setUserProperty({
            name: '张三',
            age: '18',
          });
        }}
      />

      <Button
        title="ios module"
        onPress={() => {
          const CalendarManager = NativeModules.CalendarManager;
          CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');
        }}
      />
    </View>
  );
};

export default NativeModule;

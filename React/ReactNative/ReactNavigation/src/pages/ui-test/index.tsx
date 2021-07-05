import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, View} from 'react-native';

const UITestHome: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Button
        title="Form 表单组件"
        onPress={() => {
          navigation.navigate('UITestForm');
        }}
      />
    </View>
  );
};

export default UITestHome;

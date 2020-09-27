import React from 'react';
import {View, Text, TextInput} from 'react-native';

const Login: React.FC<any> = () => {
  return (
    <View>
      <Text>输入文本</Text>
      <TextInput
        textContentType="username"
        placeholder="请输入"
        autoCompleteType="username"
      />
      <TextInput
        textContentType="password"
        placeholder="请输入"
        secureTextEntry={true}
        autoCompleteType="password"
      />
    </View>
  );
};

export default Login;

import React from 'react';
import {View, Text, TextInput, ScrollView, Button, Alert} from 'react-native';

const Login: React.FC<any> = () => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
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
      <Button
        title="ClickMe"
        onPress={() => {
          Alert.alert('aaaaa');
        }}
      />
      <TextInput placeholder="test" />
      <View style={{height: 200, backgroundColor: 'pink'}} />
      <TextInput placeholder="test" />
      <View style={{height: 200, backgroundColor: 'pink'}} />
      <TextInput placeholder="test" />
      <View style={{height: 200, backgroundColor: 'pink'}} />
      <TextInput placeholder="test" />
      <View style={{height: 200, backgroundColor: 'pink'}} />
      <TextInput placeholder="test" />
      <View style={{height: 200, backgroundColor: 'pink'}} />
      <TextInput placeholder="test" />
      <View style={{height: 200, backgroundColor: 'pink'}} />
      <TextInput placeholder="test" />
      <View style={{height: 200, backgroundColor: 'pink'}} />
    </ScrollView>
  );
};

export default Login;

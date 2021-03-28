import React, {useState, useRef} from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  View,
  Alert,
  Button,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// declare const global: {HermesInternal: null | {}};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    alignItems: 'center',
    margin: 15,
    height: 40,
  },
  box: {
    backgroundColor: 'blue',
  },
});

const App = () => {
  const [text, setText] = useState<any>('');
  const animHeight = useRef(new Animated.Value(50)).current;
  const animWidth = useRef(new Animated.Value(50)).current;

  return (
    <>
      <View>
        <ActivityIndicator size="large" color="#0000ff" animating={true} />
        <TextInput
          style={{}}
          underlineColorAndroid="transparent"
          placeholder="请输入"
          placeholderTextColor="#ccc"
          autoCapitalize="none"
          keyboardType="ascii-capable"
          returnKeyType="next"
          onChangeText={(value) => {
            setText(value);
          }}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            Alert.alert(
              '这里填标题',
              '这里填内容',
              [{text: '按钮1', onPress: () => {}}],
              {cancelable: false},
            );
          }}>
          <Text>点击提交</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Button
          title="保存数据"
          onPress={() => {
            AsyncStorage.setItem('text', text);
          }}
        />
        <Button
          title="读取数据"
          onPress={async () => {
            const savedText = await AsyncStorage.getItem('text');
            Alert.alert(`Saved Text: ${savedText}`);
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          Animated.timing(animWidth, {
            toValue: 200,
            duration: 1000,
            useNativeDriver: false,
          }).start();
          Animated.timing(animHeight, {
            toValue: 200,
            duration: 1000,
            useNativeDriver: false,
          }).start();
        }}>
        <Animated.View
          style={[styles.box, {width: animWidth, height: animHeight}]}
        />
      </TouchableOpacity>

      <ScrollView>
        <Image
          style={{margin: 10, width: 200, height: 1000, resizeMode: 'stretch'}}
          source={{uri: 'https://www.twle.cn/static/i/img1.jpg'}}
        />
      </ScrollView>
    </>
  );
};

export default App;

import React from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import reactotron from 'reactotron-react-native';
import {NavigationContainerProps} from 'react-navigation';

const Home: React.FC<NavigationContainerProps> = ({navigation}) => {
  return (
    <View>
      <Text>这是你的Home</Text>
      <Button
        title="跳转到 MovieList"
        onPress={() => {
          navigation.push('MovieList');
        }}
      />
    </View>
  );
};

export default Home;

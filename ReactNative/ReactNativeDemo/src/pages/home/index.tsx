import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home: React.FC<any> = (props) => {
  const {navigation}: {navigation: NavigationStackProp} = props;

  return (
    <View style={styles.container}>
      <Text>这是你的Home!</Text>
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

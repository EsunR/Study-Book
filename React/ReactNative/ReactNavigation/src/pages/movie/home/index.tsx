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

  buttonWrapper: {
    marginTop: 20,
    width: 200,
    height: 120,
    justifyContent: 'space-between',
  },
});

const MovieHome: React.FC<any> = (props) => {
  const {navigation}: {navigation: NavigationStackProp} = props;

  return (
    <View style={styles.container}>
      <Text>这是你的Home!</Text>
      <View style={styles.buttonWrapper}>
        <Button
          title="跳转到 MovieList"
          onPress={() => {
            navigation.navigate('MovieList');
          }}
        />
        <Button
          title="展开 Modal"
          onPress={() => {
            navigation.navigate('Modal');
          }}
        />
        <Button
          title="展开 Drawer"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      </View>
    </View>
  );
};

export default MovieHome;

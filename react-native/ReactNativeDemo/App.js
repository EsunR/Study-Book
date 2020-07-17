/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const MOCKED_MOVIES_DATA = [
  {
    title: '标题',
    year: '2015',
    posters: {thumbnail: 'https://imgchr.com/i/UrTHRH'},
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});

const App: () => React$Node = () => {
  const movie = MOCKED_MOVIES_DATA[0];

  return (
    <View style={styles.container}>
      <Text>{movie.title}</Text>
      <Text>{movie.year}</Text>
      <Image source={{uri: movie.posters.thumbnail}} />
    </View>
  );
};

export default App;

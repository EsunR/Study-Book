import React from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import reactotron from 'reactotron-react-native';

const MOCKED_MOVIES_DATA = [
  {
    title: '你叫啥子',
    year: '2015',
    posters: {thumbnail: 'https://www.esunr.xyz:8080/api/utils/bingPic'},
  },
];

const cover = 'https://www.esunr.xyz:8080/api/utils/bingPic';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  thumbnail: {
    width: 200,
    height: 200,
  },
});

const MovieList: React.FC<any> = (props) => {
  const {navigation}: {navigation: NavigationStackProp} = props;
  const movie = MOCKED_MOVIES_DATA[0];

  reactotron.log(props);

  return (
    <>
      <View style={styles.container}>
        <Text>{movie.title}</Text>
        <Text>{movie.year}</Text>
        <Image
          style={styles.thumbnail}
          source={{uri: movie.posters.thumbnail}}
        />
      </View>
      <View>
        <Button
          title="返回"
          onPress={() => {
            navigation.goBack();
          }}></Button>
        <Button
          title="跳转到 Home"
          onPress={() => {
            navigation.push('Home');
          }}
        />
      </View>
    </>
  );
};

export default MovieList;

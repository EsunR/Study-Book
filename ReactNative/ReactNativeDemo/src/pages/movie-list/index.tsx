import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import reactotron from 'reactotron-react-native';

// const cover = 'https://www.esunr.xyz:8080/api/utils/bingPic';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },

  movieListItemWrapper: {
    flexDirection: 'row',
  },

  movieCover: {
    width: 100,
    height: 160,
  },

  movieDescWrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: '#fff',
  },

  movieDescText: {
    lineHeight: 30,
    fontSize: 18,
  },
});

const MovieList: React.FC<any> = (props) => {
  const {navigation}: {navigation: NavigationStackProp} = props;
  const movies = [
    {
      id: 1,
      title: '你的名字',
      year: '2016',
      posters: {thumbnail: 'https://www.esunr.xyz:8080/api/utils/bingPic'},
    },
    {
      id: 1,
      title: '肖申克的救赎',
      year: '1997',
      posters: {thumbnail: 'https://www.esunr.xyz:8080/api/utils/bingPic'},
    },
  ];

  useEffect(() => {
    const didBlurSubscription = navigation.addListener('didBlur', (payload) => {
      reactotron.debug('didBlur');
      reactotron.log(payload);
    });
    return () => {
      reactotron.debug('didBlur removed');
      didBlurSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {movies.map((movie) => (
          <View
            style={styles.movieListItemWrapper}
            onTouchStart={() => {
              navigation.navigate('MovieDetail', {movieInfo: movie});
            }}>
            <Image
              style={styles.movieCover}
              source={{uri: movie.posters.thumbnail}}
            />
            <View style={styles.movieDescWrapper}>
              <Text style={styles.movieDescText}>{movie.title}</Text>
              <Text style={styles.movieDescText}>{movie.year}</Text>
            </View>
          </View>
        ))}
      </View>

      <View>
        <Button
          title="返回"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default MovieList;

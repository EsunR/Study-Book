import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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

const MovieList: React.FC<any> = () => {
  const navigation = useNavigation();
  const movies = [
    {
      id: 1,
      title: '你的名字',
      year: '2016',
      posters: {thumbnail: 'https://www.esunr.xyz:8080/api/utils/bingPic'},
    },
    {
      id: 2,
      title: '肖申克的救赎',
      year: '1997',
      posters: {thumbnail: 'https://www.esunr.xyz:8080/api/utils/bingPic'},
    },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      reactotron.debug('didBlur listener emit');
    });
    return () => unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        {movies.map((movie) => (
          <View
            key={movie.id}
            style={styles.movieListItemWrapper}
            onTouchStart={() => {
              navigation.navigate('MovieDetail');
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

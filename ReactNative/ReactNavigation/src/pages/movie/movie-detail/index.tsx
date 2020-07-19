import React from 'react';
import {View, Text} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';

const MovieDetail: React.FC<any> = (props) => {
  const {navigation}: {navigation: NavigationStackProp} = props;
  const movieInfo = navigation.getParam('movieInfo');

  return (
    <View>
      <Text>
        {movieInfo && movieInfo.title}是一部在{movieInfo && movieInfo.year}
        上映的电影
      </Text>
    </View>
  );
};

export default MovieDetail;

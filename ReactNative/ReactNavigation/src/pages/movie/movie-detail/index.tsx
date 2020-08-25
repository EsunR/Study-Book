import React from 'react';
import {View, Text} from 'react-native';

const MovieDetail: React.FC<any> = ({route}) => {
  const movieInfo = route.params?.movieInfo;

  return (
    <View>
      <Text>
        {movieInfo?.title}是一部在{movieInfo?.year}
        上映的电影
      </Text>
    </View>
  );
};

export default MovieDetail;

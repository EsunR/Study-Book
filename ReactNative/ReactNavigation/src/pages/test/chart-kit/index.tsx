import React from 'react';
import {View} from 'react-native';
import global from '@/style/global';
import {ProgressChart} from 'react-native-chart-kit';

const ChartKit: React.FC<any> = () => {
  const data = {
    labels: ['Swim', 'Bike', 'Run'], // optional
    data: [0.4, 0.6, 0.8],
  };
  return (
    <View style={[global.fullWH]}>
      <ProgressChart
        data={data}
        width={300}
        height={200}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        hideLegend={false}
      />
    </View>
  );
};

export default ChartKit;

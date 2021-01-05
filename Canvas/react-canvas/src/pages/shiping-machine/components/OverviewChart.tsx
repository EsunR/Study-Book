import React, { useMemo } from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts';
import { IMachineListViewChartData } from './MachineListView';
import ScreenTheme from '../localfiles/theme';

interface OverviewChartProps {
  data: IMachineListViewChartData[];
}

const OverviewChart: React.FC<OverviewChartProps> = props => {
  const { data } = props;

  const option = useMemo<echarts.EChartsOption>(() => {
    return {
      series: [
        {
          data:
            data instanceof Array
              ? (JSON.parse(JSON.stringify(data)) as any[]).map(item => {
                  let color = '';
                  switch (item.name) {
                    case '正常':
                      color = ScreenTheme.normal;
                      break;
                    case '异常':
                      color = ScreenTheme.danger;
                      break;
                    case '待机':
                      color = ScreenTheme.standby;
                      break;
                    default:
                      color = ScreenTheme.normal;
                      break;
                  }
                  return {
                    ...item,
                    itemStyle: { color },
                  };
                })
              : [],
          type: 'pie',
          radius: [50, 80],
          label: {
            show: false,
          },
          center: ['50%', 85],
          roseType: 'radius',
        },
      ],
      legend: {
        show: true,
        x: 'center',
        y: 185,
        textStyle: {
          color: '#FFFFFF',
          fontSize: 14,
          x: 100,
        },
        formatter: name => {
          const targetData = data.find(item => item.name === name);
          return `${name}: ${targetData ? targetData.value : '-'}`;
        },
        icon: 'circle',
      },
    };
  }, [data]);

  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
      theme="binmade"
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default OverviewChart;

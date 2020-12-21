import { Group as GroupInstance } from 'konva/types/Group';
import { NodeConfig } from 'konva/types/Node';
import React from 'react';
import { MachineStatus } from './MachineView';
import { Group, Rect, Text } from 'react-konva';
import Portal from './subcomponents/Portal.js';
import ScreenTheme from '../localfiles/theme';
import MachineList from './MachineList';

export interface IMachineListViewChartData {
  name: string;
  value: number;
}

export interface IMachineListItem {
  name: string;
  status: MachineStatus;
}

export type MachineListViewProps = {
  chartData: IMachineListViewChartData[];
  machineList: IMachineListItem[];
} & NodeConfig;

const MachineListView: React.FC<MachineListViewProps> = props => {
  const { chartData, machineList, ...resetNodeProps } = props;
  const paddingHoz = 20;
  const paddingVer = 25;

  return (
    <Group {...resetNodeProps}>
      <Rect width={300} height={938} stroke="#00D8FF" strokeWidth={1} />
      <Text
        x={paddingHoz}
        text="定型机信息总览"
        fill={ScreenTheme.normal}
        fontSize={18}
        fontStyle="bold"
        y={paddingVer}
      />

      {/* Chart */}
      <Portal targetWrapper={document.querySelector('#canvas-area')}>
        <div
          style={{
            position: 'absolute',
            width: 250,
            height: 250,
            backgroundColor: 'skyblue',
            left: 67,
            top: 187,
            zIndex: 999,
          }}
        />
      </Portal>
      {/* Chart */}

      {/* List */}
      <MachineList listData={machineList} x={paddingHoz} y={380} />
      {/* List */}
    </Group>
  );
};

export default MachineListView;

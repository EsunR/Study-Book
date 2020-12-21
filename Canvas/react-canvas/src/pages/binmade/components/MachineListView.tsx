import { Group as GroupInstance } from 'konva/types/Group';
import { NodeConfig } from 'konva/types/Node';
import React from 'react';
import { MachineStatus } from './MachineView';
import { Group } from 'react-konva';
import Portal from './subcomponents/Portal.js';

interface IMachineListViewChartData {
  name: string;
  value: number;
}

interface IMachineListItem {
  name: string;
  status: MachineStatus;
}

export type MachineListViewProps = {
  chartData: IMachineListViewChartData[];
  machineList: IMachineListItem[];
} & NodeConfig;

const MachineListView: React.FC<MachineListViewProps> = props => {
  const { chartData, machineList, ...resetNodeProps } = props;
  return (
    <Group {...resetNodeProps}>
      <Portal targetWrapper={document.querySelector('#canvas-area')}>
        <div
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            backgroundColor: 'skyblue',
            left: 0,
            top: 0,
            zIndex: 999,
          }}
          placeholder="DOM input from Konva nodes"
        />
      </Portal>
    </Group>
  );
};

export default MachineListView;

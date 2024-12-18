import { Group as GroupInstance } from 'konva/types/Group';
import { NodeConfig } from 'konva/types/Node';
import React from 'react';
import { MachineStatus } from './MachineView';
import { Group, Rect, Text } from 'react-konva';
import Portal from './subcomponents/Portal.js';
import ScreenTheme from '../localfiles/theme';
import MachineList from './MachineList';
import OverviewChart from './OverviewChart';
import Corner, { CornerPos } from './Corner';

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

  const renderCorner = (pos: CornerPos, x: number, y: number) => {
    return (
      <Corner
        width={20}
        pos={pos}
        stroke={ScreenTheme.normal}
        strokeWidth={4}
        x={x}
        y={y}
      />
    );
  };

  return (
    <Group {...resetNodeProps}>
      <Rect
        width={300}
        height={938}
        stroke="rgba(0, 255, 241, 0.2)"
        strokeWidth={1}
        fill="rgba(220, 221, 255, 0.05)"
      />
      {/* 四个角 */}
      {renderCorner('leftTop', 0, 0)}
      {renderCorner('rightTop', 300 - 20, 0)}
      {renderCorner('rightBottom', 300 - 20, 938 - 20)}
      {renderCorner('leftBottom', 0, 938 - 20)}
      {/* 四个角 */}
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
            height: 215,
            left: 65,
            top: 180,
            zIndex: 999,
          }}
        >
          <OverviewChart data={chartData} />
        </div>
      </Portal>
      {/* Chart */}

      {/* List */}
      <MachineList listData={machineList} x={paddingHoz} y={310} />
      {/* List */}
    </Group>
  );
};

export default MachineListView;

import { NodeConfig } from 'konva/types/Node';
import React from 'react';
import { Group, Rect } from 'react-konva';
import useMachineStatus from '../hook/useMachineStatus';
import ScreenTheme from '../localfiles/theme';
import { IMachineListItem, MachineListViewProps } from './MachineListView';

const MachineListItem: React.FC<IMachineListItem & NodeConfig> = props => {
  const { name, status, ...resetNodeProps } = props;
  const { statusColor, statusText } = useMachineStatus(status);

  return (
    <Group {...resetNodeProps}>
      <Rect width={246} height={40} stroke="#00D8FF" />
    </Group>
  );
};

type MachineListProps = {
  listData: MachineListViewProps['machineList'];
} & NodeConfig;

const MachineList: React.FC<MachineListProps> = props => {
  const { listData, ...resetNodeProps } = props;

  return (
    <Group {...resetNodeProps}>
      {listData.map((item, index) => (
        <MachineListItem {...item} y={40 * index} />
      ))}
    </Group>
  );
};

export default MachineList;

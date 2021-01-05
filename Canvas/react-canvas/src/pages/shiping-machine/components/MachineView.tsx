import Konva from 'konva';
import React, { useEffect } from 'react';
import { Group } from 'react-konva';
import SettingMachine from './SettingMachine';

export interface IMachineData {
  wind: { current: number };
  temperature: { current: number; setting: number };
}

export type MachineStatus = 'normal' | 'danger' | 'standby';

export interface IMachine {
  machine_name: string;
  data: IMachineData[];
  status: MachineStatus;
}

type MachineViewProps = {
  machines: IMachine[];
} & Konva.NodeConfig;

const MachineView: React.FC<MachineViewProps> = props => {
  const { machines, ...resetGroupProps } = props;

  return (
    <Group {...resetGroupProps}>
      {machines.map((machine, index) => (
        <SettingMachine key={index} machine={machine} y={index * (306 + 10)} />
      ))}
    </Group>
  );
};

export default MachineView;

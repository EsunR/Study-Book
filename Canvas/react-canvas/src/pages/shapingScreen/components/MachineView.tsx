import Konva from 'konva';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Group } from 'react-konva';
import { Group as GroupInstance } from 'konva/types/Group';
import ShippingMachineScreenContext from '../state/ShippingMachineScreenContext';
import SettingMachine from './SettingMachine';
import _ from 'lodash';
import { ACTIVE_COUNT } from '../localfiles';

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

type MachineViewProps = {} & Konva.NodeConfig;

const MachineView: React.FC<MachineViewProps> = props => {
  const { ...resetGroupProps } = props;
  const { state } = useContext(ShippingMachineScreenContext);
  const { machineList, activeHeadId } = state;

  const activeHeadIndex = useMemo(() => {
    return machineList.findIndex(machine => machine.id === activeHeadId);
  }, [activeHeadId]);

  // posArr 记录了每个定型机在当前展示列表中所处的位置，是一个数组，数组与 machineList 的索引对应
  const posArr = useMemo<number[]>(() => {
    if (activeHeadIndex >= 0) {
      if (machineList.length > ACTIVE_COUNT) {
        // 超过 ACTIVE_COUNT 时逐个计算位置
        const preActiveHeadIndex =
          activeHeadIndex - 1 >= 0
            ? activeHeadIndex - 1
            : machineList.length - 1;
        return machineList.map((machine, index) => {
          const gap = index - preActiveHeadIndex;
          if (gap < 0) {
            return machineList.length + gap;
          } else {
            return gap;
          }
        });
      } else {
        // 不足 ACTIVE_COUNT 个时，平铺所有项
        return machineList.map((machine, index) => index);
      }
    } else {
      return [];
    }
  }, [activeHeadIndex, machineList]);

  return (
    <Group
      {...resetGroupProps}
      ref={ref => {
        if (ref) {
          ref.clip({ x: 0, y: 0, width: 1535, height: 944 });
        }
      }}
    >
      {machineList.map((machine, index) => {
        return machine ? (
          <SettingMachine
            key={machine.id}
            machine={machine}
            pos={posArr[index]}
          />
        ) : null;
      })}
    </Group>
  );
};

export default MachineView;

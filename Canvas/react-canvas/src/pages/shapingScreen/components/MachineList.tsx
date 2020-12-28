import { NodeConfig } from 'konva/types/Node';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Group, Rect, Text, RegularPolygon } from 'react-konva';
import _ from 'lodash';
import useMachineStatus from '../hook/useMachineStatus';
import ScreenTheme from '../localfiles/theme';
import ShippingMachineScreenContext from '../state/ShippingMachineScreenContext';
import { IMachineListItem, MachineListViewProps } from './MachineListView';
import { ACTIVE_COUNT, SCROLL_AWAIT } from '../localfiles';

const MachineListItem: React.FC<{
  itemData: IMachineListItem;
  active: boolean;
} & NodeConfig> = props => {
  const { itemData, active, ...resetNodeProps } = props;
  const { statusColor, statusText } = useMachineStatus(
    itemData && itemData.status,
  );
  const paddingHoz = 15;
  const paddingVer = 12;

  return (
    <Group {...resetNodeProps}>
      <Rect
        width={246}
        height={40}
        stroke={ScreenTheme.normal}
        opacity={active ? 1 : 0.2}
        shadowColor={ScreenTheme.normal}
        shadowBlur={active ? 10 : 0}
        strokeWidth={1}
      />
      <Group x={paddingHoz} y={paddingVer}>
        <Text
          text={(itemData && itemData.name) || '-'}
          fill="#FFFFFF"
          fontSize={16}
          y={2}
        />
        <Rect
          fill={statusColor}
          width={86}
          height={8}
          cornerRadius={100}
          x={82}
          y={4}
        />
        <Text
          text={statusText}
          fill={statusColor}
          fontSize={14}
          x={185}
          y={2}
        />
      </Group>
      {active ? (
        <RegularPolygon
          sides={3}
          radius={10}
          fill="#FFFFFF"
          rotation={90}
          scaleY={0.7}
          x={254}
          y={20}
        />
      ) : null}
    </Group>
  );
};

type MachineListProps = {} & NodeConfig;

const MachineList: React.FC<MachineListProps> = props => {
  const { ...resetNodeProps } = props;
  const { dispatch, state } = useContext(ShippingMachineScreenContext);
  const { machineList, activeHeadId } = state;
  const palyTimerRef = useRef<any>();

  const activeMachineIds = useMemo(() => {
    // activeHeadId 切换时，重新计算当前显示为活跃状态的 Machine id
    const activeHeadIndex = machineList.findIndex(
      machine => machine.id === activeHeadId,
    );
    if (activeHeadIndex === -1) {
      return [];
    } else {
      const newActiveMachineIds = [];
      for (let i = 0; i < ACTIVE_COUNT; i++) {
        const currentIndex = (activeHeadIndex + i) % machineList.length;
        newActiveMachineIds.push(machineList[currentIndex].id);
      }
      return _.uniq(newActiveMachineIds);
    }
  }, [activeHeadId, machineList]);

  const startPlay = () => {
    if (palyTimerRef.current) {
      clearInterval(palyTimerRef.current);
    }
    palyTimerRef.current = setInterval(() => {
      const activeHeadIndex = machineList.findIndex(
        machine => machine.id === activeHeadId,
      );
      if (activeHeadIndex >= 0) {
        dispatch({
          type: 'UPDATE_ACTIVE_HEAD_ID',
          payload: machineList[(activeHeadIndex + 1) % machineList.length].id,
        });
      }
    }, SCROLL_AWAIT);
  };

  const stopPlay = () => {
    if (palyTimerRef.current) {
      clearInterval(palyTimerRef.current);
    }
  };

  // Effect
  useEffect(() => {
    // MachineList 数据改变时，要从头轮播
    if (machineList.length) {
      dispatch({
        type: 'UPDATE_ACTIVE_HEAD_ID',
        payload: machineList[0].id,
      });
    } else {
      dispatch({
        type: 'UPDATE_ACTIVE_HEAD_ID',
        payload: undefined,
      });
    }
  }, [machineList]);

  useEffect(() => {
    // 定型机数量大于 ACTIVE_COUNT 时才进行轮播
    if (machineList.length > ACTIVE_COUNT) {
      startPlay();
    } else {
      stopPlay();
    }
    return () => {
      stopPlay();
    };
  }, [activeHeadId, machineList]);

  return (
    <Group {...resetNodeProps}>
      {machineList instanceof Array
        ? state.machineList.map((item, index) => (
            <MachineListItem
              key={index}
              itemData={item}
              active={
                activeMachineIds instanceof Array
                  ? activeMachineIds.includes(item.id)
                  : false
              }
              y={40 * index}
            />
          ))
        : null}
    </Group>
  );
};

export default MachineList;

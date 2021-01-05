import { NodeConfig } from 'konva/types/Node';
import React, { useEffect, useRef, useState } from 'react';
import { Group, Rect, Text, RegularPolygon } from 'react-konva';
import useMachineStatus from '../hook/useMachineStatus';
import ScreenTheme from '../localfiles/theme';
import { IMachineListItem, MachineListViewProps } from './MachineListView';

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

type MachineListProps = {
  listData: MachineListViewProps['machineList'];
} & NodeConfig;

const MachineList: React.FC<MachineListProps> = props => {
  const { listData, ...resetNodeProps } = props;
  const [activeItemIndex, setActiveItemIndex] = useState<number[]>([]);
  const palyTimerRef = useRef<any>();
  const activeMaxCount = 3;

  const startPlay = () => {
    if (palyTimerRef.current) {
      clearInterval(palyTimerRef.current);
    }
    palyTimerRef.current = setInterval(() => {
      // 进行轮播
      let startIndex = 0;
      if (activeItemIndex.length) {
        startIndex = activeItemIndex[activeItemIndex.length - 1] + 1;
      }
      if (startIndex >= listData.length) {
        startIndex = 0;
      }
      const newActiveItemIndex: number[] = [];
      for (
        let i = startIndex;
        i < listData.length && newActiveItemIndex.length < activeMaxCount;
        i++
      ) {
        newActiveItemIndex.push(i);
      }
      setActiveItemIndex(newActiveItemIndex);
    }, 5000);
  };

  const initActiveItemIndex = () => {
    const newActiveItemIndex: number[] = [];
    for (
      let i = 0;
      i < listData.length && newActiveItemIndex.length < activeMaxCount;
      i++
    ) {
      newActiveItemIndex.push(i);
    }
    setActiveItemIndex(newActiveItemIndex);
  };

  useEffect(() => {
    if (!activeItemIndex.length) {
      initActiveItemIndex();
    }
    startPlay();
    return () => {
      if (palyTimerRef.current) {
        clearInterval(palyTimerRef.current);
      }
    };
  }, [activeItemIndex]);

  return (
    <Group {...resetNodeProps}>
      {listData.map((item, index) => (
        <MachineListItem
          key={index}
          itemData={item}
          active={activeItemIndex.includes(index)}
          y={40 * index}
        />
      ))}
    </Group>
  );
};

export default MachineList;

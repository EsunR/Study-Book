import React, { useEffect, useRef, useState } from 'react';
import { Group, Text } from 'react-konva';
import { NodeConfig } from 'konva/types/Node';
import moment from 'moment';

type TimeProps = {} & NodeConfig;

const Time: React.FC<TimeProps> = props => {
  const { ...resetNodeProps } = props;
  const [time, setTime] = useState<Date>(new Date());
  const timerRef = useRef<any>();

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <Group {...resetNodeProps}>
      <Text fontSize={14} fill="#FFFFFF" text={moment(time).format('YYYY-MM-DD HH:mm:ss')} />
    </Group>
  );
};

export default Time;

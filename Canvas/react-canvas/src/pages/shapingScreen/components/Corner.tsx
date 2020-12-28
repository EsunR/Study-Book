import { NodeConfig } from 'konva/types/Node';
import React, { useMemo } from 'react';
import { Group, Line, Rect } from 'react-konva';

export type CornerPos = 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export type CornerProps = {
  width: number;
  pos: CornerPos;
  stroke: string;
  strokeWidth: number;
} & NodeConfig;

const Corner: React.FC<CornerProps> = props => {
  const { width, pos, stroke, strokeWidth, ...resetNodeProps } = props;

  const points = useMemo<number[]>(() => {
    if (width && pos) {
      switch (pos) {
        case 'leftTop':
          return [0, width, 0, 0, width, 0];
        case 'leftBottom':
          return [0, 0, 0, width, width, width];
        case 'rightTop':
          return [0, 0, width, 0, width, width];
        case 'rightBottom':
          return [0, width, width, width, width, 0];
        default:
          return [];
      }
    } else {
      return [];
    }
  }, [width, pos]);

  return (
    <Group {...resetNodeProps}>
      <Line points={points} stroke={stroke} strokeWidth={strokeWidth} />
    </Group>
  );
};

export default Corner;

import { NodeConfig } from 'konva/types/Node';
import { RectConfig } from 'konva/types/shapes/Rect';
import React from 'react';
import { Group, Rect, Shape, KonvaNodeComponent } from 'react-konva';

type MachineProps = {} & NodeConfig;

const Machine: React.FC<MachineProps> = props => {
  const stockWidth = 3;
  const centerRectWidth = 100;
  const mainColor = '#3399FF';

  const publicProps: RectConfig = {
    stroke: '#3399FF',
    strokeWidth: stockWidth,
    offsetX: -(stockWidth / 2),
    offsetY: -(stockWidth / 2),
  };

  return (
    <Group {...props}>
      <Rect
        width={60}
        height={20}
        x={(centerRectWidth - 60) / 2}
        {...publicProps}
      />
      <Rect
        width={centerRectWidth}
        height={centerRectWidth}
        cornerRadius={10}
        y={20}
        {...publicProps}
        fillRadialGradientStartPointX={50}
        fillRadialGradientStartPointY={50}
        fillRadialGradientStartRadius={65}
        fillRadialGradientEndPointX={50}
        fillRadialGradientEndPointY={50}
        fillRadialGradientEndRadius={0}
        fillRadialGradientColorStops={[
          0,
          mainColor,
          0.5,
          'rgba(255,255,255,0)',
        ]}
      />
      <Rect
        width={60}
        height={20}
        x={(centerRectWidth - 60) / 2}
        y={120}
        {...publicProps}
      />
    </Group>
  );
};

export default Machine;

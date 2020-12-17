import { NodeConfig } from 'konva/types/Node';
import { Rect as RectInstance, RectConfig } from 'konva/types/shapes/Rect';
import React, { useEffect, useRef, useState } from 'react';
import { Group, Rect } from 'react-konva';
import { useSpring, animated } from 'react-spring';

type MachineProps = {} & NodeConfig;

const OPACITY_END = 0.2;

const Machine: React.FC<MachineProps> = props => {
  const centerRectRef = useRef<RectInstance>(null);
  const animProps = useSpring<any>({
    from: {
      opacity: 1,
    },
    // to: async (next: any) => {
    //   while (1) {
    //     await next({ opacity: 0 });
    //     await next({ opacity: 1 });
    //   }
    // },
  });

  const stockWidth = 3;
  const centerRectWidth = 100;
  const mainColor = '#3399FF';

  const publicProps: RectConfig = {
    stroke: '#3399FF',
    strokeWidth: stockWidth,
    offsetX: -(stockWidth / 2),
    offsetY: -(stockWidth / 2),
  };

  useEffect(() => {}, []);

  const AnimatedRect = animated(Rect);

  return (
    <Group {...props}>
      <Rect
        width={60}
        height={20}
        x={(centerRectWidth - 60) / 2}
        {...publicProps}
      />
      <AnimatedRect
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
        ref={centerRectRef}
        opacity={animProps.opacity}
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

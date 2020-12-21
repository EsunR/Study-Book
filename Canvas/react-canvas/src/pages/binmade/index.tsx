import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Layer, Stage, Rect, Circle, Group } from 'react-konva';
import Header from './components/Header';
import Machine from './components/Machine';
import styles from './index.less';
import { useSpring, animated } from 'react-spring';
import MachineView, { IMachine } from './components/MachineView';

const statusArr = new Array(10).fill({
  wind: {
    current: 1750,
  },
  temperature: {
    current: 1750,
    setting: 195,
  },
});

const mockData: IMachine[] = [
  {
    machine_name: '1#定型机',
    status: statusArr,
  },
  {
    machine_name: '2#定型机',
    status: statusArr,
  },
  {
    machine_name: '2#定型机',
    status: statusArr,
  },
];

const index = () => {
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);

  const scale = useMemo(() => {
    return canvasHeight / 1080;
  }, [canvasHeight]);

  const layerLayout = useMemo(() => {
    const width = 1920;
    const height = 1080;
    return {
      // width,
      height,
      x: (canvasWidth - width * scale) / 2,
      y: (canvasHeight - height * scale) / 2,
      scale: { x: scale, y: scale },
    };
  }, [canvasHeight, canvasWidth, scale]);

  function computeCanvasSize() {
    setCanvasHeight(window.innerHeight);
    setCanvasWidth(window.innerWidth);
  }

  // Effect
  useEffect(() => {
    window.addEventListener('resize', computeCanvasSize);
    return () => {
      window.removeEventListener('resize', computeCanvasSize);
    };
  }, []);

  return (
    <div className={styles.screen}>
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer {...layerLayout}>
          <Header />
        </Layer>
        <Layer {...layerLayout}>
          <MachineView machines={mockData} x={350} y={100} />
        </Layer>
      </Stage>
    </div>
  );
};

export default index;

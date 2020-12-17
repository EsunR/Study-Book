import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Layer, Stage, Rect, Circle, Group } from 'react-konva';
import Header from './components/Header';
import Machine from './components/Machine';
import styles from './index.less';
import { useSpring, animated } from 'react-spring';
import FuckingAnimTest from './components/FuckingAnimTest';

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
      width,
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

  function renderMachine() {
    const els: ReactElement[] = [];
    const wrapperWidth = layerLayout.width;
    const machineWidth = 100;
    const machineHeight = 140;
    const machineRowItem = 5;
    const machineXSpace =
      (wrapperWidth - machineWidth * machineRowItem) / (machineRowItem - 1);
    const machineYSpace = 20;
    for (let i = 0; i < 10; i++) {
      els.push(
        <Machine
          x={(machineWidth + machineXSpace) * (i % machineRowItem)}
          y={(machineHeight + machineYSpace) * Math.floor(i / 5)}
        />,
      );
    }
    return els;
  }

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
          <Group y={150}>{renderMachine()}</Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default index;

import React, { useEffect, useState } from 'react';
import { Layer, Stage, Rect, Circle } from 'react-konva';
import Machine from './components/Machine';

const index = () => {
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);

  function computeCanvasSize() {
    setCanvasHeight(window.innerHeight);
    setCanvasWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', computeCanvasSize);
    return () => {
      window.removeEventListener('resize', computeCanvasSize);
    };
  }, []);

  return (
    <Stage width={canvasWidth} height={canvasHeight}>
      <Layer c>
        <Machine />
      </Layer>
    </Stage>
  );
};

export default index;

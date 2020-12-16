import React, { useEffect } from 'react';
import { Layer, Stage, Rect, Circle } from 'react-konva';
import Machine from './components/Machine';

const index = () => {
  useEffect(() => {}, []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect width={50} height={50} fill="red" />
        <Circle x={200} y={200} stroke="black" radius={50} />
        <Machine />
      </Layer>
    </Stage>
  );
};

export default index;

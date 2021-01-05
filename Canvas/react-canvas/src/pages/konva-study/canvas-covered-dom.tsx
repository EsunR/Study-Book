import React from 'react';
import { Layer, Rect, Stage } from 'react-konva';

const canvasCoveredDom = () => {
  const box = ['a', 'b', 'c', 'd'];

  return (
    <>
      <div>
        {box.map((item, index) => (
          <div
            key={index}
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'pink',
              margin: 10,
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <Stage
        width={200}
        height={200}
        style={{ position: 'absolute', left: 0, top: 0 }}
      >
        <Layer>
          <Rect width={100} height={100} fill="pink" cornerRadius={10} />
        </Layer>
      </Stage>
    </>
  );
};

export default canvasCoveredDom;

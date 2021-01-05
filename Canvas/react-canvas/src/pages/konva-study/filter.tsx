import Konva from 'konva';
import { Image as ImageInstance } from 'konva/types/shapes/Image';
import React, { useEffect, useRef } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import CanvasImage from '../shiping-machine/components/subcomponents/CanvasImage';

const filter = () => {
  const imageRef = useRef<ImageInstance>(null);

  return (
    <>
      <button
        onClick={() => {
          if (imageRef.current) {
            imageRef.current.blurRadius(100);
            const layer = imageRef.current.getLayer();
            if (layer) {
              layer.batchDraw();
            }
          }
        }}
      >
        改变
      </button>
      <Stage width={500} height={500}>
        <Layer>
          <CanvasImage
            ref={imageRef}
            source={require('@/assets/jianliangji.png')}
            filters={[Konva.Filters.Blur]}
            blurRadius={10}
            onImageLoaded={imageInstance => {
              imageInstance.cache();
              const layer = imageInstance.getLayer();
              if (layer) {
                layer.batchDraw();
              }
            }}
          />
        </Layer>
      </Stage>
    </>
  );
};

export default filter;

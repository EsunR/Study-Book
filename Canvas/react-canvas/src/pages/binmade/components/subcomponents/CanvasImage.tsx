import { Image as ImageInstance, ImageConfig } from 'konva/types/shapes/Image';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';

type CanvasImageProps = {
  source: string;
} & Partial<ImageConfig>;

const CanvasImage = React.forwardRef<ImageInstance, CanvasImageProps>(
  (props, ref) => {
    const { source, ...resetImageProps } = props;

    const [headerBgImg, setHeaderBgImage] = useState<HTMLImageElement>();
    const loadImage = () => {
      const imgSrc = source;
      const img = new window.Image();
      img.src = imgSrc;
      img.addEventListener('load', () => {
        setHeaderBgImage(img);
      });
    };

    useEffect(() => {
      loadImage();
    }, []);

    return <Image ref={ref} image={headerBgImg} {...resetImageProps} />;
  },
);

export default CanvasImage as React.FC<CanvasImageProps>;

import { Image as ImageInstance, ImageConfig } from 'konva/types/shapes/Image';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Image } from 'react-konva';

type CanvasImageProps = {
  source: string;
  // image 实例生成或改变时调用，会将 Konva.Image 实例作为第一个参数传出。该方法可以在改变图片滤镜时进行缓存与重绘等。
  onImageLoaded?: (imageInstance: ImageInstance) => void; 
} & Partial<ImageConfig>;

const CanvasImage = React.forwardRef<ImageInstance, CanvasImageProps>(
  (props, ref) => {
    const { source, onImageLoaded, ...resetImageProps } = props;
    const [image, setImage] = useState<HTMLImageElement>();
    const imageRef = useRef<ImageInstance>(null);

    // 挂载 Ref
    useImperativeHandle(ref, () => {
      return imageRef.current as ImageInstance;
    });

    const loadImage = () => {
      const imgSrc = source;
      const img = new window.Image();
      img.src = imgSrc;
      img.addEventListener('load', () => {
        setImage(img);
      });
    };

    useEffect(() => {
      loadImage();
    }, [source]);

    useEffect(() => {
      if (typeof onImageLoaded === 'function' && imageRef.current) {
        onImageLoaded(imageRef.current);
      }
    }, [image]);

    return <Image ref={imageRef} image={image} {...resetImageProps} />;
  },
);

export default CanvasImage as React.FC<CanvasImageProps>;

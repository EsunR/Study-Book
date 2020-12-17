import { Text as TextInstance } from 'konva/types/shapes/Text';
import React, {
  LegacyRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Group,
  Rect,
  Shape,
  KonvaNodeComponent,
  Image,
  Text,
} from 'react-konva';

const Header = () => {
  const [headerBgImg, setHeaderBgImage] = useState<HTMLImageElement>();
  const textRef = useRef<TextInstance>(null);

  function loadImage() {
    const imgSrc = require('@/assets/title_bg.png');
    const img = new window.Image();
    img.src = imgSrc;
    img.addEventListener('load', () => {
      setHeaderBgImage(img);
    });
  }

  useEffect(() => {
    loadImage();
    if (textRef.current) {
      const textWidth = textRef.current.getWidth();
      textRef.current.offsetX(textWidth / 2);
    }
  }, []);

  return (
    <Group>
      <Image image={headerBgImg} width={1920} height={100} />
      <Text
        text="BinMade纺织智能制造平台"
        fill="#FFFFFF"
        fontSize={30}
        align="center"
        ref={textRef}
        x={1920 / 2}
        y={30}
      />
    </Group>
  );
};

export default Header;

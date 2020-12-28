import { Text as TextInstance } from 'konva/types/shapes/Text';
import React, { useEffect, useRef, useState } from 'react';
import { Group, Image, Text } from 'react-konva';
import ScreenTheme from '../localfiles/theme';

const Header = () => {
  const [headerBgImg, setHeaderBgImage] = useState<HTMLImageElement>();
  const textRef = useRef<TextInstance>(null);

  function loadImage() {
    const imgSrc = require('@/assets/dingxingji_title_bg.png');
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
      <Image image={headerBgImg} width={1920} height={50} y={32} />
      <Text
        text="定型机智能监控"
        fill={ScreenTheme.normal}
        fontSize={30}
        align="center"
        ref={textRef}
        x={1920 / 2}
        y={25}
      />
    </Group>
  );
};

export default Header;

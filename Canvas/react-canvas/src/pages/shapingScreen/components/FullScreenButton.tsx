import React, { useEffect, useState } from 'react';
import { Group } from 'react-konva';
import { NodeConfig } from 'konva/types/Node';
import CanvasImage from './subcomponents/CanvasImage';
import { toggleFullScreen } from '../controller';

const FullScreenButton: React.FC<NodeConfig> = props => {
  const { ...resetNodeProps } = props;
  const [isFull, setIsFull] = useState<boolean>(!!document.fullscreenElement);

  const checkIsFullScreen = () => {
    if (document.fullscreenElement) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', checkIsFullScreen);
    return () => {
      document.removeEventListener('fullscreenchange', checkIsFullScreen);
    };
  }, []);

  return (
    <Group {...resetNodeProps}>
      <CanvasImage
        onClick={toggleFullScreen}
        source={require('@/assets/exit_full_screen.png')}
        width={16}
        height={16}
        opacity={isFull ? 1 : 0}
      />
      <CanvasImage
        onClick={toggleFullScreen}
        source={require('@/assets/full_screen.png')}
        width={16}
        height={16}
        opacity={isFull ? 0 : 1}
      />
    </Group>
  );
};

export default FullScreenButton;

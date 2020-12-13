import React from 'react';
import { Canvas } from 'react-three-fiber';
import Box from './components/Box';

const Demo = () => {
  return (
    <Canvas
      colorManagement
      style={{ width: '100%', height: '100%' }}
      camera={{
        fov: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000,
        position: [5, 5, 10],
      }}
    >
      <axesHelper />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 1, 0]} />
      <Box position={[1.2, -1, 0]} />
    </Canvas>
  );
};

export default Demo;

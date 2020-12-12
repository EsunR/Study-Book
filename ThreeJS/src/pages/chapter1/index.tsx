import React, { useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { MeshBasicMaterial } from 'three';

const Chapter1 = () => {
  const render = useRef<any>();

  return (
    <Canvas
      camera={{
        fov: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000,
        position: [-30, 40, 30],
      }}
    >
      <axesHelper args={[20]} />
      <mesh position={[15, 0, 0]} rotation={[-0.5 * Math.PI, 0, 0]}>
        <planeGeometry args={[60, 20, 1, 1]} attach="geometry" />
        <meshBasicMaterial color={0xcccccc} attach="material" />
      </mesh>

      <mesh position={[-4, 4, 0]}>
        <boxGeometry args={[4, 4, 4]} attach="geometry" />
        <meshBasicMaterial
          color={0xff0000}
          wireframe={true}
          attach="material"
        />
      </mesh>
      <mesh position={[20, 4, 2]}>
        <sphereGeometry args={[4, 20, 20]} attach="geometry" />
        <meshBasicMaterial
          color={0xff0000}
          wireframe={true}
          attach="material"
        />
      </mesh>
    </Canvas>
  );
};

export default Chapter1;

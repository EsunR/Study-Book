/**
 * 导入 obj 文件
 */
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import objFile from '@/assets/models/pinecone.obj';

const Demo = () => {
  function render() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xaaaaff));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    // position and point the camera to the center of the scene
    camera.position.x = 130;
    camera.position.y = 40;
    camera.position.z = 50;
    camera.lookAt(scene.position);
    scene.add(camera);

    // add spotlight for the shadows
    var spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position.set(30, 40, 50);
    spotLight.intensity = 1;
    scene.add(spotLight);

    // add the output of the renderer to the html element
    (document.getElementById('WebGL-output') as HTMLElement).appendChild(
      webGLRenderer.domElement,
    );

    // 加载模型
    const loader = new OBJLoader();
    loader.load(objFile, loadedMesh => {
      const material = new THREE.MeshLambertMaterial({ color: '#5c3a21' });
      loadedMesh.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
          child.geometry.computeFaceNormals();
          child.geometry.computeVertexNormals();
        }
      });
      loadedMesh.scale.set(100, 100, 100);
      loadedMesh.rotation.x = -0.3;
      scene.add(loadedMesh);
      webGLRenderer.render(scene, camera);
    });

    webGLRenderer.render(scene, camera);
  }

  useEffect(() => {
    render();
  }, []);

  return (
    <>
      <div id="WebGL-output"></div>
    </>
  );
};

export default Demo;

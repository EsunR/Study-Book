/**
 * 导入 json 文件
 */
import React, { useEffect } from 'react';
import * as THREE from 'three';
const jsonObj = require('@/assets/models/misc_chair01.json');

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
    webGLRenderer.setClearColor(new THREE.Color('#eeeeee'));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 50;
    camera.lookAt(new THREE.Vector3(0, 10, 0));

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 50, 30);
    spotLight.intensity = 2;
    scene.add(spotLight);

    // add the output of the renderer to the html element
    (document.getElementById('WebGL-output') as HTMLElement).appendChild(
      webGLRenderer.domElement,
    );

    // 加载模型
    const loader = new THREE.ObjectLoader();

    const loadedMesh = loader.parse(jsonObj);

    loadedMesh.scale.x = 10;
    loadedMesh.scale.y = 10;
    loadedMesh.scale.z = 10;

    scene.add(loadedMesh);

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

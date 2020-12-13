/**
 * 添加材质、光源和阴影效果
 */
import React, { useEffect } from 'react';
import * as THREE from 'three';

const Demo_02: React.FC<any> = () => {
  function renderWebGl() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(
      45, // 观察距离
      window.innerWidth / window.innerHeight, // 摄像机视锥体长宽比
      0.1, // 摄像机视锥体近端面
      1000, // 摄像机视锥体远端面
    );

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();
    // //renderer.setClearColorHex();
    renderer.setClearColor(new THREE.Color('#eeeeee'));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // show axes in the screen
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    // Lambert 网格材质
    // 该材质使用基于非物理的Lambertian模型来计算反射率。 这可以很好地模拟一些表面（例如未经处理的木材或石材），但不能模拟具有镜面高光的光泽表面（例如涂漆木材）。
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true; // 接收阴影

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    // add the plane to the scene
    scene.add(plane);

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: '#ff0000' });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true; // 发出投影

    // position the cube
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    // add the cube to the scene
    scene.add(cube);

    // create a sphere
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({ color: '#7777ff' });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true; // 发出投影

    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;

    // add the sphere to the scene
    scene.add(sphere);

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // 添加光源
    var spotLight = new THREE.SpotLight('#ffffff');
    spotLight.position.set(-40, 60, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // add the output of the renderer to the html element
    var el = (document.getElementById('webgl') as HTMLElement).appendChild(
      renderer.domElement,
    );

    // render the scene
    renderer.render(scene, camera);
  }

  useEffect(() => {
    renderWebGl();
  }, []);

  return (
    <>
      <div id="webgl"></div>
      <div id="Stats-output"></div>
    </>
  );
};

export default Demo_02;

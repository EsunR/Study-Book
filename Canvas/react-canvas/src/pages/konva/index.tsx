import Konva from 'konva';
import { Circle } from 'konva/types/shapes/Circle';
import React, { useEffect } from 'react';
import { useSpring } from 'react-spring';

const index = () => {
  const animProps = useSpring<any>({
    from: {
      opacity: 1,
    },
    to: async (next: any) => {
      while (1) {
        await next({ opacity: 0 });
        await next({ opacity: 1 });
      }
    },
  });

  function render() {
    // first we need to create a stage
    var stage = new Konva.Stage({
      container: 'container', // id of container <div>
      width: 1900,
      height: 1000,
    });

    // then create layer
    var layer = new Konva.Layer();

    // add the shape to the layer

    const circles: Circle[] = [];

    for (let i = 0; i < 100; i++) {
      var circle = new Konva.Circle({
        x: 100 + i * 60,
        y: 100,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
        opacity: 0,
      });
      circles.push(circle);
      layer.add(circle);
    }

    // add the layer to the stage
    stage.add(layer);

    // draw the image
    layer.draw();

    let currentOpacity = 0;

    var anim = new Konva.Animation(function(frame) {
      for (let i = 0; i <= circles.length; i++) {
        if (circles[i] && circles[i].opacity && currentOpacity <= 1) {
          circles[i].opacity(currentOpacity);
        }
      }
      // currentOpacity += 0.1;
      // if (currentOpacity >= 1) {
      //   currentOpacity = 0;
      // }
    }, layer);

    // anim.start();
  }

  useEffect(() => {
    render();
  }, []);

  return <div id="container"></div>;
};

export default index;

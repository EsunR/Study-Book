import React from 'react';
import { animated, useSpring } from 'react-spring';

const FuckingAnimTest = () => {
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

  return (
    <animated.div
      style={{
        backgroundColor: 'pink',
        width: 100,
        height: 100,
        opacity: animProps.opacity,
      }}
    ></animated.div>
  );
};

export default FuckingAnimTest;

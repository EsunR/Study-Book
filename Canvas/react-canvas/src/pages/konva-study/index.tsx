import React from 'react';
import { Link, useLocation } from 'umi';

const index = () => {
  const location = useLocation();
  const part = [
    {
      url: 'anim',
      name: '动画',
    },
    {
      url: 'filter',
      name: '滤镜',
    },
    {
      url: "canvas-covered-dom",
      name: "canvas覆盖于dom之上"
    }
  ];

  return (
    <>
      <h1>Konva study</h1>
      <ul>
        {part.map(item => (
          <li key={item.url}>
            <Link to={`${location.pathname}/${item.url}`}>
              {item.url}: {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default index;

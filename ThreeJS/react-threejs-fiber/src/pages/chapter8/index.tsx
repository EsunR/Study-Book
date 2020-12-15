import React from 'react';
import { Link, useLocation } from 'umi';

const index = () => {
  const location = useLocation();
  const part = [
    {
      url: '8.1.5',
      name: '导入json',
    },
    {
      url: '8.1.6',
      name: '导入OJB',
    },
    {
      url: '8.1.6_2',
      name: '导入MTL',
    },
  ];

  return (
    <>
      <h1>第8章</h1>
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

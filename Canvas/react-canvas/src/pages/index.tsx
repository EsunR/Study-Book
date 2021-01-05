import React from 'react';
import styles from './index.less';
import { Link } from 'umi';

export default () => {
  const menus = ['konva-study'];

  return (
    <div className={styles.home}>
      <h1 className="home-title">Welcome to React Three fiber demo</h1>
      <ul>
        {menus.map(item => (
          <li>
            <Link to={`/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

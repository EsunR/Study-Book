import React from 'react';
import styles from './index.less';
import { Link } from 'umi';

export default () => {
  const menus = ['demo', 'chapter1', 'chapter8'];

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

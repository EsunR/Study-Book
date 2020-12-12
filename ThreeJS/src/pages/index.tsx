import React from 'react';
import styles from './index.less';
import { Link } from 'umi';

export default () => {
  return (
    <div className={styles.home}>
      <h1 className="home-title">Welcome to React Three fiber demo</h1>
      <ul>
        <li>
          <Link to="/demo">Demo</Link>
        </li>
        <li>
          <Link to="/chapter1">Chapter1</Link>
        </li>
      </ul>
    </div>
  );
};

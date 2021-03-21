import { Select } from 'antd';
import React from 'react';
import styles from './index.less';

export default () => {
  return (
    <>
      <div>
        <h1 className={styles.title}>Page index</h1>
        <Select mode="multiple" options={[{ label: 1, value: 1 }]} />
      </div>
    </>
  );
};

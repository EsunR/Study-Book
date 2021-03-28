import Loadable from 'react-loadable';
import React from 'react'
// import Loading from './my-loading-component';

const LoadableComponent = Loadable({
  loader: () => import('./index.js'),
  // loading为加载时显示的内容
  loading() {
    return <div>正在加载</div>
  },
});

export default () => <LoadableComponent />


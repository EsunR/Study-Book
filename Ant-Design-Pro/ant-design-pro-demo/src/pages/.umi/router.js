import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from 'D:/Study/ant-design-pro/src/pages/.umi/LocaleWrapper.jsx';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: require('../user/login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('D:/Study/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: require('../../layouts/SecurityLayout').default,
    routes: [
      {
        path: '/',
        component: require('../../layouts/BasicLayout').default,
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
            exact: true,
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: require('../Welcome').default,
            exact: true,
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: require('../Admin').default,
            authority: ['admin'],
            exact: true,
          },
          {
            component: require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('D:/Study/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('D:/Study/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('D:/Study/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}

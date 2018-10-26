/*
 * @Author: Edlan
 * @Date: 2018-10-22 17:53:45
 * @Description: 将路由配置转换成react-router4可用的组件
 */
import React from 'react';
import { Route } from 'react-router';
import { splitObject } from './commons'

export default function renderRoutes(routes, base_url = '') {
  return routes.reduce((arr, route) => {
    if (route.childRoutes) {
      const path = base_url ? `${base_url}/${route.path}` : route.path;
      route.path = path;
      arr.push(
        ...renderRoutes(
          [splitObject(route, 'childRoutes'), ...route.childRoutes],
          path
        )
      );
      return arr;
    } else {
      const path = route.path
        ? base_url
          ? route.root
            ? `/${route.path}`
            : `/${base_url}/${route.path}`
          : route.path === '/'
            ? '/'
            : `/${route.path}`
        : null;
      arr.push(
        <Route
          key={path}
          exact={route.exact}
          render={
            route.render
              ? route.render
              : props => {
                if (route.top) {
                  toWindowTop();
                }
                return <route.component {...props} />;
              }
          }
          {...path ? { path } : {}}
        />
      );
      return arr;
    }
  }, []);
}
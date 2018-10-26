/*
 * @Author: Edlan
 * @Date: 2018-10-23 18:12:58
 * @Description: 路由的配置与处理导出，业务复杂了，将此文件分解
 */
import React from 'react';
import Loadable from 'react-loadable';
import { Redirect } from 'react-router-dom'
import LoadingComponent from './components/LoadingComponent';

const commonLoadableConfig = {
  loading: LoadingComponent,
  delay: 200
};

const AsyncHome = Loadable(Object.assign(commonLoadableConfig,{
  loader: () => import('./containers/Home')
}));
const AsyncTable = Loadable(Object.assign(commonLoadableConfig,{
  loader: () => import('./containers/Table')
}));
const AsyncTableClientForm = Loadable(Object.assign(commonLoadableConfig,{
  loader: () => import('./containers/Table/ClientForm')
}));
const AsyncOther = Loadable(Object.assign(commonLoadableConfig,{
  loader: () => import('./containers/Other')
}));

const routesConfig = [
  {
    name: '首页',
    path: '/home',
    code: 'home',
    component: AsyncHome,
    exact: true,
  },
  {
    name: '基础资料',
    path: '/basis',
    code: 'basis',
    render: () => <Redirect from='/basis' to='/basis/table' />,
    exact: true,
    children: [
      {
        name: '表格',
        path: '/table',
        code: 'table',
        component: AsyncTable,
        exact: true,
        children: [
          {
            name: '新增',
            path: '/new',
            code: 'table-new',
            component: AsyncTableClientForm,
            exact: true
          },
          {
            name: '查看',
            path: '/check/:id',
            code: 'table-check',
            component: AsyncTableClientForm,
            exact: true
          },
          {
            name: '编辑',
            path: '/edit/:id',
            code: 'table-update',
            component: AsyncTableClientForm,
            exact: true
          },
        ]
      },
      {
        name: '其他',
        path: '/other',
        code: 'other',
        component: AsyncOther
      }
    ]
  }
];

const routes = [];
const breadcrumbNameMap = {};
function getRoutes(routesConfig, rootPath='') {
  routesConfig.forEach(v => {
    v.path = rootPath + v.path;
    if(v.children) getRoutes(v.children, v.path);
    delete v.children;
    breadcrumbNameMap[v.path] = v.name;
    delete v.name;
    routes.push(v);
  });
}
getRoutes(routesConfig);
export { breadcrumbNameMap };
export default routes;



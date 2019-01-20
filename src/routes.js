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
  delay: 200,
};

const AsyncHome = Loadable(Object.assign(commonLoadableConfig,{
  loader: () => import('./pages/Home'),
}));
const AsyncTable = Loadable(Object.assign(commonLoadableConfig,{
  loader: () => import('./pages/Table'),
}));
const AsyncTableClientForm = Loadable(Object.assign(commonLoadableConfig,{
  loader: () => import('./pages/Table/ClientForm'),
}));
const AsyncOther = Loadable(Object.assign(commonLoadableConfig,{
  loader: () => import('./pages/Other'),
}));

const routesConfig = [
  {
    name: '工作台',
    code: 'dashboard',
    showBreadcrumb: false,
    component: AsyncHome
  },
  {
    name: '页面',
    code: 'basis',
    render: () => <Redirect from='/basis' to='/basis/nomalList' />,
    children: [
      {
        name: '普通列表',
        code: 'nomalList',
        component: AsyncTable,
        children: [
          {
            name: '新增',
            code: 'nomalListNew',
            component: AsyncTableClientForm,
            path: 'new'
          },
          {
            name: '修改',
            code: 'nomalListEdit',
            component: AsyncTableClientForm,
            path: 'edit'
          },
        ]
      },
    ],
  },
  {
    name: '设置',
    code: 'system',
    render: () => <Redirect from='/system' to='/system/user' />,
    children: [
      {
        name: '个人资料',
        code: 'user',
        component: AsyncTable,
      },
      {
        name: '修改密码',
        code: 'changepwd',
        component: AsyncTable,
      },
    ],
  },
];

const routes = [];
const breadcrumbNameMap = {};
function getRoutes(routesConfig, rootPath='') {
  routesConfig.forEach(v => {
    // path可省略
    v.path = rootPath + '/' + (v.path || v.code);
    v.exact = (v.exact !== false); // exact 默认为true
    if(v.children) getRoutes(v.children, v.path);
    delete v.children;
    if (v.showBreadcrumb !== false) {
      breadcrumbNameMap[v.path] = v.name;
    }
    delete v.name;
    routes.push(v);
  });
}
getRoutes(routesConfig);
export { breadcrumbNameMap };
export default routes;



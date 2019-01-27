/*
 * @Author: Edlan
 * @Date: 2018-10-23 18:12:58
 * @Description: 路由的配置与处理导出，业务复杂了，将此文件分解
 */
import React from 'react';
import Loadable from 'react-loadable';
import { Redirect } from 'react-router-dom'
import LoadingComponent from './components/LoadingComponent';
import AuthCode, { HOME } from 'constants/authCode'

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
const AsyncComplexTable = Loadable(Object.assign(commonLoadableConfig,{
  loader: () => import('./pages/ComplexTable'),
}));

const routesConfig = [
  {
    name: '工作台',
    code: AuthCode.dashboard.code,
    showBreadcrumb: false,
    component: AsyncHome
  },
  {
    name: '页面',
    code: AuthCode.basis.code,
    exceptInTagBar: true,
    render: () => <Redirect from='/basis' to='/basis/nomalList' />,
    children: [
      {
        name: '普通列表',
        code: AuthCode.basis.nomalList.code,
        component: AsyncTable,
      },
      {
        name: '复杂列表',
        code: AuthCode.basis.complexList.code,
        component: AsyncComplexTable,
        children: [
          {
            name: '查看',
            path: '/check/:id',
            code: AuthCode.basis.complexList.complexListNew.code,
            component: AsyncTable,
          },
          {
            name: '新增',
            path: '/new',
            code: AuthCode.basis.complexList.complexListNew.code,
            component: AsyncTable,
          },
          {
            name: '修改',
            path: '/update/:id',
            code: AuthCode.basis.complexList.complexListEdit.code,
            component: AsyncTable,
          },
        ]
      },
    ],
  },
  {
    name: '设置',
    code: AuthCode.system.code,
    exceptInTagBar: true,
    render: () => <Redirect from='/system' to='/system/user' />,
    children: [
      {
        name: '个人资料',
        code: AuthCode.system.user.code,
        component: AsyncTable,
      },
      {
        name: '修改密码',
        code: AuthCode.system.changepwd.code,
        component: AsyncTable,
      },
    ],
  },
];

const routes = [];
const breadcrumbNameMap = {};
function getRoutes(routesConfig, rootPath='') {
  routesConfig.forEach(v => {
    // path可省略,若省略，则默认'/' + code
    v.path = rootPath + (v.path || `/${v.code}`);
    // exact 默认为true
    v.exact = (v.exact !== false);
    if(v.children) getRoutes(v.children, v.path);
    delete v.children;
    if (v.showBreadcrumb !== false) {
      breadcrumbNameMap[v.path] = v.name;
    }
    // delete v.name;
    routes.push(v);
  });
}
getRoutes(routesConfig);
const checkIsHome = code => code === HOME;
export { breadcrumbNameMap, checkIsHome };
export default routes;



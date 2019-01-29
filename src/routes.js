/*
 * @Author: Edlan
 * @Date: 2018-10-23 18:12:58
 * @Description: 路由的配置与处理导出，业务复杂了，将此文件分解
 */
import React from 'react';
import Loadable from 'react-loadable';
import pathToRegexp from 'path-to-regexp'
import { Redirect } from 'react-router-dom'
import LoadingComponent from './components/LoadingComponent';
import AuthCode, { HOME } from 'constants/authCode'
import { OPERATE_ITEM } from 'constants/config'
import { memoize } from 'utils/common'

const withLoadable = path => Loadable({
  delay: 200,
  loading: LoadingComponent,
  loader: () => import('./' + path)
});

const AsyncHome = withLoadable('pages/Home');
const AsyncTable = withLoadable('pages/Table');
const AsyncComplexTable = withLoadable('pages/ComplexTable');
const AsyncComplexTableClientForm = withLoadable('pages/ComplexTable/ClientForm');
const AsyncUserInfo = withLoadable('pages/UserInfo');
const AsyncChangePwd = withLoadable('pages/ChangePwd');

/**
 * code： 权限判断字段
 * exceptInTagBar： 不展示在tagBar吗
 * name: 路由的title，用于tagBar，以及页面上title位的备用项
 */
const routesConfig = [
  {
    name: '工作台',
    code: AuthCode.dashboard.code,
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
            name: OPERATE_ITEM.check.title,
            exceptInTagBar: true,
            path: `/${OPERATE_ITEM.check.code}/:id`,
            code: AuthCode.basis.complexList.complexListNew.code,
            component: AsyncComplexTableClientForm,
          },
          {
            name: OPERATE_ITEM.add.title,
            exceptInTagBar: true,
            path: `/${OPERATE_ITEM.add.code}`,
            code: AuthCode.basis.complexList.complexListNew.code,
            component: AsyncComplexTableClientForm,
          },
          {
            name: OPERATE_ITEM.update.title,
            exceptInTagBar: true,
            path: `/${OPERATE_ITEM.update.code}/:id`,
            code: AuthCode.basis.complexList.complexListEdit.code,
            component: AsyncComplexTableClientForm,
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
        component: AsyncUserInfo,
      },
      {
        name: '修改密码',
        code: AuthCode.system.changepwd.code,
        component: AsyncChangePwd,
      },
    ],
  },
];

// 迭代算法将路由展开
function walkRoutes(data, cb) {
  let iterations = data.map((target) => {
    target.exact = (target.exact !== false);
    return { rootPath: '', target};
  });
  let current;
  const mapCallback = (target) => {
    target.exact = (target.exact !== false);
    return { rootPath: current.rootPath + (current.target.path || `/${current.target.code}`), target }
  };
  while(((current = iterations.pop()), current)) {
    const result = cb(current.target, current.rootPath);
    if(result !== undefined) return result;
    if(current.target.children) {
      const openChildList = current.target.children.map(mapCallback);
      iterations = iterations.concat(openChildList);
    }
  }
}

// const breadcrumbNameMap = {};
const routes = [];
walkRoutes(routesConfig, (route, rootPath) => {
  const path = rootPath + (route.path || `/${route.code}`);
  const { children, ...routeItem } = route;
  routes.unshift({...routeItem, path});
})
// 通过code判断是否为首页
const checkIsHome = code => code === HOME;
// 通过path获取路由信息
const findRouteByPath = memoize(path => routes.find(
  route => pathToRegexp(route.path).test(path)
), rest => rest[0])

export { findRouteByPath, checkIsHome };
export default routes;



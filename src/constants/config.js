/*
 * @Author: Edlan
 * @Date: 2018-10-29 18:56:32
 * @Description: 静态配置，防止硬编码
 */

// 项目名，显示在菜单上方
export const TITLE = "仓储后台管理中心";
// 菜单项的field配置
export const RESOURCE_FIELDNAMES = {
  code: 'resourceCode',
  name: 'resourceName',
  type: 'resourceType',
  icon: 'icon'
};
// cookie过期时间
export const COOKIE_EXPIRE = 10; // days
// 默认的分页配置
export const INIT_SEARCH_CRITERIA = {
  currentPage: 1,
  pageSize: 10,
};
// Header上的快捷入口
export const shortcut = [{
  name: '快捷方式1',
  path: '/'
},{
  name: '快捷方式2',
  path: '/basis'
},{
  name: '快捷方式3',
  path: '/xxx'
},{
  name: '快捷方式4',
  path: '/ffff'
}];
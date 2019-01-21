import { METHOD } from './dict';

// const commonUrlFrag = 'http://localhost:3000'; // 自定义通用前缀
const commonUrlFrag = '/admin/'; // 自定义通用前缀
const getApi = (url, method = METHOD.GET) => ({ url: commonUrlFrag + url, method });

export const BAIDU_WEATHER = {
  url: 'http://api.map.baidu.com/telematics/v3/weather',
  method: METHOD.GET
};

export const TABLE_LIST = getApi('table/list');
export const TABLE_NEW = getApi('table/new',METHOD.POST);
export const TABLE_UPDATE = getApi('table/update',METHOD.POST);
export const TABLE_REMOVE = getApi('table/delete',METHOD.POST);

// 登录
export const LOGIN = getApi('auth/form', METHOD.POST);
// 退出登录
export const LOGOUT = getApi('auth/logout', METHOD.POST);
export const GET_RESOURCE = getApi('resource/listOfUser'); // 获取登录用户的权限列表
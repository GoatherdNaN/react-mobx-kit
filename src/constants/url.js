import { METHOD } from './config';

// const commonUrlFrag = 'http://localhost:3000'; // 自定义通用前缀
const commonUrlFrag = '/api'; // 自定义通用前缀
const getApi = (url, method = METHOD.GET) => ({ url: commonUrlFrag + url, method });

export const LIST = getApi('/list');
export const TABLE_LIST = getApi('/listAll');
export const TABLE_GET_BY_ID = getApi('/getById',METHOD.POST);
export const TABLE_NEW = getApi('/new',METHOD.POST);
export const TABLE_UPDATE = getApi('/update',METHOD.POST);

export const GET_RESOURCE = getApi('/listOfUser');
export const LOGIN = getApi('/login',METHOD.POST);
export const LOGOUT = getApi('/logout',METHOD.POST);

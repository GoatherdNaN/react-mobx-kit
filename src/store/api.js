import request from 'utils/request';
import * as URL from 'constants/url';

export function getList(params) {
  return request(URL.TABLE_LIST, params);
}
export function getById(params) {
  return request(URL.TABLE_GET_BY_ID, params);
}
export function update(params) {
  return request(URL.TABLE_UPDATE, params);
}
export function add(params) {
  return request(URL.TABLE_NEW, params);
}

export function getResource() {
  return request(URL.GET_RESOURCE);
}
export function login(params) {
  return request(URL.LOGIN, params);
}
export function logout() {
  return request(URL.LOGOUT);
}
export function getWeather(params={}) {
  return request(URL.BAIDU_WEATHER, {
    location: '北京',
    output: 'json',
    ak: '5slgyqGDENN7Sy7pw29IUvrZ',
    ...params
  }, false, true);
}

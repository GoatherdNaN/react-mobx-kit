import request from 'utils/request';
import * as URL from 'constants/url';

export function getList(params) {
  return request(URL.TABLE_LIST, params);
}
export function update(params) {
  return request(URL.TABLE_UPDATE, params);
}
export function add(params) {
  return request(URL.TABLE_NEW, params);
}
export function remove(params) {
  return request(URL.TABLE_REMOVE, params);
}
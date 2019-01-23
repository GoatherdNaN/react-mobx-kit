import request from 'utils/request';
import * as URL from 'constants/url';

export function getResource() {
  return request(URL.GET_RESOURCE);
}
export function login(params) {
  return request(URL.LOGIN, params);
}
export function logout() {
  return request(URL.LOGOUT);
}

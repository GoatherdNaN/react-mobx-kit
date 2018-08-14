import request from '../utils/request';
import * as URL from '../constants/url';

export function getInitTodos(params) {
  return request(URL.LIST, params);
}

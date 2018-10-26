import { authList } from './index'

const check = code => {
  return authList.includes(code)
};

const checkPermissions = (target, code, Exception) => check(code) ? target : Exception;

export { check };
export default checkPermissions;
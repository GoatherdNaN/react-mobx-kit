import storage from 'utils/storage'
import { formatTreeList } from 'utils/commons'

const authList = formatTreeList(storage.getJSONItem('authList'));
const check = code => {
  return authList.includes(code)
};

const checkPermissions = (target, code, Exception) => check(code) ? target : Exception;

export { check };
export default checkPermissions;
import storage from 'utils/storage'
import { formatTreeList } from 'utils/commons'

const checkPermissions = (code) => {
  const authList = formatTreeList(storage.getJSONItem('authList'));
  return authList.includes(code)
};

export default checkPermissions;
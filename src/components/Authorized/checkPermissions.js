import storage from 'utils/storage'
import { formatTreeList } from 'utils/common'

const checkPermissions = (code) => {
  const authList = formatTreeList(storage.getJSONItem('authList'));
  return authList.includes(code)
};

export default checkPermissions;
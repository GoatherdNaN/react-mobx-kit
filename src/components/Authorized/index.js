import { formatTreeList } from 'utils/commons'
import storage from 'utils/storage'

let authList = formatTreeList(storage.getJSONItem('authList'));
const reloadAuthList = authority => {
  authList = formatTreeList(authority);
};

export { authList };
export default reloadAuthList;
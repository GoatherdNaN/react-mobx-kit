import { message } from 'antd'
import { observable, flow, action, computed, toJS } from 'mobx'
import { login, getResource, logout } from './api'
import { formatTreeList } from 'utils/common'
import { RESOURCE_FIELDNAMES } from 'constants/config'
import GlobalStore from './GlobalStore'


// 991px设置为是否折叠菜单的临界值，可调
function initCollapsed(yardstick = 991) {
  // window._clientWidth 在utils/global.js中设置的全局变量
  const _clientWidth = window._clientWidth;
  if (_clientWidth && _clientWidth < yardstick) {
    return true
  }
  return false
}

function getInfoUrlByAuthList(authList, base='') {
  let infoUrl = base + '/' + authList[0][RESOURCE_FIELDNAMES.code];
  if (
    Array.isArray(authList[0].children) &&
    authList[0].children.length
  ) {
    infoUrl = getInfoUrlByAuthList(authList[0].children, infoUrl)
  }
  return infoUrl;
}

export default class LoginStore extends GlobalStore {
  @observable authList = [];
  @observable collapsed = initCollapsed();

  @action changeAuthList = authList => this.authList = authList;
  @action changeLayoutCollapsed = collapsed => this.collapsed = collapsed;

  @computed
  get authArr() {
    return formatTreeList(toJS(this.authList));
  };

  login = flow(function * (params,callback) {
    const { code, data } = yield login(params);
    if(code == 200) {
      this.changeAuthList(data.authList);
      if (!data.authList.length) {
        message.info('您还没有任何权限，请联系管理员！');
      } else if (typeof callback === 'function') {
        const intoUrl = getInfoUrlByAuthList(data.authList);
        callback(intoUrl, 'woshjtoken'||data.token);
      }
    }
  });

  getResource = flow(function * () {
    const { code, data } = yield getResource();
    code == 200 && this.changeAuthList(data);
  });

  logout = flow(function * (callback) {
    const { code } = yield logout();
    code == 200 && callback && callback();
  });
}

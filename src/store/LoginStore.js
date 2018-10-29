import { message } from 'antd'
import { observable, flow, action, computed, toJS } from 'mobx'
import { login, getResource, logout } from './api'
import { formatTreeList } from 'utils/common'

export default class LoginStore {
  @observable authList = [];
  @observable loading = false;
  @observable logoutLoading = false;

  constructor(initialState) {
    Object.assign(this, initialState);
  }

  @action changeLoading = loading => this.loading = loading;
  @action changeLogoutLoading = loading => this.logoutLoading = loading;
  @action changeAuthList = authList => this.authList = authList;

  @computed
  get authArr() {
    return formatTreeList(toJS(this.authList));
  };

  login = flow(function * (params,callback) {
    this.changeLoading(true);
    const res = yield login(params);
    try {
      this.changeAuthList(res.data.authList);
      const timer = setTimeout(() => {
        callback && callback(res.data.token);
        clearTimeout(timer);
      })
    } catch(e) {
      message.error(e);
    }
    this.changeLoading(false);
  });

  getResource = flow(function * () {
    const res = yield getResource();
    try {
      this.changeAuthList(res.data);
    } catch(e) {
      message.error(e);
    }
  });

  logout = flow(function * (callback) {
    this.changeLogoutLoading(true)
    const res = yield logout();
    if(res && res.code == 200 && callback) {
      callback();
    }
    this.changeLogoutLoading(false)
  });
}

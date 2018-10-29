import { message } from 'antd'
import { observable, flow, autorun, action } from 'mobx'
import storage from 'utils/storage'
import { login, getResource, logout } from './api'

export default class LoginStore {
  @observable authList = storage.getJSONItem('authList') || [];
  @observable loading = false;
  @observable logoutLoading = false;

  constructor(initialState) {
    Object.assign(this, initialState);
  }

  updateStorage = autorun(() => {
    storage.setItem('authListUD',new Date().getTime());
    storage.setJSONItem('authList',this.authList);
  });

  @action changeLoading = loading => this.loading = loading;
  @action changeLogoutLoading = loading => this.logoutLoading = loading;
  @action changeAuthList = authList => this.authList = authList;

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
      // this.updateStorage(); // 注销该autorun
      callback();
    }
    this.changeLogoutLoading(false)
  });
}

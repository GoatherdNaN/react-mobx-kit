import { message } from 'antd'
import { observable, flow, autorun } from 'mobx'
import { login, getResource, logout } from './api'
import reloadAuthList from 'components/Authorized'
import storage from 'utils/storage'

export default class LoginStore {
  @observable authList = storage.getJSONItem('authList') || [];
  @observable loading = false;
  @observable logoutLoading = false;

  constructor(initialState) {
    Object.assign(this, initialState);
  }

  updateStorage = autorun(() => {
    storage.setJSONItem('authList',this.authList);
    reloadAuthList(this.authList);
  });

  login = flow(function * (params,callback) {
    this.loading = true;
    const res = yield login(params);
    try {
      this.authList = res.data.authList;
      callback && callback(res.data.token);
    } catch(e) {
      message.error(e);
    }
    this.loading = false;
  });
  getResource = flow(function * () {
    const res = yield getResource();
    try {
      this.authList = res.data;
    } catch(e) {
      message.error(e);
    }
  });
  logout = flow(function * (callback) {
    this.logoutLoading = true;
    const res = yield logout();
    if(res && res.code == 200 && callback) {
      // this.updateStorage(); // 注销该autorun
      callback();
    }
    this.logoutLoading = false;
  });
}

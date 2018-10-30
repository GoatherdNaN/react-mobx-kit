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
    const { code, data } = yield login(params);
    if(code == 200) {
      this.changeAuthList(data.authList);
      callback && callback(data.token);
    }
    this.changeLoading(false);
  });

  getResource = flow(function * () {
    const { code, data } = yield getResource();
    code == 200 && this.changeAuthList(data);
  });

  logout = flow(function * (callback) {
    this.changeLogoutLoading(true)
    const { code } = yield logout();
    code == 200 && callback && callback();
    this.changeLogoutLoading(false)
  });
}

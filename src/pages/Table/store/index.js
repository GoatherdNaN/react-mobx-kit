import { observable, action, flow, extendObservable } from 'mobx'
import { getList, update, add } from 'store/api'
import GlobalStore from 'store/GlobalStore'

export default class TableStore extends GlobalStore {
  @observable list = [];
  @observable pagination = null;
  @observable singleData = null;

  @action saveListData = ({list,pagination}) => {
    this.list = list;
    this.pagination = pagination;
  }

  fetchList = flow(function * (params) {
    const { code, data } = yield getList(params);
    code == 200 && this.saveListData(data);
  });

  update = flow(function * (params,callback) {
    const { code } = yield update(params);
    code == 200 && callback && callback();
  });

  add = flow(function * (params,callback) {
    const { code } = yield add(params);
    code == 200 && callback && callback();
  });
}

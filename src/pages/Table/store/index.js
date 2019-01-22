import { observable, action, flow, extendObservable } from 'mobx'
import { getList, update, add } from 'store/api'
import GlobalStore from 'store/GlobalStore'

export default class TableStore extends GlobalStore {
  @observable listData = {
    list: [],
    pagination: null
  };

  @action saveListData = (listData) => {
    this.listData = listData;
  }

  fetchList = this.withLoading('loading')(
    flow(function* (params) {
      const { code, data } = yield getList(params);
      code == 200 && this.saveListData(data);
    })
  );

  update = this.withLoading('confirmLoading')(
    flow(function * (params,callback) {
      const { code } = yield update(params);
      code == 200 && callback && callback();
    })
  );

  add = this.withLoading('confirmLoading')(
    flow(function * (params,callback) {
      const { code } = yield add(params);
      code == 200 && callback && callback();
    })
  );
}

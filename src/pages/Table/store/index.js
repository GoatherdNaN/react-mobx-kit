import { message } from 'antd'
import { observable, action, flow, toJS } from 'mobx'
import GlobalStore from 'store/GlobalStore'
import { getList, update, add, remove } from './api'
import { SUCCESS_CODE, SUCCESS_INFO } from 'constants/config'

export default class TableStore extends GlobalStore {
  @observable searchCriteria = {};
  @observable listData = {
    list: [],
    pagination: null
  };

  @action saveListData = (listData) => {
    this.listData = listData;
  }
  @action saveSearchCriteria = (searchCriteria) => {
    this.searchCriteria = searchCriteria;
  }

  fetchList = this.withLoading('loading')(
    flow(function* (params) {
      this.saveSearchCriteria(params);
      const { code, data } = yield getList(params);
      code == SUCCESS_CODE && this.saveListData(data);
    })
  );

  add = this.withLoading('confirmLoading')(
    flow(function * (params,callback) {
      const { code } = yield add(params);
      if (code === SUCCESS_CODE) {
        message.info(SUCCESS_INFO.add);
        if (typeof callback === 'function') {
          callback();
        }
      }
    })
  );

  update = this.withLoading('confirmLoading')(
    flow(function * (params,callback) {
      const { code } = yield update(params);
      if (code === SUCCESS_CODE) {
        message.info(SUCCESS_INFO.update);
        if (typeof callback === 'function') {
          callback();
        }
      }
    })
  );

  remove = flow(function * (params,callback) {
    const { code } = yield remove(params);
    if (code === SUCCESS_CODE) {
      message.info(SUCCESS_INFO.remove);
      if (typeof callback === 'function') {
        callback();
      }
    }
  });

  getDataToJs = key => toJS(this[key])
}

import { message } from 'antd'
import { observable, action, flow } from 'mobx'
import { INIT_SEARCH_CRITERIA } from 'constants/config'
import { getList, getById, update, add } from './api'

export default class TableStore {
  @observable list = [];
  @observable searchCriteria = INIT_SEARCH_CRITERIA;
  @observable pagination = null;
  @observable loading = false;
  @observable singleData = null;
  @observable initFormLoading = false;
  @observable confirmLoading = false;

  constructor(initialState) {
    Object.assign(this, initialState);
  }

  @action
  updateSearchCriteria = params => this.searchCriteria = Object.assign(this.searchCriteria,params || {});
  @action
  initSearchCriteria = () => this.searchCriteria = INIT_SEARCH_CRITERIA;
  @action changeLoading = loading => this.loading = loading;
  @action changeInitFormLoading = loading => this.initFormLoading = loading;
  @action changeConfirmLoading = loading => this.confirmLoading = loading;
  @action saveListData = ({list,pagination}) => {
    this.list = list;
    this.pagination = pagination;
  }
  // @action
  saveSingleData = data => this.singleData = data;


  fetchList = flow(function * (params) {
    this.changeLoading(true);
    this.updateSearchCriteria(params);
    try {
      const res = yield getList(this.searchCriteria);
      this.saveListData(res.data);
    } catch(e) {
      message.error(e);
    }
    this.changeLoading(false);
  });

  fetchDataById = flow(function * (params) {
    this.changeInitFormLoading(true);
     try {
      const res = yield getById(params);
      // this.saveSingleData(res.data);
      this.singleData = res.data;
    } catch(e) {
      message.error(e);
    }
    this.changeInitFormLoading(false);
  });

  update = flow(function * (params,callback) {
    this.changeConfirmLoading(true);
     try {
      const res = yield update(params);
      res.code == 200 && callback && callback();
    } catch(e) {
      message.error(e);
    }
    this.changeConfirmLoading(false);
  });

  add = flow(function * (params,callback) {
    this.changeConfirmLoading(true);
     try {
      yield add(params);
      res.code == 200 && callback && callback();
    } catch(e) {
      message.error(e);
    }
    this.changeConfirmLoading(false);
  });
}

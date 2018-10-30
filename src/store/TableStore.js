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
  @action
  saveSingleData = data => this.singleData = data;


  fetchList = flow(function * (params) {
    this.changeLoading(true);
    this.updateSearchCriteria(params);
    const { code, data } = yield getList(this.searchCriteria);
    code == 200 && this.saveListData(data);
    this.changeLoading(false);
  });

  fetchDataById = flow(function * (params) {
    this.changeInitFormLoading(true);
    const { code, data } = yield getById(params);
    code == 200 && this.saveSingleData(data);
    this.changeInitFormLoading(false);
  });

  update = flow(function * (params,callback) {
    this.changeConfirmLoading(true);
    const { code } = yield update(params);
    code == 200 && callback && callback();
    this.changeConfirmLoading(false);
  });

  add = flow(function * (params,callback) {
    this.changeConfirmLoading(true);
    const { code } = yield add(params);
    code == 200 && callback && callback();
    this.changeConfirmLoading(false);
  });
}

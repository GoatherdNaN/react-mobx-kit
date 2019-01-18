import { observable, action, flow } from 'mobx'
import { INIT_SEARCH_CRITERIA } from 'constants/config'
import { getList, getById, update, add } from './api'
import GlobalStore from './GlobalStore'

export default class TableStore extends GlobalStore {
  @observable list = [];
  @observable searchCriteria = INIT_SEARCH_CRITERIA;
  @observable pagination = null;
  @observable singleData = null;

  @action
  updateSearchCriteria = params => this.searchCriteria = Object.assign(this.searchCriteria,params || {});
  @action
  initSearchCriteria = () => this.searchCriteria = INIT_SEARCH_CRITERIA;
  @action saveListData = ({list,pagination}) => {
    this.list = list;
    this.pagination = pagination;
  }
  @action
  saveSingleData = data => this.singleData = data;


  fetchList = flow(function * (params) {
    const { code, data } = yield getList(params);
    code == 200 && this.saveListData(data);
  });

  fetchDataById = flow(function * (params) {
    const { code, data } = yield getById(params);
    code == 200 && this.saveSingleData(data);
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

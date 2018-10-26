"use strict";

import { observable, action, flow } from 'mobx'
import { getList, getById, update, add } from './api'
import { INIT_SEARCH_CRITERIA } from 'constants/config'

export default class TableStore {
  @observable list = [];
  @observable searchCriteria = INIT_SEARCH_CRITERIA;
  @observable pagination = null;
  @observable loading = false;
  @observable obj = null;
  @observable initFormLoading = false;
  @observable confirmLoading = false;

  constructor(initialState) {
    Object.assign(this, initialState);
  }

  @action
  updateSearchCriteria = params => this.searchCriteria = Object.assign(this.searchCriteria,params || {});
  @action
  initSearchCriteria = () => this.searchCriteria = INIT_SEARCH_CRITERIA;

  fetchList = flow(function * (params) {
    this.loading = true;
    this.updateSearchCriteria(params);
    const res = yield getList(this.searchCriteria);
    this.loading = false;
    this.list = res.data.list;
    this.pagination = res.data.pagination;
  });
  fetchDataById = flow(function * (params) {
    this.initFormLoading = true;
    const res = yield getById(params);
    this.initFormLoading = false;
    this.obj = res.data;
  });
  update = flow(function * (params,callback) {
    this.confirmLoading = true;
    const res = yield update(params);
    callback && callback();
    this.confirmLoading = false;
  });
  add = flow(function * (params,callback) {
    this.confirmLoading = true;
    const res = yield add(params);
    callback && callback();
    this.confirmLoading = false;
  });
}

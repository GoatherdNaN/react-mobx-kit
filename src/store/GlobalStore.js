/*
 * @Author: Edlan
 * @Date: 2019-01-05 14:47:39
 * @Description: 全局store
 */
import { action, extendObservable } from 'mobx'

export default class GlobalStore {
  // 全局loading的action
  @action changeLoad(loadingName, loading) {
    if(loadingName in this){
      this[loadingName] = loading;
    } else {
      extendObservable(this, {
          [loadingName]: loading
      });
    }
  };
};
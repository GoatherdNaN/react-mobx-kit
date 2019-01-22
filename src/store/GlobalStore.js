/*
 * @Author: Edlan
 * @Date: 2019-01-05 14:47:39
 * @Description: 全局store,目前暂只扩展了全局的loading
 */
import { action, extendObservable } from 'mobx'

export default class GlobalStore {
  // 全局loading的action
  @action changeLoading(loadingName, loading) {
    if(loadingName in this){
      this[loadingName] = loading;
    } else {
      extendObservable(this, {
        [loadingName]: loading
      });
    }
  };

  withLoading(loadingName = "loading") {
    return flowFn => async (...args) => {
      try {
        this.changeLoading(loadingName, true);
        await flowFn.apply(this, args);
      } catch(e) {
        window.warning(e);
      } finally {
        this.changeLoading(loadingName, false);
      }
    }
  }
};
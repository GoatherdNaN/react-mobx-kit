/*
 * @Author: Edlan
 * @Date: 2018-10-22 15:39:10
 * @Description: 兼容sessionStorage
 */
const keyGetter = function(key) {
  return `mobx-admin-${key}`;
};
class Storage {
  constructor(storage) {
    this.storage = storage || window.localStorage;
  }

  getItem(key) {
    return this.storage.getItem(keyGetter(key));
  }

  setItem(key, data) {
    this.storage.setItem(keyGetter(key), data);
  }

  getJSONItem(key) {
    const valueString = this.storage.getItem(keyGetter(key));
    if (!valueString) return;
    try {
      return JSON.parse(valueString);
    } catch (e) {
      return void 0;
    }
  }

  setJSONItem(key, data) {
    this.storage.setItem(keyGetter(key), JSON.stringify(data));
  }

  removeItem(key) {
    return this.storage.removeItem(keyGetter(key));
  }

  clear() {
    this.storage.clear();
  }
}
const sessionStorage = new Storage(window.sessionStorage);
export { sessionStorage };
export default new Storage();
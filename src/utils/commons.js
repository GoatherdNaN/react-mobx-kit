import storage from './storage'
/**
 * 缓存函数
 */
const memoize = (fn, getKey) => {
  const cache = {};
  return (...rest) => {
    const key = getKey ? getKey(rest) : 'key';
    let res = cache[key];
    if (!res) {
      res = fn(...rest);
      cache[key] = res;
    }
    return res;
  };
};

export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}

export function generateUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export function toWindowTop() {
  window.scrollTo(0, 0);
  // document.title = 'your_title';
}

// 将树型数组格式化成一维数组
export const formatTreeList = memoize(treeList => {
  if(!Array.isArray(treeList)) return [];
  const simpleArr = [];
  const getSimpleArr = arr => {
    arr.forEach(item => {
      simpleArr.push(item.resourceCode);
      if (item.children) getSimpleArr(item.children);
    });
  };
  getSimpleArr(treeList);
  return simpleArr;
},() => storage.getItem('authListUD') || new Date().getTime());
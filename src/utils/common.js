import storage from './storage'
// 缓存函数
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

export function toWindowTop() {
  window.scrollTo(0, 0);
  // document.title = 'your_title';
}

// 将树型数组格式化成一维数组
export const formatTreeList = treeList => {
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
};
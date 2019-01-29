
const isArray = Array.isArray;
// 缓存函数
export const memoize = (fn, getKey) => {
  const cache = {};
  return (...rest) => {
    const key = typeof getKey === 'function' ? getKey(rest) : 'key';
    let res = cache[key];
    if (!res) {
      res = fn(...rest);
      cache[key] = res;
    }
    return res;
  };
};

export function checkArrayHasValue(children) {
  return isArray(children) && !!children.length
}

export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}

// 将树型数组格式化成一维数组
export const formatTreeList = treeList => {
  if(!isArray(treeList)) return [];
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

// walkTreeNode
/**
 * tree 遍历
 * @param data 要遍历的树
 * @param cb function(target 当前值, index 索引, array 所在数组, parent 父节点)
 * @returns {*}
 */
export function walkTreeNode(data, cb) {
  if (data == null) {
    return;
  }
  let openList;
  if (Array.isArray(data)) {
    openList = data.map((target, index, array) => {
      return { parent: null, index, target, array };
    });
  } else {
    openList = [{ parent: null, index: 0, target: data, array: [data] }];
  }
  let current;
  const mapCallback = (target, index, array) => ({ parent: current.target, index, target, array });
  while (((current = openList.pop()), current)) {
    const result = cb(current.target, current.index, current.array, current.parent);
    if (result !== undefined) return result;
    if (current.target.children) {
      const openChildList = current.target.children.map(mapCallback);
      openList = openList.concat(openChildList);
    }
  }
}
// 排除掉给定对象的某些属性
export function splitObject (obj, keys) {
  const surplus = Object.assign({}, obj);
  if (typeof keys === 'string') keys = [ keys ];
  keys.forEach((key) => {
    if (obj && key in obj) {
      if (obj.hasOwnProperty(key)) {
        delete surplus[key];
      }
    }
  });
  return surplus;
}
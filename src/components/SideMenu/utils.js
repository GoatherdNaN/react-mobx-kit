import pathToRegexp from 'path-to-regexp';
import { urlToList } from 'utils/common'
import { RESOURCE_FIELDNAMES } from 'constants/config'

const RESOURCETYPE_ISNOT_MENUITEM = 2;

// 检测是不是合格的菜单项
export const checkIsLegalMenuItem = child => {
  let isLegalMenuItem = false;
  try {
    if (
      child[RESOURCE_FIELDNAMES.name] &&
      child[RESOURCE_FIELDNAMES.type] !== RESOURCETYPE_ISNOT_MENUITEM
    ) {

      isLegalMenuItem = true
    }
  } finally {
    return isLegalMenuItem;
  }
}
// 获取所有菜单地址
export const getFlatMenuKeys = (menuData, parentPath='') => {
  let keys = [];
  menuData.forEach(item => {
    const itemPath = parentPath + '/' + item[RESOURCE_FIELDNAMES.code];
    keys.push(itemPath);
    // 子存在且不是属于按钮
    if (
      item.children &&
      checkIsLegalMenuItem(item.children.slice(0)[0])
    ) {
      keys = keys.concat(getFlatMenuKeys(item.children, itemPath));
    }
  });
  return keys;
};
// 获取匹配到的菜单地址
export const getMenuMatches = (flatMenuKeys, path) => {
  return flatMenuKeys.length ? flatMenuKeys.filter(item => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  }) : path;
}

// 获得菜单子节点
export const getDefaultCollapsedSubMenus = props => {
  const {
    pathname,
    flatMenuKeys = [],
  } = props;
  return urlToList(pathname)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item);
};
import React, { PureComponent, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import { toJS } from 'mobx'
import { RESOURCE_FIELDNAMES } from 'constants/config'
import { IconFont } from 'base'
import { urlToList, checkArrayHasValue } from 'utils/common'
import {
  checkIsLegalMenuItem,
  getFlatMenuKeys,
  getMenuMatches,
  getDefaultCollapsedSubMenus
} from './utils'

const { SubMenu } = Menu;

const getIcon = icon => {
  if (icon && typeof icon === 'string') {
    return <IconFont type={`icon-${icon}`} />
  }
  return icon;
};

@withRouter
export default class MyMenu extends PureComponent {
  constructor(props) {
    super(props);
    const { location: { pathname } } = props;
    this.flatMenuKeys = getFlatMenuKeys(props.menus);
    const openKeys = getDefaultCollapsedSubMenus({
      pathname,
      flatMenuKeys: this.flatMenuKeys
    });
    this.state = {
      openKeys,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { menus, location: { pathname } } = this.props;
    const isChangeMenus = !checkArrayHasValue(toJS(menus)) && checkArrayHasValue(toJS(nextProps.menus));
    const isChangePath = nextProps.location.pathname !== pathname;
    if (isChangeMenus) {
      this.flatMenuKeys = getFlatMenuKeys(nextProps.menus);
    }
    if (isChangeMenus || isChangePath) {
      const openKeys = getDefaultCollapsedSubMenus({
        pathname: nextProps.location.pathname,
        flatMenuKeys: this.flatMenuKeys
      });
      this.setState({ openKeys });
    }
  }

  // 获取菜单子节点
  getNavMenuItems = (menusData, parentPath='') => {
    if (!menusData) return [];
    return menusData
      .filter(item => item[RESOURCE_FIELDNAMES.name] && item[RESOURCE_FIELDNAMES.code])
      .map(item => {
        item.path = parentPath + '/' + item[RESOURCE_FIELDNAMES.code];
        return this.getSubMenuOrItem(item);
      })
      .filter(item => item);
  };

  getSelectedMenuKeys = pathname => {
    return urlToList(pathname).map(itemPath => {
      return this.flatMenuKeys.length ? getMenuMatches(this.flatMenuKeys, itemPath).pop() : itemPath
    });
  };

  // get SubMenu or Item
  getSubMenuOrItem = item => {
    // 如果item有子项且每个子项都是menu上的
    if (
      item.children &&
      checkIsLegalMenuItem(toJS(item.children)[0])
    ) {
      return (
        <SubMenu
          key={item.path}
          title={
            item[RESOURCE_FIELDNAMES.icon] ? (
              <Fragment>
                { getIcon(item[RESOURCE_FIELDNAMES.icon]) }
                <span>{item[RESOURCE_FIELDNAMES.name]}</span>
              </Fragment>
            ) : item[RESOURCE_FIELDNAMES.name]
          }
        >
          {this.getNavMenuItems(item.children, item.path)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;;
  };
  // 去掉了http链接的支持
  getMenuItemPath = item => (
    <div onClick={() => this.routeTo(item.path)}>
      { getIcon(item[RESOURCE_FIELDNAMES.icon]) }
      <span>{ item[RESOURCE_FIELDNAMES.name] }</span>
    </div>
  );

  routeTo = path => {
    let isFromTagBar = false;
    if (this.props.checkPathInHistory(path)) {
      isFromTagBar = true;
    }
    this.props.history.push({
      pathname: path,
      query: {
        isFromTagBar
      }
    });
  }

  isMainMenu = key => {
    const { menus } = this.props;
    return menus.some(item => key ? item.path === key : false);
  };

  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
    });
  }

  render() {
    const { openKeys } = this.state;
    const {
      collapsed,
      menus,
      location: {
        pathname
      },
    } = this.props;
    if (!menus.length) return null;
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
      };
    }
    return (
      <Menu
        theme='dark'
        mode='inline'
        onOpenChange={this.handleOpenChange}
        selectedKeys={selectedKeys}
        {...props}
      >
        { this.getNavMenuItems(menus) }
      </Menu>
    )
  }
}
import React, { PureComponent, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { RESOURCETYPE_ISNOT_MENUITEM } from 'constants/config'

const { SubMenu } = Menu;

const getIcon = icon => {
  if (typeof icon === 'string' && icon) {
    return <i style={{ marginRight: 6 }} className={`iconfont icon-${icon}`} />
  }
  return icon;
};

@withRouter
export default class MyMenu extends PureComponent {
  constructor(props) {
    super(props);
    const { location: { pathname } } = props;
    const current = pathname.split('/').pop() || 'home';
    this.state = {
      current,
      menus: []
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (!!nextProps.authList.length) {
      return {
        menus: nextProps.authList,
      };
    }
    return null;
  }
  
  // 获取菜单项
  getNavMenuItems = (menusData, parentPath='') => {
    if (!menusData) return [];
    return menusData
      .filter(item => item.resourceName && item.resourceCode)
      .map(item => {
        item.path = parentPath + '/' + item.resourceCode;
        return this.getSubMenuOrItem(item);
      })
      .filter(item => item);
  };
  // get SubMenu or Item
  getSubMenuOrItem = item => {
    if ( // 如果item有子项且每个子项都是menu上的
      item.children 
      && item.children.some(child => 
        child.resourceName 
        && child.resourceType !== RESOURCETYPE_ISNOT_MENUITEM
      )
    ) {
      const childrenItems = this.getNavMenuItems(item.children,item.path);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            key={ item.resourceCode }
            title={
              <Fragment>{getIcon(item.icon)}{item.resourceName}</Fragment>
            }
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    }
    return <Menu.Item key={item.resourceCode}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  getMenuItemPath = item => {
    const { resourceName } = item;
    return (
      <Link
        to={item.path}
        replace={item.path === this.props.location.pathname}
      >
        { getIcon(item.icon) }
        { resourceName }
      </Link>
    );
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    const { current, menus } = this.state;
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={this.handleClick}
        selectedKeys={[current]}
      >
        { this.getNavMenuItems(menus) }
      </Menu>
    )
  }
}
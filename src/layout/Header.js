import React, { Component } from 'react'
import classNames from 'classnames'
import { Link, withRouter } from 'react-router-dom'
import { Icon, Tooltip, Dropdown, Menu } from 'antd'
import { splitStr } from 'utils/format'
import { shortcut } from 'constants/config'
import styles from './Header.less'

function requestFullScreen() {
  const de = document.documentElement;
  if (de.requestFullscreen) {
    de.requestFullscreen();
  } else if (de.mozRequestFullScreen) {
    de.mozRequestFullScreen();
  } else if (de.webkitRequestFullScreen) {
    de.webkitRequestFullScreen();
  } else if(window.ActiveXObject !== undefined) {
    //这的方法 模拟f11键，使浏览器全屏
    const wscript = new ActiveXObject("WScript.Shell");
    if(wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
};
function exitFullscreen() {
  const de = document;
  if (de.exitFullscreen) {
    de.exitFullscreen();
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen();
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen();
  } else if (window.ActiveXObject !== undefined) {
    // 注：ie调用ActiveX控件，需要在ie浏览器安全设置里面把 ‘未标记为可安全执行脚本的ActiveX控件初始化并执行脚本’ 设置为启用
    //这的方法 模拟f11键，使浏览器全屏
    const wscript = new ActiveXObject("WScript.Shell");
    if(wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
};

const MENU_KEY = {
  accountInfo: 'accountInfo',
  changePwd: 'changePwd',
  logout: 'logout',
}

@withRouter
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
    };
  }
  componentDidMount(){
    this.watchFullScreen();
  }
  watchFullScreen = () => {
    const that = this;
    document.addEventListener(
      "fullscreenchange",
      function() {
        that.setState({
          isFullScreen: document.fullscreen
        });
      },
      false
    );

    document.addEventListener(
      "mozfullscreenchange",
      function() {
        that.setState({
          isFullScreen: document.mozFullScreen
        });
      },
      false
    );

    document.addEventListener(
      "webkitfullscreenchange",
      function() {
        that.setState({
          isFullScreen: document.webkitIsFullScreen
        });
      },
      false
    );
  };
  // 全屏
  fullScreen = () => {
    if (!this.state.isFullScreen) {
      requestFullScreen();
    } else {
      exitFullscreen();
    }
  }

  handleMenuClick = ({key}) => {
    switch (key) {
      case MENU_KEY.changePwd:
        this.toChangePwd();
        break;
      case MENU_KEY.logout:
        this.logout();
        break;
      default:
        return;
    }
  }

  toChangePwd = () => {
    const { history } = this.props;
    history.push('/system/changePwd');
  }

  logout = () => {
    const { history } = this.props;
    history.push('/login');
  }

  render() {
    const { isFullScreen } = this.state;
    const { collapsed, onCollapse } = this.props;
    const menu = (
      <Menu selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item key={MENU_KEY.accountInfo} disabled  className={styles.accountInfo}>
          <p style={{ marginBottom: 0 }}>
            用户名： {splitStr('张三张三张三', 5)}
          </p>
          <p style={{ marginBottom: 0 }}>
            角色名： {splitStr('超级管理员中的超级管理员', 5)}
          </p>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key={MENU_KEY.changePwd}>
          <Icon type="lock" />修改密码
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key={MENU_KEY.logout}>
          <Icon type="logout" />退出
        </Menu.Item>
      </Menu>
    );
    return (
      <header className={styles.header}>
        <ul className={styles.leftUtilLabel}>
          <li>
            <Icon
              className={styles.utilLabel}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => onCollapse(!collapsed)}
            />
          </li>
        </ul>
        <ul className={classNames(styles.leftUtilLabel, styles.shortcut)}>
          {
            !!shortcut.length && shortcut.map(item => (
              <li key={item.path}>
                <Link to={item.path} className={styles.shortcutItem}>
                  <Icon type="plus-square" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))
          }
        </ul>
        <ul className={styles.rightUtilLabel}>
          <li>
            <Dropdown
              overlay={menu}
              overlayClassName={styles.dropdown}
            >
              <span className={classNames(styles.utilLabel, styles.accountInfoLabel)}>
                <span>张三</span>
                <Icon type="caret-down" theme="filled" style={{ marginLeft: 4 }} />
              </span>
            </Dropdown>
          </li>
          <li>
            <Tooltip placement="bottom" title={isFullScreen ? "取消全屏" : "全屏"}>
              <Icon
                className={styles.utilLabel}
                type={isFullScreen ? 'fullscreen-exit' : 'fullscreen'}
                onClick={this.fullScreen}
              />
            </Tooltip>
          </li>
        </ul>
      </header>
    )
  }
}


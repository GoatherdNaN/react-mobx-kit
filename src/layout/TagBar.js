import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Menu, Dropdown, Icon } from 'antd'
import { checkIsHome } from '../routes'
import styles from './TagBar.less'

const OPERATION_ITEM = {
  closeAll: {
    key: 'closeAll',
    title: '关闭所有标签页'
  },
  closeOther: {
    key: 'closeOther',
    title: '关闭其它标签页'
  },
  lockCurrent: {
    key: 'triggerLock',
    title: '锁定当前标签页'
  },
  unlockCurrent: {
    key: 'triggerLock',
    title: '解锁当前标签页'
  },
}

@withRouter
@inject('routerStore')
@observer
export default class TagBar extends Component {
  routeTo = path => {
    this.props.history.push({
      pathname: path,
      query: {
        isFromTagBar: true
      }
    });
  }

  handleClick = (path) => {
    this.props.routerStore.addRouter(path, path => this.routeTo(path));
  }

  closeTag = (e, path, index) => {
    e.stopPropagation();
    this.props.routerStore.closeTag(path, index, targetPath => this.routeTo(targetPath));
  }

  handleMenuClick = ({ key }) => {
    const {
      routerStore: {
        closeAllTags,
        closeTagExceptCurrent,
        triggerLock
      }
    } = this.props;
    switch (key) {
      case OPERATION_ITEM.closeAll.key:
        closeAllTags(path => this.routeTo(path));
        break;
      case OPERATION_ITEM.closeOther.key:
        closeTagExceptCurrent();
        break;
      case OPERATION_ITEM.lockCurrent.key:
        triggerLock();
        break;
      default:
        return;
    }
  }

  render() {
    const {
      routerStore: {
        activeTag,
        history
      }
    } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key={OPERATION_ITEM.closeAll.key}>
          {OPERATION_ITEM.closeAll.title}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key={OPERATION_ITEM.closeOther.key}>
          {OPERATION_ITEM.closeOther.title}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key={OPERATION_ITEM.lockCurrent.key}>
          {OPERATION_ITEM[activeTag.isLock ? 'unlockCurrent' : 'lockCurrent'].title}
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.tagBar}>
        <ul className={styles.tagList}>
          {
            history.map((tag, index) => {
              const isHome = checkIsHome(tag.code);
              return (
                <li
                  key={tag.code}
                  onClick={() => this.handleClick(tag.path)}
                  className={classNames(styles.tag, {
                    [styles.active]: tag.path === activeTag.path,
                    [styles.home]: isHome
                  })}
                >
                  {
                    isHome ? (
                      <Icon type="home" />
                    ) : (
                      <Fragment>
                        {tag.name}
                          <span
                            {...!tag.isLock ? {
                              onClick: (e) => this.closeTag(e, tag.path, index)
                            } : {}}
                            className={classNames(styles.tagBtn, {
                              [styles.closeBtn]: !tag.isLock
                            })}
                          >
                            <Icon type={tag.isLock ? "lock" : "close"} />
                        </span>
                      </Fragment>
                    )
                  }
                </li>
              )
            })
          }
        </ul>
        <div className={styles.operationBox}>
          <Dropdown
            trigger={['click']}
            overlay={menu}
            // overlayClassName={styles.dropdown}
          >
            <Icon type="down" />
          </Dropdown>
        </div>
      </div>
    )
  }
}
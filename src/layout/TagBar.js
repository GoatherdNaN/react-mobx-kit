import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Icon } from 'antd'
import { checkIsHome } from '../routes'
import styles from './TagBar.less'


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

  closeTag = (e, path) => {
    e.stopPropagation();
    this.props.routerStore.closeTag(path, targetPath => this.routeTo(path));
  }

  render() {
    const {
      routerStore: {
        activeTag,
        history
      }
    } = this.props;
    return (
      <div className={styles.tagBar}>
        <ul className={styles.tagList}>
          {
            history.map(tag => {
              const isHome = checkIsHome(tag.code);
              return (
                <li
                  key={tag.code}
                  onClick={() => this.handleClick(tag.path)}
                  className={classNames(styles.tag, {
                    [styles.active]: tag.path === activeTag,
                    [styles.home]: isHome
                  })}
                >
                  {
                    isHome ? (
                      <Icon type="home" />
                    ) : (
                      <Fragment>
                        {tag.name}
                        <span className={styles.closeBtn} onClick={(e) => this.closeTag(e, tag.path)}>
                          <Icon type="close" />
                        </span>
                      </Fragment>
                    )
                  }
                </li>
              )
            })
          }
        </ul>
        <div className={styles.operationBox}></div>
      </div>
    )
  }
}
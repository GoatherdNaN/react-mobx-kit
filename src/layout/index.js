/*
 * @Author: Edlan
 * @Date: 2018-10-26 17:51:06
 * @Description: Layout全局容器
 */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Breadcrumb, Button } from 'antd'
import { Redirect, Switch, Route, Link, withRouter } from 'react-router-dom'
import pathToRegexp from 'path-to-regexp'
import withWrapError from 'components/ErrorHandle'
import NotFound from 'components/Exception/404'
import AuthPage from 'components/Authorized'
import MyMenu from 'components/MyMenu'
import routes, { breadcrumbNameMap } from '../routes'

import styles from './index.less'

@withRouter
@inject('loginStore')
@observer
class Layout extends Component {
  componentWillMount() {
    const { location: { query } } = this.props;
    if(!(query && query.isFirstLoad)) {
      this.props.loginStore.getResource();
    }
  }
  
  getBreadcrumbItem = () => {
    const { location: { pathname } } = this.props;// pathToRegexp
    const pathSnippets = pathname.split('/').filter(i => i);
    return pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const matchKey = Object.keys(breadcrumbNameMap).find(v => pathToRegexp(v).test(url));
      if(!matchKey) return null;
      const title = breadcrumbNameMap[matchKey];
      return (
        <Breadcrumb.Item key={url}>
          {
            pathname !== url
            ? (
              <Link to={url}>
                {title}
              </Link>
            ) : title
          }
        </Breadcrumb.Item>
      );
    });
  }

  logout = () => {
    this.props.loginStore.logout(() => {
      const { history } = this.props;
      history.replace('/login');
    });
  }

  render() {
    const {
      loginStore: { authList, authArr, authLoading, logoutLoading }
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>Mobx Demo</div>
          <div className={styles.menu}>
            <MyMenu authList={authList} />
          </div>
          <div className={styles.info}>
            <Button 
              ghost 
              size="small" 
              loading={logoutLoading} 
              shape="circle" 
              icon="logout" 
              onClick={this.logout} />
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.breadCrumb}>
            <Breadcrumb>{ this.getBreadcrumbItem() }</Breadcrumb>
          </div>
          <div className={styles.content}>
            <Switch>
              {routes.map(item => (
                <AuthPage
                  {...item} 
                  key={item.code}
                  authArr={authArr} 
                  authLoading={authLoading} 
                />
              ))}
              <Redirect from="/" to="/home" />
              <Route render={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
};
Layout.displayName = 'Layout';

export default withWrapError(Layout);
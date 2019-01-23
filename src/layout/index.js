/*
 * @Author: Edlan
 * @Date: 2018-10-26 17:51:06
 * @Description: Layout全局容器
 */
import React, { Component, Fragment, Suspense } from 'react'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import {  Layout, Breadcrumb, Icon } from 'antd'
import { Redirect, Switch, Route, Link } from 'react-router-dom'
import pathToRegexp from 'path-to-regexp'
import withWrapError from 'components/ErrorHandle'
import NotFound from 'components/Exception/404'
import AuthPage from 'components/Authorized'
import LoadingComponent from 'components/LoadingComponent'
import { TITLE } from 'constants/config'
import routes, { breadcrumbNameMap } from '../routes'
import Header from './Header'
import history from '../history'
import styles from './index.less'

const SideMenu = React.lazy(() => import('components/SideMenu'));

const { Sider } = Layout;

@inject('loginStore')
@observer
class MyLayout extends Component {
  constructor(props) {
    super(props);
    this.scrollBox = React.createRef();

  }

  componentDidMount() {
    const { location: { query } } = this.props;
    if(!(query && query.isFirstLoad)) {
      this.props.loginStore.getResource();
    }
    // 路由变化，置顶
    history.listen(() => {
      if (this.scrollBox.current) {
        this.scrollBox.current.scrollTop = 0;
      }
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleMenuCollapse = collapsed => {
    this.props.loginStore.changeLayoutCollapsed(collapsed);
  };

  matchParamsPath = () => {
    const { location: { pathname } } = this.props;
    const breadcrumbNameMapKeys = Object.keys(breadcrumbNameMap);
    const pathKey = breadcrumbNameMapKeys.find(key => pathToRegexp(key).test(pathname));
    return breadcrumbNameMap[pathKey];
  };

  getBreadcrumbItem = () => {
    const { location: { pathname } } = this.props;// pathToRegexp
    const pathSnippets = pathname.split('/').filter(i => i);
    return pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const matchKey = Object.keys(breadcrumbNameMap).find(v => pathToRegexp(v).test(url));
      if (!matchKey) return null;
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
      loginStore: {
        authList,
        authArr,
        collapsed,
        ['loginStore/getResource']: authLoading
      },
    } = this.props;
    const currRouterData = this.matchParamsPath();
    return (
      <Fragment>
        <Sider
          // width={200}
          // collapsedWidth={50}
          className={styles.leftContainer}
          onCollapse={this.handleMenuCollapse}
          collapsed={collapsed}
        >
          <div className={styles.logo}>
            <img src={require('../asserts/img/logo.svg')} />
            {
              !collapsed
                ? <span style={{ marginLeft: 10 }}>{TITLE}</span>
                : ''
            }
          </div>
          <Suspense fallback={<LoadingComponent isGlobal={false} />}>
            <SideMenu collapsed={collapsed} menus={authList} />
          </Suspense>
        </Sider>
        <section className={classNames(styles.rightContainer, {
          [styles.collapsed]: collapsed
        })}>
          <Header collapsed={collapsed} onCollapse={this.handleMenuCollapse} />
          <div className={styles.scrollBox} ref={this.scrollBox}>
            {
              !!currRouterData && (
                <div className={styles.breadCrumb}>
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link to="/"><Icon type="home" /></Link>
                    </Breadcrumb.Item>
                    {this.getBreadcrumbItem()}
                  </Breadcrumb>
                </div>
              )
            }
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
                <Redirect exact from="/" to="/dashboard" />
                <Route render={NotFound} />
              </Switch>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
};
MyLayout.displayName = 'Layout';

export default withWrapError(MyLayout);
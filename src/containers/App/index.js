import React from 'react';
import { Router, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Menu, Icon, Spin } from 'antd';
import Loadable from 'react-loadable';
import LoadingComponent from '../../components/LoadingComponent';
import { urlToList } from '../../utils/commons';
import styles from './index.less';

const AsyncTodos = Loadable({
  loader: () => import('../Todos'),
  loading: LoadingComponent,
  delay: 200,
});
const AsyncOther = Loadable({
  loader: () => import('../Other'),
  loading: LoadingComponent,
  delay: 200,
});

export default class App extends React.Component {
  state = {
    current: 'todos',
  }
  componentWillMount() {
    const { location: { pathname } } = this.props;
    const current = pathname.replace(/\//i,'');
    this.setState({ current });
  }
  handleClick = ({ key }) => {
    this.setState({ current: key },() => {
      this.props.history.push(`/${key}`);
    })
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>Mobx Demo</div>
          <div className={styles.menu}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              theme="dark"
              mode="horizontal"
            >
              <Menu.Item key="todos">
                <Icon type="todos" />Todos
              </Menu.Item>
              <Menu.Item key="other">
                <Icon type="other" />其他
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <div className={styles.wrapper}>
          <Switch>
            <Route path="/todos" render={props => <AsyncTodos {...props}/>} />
            <Route path="/other" render={props => <AsyncOther {...props}/>} />
            <Redirect exact from="/" to="/todos" />
          </Switch>
        </div>
      </div>
    )
  }
}

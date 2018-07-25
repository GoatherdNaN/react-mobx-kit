import React from 'react';
import { Router, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import Todos from '../Todos';
import Other from '../Other';
import styles from './index.less';

export default class App extends React.Component {
  state = {
    current: 'todos',
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
            <Route path="/todos" render={props => <Todos {...props}/>} />
            <Route path="/other" render={props => <Other {...props}/>} />
            <Redirect exact from="/" to="/todos" />
          </Switch>
        </div>
      </div>
    )
  }
}

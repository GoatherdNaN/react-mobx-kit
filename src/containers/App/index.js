import React from 'react';
import { Menu, Icon } from 'antd';
import { renderRoutes } from 'react-router-config';
import { Redirect } from 'react-router-dom';
import styles from './index.less';

export default class App extends React.Component {
  state = {
    current: 'todos',
  };

  componentWillMount() {
    const {
      location: { pathname },
    } = this.props;
    let current = pathname.replace(/\//i, '');
    if (!current) {
      current = 'todos';
    }
    this.setState({ current });
  }

  handleClick = ({ key }) => {
    this.setState({ current: key }, () => {
      this.props.history.push(`/${key}`);
    });
  };

  render() {
    const {
      location: { pathname },
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>Mobx Demo</div>
          <div className={styles.menu}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              theme="dark"
              mode="horizontal">
              <Menu.Item key="todos">
                <Icon type="todos" />
                Todos
              </Menu.Item>
              <Menu.Item key="other">
                <Icon type="other" />
                其他
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <div className={styles.wrapper}>
          {!pathname.replace(/\//i, '') ? (
            <Redirect to="/todos" />
          ) : (
            renderRoutes(this.props.route.routes)
          )}
        </div>
      </div>
    );
  }
}
import React from 'react';
import { Menu, Icon } from 'antd';
import { renderRoutes } from 'react-router-config';
import { Redirect } from 'react-router-dom';
import withWrapError from '../../components/ErrorHandle';
import styles from './index.less';

const ThemeContext = React.createContext({
  background: '#f00',
  color: '#fff'
});


class App extends React.Component {
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
            <ThemeContext.Provider value={{background: 'green', color: 'white'}}>
              { renderRoutes(this.props.route.routes) }
            </ThemeContext.Provider>
          )}
        </div>
      </div>
    );
  }
};
App.displayName = 'App';

export { ThemeContext };
export default withWrapError(App);

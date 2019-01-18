/*
 * @Author: Edlan
 * @Date: 2018-10-22 14:58:53
 * @Description:
 */
import React, { PureComponent } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { PrivateRoute } from 'components/Authorized'
import storage from 'utils/storage';
import Layout from './layout'
import Login from 'pages/Login'


@withRouter
class App extends PureComponent {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.checkLogin();
  }

  componentWillReceiveProps() {
    this.checkLogin();
  }

  checkLogin = () => {
    const isAuthenticated = !!storage.getItem('token');
    this.setState({ isAuthenticated })
  }

  render(){
    const { isAuthenticated } = this.state;
    return (
      <Switch>
        <Route path="/login" render={props => <Login {...props} />} />
        <PrivateRoute
          path="/"
          isAuthenticated={isAuthenticated}
          render={props => <Layout {...props} />}
        />
      </Switch>
    )
  }
}

export default App
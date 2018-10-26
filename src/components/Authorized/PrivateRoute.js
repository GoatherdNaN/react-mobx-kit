/*
 * @Author: Edlan
 * @Date: 2018-10-22 14:55:57
 * @Description: 私有路由，只有登录的用户才能访问
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = props => {
  const { component: Component, render, isAuthenticated, ...rest } = props;
  return isAuthenticated ? (
    <Route {...rest} render={() => (Component ? <Component {...props} /> : render(props))} />
  ) : (
    <Route
      {...rest}
      render={
      () => (
        <Redirect to={{ 
        pathname: '/login',
        state:{ from: props.location.pathname },
      }} />
)
    } />
  );
}
export default PrivateRoute;
import React from 'react'
import { Route } from 'react-router-dom'
import { check } from './CheckPermissions'
import P403 from 'components/Exception/403'

const AuthPage = props => {
  const { component: Component, code, render, ...rest } = props;
  const target = (
    <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
  );
  const noMatch = <Route {...rest} render={() => <P403 />} />;
  return check(code) ? target : noMatch;
}

export default AuthPage;

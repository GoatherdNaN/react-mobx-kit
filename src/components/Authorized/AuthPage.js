import React from 'react'
import { Route } from 'react-router-dom'
import P403 from 'components/Exception/403'
import LoadingComponent from '../LoadingComponent'
// import { inWhiteList } from '../../routes'

const AuthPage = props => {
  const {
    component: Component,
    render,
    authArr,
    code,
    ...otherProps
  } = props;
  const target = (
    <Route {...otherProps} render={() => (Component ? <Component {...props} /> : render(props))} />
  );
  const noMatch = <Route {...otherProps} render={() => <P403 />} />;
  if(!authArr.length) {
    return <LoadingComponent />
  }
  // 白名单里的code排除
  // return (inWhiteList(code) || authArr.includes(code)) ? target : noMatch;
  return authArr.includes(code) ? target : noMatch;
}

export default AuthPage;

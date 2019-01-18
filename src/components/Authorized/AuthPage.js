import React from 'react'
import { Route } from 'react-router-dom'
import P403 from 'components/Exception/403'
import LoadingComponent from '../LoadingComponent'

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
      // return <LoadingComponent />
      return target
    }
  return authArr.includes(code) ? target : noMatch;
}

export default AuthPage;

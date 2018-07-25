import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import App from './containers/App/index';

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider {...store}>
      <BrowserRouter>
        <Route path="/" render={props => <App {...props} />} />
      </BrowserRouter>
    </Provider>
  </LocaleProvider>,
    document.getElementById('root')
);

import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import registerServiceWorker from './registerServiceWorker';
import { createStoresFromState } from './store/utils';

const initialState = {};
const stores = createStoresFromState(initialState);

import App from 'containers/App';
const ROOT = document.getElementById('root');

import 'asserts/css/reset.css'
import './index.less'

const createApp = stores => (
  <LocaleProvider locale={zhCN}>
    <Provider {...stores}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </LocaleProvider>
);

Loadable.preloadReady().then(() => {
  const application = createApp(stores);
  render(application, ROOT);
  registerServiceWorker();
});

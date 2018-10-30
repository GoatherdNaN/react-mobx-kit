// import '@babel/polyfill';

import React from 'react'
import { render } from 'react-dom'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import { HashRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import App from './App'
import registerServiceWorker from './registerServiceWorker'
import createStoresFromState from './store';

// 开启mobx的严格模式，规范数据修改操作只能在action中进行
configure({
  enforceActions: 'always',
  // disableErrorBoundaries: false,
});


import 'asserts/css/reset.css'
import './index.less'

const stores = createStoresFromState(); // 有需要的话可以传入initialState
const ROOT = document.getElementById('root');

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

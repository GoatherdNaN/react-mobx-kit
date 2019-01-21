// import '@babel/polyfill';

import React from 'react'
import { render } from 'react-dom'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import history from './history';
import { Router } from 'react-router-dom'
import Loadable from 'react-loadable'
import { LocaleProvider, message } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import dispatch from 'utils/dispatch'
import globalConfig from 'utils/global'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import createStoresFromState from './store';

import 'asserts/css/reset.css'
import './index.less'
// 开启mobx的严格模式，规范数据修改操作只能在action中进行
// configure({
//   enforceActions: 'always',
//   // disableErrorBoundaries: false,
// });
message.config({
  maxCount: 1,
});

globalConfig(window);

const stores = createStoresFromState(); // 有需要的话可以传入initialState
const ROOT = document.getElementById('root');

const createApp = stores => (
  <LocaleProvider locale={zhCN}>
    <Provider dispatch={dispatch}  {...stores}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </LocaleProvider>
);

Loadable.preloadReady().then(() => {
  const application = createApp(stores);
  render(application, ROOT);
  registerServiceWorker();
});

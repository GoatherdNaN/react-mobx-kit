import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider } from 'mobx-react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStoresFromState } from './store/utils';
import App from './containers/App/index';

const initialState = {
  TodosStore: {
    todos: [
      {
        text: 'webpack4从0搭建',
        isDone: true
      },
      {
        text: 'Mobx引入并实现Todos',
        isDone: true
      },
      {
        text: 'React SSR',
        isDone: false
      },
      {
        text: '加入jsLint',
        isDone: false
      },
    ],
  },
};
// JSON.parse(window.__INITIAL_STATE__);
const stores = createStoresFromState(initialState);
window.main = () => {
  Loadable.preloadReady().then(() => {
    if(__DEV__) {
      ReactDOM.hydrate(
        <LocaleProvider locale={zhCN}>
          <Provider {...stores}>
            <BrowserRouter>
              <Route path="/" render={props => <App {...props} />} />
            </BrowserRouter>
          </Provider>
        </LocaleProvider>,
          document.getElementById('root')
      );
    } else {
      ReactDOM.hydrate(
          <LocaleProvider locale={zhCN}>
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
              <Provider {...stores}>
                <BrowserRouter>
                  <Route path="/" render={props => <App {...props} />} />
                </BrowserRouter>
              </Provider>
            </Loadable.Capture>
          </LocaleProvider>,
          document.getElementById('root')
      );
    }
  });
};
window.main();

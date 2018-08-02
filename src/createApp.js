import React from 'react';
import Loadable from 'react-loadable';
import { Provider } from 'mobx-react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const createApp = ({ stores, isNode = false, modules }) => {
  const getRouter = () => {
    if(isNode) {
      return <StaticRouter>
        {renderRoutes(routes)}
      </StaticRouter>
    }
    return <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  }
  if(process.env.NODE_ENV === 'production'){
    return (
      <LocaleProvider locale={zhCN}>
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <Provider {...stores}>
            {getRouter()}
          </Provider>
        </Loadable.Capture>
      </LocaleProvider>
    )
  } else {
    return (
      <LocaleProvider locale={zhCN}>
        <Provider {...stores}>
          {getRouter()}
        </Provider>
      </LocaleProvider>
    )
  }

}

export default createApp;

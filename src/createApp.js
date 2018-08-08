import React from 'react';
import { Provider } from 'mobx-react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const createApp = ({ stores, isNode = false }) => {
  const getRouter = () => {
    if (isNode) {
      return <StaticRouter>{renderRoutes(routes)}</StaticRouter>;
    }
    return <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>;
  };
  return (
    <LocaleProvider locale={zhCN}>
      <Provider {...stores}>{getRouter()}</Provider>
    </LocaleProvider>
  );
};

export default createApp;

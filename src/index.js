import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Loadable from 'react-loadable';
import { createStoresFromState } from './store/utils';
import createApp from './createApp';

const initialState = {};
const stores = createStoresFromState(initialState);
const ROOT = document.getElementById('root');

Loadable.preloadReady().then(() => {
  const application = createApp({ stores });
  if (typeof document !== 'undefined') {
    render(application, ROOT);
  }
});

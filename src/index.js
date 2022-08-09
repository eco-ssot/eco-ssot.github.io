import React from 'react';

import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';

import { msalInstance, MsalProvider } from './ad';
import App from './app/App';
import { store } from './app/store';

import './i18n';
import './index.css';

if (process.env.REACT_APP_MOCK_API === '1') {
  const { worker } = require('./__mocks__/browser');
  worker.start({ onUnhandledRequest: 'bypass' });
}

if (
  process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_STAGE === 'production' &&
  !/qas/.test(window.location.hostname)
) {
  ReactGA.initialize(process.env.REACT_APP_GA_ID, { debug: false, gaOptions: { cookieDomain: 'auto' } });
  console.log = () => {};
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </Provider>
  </React.StrictMode>
);

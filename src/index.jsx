import React from 'react';

import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';

import { msalInstance, MsalProvider } from './ad';
import App from './app/App';
import { store } from './app/store';

import './i18n';
import './index.css';

function initApp() {
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
}

if (
  import.meta.env.NODE_ENV === 'production' &&
  import.meta.env.VITE_STAGE === 'production' &&
  !/qas/.test(window.location.hostname)
) {
  ReactGA.initialize(import.meta.env.VITE_GA_ID, { debug: false, gaOptions: { cookieDomain: 'auto' } });
  console.log = () => {};
}

if (import.meta.env.VITE_MOCK_API === '1') {
  import('./__mocks__/browser').then(({ worker }) => {
    worker.start({ onUnhandledRequest: 'bypass' });
    initApp();
  });
} else {
  initApp();
}

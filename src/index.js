import React from 'react';

import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';

import App from './app/App';
import { store } from './app/store';
import { KeycloakProvider } from './keycloak';
import * as serviceWorker from './serviceWorker';

import './i18n';
import './index.css';
import './styles/react-datepicker.css';

ReactDOM.render(
  <React.StrictMode>
    <KeycloakProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </KeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_STAGE === 'production') {
  ReactGA.initialize(process.env.REACT_APP_GA_ID, { debug: false, gaOptions: { cookieDomain: 'auto' } });
  console.log = () => {};
}

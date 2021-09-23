import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/App';
import { store } from './app/store';
import { KeycloakProvider } from './keycloak';
import * as serviceWorker from './serviceWorker';

import './index.css';
import './styles/react-datepicker.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <KeycloakProvider>
        <App />
      </KeycloakProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
}

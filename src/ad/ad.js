import { PublicClientApplication, EventType } from '@azure/msal-browser';

import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
  msalInstance.acquireTokenSilent({ scopes: ['https://graph.microsoft.com/.default'] }).then((res) => {
    localStorage.setItem('graph-access-token', res.accessToken);
  });
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.HANDLE_REDIRECT_START && !['/login', '/auth'].includes(window.location.pathname)) {
    sessionStorage.setItem(
      'location-from',
      JSON.stringify({ pathname: window.location.pathname, search: window.location.search, hash: window.location.hash })
    );
  }

  if (event.eventType === EventType.LOGOUT_START) {
    sessionStorage.removeItem('location-from');
  }

  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
    localStorage.setItem('token', event.payload.idToken);
  }
});

export default msalInstance;

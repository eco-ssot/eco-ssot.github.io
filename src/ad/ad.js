import { PublicClientApplication, EventType } from '@azure/msal-browser';

import { setUserProfile } from '../app/appSlice';
import { store } from '../app/store';

import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);
const accounts = msalInstance.getAllAccounts();

function initialAccount(account) {
  if (import.meta.env.VITE_MOCK_AD === '1') {
    return;
  }

  msalInstance.setActiveAccount(account);
  msalInstance.acquireTokenSilent({ scopes: ['https://graph.microsoft.com/.default'] }).then(({ accessToken }) => {
    if (accessToken) {
      localStorage.setItem('graph-access-token', accessToken);
      fetch(
        `${
          import.meta.env.VITE_GRAPH_API_URL
        }/me?$select=businessPhones,department,displayName,mail,givenName,surname,mailNickname,id,officeLocation,userPrincipalName`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ).then((res) => res.json().then((data) => store.dispatch(setUserProfile(data))));
    }
  });
}

if (accounts.length > 0) {
  initialAccount(accounts[0]);
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
    localStorage.setItem('token', event.payload.idToken);
    initialAccount(event.payload.account);
  }
});

export default msalInstance;

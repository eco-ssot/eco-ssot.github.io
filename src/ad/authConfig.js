const { REACT_APP_CLIENT_ID, REACT_APP_AUTHORITY_HOST_URI, REACT_APP_TENANT_ID } = process.env;

export const msalConfig = {
  auth: {
    clientId: REACT_APP_CLIENT_ID,
    authority: `${REACT_APP_AUTHORITY_HOST_URI}/${REACT_APP_TENANT_ID}`,
    redirectUri: `${window.location.origin}/auth`,
    navigateToLoginRequestUrl: false,
    postLogoutRedirectUri: null,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
  prompt: 'select_account',
};

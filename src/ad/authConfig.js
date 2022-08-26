export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: `${import.meta.env.VITE_AUTHORITY_HOST_URI}/${import.meta.env.VITE_TENANT_ID}`,
    redirectUri: `${window.location.origin}/login`,
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
  // prompt: 'select_account',
};

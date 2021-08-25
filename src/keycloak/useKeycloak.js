import { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useUpdateEffect } from 'react-use';

import history from '../router/history';

const token = 'token';
const idTokenParsed = {
  family_name: 'dummy',
  given_name: 'dummy',
  preferred_username: 'dummy',
};

const realmAccess = { roles: ['developer'] };
const authClient = {
  token,
  idTokenParsed,
  realmAccess,
  realm: 'dummy',
  refreshToken: token,
  idToken: token,
  authenticated: false,
  initialized: true,
  hasRealmRole: () => true,
  hasResourceRole: () => true,
  loadUserProfile: () => Promise.resolve({}),
};

export function useMockKeycloak(client = authClient) {
  const [authenticated, setAuthenticated] = useState(client.authenticated);
  const [keycloak, setKeycloak] = useState({
    ...client,
    login: () => setAuthenticated(true),
    logout: () => setAuthenticated(false),
  });

  useUpdateEffect(() => {
    authClient.authenticated = authenticated;
    setKeycloak((prev) => ({ ...prev, authenticated }));
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated]);

  return { keycloak, initialized: true };
}

export default Number(process.env.REACT_APP_MOCK) ? useMockKeycloak : useKeycloak;

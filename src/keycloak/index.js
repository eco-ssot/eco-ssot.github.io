import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { useKeycloak as _useKeycloak } from '@react-keycloak/web';

import _KeycloakProvider from './KeycloakProvider';

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

export const KeycloakProvider = Number(process.env.REACT_APP_MOCK_KEYCLOAK)
  ? ({ children }) => <>{children}</>
  : _KeycloakProvider;

export const useKeycloak = Number(process.env.REACT_APP_MOCK_KEYCLOAK)
  ? (client = authClient) => {
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
  : _useKeycloak;

import { useState } from 'react';

import { useKeycloak as _useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';

import APP_CONSTANTS from '../app/appConstants';

import _KeycloakProvider from './KeycloakProvider';

const token = 'token';
const idTokenParsed = {
  family_name: 'dummy',
  given_name: 'dummy',
  preferred_username: 'dummy',
};

const realmAccess = { roles: [APP_CONSTANTS.DEVELOPER_ROLE, APP_CONSTANTS.MAINTAINER_ROLE] };
const authClient = {
  token,
  idTokenParsed,
  realmAccess,
  realm: 'dummy',
  refreshToken: token,
  idToken: token,
  authenticated: true,
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

      const navigate = useNavigate();
      useUpdateEffect(() => {
        authClient.authenticated = authenticated;
        setKeycloak((prev) => ({ ...prev, authenticated }));
        if (!authenticated) {
          navigate('/login');
        }
      }, [authenticated]);

      return { keycloak, initialized: true };
    }
  : _useKeycloak;

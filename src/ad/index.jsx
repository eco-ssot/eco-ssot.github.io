import { useState } from 'react';

import {
  MsalProvider as _MsalProvider,
  useIsAuthenticated as _useIsAuthenticated,
  useMsal as _useMsal,
} from '@azure/msal-react';
import { useUpdateEffect } from 'react-use';

import _msalInstance from './ad';

const accounts = [{ username: 'dummy', name: 'dummy' }];
const instance = {
  authenticated: true,
  loginRedirect: () => {},
  logoutRedirect: () => {},
  getAllAccounts: () => accounts,
  setActiveAccount: () => {},
  getActiveAccount: () => accounts[0],
  acquireTokenSilent: () => ({}),
};

export const msalInstance = Number(import.meta.env.VITE_MOCK_AD) ? instance : _msalInstance;
export const MsalProvider = Number(import.meta.env.VITE_MOCK_AD) ? ({ children }) => <>{children}</> : _MsalProvider;
export const useIsAuthenticated = Number(import.meta.env.VITE_MOCK_AD)
  ? () => instance.authenticated
  : _useIsAuthenticated;

export const useMsal = Number(import.meta.env.VITE_MOCK_AD)
  ? () => {
      const [authenticated, setAuthenticated] = useState(instance.authenticated);
      const [msalInstance, setMsalInstance] = useState({
        ...instance,
        loginRedirect: () => setAuthenticated(true),
        logoutRedirect: () => setAuthenticated(false),
      });

      useUpdateEffect(() => {
        instance.authenticated = authenticated;
        setMsalInstance((prev) => ({ ...prev, authenticated }));
        if (!authenticated) {
          window.location.replace('/login');
        }
      }, [authenticated]);

      return { accounts, instance: msalInstance, inProgress: 'none' };
    }
  : _useMsal;

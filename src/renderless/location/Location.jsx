import { useEffect } from 'react';

import ReactGA from 'react-ga';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useKeycloak } from '../../keycloak';

import { setQueryParams, setHash } from './locationSlice';

export default function Location() {
  const { pathname, search, hash } = useLocation();
  const { keycloak } = useKeycloak();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setQueryParams(search));
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(setHash(hash));
  }, [hash, dispatch]);

  useEffect(() => {
    if (process.env.REACT_APP_STAGE === 'production') {
      const { given_name = '', preferred_username = '', email = '' } = keycloak?.idTokenParsed || {};
      if (given_name && preferred_username) {
        ReactGA.set({ userId: `${preferred_username}-${given_name}-${email}` });
        ReactGA.pageview(`${pathname}${search}${hash}`);
      }
    }
  }, [pathname, search, hash, keycloak?.idTokenParsed]);

  return null;
}

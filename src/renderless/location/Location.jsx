import { useEffect } from 'react';

import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { selectUserProfile } from '../../app/appSlice';
import useAuth from '../../hooks/useAuth';

import { setQueryParams, setHash } from './locationSlice';

export default function Location() {
  const { pathname, search, hash } = useLocation();
  const { user } = useAuth();
  const userProfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setQueryParams(search));
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(setHash(hash));
  }, [hash, dispatch]);

  useEffect(() => {
    if (process.env.REACT_APP_STAGE === 'production' && !/qas/.test(window.location.hostname)) {
      if (user && userProfile) {
        ReactGA.set({ userId: `${user.username || userProfile.mailNickname}-${user.first_name}-${user.email}` });
        ReactGA.pageview(`${pathname}${search}${hash}`);
      }
    }
  }, [pathname, search, hash, user, userProfile]);

  return null;
}

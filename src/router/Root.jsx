import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { setLoadingPage } from '../app/appSlice';

export default function Root() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoadingPage({ [pathname]: false }));
  }, [pathname, dispatch]);

  return <Outlet />;
}

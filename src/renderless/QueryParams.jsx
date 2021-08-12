import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setQueryParams } from '../router/routerSlice';

export default function QueryParams() {
  const { search } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => dispatch(setQueryParams(search)), [search, dispatch]);
  return null;
}

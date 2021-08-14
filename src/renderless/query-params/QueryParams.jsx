import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setQueryParams } from './queryParamsSlice';

export default function QueryParams() {
  const { search } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => dispatch(setQueryParams(search)), [search, dispatch]);
  return null;
}

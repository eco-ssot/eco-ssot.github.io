import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { setQueryParams, setHash } from './locationSlice';

export default function Location() {
  const { search, hash } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => dispatch(setQueryParams(search)), [search, dispatch]);
  useEffect(() => dispatch(setHash(hash)), [hash, dispatch]);
  return null;
}

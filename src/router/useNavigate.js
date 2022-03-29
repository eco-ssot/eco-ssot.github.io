import { useCallback } from 'react';

import qs from 'query-string';
import { useNavigate as _useNavigate } from 'react-router-dom';

import APP_CONSTANTS from '../app/appConstants';

export default function useNavigate() {
  const _navigate = _useNavigate();
  const navigate = useCallback(
    ({ hash = window.location.hash.slice(1), ...query } = {}, { merge = true, skipNull = true } = {}) => {
      const search = qs.stringify(
        {
          ...(merge
            ? qs.parse(window.location.search)
            : qs.parse(qs.pick(window.location.search, APP_CONSTANTS.GLOBAL_QUERY_KEYS))),
          ...query,
        },
        { skipNull }
      );

      _navigate({ search, hash });
    },
    [_navigate]
  );

  return navigate;
}

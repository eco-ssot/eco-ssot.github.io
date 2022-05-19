import { useCallback, useMemo } from 'react';

import qs from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';

import APP_CONSTANTS from '../app/appConstants';

export default function useMyNavigate() {
  const [searchParams] = useSearchParams();
  const q = useMemo(() => Object.fromEntries(searchParams), [searchParams]);
  const _navigate = useNavigate();
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

  return [q, navigate];
}

import { forwardRef, useCallback, useEffect, useTransition } from 'react';

import qs from 'query-string';
import { useDispatch } from 'react-redux';
import { NavLink, useLinkClickHandler } from 'react-router-dom';

import APP_CONSTANTS from '../app/appConstants';
import { setLoadingPage } from '../app/appSlice';
import { store } from '../app/store';
import usePlantPermission from '../hooks/usePlantPermission';

const MyNavLink = forwardRef(
  (
    { onClick, state, target, to, api, prefetchEndpoints, prefetchApis, onMouseEnter, replace = false, ...rest },
    ref
  ) => {
    const handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
    });

    const plantPermission = usePlantPermission();
    const getQuery = useCallback(
      (queryKeys) => {
        if (!queryKeys?.length) {
          return { PREFETCH: state?.from };
        }

        const query = qs.parse(to?.search);
        const nextQuery = queryKeys?.reduce(
          (prev, curr) => {
            const key = APP_CONSTANTS.GLOBAL_QUERY_KEY_ALIAS[curr] || curr;
            const value = query[curr];
            return {
              ...prev,
              [key]: value,
              ...(key === 'is_ytm' && {
                [key]: value === undefined ? undefined : value && value === APP_CONSTANTS.PERIOD_TYPES.YTM,
              }),
              ...(key === 'permission' && {
                permission: plantPermission,
              }),
            };
          },
          { PREFETCH: state?.from }
        );

        return nextQuery;
      },
      [plantPermission, to?.search, state?.from]
    );

    const [pending, startTransition] = useTransition();
    const navigate = useCallback(
      (e) => {
        startTransition(() => {
          onClick?.(e);
          if (!e?.defaultPrevented) {
            handleClick(e);
          }
        });
      },
      [onClick, handleClick]
    );

    const onPrefetch = useCallback(
      (e) => {
        onMouseEnter?.(e);
        prefetchApis?.forEach(({ api, endpoints }) =>
          endpoints.forEach((endpoint) => {
            store.dispatch(
              api.util?.prefetch(endpoint.name, getQuery(endpoint.queryKeys), {
                force: false,
                ifOlderThan: false,
              })
            );
          })
        );
      },
      [onMouseEnter, prefetchApis, getQuery]
    );

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setLoadingPage({ [to?.pathname || to]: pending }));
    }, [to, pending, dispatch]);

    return (
      <>
        <NavLink
          {...rest}
          state={state}
          to={to}
          onClick={navigate}
          ref={ref}
          target={target}
          onMouseEnter={onPrefetch}
        />
      </>
    );
  }
);

export default MyNavLink;

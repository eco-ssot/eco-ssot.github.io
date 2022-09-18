import { forwardRef, startTransition, useCallback } from 'react';

import qs from 'query-string';
import { useDispatch } from 'react-redux';
import { NavLink, useLinkClickHandler, useLocation, useResolvedPath } from 'react-router-dom';

import APP_CONSTANTS from '../app/appConstants';
import { setLoadingPage } from '../app/appSlice';
import { store } from '../app/store';
import usePlantPermission from '../hooks/usePlantPermission';

const MyNavLink = forwardRef(
  ({ state, target, to, api, prefetchApis, onMouseEnter, replace = false, end = true, ...rest }, ref) => {
    const { pathname } = useLocation();
    const { pathname: nextPathname } = useResolvedPath(to);
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

    const dispatch = useDispatch();
    const navigate = useCallback(
      (e) => {
        e.preventDefault();
        if (pathname !== nextPathname) {
          dispatch(setLoadingPage({ [nextPathname]: true }));
        }

        startTransition(() => handleClick(e));
      },
      [pathname, nextPathname, handleClick, dispatch]
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

    return (
      <NavLink
        state={state}
        to={to}
        onClick={navigate}
        ref={ref}
        target={target}
        onMouseEnter={onPrefetch}
        replace={replace}
        end={end}
        {...rest}
      />
    );
  }
);

export default MyNavLink;

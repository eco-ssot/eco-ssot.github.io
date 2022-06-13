import { forwardRef, useCallback, useTransition } from 'react';

import qs from 'query-string';
import { NavLink, useLinkClickHandler } from 'react-router-dom';

import APP_CONSTANTS from '../app/appConstants';
import usePlantPermission from '../hooks/usePlantPermission';

const MyNavLink = forwardRef(
  ({ onClick, state, target, to, api, prefetchEndpoints, prefetchApis, replace = false, ...rest }, ref) => {
    const handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
    });

    const plantPermission = usePlantPermission();
    const getQuery = useCallback(
      (queryKeys) => {
        if (!queryKeys?.length) {
          return undefined;
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
          { PREFETCH: undefined }
        );

        return nextQuery;
      },
      [plantPermission, to?.search]
    );

    const prefetchTriggers = prefetchApis?.reduce(
      (prev, curr) =>
        prev.concat(
          curr?.endpoints?.map((endpoint) => ({
            trigger: curr?.api?.usePrefetch(endpoint?.name),
            query: getQuery(endpoint?.queryKeys),
          }))
        ),
      []
    );

    const [, startTransition] = useTransition();
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

    return (
      <>
        <NavLink
          {...rest}
          to={to}
          onClick={navigate}
          ref={ref}
          target={target}
          onMouseEnter={(e) => {
            rest.onMouseEnter?.(e);
            prefetchTriggers?.forEach(({ trigger, query }) => {
              trigger?.(query);
            });
          }}
        />
      </>
    );
  }
);

export default MyNavLink;

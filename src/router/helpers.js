import { lazy } from 'react';

import qs from 'query-string';

import APP_CONSTANTS from '../app/appConstants';

import history from './history';

export function navigate({ hash = window.location.hash.slice(1), ...query } = {}, { merge = true } = {}) {
  const search = qs.stringify(
    {
      ...(merge
        ? qs.parse(window.location.search)
        : qs.parse(qs.pick(window.location.search, APP_CONSTANTS.GLOBAL_QUERY_KEYS))),
      ...query,
    },
    { skipNull: true }
  );

  const nextUrl = `?${search}${hash ? `#${hash}` : ''}`;
  if (nextUrl !== window.location.href.replace(window.location.origin, '')) {
    history.push(nextUrl);
  }
}

export const lazyPreload = (factory) => {
  const component = lazy(factory);
  component.preload = factory;
  return component;
};

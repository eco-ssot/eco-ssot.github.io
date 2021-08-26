import qs from 'query-string';

import history from './history';

export function navigate({ hash = window.location.hash.slice(1), ...query } = {}, options = {}) {
  console.log({ hash, ...query });
  const search = qs.stringify({ ...qs.parse(window.location.search), ...query }, { skipNull: true, ...options });
  const nextUrl = `?${search}${hash ? `#${hash}` : ''}`;
  if (nextUrl !== window.location.href.replace(window.location.origin, '')) {
    history.push(nextUrl);
  }
}

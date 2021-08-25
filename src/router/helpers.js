import qs from 'query-string';

import history from './history';

export function navigate(query = {}, options = {}) {
  const search = qs.stringify(
    { ...qs.parse(window.location.href.split('?')[1]), ...query },
    { skipNull: true, ...options }
  );

  if (search !== window.location.href.split('?')[1]) {
    history.push(`?${search}`);
  }
}

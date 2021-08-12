import qs from 'query-string';

import history from './history';

export function navigate({ query = {} } = {}) {
  const search = qs.stringify({ ...qs.parse(window.location.href.split('?')[1]), ...query });
  if (search !== '' && search !== window.location.href.split('?')[1]) {
    history.push(`?${search}`);
  }
}

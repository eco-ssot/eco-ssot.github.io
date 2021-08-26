import qs from 'query-string';

import history from './history';

export function navigate(query = {}, options = {}) {
  const search = qs.stringify({ ...qs.parse(window.location.search), ...query }, { skipNull: true, ...options });
  if (search !== window.location.search) {
    history.push(`?${search}`);
  }
}

import history from './history';

export function navigate({ query = {} } = {}) {
  const search = toSearch(query);
  if (search !== '' && search !== window.location.href.split('?')[1]) {
    history.push(`?${search}`);
  }
}

export function toSearch(query = {}) {
  return Object.entries(query)
    .reduce((prev, [key, value]) => prev.concat(`${key}=${value}`), [])
    .join('&');
}

export function toQuery(search = '') {
  return search
    .slice(1)
    .split('&')
    .reduce((prev, curr) => {
      const [key, value] = curr.split('=');
      return {
        ...prev,
        [key]: value,
      };
    }, {});
}

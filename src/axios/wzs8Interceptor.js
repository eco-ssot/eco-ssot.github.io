import qs from 'query-string';

export default function wzs8Interceptor(config) {
  const { query } = qs.parseUrl(config.url);
  if (query.p === 'WZS-8' || query.plant === 'WZS-8') {
    const roles = JSON.parse(localStorage.getItem('roles'));
    if (roles && !(roles.includes('WZS-8') || roles.includes('DEV'))) {
      throw Error('Permission Denied');
    }
  }

  return config;
}

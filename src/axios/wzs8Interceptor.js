import qs from 'query-string';

export default function wzs8Interceptor(config) {
  const roles = JSON.parse(localStorage.getItem('roles'));
  const { query } = qs.parseUrl(config.url);
  if ((query.p === 'WZS-8' || query.plant === 'WZS-8') && !(roles.includes('WZS-8') || roles.includes('DEV'))) {
    throw Error('Permission Denied');
  }

  return config;
}

import { useLocation } from 'react-router-dom';
import { useTitle } from 'react-use';

import { privateRoutes, subRoutes } from '../../router/routes';

export default function TabTitle() {
  const { pathname } = useLocation();
  const title = privateRoutes.concat(subRoutes).find(({ path }) => path === pathname)?.title || '';
  useTitle(title ? `${title} - ECO SSOT` : 'ECO SSOT');
  return null;
}

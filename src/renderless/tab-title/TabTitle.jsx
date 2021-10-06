import { useLocation } from 'react-router-dom';
import { useTitle } from 'react-use';

import { privateRoutes } from '../../router/routes';

export default function TabTitle() {
  const { pathname } = useLocation();
  const title = privateRoutes.find(({ path }) => pathname.startsWith(path))?.title || '';
  useTitle(title ? `${title} - ECO SSOT` : 'ECO SSOT');
  return null;
}

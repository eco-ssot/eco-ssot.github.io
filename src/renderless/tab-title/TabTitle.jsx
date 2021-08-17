import { useTitle, useLocation } from 'react-use';

import { privateRoutes } from '../../router/routes';

export default function TabTitle() {
  const location = useLocation();
  const title = privateRoutes.find(({ path }) => new RegExp(path).test(location.href))?.title || '';
  useTitle(title ? `ECO SSOT - ${title}` : 'ECO SSOT');
  return null;
}

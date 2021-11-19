import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useTitle } from 'react-use';

import { privateRoutes } from '../../router/routes';

export default function TabTitle() {
  const { pathname } = useLocation();
  const { t } = useTranslation('homePage', { keyPrefix: 'navbar' });
  const title = privateRoutes.find(({ path }) => pathname.startsWith(path))?.key;
  useTitle(title ? `${t(title)} - ECO SSOT` : 'ECO SSOT');
  return null;
}

import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useTitle } from 'react-use';

import routes from '../../router/routes';

export default function TabTitle() {
  const { pathname } = useLocation();
  const { t } = useTranslation(['location']);
  const title = useMemo(() => {
    if (pathname === '/') {
      return 'home';
    }

    return (
      routes.find((route) => route.path === pathname) ||
      routes.find(
        (route) => pathname.startsWith(route.path) && route.routes?.find((_route) => pathname.endsWith(_route.path))
      )
    )?.i18nKey;
  }, [pathname]);

  useTitle(title ? `${t(title)} - ECO SSOT` : 'ECO SSOT');
  return null;
}

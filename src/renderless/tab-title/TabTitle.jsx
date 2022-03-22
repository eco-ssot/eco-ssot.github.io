import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useTitle } from 'react-use';

import { isMatched } from '../../router/helpers';
import routes from '../../router/routes';

export default function TabTitle() {
  const { pathname } = useLocation();
  const { t } = useTranslation(['location']);
  const title = useMemo(() => routes.find(isMatched(pathname))?.i18nKey, [pathname]);
  useTitle(title ? `${t(title)} - ECO SSOT` : 'ECO SSOT');
  return null;
}

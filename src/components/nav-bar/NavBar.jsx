import clsx from 'clsx';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import { isMatched } from '../../router/helpers';
import { privateRoutes } from '../../router/routes';

export function preloadElements({ element, routes }) {
  element?.preload?.();
  routes?.forEach(preloadElements);
}

export default function NavBar({ className }) {
  const { t } = useTranslation(['location']);
  const { pathname, search } = useLocation();
  return (
    <div className={clsx('flex flex-grow space-x-4', className)}>
      {privateRoutes
        .filter((route) => !route.hidden)
        .map(({ index, indexPath, path, i18nKey, element, routes }) => {
          return (
            <div
              onMouseEnter={() => preloadElements({ element, routes })}
              aria-label={`nav-${i18nKey}`}
              key={i18nKey}
              className={
                isMatched(pathname)({ index, indexPath, path })
                  ? 'border-primary-600 text-gray-50 inline-flex items-center px-1 pt-1 border-b-2'
                  : 'border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1'
              }>
              <Link
                to={{
                  pathname: path,
                  state: { from: pathname },
                  search: qs.pick(search, APP_CONSTANTS.GLOBAL_QUERY_KEYS),
                }}
                className="text-current text-lg font-medium">
                <span className="block truncate">{t(i18nKey)}</span>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

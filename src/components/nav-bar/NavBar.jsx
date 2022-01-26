import clsx from 'clsx';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { privateRoutes } from '../../router/routes';

export default function NavBar({ className }) {
  const { t } = useTranslation(['homePage'], { keyPrefix: 'navbar' });
  const { pathname, search } = useLocation();
  return (
    <div className={clsx('flex flex-grow space-x-4', className)}>
      {privateRoutes
        .filter(({ show = true }) => show)
        .map(({ path, key, group }) => {
          return (
            <div
              key={key}
              className={
                pathname === path || pathname.startsWith(group)
                  ? 'border-primary-600 text-gray-50 inline-flex items-center px-1 pt-1 border-b-2'
                  : 'border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1'
              }>
              <Link
                to={{
                  pathname: path,
                  state: { from: pathname },
                  search: qs.pick(search, ['business', 'y', 'm', 'cy']),
                }}
                className="text-current text-lg font-medium">
                <span className="block truncate">{t(key)}</span>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

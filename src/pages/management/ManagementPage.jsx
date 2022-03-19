import { useCallback } from 'react';

import clsx from 'clsx';
import { nanoid } from 'nanoid';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { useLocation, Link, Outlet } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import Button from '../../components/button/Button';
import useAdmin from '../../hooks/useAdmin';
import { managementRoutes } from '../../router/routes';

export function Nav({ hidden, children, to, search, onMouseEnter = () => {} }) {
  const match = false;
  return (
    <Link
      onMouseEnter={onMouseEnter}
      to={{ pathname: to, search: qs.pick(search, APP_CONSTANTS.GLOBAL_QUERY_KEYS) }}
      className={clsx('flex items-center h-10 relative', match && 'bg-gray-50 bg-opacity-10', hidden && 'hidden')}>
      {match && <div className="absolute w-1 h-full bg-primary-600"></div>}
      <div className={clsx('ml-4', match && 'font-medium')}>{children}</div>
    </Link>
  );
}

export default function ManagementPage() {
  const { t } = useTranslation(['managementPage', 'common', 'component']);
  const { keycloak, roles } = useAdmin();
  const { pathname, search } = useLocation();
  const logout = useCallback(() => {
    const from = JSON.parse(sessionStorage.getItem('location-from'));
    sessionStorage.setItem('location-from', JSON.stringify({ ...from, logout: true }));
    keycloak?.logout();
  }, [keycloak]);

  const { given_name = '-', preferred_username = '-' } = keycloak?.idTokenParsed || {};
  return (
    <div className="grid grid-cols-8 grid-rows-2 max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] w-full p-4 gap-4 overflow-hidden">
      <div className="row-span-2 col-span-1">
        <div className="bg-primary-900 rounded shadow py-4 h-full flex flex-col">
          <div className="flex flex-grow flex-col space-y-4 ">
            <div className="space-y-2 pb-4 mx-4 border-b border-divider">
              <div className="text-primary-600">User Name</div>
              <div>{given_name}</div>
            </div>
            <div className="space-y-4 pb-4 mx-4 border-b border-divider">
              <div className="space-y-2">
                <div className="text-primary-600">Dept / ID</div>
                <div>{`- / ${preferred_username}`}</div>
              </div>
              <div className="space-y-2">
                <div className="text-primary-600">Level</div>
                <div>{roles.filter((role) => role !== APP_CONSTANTS.DEVELOPER_ROLE).join(' / ')}</div>
              </div>
            </div>
            <div className="flex flex-col py-4 space-y-2">
              {managementRoutes.map(({ index, indexPath, path, i18nKey, element }) => {
                const match = pathname.endsWith(path) || (index && pathname === indexPath);
                return (
                  <Link
                    key={nanoid()}
                    onMouseEnter={() => element?.preload?.()}
                    to={{ pathname: path, search: qs.pick(search, APP_CONSTANTS.GLOBAL_QUERY_KEYS) }}
                    className={clsx('flex items-center h-10 relative', match && 'bg-gray-50 bg-opacity-10')}>
                    {match && <div className="absolute w-1 h-full bg-primary-600"></div>}
                    <div className={clsx('ml-4', match && 'font-medium')}>{t(`managementPage:nav.${i18nKey}`)}</div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="border-t border-divider text-center mx-4">
            <Button className="mt-4" onClick={() => logout()}>
              {t('component:button.logout')}
            </Button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

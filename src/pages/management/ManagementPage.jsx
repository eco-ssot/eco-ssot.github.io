import { useCallback, useMemo } from 'react';

import clsx from 'clsx';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { useLocation, Outlet, NavLink } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import Button from '../../components/button/Button';
import useAdmin from '../../hooks/useAdmin';
import { managementRoutes } from '../../router/routes';

export default function ManagementPage() {
  const { t } = useTranslation(['managementPage', 'common', 'component']);
  const { keycloak, roles } = useAdmin();
  const { pathname, search } = useLocation();
  const logout = useCallback(() => {
    const from = JSON.parse(sessionStorage.getItem('location-from'));
    sessionStorage.setItem('location-from', JSON.stringify({ ...from, logout: true }));
    keycloak?.logout();
  }, [keycloak]);

  const tabs = useMemo(() => managementRoutes.filter((route) => !route.hidden), []);
  const isMatched = useCallback(({ isActive, index }) => isActive || (index && pathname === '/management'), [pathname]);
  const { given_name = '-', preferred_username = '-' } = keycloak?.idTokenParsed || {};
  return (
    <div className="grid h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-full grid-cols-8 grid-rows-2 gap-4 overflow-hidden p-4">
      <div className="col-span-1 row-span-2">
        <div className="flex h-full flex-col rounded bg-primary-900 py-4 shadow">
          <div className="flex flex-grow flex-col space-y-4 ">
            <div className="mx-4 space-y-2 border-b border-divider pb-4">
              <div className="text-primary-600">User Name</div>
              <div>{given_name}</div>
            </div>
            <div className="mx-4 space-y-4 border-b border-divider pb-4">
              <div className="space-y-2">
                <div className="text-primary-600">Dept / ID</div>
                <div>{`- / ${preferred_username}`}</div>
              </div>
              <div className="space-y-2">
                <div className="text-primary-600">Level</div>
                <div>{roles.filter((role) => role !== APP_CONSTANTS.DEVELOPER_ROLE).join(' / ')}</div>
              </div>
            </div>
            <div className="flex flex-col space-y-2 py-4">
              {tabs.map(({ path, i18nKey, index }, i) => {
                return (
                  <NavLink
                    key={i}
                    to={{ pathname: path, search: qs.pick(search, APP_CONSTANTS.GLOBAL_QUERY_KEYS) }}
                    className={({ isActive }) =>
                      clsx(
                        'relative flex h-10 items-center',
                        isMatched({ isActive, index }) && 'bg-gray-50 bg-opacity-10'
                      )
                    }>
                    {({ isActive }) => (
                      <>
                        {isMatched({ isActive, index }) && <div className="absolute h-full w-1 bg-primary-600"></div>}
                        <div className={clsx('ml-4', isMatched({ isActive, index }) && 'font-medium')}>
                          {t(`managementPage:nav.${i18nKey}`)}
                        </div>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div className="mx-4 border-t border-divider text-center">
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

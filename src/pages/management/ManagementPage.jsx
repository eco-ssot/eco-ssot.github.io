import { useCallback, useMemo } from 'react';

import clsx from 'clsx';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, Outlet } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import { selectUserProfile } from '../../app/appSlice';
import Button from '../../components/button/Button';
import useAuth from '../../hooks/useAuth';
import MyNavLink from '../../router/MyNavLink';
import { managementRoutes } from '../../router/routes';

export default function ManagementPage() {
  const { t } = useTranslation(['managementPage', 'common', 'component']);
  const { user, logout } = useAuth();
  const { pathname, search } = useLocation();
  const userProfile = useSelector(selectUserProfile);
  const isIndexPage = useMemo(() => pathname === '/management', [pathname]);
  const tabs = useMemo(() => managementRoutes.filter((route) => !route.hidden), []);
  const isMatched = useCallback(({ isActive, index }) => isActive || (index && isIndexPage), [isIndexPage]);
  return (
    <div className="grid h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-full grid-cols-8 grid-rows-2 gap-4 overflow-hidden p-4">
      <div className="col-span-1 row-span-2">
        <div className="flex h-full flex-col overflow-auto rounded bg-primary-900 py-4 shadow">
          <div className="flex flex-grow flex-col space-y-4 overflow-auto">
            <div className="mx-4 flex-shrink-0 space-y-2 border-b border-divider pb-4">
              <div className="text-primary-600">User Name</div>
              <div>{user?.first_name}</div>
            </div>
            <div className="mx-4 flex-shrink-0 space-y-4 border-b border-divider pb-4">
              <div className="space-y-2">
                <div className="text-primary-600">Dept / ID</div>
                <div>{`- / ${user?.username || userProfile?.mailNickname || '-'}`}</div>
              </div>
              <div className="space-y-2">
                <div className="text-primary-600">Level</div>
                <div>{user?.roles?.filter((role) => role !== APP_CONSTANTS.DEVELOPER_ROLE).join(' / ')}</div>
              </div>
            </div>
            <div className="flex flex-grow flex-col space-y-2 overflow-auto py-4">
              {tabs.map(({ path, i18nKey, index, element, prefetchApis }, i) => {
                return (
                  <MyNavLink
                    key={i}
                    to={{ pathname: path, search: qs.pick(search, APP_CONSTANTS.GLOBAL_QUERY_KEYS) }}
                    state={{ from: pathname }}
                    className={({ isActive }) =>
                      clsx(
                        'relative flex h-10 items-center',
                        isMatched({ isActive, index }) && 'bg-gray-50 bg-opacity-10'
                      )
                    }
                    onMouseEnter={() => element?.preload()}
                    prefetchApis={prefetchApis}
                  >
                    {({ isActive }) => (
                      <>
                        {isMatched({ isActive, index }) && <div className="absolute h-full w-1 bg-primary-600"></div>}
                        <div className={clsx('ml-4', isMatched({ isActive, index }) && 'font-medium')}>
                          {t(`managementPage:nav.${i18nKey}`)}
                        </div>
                      </>
                    )}
                  </MyNavLink>
                );
              })}
            </div>
          </div>
          <div className="mx-4 flex-shrink-0 border-t border-divider text-center">
            <Button
              className="mt-4"
              onClick={() => {
                const from = JSON.parse(sessionStorage.getItem('location-from'));
                sessionStorage.setItem('location-from', JSON.stringify({ ...from, logout: true }));
                logout();
              }}
            >
              {t('component:button.logout')}
            </Button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

import { useCallback } from 'react';

import clsx from 'clsx';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation, Link } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import Button from '../../components/button/Button';
import useAdmin from '../../hooks/useAdmin';
import { selectBusiness } from '../../renderless/location/locationSlice';
import { lazyPreload } from '../../router/helpers';
import { useGetUsersQuery } from '../../services/keycloakAdmin';

const CsrPage = lazyPreload(() => import('./CsrPage'));
const DataStatusPage = lazyPreload(() => import('./DataStatusPage'));
const GoalPage = lazyPreload(() => import('./GoalPage'));
const PicPage = lazyPreload(() => import('./PicPage'));
const VersionPage = lazyPreload(() => import('./VersionPage'));

export function Nav({ hidden, children, to, pathname, search, onMouseEnter = () => {} }) {
  const match = pathname.endsWith(to);
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
  const { keycloak, roles, canEdit } = useAdmin();
  const { data: users = [] } = useGetUsersQuery();
  const { pathname, search } = useLocation();
  const business = useSelector(selectBusiness);
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
              <Nav to="/management/goal" pathname={pathname} search={search} onMouseEnter={() => GoalPage.preload()}>
                {t('managementPage:nav.goal')}
              </Nav>
              <Nav
                to="/management/data-status"
                pathname={pathname}
                search={search}
                onMouseEnter={() => DataStatusPage.preload()}>
                {t('managementPage:nav.dataStatus')}
              </Nav>
              <Nav to="/management/csr" pathname={pathname} search={search} onMouseEnter={() => CsrPage.preload()}>
                {t('managementPage:nav.csrAndFemStatus')}
              </Nav>
              <Nav to="/management/pic" pathname={pathname} search={search} onMouseEnter={() => PicPage.preload()}>
                {t('managementPage:nav.pic')}
              </Nav>
              <Nav
                to="/management/version"
                pathname={pathname}
                search={search}
                onMouseEnter={() => VersionPage.preload()}>
                {t('managementPage:nav.changelog')}
              </Nav>
            </div>
          </div>
          <div className="border-t border-divider text-center mx-4">
            <Button className="mt-4" onClick={() => logout()}>
              {t('component:button.logout')}
            </Button>
          </div>
        </div>
      </div>
      <Switch>
        <Route exact path="/management/goal">
          <GoalPage business={business} canEdit={canEdit} />
        </Route>
        <Route exact path="/management/data-status">
          <DataStatusPage />
        </Route>
        <Route exact path="/management/csr">
          <CsrPage />
        </Route>
        <Route exact path="/management/pic">
          <PicPage canEdit={canEdit} users={users} />
        </Route>
        <Route exact path="/management/version">
          <VersionPage />
        </Route>
        <Redirect
          exact
          from="/management"
          to={{ pathname: '/management/goal', search: qs.pick(search, APP_CONSTANTS.GLOBAL_QUERY_KEYS) }}
        />
      </Switch>
    </div>
  );
}

import { useMemo } from 'react';

import clsx from 'clsx';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import MyNavLink from '../../router/MyNavLink';
import { wasteDetailRoute, wasteRoute } from '../../router/routes';
import TablePage from '../table-page/TablePage';

import WasteDetailTable from './WasteDetailTable';
import WasteHistoryTable from './WasteHistoryTable';
import WasteTable from './WasteTable';

export default function WastePage() {
  const { t } = useTranslation(['wastePage']);
  const { pathname, search } = useLocation();
  const isWasteDetail = useMemo(() => pathname.endsWith('/detail'), [pathname]);
  return (
    <TablePage
      title={
        <div className="relative flex items-center space-x-4">
          <MyNavLink
            to={{ pathname: '/waste', search: qs.pick(search, APP_CONSTANTS.GLOBAL_QUERY_KEYS) }}
            className={clsx('relative hover:text-gray-50', !isWasteDetail ? 'text-gray-50' : 'text-gray-400')}
            onMouseEnter={() => wasteRoute.element.preload()}
            prefetchApis={wasteRoute.prefetchApis}
            state={{ from: pathname }}>
            <div>{t('title')}</div>
            <div
              className={clsx(
                'absolute w-full border-b-2',
                !isWasteDetail ? 'border-primary-600' : 'border-transparent'
              )}></div>
          </MyNavLink>
          <MyNavLink
            to={{ pathname: '/waste/detail', search: qs.pick(search, APP_CONSTANTS.GLOBAL_QUERY_KEYS) }}
            className={clsx('relative hover:text-gray-50', isWasteDetail ? 'text-gray-50' : 'text-gray-400')}
            onMouseEnter={() => wasteDetailRoute.element.preload()}
            prefetchApis={wasteDetailRoute.prefetchApis}
            state={{ from: pathname }}>
            <div>{t('subtitle')}</div>
            <div
              className={clsx(
                'absolute w-full border-b-2',
                isWasteDetail ? 'border-primary-600' : 'border-transparent'
              )}></div>
          </MyNavLink>
        </div>
      }
      downloadResource="waste"
      table={isWasteDetail ? WasteDetailTable : WasteTable}
      historyTable={WasteHistoryTable}
    />
  );
}

import { useMemo } from 'react';

import clsx from 'clsx';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import Dot from '../../components/dot/Dot';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import useGoal from '../../hooks/useGoal';
import usePlantPermission from '../../hooks/usePlantPermission';
import MyNavLink from '../../router/MyNavLink';
import { electricityAnalysisRoute } from '../../router/routes';
import { electricityApi, useGetElectricityQuery } from '../../services/electricity';
import { ratioFormatter, statisticsFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, getHidePlantRowProps, noDataRenderer } from '../../utils/table';

const HEADERS = ({ t, pct, currYear = APP_CONSTANTS.CURRENT_YEAR, lastYear = APP_CONSTANTS.LAST_YEAR } = {}) => [
  {
    key: 'electricity',
    name: t('electricityPage:table.electricity.header'),
    subHeaders: [
      { key: 'lastYear', name: `${lastYear} (a)` },
      { key: 'currYear', name: `${currYear} (b)` },
      {
        key: 'delta',
        name: t('electricityPage:table.electricity.delta'),
        renderer: targetFormatter(0, { formatter: ratioFormatter }),
      },
    ],
  },
  {
    key: 'revenue',
    name: t('electricityPage:table.revenue.header'),
    subHeaders: [
      { key: 'lastYear', name: `${lastYear} (c)`, renderer: statisticsFormatter(3) },
      { key: 'currYear', name: `${currYear} (d)`, renderer: statisticsFormatter(3) },
      {
        key: 'delta',
        name: t('electricityPage:table.revenue.delta'),
        renderer: targetFormatter(0, { formatter: ratioFormatter }),
      },
    ],
  },
  {
    key: 'revenueElectricity',
    name: t('electricityPage:table.revenueElectricity.header'),
    subHeaders: [
      { key: 'lastYear', name: `${lastYear} (e=a/c)` },
      { key: 'currYear', name: `${currYear} (f=b/d)` },
      {
        key: 'delta',
        name: t('electricityPage:table.revenueElectricity.delta'),
        renderer: (cell) => {
          const prefetchAnalysis = electricityApi.usePrefetch('getElectricityAnalysis');
          const prefetchExplanation = electricityApi.usePrefetch('getElectricityExplanation');
          const baseClassName = isFinite(cell.value)
            ? cell.value > 0
              ? 'font-semibold text-dangerous-500'
              : 'font-semibold text-green-500'
            : '';

          if (!cell.row.original.isFooter) {
            let query = {
              ...qs.parse(qs.pick(window.location.search, APP_CONSTANTS.GLOBAL_QUERY_KEYS)),
              site: cell.row.original.site,
            };

            if (cell.row.depth > 0) {
              query = {
                ...query,
                site: cell.rowsById[cell.row.id.split('.')[0]].original.site,
                plant: cell.row.original.site,
              };
            }

            query = { ...query, ...(query.s && { site: query.s }), ...(query.p && { plant: query.p }) };
            const search = qs.stringify(query);
            return (
              <MyNavLink
                className="flex items-center justify-end space-x-2"
                to={{ search, pathname: '/electricity/analysis' }}
                onMouseEnter={() => {
                  electricityAnalysisRoute.element.preload();
                  prefetchAnalysis({ ...query, PREFETCH: '/electricity' });
                  prefetchExplanation({ ...query, PREFETCH: '/electricity' });
                }}
                state={{ from: '/electricity', skipLoadingPage: true }}>
                {isFinite(cell.value) && cell.value > 0 && <Dot />}
                <div className={clsx('underline', baseClassName)}>{ratioFormatter(cell.value)}</div>
              </MyNavLink>
            );
          }

          return <div className={baseClassName}>{ratioFormatter(cell.value)}</div>;
        },
      },
    ],
  },
  {
    key: 'asp',
    name: t('electricityPage:table.asp.header'),
    subHeaders: [
      { key: 'lastYear', name: `${lastYear} (g)`, renderer: statisticsFormatter(3) },
      { key: 'currYear', name: `${currYear} (h)`, renderer: statisticsFormatter(3) },
      {
        key: 'delta',
        name: t('electricityPage:table.asp.delta'),
        renderer: targetFormatter(0, { formatter: ratioFormatter }),
      },
    ],
  },
];

const COLUMNS = ({ t, missing, pct, currYear = APP_CONSTANTS.CURRENT_YEAR, lastYear = APP_CONSTANTS.LAST_YEAR } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
      Cell: noDataRenderer({ missing }),
      className: 'whitespace-nowrap',
    },
    ...HEADERS({ t, pct, currYear, lastYear }).map(({ key, name, subHeaders = [] }) => ({
      id: name,
      Header: () => <div className="border-b border-divider py-3">{name}</div>,
      columns: subHeaders.map(({ key: _key, name: _name, renderer = statisticsFormatter(0) }) => ({
        Header: _name,
        accessor: [key, _key].join('.'),
        Cell: renderer,
        className: 'text-right',
      })),
    })),
  ]);

export default function ElectricityTable({ business, y, m, s, p, pt, missingPlants }) {
  const { t } = useTranslation(['electricityPage', 'common']);
  const plantPermission = usePlantPermission();
  const { data } = useGetElectricityQuery({
    business,
    year: y,
    month: m,
    site: s,
    plant: p,
    permission: plantPermission,
    ...(pt && {
      is_ytm: pt === APP_CONSTANTS.PERIOD_TYPES.YTM,
    }),
  });

  const { label, currYear, baseYear, pct } = useGoal({ keyword: '用電強度' });
  const columns = useMemo(
    () => COLUMNS({ t, pct, currYear, lastYear: baseYear, missing: missingPlants, periodType: pt }),
    [currYear, baseYear, t, missingPlants, pct, pt]
  );

  return (
    <>
      <DualTag
        className="absolute top-2 right-4"
        labels={[
          <div className="flex items-center">
            <GlobalDateSelect />
          </div>,
          label,
        ]}
      />
      <div className="h-6"></div>
      {data && (
        <div className="flex w-full flex-col overflow-auto rounded-t-lg shadow">
          <Table
            columns={columns}
            data={data?.data || []}
            getRowProps={getHidePlantRowProps}
            autoResetExpanded={false}
          />
        </div>
      )}
    </>
  );
}

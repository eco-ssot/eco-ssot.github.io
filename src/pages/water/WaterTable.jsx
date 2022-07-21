import { useMemo, useCallback } from 'react';

import { ArrowUpIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import Dot from '../../components/dot/Dot';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import FixedTable from '../../components/table/FixedTable';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import CustomTooltip from '../../components/tooltip/CustomTooltip';
import useGoal from '../../hooks/useGoal';
import usePlantPermission from '../../hooks/usePlantPermission';
import MyNavLink from '../../router/MyNavLink';
import { waterAnalysisRoute } from '../../router/routes';
import { useGetWaterQuery, useLazyGetWaterManpowerAsyncQuery, waterApi } from '../../services/water';
import { baseFormatter, ratioFormatter, statisticsFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, getHidePlantRowProps, noDataRenderer } from '../../utils/table';

const HEADERS = ({
  t,
  pct,
  currYear = APP_CONSTANTS.CURRENT_YEAR,
  lastYear = APP_CONSTANTS.LAST_YEAR,
  baseYear = APP_CONSTANTS.BASE_YEAR_WATER,
} = {}) => [
  {
    key: 'water',
    name: t('waterPage:table.water'),
    subHeaders: [
      { key: 'lastYear', name: lastYear },
      { key: 'currYear', name: currYear },
      { key: 'weight', name: t('common:weight'), renderer: ratioFormatter },
      { key: 'delta', name: t('common:gap'), renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
  {
    key: 'manpower',
    name: t('waterPage:table.manpower'),
    subHeaders: [
      { key: 'lastYear', name: lastYear },
      { key: 'currYear', name: currYear },
    ],
  },
  {
    key: 'waterAvg',
    name: t('waterPage:table.waterAvg'),
    subHeaders: [
      { key: 'lastYear', name: lastYear, renderer: statisticsFormatter(3) },
      { key: 'currYear', name: currYear, renderer: statisticsFormatter(3) },
      {
        key: 'delta',
        name: t('common:gap'),
        renderer: (cell) =>
          ratioFormatter(
            (cell.row.original.waterAvg?.currYear - cell.row.original.waterAvg?.lastYear) /
              cell.row.original.waterAvg?.lastYear
          ),
      },
    ],
  },
  {
    key: 'revenue',
    name: t('waterPage:table.revenue'),
    subHeaders: [
      { key: 'lastYear', name: lastYear, renderer: statisticsFormatter(3) },
      { key: 'currYear', name: currYear, renderer: statisticsFormatter(3) },
      { key: 'weight', name: t('common:weight'), renderer: ratioFormatter },
      { key: 'delta', name: t('common:gap'), renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
  {
    key: 'revenueWater',
    name: t('waterPage:table.revenueWater'),
    subHeaders: [
      { key: 'lastYear', name: lastYear },
      { key: 'currYear', name: currYear },
      {
        key: 'delta',
        name: t('common:gap'),
        renderer: targetFormatter(0, { formatter: ratioFormatter }),
      },
    ],
  },
  {
    key: 'comparison',
    name: t('waterPage:table.comparison'),
    subHeaders: [
      { key: 'baseYear', name: baseYear },
      {
        key: 'delta',
        name: t('common:gap'),
        renderer: (cell) => {
          const prefetchAnalysis = waterApi.usePrefetch('getWaterAnalysis');
          const prefetchExplanation = waterApi.usePrefetch('getWaterExplanation');
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
                to={{ search, pathname: '/water/analysis' }}
                onMouseEnter={() => {
                  waterAnalysisRoute.element.preload();
                  prefetchAnalysis({ ...query, PREFETCH: '/water' });
                  prefetchExplanation({ ...query, PREFETCH: '/water' });
                }}
                state={{ from: '/water', skipLoadingPage: true }}
              >
                {isFinite(cell.value) && cell.value > -pct && <Dot />}
                {targetFormatter(-pct, { formatter: ratioFormatter, className: 'underline' })(cell)}
              </MyNavLink>
            );
          }

          return targetFormatter(-pct, { formatter: ratioFormatter })(cell);
        },
      },
    ],
  },
];

const SUB_COLUMNS = ({ t, lastYear, currYear }) => [
  {
    Header: 'Site',
    accessor: 'site',
    rowSpan: 0,
  },
  {
    id: 'water',
    Header: () => <div className="border-b border-divider py-3">{t('waterPage:table.water')}</div>,
    columns: [
      {
        Header: lastYear,
        accessor: 'water.lastYear',
        className: 'text-right',
        Cell: baseFormatter,
      },
      {
        Header: currYear,
        accessor: 'water.currYear',
        className: 'text-right',
        Cell: baseFormatter,
      },
      {
        Header: t('common:gap'),
        accessor: 'water.delta',
        className: 'text-right',
        Cell: (cell) => {
          const value = useMemo(
            () =>
              (cell.row.original.water.currYear - cell.row.original.water.lastYear) / cell.row.original.water.lastYear,
            [cell.row.original.water.currYear, cell.row.original.water.lastYear]
          );

          return ratioFormatter(value);
        },
      },
    ],
  },
  {
    id: 'manpower',
    Header: () => <div className="border-b border-divider py-3">{t('waterPage:table.manpower')}</div>,
    columns: [
      {
        Header: lastYear,
        accessor: 'manpower.lastYear',
        className: 'text-right',
        Cell: baseFormatter,
      },
      {
        Header: currYear,
        accessor: 'manpower.currYear',
        className: 'text-right',
        Cell: baseFormatter,
      },
      {
        Header: t('common:gap'),
        accessor: 'manpower.delta',
        className: 'text-right',
        Cell: (cell) => {
          const value = useMemo(
            () =>
              (cell.row.original.manpower.currYear - cell.row.original.manpower.lastYear) /
              cell.row.original.manpower.lastYear,
            [cell.row.original.manpower.currYear, cell.row.original.manpower.lastYear]
          );

          return ratioFormatter(value);
        },
      },
    ],
  },
  {
    id: 'waterAvg',
    Header: () => <div className="border-b border-divider py-3">{t('waterPage:table.waterAvg')}</div>,
    columns: [
      {
        Header: lastYear,
        accessor: 'waterAvg.lastYear',
        className: 'text-right',
        Cell: statisticsFormatter(3),
      },
      {
        Header: currYear,
        accessor: 'waterAvg.currYear',
        className: 'text-right',
        Cell: statisticsFormatter(3),
      },
      {
        Header: t('common:gap'),
        accessor: 'waterAvg.delta',
        className: 'text-right',
        Cell: (cell) => {
          const value = useMemo(
            () =>
              (cell.row.original.waterAvg.currYear - cell.row.original.waterAvg.lastYear) /
              cell.row.original.waterAvg.lastYear,
            [cell.row.original.waterAvg.currYear, cell.row.original.waterAvg.lastYear]
          );

          return ratioFormatter(value);
        },
      },
    ],
  },
];

const COLUMNS = ({
  t,
  pct,
  missing,
  currYear = APP_CONSTANTS.CURRENT_YEAR,
  lastYear = APP_CONSTANTS.LAST_YEAR,
  baseYear = APP_CONSTANTS.BASE_YEAR_WATER,
} = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
      Cell: (cell) => {
        const [trigger, { data }] = useLazyGetWaterManpowerAsyncQuery();
        const { pt } = qs.parse(qs.pick(window.location.search, ['pt']));
        const query = useMemo(
          () => ({
            site: cell.value,
            ...(cell.row.original.parentSite && { site: cell.row.original.parentSite, plant: cell.value }),
            ...(pt && {
              is_ytm: pt === APP_CONSTANTS.PERIOD_TYPES.YTM,
            }),
          }),
          [cell.row.original.parentSite, cell.value, pt]
        );

        const columns = useMemo(() => addPaddingColumns(SUB_COLUMNS({ t, lastYear, currYear })), []);
        const _data = useMemo(
          () =>
            data?.data
              ? [
                  { ...cell.row.original },
                  {
                    ...data?.data?.[0],
                    manpower: cell.row.original?.manpower,
                    waterAvg: {
                      currYear: data?.data?.[0]?.water?.currYear / cell.row.original?.manpower?.currYear,
                      lastYear: data?.data?.[0]?.water?.lastYear / cell.row.original?.manpower?.lastYear,
                    },
                  },
                ].concat(data?.data?.slice(1))
              : data?.data,
          [cell.row.original, data?.data]
        );

        const renderTable = useCallback(
          () =>
            _data && (
              <Table
                columns={columns}
                data={_data}
                getRowProps={(row) => ({ className: clsx(row.index === _data?.length - 1 && 'border-b-0') })}
              />
            ),
          [columns, _data]
        );

        return (
          <div className="flex items-center justify-between">
            <div>{noDataRenderer({ missing })(cell)}</div>
            {!/total/i.test(cell.value) &&
              new RegExp(process.env.REACT_APP_WATER_DETAIL_SITE?.split(',').join('|'), 'i').test(cell.value) && (
                <CustomTooltip
                  arrowClassName="!bg-gray-900"
                  render={({ close }) => (
                    <div className="relative rounded bg-gray-900 p-4 shadow-lg">
                      <div className="mb-4 flex flex-col overflow-auto rounded-lg border border-divider shadow">
                        {renderTable()}
                      </div>
                      <div>＊廠區人力為計薪人力</div>
                      <div>＊宿舍人力為宿舍計算的人數，包含在計薪人力內</div>
                    </div>
                  )}
                >
                  {({ open }) => (
                    <div
                      className={clsx(
                        'rounded border hover:border-gray-50 hover:text-gray-50',
                        open ? 'border-gray-50 text-gray-50' : 'border-gray-400 text-gray-400'
                      )}
                      onMouseEnter={() => trigger(query, true)}
                    >
                      <ArrowUpIcon className="h-5 w-5 flex-shrink-0 rotate-45" />
                    </div>
                  )}
                </CustomTooltip>
              )}
          </div>
        );
      },
      className: 'whitespace-nowrap',
    },
    ...HEADERS({ t, pct, currYear, lastYear, baseYear }).map(({ key, name, subHeaders = [] }) => ({
      id: name,
      Header: () => <div className="border-b border-divider py-3">{name}</div>,
      ...(subHeaders && {
        columns: subHeaders.map(({ key: _key, name: _name, renderer = statisticsFormatter(0) }) => ({
          Header: _name,
          accessor: [key, _key].join('.'),
          Cell: renderer,
          className: 'text-right',
        })),
      }),
    })),
  ]);

export default function WaterTable({ business, y, m, s, p, pt, missingPlants }) {
  const { t } = useTranslation(['waterPage', 'common']);
  const plantPermission = usePlantPermission();
  const { data } = useGetWaterQuery({
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

  const { label, pct, currYear, baseYear } = useGoal({ keyword: '用水強度' });
  const columns = useMemo(
    () => COLUMNS({ t, pct, currYear, baseYear, lastYear: currYear - 1, missing: missingPlants }),
    [t, pct, currYear, baseYear, missingPlants]
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
      {data && (
        <>
          <div className="h-6 w-full text-right">{t('common:gapDesc')}</div>
          <div className="flex w-full flex-col space-y-2 overflow-auto rounded-t-lg shadow">
            <FixedTable
              columns={columns}
              data={data?.data || []}
              getRowProps={getHidePlantRowProps}
              autoResetExpanded={false}
            />
          </div>
        </>
      )}
    </>
  );
}

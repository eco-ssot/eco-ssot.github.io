import { useMemo } from 'react';

import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import Dot from '../../components/dot/Dot';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import useGoal from '../../hooks/useGoal';
import usePlantPermission from '../../hooks/usePlantPermission';
import { useGetWaterQuery } from '../../services/water';
import { ratioFormatter, statisticsFormatter, targetFormatter } from '../../utils/formatter';
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
      { key: 'lastYear', name: `${lastYear}年` },
      { key: 'currYear', name: `${currYear}年` },
      // { key: 'weight', name: t('common:weight'), renderer: ratioFormatter },
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
          if (cell.row.original.subRows.length > 0) {
            return (
              <div className="cursor-pointer" onClick={() => cell.row.toggleRowExpanded()}>
                {targetFormatter(-pct, { formatter: ratioFormatter, className: 'underline' })(cell)}
              </div>
            );
          }

          if (!cell.row.original.isFooter && cell.row.original.subRows.length === 0) {
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
              <Link className="flex items-center justify-end space-x-2" to={`analysis?${search}`}>
                {isFinite(cell.value) && cell.value > -pct && <Dot />}
                {targetFormatter(-pct, { formatter: ratioFormatter, className: 'underline' })(cell)}
              </Link>
            );
          }

          return targetFormatter(-pct, { formatter: ratioFormatter })(cell);
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
      Cell: noDataRenderer({ missing }),
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

export default function WaterTable({ business, y, m, s, p, missingPlants }) {
  const { t } = useTranslation(['waterPage', 'common']);
  const plantPermission = usePlantPermission();
  const { data } = useGetWaterQuery({
    business,
    year: y,
    month: m,
    site: s,
    plant: p,
    permission: plantPermission,
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
            {t('common:accumulationRange')} : <GlobalDateSelect />
          </div>,
          label,
        ]}
      />
      {data && (
        <>
          <div className="h-6 w-full text-right">{t('common:gapDesc')}</div>
          <div className="flex w-full flex-col space-y-2 overflow-auto rounded-t-lg shadow">
            <Table
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

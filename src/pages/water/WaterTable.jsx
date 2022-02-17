import { useMemo } from 'react';

import { get } from 'lodash';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import { selectMissingPlants } from '../../app/appSlice';
import Dot from '../../components/dot/Dot';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import useGoal from '../../hooks/useGoal';
import { useGetWaterQuery } from '../../services/water';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, getHidePlantRowProps, noDataRenderer } from '../../utils/table';

const HEADERS = ({
  t,
  business,
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
      { key: 'lastYear', name: lastYear, renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
      { key: 'currYear', name: currYear, renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
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
      { key: 'weight', name: t('common:weight'), renderer: ratioFormatter },
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
            const canExpand = cell.row.original.subRows.some((row) => {
              const val = get(row, cell.column.id);
              return isFinite(val) && val > -pct;
            });

            if (canExpand) {
              return (
                <div className="underline cursor-pointer" onClick={() => cell.row.toggleRowExpanded()}>
                  {targetFormatter(-pct, { formatter: ratioFormatter, className: 'underline' })(cell)}
                </div>
              );
            }
          }

          if (
            !cell.row.original.isFooter &&
            cell.row.original.subRows.length === 0 &&
            isFinite(cell.value) &&
            cell.value > -pct
          ) {
            let query = { business, site: cell.row.original.site };
            if (cell.row.depth > 0) {
              query = {
                ...query,
                site: cell.rowsById[cell.row.id.split('.')[0]].original.site,
                plant: cell.row.original.site,
              };
            }

            const search = qs.stringify(query);
            return (
              <Link className="flex items-center justify-end space-x-2" to={`/water/analysis?${search}`}>
                <Dot />
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
  business,
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
    },
    ...HEADERS({ t, business, pct, currYear, lastYear, baseYear }).map(({ key, name, subHeaders = [] }) => ({
      id: name,
      Header: () => <div className="border-b border-divider py-3">{name}</div>,
      ...(subHeaders && {
        columns: subHeaders.map(({ key: _key, name: _name, renderer = baseFormatter }) => ({
          Header: _name,
          accessor: [key, _key].join('.'),
          Cell: renderer,
          className: 'text-right',
        })),
      }),
    })),
  ]);

export default function WaterTable({ business, y, m }) {
  const { t } = useTranslation(['waterPage', 'common']);
  const { data } = useGetWaterQuery({ business, year: y, month: m });
  const missingPlants = useSelector(selectMissingPlants);
  const { label, pct, currYear, baseYear } = useGoal({ keyword: '用水強度' });
  const columns = useMemo(
    () => COLUMNS({ t, business, pct, currYear, baseYear, lastYear: currYear - 1, missing: missingPlants }),
    [business, pct, currYear, baseYear, t, missingPlants]
  );

  return (
    <>
      <DualTag
        className="absolute top-2 right-4"
        labels={[
          <div className="flex items-center">
            {`${t('common:accumulationRange')} : `}
            <GlobalDateSelect />
          </div>,
          label,
        ]}
      />
      {data && (
        <>
          <div className="w-full h-6 text-right">{t('common:gapDesc')}</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg space-y-2">
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

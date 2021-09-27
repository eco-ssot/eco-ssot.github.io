import { useMemo } from 'react';

import { get } from 'lodash';
import qs from 'query-string';
import { Link } from 'react-router-dom';

import Dot from '../../components/dot/Dot';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import APP_CONFIG from '../../constants/app-config';
import useGoal from '../../hooks/useGoal';
import { useGetWaterQuery } from '../../services/water';
import { formatMonthRange } from '../../utils/date';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

const HEADERS = ({
  business,
  pct,
  currYear = APP_CONFIG.CURRENT_YEAR,
  lastYear = APP_CONFIG.LAST_YEAR,
  baseYear = APP_CONFIG.BASE_YEAR_WATER,
} = {}) => [
  {
    key: 'water',
    name: '用水量 (公噸)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年` },
      { key: 'currYear', name: `${currYear}年` },
      { key: 'weight', name: '權重', renderer: ratioFormatter },
      { key: 'delta', name: '增減率', renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
  {
    key: 'revenue',
    name: '營業額 (十億台幣)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年`, renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
      { key: 'currYear', name: `${currYear}年`, renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
      { key: 'weight', name: '權重', renderer: ratioFormatter },
      { key: 'delta', name: '增減率', renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
  {
    key: 'revenueWater',
    name: '十億營業額用水 (公噸)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年` },
      { key: 'currYear', name: `${currYear}年` },
      { key: 'weight', name: '權重', renderer: ratioFormatter },
      {
        key: 'delta',
        name: '增減率',
        renderer: targetFormatter(0, { formatter: ratioFormatter }),
      },
    ],
  },
  {
    key: 'comparison',
    name: '對比基準年',
    subHeaders: [
      { key: 'baseYear', name: `${baseYear}年` },
      {
        key: 'delta',
        name: '增減率',
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
  business,
  pct,
  currYear = APP_CONFIG.CURRENT_YEAR,
  lastYear = APP_CONFIG.LAST_YEAR,
  baseYear = APP_CONFIG.BASE_YEAR_WATER,
} = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
    },
    ...HEADERS({ business, pct, currYear, lastYear, baseYear }).map(({ key, name, subHeaders = [] }) => ({
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

export default function WaterTable({ business }) {
  const { data } = useGetWaterQuery({ business });
  const { label, pct, currYear, baseYear } = useGoal({ keyword: '用水強度' });
  const columns = useMemo(
    () => COLUMNS({ business, pct, currYear, baseYear, lastYear: currYear - 1 }),
    [business, pct, currYear, baseYear]
  );

  return (
    <>
      <DualTag
        className="absolute top-2 right-4"
        labels={[
          <>
            累計區間：<span className="text-lg font-medium">{formatMonthRange(data?.maxDate)}</span>
          </>,
          label,
        ]}
      />
      {data && (
        <>
          <div className="w-full h-6 text-right">* 增減率 = (當年度 − 上年度) / 上年度</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg space-y-2">
            <Table columns={columns} data={data?.data || []} />
          </div>
        </>
      )}
    </>
  );
}

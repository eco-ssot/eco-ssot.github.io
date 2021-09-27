import { useMemo } from 'react';

import { get } from 'lodash';
import qs from 'query-string';
import { Link } from 'react-router-dom';

import Dot from '../../components/dot/Dot';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import APP_CONFIG from '../../constants/app-config';
import useGoal from '../../hooks/useGoal';
import { useGetElectricityQuery } from '../../services/electricity';
import { formatMonthRange } from '../../utils/date';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

const HEADERS = ({ business, currYear = APP_CONFIG.CURRENT_YEAR, lastYear = APP_CONFIG.LAST_YEAR } = {}) => [
  {
    key: 'electricity',
    name: '用電量 (度)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年 (a)` },
      { key: 'currYear', name: `${currYear}年 (b)` },
      { key: 'delta', name: '增減率 (b/a-1)', renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
  {
    key: 'revenue',
    name: '營業額 (十億新台幣)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年 (c)` },
      { key: 'currYear', name: `${currYear}年 (d)` },
      { key: 'delta', name: '增減率 (d/c-1)', renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
  {
    key: 'revenueElectricity',
    name: '十億營業額用電 (度)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年 (e=a/c)` },
      { key: 'currYear', name: `${currYear}年 (f=b/d)` },
      {
        key: 'delta',
        name: '增減率 (f/e-1)',
        renderer: (cell) => {
          if (cell.row.original.subRows.length > 0) {
            const canExpand = cell.row.original.subRows.some((row) => {
              const val = get(row, cell.column.id);
              return isFinite(val) && val > 0;
            });

            if (canExpand) {
              return (
                <div className=" cursor-pointer" onClick={() => cell.row.toggleRowExpanded()}>
                  {targetFormatter(0, { formatter: ratioFormatter, className: 'underline' })(cell)}
                </div>
              );
            }
          }

          if (
            !cell.row.original.isFooter &&
            cell.row.original.subRows.length === 0 &&
            isFinite(cell.value) &&
            cell.value > 0
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
              <Link className="flex items-center justify-end space-x-2 " to={`/electricity/analysis?${search}`}>
                <Dot />
                {targetFormatter(0, { formatter: ratioFormatter, className: 'underline' })(cell)}
              </Link>
            );
          }

          return targetFormatter(0, { formatter: ratioFormatter })(cell);
        },
      },
    ],
  },
  {
    key: 'asp',
    name: 'ASP (千台幣/台)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年 (g)`, renderer: (value) => baseFormatter(value, { precision: 1 }) },
      { key: 'currYear', name: `${currYear}年 (h)`, renderer: (value) => baseFormatter(value, { precision: 1 }) },
      { key: 'delta', name: '增減率 (h/g-1)', renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
];

const COLUMNS = ({ business, currYear = APP_CONFIG.CURRENT_YEAR, lastYear = APP_CONFIG.LAST_YEAR } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
    },
    ...HEADERS({ business, currYear, lastYear }).map(({ key, name, subHeaders = [] }) => ({
      id: name,
      Header: () => <div className="border-b border-divider py-3">{name}</div>,
      columns: subHeaders.map(({ key: _key, name: _name, renderer = baseFormatter }) => ({
        Header: _name,
        accessor: [key, _key].join('.'),
        Cell: renderer,
        className: 'text-right',
      })),
    })),
  ]);

export default function ElectricityTable({ business }) {
  const { data } = useGetElectricityQuery({ business });
  const { label, pct, currYear, baseYear } = useGoal({ keyword: '用電強度' });
  const columns = useMemo(
    () => COLUMNS({ business, pct, currYear, lastYear: baseYear }),
    [business, pct, currYear, baseYear]
  );

  return (
    <>
      <DualTag
        className="absolute top-4 right-4"
        labels={[
          <>
            累計區間：<span className="text-lg font-medium">{formatMonthRange(data?.maxDate)}</span>
          </>,
          label,
        ]}
      />
      <div className="h-6"></div>
      {data && (
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
          <Table columns={columns} data={data?.data || []} />
        </div>
      )}
    </>
  );
}

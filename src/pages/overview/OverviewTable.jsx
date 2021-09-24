import { useMemo } from 'react';

import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import APP_CONFIG from '../../constants/app-config';
import { useGetOverviewQuery } from '../../services/overview';
import { formatMonthRange } from '../../utils/date';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

export const HEADERS = [
  { key: 'electricity', name: '用電量 (度)' },
  { key: 'water', name: '用水量 (公噸)' },
  { key: 'revenue', name: '營業額 (十億台幣)', renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
  { key: 'asp', name: 'ASP (千台幣/台)', renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
];

export const COLUMNS = ({ currYear = APP_CONFIG.CURRENT_YEAR, lastYear = APP_CONFIG.LAST_YEAR } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
    },
    ...HEADERS.map(({ key, name, renderer = baseFormatter }) => ({
      id: name,
      Header: () => <div className="border-b border-divider py-3">{name}</div>,
      columns: [
        {
          Header: `${lastYear}年`,
          accessor: [key, 'lastYear'].join('.'),
          Cell: renderer,
          className: 'text-right',
        },
        {
          Header: `${currYear}年`,
          accessor: [key, 'currYear'].join('.'),
          Cell: renderer,
          className: 'text-right',
        },
        {
          Header: '權重',
          accessor: [key, 'weight'].join('.'),
          Cell: ratioFormatter,
          className: 'text-right',
        },
        {
          Header: '增減率 *',
          accessor: [key, 'delta'].join('.'),
          Cell: targetFormatter(0, { formatter: ratioFormatter }),
          className: 'text-right',
        },
      ],
    })),
  ]);

export default function OverviewTable({ business }) {
  const { data } = useGetOverviewQuery({ business });
  const columns = useMemo(() => COLUMNS(), []);
  return (
    <>
      <Tag className="absolute top-4 right-4">
        累計區間：<span className="text-lg font-medium">{formatMonthRange(data?.maxDate)}</span>
      </Tag>
      {data && (
        <>
          <div className="w-full h-6 text-right">* 增減率 = (當年度 − 上年度) / 上年度</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
            <Table
              columns={columns}
              data={data?.data || []}
              getRowProps={(row) => ({
                className: row.original.isFooter
                  ? 'border-b-2 border-t-2 border-primary-600'
                  : 'border-b border-divider',
              })}
            />
          </div>
        </>
      )}
    </>
  );
}

import { useMemo } from 'react';

import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import APP_CONFIG from '../../constants/app-config';
import useGoal from '../../hooks/useGoal';
import { useGetCarbonQuery } from '../../services/carbon';
import { formatMonthRange } from '../../utils/date';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

const HEADERS = ({ pct, currYear = APP_CONFIG.CURRENT_YEAR, baseYear = APP_CONFIG.BASE_YEAR_CARBON } = {}) => [
  {
    key: 'electricity',
    name: '用電量 (度)',
    subHeaders: [
      { key: 'total', name: '總用電 (a)' },
      { key: 'sun', name: '太陽能發電 (b)' },
      { key: 'tRec', name: '綠證 (c)' },
      { key: 'carbon', name: '碳排放用電 (d=a-b-c)' },
    ],
  },
  {
    key: 'carbonIndex',
    name: (
      <>
        <div className="text-right">碳排放係數 (e)</div>
        <div className="text-right">(公噸CO₂e/千度)</div>
      </>
    ),
    rowSpan: 0,
    renderer: (cell) => baseFormatter(cell, { precision: 4 }),
  },
  {
    key: 'carbon',
    name: '碳排放 (公噸)',
    subHeaders: [
      { key: 'scope1', name: 'Scope1碳排 (f)' },
      { key: 'scope2', name: 'Scope2碳排 (g=d*e/1000)' },
      { key: 'currYear', name: `${currYear}年碳排 (h=f+g)` },
      { key: 'baseYear', name: `${baseYear}年碳排 (i)` },
      {
        key: 'delta',
        name: '增減率 (h/i-1)',
        renderer: targetFormatter(-pct, { formatter: ratioFormatter }),
      },
    ],
  },
  {
    key: 'target',
    name: (
      <>
        <div className="text-right">碳排抵扣綠證目標</div>
        <div className="text-right">{`(h-i*${ratioFormatter(1 - pct)})*1000/e`}</div>
      </>
    ),
    rowSpan: 0,
    renderer: baseFormatter,
  },
];

const COLUMNS = ({ pct, currYear = APP_CONFIG.CURRENT_YEAR, baseYear = APP_CONFIG.BASE_YEAR_CARBON } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
    },
    ...HEADERS({ pct, currYear, baseYear }).map(({ key, name, subHeaders, renderer = baseFormatter, ...rest }) => ({
      Header: name,
      Cell: renderer,
      ...(subHeaders && {
        id: name,
        Header: () => <div className="border-b border-divider py-3">{name}</div>,
        columns: subHeaders.map(({ key: _key, name: _name, renderer: _renderer = baseFormatter }) => ({
          Header: _name,
          accessor: [key, _key].join('.'),
          Cell: _renderer,
          className: 'text-right',
        })),
      }),
      ...(!subHeaders && { accessor: key, className: 'text-right' }),
      ...rest,
    })),
  ]);

export default function CarbonTable({ business }) {
  const { data } = useGetCarbonQuery({ business });
  const { label, pct, currYear, baseYear } = useGoal({ keyword: '碳排放量' });
  const columns = useMemo(() => COLUMNS({ pct, currYear, baseYear }), [pct, currYear, baseYear]);
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
      <div className="h-6"></div>
      {data && (
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
          <Table columns={columns} data={data?.data || []} />
        </div>
      )}
    </>
  );
}

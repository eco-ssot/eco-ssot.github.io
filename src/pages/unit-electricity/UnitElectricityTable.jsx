import { useMemo } from 'react';

import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import APP_CONFIG from '../../constants/app-config';
import useGoal from '../../hooks/useGoal';
import { useGetUnitElectricityQuery } from '../../services/unitElectricity';
import { formatMonthRange } from '../../utils/date';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

const HEADERS = ({ pct, currYear = APP_CONFIG.CURRENT_YEAR, lastYear = APP_CONFIG.LAST_YEAR } = {}) => [
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
    key: 'production',
    name: '生產量 (台)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年 (c)` },
      { key: 'currYear', name: `${currYear}年 (d)` },
      { key: 'delta', name: '增減率 (d/c-1)', renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
  {
    key: 'unitElectricity',
    name: '單台用電 (度)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年 (e=a/c)`, renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
      { key: 'currYear', name: `${currYear}年 (f=b/d)`, renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
      { key: 'delta', name: '增減率 (f/e-1)', renderer: targetFormatter(-pct, { formatter: ratioFormatter }) },
    ],
  },
];

const COLUMNS = ({ pct, currYear = APP_CONFIG.CURRENT_YEAR, lastYear = APP_CONFIG.LAST_YEAR } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
    },
    ...HEADERS({ pct, currYear, lastYear }).map(({ key, name, subHeaders = [] }) => ({
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

export default function UnitElectricityTable({ business }) {
  const { data } = useGetUnitElectricityQuery({ business });
  const { label, pct, currYear, baseYear } = useGoal({ keyword: '單台用電' });
  const columns = useMemo(() => COLUMNS({ pct, currYear, lastYear: baseYear }), [pct, currYear, baseYear]);
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
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
            <Table columns={columns} data={data?.data || []} />
          </div>
        </>
      )}
    </>
  );
}

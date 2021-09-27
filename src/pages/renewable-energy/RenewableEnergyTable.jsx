import { useMemo } from 'react';

import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import useGoal from '../../hooks/useGoal';
import { useGetRenewableEnergyQuery } from '../../services/renewableEnergy';
import { formatMonthRange } from '../../utils/date';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

const HEADERS = ({ pct } = {}) => [
  {
    key: 'electricity',
    name: '用電量 (度)',
    subHeaders: [
      { key: 'total', name: '總用電量 (a)' },
      { key: 'sun', name: '太陽能發電 (b)' },
      { key: 'tRec', name: '綠證 (c)' },
    ],
  },
  {
    key: 'ratio',
    name: (
      <>
        <div className="text-right">占比 (%)</div>
        <div className="text-right">( (b+c) / a )</div>
      </>
    ),
    renderer: targetFormatter(-pct, { formatter: ratioFormatter }),
    rowSpan: 0,
  },
  {
    key: 'tRecTarget',
    name: (
      <>
        <div className="text-right">再生能源綠證目標 (度)</div>
        <div className="text-right">{`( a*${ratioFormatter(pct)} - b )`}</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'roofRestArea',
    name: '屋頂剩餘可用面積 (M²)',
    rowSpan: 0,
  },
  {
    key: 'roofStructure',
    name: '屋頂結構 (RC / 鋼結構)',
    rowSpan: 0,
  },
];

const COLUMNS = ({ pct } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
    },
    ...HEADERS({ pct }).map(({ key, name, subHeaders, renderer = baseFormatter, ...rest }) => ({
      Header: name,
      Cell: renderer,
      ...(subHeaders && {
        id: name,
        Header: () => <div className="border-b border-divider py-3">{name}</div>,
        columns: subHeaders.map(({ key: _key, name: _name, _renderer = baseFormatter }) => ({
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

export default function RenewableEnergyTable({ business }) {
  const { data } = useGetRenewableEnergyQuery({ business });
  const { label, pct } = useGoal({ keyword: '可再生能源' });
  const columns = useMemo(() => COLUMNS({ pct }), [pct]);
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
          <div className="w-full h-6 text-right">* 占比 = ( 電網綠電 + 太陽能發電 + 綠證 ) / 總用電</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
            <Table columns={columns} data={data?.data || []} />
          </div>
        </>
      )}
    </>
  );
}

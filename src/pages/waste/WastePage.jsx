import { useMemo } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

import PageContainer from '../../components/page-container/PageContainer';
import ButtonGroup from '../../components/button-group/ButtonGroup';
import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import { toFormattedNumber } from '../../utils/number';

const baseRenderer = ({ value }) => toFormattedNumber(value, { precision: 2 });
const ratioRenderer = ({ value }) =>
  toFormattedNumber(value, { unit: 1e-2, suffix: '%', precision: 2 });

const HEADERS = [
  {
    key: 'nonRecyclable',
    name: '不可回收類重量 (千噸)',
    subHeaders: [
      {
        key: 'normal',
        name: '一般廢棄物 (焚化 & 掩埋)',
      },
      { key: 'harmful', name: '有害廢棄物' },
    ],
  },
  {
    key: 'recyclable',
    name: '可回收類重量 (千噸)',
    subHeaders: [
      {
        key: 'normal',
        name: '一般廢棄物 (其他/廚餘)',
      },
      {
        key: 'waste',
        name: '資源廢棄物 (堆肥 & 資源回收)',
      },
    ],
  },
  {
    key: 'total',
    name: (
      <>
        <div className="text-right">Total</div>
        <div className="text-right">(千噸)</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'revenue',
    name: (
      <>
        <div className="text-right">2021 1-6月營收</div>
        <div className="text-right">(十億新台幣)</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'waste',
    name: '廢棄物產生密度 (千噸/十億新台幣)',
    subHeaders: [
      { key: 2021, name: '2021年1-6月' },
      { key: 2018, name: '2018年' },
      { key: 'delta', name: '增減率 *', renderer: ratioRenderer },
    ],
  },
  {
    key: 'recycleRate',
    name: <div className="text-right">廢棄物回收率</div>,
    renderer: ratioRenderer,
    rowSpan: 0,
  },
];

const COLUMNS = [
  {
    id: 'expander',
    Header: '',
    Cell: ({ row }) => {
      const { title, style, ...rest } = row.getToggleRowExpandedProps();
      return row.canExpand ? (
        <div {...rest} className="flex w-12 justify-center">
          {row.isExpanded ? (
            <ChevronUpIcon className="w-5 h-5 cursor-pointer" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 cursor-pointer" />
          )}
        </div>
      ) : null;
    },
    rowSpan: 0,
  },
  {
    Header: 'Site',
    accessor: 'site',
    rowSpan: 0,
  },
  ...HEADERS.map(({ key, name, subHeaders, renderer = baseRenderer, ...rest }) => ({
    Header: name,
    Cell: renderer,
    ...(subHeaders && {
      id: name,
      Header: () => <div className="border-b border-divider py-3">{name}</div>,
      columns: subHeaders.map(({ key: _key, name: _name, renderer: _renderer = baseRenderer }) => ({
        Header: _name,
        accessor: [key, _key].join('.'),
        Cell: _renderer,
        className: 'text-right',
      })),
    }),
    ...(!subHeaders && { accessor: key, className: 'text-right' }),
    ...rest,
  })),
];

const DATA = [
  {
    site: 'WNH',
    nonRecyclable: { normal: 2.87, harmful: 0.0 },
    recyclable: { normal: 0.07, waste: 0.6 },
    total: 3.55,
    revenue: 0,
    waste: {
      2021: 33.4,
      2018: 14.74,
      delta: 1.2667,
    },
    recycleRate: 0.1904,
  },
  {
    site: 'WHC',
    nonRecyclable: { normal: 2.87, harmful: 0.0 },
    recyclable: { normal: 0.07, waste: 0.6 },
    total: 3.55,
    revenue: 0,
    waste: {
      2021: 33.4,
      2018: 14.74,
      delta: 1.2667,
    },
    recycleRate: 0.1904,
  },
  {
    site: 'WIH',
    nonRecyclable: { normal: 2.87, harmful: 0.0 },
    recyclable: { normal: 0.07, waste: 0.6 },
    total: 3.55,
    revenue: 0,
    waste: {
      2021: 33.4,
      2018: 14.74,
      delta: 1.2667,
    },
    recycleRate: 0.1904,
  },
  {
    site: 'WKS',
    nonRecyclable: { normal: 2.87, harmful: 0.0 },
    recyclable: { normal: 0.07, waste: 0.6 },
    total: 3.55,
    revenue: 0,
    waste: {
      2021: 33.4,
      2018: 14.74,
      delta: 1.2667,
    },
    recycleRate: 0.1904,
  },
  {
    site: 'WZS',
    nonRecyclable: { normal: 2.87, harmful: 0.0 },
    recyclable: { normal: 0.07, waste: 0.6 },
    total: 3.55,
    revenue: 0,
    waste: {
      2021: 33.4,
      2018: 14.74,
      delta: 1.2667,
    },
    recycleRate: 0.1904,
    subRows: [
      {
        site: 'WZS-1',
        nonRecyclable: { normal: 2.87, harmful: 0.0 },
        recyclable: { normal: 0.07, waste: 0.6 },
        total: 3.55,
        revenue: 0,
        waste: {
          2021: 33.4,
          2018: 14.74,
          delta: 1.2667,
        },
        recycleRate: 0.1904,
      },
      {
        site: 'WZS-3',
        nonRecyclable: { normal: 2.87, harmful: 0.0 },
        recyclable: { normal: 0.07, waste: 0.6 },
        total: 3.55,
        revenue: 0,
        waste: {
          2021: 33.4,
          2018: 14.74,
          delta: 1.2667,
        },
        recycleRate: 0.1904,
      },
      {
        site: 'WZS-6',
        nonRecyclable: { normal: 2.87, harmful: 0.0 },
        recyclable: { normal: 0.07, waste: 0.6 },
        total: 3.55,
        revenue: 0,
        waste: {
          2021: 33.4,
          2018: 14.74,
          delta: 1.2667,
        },
        recycleRate: 0.1904,
      },
    ],
  },
  {
    site: 'WCQ',
    nonRecyclable: { normal: 2.87, harmful: 0.0 },
    recyclable: { normal: 0.07, waste: 0.6 },
    total: 3.55,
    revenue: 0,
    waste: {
      2021: 33.4,
      2018: 14.74,
      delta: 1.2667,
    },
    recycleRate: 0.1904,
  },
  {
    site: 'WCD',
    nonRecyclable: { normal: 2.87, harmful: 0.0 },
    recyclable: { normal: 0.07, waste: 0.6 },
    total: 3.55,
    revenue: 0,
    waste: {
      2021: 33.4,
      2018: 14.74,
      delta: 1.2667,
    },
    recycleRate: 0.1904,
  },
  {
    site: 'WMX',
    nonRecyclable: { normal: 2.87, harmful: 0.0 },
    recyclable: { normal: 0.07, waste: 0.6 },
    total: 3.55,
    revenue: 0,
    waste: {
      2021: 33.4,
      2018: 14.74,
      delta: 1.2667,
    },
    recycleRate: 0.1904,
  },
  {
    site: 'WCZ',
    nonRecyclable: { normal: 2.87, harmful: 0.0 },
    recyclable: { normal: 0.07, waste: 0.6 },
    total: 3.55,
    revenue: 0,
    waste: {
      2021: 33.4,
      2018: 14.74,
      delta: 1.2667,
    },
    recycleRate: 0.1904,
  },
  {
    isFooter: true,
    site: 'Total',
    nonRecyclable: { normal: 2.87, harmful: 0.0 },
    recyclable: { normal: 0.07, waste: 0.6 },
    total: 3.55,
    revenue: 0,
    waste: {
      2021: 33.4,
      2018: 14.74,
      delta: 1.2667,
    },
    recycleRate: 0.1904,
  },
];

export default function WastePage() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  return (
    <PageContainer>
      <div className="flex justify-between">
        <div>廢棄物產生密度</div>
        <Tag>Target：對比2018年下降 2%</Tag>
      </div>
      <div className="flex flex-col w-full justify-center items-center space-y-4">
        <ButtonGroup options={[{ label: '當年度' }, { label: '歷史年度' }]} />
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg space-y-2">
          <div className="h-6 text-right">＊增減率 = (當年度 − 上年度) / 上年度</div>
          <Table
            columns={columns}
            data={data}
            getRowProps={(row) => ({
              className: row.original.isFooter
                ? 'border-b-2 border-t-2 border-primary-600 font-bold'
                : 'border-b border-divider',
            })}
          />
        </div>
      </div>
    </PageContainer>
  );
}

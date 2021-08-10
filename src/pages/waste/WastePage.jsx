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
    name: '不可回收類重量 (公噸)',
    subHeaders: [
      {
        key: 'normal',
        name: (
          <>
            <div>一般廢棄物</div>
            <div>(焚化 & 掩埋)</div>
          </>
        ),
      },
      { key: 'harmful', name: '有害廢棄物' },
    ],
  },
  {
    key: 'recyclable',
    name: '可回收類重量 (公噸)',
    subHeaders: [
      {
        key: 'normal',
        name: (
          <>
            <div>一般廢棄物</div>
            <div>(其他/廚餘)</div>
          </>
        ),
      },
      {
        key: 'waste',
        name: (
          <>
            <div>資源廢棄物</div>
            <div>(堆肥 & 資源回收)</div>
          </>
        ),
      },
    ],
  },
  {
    key: 'total',
    name: (
      <>
        <div>Total</div>
        <div>(公噸)</div>
      </>
    ),
  },
  {
    key: 'revenue',
    name: (
      <>
        <div>2021 1-6月營收</div>
        <div>(十億新臺幣)</div>
      </>
    ),
  },
  {
    key: 'waste',
    name: '廢棄物產生密度 (公噸/十億新臺幣)',
    subHeaders: [
      { key: 2021, name: '2021年1-6月' },
      { key: 2018, name: '2018年' },
      { key: 'delta', name: '增減率 *', renderer: ratioRenderer },
    ],
  },
  {
    key: 'recycleRate',
    name: '廢棄物回收率',
    renderer: ratioRenderer,
  },
];

const COLUMNS = [
  {
    // Build our expander column
    id: 'expander', // Make sure it has an ID
    Header: () => null,
    Cell: ({ row }) =>
      // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
      // to build the toggle for expanding a row
      {
        const { title, ...rest } = row.getToggleRowExpandedProps();
        return row.canExpand ? (
          <span {...rest}>
            {row.isExpanded ? (
              <ChevronUpIcon className="w-4 h-4" />
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </span>
        ) : null;
      },
  },
  {
    Header: 'Site',
    accessor: 'site',
  },
  ...HEADERS.reduce((prev, { key, name, subHeaders, renderer = baseRenderer }, i) => {
    const header = {
      Header: name,
      accessor: key,
      Cell: renderer,
      className: 'text-right',
      ...(subHeaders && {
        className: 'border-b border-gray-400',
        columns: subHeaders.map(
          ({ key: _key, name: _name, renderer: _renderer = baseRenderer }) => ({
            id: [key, _key].join(),
            Header: _name,
            accessor: [key, _key].join('.'),
            className: 'text-right',
            Cell: _renderer,
          })
        ),
      }),
    };

    const dummyHeader = {
      id: `dummy_${i}`,
      Header: '',
      accessor: `dummy_${i}`,
    };

    return prev.concat(header, dummyHeader);
  }, []),
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
        <div>W.W 碳排放管理</div>
        <Tag>Target：對比2018年下降 2%</Tag>
      </div>
      <div className="flex flex-col w-full justify-center items-center space-y-4">
        <ButtonGroup options={[{ label: '當年度' }, { label: '歷史年度' }]} />
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg space-y-2">
          <div className="text-right">＊增減率 = (當年度 − 上年度) / 上年度</div>
          <Table
            columns={columns}
            data={data}
            getRowProps={(row) => ({
              className: row.original.isFooter
                ? 'border-b-2 border-t-2 border-primary-500 font-bold'
                : 'border-b border-gray-400',
            })}
          />
        </div>
      </div>
    </PageContainer>
  );
}

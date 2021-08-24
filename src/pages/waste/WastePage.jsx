import { useMemo, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ArrowRightIcon } from '@heroicons/react/outline';

import PageContainer from '../../components/page-container/PageContainer';
import ButtonGroup from '../../components/button/ButtonGroup';
import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import DualTag from '../../components/tag/DualTag';
import Select from '../../components/select/Select';
import Button from '../../components/button/Button';
import { toFormattedNumber } from '../../utils/number';
import APP_CONFIG from '../../constants/app-config';

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
    name: '廢棄物產生密度 (公噸/十億新台幣)',
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

const HISTORY_COLUMNS = [
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
  ...Array.from({ length: 5 }, (_, i) => ({
    id: String(i),
    Header: () => <div className="border-b border-divider py-3">{`${2017 + i}年 1-4月`}</div>,
    columns: [
      {
        Header: '廢棄物產生密度 (公噸/十億新臺幣)',
        accessor: [2017 + i, 'waste'].join('.'),
        className: 'text-right',
      },
      {
        Header: '增減率 *',
        accessor: [2017 + i, 'delta'].join('.'),
        className: 'text-right',
      },
    ],
  })),
];

const FAKE_HISTORY_DATA = Array.from({ length: 5 }, (_, i) => 2017 + i).reduce(
  (prev, curr) => ({
    ...prev,
    [curr]: {
      waste: curr,
      delta: curr,
    },
  }),
  {}
);

const HISTORY_DATA = [
  { site: 'WNH', ...FAKE_HISTORY_DATA },
  { site: 'WHC', ...FAKE_HISTORY_DATA },
  { site: 'WIH', ...FAKE_HISTORY_DATA },
  { site: 'WKS', ...FAKE_HISTORY_DATA },
  {
    site: 'WZS',
    ...FAKE_HISTORY_DATA,
    subRows: [
      { site: 'WZS-1', ...FAKE_HISTORY_DATA },
      { site: 'WZS-3', ...FAKE_HISTORY_DATA },
      { site: 'WZS-6', ...FAKE_HISTORY_DATA },
    ],
  },
  { site: 'WCQ', ...FAKE_HISTORY_DATA },
  { site: 'WCD', ...FAKE_HISTORY_DATA },
  { site: 'WMX', ...FAKE_HISTORY_DATA },
  { site: 'WCZ', ...FAKE_HISTORY_DATA },
  { isFooter: true, site: 'Total', ...FAKE_HISTORY_DATA },
];

export default function WastePage() {
  const [isHistory, setIsHistory] = useState(false);
  const columns = useMemo(() => (isHistory ? HISTORY_COLUMNS : COLUMNS), [isHistory]);
  const data = useMemo(() => (isHistory ? HISTORY_DATA : DATA), [isHistory]);
  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div>廢棄物產生密度</div>
        {isHistory ? (
          <Tag>Target：對比2018年下降 2%</Tag>
        ) : (
          <DualTag labels={['累計區間：2021.01 - 06', 'Target：對比2018年下降 6%']} />
        )}
      </div>
      <div className="flex flex-col w-full justify-center items-center space-y-2">
        <ButtonGroup
          options={APP_CONFIG.HISTORY_OPTIONS}
          onChange={(e) => setIsHistory(e.key === 'HISTORY')}
        />
        {isHistory && (
          <div className="w-full grid grid-cols-12 py-4 items-center">
            <div></div>
            <div className="flex justify-center col-span-10">
              <Select label="查詢年度：" options={APP_CONFIG.YEAR_OPTIONS} />
              <Select
                className="mr-8"
                label={<ArrowRightIcon className="h-5 w-5 mx-2" />}
                options={APP_CONFIG.YEAR_OPTIONS}
              />
              <Select
                label="查詢月份："
                options={APP_CONFIG.MONTH_RANGE_OPTIONS}
                buttonClassName="w-48"
                className="mr-2"
              />
              <Select
                options={APP_CONFIG.MONTH_OPTIONS}
                buttonClassName="w-24"
                optionClassName="max-h-screen"
                className="mr-8"
              />
              <Button>搜尋</Button>
            </div>
            <div className="text-right">
              <Button>Excel</Button>
            </div>
          </div>
        )}
        <div className="w-full h-6 text-right">* 增減率 = (當年度 − 上年度) / 上年度</div>
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
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

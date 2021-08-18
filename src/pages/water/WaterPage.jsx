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

const renderer = ({ value }) => toFormattedNumber(value);
const ratioRenderer = ({ value }) => toFormattedNumber(value, { unit: 1e-2, suffix: '%' });

const HEADERS = [
  {
    key: 'water',
    name: '用水量 (M³)',
    subHeaders: [
      { key: 2020, name: '2020年' },
      { key: 2021, name: '2021年' },
      { key: 'weight', name: '權重' },
      { key: 'delta', name: '增減率' },
    ],
  },
  {
    key: 'revenue',
    name: '營業額 (十億台幣)',
    subHeaders: [
      { key: 2020, name: '2020年' },
      { key: 2021, name: '2021年' },
      { key: 'weight', name: '權重' },
      { key: 'delta', name: '增減率' },
    ],
  },
  {
    key: 'waterRevenue',
    name: '十億營業額用水',
    subHeaders: [
      { key: 2020, name: '2020年' },
      { key: 2021, name: '2021年' },
      { key: 'weight', name: '權重' },
      { key: 'delta', name: '增減率' },
    ],
  },
  {
    key: 'comparison',
    name: '對比基準年',
    subHeaders: [
      { key: 2016, name: '2016年' },
      { key: 'delta', name: '增減率' },
    ],
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
  ...HEADERS.map(({ key, name, subHeaders }) => ({
    id: name,
    Header: () => <div className="border-b border-divider py-3">{name}</div>,
    ...(subHeaders && {
      columns: subHeaders.map(({ key: _key, name: _name }) => ({
        Header: _name,
        accessor: [key, _key].join('.'),
        Cell: _key === 'delta' || _key === 'weight' ? ratioRenderer : renderer,
        className: 'text-right',
      })),
    }),
  })),
];

const DATA = [
  {
    site: 'WNH',
    water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
    waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
    comparison: { 2016: 5562, delta: -0.08 },
  },
  {
    site: 'WHC',
    water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
    waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
    comparison: { 2016: 5562, delta: -0.08 },
  },
  {
    site: 'WIH',
    water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
    waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
    comparison: { 2016: 5562, delta: -0.08 },
  },
  {
    site: 'WKS',
    water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
    waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
    comparison: { 2016: 5562, delta: -0.08 },
  },
  {
    site: 'WZS',
    water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
    waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
    comparison: { 2016: 5562, delta: -0.08 },
    subRows: [
      {
        site: 'WZS-1',
        water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
        revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
        waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
        comparison: { 2016: 5562, delta: -0.08 },
      },
      {
        site: 'WZS-3',
        water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
        revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
        waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
        comparison: { 2016: 5562, delta: -0.08 },
      },
      {
        site: 'WZS-6',
        water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
        revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
        waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
        comparison: { 2016: 5562, delta: -0.08 },
      },
    ],
  },
  {
    site: 'WCQ',
    water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
    waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
    comparison: { 2016: 5562, delta: -0.08 },
  },
  {
    site: 'WCD',
    water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
    waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
    comparison: { 2016: 5562, delta: -0.08 },
  },
  {
    site: 'WMX',
    water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
    waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
    comparison: { 2016: 5562, delta: -0.08 },
  },
  {
    site: 'WCZ',
    water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
    waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
    comparison: { 2016: 5562, delta: -0.08 },
  },
  {
    isFooter: true,
    site: 'Total',
    water: { 2020: 169416, 2021: 199831, weight: 0.11, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.18, delta: 0.37 },
    waterRevenue: { 2020: 5905, 2021: 5091, weight: 0.14, delta: -0.14 },
    comparison: { 2016: 5562, delta: -0.08 },
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
        Header: '十億營業額用水',
        accessor: [2017 + i, 'water'].join('.'),
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
      water: curr,
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

export default function WaterPage() {
  const [isHistory, setIsHistory] = useState(false);
  const columns = useMemo(() => (isHistory ? HISTORY_COLUMNS : COLUMNS), [isHistory]);
  const data = useMemo(() => (isHistory ? HISTORY_DATA : DATA), [isHistory]);
  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div>W.W 十億營業額用水</div>
        {isHistory ? (
          <Tag>Target：對比2016年下降 9%</Tag>
        ) : (
          <DualTag labels={['累計區間：2021.01 - 06', 'Target：對比2016年下降 9%']} />
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
              <Select
                label="資料呈現："
                options={APP_CONFIG.DIMENSION_OPTIONS}
                buttonClassName="w-32"
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
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg space-y-2">
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

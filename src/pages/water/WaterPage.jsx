import { useMemo } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

import PageContainer from '../../components/page-container/PageContainer';
import ButtonGroup from '../../components/button-group/ButtonGroup';
import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import { toFormattedNumber } from '../../utils/number';

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
    name: '營業額 (十億臺幣)',
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
      const { title, ...rest } = row.getToggleRowExpandedProps();
      return row.canExpand ? (
        <span {...rest}>
          {row.isExpanded ? (
            <ChevronUpIcon className="w-4 h-4 ml-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 ml-4" />
          )}
        </span>
      ) : null;
    },
    rowSpan: 0,
  },
  {
    Header: 'Site',
    accessor: 'site',
    rowSpan: 0,
  },
  {
    id: 'dummy',
    Header: '',
    rowSpan: 0,
  },
  ...HEADERS.reduce((prev, { key, name, subHeaders }, i) => {
    const header = {
      Header: name,
      className: 'border-b border-divider',
      ...(subHeaders && {
        columns: subHeaders.map(({ key: _key, name: _name }) => ({
          Header: _name,
          accessor: [key, _key].join('.'),
          Cell: _key === 'delta' || _key === 'weight' ? ratioRenderer : renderer,
          className: 'text-right',
        })),
      }),
    };

    const dummyHeader = {
      id: `dummy_${i}`,
      Header: '',
      rowSpan: 0,
    };

    return prev.concat(header, dummyHeader);
  }, []),
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

export default function WaterPage() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  return (
    <PageContainer>
      <div className="flex justify-between">
        <div>W.W 十億營業額用水</div>
        <Tag>Target：對比2016年下降 9%</Tag>
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

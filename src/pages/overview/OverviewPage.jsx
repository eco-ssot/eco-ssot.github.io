import { useMemo } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

import PageContainer from '../../components/page-container/PageContainer';
import ButtonGroup from '../../components/button-group/ButtonGroup';
import Table from '../../components/table/Table';
import { toFormattedNumber } from '../../utils/number';

const renderer = ({ value }) => toFormattedNumber(value);
const ratioRenderer = ({ value }) => toFormattedNumber(value, { unit: 1e-2, suffix: '%' });

const HEADERS = [
  { key: 'electricity', name: '用電量 (度)' },
  { key: 'water', name: '用水量 (M³)' },
  { key: 'revenue', name: '營業額 (十億臺幣)' },
  { key: 'asp', name: 'ASP (十億臺幣/百萬台)' },
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
  ...HEADERS.reduce((prev, { key, name }, i) => {
    const header = {
      Header: name,
      className: 'border-b border-divider',
      columns: [
        {
          Header: '2020年',
          accessor: [key, 2020].join('.'),
          Cell: renderer,
          className: 'text-right',
        },
        {
          Header: '2021年',
          accessor: [key, 2021].join('.'),
          Cell: renderer,
          className: 'text-right',
        },
        {
          Header: '權重',
          accessor: [key, 'weight'].join('.'),
          Cell: ratioRenderer,
          className: 'text-right',
        },
        {
          Header: '增減率 *',
          accessor: [key, 'delta'].join('.'),
          Cell: ratioRenderer,
          className: 'text-right',
        },
      ],
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
    electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
    water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
    asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
  },
  {
    site: 'WHC',
    electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
    water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
    asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
  },
  {
    site: 'WIH',
    electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
    water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
    asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
  },
  {
    site: 'WKS',
    electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
    water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
    asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
    subRows: [],
  },
  {
    site: 'WZS',
    electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
    water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
    asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
    subRows: [
      {
        site: 'WZS-1',
        electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
        water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
        revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
        asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
      },
      {
        site: 'WZS-3',
        electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
        water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
        revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
        asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
      },
      {
        site: 'WZS-6',
        electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
        water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
        revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
        asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
      },
    ],
  },
  {
    site: 'WCQ',
    electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
    water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
    asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
  },
  {
    site: 'WCD',
    electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
    water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
    asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
  },
  {
    site: 'WMX',
    electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
    water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
    asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
  },
  {
    site: 'WCZ',
    electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
    water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
    asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
  },
  {
    isFooter: true,
    site: 'Total',
    electricity: { 2020: 13209805, 2021: 15507280, weight: 0.11, delta: 0.17 },
    water: { 2020: 169416, 2021: 199831, weight: 0.13, delta: 0.18 },
    revenue: { 2020: 28.7, 2021: 39.3, weight: 0.14, delta: 0.37 },
    asp: { 2020: 8.4, 2021: 7.6, weight: 0.09, delta: -0.1 },
  },
];

export default function OverviewPage() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  return (
    <PageContainer>
      <div className="h-8">用電、用水、營收及ASP比較</div>
      <div className="flex flex-col w-full justify-center items-center space-y-4">
        <ButtonGroup options={[{ label: '當年度' }, { label: '歷史年度' }]} />
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg space-y-2">
          <div className="h-6 text-right">* 增減率 = (當年度 − 上年度) / 上年度</div>
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

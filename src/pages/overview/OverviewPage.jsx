import { useMemo, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

import PageContainer from '../../components/page-container/PageContainer';
import ButtonGroup from '../../components/button/ButtonGroup';
import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import Select from '../../components/select/Select';
import Button from '../../components/button/Button';
import { toFormattedNumber } from '../../utils/number';
import APP_CONFIG from '../../constants/app-config';

const renderer = ({ value }) => toFormattedNumber(value);
const ratioRenderer = ({ value }) => toFormattedNumber(value, { unit: 1e-2, suffix: '%' });

const HEADERS = [
  { key: 'electricity', name: '用電量 (度)' },
  { key: 'water', name: '用水量 (M³)' },
  { key: 'revenue', name: '營業額 (十億台幣)' },
  { key: 'asp', name: 'ASP (十億台幣/百萬台)' },
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
  ...HEADERS.map(({ key, name }) => ({
    id: name,
    Header: () => <div className="border-b border-divider py-3">{name}</div>,
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
  })),
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
  const [isHistory, setIsHistory] = useState(false);
  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div>用電、用水、營收及ASP比較</div>
        {!isHistory && <Tag>{'Target：對比去年下降2%'}</Tag>}
      </div>
      <div className="flex flex-col w-full justify-center items-center space-y-2">
        <ButtonGroup
          options={APP_CONFIG.HISTORY_OPTIONS}
          onChange={(e) => setIsHistory(e.key === 'HISTORY')}
        />
        {isHistory && (
          <div className="w-full grid grid-cols-12 py-4 items-center">
            <div></div>
            <div className="flex justify-center space-x-8 col-span-10">
              <Select label="查詢年度：" options={APP_CONFIG.YEAR_OPTIONS} />
              <Select label="資料呈現：" options={APP_CONFIG.DIMENSION_OPTIONS} />
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

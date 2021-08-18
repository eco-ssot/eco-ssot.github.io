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
    key: 'electricity',
    name: '用電量 (度)',
    subHeaders: [
      { key: 2020, name: '2020年 (a)' },
      { key: 2021, name: '2021年 (b)' },
      { key: 'delta', name: '增減率 (b/a-1)' },
    ],
  },
  {
    key: 'production',
    name: '生產量 (台)',
    subHeaders: [
      { key: 2020, name: '2020年 (c)' },
      { key: 2021, name: '2021年 (d)' },
      { key: 'delta', name: '增減率 (d/c-1)' },
    ],
  },
  {
    key: 'unitElectricity',
    name: '單台用電 (度)',
    subHeaders: [
      { key: 2020, name: '2020年 (e=a/c)' },
      { key: 2021, name: '2021年 (f=b/d)' },
      { key: 'delta', name: '增減率 (f/e-1)' },
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
        Cell: _key === 'delta' ? ratioRenderer : renderer,
        className: 'text-right',
      })),
    }),
  })),
];

const DATA = [
  {
    site: 'WNH',
    electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
    production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
    unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
  },
  {
    site: 'WHC',
    electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
    production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
    unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
  },
  {
    site: 'WIH',
    electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
    production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
    unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
  },
  {
    site: 'WKS',
    electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
    production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
    unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
  },
  {
    site: 'WZS',
    electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
    production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
    unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
    subRows: [
      {
        site: 'WZS-1',
        electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
        production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
        unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
      },
      {
        site: 'WZS-3',
        electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
        production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
        unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
      },
      {
        site: 'WZS-6',
        electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
        production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
        unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
      },
    ],
  },
  {
    site: 'WCQ',
    electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
    production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
    unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
  },
  {
    site: 'WCD',
    electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
    production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
    unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
  },
  {
    site: 'WMX',
    electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
    production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
    unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
  },
  {
    site: 'WCZ',
    electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
    production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
    unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
  },
  {
    isFooter: true,
    site: 'Total',
    electricity: { 2020: 13209805, 2021: 15507280, delta: 0.17 },
    production: { 2020: 3415378, 2021: 516926, delta: 0.51 },
    unitElectricity: { 2020: 3.9, 2021: 3.0, delta: -0.22 },
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
        Header: '單臺用電 (度)',
        accessor: [2017 + i, 'electricity'].join('.'),
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
      electricity: curr,
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

export default function UnitElectricityPage() {
  const [isHistory, setIsHistory] = useState(false);
  const columns = useMemo(() => (isHistory ? HISTORY_COLUMNS : COLUMNS), [isHistory]);
  const data = useMemo(() => (isHistory ? HISTORY_DATA : DATA), [isHistory]);
  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div>W.W 單台用電</div>
        {isHistory ? (
          <Tag>Target：對比去年下降1%</Tag>
        ) : (
          <DualTag labels={['累計區間：2021.01 - 06', 'Target：對比去年下降1%']} />
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
        <div className="w-full h-6 text-right">
          {isHistory ? '* 增減率 = (當年度 − 上年度) / 上年度' : ''}
        </div>
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

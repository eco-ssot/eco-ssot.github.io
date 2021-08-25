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
    name: '用電量 (千瓦時)',
    subHeaders: [
      { key: 'total', name: '總用電 (a)' },
      { key: 'sun', name: '太陽能發電 (b)' },
      { key: 'green', name: '綠證 (c)' },
      { key: 'carbon', name: '碳排放用電 (d=a-b-c)' },
    ],
  },
  {
    key: 'carbonIndex',
    name: (
      <>
        <div className="text-right">碳排放係數 (e)</div>
        <div className="text-right">(兆瓦時/千噸)</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'carbon',
    name: '碳排放 (千噸)',
    subHeaders: [
      { key: 'scope1', name: 'Scope1 碳排 (f)' },
      { key: 'scope2', name: 'Scope2 碳排 (g)' },
      { key: 'scope3', name: 'Scope2 碳排 (h)' },
      { key: 2021, name: '2021年碳排 (i=f+g+h)' },
      { key: 2016, name: '2016年碳排 (j)' },
      { key: 'delta', name: '增減率 (i/j-1)' },
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
  ...HEADERS.map(({ key, name, subHeaders, ...rest }) => ({
    Header: name,
    ...(subHeaders && {
      id: name,
      Header: () => <div className="border-b border-divider py-3">{name}</div>,
      columns: subHeaders.map(({ key: _key, name: _name }) => ({
        Header: _name,
        accessor: [key, _key].join('.'),
        Cell: _key === 'delta' ? ratioRenderer : renderer,
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
    electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
    carbonIndex: 0.7921,
    carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
  },
  {
    site: 'WHC',
    electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
    carbonIndex: 0.7921,
    carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
  },
  {
    site: 'WIH',
    electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
    carbonIndex: 0.7921,
    carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
  },
  {
    site: 'WKS',
    electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
    carbonIndex: 0.7921,
    carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
  },
  {
    site: 'WZS',
    electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
    carbonIndex: 0.7921,
    carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
    subRows: [
      {
        site: 'WZS-1',
        electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
        carbonIndex: 0.7921,
        carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
      },
      {
        site: 'WZS-3',
        electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
        carbonIndex: 0.7921,
        carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
      },
      {
        site: 'WZS-6',
        electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
        carbonIndex: 0.7921,
        carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
      },
    ],
  },
  {
    site: 'WCQ',
    electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
    carbonIndex: 0.7921,
    carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
  },
  {
    site: 'WCD',
    electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
    carbonIndex: 0.7921,
    carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
  },
  {
    site: 'WMX',
    electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
    carbonIndex: 0.7921,
    carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
  },
  {
    site: 'WCZ',
    electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
    carbonIndex: 0.7921,
    carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
  },
  {
    isFooter: true,
    site: 'Total',
    electricity: { total: 15507280, sun: 427011, green: 0, carbon: 15080269 },
    carbonIndex: 0.7921,
    carbon: { scope1: 0, scope2: 11945, scope3: 0, 2021: 11945, 2016: 19744, delta: -0.4 },
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
  },
  {
    Header: 'Site',
    accessor: 'site',
  },
  ...Array.from({ length: 12 }, (_, i) => ({
    Header: () => (
      <>
        <div>{`2018年 ${i + 1}月`}</div>
        <div>碳排放 (公噸)</div>
      </>
    ),
    accessor: String(i + 1),
  })),
];

const FAKE_HISTORY_DATA = Array.from({ length: 12 }, (_, i) => i + 1).reduce(
  (prev, curr) => ({ ...prev, [curr]: curr }),
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

export default function CarbonPage() {
  const [isHistory, setIsHistory] = useState(false);
  const columns = useMemo(() => (isHistory ? HISTORY_COLUMNS : COLUMNS), [isHistory]);
  const data = useMemo(() => (isHistory ? HISTORY_DATA : DATA), [isHistory]);
  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div>W.W 碳排放管理</div>
        {isHistory ? (
          <Tag>{'Target：對比2016年，每年下降4.2%'}</Tag>
        ) : (
          <DualTag labels={['累計區間：2021.01 - 06', 'Target：對比2016年下降21%']} />
        )}
      </div>
      <div className="flex flex-col w-full justify-center items-center space-y-2">
        <ButtonGroup options={APP_CONFIG.HISTORY_OPTIONS} onChange={(e) => setIsHistory(e.key === 'HISTORY')} />
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
              <Select
                label="Plant："
                options={APP_CONFIG.PLANT_OPTIONS}
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
        <div className="w-full h-6"></div>
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

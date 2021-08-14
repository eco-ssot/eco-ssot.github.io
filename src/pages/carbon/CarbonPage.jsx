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
  ...HEADERS.reduce((prev, { key, name, subHeaders, ...rest }, i) => {
    const header = {
      Header: name,
      ...(subHeaders && {
        className: 'border-b border-divider',
        columns: subHeaders.map(({ key: _key, name: _name }) => ({
          Header: _name,
          accessor: [key, _key].join('.'),
          Cell: _key === 'delta' ? ratioRenderer : renderer,
          className: 'text-right',
        })),
      }),
      ...(!subHeaders && { accessor: key, className: 'text-right' }),
      ...rest,
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

export default function CarbonPage() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  return (
    <PageContainer>
      <div className="flex justify-between">
        <div>W.W 碳排放管理</div>
        <Tag>Target：對比2016年下降21%</Tag>
      </div>
      <div className="flex flex-col w-full justify-center items-center space-y-4">
        <ButtonGroup options={[{ label: '當年度' }, { label: '歷史年度' }]} />
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg space-y-2">
          <div className="h-6"></div>
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

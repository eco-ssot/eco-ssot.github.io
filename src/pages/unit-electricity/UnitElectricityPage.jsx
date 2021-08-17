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
          Cell: _key === 'delta' ? ratioRenderer : renderer,
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

export default function UnitElectricityPage() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  return (
    <PageContainer>
      <div className="flex justify-between">
        <div>W.W 單台用電</div>
        <Tag>Target：對比去年下降1%</Tag>
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

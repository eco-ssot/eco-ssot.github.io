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
    name: '總用電量',
  },
  {
    key: 'greenElectricity',
    name: '電網綠電',
  },
  {
    key: 'sun',
    name: '太陽能發電',
  },
  {
    key: 'green',
    name: '綠證',
  },
  {
    key: 'ratio',
    name: '佔比 *',
  },
  {
    key: 'roofRestArea',
    name: '屋頂剩餘可用面積 (M²)',
  },
  {
    key: 'roofStructure',
    name: '屋頂結構 (RC / 鋼結構)',
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
  },
  {
    Header: 'Site',
    accessor: 'site',
  },
  ...HEADERS.map(({ key, name }) => ({
    Header: name,
    accessor: key,
    Cell: key === 'ratio' ? ratioRenderer : renderer,
    className: 'text-right',
  })),
];

const DATA = [
  {
    site: 'WNH',
    electricity: 15507280,
    greenElectricity: 10195309,
    sun: 427011,
    green: 0,
    ratio: 0.68,
    roofRestArea: null,
    roofStructure: null,
  },
  {
    site: 'WHC',
    electricity: 15507280,
    greenElectricity: 10195309,
    sun: 427011,
    green: 0,
    ratio: 0.68,
    roofRestArea: null,
    roofStructure: null,
  },
  {
    site: 'WIH',
    electricity: 15507280,
    greenElectricity: 10195309,
    sun: 427011,
    green: 0,
    ratio: 0.68,
    roofRestArea: null,
    roofStructure: null,
  },
  {
    site: 'WKS',
    electricity: 15507280,
    greenElectricity: 10195309,
    sun: 427011,
    green: 0,
    ratio: 0.68,
    roofRestArea: null,
    roofStructure: null,
  },
  {
    site: 'WZS',
    electricity: 15507280,
    greenElectricity: 10195309,
    sun: 427011,
    green: 0,
    ratio: 0.68,
    roofRestArea: null,
    roofStructure: null,
    subRows: [
      {
        site: 'WZS-1',
        electricity: 15507280,
        greenElectricity: 10195309,
        sun: 427011,
        green: 0,
        ratio: 0.68,
        roofRestArea: null,
        roofStructure: null,
      },
      {
        site: 'WZS-3',
        electricity: 15507280,
        greenElectricity: 10195309,
        sun: 427011,
        green: 0,
        ratio: 0.68,
        roofRestArea: null,
        roofStructure: null,
      },
      {
        site: 'WZS-6',
        electricity: 15507280,
        greenElectricity: 10195309,
        sun: 427011,
        green: 0,
        ratio: 0.68,
        roofRestArea: null,
        roofStructure: null,
      },
    ],
  },
  {
    site: 'WCQ',
    electricity: 15507280,
    greenElectricity: 10195309,
    sun: 427011,
    green: 0,
    ratio: 0.68,
    roofRestArea: null,
    roofStructure: null,
  },
  {
    site: 'WCD',
    electricity: 15507280,
    greenElectricity: 10195309,
    sun: 427011,
    green: 0,
    ratio: 0.68,
    roofRestArea: null,
    roofStructure: null,
  },
  {
    site: 'WMX',
    electricity: 15507280,
    greenElectricity: 10195309,
    sun: 427011,
    green: 0,
    ratio: 0.68,
    roofRestArea: null,
    roofStructure: null,
  },
  {
    site: 'WCZ',
    electricity: 15507280,
    greenElectricity: 10195309,
    sun: 427011,
    green: 0,
    ratio: 0.68,
    roofRestArea: null,
    roofStructure: null,
  },
  {
    isFooter: true,
    site: 'Total',
    electricity: 15507280,
    greenElectricity: 10195309,
    sun: 427011,
    green: 0,
    ratio: 0.68,
    roofRestArea: null,
    roofStructure: null,
  },
];

const HISTORY_COLUMNS = [
  {
    Header: 'Site',
    accessor: 'site',
    rowSpan: 0,
  },
  ...Array.from({ length: 5 }, (_, i) => ({
    id: String(i),
    Header: () => <div className="border-b border-divider py-3">{`${2017 + i}年1-4月`}</div>,
    columns: [
      {
        Header: '總用電量',
        accessor: [2017 + i, 'electricity'].join('.'),
        className: 'text-right',
      },
      {
        Header: '可再生能源佔比 *',
        accessor: [2017 + i, 'ratio'].join('.'),
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
      ratio: curr,
    },
  }),
  {}
);

const HISTORY_DATA = [
  { site: 'WNH', ...FAKE_HISTORY_DATA },
  { site: 'WHC', ...FAKE_HISTORY_DATA },
  { site: 'WIH', ...FAKE_HISTORY_DATA },
  { site: 'WKS', ...FAKE_HISTORY_DATA },
  { site: 'WZS', ...FAKE_HISTORY_DATA },
  { site: 'WCQ', ...FAKE_HISTORY_DATA },
  { site: 'WCD', ...FAKE_HISTORY_DATA },
  { site: 'WMX', ...FAKE_HISTORY_DATA },
  { site: 'WCZ', ...FAKE_HISTORY_DATA },
  { isFooter: true, site: 'Total', ...FAKE_HISTORY_DATA },
];

export default function RenewableEnergyPage() {
  const [isHistory, setIsHistory] = useState(false);
  const columns = useMemo(() => (isHistory ? HISTORY_COLUMNS : COLUMNS), [isHistory]);
  const data = useMemo(() => (isHistory ? HISTORY_DATA : DATA), [isHistory]);
  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div>W.W 可再生能源佔比</div>
        {isHistory ? (
          <Tag>{'Target：可再生能源 > 60%'}</Tag>
        ) : (
          <DualTag labels={['累計區間：2021.01 - 06', 'Target：可再生能源 > 60%']} />
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
              <Button>搜尋</Button>
            </div>
            <div className="text-right">
              <Button>Excel</Button>
            </div>
          </div>
        )}
        <div className="w-full h-6 text-right">
          {isHistory
            ? '* 可再生能源佔比 = 可再生能源用電 / 總用電'
            : '* 佔比 = ( 電網綠電 + 太陽能發電 + 綠證 ) / 總用電'}
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

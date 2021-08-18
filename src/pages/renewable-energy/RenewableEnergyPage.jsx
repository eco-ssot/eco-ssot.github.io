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
  {
    id: 'dummy_0',
    Header: '',
  },
  ...HEADERS.map(({ key, name }) => ({
    Header: name,
    accessor: key,
    Cell: key === 'ratio' ? ratioRenderer : renderer,
    className: 'text-right',
  })),
  {
    Header: '',
    id: 'dummy_1',
  },
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

export default function RenewableEnergyPage() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  return (
    <PageContainer>
      <div className="flex justify-between">
        <div>W.W 可再生能源佔比</div>
        <Tag>{'Target：可再生能源 > 60%'}</Tag>
      </div>
      <div className="flex flex-col w-full justify-center items-center space-y-4">
        <ButtonGroup options={[{ label: '當年度' }, { label: '歷史年度' }]} />
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg space-y-2">
          <div className="h-6 text-right">* 佔比 = ( 電網綠電 + 太陽能發電 + 綠證 ) / 總用電</div>
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

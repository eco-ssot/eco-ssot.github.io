import { useMemo } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ArrowRightIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';

import PageContainer from '../../components/page-container/PageContainer';
import ButtonGroup from '../../components/button/ButtonGroup';
import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import DualTag from '../../components/tag/DualTag';
import Select from '../../components/select/Select';
import Button from '../../components/button/Button';
import { baseFormatter, ratioFormatter } from '../../utils/formatter';
import APP_CONFIG from '../../constants/app-config';
import useIsHistory from '../../hooks/useIsHistory';
import { useGetRenewableEnergyQuery } from '../../services/renewableEnergy';
import { addPaddingColumns } from '../../utils/table';
import { navigate } from '../../router/helpers';
import { selectBusiness } from '../../renderless/location/locationSlice';
import { formatMonthRange } from '../../utils/date';

const HEADERS = [
  {
    key: 'electricity',
    name: '總用電量 (a)',
  },
  {
    key: 'sun',
    name: '太陽能發電 (b)',
  },
  {
    key: 'tRec',
    name: '綠證 (c)',
  },
  {
    key: 'ratio',
    name: '佔比 ( (b+c)/a )',
  },
  {
    key: 'tRecTarget',
    name: '再生能源綠證目標 ( a*60% - b )',
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

const COLUMNS = addPaddingColumns([
  {
    id: 'expander',
    Header: '',
    Cell: ({ row }) => {
      const { title, style, ...rest } = row.getToggleRowExpandedProps();
      return row.canExpand ? (
        <div {...rest} className="flex justify-center">
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
    Cell: key === 'ratio' ? ratioFormatter : baseFormatter,
    className: 'text-right',
  })),
]);

export default function RenewableEnergyPage() {
  const business = useSelector(selectBusiness);
  const { data } = useGetRenewableEnergyQuery({ business });
  const columns = useMemo(() => COLUMNS, []);
  const isHistory = useIsHistory();
  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div className="text-xl font-medium">可再生能源佔比</div>
        {isHistory ? (
          <Tag>{'Target：可再生能源 > 60%'}</Tag>
        ) : (
          <DualTag labels={[`累計區間：${formatMonthRange(data?.maxDate)}`, 'Target：可再生能源 > 60%']} />
        )}
      </div>
      <div className="flex flex-col w-full justify-center items-center space-y-2">
        <ButtonGroup
          options={APP_CONFIG.HISTORY_OPTIONS}
          selected={isHistory ? APP_CONFIG.HISTORY_OPTIONS[1] : APP_CONFIG.HISTORY_OPTIONS[0]}
          onChange={(e) =>
            navigate({
              hash: e.key,
            })
          }
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
          {isHistory
            ? '* 可再生能源佔比 = 可再生能源用電 / 總用電'
            : '* 佔比 = ( 電網綠電 + 太陽能發電 + 綠證 ) / 總用電'}
        </div>
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
          <Table
            columns={columns}
            data={data?.data || []}
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

import { useMemo } from 'react';

import { ArrowRightIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';

import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';
import PageContainer from '../../components/page-container/PageContainer';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import Tag from '../../components/tag/Tag';
import APP_CONFIG from '../../constants/app-config';
import useGoal from '../../hooks/useGoal';
import useIsHistory from '../../hooks/useIsHistory';
import { selectBusiness } from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';
import { useGetRenewableEnergyQuery } from '../../services/renewableEnergy';
import { formatMonthRange } from '../../utils/date';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

const HEADERS = ({ pct } = {}) => [
  {
    key: 'electricity',
    name: '用電量 (度)',
    subHeaders: [
      { key: 'total', name: '總用電量 (a)' },
      { key: 'sun', name: '太陽能發電 (b)' },
      { key: 'tRec', name: '綠證 (c)' },
    ],
  },
  {
    key: 'ratio',
    name: (
      <>
        <div className="text-right">占比 (%)</div>
        <div className="text-right">( (b+c) / a )</div>
      </>
    ),
    renderer: targetFormatter(-pct, { formatter: ratioFormatter }),
    rowSpan: 0,
  },
  {
    key: 'tRecTarget',
    name: (
      <>
        <div className="text-right">再生能源綠證目標 (度)</div>
        <div className="text-right">{`( a*${ratioFormatter(pct)} - b )`}</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'roofRestArea',
    name: '屋頂剩餘可用面積 (M²)',
    rowSpan: 0,
  },
  {
    key: 'roofStructure',
    name: '屋頂結構 (RC / 鋼結構)',
    rowSpan: 0,
  },
];

const COLUMNS = ({ pct } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
    },
    ...HEADERS({ pct }).map(({ key, name, subHeaders, renderer = baseFormatter, ...rest }) => ({
      Header: name,
      Cell: renderer,
      ...(subHeaders && {
        id: name,
        Header: () => <div className="border-b border-divider py-3">{name}</div>,
        columns: subHeaders.map(({ key: _key, name: _name, _renderer = baseFormatter }) => ({
          Header: _name,
          accessor: [key, _key].join('.'),
          Cell: _renderer,
          className: 'text-right',
        })),
      }),
      ...(!subHeaders && { accessor: key, className: 'text-right' }),
      ...rest,
    })),
  ]);

export default function RenewableEnergyPage() {
  const business = useSelector(selectBusiness);
  const { data } = useGetRenewableEnergyQuery({ business });
  const isHistory = useIsHistory();
  const { label, pct } = useGoal({ isHistory, keyword: '可再生能源' });
  const columns = useMemo(() => COLUMNS({ pct }), [pct]);
  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div className="text-xl font-medium">可再生能源占比</div>
        {isHistory ? (
          <Tag>{label}</Tag>
        ) : (
          <DualTag
            labels={[
              <>
                累計區間：<span className="text-lg font-medium">{formatMonthRange(data?.maxDate)}</span>
              </>,
              label,
            ]}
          />
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
            ? '* 可再生能源占比 = 可再生能源用電 / 總用電'
            : '* 占比 = ( 電網綠電 + 太陽能發電 + 綠證 ) / 總用電'}
        </div>
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
          <Table
            columns={columns}
            data={data?.data || []}
            getRowProps={(row) => ({
              className: row.original.isFooter ? 'border-b-2 border-t-2 border-primary-600' : 'border-b border-divider',
            })}
          />
        </div>
      </div>
    </PageContainer>
  );
}

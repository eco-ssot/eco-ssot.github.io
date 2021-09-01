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
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import APP_CONFIG from '../../constants/app-config';
import { useGetCarbonQuery } from '../../services/carbon';
import { addPaddingColumns } from '../../utils/table';
import { selectBusiness } from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';
import useIsHistory from '../../hooks/useIsHistory';
import { formatMonthRange } from '../../utils/date';
import useGoal from '../../hooks/useGoal';

const HEADERS = ({ pct, currYear = APP_CONFIG.CURRENT_YEAR, baseYear = APP_CONFIG.BASE_YEAR_CARBON } = {}) => [
  {
    key: 'electricity',
    name: '用電量 (千瓦時)',
    subHeaders: [
      { key: 'total', name: '總用電 (a)' },
      { key: 'sun', name: '太陽能發電 (b)' },
      { key: 'tRec', name: '綠證 (c)' },
      { key: 'carbon', name: '碳排放用電 (d=a-b-c)' },
    ],
  },
  {
    key: 'carbonIndex',
    name: (
      <>
        <div className="text-right">碳排放係數 (e)</div>
        <div className="text-right">(公噸/兆瓦時)</div>
      </>
    ),
    rowSpan: 0,
    renderer: (cell) => baseFormatter(cell, { precision: 4 }),
  },
  {
    key: 'carbon',
    name: '碳排放 (公噸)',
    subHeaders: [
      { key: 'scope1', name: 'Scope1碳排 (f)' },
      { key: 'scope2', name: 'Scope2碳排 (g=d*e/1000)' },
      { key: 'currYear', name: `${currYear}年碳排 (h=f+g)` },
      { key: 'baseYear', name: `${baseYear}年碳排 (i)` },
      {
        key: 'delta',
        name: '增減率 (h/i-1)',
        renderer: targetFormatter(-pct, { formatter: ratioFormatter }),
      },
    ],
  },
  {
    key: 'target',
    name: (
      <>
        <div className="text-right">碳排抵扣綠證目標</div>
        <div className="text-right">{`(h-i*${ratioFormatter(1 - pct)})*1000/e`}</div>
      </>
    ),
    rowSpan: 0,
    renderer: baseFormatter,
  },
];

const COLUMNS = ({ pct, currYear = APP_CONFIG.CURRENT_YEAR, baseYear = APP_CONFIG.BASE_YEAR_CARBON } = {}) =>
  addPaddingColumns([
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
      rowSpan: 0,
    },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
    },
    ...HEADERS({ pct, currYear, baseYear }).map(({ key, name, subHeaders, renderer = baseFormatter, ...rest }) => ({
      Header: name,
      Cell: renderer,
      ...(subHeaders && {
        id: name,
        Header: () => <div className="border-b border-divider py-3">{name}</div>,
        columns: subHeaders.map(({ key: _key, name: _name, renderer: _renderer = baseFormatter }) => ({
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

export default function CarbonPage() {
  const business = useSelector(selectBusiness);
  const { data } = useGetCarbonQuery({ business });
  const isHistory = useIsHistory();
  const { label, pct, currYear, baseYear } = useGoal({ isHistory, keyword: '碳排放量' });
  const columns = useMemo(() => COLUMNS({ pct, currYear, baseYear }), [pct, currYear, baseYear]);
  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div className="text-xl font-medium">碳排放管理</div>
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

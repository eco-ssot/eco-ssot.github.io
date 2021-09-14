import { useMemo } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ArrowRightIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'query-string';

import PageContainer from '../../components/page-container/PageContainer';
import ButtonGroup from '../../components/button/ButtonGroup';
import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import DualTag from '../../components/tag/DualTag';
import Select from '../../components/select/Select';
import Button from '../../components/button/Button';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import APP_CONFIG from '../../constants/app-config';
import { selectBusiness } from '../../renderless/location/locationSlice';
import { useGetElectricityQuery } from '../../services/electricity';
import useIsHistory from '../../hooks/useIsHistory';
import { navigate } from '../../router/helpers';
import { addPaddingColumns } from '../../utils/table';
import { formatMonthRange } from '../../utils/date';
import useGoal from '../../hooks/useGoal';
import Dot from '../../components/dot/Dot';

const HEADERS = ({ business, currYear = APP_CONFIG.CURRENT_YEAR, lastYear = APP_CONFIG.LAST_YEAR } = {}) => [
  {
    key: 'electricity',
    name: '用電量 (度)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年 (a)` },
      { key: 'currYear', name: `${currYear}年 (b)` },
      { key: 'delta', name: '增減率 (b/a-1)', renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
  {
    key: 'revenue',
    name: '營業額 (十億新台幣)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年 (c)` },
      { key: 'currYear', name: `${currYear}年 (d)` },
      { key: 'delta', name: '增減率 (d/c-1)', renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
  {
    key: 'revenueElectricity',
    name: '十億營業額用電 (度)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年 (e=a/c)` },
      { key: 'currYear', name: `${currYear}年 (f=b/d)` },
      {
        key: 'delta',
        name: '增減率 (f/e-1)',
        renderer: (cell) => {
          const value = targetFormatter(0, { formatter: ratioFormatter })(cell);
          if (!cell.row.original.isFooter && cell.value > 0) {
            let query = { business, site: cell.row.original.site };
            if (cell.row.depth > 0) {
              query = {
                ...query,
                site: cell.rowsById[cell.row.id.split('.')[0]].original.site,
                plant: cell.row.original.site,
              };
            }

            const search = qs.stringify(query);
            return (
              <Link className="flex items-center justify-end space-x-2" to={`/electricity/analysis?${search}`}>
                <Dot />
                {value}
              </Link>
            );
          }

          return value;
        },
      },
    ],
  },
  {
    key: 'asp',
    name: 'ASP (千台幣/台)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年 (g)`, renderer: (value) => baseFormatter(value, { precision: 1 }) },
      { key: 'currYear', name: `${currYear}年 (h)`, renderer: (value) => baseFormatter(value, { precision: 1 }) },
      { key: 'delta', name: '增減率 (h/g-1)', renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
];

const COLUMNS = ({ business, currYear = APP_CONFIG.CURRENT_YEAR, lastYear = APP_CONFIG.LAST_YEAR } = {}) =>
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
    ...HEADERS({ business, currYear, lastYear }).map(({ key, name, subHeaders = [] }) => ({
      id: name,
      Header: () => <div className="border-b border-divider py-3">{name}</div>,
      columns: subHeaders.map(({ key: _key, name: _name, renderer = baseFormatter }) => ({
        Header: _name,
        accessor: [key, _key].join('.'),
        Cell: renderer,
        className: 'text-right',
      })),
    })),
  ]);

export default function ElectricityPage() {
  const business = useSelector(selectBusiness);
  const { data } = useGetElectricityQuery({ business });
  const isHistory = useIsHistory();
  const { label, pct, currYear, baseYear } = useGoal({ isHistory, keyword: '用電強度' });
  const columns = useMemo(
    () => COLUMNS({ business, pct, currYear, lastYear: baseYear }),
    [business, pct, currYear, baseYear]
  );

  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div className="text-xl font-medium">十億營業額用電</div>
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
        <div className="w-full h-6 text-right">{isHistory ? '* 增減率 = (當年度 − 上年度) / 上年度' : ''}</div>
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

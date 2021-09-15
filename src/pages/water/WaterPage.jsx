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
import { useGetWaterQuery } from '../../services/water';
import { selectBusiness } from '../../renderless/location/locationSlice';
import useIsHistory from '../../hooks/useIsHistory';
import { navigate } from '../../router/helpers';
import { addPaddingColumns } from '../../utils/table';
import { formatMonthRange } from '../../utils/date';
import useGoal from '../../hooks/useGoal';
import Dot from '../../components/dot/Dot';

const HEADERS = ({
  business,
  pct,
  currYear = APP_CONFIG.CURRENT_YEAR,
  lastYear = APP_CONFIG.LAST_YEAR,
  baseYear = APP_CONFIG.BASE_YEAR_WATER,
} = {}) => [
  {
    key: 'water',
    name: '用水量 (千噸)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年` },
      { key: 'currYear', name: `${currYear}年` },
      { key: 'weight', name: '權重', renderer: ratioFormatter },
      { key: 'delta', name: '增減率', renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
  {
    key: 'revenue',
    name: '營業額 (十億台幣)',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年`, renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
      { key: 'currYear', name: `${currYear}年`, renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
      { key: 'weight', name: '權重', renderer: ratioFormatter },
      { key: 'delta', name: '增減率', renderer: targetFormatter(0, { formatter: ratioFormatter }) },
    ],
  },
  {
    key: 'revenueWater',
    name: '十億營業額用水',
    subHeaders: [
      { key: 'lastYear', name: `${lastYear}年` },
      { key: 'currYear', name: `${currYear}年` },
      { key: 'weight', name: '權重', renderer: ratioFormatter },
      {
        key: 'delta',
        name: '增減率',
        renderer: targetFormatter(0, { formatter: ratioFormatter }),
      },
    ],
  },
  {
    key: 'comparison',
    name: '對比基準年',
    subHeaders: [
      { key: 'baseYear', name: `${baseYear}年` },
      {
        key: 'delta',
        name: '增減率',
        renderer: (cell) => {
          const value = targetFormatter(-pct, { formatter: ratioFormatter })(cell);
          if (
            !cell.row.original.isFooter &&
            cell.row.original.subRows.length === 0 &&
            isFinite(cell.value) &&
            cell.value > -pct
          ) {
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
              <Link className="flex items-center justify-end space-x-2" to={`/water/analysis?${search}`}>
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
];

const COLUMNS = ({
  business,
  pct,
  currYear = APP_CONFIG.CURRENT_YEAR,
  lastYear = APP_CONFIG.LAST_YEAR,
  baseYear = APP_CONFIG.BASE_YEAR_WATER,
} = {}) =>
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
    ...HEADERS({ business, pct, currYear, lastYear, baseYear }).map(({ key, name, subHeaders = [] }) => ({
      id: name,
      Header: () => <div className="border-b border-divider py-3">{name}</div>,
      ...(subHeaders && {
        columns: subHeaders.map(({ key: _key, name: _name, renderer = baseFormatter }) => ({
          Header: _name,
          accessor: [key, _key].join('.'),
          Cell: renderer,
          className: 'text-right',
        })),
      }),
    })),
  ]);

export default function WaterPage() {
  const business = useSelector(selectBusiness);
  const { data } = useGetWaterQuery({ business });
  const isHistory = useIsHistory();
  const { label, pct, currYear, baseYear } = useGoal({ isHistory, keyword: '用水強度' });
  const columns = useMemo(
    () => COLUMNS({ business, pct, currYear, baseYear, lastYear: currYear - 1 }),
    [business, pct, currYear, baseYear]
  );

  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div className="text-xl font-medium">十億營業額用水</div>
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
        <div className="w-full h-6 text-right">* 增減率 = (當年度 − 上年度) / 上年度</div>
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg space-y-2">
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

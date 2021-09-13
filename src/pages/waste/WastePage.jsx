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
import { useGetWasteQuery } from '../../services/waste';
import { selectBusiness } from '../../renderless/location/locationSlice';
import useIsHistory from '../../hooks/useIsHistory';
import { navigate } from '../../router/helpers';
import { addPaddingColumns } from '../../utils/table';
import { formatMonthRange } from '../../utils/date';
import useGoal from '../../hooks/useGoal';

const HEADERS = ({ business, pct, maxDate, baseYear = APP_CONFIG.BASE_YEAR_WASTE } = {}) => [
  {
    key: 'nonRecyclable',
    name: '不可回收類重量 (公噸)',
    subHeaders: [
      {
        key: 'normal',
        name: '一般廢棄物 (焚化 & 掩埋)',
      },
      { key: 'harmful', name: '有害廢棄物' },
    ],
  },
  {
    key: 'recyclable',
    name: '可回收類重量 (公噸)',
    subHeaders: [
      {
        key: 'normal',
        name: '一般廢棄物 (其他/廚餘)',
      },
      {
        key: 'waste',
        name: '資源廢棄物 (堆肥 & 資源回收)',
      },
    ],
  },
  {
    key: 'total',
    name: (
      <>
        <div className="text-right">Total</div>
        <div className="text-right">(公噸)</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'revenue',
    name: (
      <>
        <div className="text-right">{`${formatMonthRange(maxDate)}月營收`}</div>
        <div className="text-right">(十億台幣)</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'waste',
    name: '廢棄物產生密度 (公噸/十億台幣)',
    subHeaders: [
      { key: 'currYear', name: `${formatMonthRange(maxDate)}月` },
      { key: 'baseYear', name: `${baseYear}年` },
      {
        key: 'delta',
        name: '增減率 *',
        renderer: (cell) => {
          const value = targetFormatter(-pct, { formatter: ratioFormatter, precision: 2 })(cell);
          if (!cell.row.original.isFooter && cell.value > 0) {
            const search = qs.stringify({ business, site: cell.row.original.site });
            return <Link to={`/waste/analysis?${search}`}>{value}</Link>;
          }

          return value;
        },
      },
    ],
  },
  {
    key: 'recycleRate',
    name: <div className="text-right">廢棄物回收率</div>,
    renderer: (cell) => ratioFormatter(cell, { precision: 2 }),
    rowSpan: 0,
  },
];

const COLUMNS = ({ business, pct, maxDate, baseYear = APP_CONFIG.BASE_YEAR_WASTE } = {}) =>
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
    ...HEADERS({ business, pct, maxDate, baseYear }).map(
      ({ key, name, subHeaders, renderer = (cell) => baseFormatter(cell, { precision: 2 }), ...rest }) => ({
        Header: name,
        Cell: renderer,
        ...(subHeaders && {
          id: name,
          Header: () => <div className="border-b border-divider py-3">{name}</div>,
          columns: subHeaders.map(
            ({ key: _key, name: _name, renderer: _renderer = (cell) => baseFormatter(cell, { precision: 2 }) }) => ({
              Header: _name,
              accessor: [key, _key].join('.'),
              Cell: _renderer,
              className: 'text-right',
            })
          ),
        }),
        ...(!subHeaders && { accessor: key, className: 'text-right' }),
        ...rest,
      })
    ),
  ]);

export default function WastePage() {
  const business = useSelector(selectBusiness);
  const { data } = useGetWasteQuery({ business });
  const isHistory = useIsHistory();
  const { label, pct, baseYear } = useGoal({ isHistory, keyword: '廢棄物密度' });
  const columns = useMemo(
    () => COLUMNS({ business, pct, baseYear, maxDate: data?.maxDate }),
    [business, pct, baseYear, data?.maxDate]
  );
  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div className="text-xl font-medium">廢棄物產生密度</div>
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
              <Button>搜尋</Button>
            </div>
            <div className="text-right">
              <Button>Excel</Button>
            </div>
          </div>
        )}
        <div className="w-full h-6 text-right">* 增減率 = (當年度 − 上年度) / 上年度</div>
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

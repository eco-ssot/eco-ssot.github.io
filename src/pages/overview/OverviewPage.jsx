import { useMemo, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { partition } from 'lodash';
import { useSelector } from 'react-redux';

import PageContainer from '../../components/page-container/PageContainer';
import ButtonGroup from '../../components/button/ButtonGroup';
import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import Select from '../../components/select/Select';
import Button from '../../components/button/Button';
import { baseFormatter, ratioFormatter } from '../../utils/formatter';
import { addPaddingColumns } from '../../utils/table';
import APP_CONFIG from '../../constants/app-config';
import { useGetOverviewQuery } from '../../services/overview';
import { selectBusiness, selectYear, selectDimension } from '../../renderless/query-params/queryParamsSlice';
import { navigate } from '../../router/helpers';
import { formatMonthRange } from '../../utils/date';

const HEADERS = [
  { key: 'electricity', name: '用電量 (度)' },
  { key: 'water', name: '用水量 (公噸)' },
  { key: 'revenue', name: '營業額 (十億台幣)' },
  { key: 'asp', name: 'ASP (千台幣/台)' },
];

const COLUMNS = ({ currYear = APP_CONFIG.CURRENT_YEAR, lastYear = APP_CONFIG.LAST_YEAR } = {}) =>
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
      className: 'w-6',
    },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
      className: 'w-24',
    },
    ...HEADERS.map(({ key, name }) => ({
      id: name,
      Header: () => <div className="border-b border-divider py-3">{name}</div>,
      columns: [
        {
          Header: `${lastYear}年`,
          accessor: [key, lastYear].join('.'),
          Cell: baseFormatter,
          className: 'text-right',
        },
        {
          Header: `${currYear}年`,
          accessor: [key, currYear].join('.'),
          Cell: baseFormatter,
          className: 'text-right',
        },
        {
          Header: '權重',
          accessor: [key, 'weight'].join('.'),
          Cell: ratioFormatter,
          className: 'text-right',
        },
        {
          Header: '增減率 *',
          accessor: [key, 'delta'].join('.'),
          Cell: ratioFormatter,
          className: 'text-right',
        },
      ],
    })),
  ]);

export function toRow({
  site,
  ASPCompareYear,
  ASPCurrentYear,
  ASPGradient,
  ASPWeight,
  electricCompareYear,
  electricCurrentYear,
  electricGradient,
  electricWeight,
  revenueCompareYear,
  revenueCurrentYear,
  revenueGradient,
  revenueWeight,
  waterUseCompareYear,
  waterUseCurrentYear,
  waterUseGradient,
  waterUseWeight,
  currYear = APP_CONFIG.CURRENT_YEAR,
  lastYear = APP_CONFIG.LAST_YEAR,
} = {}) {
  return {
    site,
    electricity: {
      [currYear]: electricCurrentYear,
      [lastYear]: electricCompareYear,
      weight: electricWeight,
      delta: electricGradient,
    },
    water: {
      [currYear]: waterUseCurrentYear,
      [lastYear]: waterUseCompareYear,
      weight: waterUseWeight,
      delta: waterUseGradient,
    },
    revenue: {
      [currYear]: revenueCurrentYear,
      [lastYear]: revenueCompareYear,
      weight: revenueWeight,
      delta: revenueGradient,
    },
    asp: {
      [currYear]: ASPCurrentYear,
      [lastYear]: ASPCompareYear,
      weight: ASPWeight,
      delta: ASPGradient,
    },
    ...(site === 'Total' && { isFooter: true }),
  };
}

export default function OverviewPage() {
  const business = useSelector(selectBusiness);
  const year = useSelector(selectYear);
  const dimension = useSelector(selectDimension);
  const { data } = useGetOverviewQuery({ business, year, dimension });
  const [selectedYear, setSelectedYear] = useState(year || APP_CONFIG.YEAR_OPTIONS[0].key);
  const [selectedDimension, setSelectedDimension] = useState(dimension || APP_CONFIG.DIMENSION_OPTIONS[0].key);
  const columns = useMemo(
    () => COLUMNS({ currYear: year, ...(year && { lastYear: String(Number(year - 1)) }) }),
    [year]
  );

  const [total, records] = partition(data?.data || [], ({ site }) => site === 'Total');
  const dataSource = [...records, ...total].map(({ plants, ...rest }) => ({
    ...toRow(rest),
    subRows: plants.map(toRow),
  }));

  const isHistory = year || dimension;
  return (
    <PageContainer>
      <div className="flex justify-between h-8">
        <div>用電、用水、營收及ASP比較</div>
        {!isHistory && <Tag>{`累計區間：${formatMonthRange(null)}`}</Tag>}
      </div>
      <div className="flex flex-col w-full justify-center items-center space-y-2">
        <ButtonGroup
          options={APP_CONFIG.HISTORY_OPTIONS}
          selected={isHistory ? APP_CONFIG.HISTORY_OPTIONS[1] : APP_CONFIG.HISTORY_OPTIONS[0]}
          onChange={(e) =>
            navigate({
              business,
              year: null,
              dimension: null,
              ...(e.key === 'HISTORY' && { year: selectedYear, dimension: selectedDimension }),
            })
          }
        />
        {isHistory && (
          <div className="w-full grid grid-cols-12 py-4 items-center">
            <div></div>
            <div className="flex justify-center space-x-8 col-span-10">
              <Select
                label="查詢年度："
                options={APP_CONFIG.YEAR_OPTIONS}
                selected={APP_CONFIG.YEAR_OPTIONS.find((option) => option.key === selectedYear)}
                onChange={(e) => setSelectedYear(e.key)}
              />
              <Select
                buttonClassName="w-36"
                label="資料呈現："
                options={APP_CONFIG.DIMENSION_OPTIONS}
                selected={APP_CONFIG.DIMENSION_OPTIONS.find((option) => option.key === selectedDimension)}
                onChange={(e) => setSelectedDimension(e.key)}
              />
              <Button
                onClick={() =>
                  navigate({
                    business,
                    year: selectedYear,
                    dimension: selectedDimension,
                  })
                }>
                搜尋
              </Button>
            </div>
            <div className="text-right">
              <Button onClick={() => {}}>Excel</Button>
            </div>
          </div>
        )}
        <div className="w-full h-6 text-right">* 增減率 = (當年度 − 上年度) / 上年度</div>
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
          <Table
            columns={columns}
            data={dataSource}
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

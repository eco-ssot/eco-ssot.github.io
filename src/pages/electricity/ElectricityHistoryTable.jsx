import { isNil } from 'lodash';

import HistorySearch from '../../components/history-search/HistorySearch';
import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import APP_CONFIG from '../../constants/app-config';
import useGoal from '../../hooks/useGoal';
import { navigate } from '../../router/helpers';
import { useGetElectricityHistoryQuery } from '../../services/electricity';
import { baseFormatter, ratioFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

const COLUMNS = ({ startYear, endYear, startMonth, endMonth, monthType }) => {
  let columns = [];
  if (!isNil(monthType)) {
    columns = Array.from({ length: Number(endYear) - Number(startYear) + 1 }, (_, i) => {
      const key = Number(startYear) + i;
      const header =
        monthType === APP_CONFIG.MONTH_RANGE_MAPPING.YTM ? `${key} 年 1 - ${endMonth}月` : `${key} 年 ${endMonth}月`;

      return {
        id: key,
        Header: () => <div className="border-b border-divider py-3">{header}</div>,
        columns: [
          {
            Header: '十億營業額用電 (度)',
            accessor: [key, 'electricity'].join('.'),
            className: 'text-right',
            Cell: baseFormatter,
          },
          { Header: '增減率 *', accessor: [key, 'delta'].join('.'), className: 'text-right', Cell: ratioFormatter },
        ],
      };
    });
  }

  if (startYear === endYear) {
    columns = Array.from({ length: Number(endMonth) - Number(startMonth) + 1 }, (_, i) => {
      const key = Number(startMonth) + i;
      return {
        Header: () => (
          <>
            <div>{`${startYear} 年 ${key} 月`}</div>
            <div>十億營業額用電 (度)</div>
          </>
        ),
        accessor: String(key),
        Cell: baseFormatter,
        className: 'text-right',
      };
    });
  }

  return addPaddingColumns(
    [
      { ...EXPAND_COLUMN },
      {
        Header: 'Site',
        accessor: 'site',
        rowSpan: 0,
      },
    ].concat(columns)
  );
};

export const toRow =
  ({ startYear, endYear, monthType }) =>
  (row = {}) => {
    if (!isNil(monthType)) {
      return toMonthTypeRow(row);
    }

    if (startYear === endYear) {
      return toSameYearRow(row);
    }

    return row;
  };

export function toMonthTypeRow({ name, metaData = [], plants = [] }) {
  return {
    site: name,
    ...metaData.reduce(
      (prev, { year, billiRevenueElectric: electricity, gradient: delta }) => ({
        ...prev,
        [year]: { electricity, delta },
      }),
      {}
    ),
    subRows: plants.map(toMonthTypeRow),
    ...(name === 'Total' && { isFooter: true }),
  };
}

export function toSameYearRow({ name, metaData = [], plants = [] }) {
  return {
    site: name,
    ...metaData.reduce(
      (prev, { month, billiRevenueElectric }) => ({
        ...prev,
        [month]: billiRevenueElectric,
      }),
      {}
    ),
    subRows: plants.map(toSameYearRow),
    ...(name === 'Total' && { isFooter: true }),
  };
}

export default function ElectricityHistoryTable({
  business,
  startYear,
  endYear,
  monthType,
  startMonth,
  endMonth,
  dimension,
}) {
  const option = { startYear, endYear, monthType, startMonth, endMonth, dimension };
  const { data } = useGetElectricityHistoryQuery({ business, ...option }, { skip: Object.values(option).every(isNil) });
  const { label } = useGoal({ keyword: '用電強度', isHistory: true });
  return (
    <>
      <Tag className="absolute top-4 right-4">{label}</Tag>
      <HistorySearch option={option} onSearch={(query) => navigate({ ...query, business })} />
      {data && (
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
          <Table
            columns={COLUMNS(option)}
            data={(data?.data || []).map(toRow(option))}
            getRowProps={(row) => ({
              className: row.original.isFooter ? 'border-b-2 border-t-2 border-primary-600' : 'border-b border-divider',
            })}
          />
        </div>
      )}
    </>
  );
}

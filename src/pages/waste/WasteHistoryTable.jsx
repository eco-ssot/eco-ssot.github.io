import { isNil } from 'lodash';

import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import APP_CONFIG from '../../constants/app-config';
import useGoal from '../../hooks/useGoal';
import { useGetWasteHistoryQuery } from '../../services/waste';
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
            Header: '廢棄物產生密度 (公噸/十億臺幣)',
            accessor: [key, 'waste'].join('.'),
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
            <div>廢棄物產生密度 (公噸/十億臺幣)</div>
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
      (prev, { year, intensity: waste, gradient: delta }) => ({
        ...prev,
        [year]: { waste, delta },
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
      (prev, { month, intensity }) => ({
        ...prev,
        [month]: intensity,
      }),
      {}
    ),
    subRows: plants.map(toSameYearRow),
    ...(name === 'Total' && { isFooter: true }),
  };
}

export default function WasteHistoryTable({
  business,
  startYear,
  endYear,
  monthType,
  startMonth,
  endMonth,
  dimension,
}) {
  const option = { startYear, endYear, monthType, startMonth, endMonth, dimension };
  const { data } = useGetWasteHistoryQuery({ business, ...option }, { skip: Object.values(option).every(isNil) });
  const { label } = useGoal({ keyword: '廢棄物密度', isHistory: true });
  return (
    <>
      <Tag className="absolute top-2 right-4">{label}</Tag>
      {data && (
        <>
          <div className="w-full h-6 text-right">* 增減率 = (當年度 − 上年度) / 上年度</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
            <Table columns={COLUMNS(option)} data={(data?.data || []).map(toRow(option))} />
          </div>
        </>
      )}
    </>
  );
}

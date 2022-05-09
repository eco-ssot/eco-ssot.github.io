import { useMemo } from 'react';

import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import useGoal from '../../hooks/useGoal';
import usePlantPermission from '../../hooks/usePlantPermission';
import { useGetRenewableEnergyHistoryQuery } from '../../services/renewableEnergy';
import { baseFormatter, ratioFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

const COLUMNS = ({ t, startYear, endYear, startMonth, endMonth, monthType }) => {
  let columns = [];
  if (!isNil(monthType)) {
    columns = Array.from({ length: Number(endYear) - Number(startYear) + 1 }, (_, i) => {
      const key = Number(startYear) + i;
      const header = t(
        monthType === APP_CONSTANTS.MONTH_RANGE_MAPPING.YTM ? 'common:history.ytm' : 'common:history.m',
        {
          startYear: key,
          endMonthNum: endMonth,
          endMonth: new Date().setMonth(Number(endMonth) - 1),
          formatParams: {
            endMonth: { month: 'short' },
          },
        }
      );

      return {
        id: key,
        Header: () => <div className="border-b border-divider py-3">{header}</div>,
        columns: [
          {
            Header: t('renewableEnergyPage:history.electricity'),
            accessor: [key, 'electricity'].join('.'),
            className: 'text-right',
            Cell: baseFormatter,
          },
          {
            Header: t('renewableEnergyPage:history.ratio'),
            accessor: [key, 'ratio'].join('.'),
            className: 'text-right',
            Cell: ratioFormatter,
          },
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
            <div>
              {t('common:history.m', {
                startYear: startYear,
                endMonthNum: key,
                endMonth: new Date().setMonth(Number(key) - 1),
                formatParams: {
                  endMonth: { month: 'short' },
                },
              })}
            </div>
            <div>{t('renewableEnergyPage:history.ratio')}</div>
          </>
        ),
        accessor: String(key),
        Cell: ratioFormatter,
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
      (prev, { year, electricity, percent: ratio }) => ({
        ...prev,
        [year]: { electricity, ratio },
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
      (prev, { month, percent }) => ({
        ...prev,
        [month]: percent,
      }),
      {}
    ),
    subRows: plants.map(toSameYearRow),
    ...(name === 'Total' && { isFooter: true }),
  };
}

export default function RenewableEnergyHistoryTable({
  business,
  startYear,
  endYear,
  monthType,
  startMonth,
  endMonth,
  dimension,
  s,
  p,
}) {
  const { t } = useTranslation(['renewableEnergyPage', 'common']);
  const option = useMemo(
    () => ({ startYear, endYear, monthType, startMonth, endMonth, dimension }),
    [startYear, endYear, monthType, startMonth, endMonth, dimension]
  );

  const plantPermission = usePlantPermission();
  const { data } = useGetRenewableEnergyHistoryQuery(
    { business, site: s, plant: p, permission: plantPermission, ...option },
    { skip: Object.values(option).every(isNil) }
  );

  const { label } = useGoal({ keyword: '可再生能源' });
  const columns = useMemo(() => COLUMNS({ ...option, t }), [option, t]);
  return (
    <>
      <Tag className="absolute top-2 right-4">{label}</Tag>
      {data && (
        <>
          <div className="h-6 w-full text-right">{t('history.desc')}</div>
          <div className="flex w-full flex-col overflow-auto rounded-t-lg shadow">
            <Table columns={columns} data={(data?.data || []).map(toRow(option))} />
          </div>
        </>
      )}
    </>
  );
}

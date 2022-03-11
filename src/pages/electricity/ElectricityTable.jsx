import { useMemo } from 'react';

import { get } from 'lodash';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import Dot from '../../components/dot/Dot';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import useGoal from '../../hooks/useGoal';
import usePlantPermission from '../../hooks/usePlantPermission';
import { useGetElectricityQuery } from '../../services/electricity';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, getHidePlantRowProps, noDataRenderer } from '../../utils/table';

const HEADERS = ({ t, pct, currYear = APP_CONSTANTS.CURRENT_YEAR, lastYear = APP_CONSTANTS.LAST_YEAR } = {}) => [
  {
    key: 'electricity',
    name: t('electricityPage:table.electricity.header'),
    subHeaders: [
      { key: 'lastYear', name: `${lastYear} (a)` },
      { key: 'currYear', name: `${currYear} (b)` },
      {
        key: 'delta',
        name: t('electricityPage:table.electricity.delta'),
        renderer: targetFormatter(0, { formatter: ratioFormatter }),
      },
    ],
  },
  {
    key: 'revenue',
    name: t('electricityPage:table.revenue.header'),
    subHeaders: [
      { key: 'lastYear', name: `${lastYear} (c)`, renderer: (cell) => baseFormatter(cell, { precision: 2 }) },
      { key: 'currYear', name: `${currYear} (d)`, renderer: (cell) => baseFormatter(cell, { precision: 2 }) },
      {
        key: 'delta',
        name: t('electricityPage:table.revenue.delta'),
        renderer: targetFormatter(0, { formatter: ratioFormatter }),
      },
    ],
  },
  {
    key: 'revenueElectricity',
    name: t('electricityPage:table.revenueElectricity.header'),
    subHeaders: [
      { key: 'lastYear', name: `${lastYear} (e=a/c)` },
      { key: 'currYear', name: `${currYear} (f=b/d)` },
      {
        key: 'delta',
        name: t('electricityPage:table.revenueElectricity.delta'),
        renderer: (cell) => {
          if (cell.row.original.subRows.length > 0) {
            const canExpand = cell.row.original.subRows.some((row) => {
              const val = get(row, cell.column.id);
              return isFinite(val) && val > 0;
            });

            if (canExpand) {
              return (
                <div className=" cursor-pointer" onClick={() => cell.row.toggleRowExpanded()}>
                  {targetFormatter(pct, { formatter: ratioFormatter, className: 'underline' })(cell)}
                </div>
              );
            }
          }

          if (
            !cell.row.original.isFooter &&
            cell.row.original.subRows.length === 0 &&
            isFinite(cell.value) &&
            cell.value > 0
          ) {
            let query = {
              ...qs.parse(qs.pick(window.location.search, APP_CONSTANTS.GLOBAL_QUERY_KEYS)),
              site: cell.row.original.site,
            };

            if (cell.row.depth > 0) {
              query = {
                ...query,
                site: cell.rowsById[cell.row.id.split('.')[0]].original.site,
                plant: cell.row.original.site,
              };
            }

            query = { ...query, ...(query.s && { site: query.s }), ...(query.p && { plant: query.p }) };
            const search = qs.stringify(query);
            return (
              <Link className="flex items-center justify-end space-x-2 " to={`/electricity/analysis?${search}`}>
                <Dot />
                {targetFormatter(pct, { formatter: ratioFormatter, className: 'underline' })(cell)}
              </Link>
            );
          }

          return targetFormatter(pct, { formatter: ratioFormatter })(cell);
        },
      },
    ],
  },
  {
    key: 'asp',
    name: t('electricityPage:table.asp.header'),
    subHeaders: [
      { key: 'lastYear', name: `${lastYear} (g)`, renderer: (value) => baseFormatter(value, { precision: 2 }) },
      { key: 'currYear', name: `${currYear} (h)`, renderer: (value) => baseFormatter(value, { precision: 2 }) },
      {
        key: 'delta',
        name: t('electricityPage:table.asp.delta'),
        renderer: targetFormatter(0, { formatter: ratioFormatter }),
      },
    ],
  },
];

const COLUMNS = ({ t, missing, pct, currYear = APP_CONSTANTS.CURRENT_YEAR, lastYear = APP_CONSTANTS.LAST_YEAR } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
      Cell: noDataRenderer({ missing }),
    },
    ...HEADERS({ t, pct, currYear, lastYear }).map(({ key, name, subHeaders = [] }) => ({
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

export default function ElectricityTable({ business, y, m, s, p, missingPlants }) {
  const { t } = useTranslation(['electricityPage', 'common']);
  const plantPermission = usePlantPermission();
  const { data } = useGetElectricityQuery({
    business,
    year: y,
    month: m,
    site: s,
    plant: p,
    permission: plantPermission,
  });

  const { label, currYear, baseYear, pct } = useGoal({ keyword: '用電強度' });
  const columns = useMemo(
    () => COLUMNS({ t, pct, currYear, lastYear: baseYear, missing: missingPlants }),
    [currYear, baseYear, t, missingPlants, pct]
  );

  return (
    <>
      <DualTag
        className="absolute top-2 right-4"
        labels={[
          <div className="flex items-center">
            {t('common:accumulationRange')} : <GlobalDateSelect />
          </div>,
          label,
        ]}
      />
      <div className="h-6"></div>
      {data && (
        <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
          <Table
            columns={columns}
            data={data?.data || []}
            getRowProps={getHidePlantRowProps}
            autoResetExpanded={false}
          />
        </div>
      )}
    </>
  );
}

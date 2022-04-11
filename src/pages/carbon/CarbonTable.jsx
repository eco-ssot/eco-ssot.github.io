import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import useGoal from '../../hooks/useGoal';
import usePlantPermission from '../../hooks/usePlantPermission';
import { useGetCarbonQuery } from '../../services/carbon';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, getHidePlantRowProps, noDataRenderer } from '../../utils/table';

const HEADERS = ({ t, pct, currYear = APP_CONSTANTS.CURRENT_YEAR, baseYear = APP_CONSTANTS.BASE_YEAR_CARBON } = {}) => [
  {
    key: 'electricity',
    name: t('carbonPage:table.electricity.header'),
    subHeaders: [
      { key: 'total', name: t('carbonPage:table.electricity.total') },
      { key: 'sun', name: t('carbonPage:table.electricity.sun') },
      { key: 'tRec', name: t('carbonPage:table.electricity.tRec') },
      { key: 'carbon', name: t('carbonPage:table.electricity.carbon') },
    ],
  },
  {
    key: 'carbonIndex',
    name: (
      <>
        <div className="text-right">{t('carbonPage:table.carbonIndex.header')}</div>
        <div className="text-right">{t('carbonPage:table.carbonIndex.unit')}</div>
      </>
    ),
    rowSpan: 0,
    renderer: (cell) => baseFormatter(cell, { precision: 4 }),
  },
  {
    key: 'carbon',
    name: t('carbonPage:table.carbon.header'),
    subHeaders: [
      { key: 'scope1', name: t('carbonPage:table.carbon.scope1') },
      { key: 'scope2', name: t('carbonPage:table.carbon.scope2') },
      { key: 'currYear', name: t('carbonPage:table.carbon.currYear', { currYear }) },
      { key: 'baseYear', name: t('carbonPage:table.carbon.baseYear', { baseYear }) },
      {
        key: 'delta',
        name: t('carbonPage:table.carbon.delta'),
        renderer: targetFormatter(-pct, { formatter: ratioFormatter }),
      },
    ],
  },
  {
    key: 'target',
    name: (
      <>
        <div className="text-right">{t('carbonPage:table.target.header')}</div>
        <div className="text-right">{t('carbonPage:table.target.unit', { ratio: ratioFormatter(1 - pct) })}</div>
      </>
    ),
    rowSpan: 0,
    renderer: baseFormatter,
  },
];

const COLUMNS = ({
  t,
  pct,
  missing,
  currYear = APP_CONSTANTS.CURRENT_YEAR,
  baseYear = APP_CONSTANTS.BASE_YEAR_CARBON,
} = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
      Cell: noDataRenderer({ missing }),
    },
    ...HEADERS({ t, pct, currYear, baseYear }).map(({ key, name, subHeaders, renderer = baseFormatter, ...rest }) => ({
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

export default function CarbonTable({ business, y, m, s, p, missingPlants }) {
  const { t } = useTranslation(['carbonPage', 'common']);
  const plantPermission = usePlantPermission();
  const { data } = useGetCarbonQuery({
    business,
    year: y,
    month: m,
    site: s,
    plant: p,
    permission: plantPermission,
  });

  const { label, pct, currYear, baseYear } = useGoal({ keyword: '碳排放量' });
  const columns = useMemo(
    () => COLUMNS({ t, pct, currYear, baseYear, missing: missingPlants }),
    [pct, currYear, baseYear, t, missingPlants]
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
        <div className="flex w-full flex-col overflow-auto rounded-t-lg shadow">
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

import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import FixedTable from '../../components/table/FixedTable';
import DualTag from '../../components/tag/DualTag';
import useGoal from '../../hooks/useGoal';
import usePlantPermission from '../../hooks/usePlantPermission';
import { useGetUnitElectricityQuery } from '../../services/unitElectricity';
import { ratioFormatter, statisticsFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, getHidePlantRowProps, noDataRenderer } from '../../utils/table';

const HEADERS = ({ t, pct, currYear = APP_CONSTANTS.CURRENT_YEAR, lastYear = APP_CONSTANTS.LAST_YEAR } = {}) => [
  {
    key: 'electricity',
    name: t('unitElectricityPage:table.electricity.header'),
    subHeaders: [
      { key: 'lastYear', name: `${lastYear} (a)` },
      { key: 'currYear', name: `${currYear} (b)` },
      {
        key: 'delta',
        name: t('unitElectricityPage:table.electricity.delta'),
        renderer: targetFormatter(0, { formatter: ratioFormatter }),
      },
    ],
  },
  {
    key: 'production',
    name: t('unitElectricityPage:table.production.header'),
    subHeaders: [
      { key: 'lastYear', name: `${lastYear} (c)` },
      { key: 'currYear', name: `${currYear} (d)` },
      {
        key: 'delta',
        name: t('unitElectricityPage:table.production.delta'),
        renderer: targetFormatter(0, { formatter: ratioFormatter }),
      },
    ],
  },
  {
    key: 'unitElectricity',
    name: t('unitElectricityPage:table.unitElectricity.header'),
    subHeaders: [
      { key: 'lastYear', name: `${lastYear} (e=a/c)`, renderer: statisticsFormatter(3) },
      { key: 'currYear', name: `${currYear} (f=b/d)`, renderer: statisticsFormatter(3) },
      {
        key: 'delta',
        name: t('unitElectricityPage:table.unitElectricity.delta'),
        renderer: targetFormatter(-pct, { formatter: ratioFormatter }),
      },
    ],
  },
];

const COLUMNS = ({ t, pct, missing, currYear = APP_CONSTANTS.CURRENT_YEAR, lastYear = APP_CONSTANTS.LAST_YEAR } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
      Cell: noDataRenderer({ missing }),
      className: 'whitespace-nowrap',
    },
    ...HEADERS({ t, pct, currYear, lastYear }).map(({ key, name, subHeaders = [] }) => ({
      id: name,
      Header: () => <div className="border-b border-divider py-3">{name}</div>,
      ...(subHeaders && {
        columns: subHeaders.map(({ key: _key, name: _name, renderer = statisticsFormatter(0) }) => ({
          Header: _name,
          accessor: [key, _key].join('.'),
          Cell: renderer,
          className: 'text-right',
        })),
      }),
    })),
  ]);

export default function UnitElectricityTable({ business, y, m, s, p, pt, missingPlants }) {
  const { t } = useTranslation(['unitElectricityPage', 'common']);
  const plantPermission = usePlantPermission();
  const { data } = useGetUnitElectricityQuery({
    business,
    year: y,
    month: m,
    site: s,
    plant: p,
    permission: plantPermission,
    ...(pt && {
      is_ytm: pt === APP_CONSTANTS.PERIOD_TYPES.YTM,
    }),
  });

  const { label, pct, currYear, baseYear } = useGoal({ keyword: '單台用電' });
  const columns = useMemo(
    () => COLUMNS({ t, pct, currYear, lastYear: baseYear, missing: missingPlants }),
    [pct, currYear, baseYear, t, missingPlants]
  );

  return (
    <>
      <DualTag
        className="absolute top-2 right-4"
        labels={[
          <div className="flex items-center">
            <GlobalDateSelect />
          </div>,
          label,
        ]}
      />
      {data && (
        <>
          <div className="h-6 w-full text-right">{t('common:gapDesc')}</div>
          <div className="flex w-full flex-col overflow-auto rounded-t-lg shadow">
            <FixedTable
              columns={columns}
              data={data?.data || []}
              getRowProps={getHidePlantRowProps}
              autoResetExpanded={false}
            />
          </div>
        </>
      )}
    </>
  );
}

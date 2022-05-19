import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import useGoal from '../../hooks/useGoal';
import usePlantPermission from '../../hooks/usePlantPermission';
import { useGetRenewableEnergyQuery } from '../../services/renewableEnergy';
import { ratioFormatter, statisticsFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, getHidePlantRowProps, noDataRenderer } from '../../utils/table';

const HEADERS = ({ t, pct } = {}) => [
  {
    key: 'electricity',
    name: t('renewableEnergyPage:table.electricity.header'),
    subHeaders: [
      { key: 'total', name: t('renewableEnergyPage:table.electricity.total') },
      { key: 'sun', name: t('renewableEnergyPage:table.electricity.sun') },
      { key: 'tRec', name: t('renewableEnergyPage:table.electricity.tRec') },
    ],
  },
  {
    key: 'ratio',
    name: (
      <>
        <div className="text-right">{t('renewableEnergyPage:table.ratio.header')}</div>
        <div className="text-right">( (b+c) / a )</div>
      </>
    ),
    renderer: targetFormatter(-pct, { formatter: ratioFormatter, reverse: true }),
    rowSpan: 0,
  },
  {
    key: 'tRecTarget',
    name: (
      <>
        <div className="text-right">{t('renewableEnergyPage:table.tRec.header')}</div>
        <div className="text-right">{`( a*${ratioFormatter(pct)} - b )`}</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'roofRestArea',
    name: t('renewableEnergyPage:table.roof.area'),
    rowSpan: 0,
  },
  {
    key: 'roofStructure',
    name: t('renewableEnergyPage:table.roof.structure'),
    rowSpan: 0,
  },
];

const COLUMNS = ({ t, pct, missing } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
      Cell: noDataRenderer({ missing }),
      className: 'whitespace-nowrap',
    },
    ...HEADERS({ t, pct }).map(({ key, name, subHeaders, renderer = statisticsFormatter(0), ...rest }) => ({
      Header: name,
      Cell: renderer,
      ...(subHeaders && {
        id: name,
        Header: () => <div className="border-b border-divider py-3">{name}</div>,
        columns: subHeaders.map(({ key: _key, name: _name, _renderer = statisticsFormatter(0) }) => ({
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

export default function RenewableEnergyTable({ business, y, m, s, p, pt, missingPlants }) {
  const { t } = useTranslation(['renewableEnergyPage', 'common']);
  const plantPermission = usePlantPermission();
  const { data } = useGetRenewableEnergyQuery({
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

  const { label, pct } = useGoal({ keyword: '可再生能源' });
  const columns = useMemo(() => COLUMNS({ t, pct, missing: missingPlants }), [pct, t, missingPlants]);
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
          <div className="h-6 w-full text-right">{t('renewableEnergyPage:ratioDesc')}</div>
          <div className="flex w-full flex-col overflow-auto rounded-t-lg shadow">
            <Table
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

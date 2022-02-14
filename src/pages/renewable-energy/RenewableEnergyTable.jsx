import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectMissingPlants } from '../../app/appSlice';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import useGoal from '../../hooks/useGoal';
import { useGetRenewableEnergyQuery } from '../../services/renewableEnergy';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
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
    },
    ...HEADERS({ t, pct }).map(({ key, name, subHeaders, renderer = baseFormatter, ...rest }) => ({
      Header: name,
      Cell: renderer,
      ...(subHeaders && {
        id: name,
        Header: () => <div className="border-b border-divider py-3">{name}</div>,
        columns: subHeaders.map(({ key: _key, name: _name, _renderer = baseFormatter }) => ({
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

export default function RenewableEnergyTable({ business, y, m }) {
  const { t } = useTranslation(['renewableEnergyPage', 'common']);
  const { data } = useGetRenewableEnergyQuery({ business, year: y, month: m });
  const missingPlants = useSelector(selectMissingPlants);
  const { label, pct } = useGoal({ keyword: '可再生能源' });
  const columns = useMemo(() => COLUMNS({ t, pct, missing: missingPlants }), [pct, t, missingPlants]);
  return (
    <>
      <DualTag
        className="absolute top-2 right-4"
        labels={[
          <div className="flex items-center">
            {`${t('common:accumulationRange')} : `}
            <GlobalDateSelect />
          </div>,
          label,
        ]}
      />
      {data && (
        <>
          <div className="w-full h-6 text-right">{t('renewableEnergyPage:ratioDesc')}</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
            <Table columns={columns} data={data?.data || []} getRowProps={getHidePlantRowProps} />
          </div>
        </>
      )}
    </>
  );
}

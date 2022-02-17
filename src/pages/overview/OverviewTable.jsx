import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import APP_CONSTANTS from '../../app/appConstants';
import { selectCurrY, selectLastY, selectMissingPlants } from '../../app/appSlice';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import { useGetOverviewQuery } from '../../services/overview';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, getHidePlantRowProps, noDataRenderer } from '../../utils/table';

export const HEADERS = [
  { key: 'electricity' },
  { key: 'water' },
  { key: 'revenue', renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
  { key: 'asp', renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
];

export const COLUMNS = ({
  t,
  missing,
  currYear = APP_CONSTANTS.CURRENT_YEAR,
  lastYear = APP_CONSTANTS.LAST_YEAR,
} = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
      Cell: noDataRenderer({ missing }),
    },
    ...HEADERS.map(({ key, renderer = baseFormatter }) => ({
      id: key,
      Header: () => <div className="border-b border-divider py-3">{t(`overviewPage:table.${key}`)}</div>,
      columns: [
        {
          Header: lastYear,
          accessor: [key, 'lastYear'].join('.'),
          Cell: renderer,
          className: 'text-right',
        },
        {
          Header: currYear,
          accessor: [key, 'currYear'].join('.'),
          Cell: renderer,
          className: 'text-right',
        },
        {
          Header: t('common:weight'),
          accessor: [key, 'weight'].join('.'),
          Cell: ratioFormatter,
          className: 'text-right',
        },
        {
          Header: t('common:gap'),
          accessor: [key, 'delta'].join('.'),
          Cell: targetFormatter(0, { formatter: ratioFormatter }),
          className: 'text-right',
        },
      ],
    })),
  ]);

export default function OverviewTable({ business, y, m, s, p }) {
  const { t } = useTranslation(['overviewPage', 'common']);
  const { data } = useGetOverviewQuery({ business, year: y, month: m, site: s, plant: p });
  const missingPlants = useSelector(selectMissingPlants);
  const currYear = useSelector(selectCurrY);
  const lastYear = useSelector(selectLastY);
  const columns = useMemo(
    () => COLUMNS({ t, currYear, lastYear, missing: missingPlants }),
    [t, currYear, lastYear, missingPlants]
  );

  return (
    <>
      <Tag className="absolute top-2 right-4 pr-0">
        {t('common:accumulationRange')} : <GlobalDateSelect />
      </Tag>
      {data && (
        <>
          <div className="w-full h-6 text-right">{t('common:gapDesc')}</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
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

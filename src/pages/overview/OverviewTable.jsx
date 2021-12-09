import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import APP_CONFIG from '../../constants/app-config';
import { useGetOverviewQuery } from '../../services/overview';
import { formatMonthRange } from '../../utils/date';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, noDataRenderer } from '../../utils/table';

export const HEADERS = [
  { key: 'electricity' },
  { key: 'water' },
  { key: 'revenue', renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
  { key: 'asp', renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
];

export const COLUMNS = ({ t, currYear = APP_CONFIG.CURRENT_YEAR, lastYear = APP_CONFIG.LAST_YEAR } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
      Cell: noDataRenderer,
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

export default function OverviewTable({ business }) {
  const { t } = useTranslation(['overviewPage', 'common']);
  const { data } = useGetOverviewQuery({ business });
  const columns = useMemo(() => COLUMNS({ t }), [t]);
  return (
    <>
      <Tag className="absolute top-2 right-4">
        {t('common:accumulationRange')} : <span className="text-lg font-medium">{formatMonthRange(data?.maxDate)}</span>
      </Tag>
      {data && (
        <>
          <div className="w-full h-6 text-right">{t('common:gapDesc')}</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
            <Table columns={columns} data={data?.data || []} />
          </div>
        </>
      )}
    </>
  );
}

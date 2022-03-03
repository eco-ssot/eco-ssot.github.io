import { useMemo, useState } from 'react';

import { UploadIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import APP_CONSTANTS from '../../app/appConstants';
import { selectCurrY, selectLastY } from '../../app/appSlice';
import IconButton from '../../components/button/IconButton';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Table from '../../components/table/Table';
import Tag from '../../components/tag/Tag';
import UploadModal from '../../components/upload-modal/UploadModal';
import { useGetOverviewQuery, useUploadShipmentExcelMutation } from '../../services/overview';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, getHidePlantRowProps, noDataRenderer } from '../../utils/table';

export const MANUAL_UPLOAD_PLANTS = ['WIH', 'WZS-1'];

export const HEADERS = [
  { key: 'electricity' },
  { key: 'water' },
  { key: 'revenue', renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
  { key: 'asp', renderer: (cell) => baseFormatter(cell, { precision: 1 }) },
];

export const COLUMNS = ({
  t,
  missing,
  setOpen,
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
          className: key === 'revenue' ? 'text-center' : 'text-right',
          Cell: targetFormatter(0, { formatter: ratioFormatter }),
          ...(key === 'revenue' && {
            Cell: (cell) => {
              return (
                <div className="flex justify-end items-center space-x-2">
                  <div>{targetFormatter(0, { formatter: ratioFormatter })(cell)}</div>
                  <IconButton
                    className={clsx(
                      'bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600',
                      (!MANUAL_UPLOAD_PLANTS.includes(cell.row.original.site) || window.location.hash === '#HISTORY') &&
                        'invisible'
                    )}
                    onClick={() => setOpen(true)}>
                    <UploadIcon className="w-5 h-5" />
                  </IconButton>
                </div>
              );
            },
          }),
        },
      ],
    })),
  ]);

export default function OverviewTable({ business, y, m, s, p, missingPlants }) {
  const { t } = useTranslation(['overviewPage', 'common']);
  const { data } = useGetOverviewQuery({ business, year: y, month: m, site: s, plant: p });
  const currYear = useSelector(selectCurrY);
  const lastYear = useSelector(selectLastY);
  const [open, setOpen] = useState(false);
  const [uploadExcel, { isSuccess }] = useUploadShipmentExcelMutation();
  const columns = useMemo(
    () => COLUMNS({ t, setOpen, currYear, lastYear, missing: missingPlants }),
    [t, currYear, lastYear, missingPlants]
  );

  return (
    <>
      <UploadModal title="匯入營收資料" open={open} setOpen={setOpen} uploadExcel={uploadExcel} isSuccess={isSuccess} />
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

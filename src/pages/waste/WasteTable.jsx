import { useEffect, useMemo, useRef, useState } from 'react';

import { UploadIcon } from '@heroicons/react/outline';
import { get, isNil } from 'lodash';
import qs from 'query-string';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectMissingPlants } from '../../app/appSlice';
import Button from '../../components/button/Button';
import IconButton from '../../components/button/IconButton';
import Dot from '../../components/dot/Dot';
import FileInput from '../../components/input/FileInput';
import Modal from '../../components/modal/Modal';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import APP_CONFIG from '../../constants/app-config';
import useGoal from '../../hooks/useGoal';
import { useGetWasteQuery, useUploadWasteExcelMutation } from '../../services/waste';
import { formatMonthRange } from '../../utils/date';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, getHidePlantRowProps, noDataRenderer } from '../../utils/table';

const HEADERS = ({
  t,
  business,
  pct,
  maxDate,
  currYear,
  baseYear = APP_CONFIG.BASE_YEAR_WASTE,
  setOpen = () => {},
} = {}) => [
  {
    key: 'nonRecyclable',
    name: t('wastePage:table.nonRecyclable.header'),
    subHeaders: [
      {
        key: 'normal',
        name: t('wastePage:table.nonRecyclable.normal'),
      },
      { key: 'harmful', name: t('wastePage:table.nonRecyclable.harmful') },
    ],
  },
  {
    key: 'recyclable',
    name: t('wastePage:table.recyclable.header'),
    subHeaders: [
      {
        key: 'normal',
        name: t('wastePage:table.recyclable.normal'),
      },
      {
        key: 'waste',
        name: t('wastePage:table.recyclable.waste'),
      },
    ],
  },
  {
    key: 'total',
    name: (
      <>
        <div className="text-right">Total</div>
        <div className="text-right">({t('common:metricTon')})</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'revenue',
    name: (
      <>
        <div className="text-right">{t('wastePage:table.revenue.header', { ytm: formatMonthRange(maxDate) })}</div>
        <div className="text-right">({t('common:billionNtd')})</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'waste',
    name: t('wastePage:table.waste.header'),
    subHeaders: [
      { key: 'currYear', name: formatMonthRange(maxDate) },
      { key: 'baseYear', name: baseYear },
      {
        key: 'delta',
        name: t('wastePage:table.waste.delta', { baseYear, currYear }),
        renderer: (cell) => {
          if (cell.row.original.subRows.length > 0) {
            const canExpand = cell.row.original.subRows.some((row) => {
              const val = get(row, cell.column.id);
              return isFinite(val) && val > -pct;
            });

            if (canExpand) {
              return (
                <div className="cursor-pointer" onClick={() => cell.row.toggleRowExpanded()}>
                  {targetFormatter(-pct, { formatter: ratioFormatter, precision: 2, className: 'underline' })(cell)}
                </div>
              );
            }
          }

          if (
            !cell.row.original.isFooter &&
            cell.row.original.subRows.length === 0 &&
            isFinite(cell.value) &&
            cell.value > -pct
          ) {
            let query = { business, site: cell.row.original.site };
            if (cell.row.depth > 0) {
              query = {
                ...query,
                site: cell.rowsById[cell.row.id.split('.')[0]].original.site,
                plant: cell.row.original.site,
              };
            }

            const search = qs.stringify(query);
            return (
              <Link className="flex items-center justify-end space-x-2" to={`/waste/analysis?${search}`}>
                <Dot />
                {targetFormatter(-pct, { formatter: ratioFormatter, precision: 2, className: 'underline' })(cell)}
              </Link>
            );
          }

          return targetFormatter(-pct, { formatter: ratioFormatter, precision: 2 })(cell);
        },
      },
    ],
  },
  {
    key: 'recycleRate',
    name: <div className="text-center">{t('wastePage:table.recycleRate')}</div>,
    renderer: (cell) => {
      const value = ratioFormatter(cell, { precision: 2 });
      if (cell.row.canExpand) {
        return (
          <div className="relative ">
            {value}
            <IconButton
              className="absolute ml-2 p-1 bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600"
              onClick={() => setOpen(true)}>
              <UploadIcon className="w-5 h-5" />
            </IconButton>
          </div>
        );
      }

      return value;
    },
    rowSpan: 0,
    className: 'text-center',
  },
];

const COLUMNS = ({
  t,
  business,
  pct,
  maxDate,
  currYear,
  missing,
  baseYear = APP_CONFIG.BASE_YEAR_WASTE,
  setOpen = () => {},
} = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
      Cell: noDataRenderer({ missing }),
    },
    ...HEADERS({ t, business, pct, maxDate, currYear, baseYear, setOpen }).map(
      ({ key, name, subHeaders, renderer = (cell) => baseFormatter(cell, { precision: 2 }), ...rest }) => ({
        Header: name,
        Cell: renderer,
        ...(subHeaders && {
          id: name,
          Header: () => <div className="border-b border-divider py-3">{name}</div>,
          columns: subHeaders.map(
            ({ key: _key, name: _name, renderer: _renderer = (cell) => baseFormatter(cell, { precision: 2 }) }) => ({
              Header: _name,
              accessor: [key, _key].join('.'),
              Cell: _renderer,
              className: 'text-right',
            })
          ),
        }),
        ...(!subHeaders && { accessor: key, className: 'text-right' }),
        ...rest,
      })
    ),
  ]);

export function UploadModal({ open, setOpen, uploadExcel, isSuccess }) {
  const { t } = useTranslation(['wastePage', 'component']);
  const [name, setName] = useState('');
  const fileRef = useRef();
  useEffect(() => !open && setName(''), [open]);
  useEffect(() => {
    if (!!isSuccess) {
      toast.success(t('component:toast.uploadSuccess'));
      fileRef.current = null;
      setOpen(false);
    }
  }, [isSuccess, setOpen, t]);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={t('wastePage:upload.uploadWaste')}
      footer={
        <Button
          className="mb-8"
          onClick={() => {
            if (isNil(fileRef.current)) {
              return;
            }

            const formData = new FormData();
            formData.append('file', fileRef.current);
            uploadExcel(formData);
          }}>
          <UploadIcon className="w-5 h-5 mr-2" />
          Import
        </Button>
      }>
      <form className="p-8 flex flex-col items-start space-y-4">
        <div>{t('wastePage:upload.selectExcel')}</div>
        <div className="flex items-center space-x-4 w-full">
          <FileInput
            id="excel"
            type="file"
            value={name}
            onChange={(e) => {
              const file = Array.from(e.target.files)[0];
              fileRef.current = file;
              setName(e.target.value);
            }}
            accept=".xlsx,xls"
          />
          <label htmlFor="excel" className="underline cursor-pointer">
            Browse
          </label>
        </div>
      </form>
    </Modal>
  );
}

export default function WasteTable({ business, y, m }) {
  const { t } = useTranslation(['wastePage', 'common']);
  const { data } = useGetWasteQuery({ business, year: y, month: m });
  const missingPlants = useSelector(selectMissingPlants);
  const { label, pct, baseYear, currYear } = useGoal({ keyword: '廢棄物密度' });
  const [uploadExcel, { isSuccess }] = useUploadWasteExcelMutation();
  const [open, setOpen] = useState(false);
  const columns = useMemo(
    () =>
      COLUMNS({
        t,
        business,
        pct,
        currYear,
        setOpen,
        lastYear: baseYear,
        maxDate: data?.maxDate,
        missing: missingPlants,
      }),
    [business, pct, currYear, baseYear, data?.maxDate, t, missingPlants]
  );

  return (
    <>
      <UploadModal open={open} setOpen={setOpen} uploadExcel={uploadExcel} isSuccess={isSuccess} />
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
          <div className="w-full h-6 text-right">{t('wastePage:desc')}</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
            <Table columns={columns} data={data?.data || []} getRowProps={getHidePlantRowProps} />
          </div>
        </>
      )}
    </>
  );
}

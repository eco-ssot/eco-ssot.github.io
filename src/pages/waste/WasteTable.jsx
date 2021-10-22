import { useEffect, useMemo, useRef, useState } from 'react';

import { UploadIcon } from '@heroicons/react/outline';
import { get } from 'lodash';
import qs from 'query-string';
import { Link } from 'react-router-dom';

import Button from '../../components/button/Button';
import IconButton from '../../components/button/IconButton';
import Dot from '../../components/dot/Dot';
import FileInput from '../../components/input/FileInput';
import Modal from '../../components/modal/Modal';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import APP_CONFIG from '../../constants/app-config';
import useGoal from '../../hooks/useGoal';
import { useGetWasteQuery } from '../../services/waste';
import { formatMonthRange } from '../../utils/date';
import { baseFormatter, ratioFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

const HEADERS = ({ business, pct, maxDate, baseYear = APP_CONFIG.BASE_YEAR_WASTE, setOpen = () => {} } = {}) => [
  {
    key: 'nonRecyclable',
    name: '不可回收類重量 (公噸)',
    subHeaders: [
      {
        key: 'normal',
        name: '一般廢棄物 (焚化 & 掩埋)',
      },
      { key: 'harmful', name: '有害廢棄物' },
    ],
  },
  {
    key: 'recyclable',
    name: '可回收類重量 (公噸)',
    subHeaders: [
      {
        key: 'normal',
        name: '一般廢棄物 (其他/廚餘)',
      },
      {
        key: 'waste',
        name: '資源廢棄物 (堆肥 & 資源回收)',
      },
    ],
  },
  {
    key: 'total',
    name: (
      <>
        <div className="text-right">Total</div>
        <div className="text-right">(公噸)</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'revenue',
    name: (
      <>
        <div className="text-right">{`${formatMonthRange(maxDate)}月營收`}</div>
        <div className="text-right">(十億台幣)</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'waste',
    name: '廢棄物產生密度 (公噸/十億台幣)',
    subHeaders: [
      { key: 'currYear', name: `${formatMonthRange(maxDate)}月` },
      { key: 'baseYear', name: `${baseYear}年` },
      {
        key: 'delta',
        name: '增減率 *',
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
    name: <div className="text-center">廢棄物回收率</div>,
    renderer: (cell) => {
      const value = ratioFormatter(cell, { precision: 2 });
      if (cell.row.original.subRows.length > 0) {
        return (
          <div className="relative ">
            {value}
            <IconButton
              className="hidden absolute ml-2 p-1 bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600"
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

const COLUMNS = ({ business, pct, maxDate, baseYear = APP_CONFIG.BASE_YEAR_WASTE, setOpen = () => {} } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
    },
    ...HEADERS({ business, pct, maxDate, baseYear, setOpen }).map(
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

export function UploadModal({ open, setOpen }) {
  const [name, setName] = useState('');
  const fileRef = useRef();
  useEffect(() => !open && setName(''), [open]);
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="匯入廢棄物資料"
      footer={
        <Button className="mb-8" onClick={() => setOpen(false)}>
          <UploadIcon className="w-5 h-5 mr-2" />
          Import
        </Button>
      }>
      <form className="p-8 flex flex-col items-start space-y-4">
        <div>請選擇欲匯入之Excel檔</div>
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

export default function WasteTable({ business }) {
  const { data } = useGetWasteQuery({ business });
  const { label, pct, baseYear } = useGoal({ keyword: '廢棄物密度' });
  const [open, setOpen] = useState(false);
  const columns = useMemo(
    () => COLUMNS({ business, pct, lastYear: baseYear, maxDate: data?.maxDate, setOpen }),
    [business, pct, baseYear, data?.maxDate]
  );

  return (
    <>
      <UploadModal open={open} setOpen={setOpen} />
      <DualTag
        className="absolute top-2 right-4"
        labels={[
          <>
            累計區間：<span className="text-lg font-medium">{formatMonthRange(data?.maxDate)}</span>
          </>,
          label,
        ]}
      />
      {data && (
        <>
          <div className="w-full h-6 text-right">* 增減率 = (當年度 − 上年度) / 上年度</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
            <Table columns={columns} data={data?.data || []} />
          </div>
        </>
      )}
    </>
  );
}

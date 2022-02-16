import { useEffect, useState, useMemo } from 'react';

import { PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { partition } from 'lodash';
import { useTranslation } from 'react-i18next';

import EditableTable, { EditableButton, EditableIconButton } from '../../components/table/EditableTable';
import { usePatchTrecBySiteMutation, usePatchTrecMutation, usePostTrecMutation } from '../../services/app';
import { baseFormatter } from '../../utils/formatter';
import { trimNumber } from '../../utils/number';
import { updateMyData } from '../../utils/table';

const COLUMNS = ({ t, setData, year, canEdit, data = [] }) => [
  {
    Header: t('managementPage:tRec.table.buyDate'),
    accessor: 'date_at',
    rowSpan: data.length || 1,
    className: 'w-[15%] text-center',
    editable: true,
  },
  {
    Header: t('managementPage:tRec.table.unit'),
    accessor: 'total_amount',
    rowSpan: data.length || 1,
    className: 'w-[15%] text-center',
    formatter: baseFormatter,
  },
  {
    Header: t('managementPage:tRec.table.buyArea'),
    accessor: 'region',
    className: 'w-[15%] text-center py-2',
    editable: true,
    placeholder: '地區',
  },
  {
    Header: t('managementPage:tRec.table.buyUnit'),
    accessor: 'buy_amount',
    className: 'w-[15%] text-center',
    editable: true,
    placeholder: '度數',
    formatter: baseFormatter,
  },
  {
    Header: t('managementPage:tRec.table.price'),
    accessor: 'price',
    className: 'w-[15%] text-center',
    editable: true,
    placeholder: '價格',
    formatter: baseFormatter,
  },
  {
    Header: t('managementPage:tRec.table.currency'),
    accessor: 'currency',
    className: 'w-[15%] text-center',
    editable: true,
    placeholder: '幣別',
  },
  {
    Header: t('common:edit'),
    id: 'action',
    className: 'w-[10%] text-center',
    rowSpan: data.length || 1,
    Cell: (cell) => {
      const [patchTrec] = usePatchTrecMutation();
      const [postTrec] = usePostTrecMutation();
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() => {
            const rows = cell.rows.map((row) => row.original).filter((row) => row.id !== 'addRow');
            const [oldRows, newRows] = partition(rows, ({ id }) => id);
            oldRows
              .filter(({ modified }) => modified)
              .forEach(({ id, buy_amount, price, ...rest }) =>
                patchTrec({
                  year,
                  id,
                  data: { ...rest, buy_amount: trimNumber(buy_amount), price: trimNumber(price) },
                })
              );

            newRows.forEach((row) => postTrec({ year, data: { date_at: rows[0]?.date_at, ...row } }));
            setData((prev) => prev.map((r) => ({ ...r, editing: false })).filter(({ id }) => id !== 'addRow'));
          }}>
          {t('component:button.save')}
        </EditableButton>
      ) : (
        <EditableIconButton
          onClick={() =>
            setData((prev) =>
              prev
                .map((r) => ({ ...r, editing: true }))
                .filter(({ id }) => id !== 'addRow')
                .concat({ id: 'addRow', colSpan: 4, startIndex: 2 })
            )
          }
          disabled={!canEdit}>
          <PencilIcon className="w-5 h-5" />
        </EditableIconButton>
      );
    },
  },
];

const COLUMNS_BY_SITE = ({ setData, canEdit, year }) => [
  {
    Header: 'Site',
    accessor: 'site',
    className: 'text-center w-1/3 py-3',
  },
  {
    Header: (header) => {
      const isEditing = header.data.some(({ editing }) => editing);
      const [patchTrec] = usePatchTrecBySiteMutation();
      return (
        <div className="flex space-x-2 justify-end items-center">
          <div>綠證</div>
          {isEditing ? (
            <EditableButton
              onClick={() => {
                const rows = header.rows.map((row) => row.original).filter((row) => row.modified);
                rows.forEach(({ site, amount }) => patchTrec({ year, site, data: { amount: trimNumber(amount) } }));
                setData((prev) => prev.map((d) => ({ ...d, editing: false })));
              }}>
              儲存
            </EditableButton>
          ) : (
            <EditableIconButton
              onClick={() => setData((prev) => prev.map((d) => ({ ...d, editing: true })))}
              disabled={!canEdit}>
              <PencilIcon className="w-5 h-5" />
            </EditableIconButton>
          )}
        </div>
      );
    },
    accessor: 'amount',
    className: 'text-right pr-4 py-2',
    editable: true,
    formatter: baseFormatter,
    editableComponentProps: { className: 'text-right', wrapperClassName: 'translate-x-3' },
  },
];

export default function Trec({ className, canEdit, data, dataBySite, year }) {
  const { t } = useTranslation(['managementPage', 'common', 'component']);
  const [_data, setData] = useState(data);
  const [_dataBySite, setDataBySite] = useState(dataBySite);
  const columns = useMemo(() => COLUMNS({ t, setData, canEdit, year, data: _data }), [t, _data, canEdit, year]);
  const columnsBySite = useMemo(() => COLUMNS_BY_SITE({ canEdit, year, setData: setDataBySite }), [canEdit, year]);
  useEffect(() => data && setData(data), [data]);
  useEffect(() => dataBySite && setDataBySite(dataBySite), [dataBySite]);
  return (
    <div className="grid grid-cols-4 gap-4 h-full overflow-auto">
      <div className={clsx('col-span-3 flex flex-col shadow overflow-auto rounded-t-lg', className)}>
        <EditableTable columns={columns} data={_data || []} updateMyData={updateMyData(setData)} setData={setData} />
      </div>
      <div className={clsx('col-span-1 flex flex-col shadow overflow-auto rounded-t-lg', className)}>
        <EditableTable
          columns={columnsBySite}
          data={_dataBySite || []}
          updateMyData={updateMyData(setDataBySite)}
          setData={setDataBySite}
          getHeaderProps={() => ({ className: '!py-0 h-[3.25rem]' })}
        />
      </div>
    </div>
  );
}

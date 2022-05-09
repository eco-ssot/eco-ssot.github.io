import { useEffect, useState, useMemo, useRef } from 'react';

import { TrashIcon } from '@heroicons/react/outline';
import { PencilIcon, XIcon, CheckIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { format } from 'date-fns';
import { partition } from 'lodash';
import { useTranslation } from 'react-i18next';

import EditableTable, { EditableIconButton } from '../../components/table/EditableTable';
import {
  useDeleteTrecBySiteMutation,
  useDeleteTrecMutation,
  usePatchTrecMutation,
  usePostTrecBySiteMutation,
  usePostTrecMutation,
} from '../../services/management';
import { baseFormatter } from '../../utils/formatter';
import { trimNumber } from '../../utils/number';
import { updateMyData } from '../../utils/table';

const COLUMNS = ({ t, setData, year, canEdit, data, dataRef, deleteRef }) => [
  {
    Header: t('managementPage:tRec.table.buyDate'),
    accessor: 'date_at',
    rowSpan: data?.length || 1,
    className: 'w-[15%] text-center',
    editable: true,
  },
  {
    Header: t('managementPage:tRec.table.unit'),
    accessor: 'total_amount',
    rowSpan: data?.length || 1,
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
    Header: (header) => {
      const isEditing = header.data.some(({ editing, id }) => editing || id === 'addRow');
      const [patchTrec] = usePatchTrecMutation();
      const [postTrec] = usePostTrecMutation();
      const [deleteTrec] = useDeleteTrecMutation();
      return (
        <div className="flex items-center justify-end space-x-2">
          {isEditing ? (
            <div className="flex space-x-2">
              <EditableIconButton
                onClick={() => {
                  const rows = header.rows.map((row) => row.original).filter((row) => row.id !== 'addRow');
                  const [oldRows, newRows] = partition(rows, ({ id }) => id);
                  deleteRef.current.forEach((id) => id && deleteTrec({ year, id }));
                  deleteRef.current = [];
                  oldRows
                    .filter(({ modified }) => modified)
                    .forEach(({ id, buy_amount, price, ...rest }) =>
                      patchTrec({
                        year,
                        id,
                        data: { buy_amount: trimNumber(buy_amount), price: trimNumber(price), ...rest },
                      })
                    );

                  newRows.forEach(({ buy_amount, price, ...rest }) =>
                    postTrec({
                      year,
                      data: {
                        date_at: rows[0]?.date_at || format(new Date().setFullYear(year - 1), 'yyyy-MM-dd'),
                        buy_amount: trimNumber(buy_amount),
                        price: trimNumber(price),
                        ...rest,
                      },
                    })
                  );

                  setData((prev) => prev.map((r) => ({ ...r, editing: false })).filter(({ id }) => id !== 'addRow'));
                }}>
                <CheckIcon className="h-5 w-5" />
              </EditableIconButton>
              <EditableIconButton
                onClick={() => {
                  deleteRef.current = [];
                  setData(dataRef.current);
                }}>
                <XIcon className="h-5 w-5" />
              </EditableIconButton>
            </div>
          ) : (
            <EditableIconButton
              onClick={() =>
                setData((prev) =>
                  prev
                    .map((r) => ({ ...r, editing: true }))
                    .filter(({ id }) => id !== 'addRow')
                    .concat({ id: 'addRow', colSpan: 5, startIndex: 2 })
                )
              }
              disabled={!canEdit}>
              <PencilIcon className="h-5 w-5" />
            </EditableIconButton>
          )}
        </div>
      );
    },
    id: 'action',
    className: 'text-right pr-4',
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableIconButton
          onClick={() => {
            deleteRef.current = [...deleteRef.current, cell.row.original.id];
            setData((prev) => prev.filter((d, i) => i !== cell.row.index));
          }}>
          <TrashIcon className="h-5 w-5" />
        </EditableIconButton>
      ) : null;
    },
  },
];

const COLUMNS_BY_SITE = ({ t, setData, canEdit, year, dataRef, deleteRef }) => [
  {
    Header: '',
    id: 'delete',
    className: 'text-center py-2',
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <TrashIcon
          className="h-5 w-5 cursor-pointer"
          onClick={() => {
            deleteRef.current = [...deleteRef.current, cell.row.original.plant];
            setData((prev) => prev.filter((d, i) => i !== cell.row.index));
          }}
        />
      ) : null;
    },
  },
  {
    Header: 'Plant',
    accessor: 'plant',
    className: 'text-center whitespace-nowrap',
    editable: true,
    editableComponentProps: { className: 'text-center' },
  },
  {
    Header: (header) => {
      const isEditing = header.data.some(({ editing, id }) => editing || id === 'addRow');
      const [postTrec] = usePostTrecBySiteMutation();
      const [deleteTrec] = useDeleteTrecBySiteMutation();
      return (
        <div className="flex items-center justify-end space-x-2">
          <div>{t('managementPage:tRec.table.tRec')}</div>
          {isEditing ? (
            <div className="flex space-x-2">
              <EditableIconButton
                onClick={() => {
                  const rows = header.rows.map((row) => row.original).filter((row) => row.id !== 'addRow');
                  const [oldRows, newRows] = partition(rows, ({ id }) => id);
                  deleteRef.current.forEach((plant) => plant && deleteTrec({ year, plant }));
                  deleteRef.current = [];
                  oldRows
                    .filter(({ modified }) => modified)
                    .forEach(({ id, plant, amount }) =>
                      deleteTrec({ year, plant: id }).then(() =>
                        postTrec({ year, data: { plant, amount: trimNumber(amount) } })
                      )
                    );

                  newRows.forEach(({ plant, amount }) =>
                    postTrec({ year, data: { plant, amount: trimNumber(amount) } })
                  );

                  setData((prev) => prev.map((r) => ({ ...r, editing: false })).filter(({ id }) => id !== 'addRow'));
                }}>
                <CheckIcon className="h-5 w-5" />
              </EditableIconButton>
              <EditableIconButton
                onClick={() => {
                  deleteRef.current = [];
                  setData(dataRef.current);
                }}>
                <XIcon className="h-5 w-5" />
              </EditableIconButton>
            </div>
          ) : (
            <EditableIconButton
              onClick={() =>
                setData((prev) =>
                  prev
                    .map((r) => ({ ...r, editing: true }))
                    .filter(({ id }) => id !== 'addRow')
                    .concat({ id: 'addRow', colSpan: 3, startIndex: 0 })
                )
              }
              disabled={!canEdit}>
              <PencilIcon className="h-5 w-5" />
            </EditableIconButton>
          )}
        </div>
      );
    },
    accessor: 'amount',
    className: 'text-right py-2 pr-4',
    editable: true,
    formatter: baseFormatter,
    editableComponentProps: { className: 'text-right' },
  },
];

export default function Trec({ className, canEdit, data, dataBySite, year }) {
  const { t } = useTranslation(['managementPage', 'common', 'component']);
  const [_data, setData] = useState(data);
  const [_dataBySite, setDataBySite] = useState(dataBySite);
  const dataRef = useRef([]);
  const dataBySiteRef = useRef([]);
  const deleteRef = useRef([]);
  const deleteBySiteRef = useRef([]);
  const columns = useMemo(
    () => COLUMNS({ t, setData, canEdit, year, dataRef, deleteRef, data: _data }),
    [t, _data, canEdit, year]
  );

  const columnsBySite = useMemo(
    () =>
      COLUMNS_BY_SITE({ t, canEdit, year, dataRef: dataBySiteRef, deleteRef: deleteBySiteRef, setData: setDataBySite }),
    [t, canEdit, year]
  );

  useEffect(() => {
    if (data) {
      setData(data);
      dataRef.current = data;
      deleteRef.current = [];
    }
  }, [data]);

  useEffect(() => {
    if (dataBySite) {
      setDataBySite(dataBySite);
      dataBySiteRef.current = dataBySite;
      deleteBySiteRef.current = [];
    }
  }, [dataBySite]);
  return (
    <div className="grid h-full grid-cols-7 gap-4 overflow-auto">
      <div className={clsx('col-span-5 flex flex-col overflow-auto rounded-t-lg shadow', className)}>
        <EditableTable columns={columns} data={_data || []} updateMyData={updateMyData(setData)} setData={setData} />
      </div>
      <div className={clsx('col-span-2 flex flex-col overflow-auto rounded-t-lg shadow', className)}>
        <EditableTable
          columns={columnsBySite}
          data={_dataBySite || []}
          updateMyData={updateMyData(setDataBySite)}
          setData={setDataBySite}
        />
      </div>
    </div>
  );
}

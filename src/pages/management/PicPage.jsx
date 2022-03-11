import { useState, useEffect } from 'react';

import { PencilIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';

import EditableTable, {
  AdSearchSelectCell,
  EditableButton,
  EditableIconButton,
} from '../../components/table/EditableTable';
import usePlantPermission from '../../hooks/usePlantPermission';
import { useGetDataStatusPicQuery, usePatchDataStatusPicMutation } from '../../services/management';
import { updateMyData } from '../../utils/table';

const COLUMNS = ({ t, canEdit, userOptions, setData, patchDataStatusPic }) => [
  { Header: 'Plant', accessor: 'plant', rowSpan: 0, className: 'w-[10%] text-center py-3' },
  {
    id: 'opm',
    Header: () => (
      <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
        <div className="px-2">營收 & 出貨 (WT)</div>
        <div className="px-2 text-gray-400 text-sm">{t('managementPage:pic.table.manualSync')}</div>
      </div>
    ),
    columns: [
      {
        Header: 'PIC',
        accessor: 'OPMPIC',
        className: 'w-1/5 text-center',
        Cell: (cell) =>
          cell.row.original.editing ? (
            <AdSearchSelectCell
              isClearable={true}
              options={userOptions}
              defaultValue={{ value: cell.row.original.OPMPIC, label: cell.row.original.OPMPIC }}
              onBlur={(e) =>
                setData((prev) => prev.map((d, i) => (cell.row.index === i ? { ...d, OPMPIC: e?.label || null } : d)))
              }
            />
          ) : (
            cell.row.original.OPMPIC
          ),
      },
      {
        Header: t('managementPage:pic.table.remark'),
        accessor: 'OPMNote',
        className: 'w-1/5 text-center',
        editable: true,
        editableComponentProps: { className: 'text-left', wrapperClassName: 'w-full' },
      },
    ],
  },
  {
    id: 'waste',
    Header: () => (
      <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
        <div className="px-2">{t('managementPage:pic.table.waste')}</div>
        <div className="px-2 text-gray-400 text-sm">{t('managementPage:pic.table.manualSync')}</div>
      </div>
    ),
    columns: [
      {
        Header: 'PIC',
        accessor: 'wastePIC',
        className: 'w-1/5 text-center',
        Cell: (cell) =>
          cell.row.original.editing ? (
            <AdSearchSelectCell
              isClearable={true}
              options={userOptions}
              defaultValue={{ value: cell.row.original.wastePIC, label: cell.row.original.wastePIC }}
              onBlur={(e) =>
                setData((prev) => prev.map((d, i) => (cell.row.index === i ? { ...d, wastePIC: e?.label || null } : d)))
              }
            />
          ) : (
            cell.row.original.wastePIC
          ),
      },
      {
        Header: t('managementPage:pic.table.remark'),
        accessor: 'wasteNote',
        className: 'w-1/5 text-center',
        editable: true,
        editableComponentProps: { className: 'text-left', wrapperClassName: 'w-full' },
      },
    ],
  },
  {
    Header: t('common:edit'),
    id: 'action',
    className: 'w-[10%] text-center',
    rowSpan: 0,
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() => {
            const { editing, ...rest } = cell.row.original;
            patchDataStatusPic(rest);
            return setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                ...(i === cell.row.index && { editing: false }),
              }))
            );
          }}>
          {t('component:button.save')}
        </EditableButton>
      ) : (
        <EditableIconButton
          disabled={!canEdit}
          onClick={() =>
            setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                editing: i === cell.row.index,
                ...(i !== cell.row.index && { editing: r.editing || false }),
              }))
            )
          }>
          <PencilIcon className="w-5 h-5" />
        </EditableIconButton>
      );
    },
  },
];

export default function PicPage({ canEdit, users }) {
  const { t } = useTranslation(['managementPage', 'common', 'component']);
  const plantPermission = usePlantPermission();
  const { data: { data } = {} } = useGetDataStatusPicQuery({ permission: plantPermission });
  const [patchDataStatusPic] = usePatchDataStatusPicMutation();
  const [dataSource, setData] = useState(data);
  const userOptions = users.map(({ id, email }) => ({ value: id, label: email }));
  const columns = COLUMNS({ t, canEdit, userOptions, setData, patchDataStatusPic }).filter(({ hidden }) => !hidden);
  useEffect(() => data && setData(data), [data]);
  return (
    <div className="row-span-2 col-span-7">
      <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-6">
        <div className="text-xl font-medium">{t('managementPage:pic.title')}</div>
        {data && (
          <div className="w-full flex flex-grow flex-col shadow overflow-auto rounded-t-lg">
            <EditableTable columns={columns} data={dataSource} updateMyData={updateMyData(setData)} />
          </div>
        )}
      </div>
    </div>
  );
}

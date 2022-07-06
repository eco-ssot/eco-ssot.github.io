import { useState, useEffect, useMemo } from 'react';

import { PencilIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';

import EditableTable, {
  AdSearchSelectCell,
  EditableButton,
  EditableIconButton,
} from '../../components/table/EditableTable';
import useAdmin from '../../hooks/useAdmin';
import usePlantPermission from '../../hooks/usePlantPermission';
import { useGetUsersQuery } from '../../services/keycloakAdmin';
import { useGetDataStatusPicQuery, usePatchDataStatusPicMutation } from '../../services/management';
import { updateMyData } from '../../utils/table';

const COLUMNS = ({ t, canEdit, userOptions, setData, patchDataStatusPic }) => [
  { Header: 'Plant', accessor: 'plant', rowSpan: 0, className: 'w-[10%] text-center py-3 whitespace-nowrap' },
  {
    id: 'opm',
    Header: () => (
      <div className="flex items-center justify-center divide-x divide-divider border-b border-divider py-3">
        <div className="px-2">{t('managementPage:pic.table.revenueAndShipment')}</div>
        <div className="px-2 text-sm text-gray-400">{t('managementPage:pic.table.manualSync')}</div>
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
        editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
      },
    ],
  },
  {
    id: 'waste',
    Header: () => (
      <div className="flex items-center justify-center divide-x divide-divider border-b border-divider py-3">
        <div className="px-2">{t('managementPage:pic.table.waste')}</div>
        <div className="px-2 text-sm text-gray-400">{t('managementPage:pic.table.manualSync')}</div>
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
        editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
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
          }}
        >
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
          }
        >
          <PencilIcon className="h-5 w-5" />
        </EditableIconButton>
      );
    },
  },
];

export default function PicPage() {
  const { t } = useTranslation(['managementPage', 'common', 'component']);
  const plantPermission = usePlantPermission();
  const { data: { data } = {} } = useGetDataStatusPicQuery({ permission: plantPermission });
  const [patchDataStatusPic] = usePatchDataStatusPicMutation();
  const [_data, setData] = useState(data);
  const { data: users = [] } = useGetUsersQuery();
  const userOptions = useMemo(() => users.map(({ id, email }) => ({ value: id, label: email })), [users]);
  const { canEdit } = useAdmin();
  const columns = useMemo(
    () => COLUMNS({ t, canEdit, userOptions, setData, patchDataStatusPic }).filter(({ hidden }) => !hidden),
    [t, patchDataStatusPic, canEdit, userOptions]
  );

  useEffect(() => {
    data && setData(data);
  }, [data]);

  return (
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col space-y-6 rounded bg-primary-900 p-4 shadow">
        <div className="text-xl font-medium">{t('managementPage:pic.title')}</div>
        {_data && (
          <div className="flex w-full flex-grow flex-col overflow-auto rounded-t-lg shadow">
            <EditableTable columns={columns} data={_data} updateMyData={updateMyData(setData)} />
          </div>
        )}
      </div>
    </div>
  );
}

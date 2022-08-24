import { useState, useEffect, useMemo } from 'react';

import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { isBoolean } from 'lodash';
import { useTranslation } from 'react-i18next';

import Button from '../../components/button/Button';
import Dialog from '../../components/dialog/Dialog';
import Input from '../../components/input/Input';
import DeleteVeronModal from '../../components/modal/DeleteVerionModal';
import EditableTable, { EditableButton, EditableIconButton } from '../../components/table/EditableTable';
import useAdmin from '../../hooks/useAdmin';
import usePlantPermission from '../../hooks/usePlantPermission';
import { useGetDataStatusPicQuery, usePatchDataStatusPicMutation } from '../../services/management';
// import { useGetVersionQuery } from '../../services/public';
import { updateMyData } from '../../utils/table';

const COLUMNS = ({ t, canEdit, setData, patchDataStatusPic }) => [
  {
    Header: t('managementPage:changelog.date'),
    accessor: 'plant',
    rowSpan: 0,
    className: 'w-1/5 text-center',
    editable: true,
    editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
  },
  {
    Header: t('managementPage:changelog.version'),
    accessor: 'leftPIC',
    className: 'w-1/5 text-center',
    editable: true,
    editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
  },
  {
    Header: t('managementPage:changelog.updateContent'),
    accessor: 'rightNote',
    className: 'w-1/5 text-center',
    editable: true,
    editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
  },
  {
    Header: t('managementPage:changelog.item'),
    accessor: 'leftNote',
    className: 'w-1/5 text-center',
    editable: true,
    editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
  },
  {
    Header: t('managementPage:changelog.introduce'),
    accessor: 'rightPIC',
    className: 'w-1/5 text-center',
    editable: true,
    editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
  },
  {
    Header: t('managementPage:changelog.pages'),
    accessor: 'rightPIC1',
    className: 'w-1/5 text-center',
    editable: true,
    editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
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
  {
    Header: t('common:delete'),
    id: 'delete',
    className: 'text-center py-2',
    Cell: () => {
      return <VersionDelete />;
    },
  },
];
function VersionDelete() {
  const { canEdit } = useAdmin();
  const [deleteId, setDeleteId] = useState(false);
  return (
    <>
      <EditableIconButton aria-label="icon-button-trash" disabled={!canEdit} onClick={() => setDeleteId()}>
        <TrashIcon className="h-5 w-5" />
      </EditableIconButton>
      <DeleteVeronModal
        open={!isBoolean(deleteId)}
        setOpen={setDeleteId}
        // onConfirm={() => onDeleteRow(deleteId)
        // }
      ></DeleteVeronModal>
    </>
  );
}
function AddVersion() {
  const { canEdit } = useAdmin();
  return (
    <Dialog
      disableClose
      disabled={!canEdit}
      // afterClose={afterClose}
      render={() => (
        <>
          <div className="flex h-full flex-col space-y-4 rounded-b bg-primary-900 p-8 shadow">
            <div className="flex items-center">
              <div className="min-w-32">日期:</div>
              <Input className="text-right" wfull="w-full" />
            </div>
            <div className="flex items-center">
              <div className="min-w-32">版號:</div>
              <Input className="text-right" wfull="w-full" />
            </div>
            <div className="flex items-center">
              <div className="min-w-32">更新內容:</div>
              <Input className="text-right" wfull="w-full" />
            </div>
            <div className="flex items-center">
              <div className="min-w-32">項目:</div>
              <Input className="text-right" wfull="w-full" />
            </div>
            <div className="flex items-center">
              <div className="min-w-32">新功能介紹:</div>
              <Input className="text-right" wfull="w-full" />
            </div>
            <div className="flex flex-grow flex-col justify-end">
              <div className="flex justify-end space-x-4">
                <Button
                  variant="danger"
                  // className={'pointer-events-none opacity-50'}
                  onClick={() => {
                    alert('Cancel');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  // className={'pointer-events-none opacity-50'}
                  onClick={() => {
                    alert('OK');
                  }}
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      title="Add/Edit Version"
      className="h-96 max-w-2xl"
      titleClassName="bg-primary-800 px-4 py-2 rounded-t"
    >
      <Button className="m-2 flex justify-center space-x-1 ">Add/Edit Version</Button>
    </Dialog>
  );
}

export default function VersionPage() {
  // const { t } = useTranslation(['managementPage']);
  // const { data: version } = useGetVersionQuery();

  const { t } = useTranslation(['managementPage', 'common', 'component']);
  const plantPermission = usePlantPermission();
  const { data: { data } = {} } = useGetDataStatusPicQuery({ permission: plantPermission });
  const [patchDataStatusPic] = usePatchDataStatusPicMutation();
  const [_data, setData] = useState(data);
  const { canEdit } = useAdmin();
  const columns = useMemo(
    () => COLUMNS({ t, canEdit, setData, patchDataStatusPic }).filter(({ hidden }) => !hidden),
    [t, patchDataStatusPic, canEdit]
  );
  useEffect(() => {
    data && setData(data);
  }, [data]);

  return (
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col space-y-2 rounded bg-primary-900 p-4 shadow">
        <div className="flex justify-between space-y-2 text-xl font-medium">
          {t('managementPage:changelog.title')}
          <AddVersion />
        </div>
        {_data && (
          <div className="flex w-full flex-grow flex-col overflow-auto rounded-t-lg shadow">
            <EditableTable columns={columns} data={_data} updateMyData={updateMyData(setData)} />
          </div>
        )}

        {/* {version &&
          Object.entries(version)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([key]) => (
              <div key={key}>
                {key} : {t(`managementPage:changelog.${key}`)}
                <EditableIconButton>
                  <PencilIcon className="h-5 w-5" />
                </EditableIconButton>
              </div>
            ))
            } */}
      </div>
    </div>
  );
}

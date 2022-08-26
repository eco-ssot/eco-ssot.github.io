import { useState, useEffect, useMemo } from 'react';

import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { isBoolean } from 'lodash';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import Button from '../../components/button/Button';
import DatePicker from '../../components/input/DatePicker';
import Input from '../../components/input/Input';
import DeleteVersionModal from '../../components/modal/DeleteVersionModal';
import Modal from '../../components/modal/Modal';
import EditableTable, { EditableButton, EditableIconButton } from '../../components/table/EditableTable';
import useAdmin from '../../hooks/useAdmin';
import { useGetVersionQuery, usePostVersionMutation } from '../../services/management';
import { updateMyData } from '../../utils/table';

const COLUMNS = ({ t, canEdit, setData, postVersion }) => [
  {
    Header: t('managementPage:changelog.date'),
    accessor: 'datetime',
    className: 'w-1/5 text-center',
    editable: true,
    Cell: (cell) => {
      const [editDateOption, setEditDateOption] = useState(cell.value);
      return cell.row.original.editing ? (
        <div className="col-span-1 h-full text-center">
          <DatePicker className="!h-10 w-full rounded" value={editDateOption} onChange={(e) => setEditDateOption(e)} />
        </div>
      ) : (
        cell.value
      );
    },
  },
  {
    Header: t('managementPage:changelog.version'),
    accessor: 'version',
    className: 'w-1/5 text-center',
    editable: true,
    editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
  },
  {
    Header: t('managementPage:changelog.updateContent'),
    accessor: 'description',
    className: 'w-1/5 text-center',
    editable: true,
    editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
  },
  {
    Header: t('managementPage:changelog.item'),
    accessor: 'item',
    className: 'w-1/5 text-center',
    editable: true,
    editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
  },
  {
    Header: t('managementPage:changelog.introduce'),
    accessor: 'detail',
    className: 'w-1/5 text-center',
    editable: true,
    editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
  },
  {
    Header: t('managementPage:changelog.pages'),
    accessor: 'playbook_page',
    className: 'w-1/5 text-center',
    editable: true,
    editableComponentProps: { className: 'text-left h-10', wrapperClassName: 'w-full' },
  },
  {
    Header: t('common:edit'),
    id: 'action',
    className: 'w-[10%] text-center whitespace-nowrap',
    rowSpan: 0,
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() => {
            const { editing, ...rest } = cell.row.original;
            console.log(rest)
            // postVersion(rest);
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
    accessor: 'id',
    className: 'text-center py-2',
    Cell: (cell) => {
      return <VersionDelete id={cell.value} />;
    },
  },
];
function VersionDelete(id) {
  const { canEdit } = useAdmin();
  const [deleteId, setDeleteId] = useState(false);
  return (
    <>
      <EditableIconButton aria-label="icon-button-trash" disabled={!canEdit} onClick={() => setDeleteId(id)}>
        <TrashIcon className="h-5 w-5" />
      </EditableIconButton>
      <DeleteVersionModal open={!isBoolean(deleteId)} setOpen={setDeleteId} id={id.id}></DeleteVersionModal>
    </>
  );
}
function AddVersion({ open = false, setOpen = () => {}}) {
  const { t } = useTranslation(['component']);
  const [dateOption, setDateOption] = useState(new Date());
  const [versionNo, setVersionNo] = useState();
  const [description, setDescription] = useState();
  const [ item, setItem] = useState();
  const [ detail, setDetail] = useState();
  const [ page, setPage] = useState();
  const [postVersion] = usePostVersionMutation();

  return (
    <Modal
      open={!!open}
      setOpen={setOpen}
      title="Add/Edit Version"
      footer={
        <div className="my-4 flex justify-center space-x-8">
          <Button variant="plain" onClick={() => setOpen(false)}>
            {t('component:button.cancel')}
          </Button>
          <Button
            onClick={() => {
              const payload = {
                version: versionNo,
                description: description,
                item: item,
                detail: detail,
                playbook_page: page,
              };
              console.log(payload);
              postVersion({
                data: payload,
              }).then((res) => {
                if (!res.error) {
                  toast.success('Success');
                  setOpen(false)
                }
              });
            }}
            // className={
            //   'pointer-events-none opacity-50'
            // }
          >
            {t('component:button.add')}
          </Button>
        </div>
      }
    >
      <div className="flex h-full flex-col space-y-4 rounded-b bg-primary-900 p-8 shadow">
        <div className="flex items-center">
          <div className="min-w-32 text-left">日期:</div>
          <DatePicker
            className="rounded text-left"
            containerClassName="w-full"
            value={dateOption}
            onChange={(e) => setDateOption(e)}
          />
        </div>
        <div className="flex items-center">
          <div className="min-w-32 text-left">版號:</div>
          <Input
            className="text-left"
            containerClassName="w-full"
            onChange={(e) => setVersionNo(e.target.value)}
            value={versionNo}
          />
        </div>
        <div className="flex items-center">
          <div className="min-w-32 text-left">更新內容:</div>
          <Input className="text-left" containerClassName="w-full" 
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}/>
        </div>
        <div className="flex items-center">
          <div className="min-w-32 text-left">項目:</div>
          <Input className="text-left" containerClassName="w-full" 
           onChange={(e) => setItem(e.target.value)}
           value={item}/>
        </div>
        <div className="flex items-center">
          <div className="min-w-32 text-left">新功能介紹:</div>
          <Input className="text-left" containerClassName="w-full" 
           onChange={(e) => setDetail(e.target.value)}
           value={detail}/>
        </div>
        <div className="flex items-center">
          <div className="min-w-32 text-left">說明書頁數:</div>
          <Input className="text-left" containerClassName="w-full" 
           onChange={(e) => setPage(e.target.value)}
           value={page}/>
        </div>
      </div>
    </Modal>
  );
}

export default function VersionPage() {
  const { t } = useTranslation(['managementPage', 'common', 'component']);
  const { data: { data } = {} } = useGetVersionQuery();
  const [postVersion] = usePostVersionMutation();
  const [_data, setData] = useState(data);
  const { canEdit } = useAdmin();
  const [add, setAdd] = useState(false);
  const columns = useMemo(
    () => COLUMNS({ t, canEdit, setData, postVersion }).filter(({ hidden }) => !hidden),
    [t, postVersion, canEdit]
  );
  useEffect(() => {
    data && setData(data);
  }, [data]);
  return (
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col space-y-2 rounded bg-primary-900 p-4 shadow">
        <div className="flex justify-between space-y-2 text-xl font-medium">
          {t('managementPage:changelog.title')}
          <Button className="m-2 flex justify-center space-x-1 " disabled={!canEdit} onClick={() => setAdd()}>
            Add Version
          </Button>
          <AddVersion open={!isBoolean(add)} setOpen={setAdd} />
        </div>
        {_data && (
          <div className="flex w-full flex-grow flex-col overflow-auto rounded-t-lg shadow">
            <EditableTable columns={columns} data={_data} updateMyData={updateMyData(setData)} />
          </div>
        )}
      </div>
    </div>
  );
}

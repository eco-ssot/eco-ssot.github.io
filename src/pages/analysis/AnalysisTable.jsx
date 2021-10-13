import { useState, useEffect } from 'react';

import { Disclosure } from '@headlessui/react';
import { PlusIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import { PencilIcon, ChevronUpIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { differenceInWeeks, isValid, isPast } from 'date-fns';
import { isBoolean, isNil } from 'lodash';

import Dot from '../../components/dot/Dot';
import DatePicker from '../../components/input/DatePicker';
import Legend from '../../components/legend/Legend';
import {
  TextareaCell,
  InputCell,
  EditableButton,
  EditableIconButton,
  AdSearchSelectCell,
} from '../../components/table/EditableTable';
import { useGetUsersQuery } from '../../services/keycloakAdmin';

import DeleteModal from './DeleteModal';
import ErrorModal from './ErrorModal';

export function isEmpty(value) {
  return isNil(value) || String(value).trim() === '';
}

export function trimRow(row = {}) {
  return Object.entries(row).reduce((prev, [key, value]) => {
    const nextValue = String(value).trim();
    if (isNil(value) || nextValue === '') {
      return { ...prev, [key]: null };
    }

    if (/dd|completedDate/i.test(key)) {
      if (!isValid(new Date(nextValue))) {
        return prev;
      }
    }

    return { ...prev, [key]: nextValue };
  }, {});
}

export function AnalysisSubTable({
  data,
  canEdit,
  users = [],
  canAddRow = false,
  onChange = () => {},
  onDeleteRow = () => {},
}) {
  const userOptions = users.map(({ id, email }) => ({ value: id, label: email }));
  const [table, setData] = useState(data);
  const [deleteId, setDeleteId] = useState(false);
  const [open, setOpen] = useState(false);
  const updateRow = (key, idx) => (value) =>
    setData((prev) => prev.map((d, i) => (i === idx ? { ...d, [key]: value } : d)));

  useEffect(
    () => data && setData((prev) => data.map((d, i) => (prev[i]?.id === d.id ? { ...prev[i], ...d } : d))),
    [data]
  );

  return (
    <>
      <DeleteModal open={!isBoolean(deleteId)} setOpen={setDeleteId} onConfirm={() => onDeleteRow(deleteId)} />
      <ErrorModal open={open} setOpen={setOpen} />
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="div"
              className="grid grid-cols-11 items-center w-full py-2 font-medium text-left text-primary-600 bg-primary-600 bg-opacity-10 cursor-pointer gap-2 px-2 tracking-wider border-t border-b border-primary-600">
              <div className="col-span-3 flex space-x-2 items-center">
                <ChevronUpIcon className={clsx(`${open && 'transform rotate-180'} w-5 h-5 text-primary-600`)} />
                <div className="">改善措施</div>
              </div>
              <div className="col-span-2">預計效益</div>
              <div className="col-span-1">貢獻度</div>
              <div className="col-span-1 text-center">D.D</div>
              <div className="col-span-1 text-center">完成日期</div>
              <div className="col-span-2 text-center">PIC</div>
              <div className="col-span-1"></div>
            </Disclosure.Button>
            <Disclosure.Panel static={canAddRow} className="w-full divide-y divide-primary-600 divide-opacity-50">
              {table &&
                table.map(({ id, name, expect, contribution, dd, completedDate, PIC, editing }, i) => (
                  <div key={i} className="grid grid-cols-11 gap-2 px-2 py-2 items-center">
                    {editing ? (
                      <>
                        <div className="col-span-3 h-full">
                          <InputCell
                            className="h-full"
                            wrapperClassName="w-full"
                            defaultValue={name}
                            onBlur={updateRow('name', i)}
                          />
                        </div>
                        <div className="col-span-2 h-full">
                          <InputCell
                            className="h-full"
                            wrapperClassName="w-full"
                            defaultValue={expect}
                            onBlur={updateRow('expect', i)}
                          />
                        </div>
                        <div className="col-span-1 h-full">
                          <InputCell
                            className="h-full"
                            suffix="%"
                            defaultValue={contribution}
                            onBlur={updateRow('contribution', i)}
                          />
                        </div>
                        <div className="col-span-1 text-center h-full">
                          <DatePicker value={dd} onChange={updateRow('dd', i)} />
                        </div>
                        <div className="col-span-1 text-center h-full">
                          <DatePicker value={completedDate} onChange={updateRow('completedDate', i)} />
                        </div>
                        <div className="col-span-2 text-center">
                          <AdSearchSelectCell
                            options={userOptions}
                            defaultValue={{ value: PIC, label: PIC }}
                            onBlur={(user) => user.label && updateRow('PIC', i)(user.label)}
                          />
                        </div>
                        <div className="col-span-1 text-center">
                          <EditableButton
                            onClick={() => {
                              if ([name, expect, contribution, dd, PIC].some(isEmpty)) {
                                return setOpen(true);
                              }

                              onChange({ id, name, expect, contribution, dd, completedDate, PIC });
                              setData((prev) => prev.map((d, j) => (i === j ? { ...d, editing: false } : d)));
                            }}>
                            儲存
                          </EditableButton>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-span-3 pl-2 flex items-center space-x-2">
                          <Dot
                            color={
                              isValid(new Date(dd))
                                ? differenceInWeeks(new Date(dd), new Date()) < 1
                                  ? isPast(new Date(dd))
                                    ? 'bg-dangerous-700'
                                    : 'bg-_yellow'
                                  : ''
                                : ''
                            }
                          />
                          <div>{name}</div>
                        </div>
                        <div className="col-span-2">{expect}</div>
                        <div className="col-span-1 pl-4">{contribution && `${contribution} %`}</div>
                        <div className="col-span-1 text-center">{dd}</div>
                        <div className="col-span-1 text-center">{completedDate}</div>
                        <div className="col-span-2 text-center px-2">{PIC}</div>
                        <div className="col-span-1 text-center space-x-2">
                          <EditableIconButton
                            onClick={() =>
                              setData((prev) => prev.map((d, j) => (i === j ? { ...d, editing: true } : d)))
                            }>
                            <PencilIcon className="w-5 h-5" />
                          </EditableIconButton>
                          <EditableIconButton disabled={!canEdit} onClick={() => setDeleteId(id)}>
                            <TrashIcon className="w-5 h-5" />
                          </EditableIconButton>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              {canAddRow && (
                <div className="col-span-11 text-center py-2">
                  <EditableIconButton onClick={() => setData((prev) => [...prev, { editing: true, isNewRow: true }])}>
                    <PlusIcon className="w-5 h-5" />
                  </EditableIconButton>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default function AnalysisTable({
  className,
  data,
  title,
  canEdit,
  onRowChange,
  onSubRowChange,
  onDeleteRow,
  onDeleteSubRow,
}) {
  const { data: users } = useGetUsersQuery();
  const [table, setData] = useState(data);
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [open, setOpen] = useState(false);
  const updateRow = (key, idx) => (value) =>
    setData((prev) => prev.map((d, i) => (i === idx ? { ...d, [key]: value } : d)));

  useEffect(() => {
    if (isAddingRow) {
      setData((prev) => [...prev, { editing: true, isNewRow: true }]);
    } else {
      setData((prev) => prev?.filter((d) => !d.isNewRow));
    }
  }, [isAddingRow]);

  useEffect(
    () => data && setData((prev) => data.map((d, i) => (prev[i]?.id === d.id ? { ...prev[i], ...d } : d))),
    [data]
  );

  return (
    <>
      <DeleteModal open={!isBoolean(deleteId)} setOpen={setDeleteId} onConfirm={() => onDeleteRow({ id: deleteId })} />
      <ErrorModal open={open} setOpen={setOpen} />
      <div className="flex justify-between">
        <div className="text-xl font-medium">未達標說明</div>
        <div className="flex space-x-4 items-center">
          <Legend dotClassName="bg-_yellow" label="即將過期" />
          <Legend dotClassName="bg-dangerous-700" label="已過期" />
          <EditableButton className="flex items-center space-x-1" onClick={() => setIsAddingRow((prev) => !prev)}>
            {isAddingRow ? (
              <>
                <XIcon className="w-4 h-4" />
                取消新增
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4" />
                新增說明
              </>
            )}
          </EditableButton>
        </div>
      </div>
      <div className={clsx('w-full shadow overflow-auto rounded-t-lg', className)}>
        <div className="grid grid-cols-12 grid-rows-1 text-lg bg-primary-800 items-center py-3 tracking-wider gap-2 px-2 font-medium">
          <div className="col-span-1 text-center">No.</div>
          <div className="col-span-5">未達標說明</div>
          <div className="col-span-5">{title}</div>
          <div className="col-span-1 text-center">編輯</div>
        </div>
        {table &&
          table.map(({ id, description, effect, editing, imrprovements }, i) => (
            <div key={i} className="grid grid-cols-12 text-lg items-center border-b border-divider">
              <div className="col-span-1 text-center h-full flex flex-col justify-center">{i + 1}</div>
              <div className="col-span-11 grid grid-cols-11 items-center border-l border-primary-600 gap-x-2">
                {editing || (isAddingRow && i === table.length - 1) ? (
                  <>
                    <div className="col-span-5 py-2 pl-2">
                      <TextareaCell
                        className="h-full"
                        wrapperClassName="w-full"
                        defaultValue={description}
                        onBlur={updateRow('description', i)}
                      />
                    </div>
                    <div className="col-span-1 text-left">
                      <InputCell className="h-10" defaultValue={effect} suffix="%" onBlur={updateRow('effect', i)} />
                    </div>
                    <div className="col-span-4"></div>
                    <div className="col-span-1 text-center pr-3">
                      <EditableButton
                        onClick={() => {
                          if ([description, effect].some(isEmpty)) {
                            return setOpen(true);
                          }

                          onRowChange({ id, data: trimRow({ description, effect }) });
                          setData((prev) =>
                            prev.map((d, j) => (i === j ? { ...d, editing: false, isNewRow: false } : d))
                          );

                          setIsAddingRow(false);
                        }}>
                        儲存
                      </EditableButton>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-5 px-4 py-3">{description}</div>
                    <div className="col-span-5 px-4">{effect && `${effect} %`}</div>
                    <div className="col-span-1 pr-3 text-center space-x-2">
                      <EditableIconButton
                        onClick={() => setData((prev) => prev.map((d, j) => (i === j ? { ...d, editing: true } : d)))}>
                        <PencilIcon className="w-5 h-5" />
                      </EditableIconButton>
                      <EditableIconButton
                        disabled={!canEdit}
                        onClick={() => {
                          setDeleteId(id);
                          setIsAddingRow(false);
                        }}>
                        <TrashIcon className="w-5 h-5" />
                      </EditableIconButton>
                    </div>
                  </>
                )}
                <div className="col-span-11">
                  <AnalysisSubTable
                    data={imrprovements}
                    users={users}
                    canEdit={canEdit}
                    canAddRow={!isNil(id) && (editing || (isAddingRow && i === table.length - 1))}
                    onChange={({ id: _id, ...row }) => onSubRowChange({ id, subId: _id, data: trimRow(row) })}
                    onDeleteRow={(subId) => onDeleteSubRow({ id, subId })}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

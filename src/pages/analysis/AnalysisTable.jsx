import { useState, useEffect, useMemo, useRef } from 'react';

import { Disclosure } from '@headlessui/react';
import { PlusIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import { PencilIcon, ChevronUpIcon, CheckIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { differenceInWeeks, isValid, isPast, format } from 'date-fns';
import { isBoolean, isNil } from 'lodash';
import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import Dot from '../../components/dot/Dot';
import DatePicker from '../../components/input/DatePicker';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
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

export function Complete({ editing, label, completedDate, onChange }) {
  const [done, setDone] = useState(!!completedDate);
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={clsx('group flex cursor-pointer items-center space-x-1', !editing && 'pointer-events-none')}
        onClick={() => {
          onChange(done ? null : format(new Date(), 'yyyy-MM-dd'));
          setDone((prev) => !prev);
        }}>
        <div
          className={clsx(
            'rounded-full border p-0.5',
            done ? 'border-transparent bg-primary-600' : 'border-gray-500 group-hover:border-primary-600'
          )}>
          <CheckIcon
            className={clsx('h-4 w-4', done ? 'text-gray-50' : 'text-gray-500 group-hover:text-primary-600')}
          />
        </div>
        <div
          className={clsx(
            'font-medium',
            done ? 'text-gray-50' : 'text-gray-400 underline group-hover:text-primary-600'
          )}>
          {label}
        </div>
      </div>
    </div>
  );
}

export function AnalysisSubTable({
  data,
  canEdit,
  users = [],
  canAddRow = false,
  hasCategory = false,
  onChange = () => {},
  onDeleteRow = () => {},
}) {
  const { t } = useTranslation(['analysisPage', 'component']);
  const userOptions = useMemo(() => users.map(({ id, email }) => ({ value: id, label: email })), [users]);
  const electricityOptions = useMemo(
    () =>
      APP_CONSTANTS.ELECTRICITY_OPTIONS.map((option) => ({
        ...option,
        value: t(`component:electricityOptions.${option.key}`),
      })),
    [t]
  );

  const [_data, setData] = useState(data);
  const [deleteId, setDeleteId] = useState(false);
  const [open, setOpen] = useState(false);
  const updateRow = (key, idx) => (value) =>
    setData((prev) => prev.map((d, i) => (i === idx ? { ...d, [key]: value } : d)));

  const dataRef = useRef(data);
  useEffect(() => {
    if (data) {
      setData((prev) => data.map((d, i) => (prev[i]?.id === d.id ? { ...prev[i], ...d } : d)));
      dataRef.current = data;
    }
  }, [data]);

  return (
    <>
      <DeleteModal open={!isBoolean(deleteId)} setOpen={setDeleteId} onConfirm={() => onDeleteRow(deleteId)} />
      <ErrorModal open={open} setOpen={setOpen} />
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="div"
              className="grid w-full cursor-pointer grid-cols-11 items-center gap-2 border-t border-b border-primary-600 bg-primary-600 bg-opacity-10 py-2 px-2 text-left font-medium tracking-wider text-primary-600">
              <div className={clsx('flex items-center space-x-2', hasCategory ? 'col-span-2' : 'col-span-3')}>
                <ChevronUpIcon className={clsx(`${open && 'rotate-180 transform'} h-5 w-5 text-primary-600`)} />
                <div className="">{t('analysisPage:table.strategy')}</div>
              </div>
              {hasCategory ? (
                <div className="col-span-3 flex space-x-2">
                  <div className="w-32">{t('analysisPage:table.category')}</div>
                  <div>{t('analysisPage:table.expect')}</div>
                </div>
              ) : (
                <div className="col-span-2">{t('analysisPage:table.expect')}</div>
              )}
              <div className="col-span-1">{t('analysisPage:table.contribution')}</div>
              <div className="col-span-1 text-center">D.D</div>
              <div className="col-span-1 text-center">{t('analysisPage:table.finishDate')}</div>
              <div className="col-span-2 text-center">PIC</div>
              <div className="col-span-1"></div>
            </Disclosure.Button>
            <Disclosure.Panel static={canAddRow} className="w-full divide-y divide-primary-600 divide-opacity-50">
              {_data &&
                _data.map(({ id, name, expect, category, contribution, dd, completedDate, PIC, editing }, i) => (
                  <div key={i} className="grid grid-cols-11 items-center gap-2 px-2 py-2">
                    {editing ? (
                      <>
                        <div className={clsx('h-full', hasCategory ? 'col-span-2' : 'col-span-3')}>
                          <InputCell
                            className="h-full"
                            wrapperClassName="w-full"
                            defaultValue={name}
                            onBlur={updateRow('name', i)}
                          />
                        </div>
                        {hasCategory ? (
                          <div className="col-span-3 flex h-full space-x-2">
                            <Select
                              buttonClassName="w-32"
                              options={electricityOptions}
                              selected={electricityOptions.find((option) => option.key === category)}
                              onChange={(e) => updateRow('category', i)(e.key)}
                            />
                            <div className="w-full">
                              <InputCell
                                className="h-full"
                                wrapperClassName="w-full"
                                defaultValue={expect}
                                onBlur={updateRow('expect', i)}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="col-span-2 h-full">
                            <InputCell
                              className="h-full"
                              wrapperClassName="w-full"
                              defaultValue={expect}
                              onBlur={updateRow('expect', i)}
                            />
                          </div>
                        )}
                        <div className="col-span-1 h-full">
                          <InputCell
                            className="h-full"
                            suffix="%"
                            defaultValue={contribution}
                            onBlur={updateRow('contribution', i)}
                          />
                        </div>
                        <div className="col-span-1 h-full text-center">
                          <DatePicker value={dd} onChange={updateRow('dd', i)} />
                        </div>
                        <div className="col-span-1 h-full text-center">
                          <Complete
                            label={t('analysisPage:table.done')}
                            editing={true}
                            completedDate={completedDate}
                            onChange={updateRow('completedDate', i)}
                          />
                        </div>
                        <div className="col-span-2 text-center">
                          <AdSearchSelectCell
                            options={userOptions}
                            defaultValue={{ value: PIC, label: PIC }}
                            onBlur={(user) => user.label && updateRow('PIC', i)(user.label)}
                          />
                        </div>
                        <div className="col-span-1 space-x-2 text-center">
                          <EditableIconButton
                            aria-label="icon-button-check"
                            onClick={() => {
                              if ([name, expect, contribution, dd, PIC].some(isEmpty)) {
                                return setOpen(true);
                              }

                              onChange({
                                id,
                                name,
                                expect,
                                contribution,
                                dd,
                                completedDate,
                                PIC,
                                ...(hasCategory && {
                                  category: category || APP_CONSTANTS.ELECTRICITY_OPTIONS[0].value,
                                }),
                              });

                              setData((prev) => prev.map((d, j) => (i === j ? { ...d, editing: false } : d)));
                            }}>
                            <CheckIcon className="h-5 w-5" />
                          </EditableIconButton>
                          <EditableIconButton
                            aria-label="icon-button-x"
                            onClick={() =>
                              setData((prev) =>
                                prev.map((d, j) => (i === j ? dataRef.current?.[j] : d)).filter(Boolean)
                              )
                            }>
                            <XIcon className="h-5 w-5" />
                          </EditableIconButton>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={clsx(
                            'flex items-center space-x-2 pl-2',
                            hasCategory ? 'col-span-2' : 'col-span-3'
                          )}>
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
                        {hasCategory ? (
                          <div className="col-span-3 flex space-x-2">
                            <div className="w-32">{t(`component:electricityOptions.${category}`)}</div>
                            <div>{expect}</div>
                          </div>
                        ) : (
                          <div className="col-span-2">{expect}</div>
                        )}
                        <div className="col-span-1 pl-4">{contribution && `${contribution} %`}</div>
                        <div className="col-span-1 text-center">{dd}</div>
                        <div className="col-span-1 text-center">{completedDate}</div>
                        <div className="col-span-2 px-2 text-center">{PIC}</div>
                        <div className="col-span-1 space-x-2 text-center">
                          <EditableIconButton
                            aria-label="icon-button-pencil"
                            onClick={() =>
                              setData((prev) => prev.map((d, j) => (i === j ? { ...d, editing: true } : d)))
                            }>
                            <PencilIcon className="h-5 w-5" />
                          </EditableIconButton>
                          <EditableIconButton
                            aria-label="icon-button-trash"
                            disabled={!canEdit}
                            onClick={() => setDeleteId(id)}>
                            <TrashIcon className="h-5 w-5" />
                          </EditableIconButton>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              {canAddRow && (
                <div className="col-span-11 py-2 text-center">
                  <EditableIconButton
                    aria-label="icon-button-plus"
                    onClick={() => setData((prev) => [...prev, { editing: true, isNewRow: true }])}>
                    <PlusIcon className="h-5 w-5" />
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
  hasCategory,
  onRowChange,
  onSubRowChange,
  onDeleteRow,
  onDeleteSubRow,
}) {
  const { t } = useTranslation(['analysisPage', 'common', 'component']);
  const { data: users } = useGetUsersQuery();
  const [_data, setData] = useState(data);
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [open, setOpen] = useState(false);
  const updateRow = (key, idx) => (value) =>
    setData((prev) => prev.map((d, i) => (i === idx ? { ...d, [key]: value } : d)));

  const dataRef = useRef(data);
  useEffect(() => {
    if (isAddingRow) {
      setData((prev) => [...prev, { editing: true, isNewRow: true }]);
    } else {
      setData((prev) => prev?.filter((d) => !d.isNewRow));
    }
  }, [isAddingRow]);

  useEffect(() => {
    if (data) {
      setData((prev) => data.map((d, i) => (prev[i]?.id === d.id ? { ...prev[i], ...d } : d)));
      dataRef.current = data;
    }
  }, [data]);

  return (
    <>
      <DeleteModal open={!isBoolean(deleteId)} setOpen={setDeleteId} onConfirm={() => onDeleteRow({ id: deleteId })} />
      <ErrorModal open={open} setOpen={setOpen} />
      <div className="flex justify-between">
        <div className="text-xl font-medium">{t('analysisPage:missingTargetDesc')}</div>
        <div className="flex items-center space-x-4">
          <Legend dotClassName="bg-_yellow" label={t('analysisPage:aboutToOverdue')} />
          <Legend dotClassName="bg-dangerous-700" label={t('analysisPage:overdue')} />
          <EditableButton className="flex items-center space-x-1" onClick={() => setIsAddingRow((prev) => !prev)}>
            {isAddingRow ? (
              <>
                <XIcon className="h-4 w-4" />
                {t('analysisPage:cancelAdd')}
              </>
            ) : (
              <>
                <PlusIcon className="h-4 w-4" />
                {t('analysisPage:addDesc')}
              </>
            )}
          </EditableButton>
        </div>
      </div>
      <div className={clsx('w-full overflow-auto rounded-t-lg shadow', className)}>
        <div className="grid grid-cols-12 grid-rows-1 items-center gap-2 bg-primary-800 py-3 px-2 text-lg font-medium tracking-wider">
          <div className="col-span-1 text-center">No.</div>
          <div className="col-span-5">{t('analysisPage:missingTargetDesc')}</div>
          <div className="col-span-5">{title}</div>
          <div className="col-span-1 text-center">{t('common:edit')}</div>
        </div>
        {_data &&
          _data.map(({ id, description, effect, editing, imrprovements }, i) => (
            <div key={i} className="grid grid-cols-12 items-center border-b border-divider text-lg">
              <div className="col-span-1 flex h-full flex-col justify-center text-center">{i + 1}</div>
              <div className="col-span-11 grid grid-cols-11 items-center gap-x-2 border-l border-primary-600">
                {editing || (isAddingRow && i === _data.length - 1) ? (
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
                    <div className="col-span-1 space-x-2 pr-3 text-center">
                      <EditableIconButton
                        aria-label="icon-button-check"
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
                        <CheckIcon className="h-5 w-5" />
                      </EditableIconButton>
                      <EditableIconButton
                        aria-label="icon-button-x"
                        onClick={() =>
                          setData((prev) => {
                            const nextData = prev.map((d, j) => (i === j ? dataRef.current?.[j] : d)).filter(Boolean);
                            if (nextData.length < prev.length) {
                              setIsAddingRow(false);
                            }

                            return nextData;
                          })
                        }>
                        <XIcon className="h-5 w-5" />
                      </EditableIconButton>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-5 px-4 py-3">{description}</div>
                    <div className="col-span-5 px-4">{effect && `${effect} %`}</div>
                    <div className="col-span-1 space-x-2 pr-3 text-center">
                      <EditableIconButton
                        aria-label="icon-button-pencil"
                        onClick={() => setData((prev) => prev.map((d, j) => (i === j ? { ...d, editing: true } : d)))}>
                        <PencilIcon className="h-5 w-5" />
                      </EditableIconButton>
                      <EditableIconButton
                        aria-label="icon-button-trash"
                        disabled={!canEdit}
                        onClick={() => {
                          setDeleteId(id);
                          setIsAddingRow(false);
                        }}>
                        <TrashIcon className="h-5 w-5" />
                      </EditableIconButton>
                    </div>
                  </>
                )}
                <div className="col-span-11">
                  <AnalysisSubTable
                    data={imrprovements}
                    users={users}
                    canEdit={canEdit}
                    canAddRow={!isNil(id) && (editing || (isAddingRow && i === _data.length - 1))}
                    hasCategory={hasCategory}
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

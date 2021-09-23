import { useState, useEffect } from 'react';

import { Disclosure } from '@headlessui/react';
import { PlusIcon, XIcon } from '@heroicons/react/outline';
import { PencilIcon, ChevronUpIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { differenceInWeeks, isValid, isPast } from 'date-fns';

import Dot from '../../components/dot/Dot';
import Legend from '../../components/legend/Legend';
import {
  TextareaCell,
  InputCell,
  EditableButton,
  EditableIconButton,
  SearchSelectCell,
} from '../../components/table/EditableTable';
import { useGetUsersQuery } from '../../services/keycloakAdmin';

export function AnalysisSubTable({ data = [], users = [], canAddRow = false, onChange = () => {} }) {
  const userOptions = users.map(({ id, firstName, email }) => ({ value: id, label: firstName, alias: email }));
  const [table, setData] = useState(data);
  const updateRow = (key, idx) => (value) =>
    setData((prev) => prev.map((d, i) => (i === idx ? { ...d, [key]: value } : d)));

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            as="div"
            className="grid grid-cols-11 items-center w-full py-2 font-medium text-left text-primary-600 bg-primary-600 bg-opacity-10 cursor-pointer gap-2 px-2 tracking-wider">
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
            {table.map(({ strategy, expectation, contribution, dueDate, finishDate, pic, editing }, i) => (
              <div key={i} className="grid grid-cols-11 gap-2 px-2 py-2 items-center">
                {editing ? (
                  <>
                    <div className="col-span-3 h-full">
                      <InputCell
                        className="h-full"
                        wrapperClassName="w-full"
                        defaultValue={strategy}
                        onBlur={updateRow('strategy', i)}
                      />
                    </div>
                    <div className="col-span-2 h-full">
                      <InputCell
                        className="h-full"
                        wrapperClassName="w-full"
                        defaultValue={expectation}
                        onBlur={updateRow('expectation', i)}
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
                      <InputCell
                        className="h-full"
                        placeholder="yyyy.mm.dd"
                        defaultValue={dueDate}
                        onBlur={updateRow('dueDate', i)}
                      />
                    </div>
                    <div className="col-span-1 text-center h-full">
                      <InputCell
                        className="h-full"
                        placeholder="yyyy.mm.dd"
                        defaultValue={finishDate}
                        onBlur={updateRow('finishDate', i)}
                      />
                    </div>
                    <div className="col-span-2 text-center">
                      <SearchSelectCell
                        options={userOptions}
                        defaultValue={userOptions.find((user) => user.label === pic)}
                        onBlur={(user) => updateRow('pic', i)(user.label)}
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      <EditableButton
                        onClick={() => {
                          setData((prev) => prev.map((d, j) => (i === j ? { ...d, editing: false } : d)));
                          onChange(table);
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
                          isValid(new Date(dueDate))
                            ? differenceInWeeks(new Date(dueDate), new Date()) < 1
                              ? isPast(new Date(dueDate))
                                ? 'bg-dangerous-700'
                                : 'bg-_yellow'
                              : ''
                            : ''
                        }
                      />
                      <div>{strategy}</div>
                    </div>
                    <div className="col-span-2">{expectation}</div>
                    <div className="col-span-1 pl-4">{contribution}</div>
                    <div className="col-span-1 text-center">{dueDate}</div>
                    <div className="col-span-1 text-center">{finishDate}</div>
                    <div className="col-span-2 text-center px-2">{pic}</div>
                    <div className="col-span-1 text-center">
                      <EditableIconButton
                        onClick={() => setData((prev) => prev.map((d, j) => (i === j ? { ...d, editing: true } : d)))}>
                        <PencilIcon className="w-5 h-5" />
                      </EditableIconButton>
                    </div>
                  </>
                )}
              </div>
            ))}
            {canAddRow && (
              <div className="col-span-11 text-center py-2">
                <EditableIconButton onClick={() => setData((prev) => [...prev, { editing: true }])}>
                  <PlusIcon className="w-5 h-5" />
                </EditableIconButton>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default function AnalysisTable({ className, data, title }) {
  const { data: users } = useGetUsersQuery();
  const [table, setData] = useState(data);
  const [isAddingRow, setIsAddingRow] = useState(false);
  const updateRow = (key, idx) => (value) =>
    setData((prev) => prev.map((d, i) => (i === idx ? { ...d, [key]: value } : d)));

  useEffect(() => {
    if (isAddingRow) {
      setData((prev) => [...prev, { editing: true, isNewRow: true }]);
    } else {
      setData((prev) => prev?.filter((d) => !d.isNewRow));
    }
  }, [isAddingRow]);

  useEffect(() => data && setData(data), [data]);
  return (
    <>
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
          table.map(({ description, effect, subRows, editing }, i) => (
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
                    <div className="col-span-5 px-4">{effect}</div>
                    <div className="col-span-1 pr-3 text-center">
                      <EditableIconButton
                        onClick={() => setData((prev) => prev.map((d, j) => (i === j ? { ...d, editing: true } : d)))}>
                        <PencilIcon className="w-5 h-5" />
                      </EditableIconButton>
                    </div>
                  </>
                )}
                <div className="col-span-11">
                  <AnalysisSubTable
                    data={subRows}
                    users={users}
                    canAddRow={editing || (isAddingRow && i === table.length - 1)}
                    onChange={(subRows) => setData((prev) => prev.map((d, j) => (i === j ? { ...d, subRows } : d)))}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { PlusIcon, XIcon } from '@heroicons/react/outline';
import { PencilIcon } from '@heroicons/react/solid';

import Button from '../../components/button/Button';
import EditableTable, { TextareaCell, EditableButton, EditableIconButton } from '../../components/table/EditableTable';
import Legend from '../../components/legend/Legend';

const COLUMNS = ({ setData, setIsAddingRow }) => [
  { Header: 'No.', id: 'id', className: 'w-[5%] text-center py-3 pl-4', Cell: (cell) => cell.row.index + 1 },
  {
    Header: '未達標說明',
    accessor: 'description',
    className: 'py-3 break-words whitespace-pre-wrap w-1/5',
    editable: true,
    EditableComponent: TextareaCell,
  },
  {
    Header: '改善措施',
    accessor: 'strategy',
    className: 'w-1/5',
    editable: true,
    EditableComponent: TextareaCell,
  },
  {
    Header: '預計效益',
    accessor: 'expectation',
    className: 'w-[10%]',
    editable: true,
    EditableComponent: TextareaCell,
  },
  {
    Header: '貢獻度',
    accessor: 'contribution',
    className: 'w-[10%]',
    editable: true,
    EditableComponent: TextareaCell,
  },
  { Header: 'D.D', accessor: 'dueDate', className: 'w-[9%]', editable: true },
  { Header: '完成日期', accessor: 'finishDate', className: 'w-[9%]', editable: true },
  { Header: 'PIC', accessor: 'pic', className: 'w-[7%]', editable: true },
  {
    Header: '編輯',
    id: 'edit',
    className: 'w-[8%] text-center pr-4',
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() => {
            if (cell.row.original.isNewRow) {
              setIsAddingRow((prev) => !prev);
            }

            return setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                ...(i === cell.row.index && { editing: false, isNewRow: false }),
              }))
            );
          }}>
          儲存
        </EditableButton>
      ) : (
        <EditableIconButton
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

export default function AnalysisTable({ className, data }) {
  const [dataSource, setData] = useState(data);
  const [isAddingRow, setIsAddingRow] = useState(false);
  const columns = COLUMNS({ setData, setIsAddingRow });
  const updateMyData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }

        return row;
      })
    );
  };

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
          <Button className="flex items-center space-x-1" onClick={() => setIsAddingRow((prev) => !prev)}>
            {isAddingRow ? <XIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
            {isAddingRow ? '取消新增' : '新增說明'}
          </Button>
        </div>
      </div>
      <div className={clsx('w-full shadow overflow-auto rounded-t-lg space-y-2', className)}>
        <EditableTable
          columns={columns}
          data={dataSource}
          updateMyData={updateMyData}
          getRowProps={() => ({ className: 'border-b border-divider' })}
        />
      </div>
    </>
  );
}

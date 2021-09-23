import { useState, useEffect } from 'react';

import { PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

import EditableTable, {
  CustomInputCell,
  EditableButton,
  EditableIconButton,
} from '../../components/table/EditableTable';
import { usePatchGoalMutation } from '../../services/app';
import { baseFormatter } from '../../utils/formatter';
import { getDecimalNumber } from '../../utils/number';

import ErrorModal from './ErrorModal';

const COLUMNS = ({ setData, year, patchGoal, canEdit, setOpen }) => [
  {
    Header: '項目',
    accessor: 'category',
    className: 'w-[18%] text-center py-3',
  },
  {
    Header: '基準年',
    accessor: 'baseYear',
    editable: true,
    className: 'w-[18%] text-center',
  },
  {
    Header: 'Target 訂定標準（對比基準年）',
    accessor: 'target',
    editable: true,
    className: 'w-[18%] text-center',
    EditableComponent: CustomInputCell,
  },
  {
    Header: `${year}年 Target`,
    accessor: 'amount',
    className: 'w-[18%] text-center',
    formatter: baseFormatter,
    precision: 1,
  },
  {
    Header: '單位',
    accessor: 'unit',
    className: 'w-[18%] text-center',
  },
  {
    Header: '編輯',
    id: 'action',
    className: 'w-[10%] text-center',
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() => {
            const { baseYear, target, category } = cell.row.original;
            if (Number(baseYear) >= Number(year) || Number(getDecimalNumber(target)) > 100) {
              return setOpen(true);
            }

            patchGoal({ year, baseYear, target, category });
            return setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                ...(i === cell.row.index && { editing: false }),
              }))
            );
          }}>
          儲存
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

export default function YearGoal({ className, year, data, canEdit }) {
  const [patchGoal] = usePatchGoalMutation();
  const [dataSource, setData] = useState(data);
  const [open, setOpen] = useState(false);
  const columns = COLUMNS({ setData, patchGoal, setOpen, year, canEdit });
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

  useEffect(() => data && setData(data), [data]);
  return (
    <>
      <ErrorModal open={open} setOpen={setOpen} />
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

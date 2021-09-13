import { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { isNil } from 'lodash';

import EditableTable, {
  CustomInputCell,
  EditableButton,
  EditableIconButton,
} from '../../components/table/EditableTable';

import { usePatchGoalMutation } from '../../services/app';
import APP_CONFIG from '../../constants/app-config';
import { baseFormatter } from '../../utils/formatter';

const COLUMNS = ({ setData, year, patchGoal, canEdit }) => [
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
    Cell: (cell) => {
      if (cell.row.original.category === '可再生能源') {
        return APP_CONFIG.CURRENT_YEAR;
      }

      return isNil(cell.value) ? APP_CONFIG.LAST_YEAR : cell.value;
    },
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
  const columns = COLUMNS({ setData, patchGoal, year, canEdit });
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
    <div className={clsx('w-full shadow overflow-auto rounded-t-lg space-y-2', className)}>
      <EditableTable
        columns={columns}
        data={dataSource}
        updateMyData={updateMyData}
        getRowProps={() => ({ className: 'border-b border-divider' })}
      />
    </div>
  );
}

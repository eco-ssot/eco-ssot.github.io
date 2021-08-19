import { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

import EditableTable from '../../components/table/EditableTable';
import Button from '../../components/button/Button';
import IconButton from '../../components/button/IconButton';
import { usePatchGoalMutation } from '../../services/management';
import { keepPrecisionFormatter } from '../../utils/formatter';

const COLUMNS = ({ setData, year, patchGoal }) => [
  {
    Header: '項目',
    accessor: 'category',
    className: 'w-[18%]',
  },
  {
    Header: '基準年',
    accessor: 'baseYear',
    editable: true,
    className: 'w-[18%]',
  },
  {
    Header: 'Target 訂定標準',
    accessor: 'target',
    editable: true,
    className: 'w-[18%]',
  },
  {
    Header: `${year}年 Target`,
    accessor: 'amount',
    editable: true,
    className: 'w-[18%]',
    formatter: keepPrecisionFormatter,
  },
  {
    Header: '單位',
    accessor: 'unit',
    className: 'w-[18%]',
  },
  {
    Header: '編輯',
    id: 'action',
    className: 'w-[10%]',
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <Button
          onClick={() => {
            const { id, editing, category, unit, ...rest } = cell.row.original;
            patchGoal({ id, year, data: rest });
            return setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                ...(i === cell.row.index && { editing: false }),
              }))
            );
          }}>
          儲存
        </Button>
      ) : (
        <IconButton
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
        </IconButton>
      );
    },
  },
];

export default function Goal({ className, year, data }) {
  const [patchGoal] = usePatchGoalMutation();
  const [dataSource, setData] = useState(data);
  const columns = COLUMNS({ setData, patchGoal, year });
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

import { useEffect } from 'react';
import clsx from 'clsx';
import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';

import EditableTable from '../../components/table/EditableTable';
import Button from '../../components/button/Button';
import IconButton from '../../components/button/IconButton';
import { usePatchCarbonIndexMutation } from '../../services/app';

const COLUMNS = ({ setData, patchCarbonIndex, year }) => [
  {
    Header: 'Site',
    accessor: 'site',
    className: 'w-1/5',
  },
  {
    Header: '碳排放係數',
    accessor: 'amount',
    editable: true,
    className: 'w-[30%]',
  },
  {
    Header: '更新日期',
    accessor: 'lastUpdateTime',
    className: 'w-[30%]',
    Cell: ({ value }) => format(new Date(value), 'yyyy.MM.dd'),
  },
  {
    Header: '編輯',
    id: 'action',
    className: 'w-1/5',
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <Button
          onClick={() => {
            const { id, editing, lastUpdateTime, site, ...rest } = cell.row.original;
            patchCarbonIndex({ id, year, data: rest });
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

export default function CarbonIndex({ className, year, data }) {
  const [patchCarbonIndex] = usePatchCarbonIndexMutation();
  const [dataSource, setData] = useState(data);
  const columns = COLUMNS({ setData, patchCarbonIndex, year });
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

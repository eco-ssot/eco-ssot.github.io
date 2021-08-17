import clsx from 'clsx';
import { useState, useMemo } from 'react';
import { PencilIcon } from '@heroicons/react/solid';

import EditableTable from '../../components/table/EditableTable';
import Button from '../../components/button/Button';
import IconButton from '../../components/button/IconButton';

const COLUMNS = ({ setData }) => [
  {
    Header: 'Site',
    accessor: 'site',
    className: 'w-1/5',
  },
  {
    Header: '碳排放係數',
    accessor: 'carbonIndex',
    editable: true,
    className: 'w-[30%]',
  },
  {
    Header: '更新日期',
    accessor: 'updateTime',
    className: 'w-[30%]',
  },
  {
    Header: '編輯',
    id: 'action',
    className: 'w-1/5',
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <Button
          onClick={() =>
            setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                ...(i === cell.row.index && { editing: false }),
              }))
            )
          }>
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

const DATA = [
  { site: 'WNH', carbonIndex: 0.7921, updateTime: '2021.05.07' },
  { site: 'WHC', carbonIndex: 0.7921, updateTime: '2021.05.07' },
  { site: 'WIH', carbonIndex: 0.7921, updateTime: '2021.05.07' },
  { site: 'WKS', carbonIndex: 0.8587, updateTime: '2020.11.29' },
  { site: 'WZS', carbonIndex: 0.8587, updateTime: '2020.11.29' },
  { site: 'WCQ', carbonIndex: 0.8042, updateTime: '2021.02.13' },
  { site: 'WCD', carbonIndex: 0.8042, updateTime: '2021.02.13' },
  { site: 'WMX', carbonIndex: 0.8042, updateTime: '2021.02.13' },
  { site: 'WCZ', carbonIndex: 0.8042, updateTime: '2021.02.13' },
];

export default function CarbonIndex({ className }) {
  const [data, setData] = useState(() => DATA);
  const columns = useMemo(() => COLUMNS({ setData }), []);
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

  return (
    <div className={clsx('w-full shadow overflow-auto rounded-t-lg space-y-2', className)}>
      <EditableTable
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        getRowProps={() => ({ className: 'border-b border-divider' })}
      />
    </div>
  );
}

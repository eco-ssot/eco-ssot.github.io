import clsx from 'clsx';
import { useState, useMemo } from 'react';
import { PencilIcon } from '@heroicons/react/solid';

import EditableTable from '../../components/table/EditableTable';
import Button from '../../components/button/Button';
import IconButton from '../../components/button/IconButton';

const COLUMNS = ({ setData, data = [] }) => [
  {
    Header: '購買日期',
    accessor: 'buyDate',
    rowSpan: data.length || 1,
    className: 'w-[15%]',
    editable: true,
  },
  {
    Header: '合計度數 (千度)',
    accessor: 'unit',
    rowSpan: data.length || 1,
    className: 'w-[15%]',
    editable: true,
  },
  {
    Header: '購買地區',
    accessor: 'buyArea',
    className: 'w-[15%] h-12',
    editable: true,
    placeholder: '地區',
  },
  {
    Header: '購買度數 (千度)',
    accessor: 'buyUnit',
    className: 'w-[15%]',
    editable: true,
    placeholder: '張數',
  },
  {
    Header: '購買地區',
    accessor: 'price',
    className: 'w-[15%]',
    editable: true,
    placeholder: '地區',
  },
  {
    Header: '金額幣別',
    accessor: 'currency',
    className: 'w-[15%]',
    editable: true,
    placeholder: '幣別',
  },
  {
    Header: '編輯',
    id: 'action',
    className: 'w-[10%]',
    rowSpan: data.length || 1,
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <Button
          onClick={() =>
            setData(() =>
              setData((prev) => prev.map((r) => ({ ...r, editing: false })).filter(({ id }) => id !== 'addRow'))
            )
          }>
          儲存
        </Button>
      ) : (
        <IconButton
          onClick={() =>
            setData((prev) =>
              prev
                .map((r) => ({ ...r, editing: true }))
                .filter(({ id }) => id !== 'addRow')
                .concat({ id: 'addRow', colSpan: 4, startIndex: 2 })
            )
          }>
          <PencilIcon className="w-5 h-5" />
        </IconButton>
      );
    },
  },
];

const DATA = [
  {
    buyDate: '2020.12.29',
    unit: '344,000',
    buyArea: '中國',
    buyUnit: '188,000',
    price: '600,000',
    currency: '人民幣',
  },
  {
    buyDate: '2020.12.29',
    unit: '344,000',
    buyArea: '臺灣',
    buyUnit: '0',
    price: '0',
    currency: '臺灣',
  },
  {
    buyDate: '2020.12.29',
    unit: '344,000',
    buyArea: '捷克',
    buyUnit: '156,000',
    price: '150,000',
    currency: '捷克克朗',
  },
];

export default function Trec({ className }) {
  const [data, setData] = useState(() => DATA);
  const columns = useMemo(() => COLUMNS({ data, setData }), [data]);
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
        setData={setData}
        getRowProps={() => ({ className: 'border-b border-divider' })}
      />
    </div>
  );
}

import clsx from 'clsx';
import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/solid';

import EditableTable, { EditableButton, EditableIconButton } from '../../components/table/EditableTable';

const COLUMNS = ({ setData, canEdit, data = [] }) => [
  {
    Header: '購買日期',
    accessor: 'buyDate',
    rowSpan: data.length || 1,
    className: 'w-[15%] text-center',
    editable: true,
  },
  {
    Header: '合計度數 (千度)',
    accessor: 'unit',
    rowSpan: data.length || 1,
    className: 'w-[15%] text-center',
    editable: true,
  },
  {
    Header: '購買地區',
    accessor: 'buyArea',
    className: 'w-[15%] h-12 text-center',
    editable: true,
    placeholder: '地區',
  },
  {
    Header: '購買度數 (千度)',
    accessor: 'buyUnit',
    className: 'w-[15%] text-center',
    editable: true,
    placeholder: '張數',
  },
  {
    Header: '購買地區',
    accessor: 'price',
    className: 'w-[15%] text-center',
    editable: true,
    placeholder: '地區',
  },
  {
    Header: '金額幣別',
    accessor: 'currency',
    className: 'w-[15%] text-center',
    editable: true,
    placeholder: '幣別',
  },
  {
    Header: '編輯',
    id: 'action',
    className: 'w-[10%] text-center',
    rowSpan: data.length || 1,
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() =>
            setData(() =>
              setData((prev) => prev.map((r) => ({ ...r, editing: false })).filter(({ id }) => id !== 'addRow'))
            )
          }>
          儲存
        </EditableButton>
      ) : (
        <EditableIconButton
          onClick={() =>
            setData((prev) =>
              prev
                .map((r) => ({ ...r, editing: true }))
                .filter(({ id }) => id !== 'addRow')
                .concat({ id: 'addRow', colSpan: 4, startIndex: 2 })
            )
          }
          disabled={!canEdit}>
          <PencilIcon className="w-5 h-5" />
        </EditableIconButton>
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

export default function Trec({ className, canEdit }) {
  const [data, setData] = useState(() => DATA);
  const columns = COLUMNS({ data, setData, canEdit });
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

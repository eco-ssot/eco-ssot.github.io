import { useState, useMemo } from 'react';
import { PencilIcon } from '@heroicons/react/solid';

import EditableTable from '../../components/table/EditableTable';
import Button from '../../components/button/Button';
import IconButton from '../../components/button/IconButton';

const COLUMNS = ({ setData }) => [
  {
    Header: '項目',
    accessor: 'item',
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
    Header: '2021年 Target',
    accessor: '2021',
    editable: true,
    className: 'w-[18%]',
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
  { item: '碳排放量', baseYear: '2016', target: '逐年下降 4.2 %', 2021: '241,231', unit: '公噸' },
  { item: '可再生能源', baseYear: '-', target: '占比 > 60 %', 2021: '-', unit: '%' },
  {
    item: '用電強度',
    baseYear: '-',
    target: '對比去年下降 2 %',
    2021: '100',
    unit: '千度 / 十億新臺幣',
  },
  {
    item: '用水強度',
    baseYear: '2016',
    target: '逐年下降 1.8 %',
    2021: '80',
    unit: '千噸 / 十億臺幣',
  },
  { item: '單台用電', baseYear: '-', target: '對比去年下降 3 %', 2021: '100', unit: '度 / 台' },
  {
    item: '廢棄物密度',
    baseYear: '2018',
    target: '對比基準年下降 2 %',
    2021: '50.4',
    unit: '千噸 / 十億新臺幣',
  },
];

export default function Goal() {
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
    <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg space-y-2">
      <EditableTable
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        getRowProps={() => ({ className: 'border-b border-divider' })}
      />
    </div>
  );
}

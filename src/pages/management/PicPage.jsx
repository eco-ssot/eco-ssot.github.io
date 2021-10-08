import { useState } from 'react';
import { useEffect } from 'react';

import { PencilIcon } from '@heroicons/react/solid';

import { AsyncSearchSelect } from '../../components/select/SearchSelect';
import EditableTable, { EditableButton, EditableIconButton } from '../../components/table/EditableTable';
import { useGetDataStatusPicQuery } from '../../services/management';

const COLUMNS = ({ setData }) => [
  { Header: 'Plant', accessor: 'plant', rowSpan: 0, className: 'w-[10%] text-center py-3' },
  {
    id: 'opm',
    Header: () => (
      <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
        <div className="px-2">OPM</div>
        <div className="px-2 text-gray-400 text-sm">自動同步</div>
      </div>
    ),
    columns: [
      {
        Header: 'PIC',
        accessor: 'OPMPIC',
        className: 'w-1/5 text-center',
        editable: true,
        editableComponentProps: { className: 'text-left', wrapperClassName: 'w-full ' },
        Cell: (cell) => <AsyncSearchSelect />,
      },
      {
        Header: '備註',
        accessor: 'OPMNote',
        className: 'w-1/5 text-center',
        editable: true,
        editableComponentProps: { className: 'text-left', wrapperClassName: 'w-full ' },
      },
    ],
  },
  {
    id: 'waste',
    Header: () => (
      <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
        <div className="px-2">廢棄物</div>
        <div className="px-2 text-gray-400 text-sm">手動更新</div>
      </div>
    ),
    columns: [
      {
        Header: 'PIC',
        accessor: 'wastePIC',
        className: 'w-1/5 text-center',
        editable: true,
        editableComponentProps: { className: 'text-left', wrapperClassName: 'w-full ' },
      },
      {
        Header: '備註',
        accessor: 'wasteNote',
        className: 'w-1/5 text-center',
        editable: true,
        editableComponentProps: { className: 'text-left', wrapperClassName: 'w-full ' },
      },
    ],
  },
  {
    Header: '編輯',
    id: 'action',
    className: 'w-[10%] text-center',
    rowSpan: 0,
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableButton onClick={() => {}}>儲存</EditableButton>
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

export default function PicPage() {
  const { data: { data } = {} } = useGetDataStatusPicQuery();
  const [dataSource, setData] = useState(data);
  const columns = COLUMNS({ setData });
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
    <div className="row-span-2 col-span-7">
      <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-2">
        <div className="text-xl font-medium">資料維護 PIC</div>
        {data && (
          <div className="w-full flex flex-grow flex-col shadow overflow-auto rounded-t-lg">
            <EditableTable columns={columns} data={dataSource} updateMyData={updateMyData} />
          </div>
        )}
      </div>
    </div>
  );
}

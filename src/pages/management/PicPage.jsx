import { useState } from 'react';
import { useEffect } from 'react';

import { PencilIcon } from '@heroicons/react/solid';

import EditableTable, {
  AdSearchSelectCell,
  EditableButton,
  EditableIconButton,
} from '../../components/table/EditableTable';
import { useGetDataStatusPicQuery, usePatchDataStatusPicMutation } from '../../services/management';

const COLUMNS = ({ canEdit, userOptions, setData, patchDataStatusPic }) => [
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
        Cell: (cell) =>
          cell.row.original.editing ? (
            <AdSearchSelectCell
              options={userOptions}
              defaultValue={{ value: cell.row.original.OPMPIC, label: cell.row.original.OPMPIC }}
              onBlur={(e) =>
                setData((prev) => prev.map((d, i) => (cell.row.index === i ? { ...d, OPMPIC: e.label } : d)))
              }
            />
          ) : (
            cell.row.original.OPMPIC
          ),
      },
      {
        Header: '備註',
        accessor: 'OPMNote',
        className: 'w-1/5 text-center',
        editable: true,
        editableComponentProps: { className: 'text-left', wrapperClassName: 'w-full' },
      },
    ],
  },
  {
    id: 'waste',
    Header: () => (
      <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider h-11">
        <div className="px-2">廢棄物</div>
        <div className="px-2 text-gray-400 text-sm">手動更新</div>
      </div>
    ),
    columns: [
      {
        Header: 'PIC',
        accessor: 'wastePIC',
        className: 'w-1/5 text-center',
        Cell: (cell) =>
          cell.row.original.editing ? (
            <AdSearchSelectCell
              options={userOptions}
              defaultValue={{ value: cell.row.original.wastePIC, label: cell.row.original.wastePIC }}
              onBlur={(e) =>
                setData((prev) => prev.map((d, i) => (cell.row.index === i ? { ...d, wastePIC: e.label } : d)))
              }
            />
          ) : (
            cell.row.original.wastePIC
          ),
      },
      {
        Header: '備註',
        accessor: 'wasteNote',
        className: 'w-1/5 text-center',
        editable: true,
        editableComponentProps: { className: 'text-left', wrapperClassName: 'w-full' },
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
        <EditableButton
          onClick={() => {
            const { editing, ...rest } = cell.row.original;
            patchDataStatusPic(rest);
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

export default function PicPage({ canEdit, users }) {
  const { data: { data } = {} } = useGetDataStatusPicQuery();
  const [patchDataStatusPic] = usePatchDataStatusPicMutation();
  const [dataSource, setData] = useState(data);
  const userOptions = users.map(({ id, email }) => ({ value: id, label: email }));
  const columns = COLUMNS({ canEdit, userOptions, setData, patchDataStatusPic });
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

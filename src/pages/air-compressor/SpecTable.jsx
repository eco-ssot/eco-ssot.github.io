import { useCallback, useMemo, useRef, useState, useEffect } from 'react';

import { MenuAlt4Icon, PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTable } from 'react-table';

import { useGetSpecQuery } from '../../services/airCompressor';

const COLUMNS = [
  { Header: 'No.', accessor: 'id', isDndColumn: true, className: 'px-2 text-center' },
  { Header: '潤滑類型', accessor: 'oil_type', className: 'px-2' },
  { Header: '壓縮類型', accessor: 'press_type', className: 'px-2' },
  { Header: '運轉類型', accessor: 'run_type', className: 'px-2' },
  { Header: '額定功率', accessor: 'power_r', className: 'text-right px-2' },
  { Header: '額定排氣量', accessor: 'flow_r', className: 'text-right px-2' },
  { Header: '額定能效', accessor: 'eer_r', className: 'text-right px-2' },
  { Header: '購置新機費用', accessor: 'cost', className: 'text-right px-2' },
  { Header: '品牌 / 型號', accessor: 'other', className: 'text-left px-2' },
  {
    Header: '編輯',
    id: 'action',
    className: 'text-center px-4',
    Cell: (cell) => (
      <div className="flex items-center justify-center">
        <PencilIcon className="h-5 w-5 cursor-pointer" />
      </div>
    ),
  },
];

export default function SpecTable() {
  const { data } = useGetSpecQuery();
  const columns = useMemo(() => COLUMNS, []);
  const [_data, setData] = useState();

  useEffect(() => {
    if (data?.data) {
      setData(data.data);
    }
  }, [data?.data]);
  return (
    <div className="rounded-b bg-primary-900 p-8">
      <div className="flex flex-col overflow-auto rounded-t shadow">
        {_data && (
          <Table
            columns={columns}
            data={_data}
            getHeaderProps={(header) => ({ className: 'bg-primary-800 py-2' })}
            getRowProps={(row) => ({ className: 'border-b border-divider' })}
            getCellProps={(cell) => ({ className: 'py-2' })}
          />
        )}
      </div>
    </div>
  );
}

const DND_ITEM_TYPE = 'row';

const Row = ({ row, index, moveRow, getColumnProps, getCellProps, getRowProps, onDrop }) => {
  const dropRef = useRef(null);
  const dragRef = useRef(null);
  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover: (item, monitor) => {
      if (!dropRef.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop: onDrop,
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: DND_ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <tr ref={dropRef} {...row.getRowProps(getRowProps(row))}>
      {row.cells.map((cell) => {
        return (
          <td
            {...cell.getCellProps([
              {
                className: clsx('px-2 text-gray-50', cell.column.className),
                style: cell.column.style,
              },
              getColumnProps(cell.column),
              getCellProps(cell),
            ])}
            {...(cell.column.isDndColumn && { ref: dragRef })}>
            {cell.column.isDndColumn ? (
              <div
                className={clsx('group flex cursor-grab items-center justify-center', isDragging && 'cursor-grabbing')}>
                <MenuAlt4Icon className="hidden h-5 w-5 group-hover:block" />
                <div className="group-hover:hidden">{cell.render('Cell')}</div>
              </div>
            ) : (
              cell.render('Cell')
            )}
          </td>
        );
      })}
    </tr>
  );
};

const defaultPropGetter = () => ({});

function Table({
  columns = [],
  data = [],
  updateMyData = () => {},
  updateOrder = () => {},
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}) {
  const [records, setRecords] = useState(data);
  const getRowId = useCallback((row) => {
    return row.id;
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    getRowId,
    updateMyData,
    data: records,
  });

  const moveRow = (dragIndex, hoverIndex) => {
    setRecords((prev) => {
      const rec = [...prev];
      const dragRecord = rec[dragIndex];
      rec.splice(dragIndex, 1);
      rec.splice(hoverIndex, 0, dragRecord);
      return rec;
    });
  };

  const onDrop = () => {
    updateOrder(records);
  };

  useEffect(() => {
    data && setRecords(data);
  }, [data]);

  return (
    <DndProvider backend={HTML5Backend}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    {...column.getHeaderProps([
                      {
                        className: clsx(
                          'px-2 py-1 text-center font-medium text-gray-50 tracking-wider',
                          column.className
                        ),
                        style: column.style,
                        rowSpan: column.rowSpan,
                      },
                      getColumnProps(column),
                      getHeaderProps(column),
                    ])}>
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <Row
                index={index}
                row={row}
                moveRow={moveRow}
                getColumnProps={getColumnProps}
                getCellProps={getCellProps}
                getRowProps={getRowProps}
                onDrop={onDrop}
                {...row.getRowProps()}
              />
            );
          })}
        </tbody>
      </table>
    </DndProvider>
  );
}

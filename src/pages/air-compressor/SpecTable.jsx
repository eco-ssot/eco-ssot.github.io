import { useCallback, useMemo, useRef, useState, useEffect } from 'react';

import { CheckIcon, PlusIcon, XIcon } from '@heroicons/react/outline';
import { MenuAlt4Icon, PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTable } from 'react-table';

import Button from '../../components/button/Button';
import Ellipsis from '../../components/ellipsis/Ellipsis';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import {
  useGetAirCompressListQuery,
  useGetSpecQuery,
  usePatchSpecMutation,
  usePostSpecMutation,
} from '../../services/airCompressor';
import { baseFormatter } from '../../utils/formatter';
import { trimNumber } from '../../utils/number';

const COLUMNS = ({ setData, snapshotRef, oilOptions, compressOptions, runOptions }) => [
  {
    Header: 'No.',
    accessor: 'order',
    isDndColumn: true,
    className: 'px-2 text-center',
    Cell: (cell) => cell.row.index + 1,
  },
  {
    Header: '潤滑類型',
    accessor: 'oil_type',
    className: 'px-2 text-center',
    Cell: (cell) => {
      if (cell.row.original.editing) {
        return (
          <Select
            strategy="fixed"
            options={oilOptions}
            selected={oilOptions.find((option) => option.key === cell.row.original.oil_type)}
            onChange={(e) =>
              setData((prev) => prev.map((d) => (d.id === cell.row.original.id ? { ...d, oil_type: e.key } : d)))
            }
          />
        );
      }

      return cell.value;
    },
  },
  {
    Header: '壓縮類型',
    accessor: 'compress_type',
    className: 'px-2 text-center',
    Cell: (cell) => {
      if (cell.row.original.editing) {
        return (
          <Select
            strategy="fixed"
            options={compressOptions}
            selected={oilOptions.find((option) => option.key === cell.row.original.press_type)}
            onChange={(e) =>
              setData((prev) => prev.map((d) => (d.id === cell.row.original.id ? { ...d, press_type: e.key } : d)))
            }
          />
        );
      }

      return cell.value;
    },
  },
  {
    Header: '運轉類型',
    accessor: 'run_type',
    className: 'px-2 text-center',
    Cell: (cell) => {
      if (cell.row.original.editing) {
        return (
          <Select
            strategy="fixed"
            options={runOptions}
            selected={oilOptions.find((option) => option.key === cell.row.original.run_type)}
            onChange={(e) =>
              setData((prev) => prev.map((d) => (d.id === cell.row.original.id ? { ...d, run_type: e.key } : d)))
            }
          />
        );
      }

      return cell.value;
    },
  },
  {
    Header: '額定功率',
    accessor: 'power',
    className: 'text-right px-2',
    Cell: (cell) => {
      const [value, setValue] = useState(cell.value || '');
      if (cell.row.original.editing) {
        return (
          <Input
            value={value}
            className="text-right"
            onChange={(e) => setValue(e.target.value)}
            onBlur={() =>
              setData((prev) =>
                prev.map((d) => (d.id === cell.row.original.id ? { ...d, power: trimNumber(value) } : d))
              )
            }
          />
        );
      }

      return baseFormatter(cell.value);
    },
  },
  {
    Header: '額定排氣量',
    accessor: 'engine_depcmemt',
    className: 'text-right px-2',
    Cell: (cell) => {
      const [value, setValue] = useState(cell.value || '');
      if (cell.row.original.editing) {
        return (
          <Input
            value={value}
            className="text-right"
            onChange={(e) => setValue(e.target.value)}
            onBlur={() =>
              setData((prev) =>
                prev.map((d) => (d.id === cell.row.original.id ? { ...d, engine_depcmemt: trimNumber(value) } : d))
              )
            }
          />
        );
      }

      return baseFormatter(cell.value, { precision: 2 });
    },
  },
  {
    Header: '額定能效',
    accessor: 'eer_r',
    className: 'text-right px-2',
    Cell: (cell) => {
      const [value, setValue] = useState(cell.value || '');
      if (cell.row.original.editing) {
        return (
          <Input
            value={value}
            className="text-right"
            onChange={(e) => setValue(e.target.value)}
            onBlur={() =>
              setData((prev) =>
                prev.map((d) => (d.id === cell.row.original.id ? { ...d, eer_r: trimNumber(value) } : d))
              )
            }
          />
        );
      }

      return baseFormatter(cell.value, { precision: 2 });
    },
  },
  {
    Header: '購置新機費用',
    accessor: 'cost',
    className: 'text-right px-2',
    Cell: (cell) => {
      const [value, setValue] = useState(cell.value || '');
      if (cell.row.original.editing) {
        return (
          <Input
            value={value}
            className="text-right"
            onChange={(e) => setValue(e.target.value)}
            onBlur={() =>
              setData((prev) =>
                prev.map((d) => (d.id === cell.row.original.id ? { ...d, cost: trimNumber(value) } : d))
              )
            }
          />
        );
      }

      return baseFormatter(cell.value);
    },
  },
  {
    Header: '品牌 / 型號',
    accessor: 'model_number',
    className: 'text-left px-2 max-w-48 truncate',
    Cell: (cell) => {
      const [value, setValue] = useState(cell.value || '');
      if (cell.row.original.editing) {
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() =>
              setData((prev) => prev.map((d) => (d.id === cell.row.original.id ? { ...d, model_number: value } : d)))
            }
          />
        );
      }

      return <Ellipsis label={cell.value} />;
    },
  },
  {
    Header: '編輯',
    id: 'action',
    className: 'text-center px-4',
    Cell: (cell) => {
      const [postSpec] = usePostSpecMutation();
      const [patchSpec] = usePatchSpecMutation();
      return (
        <div className="flex items-center justify-center space-x-2 pr-2">
          {cell.row.original.editing ? (
            <>
              <CheckIcon
                className="h-5 w-5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  const { id, editing, isNew, order, ...rest } = cell.row.original;
                  const defaultPayloads = {
                    oil_type: rest.oil_type || oilOptions?.[0]?.key,
                    compress_type: rest.press_type || compressOptions?.[0]?.key,
                    run_type: rest.run_type || runOptions?.[0]?.key,
                  };

                  if (isNew) {
                    postSpec({
                      ...rest,
                      ...defaultPayloads,
                    });
                  } else {
                    patchSpec({
                      id,
                      ...rest,
                      ...defaultPayloads,
                    });
                  }

                  setData((prev) =>
                    prev.map((d) =>
                      d.id === cell.row.original.id ? { ...d, ...defaultPayloads, editing: false, isNew: false } : d
                    )
                  );
                }}
              />
              <XIcon
                className="h-5 w-5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  cell.row.original.isNew
                    ? setData((prev) => prev.filter((d) => d.id !== cell.row.original.id))
                    : setData((prev) =>
                        prev.map((d) =>
                          d.id === cell.row.original.id ? { ...(snapshotRef.current[d.id] || d), editing: false } : d
                        )
                      );
                }}
              />
            </>
          ) : (
            <>
              <div className="h-5 w-5"></div>
              <PencilIcon
                className="h-5 w-5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setData((prev) => prev.map((d) => (d.id === cell.row.original.id ? { ...d, editing: true } : d)));
                }}
              />
            </>
          )}
        </div>
      );
    },
  },
];

export default function SpecTable({ close, setSearchOption }) {
  const { data } = useGetSpecQuery();
  const { data: list } = useGetAirCompressListQuery();
  const [_data, setData] = useState();
  const snapshotRef = useRef();
  const oilOptions = useMemo(
    () => list?.oil_type?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [list?.oil_type]
  );

  const compressOptions = useMemo(
    () => list?.compress_type?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [list?.compress_type]
  );

  const runOptions = useMemo(
    () => list?.run_type?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [list?.run_type]
  );

  const columns = useMemo(
    () => COLUMNS({ setData, snapshotRef, oilOptions, compressOptions, runOptions }),
    [oilOptions, compressOptions, runOptions]
  );

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  useEffect(() => {
    if (data?.data) {
      setData(data.data);
      snapshotRef.current = Object.entries(data.data).reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});
    }
  }, [data?.data]);

  useEffect(() => {
    setSelectedRowIndex(-1);
  }, [_data]);

  return (
    <div className="space-y-4 rounded-b bg-primary-900 p-8 text-center">
      <div className="flex max-h-[75vh] min-h-64 flex-col overflow-auto rounded-t shadow">
        {_data && (
          <Table
            columns={columns}
            data={_data}
            getHeaderProps={(header) => ({ className: 'bg-primary-800 py-2' })}
            getRowProps={(row) => ({
              className: clsx(
                'border-b border-divider',
                selectedRowIndex === row.index && 'bg-primary-800/80',
                row.original.editing || row.original.isNew ? 'cursor-default' : 'cursor-pointer'
              ),
              onClick: () =>
                !row.original.editing &&
                !row.original.isNew &&
                setSelectedRowIndex((prev) => (prev === row.index ? -1 : row.index)),
            })}
            getCellProps={(cell) => ({ className: 'py-2' })}
            updateMyData={setData}
            updateOrder={setData}
          />
        )}
      </div>
      <Button
        className={clsx(selectedRowIndex < 0 && 'pointer-events-none opacity-50')}
        onClick={() => {
          setSearchOption(_data?.[selectedRowIndex]);
          close();
        }}>
        匯入
      </Button>
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

  const [, drag, preview] = useDrag({
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
                className: clsx(
                  'px-2 text-gray-50',
                  cell.column.isDndColumn && 'group cursor-grab',
                  cell.column.className
                ),
                style: cell.column.style,
              },
              getColumnProps(cell.column),
              getCellProps(cell),
            ])}
            {...(cell.column.isDndColumn && { ref: dragRef })}>
            {cell.column.isDndColumn ? (
              <div className={clsx('flex items-center justify-center')}>
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
    <>
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
                            'px-2 py-1 text-center font-medium text-gray-50 tracking-wider top-0 sticky z-10',
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
            <tr>
              <td colSpan={columns.length} className="border-b border-divider py-3">
                <div className="flex justify-center">
                  <div
                    className="group flex w-fit cursor-pointer items-center space-x-1"
                    onClick={() =>
                      updateMyData((prev) =>
                        prev.concat({ id: nanoid(), order: rows.length, isNew: true, editing: true })
                      )
                    }>
                    <PlusIcon className="h-5 w-5 text-gray-300 group-hover:text-gray-50" />
                    <div className="text-gray-300 group-hover:text-gray-50">新增常用新機台規格</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </DndProvider>
    </>
  );
}

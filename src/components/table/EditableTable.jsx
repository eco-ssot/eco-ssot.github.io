import { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import clsx from 'clsx';
import { PlusIcon } from '@heroicons/react/solid';

import Input from '../../components/input/Input';
import IconButton from '../button/IconButton';

const EditableCell = ({
  value: initialValue,
  row: {
    index,
    original: { editing },
  },
  column: { id, editable, placeholder },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return editable && editing ? (
    <Input value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} />
  ) : (
    <>{value}</>
  );
};

const defaultColumn = {
  Cell: EditableCell,
};

const defaultPropGetter = () => ({});

export default function EditableTable({
  columns = [],
  data = [],
  updateMyData = () => {},
  setData = () => {},
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data,
    defaultColumn,
    updateMyData,
  });

  return (
    <>
      <table {...getTableProps()}>
        <thead className="bg-primary-800">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps([
                    {
                      className: clsx(
                        'w-1 px-2 py-3 text-center font-medium text-gray-50 tracking-wider whitespace-nowrap',
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
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps(getRowProps(row))}>
                {row.cells.map((cell, i) => {
                  if (
                    (cell.column.rowSpan && cell.row.index > 0) ||
                    (cell.row.original.id === 'addRow' && i > cell.row.original.startIndex)
                  ) {
                    return null;
                  }

                  return (
                    <td
                      {...cell.getCellProps([
                        {
                          className: clsx(
                            'px-2 text-gray-50 text-center whitespace-nowrap',
                            cell.column.editable || cell.column.id === 'action' ? 'py-0' : 'py-3',
                            cell.column.className
                          ),
                          style: cell.column.style,
                        },
                        getColumnProps(cell.column),
                        getCellProps(cell),
                      ])}
                      {...(cell.column.rowSpan &&
                        cell.row.index === 0 && { rowSpan: cell.column.rowSpan })}
                      {...(cell.row.original.id === 'addRow' &&
                        i === cell.row.original.startIndex && {
                          colSpan: cell.row.original.colSpan,
                        })}>
                      {cell.row.original.id === 'addRow' && i === cell.row.original.startIndex ? (
                        <IconButton
                          onClick={() =>
                            setData((prev) => {
                              const action = prev.slice(-1);
                              return [...prev.slice(0, -1), { editing: true }, ...action];
                            })
                          }>
                          <PlusIcon className="w-5 h-5" />
                        </IconButton>
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

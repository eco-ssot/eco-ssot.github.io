import { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import clsx from 'clsx';
import { PlusIcon } from '@heroicons/react/solid';
import { isNil } from 'lodash';

import Input from '../input/Input';
import Button from '../button/Button';
import IconButton from '../button/IconButton';
import Textarea from '../textarea/Textarea';
import { getDecimalNumber } from '../../utils/number';
import APP_CONFIG from '../../constants/app-config';

export const EditableButton = ({ children, onClick = () => {}, ...props }) => (
  <Button onMouseDown={() => document.activeElement?.blur()} onMouseUp={onClick} {...props}>
    {children}
  </Button>
);

export const EditableIconButton = ({ children, onClick = () => {}, ...props }) => (
  <IconButton onMouseDown={() => document.activeElement?.blur()} onMouseUp={onClick} {...props}>
    {children}
  </IconButton>
);

export const CustomInputCell = ({ defaultValue = '', placeholder = '', onBlur = () => {} }) => {
  const [match] = defaultValue.match(/下降|占比|佔比/) || [];
  const decimalNumber = getDecimalNumber(defaultValue);
  const [inputValue, setInputValue] = useState(decimalNumber);
  const prefix = /占比|佔比/.test(match) ? `${match} >` : match;
  const suffix = '%';
  useEffect(() => {
    setInputValue(decimalNumber);
  }, [match, decimalNumber]);

  return (
    <Input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={(e) => onBlur([prefix, e.target.value, suffix].join(' '))}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

export const InputCell = ({ defaultValue = '', placeholder = '', onBlur = () => {} }) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return <Input value={value} onChange={onChange} onBlur={() => onBlur(value)} placeholder={placeholder} />;
};

export const TextareaCell = ({ defaultValue = '', placeholder = '', onBlur = () => {} }) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return <Textarea value={value} onChange={onChange} onBlur={() => onBlur(value)} placeholder={placeholder} />;
};

const EditableCell = ({
  value: initialValue,
  row: {
    index,
    original: { editing, category },
  },
  column: { id, editable, placeholder, precision = 0, formatter = (val) => val, EditableComponent = InputCell },
  updateMyData,
}) => {
  const onBlur = (value) => {
    updateMyData(index, id, value);
  };

  return editable && editing ? (
    <EditableComponent defaultValue={initialValue} placeholder={placeholder} onBlur={onBlur} />
  ) : (
    <>
      {isNil(initialValue) || initialValue === ''
        ? id === 'baseYear'
          ? category === '可再生能源'
            ? APP_CONFIG.CURRENT_YEAR
            : APP_CONFIG.LAST_YEAR
          : '-'
        : formatter(initialValue, { precision, ...(category === '碳排放量' && { precision: 0 }) })}
    </>
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
    <table {...getTableProps()}>
      <thead className="bg-primary-800">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps([
                  {
                    className: clsx(
                      'px-2 py-3 font-medium text-left text-gray-50 tracking-wider whitespace-nowrap',
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
                        className: clsx('px-2 text-gray-50', cell.column.className),
                        style: cell.column.style,
                      },
                      getColumnProps(cell.column),
                      getCellProps(cell),
                    ])}
                    {...(cell.column.rowSpan && cell.row.index === 0 && { rowSpan: cell.column.rowSpan })}
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
  );
}

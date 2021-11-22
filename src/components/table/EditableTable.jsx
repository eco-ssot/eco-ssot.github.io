import { useState, useEffect, useRef } from 'react';

import { PlusIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { isNil } from 'lodash';
import { useTable } from 'react-table';

import APP_CONFIG from '../../constants/app-config';
import { formatTarget } from '../../pages/management/helpers';
import { getDecimalNumber } from '../../utils/number';
import Button from '../button/Button';
import IconButton from '../button/IconButton';
import Input from '../input/Input';
import AdSearchSelect from '../select/AdSearchSelect';
import Textarea from '../textarea/Textarea';

const DICTIONARY = {
  下降: '-',
  '占比 >': '>',
  '佔比 >': '>',
};

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

export const EditableInput = ({
  className,
  containerClassName,
  wrapperClassName,
  suffix = '',
  prefix = '',
  ...props
}) => (
  <div className={clsx('flex h-full', containerClassName)}>
    <div className={clsx('mx-auto h-full relative', wrapperClassName)}>
      <Input className={clsx(className)} {...props} />
      {prefix && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{prefix}</div>}
      {suffix && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{suffix}</div>}
    </div>
  </div>
);

export const CustomInputCell = ({ defaultValue = '', placeholder = '', lng = 'en', onBlur = () => {}, ...props }) => {
  const [match] = defaultValue.match(/下降|占比|佔比/) || [];
  const decimalNumber = getDecimalNumber(defaultValue);
  const [inputValue, setInputValue] = useState(decimalNumber);
  const prefix = /占比|佔比/.test(match) ? `${match} >` : match;
  const suffix = '%';
  useEffect(() => {
    setInputValue(decimalNumber);
  }, [match, decimalNumber]);

  return (
    <EditableInput
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={(e) => onBlur([prefix, e.target.value, suffix].join(' '))}
      placeholder={placeholder}
      prefix={lng === 'en' ? DICTIONARY[prefix] || prefix : prefix}
      suffix={suffix}
      {...props}
    />
  );
};

export const InputCell = ({ defaultValue = '', placeholder = '', onBlur = () => {}, ...props }) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <EditableInput
      value={value}
      onChange={onChange}
      onBlur={() => onBlur(value)}
      placeholder={placeholder}
      {...props}
    />
  );
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

export const AdSearchSelectCell = ({
  options = [],
  defaultValue = {},
  label = '',
  placeholder = '',
  onBlur = () => {},
} = {}) => {
  const ref = useRef(defaultValue);
  return (
    <AdSearchSelect
      options={options}
      defaultValue={defaultValue}
      onChange={(e) => (ref.current = e)}
      label={label}
      onBlur={() => onBlur(ref.current)}
      placeholder={placeholder}
    />
  );
};

const EditableCell = ({
  value: initialValue,
  row: {
    index,
    original: { editing, category },
  },
  column: {
    lng,
    id,
    editable,
    placeholder,
    precision = 0,
    formatter = (val) => val,
    EditableComponent = InputCell,
    editableComponentProps = {},
  },
  updateMyData,
}) => {
  const onBlur = (value) => {
    updateMyData(index, id, value);
  };

  return editable && editing ? (
    <EditableComponent
      defaultValue={initialValue}
      placeholder={placeholder}
      onBlur={onBlur}
      className="text-center"
      {...editableComponentProps}
    />
  ) : (
    <>
      {isNil(initialValue) || initialValue === ''
        ? id === 'baseYear'
          ? category === '可再生能源'
            ? APP_CONFIG.CURRENT_YEAR
            : APP_CONFIG.LAST_YEAR
          : '-'
        : id === 'target'
        ? formatTarget(initialValue, lng)
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
  stickyHeader = true,
}) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data,
    defaultColumn,
    updateMyData,
  });

  return (
    <table {...getTableProps()}>
      <thead className={clsx('bg-primary-800 ', stickyHeader && 'sticky top-0 z-1')}>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              if (column.rowSpan === 0 && headerGroups.length > 1) {
                return null;
              }

              return (
                <th
                  {...column.getHeaderProps([
                    {
                      className: clsx(
                        'text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap',
                        headerGroups.length === 1 && 'py-3',
                        headerGroups.length > 1 && i > 0 && 'py-3',
                        !column.id.startsWith('expander') && 'px-2',
                        column.className
                      ),
                      style: column.style,
                      rowSpan: column.rowSpan,
                    },
                    getColumnProps(column),
                    getHeaderProps(column),
                  ])}
                  {...(column.placeholderOf && { rowSpan: 2 })}>
                  {column.placeholderOf ? column.placeholderOf.Header : column.render('Header')}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps({
                ...getRowProps(row),
                className: clsx(
                  row.original.isFooter ? 'border-b-2 border-t-2 border-primary-600' : 'border-b border-divider',
                  getRowProps(row).className
                ),
              })}>
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
                        className: clsx('px-2 text-gray-50 text-lg', cell.column.className),
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

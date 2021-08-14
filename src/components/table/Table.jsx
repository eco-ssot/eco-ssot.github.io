import { useTable, useExpanded } from 'react-table';
import clsx from 'clsx';

import Triangle from '../../components/triangle/Triangle';

const defaultPropGetter = () => ({});

export default function Table({
  columns = [],
  data = [],
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useExpanded
  );

  console.log({ headerGroups });
  return (
    <table {...getTableProps()}>
      <thead className="bg-primary-800">
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              if (column.rowSpan === 0) {
                return null;
              }

              return (
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
                  ])}
                  {...(column.placeholderOf && { rowSpan: 2 })}>
                  {column.placeholderOf ? column.placeholderOf.Header : column.render('Header')}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="bg-transparent">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps(getRowProps(row))}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps([
                      {
                        className: clsx(
                          'px-2 py-3 text-gray-50 text-center',
                          row.depth > 0 && 'bg-primary-600 bg-opacity-20',
                          row.depth > 0 && row.index === 0 && 'border-t border-primary-600',
                          row.depth > 0 &&
                            row.id.includes('.') &&
                            !(row[row.index + 1] || { id: '' }).id.includes('.') &&
                            'border-b border-primary-600',
                          cell.column.className
                        ),
                        style: cell.column.style,
                      },
                      getColumnProps(cell.column),
                      getCellProps(cell),
                    ])}>
                    {cell.column.id.startsWith('expander') && row.id.includes('.') && (
                      <Triangle className="ml-5" />
                    )}
                    {cell.render('Cell')}
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

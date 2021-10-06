import clsx from 'clsx';
import { useTable, useExpanded } from 'react-table';

import Triangle from '../triangle/Triangle';

const defaultPropGetter = () => ({});

export default function Table({
  columns = [],
  data = [],
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  stickyHeader = true,
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useExpanded
  );

  return (
    <table {...getTableProps()}>
      <thead className={clsx('bg-primary-800 ', stickyHeader && 'sticky top-0')}>
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
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps([
                      {
                        className: clsx(
                          'py-3 text-gray-50 text-center text-lg',
                          !cell.column.id.startsWith('expander') && 'px-2',
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
                      <div className="flex justify-center">
                        <Triangle />
                      </div>
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

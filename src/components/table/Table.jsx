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
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded
  );

  const expandedRows = Object.keys(expanded).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: rows.find((row) => row.id === curr).subRows.map((subRow) => subRow.id),
    }),
    {}
  );

  return (
    <table {...getTableProps()}>
      <thead className="bg-header">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              return (
                <th
                  // Return an array of prop objects and react-table will merge them appropriately
                  {...column.getHeaderProps([
                    {
                      className: clsx(
                        'px-2 py-3 text-center font-medium text-white tracking-wider whitespace-nowrap',
                        column.className
                      ),
                      style: column.style,
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
      <tbody {...getTableBodyProps()} className="bg-transparent">
        {rows.map((row) => {
          prepareRow(row);
          const [rowId, subRowId] = row.id.split('.');
          return (
            // Merge user row props in
            <tr {...row.getRowProps(getRowProps(row))}>
              {row.cells.map((cell) => {
                return (
                  <td
                    // Return an array of prop objects and react-table will merge them appropriately
                    {...cell.getCellProps([
                      {
                        className: clsx(
                          'px-2 py-3 text-center whitespace-nowrap text-gray-50',
                          cell.column.id.startsWith('expander') && 'pl-4',
                          row.depth > 0 && 'pl-8 bg-header bg-opacity-50',
                          row.depth > 0 &&
                            expandedRows[rowId][0] === `${rowId}.${subRowId}` &&
                            'border-t border-primary-500',
                          row.depth > 0 &&
                            expandedRows[rowId].slice(-1)[0] === `${rowId}.${subRowId}` &&
                            'border-b border-primary-500',
                          cell.column.className
                        ),
                        style: cell.column.style,
                      },
                      getColumnProps(cell.column),
                      getCellProps(cell),
                    ])}>
                    {cell.column.id.startsWith('expander') && subRowId && <Triangle />}
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

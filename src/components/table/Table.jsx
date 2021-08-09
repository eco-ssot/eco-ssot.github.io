import { useTable } from 'react-table';
import clsx from 'clsx';

const defaultPropGetter = () => ({});

export default function Table({
  columns = [],
  data = [],
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="flex flex-col shadow overflow-auto rounded-t-lg">
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
        <thead className="bg-header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  // Return an array of prop objects and react-table will merge them appropriately
                  {...column.getHeaderProps([
                    {
                      className: clsx(
                        'px-6 py-3 text-center font-medium text-white uppercase tracking-wider',
                        column.className
                      ),
                      style: column.style,
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
        <tbody {...getTableBodyProps()} className="bg-transparent">
          {rows.map((row) => {
            prepareRow(row);
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
                            'px-6 py-4 text-center whitespace-nowrap text-gray-50',
                            cell.column.className
                          ),
                          style: cell.column.style,
                        },
                        getColumnProps(cell.column),
                        getCellProps(cell),
                      ])}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

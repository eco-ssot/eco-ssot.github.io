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
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        // Return an array of prop objects and react-table will merge them appropriately
                        {...column.getHeaderProps([
                          {
                            className: clsx(
                              'px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider',
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
              <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                {rows.map((row, i) => {
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
                                  'px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500',
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
        </div>
      </div>
    </div>
  );
}

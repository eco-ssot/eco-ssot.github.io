import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';

import Dot from '../../components/dot/Dot';
import { toFormattedNumber } from '../../utils/number';

export const COLUMNS = ({ t, latestDate, yearOrder }) => {
  const year = new Date(latestDate).getFullYear();
  const NAME_URL_MAPPING = {
    總電量: '/electricity',
    碳排放: '/carbon',
    節能耗電: '/analysis/electricity#POWER_SAVING',
    可再生能源: '/renewable-energy',
  };
  return [
    {
      Header: t('decarbonizationPage:category'),
      accessor: 'item',
      className: 'text-left p-3',
      Cell: (cell) => {
        return <Link to={NAME_URL_MAPPING[cell.value]}>{cell.value}</Link>;
      },
    },
    { Header: t('decarbonizationPage:base'), accessor: 'main', className: 'text-left p-3' },
    { Header: t('decarbonizationPage:detail'), accessor: 'detail', className: 'text-left p-3' },
    {
      Header: year + t('decarbonizationPage:ytm'),
      accessor: 'actuals',
      className: 'text-right w-40 p-3',
      Cell: (cell) => {
        if (cell.value[0] !== undefined) {
          return (
            <div className="flex items-center justify-end space-x-2">
              <Dot color="bg-dangerous-500" />
              <div className="text-right">
                {toFormattedNumber(
                  cell.value[0].amount,
                  cell.value[0].unit ? { suffix: cell.value[0].unit, precision: 1 } : ''
                )}
              </div>
            </div>
          );
        } else {
          return (
            <div className="flex items-center justify-end space-x-2">
              <Dot color="bg-green-500" />
              <div className="text-right">
                {/* {toFormattedNumber(cell.value[0].amount, cell.value[0].unit ? { suffix: cell.value[0].unit, precision: 1 } : '')} */}
              </div>
            </div>
          );
        }
      },
    },
  ].concat(
    yearOrder?.map((year) => {
      return {
        Header: year.replace('12', t('decarbonizationPage:year')),
        accessor: String(year),
        className: 'text-right w-32 p-3',
        Cell: (cell) => {
          if (cell.value.unit === '億度') {
            return toFormattedNumber(
              cell.value.amount,
              cell.value.unit ? { suffix: ' ' + cell.value.unit, precision: 1 } : ''
            );
          } else if (cell.value.unit === '噸' || cell.value.unit === 'MWH') {
            return toFormattedNumber(cell.value.amount, cell.value.unit ? { suffix: ' ' + cell.value.unit } : '');
          } else {
            return toFormattedNumber(
              cell.value.amount,
              cell.value.unit ? { suffix: ' ' + cell.value.unit, precision: 1 } : ''
            );
          }
        },
      };
    })
  );
};

const defaultPropGetter = () => ({});

export default function DecarbonizationTable({
  columns,
  data,
  latestDate,
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
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps([
                  {
                    className: column.className,
                    style: column.style,
                  },
                  getColumnProps(column),
                  getHeaderProps(column),
                ])}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps(getRowProps(row))}>
              {row.cells.map((cell, j) => {
                let rowSpan = null;
                if (j === 0) {
                  if (i === 1 || i === 8) {
                    rowSpan = 5;
                  } else if (i === 6) {
                    rowSpan = 2;
                  } else if (i === 0) {
                    rowSpan = 1;
                  } else {
                    return null;
                  }
                }
                if (j === 1) {
                  if (i === 1) {
                    rowSpan = 3;
                  } else if (i === 4 || i === 6) {
                    rowSpan = 2;
                  } else if (i === 8) {
                    rowSpan = 5;
                  } else if (i === 0) {
                    rowSpan = 1;
                  } else {
                    return null;
                  }
                }

                return (
                  <td
                    {...cell.getCellProps([
                      {
                        className: clsx(
                          cell.column.className,
                          rowSpan === 5 ||
                            rowSpan === 2 ||
                            cell.row.id === '0' ||
                            cell.row.id === '5' ||
                            cell.row.id === '7' ||
                            cell.row.id === '12'
                            ? 'align-top border-b-2  border-primary-600'
                            : 'align-top'
                        ),
                        style: cell.column.style,
                      },
                      getColumnProps(cell.column),
                      getCellProps(cell),
                    ])}
                    {...(rowSpan && { rowSpan })}
                  >
                    <div
                      className={
                        j === 0
                          ? ' decoration-white-600 cursor-pointer underline underline-offset-4'
                          : 'cursor-default' && cell.column.Header.split(' ')[0] < new Date(latestDate).getFullYear()
                          ? 'opacity-60'
                          : ''
                      }
                    >
                      {cell.render('Cell')}
                    </div>
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

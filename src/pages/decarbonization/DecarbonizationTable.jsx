import clsx from 'clsx';
import { useTable } from 'react-table';

import Dot from '../../components/dot/Dot';
import MyNavLink from '../../router/MyNavLink';
import { toFormattedNumber } from '../../utils/number';

export const COLUMNS = ({ t, yearOrder }) => {
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
        return (
          <MyNavLink
            to={{ pathname: NAME_URL_MAPPING[cell.value], state: { from: '/decarbonization', replace: true } }}
          >
            {cell.value}
          </MyNavLink>
        );
      },
    },
    { Header: t('decarbonizationPage:base'), accessor: 'main', className: 'text-left p-3' },
    { Header: t('decarbonizationPage:detail'), accessor: 'detail', className: 'text-left p-3' },
  ].concat(
    yearOrder?.map((year) => {
      return {
        Header: year.match('12')
          ? year.replace('12', t('decarbonizationPage:year'))
          : year.replace('11', t('decarbonizationPage:ytm')),
        accessor: String(year),
        className: 'text-right w-36 p-3',
        Cell: (cell) => {
          if (cell.value?.unit === '億度') {
            if (year.match('11')) {
              return (
                <div className="flex items-center justify-end space-x-2">
                  <Dot color="bg-green-500" />
                  <div className="text-right">
                    {toFormattedNumber(
                      cell.value?.amount,
                      cell.value?.unit ? { suffix: ' ' + cell.value?.unit, precision: 1 } : ''
                    )}
                  </div>
                </div>
              );
            } else {
              return toFormattedNumber(
                cell.value?.amount,
                cell.value?.unit ? { suffix: ' ' + cell.value?.unit, precision: 1 } : ''
              );
            }
          } else if (cell.value?.unit === '噸' || cell.value?.unit === 'MWH') {
            if (year.match('11')) {
              return (
                <div className="flex items-center justify-end space-x-2">
                  <Dot color="bg-green-500" />
                  <div className="text-right">
                    {toFormattedNumber(cell.value?.amount, cell.value?.unit ? { suffix: ' ' + cell.value?.unit } : '')}
                  </div>
                </div>
              );
            } else {
              return toFormattedNumber(cell.value?.amount, cell.value?.unit ? { suffix: ' ' + cell.value?.unit } : '');
            }
          } else if (cell.value?.unit === '%') {
            if (year.match('11')) {
              return (
                <div className="flex items-center justify-end space-x-2">
                  <Dot color="bg-green-500" />
                  <div className="text-right">
                    {toFormattedNumber(
                      cell.value?.amount,
                      cell.value?.unit ? { suffix: ' ' + cell.value?.unit, precision: 1 } : ''
                    )}
                  </div>
                </div>
              );
            } else {
              return toFormattedNumber(
                cell.value?.amount,
                cell.value?.unit ? { suffix: ' ' + cell.value?.unit, precision: 1 } : ''
              );
            }
          } else {
            if (year.match('11')) {
              return (
                <div className="flex items-center justify-end space-x-2">
                  <Dot color="bg-white" animation={false} />
                  <div className="text-right">-</div>
                </div>
              );
            }
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
                    className: clsx(
                      column.className,
                      'sticky top-0 text-lg font-medium tracking-wider whitespace-nowrap'
                    ),
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
                const rowSpan = cell.row.original.rowSpan?.[cell.column.id];
                if (rowSpan === 0) {
                  return null;
                }

                return (
                  <td
                    {...cell.getCellProps([
                      {
                        className: clsx(
                          'text-lg',
                          cell.column.className,
                          rowSpan && 'align-top',
                          i > 0 && row.original.item !== rows[i - 1]?.original?.item && 'border-t-2 border-primary-600'
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

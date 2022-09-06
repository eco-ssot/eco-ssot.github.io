import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';

import Dot from '../../components/dot/Dot';
import { toFormattedNumber } from '../../utils/number';

export const COLUMNS = ({ t, latestDate }) => {
  const year = new Date(latestDate).getFullYear();
  return [
    {
      Header: t('decarbonizationPage:category'),
      accessor: 'item',
      className: 'text-left p-3',
      Cell: (cell) => {
        if (cell.value === '總電量') {
          const titleUrl = '/electricity';
          return <Link to={titleUrl}>{cell.value}</Link>;
        } else if (cell.value === '碳排放') {
          const titleUrl = '/carbon';
          return <Link to={titleUrl}>{cell.value}</Link>;
        } else if (cell.value === '節能耗電') {
          const titleUrl = '/analysis/electricity#POWER_SAVING';
          return <Link to={titleUrl}>{cell.value}</Link>;
        } else if (cell.value === '可再生能源') {
          const titleUrl = '/renewable-energy';
          return <Link to={titleUrl}>{cell.value}</Link>;
        } else {
          const titleUrl = '';
          return <Link to={titleUrl}>{cell.value}</Link>;
        }
      },
    },
    { Header: t('decarbonizationPage:base'), accessor: 'main', className: 'text-left p-3' },
    { Header: t('decarbonizationPage:detail'), accessor: 'detail', className: 'text-left p-3' },
    {
      Header: year + t('decarbonizationPage:ytm'),
      accessor: 'ytm' + year,
      className: 'text-right w-40 p-3',
      Cell: (cell) => {
        if (cell.row.original.status === 0) {
          return (
            <div className="flex items-center justify-end space-x-2">
              <Dot color="bg-dangerous-500" />
              <div className="text-right">
                {toFormattedNumber(
                  cell.value,
                  cell.value > 100000
                    ? { unit: 1e8, suffix: '億度', precision: 1 }
                    : {} && (cell.value === 0 || cell.value > 1)
                    ? ''
                    : { unit: 1e-2, suffix: '%', precision: 2 }
                )}
              </div>
            </div>
          );
        } else if (cell.row.original.status === 1) {
          return (
            <div className="flex items-center justify-end space-x-2">
              <Dot color="bg-yellow-500" />
              <div className="text-right">
                {toFormattedNumber(
                  cell.value,
                  cell.value > 100000
                    ? { unit: 1e8, suffix: '億度', precision: 1 }
                    : ('' && '' && cell.value === 0) || cell.value > 1
                    ? ''
                    : { unit: 1e-2, suffix: '%', precision: 2 }
                )}
              </div>
            </div>
          );
        } else {
          return (
            <div className="flex items-center justify-end space-x-2">
              <Dot color="bg-green-500" />
              <div className="text-right">
                {toFormattedNumber(
                  cell.value,
                  cell.value > 100000
                    ? { unit: 1e8, suffix: '億度', precision: 1 }
                    : {} && (cell.value === 0 || cell.value > 1)
                    ? ''
                    : { unit: 1e-2, suffix: '%', precision: 2 }
                )}
              </div>
            </div>
          );
        }
      },
    },
    {
      Header: t('decarbonizationPage:2022'),
      accessor: 'targets[0]',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(cell.value.amount, cell.value.unit ? { suffix: cell.value.unit, precision: 1 } : '');
      },
    },
    {
      Header: t('decarbonizationPage:2023'),
      accessor: 'targets[1]',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(cell.value.amount, cell.value.unit ? { suffix: cell.value.unit, precision: 1 } : '');
      },
    },
    {
      Header: t('decarbonizationPage:2024'),
      accessor: 'targets[2]',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(cell.value.amount, cell.value.unit ? { suffix: cell.value.unit, precision: 1 } : '');
      },
    },
    {
      Header: t('decarbonizationPage:2025'),
      accessor: 'targets[3]',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(cell.value.amount, cell.value.unit ? { suffix: cell.value.unit, precision: 1 } : '');
      },
    },
    {
      Header: t('decarbonizationPage:2026'),
      accessor: 'targets[4]',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(cell.value.amount, cell.value.unit ? { suffix: cell.value.unit, precision: 1 } : '');
      },
    },
    {
      Header: t('decarbonizationPage:2027'),
      accessor: 'targets[5]',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(cell.value.amount, cell.value.unit ? { suffix: cell.value.unit, precision: 1 } : '');
      },
    },
    {
      Header: t('decarbonizationPage:2028'),
      accessor: 'targets[6]',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(cell.value.amount, cell.value.unit ? { suffix: cell.value.unit, precision: 1 } : '');
      },
    },
    {
      Header: t('decarbonizationPage:2029'),
      accessor: 'targets[7]',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(cell.value.amount, cell.value.unit ? { suffix: cell.value.unit, precision: 1 } : '');
      },
    },
    {
      Header: t('decarbonizationPage:2030'),
      accessor: 'targets[8]',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(cell.value.amount, cell.value.unit ? { suffix: cell.value.unit, precision: 1 } : '');
      },
    },
  ];
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
                // const rowSpan = cell.row.original.rowSpan?.[cell.column.id];
                console.log(cell.row, cell.row.id);
                let rowSpan = null;
                if (j === 0) {
                  if (i === 1 || i === 8) {
                    rowSpan = 5
                  } else if (i === 6) {
                    rowSpan= 2
                  } else if (i === 0) {
                    rowSpan = 1
                  } else {
                    return null;
                  }
                }
                if (j === 1) {
                  if (i === 1 ) {
                    rowSpan = 3
                  } else if (i === 4||i === 6) {
                    rowSpan= 2
                  } else if (i === 8) {
                    rowSpan= 4
                  } else if (i === 0 ||i === 12) {
                    rowSpan = 1
                  } else {
                    return null;
                  }
                }
                console.log(cell.row.original.item, rowSpan);
                // if (rowSpan === 0) {
                //   return null;
                // }

                return (
                  <td
                    {...cell.getCellProps([
                      {
                        className: clsx(
                          cell.column.className,
                          cell.row.id === '0' || cell.row.id === '5' || cell.row.id === '7' || cell.row.id === '12'
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
                      {/* {j === 0 ? <Link to={cell.row.original.link}>{cell.render('Cell')}</Link> : cell.render('Cell')} */}
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

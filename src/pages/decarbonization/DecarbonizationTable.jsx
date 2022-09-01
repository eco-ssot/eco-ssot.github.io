import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';

import Dot from '../../components/dot/Dot';
import { toFormattedNumber } from '../../utils/number';

export const COLUMNS = ({ t, latestDate }) => {
  const year = new Date(latestDate).getFullYear();
  return [
    { Header: t('decarbonizationPage:category'), accessor: 'category', className: 'text-left p-3' },
    { Header: t('decarbonizationPage:base'), accessor: 'base', className: 'text-left p-3' },
    { Header: t('decarbonizationPage:detail'), accessor: 'detail', className: 'text-left p-3' },
    {
      Header: t('decarbonizationPage:2021'),
      accessor: '2021',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(
          cell.value,
          cell.value > 100000
            ? { unit: 1e8, suffix: '億度', precision: 1 }
            : {} && (cell.value === 0 || cell.value > 1)
            ? ''
            : { unit: 1e-2, suffix: '%', precision: 2 }
        );
      },
    },
    {
      Header: year + t('decarbonizationPage:ytm'),
      accessor: 'ytm' + year,
      className: 'text-left w-40 p-3',
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
      accessor: '2022',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(
          cell.value,
          cell.value > 100000
            ? { unit: 1e8, suffix: '億度', precision: 1 }
            : {} && (cell.value === 0 || cell.value > 1)
            ? ''
            : { unit: 1e-2, suffix: '%', precision: 2 }
        );
      },
    },
    {
      Header: t('decarbonizationPage:2023'),
      accessor: '2023',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(
          cell.value,
          cell.value > 100000
            ? { unit: 1e8, suffix: '億度', precision: 1 }
            : {} && (cell.value === 0 || cell.value > 1)
            ? ''
            : { unit: 1e-2, suffix: '%', precision: 2 }
        );
      },
    },
    {
      Header: t('decarbonizationPage:2024'),
      accessor: '2024',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(
          cell.value,
          cell.value > 100000
            ? { unit: 1e8, suffix: '億度', precision: 1 }
            : {} && (cell.value === 0 || cell.value > 1)
            ? ''
            : { unit: 1e-2, suffix: '%', precision: 2 }
        );
      },
    },
    {
      Header: t('decarbonizationPage:2025'),
      accessor: '2025',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(
          cell.value,
          cell.value > 100000
            ? { unit: 1e8, suffix: '億度', precision: 1 }
            : {} && (cell.value === 0 || cell.value > 1)
            ? ''
            : { unit: 1e-2, suffix: '%', precision: 2 }
        );
      },
    },
    {
      Header: t('decarbonizationPage:2026'),
      accessor: '2026',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(
          cell.value,
          cell.value > 100000
            ? { unit: 1e8, suffix: '億度', precision: 1 }
            : {} && (cell.value === 0 || cell.value > 1)
            ? ''
            : { unit: 1e-2, suffix: '%', precision: 2 }
        );
      },
    },
    {
      Header: t('decarbonizationPage:2027'),
      accessor: '2027',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(
          cell.value,
          cell.value > 100000
            ? { unit: 1e8, suffix: '億度', precision: 1 }
            : {} && (cell.value === 0 || cell.value > 1)
            ? ''
            : { unit: 1e-2, suffix: '%', precision: 2 }
        );
      },
    },
    {
      Header: t('decarbonizationPage:2028'),
      accessor: '2028',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(
          cell.value,
          cell.value > 100000
            ? { unit: 1e8, suffix: '億度', precision: 1 }
            : {} && (cell.value === 0 || cell.value > 1)
            ? ''
            : { unit: 1e-2, suffix: '%', precision: 2 }
        );
      },
    },
    {
      Header: t('decarbonizationPage:2029'),
      accessor: '2029',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(
          cell.value,
          cell.value > 100000
            ? { unit: 1e8, suffix: '億度', precision: 1 }
            : {} && (cell.value === 0 || cell.value > 1)
            ? ''
            : { unit: 1e-2, suffix: '%', precision: 2 }
        );
      },
    },
    {
      Header: t('decarbonizationPage:2030'),
      accessor: '2030',
      className: 'text-right w-32 p-3',
      Cell: (cell) => {
        return toFormattedNumber(
          cell.value,
          cell.value > 100000
            ? { unit: 1e8, suffix: '億度', precision: 1 }
            : {} && (cell.value === 0 || cell.value > 1)
            ? ''
            : { unit: 1e-2, suffix: '%', precision: 2 }
        );
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
                const rowSpan = cell.row.original.rowSpan?.[cell.column.id];
                if (rowSpan === 0) {
                  return null;
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
                            cell.row.id === '2' ||
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
                          : 'cursor-default' && cell.column.id < new Date(latestDate).getFullYear()
                          ? 'opacity-60'
                          : ''
                      }
                    >
                      {j === 0 ? <Link to={cell.row.original.link}>{cell.render('Cell')}</Link> : cell.render('Cell')}
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

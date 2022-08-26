import { useTranslation } from 'react-i18next';
import { useTable } from 'react-table';

import Legend from '../../components/legend/Legend';

export const COLUMNS = ({t}) => {
  return [
    { Header: t('decarbonizationPage:category'), accessor: 'category', className: 'text-left' },
    { Header: t('decarbonizationPage:base'), accessor: 'base', className: 'text-left' },
    { Header: t('decarbonizationPage:detail'), accessor: 'detail', className: 'text-left' },
    {
      Header: t('decarbonizationPage:ytm'),
      accessor: 'ytm',
      className: 'text-left',
      Cell: (cell) => {
        return (
          <div className="flex justify-start">
            <Legend dotClassName="bg-dangerous-500" />
            {/* <Legend dotClassName="bg-yellow-500" />
            <Legend dotClassName="bg-green-500"  /> */}
            <div>{cell.value}</div>
          </div>
        );
      },
    },
    { Header: t('decarbonizationPage:2022'), accessor: '2022', className: 'text-left' },
    { Header: t('decarbonizationPage:2023'), accessor: '2023', className: 'text-left' },
    { Header: t('decarbonizationPage:2024'), accessor: '2024', className: 'text-left' },
    { Header: t('decarbonizationPage:2025'), accessor: '2025', className: 'text-left' },
    { Header: t('decarbonizationPage:2026'), accessor: '2026', className: 'text-left' },
    { Header: t('decarbonizationPage:2027'), accessor: '2027', className: 'text-left' },
    { Header: t('decarbonizationPage:2028'), accessor: '2028', className: 'text-left' },
    { Header: t('decarbonizationPage:2029'), accessor: '2029', className: 'text-left' },
    { Header: t('decarbonizationPage:2030'), accessor: '2030', className: 'text-left' },
  ];
};

const defaultPropGetter = () => ({});

export default function DecarbonizationTable({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  const { t } = useTranslation(['decarbonizationPage', 'common', 'component']);
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr  {...headerGroup.getHeaderGroupProps()}>
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
          console.log(row.cells[0].value)
          return (
            <tr {...row.getRowProps(getRowProps(row))}>
              {row.cells.map((cell) => {
                return (           
                  <td 
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                        style: cell.column.style,
                      },
                      getColumnProps(cell.column),
                      getCellProps(cell),
                    ])}
                  >
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

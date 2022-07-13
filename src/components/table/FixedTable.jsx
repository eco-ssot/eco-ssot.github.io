import { useState, useEffect, useRef } from 'react';

import clsx from 'clsx';
import { useTable, useExpanded } from 'react-table';

import Triangle from '../triangle/Triangle';

const AFTER = {
  LEFT: `after:absolute after:top-0 after:content-[''] after:translate-x-full after:w-full after:h-full after:right-0 after:shadow-[inset_0.625rem_0_0.5rem_-0.5rem_rgba(0,0,0,0.45)] after:pointer-events-none`,
};

export function TrackScroll({ children, className }) {
  const ref = useRef(null);
  const [scrollingX, setScrollingX] = useState(false);
  const [scrollingY, setScrollingY] = useState(false);
  const [scrolling, setScrolling] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const trackScroll = (e) => {
      const x = e.target.scrollLeft;
      if ((scrollingX && x === 0) || (!scrollingX && x > 0)) {
        setScrollingX(x > 0);
        setScrolling((prev) => ({ ...prev, x: Date.now() }));
      }
    };

    ref.current?.addEventListener('scroll', trackScroll, { passive: true });
    return () => {
      ref.current?.removeEventListener('scroll', trackScroll);
    };
  }, [scrollingX]);

  useEffect(() => {
    const trackScroll = (e) => {
      const y = e.target.scrollTop;
      if ((scrollingY && y === 0) || (!scrollingY && y > 0)) {
        setScrollingY(y > 0);
        setScrolling((prev) => ({ ...prev, y: Date.now() }));
      }
    };

    ref.current?.addEventListener('scroll', trackScroll, { passive: true });
    return () => {
      ref.current?.removeEventListener('scroll', trackScroll);
    };
  }, [scrollingY]);

  return (
    <div ref={(node) => (ref.current = node)} className={clsx('relative flex flex-col overflow-auto', className)}>
      {children({ scrollingX, scrollingY, scrolling })}
    </div>
  );
}

const defaultPropGetter = () => ({});

export default function FixedTable({
  columns = [],
  data = [],
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  stickyHeader = true,
  autoResetExpanded = true,
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      autoResetExpanded,
    },
    useExpanded
  );

  return (
    <TrackScroll>
      {({ scrollingX, scrollingY, scrolling }) => (
        <table {...getTableProps()}>
          <thead className={clsx('bg-primary-800 ', stickyHeader && 'sticky top-0 z-2')}>
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
                            /paddingLeft/.test(column.id) && 'sticky left-0 bg-primary-800 z-2 w-4',
                            /expander/.test(column.id) && 'sticky left-4 bg-primary-800 z-2 w-6',
                            /site|plant/i.test(column.id) &&
                              clsx(
                                'sticky left-[2.4rem] bg-primary-800',
                                scrollingX && AFTER.LEFT,
                                scrolling.x > scrolling.y && 'z-2',
                                scrolling.x < scrolling.y && 'z-1'
                              ),
                            column.className
                          ),
                          style: column.style,
                          rowSpan: column.rowSpan,
                        },
                        getColumnProps(column),
                        getHeaderProps(column),
                      ])}
                      {...(column.placeholderOf && { rowSpan: 2 })}
                    >
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
                  })}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps([
                          {
                            className: clsx(
                              'py-3 text-gray-50 text-center text-lg relative',
                              !cell.column.id.startsWith('expander') && 'px-2',
                              row.depth > 0 && 'bg-primary-600 bg-opacity-20',
                              row.depth > 0 && row.index === 0 && 'border-t border-primary-600',
                              row.depth > 0 &&
                                row.id.includes('.') &&
                                !(row[row.index + 1] || { id: '' }).id.includes('.') &&
                                'border-b border-primary-600',
                              /paddingLeft/.test(cell.column.id) && clsx('sticky left-0 bg-primary-900 w-4 z-1'),
                              /expander/.test(cell.column.id) && clsx('sticky left-4 bg-primary-900 w-6 z-1'),
                              /site|plant/i.test(cell.column.id) &&
                                clsx('sticky left-[2.4rem] bg-primary-900 z-1', scrollingX && AFTER.LEFT),
                              cell.column.className
                            ),
                            style: cell.column.style,
                          },
                          getColumnProps(cell.column),
                          getCellProps(cell),
                        ])}
                      >
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
      )}
    </TrackScroll>
  );
}

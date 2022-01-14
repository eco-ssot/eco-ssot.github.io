import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

import APP_CONFIG from '../constants/app-config';

export function addPaddingColumns(columns = []) {
  return [
    { id: 'paddingLeft', rowSpan: 0, Header: '', className: 'w-1' },
    ...columns,
    { id: 'paddingRight', rowSpan: 0, Header: '', className: 'w-1' },
  ];
}

export const EXPAND_COLUMN = {
  id: 'expander',
  Header: '',
  Cell: ({ row }) => {
    const { title, style, ...rest } = row.getToggleRowExpandedProps();
    return row.canExpand ? (
      <div {...rest} className="flex justify-center">
        {row.isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 cursor-pointer" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 cursor-pointer" />
        )}
      </div>
    ) : null;
  },
  rowSpan: 0,
};

export const noDataRenderer =
  ({ missing = [], key = 'site' }) =>
  (cell) => {
    if (missing.includes(cell.row.original[key]) || cell.row.original.subRows?.some((r) => missing.includes(r[key]))) {
      return <div className="bg-dangerous-900 rounded border border-dangerous-600 px-1">{cell.value}</div>;
    }

    return plantRenderer(cell);
  };

export const plantRenderer = (cell) => {
  if (APP_CONFIG.DEPRECIATED_PLANTS.some((val) => cell.value.startsWith(val))) {
    return <div className="line-through text-gray-300">{cell.value}</div>;
  }

  return cell.value;
};

export const getHidePlantRowProps = (row) => {
  if (APP_CONFIG.HIDE_PLANTS.includes(row.original.site || row.original.plant)) {
    return { className: 'bg-gray-500 bg-opacity-50 opacity-50' };
  }

  return {};
};

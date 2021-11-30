import clsx from 'clsx';

import { baseFormatter } from '../../utils/formatter';

export function getYtmLabel(m) {
  if (m === 1) {
    return '-';
  }

  if (m === 2) {
    return 'YTM (1月)';
  }

  return `YTM (1-${m - 1}月)`;
}

export function gapFormatter(cell) {
  return (
    <div className={clsx(cell.value > 0 ? 'text-dangerous-500 font-semibold' : 'text-green-500 font-semibold')}>
      {cell.value > 0 && '+'}
      {baseFormatter(cell)}
    </div>
  );
}

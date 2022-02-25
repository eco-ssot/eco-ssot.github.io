import clsx from 'clsx';

import { baseFormatter } from '../../utils/formatter';

export function getYtmLabel(m, t) {
  if (m === 1) {
    return '-';
  }

  if (m === 2) {
    return `YTM (${t('common:month.1')}${t('common:month.text')})`;
  }

  return `YTM (${t('common:month.1')}-${t(`common:month.${m - 1}`)}${t('common:month.text')})`;
}

export function gapFormatter(cell) {
  return (
    <div className={clsx(cell.value > 0 ? 'text-dangerous-500 font-semibold' : 'text-green-500 font-semibold')}>
      {cell.value > 0 && '+'}
      {baseFormatter(cell)}
    </div>
  );
}

export function getPlants({ data, s, p }) {
  const plants = ['WZS', 'WTZ'];
  const options = data
    ?.filter(({ key }) => plants.find((plant) => key.startsWith(plant)))
    ?.filter(({ key }) => {
      if (p) {
        return key === p;
      }

      if (s) {
        return key.startsWith(s);
      }

      return key;
    });

  if (!options?.length) {
    if (s) {
      return data?.filter(({ key }) => key.startsWith(s));
    }

    if (p) {
      return data?.filter(({ key }) => key === p);
    }
  }

  return options;
}

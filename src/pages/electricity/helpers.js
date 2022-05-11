import clsx from 'clsx';
import { renderToString } from 'react-dom/server';

import { baseFormatter } from '../../utils/formatter';

const HIDDEN_PLANTS = ['WCZ', 'WMX', 'WNH', 'WHC'];

export const BASE_LINE_DETAIL_ENTRIES = [
  { key: 'PCBAProduction', name: 'PCBA產量 (pcs)' },
  { key: 'FAProduction', name: 'FA產量 (pcs)' },
  { key: 'manpower', name: '人數 (人)' },
  { key: 'PCBALines', name: 'PCBA 開線數量' },
  { key: 'FALines', name: 'FA 開線數量' },
  { key: 'revenue', name: '營業額 (十億NTD)' },
  { key: 'temperature', name: '外氣平均溫度 (°C)' },
];

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
    <div className={clsx(cell.value > 0 ? 'font-semibold text-dangerous-500' : 'font-semibold text-green-500')}>
      {cell.value > 0 && '+'}
      {baseFormatter(cell)}
    </div>
  );
}

export function getPlants({ data, otherPlants, s, p, plantPermission }) {
  const options = data
    ?.filter(({ key }) => !otherPlants?.includes(key))
    ?.filter(({ key }) => !HIDDEN_PLANTS.includes(key))
    ?.filter(({ key }) => plantPermission?.includes(key))
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
    if (p) {
      return data?.filter(({ key }) => key === p && !HIDDEN_PLANTS.includes(key) && !otherPlants?.includes(key));
    }

    if (s) {
      return data?.filter(
        ({ key }) => key.startsWith(s) && !HIDDEN_PLANTS.includes(key) && !otherPlants?.includes(key)
      );
    }
  }

  return options;
}

export const LineTooltipFormatter =
  ({ t, type, typeName, compareName, actualName, year }) =>
  (dataset) => {
    const [actual, baseline] = dataset;
    const actualValue = actual.value;
    const baselineValue = baseline.value;
    const gap = actualValue - baselineValue;
    return renderToString(
      <div className="flex flex-col rounded bg-gray-900 bg-opacity-75 py-2 shadow">
        <div className="flex items-baseline justify-between space-x-4 border-b border-divider px-4 pb-2">
          <div>
            {year}.{String(actual.dataIndex + 1).padStart(2, '0')}
          </div>
          <div>{typeName || t(`baselinePage:${type}`)}</div>
        </div>
        <div className="flex items-baseline justify-between space-y-2 space-x-4 px-4">
          <div>{actualName || t('baselinePage:actualElectricity')}</div>
          <div>{baseFormatter(actualValue)}</div>
        </div>
        <div className="flex items-baseline justify-between space-y-2 space-x-4 px-4">
          <div>{compareName || t('baselinePage:baseline')}</div>
          <div>{baseFormatter(baselineValue)}</div>
        </div>
        <div className="flex items-baseline justify-between space-y-2 space-x-4 px-4">
          <div>{t('baselinePage:gap')}</div>
          <div className={clsx(gap > 0 ? 'font-semibold text-dangerous-500' : 'font-semibold text-green-500')}>
            {gap > 0 && '+'}
            {baseFormatter(gap)}
          </div>
        </div>
      </div>
    );
  };

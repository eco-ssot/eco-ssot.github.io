import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Chart from '../../charts/Chart';
import Legend from '../../components/legend/Legend';
import { selectLanguage } from '../../renderless/location/locationSlice';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';

import { formatTarget, getChartLabel } from './helpers';

const OPTION = (values, labels, target, barColors) => ({
  xAxis: {
    type: 'category',
    data: labels,
    axisTick: { show: false },
    axisLine: { lineStyle: { color: colors.primary['600'] } },
    axisLabel: {
      color: colors.gray['50'],
      formatter: (value) => value.replace(' ', '\n'),
      lineHeight: 16,
    },
  },
  yAxis: {
    type: 'value',
    splitLine: { show: false },
    axisLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    ...(target > Math.max(...values) && {
      max: Math.ceil(target),
    }),
  },
  series: [
    {
      data: values.map((value, i) => ({
        value,
        itemStyle: { color: barColors[i], borderRadius: [4, 4, 0, 0] },
      })),
      type: 'bar',
      barWidth: 32,
      label: {
        show: true,
        position: 'top',
        color: colors.gray['50'],
        formatter: (value) => baseFormatter(value, { precision: 1 }),
      },
      ...(target && {
        markLine: {
          data: [{ yAxis: target }],
          symbol: 'none',
          lineStyle: { color: colors._orange, width: 2 },
          label: { formatter: (value) => baseFormatter(value, { precision: 1 }) },
          emphasis: { lineStyle: { width: 4 } },
        },
      }),
    },
  ],
  grid: { top: 24, bottom: 48, left: 16, right: 60, containerLabel: true },
});

export default function Electricity({
  baseYear,
  compareYear,
  currentYear,
  latestDate,
  isNewMargin,
  periodType,
  currMonth,
  data = {},
}) {
  const { t } = useTranslation(['common']);
  const lng = useSelector(selectLanguage);
  const labels = useMemo(
    () => getChartLabel({ isNewMargin, baseYear, compareYear, currentYear, latestDate, periodType, currMonth }),
    [isNewMargin, baseYear, compareYear, currentYear, latestDate, periodType, currMonth]
  );

  const values = useMemo(
    () => [...(isNewMargin ? [] : [data.compareYear, data.compareYTM]), data.currentYTM],
    [isNewMargin, data.compareYear, data.compareYTM, data.currentYTM]
  );

  const barColors = useMemo(
    () => [...(isNewMargin ? [] : [colors._yellow, colors.primary['600']]), colors.primary['500']],
    [isNewMargin]
  );

  const option = useMemo(
    () => OPTION(values, labels, data.targetAmount, barColors),
    [values, labels, data.targetAmount, barColors]
  );

  return (
    <div className="flex h-full w-full items-center justify-around">
      <Chart className="h-full w-3/5" option={option} />
      <div className="flex h-full flex-col items-start justify-center space-y-4 text-lg">
        {!isNewMargin && <Legend dotClassName="bg-_yellow" label={t('common:baseYear')} />}
        <Legend dotClassName="bg-_orange" label={`${t('target')} : ${formatTarget(data.target, lng)}`} />
        <div>{`${t('unit')} : ${t('mwh')} / ${t('billionNtd')}`}</div>
      </div>
    </div>
  );
}

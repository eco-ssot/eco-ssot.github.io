import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import Chart from '../../charts/Chart';
import { tooltip } from '../../charts/tooltip';
import Legend from '../../components/legend/Legend';
import { useGetElectricityBaselineQuery } from '../../services/electricity';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';

import { LineTooltipFormatter } from './helpers';

const LINE_OPTION = ({ t, dataset, lineColors, type, typeName, compareName, actualName, year }) => {
  return {
    xAxis: {
      type: 'category',
      name: `(${t('common:monthText')})`,
      nameTextStyle: { color: colors.gray['50'] },
      data: Array.from({ length: 12 }, (_, i) => i + 1),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
      axisLabel: { color: colors.gray['50'] },
    },
    yAxis: {
      type: 'value',
      scale: true,
      name: `(${t('common:mwh')})`,
      nameTextStyle: { color: colors.gray['50'] },
      axisLine: { show: true, lineStyle: { color: colors.gray['500'] } },
      axisTick: { show: false },
      axisLabel: { color: colors.gray['50'], formatter: (value) => baseFormatter(value, { unit: 1e3 }) },
      splitLine: { show: false },
    },
    series: Object.entries(dataset).map(([key, data], i) => ({
      type: 'line',
      name: key,
      data: data.map((v) => ({ value: v })),
      symbol: 'none',
      lineStyle: {
        color: lineColors[i],
      },
    })),
    grid: {
      bottom: 0,
      top: 36,
      left: 24,
      right: 48,
      containLabel: true,
    },
    tooltip: {
      ...tooltip({ formatter: LineTooltipFormatter({ t, type, typeName, compareName, actualName, year }) }),
    },
  };
};

export default function ChartPanel({ plant, year, business }) {
  const { t } = useTranslation(['baselinePage']);
  const option = { year, plant };
  const { data } = useGetElectricityBaselineQuery(
    { ...option, bo: business },
    { skip: Object.values(option).every(isNil) }
  );

  return (
    <div className="row-span-2 grid grid-cols-4 grid-rows-1 gap-4 rounded bg-primary-900 p-4 shadow">
      {APP_CONSTANTS.ELECTRICITY_TYPES.map(({ key }, i) => {
        const dataset = data?.data?.reduce(
          (prev, curr) => ({
            ...prev,
            actual: prev.actual.concat(curr[key]?.actual),
            baseline: prev.baseline.concat(curr[key]?.baseline),
          }),
          { actual: [], baseline: [] }
        );

        return (
          <div key={key} className="flex flex-col space-y-2">
            <div className="relative flex justify-between">
              <div className="whitespace-nowrap text-xl font-medium">
                {t(`baselinePage:${key}`)}
                {t('baselinePage:modelPrediction')}
              </div>
              {i === APP_CONSTANTS.ELECTRICITY_TYPES.length - 1 && (
                <div className="absolute right-2 top-8 flex space-x-4">
                  <Legend dotClassName="bg-_yellow" label={t('baselinePage:predictionBaseline')} />
                  <Legend dotClassName="bg-primary-600" label={t('baselinePage:actualElectricity')} />
                </div>
              )}
            </div>
            {data && (
              <Chart
                className="h-full w-full"
                option={LINE_OPTION({
                  t,
                  year,
                  dataset,
                  lineColors: [colors.primary['600'], colors._yellow],
                  type: key,
                })}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

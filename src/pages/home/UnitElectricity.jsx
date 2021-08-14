import Chart from '../../charts/Chart';
import colors from '../../styles/colors';
import Legend from '../../components/legend/Legend';
import { baseFormatter } from '../../utils/formatter';

const COLORS = [colors._blue, colors.primary['600'], colors.primary['500']];

const OPTION = (values, labels, target) => ({
  xAxis: {
    type: 'category',
    data: labels,
    axisTick: { show: false },
    axisLine: { lineStyle: { color: colors.primary['600'] } },
    axisLabel: {
      color: colors.gray['50'],
      formatter: (value) => value.split(' ').join('\n'),
      lineHeight: 16,
    },
  },
  yAxis: {
    type: 'value',
    splitLine: { show: false },
    axisLine: { show: false },
  },
  series: [
    {
      data: values.map((value, i) => ({
        value,
        itemStyle: { color: COLORS[i], barBorderRadius: [4, 4, 0, 0] },
      })),
      type: 'bar',
      barWidth: 32,
      label: { show: true, position: 'top', color: colors.gray['50'], formatter: baseFormatter },
      animationDuration: 2000,
      ...(target && {
        markLine: {
          data: [{ yAxis: 100 }],
          symbol: 'none',
          lineStyle: { color: colors._orange },
          label: { formatter: baseFormatter },
        },
      }),
    },
  ],
  grid: { top: 16, bottom: 36, left: 16, right: 48, containerLabel: true },
});

export default function UnitElectricity({ baseYear, compareYear, currentYear, data = {} }) {
  const labels = [baseYear, compareYear, currentYear];
  const values = [data.baseYear, data.compareYTM, data.currentYTM];
  const option = OPTION(values, labels, data.target);
  return (
    <div className="flex w-full h-full items-center justify-around">
      <Chart className="w-3/5 h-full" option={option} />
      <div className="flex flex-col h-full justify-center items-start space-y-4">
        <Legend dotClassName="bg-_orange" label="Target : 對比去年 -%" />
        <div>單位：度/臺</div>
      </div>
    </div>
  );
}

import Chart from '../../charts/Chart';
import colors from '../../styles/colors';
import Legend from '../../components/legend/Legend';
import { baseFormatter } from '../../utils/formatter';
import { formatYtm } from './helpers';

const COLORS = [colors._yellow, colors.primary['600'], colors.primary['500']];

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
    ...(target > Math.max(...values) && {
      max: target,
    }),
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
          data: [{ yAxis: target }],
          symbol: 'none',
          lineStyle: { color: colors._orange },
          label: { formatter: baseFormatter },
        },
      }),
    },
  ],
  grid: { top: 24, bottom: 36, left: 16, right: 48, containerLabel: true },
});

export default function Carbon({ baseYear, compareYear, currentYear, latestDate, data = {} }) {
  const labels = [
    `${baseYear} Total`,
    `${compareYear} ${formatYtm(latestDate)}`,
    `${currentYear} ${formatYtm(latestDate)}`,
  ];

  const values = [data.baseYear, data.compareYTM, data.currentYTM];
  const option = OPTION(values, labels, data.targetAmount);
  return (
    <div className="flex w-full h-full items-center justify-around">
      <Chart className="flex w-3/5 h-full" option={option} />
      <div className="flex flex-col h-full justify-center items-start space-y-4">
        <Legend dotClassName="bg-_yellow" label="基準年" />
        <Legend dotClassName="bg-_orange" label={`Target : ${data.target}`} />
        <div>單位：公噸</div>
      </div>
    </div>
  );
}

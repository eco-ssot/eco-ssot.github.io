import Chart from '../../charts/Chart';
import colors from '../../styles/colors';
import Legend from '../legend/Legend';
import { useGetElectricApiQuery } from '../../services/electric';

const COLORS = [colors.blue['500'], colors.emerald['700'], colors.green['500']];

const OPTION = (values, labels, target) => ({
  xAxis: {
    type: 'category',
    data: labels,
    axisTick: { show: false },
    axisLine: { lineStyle: { color: colors.primary['500'] } },
    axisLabel: {
      color: '#fff',
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
      label: { show: true, position: 'top', color: '#fff' },
      animationDuration: 2000,
      ...(target && {
        markLine: {
          data: [{ yAxis: target }],
          symbol: 'none',
          lineStyle: { color: colors.orange['500'] },
        },
      }),
    },
  ],
  grid: { top: 16, bottom: 36, left: 16, right: 48, containerLabel: true },
});

export default function Electricity() {
  const { data = {} } = useGetElectricApiQuery();
  const { target, ...rest } = data;
  const labels = Object.keys(rest);
  const values = Object.values(rest);
  const option = OPTION(values, labels, target);
  return (
    <div className="flex w-full h-full items-center justify-around">
      <Chart className="w-3/5 h-full" option={option} />
      <div className="flex flex-col h-full justify-center items-start space-y-4">
        <Legend dotClassName="bg-orange-500" label="Target : 對比去年 -2%" />
        <div>單位：度/十億臺幣</div>
      </div>
    </div>
  );
}

import Chart from '../../charts/Chart';
import colors from '../../styles/colors';
import Legend from '../legend/Legend';
import { useGetSingleElectricApiQuery } from '../../services/singleelectric';

const COLORS = [colors._blue, colors.primary['600'], colors.green['500']];

const OPTION = (values, labels, target) => ({
  xAxis: {
    type: 'category',
    data: labels,
    axisTick: { show: false },
    axisLine: { lineStyle: { color: colors.primary['600'] } },
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
          data: [{ yAxis: 100 }],
          symbol: 'none',
          lineStyle: { color: colors._orange },
        },
      }),
    },
  ],
  grid: { top: 16, bottom: 36, left: 16, right: 48, containerLabel: true },
});

export default function UnitElectricity() {
  const { data = {} } = useGetSingleElectricApiQuery();
  const { target, ...rest } = data;
  const labels = Object.keys(rest);
  const values = Object.values(rest);
  const option = OPTION(values, labels, target);
  return (
    <div className="flex w-full h-full items-center justify-around">
      <Chart className="w-3/5 h-full" option={option} />
      <div className="flex flex-col h-full justify-center items-start space-y-4">
        <Legend dotClassName="bg-_orange" label="Target : 對比去年 -1%" />
        <div>單位：度/臺</div>
      </div>
    </div>
  );
}

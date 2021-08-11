import Chart from '../../charts/Chart';
import colors from '../../styles/colors';
import Legend from '../legend/Legend';
import { baseFormatter } from '../../utils/formatter';
import { useGetCo2ApiQuery } from '../../services/co2';

const OPTION = (values, labels, target) => {
  const COLORS = [colors.yellow['500'], colors.emerald['700'], colors.green['500']];
  return {
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
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          formatter: baseFormatter,
        },
        animationDuration: 2000,
        ...(target && {
          markLine: {
            data: [{ yAxis: target }],
            symbol: 'none',
            lineStyle: { color: colors.orange['500'] },
            label: {
              formatter: baseFormatter,
            },
          },
        }),
      },
    ],
    grid: { top: 16, bottom: 36, left: 16, right: 48, containerLabel: true },
  };
};

export default function Carbon() {
  const { data = {} } = useGetCo2ApiQuery();
  const { target, ...rest } = data;
  const labels = Object.keys(rest);
  const values = Object.values(rest);
  const option = OPTION(values, labels, target);
  return (
    <div className="flex w-full h-full items-center justify-around">
      <Chart className="flex w-3/5 h-full" option={option} />
      <div className="flex flex-col h-full justify-center items-start space-y-4">
        <Legend dotClassName="bg-yellow-500" label="基準年" />
        <Legend dotClassName="bg-orange-500" label="Target : 對比基準年 -21%" />
        <div>單位：公噸</div>
      </div>
    </div>
  );
}

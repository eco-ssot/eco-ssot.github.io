import Chart from '../../charts/Chart';
import colors from '../../styles/colors';
import Legend from '../legend/Legend';

const OPTION = {
  xAxis: {
    type: 'category',
    data: ['2016 Total', '2020 1-6月', '2021 1-6月'],
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
      data: [
        {
          value: 111,
          itemStyle: { color: colors.blue['500'], barBorderRadius: [4, 4, 0, 0] },
        },
        {
          value: 90,
          itemStyle: { color: colors.emerald['700'], barBorderRadius: [4, 4, 0, 0] },
        },
        {
          value: 60,
          itemStyle: { color: colors.green['500'], barBorderRadius: [4, 4, 0, 0] },
        },
      ],
      type: 'bar',
      barWidth: 32,
      label: { show: true, position: 'top', color: '#fff' },
      animationDuration: 2000,
      markLine: {
        data: [{ yAxis: 100 }],
        symbol: 'none',
        lineStyle: { color: colors.orange['500'] },
      },
    },
  ],
  grid: { top: 16, bottom: 36, left: 16, right: 48, containerLabel: true },
};

export default function UnitElectricity() {
  const option = {
    ...OPTION,
  };

  return (
    <div className="flex w-full h-full items-center justify-around">
      <Chart className="w-3/5 h-full" option={option} />
      <div className="flex flex-col h-full justify-center items-start space-y-4">
        <Legend dotClassName="bg-orange-500" label="Target : 對比去年 -1%" />
        <div>單位：度/臺</div>
      </div>
    </div>
  );
}

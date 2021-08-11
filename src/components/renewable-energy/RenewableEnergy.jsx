import Chart from '../../charts/Chart';
import colors from '../../styles/colors';
import Legend from '../legend/Legend';

const OPTION = {
  tooltip: { show: false },
  legend: { show: false },
  series: [
    {
      type: 'pie',
      radius: ['70%', '90%'],
      avoidLabelOverlap: false,
      center: ['50%', '50%'],
      label: {
        show: false,
        position: 'center',
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 49, name: '不可再生能源', itemStyle: { color: colors.blue['500'] } },
        { value: 2, name: '自建太陽能', itemStyle: { color: colors.yellow['500'] } },
        { value: 49, name: '電網包含', itemStyle: { color: colors.green['500'] } },
        { value: 0, name: '綠證', itemStyle: { color: colors.gray['300'] } },
      ],
    },
  ],
  grid: { top: 16, bottom: 24, left: 16, right: 0, containerLabel: true },
};

export default function RenewableEnergy() {
  const option = {
    ...OPTION,
  };

  return (
    <div className="flex w-full h-full items-center justify-between">
      <div className="w-1/2 h-full flex items-center justify-center">
        <Chart className="w-full h-full" option={option} />
        <div className="absolute text-center">
          <div>Target:</div>
          <div>{`可再生能源 > 60%`}</div>
        </div>
      </div>
      <div className="flex flex-col px-8 justify-center w-1/2 space-y-4">
        <Legend
          dotClassName="bg-blue-500"
          labelClassName="flex w-4/5 justify-between"
          label={
            <>
              <div>不可再生能源</div>
              <div>49%</div>
            </>
          }
        />
        <Legend
          dotClassName="bg-yellow-500"
          labelClassName="flex w-4/5 justify-between"
          label={
            <>
              <div>自建太陽能</div>
              <div>2%</div>
            </>
          }
        />
        <Legend
          dotClassName="bg-green-500"
          labelClassName="flex w-4/5 justify-between"
          label={
            <>
              <div>電網包含</div>
              <div>49%</div>
            </>
          }
        />
        <Legend
          dotClassName="bg-gray-300"
          labelClassName="flex w-4/5 justify-between"
          label={
            <>
              <div>綠證</div>
              <div>0%</div>
            </>
          }
        />
      </div>
    </div>
  );
}

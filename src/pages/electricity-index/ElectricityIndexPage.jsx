import { useMemo } from 'react';

import { sum } from 'lodash';

import Chart from '../../charts/Chart';
import Legend from '../../components/legend/Legend';
import { colors } from '../../styles';

const OVERVIEW_DATA = [
  { month: 1, prev: 10000, curr: 5000, target: 3000 },
  { month: 2, prev: 9000, curr: 2000, target: 5000 },
  { month: 3, prev: 8000, curr: 4000, target: 6000 },
  { month: 4, prev: 7000, curr: null, target: null },
  { month: 5, prev: 6000, curr: null, target: null },
  { month: 6, prev: 5000, curr: null, target: null },
  { month: 7, prev: 6000, curr: null, target: null },
  { month: 8, prev: 7000, curr: null, target: null },
  { month: 9, prev: 8000, curr: null, target: null },
  { month: 10, prev: 9000, curr: null, target: null },
  { month: 11, prev: 10000, curr: null, target: null },
  { month: 12, prev: 11000, curr: null, target: null },
];

const ACC_DATA = [
  { day: 1, value: 500, target: 600 },
  { day: 2, value: 100, target: 700 },
  { day: 3, value: 200, target: 800 },
  { day: 4, value: 300, target: 900 },
  { day: 5, value: 400, target: 950 },
  { day: 6, value: 500, target: 970 },
  { day: 7, value: 400, target: 1000 },
  { day: 8, value: 300, target: 1200 },
  { day: 9, value: 200, target: 1300 },
  { day: 10, value: 50, target: 1400 },
  { day: 11, value: 800, target: 1500 },
  { day: 12, value: 1000, target: 1750 },
  { day: 13, value: 1200, target: 2000 },
  { day: 14, value: 1500, target: 2500 },
  { day: 15, value: 1000, target: 3000 },
  { day: 16, value: 2000, target: 3020 },
  { day: 17, value: 3000, target: 3100 },
  { day: 18, value: 500, target: 3500 },
  { day: 19, value: 20, target: 3600 },
  { day: 20, value: 60, target: 4000 },
  { day: 21, value: 40, target: 4500 },
  { day: 22, value: NaN, target: null },
  { day: 23, value: NaN, target: null },
  { day: 24, value: NaN, target: null },
  { day: 25, value: NaN, target: null },
  { day: 26, value: NaN, target: null },
  { day: 27, value: NaN, target: null },
  { day: 28, value: NaN, target: null },
  { day: 29, value: NaN, target: null },
  { day: 30, value: NaN, target: null },
  { day: 31, value: NaN, target: null },
];

const OVERVIEW_OPTION = (data) => {
  const labels = data.map((d) => d.month);
  const prev = data.map((d) => ({ value: d['prev'] }));
  const curr = data.map((d) => ({ value: d['curr'] }));
  const target = data.map((d) => ({ value: d.target }));
  return {
    xAxis: {
      name: '(月份)',
      nameTextStyle: { color: colors.gray['50'] },
      type: 'category',
      data: labels,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
    },
    yAxis: {
      name: '(千度)',
      nameTextStyle: { color: colors.gray['50'] },
      type: 'value',
      axisLine: { show: true, lineStyle: { color: colors.gray['500'] } },
      splitLine: { show: false },
    },
    series: [
      {
        name: 'prev',
        type: 'bar',
        data: prev,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
        color: colors._blue,
      },
      {
        name: 'curr',
        type: 'bar',
        data: curr,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
        color: colors.primary['500'],
      },
      {
        name: '各月基線數值',
        type: 'line',
        data: target,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          type: 'dashed',
        },
        color: colors._yellow,
      },
    ],
    grid: { left: 16, right: 64, bottom: 16, top: 64, containLabel: true },
  };
};

const ACC_OPTION = (data) => {
  const labels = data.map((d) => d.day);
  const day = data.map((d) => ({ value: d.value }));
  const dayAcc = data.map((d, i) => ({
    value: d.value,
    ...(i > 0 && { value: sum([...data.slice(0, i).map((_d) => _d.value), d.value]) }),
  }));

  const target = data.map((d) => ({ value: d.target }));
  return {
    xAxis: {
      name: '(日)',
      nameTextStyle: { color: colors.gray['50'] },
      type: 'category',
      data: labels,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
    },
    yAxis: {
      name: '(千度)',
      nameTextStyle: { color: colors.gray['50'] },
      type: 'value',
      axisLine: { show: true, lineStyle: { color: colors.gray['500'] } },
      splitLine: { show: false },
    },
    series: [
      {
        name: 'day',
        type: 'bar',
        data: day,
        color: colors.primary['500'],
        z: 3,
      },
      {
        name: 'acc',
        type: 'bar',
        data: dayAcc,
        color: colors.primary['600'],
        barGap: '-100%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: '各月基線數值',
        type: 'line',
        data: target,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          type: 'dashed',
        },
        color: colors._yellow,
      },
    ],
    grid: { left: 16, right: 64, bottom: 16, top: 64, containLabel: true },
  };
};

export default function ElectricityIndexPage({ className }) {
  const overviewOption = useMemo(() => OVERVIEW_OPTION(OVERVIEW_DATA), []);
  const accOption = useMemo(() => ACC_OPTION(ACC_DATA), []);
  return (
    <div className="h-screen w-screen pt-16 -mt-16 overflow-hidden">
      <div className="p-4 grid grid-rows-2 grid-cols-2 gap-4 w-full h-full">
        <div className="col-span-1 p-4 rounded shadow bg-primary-900 flex flex-col">
          <div className="flex justify-between">
            <div className="text-xl font-medium">總用電比較</div>
            <div className="space-y-4">
              <div className="flex justify-end  space-x-4">
                <Legend dotClassName="bg-_blue" label="2021年" />
                <Legend dotClassName="bg-primary-500" label="2022年" />
                <Legend dotClassName="bg-_yellow" label="各月基線數值" />
              </div>
              <div className="text-right">* 總用電比較示警：各月之用電基準線</div>
            </div>
          </div>
          <div className="flex flex-grow">
            <Chart className="w-full h-full" option={overviewOption} />
          </div>
        </div>
        <div className="col-start-2 col-span-1 row-span-2 p-4 rounded shadow bg-primary-900 flex flex-col">
          <div className="flex justify-between">
            <div className="text-xl font-medium">用電指標關係圖</div>
            <div className="flex justify-end space-x-4">
              <Legend dotClassName="bg-_blue" label="2021年" />
              <Legend dotClassName="bg-primary-500" label="2022年" />
              <Legend dotClassName="bg-_yellow" label="各月基線數值" />
            </div>
          </div>
        </div>
        <div className="col-span-1 p-4 rounded shadow bg-primary-900 flex flex-col">
          <div className="flex justify-between">
            <div className="text-xl font-medium">用電指標關係圖</div>
            <div className="space-y-4">
              <div className="flex justify-end space-x-4">
                <Legend dotClassName="bg-_blue" label="2021年" />
                <Legend dotClassName="bg-primary-500" label="2022年" />
                <Legend dotClassName="bg-_yellow" label="各月基線數值" />
              </div>
              <div className="text-right">
                * 當月累積用電示警：去年同期的單台用電*今年要改善的標準*當月累積到前一日的每日產量
              </div>
            </div>
          </div>
          <div className="flex flex-grow">
            <Chart className="w-full h-full" option={accOption} />
          </div>
        </div>
      </div>
    </div>
  );
}

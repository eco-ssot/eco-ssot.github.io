import { useMemo, useState } from 'react';

import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import { sum } from 'lodash';

import Chart from '../../charts/Chart';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import { colors } from '../../styles';

const TARGET = 3.5;
const SLOPE = 2.571;

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

const SCATTER_DATA = [
  { date: '2021-01-01', value: [10.0, 8.04] },
  { date: '2021-02-01', value: [8.0, 6.95] },
  { date: '2021-03-01', value: [13.0, 7.58] },
  { date: '2021-04-01', value: [9.0, 8.81] },
  { date: '2021-05-01', value: [11.0, 8.33] },
  { date: '2021-06-01', value: [14.0, 9.96] },
  { date: '2021-07-01', value: [6.0, 7.24] },
  { date: '2021-08-01', value: [4.0, 4.26] },
  { date: '2021-09-01', value: [12.0, 10.84] },
  { date: '2021-10-01', value: [7.0, 4.82] },
  { date: '2021-11-01', value: [5.0, 5.68] },
  { date: '2021-12-01', value: [10.0, 9.14] },
  { date: '2022-01-01', value: [8.0, 8.14] },
  { date: '2022-02-01', value: [13.0, 8.74] },
  { date: '2022-03-01', value: [9.0, 8.77] },
  { date: '2022-04-01', value: [11.0, 9.26] },
  { date: '2022-05-01', value: [14.0, 8.1] },
  { date: '2022-06-01', value: [6.0, 6.13] },
  { date: '2022-07-01', value: [4.0, 3.1] },
  { date: '2022-08-01', value: [12.0, 9.13] },
  { date: '2022-09-01', value: [7.0, 7.26] },
  { date: '2022-10-01', value: [5.0, 4.74] },
  { date: '2022-11-01', value: [10.0, 7.46] },
  { date: '2022-12-01', value: [8.0, 6.77] },
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

const SCATTER_OPTION = (data) => {
  const values = data.map((d) => {
    const date = new Date(d.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const currMonth = currDate.getMonth();
    const highlight = month === currMonth && year === currYear;
    return {
      value: d.value,
      label: {
        show: true,
        position: 'top',
        formatter: ({ dataIndex }) => {
          return new Date(data[dataIndex]?.date).getMonth() + 1;
        },
        ...(highlight && {
          fontSize: 14,
          fontWeight: 'bold',
          color: colors._yellow,
        }),
      },
      itemStyle: {
        ...(year === 2022 && {
          color: colors._blue,
        }),
        ...(year === 2021 && {
          color: colors.primary['500'],
        }),
        ...(highlight && {
          color: colors._yellow,
        }),
      },
      symbolSize: highlight ? 10 : 6,
    };
  });

  const maxX = Math.ceil(Math.max(...data.map((d) => d.value[0]))) + 1;
  const maxY = Math.max(Math.ceil(Math.max(...data.map((d) => d.value[1]))), Math.ceil(maxX * SLOPE)) + 1;
  return {
    xAxis: {
      type: 'value',
      name: 'ASP (千元)',
      nameTextStyle: { color: colors.gray['50'] },
      splitLine: { show: false },
      axisTick: { show: false },
      min: 0,
      max: maxX,
    },
    yAxis: {
      type: 'value',
      name: '單台用電\n(度/台)',
      nameTextStyle: { color: colors.gray['50'] },
      splitLine: { show: false },
      axisTick: { show: false },
      min: 0,
      max: maxY,
    },
    series: [
      {
        data: values,
        type: 'scatter',
        symbolSize: (data) => {
          return values.find((v) => v.value.join() === data.join())?.symbolSize || 6;
        },
        markLine: {
          symbol: 'none',
          data: [
            {
              yAxis: TARGET,
              lineStyle: { color: colors._orange },
              label: { position: 'insideEndTop', fontWeight: 'bold' },
            },
            [
              {
                coord: [0, 0],
                name: SLOPE,
                lineStyle: {
                  type: 'solid',
                  color: colors.dangerous['700'],
                  width: 2,
                },
                label: { position: 'insideEndBottom', fontWeight: 'bold' },
              },
              { coord: [maxX, maxY] },
            ],
          ],
        },
      },
    ],
    grid: { left: 48, right: 96, bottom: 48, containLabel: false },
  };
};

const SCATTER_AREA_OPTION = (data) => {
  const maxX = Math.ceil(Math.max(...data.map((d) => d.value[0]))) + 1;
  const maxY = Math.max(Math.ceil(Math.max(...data.map((d) => d.value[1]))), Math.ceil(maxX * SLOPE)) + 1;
  return {
    xAxis: {
      type: 'value',
      name: 'ASP (千元)',
      nameTextStyle: { color: colors.gray['50'] },
      splitLine: { show: false },
      axisTick: { show: false },
      min: 0,
      max: maxX,
      show: false,
    },
    yAxis: {
      type: 'value',
      name: '單台用電\n(度/台)',
      nameTextStyle: { color: colors.gray['50'] },
      splitLine: { show: false },
      axisTick: { show: false },
      min: 0,
      max: maxY,
      show: false,
    },
    series: [
      {
        data: [{ value: [0, 0] }, { value: [TARGET / SLOPE, TARGET] }],
        type: 'line',
        areaStyle: {
          color: colors.primary['600'],
          opacity: 0.2,
        },
        lineStyle: {
          color: 'transparent',
        },
        symbol: 'none',
      },
      {
        data: [{ value: [TARGET / SLOPE, TARGET] }, { value: [maxX, TARGET] }],
        type: 'line',
        areaStyle: {
          color: colors.primary['600'],
          opacity: 0.2,
        },
        lineStyle: {
          color: 'transparent',
        },
        symbol: 'none',
      },
      {
        data: [{ value: [0, TARGET] }, { value: [TARGET / SLOPE, TARGET] }],
        type: 'line',
        areaStyle: {
          color: colors.dangerous['700'],
          opacity: 0.2,
          origin: 'end',
        },
        lineStyle: {
          color: 'transparent',
        },
        symbol: 'none',
      },
      {
        data: [{ value: [TARGET / SLOPE, TARGET] }, { value: [maxX, maxY] }],
        type: 'line',
        areaStyle: {
          color: colors.dangerous['700'],
          opacity: 0.2,
          origin: 'end',
        },
        lineStyle: {
          color: 'transparent',
        },
        symbol: 'none',
      },
    ],
    grid: { left: 48, right: 96, bottom: 48, containLabel: false },
  };
};

const COLUMNS = [
  { Header: '', accessor: 'category' },
  ...Array.from({ length: 12 }, (_, i) => ({
    Header: `${i + 1}月`,
    accessor: String(i),
    Cell: (cell) => (
      <div className="flex justify-center">
        <div className={clsx('rounded-full w-3 h-3', cell.value ? 'bg-primary-500' : 'bg-dangerous-700')}></div>
      </div>
    ),
  })),
];

const DATA = [
  {
    category: '單台用電',
    ...Array.from({ length: 12 }).reduce((prev, curr, i) => ({ ...prev, [i]: i % 2 === 0 }), {}),
  },
  {
    category: '用電強度',
    ...Array.from({ length: 12 }).reduce((prev, curr, i) => ({ ...prev, [i]: i % 2 === 0 }), {}),
  },
  {
    category: '總用電',
    ...Array.from({ length: 12 }).reduce((prev, curr, i) => ({ ...prev, [i]: i % 2 === 0 }), {}),
  },
];

export function Toggle({ on = true }) {
  const [enabled, setEnabled] = useState(on);
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={clsx(
        'bg-primary-600 bg-opacity-20 relative inline-flex flex-shrink-0 h-7 w-24 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 focus:ring-offset-primary-900 items-center'
      )}>
      <span
        aria-hidden="true"
        className={clsx(
          enabled ? 'translate-x-11' : 'translate-x-0',
          'pointer-events-none inline-block h-6 w-12 rounded-full bg-primary-600 text-gray-50 shadow transform ring-0 transition ease-in-out duration-200 z-10 text-center'
        )}>
        {enabled ? 'On' : 'Off'}
      </span>
      <span className="absolute left-2 text-primary-600">Off</span>
      <span className="absolute right-2 text-primary-600">On</span>
    </Switch>
  );
}

export default function ElectricityIndexPage({ className }) {
  const overviewOption = useMemo(() => OVERVIEW_OPTION(OVERVIEW_DATA), []);
  const accOption = useMemo(() => ACC_OPTION(ACC_DATA), []);
  const scatterOption = useMemo(() => SCATTER_OPTION(SCATTER_DATA), []);
  const scatterAreaOption = useMemo(() => SCATTER_AREA_OPTION(SCATTER_DATA), []);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  return (
    <div className={clsx(className, !className && 'h-screen w-screen pt-16 -mt-16 overflow-hidden')}>
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
        <div className="col-start-2 col-span-1 row-span-2 p-4 rounded shadow bg-primary-900 flex flex-col space-y-2">
          <div className="flex justify-between">
            <div className="text-xl font-medium">用電指標關係圖</div>
            <div className="flex justify-end space-x-4">
              <Legend dotClassName="bg-_blue" label="2021年" />
              <Legend dotClassName="bg-primary-500" label="2022年" />
              <Legend dotClassName="bg-_yellow" label="各月基線數值" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 items-center">
              <div className="text-gray-200">顯示去年資訊</div>
              <Toggle />
            </div>
            <div className="flex justify-end space-x-4 items-center">
              <Legend dotClassName="bg-_orange" label="單台用電強度基準線" />
              <Legend dotClassName="bg-dangerous-700" label="用電強度基準線 (百萬度/十億營業額)" />
            </div>
          </div>
          <div className="flex-grow flex flex-col overflow-hidden">
            <div className="flex-grow relative">
              <Chart className="w-full h-full absolute" option={scatterAreaOption} />
              <Chart className="w-full h-full absolute" option={scatterOption} />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="text-xl font-medium text-left">各月份達標情況</div>
              <div className="flex justify-between">
                <Select label="年度" />
                <div className="flex space-x-4">
                  <Legend dotClassName="bg-primary-500" label="達標" />
                  <Legend dotClassName="bg-dangerous-700" label="未達標" />
                </div>
              </div>
              <div className="flex flex-col flex-grow rounded-t-lg shadow mb-1">
                <Table columns={columns} data={data} />
              </div>
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

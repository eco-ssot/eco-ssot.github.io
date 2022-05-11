import { useMemo, useState } from 'react';

import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import { format } from 'date-fns';

import Chart from '../../charts/Chart';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import {
  useGetElectricityBaselineInfoQuery,
  useGetElectricityBaselineInfoStatusQuery,
} from '../../services/electricity';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';

const OVERVIEW_OPTION = (data) => {
  const labels = data?.map((d) => d.month);
  const prev = data?.map((d) => ({ value: d.last_year_value }));
  const curr = data?.map((d) => ({ value: d.current_year_value }));
  const target = data?.map((d) => ({ value: d.baseline }));
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
      axisLabel: { formatter: (value) => baseFormatter(value, { unit: 1e3 }) },
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
  const labels = data?.map((d) => d.day);
  const day = data?.map((d) => ({ value: d.value }));
  const dayAcc = data?.map((d) => ({ value: d.accu_value }));
  const target = data?.map((d) => ({ value: d.alert_value }));
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
      axisLabel: { formatter: (value) => baseFormatter(value, { unit: 1e3 }) },
      splitLine: { show: false },
    },
    series: [
      {
        name: 'day',
        type: 'bar',
        data: day,
        color: colors.primary['500'],
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
        z: 1,
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

const SCATTER_OPTION = ({ currYear, target = 1, slope = 1, data = [] } = {}) => {
  const values = data?.map((d) => {
    const date = new Date(d.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const currMonth = new Date().getMonth();
    const highlight = month === currMonth && year === currYear;
    return {
      name: format(date, 'yyyy-MM'),
      value: [d.asp, d.unit_electricity],
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
        ...(year === currYear - 1 && {
          color: colors._blue,
        }),
        ...(year === currYear && {
          color: colors.primary['500'],
        }),
        ...(highlight && {
          color: colors._yellow,
        }),
      },
      emphasis: {
        scale: 2,
        label: { fontSize: 20 },
      },
      symbolSize: highlight ? 10 : 6,
    };
  });

  const maxX = Math.ceil(Math.max(...data?.map((d) => d.asp)));
  const maxY = Math.max(Math.ceil(Math.max(...data?.map((d) => d.unit_electricity))), Math.ceil(maxX * slope));
  return {
    tooltip: {
      formatter: (params) => {
        const { name, marker, value, seriesType } = params;
        if (seriesType === 'scatter') {
          return `${marker} ${name}  <br> ASP : ${baseFormatter(value[0], {
            precision: 2,
          })} <br> 約當單台用電 : ${baseFormatter(value[1], { precision: 2 })}`;
        }

        return null;
      },
      extraCssText: 'text-align: left;',
    },
    xAxis: {
      type: 'value',
      name: 'ASP\n(千元)',
      nameTextStyle: { color: colors.gray['50'] },
      splitLine: { show: false },
      axisTick: { show: false },
      min: 0,
      max: maxX,
    },
    yAxis: {
      type: 'value',
      name: '約當單台用電\n(度/台)',
      nameTextStyle: { color: colors.gray['50'] },
      splitLine: { show: false },
      axisTick: { show: false },
      min: 0,
      max: maxY,
    },
    series: [
      {
        data: [{ value: [0, 0] }, { value: [target / slope, target] }],
        type: 'line',
        areaStyle: {
          color: colors.primary['600'],
          opacity: 0.2,
        },
        lineStyle: {
          color: 'transparent',
        },
        symbol: 'none',
        silent: true,
      },
      {
        data: [{ value: [target / slope, target] }, { value: [maxX, target] }],
        type: 'line',
        areaStyle: {
          color: colors.primary['600'],
          opacity: 0.2,
        },
        lineStyle: {
          color: 'transparent',
        },
        symbol: 'none',
        silent: true,
      },
      {
        data: [{ value: [0, target] }, { value: [target / slope, target] }],
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
        silent: true,
      },
      {
        data: [{ value: [target / slope, target] }, { value: [maxX, maxX * slope] }],
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
        silent: true,
      },
      {
        type: 'line',
        markLine: {
          symbol: 'none',
          data: [
            {
              yAxis: target?.toFixed(2),
              lineStyle: { color: colors._orange },
              label: { position: 'insideEndTop', fontWeight: 'bold', distance: 0 },
            },
            [
              {
                coord: [0, 0],
                name: slope?.toFixed(2),
                lineStyle: {
                  type: 'solid',
                  color: colors.dangerous['700'],
                  width: 2,
                },
                label: { position: 'insideEndTop', fontWeight: 'bold', distance: 0 },
              },
              { coord: [maxX, maxX * slope] },
            ],
          ],
        },
      },
      {
        data: values,
        type: 'scatter',
        symbolSize: (data) => {
          return values.find((v) => v.value.join() === data.join())?.symbolSize || 6;
        },
      },
    ],
    grid: { left: 48, right: 64, bottom: 48, containLabel: false },
  };
};

const COLUMNS = [
  { Header: '', accessor: 'category' },
  ...Array.from({ length: 12 }, (_, i) => ({
    Header: `${i + 1}月`,
    accessor: String(i + 1).padStart(2, 0),
    Cell: (cell) => (
      <div className="flex justify-center">
        <div
          className={clsx(
            'h-3 w-3 rounded-full',
            cell.value === true && 'bg-primary-500',
            cell.value === false && 'bg-dangerous-700',
            cell.value === 'No Data' && 'bg-gray-50'
          )}></div>
      </div>
    ),
  })),
];

export function Toggle({ enabled = true, onChange = () => {} }) {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className={clsx(
        'relative inline-flex h-7 w-24 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-primary-600 bg-opacity-20 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-primary-900'
      )}>
      <span
        aria-hidden="true"
        className={clsx(
          enabled ? 'translate-x-11' : 'translate-x-0',
          'pointer-events-none z-10 inline-block h-6 w-12 transform rounded-full bg-primary-600 text-center text-gray-50 shadow ring-0 transition duration-200 ease-in-out'
        )}>
        {enabled ? 'On' : 'Off'}
      </span>
      <span className="absolute left-2 text-primary-600">Off</span>
      <span className="absolute right-2 text-primary-600">On</span>
    </Switch>
  );
}

export default function ElectricityIndexPage({ className, year, plant }) {
  const { data } = useGetElectricityBaselineInfoQuery({ year, plant }, { skip: !year || !plant });
  const [selectedYear, setSelectedYear] = useState(year);
  const { data: dataStatus } = useGetElectricityBaselineInfoStatusQuery(
    { year: selectedYear, plant },
    { skip: !selectedYear || !plant }
  );

  const [showLastYear, setShowLastYear] = useState(false);
  const yearOptions = useMemo(
    () => Array.from({ length: 2 }, (_, i) => ({ key: String(year - i), value: String(year - i) })),
    [year]
  );

  const overviewOption = useMemo(() => OVERVIEW_OPTION(data?.data?.total_compare), [data?.data?.total_compare]);
  const accOption = useMemo(() => ACC_OPTION(data?.data?.current_month_accu), [data?.data?.current_month_accu]);
  const scatterOption = useMemo(
    () =>
      SCATTER_OPTION({
        currYear: Number(year),
        lastYear: Number(year) - 1,
        data: showLastYear
          ? data?.data?.indicators?.data
          : data?.data?.indicators?.data?.filter((d) => d.date.startsWith(year)),
        target: data?.data?.indicators?.unit_electricity_target,
        slope: data?.data?.indicators?.electricity_target,
      }),
    [data?.data?.indicators, year, showLastYear]
  );

  const columns = useMemo(() => COLUMNS, []);
  const _yearOptions = useMemo(
    () => yearOptions.filter((option) => Number(option.key) <= Number(year)),
    [year, yearOptions]
  );

  return (
    <div className={clsx(className, !className && '-mt-16 h-screen w-screen overflow-hidden pt-16')}>
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-4 p-4">
        <div className="col-span-1 flex flex-col rounded bg-primary-900 p-4 shadow">
          <div className="flex justify-between">
            <div className="text-xl font-medium">總用電比較</div>
            <div className="space-y-4">
              <div className="flex justify-end  space-x-4">
                <Legend dotClassName="bg-_blue" label={`${year - 1}年`} />
                <Legend dotClassName="bg-primary-500" label={`${year}年`} />
                <Legend dotClassName="bg-_yellow" label="各月基線數值" />
              </div>
              <div className="text-right">* 總用電比較示警：各月之用電基準線</div>
            </div>
          </div>
          <div className="flex flex-grow">{data && <Chart className="h-full w-full" option={overviewOption} />}</div>
        </div>
        <div className="col-span-1 col-start-2 row-span-2 flex flex-col space-y-2 rounded bg-primary-900 p-4 shadow">
          <div className="flex justify-between">
            <div className="text-xl font-medium">用電指標關係圖</div>
            <div className="flex justify-end space-x-4">
              <Legend dotClassName="bg-_blue" label={`${year - 1}年`} />
              <Legend dotClassName="bg-primary-500" label={`${year}年`} />
              <Legend dotClassName="bg-_yellow" label="當前月份" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-gray-200">顯示去年資訊</div>
              <Toggle enabled={showLastYear} onChange={setShowLastYear} />
            </div>
            <div className="flex items-center justify-end space-x-4">
              <Legend dotClassName="bg-_orange" label="單台用電密集度基準線" />
              <Legend dotClassName="bg-dangerous-700" label="用電密集度基準線 (百萬度/十億營業額)" />
            </div>
          </div>
          <div className="flex flex-grow flex-col overflow-hidden">
            <div className="relative flex-grow">
              {data && dataStatus && <Chart className="h-full w-full" option={scatterOption} />}
            </div>
            <div className="flex flex-col space-y-2">
              <div className="text-left text-xl font-medium">各月份達標情況</div>
              <div className="flex justify-between">
                <Select
                  label="年度"
                  options={_yearOptions}
                  selected={_yearOptions.find((option) => option.key === selectedYear)}
                  onChange={(e) => setSelectedYear(e.key)}
                />
                <div className="flex space-x-4">
                  <Legend dotClassName="bg-gray-50" label="無資料" />
                  <Legend dotClassName="bg-primary-500" label="達標" />
                  <Legend dotClassName="bg-dangerous-700" label="未達標" />
                </div>
              </div>
              <div className="flex flex-col overflow-auto rounded-t-lg pb-1 shadow">
                {dataStatus && <Table columns={columns} data={dataStatus.data} />}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col rounded bg-primary-900 p-4 shadow">
          <div className="flex justify-between">
            <div className="text-left text-xl font-medium">
              當月累積用電 : {format(new Date(), `yyyy.MM.${data?.data?.current_month_accu?.[0]?.day || '01'}`)} -{' '}
              {format(new Date(), `yyyy.MM.${data?.data?.current_month_accu?.slice(-1)?.[0]?.day || '01'}`)}
            </div>
            <div className="space-y-4">
              <div className="flex justify-end space-x-4">
                <Legend dotClassName="bg-primary-600" label="累積總用電" />
                <Legend dotClassName="bg-primary-500" label="單日用電" />
                <Legend dotClassName="bg-_yellow" label="今年度用電標準" />
              </div>
            </div>
          </div>
          <div className="text-right">
            * 當月累積用電示警：去年同期的單台用電 * 今年要改善的標準 * 當月累積到前一日的每日產量
          </div>
          <div className="flex flex-grow">{data && <Chart className="h-full w-full" option={accOption} />}</div>
        </div>
      </div>
    </div>
  );
}

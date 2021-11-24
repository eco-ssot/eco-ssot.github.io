import { useState } from 'react';

import clsx from 'clsx';
import { get } from 'lodash';
import { renderToString } from 'react-dom/server';
import { useSelector } from 'react-redux';

import Chart from '../../charts/Chart';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import APP_CONFIG from '../../constants/app-config';
import { selectHash } from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

const BUTTON_GROUP_OPTIONS = [
  { key: 'BASELINE', value: 'baseline' },
  { key: 'PREDICTION', value: 'prediction' },
];

const DIMENSION_OPTIONS = [
  { key: 'site', value: 'By Site' },
  { key: 'month', value: 'By Month' },
];

const BASE_LINE_SUB_COLUMNS = [
  { key: 'actual', value: '實際用電' },
  { key: 'baseline', value: '基準線' },
  { key: 'gap', value: '差異' },
];

const BASE_LINE_DETAIL_ENTRIES = [
  'PCBA產量 (pcs)',
  'FA產量 (pcs)',
  '人數 (人)',
  'PCBA面積 (m²)',
  'FA面積 (m²)',
  '營業額 (十億NTD)',
  '外氣平均溫度 (°C)',
];

const BASE_LINE_COLUMNS = addPaddingColumns([
  { ...EXPAND_COLUMN },
  {
    Header: '月份',
    accessor: 'month',
    rowSpan: 0,
  },
  ...APP_CONFIG.ELECTRICITY_TYPES.map(({ key, value }) => ({
    id: key,
    Header: <div className="border-b border-divider py-3">{value} (度)</div>,
    columns: BASE_LINE_SUB_COLUMNS.map(({ key: _key, value: _value }) => ({
      Header: _value,
      accessor: [key, _key].join('.'),
      className: 'text-right',
      Cell: baseFormatter,
      ...(_key === 'gap' && {
        Cell: (cell) => (
          <div className={clsx(cell.value > 0 ? 'text-dangerous-500 font-semibold' : 'text-green-500 font-semibold')}>
            {cell.value > 0 && '+'}
            {baseFormatter(cell)}
          </div>
        ),
      }),
    })),
  })),
]);

const BASE_LINE_DATA = Array.from({ length: 12 }, (_, i) => ({
  month: i + 1,
  basic: { actual: 13209805, baseline: 15507280, gap: -2297475 },
  airCondition: { actual: 169416, baseline: 199831, gap: -30415 },
  airPressure: { actual: 837715, baseline: 739036, gap: 98679 },
  production: { actual: 1072516, baseline: 1705361, gap: -632845 },
  detail: {
    'PCBA產量 (pcs)': 3065547,
    'FA產量 (pcs)': 133930,
    '人數 (人)': 1123,
    'PCBA面積 (m²)': 2177,
    'FA面積 (m²)': 2414,
    '營業額 (十億NTD)': 0,
    '外氣平均溫度 (°C)': 5,
  },
}));

const PREDICTION_COLUMNS_BY_SITE = (month) => [
  { ...EXPAND_COLUMN },
  {
    Header: 'Site',
    accessor: 'site',
    rowSpan: 0,
  },
  {
    id: 'actual',
    Header: <div className="border-b border-divider py-3">實際工廠用電 (度)</div>,
    columns: [
      {
        Header: 'YTM (1-10月)',
        accessor: 'actual.ytm',
        Cell: baseFormatter,
      },
    ],
  },
  {
    id: 'prediction',
    Header: <div className="border-b border-divider py-3">工廠用電預測 (度)</div>,
    columns: [
      {
        Header: '11月',
        accessor: 'prediction.lastMonth',
        Cell: baseFormatter,
      },
      {
        Header: '12月',
        accessor: 'prediction.currMonth',
        Cell: baseFormatter,
      },
      {
        Header: 'YTM (1-12月) *',
        accessor: 'prediction.ytm',
        Cell: baseFormatter,
      },
    ],
  },
  {
    Header: '綠證目標',
    accessor: 'tRec',
    rowSpan: 0,
    Cell: baseFormatter,
  },
];

const PREDICTION_DATA_BY_SITE = APP_CONFIG.SITE_OPTIONS.map(({ key }) => ({
  site: key,
  actual: { ytm: 39184524 },
  prediction: { lastMonth: 4028412, currMonth: 4028412, ytm: 47241348 },
  tRec: 20122012,
}));

const LINE_OPTION = ({ dataset, lineColors, electricityType }) => {
  return {
    xAxis: {
      type: 'category',
      name: '(月)',
      nameTextStyle: { color: colors.gray['50'] },
      data: Array.from({ length: 12 }, (_, i) => i + 1),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
      axisLabel: { color: colors.gray['50'] },
    },
    yAxis: {
      type: 'value',
      scale: true,
      name: '(千度)',
      nameTextStyle: { color: colors.gray['50'] },
      axisLine: { lineStyle: { color: colors.gray['500'] } },
      axisTick: { show: false },
      axisLabel: { color: colors.gray['50'], formatter: (value) => baseFormatter(value, { unit: 1e3 }) },
      splitLine: { show: false },
    },
    series: Object.entries(dataset).map(([key, data], i) => ({
      type: 'line',
      name: key,
      data: data.map((v) => ({ value: v })),
      symbol: 'none',
      lineStyle: {
        color: lineColors[i],
      },
    })),
    grid: {
      bottom: 0,
      top: 36,
      left: 0,
      right: 48,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      formatter: LineTooltipFormatter(electricityType),
      backgroundColor: 'transparent',
      padding: 0,
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#FAFAFA3F',
              },
              {
                offset: 1,
                color: '#FAFAFA00',
              },
            ],
          },
        },
      },
    },
  };
};

export function toLineDataset(key) {
  return BASE_LINE_DATA.reduce(
    (prev, curr) => {
      return {
        ...prev,
        actual: prev.actual.concat(curr[key].actual),
        baseline: prev.baseline.concat(curr[key].baseline),
      };
    },
    { actual: [], baseline: [] }
  );
}

export const LineTooltipFormatter = (electricityType) => (dataset) => {
  const [actual, baseline] = dataset;
  const actualValue = actual.value;
  const baselineValue = baseline.value;
  const gap = actualValue - baselineValue;
  return renderToString(
    <div className="flex flex-col bg-gray-900 rounded shadow py-2 bg-opacity-75">
      <div className="flex justify-between items-baseline px-4 border-b pb-2 border-divider space-x-4">
        <div>2021.{String(actual.dataIndex + 1).padStart(2, '0')}</div>
        <div>{APP_CONFIG.ELECTRICITY_TYPE_MAPPING[electricityType]}</div>
      </div>
      <div className="flex justify-between items-baseline px-4 space-y-2 space-x-4">
        <div>實際用電</div>
        <div>{baseFormatter(actualValue)}</div>
      </div>
      <div className="flex justify-between items-baseline px-4 space-y-2 space-x-4">
        <div>基準線</div>
        <div>{baseFormatter(baselineValue)}</div>
      </div>
      <div className="flex justify-between items-baseline px-4 space-y-2 space-x-4">
        <div>差異</div>
        <div className={clsx(gap > 0 ? 'text-dangerous-500 font-semibold' : 'text-green-500 font-semibold')}>
          {gap > 0 && '+'}
          {baseFormatter(gap)}
        </div>
      </div>
    </div>
  );
};

export function BaseLinePanel() {
  const [selectedRow, setSelectedRow] = useState(-1);
  return (
    <div className="grid grid-cols-6 overflow-auto gap-4">
      <div className="col-span-5 w-full flex flex-col shadow overflow-auto rounded-t-lg mb-2">
        <Table
          columns={BASE_LINE_COLUMNS}
          data={BASE_LINE_DATA}
          getRowProps={(row) => ({
            className: clsx('cursor-pointer', selectedRow === row.index && 'bg-primary-600 bg-opacity-20'),
            onClick: () => (selectedRow === row.index ? setSelectedRow(-1) : setSelectedRow(row.index)),
          })}
        />
      </div>
      <div className="col-span-1 flex flex-col rounded-t-lg mb-2 overflow-auto shadow">
        <div className="flex flex-col bg-primary-800 p-4 space-y-2 top-0 sticky">
          <div>{`基線數據 : ${BASE_LINE_DATA[selectedRow]?.month || '-'}月`}</div>
          <div className="text-gray-300 text-sm">點擊左方欄位查看該月份數據</div>
        </div>
        <div className="flex flex-col flex-grow border border-divider border-t-0 rounded-b space-y-2.5 py-3 px-4">
          {BASE_LINE_DETAIL_ENTRIES.map((entry) => (
            <div key={entry} className="flex justify-between">
              <div>{entry}</div>
              <div>{baseFormatter(get(BASE_LINE_DATA, [selectedRow, 'detail', entry], '-'))}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChartPanel() {
  return (
    <div className="row-span-2 bg-primary-900 rounded shadow p-4 grid grid-cols-4 gap-4">
      {APP_CONFIG.ELECTRICITY_TYPES.map(({ key, value }, i) => {
        const dataset = toLineDataset(key);
        return (
          <div key={key} className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <div className="text-xl font-medium">{`${value}預測`}</div>
              {i === APP_CONFIG.ELECTRICITY_TYPES.length - 1 && (
                <div className="flex space-x-4">
                  <Legend dotClassName="bg-_yellow" label="預測基準線" />
                  <Legend dotClassName="bg-primary-600" label="實際用電" />
                </div>
              )}
            </div>
            <Chart
              className="w-full h-full"
              option={LINE_OPTION({
                dataset,
                lineColors: [colors.primary['600'], colors._yellow],
                electricityType: key,
              })}
            />
          </div>
        );
      })}
    </div>
  );
}

export function PredictionPanel({ dimension }) {
  const [selectedRow, setSelectedRow] = useState(-1);
  return (
    <>
      <div className="self-end">＊工廠用電預測 YTM = 實際工廠用電 + 2個月工廠用電預測</div>
      <div className="grid grid-cols-3 gap-4 h-full overflow-hidden">
        <div className="col-span-2 w-full flex flex-col shadow overflow-auto rounded-t-lg">
          <Table
            columns={PREDICTION_COLUMNS_BY_SITE()}
            data={PREDICTION_DATA_BY_SITE}
            getRowProps={(row) => ({
              className: clsx('cursor-pointer', selectedRow === row.index && 'bg-primary-600 bg-opacity-20'),
              onClick: () => (selectedRow === row.index ? setSelectedRow(-1) : setSelectedRow(row.index)),
            })}
          />
        </div>
        <div className="col-span-1 flex flex-col overflow-auto">
          <div className="flex flex-col rounded-t-lg mb-2 overflow-auto shadow">
            <div className="flex flex-col bg-primary-800 p-4 space-y-2 top-0 sticky">
              <div className="border-b border-divider pb-2">{`預測基線數據 : - `}</div>
              <div className="text-gray-300 text-sm">點擊左方欄位查看該月份數據</div>
            </div>
            <div className="flex flex-col flex-grow border border-divider border-t-0 rounded-b space-y-2.5 py-3 px-4">
              {BASE_LINE_DETAIL_ENTRIES.map((entry) => (
                <div key={entry} className="flex justify-between">
                  <div>{entry}</div>
                  <div>{baseFormatter(get(BASE_LINE_DATA, [selectedRow, 'detail', entry], '-'))}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col flex-grow border border-divider rounded shadow p-4 space-y-2 min-h-[256px] overflow-hidden">
            {dimension === DIMENSION_OPTIONS[0].key ? (
              <>
                <div className="text-xl font-medium">預測今年綠證總購買量 : All sites</div>
                <div className="text-sm text-gray-300">每年11月計算</div>
                <div className="text-2xl font-semibold flex flex-grow flex-col items-center justify-center">
                  372,481,702 度
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <div className="text-xl font-medium">生產用電模型預測</div>
                  <div className="flex space-x-4">
                    <Legend dotClassName="bg-_yellow" label="預測用電" />
                    <Legend dotClassName="bg-primary-600" label="實際用電" />
                  </div>
                </div>
                <Chart
                  className="w-full h-full pl-4"
                  option={LINE_OPTION({
                    dataset: toLineDataset(APP_CONFIG.ELECTRICITY_TYPES.slice(-1)[0].key),
                    lineColors: [colors._yellow, colors.primary['600']],
                    electricityType: APP_CONFIG.ELECTRICITY_TYPES.slice(-1)[0].key,
                  })}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function ElectricityBaselinePage() {
  const hash = useSelector(selectHash);
  const [searchOption, setSearchOption] = useState({
    year: APP_CONFIG.YEAR_OPTIONS[0].key,
    month: APP_CONFIG.MONTH_OPTIONS[0].key,
    dimension: DIMENSION_OPTIONS[0].key,
  });

  const isPredictionTab = hash.slice(1) === BUTTON_GROUP_OPTIONS[1].key;
  return (
    <div className="grid grid-rows-5 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden">
      <div
        className={clsx(
          'bg-primary-900 rounded shadow p-4 flex flex-col space-y-4 overflow-auto',
          isPredictionTab ? 'row-span-5' : 'row-span-3'
        )}>
        <div className="text-xl font-medium">用電分析</div>
        <ButtonGroup
          className="self-center"
          options={BUTTON_GROUP_OPTIONS}
          selected={isPredictionTab ? BUTTON_GROUP_OPTIONS[1] : BUTTON_GROUP_OPTIONS[0]}
          onChange={(e) => navigate({ hash: e.key }, { merge: false })}
        />
        <div className="flex w-full justify-center items-center">
          <div className="flex w-full items-center justify-center space-x-8">
            {isPredictionTab && (
              <Select
                buttonClassName="w-36"
                label="資料呈現："
                options={DIMENSION_OPTIONS}
                selected={DIMENSION_OPTIONS.find((option) => option.key === searchOption.dimension)}
                onChange={(e) => setSearchOption((prev) => ({ ...prev, dimension: e.key }))}
              />
            )}
            <Select
              label="查詢年度："
              options={APP_CONFIG.YEAR_OPTIONS}
              selected={APP_CONFIG.YEAR_OPTIONS.find((option) => option.key === searchOption.year)}
              onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
            />
            {isPredictionTab ? (
              <Select
                buttonClassName="w-24"
                label="查詢月份："
                options={APP_CONFIG.MONTH_OPTIONS}
                selected={APP_CONFIG.MONTH_OPTIONS.find((option) => option.key === searchOption.month)}
                onChange={(e) => setSearchOption((prev) => ({ ...prev, month: e.key }))}
              />
            ) : (
              <Select label="Site：" options={APP_CONFIG.SITE_OPTIONS} />
            )}
            <Button>搜尋</Button>
          </div>
          <Button className="absolute right-8">Excel</Button>
        </div>
        {isPredictionTab ? <PredictionPanel dimension={searchOption.dimension} /> : <BaseLinePanel />}
      </div>
      {!isPredictionTab && <ChartPanel />}
    </div>
  );
}

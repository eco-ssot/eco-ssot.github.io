import { useState } from 'react';
import { useRef } from 'react';

import clsx from 'clsx';
import { get, isEmpty, isNil } from 'lodash';
import qs from 'query-string';
import { renderToString } from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import Chart from '../../charts/Chart';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import APP_CONFIG from '../../constants/app-config';
import { navigate } from '../../router/helpers';
import { useGetElectricityPredictionQuery, useGetElectricityBaselineQuery } from '../../services/electricity';
import { useGetPlantOptionsQuery } from '../../services/management';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

import { gapFormatter, getYtmLabel } from './helpers';

const BUTTON_GROUP_OPTIONS = [
  { key: 'BASELINE', value: 'baseline' },
  { key: 'PREDICTION', value: 'prediction' },
];

const DIMENSION_OPTIONS = [
  { key: 'plant', value: 'By Plant' },
  { key: 'month', value: 'By Month' },
];

const BASE_LINE_SUB_COLUMNS = [
  { key: 'actual', value: 'actual' },
  { key: 'baseline', value: 'baseline' },
  { key: 'gap', value: 'gap' },
];

const BASE_LINE_DETAIL_ENTRIES = [
  { key: 'PCBAProduction', name: 'PCBA產量 (pcs)' },
  { key: 'FAProduction', name: 'FA產量 (pcs)' },
  { key: 'manpower', name: '人數 (人)' },
  { key: 'PCBALines', name: 'PCBA 開線數量' },
  { key: 'FALines', name: 'FA 開線數量' },
  { key: 'revenue', name: '營業額 (十億NTD)' },
  { key: 'temperature', name: '外氣平均溫度 (°C)' },
];

const BASE_LINE_COLUMNS = (t) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: t('baselinePage:baselinePanel.table.month'),
      accessor: 'month',
      rowSpan: 0,
      Cell: (cell) => t(`common:month.${cell.value}`),
    },
    ...APP_CONFIG.ELECTRICITY_TYPES.map(({ key, value }) => ({
      id: key,
      Header: <div className="border-b border-divider py-3">{t(`baselinePage:baselinePanel.table.${value}`)}</div>,
      columns: BASE_LINE_SUB_COLUMNS.map(({ key: _key, value: _value }) => ({
        Header: t(`baselinePage:baselinePanel.table.${_key}`),
        accessor: [key, _key].join('.'),
        className: 'text-right',
        Cell: baseFormatter,
        ...(_key === 'gap' && {
          Cell: gapFormatter,
        }),
      })),
    })),
  ]);

const HISTORY_COLUMNS = [
  {
    id: 'prediction',
    Header: <div className="border-b border-divider py-3">當月工廠用電預測 (度)</div>,
    columns: [
      {
        Header: '預測',
        accessor: 'predicted',
        Cell: baseFormatter,
        className: 'text-right',
      },
      {
        Header: '實際',
        accessor: 'actual',
        Cell: baseFormatter,
        className: 'text-right',
      },
      {
        Header: '差異',
        accessor: 'gap',
        className: 'text-right',
        Cell: gapFormatter,
      },
    ],
  },
];

const PREDICTION_COLUMNS_BY_SITE = ({ month } = {}) => {
  const m = Number(month);
  const nextMonth = m + 1;
  const currMonth = new Date().getMonth() + 1;
  const isHistory = currMonth > m;
  const currColumns = [
    {
      id: 'actual',
      Header: <div className="border-b border-divider py-3">實際工廠用電 (度)</div>,
      columns: [
        {
          Header: getYtmLabel(m),
          accessor: 'actualYTM',
          Cell: baseFormatter,
          className: 'text-right',
        },
      ],
    },
    {
      id: 'prediction',
      Header: <div className="border-b border-divider py-3">工廠用電預測 (度)</div>,
      columns: [
        {
          Header: `${m}月`,
          accessor: 'predicted.selected',
          Cell: baseFormatter,
          className: 'text-right',
        },
        {
          Header: `${nextMonth > 12 ? '-' : `${nextMonth}月`}`,
          accessor: 'predicted.nextMonth',
          Cell: baseFormatter,
          className: 'text-right',
        },
        {
          Header: `YTM (1-${nextMonth > 12 ? 12 : nextMonth}月) *`,
          accessor: 'predicted.YTM',
          className: 'text-right',
          Cell: baseFormatter,
        },
      ],
    },
  ];

  return addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Plant',
      accessor: 'plant',
      rowSpan: 0,
    },
    ...(isHistory ? HISTORY_COLUMNS : currColumns),
    {
      Header: '年度預測綠證目標 (11月)',
      accessor: 'rec',
      className: 'text-right',
      rowSpan: 0,
      Cell: baseFormatter,
    },
  ]);
};

const PREDICTION_COLUMNS_BY_MONTH = () =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: '月份',
      accessor: 'month',
      rowSpan: 0,
      Cell: (cell) => `${Number(cell.value)}月`,
    },
    ...HISTORY_COLUMNS,
    {
      Header: '年度預測綠證目標 (11月)',
      accessor: 'rec',
      className: 'text-right',
      rowSpan: 0,
      Cell: baseFormatter,
    },
  ]);

const LINE_OPTION = ({ t, dataset, lineColors, type, compareName, actualName, year }) => {
  return {
    xAxis: {
      type: 'category',
      name: `(${t('common:monthText')})`,
      nameTextStyle: { color: colors.gray['50'] },
      data: Array.from({ length: 12 }, (_, i) => i + 1),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
      axisLabel: { color: colors.gray['50'] },
    },
    yAxis: {
      type: 'value',
      scale: true,
      name: `(${t('common:mwh')})`,
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
      left: 24,
      right: 48,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      formatter: LineTooltipFormatter({ t, type, compareName, actualName, year }),
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

export const LineTooltipFormatter =
  ({ t, type, compareName, actualName, year }) =>
  (dataset) => {
    const [actual, baseline] = dataset;
    const actualValue = actual.value;
    const baselineValue = baseline.value;
    const gap = actualValue - baselineValue;
    return renderToString(
      <div className="flex flex-col bg-gray-900 rounded shadow py-2 bg-opacity-75">
        <div className="flex justify-between items-baseline px-4 border-b pb-2 border-divider space-x-4">
          <div>
            {year}.{String(actual.dataIndex + 1).padStart(2, '0')}
          </div>
          <div>{t(`baselinePage:${type}`)}</div>
        </div>
        <div className="flex justify-between items-baseline px-4 space-y-2 space-x-4">
          <div>{actualName || t('baselinePage:actual')}</div>
          <div>{baseFormatter(actualValue)}</div>
        </div>
        <div className="flex justify-between items-baseline px-4 space-y-2 space-x-4">
          <div>{compareName || t('baselinePage:baseline')}</div>
          <div>{baseFormatter(baselineValue)}</div>
        </div>
        <div className="flex justify-between items-baseline px-4 space-y-2 space-x-4">
          <div>{t('baselinePage:gap')}</div>
          <div className={clsx(gap > 0 ? 'text-dangerous-500 font-semibold' : 'text-green-500 font-semibold')}>
            {gap > 0 && '+'}
            {baseFormatter(gap)}
          </div>
        </div>
      </div>
    );
  };

export function PredictionPanel({ categorized, year, month, plant }) {
  const byMonth = categorized === 'month';
  const option = byMonth ? { categorized, year, plant } : { categorized, year, month };
  const { data } = useGetElectricityPredictionQuery(option, { skip: Object.values(option).every(isNil) });
  const [selectedRow, setSelectedRow] = useState(-1);
  if (isNil(data)) {
    return null;
  }

  const r = data.data[selectedRow] || {};
  const m = Number(month);
  const dataset = data.data.reduce(
    (prev, curr) => ({
      ...prev,
      actual: prev.actual.concat(curr.actual),
      prediction: prev.prediction.concat(curr.predicted),
    }),
    { actual: [], prediction: [] }
  );

  return (
    <>
      {!byMonth && <div className="self-end">＊工廠用電預測 YTM = 實際工廠用電 + 2個月工廠用電預測</div>}
      <div className="grid grid-cols-3 gap-4 h-full overflow-hidden">
        <div className="col-span-2 w-full flex flex-col shadow overflow-auto rounded-t-lg">
          <Table
            columns={byMonth ? PREDICTION_COLUMNS_BY_MONTH() : PREDICTION_COLUMNS_BY_SITE({ year, month })}
            data={data.data}
            getRowProps={(row) => ({
              className: clsx('cursor-pointer', selectedRow === row.index && 'bg-primary-600 bg-opacity-20'),
              onClick: () => (selectedRow === row.index ? setSelectedRow(-1) : setSelectedRow(row.index)),
            })}
          />
        </div>
        <div className="col-span-1 flex flex-col overflow-auto">
          <div className="flex flex-col rounded-t-lg mb-2 overflow-auto shadow">
            <div className="flex flex-col bg-primary-800 p-4 pb-2 space-y-2 top-0 sticky">
              <div className="border-b border-divider pb-1">{`預測基線數據 : ${
                (byMonth ? `${Number(r.month) || '-'}月` : r.plant) || '-'
              }  `}</div>
              <div className="flex">
                <div className="w-1/2 text-gray-300 text-sm">點擊左方欄位查看該月份數據</div>
                <div className="w-1/2 flex flex-row-reverse">
                  {byMonth ? (
                    <>
                      <div className="w-1/2 text-right">實際</div>
                      <div>預測</div>
                    </>
                  ) : (
                    <>
                      {m + 1 < 12 && <div className="w-1/2 text-right">{m + 1}月</div>}
                      <div>{m}月</div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-grow border border-divider border-t-0 rounded-b space-y-2.5 py-3 px-4">
              {BASE_LINE_DETAIL_ENTRIES.map(({ key, name }) => (
                <div key={key} className="flex">
                  <div className="w-1/2">{name}</div>
                  <div className="w-1/2 flex flex-row-reverse">
                    {byMonth ? (
                      <>
                        <div className="w-1/2 text-right">{baseFormatter(get(r, [key, 'actual']))}</div>
                        <div className="w-1/2 text-right">{baseFormatter(get(r, [key, 'predicted']))}</div>
                      </>
                    ) : (
                      <>
                        {m + 1 < 13 && (
                          <div className="w-1/2 text-right">{baseFormatter(get(r, [key, 'nextMonth']))}</div>
                        )}
                        <div className="w-1/2 text-right">{baseFormatter(get(r, [key, 'selected']))}</div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col flex-grow border border-divider rounded shadow p-4 space-y-2 min-h-[256px] overflow-hidden">
            {byMonth ? (
              <>
                <div className="flex justify-between">
                  <div className="text-xl font-medium">工廠用電模型預測</div>
                  <div className="flex space-x-4">
                    <Legend dotClassName="bg-_yellow" label="預測用電" />
                    <Legend dotClassName="bg-primary-600" label="實際用電" />
                  </div>
                </div>
                <Chart
                  className="w-full h-full pl-4"
                  option={LINE_OPTION({
                    year,
                    dataset,
                    lineColors: [colors.primary['600'], colors._yellow],
                    type: '工廠用電模型預測',
                    compareName: '預測用電',
                  })}
                />
              </>
            ) : (
              <>
                <div className="text-xl font-medium">預測今年綠證總購買量 : All sites</div>
                <div className="text-sm text-gray-300">每年11月計算</div>
                <div className="text-2xl font-semibold flex flex-grow flex-col items-center justify-center">
                  {data.totalRec} 度
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function ChartPanel({ plant, year }) {
  const { t } = useTranslation();
  const option = { year, plant };
  const { data } = useGetElectricityBaselineQuery(option, { skip: Object.values(option).every(isNil) });
  return (
    <div className="row-span-2 bg-primary-900 rounded shadow p-4 grid grid-cols-4 gap-4">
      {APP_CONFIG.ELECTRICITY_TYPES.map(({ key, value }, i) => {
        const dataset = data?.data?.reduce(
          (prev, curr) => ({
            ...prev,
            actual: prev.actual.concat(curr[key].actual),
            baseline: prev.actual.concat(curr[key].baseline),
          }),
          { actual: [], baseline: [] }
        );

        return (
          <div key={key} className="flex flex-col space-y-2">
            <div className="flex justify-between relative">
              <div className="text-xl font-medium whitespace-nowrap">
                {t(`baselinePage:${key}`)}
                {t('baselinePage:modelPrediction')}
              </div>
              {i === APP_CONFIG.ELECTRICITY_TYPES.length - 1 && (
                <div className="flex space-x-4 absolute right-2 top-8">
                  <Legend dotClassName="bg-_yellow" label={t('baselinePage:predictionBaseline')} />
                  <Legend dotClassName="bg-primary-600" label={t('baselinePage:actual')} />
                </div>
              )}
            </div>
            {data && (
              <Chart
                className="w-full h-full"
                option={LINE_OPTION({
                  t,
                  year,
                  dataset,
                  lineColors: [colors.primary['600'], colors._yellow],
                  type: key,
                })}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function BaselinePanel({ year, plant }) {
  const { t } = useTranslation(['baselinePage', 'common']);
  const option = { year, plant };
  const [selectedRow, setSelectedRow] = useState(-1);
  const { data } = useGetElectricityBaselineQuery(option, { skip: Object.values(option).every(isNil) });
  if (isNil(data)) {
    return null;
  }

  const r = data.data[selectedRow] || {};
  return (
    <div className="grid grid-cols-6 overflow-auto gap-4">
      <div className="col-span-5 w-full flex flex-col shadow overflow-auto rounded-t-lg mb-2">
        <Table
          columns={BASE_LINE_COLUMNS(t)}
          data={data.data}
          getRowProps={(row) => ({
            className: clsx('cursor-pointer', selectedRow === row.index && 'bg-primary-600 bg-opacity-20'),
            onClick: () => (selectedRow === row.index ? setSelectedRow(-1) : setSelectedRow(row.index)),
          })}
        />
      </div>
      <div className="col-span-1 flex flex-col rounded-t-lg mb-2 overflow-auto shadow">
        <div className="flex flex-col bg-primary-800 p-4 space-y-2 top-0 sticky">
          <div>
            {t('baselinePage:baselinePanel.baselineData')} :{' '}
            {t(`common:month.${Number(r.month)}`, {
              defaultValue: '-',
            })}
            {t('common:month.text')}
          </div>
          <div className="text-gray-300 text-sm">{t('baselinePage:baselinePanel.selectFromLeftDesc')}</div>
        </div>
        <div className="flex flex-col flex-grow border border-divider border-t-0 rounded-b space-y-2.5 py-3 px-4">
          {BASE_LINE_DETAIL_ENTRIES.map(({ key, name }) => (
            <div key={key} className="flex justify-between">
              <div>{t(`baselinePage:${key}`)}</div>
              <div>{baseFormatter(get(r, [selectedRow, key]))}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TabPanel({ children }) {
  const { hash, search } = useLocation();
  const { lng, business, ...option } = qs.parse(search);
  const isPrediction = hash.slice(1) === BUTTON_GROUP_OPTIONS[1].key;
  return children({
    option,
    isPrediction,
  });
}

export function BaselineSearch({ ...option }) {
  const { t } = useTranslation(['component']);
  const [searchOption, setSearchOption] = useState(option);
  const { data: plantOptions } = useGetPlantOptionsQuery();
  return (
    <div className="flex w-full items-center justify-center space-x-8">
      <Select
        label={`${t('component:selectLabel.searchYear')} : `}
        options={APP_CONFIG.YEAR_OPTIONS}
        selected={APP_CONFIG.YEAR_OPTIONS.find((option) => option.key === searchOption.year)}
        onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
      />
      <Select
        buttonClassName="w-36"
        label="Plant : "
        options={plantOptions || APP_CONFIG.PLANT_OPTIONS}
        selected={plantOptions?.find((option) => option.key === searchOption.plant)}
        onChange={(e) => setSearchOption((prev) => ({ ...prev, plant: e.key }))}
      />
      <Button
        onClick={() =>
          navigate({
            ...searchOption,
            ...(!searchOption.year && { year: APP_CONFIG.YEAR_OPTIONS[0].key }),
            ...(!searchOption.plant && { plant: plantOptions[0].key }),
          })
        }>
        {t('component:button.search')}
      </Button>
    </div>
  );
}

export function PredictionSearch({ ...option }) {
  const { t } = useTranslation(['component']);
  const [searchOption, setSearchOption] = useState(option);
  const { data: plantOptions } = useGetPlantOptionsQuery();
  const byMonth = searchOption.categorized === 'month';
  return (
    <div className="flex w-full items-center justify-center space-x-8">
      <Select
        label={`${t('component:selectLabel.dimension')} : `}
        buttonClassName="w-36"
        options={DIMENSION_OPTIONS}
        selected={DIMENSION_OPTIONS.find((option) => option.key === searchOption.categorized)}
        onChange={(e) =>
          setSearchOption((prev) => ({ ...prev, categorized: e.key, ...(e.key === 'month' && { month: null }) }))
        }
      />
      <Select
        label={`${t('component:selectLabel.searchYear')} : `}
        options={APP_CONFIG.YEAR_OPTIONS}
        selected={APP_CONFIG.YEAR_OPTIONS.find((option) => option.key === searchOption.year)}
        onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
      />
      {byMonth ? (
        <Select
          buttonClassName="w-36"
          label="Plant : "
          options={plantOptions || APP_CONFIG.PLANT_OPTIONS}
          selected={plantOptions?.find((option) => option.key === searchOption.plant)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, plant: e.key }))}
        />
      ) : (
        <Select
          buttonClassName="w-20"
          label={`${t('component:selectLabel.predictionMonth')} : `}
          options={APP_CONFIG.MONTH_OPTIONS}
          selected={APP_CONFIG.MONTH_OPTIONS.find(
            (option) => option.key === searchOption.month || option.key === String(new Date().getMonth() + 1)
          )}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, month: e.key }))}
        />
      )}
      <Button
        onClick={() =>
          navigate({
            ...searchOption,
            ...(!searchOption.categorized && { categorized: DIMENSION_OPTIONS[0].key }),
            ...(!searchOption.year && { year: APP_CONFIG.YEAR_OPTIONS[0].key }),
            ...(!byMonth && !searchOption.month && { month: String(new Date().getMonth() + 1) }),
            ...(byMonth && !searchOption.plant && { plant: plantOptions[0].key }),
          })
        }>
        搜尋
      </Button>
    </div>
  );
}

export default function ElectricityBaselinePage() {
  const { t } = useTranslation(['baselinePage', 'component']);
  const baselineRef = useRef({});
  const predictionRef = useRef({});
  return (
    <>
      <div className="grid grid-rows-5 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden">
        <TabPanel>
          {({ isPrediction, option }) => (
            <>
              <div
                className={clsx(
                  'bg-primary-900 rounded shadow p-4 flex flex-col space-y-4 overflow-auto',
                  isPrediction || isEmpty(option) ? 'row-span-5' : 'row-span-3'
                )}>
                <div className="text-xl font-medium">{t('baselinePage:title')}</div>
                <ButtonGroup
                  className="self-center"
                  options={BUTTON_GROUP_OPTIONS}
                  selected={isPrediction ? BUTTON_GROUP_OPTIONS[1] : BUTTON_GROUP_OPTIONS[0]}
                  onChange={(e) => {
                    navigate(
                      { hash: e.key, ...(isPrediction ? { ...baselineRef.current } : { ...predictionRef.current }) },
                      { merge: false }
                    );

                    if (e.key === BUTTON_GROUP_OPTIONS[0].key) {
                      predictionRef.current = option;
                    } else {
                      baselineRef.current = option;
                    }
                  }}
                />
                <div className="flex w-full justify-center items-center">
                  {isPrediction ? <PredictionSearch {...option} /> : <BaselineSearch {...option} />}
                  <Button className="absolute right-8">Excel</Button>
                </div>
                {isPrediction ? <PredictionPanel {...option} /> : <BaselinePanel {...option} />}
              </div>
              {!isPrediction && !isEmpty(option) && <ChartPanel {...option} />}
            </>
          )}
        </TabPanel>
      </div>
    </>
  );
}

import { useEffect, useState, useRef } from 'react';

import { PencilIcon, PlusIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { addMonths, isFuture } from 'date-fns';
import { get, isEmpty, isNil } from 'lodash';
import qs from 'query-string';
import { renderToString } from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { selectCurrMonth, selectYearOptions } from '../../app/appSlice';
import Chart from '../../charts/Chart';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import EditableTable, { EditableButton, EditableIconButton, TextareaCell } from '../../components/table/EditableTable';
import Table from '../../components/table/Table';
import APP_CONFIG from '../../constants/app-config';
import { navigate } from '../../router/helpers';
import { useGetSummaryQuery } from '../../services/app';
import { useGetElectricityPredictionQuery, useGetElectricityBaselineQuery } from '../../services/electricity';
import { useGetPlantOptionsQuery } from '../../services/management';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';
import { trimNumber } from '../../utils/number';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

import { gapFormatter, getYtmLabel } from './helpers';

const BUTTON_GROUP_OPTIONS = [
  { key: 'BASELINE', value: 'baseline' },
  { key: 'PREDICTION', value: 'prediction' },
  { key: 'POWER_SAVING', value: 'powerSaving' },
];

const DIMENSION_OPTIONS = [
  { key: 'plant', value: 'By Plant' },
  { key: 'month', value: 'By Month' },
];

const BASE_LINE_SUB_COLUMNS = [
  { key: 'actual', value: 'actualElectricity' },
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
      Cell: (cell) => `${t(`common:month.${Number(cell.value)}`)}${t(`common:month.text`)}`,
    },
    ...APP_CONFIG.ELECTRICITY_TYPES.map(({ key, value }) => ({
      id: key,
      Header: <div className="border-b border-divider py-3">{t(`baselinePage:baselinePanel.table.${value}`)}</div>,
      columns: BASE_LINE_SUB_COLUMNS.map(({ key: _key, value: _value }) => ({
        Header: t(`baselinePage:baselinePanel.table.${_value}`),
        accessor: [key, _key].join('.'),
        className: 'text-right',
        Cell: baseFormatter,
        ...(_key === 'gap' && {
          Cell: gapFormatter,
        }),
      })),
    })),
  ]);

const HISTORY_COLUMNS = (t) => [
  {
    id: 'prediction',
    Header: (
      <div className="border-b border-divider py-3">{t('baselinePage:predictionPanel.table.monthlyElectricity')}</div>
    ),
    columns: [
      {
        Header: t('baselinePage:predicted'),
        accessor: 'predicted',
        Cell: baseFormatter,
        className: 'text-right',
      },
      {
        Header: t('baselinePage:actual'),
        accessor: 'actual',
        Cell: baseFormatter,
        className: 'text-right',
      },
      {
        Header: t('baselinePage:gap'),
        accessor: 'gap',
        className: 'text-right',
        Cell: gapFormatter,
      },
    ],
  },
];

export const POWER_SAVING_COLUMNS = ({ setData }) => [
  {
    Header: '用電類型',
    accessor: 'category',
    rowSpan: 0,
    className: 'w-[6%] text-center',
  },
  {
    Header: '改善措施',
    accessor: 'name',
    className: 'w-[10%] text-center',
    rowSpan: 0,
  },
  {
    id: 'expect',
    Header: <div className="border-b border-divider py-3">預計效益 (度)</div>,
    columns: Array.from({ length: 12 }, (_, i) => ({
      Header: `${i + 1}月`,
      accessor: String(i + 1),
      editable: true,
      className: '!px-1 w-[4%] text-right',
      formatter: baseFormatter,
    })).concat({
      id: 'total',
      Header: '總計',
      className: '!px-1 w-[4%] text-right',
      Cell: (cell) => {
        const ttl = Object.entries(cell.row.original)
          .filter(([key]) => !isNaN(Number(key)))
          .reduce((prev, curr) => prev + trimNumber(curr[1]), 0);

        return baseFormatter(ttl);
      },
    }),
  },
  {
    Header: 'PIC',
    accessor: 'PIC',
    rowSpan: 0,
    className: 'w-[5%] text-center',
  },
  {
    Header: '計算邏輯',
    accessor: 'logic',
    rowSpan: 0,
    editable: true,
    EditableComponent: TextareaCell,
    className: 'w-[12%] py-2',
  },
  {
    Header: '備註',
    accessor: 'desc',
    rowSpan: 0,
    editable: true,
    EditableComponent: TextareaCell,
    className: 'w-[10%]',
  },
  {
    id: 'action',
    Header: '編輯',
    className: 'w-[5%] text-center',
    rowSpan: 0,
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() =>
            setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                ...(i === cell.row.index && { editing: false }),
              }))
            )
          }>
          儲存
        </EditableButton>
      ) : (
        <EditableIconButton
          onClick={() =>
            setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                ...(i === cell.row.index && { editing: true }),
              }))
            )
          }>
          <PencilIcon className="w-5 h-5" />
        </EditableIconButton>
      );
    },
  },
];

export const POWER_SAVING_PLAN_COLUMNS = addPaddingColumns([
  {
    Header: '用電類型',
    accessor: 'category',
    className: 'text-center w-24',
  },
  ...Array.from({ length: 12 }, (_, i) => ({
    Header: `${i + 1}月`,
    accessor: String(i + 1),
    className: 'text-right',
    Cell: baseFormatter,
  })),
  {
    Header: '總計',
    accessor: 'total',
    className: 'text-right',
    Cell: baseFormatter,
  },
]);

export const POWER_SAVING_DATA = [
  {
    category: '空調用電',
    name: '空調箱智慧控制',
    1: 1065,
    2: 0,
    3: 3861,
    4: 2471,
    5: 0,
    6: 0,
    7: 1798,
    8: 2816,
    9: 2592,
    10: 3402,
    11: 0,
    12: 2366,
    PIC: '王一二',
    logic:
      '2020年空調箱總用電 127.5萬度 利用送/回/新風溫度、冰水溫度、CO2濃度自動調節風閥、變頻器管理節電，減少主系統負載過剩狀況，預估空調 箱效益5%127.5萬度 *5%=63,741KWH',
    remark: '',
  },
  {
    category: '基礎用電',
    name: '智慧照明控制系統',
    1: 0,
    2: 1928,
    3: 2017,
    4: 3917,
    5: 2463,
    6: 0,
    7: 926,
    8: 1261,
    9: 3160,
    10: 2715,
    11: 1182,
    12: 0,
    PIC: '王一二',
    logic: '年度照明用電160.5萬 度，按時間、照度進行管控，減少人員未落實節電相關行為。',
    remark: '',
  },
];

export const POWER_SAVING_PLAN_DATA = [
  {
    category: '基礎用電',
    1: 1337,
    2: 0,
    3: 2514,
    4: 916,
    5: 0,
    6: 7561,
    7: 3165,
    8: 1434,
    9: 1027,
    10: 2027,
    11: 0,
    12: 725,
    total: 20706,
  },
  {
    category: '空調用電',
    1: 0,
    2: 0,
    3: 0,
    4: 1073,
    5: 729,
    6: 2615,
    7: 0,
    8: 0,
    9: 1127,
    10: 819,
    11: 3721,
    12: 2367,
    total: 12001,
  },
  {
    category: '空壓用電',
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 3471,
    8: 4017,
    9: 3977,
    10: 5836,
    11: 0,
    12: 0,
    total: 17301,
  },
  {
    category: '生產用電',
    1: 652,
    2: 1026,
    3: 829,
    4: 2071,
    5: 4167,
    6: 3882,
    7: 3716,
    8: 2860,
    9: 1396,
    10: 3755,
    11: 1928,
    12: 2937,
    total: 29219,
  },
];

const PREDICTION_COLUMNS_BY_SITE = ({ t, year, month } = {}) => {
  const m = Number(month);
  const nextMonth = m + 1;
  const isHistory = !isFuture(addMonths(new Date(Number(year), m - 1, 1), 1));
  const currColumns = [
    {
      id: 'actual',
      Header: (
        <div className="border-b border-divider py-3">{t('baselinePage:predictionPanel.table.actualElectricity')}</div>
      ),
      columns: [
        {
          Header: getYtmLabel(m, t),
          accessor: 'actualYTM',
          Cell: baseFormatter,
          className: 'text-right',
        },
      ],
    },
    {
      id: 'prediction',
      Header: (
        <div className="border-b border-divider py-3">
          {t('baselinePage:predictionPanel.table.predictionElectricity')}
        </div>
      ),
      columns: [
        {
          Header: `${t(`common:month.${m}`)}${t(`common:month.text`)}`,
          accessor: 'predicted.selected',
          Cell: baseFormatter,
          className: 'text-right',
        },
        {
          Header: `${nextMonth > 12 ? '-' : `${t(`common:month.${nextMonth}`)}${t(`common:month.text`)}`}`,
          accessor: 'predicted.nextMonth',
          Cell: baseFormatter,
          className: 'text-right',
        },
        {
          Header: `YTM (${t('common:month.1')}-${
            nextMonth > 12 ? t('common:month.12') : t(`common:month.${nextMonth}`)
          }${t('common:month.text')}) *`,
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
    ...(isHistory ? HISTORY_COLUMNS(t) : currColumns),
    {
      Header: t('baselinePage:predictionPanel.table.tRecTarget'),
      accessor: 'rec',
      className: 'text-right',
      rowSpan: 0,
      Cell: baseFormatter,
    },
  ]);
};

const PREDICTION_COLUMNS_BY_MONTH = (t) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: t('baselinePage:predictionPanel.table.month'),
      accessor: 'month',
      rowSpan: 0,
      Cell: (cell) => `${t(`common:month.${Number(cell.value)}`)}${t(`common:month.text`)}`,
    },
    ...HISTORY_COLUMNS(t),
    {
      Header: t('baselinePage:predictionPanel.table.tRecTarget'),
      accessor: 'rec',
      className: 'text-right',
      rowSpan: 0,
      Cell: baseFormatter,
    },
  ]);

const LINE_OPTION = ({ t, dataset, lineColors, type, typeName, compareName, actualName, year }) => {
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
      axisLine: { show: true, lineStyle: { color: colors.gray['500'] } },
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
      formatter: LineTooltipFormatter({ t, type, typeName, compareName, actualName, year }),
      backgroundColor: 'transparent',
      padding: 0,
      borderWidth: 0,
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
  ({ t, type, typeName, compareName, actualName, year }) =>
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
          <div>{typeName || t(`baselinePage:${type}`)}</div>
        </div>
        <div className="flex justify-between items-baseline px-4 space-y-2 space-x-4">
          <div>{actualName || t('baselinePage:actualElectricity')}</div>
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

export function PredictionPanel({ categorized, year, month, plant, business }) {
  const { t } = useTranslation(['baselinePage', 'common']);
  const byMonth = categorized === 'month';
  const option = byMonth ? { categorized, year, plant } : { categorized, year, month };
  const skip = Object.values(option).every(isNil);
  const { data } = useGetElectricityPredictionQuery({ ...option, bo: business }, { skip });
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
      {!byMonth && <div className="self-end">{t('baselinePage:predictionPanel.desc')}</div>}
      <div className="grid grid-cols-3 gap-4 h-full overflow-hidden">
        <div className="col-span-2 w-full flex flex-col shadow overflow-auto rounded-t-lg">
          <Table
            columns={byMonth ? PREDICTION_COLUMNS_BY_MONTH(t) : PREDICTION_COLUMNS_BY_SITE({ t, year, month })}
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
              <div className="border-b border-divider pb-1">{`${t('baselinePage:predicted')}${t(
                'baselinePage:baselineData'
              )} : ${
                (byMonth ? `${t(`common:month.${Number(r.month)}`)}${t('common:month.text')}` : r.plant) || '-'
              }  `}</div>
              <div className="flex">
                <div className="w-1/2 text-gray-300 text-sm">{t('baselinePage:selectFromLeftDesc')}</div>
                <div className="w-1/2 flex flex-row-reverse">
                  {byMonth ? (
                    <>
                      <div className="w-1/2 text-right">{t('baselinePage:actual')}</div>
                      <div>{t('baselinePage:predicted')}</div>
                    </>
                  ) : (
                    <>
                      {!isFuture(addMonths(new Date(Number(year), m - 1, 1), 1)) && m < 12 && (
                        <div className="w-1/2 text-right">
                          {t(`common:month.${m + 1}`)}
                          {t('common:month.text')}
                        </div>
                      )}
                      <div>
                        {t(`common:month.${m}`)}
                        {t('common:month.text')}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-grow border border-divider border-t-0 rounded-b space-y-2.5 py-3 px-4">
              {BASE_LINE_DETAIL_ENTRIES.map(({ key }) => (
                <div key={key} className="flex">
                  <div className="w-1/2">{t(`baselinePage:${key}`)}</div>
                  <div className="w-1/2 flex flex-row-reverse">
                    {byMonth ? (
                      <>
                        <div className="w-1/2 text-right">{baseFormatter(get(r, [key, 'actual']))}</div>
                        <div className="w-1/2 text-right">{baseFormatter(get(r, [key, 'predicted']))}</div>
                      </>
                    ) : (
                      <>
                        {!isFuture(addMonths(new Date(Number(year), m - 1, 1), 1)) && m < 12 && (
                          <div className="w-1/2 text-right">
                            {baseFormatter(get(r, [key, 'nextMonth'], get(r, [key, 'predicted'])))}
                          </div>
                        )}
                        <div className="w-1/2 text-right">
                          {baseFormatter(get(r, [key, 'selected'], get(r, [key, 'actual'])))}
                        </div>
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
                  <div className="text-xl font-medium">{t('baselinePage:predictionPanel.chartTitle')}</div>
                  <div className="flex space-x-4">
                    <Legend dotClassName="bg-_yellow" label={t('baselinePage:predictionElectricity')} />
                    <Legend dotClassName="bg-primary-600" label={t('baselinePage:actualElectricity')} />
                  </div>
                </div>
                <Chart
                  className="w-full h-full pl-4"
                  option={LINE_OPTION({
                    t,
                    year,
                    dataset,
                    lineColors: [colors.primary['600'], colors._yellow],
                    typeName: t('baselinePage:predictionPanel.chartTitle'),
                    compareName: t('baselinePage:predictionElectricity'),
                  })}
                />
              </>
            ) : (
              <>
                <div className="text-xl font-medium">
                  {t('baselinePage:predictionPanel.buyTrecTarget')} : All plants
                </div>
                <div className="text-sm text-gray-300">{t('baselinePage:predictionPanel.calcEveryNov')}</div>
                <div className="text-2xl font-semibold flex flex-grow flex-col items-center justify-center">
                  {baseFormatter(data.totalRec)} {t('common:kwh')}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function ChartPanel({ plant, year, business }) {
  const { t } = useTranslation(['baselinePage']);
  const option = { year, plant };
  const { data } = useGetElectricityBaselineQuery(
    { ...option, bo: business },
    { skip: Object.values(option).every(isNil) }
  );

  return (
    <div className="row-span-2 bg-primary-900 rounded shadow p-4 grid grid-cols-4 gap-4">
      {APP_CONFIG.ELECTRICITY_TYPES.map(({ key }, i) => {
        const dataset = data?.data?.reduce(
          (prev, curr) => ({
            ...prev,
            actual: prev.actual.concat(curr[key]?.actual),
            baseline: prev.baseline.concat(curr[key]?.baseline),
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
                  <Legend dotClassName="bg-primary-600" label={t('baselinePage:actualElectricity')} />
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

export function BaselinePanel({ year, plant, business }) {
  const { t } = useTranslation(['baselinePage', 'common']);
  const option = { year, plant };
  const skip = Object.values(option).every(isNil);
  const [selectedRow, setSelectedRow] = useState(-1);
  const { data } = useGetElectricityBaselineQuery({ ...option, bo: business }, { skip });
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
            {t('baselinePage:baselineData')} :{' '}
            {t(`common:month.${Number(r.month)}`, {
              defaultValue: '-',
            })}
            {t('common:month.text')}
          </div>
          <div className="text-gray-300 text-sm">{t('baselinePage:selectFromLeftDesc')}</div>
        </div>
        <div className="flex flex-col flex-grow border border-divider border-t-0 rounded-b space-y-2.5 py-3 px-4">
          {BASE_LINE_DETAIL_ENTRIES.map(({ key }) => (
            <div key={key} className="flex justify-between">
              <div>{t(`baselinePage:${key}`)}</div>
              <div>{baseFormatter(get(r, [key]))}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PowerSavingPanel({ year, plant, business }) {
  const [data, setData] = useState(POWER_SAVING_DATA);
  const updateMyData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }

        return row;
      })
    );
  };

  return (
    <div className="col-span-5 w-full flex flex-col shadow overflow-auto rounded-t-lg">
      <EditableTable columns={POWER_SAVING_COLUMNS({ setData })} data={data} updateMyData={updateMyData} />
    </div>
  );
}

export function PowerSavingPlanPanel({ year, plant, business }) {
  return (
    <div className="row-span-2 bg-primary-900 rounded shadow p-4">
      <div className="flex flex-col w-full shadow overflow-auto rounded-t-lg">
        <Table columns={POWER_SAVING_PLAN_COLUMNS} data={POWER_SAVING_PLAN_DATA} />
      </div>
    </div>
  );
}

export function TabPanel({ children }) {
  const { hash, search } = useLocation();
  const { lng, business, ...option } = qs.parse(search);
  const tabIndex = BUTTON_GROUP_OPTIONS.findIndex((option) => option.key === hash.slice(1));
  const baselineRef = useRef({});
  const predictionRef = useRef({});
  const powerSavingRef = useRef({});
  const refs = [baselineRef, predictionRef, powerSavingRef];
  const isBaseline = tabIndex <= 0;
  const isPrediction = tabIndex === 1;
  const isPowerSaving = tabIndex === 2;
  return children({
    business,
    option,
    isBaseline,
    isPrediction,
    isPowerSaving,
    refs,
    tabIndex: tabIndex < 0 ? 0 : tabIndex,
  });
}

export function BaselineSearch({ business, ...option }) {
  const { t } = useTranslation(['component']);
  const [searchOption, setSearchOption] = useState(option);
  const yearOptions = useSelector(selectYearOptions);
  const { data: plantOptions } = useGetPlantOptionsQuery({ bo: business });
  useEffect(() => {
    if (option.plant && plantOptions && !plantOptions.find((opt) => opt.key === option.plant)) {
      navigate({ plant: plantOptions[0].key });
    }
  }, [plantOptions, option]);

  useGetSummaryQuery();
  return (
    <div className="flex w-full items-center justify-center space-x-8">
      <Select
        label={`${t('component:selectLabel.searchYear')} : `}
        options={yearOptions}
        selected={yearOptions.find((option) => option.key === searchOption.year)}
        onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
        buttonClassName="min-w-28"
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
            ...(!searchOption.year && { year: yearOptions[0].key }),
            ...(!searchOption.plant && { plant: plantOptions[0].key }),
          })
        }>
        {t('component:button.search')}
      </Button>
    </div>
  );
}

export function PredictionSearch({ business, ...option }) {
  const { t } = useTranslation(['component']);
  const [searchOption, setSearchOption] = useState(option);
  const yearOptions = useSelector(selectYearOptions);
  const currMonth = useSelector(selectCurrMonth);
  const { data: plantOptions } = useGetPlantOptionsQuery({ bo: business });
  const byMonth = searchOption.categorized === 'month';
  useEffect(() => {
    if (option.plant && plantOptions && !plantOptions.find((opt) => opt.key === option.plant)) {
      navigate({ plant: plantOptions[0].key });
    }
  }, [plantOptions, option]);

  useGetSummaryQuery();
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
        options={yearOptions}
        selected={yearOptions.find((option) => option.key === searchOption.year)}
        onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
        buttonClassName="min-w-28"
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
          selected={
            APP_CONFIG.MONTH_OPTIONS.find((option) => option.key === searchOption.month) ||
            APP_CONFIG.MONTH_OPTIONS.find((option) => option.key === currMonth)
          }
          onChange={(e) => setSearchOption((prev) => ({ ...prev, month: e.key }))}
        />
      )}
      <Button
        onClick={() =>
          navigate({
            ...searchOption,
            ...(!searchOption.categorized && { categorized: DIMENSION_OPTIONS[0].key }),
            ...(!searchOption.year && { year: yearOptions[0].key }),
            ...(!byMonth && !searchOption.month && { month: currMonth }),
            ...(byMonth && !searchOption.plant && { plant: plantOptions[0].key }),
          })
        }>
        {t('component:button.search')}
      </Button>
    </div>
  );
}

export default function ElectricityBaselinePage() {
  const { t } = useTranslation(['baselinePage', 'component']);
  return (
    <>
      <div className="grid grid-rows-5 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden">
        <TabPanel>
          {({ isBaseline, isPrediction, isPowerSaving, option, business, tabIndex, refs }) => (
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
                  selected={BUTTON_GROUP_OPTIONS[tabIndex]}
                  onChange={(e) => {
                    navigate(
                      {
                        business,
                        hash: e.key,
                        ...refs[BUTTON_GROUP_OPTIONS.findIndex((option) => option.key === e.key)].current,
                      },
                      { merge: false }
                    );

                    refs[tabIndex].current = option;
                  }}
                />
                <div className="flex w-full justify-center items-center">
                  {isBaseline && <BaselineSearch {...option} business={business} />}
                  {isPrediction && <PredictionSearch {...option} business={business} />}
                  {isPowerSaving && <BaselineSearch {...option} business={business} />}
                  {isPowerSaving && (
                    <Button className="absolute right-8">
                      <PlusIcon className="h-5 w-5" />
                      新增技改項目
                    </Button>
                  )}
                </div>
                {isBaseline && <BaselinePanel {...option} business={business} />}
                {isPrediction && <PredictionPanel {...option} business={business} />}
                {isPowerSaving && <PowerSavingPanel {...option} business={business} />}
              </div>
              {isBaseline && !isEmpty(option) && <ChartPanel {...option} business={business} />}
              {isPowerSaving && <PowerSavingPlanPanel {...option} business={business} />}
            </>
          )}
        </TabPanel>
      </div>
    </>
  );
}

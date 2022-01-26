import { useEffect, useState, useRef, useMemo } from 'react';

import { PencilIcon, PlusIcon, XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { addMonths, isFuture } from 'date-fns';
import { get, isEmpty, isNil, groupBy } from 'lodash';
import qs from 'query-string';
import { renderToString } from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { selectCurrMonth, selectYoptions } from '../../app/appSlice';
import Chart from '../../charts/Chart';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import EditableTable, {
  AdSearchSelectCell,
  EditableButton,
  EditableIconButton,
  TextareaCell,
} from '../../components/table/EditableTable';
import Table from '../../components/table/Table';
import APP_CONFIG from '../../constants/app-config';
import { navigate } from '../../router/helpers';
import {
  useGetElectricityPredictionQuery,
  useGetElectricityBaselineQuery,
  useGetElectricityPowerSavingQuery,
  usePostElectricityPowerSavingMutationMutation,
} from '../../services/electricity';
import { useGetUsersQuery } from '../../services/keycloakAdmin';
import { useGetPlantOptionsQuery } from '../../services/management';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';
import { trimNumber } from '../../utils/number';
import { addPaddingColumns, EXPAND_COLUMN, updateMyData } from '../../utils/table';

import ConfirmModal from './ConfirmModal';
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

export const POWER_SAVING_COLUMNS = ({ electricityOptions, setData, userOptions, postPowerSaving, setOpen }) => [
  {
    Header: '用電類型',
    accessor: 'category',
    rowSpan: 0,
    className: 'w-[6%] text-center',
    editable: true,
    EditableComponent: ({ defaultValue, onBlur }) => (
      <Select
        className="text-left"
        options={electricityOptions}
        selected={electricityOptions.find((option) => option.value === defaultValue)}
        onChange={(e) => onBlur(e.value)}
      />
    ),
  },
  {
    Header: '改善措施',
    accessor: 'modified_method',
    className: 'w-[8%] text-center',
    rowSpan: 0,
    editable: true,
    editableComponentProps: { className: 'text-left' },
  },
  {
    id: 'expect',
    Header: <div className="border-b border-divider py-3">預計效益 (度)</div>,
    columns: Array.from({ length: 12 }, (_, i) => ({
      Header: `${i + 1}月`,
      accessor: `expected_benefits.${i + 1}`,
      editable: true,
      className: '!px-1 w-[4%] text-right',
      formatter: baseFormatter,
      editableComponentProps: { className: 'text-left' },
    })).concat({
      id: 'total',
      Header: '總計',
      className: '!px-1 w-[4%] text-right',
      Cell: (cell) => {
        const ttl = Object.entries(cell.row.original.expected_benefits || {}).reduce(
          (prev, curr) => prev + trimNumber(curr[1]),
          0
        );

        return baseFormatter(ttl);
      },
    }),
  },
  {
    Header: 'PIC',
    accessor: 'pic',
    rowSpan: 0,
    className: 'w-[8%] text-center',
    Cell: (cell) =>
      cell.row.original.editing ? (
        <AdSearchSelectCell
          options={userOptions}
          defaultValue={{ value: cell.row.original.pic, label: cell.row.original.pic }}
          onBlur={(e) => {
            e.label && setData((prev) => prev.map((d, i) => (cell.row.index === i ? { ...d, pic: e.label } : d)));
          }}
        />
      ) : (
        cell.value || ''
      ),
  },
  {
    Header: '計算邏輯',
    accessor: 'computational_logic',
    rowSpan: 0,
    editable: true,
    EditableComponent: TextareaCell,
    className: 'w-[10%] py-2',
  },
  {
    Header: '備註',
    accessor: 'remark',
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
          onClick={() => {
            const {
              isNew,
              editing,
              expected_benefits = {},
              category = electricityOptions[0].value,
              ...rest
            } = cell.row.original;

            postPowerSaving({
              category,
              expected_benefits: Object.entries(expected_benefits).reduce(
                (prev, [key, value]) => ({
                  ...prev,
                  [key]: trimNumber(value),
                }),
                {}
              ),
              ...rest,
            });

            setOpen(true);
          }}>
          儲存
        </EditableButton>
      ) : (
        <EditableIconButton
          disabled={!cell.row.original.by_copy}
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
    accessor: 'ttl',
    className: 'text-right',
    Cell: baseFormatter,
  },
]);

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
  const { t } = useTranslation(['component']);
  const { data } = useGetElectricityPowerSavingQuery({ year, plant }, { skip: !year && !plant });
  const { data: users = [] } = useGetUsersQuery();
  const [_data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [postPowerSaving] = usePostElectricityPowerSavingMutationMutation();
  const confirmRef = useRef({});
  const electricityOptions = useMemo(
    () =>
      APP_CONFIG.ELECTRICITY_OPTIONS.map((option) => ({
        ...option,
        value: t(`component:electricityOptions.${option.key}`),
      })),
    [t]
  );

  const columns = useMemo(
    () =>
      POWER_SAVING_COLUMNS({
        electricityOptions,
        setOpen,
        setData,
        userOptions: users.map(({ id, email }) => ({ value: id, label: email })),
        postPowerSaving: (payload) => (confirmRef.current = { year, plant, data: payload }),
      }),
    [electricityOptions, year, plant, users]
  );

  useEffect(() => data && setData(data.data), [data]);
  if (isNil(_data)) {
    return null;
  }

  return (
    <>
      <Button
        className="absolute right-8 top-44 translate-y-1"
        onClick={() =>
          setData((prev) => (prev.slice(-1)[0]?.isNew ? prev.slice(0, -1) : [...prev, { isNew: true, editing: true }]))
        }>
        {_data?.slice(-1)?.[0]?.isNew ? (
          <>
            <XIcon className="w-5 h-5" /> 取消新增
          </>
        ) : (
          <>
            <PlusIcon className="w-5 h-5" /> 新增技改項目
          </>
        )}
      </Button>
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        onConfirm={() => {
          postPowerSaving(confirmRef.current).then(() => {
            setData((prev) => prev.map((d) => (d.isNew ? { ...confirmRef.current.data, isNew: false } : d)));
            confirmRef.current = {};
          });
        }}
        onCancel={() => (confirmRef.current = {})}
      />
      <div className="col-span-5 w-full h-full flex flex-col shadow overflow-auto rounded-t-lg">
        <EditableTable columns={columns} data={_data} updateMyData={updateMyData(setData)} />
      </div>
    </>
  );
}

export function PowerSavingPlanPanel({ year, plant, business }) {
  const { data } = useGetElectricityPowerSavingQuery({ year, plant }, { skip: !year && !plant });
  const [_data, setData] = useState(data?.data);
  useEffect(() => {
    if (data) {
      const groupByCategory = groupBy(data.data, ({ category }) => category);
      const table = Object.entries(groupByCategory).reduce((prev, [key, values]) => {
        const ttlByMonth = values.reduce(
          (_prev, _curr) => ({
            ..._prev,
            ...Array.from({ length: 12 }).reduce(
              (__prev, __curr, i) => ({
                ...__prev,
                [i + 1]: (_prev[i + 1] || 0) + (_curr.expected_benefits?.[i + 1] || 0),
              }),
              {}
            ),
          }),
          {}
        );

        const ttl = Object.values(ttlByMonth).reduce((prev, curr) => prev + curr, 0);
        return prev.concat({ ...ttlByMonth, ttl, category: key });
      }, []);

      setData(table);
    }
  }, [data]);

  if (isNil(data)) {
    return null;
  }

  return (
    <div className="row-span-2 bg-primary-900 rounded shadow p-4 space-y-2 h-full flex flex-col">
      <div className="font-medium text-lg">計畫節電總量 (度)</div>
      <div className="flex flex-col flex-grow w-full shadow overflow-auto rounded-t-lg">
        <Table columns={POWER_SAVING_PLAN_COLUMNS} data={_data} />
      </div>
    </div>
  );
}

export function TabPanel({ children }) {
  const { hash, search } = useLocation();
  const { lng, business, y, m, cy, ...option } = qs.parse(search);
  const tabIndex = BUTTON_GROUP_OPTIONS.findIndex((option) => option.key === hash.slice(1));
  const baselineRef = useRef({});
  const predictionRef = useRef({});
  const powerSavingRef = useRef({});
  const refs = [baselineRef, predictionRef, powerSavingRef];
  const isBaseline = tabIndex <= 0;
  const isPrediction = tabIndex === 1;
  const isPowerSaving = tabIndex === 2;
  return children({
    y,
    m,
    business,
    option,
    isBaseline,
    isPrediction,
    isPowerSaving,
    refs,
    tabIndex: tabIndex < 0 ? 0 : tabIndex,
  });
}

export function BaselineSearch({ business, y, m, cy, ...option }) {
  const { t } = useTranslation(['component']);
  const [searchOption, setSearchOption] = useState(option);
  const yearOptions = useSelector(selectYoptions);
  const { data: plantOptions } = useGetPlantOptionsQuery({ bo: business });
  useEffect(() => {
    if (option.plant && plantOptions && !plantOptions.find((opt) => opt.key === option.plant)) {
      navigate({ plant: plantOptions[0].key });
    }
  }, [plantOptions, option]);

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

export function PredictionSearch({ business, y, m, cy, ...option }) {
  const { t } = useTranslation(['component']);
  const [searchOption, setSearchOption] = useState(option);
  const yearOptions = useSelector(selectYoptions);
  const currMonth = useSelector(selectCurrMonth);
  const { data: plantOptions } = useGetPlantOptionsQuery({ bo: business });
  const byMonth = searchOption.categorized === 'month';
  useEffect(() => {
    if (option.plant && plantOptions && !plantOptions.find((opt) => opt.key === option.plant)) {
      navigate({ plant: plantOptions[0].key });
    }
  }, [plantOptions, option]);

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
          {({ isBaseline, isPrediction, isPowerSaving, option, business, y, m, cy, tabIndex, refs }) => (
            <>
              <div
                className={clsx(
                  'bg-primary-900 rounded shadow p-4 flex flex-col space-y-4 overflow-auto',
                  isPrediction || isEmpty(option) ? 'row-span-5' : 'row-span-3'
                )}>
                <div className="text-xl font-medium">
                  {isPowerSaving ? '節能技改項目 & 預期節電效益規劃表' : t('baselinePage:title')}
                </div>
                <ButtonGroup
                  className="self-center"
                  options={BUTTON_GROUP_OPTIONS}
                  selected={BUTTON_GROUP_OPTIONS[tabIndex]}
                  onChange={(e) => {
                    navigate(
                      {
                        y,
                        m,
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

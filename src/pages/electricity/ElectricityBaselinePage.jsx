import { useEffect, useState, useRef, useMemo } from 'react';

import { PencilIcon, PlusIcon, XIcon, ArrowUpIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { addMonths, isFuture } from 'date-fns';
import { get, isEmpty, isNil, groupBy } from 'lodash';
import qs from 'query-string';
import { renderToString } from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { useDeepCompareEffect } from 'react-use';

import APP_CONSTANTS from '../../app/appConstants';
import Chart from '../../charts/Chart';
import { tooltip } from '../../charts/tooltip';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';
import Legend from '../../components/legend/Legend';
import Modal from '../../components/modal/Modal';
import Select from '../../components/select/Select';
import EditableTable, {
  AdSearchSelectCell,
  EditableButton,
  EditableIconButton,
  TextareaCell,
} from '../../components/table/EditableTable';
import Table from '../../components/table/Table';
import useAdmin from '../../hooks/useAdmin';
import usePlantPermission from '../../hooks/usePlantPermission';
import useNavigate from '../../router/useNavigate';
import { useGetLatestDateQuery } from '../../services/app';
import {
  useGetElectricityPredictionQuery,
  useGetElectricityBaselineQuery,
  useGetElectricityPowerSavingQuery,
  usePostElectricityPowerSavingMutationMutation,
  usePatchElectricityPowerSavingMutationMutation,
} from '../../services/electricity';
import { useGetUsersQuery } from '../../services/keycloakAdmin';
import { useGetPlantOptionsQuery } from '../../services/management';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';
import { trimNumber } from '../../utils/number';
import { addPaddingColumns, EXPAND_COLUMN, updateMyData } from '../../utils/table';
import ElectricityIndexPage from '../electricity-index/ElectricityIndexPage';

import ConfirmModal from './ConfirmModal';
import { gapFormatter, getPlants, getYtmLabel } from './helpers';

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

const BASE_LINE_COLUMNS = (t, setOpen) =>
  addPaddingColumns([
    {
      Header: t('baselinePage:baselinePanel.table.month'),
      accessor: 'month',
      rowSpan: 0,
      Cell: (cell) => `${t(`common:month.${Number(cell.value)}`)}${t(`common:month.text`)}`,
    },
    ...APP_CONSTANTS.ELECTRICITY_TYPES.map(({ key, value }) => ({
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
    {
      id: 'electricity_target',
      Header: (
        <div className="flex items-center justify-center space-x-2 border-b border-divider py-3">
          <div>用電指標</div>
          <div
            className="group cursor-pointer rounded border border-gray-200 hover:border-gray-50"
            onClick={() => setOpen((prev) => !prev)}>
            <ArrowUpIcon className="h-5 w-5 rotate-45 text-gray-200 group-hover:text-gray-50" />
          </div>
        </div>
      ),
      columns: [
        {
          Header: '用電強度 (千度)',
          accessor: 'electricity_target.intensity',
          className: 'text-right',
          Cell: baseFormatter,
        },
        {
          Header: '約當單台用電 (度)',
          accessor: 'electricity_target.unit',
          className: 'text-right',
          Cell: (cell) => baseFormatter(cell.value, { precision: 1 }),
        },
        {
          Header: 'ASP (千台幣/台)',
          accessor: 'electricity_target.asp',
          className: 'text-right',
          Cell: (cell) => baseFormatter(cell.value, { precision: 2 }),
        },
      ],
    },
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

export const POWER_SAVING_COLUMNS = ({
  year,
  plant,
  electricityOptions,
  setData,
  userOptions,
  postPowerSaving,
  setOpen,
  canEdit,
}) => [
  {
    Header: '用電類型',
    accessor: 'category',
    rowSpan: 0,
    className: 'w-[6%] text-center',
    editable: true,
    EditableComponent: ({ defaultValue, onBlur }) => (
      <Select
        strategy="fixed"
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
      const [patchPowerSaving] = usePatchElectricityPowerSavingMutationMutation();
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() => {
            const {
              id,
              modified,
              isNew,
              editing,
              expected_benefits = {},
              category = electricityOptions[0].value,
              ...rest
            } = cell.row.original;

            const payload = {
              category,
              expected_benefits: Object.entries(expected_benefits).reduce(
                (prev, [key, value]) => ({
                  ...prev,
                  [key]: trimNumber(value),
                }),
                Array.from({ length: 12 }, (_, i) => i).reduce((_prev, _curr) => ({ ..._prev, [_curr + 1]: 0 }), {})
              ),
              ...rest,
            };

            if (id !== undefined) {
              patchPowerSaving({ year, plant, data: payload });
              setData((prev) => prev.map((r, i) => (i === cell.row.index ? { ...r, editing: false } : r)));
            } else {
              postPowerSaving(payload);
              setOpen(true);
            }
          }}>
          儲存
        </EditableButton>
      ) : (
        <EditableIconButton
          disabled={!cell.row.original.by_copy && !canEdit}
          onClick={() =>
            setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                ...(i === cell.row.index && { editing: true }),
              }))
            )
          }>
          <PencilIcon className="h-5 w-5" />
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
      ...tooltip({ formatter: LineTooltipFormatter({ t, type, typeName, compareName, actualName, year }) }),
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
      <div className="flex flex-col rounded bg-gray-900 bg-opacity-75 py-2 shadow">
        <div className="flex items-baseline justify-between space-x-4 border-b border-divider px-4 pb-2">
          <div>
            {year}.{String(actual.dataIndex + 1).padStart(2, '0')}
          </div>
          <div>{typeName || t(`baselinePage:${type}`)}</div>
        </div>
        <div className="flex items-baseline justify-between space-y-2 space-x-4 px-4">
          <div>{actualName || t('baselinePage:actualElectricity')}</div>
          <div>{baseFormatter(actualValue)}</div>
        </div>
        <div className="flex items-baseline justify-between space-y-2 space-x-4 px-4">
          <div>{compareName || t('baselinePage:baseline')}</div>
          <div>{baseFormatter(baselineValue)}</div>
        </div>
        <div className="flex items-baseline justify-between space-y-2 space-x-4 px-4">
          <div>{t('baselinePage:gap')}</div>
          <div className={clsx(gap > 0 ? 'font-semibold text-dangerous-500' : 'font-semibold text-green-500')}>
            {gap > 0 && '+'}
            {baseFormatter(gap)}
          </div>
        </div>
      </div>
    );
  };

export function PredictionPanel({ categorized, year, month, plant, business, s, p }) {
  const { t } = useTranslation(['baselinePage', 'common']);
  const byMonth = categorized === 'month';
  const option = byMonth ? { categorized, year, plant } : { categorized, year, month };
  const skip = Object.values(option).every(isNil);
  const plantPermission = usePlantPermission();
  const { data } = useGetElectricityPredictionQuery(
    { ...option, bo: business, ...(!byMonth && { site: s, plant: p }) },
    { skip }
  );

  const targetData = useMemo(
    () =>
      byMonth
        ? data?.data?.filter(({ month }) => month > 10)
        : data?.data?.filter(({ plant }) => plantPermission?.includes(plant)),
    [data?.data, byMonth, plantPermission]
  );

  const [selectedRow, setSelectedRow] = useState(-1);
  if (isNil(data)) {
    return null;
  }

  const r = targetData[selectedRow] || {};
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
      <div className="grid h-full grid-cols-3 gap-4 overflow-hidden">
        <div className="col-span-2 flex w-full flex-col overflow-auto rounded-t-lg shadow">
          <Table
            columns={byMonth ? PREDICTION_COLUMNS_BY_MONTH(t) : PREDICTION_COLUMNS_BY_SITE({ t, year, month })}
            data={targetData}
            getRowProps={(row) => ({
              className: clsx('cursor-pointer', selectedRow === row.index && 'bg-primary-600 bg-opacity-20'),
              onClick: () => (selectedRow === row.index ? setSelectedRow(-1) : setSelectedRow(row.index)),
            })}
          />
        </div>
        <div className="col-span-1 flex flex-col overflow-auto">
          <div className="mb-2 flex flex-col overflow-auto rounded-t-lg shadow">
            <div className="sticky top-0 flex flex-col space-y-2 bg-primary-800 p-4 pb-2">
              <div className="border-b border-divider pb-1">{`${t('baselinePage:predicted')}${t(
                'baselinePage:baselineData'
              )} : ${
                (byMonth ? `${t(`common:month.${Number(r.month)}`)}${t('common:month.text')}` : r.plant) || '-'
              }  `}</div>
              <div className="flex">
                <div className="w-1/2 text-sm text-gray-300">{t('baselinePage:selectFromLeftDesc')}</div>
                <div className="flex w-1/2 flex-row-reverse">
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
            <div className="flex flex-grow flex-col space-y-2.5 rounded-b border border-t-0 border-divider py-3 px-4">
              {BASE_LINE_DETAIL_ENTRIES.map(({ key }) => (
                <div key={key} className="flex">
                  <div className="w-1/2">{t(`baselinePage:${key}`)}</div>
                  <div className="flex w-1/2 flex-row-reverse">
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
          <div className="flex min-h-[256px] flex-grow flex-col space-y-2 overflow-hidden rounded border border-divider p-4 shadow">
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
                  className="h-full w-full pl-4"
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
                <div className="flex flex-grow flex-col items-center justify-center text-2xl font-semibold">
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
    <div className="row-span-2 grid grid-cols-4 grid-rows-1 gap-4 rounded bg-primary-900 p-4 shadow">
      {APP_CONSTANTS.ELECTRICITY_TYPES.map(({ key }, i) => {
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
            <div className="relative flex justify-between">
              <div className="whitespace-nowrap text-xl font-medium">
                {t(`baselinePage:${key}`)}
                {t('baselinePage:modelPrediction')}
              </div>
              {i === APP_CONSTANTS.ELECTRICITY_TYPES.length - 1 && (
                <div className="absolute right-2 top-8 flex space-x-4">
                  <Legend dotClassName="bg-_yellow" label={t('baselinePage:predictionBaseline')} />
                  <Legend dotClassName="bg-primary-600" label={t('baselinePage:actualElectricity')} />
                </div>
              )}
            </div>
            {data && (
              <Chart
                className="h-full w-full"
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
  const [open, setOpen] = useState(false);
  const columns = useMemo(() => BASE_LINE_COLUMNS(t, setOpen), [t]);
  if (isNil(data)) {
    return null;
  }

  const r = data.data[selectedRow] || {};
  return (
    <>
      <Modal
        className="my-0 max-w-[calc(100vw-6rem)] bg-gray-900"
        open={open}
        setOpen={setOpen}
        onClose={setOpen}
        title="用電指標資訊"
        defaultFooter={false}>
        <ElectricityIndexPage className="h-[calc(100vh-6rem)] w-[calc(100vw-6rem)]" year={year} plant={plant} />
      </Modal>
      <div className="grid grid-cols-6 gap-4 overflow-auto">
        <div className="col-span-5 mb-2 flex w-full flex-col overflow-auto rounded-t-lg shadow">
          <Table
            columns={columns}
            data={data.data}
            getRowProps={(row) => ({
              className: clsx('cursor-pointer', selectedRow === row.index && 'bg-primary-600 bg-opacity-20'),
              onClick: () => (selectedRow === row.index ? setSelectedRow(-1) : setSelectedRow(row.index)),
            })}
          />
        </div>
        <div className="col-span-1 mb-2 flex flex-col overflow-auto rounded-t-lg shadow">
          <div className="sticky top-0 flex flex-col space-y-2 bg-primary-800 p-4">
            <div>
              {t('baselinePage:baselineData')} :{' '}
              {t(`common:month.${Number(r.month)}`, {
                defaultValue: '-',
              })}
              {t('common:month.text')}
            </div>
            <div className="text-sm text-gray-300">{t('baselinePage:selectFromLeftDesc')}</div>
          </div>
          <div className="flex flex-grow flex-col space-y-2.5 rounded-b border border-t-0 border-divider py-3 px-4">
            {BASE_LINE_DETAIL_ENTRIES.map(({ key }) => (
              <div key={key} className="flex justify-between">
                <div>{t(`baselinePage:${key}`)}</div>
                <div>{baseFormatter(get(r, [key]))}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function PowerSavingPanel({ year, plant }) {
  const { t } = useTranslation(['component']);
  const { data } = useGetElectricityPowerSavingQuery({ year, plant }, { skip: !year && !plant });
  const { data: users = [] } = useGetUsersQuery();
  const [_data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [postPowerSaving] = usePostElectricityPowerSavingMutationMutation();
  const { canEdit } = useAdmin();
  const confirmRef = useRef({});
  const electricityOptions = useMemo(
    () =>
      APP_CONSTANTS.ELECTRICITY_OPTIONS.map((option) => ({
        ...option,
        value: t(`component:electricityOptions.${option.key}`),
      })),
    [t]
  );

  const columns = useMemo(
    () =>
      POWER_SAVING_COLUMNS({
        year,
        plant,
        electricityOptions,
        setOpen,
        setData,
        canEdit,
        userOptions: users.map(({ id, email }) => ({ value: id, label: email })),
        postPowerSaving: (payload) => (confirmRef.current = { year, plant, data: payload }),
      }),
    [electricityOptions, year, plant, users, canEdit]
  );

  useEffect(() => {
    data && setData(data.data);
  }, [data]);

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
            <XIcon className="h-5 w-5" /> 取消新增
          </>
        ) : (
          <>
            <PlusIcon className="h-5 w-5" /> 新增技改項目
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
      <div className="relative col-span-5 flex h-full w-full flex-col overflow-auto rounded-t-lg shadow">
        <EditableTable columns={columns} data={_data} updateMyData={updateMyData(setData)} />
      </div>
    </>
  );
}

export function PowerSavingPlanPanel({ year, plant }) {
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
    <div className="row-span-2 flex h-full flex-col space-y-2 rounded bg-primary-900 p-4 shadow">
      <div className="text-lg font-medium">計畫節電總量 (度)</div>
      <div className="flex w-full flex-grow flex-col overflow-auto rounded-t-lg shadow">
        <Table columns={POWER_SAVING_PLAN_COLUMNS} data={_data} />
      </div>
    </div>
  );
}

export function TabPanel({ children }) {
  const { hash, search } = useLocation();
  const { lng, business, y, m, cy, s, p, ...option } = qs.parse(search);
  const tabIndex = BUTTON_GROUP_OPTIONS.findIndex((option) => option.key === hash.slice(1));
  const baselineRef = useRef({});
  const predictionRef = useRef({});
  const powerSavingRef = useRef({});
  const refs = [baselineRef, predictionRef, powerSavingRef];
  const isBaseline = tabIndex <= 0;
  const isPrediction = tabIndex === 1;
  const isPowerSaving = tabIndex === 2;
  return children({
    s,
    p,
    business,
    option,
    isBaseline,
    isPrediction,
    isPowerSaving,
    refs,
    tabIndex: tabIndex < 0 ? 0 : tabIndex,
  });
}

export function BaselineSearch({ business, y, m, cy, s, p, ...option }) {
  const { t } = useTranslation(['component']);
  const [searchOption, setSearchOption] = useState(option);
  const { data: { yearOptions } = {} } = useGetLatestDateQuery();
  const { data } = useGetPlantOptionsQuery({ bo: business });
  const plantPermission = usePlantPermission();
  const plantOptions = useMemo(() => getPlants({ data, s, p, plantPermission }), [data, s, p, plantPermission]);
  const nextYearOptions = useMemo(() => yearOptions?.filter((option) => Number(option.key) > 2020), [yearOptions]);
  const navigate = useNavigate();
  useDeepCompareEffect(() => {
    if (option.plant && plantOptions && !plantOptions.find((opt) => opt.key === option.plant)) {
      navigate({ plant: plantOptions[0]?.key });
    }
  }, [plantOptions, option]);

  useDeepCompareEffect(() => option && setSearchOption(option), [option]);
  return (
    <div className="flex w-full items-center justify-center space-x-8">
      <Select
        label={t('component:selectLabel.searchYear')}
        options={nextYearOptions || APP_CONSTANTS.YEAR_OPTIONS}
        selected={(nextYearOptions || APP_CONSTANTS.YEAR_OPTIONS).find((option) => option.key === searchOption.year)}
        onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
        buttonClassName="min-w-28"
      />
      <Select
        buttonClassName="w-36"
        label="Plant"
        placeholder="Select Plant"
        options={plantOptions || APP_CONSTANTS.PLANT_OPTIONS}
        selected={plantOptions?.find((option) => option.key === searchOption.plant)}
        onChange={(e) => setSearchOption((prev) => ({ ...prev, plant: e.key }))}
      />
      <Button
        onClick={() =>
          navigate({
            ...searchOption,
            ...(!searchOption.year && { year: nextYearOptions[0]?.key }),
            ...(!searchOption.plant && { plant: plantOptions[0]?.key }),
          })
        }>
        {t('component:button.search')}
      </Button>
    </div>
  );
}

export function PredictionSearch({ business, y, m, cy, s, p, ...option }) {
  const { t } = useTranslation(['component']);
  const [searchOption, setSearchOption] = useState(option);
  const { data: { yearOptions } = {} } = useGetLatestDateQuery();
  const { data } = useGetPlantOptionsQuery({ bo: business });
  const plantPermission = usePlantPermission();
  const plantOptions = useMemo(() => getPlants({ data, s, p, plantPermission }), [data, s, p, plantPermission]);
  const nextYearOptions = useMemo(
    () => yearOptions?.filter((option) => option.key > 2020 && option.key),
    [yearOptions]
  );

  const monthOptions = useMemo(() => APP_CONSTANTS.MONTH_OPTIONS.filter((option) => option.key > 10), []);
  const byMonth = searchOption.categorized === 'month';
  const navigate = useNavigate();
  useDeepCompareEffect(() => {
    if (option.plant && plantOptions && !plantOptions.find((opt) => opt.key === option.plant)) {
      navigate({ plant: plantOptions[0]?.key });
    }
  }, [plantOptions, option]);

  useDeepCompareEffect(() => option && setSearchOption(option), [option]);
  return (
    <div className="flex w-full items-center justify-center space-x-8">
      <Select
        label={t('component:selectLabel.dimension')}
        buttonClassName="w-36"
        options={DIMENSION_OPTIONS}
        selected={DIMENSION_OPTIONS.find((option) => option.key === searchOption.categorized)}
        onChange={(e) =>
          setSearchOption((prev) => ({ ...prev, categorized: e.key, ...(e.key === 'month' && { month: null }) }))
        }
      />
      <Select
        label={t('component:selectLabel.searchYear')}
        options={nextYearOptions || APP_CONSTANTS.YEAR_OPTIONS}
        selected={(nextYearOptions || APP_CONSTANTS.YEAR_OPTIONS).find((option) => option.key === searchOption.year)}
        onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
        buttonClassName="min-w-28"
      />
      {byMonth ? (
        <Select
          buttonClassName="w-36"
          label="Plant"
          placeholder="Select Plant"
          options={plantOptions || APP_CONSTANTS.PLANT_OPTIONS}
          selected={plantOptions?.find((option) => option.key === searchOption.plant)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, plant: e.key }))}
        />
      ) : (
        <Select
          buttonClassName="w-20"
          label={t('component:selectLabel.predictionMonth')}
          options={monthOptions}
          selected={monthOptions.find((option) => option.key === searchOption.month)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, month: e.key }))}
        />
      )}
      <Button
        onClick={() =>
          navigate({
            ...searchOption,
            ...(!searchOption.categorized && { categorized: DIMENSION_OPTIONS[0].key }),
            ...(!searchOption.year && { year: nextYearOptions[0]?.key }),
            ...(!byMonth && !searchOption.month && { month: monthOptions[0]?.key }),
            ...(byMonth && !searchOption.plant && { plant: plantOptions[0]?.key }),
          })
        }>
        {t('component:button.search')}
      </Button>
    </div>
  );
}

export default function ElectricityBaselinePage() {
  const { t } = useTranslation(['baselinePage', 'component']);
  const navigate = useNavigate();
  return (
    <>
      <div className="-mt-16 grid h-screen w-screen grid-rows-5 gap-4 overflow-hidden p-4 pt-20">
        <TabPanel>
          {({ isBaseline, isPrediction, isPowerSaving, option, business, s, p, tabIndex, refs }) => (
            <>
              <div
                className={clsx(
                  'flex flex-col space-y-4 overflow-auto rounded bg-primary-900 p-4 shadow',
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
                        hash: e.key,
                        ...refs[BUTTON_GROUP_OPTIONS.findIndex((option) => option.key === e.key)].current,
                      },
                      { merge: false }
                    );

                    refs[tabIndex].current = option;
                  }}
                />
                <div className="flex w-full items-center justify-center">
                  {isBaseline && <BaselineSearch {...option} business={business} s={s} p={p} />}
                  {isPrediction && <PredictionSearch {...option} business={business} s={s} p={p} />}
                  {isPowerSaving && <BaselineSearch {...option} business={business} s={s} p={p} />}
                </div>
                {isBaseline && <BaselinePanel {...option} business={business} />}
                {isPrediction && <PredictionPanel {...option} business={business} s={s} p={p} />}
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

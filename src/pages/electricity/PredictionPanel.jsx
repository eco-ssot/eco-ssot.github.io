import { useState, useMemo } from 'react';

import clsx from 'clsx';
import { addMonths, isFuture } from 'date-fns';
import { get, isNil } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'react-use';

import APP_CONSTANTS from '../../app/appConstants';
import Chart from '../../charts/Chart';
import { tooltip } from '../../charts/tooltip';
import Button from '../../components/button/Button';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import usePlantPermission from '../../hooks/usePlantPermission';
import useNavigate from '../../router/useNavigate';
import { useGetLatestDateQuery } from '../../services/app';
import { useGetElectricityPredictionQuery } from '../../services/electricity';
import { useGetPlantOptionsQuery } from '../../services/management';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN } from '../../utils/table';

import { BASE_LINE_DETAIL_ENTRIES, gapFormatter, getPlants, getYtmLabel, LineTooltipFormatter } from './helpers';

const DIMENSION_OPTIONS = [
  { key: 'plant', value: 'By Plant' },
  { key: 'month', value: 'By Month' },
];

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

export default function PredictionPanel({ categorized, year, month, plant, business, s, p }) {
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

import { useEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';
import { format, subDays } from 'date-fns';
import { isEmpty, pick } from 'lodash';
import { renderToString } from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import Chart from '../../charts/Chart';
import { tooltip } from '../../charts/tooltip';
import Legend from '../../components/legend/Legend';
import Table from '../../components/table/Table';
import { useGetRoiQuery } from '../../services/airCompressor';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';
import { addPaddingColumns } from '../../utils/table';

import AirCompressorForm from './AirCompressorForm';

const formatter = (cell) => baseFormatter(cell.value, { precision: 2 });

const baseHeaderRenderer = (value) => {
  const tokens = String(value).split(' ');
  const last = tokens.slice(-1)?.[0];
  return (
    <>
      <div>{tokens.slice(0, -1).join(' ')}</div>
      <div>{last}</div>
    </>
  );
};

const ROI_COLUMNS = (t) =>
  addPaddingColumns([
    { Header: baseHeaderRenderer(t('airCompressorPage:site')), accessor: 'building' },
    { Header: baseHeaderRenderer(t('airCompressorPage:deviceNumber')), accessor: 'machine_id' },
    { Header: baseHeaderRenderer(t('airCompressorPage:yearOfManufacture')), accessor: 'born_year' },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:ratedPower')),
      accessor: 'power',
      className: 'text-right',
      Cell: baseFormatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:ratedEfficiency')),
      accessor: 'eer',
      className: 'text-right',
      Cell: formatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:estimatedEfficiency')),
      accessor: 'predict_eer',
      className: 'text-right',
      Cell: formatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:estimatedRoi')),
      accessor: 'predict_roi',
      className: 'text-right',
      Cell: formatter,
    },
  ]);

const OLD_MACHINE_COLUMNS = (t) =>
  addPaddingColumns([
    { Header: 'No.', accessor: 'rank' },
    { Header: baseHeaderRenderer(t('airCompressorPage:deviceNumber')), accessor: 'machine' },
    { Header: baseHeaderRenderer(t('airCompressorPage:yearOfManufacture')), accessor: 'born_year' },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:ratedPower')),
      accessor: 'power',
      className: 'text-right',
      Cell: baseFormatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:ratedDisplacement')),
      accessor: 'flow',
      className: 'text-right',
      Cell: formatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:estimatedEfficiency')),
      accessor: 'predict_eer',
      className: 'text-right',
      Cell: formatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:estimatedRoi')),
      accessor: 'predict_roi',
      className: 'text-right',
      Cell: formatter,
    },
  ]);

const NEW_MACHINE_COLUMNS = (t) =>
  addPaddingColumns([
    { Header: 'No.', accessor: 'reank' },
    { Header: baseHeaderRenderer(t('airCompressorPage:lubrication')), accessor: 'oil_type' },
    { Header: baseHeaderRenderer(t('airCompressorPage:compression')), accessor: 'compress_type' },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:ratedPower')),
      accessor: 'power',
      className: 'text-right',
      Cell: baseFormatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:ratedDisplacement')),
      accessor: 'flow',
      className: 'text-right',
      Cell: formatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:estimatedEfficiency')),
      accessor: 'predict_eer',
      className: 'text-right',
      Cell: formatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:price')),
      accessor: 'cost',
      className: 'text-right',
      Cell: baseFormatter,
    },
  ]);

const DUMMY_ROI_DATA = [
  { building: '-', machine_id: '-', born_year: '-', power: '-', eer: '-', predict_eer: '-', predict_roi: '-' },
];

const DUMMY_OLD_MACHINE_DATA = [
  { rank: '1', machine: '-', born_year: '-', power: '-', predict_eer: '-', predict_roi: '-' },
];

const DUMMY_NEW_MACHING_DATA = [
  { reank: '1', oil_type: '-', compress_type: '-', power: '-', flow: '-', predict_eer: '-', cost: '-' },
];

const OPTION = ({ data, name, targets, targetColors }) => {
  const labels =
    data?.map(({ date }) => date) ||
    Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), 7 - i), 'yyyy-MM-dd HH:mm:ss'));

  const values = data?.map(({ value }) => ({ value }));
  return {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const { name, marker, value, seriesName } = params?.[0] || {};
        return `${name} <br> ${marker} ${seriesName} : ${baseFormatter(value, { precision: 2 })}`;
      },
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
      axisLabel: { formatter: (value) => format(new Date(value), 'M/d') },
    },
    yAxis: {
      name,
      nameTextStyle: { color: colors.gray['50'] },
      type: 'value',
      axisLine: { show: true, lineStyle: { color: colors.gray['500'] } },
      splitLine: { show: false },
      ...(targets && { max: (value) => Math.max(Math.ceil(value.max), ...targets.map((target) => Math.ceil(target))) }),
      ...(!data && { min: 0, max: 10 }),
    },
    series: [
      {
        name,
        type: 'line',
        data: values,
        symbol: 'none',
        color: colors.primary['600'],
        ...(targets && {
          markLine: targets.reduce(
            (prev, curr, i) => ({
              ...prev,
              data: prev.data.concat({ yAxis: curr, lineStyle: { color: targetColors[i] } }),
            }),
            {
              symbol: 'none',
              label: { show: true },
              data: [],
              lineStyle: { width: 2 },
              emphasis: { lineStyle: { width: 4 } },
            }
          ),
        }),
      },
    ],
    grid: { bottom: 0, top: 48, left: 12, right: 36, containLabel: true },
  };
};

const COST_OPTION = ({ t, oldCost, newCost }) => {
  const labels = oldCost?.data?.slice(0, 6)?.map(({ year }) => year) || Array.from({ length: 6 }, (_, i) => i + 1);
  const oldValues = oldCost?.data?.slice(0, 6)?.map(({ cost }) => ({ value: cost }));
  const newValues = newCost?.data?.slice(0, 6)?.map(({ cost }) => ({ value: cost }));
  const target = newCost?.data?.slice(-1)?.[0]?.year;
  return {
    tooltip: {
      ...tooltip({
        formatter: (dataset) => {
          return renderToString(
            <div className="flex flex-col rounded bg-gray-900 bg-opacity-75 py-2 shadow">
              <div className="flex items-baseline justify-between space-x-4 border-b border-divider px-4 pb-2">
                {dataset[0]?.name} ({t('common:yearText')})
              </div>
              <div className="flex items-center space-x-2 px-4 py-1 pt-2">
                <div className="block h-3 w-3 rounded-full bg-_blue"></div>
                <div>{t('airCompressorPage:backup')} :</div>
                <div>
                  {baseFormatter(dataset.find((d) => d.seriesName === oldCost.name)?.value, {
                    unit: 1e4,
                    suffix: ` (${t('common:10k')})`,
                  })}
                </div>
              </div>
              <div className="flex items-center space-x-2 px-4 py-1">
                <div className="block h-3 w-3 rounded-full bg-_yellow"></div>
                <div>{t('airCompressorPage:newDevice')} :</div>
                <div className="flex items-baseline">
                  {baseFormatter(dataset.find((d) => d.seriesName === newCost.name)?.value, {
                    unit: 1e4,
                    suffix: ` (${t('common:10k')})`,
                  })}
                </div>
              </div>
            </div>
          );
        },
      }),
    },
    xAxis: {
      name: `(${t('common:yearText')})`,
      nameTextStyle: { color: colors.gray['50'] },
      type: 'category',
      data: labels,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
    },
    yAxis: {
      name: `(${t('common:10k')})`,
      nameTextStyle: { color: colors.gray['50'] },
      type: 'value',
      axisLine: { show: true, lineStyle: { color: colors.gray['500'] } },
      splitLine: { show: false },
      axisLabel: { formatter: (value) => baseFormatter(value, { unit: 1e4 }) },
    },
    series: [
      {
        name: oldCost.name,
        type: 'line',
        data: oldValues,
        symbol: 'none',
        color: colors._blue,
      },
      {
        name: newCost.name,
        type: 'line',
        data: newValues,
        symbol: 'none',
        color: colors._yellow,
        ...(target && {
          markLine: {
            data: [{ xAxis: target }],
            symbol: 'none',
            lineStyle: { color: colors._orange, width: 2 },
            label: { show: false },
            emphasis: { lineStyle: { width: 4 } },
          },
        }),
      },
    ],
    grid: { bottom: 0, top: 36, left: 24, right: 48, containLabel: true },
  };
};

export default function AirCompressorPage() {
  const { t } = useTranslation(['airCompressorPage', 'common']);
  const [searchParams] = useSearchParams();
  const query = useMemo(
    () =>
      pick(Object.fromEntries(searchParams), [
        'building',
        'machine',
        'oil_type',
        'compress_type',
        'run_type',
        'maintenance',
        'power',
        'engine_depcmemt',
        'eer_r',
        'cost',
        'model_number',
      ]),
    [searchParams]
  );

  const [machineIndex, setMachineIndex] = useState({ old: -1, new: -1 });
  const { data } = useGetRoiQuery(query, { skip: isEmpty(query) });
  const [_data, setData] = useState();
  const eerOption = useMemo(
    () =>
      OPTION({
        data: _data?.weekly?.eer,
        name: 'EER',
        targets: [7.8, 8.7, 9.5],
        targetColors: [colors._yellow, colors._orange, colors._blue],
      }),
    [_data?.weekly?.eer]
  );

  const roiOption = useMemo(
    () => OPTION({ data: _data?.weekly?.roi, name: 'ROI', targets: [3], targetColors: [colors._orange] }),
    [_data?.weekly?.roi]
  );

  const costOption = useMemo(
    () =>
      COST_OPTION({
        t,
        oldCost: { data: _data?.recommand?.old?.[machineIndex.old]?.predict_cost, name: t('airCompressorPage:backup') },
        newCost: {
          data: _data?.recommand?.new?.[machineIndex.new]?.predict_cost,
          name: t('airCompressorPage:newDevice'),
        },
      }),
    [t, _data?.recommand, machineIndex.old, machineIndex.new]
  );

  const roiColumns = useMemo(() => ROI_COLUMNS(t), [t]);
  const oldMachineColumns = useMemo(() => OLD_MACHINE_COLUMNS(t), [t]);
  const newMachineColumns = useMemo(() => NEW_MACHINE_COLUMNS(t), [t]);
  const draftRef = useRef();
  useEffect(() => {
    if (data) {
      setData(data);
      setMachineIndex({ old: 0, new: 0 });
    }
  }, [data]);

  useEffect(() => {
    if (isEmpty(query)) {
      setData();
      setMachineIndex({ old: -1, new: -1 });
    }

    draftRef.current = query;
  }, [query]);

  return (
    <div className="-mt-16 flex h-screen w-screen flex-col space-y-4 overflow-hidden p-4 pt-20">
      <AirCompressorForm query={query} draftRef={draftRef} />
      <div className="grid flex-grow grid-rows-2 gap-4 overflow-auto">
        <div className="row-span-1 flex space-x-8 overflow-auto rounded bg-primary-900 p-4 shadow">
          <div className="flex w-[40%] flex-col space-y-4">
            <div className="text-xl font-medium">{t('airCompressorPage:deviceEfficiency/RoiInfo')}</div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              <Table columns={roiColumns} data={[].concat(_data?.summary || DUMMY_ROI_DATA)} />
            </div>
          </div>
          <div className="flex w-[30%] flex-col">
            <div className="flex justify-between">
              <div className="whitespace-nowrap">{t('airCompressorPage:deviceWeeklyEfficiencySituation')}</div>
              <div className="flex flex-shrink-0 translate-y-8 -translate-x-12 space-x-4">
                <Legend label={t('airCompressorPage:first')} dotClassName="bg-_blue" />
                <Legend label={t('airCompressorPage:second')} dotClassName="bg-_orange" />
                <Legend label={t('airCompressorPage:third')} dotClassName="bg-_yellow" />
              </div>
            </div>
            <Chart option={eerOption} className="flex-grow" />
          </div>
          <div className="flex w-[30%] flex-col">
            <div>{t('airCompressorPage:deviceWeeklyRoiSituation')}</div>
            <Chart option={roiOption} className="flex-grow" />
          </div>
        </div>
        <div className="row-span-1 flex space-x-4 overflow-auto rounded bg-primary-900 p-4 shadow">
          <div className="flex w-[36%] flex-col space-y-4 overflow-auto">
            <div className="text-xl font-medium">{t('airCompressorPage:recommendedBackupDevicesInfo')}</div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              <Table
                columns={oldMachineColumns}
                data={_data?.recommand?.old || DUMMY_OLD_MACHINE_DATA}
                getRowProps={(row) => ({
                  className: clsx('cursor-pointer', machineIndex.old === row.index && 'bg-_blue bg-opacity-20'),
                  onClick: () =>
                    machineIndex.old === row.index
                      ? setMachineIndex((prev) => ({ ...prev, old: -1 }))
                      : setMachineIndex((prev) => ({ ...prev, old: row.index })),
                })}
              />
            </div>
          </div>
          <div className="flex w-[36%] flex-col space-y-4 overflow-auto">
            <div className="text-xl font-medium">{t('airCompressorPage:recommendedNewDevicesInfo')}</div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              <Table
                columns={newMachineColumns}
                data={_data?.recommand?.new || DUMMY_NEW_MACHING_DATA}
                getRowProps={(row) => ({
                  className: clsx('cursor-pointer', machineIndex.new === row.index && 'bg-_yellow bg-opacity-20'),
                  onClick: () =>
                    machineIndex.new === row.index
                      ? setMachineIndex((prev) => ({ ...prev, new: -1 }))
                      : setMachineIndex((prev) => ({ ...prev, new: row.index })),
                })}
              />
            </div>
          </div>
          <div className="flex w-[28%] flex-col space-y-4">
            <div className="flex justify-between">
              <div className="text-xl font-medium">{t('airCompressorPage:estimatedCostReduction')}</div>
              <div className="flex space-x-4">
                <Legend label={t('airCompressorPage:backup')} dotClassName="bg-_blue" />
                <Legend label={t('airCompressorPage:newDevice')} dotClassName="bg-_yellow" />
              </div>
            </div>
            <Chart option={costOption} className="flex-grow" />
          </div>
        </div>
      </div>
    </div>
  );
}

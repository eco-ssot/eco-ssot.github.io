import { useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import { format, subDays } from 'date-fns';
import { isEmpty, pick } from 'lodash';
import { renderToString } from 'react-dom/server';
import { useSearchParams } from 'react-router-dom';

import Chart from '../../charts/Chart';
import { tooltip } from '../../charts/tooltip';
import Button from '../../components/button/Button';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import useNavigate from '../../router/useNavigate';
import { useGetRoiQuery, useGetAirCompressListQuery } from '../../services/airCompressor';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';
import { addPaddingColumns } from '../../utils/table';

const ROI_COLUMNS = addPaddingColumns([
  { Header: '廠區資訊', accessor: 'building' },
  { Header: '設備編號', accessor: 'machine_id' },
  { Header: '出廠年份', accessor: 'born_year' },
  { Header: '額定功率', accessor: 'power', className: 'text-right', Cell: baseFormatter },
  {
    Header: '額定能效',
    accessor: 'eer',
    className: 'text-right',
    Cell: (cell) => baseFormatter(cell.value, { precision: 2 }),
  },
  {
    Header: '評估能效',
    accessor: 'predict_eer',
    className: 'text-right',
    Cell: (cell) => baseFormatter(cell.value, { precision: 2 }),
  },
  {
    Header: '評估 ROI',
    accessor: 'predict_roi',
    className: 'text-right',
    Cell: (cell) => baseFormatter(cell.value, { precision: 2 }),
  },
]);

const OLD_MACHINE_COLUMNS = addPaddingColumns([
  { Header: 'No.', accessor: 'rank' },
  { Header: '設備編號', accessor: 'machine' },
  { Header: '出廠年份', accessor: 'born_year' },
  { Header: '額定功率', accessor: 'power', className: 'text-right', Cell: baseFormatter },
  {
    Header: '額定排氣量',
    accessor: 'flow',
    className: 'text-right',
    Cell: (cell) => baseFormatter(cell.value, { precision: 2 }),
  },
  {
    Header: '評估能效',
    accessor: 'predict_eer',
    className: 'text-right',
    Cell: (cell) => baseFormatter(cell.value, { precision: 2 }),
  },
  {
    Header: '評估 ROI',
    accessor: 'predict_roi',
    className: 'text-right',
    Cell: (cell) => baseFormatter(cell.value, { precision: 2 }),
  },
]);

const NEW_MACHINE_COLUMNS = addPaddingColumns([
  { Header: 'No.', accessor: 'reank' },
  { Header: '潤滑類型', accessor: 'oil_type' },
  { Header: '壓縮類型', accessor: 'compress_type' },
  { Header: '額定功率', accessor: 'power', className: 'text-right', Cell: baseFormatter },
  {
    Header: '額定排氣量',
    accessor: 'flow',
    className: 'text-right',
    Cell: (cell) => baseFormatter(cell.value, { precision: 2 }),
  },
  {
    Header: '評估能效',
    accessor: 'predict_eer',
    className: 'text-right',
    Cell: (cell) => baseFormatter(cell.value, { precision: 2 }),
  },
  {
    Header: '設備價格',
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
            { symbol: 'none', label: { show: true }, data: [] }
          ),
        }),
      },
    ],
    grid: { bottom: 0, top: 48, left: 12, right: 36, containLabel: true },
  };
};

const COST_OPTION = ({ oldCost, newCost }) => {
  const labels = oldCost?.data?.slice(0, 6)?.map(({ year }) => year) || Array.from({ length: 6 }, (_, i) => i + 1);
  const oldValues = oldCost?.data?.slice(0, 6)?.map(({ cost }) => ({ value: cost }));
  const newValues = newCost?.data?.slice(0, 6)?.map(({ cost }) => ({ value: cost }));
  const target = newCost?.data?.slice(-1)?.[0].year;
  return {
    tooltip: {
      ...tooltip({
        formatter: (dataset) => {
          return renderToString(
            <div className="flex flex-col bg-gray-900 rounded shadow py-2 bg-opacity-75">
              <div className="flex justify-between items-baseline px-4 border-b pb-2 border-divider space-x-4">
                {dataset[0]?.name} (年)
              </div>
              <div className="flex px-4 items-center space-x-2 py-1 pt-2">
                <div className="block rounded-full w-3 h-3 bg-_blue"></div>
                <div>備機設備 :</div>
                <div>
                  {baseFormatter(dataset.find((d) => d.seriesName === oldCost.name)?.value, {
                    unit: 1e4,
                    suffix: ' (萬元)',
                  })}
                </div>
              </div>
              <div className="flex px-4 items-center space-x-2 py-1">
                <div className="block rounded-full w-3 h-3 bg-_yellow"></div>
                <div>新設備 :</div>
                <div className="flex items-baseline">
                  {baseFormatter(dataset.find((d) => d.seriesName === newCost.name)?.value, {
                    unit: 1e4,
                    suffix: ' (萬元)',
                  })}
                </div>
              </div>
            </div>
          );
        },
      }),
    },
    xAxis: {
      name: '(年)',
      nameTextStyle: { color: colors.gray['50'] },
      type: 'category',
      data: labels,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
    },
    yAxis: {
      name: '(萬元)',
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
            lineStyle: { color: colors._orange },
            label: { show: false },
          },
        }),
      },
    ],
    grid: { bottom: 0, top: 36, left: 24, right: 48, containLabel: true },
  };
};

export default function AirCompressorPage() {
  const [searchParams] = useSearchParams();
  const query = pick(Object.fromEntries(searchParams), [
    'building',
    'machine',
    'oil_type',
    'compress_type',
    'run_type',
  ]);

  const [searchOption, setSearchOption] = useState(query);
  const [machineIndex, setMachineIndex] = useState({ old: -1, new: -1 });
  const { data: list } = useGetAirCompressListQuery();
  const { data: listByBuilding } = useGetAirCompressListQuery(
    { building: searchOption.building || list?.building?.[0] },
    { skip: !list?.building }
  );

  const { data } = useGetRoiQuery(query, { skip: isEmpty(query) });
  const buildingOptions = useMemo(
    () => list?.building?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [list?.building]
  );

  const machineOptions = useMemo(
    () => listByBuilding?.machines?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [listByBuilding?.machines]
  );

  const oilOptions = useMemo(
    () => listByBuilding?.oil_type?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [listByBuilding?.oil_type]
  );

  const compressOptions = useMemo(
    () => listByBuilding?.compress_type?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [listByBuilding?.compress_type]
  );

  const runOptions = useMemo(
    () => listByBuilding?.run_type?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [listByBuilding?.run_type]
  );

  const eerOption = useMemo(
    () =>
      OPTION({
        data: data?.weekly?.eer,
        name: 'EER',
        targets: [7.8, 8.7, 9.5],
        targetColors: [colors._yellow, colors._orange, colors._blue],
      }),
    [data?.weekly?.eer]
  );

  const roiOption = useMemo(
    () => OPTION({ data: data?.weekly?.roi, name: 'ROI', targets: [3], targetColors: [colors._orange] }),
    [data?.weekly?.roi]
  );

  const costOption = useMemo(
    () =>
      COST_OPTION({
        oldCost: { data: data?.recommand?.old?.[machineIndex.old]?.predict_cost, name: '備機設備' },
        newCost: { data: data?.recommand?.new?.[machineIndex.new]?.predict_cost, name: '新設備' },
      }),
    [data?.recommand, machineIndex.old, machineIndex.new]
  );

  useEffect(() => {
    data && setMachineIndex({ old: 0, new: 0 });
  }, [data]);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-4 p-4 pt-20 -mt-16 h-screen w-screen overflow-hidden">
      <div className={clsx('bg-primary-900 rounded shadow p-4')}>
        <div className="text-xl font-medium">空壓設備智能推薦</div>
        <div className="flex flex-grow justify-center space-x-8">
          <div className="border-r-2 border-divider pr-8 space-y-4">
            <div>欲評估設備</div>
            <div className="flex space-x-4">
              <Select
                buttonClassName="min-w-32"
                label="廠區資訊"
                options={buildingOptions}
                selected={buildingOptions?.find((opt) => opt.key === searchOption.building)}
                onChange={(e) =>
                  setSearchOption((prev) => ({
                    ...prev,
                    building: e.key,
                    machine: null,
                    oil_type: null,
                    compress_type: null,
                    run_type: null,
                  }))
                }
              />
              <Select
                buttonClassName="min-w-32"
                label="設備編號"
                options={machineOptions}
                selected={machineOptions?.find((opt) => opt.key === searchOption.machine)}
                onChange={(e) => setSearchOption((prev) => ({ ...prev, machine: e.key }))}
              />
            </div>
          </div>
          <div className="border-r-2 border-divider pr-8 space-y-4">
            <div>新機台規格</div>
            <div className="flex space-x-4">
              <Select
                buttonClassName="min-w-32"
                label="潤滑類型"
                options={oilOptions}
                selected={oilOptions?.find((opt) => opt.key === searchOption.oil_type)}
                onChange={(e) => setSearchOption((prev) => ({ ...prev, oil_type: e.key }))}
              />
              <Select
                buttonClassName="min-w-32"
                label="壓縮類型"
                options={compressOptions}
                selected={compressOptions?.find((opt) => opt.key === searchOption.compress_type)}
                onChange={(e) => setSearchOption((prev) => ({ ...prev, compress_type: e.key }))}
              />
              <Select
                buttonClassName="min-w-32"
                label="運轉類型"
                options={runOptions}
                selected={runOptions?.find((opt) => opt.key === searchOption.run_type)}
                onChange={(e) => setSearchOption((prev) => ({ ...prev, run_type: e.key }))}
              />
            </div>
          </div>
          <Button
            className="self-end"
            onClick={() =>
              navigate(
                {
                  ...searchOption,
                  ...(!searchOption.building && { building: buildingOptions?.[0]?.key || null }),
                  ...(!searchOption.machine && { machine: machineOptions?.[0]?.key || null }),
                  ...(!searchOption.oil_type && { oil_type: oilOptions?.[0]?.key || null }),
                  ...(!searchOption.compress_type && { compress_type: compressOptions?.[0]?.key || null }),
                  ...(!searchOption.run_type && { run_type: runOptions?.[0]?.key || null }),
                },
                { skipNull: false }
              )
            }>
            計算能效
          </Button>
        </div>
      </div>
      <div className="flex-grow grid grid-rows-2 gap-4 overflow-auto">
        <div className="row-span-1 bg-primary-900 rounded shadow flex space-x-8 p-4 overflow-auto">
          <div className="w-[40%] flex flex-col space-y-4">
            <div className="text-xl font-medium">設備能效 / ROI資訊</div>
            <div className="flex flex-col flex-grow rounded-t-lg overflow-auto shadow mb-1">
              <Table columns={ROI_COLUMNS} data={[].concat(data?.summary || DUMMY_ROI_DATA)} />
            </div>
          </div>
          <div className="w-[30%] flex flex-col">
            <div className="flex justify-between">
              <div>設備能效近一週狀況</div>
              <div className="flex space-x-4 translate-y-8 -translate-x-12">
                <Legend label="一級能效值" dotClassName="bg-_blue" />
                <Legend label="二級能效值" dotClassName="bg-_orange" />
                <Legend label="三級能效值" dotClassName="bg-_yellow" />
              </div>
            </div>
            <Chart option={eerOption} className="flex-grow" />
          </div>
          <div className="w-[30%] flex flex-col">
            <div>設備ROI近一週狀況</div>
            <Chart option={roiOption} className="flex-grow" />
          </div>
        </div>
        <div className="row-span-1 bg-primary-900 rounded shadow p-4 flex space-x-4 overflow-auto">
          <div className="w-[36%] flex flex-col space-y-4 overflow-auto">
            <div className="text-xl font-medium">既有備機設備推薦資訊</div>
            <div className="flex flex-col flex-grow rounded-t-lg overflow-auto shadow mb-1">
              <Table
                columns={OLD_MACHINE_COLUMNS}
                data={data?.recommand?.old || DUMMY_OLD_MACHINE_DATA}
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
          <div className="w-[36%] flex flex-col space-y-4 overflow-auto">
            <div className="text-xl font-medium">新機設備推薦資訊</div>
            <div className="flex flex-col flex-grow rounded-t-lg overflow-auto shadow mb-1">
              <Table
                columns={NEW_MACHINE_COLUMNS}
                data={data?.recommand?.new || DUMMY_NEW_MACHING_DATA}
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
          <div className="w-[28%] flex flex-col space-y-4">
            <div className="flex justify-between">
              <div className="text-xl font-medium">汰換後累積減少成本預估</div>
              <div className="flex space-x-4">
                <Legend label="備機設備" dotClassName="bg-_blue" />
                <Legend label="新設備" dotClassName="bg-_yellow" />
              </div>
            </div>
            <Chart option={costOption} className="flex-grow" />
          </div>
        </div>
      </div>
    </div>
  );
}

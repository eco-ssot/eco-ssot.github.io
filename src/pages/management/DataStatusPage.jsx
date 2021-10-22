import clsx from 'clsx';

import Legend from '../../components/legend/Legend';
import Table from '../../components/table/Table';
import { useGetDataStatusQuery } from '../../services/management';
import { ratioFormatter, baseFormatter } from '../../utils/formatter';
import { addPaddingColumns } from '../../utils/table';

const STATUS_MAPPING = {
  0: 'bg-gray-50',
  2: 'bg-primary-500',
  1: 'bg-dangerous-700',
};

const statusRenderer = (cell) => {
  return (
    <div className="flex justify-center">
      <div className={clsx('rounded-full h-3 w-3 text-center', STATUS_MAPPING[cell.value])}></div>
    </div>
  );
};

const femRenderer = (prop) => (cell) => {
  return (
    <div className="flex flex-col space-y-2 justify-end items-center">
      {statusRenderer(cell)}
      <div>{baseFormatter(cell.row.original[prop])}</div>
    </div>
  );
};

const csrRenderer = (amountProp, ratioProp) => (cell) => {
  return (
    <div className="flex flex-col space-y-2 justify-end items-center">
      {statusRenderer(cell)}
      <div className="flex space-x-2">
        <div>{baseFormatter(cell.row.original[amountProp])}</div>
        <div>/</div>
        <div>{ratioFormatter(cell.row.original[ratioProp])}</div>
      </div>
    </div>
  );
};

const COLUMNS = addPaddingColumns([
  { Header: 'Plant', accessor: 'plant', rowSpan: 0 },
  {
    id: 'benefit',
    Header: () => (
      <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
        <div className="px-2">Benefit</div>
        <div className="px-2 text-gray-400 text-sm">自動同步</div>
      </div>
    ),
    columns: [{ Header: '節電量', accessor: 'benefit', Cell: statusRenderer }],
  },
  {
    id: 'opm',
    Header: () => (
      <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
        <div className="px-2">OPM</div>
        <div className="px-2 text-gray-400 text-sm">自動同步</div>
      </div>
    ),
    columns: [
      { Header: '營收', accessor: 'OPMRevenue', Cell: statusRenderer },
      { Header: '人力', accessor: 'OPMManual', Cell: statusRenderer },
      { Header: '出貨量', accessor: 'OPMShipment', Cell: statusRenderer },
    ],
  },
  {
    id: 'fem',
    Header: () => (
      <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
        <div className="px-2">FEM</div>
        <div className="px-2 text-gray-400 text-sm">自動同步</div>
      </div>
    ),
    columns: [
      {
        Header: '智慧電表',
        accessor: 'FEMElectric',
        Cell: femRenderer('FEMElectricAmount'),
      },
      { Header: '智慧水表', accessor: 'FEMWater', Cell: femRenderer('FEMWaterAmount') },
      { Header: '太陽能', accessor: 'FEMSolar', Cell: femRenderer('FEMSolarAmount') },
    ],
  },
  {
    id: 'csr',
    Header: () => (
      <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
        <div className="px-2">CSR *</div>
        <div className="px-2 text-gray-400 text-sm">自動同步</div>
      </div>
    ),
    columns: [
      {
        Header: '電費帳單 / 差異',
        accessor: 'CSRElectric',
        Cell: csrRenderer('CSRElectricAmount', 'CSRElectricDifferent'),
      },
      { Header: '水費帳單 / 差異', accessor: 'CSRWater', Cell: csrRenderer('CSRWaterAmount', 'CSRWaterDifferent') },
    ],
  },
  {
    id: 'dpm',
    Header: () => (
      <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
        <div className="px-2">DPM</div>
        <div className="px-2 text-gray-400 text-sm">自動同步</div>
      </div>
    ),
    columns: [{ Header: '約當生產量', accessor: 'DPMEquProduction', Cell: statusRenderer }],
  },
  {
    id: 'waste',
    Header: () => (
      <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
        <div className="px-2">廢棄物</div>
        <div className="px-2 text-gray-400 text-sm">手動更新</div>
      </div>
    ),
    columns: [{ Header: '廢棄物重量', accessor: 'waste', Cell: statusRenderer }],
  },
]);

export default function DataStatusPage() {
  const { data } = useGetDataStatusQuery();
  return (
    <div className="row-span-2 col-span-7">
      <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-2">
        <div className="text-xl font-medium">資料更新狀態 (每月10號更新)</div>
        <div className="flex justify-end space-x-4">
          <Legend dotClassName="bg-gray-50" label="無資料" />
          <Legend dotClassName="bg-primary-500" label="已更新" />
          <Legend dotClassName="bg-dangerous-700" label="未更新" />
        </div>
        <div className="flex justify-end">＊CSR 更新日期：每月最後一日</div>
        {data && (
          <div className="w-full flex flex-grow flex-col shadow overflow-auto rounded-t-lg">
            <Table columns={COLUMNS} data={data?.data || []} />
          </div>
        )}
      </div>
    </div>
  );
}

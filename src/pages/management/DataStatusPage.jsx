import clsx from 'clsx';
import { subMonths } from 'date-fns';
import { useTranslation } from 'react-i18next';

import Legend from '../../components/legend/Legend';
import Table from '../../components/table/Table';
import { useGetDataStatusQuery } from '../../services/management';
import { addPaddingColumns } from '../../utils/table';

export const DEPRECIATED_PLANTS = ['WKS-6A', 'WKS-1'];
export const STATUS_MAPPING = {
  0: 'bg-gray-50',
  2: 'bg-primary-500',
  1: 'bg-dangerous-700',
  3: 'bg-yellow-500',
};

const statusRenderer = (cell) => {
  return (
    <div className="flex justify-center">
      <div className={clsx('rounded-full h-3 w-3 text-center', STATUS_MAPPING[cell.value])}></div>
    </div>
  );
};

const COLUMNS = (t) =>
  addPaddingColumns([
    {
      Header: 'Plant',
      accessor: 'plant',
      rowSpan: 0,
      Cell: (cell) =>
        DEPRECIATED_PLANTS.some((val) => cell.value.startsWith(val)) ? (
          <div className="line-through text-gray-300">{cell.value}</div>
        ) : (
          cell.value
        ),
    },
    {
      id: 'dpm',
      Header: () => (
        <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
          <div className="px-2">DPM</div>
          <div className="px-2 text-gray-400 text-sm">{t('dataStatus.table.autoSync')}</div>
        </div>
      ),
      columns: [{ Header: t('dataStatus.table.DPMEquProduction'), accessor: 'DPMEquProduction', Cell: statusRenderer }],
    },
    {
      id: 'opm',
      Header: () => (
        <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
          <div className="px-2">OPM</div>
          <div className="px-2 text-gray-400 text-sm">{t('dataStatus.table.autoSync')}</div>
        </div>
      ),
      columns: [
        { Header: t('dataStatus.table.OPMRevenue'), accessor: 'OPMRevenue', Cell: statusRenderer },
        { Header: t('dataStatus.table.OPMManual'), accessor: 'OPMManual', Cell: statusRenderer },
        { Header: t('dataStatus.table.OPMShipment'), accessor: 'OPMShipment', Cell: statusRenderer },
      ],
    },
    {
      id: 'fem',
      Header: () => (
        <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
          <div className="px-2">FEM</div>
          <div className="px-2 text-gray-400 text-sm">{t('dataStatus.table.autoSync')}</div>
        </div>
      ),
      columns: [
        {
          Header: t('dataStatus.table.FEMElectric'),
          accessor: 'FEMElectric',
          Cell: statusRenderer,
        },
        { Header: t('dataStatus.table.FEMWater'), accessor: 'FEMWater', Cell: statusRenderer },
        { Header: t('dataStatus.table.FEMSolar'), accessor: 'FEMSolar', Cell: statusRenderer },
      ],
    },
    {
      id: 'benefit',
      Header: () => (
        <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
          <div className="px-2">Benefit</div>
          <div className="px-2 text-gray-400 text-sm">{t('dataStatus.table.autoSync')}</div>
        </div>
      ),
      columns: [{ Header: t('dataStatus.table.benefit'), accessor: 'benefit', Cell: statusRenderer }],
    },
    {
      id: 'waste',
      Header: () => (
        <div className="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider">
          <div className="px-2">{t('dataStatus.table.waste')}</div>
          <div className="px-2 text-gray-400 text-sm">{t('dataStatus.table.manualSync')}</div>
        </div>
      ),
      columns: [{ Header: t('dataStatus.table.wasteWeight'), accessor: 'waste', Cell: statusRenderer }],
    },
  ]);

function getLabel(t) {
  const now = new Date();
  const date = now.getDate();
  const month = (date < 10 ? subMonths(now, 1) : now).getMonth() + 1;
  const currMonth = month - 1 === 0 ? 12 : month - 1;
  const nextMonth = month + 1 === 13 ? 1 : month + 1;
  return (
    <>
      <div className="flex space-x-2">
        <div>
          {t('dataStatus.title', {
            currMonthNum: currMonth,
            currMonth: now.setMonth(currMonth - 1),
            formatParams: {
              currMonth: { month: 'short' },
            },
          })}
        </div>
        <div>({t('dataStatus.subTitle', { nextMonth })})</div>
      </div>
    </>
  );
}

export default function DataStatusPage() {
  const { t } = useTranslation(['managementPage']);
  const { data } = useGetDataStatusQuery();
  return (
    <div className="row-span-2 col-span-7">
      <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-2">
        <div className="text-xl font-medium space-y-2">{getLabel(t)}</div>
        <div className="flex justify-end space-x-4">
          <Legend dotClassName="bg-gray-50" label={t('dataStatus.noData')} />
          <Legend dotClassName="bg-primary-500" label={t('dataStatus.updated')} />
          <Legend dotClassName="bg-dangerous-700" label={t('dataStatus.notUpdated')} />
          <Legend dotClassName="bg-yellow-500" label={t('dataStatus.incorrectData')} />
        </div>
        <div className="flex justify-end">{t('dataStatus.csrDesc')}</div>
        {data && (
          <div className="w-full flex flex-grow flex-col shadow overflow-auto rounded-t-lg">
            <Table columns={COLUMNS(t)} data={data?.data || []} />
          </div>
        )}
      </div>
    </div>
  );
}

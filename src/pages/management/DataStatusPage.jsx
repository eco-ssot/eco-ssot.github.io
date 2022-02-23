import { useMemo, useState } from 'react';

import clsx from 'clsx';
import { subMonths } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import APP_CONSTANTS from '../../app/appConstants';
import Button from '../../components/button/Button';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import { selectMonth, selectYear } from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';
import { useGetLatestDateQuery } from '../../services/app';
import { useGetDataStatusQuery } from '../../services/management';
import { addPaddingColumns, plantRenderer } from '../../utils/table';

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
      Cell: plantRenderer,
    },
    {
      id: 'dpm',
      Header: () => (
        <div className="flex items-center justify-center border-b border-divider py-1 divide-x divide-divider">
          <div className="px-2">DPM</div>
          <div className="px-2 text-gray-400 text-sm">{t('dataStatus.table.autoSync')}</div>
        </div>
      ),
      columns: [{ Header: t('dataStatus.table.DPMEquProduction'), accessor: 'DPMEquProduction', Cell: statusRenderer }],
    },
    {
      id: 'opm',
      Header: () => (
        <div className="flex items-center justify-center border-b border-divider py-1 divide-x divide-divider">
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
        <div className="flex items-center justify-center border-b border-divider py-1 divide-x divide-divider">
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
        <div className="flex items-center justify-center border-b border-divider py-1 divide-x divide-divider">
          <div className="px-2">Benefit</div>
          <div className="px-2 text-gray-400 text-sm">{t('dataStatus.table.autoSync')}</div>
        </div>
      ),
      columns: [{ Header: t('dataStatus.table.benefit'), accessor: 'benefit', Cell: statusRenderer }],
    },
    {
      id: 'waste',
      Header: () => (
        <div className="flex items-center justify-center border-b border-divider py-1 divide-x divide-divider">
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
  const year = useSelector(selectYear);
  const month = useSelector(selectMonth);
  const { data: { currYear, currMonth, yearOptions } = {} } = useGetLatestDateQuery();
  const [searchOption, setSearchOption] = useState({ year: year || currYear, month: month || currMonth });
  const { data } = useGetDataStatusQuery(
    { year: year || currYear, month: month || currMonth },
    { skip: !currYear || !currMonth }
  );

  const disabledYearOptions = useMemo(
    () => yearOptions?.map((option) => ({ ...option, disabled: option.key < 2022 })),
    [yearOptions]
  );

  return (
    <div className="row-span-2 col-span-7">
      <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4">
        <div className="text-xl font-medium space-y-2 h-10">
          {((!year && !month) || (year === currYear && month === currMonth)) && getLabel(t)}
        </div>
        <div className="flex space-x-8 justify-center">
          <Select
            label="查詢年度 : "
            options={disabledYearOptions || APP_CONSTANTS.YEAR_OPTIONS}
            selected={(disabledYearOptions || APP_CONSTANTS.YEAR_OPTIONS).find(
              (option) => option.key === searchOption.year
            )}
            onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
            buttonClassName="min-w-28"
          />
          <Select
            label="查詢月份 : "
            buttonClassName="w-24"
            options={APP_CONSTANTS.MONTH_OPTIONS}
            selected={
              APP_CONSTANTS.MONTH_OPTIONS.find((option) => option.key === searchOption.month) ||
              APP_CONSTANTS.MONTH_OPTIONS.find((option) => option.key === currMonth)
            }
            onChange={(e) => setSearchOption((prev) => ({ ...prev, month: e.key }))}
          />
          <Button
            onClick={() =>
              navigate({
                year: searchOption.year || currYear,
                month: searchOption.month || APP_CONSTANTS.MONTH_OPTIONS.find((option) => option.key === currMonth).key,
              })
            }>
            搜尋
          </Button>
        </div>
        <div className="absolute right-10">
          <div className="flex justify-end space-x-4">
            <Legend dotClassName="bg-gray-50" label={t('dataStatus.noData')} />
            <Legend dotClassName="bg-primary-500" label={t('dataStatus.updated')} />
            <Legend dotClassName="bg-dangerous-700" label={t('dataStatus.notUpdated')} />
            <Legend dotClassName="bg-yellow-500" label={t('dataStatus.incorrectData')} />
          </div>
          <div className="flex justify-end">{t('dataStatus.csrDesc')}</div>
        </div>
        {data && (
          <div className="w-full flex flex-grow flex-col shadow overflow-auto rounded-t-lg">
            <Table
              columns={COLUMNS(t)}
              data={data?.data || []}
              getHeaderProps={(header) => ({ className: '!py-1' })}
              getCellProps={(cell) => ({ className: '!py-1' })}
            />
          </div>
        )}
      </div>
    </div>
  );
}

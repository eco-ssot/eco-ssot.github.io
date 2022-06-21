import { useEffect, useMemo, useState } from 'react';

import { UploadIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { subMonths } from 'date-fns';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import APP_CONSTANTS from '../../app/appConstants';
import Button from '../../components/button/Button';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import UploadModal from '../../components/upload-modal/UploadModal';
import useAdmin from '../../hooks/useAdmin';
import usePlantPermission from '../../hooks/usePlantPermission';
import { selectBusiness, selectMonth, selectYear } from '../../renderless/location/locationSlice';
import useNavigate from '../../router/useNavigate';
import { useGetLatestDateQuery } from '../../services/app';
import {
  useGetDataStatusQuery,
  usePostManualCsrMutation,
  useUploadEnergyExcelMutation,
} from '../../services/management';
import { addPaddingColumns, plantRenderer } from '../../utils/table';

const STATUS_MAPPING = {
  '-': 'bg-gray-50',
  0: 'bg-gray-50',
  1: 'bg-dangerous-700',
  2: 'bg-primary-500',
  3: 'bg-yellow-500',
};

const statusRenderer = (label) => (cell) => {
  return (
    <div className="mx-[25%] flex min-w-24 items-center  space-x-2 whitespace-nowrap">
      <div
        className={clsx(
          'h-3 w-3 min-w-3 rounded-full text-center',
          process.env.REACT_APP_MANUAL_DATA_STATUS === '1' && ['CSR', '月報表'].includes(cell.row.original[label])
            ? 'bg-primary-500'
            : STATUS_MAPPING[cell.value]
        )}></div>
      <div>{cell.row.original[label]}</div>
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
      className: 'whitespace-nowrap',
    },
    {
      id: 'dpm',
      Header: () => (
        <div className="flex items-center justify-center divide-x divide-divider border-b border-divider py-1">
          <div className="px-2">DPM</div>
          <div className="px-2 text-sm text-gray-400">{t('dataStatus.table.autoSync')}</div>
        </div>
      ),
      columns: [
        {
          Header: t('dataStatus.table.DPMEquProduction'),
          accessor: 'DPMEquProduction',
          Cell: statusRenderer('DPMEquProduction_source'),
          className: 'text-center',
        },
      ],
    },
    {
      id: 'opm',
      Header: () => (
        <div className="flex items-center justify-center divide-x divide-divider border-b border-divider py-1">
          <div className="px-2">OPM</div>
          <div className="px-2 text-sm text-gray-400">{t('dataStatus.table.autoSync')}</div>
        </div>
      ),
      columns: [
        { Header: t('dataStatus.table.OPMRevenue'), accessor: 'OPMRevenue', Cell: statusRenderer('OPMRevenue_source') },
        { Header: t('dataStatus.table.OPMManual'), accessor: 'OPMManual', Cell: statusRenderer('OPMManual_source') },
        {
          Header: t('dataStatus.table.OPMShipment'),
          accessor: 'OPMShipment',
          Cell: statusRenderer('OPMShipment_source'),
        },
      ],
    },
    {
      id: 'fem',
      Header: () => (
        <div className="flex items-center justify-center divide-x divide-divider border-b border-divider py-1">
          <div className="px-2">FEM</div>
          <div className="px-2 text-sm text-gray-400">{t('dataStatus.table.autoSync')}</div>
        </div>
      ),
      columns: [
        {
          Header: t('dataStatus.table.FEMElectric'),
          accessor: 'FEMElectric',
          Cell: statusRenderer('FEMElectric_source'),
        },
        { Header: t('dataStatus.table.FEMWater'), accessor: 'FEMWater', Cell: statusRenderer('FEMWater_source') },
        { Header: t('dataStatus.table.FEMSolar'), accessor: 'FEMSolar', Cell: statusRenderer('FEMSolar_source') },
      ],
    },
    // {
    //   id: 'benefit',
    //   Header: () => (
    //     <div className="flex items-center justify-center divide-x divide-divider border-b border-divider py-1">
    //       <div className="px-2">Benefit</div>
    //       <div className="px-2 text-sm text-gray-400">{t('dataStatus.table.autoSync')}</div>
    //     </div>
    //   ),
    //   columns: [{ Header: t('dataStatus.table.benefit'), accessor: 'benefit', Cell: statusRenderer('benefit_source') }],
    // },
    {
      id: 'waste',
      Header: () => (
        <div className="flex items-center justify-center divide-x divide-divider border-b border-divider py-1">
          <div className="px-2">{t('dataStatus.table.waste')}</div>
          <div className="px-2 text-sm text-gray-400">{t('dataStatus.table.manualSync')}</div>
        </div>
      ),
      columns: [{ Header: t('dataStatus.table.wasteWeight'), accessor: 'waste', Cell: statusRenderer('waste_source') }],
    },
  ]);

function getLabel(t) {
  const now = new Date();
  const date = now.getDate();
  const month = (date < (process.env.REACT_APP_DATA_UPDATE_DAY || 10) ? subMonths(now, 1) : now).getMonth() + 1;
  const currMonth = month - 1 === 0 ? 12 : month - 1;
  const nextMonth = month + 1 === 13 ? 1 : month + 1;
  return (
    <>
      <div className="flex space-x-2">
        <div>
          {t('dataStatus.title', {
            currMonthNum: currMonth,
            currMonth: new Date(0, currMonth - 1, 1),
            formatParams: {
              currMonth: { month: 'short' },
            },
          })}
        </div>
        <div>({t('dataStatus.subTitle', { nextMonth, nextDay: process.env.REACT_APP_DATA_UPDATE_DAY || 10 })})</div>
      </div>
    </>
  );
}

export default function DataStatusPage() {
  const { t } = useTranslation(['managementPage', 'component']);
  const year = useSelector(selectYear);
  const month = useSelector(selectMonth);
  const business = useSelector(selectBusiness);
  const { data: { currYear, currMonth, yearOptions } = {} } = useGetLatestDateQuery();
  const [searchOption, setSearchOption] = useState({ year: year || currYear, month: month || currMonth });
  const [open, setOpen] = useState(false);
  const plantPermission = usePlantPermission();
  const { data } = useGetDataStatusQuery(
    { year: year || currYear, month: month || currMonth, permission: plantPermission },
    { skip: !currYear || !currMonth }
  );

  const disabledYearOptions = useMemo(
    () => yearOptions?.map((option) => ({ ...option, disabled: option.key < 2022 })),
    [yearOptions]
  );

  const columns = useMemo(() => COLUMNS(t), [t]);
  const [uploadExcel, { isSuccess }] = useUploadEnergyExcelMutation();
  const [manualUpdateCsr] = usePostManualCsrMutation();
  const { roles } = useAdmin();
  const navigate = useNavigate();
  useEffect(() => {
    setSearchOption({ year: year || currYear, month: month || currMonth });
  }, [year, month, currYear, currMonth]);

  return (
    <>
      <UploadModal
        title={t('managementPage:dataStatus.importMonthlyReport')}
        open={open}
        setOpen={setOpen}
        uploadExcel={(formData) => uploadExcel({ business, data: formData })}
        isSuccess={isSuccess}
      />
      <div className="col-span-7 row-span-2">
        <div className="flex h-full flex-col space-y-4 rounded bg-primary-900 p-4 shadow">
          <div className="h-10 space-y-2 text-xl font-medium">
            {((!year && !month) || (year === currYear && month === currMonth)) && getLabel(t)}
          </div>
          <div className="relative flex items-center justify-center">
            <Button className="absolute left-0 space-x-1" onClick={() => setOpen(true)}>
              <UploadIcon className="h-5 w-5" />
              <div>{t('managementPage:dataStatus.importMonthlyReport')}</div>
            </Button>
            {roles?.includes('DEV') && (
              <Button
                className="absolute left-36 mx-2"
                variant="danger"
                onClick={() => manualUpdateCsr().then((res) => res?.data?.msg && toast.success(res?.data?.msg))}>
                手動更新
              </Button>
            )}
            <div className="flex space-x-8">
              <Select
                label={t('component:selectLabel.searchYear')}
                options={disabledYearOptions || APP_CONSTANTS.YEAR_OPTIONS}
                selected={(disabledYearOptions || APP_CONSTANTS.YEAR_OPTIONS).find(
                  (option) => option.key === searchOption.year
                )}
                onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
                buttonClassName="min-w-28"
              />
              <Select
                label={t('component:selectLabel.searchMonth')}
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
                    month: searchOption.month || currMonth,
                  })
                }>
                {t('component:button.search')}
              </Button>
            </div>
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
            <div className="flex w-full flex-grow flex-col overflow-auto rounded-t-lg shadow">
              <Table
                columns={columns}
                data={data?.data || []}
                getHeaderProps={(header) => ({ className: '!py-1' })}
                getCellProps={(cell) => ({ className: '!py-1' })}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

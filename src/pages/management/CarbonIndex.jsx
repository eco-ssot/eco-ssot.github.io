import { useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import EditableTable from '../../components/table/EditableTable';
import { usePatchCarbonIndexMutation } from '../../services/management';
import { baseFormatter } from '../../utils/formatter';
import { updateMyData } from '../../utils/table';


const COLUMNS = ({ t, setData, patchCarbonIndex, year, canEdit }) => [
  {
    Header: 'Site',
    accessor: 'site',
    className: 'w-1/3 text-center py-3 whitespace-nowrap',
  },
  {
    Header: t('managementPage:carbonIndex.table.amount'),
    accessor: 'amount',
    editable: true,
    className: 'w-1/3 text-center',
    formatter: baseFormatter,
    precision: 4,
  },
  {
    Header: t('managementPage:carbonIndex.table.lastUpdateTime'),
    accessor: 'lastUpdateTime',
    className: 'w-1/3 text-center',
    Cell:({ value }) => {
      const lastUpdateTime = format(new Date(value), 'yyyy-MM-dd')
      return lastUpdateTime
    }
  },
];

export default function CarbonIndex({ className, data, canEdit, year = APP_CONSTANTS.CURRENT_YEAR }) {
  const { t } = useTranslation(['managementPage', 'component']);
  const [patchCarbonIndex] = usePatchCarbonIndexMutation();
  const [dataSource, setData] = useState(data);
  const columns = useMemo(
    () => COLUMNS({ t, setData, patchCarbonIndex, year, canEdit ,}),
    [t, patchCarbonIndex, year, canEdit]
  );
  useEffect(() => {
    data && setData(data);
  }, [data]);

  return (
    <div className={clsx('w-full space-y-2 overflow-auto rounded-t-lg shadow', className)}>
      <EditableTable columns={columns} data={dataSource} updateMyData={updateMyData(setData) } />
    </div>
  );
}

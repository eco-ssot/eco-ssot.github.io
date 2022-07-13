import { useMemo } from 'react';

import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';

import FixedTable from '../../components/table/FixedTable';
import usePlantPermission from '../../hooks/usePlantPermission';
import { useGetOverviewHistoryQuery } from '../../services/overview';

import { COLUMNS } from './OverviewTable';

export default function OverviewHistoryTable({ business, year, dimension, s, p }) {
  const { t } = useTranslation(['overviewPage', 'common']);
  const option = { year, dimension };
  const plantPermission = usePlantPermission();
  const { data } = useGetOverviewHistoryQuery(
    { business, site: s, plant: p, permission: plantPermission, ...option },
    { skip: Object.values(option).every(isNil) }
  );

  const columns = useMemo(() => COLUMNS({ t, currYear: year, lastYear: year - 1 }), [year, t]);
  return (
    <>
      {data && (
        <>
          <div className="h-6 w-full text-right">{t('common:gapDesc')}</div>
          <div className="flex w-full flex-col overflow-auto rounded-t-lg shadow">
            <FixedTable columns={columns} data={data?.data || []} />
          </div>
        </>
      )}
    </>
  );
}

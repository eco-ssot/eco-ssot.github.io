import { useMemo } from 'react';

import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';

import Table from '../../components/table/Table';
import { useGetOverviewHistoryQuery } from '../../services/overview';

import { COLUMNS } from './OverviewTable';

export default function OverviewHistoryTable({ business, year, dimension, s, p }) {
  const { t } = useTranslation(['overviewPage', 'common']);
  const option = { year, dimension };
  const { data } = useGetOverviewHistoryQuery(
    { business, site: s, plant: p, ...option },
    { skip: Object.values(option).every(isNil) }
  );

  const columns = useMemo(() => COLUMNS({ t, currYear: year, lastYear: year - 1 }), [year, t]);
  return (
    <>
      {data && (
        <>
          <div className="w-full h-6 text-right">{t('common:gapDesc')}</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
            <Table columns={columns} data={data?.data || []} />
          </div>
        </>
      )}
    </>
  );
}

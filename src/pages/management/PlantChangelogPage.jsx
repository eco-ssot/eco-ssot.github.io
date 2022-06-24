import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Table from '../../components/table/Table';
import { selectLanguage } from '../../renderless/location/locationSlice';
import { useGetPlantChangelogQuery } from '../../services/public';

const COLUMNS = (t) => [
  { Header: t('managementPage:plantChangelog.changeType'), accessor: 'type' },
  { Header: 'Plant', accessor: 'plant' },
  { Header: t('managementPage:plantChangelog.after'), accessor: 'after' },
  { Header: t('managementPage:plantChangelog.description'), accessor: 'desc' },
  { Header: t('managementPage:plantChangelog.changeDate'), accessor: 'date' },
];

export default function PlantChangelogPage() {
  const { t } = useTranslation(['managementPage']);
  const lng = useSelector(selectLanguage);
  const { data } = useGetPlantChangelogQuery(undefined, {
    selectFromResult: ({ data }) => ({ data: data?.[String(lng).split('-')[0]] }),
  });

  const columns = useMemo(() => COLUMNS(t), [t]);
  return (
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col space-y-6 rounded bg-primary-900 p-4 shadow">
        <div className="text-xl font-medium">{t('managementPage:plantChangelog.title')}</div>
        <div className="flex flex-col overflow-auto rounded-t-lg shadow">
          <Table columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  );
}

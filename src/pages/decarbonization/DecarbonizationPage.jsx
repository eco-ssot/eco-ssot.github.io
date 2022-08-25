import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import Legend from '../../components/legend/Legend';
import PageContainer from '../../components/page-container/PageContainer';
import Tag from '../../components/tag/Tag';
import useAccumulationPeriod from '../../hooks/useAccumulationPeriod';
import { useGetDecarbonizationQuery } from '../../services/decarbonization';

import DecarbonizationTable, { COLUMNS } from './DecarbonizationTable';

export default function DecarbonizationPage() {
  const { t } = useTranslation(['decarbonizationPage', 'common', 'component']);
  const { accumulationPeriod } = useAccumulationPeriod();
  const { data } = useGetDecarbonizationQuery();
  const columns = useMemo(() => COLUMNS(), []);
  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium">脫碳目標</div>
        <Tag>
          {t('common:accumulationRange')} : <span className="ml-1 text-lg font-medium">{accumulationPeriod}</span>
        </Tag>
      </div>
      <div className="mt-4 mb-2 flex justify-end space-x-4">
        <Legend dotClassName="bg-dangerous-500" label={t('component:legend.missTarget')} />
        <Legend dotClassName="bg-green-500" label={t('component:legend.meetTarget')} />
        <div className="rounded border border-dangerous-700 bg-dangerous-900 px-1">
          {t('component:legend.missingData')}
        </div>
      </div>
      <div className="flex w-full flex-col overflow-auto rounded-t-lg shadow">
        {data?.data && (
          <DecarbonizationTable
            columns={columns}
            data={data}
            getHeaderProps={(header) => {
              return { className: '' };
            }}
            getRowProps={(row) => {
              return { className: '' };
            }}
            getCellProps={(cell) => {
              return { className: '' };
            }}
          />
        )}
      </div>
    </PageContainer>
  );
}

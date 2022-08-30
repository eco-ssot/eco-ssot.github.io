import { useMemo, useState, useEffect } from 'react';

import clsx from 'clsx';
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
  const {data} = useGetDecarbonizationQuery();
  const [_data, setData] = useState();
  const columns = useMemo(() => COLUMNS({t}), [t]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  useEffect(() => {
    setSelectedRowIndex(-1);
  }, [_data]);
  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium">{t('decarbonizationPage:title')}</div>
        <Tag>
          {t('common:accumulationRange')} : <span className="ml-1 text-lg font-medium">{accumulationPeriod}</span>
        </Tag>
      </div>
      <div className="mt-4 mb-2 flex justify-end space-x-4">
        <Legend dotClassName="bg-dangerous-500" label={t('component:legend.missTarget')} />
        <Legend dotClassName="bg-yellow-500" label={t('component:legend.meetTargetYet')} />
        <Legend dotClassName="bg-green-500" label={t('component:legend.meetTarget')} />
      </div>
      <div className="flex w-full flex-col overflow-auto rounded-t-lg shadow">
        {data?.data && (
          <DecarbonizationTable
            columns={columns}
            data={data.data}
            getHeaderProps={(header) => {
              return { className: 'bg-primary-800 py-2' };
            }}
            getRowProps={(row) => ({
              className: clsx(
                'border-b border-divider',
                selectedRowIndex === row.index && 'bg-primary-800/80',
                row.original.editing || row.original.isNew ? 'cursor-default' : 'cursor-pointer'
              ),
              onClick: () =>
              !row.original.editing &&
              !row.original.isNew &&
              setSelectedRowIndex((prev) => (prev === row.index ? -1 : row.index)),
            })}
            getCellProps={(cell) => {
              return { className: 'py-2' };
            }}
          />
        )}
      </div>
    </PageContainer>
  );
}

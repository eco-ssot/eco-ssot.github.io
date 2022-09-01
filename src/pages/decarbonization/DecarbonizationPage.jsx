import { useMemo } from 'react';

import clsx from 'clsx';
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


import Legend from '../../components/legend/Legend';
import PageContainer from '../../components/page-container/PageContainer';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Tag from '../../components/tag/Tag';
import {  selectY } from '../../renderless/location/locationSlice';
import { useGetDecarbonizationQuery } from '../../services/decarbonization';

import DecarbonizationTable, { COLUMNS } from './DecarbonizationTable';

export default function DecarbonizationPage() {
  const { t } = useTranslation(['decarbonizationPage', 'common', 'component']);
  const { data } = useGetDecarbonizationQuery();
  const y = useSelector(selectY);
  const columns = useMemo(() => COLUMNS({ t,y }), [t,y]);

  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium">{t('decarbonizationPage:title')}</div>
        <Tag>
          {t('common:accumulationRange')}
          <GlobalDateSelect Select={'hidden'} />
          &nbsp; {y=== format(new Date(), 'yyyy')? format(new Date(), 'MM'):" 12"}
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
            getRowProps={(row) => (
              {
                className: clsx(
                  'border-b border-divider',
                ),
              }
            )}
            getCellProps={(cell) => {
              return { className: 'py-2' };
            }}
          />
        )}
      </div>
    </PageContainer>
  );
}

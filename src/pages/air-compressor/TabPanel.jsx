import { useMemo } from 'react';

import { isEmpty, pick } from 'lodash';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useGetMaintenanceQuery, useGetRoiQuery } from '../../services/airCompressor';

export default function TabPanel({ children }) {
  const { hash } = useLocation();
  const isMaintenance = useMemo(() => hash.slice(1) === 'MAINTENANCE', [hash]);
  const [searchParams] = useSearchParams();
  const query = useMemo(
    () =>
      pick(Object.fromEntries(searchParams), [
        'building',
        'machine',
        'oil_type',
        'compress_type',
        'run_type',
        'maintenance',
        'power',
        'engine_depcmemt',
        'eer_r',
        'cost',
        'model_number',
        'hours',
        'maintain_cost',
        'maintain_hour',
        'last_maintain_time',
        'next_maintain_time',
        'machine_id',
      ]),
    [searchParams]
  );

  const { data: recommendationData } = useGetRoiQuery(query, { skip: isEmpty(query) || isMaintenance });
  const { data: maintenanceData } = useGetMaintenanceQuery(query, {
    skip: isEmpty(query) || !isMaintenance,
    selectFromResult: ({ data }) => ({ data: data?.data }),
  });

  const data = useMemo(
    () => (isEmpty(query) ? undefined : isMaintenance ? maintenanceData : recommendationData),
    [query, isMaintenance, maintenanceData, recommendationData]
  );

  return children({ isMaintenance, query, data });
}

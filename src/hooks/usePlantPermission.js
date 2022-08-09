import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { selectBusiness } from '../renderless/location/locationSlice';
import { useGetPlantsQuery } from '../services/app';

import useAuth from './useAuth';

export default function usePlantPermission() {
  const { authenticated, user } = useAuth();
  const bo = useSelector(selectBusiness);
  const { data } = useGetPlantsQuery({ bo }, { skip: !authenticated });
  const plantPermission = useMemo(() => {
    if (user?.roles?.includes('dev') || user?.roles?.includes('p8')) {
      return data;
    }

    return data?.filter((d) => d !== 'WZS-8');
  }, [data, user?.roles]);

  return plantPermission;
}

import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { useKeycloak } from '../keycloak';
import { selectBusiness } from '../renderless/location/locationSlice';
import { useGetPlantsQuery } from '../services/app';

export default function usePlantPermission() {
  const { keycloak } = useKeycloak();
  const bo = useSelector(selectBusiness);
  const { data } = useGetPlantsQuery({ bo });
  const plantPermission = useMemo(() => {
    if (keycloak?.realmAccess?.roles?.includes('DEV') || keycloak?.realmAccess?.roles?.includes('WZS-8')) {
      return data;
    }

    return data?.filter((d) => d !== 'WZS-8');
  }, [data, keycloak?.realmAccess?.roles]);

  return plantPermission;
}

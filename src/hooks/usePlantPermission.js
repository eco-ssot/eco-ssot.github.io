import { useMemo } from 'react';

import { useKeycloak } from '../keycloak';
import { useGetPlantsQuery } from '../services/app';

export default function usePlantPermission() {
  const { keycloak } = useKeycloak();
  const { data } = useGetPlantsQuery();
  const plantPermission = useMemo(() => {
    if (keycloak?.realmAccess?.roles?.includes('DEV') || keycloak?.realmAccess?.roles?.includes('WZS-8')) {
      return data;
    }

    return data?.filter((d) => d !== 'WZS-8');
  }, [data, keycloak?.realmAccess?.roles]);

  return plantPermission;
}

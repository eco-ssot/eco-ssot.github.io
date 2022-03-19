import { useMemo } from 'react';

import APP_CONSTANTS from '../app/appConstants';
import { useKeycloak } from '../keycloak';

export default function useAdmin() {
  const { keycloak } = useKeycloak();
  const roles = useMemo(
    () => (keycloak?.realmAccess?.roles || []).filter((r) => !APP_CONSTANTS.KEYCLOAK_DEFAULT_ROLES.includes(r)),
    [keycloak?.realmAccess?.roles]
  );

  const canEdit = useMemo(() => roles.includes(APP_CONSTANTS.MAINTAINER_ROLE), [roles]);
  return { keycloak, roles, canEdit };
}

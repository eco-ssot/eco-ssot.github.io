import APP_CONFIG from '../constants/app-config';
import { useKeycloak } from '../keycloak';

export default function useAdmin() {
  const { keycloak } = useKeycloak();
  const roles = (keycloak?.realmAccess?.roles || []).filter((r) => !APP_CONFIG.KEYCLOAK_DEFAULT_ROLES.includes(r));
  const canEdit = roles.includes(APP_CONFIG.MAINTAINER_ROLE);
  return { keycloak, roles, canEdit };
}

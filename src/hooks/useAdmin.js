import APP_CONSTANTS from '../app/appConstants';
import { useKeycloak } from '../keycloak';

export default function useAdmin() {
  const { keycloak } = useKeycloak();
  const roles = (keycloak?.realmAccess?.roles || []).filter((r) => !APP_CONSTANTS.KEYCLOAK_DEFAULT_ROLES.includes(r));
  const canEdit = roles.includes(APP_CONSTANTS.MAINTAINER_ROLE);
  return { keycloak, roles, canEdit };
}

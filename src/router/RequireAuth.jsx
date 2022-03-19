import { Navigate, useLocation } from 'react-router-dom';

import APP_CONSTANTS from '../app/appConstants';
import { useKeycloak } from '../keycloak';

export default function RequireAuth({ children }) {
  const { keycloak } = useKeycloak();
  const location = useLocation();
  if (!keycloak.authenticated) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  if (
    keycloak?.authenticated &&
    (keycloak?.realmAccess?.roles || []).filter((role) => !APP_CONSTANTS.KEYCLOAK_DEFAULT_ROLES.includes(role))
      .length === 0
  ) {
    return <Navigate replace to="/unauthorized" state={{ from: location }} />;
  }

  return children;
}

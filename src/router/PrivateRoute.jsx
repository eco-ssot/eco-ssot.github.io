import { Suspense } from 'react';

import { Route, Navigate } from 'react-router-dom';

import APP_CONSTANTS from '../app/appConstants';
import Layout from '../components/layout/Layout';
import PageContainer from '../components/page-container/PageContainer';
import { useKeycloak } from '../keycloak';

export default function PrivateRoute({ component: Component, skeleton: Skeleton = PageContainer, ...rest }) {
  const { keycloak } = useKeycloak();
  if (
    keycloak?.authenticated &&
    (keycloak?.realmAccess?.roles || []).filter((role) => !APP_CONSTANTS.KEYCLOAK_DEFAULT_ROLES.includes(role))
      .length === 0
  ) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak?.authenticated ? (
          <Layout match={props.match}>
            <Suspense fallback={<Skeleton pathname={props.location.pathname} />}>
              <Component {...props} />
            </Suspense>
          </Layout>
        ) : (
          <Navigate
            to={{
              pathname: '/login',
              state: { from: props.location.pathname },
            }}
          />
        )
      }
    />
  );
}
